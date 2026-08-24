import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { siteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ['', '/about', '/contact']

	return routes.flatMap((route) => {
		const languages = Object.fromEntries(
			routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${route}`])
		)

		return routing.locales.map((locale) => ({
			url: `${siteUrl}/${locale}${route}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
			alternates: {
				languages
			}
		}))
	})
}
