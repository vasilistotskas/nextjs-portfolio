'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import StackField from '@/components/ui/StackField'
import { useCommandPalette } from '@/components/ui/CommandPalette'

export default function Hero() {
	const t = useTranslations('hero')
	const tt = useTranslations('terminal')
	const locale = useLocale()
	const palette = useCommandPalette()

	return (
		<section className="relative isolate overflow-hidden">
			{/*
				The stack map. A band across the top so no text ever sits on the
				graphic; full bleed only from lg up, where the section is tall enough
				that the shader's own fade keeps the copy on quiet ground. At tablet
				widths the section is short and the map lands on the headline, so the
				band stays.
			*/}
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-40 sm:h-52 lg:inset-0 lg:h-full"
			>
				<div className="stack-fallback absolute inset-0" />
				<StackField className="field-fade-in absolute inset-0 block h-full w-full" />
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-4 pt-44 pb-12 sm:pt-60 md:px-6 lg:min-h-[36rem] lg:justify-end lg:pt-28 lg:pb-16">
				<p className="mb-4 flex items-center gap-2.5 font-mono text-xs">
					<span className="status-dot" />
					<span className="text-terminal-green">{t('location')}</span>
				</p>

				<h1 className="text-terminal-text font-sans text-[clamp(2.5rem,11vw,5.5rem)] leading-[0.95] font-semibold tracking-tight text-balance">
					{t('name')}
				</h1>

				<p className="text-terminal-comment mt-4 max-w-[46ch] font-sans text-lg sm:text-xl">
					{t('summary')}
				</p>

				<div className="mt-8 flex flex-wrap items-center gap-3">
					<Link
						href={`/${locale}#projects`}
						className="group bg-terminal-green text-terminal-bg flex items-center gap-2 rounded-md px-5 py-2.5 font-sans text-sm font-semibold transition-shadow duration-200 hover:shadow-[0_0_24px_-4px_var(--green)]"
					>
						{t('cta.projects')}
						<ArrowRight
							size={14}
							className="transition-transform duration-200 group-hover:translate-x-0.5"
						/>
					</Link>

					<Link
						href={`/${locale}/contact`}
						className="border-terminal-border text-terminal-comment hover:border-terminal-green hover:text-terminal-green rounded-md border px-5 py-2.5 font-sans text-sm font-medium transition-colors duration-200"
					>
						{t('cta.contact')}
					</Link>

					<button
						type="button"
						onClick={palette.open}
						className="text-terminal-muted hover:text-terminal-text ml-1 hidden items-center gap-2 font-mono text-xs transition-colors sm:flex"
					>
						<kbd className="border-terminal-border text-terminal-text rounded border px-1.5 py-0.5 font-mono text-[11px]">
							/
						</kbd>
						{tt('heroHint')}
					</button>
				</div>
			</div>
		</section>
	)
}
