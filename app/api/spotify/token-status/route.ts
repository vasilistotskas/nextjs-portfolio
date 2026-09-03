import { timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { readTokenState, timeUntilExpiry } from '@/lib/spotify-store'

/**
 * How much life is left in the Spotify grant.
 *
 * Answers the question that was unanswerable when the widget went dark: is the
 * token stored, where did it come from, and when does consent lapse? Never
 * returns the token itself.
 */
export const dynamic = 'force-dynamic'

function authorised(provided: string | null): boolean {
	const expected = process.env.SPOTIFY_REAUTH_SECRET
	if (!expected || !provided) return false
	const a = Buffer.from(provided)
	const b = Buffer.from(expected)
	if (a.length !== b.length) return false
	return timingSafeEqual(a, b)
}

export async function GET(request: NextRequest) {
	if (!authorised(request.nextUrl.searchParams.get('key'))) {
		return new NextResponse('Not found', { status: 404 })
	}

	const state = await readTokenState()
	if (!state) {
		return NextResponse.json({ stored: false }, { status: 200 })
	}

	const remaining = timeUntilExpiry(state)
	const days = remaining === null ? null : Math.round(remaining / (24 * 60 * 60 * 1000))

	return NextResponse.json({
		stored: true,
		// An empty authorizedAt means the token came from the environment
		// variable, so its consent date — and therefore its expiry — is unknown.
		source: state.authorizedAt ? 'store' : 'env',
		authorizedAt: state.authorizedAt || null,
		expiresInDays: days,
		expired: remaining !== null && remaining <= 0,
		lastAlertAt: state.alertedAt ?? null
	})
}
