import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { STATE_COOKIE } from '@/app/api/spotify/reauth/route'
import { exchangeCode } from '@/lib/spotify-auth'
import { TOKEN_LIFETIME_MS, writeTokenState } from '@/lib/spotify-store'

/**
 * Where Spotify sends the user back after they press Agree.
 *
 * The registered redirect URI on the Spotify app must be exactly
 * `https://www.vasilistotskas.com/api/spotify/reauth/callback`.
 */
export const dynamic = 'force-dynamic'

function page(title: string, detail: string, ok: boolean): NextResponse {
	// Plain HTML rather than a localised page: this is an operations endpoint
	// with an audience of one, reached perhaps twice a year.
	const body = `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title>
<style>
	body { margin: 0; display: grid; place-items: center; min-height: 100vh;
	       font: 16px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace;
	       background: #0d1117; color: #c9d1d9; padding: 2rem; }
	main { max-width: 34rem }
	h1 { font-size: 1.1rem; color: ${ok ? '#3fb950' : '#f85149'}; margin: 0 0 .75rem }
	p { margin: 0 0 .5rem; color: #8b949e }
</style>
<main><h1>${title}</h1><p>${detail}</p></main>`

	return new NextResponse(body, {
		status: ok ? 200 : 400,
		headers: { 'content-type': 'text/html; charset=utf-8' }
	})
}

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams
	const error = params.get('error')
	const code = params.get('code')
	const state = params.get('state')
	const expectedState = request.cookies.get(STATE_COOKIE)?.value

	const clearCookie = (response: NextResponse) => {
		response.cookies.delete({ name: STATE_COOKIE, path: '/api/spotify' })
		return response
	}

	if (error) {
		return clearCookie(page('Authorisation declined', `Spotify said: ${error}`, false))
	}

	// No cookie means this URL was opened directly rather than reached through
	// /api/spotify/reauth, so there is nothing to trust here.
	if (!expectedState || !state || state !== expectedState) {
		return clearCookie(
			page(
				'State mismatch',
				'Start again from the re-auth link so the request can be verified.',
				false
			)
		)
	}

	if (!code) {
		return clearCookie(page('No authorisation code', 'Spotify returned no code.', false))
	}

	try {
		const refreshToken = await exchangeCode(code)
		const authorizedAt = new Date().toISOString()
		// alertedAt is dropped on purpose: a fresh grant clears any outstanding
		// "expired" or "expiring" notice, so the next one can send immediately.
		await writeTokenState({ refreshToken, authorizedAt })

		const expires = new Date(Date.now() + TOKEN_LIFETIME_MS).toISOString().slice(0, 10)
		return clearCookie(
			page(
				'Spotify reconnected',
				`Stored and live within the minute — no redeploy needed. Good until about ${expires}, when you will get a mail three weeks ahead.`,
				true
			)
		)
	} catch (err) {
		const detail = err instanceof Error ? err.message : String(err)
		console.error(`Spotify re-auth failed: ${detail}`)
		return clearCookie(page('Could not store the token', detail, false))
	}
}
