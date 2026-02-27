import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vasilistotskas.com'

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ['', '/about', '/contact']
	const entries: MetadataRoute.Sitemap = []

	for (const locale of routing.locales) {
		for (const route of routes) {
			entries.push({
				url: `${baseUrl}/${locale}${route}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: route === '' ? 1 : 0.8
			})
		}
	}

	return entries
}
