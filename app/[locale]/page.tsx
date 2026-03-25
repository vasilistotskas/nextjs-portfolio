import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Card from '@/components/ui/Card'
import GitHubStats from '@/components/ui/GitHubStats'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'common' })

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

export default async function HomePage({ params }: Props) {
	const { locale } = await params
	setRequestLocale(locale)

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
