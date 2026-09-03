import { siteUrl } from '@/lib/seo'

/**
 * The authorization-code flow, just enough of it to re-grant consent.
 *
 * Spotify refresh tokens expire six months after the user approves them and
 * refreshing does not extend that, so re-consent is a recurring chore that
 * cannot be automated away — someone has to press Agree. What it can be is
 * cheap: two routes on the live site instead of a checkout, a local server and
 * a redeploy.
 */
export const SCOPES = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-top-read'
].join(' ')

/**
 * Always the production URL, never the request origin. Spotify matches the
 * redirect URI exactly against the list registered on the app, so deriving it
 * from one constant means only one entry has to be registered — and re-auth
 * from a phone lands in the same place as re-auth from a laptop.
 */
export const REDIRECT_URI = `${siteUrl}/api/spotify/reauth/callback`

export const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

export function authorizeUrl(state: string): string {
	const clientId = process.env.SPOTIFY_CLIENT_ID
	if (!clientId) throw new Error('SPOTIFY_CLIENT_ID is not set')

	return `${AUTHORIZE_ENDPOINT}?${new URLSearchParams({
		client_id: clientId,
		response_type: 'code',
		redirect_uri: REDIRECT_URI,
		scope: SCOPES,
		state,
		// Force the consent screen. Without it a live Spotify session can
		// silently reuse the grant being replaced, and the six-month clock
		// would carry on from the original approval.
		show_dialog: 'true'
	})}`
}

export function basicAuth(): string {
	const clientId = process.env.SPOTIFY_CLIENT_ID
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
	if (!clientId || !clientSecret) {
		throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must both be set')
	}
	return Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
}

/** Exchange an authorization code for a refresh token. */
export async function exchangeCode(code: string): Promise<string> {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basicAuth()}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: REDIRECT_URI
		}),
		cache: 'no-store'
	})

	const body = (await response.json().catch(() => ({}))) as {
		refresh_token?: string
		error?: string
		error_description?: string
	}

	if (!response.ok || !body.refresh_token) {
		const detail = body.error_description ?? body.error ?? `HTTP ${response.status}`
		throw new Error(`Token exchange failed: ${detail}`)
	}

	return body.refresh_token
}
