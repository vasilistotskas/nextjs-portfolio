'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	)

	if (!mounted) {
		return <div className="border-terminal-border h-8 w-8 rounded-md border" />
	}

	const isDark = theme === 'dark'

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			className={cn(
				'relative grid h-8 w-8 cursor-pointer place-items-center rounded-md border',
				'border-terminal-border text-terminal-comment',
				'transition-colors duration-200',
				'hover:border-terminal-green hover:text-terminal-green'
			)}
		>
			{/* Both icons stay rendered; `.theme-icon` cross-fades them off the
			    theme class on <html>, so no exit animation needs JavaScript. */}
			<Sun size={14} aria-hidden className="theme-icon theme-icon-sun" />
			<Moon size={14} aria-hidden className="theme-icon theme-icon-moon" />
		</button>
	)
}
