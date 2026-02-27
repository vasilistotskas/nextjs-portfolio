'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'

const experienceKeys = ['advisable', 'freelance'] as const

export default function Experience() {
	const t = useTranslations('experience')

	return (
		<section className="px-4 md:px-6 py-8 md:py-20" id="experience">
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

				<div className="relative space-y-6 pl-8">
					{/* Gradient timeline line */}
					<div
						className="absolute top-0 left-0 h-full w-px"
						style={{
							background:
								'linear-gradient(to bottom, var(--cyan), color-mix(in srgb, var(--cyan) 20%, transparent))'
						}}
					/>

					{experienceKeys.map((key, index) => (
						<motion.div
							key={key}
							initial={{ opacity: 0, x: -16 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.45, delay: index * 0.12, ease: 'easeOut' }}
							className="relative"
						>
							{/* Subtler timeline dot */}
							<span className="absolute top-4 -left-[2.15rem] flex h-4 w-4 items-center justify-center">
								<span className="bg-terminal-cyan absolute h-3 w-3 animate-ping rounded-full opacity-10" />
								<span className="border-terminal-cyan bg-terminal-bg h-2.5 w-2.5 rounded-full border-2" />
							</span>

							<div className="terminal-border card-hover bg-terminal-surface rounded-lg p-5">
								{/* Simplified header — date only */}
								<p className="text-terminal-purple mb-3 font-mono text-xs">
									{t(`items.${key}.period`)}
								</p>

								<h3 className="text-terminal-text mb-1 font-sans text-lg font-semibold">
									{t(`items.${key}.role`)}
								</h3>
								<p className="text-terminal-green mb-3 font-mono text-sm">
									@ {t(`items.${key}.company`)}
								</p>
								<p className="text-terminal-comment font-sans text-sm leading-relaxed">
									{t(`items.${key}.description`)}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
