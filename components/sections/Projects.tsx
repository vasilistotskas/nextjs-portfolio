import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { maskToLayers, projectLayers } from '@/lib/stack'
import type { ProjectKey } from '@/lib/stack'

type Repo = { url: string; label: string }

type Project = {
	key: ProjectKey
	url: string
	repos: Repo[]
	demo: string | null
	status: 'live' | 'oss'
}

/**
 * Ordered by what is most worth looking at, not by what is newest. The site you
 * are reading comes last on purpose.
 */
const projects: Project[] = [
	{
		key: 'webside',
		url: 'webside.gr',
		repos: [],
		demo: 'https://webside.gr',
		status: 'live'
	},
	{
		key: 'grooveshop',
		url: 'grooveshop.dev',
		repos: [
			{ url: 'https://github.com/vasilistotskas/grooveshop-django-api', label: 'API' },
			{
				url: 'https://github.com/vasilistotskas/grooveshop-storefront-ui-node-nuxt',
				label: 'Storefront'
			},
			{ url: 'https://github.com/vasilistotskas/grooveshop-media-stream', label: 'Media' }
		],
		demo: null,
		status: 'oss'
	},
	{
		key: 'portfolio',
		url: 'vasilistotskas.com',
		repos: [
			{ url: 'https://github.com/vasilistotskas/nextjs-portfolio', label: 'Source' }
		],
		demo: null,
		status: 'live'
	}
]

function BrowserFrame({
	url,
	imageKey,
	priority
}: {
	url: string
	imageKey: string
	priority?: boolean
}) {
	return (
		<div className="terminal-border overflow-hidden rounded-lg">
			<div className="bg-terminal-surface/60 flex items-center gap-2 px-3 py-2">
				<div className="flex gap-1.5">
					<span className="bg-terminal-border h-2 w-2 rounded-full" />
					<span className="bg-terminal-border h-2 w-2 rounded-full" />
					<span className="bg-terminal-border h-2 w-2 rounded-full" />
				</div>
				<div className="bg-terminal-bg/60 border-terminal-border min-w-0 flex-1 rounded-sm border px-2 py-0.5">
					<span className="text-terminal-muted block truncate font-mono text-[10px]">
						{url}
					</span>
				</div>
			</div>
			<div className="border-terminal-border relative aspect-[16/10] border-t">
				<Image
					src={`/mockups/${imageKey}.png`}
					alt=""
					fill
					priority={priority}
					className="object-cover object-top"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
				/>
			</div>
		</div>
	)
}

function ProjectLinks({ project, demoLabel }: { project: Project; demoLabel: string }) {
	return (
		<div className="border-terminal-border mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4">
			{project.demo && (
				<a
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer"
					className="text-terminal-muted hover:text-terminal-green flex items-center gap-1.5 font-mono text-xs transition-colors"
				>
					<ExternalLink size={12} />
					{demoLabel}
				</a>
			)}
			{project.repos.map((repo) => (
				<a
					key={repo.url}
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-terminal-muted hover:text-terminal-green flex items-center gap-1.5 font-mono text-xs transition-colors"
				>
					<GithubIcon size={12} />
					{repo.label}
				</a>
			))}
		</div>
	)
}

export default function Projects() {
	const t = useTranslations('projects')
	const ts = useTranslations('stack')

	const layersOf = (key: ProjectKey) =>
		maskToLayers(projectLayers[key])
			.map((layer) => ts(`layers.${layer}`))
			.join(' / ')

	const [featured, ...rest] = projects

	return (
		<section className="px-4 py-14 md:px-6 md:py-20" id="projects">
			<div className="mx-auto max-w-5xl">
				<h2 className="text-terminal-text mb-3 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
					{t('title')}
				</h2>
				<p className="text-terminal-comment mb-10 max-w-[60ch] font-sans text-sm">
					{t('intro')}
				</p>

				{/* Featured: the one that runs the whole stack in production. */}
				<article className="glass terminal-border card-hover mb-5 overflow-hidden rounded-lg p-4 md:p-6">
					<div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-8">
						<BrowserFrame url={featured.url} imageKey={featured.key} priority />
						<div className="min-w-0">
							<div className="mb-2 flex items-center gap-2 font-mono text-[10px]">
								<span className="bg-terminal-green h-1.5 w-1.5 rounded-full" />
								<span className="text-terminal-green">{t('status.live')}</span>
							</div>
							<h3 className="text-terminal-text font-sans text-xl font-semibold">
								{t(`items.${featured.key}.name`)}
							</h3>
							<p className="text-terminal-comment mt-3 font-sans text-sm leading-relaxed">
								{t(`items.${featured.key}.description`)}
							</p>
							<p className="text-terminal-muted mt-4 font-mono text-[11px]">
								{layersOf(featured.key)}
							</p>
							<ProjectLinks project={featured} demoLabel={t('viewDemo')} />
						</div>
					</div>
				</article>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{rest.map((project) => (
						<article
							key={project.key}
							className="glass terminal-border card-hover flex flex-col overflow-hidden rounded-lg p-4 md:p-6"
						>
							<BrowserFrame url={project.url} imageKey={project.key} />
							<div className="mt-5 flex flex-1 flex-col">
								<div className="mb-2 flex items-center gap-2 font-mono text-[10px]">
									<span
										className={
											project.status === 'live'
												? 'bg-terminal-green h-1.5 w-1.5 rounded-full'
												: 'bg-terminal-muted h-1.5 w-1.5 rounded-full'
										}
									/>
									<span
										className={
											project.status === 'live'
												? 'text-terminal-green'
												: 'text-terminal-muted'
										}
									>
										{project.status === 'live' ? t('status.live') : t('status.oss')}
									</span>
								</div>
								<h3 className="text-terminal-text font-sans text-lg font-semibold">
									{t(`items.${project.key}.name`)}
								</h3>
								<p className="text-terminal-comment mt-2 flex-1 font-sans text-sm leading-relaxed">
									{t(`items.${project.key}.description`)}
								</p>
								<p className="text-terminal-muted mt-4 font-mono text-[11px]">
									{layersOf(project.key)}
								</p>
								<ProjectLinks project={project} demoLabel={t('viewDemo')} />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
