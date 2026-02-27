import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { MapPin, GraduationCap, Mail, Briefcase, Code, Languages, Award } from 'lucide-react'
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

	const experienceYears = new Date().getFullYear() - 2020

	const highlights = [
		{
			icon: Briefcase,
			text: t('highlights.experience', { years: experienceYears }),
			color: 'text-terminal-green'
		},
		{
			icon: Code,
			text: t('highlights.stack'),
			color: 'text-terminal-cyan'
		},
		{
			icon: Languages,
			text: t('highlights.languages'),
			color: 'text-terminal-yellow'
		},
		{
			icon: Award,
			text: t('highlights.certifications'),
			color: 'text-terminal-purple'
		}
	]

	const stackCategories = [
		{ label: 'Frontend', value: t('sections.stack.frontend') },
		{ label: 'Backend', value: t('sections.stack.backend') },
		{ label: 'DevOps & Infra', value: t('sections.stack.devops') }
	]

	return (
		<div className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-20">
			{/* Header with avatar */}
			<div className="mb-8 md:mb-14 flex flex-col items-start gap-4 md:gap-8 md:flex-row md:items-center">
				{/* Avatar */}
				<div className="relative shrink-0">
					<div className="gradient-border-top relative h-28 w-28 overflow-hidden rounded-2xl md:h-36 md:w-36">
						<Image
							src="/avatar.jpg"
							alt={tc('myName')}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 768px) 112px, 144px"
						/>
					</div>
					{/* Glow behind avatar */}
					<div
						className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-2xl"
						aria-hidden="true"
						style={{
							background: 'linear-gradient(135deg, var(--green), var(--cyan))',
							opacity: 0.08
						}}
					/>
				</div>

				{/* Title & role */}
				<div>
					<p className="text-terminal-comment mb-2 font-mono text-sm">
						{t('subtitle')}
					</p>
					<h1 className="text-terminal-text mb-2 font-sans text-3xl font-bold md:text-4xl">
						{tc('myName')}
					</h1>
					<p className="text-terminal-comment font-sans text-lg">
						{t('role')} {t('companyAt')}{' '}
						<span className="text-terminal-cyan font-medium">{t('company')}</span>
						{' · '}
						<span className="inline-flex items-center gap-1">
							<MapPin size={14} />
							{tc('athensGreece')}
						</span>
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
				{/* Main content */}
				<div className="space-y-8 lg:col-span-2">
					{/* Bio terminal */}
					<Terminal title="README.md">
						<p className="text-terminal-comment">
							<span className="text-terminal-green">$</span> cat bio.txt
						</p>
						<br />
						<div className="space-y-5 leading-relaxed">
							{/* Intro */}
							<p className="text-terminal-text">{t('intro')}</p>

							{/* Current Work */}
							<div>
								<h3 className="text-terminal-cyan mb-1.5 font-semibold">
									{t('sections.work.title')}
								</h3>
								<p className="text-terminal-text">
									{t('sections.work.body')}
								</p>
							</div>

							{/* Projects & Infrastructure */}
							<div>
								<h3 className="text-terminal-cyan mb-1.5 font-semibold">
									{t('sections.projects.title')}
								</h3>
								<p className="text-terminal-text">
									{t('sections.projects.bodyBefore')}{' '}
									<a
										href="https://webside.gr"
										target="_blank"
										rel="noopener noreferrer"
										className="text-terminal-cyan underline decoration-terminal-cyan/30 underline-offset-2 transition-colors hover:decoration-terminal-cyan"
									>
										{t('sections.projects.websideLabel')}
									</a>
									{t('sections.projects.bodyAfter')}
								</p>
							</div>

							{/* Core Tech Stack */}
							<div>
								<h3 className="text-terminal-cyan mb-2.5 font-semibold">
									{t('sections.stack.title')}{' '}
									<span className="text-terminal-green">
										{'<3'} {t('sections.stack.heart')}
									</span>
								</h3>
								<div className="space-y-2.5">
									{stackCategories.map(({ label, value }) => (
										<div key={label}>
											<span className="text-terminal-muted text-xs uppercase tracking-wider">
												{label}:{' '}
											</span>
											<span className="text-terminal-text">{value}</span>
										</div>
									))}
								</div>
							</div>

							{/* AI */}
							<div>
								<h3 className="text-terminal-cyan mb-1.5 font-semibold">
									{t('sections.ai.title')}
								</h3>
								<p className="text-terminal-text">
									{t('sections.ai.body')}
								</p>
							</div>

							{/* Closing */}
							<p className="text-terminal-comment italic">
								{t('closing')}
							</p>
						</div>
					</Terminal>

					{/* Highlights grid */}
					<div className="grid grid-cols-2 gap-3">
						{highlights.map(({ icon: Icon, text, color }) => (
							<Card key={text} hover={false} className="p-4">
								<div className="flex flex-col md:flex-row items-center gap-3">
									<Icon size={16} className={color} />
									<span className="text-terminal-text font-sans text-sm">
										{text}
									</span>
								</div>
							</Card>
						))}
					</div>

					{/* Info cards */}
					<Card>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<Mail size={14} className="text-terminal-cyan" />
								<a
									href={`mailto:${tc('myEmail')}`}
									className="text-terminal-text hover:text-terminal-cyan font-sans text-sm transition-colors"
								>
									{tc('myEmail')}
								</a>
							</div>
							<div className="flex items-center gap-3">
								<GraduationCap size={14} className="text-terminal-cyan" />
								<span className="text-terminal-text font-sans text-sm">
									{t('education.degree')} — {t('education.school')} (
									{t('education.year')})
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Award size={14} className="text-terminal-cyan" />
								<span className="text-terminal-text font-sans text-sm">
									{t('certifications.google')}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Award size={14} className="text-terminal-cyan" />
								<span className="text-terminal-text font-sans text-sm">
									{t('certifications.testdome')}
								</span>
							</div>
						</div>
					</Card>

					{/* GitHub Stats */}
					<Card>
						<h2 className="text-terminal-text mb-4 font-sans text-sm font-semibold">
							{t('github.title')}
						</h2>
						<GitHubStats />
					</Card>
				</div>

				{/* Spotify sidebar */}
				<div className="space-y-6">
					<Card>
						<h2 className="text-terminal-text mb-4 font-sans text-sm font-semibold">
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
