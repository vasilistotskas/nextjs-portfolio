import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import GitHubStats from '@/components/ui/GitHubStats'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('common')
	const th = await getTranslations('hero')

	return buildPageMetadata({
		title: `${t('myName')} — Fullstack Developer`,
		// Not the hero line: that one is short and first-person, which reads well
		// under the name and badly as a search result.
		description: th('metaDescription')
	})
}

export default function HomePage() {
	return (
		<>
			<Hero />
			<div className="section-divider" />
			<Skills />
			<div className="section-divider" />
			<Projects />
			<div className="section-divider" />
			<Experience />
			{/* Brings its own divider and heading, so it can disappear whole when
			    GitHub rate-limits an unauthenticated request. */}
			<GitHubStats />
		</>
	)
}
