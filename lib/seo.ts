import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { skillGroups } from '@/lib/stack'

type Locale = (typeof routing.locales)[number]

export const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vasilistotskas.com'

export const siteDescription =
	'Fullstack Developer building applications for web, desktop and mobile, and the infrastructure that runs them. Python, Django, Go, Nuxt, Vue, Next.js.'

const OG_IMAGE = '/banner.png'

/** One identity for the person across every page's structured data. */
export const personId = `${siteUrl}/#person`

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

/**
 * The schema.org Person this site is about. The layout puts it in every page's
 * graph and the About page makes it the `mainEntity` of its ProfilePage; both
 * share `personId`, so search engines merge them into one entity.
 */
export async function buildPerson() {
	const t = await getTranslations('common')
	const th = await getTranslations('hero')
	const ta = await getTranslations('about')
	const current = await getLocale()

	// The name as written in the other languages, so `Βασίλης Τότσκας` and
	// `Vasilis Totskas` resolve to the same person whichever one is searched.
	const otherNames = await Promise.all(
		routing.locales
			.filter((locale) => locale !== current)
			.map(async (locale) =>
				(await getTranslations({ locale, namespace: 'common' }))('myName')
			)
	)

	return {
		'@type': 'Person',
		'@id': personId,
		name: t('myName'),
		alternateName: [...otherNames, t('myUserName')],
		url: siteUrl,
		image: `${siteUrl}/avatar.jpg`,
		description: th('metaDescription'),
		jobTitle: 'Full Stack Engineer',
		// Both current: military service runs alongside Advisable.
		worksFor: [
			{ '@type': 'Organization', name: 'Greek Army' },
			{ '@type': 'Organization', name: 'Advisable' }
		],
		alumniOf: { '@type': 'CollegeOrUniversity', name: ta('education.school') },
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Athens',
			addressCountry: 'GR'
		},
		knowsAbout: skillGroups.flatMap((group) =>
			group.skills.filter((skill) => skill.daily).map((skill) => skill.name)
		),
		knowsLanguage: [...routing.locales],
		sameAs: [
			`https://github.com/${t('myUserName')}`,
			`https://linkedin.com/in/${t('myUserName')}`,
			'https://x.com/vasilis_totskas'
		]
	}
}
