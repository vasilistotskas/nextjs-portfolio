'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import { ArrowRight, Terminal } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6

export default function Hero() {
	const t = useTranslations('hero')
	const locale = useLocale()
	const [step, setStep] = useState<Step>(0)
	const [history, setHistory] = useState<Array<{cmd: string, output: React.ReactNode}>>([])
	const [inputVal, setInputVal] = useState('')
	const [isCleared, setIsCleared] = useState(false)

	const advance = useCallback((next: Step) => () => setStep(next), [])

	// Step 1: type "whoami"
	const whoami = useTypewriter({
		text: t('prompt.whoami'),
		baseSpeed: 12,
		variationRange: 18,
		startDelay: 0,
		onComplete: advance(2),
		enabled: step === 1
	})

	// Step 3: type "cat role.txt"
	const catRole = useTypewriter({
		text: t('prompt.cat'),
		baseSpeed: 12,
		variationRange: 18,
		startDelay: 0,
		onComplete: advance(4),
		enabled: step === 3
	})

	// Step 5: type "ls -la stack/"
	const lsStack = useTypewriter({
		text: t('prompt.ls'),
		baseSpeed: 12,
		variationRange: 18,
		startDelay: 0,
		onComplete: advance(6),
		enabled: step === 5
	})

	return (
		<section className="relative flex items-center px-4 py-8 md:min-h-[75vh] md:px-6 md:py-16">
			<div className="relative z-10 mx-auto w-full max-w-5xl">
				{/* Large title heading */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					onAnimationComplete={advance(1)}
					className="mb-6"
				>
					{/* Status indicator */}
					<div className="mb-4 flex items-center gap-2.5 font-mono text-xs">
						<span className="status-dot" />
						<span className="text-terminal-green">{t('location')}</span>
					</div>

					<h1 className="text-terminal-text font-sans text-5xl font-bold tracking-tight md:text-8xl">
						{t('title')}
					</h1>
					<p className="text-terminal-comment mt-3 font-sans text-xl md:text-2xl">
						{t('titleSuffix')}
					</p>
				</motion.div>

				{/* Terminal window */}
				<motion.div
					initial={{ opacity: 0, y: 24, scale: 0.98 }}
					animate={
						step >= 1
							? { opacity: 1, y: 0, scale: 1 }
							: { opacity: 0, y: 24, scale: 0.98 }
					}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className="glass terminal-border noise-overlay relative overflow-hidden rounded-xl"
				>
					{/* Title bar */}
					<div className="border-terminal-border bg-terminal-bg/70 flex items-center gap-3 border-b px-5 py-3">
						<div className="flex gap-2">
							<span className="bg-terminal-green/25 h-3 w-3 rounded-full" />
							<span className="bg-terminal-green/15 h-3 w-3 rounded-full" />
							<span className="bg-terminal-green/15 h-3 w-3 rounded-full" />
						</div>
						<span className="text-terminal-muted flex flex-1 items-center justify-center gap-2 font-mono text-xs">
							<Terminal size={10} />
							bash — vasilistotskas
						</span>
					</div>

					{/* Terminal content */}
					<div className="space-y-2 p-3 font-mono text-sm md:p-6 md:text-base">
						{!isCleared && (
							<>
								{/* Line 1: whoami command */}
								<p
									className="transition-opacity duration-200"
									style={{ opacity: step >= 1 ? 1 : 0 }}
								>
									<span className="text-terminal-green">{'~ $ '}</span>
									<span className="text-terminal-cyan">{whoami.displayedText}</span>
									{step >= 1 && !whoami.isComplete && (
										<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
									)}
								</p>

								{/* Line 2: whoami output */}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: step >= 2 ? 1 : 0 }}
									transition={{ duration: 0.15 }}
									onAnimationComplete={() => {
										if (step === 2) setStep(3)
									}}
									className="text-terminal-green"
								>
									{t('name')}
								</motion.p>

								{/* Line 3: cat role.txt command */}
								<p
									className="transition-opacity duration-200"
									style={{ opacity: step >= 3 ? 1 : 0 }}
								>
									<span className="text-terminal-green">{'~ $ '}</span>
									<span className="text-terminal-cyan">{catRole.displayedText}</span>
									{step >= 3 && !catRole.isComplete && (
										<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
									)}
								</p>

								{/* Line 4: role output */}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: step >= 4 ? 1 : 0 }}
									transition={{ duration: 0.15 }}
									onAnimationComplete={() => {
										if (step === 4) setStep(5)
									}}
									className="text-terminal-cyan"
								>
									{`${t('role')} ${t('companyAt')} ${t('company')}`}
								</motion.p>

								{/* Line 5: ls -la stack/ command */}
								<p
									className="transition-opacity duration-200"
									style={{ opacity: step >= 5 ? 1 : 0 }}
								>
									<span className="text-terminal-green">{'~ $ '}</span>
									<span className="text-terminal-cyan">{lsStack.displayedText}</span>
									{step >= 5 && !lsStack.isComplete && (
										<span className="cursor-glow bg-terminal-green ml-0.5 inline-block h-[1.1em] w-[0.5em] align-text-bottom" />
									)}
								</p>

								{/* Line 6: description output */}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: step >= 6 ? 1 : 0 }}
									transition={{ duration: 0.2 }}
									className="text-terminal-text"
								>
									{t('description')}
								</motion.p>
							</>
						)}

						{/* Interactive History */}
						{history.map((entry, i) => (
							<div key={i} className="space-y-1">
								<p>
									<span className="text-terminal-green">{'~ $ '}</span>
									<span className="text-terminal-cyan">{entry.cmd}</span>
								</p>
								<div className="text-terminal-text">{entry.output}</div>
							</div>
						))}

						{/* Final cursor / Interactive Input */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: step >= 6 ? 1 : 0 }}
							transition={{ duration: 0.2, delay: 0.15 }}
							className="-mt-[2px] flex items-center"
						>
							<span className="text-terminal-green mr-2">{'~ $'}</span>
							{step >= 6 && (
								<input
									type="text"
									className="text-terminal-cyan bg-transparent flex-1 outline-none font-mono caret-terminal-green"
									autoComplete="off"
									spellCheck="false"
									onChange={(e) => setInputVal(e.target.value)}
									value={inputVal}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											const val = inputVal.trim()
											let out: React.ReactNode = null
											if (val === 'clear') {
												setIsCleared(true)
												setHistory([])
												setInputVal('')
												return
											}
											if (val === 'help') {
												out = (
													<div className="text-terminal-comment">
														Available commands: <br />
														- <span className="text-terminal-cyan">whoami</span>: Display user info<br />
														- <span className="text-terminal-cyan">contact</span>: How to reach me<br />
														- <span className="text-terminal-cyan">projects</span>: Jump to my works<br />
														- <span className="text-terminal-cyan">clear</span>: Clear terminal output
													</div>
												)
											} else if (val === 'whoami') {
												out = <span className="text-terminal-green">{t('name')} - Fullstack Developer</span>
											} else if (val === 'contact') {
												out = <span>Email: vassilistotskas@msn.com</span>
											} else if (val === 'projects') {
												out = <span>Scroll down or use `cd /projects`!</span>
											} else if (val === 'sudo') {
												out = <span className="text-terminal-comment">Permission denied.</span>
											} else if (val) {
												out = <span className="text-red-400">bash: {val}: command not found</span>
											}
											if (val) {
												setHistory(h => [...h, { cmd: val, output: out }])
											}
											setInputVal('')
										}
									}}
								/>
							)}
						</motion.div>
					</div>
				</motion.div>

				{/* CTA buttons — always in DOM to prevent layout jump */}
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={step >= 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
					transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
					className="pointer-events-auto mt-8 flex flex-wrap gap-3"
					style={{ pointerEvents: step >= 6 ? 'auto' : 'none' }}
				>
					<Link
						href={`/${locale}#projects`}
						className="group bg-terminal-green text-terminal-bg flex items-center gap-2 rounded-md px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_24px_-4px_var(--green)]"
					>
						{t('cta.projects')}
						<ArrowRight
							size={14}
							className="transition-transform duration-200 group-hover:translate-x-1"
						/>
					</Link>
					<Link
						href={`/${locale}/contact`}
						className="border-terminal-border text-terminal-comment hover:border-terminal-green hover:text-terminal-green flex items-center gap-2 rounded-md border px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200"
					>
						{t('cta.contact')}
					</Link>
				</motion.div>
			</div>

			{/* Scroll indicator — always in DOM */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={step >= 6 ? { opacity: 1 } : { opacity: 0 }}
				transition={{ delay: 0.8, duration: 0.6 }}
				className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
			>
				<span className="text-terminal-muted scroll-indicator font-mono text-[10px] tracking-[0.2em] uppercase">
					{t('scroll')}
				</span>
				<div className="from-terminal-green/50 h-8 w-px bg-gradient-to-b to-transparent" />
			</motion.div>
		</section>
	)
}
