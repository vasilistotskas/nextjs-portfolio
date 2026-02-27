'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

const navItems = [
	{ href: '/', key: 'home' },
	{ href: '/about', key: 'about' },
	{ href: '/contact', key: 'contact' }
] as const

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const t = useTranslations('nav')
	const locale = useLocale()
	const pathname = usePathname()

	return (
		<div className="md:hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle menu"
				className="border-terminal-border text-terminal-comment hover:border-terminal-cyan hover:text-terminal-cyan flex h-8 w-8 items-center justify-center rounded border transition-colors"
			>
				{isOpen ? <X size={14} /> : <Menu size={14} />}
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.15 }}
						className="border-terminal-border bg-terminal-bg absolute top-full right-0 left-0 border-b px-6 py-4"
					>
						<nav className="flex flex-col gap-4">
							{navItems.map(({ href, key }) => {
								const fullHref = `/${locale}${href === '/' ? '' : href}`
								const isActive =
									href === '/' ? pathname === `/${locale}` : pathname.startsWith(fullHref)

								return (
									<Link
										key={key}
										href={fullHref}
										onClick={() => setIsOpen(false)}
										className={cn(
											'font-mono text-sm transition-colors',
											isActive
												? 'text-terminal-cyan'
												: 'text-terminal-comment hover:text-terminal-text'
										)}
									>
										<span className="text-terminal-prompt mr-2">$</span>
										{t(key)}
									</Link>
								)
							})}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
