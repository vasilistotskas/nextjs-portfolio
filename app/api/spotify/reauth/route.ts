import { timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authorizeUrl } from '@/lib/spotify-auth'

/**
 * Start the twice-yearly Spotify re-consent.
 *
 * Spotify grants last six months from the moment the user approves them and
 * refreshing does not extend that, so someone has to press Agree again. This
 * route is the whole ceremony: open the link, press Agree, done — no terminal,
 * no `.env`, no redeploy, because the resulting token goes to a runtime store
 * rather than an environment variable.
 */
export const dynamic = 'force-dynamic'

export const STATE_COOKIE = 'spotify_reauth_state'

/**
 * Constant-time comparison, and length-independent: `timingSafeEqual` throws
 * on mismatched lengths, which would itself leak the secret's length.
 */
function secretMatches(provided: string | null): boolean {
	const expected = process.env.SPOTIFY_REAUTH_SECRET
	if (!expected || !provided) return false
	const a = Buffer.from(provided)
	const b = Buffer.from(expected)
	if (a.length !== b.length) return false
	return timingSafeEqual(a, b)
}

export async function GET(request: NextRequest) {
	if (!process.env.SPOTIFY_REAUTH_SECRET) {
		return NextResponse.json(
			{ error: 'SPOTIFY_REAUTH_SECRET is not configured' },
			{ status: 503 }
		)
	}

	if (!secretMatches(request.nextUrl.searchParams.get('key'))) {
		// Deliberately indistinguishable from a route that does not exist.
		return new NextResponse('Not found', { status: 404 })
	}

	const state = crypto.randomUUID()
	const response = NextResponse.redirect(authorizeUrl(state))

	// CSRF protection for the callback: Spotify echoes `state` back, and the
	// callback only proceeds when it matches the cookie set here.
	response.cookies.set(STATE_COOKIE, state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/api/spotify',
		maxAge: 10 * 60
	})

	return response
}
