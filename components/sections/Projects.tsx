'use client'

import { useTranslations } from 'next-intl'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import Badge from '@/components/ui/Badge'

const projects = [
	{
		key: 'portfolio',
		repo: 'https://github.com/vasilistotskas/nextjs-portfolio',
		demo: null,
		tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'next-intl']
	},
	{
		key: 'grooveshop',
		repo: 'https://github.com/vasilistotskas/grooveshop-django-api',
		demo: null,
		tech: ['Django', 'Nuxt 3', 'PostgreSQL', 'Docker', 'TypeScript']
	}
]

export default function Projects() {
	const t = useTranslations('projects')

	return (
		<section className="px-6 py-20" id="projects">
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
					<h2 className="text-terminal-text font-mono text-2xl font-bold md:text-3xl">
						{t('title')}
					</h2>
					<div className="section-accent" />
				</motion.div>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{projects.map((project, index) => (
						<motion.div
							key={project.key}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
						>
							<div className="terminal-border card-hover group bg-terminal-surface relative flex h-full flex-col rounded-lg p-6">
								{/* Project index */}
								<span className="text-terminal-border group-hover:text-terminal-cyan/20 absolute top-4 right-5 font-mono text-4xl font-bold transition-colors duration-300 select-none">
									{String(index + 1).padStart(2, '0')}
								</span>

								{/* Header */}
								<div className="mb-4">
									<p className="text-terminal-comment mb-1.5 font-mono text-xs">
										<span className="text-terminal-prompt">$ </span>
										ls -la projects/{project.key}/
									</p>
									<h3 className="text-terminal-cyan font-mono text-base font-semibold">
										{t(`items.${project.key as 'portfolio' | 'grooveshop'}.name`)}
									</h3>
								</div>

								{/* Description */}
								<p className="text-terminal-comment mb-5 flex-1 text-sm leading-relaxed">
									{t(`items.${project.key as 'portfolio' | 'grooveshop'}.description`)}
								</p>

								{/* Tech stack */}
								<div className="mb-5 flex flex-wrap gap-1.5">
									{project.tech.map((tech) => (
										<Badge key={tech} variant="default">
											{tech}
										</Badge>
									))}
								</div>

								{/* Links */}
								<div className="border-terminal-border flex items-center gap-4 border-t pt-4">
									<a
										href={project.repo}
										target="_blank"
										rel="noopener noreferrer"
										className="text-terminal-muted hover:text-terminal-cyan flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
									>
										<Github size={12} />
										{t('viewCode')}
									</a>
									{project.demo && (
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="text-terminal-muted hover:text-terminal-green flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
										>
											<ExternalLink size={12} />
											{t('viewDemo')}
										</a>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
