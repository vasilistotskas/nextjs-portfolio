import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFormatter, getLocale, getTranslations } from 'next-intl/server'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import BrowserFrame from '@/components/ui/BrowserFrame'
import ProjectLinks from '@/components/ui/ProjectLinks'
import { buildPageMetadata } from '@/lib/seo'
import { maskToLayers, projectLayers } from '@/lib/stack'
import { caseStudies, findProject, formatMetrics, shotSrc } from '@/lib/projects'
import type { Metrics, Project } from '@/lib/projects'

// Only the projects that have a case study exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
	return caseStudies.map((project) => ({ slug: project.key }))
}

async function resolve(params: PageProps<'/[locale]/projects/[slug]'>['params']) {
	const { slug } = await params
	const project = findProject(slug)

	if (!project?.caseStudy) {
		notFound()
	}

	return project
}

export async function generateMetadata({
	params
}: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
	const project = await resolve(params)
	const t = await getTranslations('caseStudy')

	return buildPageMetadata({
		path: `/projects/${project.key}`,
		title: t(`items.${project.key}.title`),
		description: t(`items.${project.key}.summary`)
	})
}

async function MetricTiles({ metrics }: { metrics: Metrics }) {
	const t = await getTranslations('caseStudy.metrics')
	const values = formatMetrics(await getFormatter(), metrics)

	const tiles = [
		{ label: t('orders'), value: t('ordersValue', { value: values.orders }) },
		{ label: t('revenue'), value: t('revenueValue', { value: values.revenue }) },
		{ label: t('since'), value: values.since }
	]

	return (
		<section className="mt-10">
			<dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				{tiles.map(({ label, value }) => (
					<div key={label} className="glass terminal-border rounded-lg p-4">
						<dt className="text-terminal-muted font-mono text-[11px]">{label}</dt>
						<dd className="text-terminal-text m-0 mt-1 font-sans text-2xl font-semibold tabular-nums">
							{value}
						</dd>
					</div>
				))}
			</dl>
			<p className="text-terminal-muted mt-3 font-sans text-xs">{t('note')}</p>
		</section>
	)
}

async function Gallery({ project }: { project: Project }) {
	const t = await getTranslations('caseStudy')
	const [, ...shots] = project.shots
	const desktop = shots.filter((shot) => shot.viewport === 'desktop')
	const mobile = shots.filter((shot) => shot.viewport === 'mobile')

	return (
		<section className="mt-14">
			<h2 className="text-terminal-text mb-6 font-sans text-xl font-semibold">
				{t('gallery')}
			</h2>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_auto]">
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					{desktop.map((shot) => (
						<a
							key={shot.name}
							href={shotSrc(project.key, shot)}
							target="_blank"
							rel="noopener noreferrer"
							className="card-hover block min-w-0 rounded-lg"
						>
							<BrowserFrame
								host={`${project.host}${shot.path === '/' ? '' : shot.path}`}
								src={shotSrc(project.key, shot)}
								alt={t(`shots.${shot.name}`)}
								sizes="(max-width: 640px) 100vw, 360px"
							/>
						</a>
					))}
				</div>
				{mobile.map((shot) => (
					<a
						key={shot.name}
						href={shotSrc(project.key, shot)}
						target="_blank"
						rel="noopener noreferrer"
						className="terminal-border card-hover relative mx-auto block aspect-[390/844] w-56 overflow-hidden rounded-[1.75rem] md:w-48"
					>
						<Image
							src={shotSrc(project.key, shot)}
							alt={t(`shots.${shot.name}`)}
							fill
							className="object-cover object-top"
							sizes="224px"
						/>
					</a>
				))}
			</div>
		</section>
	)
}

export default async function CaseStudyPage({
	params
}: PageProps<'/[locale]/projects/[slug]'>) {
	const project = await resolve(params)
	const locale = await getLocale()
	const t = await getTranslations('caseStudy')
	const tp = await getTranslations('projects')
	const ts = await getTranslations('stack')

	const others = caseStudies.filter((other) => other.key !== project.key)

	return (
		<article className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-16">
			<Link
				href={`/${locale}/projects`}
				className="text-terminal-muted hover:text-terminal-green inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
			>
				<ArrowLeft size={12} />
				{t('back')}
			</Link>

			<header className="mt-6">
				<p className="text-terminal-green font-mono text-xs">
					{project.status === 'live' ? tp('status.live') : tp('status.oss')}
				</p>
				<h1 className="text-terminal-text mt-2 font-sans text-3xl font-semibold tracking-tight md:text-4xl">
					{t(`items.${project.key}.title`)}
				</h1>
				<p className="text-terminal-comment mt-4 max-w-[65ch] font-sans text-base leading-relaxed">
					{t(`items.${project.key}.summary`)}
				</p>
				<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
					<ProjectLinks project={project} />
				</div>
			</header>

			{project.metrics && <MetricTiles metrics={project.metrics} />}

			<div className="mt-10">
				<BrowserFrame
					host={project.host}
					src={shotSrc(project.key, project.shots[0])}
					alt={t(`shots.${project.shots[0].name}`)}
					sizes="(max-width: 1024px) 100vw, 976px"
					priority
				/>
			</div>

			<div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
				<div className="space-y-10">
					{project.sections.map((section) => (
						<section key={section}>
							<h2 className="text-terminal-text mb-3 font-sans text-xl font-semibold">
								{t(`items.${project.key}.sections.${section}.title`)}
							</h2>
							<p className="text-terminal-comment font-sans text-sm leading-relaxed whitespace-pre-line">
								{t(`items.${project.key}.sections.${section}.body`)}
							</p>
						</section>
					))}
				</div>

				<aside>
					<h2 className="text-terminal-muted mb-3 font-mono text-xs">{t('layers')}</h2>
					<ul className="m-0 flex list-none flex-wrap gap-2 p-0">
						{maskToLayers(projectLayers[project.key]).map((layer) => (
							<li
								key={layer}
								className="terminal-border text-terminal-text rounded-sm px-2 py-1 font-mono text-[11px]"
							>
								{ts(`layers.${layer}`)}
							</li>
						))}
					</ul>
					<p className="text-terminal-muted mt-4 font-mono text-[11px] leading-relaxed">
						{t(`items.${project.key}.stack`)}
					</p>
				</aside>
			</div>

			<Gallery project={project} />

			<nav className="border-terminal-border mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
				{others.map((other) => (
					<Link
						key={other.key}
						href={`/${locale}/projects/${other.key}`}
						className="text-terminal-comment hover:text-terminal-green inline-flex items-center gap-1.5 font-sans text-sm transition-colors"
					>
						{t('next', { name: tp(`items.${other.key}.name`) })}
						<ArrowRight size={14} />
					</Link>
				))}
				<Link
					href={`/${locale}/contact`}
					className="text-terminal-green inline-flex items-center gap-1.5 font-sans text-sm hover:underline"
				>
					{t('contact')}
					<ArrowRight size={14} />
				</Link>
			</nav>
		</article>
	)
}
