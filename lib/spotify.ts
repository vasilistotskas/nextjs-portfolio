const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

type TokenResponse = {
	access_token: string
}

/**
 * Thrown when Spotify itself is the problem rather than the request. Callers
 * turn this into an empty payload, never a 5xx: a portfolio should not report a
 * server error because a music widget cannot authenticate.
 */
export class SpotifyUnavailableError extends Error {
	constructor(readonly reason: string) {
		super(`Spotify unavailable: ${reason}`)
		this.name = 'SpotifyUnavailableError'
	}
}

/**
 * A refresh token, once revoked, stays revoked until someone re-authorises by
 * hand. Retrying on every request bought nothing and filled the logs — 59
 * errors in half an hour on the live site. Remember the failure and stop asking
 * for a while.
 */
const FAILURE_COOLDOWN_MS = 10 * 60 * 1000
let lastFailure: { at: number; reason: string } | null = null

function describe(status: number, body: string): string {
	try {
		const parsed = JSON.parse(body) as { error?: string; error_description?: string }
		if (parsed.error_description) return `${parsed.error} — ${parsed.error_description}`
		if (parsed.error) return parsed.error
	} catch {
		// Not JSON; fall through to the raw status.
	}
	return `HTTP ${status}`
}

const getAccessToken = async (): Promise<TokenResponse> => {
	if (!refresh_token) {
		throw new SpotifyUnavailableError('SPOTIFY_REFRESH_TOKEN is not set')
	}

	if (lastFailure && Date.now() - lastFailure.at < FAILURE_COOLDOWN_MS) {
		throw new SpotifyUnavailableError(lastFailure.reason)
	}

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token
		})
	})

	// Without this the caller would send `Bearer undefined` and every Spotify
	// call would fail with an opaque 401 instead of the real reason.
	if (!response.ok) {
		const reason = describe(response.status, await response.text())
		lastFailure = { at: Date.now(), reason }
		// One line, once per cooldown, saying what to actually do about it.
		console.error(
			`Spotify token refresh failed: ${reason}. ` +
				`Pausing Spotify calls for ${FAILURE_COOLDOWN_MS / 60000} minutes. ` +
				`"invalid_grant" means SPOTIFY_REFRESH_TOKEN must be re-issued through the authorization-code flow.`
		)
		throw new SpotifyUnavailableError(reason)
	}

	lastFailure = null
	return (await response.json()) as TokenResponse
}

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken()

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		cache: 'no-store'
	})
}

export type TimeRange = 'short_term' | 'medium_term'

export const getTopTracks = async (timeRange: TimeRange = 'short_term') => {
	const { access_token } = await getAccessToken()

	return fetch(`${TOP_TRACKS_ENDPOINT}?time_range=${timeRange}&limit=10`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		next: { revalidate: 3600 }
	})
}

export const getRecentlyPlayed = async (limit = 1) => {
	const { access_token } = await getAccessToken()

	return fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		cache: 'no-store'
	})
}
