'use client'

import { useTranslations } from 'next-intl'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Badge from '@/components/ui/Badge'

type Repo = {
	url: string
	label: string
}

const projects = [
	{
		key: 'portfolio',
		accent: 'var(--cyan)',
		url: 'vasilistotskas.com',
		repos: [
			{ url: 'https://github.com/vasilistotskas/nextjs-portfolio', label: 'Source' }
		] as Repo[],
		demo: null as string | null,
		tech: [
			{ name: 'Next.js 16', variant: 'cyan' as const },
			{ name: 'React 19', variant: 'cyan' as const },
			{ name: 'TypeScript', variant: 'yellow' as const },
			{ name: 'Tailwind v4', variant: 'purple' as const },
			{ name: 'next-intl', variant: 'green' as const }
		]
	},
	{
		key: 'grooveshop',
		accent: 'var(--green)',
		url: 'grooveshop.dev',
		repos: [
			{
				url: 'https://github.com/vasilistotskas/grooveshop-django-api',
				label: 'API'
			},
			{
				url: 'https://github.com/vasilistotskas/grooveshop-storefront-ui-node-nuxt',
				label: 'Storefront'
			},
			{
				url: 'https://github.com/vasilistotskas/grooveshop-media-stream',
				label: 'Media'
			}
		] as Repo[],
		demo: null as string | null,
		tech: [
			{ name: 'Django', variant: 'green' as const },
			{ name: 'Nuxt 4', variant: 'cyan' as const },
			{ name: 'NestJS', variant: 'cyan' as const },
			{ name: 'PostgreSQL', variant: 'yellow' as const },
			{ name: 'Docker', variant: 'purple' as const },
			{ name: 'TypeScript', variant: 'yellow' as const }
		]
	}
]

function BrowserMockup({ url, accent }: { url: string; accent: string }) {
	return (
		<div className="terminal-border overflow-hidden rounded-lg">
			{/* Browser chrome */}
			<div className="bg-terminal-bg/70 flex items-center gap-2 px-3 py-2">
				<div className="flex gap-1.5">
					<span className="bg-dot-red h-2 w-2 rounded-full" />
					<span className="bg-dot-yellow h-2 w-2 rounded-full" />
					<span className="bg-dot-green h-2 w-2 rounded-full" />
				</div>
				<div className="bg-terminal-bg/60 border-terminal-border flex-1 rounded-sm border px-2 py-0.5">
					<span className="text-terminal-muted font-mono text-[10px]">{url}</span>
				</div>
			</div>
			{/* Preview area */}
			<div
				className="relative h-28 md:h-36 overflow-hidden"
				style={{
					background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 15%, var(--surface)), color-mix(in srgb, ${accent} 5%, var(--bg)))`
				}}
			>
				{/* Grid pattern overlay */}
				<div
					className="absolute inset-0 opacity-[0.06]"
					style={{
						backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
						backgroundSize: '20px 20px'
					}}
				/>
				{/* Decorative abstract bars suggesting code */}
				<div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 py-4">
					<div
						className="h-2 w-3/4 rounded-full opacity-20"
						style={{ background: accent }}
					/>
					<div
						className="h-2 w-1/2 rounded-full opacity-15"
						style={{ background: accent }}
					/>
					<div
						className="h-2 w-2/3 rounded-full opacity-10"
						style={{ background: accent }}
					/>
					<div
						className="h-2 w-2/5 rounded-full opacity-15"
						style={{ background: accent }}
					/>
				</div>
			</div>
		</div>
	)
}

export default function Projects() {
	const t = useTranslations('projects')

	return (
		<section className="px-4 md:px-6 py-8 md:py-20" id="projects">
			<div className="mx-auto max-w-5xl">
				{/* Section header */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className="mb-12"
				>
					<p className="text-terminal-muted mb-2 font-mono text-xs tracking-widest uppercase">
						{t('subtitle')}
					</p>
					<h2 className="text-terminal-text font-sans text-2xl font-bold md:text-3xl">
						{t('title')}
					</h2>
					<div className="section-accent" />
				</motion.div>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{projects.map((project, index) => {
						const isFeatured = index === 0

						return (
							<motion.div
								key={project.key}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-60px' }}
								transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
								className={isFeatured ? 'md:col-span-2' : ''}
							>
								<div
									className="terminal-border card-hover gradient-border-top group bg-terminal-surface relative flex h-full flex-col overflow-hidden rounded-lg"
									style={{ ['--card-accent' as string]: project.accent }}
								>
									{/* Shimmer overlay on hover */}
									<div
										className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										style={{
											background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${project.accent} 6%, transparent), transparent)`,
											animation: 'shimmer 0.8s ease-in-out'
										}}
									/>

									{/* Inner radial glow on hover */}
									<div
										className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										style={{
											background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${project.accent} 8%, transparent), transparent 70%)`
										}}
									/>

									<div className={`relative z-[1] flex h-full ${isFeatured ? 'md:flex-row' : ''} flex-col`}>
										{/* Browser mockup */}
										<div className={`${isFeatured ? 'md:w-1/2' : ''} p-3 md:p-4 pb-0 md:pb-0 ${isFeatured ? 'md:pb-4 md:pr-0' : ''}`}>
											<BrowserMockup url={project.url} accent={project.accent} />
										</div>

										{/* Content */}
										<div className={`${isFeatured ? 'md:w-1/2' : ''} flex flex-col p-3 md:p-6`}>
											{/* Project index */}
											<span className="text-terminal-border group-hover:text-terminal-cyan/20 absolute top-4 right-5 font-mono text-4xl font-bold transition-colors duration-300 select-none">
												{String(index + 1).padStart(2, '0')}
											</span>

											{/* Header */}
											<div className="mb-4">
												<h3 className="text-terminal-cyan font-sans text-lg font-semibold">
													{t(`items.${project.key as 'portfolio' | 'grooveshop'}.name`)}
												</h3>
											</div>

											{/* Description */}
											<p className="text-terminal-comment mb-5 flex-1 font-sans text-sm leading-relaxed">
												{t(`items.${project.key as 'portfolio' | 'grooveshop'}.description`)}
											</p>

											{/* Tech stack */}
											<div className="mb-5 flex flex-wrap gap-1.5">
												{project.tech.map((tech) => (
													<Badge key={tech.name} variant={tech.variant}>
														{tech.name}
													</Badge>
												))}
											</div>

											{/* Links */}
											<div className="border-terminal-border flex flex-wrap items-center gap-4 border-t pt-4">
												{project.repos.map((repo) => (
													<a
														key={repo.url}
														href={repo.url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-terminal-muted hover:text-terminal-cyan group/link flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
													>
														<Github size={12} />
														{repo.label}
														<ArrowRight
															size={10}
															className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0"
														/>
													</a>
												))}
												{project.demo && (
													<a
														href={project.demo}
														target="_blank"
														rel="noopener noreferrer"
														className="text-terminal-muted hover:text-terminal-green group/link flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
													>
														<ExternalLink size={12} />
														{t('viewDemo')}
														<ArrowRight
															size={10}
															className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0"
														/>
													</a>
												)}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
