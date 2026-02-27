'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const navItems = [
	{ href: '/', key: 'home' },
	{ href: '/about', key: 'about' },
	{ href: '/contact', key: 'contact' }
] as const

export default function Navigation() {
	const t = useTranslations('nav')
	const locale = useLocale()
	const pathname = usePathname()

	return (
		<nav className="hidden items-center gap-6 md:flex">
			{navItems.map(({ href, key }) => {
				const fullHref = `/${locale}${href === '/' ? '' : href}`
				const isActive =
					href === '/' ? pathname === `/${locale}` : pathname.startsWith(fullHref)

				return (
					<Link
						key={key}
						href={fullHref}
						className={cn(
							'relative font-sans text-sm font-medium tracking-wide transition-colors duration-200',
							isActive
								? 'text-terminal-text'
								: 'text-terminal-comment hover:text-terminal-text',
							// Underline — 2px for stronger weight
							'after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-250',
							isActive
								? 'after:bg-terminal-green after:scale-x-100'
								: 'after:bg-terminal-cyan after:scale-x-0 hover:after:scale-x-100'
						)}
					>
						{t(key)}
					</Link>
				)
			})}
		</nav>
	)
}
