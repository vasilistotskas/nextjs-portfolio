'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import Terminal from '@/components/ui/Terminal'
import Badge from '@/components/ui/Badge'

const skillData = {
	frontend: {
		variant: 'cyan' as const,
		skills: [
			'TypeScript',
			'React',
			'Next.js',
			'Vue 3',
			'Nuxt',
			'Tailwind CSS',
			'HTML',
			'CSS'
		]
	},
	backend: {
		variant: 'green' as const,
		skills: ['Python', 'Django', 'Django REST', 'NestJS', 'Node.js', 'PHP', 'Codeigniter']
	},
	devops: {
		variant: 'yellow' as const,
		skills: ['Docker', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Git', 'Linux', 'Nginx']
	},
	tools: {
		variant: 'purple' as const,
		skills: ['VS Code', 'GitHub', 'Figma', 'Postman', 'TablePlus', 'Vercel']
	}
}

export default function Skills() {
	const t = useTranslations('skills')

	return (
		<section className="px-6 py-20" id="skills">
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
							<Terminal title={`skills/${category}`}>
								<p className="text-terminal-comment mb-3">
									<span className="text-terminal-purple">const</span>{' '}
									<span className="text-terminal-cyan">{category}</span>{' '}
									<span className="text-terminal-text">= </span>
									<span className="text-terminal-yellow">[</span>
								</p>
								<div className="mb-3 flex flex-wrap gap-1.5 pl-4">
									{skills.map((skill) => (
										<Badge key={skill} variant={variant}>
											{skill}
										</Badge>
									))}
								</div>
								<p className="text-terminal-yellow">]</p>
							</Terminal>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
