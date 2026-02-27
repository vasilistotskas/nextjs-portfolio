'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

export default function Header() {
	const locale = useLocale()
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 24)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={cn(
				'sticky top-0 z-50 transition-all duration-300',
				scrolled
					? 'border-terminal-border glass border-b shadow-sm'
					: 'border-b border-transparent bg-transparent'
			)}
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				{/* Logo — mono for ~/, sans for portfolio */}
				<Link
					href={`/${locale}`}
					className="group flex items-center gap-0.5 text-base transition-opacity hover:opacity-80"
				>
					<span className="font-mono text-terminal-prompt">~/</span>
					<span className="font-sans font-semibold text-terminal-text">portfolio</span>
					<span className="cursor-blink bg-terminal-green ml-0.5 inline-block h-[1em] w-[0.45em] align-middle" />
				</Link>

				{/* Desktop nav */}
				<Navigation />

				{/* Actions */}
				<div className="flex items-center gap-2">
					<LanguageSwitcher />
					<ThemeToggle />
					<MobileMenu />
				</div>
			</div>
		</header>
	)
}
