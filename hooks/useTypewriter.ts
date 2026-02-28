'use client'

import { useEffect, useState, useCallback } from 'react'

type UseTypewriterOptions = {
	text: string
	baseSpeed?: number
	variationRange?: number
	startDelay?: number
	onComplete?: () => void
	enabled?: boolean
}

export function useTypewriter({
	text,
	baseSpeed = 45,
	variationRange = 25,
	startDelay = 0,
	onComplete,
	enabled = true
}: UseTypewriterOptions) {
	const [charIndex, setCharIndex] = useState(0)
	const [active, setActive] = useState(false)

	const isComplete = charIndex >= text.length
	const displayedText = text.slice(0, charIndex)

	// Start typing after delay when enabled becomes true
	useEffect(() => {
		if (!enabled || active) return

		const timer = setTimeout(() => setActive(true), startDelay)
		return () => clearTimeout(timer)
	}, [enabled, active, startDelay])

	// Type characters one by one via chained timeouts
	useEffect(() => {
		if (!active || charIndex >= text.length) return

		const char = text[charIndex]
		const pause =
			char === ' '
				? baseSpeed + variationRange * 1.5
				: baseSpeed + (Math.random() - 0.5) * 2 * variationRange
		const delay = Math.max(15, pause)

		const timer = setTimeout(() => setCharIndex((prev) => prev + 1), delay)
		return () => clearTimeout(timer)
	}, [active, charIndex, text, baseSpeed, variationRange])

	// Fire onComplete when done
	const stableOnComplete = useCallback(() => {
		onComplete?.()
	}, [onComplete])

	useEffect(() => {
		if (isComplete && active && text.length > 0) {
			stableOnComplete()
		}
	}, [isComplete, active, text.length, stableOnComplete])

	return { displayedText, isComplete }
}
