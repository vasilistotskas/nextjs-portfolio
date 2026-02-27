'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { ArrowRight, Terminal } from 'lucide-react'

export default function Hero() {
	const t = useTranslations('hero')
	const locale = useLocale()

	const lines = [
		{ prompt: '~', command: t('prompt.whoami'), delay: 0.3 },
		{ output: t('name'), color: 'text-terminal-green', delay: 0.7 },
		{ prompt: '~', command: t('prompt.cat'), delay: 1.1 },
		{
			output: `${t('role')} ${t('companyAt')} ${t('company')}`,
			color: 'text-terminal-cyan',
			delay: 1.5
		},
		{ prompt: '~', command: t('prompt.ls'), delay: 1.9 },
		{ output: t('description'), color: 'text-terminal-text', delay: 2.3 },
		{ prompt: '~', command: '', isActive: true, delay: 2.9 }
	]

	return (
		<section className="relative flex min-h-[90vh] items-center px-6 py-20">
			{/* Ambient glow behind terminal */}
			<div
				className="pointer-events-none absolute inset-0 overflow-hidden"
				aria-hidden="true"
			>
				<div
					className="absolute top-1/2 left-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
					style={{ background: 'var(--green)', opacity: 0.06 }}
				/>
				<div
					className="absolute top-1/4 right-1/5 h-[320px] w-[320px] rounded-full blur-[100px]"
					style={{ background: 'var(--cyan)', opacity: 0.04 }}
				/>
			</div>

			<div className="relative mx-auto w-full max-w-5xl">
				{/* Terminal window */}
				<motion.div
					initial={{ y: 24 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className="terminal-border bg-terminal-surface relative overflow-hidden rounded-xl shadow-2xl shadow-black/20"
				>
					{/* Scanline overlay */}
					<div
						className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-[0.018]"
						aria-hidden="true"
						style={{
							backgroundImage:
								'repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,1) 1px, rgba(0,0,0,1) 2px)'
						}}
					/>

					{/* Title bar */}
					<div className="border-terminal-border bg-terminal-bg/70 flex items-center gap-3 border-b px-5 py-3">
						<div className="flex gap-2">
							<span className="bg-dot-red h-3 w-3 rounded-full" />
							<span className="bg-dot-yellow h-3 w-3 rounded-full" />
							<span className="bg-dot-green h-3 w-3 rounded-full" />
						</div>
						<span className="text-terminal-muted flex flex-1 items-center justify-center gap-2 font-mono text-xs">
							<Terminal size={10} />
							bash — vasilistotskas
						</span>
					</div>

					{/* Terminal content */}
					<div className="space-y-2 p-6 font-mono text-sm md:text-base">
						{lines.map((line, i) => (
							<motion.div
								key={i}
								initial={{ x: -8 }}
								animate={{ x: 0 }}
								transition={{ delay: line.delay, duration: 0.28, ease: 'easeOut' }}
							>
								{'output' in line ? (
									<p className={line.color}>{line.output}</p>
								) : (
									<p>
										<span className="text-terminal-green">{line.prompt} $ </span>
										<span className="text-terminal-cyan">{line.command}</span>
										{line.isActive && (
											<span className="cursor-blink bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
										)}
									</p>
								)}
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* CTA buttons */}
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 3.3, duration: 0.4, ease: 'easeOut' }}
					className="mt-8 flex flex-wrap gap-3"
				>
					<Link
						href={`/${locale}#projects`}
						className="group border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg flex items-center gap-2 rounded-md border px-5 py-2.5 font-mono text-sm transition-all duration-200 hover:shadow-[0_0_20px_-4px_var(--green)]"
					>
						{t('cta.projects')}
						<ArrowRight
							size={14}
							className="transition-transform duration-200 group-hover:translate-x-1"
						/>
					</Link>
					<Link
						href={`/${locale}/contact`}
						className="border-terminal-border text-terminal-comment hover:border-terminal-cyan hover:text-terminal-cyan flex items-center gap-2 rounded-md border px-5 py-2.5 font-mono text-sm transition-all duration-200"
					>
						{t('cta.contact')}
					</Link>
				</motion.div>
			</div>
		</section>
	)
}
