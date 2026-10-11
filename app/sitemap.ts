import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { caseStudies } from '@/lib/projects'
import { siteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [
		'',
		'/about',
		'/contact',
		...caseStudies.map((project) => `/projects/${project.key}`)
	]

	return routes.flatMap((route) => {
		const languages = Object.fromEntries(
			routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${route}`])
		)

		// No `lastModified`: Google only trusts it when it is verifiably accurate,
		// and a build timestamp marked every page changed on every deploy. It
		// ignores `changeFrequency` and `priority` outright.
		return routing.locales.map((locale) => ({
			url: `${siteUrl}/${locale}${route}`,
			alternates: {
				languages
			}
		}))
	})
}
