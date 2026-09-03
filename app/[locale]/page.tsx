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

export default async function HomePage() {
	const t = await getTranslations('github')

	return (
		<>
			<Hero />
			<div className="section-divider" />
			<Skills />
			<div className="section-divider" />
			<Projects />
			<div className="section-divider" />
			<Experience />
			<div className="section-divider" />

			<section className="px-4 py-14 md:px-6 md:py-20">
				<div className="mx-auto max-w-5xl">
					<h2 className="text-terminal-text mb-8 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
						{t('title')}
					</h2>
					<GitHubStats />
				</div>
			</section>
		</>
	)
}
