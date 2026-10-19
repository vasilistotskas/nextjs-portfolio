'use client'

import type { ReactNode } from 'react'
import { CommandPaletteProvider } from '@/components/ui/CommandPalette'

/**
 * Client-only providers.
 *
 * `ThemeProvider` sits in the server layout above this component, so the theme
 * context wraps everything here.
 */
export default function Providers({ children }: { children: ReactNode }) {
	return <CommandPaletteProvider>{children}</CommandPaletteProvider>
}
