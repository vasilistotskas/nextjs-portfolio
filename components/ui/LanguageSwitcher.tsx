'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const switchLocale = (nextLocale: string) => {
		const segments = pathname.split('/')
		segments[1] = nextLocale
		router.push(segments.join('/'))
	}

	return (
		<div className="border-terminal-border flex items-center rounded border font-sans text-sm font-medium md:text-xs">
			{routing.locales.map((loc, i) => (
				<span key={loc} className="flex items-center">
					<button
						onClick={() => switchLocale(loc)}
						className={cn(
							'cursor-pointer px-2 py-1.5 md:px-1.5 md:py-0.5',
							locale === loc
								? 'text-terminal-green'
								: 'text-terminal-muted hover:text-terminal-text transition-colors'
						)}
					>
						{loc.toUpperCase()}
					</button>
					{i < routing.locales.length - 1 && (
						<span className="text-terminal-border">|</span>
					)}
				</span>
			))}
		</div>
	)
}
