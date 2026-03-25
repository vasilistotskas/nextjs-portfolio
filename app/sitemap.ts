import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vasilistotskas.com'

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ['', '/about', '/contact']

	return routes.flatMap((route) => {
		const languages = Object.fromEntries(
			routing.locales.map((locale) => [locale, `${baseUrl}/${locale}${route}`])
		)

		return routing.locales.map((locale) => ({
			url: `${baseUrl}/${locale}${route}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: route === '' ? 1 : 0.8,
			alternates: {
				languages
			}
		}))
	})
}
