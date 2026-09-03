'use client'

import { useEffect, useRef, useState } from 'react'
import { startHeroField } from '@/lib/hero-field'
import type { HeroFieldHandle, Palette } from '@/lib/hero-field'

function channels(value: string): [number, number, number] {
	const hex = value.trim().replace('#', '')
	const full =
		hex.length === 3
			? hex
					.split('')
					.map((c) => c + c)
					.join('')
			: hex
	const n = Number.parseInt(full, 16)
	if (Number.isNaN(n)) return [0.2, 0.83, 0.6]
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function readPalette(): Palette {
	const style = getComputedStyle(document.documentElement)
	return {
		accent: channels(style.getPropertyValue('--green')),
		ground: channels(style.getPropertyValue('--bg')),
		light: document.documentElement.classList.contains('light') ? 1 : 0
	}
}

/**
 * The hero field. Renders nothing at all without WebGPU, which leaves the CSS
 * gradient underneath as the fallback.
 */
export default function HeroField({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const fieldRef = useRef<HeroFieldHandle | null>(null)
	const [failed, setFailed] = useState(false)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas || typeof navigator === 'undefined' || !('gpu' in navigator)) {
			setFailed(true)
			return
		}

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		const still = reduced.matches

		const field = startHeroField(canvas, {
			palette: readPalette(),
			still,
			onError: () => setFailed(true)
		})
		fieldRef.current = field

		const host = canvas.parentElement ?? canvas
		/*
			Listen on the section, not on the canvas wrapper. The hero copy sits
			above the wrapper on a higher stacking layer and spans the whole hero,
			so it swallowed every pointer event before the field saw one — the
			cursor did nothing on desktop, which the animation hid. Geometry is
			still measured from the wrapper, so coordinates are unchanged.
		*/
		const interaction: HTMLElement = canvas.closest('section') ?? host

		const handlePointerMove = (event: PointerEvent) => {
			// Touch has no hover, and a finger dragging the page should not light
			// the field under it.
			if (event.pointerType === 'touch') return
			const rect = host.getBoundingClientRect()
			if (rect.width === 0 || rect.height === 0) return
			const aspect = rect.width / rect.height
			field.setPointer(
				((event.clientX - rect.left) / rect.width - 0.5) * aspect,
				(event.clientY - rect.top) / rect.height - 0.5,
				1
			)
		}
		const handlePointerLeave = () => field.setPointer(0, 0, 0)

		interaction.addEventListener('pointermove', handlePointerMove)
		interaction.addEventListener('pointerleave', handlePointerLeave)

		/*
			Run only while the hero is on screen and the tab is in front. Both
			conditions are tracked, because an earlier version only ever *stopped*
			on `visibilitychange` and never started again — open the site in a
			background tab, come back to it, and the field was frozen for good.
		*/
		let onScreen = false
		const sync = () => field.setRunning(onScreen && !document.hidden)

		const visibility = new IntersectionObserver(
			([entry]) => {
				onScreen = entry.isIntersecting
				sync()
			},
			{ threshold: 0.02 }
		)
		visibility.observe(host)

		document.addEventListener('visibilitychange', sync)

		// In still mode nothing drives the frame boundary, so a resize needs an
		// explicit redraw to pick up the new canvas size.
		const resize = new ResizeObserver(() => field.requestFrame())
		resize.observe(host)

		return () => {
			interaction.removeEventListener('pointermove', handlePointerMove)
			interaction.removeEventListener('pointerleave', handlePointerLeave)
			document.removeEventListener('visibilitychange', sync)
			visibility.disconnect()
			resize.disconnect()
			field.dispose()
			fieldRef.current = null
		}
	}, [])

	/*
		Follow the class on <html> rather than the theme context. The provider
		flips that class from an effect in a parent component, and child effects
		run first — so reacting to the context value reads the *previous* theme's
		CSS variables and the canvas keeps the old palette. The DOM is the one
		source that is never stale.
	*/
	useEffect(() => {
		if (typeof document === 'undefined') return

		const root = document.documentElement
		const apply = () => fieldRef.current?.setPalette(readPalette())

		apply()
		const observer = new MutationObserver(apply)
		observer.observe(root, { attributes: true, attributeFilter: ['class', 'style'] })
		return () => observer.disconnect()
	}, [])

	if (failed) return null

	return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
