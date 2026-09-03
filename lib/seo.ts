import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'

type Locale = (typeof routing.locales)[number]

export const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vasilistotskas.com'

export const siteDescription =
	'Fullstack Developer building applications for web, desktop and mobile, and the infrastructure that runs them. Python, Django, Go, Nuxt, Vue, Next.js.'

const OG_IMAGE = '/banner.png'

/** BCP-47-ish Open Graph locale identifiers, keyed by app locale. */
const OG_LOCALES: Record<Locale, string> = {
	en: 'en_US',
	el: 'el_GR'
}

/** The app locales a page is *not* currently rendered in. */
const otherLocales = (locale: Locale) => routing.locales.filter((l) => l !== locale)

type PageMetadataOptions = {
	/** Route path below the locale segment — `''` for home, `'/about'`, … */
	path?: string
	title: string
	description: string
}

/**
 * Build the complete per-page metadata.
 *
 * Next.js merges metadata between segments **shallowly**, so a page that sets
 * any `openGraph`/`twitter` key replaces the parent object wholesale rather
 * than merging into it. Pages previously set only `openGraph.url`, which
 * silently dropped `og:image`, `og:type`, `og:site_name` and `og:locale` from
 * every page. Every page therefore has to emit these objects in full — this
 * helper is the single place that knows how.
 */
export async function buildPageMetadata({
	path = '',
	title,
	description
}: PageMetadataOptions): Promise<Metadata> {
	const current = await getLocale()
	const locale: Locale = hasLocale(routing.locales, current)
		? current
		: routing.defaultLocale
	const t = await getTranslations('common')

	const myName = t('myName')
	const url = `/${locale}${path}`
	const image = { url: OG_IMAGE, alt: `${myName} — Fullstack Developer Portfolio` }

	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: {
				...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
				'x-default': `/${routing.defaultLocale}${path}`
			}
		},
		openGraph: {
			type: 'website',
			locale: OG_LOCALES[locale],
			alternateLocale: otherLocales(locale).map((l) => OG_LOCALES[l]),
			url,
			siteName: `${myName} Portfolio`,
			title,
			description,
			images: [image]
		},
		twitter: {
			card: 'summary_large_image',
			creator: `@${t('myUserName')}`,
			title,
			description,
			images: [image]
		}
	}
}
