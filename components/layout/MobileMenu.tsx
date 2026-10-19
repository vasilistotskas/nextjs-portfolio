'use client'

import { useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
	{ href: '/', key: 'home' },
	{ href: '/about', key: 'about' },
	{ href: '/contact', key: 'contact' }
] as const

/** Delay between successive items sliding in. */
const ITEM_STAGGER_MS = 50

/**
 * A native `popover`: the browser handles opening from the button, Escape,
 * dismissing on an outside click and `aria-expanded`. React state only mirrors
 * it for the icon. CSS anchors it under the header (see `.mobile-menu`).
 */
export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const menuId = useId()
	const t = useTranslations('nav')
	const locale = useLocale()
	const pathname = usePathname()

	return (
		<div className="md:hidden">
			<button
				type="button"
				popoverTarget={menuId}
				aria-label="Toggle menu"
				className="border-terminal-border text-terminal-comment hover:border-terminal-green hover:text-terminal-green flex h-8 w-8 items-center justify-center rounded border transition-colors"
			>
				{isOpen ? <X size={14} /> : <Menu size={14} />}
			</button>

			<div
				ref={menuRef}
				id={menuId}
				popover="auto"
				onToggle={(event) => setIsOpen(event.newState === 'open')}
				className="mobile-menu border-terminal-border text-terminal-text border-b px-6 py-4 backdrop-blur-xl"
				style={{
					backgroundColor: 'color-mix(in srgb, var(--bg) 90%, transparent)'
				}}
			>
				<nav className="flex flex-col gap-4">
					{navItems.map(({ href, key }, index) => {
						const fullHref = `/${locale}${href === '/' ? '' : href}`
						const isActive =
							href === '/' ? pathname === `/${locale}` : pathname.startsWith(fullHref)

						return (
							<div
								key={key}
								className="mobile-menu-item"
								style={{ transitionDelay: `${index * ITEM_STAGGER_MS}ms` }}
							>
								<Link
									href={fullHref}
									// Client-side navigation keeps the popover open on its own.
									onClick={() => menuRef.current?.hidePopover()}
									className={cn(
										'font-sans text-sm font-medium transition-colors',
										isActive
											? 'text-terminal-green'
											: 'text-terminal-comment hover:text-terminal-text'
									)}
								>
									{t(key)}
								</Link>
							</div>
						)
					})}
				</nav>
			</div>
		</div>
	)
}
