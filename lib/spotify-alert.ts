import { Resend } from 'resend'
import { siteUrl } from '@/lib/seo'
import type { TokenState } from '@/lib/spotify-store'
import { markAlerted, timeUntilExpiry } from '@/lib/spotify-store'

/**
 * Tell someone when the Spotify grant needs renewing.
 *
 * Before this, an expired token only ever produced a `console.error` on a
 * serverless function nobody reads, so the widget sat broken for a week. The
 * refresh path runs on every NowPlaying poll, which makes it the natural place
 * to notice both cases: the grant is about to lapse, or it already has.
 */
const DAY_MS = 24 * 60 * 60 * 1000

/** Start nagging three weeks out — enough slack for a holiday. */
export const EXPIRY_WARNING_MS = 21 * DAY_MS

/** One mail a day at most while broken; one a week while merely expiring. */
const RESEND_AFTER: Record<AlertKind, number> = {
	broken: DAY_MS,
	expiring: 7 * DAY_MS
}

type AlertKind = 'broken' | 'expiring'

/**
 * The re-auth link carries its own key so the mail is a single tap. That is
 * safe to put in an inbox: the key only opens Spotify's consent screen, which
 * still demands the account password and an explicit Agree. It grants nothing
 * on its own.
 */
function reauthLink(): string {
	const secret = process.env.SPOTIFY_REAUTH_SECRET
	const base = `${siteUrl}/api/spotify/reauth`
	return secret ? `${base}?key=${encodeURIComponent(secret)}` : base
}

function body(kind: AlertKind, state: TokenState, reason?: string): string {
	const link = reauthLink()
	if (kind === 'broken') {
		return [
			'The Spotify grant is no longer usable, so now-playing and top-tracks are empty on the site.',
			'',
			`Reason given by Spotify: ${reason ?? 'unknown'}`,
			'',
			`Re-authorise here, then press Agree: ${link}`,
			'',
			'Nothing else to do afterwards — the new token is picked up within a minute, no redeploy.'
		].join('\n')
	}

	const remaining = timeUntilExpiry(state)
	const days = remaining === null ? null : Math.max(0, Math.round(remaining / DAY_MS))
	return [
		`The Spotify grant expires in about ${days ?? '?'} days and refreshing it does not extend the six-month lifetime.`,
		'',
		`Re-authorise now to start a fresh six months: ${link}`,
		'',
		'Takes one tap. Doing it early costs nothing; the clock restarts from the new consent.'
	].join('\n')
}

/**
 * Send an alert unless one went out recently.
 *
 * Deduplication has to be shared state rather than a module variable — every
 * warm serverless instance runs this code and would otherwise mail
 * independently — so the timestamp lives in the token store next to the token.
 */
export async function alertOnce(
	kind: AlertKind,
	state: TokenState,
	reason?: string
): Promise<void> {
	const apiKey = process.env.RESEND_API_KEY
	const to = process.env.CONTACT_EMAIL
	if (!apiKey || !to) return

	if (state.alertedAt) {
		const since = Date.now() - Date.parse(state.alertedAt)
		if (Number.isFinite(since) && since < RESEND_AFTER[kind]) return
	}

	const subject =
		kind === 'broken'
			? 'Spotify grant expired — portfolio widget is dark'
			: 'Spotify grant expires soon'

	try {
		// Claim the slot first. A send that fails is better than two instances
		// both deciding to mail because neither had written the timestamp yet.
		await markAlerted(state)
		const resend = new Resend(apiKey)
		const { error } = await resend.emails.send({
			from: 'Portfolio <onboarding@resend.dev>',
			to,
			subject,
			text: body(kind, state, reason)
		})
		if (error) console.error('Spotify alert mail failed:', error)
	} catch (err) {
		console.error(
			`Spotify alert could not be sent: ${err instanceof Error ? err.message : String(err)}`
		)
	}
}
