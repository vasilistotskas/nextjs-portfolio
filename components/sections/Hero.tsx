'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { ArrowRight, Terminal } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'
import HeroBackground3DWrapper from '@/components/ui/HeroBackground3DWrapper'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6

export default function Hero() {
	const t = useTranslations('hero')
	const locale = useLocale()
	const [step, setStep] = useState<Step>(0)

	const advance = useCallback(
		(next: Step) => () => setStep(next),
		[]
	)

	// Step 1: type "whoami"
	const whoami = useTypewriter({
		text: t('prompt.whoami'),
		baseSpeed: 15,
		variationRange: 25,
		startDelay: 0,
		onComplete: advance(2),
		enabled: step === 1
	})

	// Step 3: type "cat role.txt"
	const catRole = useTypewriter({
		text: t('prompt.cat'),
		baseSpeed: 15,
		variationRange: 25,
		startDelay: 0,
		onComplete: advance(4),
		enabled: step === 3
	})

	// Step 5: type "ls -la stack/"
	const lsStack = useTypewriter({
		text: t('prompt.ls'),
		baseSpeed: 15,
		variationRange: 25,
		startDelay: 0,
		onComplete: advance(6),
		enabled: step === 5
	})

	return (
		<section className="relative flex md:min-h-[90vh] items-center px-4 md:px-6 py-8 md:py-20">
			{/* 3D particle background (lazy-loaded, no SSR) */}
			<HeroBackground3DWrapper />

			{/* CSS glow fallback (visible until canvas loads / if WebGL unavailable) */}
			<noscript>
				<div
					className="pointer-events-none absolute inset-0 overflow-hidden"
					aria-hidden="true"
				>
					<div
						className="absolute top-1/2 left-1/3 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
						style={{
							background: 'var(--green)',
							opacity: 0.18
						}}
					/>
					<div
						className="absolute top-1/4 right-1/5 h-80 w-[320px] rounded-full blur-[100px]"
						style={{
							background: 'var(--cyan)',
							opacity: 0.14
						}}
					/>
					<div
						className="absolute bottom-1/4 right-1/3 h-70 w-70 rounded-full blur-[110px]"
						style={{
							background: 'var(--purple)',
							opacity: 0.1
						}}
					/>
				</div>
			</noscript>

			<div className="relative mx-auto w-full max-w-5xl">
				{/* Large title heading */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					onAnimationComplete={advance(1)}
					className="mb-6"
				>
					<h1 className="text-gradient text-5xl md:text-7xl font-bold font-sans">
						{t('title')}
					</h1>
					<p className="text-terminal-comment mt-2 text-xl md:text-2xl font-sans">
						{t('titleSuffix')}
					</p>
				</motion.div>

				{/* Terminal window */}
				<motion.div
					initial={{ opacity: 0, y: 24, scale: 0.98 }}
					animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className="terminal-border bg-terminal-surface noise-overlay relative overflow-hidden rounded-xl shadow-2xl shadow-black/20"
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
					<div className="space-y-2 p-3 md:p-6 font-mono text-sm md:text-base">
						{/* Line 1: whoami command */}
						{step >= 1 && (
							<p>
								<span className="text-terminal-green">{'~ $ '}</span>
								<span className="text-terminal-cyan">{whoami.displayedText}</span>
								{!whoami.isComplete && (
									<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
								)}
							</p>
						)}

						{/* Line 2: whoami output */}
						{step >= 2 && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								onAnimationComplete={advance(3)}
								className="text-terminal-green"
							>
								{t('name')}
							</motion.p>
						)}

						{/* Line 3: cat role.txt command */}
						{step >= 3 && (
							<p>
								<span className="text-terminal-green">{'~ $ '}</span>
								<span className="text-terminal-cyan">{catRole.displayedText}</span>
								{!catRole.isComplete && (
									<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
								)}
							</p>
						)}

						{/* Line 4: role output */}
						{step >= 4 && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								onAnimationComplete={advance(5)}
								className="text-terminal-cyan"
							>
								{`${t('role')} ${t('companyAt')} ${t('company')}`}
							</motion.p>
						)}

						{/* Line 5: ls -la stack/ command */}
						{step >= 5 && (
							<p>
								<span className="text-terminal-green">{'~ $ '}</span>
								<span className="text-terminal-cyan">{lsStack.displayedText}</span>
								{!lsStack.isComplete && (
									<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
								)}
							</p>
						)}

						{/* Line 6: description output */}
						{step >= 6 && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								className="text-terminal-text"
							>
								{t('description')}
							</motion.p>
						)}

						{/* Final cursor prompt */}
						{step >= 6 && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.35 }}
							>
								<span className="text-terminal-green">{'~ $ '}</span>
								<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
							</motion.p>
						)}
					</div>
				</motion.div>

				{/* CTA buttons */}
				{step >= 6 && (
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
						className="mt-8 flex flex-wrap gap-3"
					>
						<Link
							href={`/${locale}#projects`}
							className="group bg-terminal-green text-terminal-bg hover:shadow-[0_0_24px_-4px_var(--green)] flex items-center gap-2 rounded-md px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-200"
						>
							{t('cta.projects')}
							<ArrowRight
								size={14}
								className="transition-transform duration-200 group-hover:translate-x-1"
							/>
						</Link>
						<Link
							href={`/${locale}/contact`}
							className="border-terminal-border text-terminal-comment hover:border-terminal-cyan hover:text-terminal-cyan flex items-center gap-2 rounded-md border px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200"
						>
							{t('cta.contact')}
						</Link>
					</motion.div>
				)}
			</div>
		</section>
	)
}
