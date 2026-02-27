import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { MapPin, GraduationCap, Mail } from 'lucide-react'
import Terminal from '@/components/ui/Terminal'
import Card from '@/components/ui/Card'
import GitHubStats from '@/components/ui/GitHubStats'
import TopTracks from '@/components/ui/TopTracks'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'about' })
	const tc = await getTranslations({ locale, namespace: 'common' })

	return {
		title: t('title'),
		description: `${tc('myName')} — ${t('title')}`
	}
}

function AboutContent() {
	const t = useTranslations('about')
	const tc = useTranslations('common')

	return (
		<div className="mx-auto max-w-5xl px-6 py-20">
			{/* Header */}
			<div className="mb-12">
				<p className="text-terminal-comment mb-2 font-mono text-sm">{t('subtitle')}</p>
				<h1 className="text-terminal-text font-mono text-3xl font-bold md:text-4xl">
					{t('title')}
				</h1>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Main content */}
				<div className="space-y-8 lg:col-span-2">
					{/* Bio */}
					<Terminal title="README.md">
						<p className="text-terminal-comment">
							<span className="text-terminal-green">$</span> cat bio.txt
						</p>
						<br />
						<p className="text-terminal-text leading-relaxed">{t('bio')}</p>
					</Terminal>

					{/* Info */}
					<Card>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<Mail size={14} className="text-terminal-cyan" />
								<a
									href={`mailto:${tc('myEmail')}`}
									className="text-terminal-text hover:text-terminal-cyan font-mono text-sm"
								>
									{tc('myEmail')}
								</a>
							</div>
							<div className="flex items-center gap-3">
								<MapPin size={14} className="text-terminal-cyan" />
								<span className="text-terminal-text font-mono text-sm">
									{tc('athensGreece')}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<GraduationCap size={14} className="text-terminal-cyan" />
								<span className="text-terminal-text font-mono text-sm">
									{t('education.degree')} — {t('education.school')} ({t('education.year')}
									)
								</span>
							</div>
						</div>
					</Card>

					{/* GitHub Stats */}
					<Card>
						<h2 className="text-terminal-text mb-4 font-mono text-sm font-semibold">
							{t('github.title')}
						</h2>
						<GitHubStats />
					</Card>
				</div>

				{/* Spotify sidebar */}
				<div className="space-y-6">
					<Card>
						<h2 className="text-terminal-text mb-4 font-mono text-sm font-semibold">
							{t('spotify.title')}
						</h2>
						<TopTracks />
					</Card>
				</div>
			</div>
		</div>
	)
}

export default async function AboutPage({ params }: Props) {
	const { locale } = await params
	setRequestLocale(locale)

	return <AboutContent />
}
