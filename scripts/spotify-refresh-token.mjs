/**
 * Mint a new Spotify refresh token.
 *
 * Spotify refresh tokens issued through the developer dashboard last 180 days,
 * and refreshing an access token does *not* extend that lifetime — after six
 * months re-authorisation is the only option:
 * https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
 *
 * Prefer /api/spotify/reauth on the live site: it stores the new token where the
 * running deployment reads it, so nothing has to be redeployed, and it works
 * from a phone. This script is the local fallback — for seeding a fresh
 * checkout, or for when the Blob store is unavailable.
 *
 *   node scripts/spotify-refresh-token.mjs
 *
 * It reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET from .env, captures the
 * authorisation code on the loopback redirect URI registered on the app, and
 * writes the new SPOTIFY_REFRESH_TOKEN straight back into .env.
 *
 * If VERCEL_TOKEN and VERCEL_ORG_ID are also set in .env it pushes the value to
 * the Vercel project too, so the whole rotation is one command. Without them it
 * says so and you paste it in by hand.
 *
 * The token is never printed, so it cannot end up in your scrollback.
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ENV_PATH = join(ROOT, '.env')

// Must match a Redirect URI registered on the app exactly. Loopback HTTP is the
// one case Spotify permits without TLS.
const REDIRECT_URI = 'http://127.0.0.1:3000/callback'
const PORT = 3000

const SCOPES = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-top-read'
].join(' ')

function readEnv() {
	const raw = readFileSync(ENV_PATH, 'utf8')
	const entries = raw
		.split(/\r?\n/)
		.filter((line) => /^\s*[A-Z_][A-Z0-9_]*\s*=/.test(line))
		.map((line) => {
			const i = line.indexOf('=')
			const key = line.slice(0, i).trim()
			const value = line
				.slice(i + 1)
				.trim()
				.replace(/^["']|["']$/g, '')
			return [key, value]
		})
	return { raw, env: Object.fromEntries(entries) }
}

/** Replace the value in place, preserving the rest of the file byte for byte. */
function writeRefreshToken(raw, token) {
	const line = `SPOTIFY_REFRESH_TOKEN=${token}`
	const next = /^\s*SPOTIFY_REFRESH_TOKEN\s*=.*$/m.test(raw)
		? raw.replace(/^\s*SPOTIFY_REFRESH_TOKEN\s*=.*$/m, line)
		: `${raw.replace(/\s*$/, '')}\n${line}\n`
	writeFileSync(ENV_PATH, next)
}

const { raw, env } = readEnv()
const clientId = env.SPOTIFY_CLIENT_ID
const clientSecret = env.SPOTIFY_CLIENT_SECRET

if (!clientId || !clientSecret) {
	console.error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env first.')
	console.error('Both are on the app page: https://developer.spotify.com/dashboard')
	process.exit(1)
}

/**
 * Check the id/secret pair before sending anyone to Spotify. The authorize page
 * only reports "client_id: Invalid" and gives no hint about which half is
 * wrong, so verify here with a client-credentials grant, which needs no user.
 */
async function preflight() {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({ grant_type: 'client_credentials' })
	})
	if (res.ok) return
	const body = await res.json().catch(() => ({}))
	console.error('')
	console.error(`Spotify rejected the credentials in .env: ${body.error ?? res.status}`)
	console.error(`  SPOTIFY_CLIENT_ID     = ${clientId}`)
	console.error(`  SPOTIFY_CLIENT_SECRET = ${clientSecret.length} characters`)
	console.error('')
	console.error('Check both against the app page — Client ID and "View client secret":')
	console.error('  https://developer.spotify.com/dashboard')
	console.error(
		'Rotating a secret invalidates the old one at once, so .env needs the new value.'
	)
	process.exit(1)
}

await preflight()

const state = Math.random().toString(36).slice(2)
const authorizeUrl =
	'https://accounts.spotify.com/authorize?' +
	new URLSearchParams({
		client_id: clientId,
		response_type: 'code',
		redirect_uri: REDIRECT_URI,
		scope: SCOPES,
		state,
		// Force the consent screen so a stale session cannot silently reuse an
		// authorisation you are trying to replace.
		show_dialog: 'true'
	}).toString()

const exchange = async (code) => {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: REDIRECT_URI
		})
	})
	const body = await res.json().catch(() => ({}))
	if (!res.ok || !body.refresh_token) {
		throw new Error(
			`token exchange failed (${res.status}): ${body.error ?? 'unknown'}` +
				(body.error_description ? ` — ${body.error_description}` : '')
		)
	}
	return body.refresh_token
}

