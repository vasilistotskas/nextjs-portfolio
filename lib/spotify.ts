import { EXPIRY_WARNING_MS, alertOnce } from '@/lib/spotify-alert'
import { basicAuth, TOKEN_ENDPOINT } from '@/lib/spotify-auth'
import type { TokenState } from '@/lib/spotify-store'
import { readTokenState, timeUntilExpiry } from '@/lib/spotify-store'

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`

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

/**
 * Access tokens are good for an hour, so refreshing on every request was pure
 * waste — a NowPlaying poll every few seconds meant thousands of needless
 * calls to the token endpoint. Expire a little early to stay clear of the
 * boundary.
 */
const ACCESS_TOKEN_TTL_MS = 55 * 60 * 1000
let accessToken: { value: string; until: number; forToken: string } | null = null

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

/**
 * Nag before the six-month grant lapses rather than after. Fire-and-forget:
 * the widget must not wait on an email, and a failed send is logged inside
 * `alertOnce`.
 */
function warnIfExpiringSoon(state: TokenState): void {
	const remaining = timeUntilExpiry(state)
	if (remaining === null || remaining > EXPIRY_WARNING_MS) return
	void alertOnce('expiring', state)
}

const getAccessToken = async (): Promise<TokenResponse> => {
	const state = await readTokenState()

	if (!state) {
		throw new SpotifyUnavailableError('no Spotify refresh token is stored')
	}

	if (lastFailure && Date.now() - lastFailure.at < FAILURE_COOLDOWN_MS) {
		// Unless consent was re-granted since the failure, in which case the
		// cooldown is stale and the site should recover at once rather than sit
		// dark for the rest of it.
		const reauthorised =
			state.authorizedAt && Date.parse(state.authorizedAt) > lastFailure.at
		if (!reauthorised) throw new SpotifyUnavailableError(lastFailure.reason)
		lastFailure = null
	}

	if (
		accessToken &&
		accessToken.until > Date.now() &&
		accessToken.forToken === state.refreshToken
	) {
		return { access_token: accessToken.value }
	}

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basicAuth()}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: state.refreshToken
		}),
		cache: 'no-store'
	})

	// Without this the caller would send `Bearer undefined` and every Spotify
	// call would fail with an opaque 401 instead of the real reason.
	if (!response.ok) {
		const reason = describe(response.status, await response.text())
		lastFailure = { at: Date.now(), reason }
		accessToken = null
		// One line, once per cooldown, saying what to actually do about it.
		console.error(
			`Spotify token refresh failed: ${reason}. ` +
				`Pausing Spotify calls for ${FAILURE_COOLDOWN_MS / 60000} minutes. ` +
				`"invalid_grant" means consent has lapsed — re-authorise at /api/spotify/reauth.`
		)
		// Mail as well, so this is noticed the same day rather than whenever
		// someone happens to look at the site.
		void alertOnce('broken', state, reason)
		throw new SpotifyUnavailableError(reason)
	}

	lastFailure = null
	const { access_token } = (await response.json()) as TokenResponse
	accessToken = {
		value: access_token,
		until: Date.now() + ACCESS_TOKEN_TTL_MS,
		forToken: state.refreshToken
	}
	warnIfExpiringSoon(state)
	return { access_token }
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
