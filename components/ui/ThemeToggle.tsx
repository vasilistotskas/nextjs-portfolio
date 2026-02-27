'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div className="border-terminal-border h-8 w-8 rounded-md border" />
	}

	const isDark = theme === 'dark'

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			className={cn(
				'relative flex h-8 w-8 items-center justify-center rounded-md border',
				'border-terminal-border text-terminal-comment',
				'transition-colors duration-200',
				'hover:border-terminal-cyan hover:text-terminal-cyan'
			)}
		>
			<AnimatePresence mode="wait" initial={false}>
				{isDark ? (
					<motion.span
						key="sun"
						initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
						animate={{ rotate: 0, opacity: 1, scale: 1 }}
						exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						className="flex items-center justify-center"
					>
						<Sun size={14} />
					</motion.span>
				) : (
					<motion.span
						key="moon"
						initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
						animate={{ rotate: 0, opacity: 1, scale: 1 }}
						exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						className="flex items-center justify-center"
					>
						<Moon size={14} />
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	)
}