/**
 * Replace the value on Vercel as well, when a token is available. Vercel keeps
 * one row per environment, so every existing row is removed before the new
 * value is created for all three.
 */
async function pushToVercel(token) {
	const vercelToken = env.VERCEL_TOKEN
	const teamId = env.VERCEL_ORG_ID
	if (!vercelToken) return { skipped: 'VERCEL_TOKEN is not set in .env' }

	const base = 'https://api.vercel.com'
	const project = 'nextjs-portfolio'
	const team = teamId ? `?teamId=${teamId}` : ''
	const auth = { Authorization: `Bearer ${vercelToken}` }

	const listed = await fetch(`${base}/v9/projects/${project}/env${team}`, {
		headers: auth
	})
	if (!listed.ok) return { failed: `list failed (${listed.status})` }
	const existing = (await listed.json()).envs.filter(
		(e) => e.key === 'SPOTIFY_REFRESH_TOKEN'
	)

	for (const row of existing) {
		const del = await fetch(`${base}/v9/projects/${project}/env/${row.id}${team}`, {
			method: 'DELETE',
			headers: auth
		})
		if (!del.ok) return { failed: `delete failed (${del.status})` }
	}

	const created = await fetch(`${base}/v10/projects/${project}/env${team}`, {
		method: 'POST',
		headers: { ...auth, 'content-type': 'application/json' },
		body: JSON.stringify([
			{
				key: 'SPOTIFY_REFRESH_TOKEN',
				value: token,
				type: 'sensitive',
				target: ['production', 'preview', 'development']
			}
		])
	})
	if (!created.ok) return { failed: `create failed (${created.status})` }
	return { pushed: true, replaced: existing.length }
}

const server = createServer(async (req, res) => {
	const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
	if (url.pathname !== '/callback') {
		res.writeHead(404).end('not here')
		return
	}

	const error = url.searchParams.get('error')
	const code = url.searchParams.get('code')

	if (error || !code) {
		res
			.writeHead(400, { 'content-type': 'text/plain' })
			.end(`Authorisation failed: ${error ?? 'no code'}`)
		console.error(`\nAuthorisation failed: ${error ?? 'no code returned'}`)
		server.close()
		process.exitCode = 1
		return
	}

	if (url.searchParams.get('state') !== state) {
		res.writeHead(400, { 'content-type': 'text/plain' }).end('State mismatch.')
		console.error('\nState mismatch — ignoring this response.')
		server.close()
		process.exitCode = 1
		return
	}

	try {
		const token = await exchange(code)
		writeRefreshToken(raw, token)
		res
			.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
			.end(
				'<p style="font:16px system-ui">Done. The new refresh token is in .env — you can close this tab.</p>'
			)
		console.log(`\n✓ SPOTIFY_REFRESH_TOKEN written to .env (${token.length} characters).`)
		console.log('  Not printed here on purpose.')

		const vercel = await pushToVercel(token)
		if (vercel.pushed) {
			console.log(
				`✓ Pushed to Vercel for all three environments (replaced ${vercel.replaced}).`
			)
			console.log(
				'  Redeploy for it to take effect: push to master, or re-run the CI job.'
			)
		} else if (vercel.skipped) {
			console.log(`· Vercel not updated: ${vercel.skipped}`)
			console.log('  Copy the value from .env into the Vercel variable, then redeploy.')
		} else {
			console.log(`✗ Vercel update failed: ${vercel.failed}`)
			console.log('  The value is safe in .env — copy it across by hand.')
		}

		console.log(
			'\n  Valid for 180 days — around',
			new Date(Date.now() + 180 * 864e5).toISOString().slice(0, 10)
		)
	} catch (e) {
		res.writeHead(500, { 'content-type': 'text/plain' }).end(String(e.message))
		console.error(`\n${e.message}`)
		process.exitCode = 1
	}
	server.close()
})

server.on('error', (e) => {
	if (e.code === 'EADDRINUSE') {
		console.error(
			`Port ${PORT} is busy — the redirect URI registered on the app needs it.`
		)
		console.error('Stop whatever is on port 3000 and run this again.')
	} else {
		console.error(String(e.message))
	}
	process.exitCode = 1
})

server.listen(PORT, '127.0.0.1', () => {
	console.log('Open this once, then press Agree:\n')
	console.log(authorizeUrl)
	console.log(`\nWaiting for the redirect on ${REDIRECT_URI} …`)
})
