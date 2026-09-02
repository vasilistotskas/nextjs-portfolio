'use client'

import { useEffect, useRef, useState } from 'react'
import { ALL_LAYERS } from '@/lib/stack'
import { startStackField } from '@/lib/stack-field'
import type { Palette, StackFieldHandle } from '@/lib/stack-field'

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
		light: document.documentElement.classList.contains('dark') ? 0 : 1
	}
}

type StackFieldProps = {
	/** Bitmask of lit layers. Defaults to the whole stack. */
	litMask?: number
	className?: string
}

/**
 * The stack map. Renders nothing at all without WebGPU, which leaves the CSS
 * gradient underneath as the fallback.
 */
export default function StackField({ litMask = ALL_LAYERS, className }: StackFieldProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const fieldRef = useRef<StackFieldHandle | null>(null)
	const [failed, setFailed] = useState(false)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas || typeof navigator === 'undefined' || !('gpu' in navigator)) {
			setFailed(true)
			return
		}

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		const still = reduced.matches

		const field = startStackField(canvas, {
			palette: readPalette(),
			litMask,
			still,
			onError: () => setFailed(true)
		})
		fieldRef.current = field

		const host = canvas.parentElement ?? canvas

		const handlePointerMove = (event: PointerEvent) => {
			// Touch has no hover, and a finger dragging the page should not light
			// the map under it.
			if (event.pointerType === 'touch') return
			const rect = host.getBoundingClientRect()
			if (rect.width === 0 || rect.height === 0) return
			const aspect = rect.width / rect.height
			const fit = Math.min(1, Math.max(0.82, aspect / 1.7))
			field.setPointer(
				(((event.clientX - rect.left) / rect.width - 0.5) * aspect) / fit,
				((event.clientY - rect.top) / rect.height - 0.5) / fit,
				1
			)
		}
		const handlePointerLeave = () => field.setPointer(0, 0, 0)

		host.addEventListener('pointermove', handlePointerMove)
		host.addEventListener('pointerleave', handlePointerLeave)

		const visibility = new IntersectionObserver(
			([entry]) => field.setRunning(entry.isIntersecting && !document.hidden),
			{ threshold: 0.02 }
		)
		visibility.observe(host)

		const handleVisibilityChange = () => {
			if (document.hidden) field.setRunning(false)
		}
		document.addEventListener('visibilitychange', handleVisibilityChange)

		// In still mode nothing drives the frame boundary, so a resize needs an
		// explicit redraw to pick up the new canvas size.
		const resize = new ResizeObserver(() => field.requestFrame())
		resize.observe(host)

		return () => {
			host.removeEventListener('pointermove', handlePointerMove)
			host.removeEventListener('pointerleave', handlePointerLeave)
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			visibility.disconnect()
			resize.disconnect()
			field.dispose()
			fieldRef.current = null
		}
		// `litMask` is applied through the effect below so a change never tears
		// down the GPU context.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		fieldRef.current?.setLitMask(litMask)
	}, [litMask])

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
