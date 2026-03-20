'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import Terminal from '@/components/ui/Terminal'
import Badge from '@/components/ui/Badge'

const skillData = {
	frontend: {
		variant: 'cyan' as const,
		skills: [
			'Vue.js',
			'Nuxt (v3/v4)',
			'TypeScript',
			'JavaScript',
			'React',
			'Next.js',
			'Vite',
			'Tailwind CSS',
			'HTML',
			'CSS'
		]
	},
	backend: {
		variant: 'green' as const,
		skills: ['Python', 'Django', 'Django REST', 'NestJS', 'Node.js', 'PHP']
	},
	devops: {
		variant: 'default' as const,
		skills: [
			'Kubernetes (k3s)',
			'ArgoCD',
			'Docker',
			'PostgreSQL',
			'Redis',
			'RabbitMQ',
			'Celery',
			'Nginx',
			'Git',
			'Linux'
		]
	},
	infra: {
		variant: 'default' as const,
		skills: ['Hetzner', 'Cloudflare', 'Vercel', 'Longhorn', 'Cert-Manager']
	}
}

const categoryLabels: Record<string, string> = {
	frontend: 'Frontend',
	backend: 'Backend',
	devops: 'DevOps',
	infra: 'Infrastructure & Cloud'
}

export default function Skills() {
	const t = useTranslations('skills')

	return (
		<section className="px-4 py-8 md:px-6 md:py-20" id="skills">
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
					{(
						Object.entries(skillData) as Array<
							[keyof typeof skillData, (typeof skillData)[keyof typeof skillData]]
						>
					).map(([category, { variant, skills }], index) => (
						<motion.div
							key={category}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
						>
							<Terminal title={categoryLabels[category]}>
								<p className="text-terminal-comment mb-3 text-[11px]">
									<span className="text-terminal-green">{'$ '}</span>
									<span className="text-terminal-cyan">cat</span>
									{` skills/${category}.json`}
								</p>
								<motion.div
									className="flex flex-wrap gap-1.5"
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									variants={{
										hidden: {},
										show: { transition: { staggerChildren: 0.04 } }
									}}
								>
									{skills.map((skill) => (
										<motion.div
											key={skill}
											variants={{
												hidden: { opacity: 0, y: 8 },
												show: { opacity: 1, y: 0 }
											}}
											transition={{ duration: 0.3, ease: 'easeOut' }}
										>
											<Badge variant={variant}>{skill}</Badge>
										</motion.div>
									))}
								</motion.div>
							</Terminal>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
