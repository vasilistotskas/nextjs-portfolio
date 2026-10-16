import Link from 'next/link'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import BrowserFrame from '@/components/ui/BrowserFrame'
import ProjectLinks from '@/components/ui/ProjectLinks'
import { maskToLayers, projectLayers } from '@/lib/stack'
import { formatMetrics, shotSrc } from '@/lib/projects'
import type { Project } from '@/lib/projects'

function Status({ project }: { project: Project }) {
	const t = useTranslations('projects')
	const live = project.status === 'live'

	return (
		<div className="mb-2 flex items-center gap-2 font-mono text-[10px]">
			<span
				className={
					live
						? 'bg-terminal-green h-1.5 w-1.5 rounded-full'
						: 'bg-terminal-muted h-1.5 w-1.5 rounded-full'
				}
			/>
			<span className={live ? 'text-terminal-green' : 'text-terminal-muted'}>
				{live ? t('status.live') : t('status.oss')}
			</span>
		</div>
	)
}

function Footer({ project }: { project: Project }) {
	const t = useTranslations('projects')
	const locale = useLocale()

	return (
		<div className="border-terminal-border mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4">
			{project.caseStudy && (
				<Link
					href={`/${locale}/projects/${project.key}`}
					className="text-terminal-green flex items-center gap-1.5 font-mono text-xs hover:underline"
				>
					{t('caseStudy')}
					<ArrowRight size={12} />
				</Link>
			)}
			<ProjectLinks project={project} />
		</div>
	)
}

function Title({ project, className }: { project: Project; className: string }) {
	const t = useTranslations('projects')
	const locale = useLocale()
	const name = t(`items.${project.key}.name`)

	return (
		<h3 className={className}>
			{project.caseStudy ? (
				<Link
					href={`/${locale}/projects/${project.key}`}
					className="hover:text-terminal-green transition-colors"
				>
					{name}
				</Link>
			) : (
				name
			)}
		</h3>
	)
}

/**
 * One project, as the home page, its carousel and the `/projects` index all
 * show it. `featured` lays the screenshot beside the text; `card` stacks them.
 */
export default function ProjectCard({
	project,
	variant = 'card',
	priority
}: {
	project: Project
	variant?: 'featured' | 'card'
	priority?: boolean
}) {
	const t = useTranslations('projects')
	const ts = useTranslations('stack')
	const format = useFormatter()
	const featured = variant === 'featured'

	// Descriptions may quote the production figures.
	const description = t(
		`items.${project.key}.description`,
		project.metrics ? formatMetrics(format, project.metrics) : undefined
	)
	const layers = maskToLayers(projectLayers[project.key])
		.map((layer) => ts(`layers.${layer}`))
		.join(' / ')

	const frame = (
		<BrowserFrame
			host={project.host}
			src={shotSrc(project.key, project.shots[0])}
			sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
			priority={priority}
		/>
	)

	if (featured) {
		return (
			<article className="glass terminal-border card-hover overflow-hidden rounded-lg p-4 md:p-6">
				<div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-8">
					{frame}
					<div className="min-w-0">
						<Status project={project} />
						<Title
							project={project}
							className="text-terminal-text font-sans text-xl font-semibold"
						/>
						<p className="text-terminal-comment mt-3 font-sans text-sm leading-relaxed">
							{description}
						</p>
						<p className="text-terminal-muted mt-4 font-mono text-[11px]">{layers}</p>
						<Footer project={project} />
					</div>
				</div>
			</article>
		)
	}

	return (
		<article className="glass terminal-border card-hover flex h-full flex-col overflow-hidden rounded-lg p-4 md:p-6">
			{frame}
			<div className="mt-5 flex flex-1 flex-col">
				<Status project={project} />
				<Title
					project={project}
					className="text-terminal-text font-sans text-lg font-semibold"
				/>
				<p className="text-terminal-comment mt-2 flex-1 font-sans text-sm leading-relaxed">
					{description}
				</p>
				<p className="text-terminal-muted mt-4 font-mono text-[11px]">{layers}</p>
				<Footer project={project} />
			</div>
		</article>
	)
}
