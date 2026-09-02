'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { TerminalIcon } from 'lucide-react'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useCommandPalette } from '@/components/ui/CommandPalette'
import { cn } from '@/lib/utils'

export default function Header() {
	const locale = useLocale()
	const t = useTranslations('terminal')
	const palette = useCommandPalette()
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 24)
		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={cn(
				'sticky top-0 z-50 transition-colors duration-300',
				scrolled
					? 'border-terminal-border glass-blur border-b bg-[var(--bg)]/85'
					: 'border-b border-transparent bg-transparent'
			)}
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 md:px-6">
				<Link
					href={`/${locale}`}
					className="flex shrink-0 items-center gap-0.5 text-base transition-opacity hover:opacity-80"
				>
					<span className="text-terminal-green font-mono">~/</span>
					<span className="text-terminal-text font-sans font-semibold">portfolio</span>
				</Link>

				<Navigation />

				<div className="flex items-center gap-2">
					{/* The palette's entry point for anyone who cannot press "/". */}
					<button
						type="button"
						onClick={palette.open}
						aria-label={t('open')}
						className="border-terminal-border text-terminal-comment hover:border-terminal-green hover:text-terminal-green flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors"
					>
						<TerminalIcon size={14} />
					</button>
					<LanguageSwitcher />
					<ThemeToggle />
					<MobileMenu />
				</div>
			</div>
		</header>
	)
}
