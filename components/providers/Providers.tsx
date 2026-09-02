'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { CommandPaletteProvider } from '@/components/ui/CommandPalette'

/**
 * Client-only providers.
 *
 * `ThemeProvider` sits in the server layout above this component, so the theme
 * context wraps everything here.
 */
export default function Providers({ children }: { children: ReactNode }) {
	return (
		// `reducedMotion="user"` makes every Motion animation honour the OS
		// setting without each component checking for itself.
		<MotionConfig reducedMotion="user">
			<CommandPaletteProvider>{children}</CommandPaletteProvider>
		</MotionConfig>
	)
}
