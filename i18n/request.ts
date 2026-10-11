import { locale as localeParam } from 'next/root-params'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async () => {
	// `locale` is a root param: `app/[locale]` sits above the root layout, so it
	// is readable from any Server Component without threading it through props.
	const requested = await localeParam()

	// Must stay total: this config is also evaluated while rendering Next.js'
	// built-in 404 for paths that never matched a locale, where there is no root
	// param to read. Throwing here would blank that page out. Rejecting invalid
	// locales is the root layout's job, not this one's — see
	// `app/[locale]/layout.tsx`. `hasLocale` narrows to `routing.locales`.
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

	return {
		locale,
		// Dates on the site are Athens calendar dates. Left unset, this would be
		// the server's zone, which on Vercel is UTC.
		timeZone: 'Europe/Athens',
		messages: (await import(`../messages/${locale}.json`)).default
	}
})
