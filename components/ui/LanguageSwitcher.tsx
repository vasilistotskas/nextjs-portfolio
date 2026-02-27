'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'

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
		<div className="border-terminal-border flex items-center gap-1 rounded border px-1 py-0.5 font-mono text-xs">
			{routing.locales.map((loc, i) => (
				<span key={loc} className="flex items-center gap-1">
					<button
						onClick={() => switchLocale(loc)}
						className={
							locale === loc
								? 'text-terminal-cyan'
								: 'text-terminal-muted hover:text-terminal-text transition-colors'
						}
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
