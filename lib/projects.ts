/**
 * Every project the site shows: the cards, the case-study pages, the command
 * palette and the screenshot script (`pnpm screenshots`) all read this list.
 *
 * Kept free of runtime imports so Node can load it directly, without the
 * bundler or the `@/` alias, when the screenshot script runs.
 */
import type { useFormatter } from 'next-intl'
import type { ProjectKey } from './stack'

export type Repo = { url: string; label: string }

export type Viewport = 'desktop' | 'mobile'

/** One screenshot, taken from `path` on the project's live site. */
export type Shot = { name: string; path: string; viewport: Viewport }

/**
 * Production figures as round lower bounds, not exact counts: they stay true
 * while the store keeps trading, and the exact numbers are not for publishing.
 */
export type Metrics = {
	since: string
	orders: number
	revenueEur: number
}

export type Project = {
	key: ProjectKey
	/** What the browser frame shows in its address bar. */
	host: string
	live: string
	repos: Repo[]
	docs: string | null
	status: 'live' | 'oss'
	/** Whether the project has its own page under `/projects/[key]`. */
	caseStudy: boolean
	/** Case-study sections, in order; their text is in `caseStudy.items.<key>`. */
	sections: readonly string[]
	/** The first shot is the cover image on the card. */
	shots: Shot[]
	metrics: Metrics | null
}

export const viewports: Record<
	Viewport,
	{ width: number; height: number; scale: number }
> = {
	desktop: { width: 1440, height: 900, scale: 1 },
	mobile: { width: 390, height: 844, scale: 2 }
}

export const shotSrc = (key: ProjectKey, shot: Shot) =>
	`/projects/${key}/${shot.name}.png`

/**
 * Ordered by what is most worth looking at, not by what is newest. The site you
 * are reading comes last on purpose.
 */
export const projects: readonly Project[] = [
	{
		key: 'webside',
		host: 'webside.gr',
		live: 'https://webside.gr',
		repos: [],
		docs: null,
		status: 'live',
		caseStudy: true,
		sections: ['store', 'platform', 'operations'],
		shots: [
			{ name: 'home', path: '/', viewport: 'desktop' },
			{
				name: 'product',
				path: '/products/2/mini-powerbank-5000mah',
				viewport: 'desktop'
			},
			{ name: 'blog', path: '/blog', viewport: 'desktop' },
			{ name: 'mobile', path: '/', viewport: 'mobile' }
		],
		// Orders that were neither cancelled nor returned, rounded down. January
		// to April were test orders of a euro or two, so trading starts in May.
		// Last read from the production database on 2026-10-11.
		metrics: {
			since: '2026-05-01',
			orders: 250,
			revenueEur: 7000
		}
	},
	{
		key: 'ekfyseosfyteias',
		host: 'ekfyseosfyteias.com',
		live: 'https://ekfyseosfyteias.com',
		repos: [],
		docs: null,
		status: 'live',
		caseStudy: true,
		sections: ['site', 'platform', 'move'],
		shots: [
			{ name: 'home', path: '/', viewport: 'desktop' },
			{ name: 'cellar', path: '/kelari', viewport: 'desktop' },
			{ name: 'about', path: '/poies-eimaste', viewport: 'desktop' },
			{ name: 'blog', path: '/blog', viewport: 'desktop' },
			{ name: 'mobile', path: '/', viewport: 'mobile' }
		],
		metrics: null
	},
	{
		key: 'grooveshop',
		host: 'demo.grooveshop.space',
		live: 'https://demo.grooveshop.space',
		repos: [
			{ url: 'https://github.com/vasilistotskas/grooveshop-django-api', label: 'API' },
			{
				url: 'https://github.com/vasilistotskas/grooveshop-storefront-ui-node-nuxt',
				label: 'Storefront'
			},
			{
				url: 'https://github.com/vasilistotskas/grooveshop-media-stream',
				label: 'Media'
			},
			{
				url: 'https://github.com/vasilistotskas/grooveshop-agent-gateway',
				label: 'Agent gateway'
			}
		],
		docs: 'https://docs.grooveshop.space',
		status: 'oss',
		caseStudy: true,
		sections: ['platform', 'commerce', 'agents', 'services'],
		shots: [
			{ name: 'home', path: '/', viewport: 'desktop' },
			{ name: 'product', path: '/products/43/demo-powerbank-20k', viewport: 'desktop' },
			{ name: 'loyalty', path: '/loyalty-program', viewport: 'desktop' },
			{ name: 'gift-cards', path: '/gift-cards', viewport: 'desktop' },
			{ name: 'mobile', path: '/', viewport: 'mobile' }
		],
		metrics: null
	},
	{
		key: 'portfolio',
		host: 'vasilistotskas.com',
		live: 'https://www.vasilistotskas.com',
		repos: [
			{ url: 'https://github.com/vasilistotskas/nextjs-portfolio', label: 'Source' }
		],
		docs: null,
		status: 'live',
		caseStudy: false,
		sections: [],
		shots: [{ name: 'home', path: '/en', viewport: 'desktop' }],
		metrics: null
	}
]

/**
 * The metrics as numbers in the formatter's locale. The messages add the `+`
 * and the currency sign, whose placement differs between languages.
 */
export function formatMetrics(format: ReturnType<typeof useFormatter>, metrics: Metrics) {
	return {
		orders: format.number(metrics.orders),
		revenue: format.number(metrics.revenueEur),
		since: format.dateTime(new Date(metrics.since), { month: 'short', year: 'numeric' })
	}
}

export const caseStudies = projects.filter((project) => project.caseStudy)

export const findProject = (key: string) =>
	projects.find((project) => project.key === key)
