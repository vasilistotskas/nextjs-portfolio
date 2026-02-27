'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'

const experienceKeys = ['advisable', 'freelance'] as const

export default function Experience() {
	const t = useTranslations('experience')

	return (
		<section className="px-6 py-20" id="experience">
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
							{/* Glowing timeline dot */}
							<span className="absolute top-4 -left-[2.15rem] flex h-4 w-4 items-center justify-center">
								<span className="bg-terminal-cyan absolute h-4 w-4 animate-ping rounded-full opacity-20" />
								<span className="border-terminal-cyan bg-terminal-bg h-2.5 w-2.5 rounded-full border-2" />
							</span>

							<div className="terminal-border card-hover bg-terminal-surface rounded-lg p-5">
								{/* Commit-style header */}
								<div className="text-terminal-comment mb-3 font-mono text-xs leading-relaxed">
									<span className="text-terminal-yellow">
										commit {(index + 1).toString(16).padStart(7, '0')}abcdef
									</span>
									<br />
									<span>Author: Vasilis Totskas &lt;vassilistotskas@msn.com&gt;</span>
									<br />
									<span className="text-terminal-purple">{t(`items.${key}.period`)}</span>
								</div>

								<h3 className="text-terminal-cyan mb-1 font-mono text-base font-semibold">
									{t(`items.${key}.role`)}
								</h3>
								<p className="text-terminal-green mb-3 font-mono text-sm">
									@ {t(`items.${key}.company`)}
								</p>
								<p className="text-terminal-comment text-sm leading-relaxed">
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
