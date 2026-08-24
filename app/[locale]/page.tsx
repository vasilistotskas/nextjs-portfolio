import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Card from '@/components/ui/Card'
import GitHubStats from '@/components/ui/GitHubStats'

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale()
	const t = await getTranslations('common')

	return {
		title: `${t('myName')} — Fullstack Developer`,
		description:
			'Fullstack Developer focused on Nuxt, Python, and Kubernetes/Docker. Building high-performance web apps & scalable infrastructure.',
		alternates: {
			canonical: `/${locale}`,
			languages: {
				en: '/en',
				el: '/el',
				'x-default': '/en'
			}
		},
		openGraph: {
			url: `/${locale}`
		}
	}
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
			<div className="section-divider" />

			{/* GitHub Stats section */}
			<section className="px-6 pb-20">
				<div className="mx-auto max-w-5xl">
					<Card>
						<GitHubStats />
					</Card>
				</div>
			</section>
		</>
	)
}
