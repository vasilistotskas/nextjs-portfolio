import { get, put } from '@vercel/blob'

/**
 * Where the Spotify refresh token lives at runtime.
 *
 * It cannot live in an environment variable. Vercel binds those when a
 * deployment is built, so writing a new value only reaches the site on the next
 * build — which is exactly why the last rotation needed a redeploy before the
 * widget came back. A private blob is read on request instead, so a token
 * written by the re-auth route takes effect immediately.
 *
 * Private, not public: blob URLs are otherwise reachable by anyone who knows
 * the store id, and this file holds a credential.
 */
const BLOB_PATH = 'spotify/refresh-token.json'

export type TokenState = {
	refreshToken: string
	/**
	 * When the user last granted consent. Spotify measures the six-month
	 * lifetime from this moment and refreshing does not extend it, so this is
	 * the only way to know when the next re-auth falls due.
	 */
	authorizedAt: string
	/** When the last "it broke" or "it is about to break" mail went out. */
	alertedAt?: string
}

/** Six months, per https://developer.spotify.com/blog/2026-06-18-refresh-token-expiration. */
export const TOKEN_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000

/**
 * Serverless instances stay warm across requests, so without this every
 * NowPlaying poll would fetch the blob again. Short enough that a re-auth on
 * one instance is picked up by the others within the minute.
 */
const CACHE_MS = 60 * 1000
let cache: { state: TokenState | null; at: number } | null = null

function fromEnv(): TokenState | null {
	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
	if (!refreshToken) return null
	// A token from `pnpm spotify:token` carries no consent timestamp, so the
	// expiry warning stays quiet until the first re-auth through the route.
	return { refreshToken, authorizedAt: '' }
}

/**
 * Read the stored token, falling back to the environment variable.
 *
 * Every blob failure falls back rather than throwing: before the store exists
 * — or if it is ever removed — the site must keep working off the env var it
 * used before.
 */
export async function readTokenState(): Promise<TokenState | null> {
	if (cache && Date.now() - cache.at < CACHE_MS) {
		return cache.state ?? fromEnv()
	}

	let state: TokenState | null = null
	try {
		const found = await get(BLOB_PATH, { access: 'private', useCache: false })
		if (found?.statusCode === 200) {
			const parsed = (await new Response(found.stream).json()) as Partial<TokenState>
			if (typeof parsed.refreshToken === 'string' && parsed.refreshToken) {
				state = {
					refreshToken: parsed.refreshToken,
					authorizedAt: parsed.authorizedAt ?? '',
					alertedAt: parsed.alertedAt
				}
			}
		}
	} catch (err) {
		// No store bound yet is the normal case on first deploy, not an incident.
		console.warn(
			`Spotify token store unreadable, falling back to SPOTIFY_REFRESH_TOKEN: ${
				err instanceof Error ? err.message : String(err)
			}`
		)
	}

	cache = { state, at: Date.now() }
	return state ?? fromEnv()
}

/** Replace the stored token. Throws — the caller is the re-auth route, which needs to know. */
export async function writeTokenState(state: TokenState): Promise<void> {
	await put(BLOB_PATH, JSON.stringify(state), {
		access: 'private',
		contentType: 'application/json',
		// A fixed path, overwritten in place: there is only ever one token, and
		// the reader has to be able to find it without listing the store.
		addRandomSuffix: false,
		allowOverwrite: true
	})
	cache = { state, at: Date.now() }
}

/** Record that an alert went out, without disturbing the token itself. */
export async function markAlerted(state: TokenState): Promise<void> {
	await writeTokenState({ ...state, alertedAt: new Date().toISOString() })
}

/** Milliseconds until consent expires, or null when the grant time is unknown. */
export function timeUntilExpiry(state: TokenState): number | null {
	if (!state.authorizedAt) return null
	const authorized = Date.parse(state.authorizedAt)
	if (Number.isNaN(authorized)) return null
	return authorized + TOKEN_LIFETIME_MS - Date.now()
}
