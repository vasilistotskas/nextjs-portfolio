'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useSyncExternalStore
} from 'react'
import type { ReactNode } from 'react'
import { useServerInsertedHTML } from 'next/navigation'

/** `useLayoutEffect` warns during SSR; this is the usual isomorphic shim. */
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect

export type Theme = 'dark' | 'light'

/** Same key and values next-themes used, so an existing choice carries over. */
const STORAGE_KEY = 'theme'
const DEFAULT_THEME: Theme = 'dark'

type ThemeContextValue = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
	const value = useContext(ThemeContext)
	if (!value) throw new Error('useTheme must be used inside ThemeProvider')
	return value
}

function paint(theme: Theme) {
	const root = document.documentElement
	root.classList.remove('light', 'dark')
	root.classList.add(theme)
	root.style.colorScheme = theme
}

/**
 * Serialised into `<head>` and run before first paint, so the right theme is on
 * `<html>` before anything renders. Self-contained on purpose: it is stringified,
 * so it may not close over anything.
 */
function prePaint(key: string, fallback: string) {
	let theme = fallback
	try {
		const stored = localStorage.getItem(key)
		if (stored === 'light' || stored === 'dark') theme = stored
	} catch {
		// Private mode, or storage blocked. The fallback still applies.
	}
	const root = document.documentElement
	root.classList.remove('light', 'dark')
	root.classList.add(theme)
	root.style.colorScheme = theme
}

/**
 * The class on `<html>` is the single source of truth, so nothing can hold a
 * stale copy of the theme: the pre-paint script writes it, `setTheme` writes it,
 * and every reader observes it.
 */
function subscribe(onStoreChange: () => void) {
	const observer = new MutationObserver(onStoreChange)
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class']
	})

	// Another tab changed the theme. Applying it here moves the class, which the
	// observer above then reports to React.
	const onStorage = (event: StorageEvent) => {
		if (event.key !== STORAGE_KEY) return
		paint(event.newValue === 'light' ? 'light' : 'dark')
	}
	window.addEventListener('storage', onStorage)

	return () => {
		observer.disconnect()
		window.removeEventListener('storage', onStorage)
	}
}

function storedTheme(): Theme {
	try {
		const stored = localStorage.getItem(STORAGE_KEY)
		if (stored === 'light' || stored === 'dark') return stored
	} catch {
		// Storage blocked. The default applies.
	}
	return DEFAULT_THEME
}

function readTheme(): Theme {
	const root = document.documentElement
	if (root.classList.contains('light')) return 'light'
	if (root.classList.contains('dark')) return 'dark'
	// Nothing on <html> yet — see the re-apply in the provider below.
	return storedTheme()
}

const serverTheme = (): Theme => DEFAULT_THEME

/**
 * Replaces next-themes.
 *
 * next-themes renders its pre-paint `<script>` inside the React tree. A script
 * created during a *client* render never executes, and React 19 warns about it —
 * which is what appeared every time the locale switched and that subtree
 * remounted. `useServerInsertedHTML` puts the same script in `<head>` during SSR
 * only, so there is no script element in the client tree at all.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
	const theme = useSyncExternalStore(subscribe, readTheme, serverTheme)

	/*
		Switching locale changes the `[locale]` root layout, and Next.js resets
		every attribute on <html> when it does — class, style and data-* alike, even
		ones React never rendered. Without this the theme class vanished on every
		language switch and the page silently fell back to light. Re-applying in a
		layout effect puts it back before the browser paints, so there is no flash.
	*/
	useBeforePaint(() => {
		paint(storedTheme())
	}, [])

	useServerInsertedHTML(() => (
		<script
			dangerouslySetInnerHTML={{
				__html: `(${prePaint.toString()})(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(DEFAULT_THEME)})`
			}}
		/>
	))

	const setTheme = useCallback((next: Theme) => {
		paint(next)
		try {
			localStorage.setItem(STORAGE_KEY, next)
		} catch {
			// Not fatal: the theme still applies for this page.
		}
	}, [])

	const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
