import { clock, effect, frame, frameLoop, init, surface } from 'vgpu'
import type { Effect, FrameLoopHandle, Surface } from 'vgpu'
import shaderSource from '@/components/ui/hero-field.wgsl'

type Gpu = Awaited<ReturnType<typeof init>>

export type Palette = {
	accent: readonly [number, number, number]
	ground: readonly [number, number, number]
	/** 1 when the page is on a light ground, 0 on a dark one. */
	light: 0 | 1
}

export type HeroFieldOptions = {
	palette: Palette
	/** Render one frozen frame instead of animating. */
	still: boolean
	onError: () => void
}

export type HeroFieldHandle = {
	setPointer: (x: number, y: number, on: 0 | 1) => void
	setPalette: (palette: Palette) => void
	/** Pause when the hero scrolls away or the tab is hidden. */
	setRunning: (running: boolean) => void
	/** Redraw a still frame; a no-op while the loop is running. */
	requestFrame: () => void
	dispose: () => void
}

/**
 * Visible text lines, from the canvas's CSS height. The hero is a tall panel on
 * desktop and a short band on mobile; a fixed line count turned that band into
 * noise, and deriving it from device pixels made the glyphs change size with the
 * display's pixel ratio.
 */
const linesFor = (cssHeight: number) =>
	Math.max(12, Math.min(26, Math.round(cssHeight / 22)))

const FPS = 30
/** Frozen clock reading for the reduced-motion frame — a settled, legible pose. */
const STILL_TIME = 21.5

export function startHeroField(
	canvas: HTMLCanvasElement,
	{ palette, still, onError }: HeroFieldOptions
): HeroFieldHandle {
	let disposed = false
	let gpu: Gpu | undefined
	let output: Surface | undefined
	let field: Effect | undefined
	let loop: FrameLoopHandle | undefined
	let unsubscribeResize: (() => void) | undefined
	let pendingFrame = 0

	// Kept outside the render callback so the value survives until the context
	// finishes initialising.
	let currentPalette = palette
	let running = true
	const pointer = { x: 0, y: 0, on: 0 as 0 | 1 }

	const drawStill = () => {
		if (disposed || !field || !output) return
		field.set({ params: { time: STILL_TIME } })
		frame(gpu!, (currentFrame) => currentFrame.pass(output!, field!))
	}

	// `frame()` may not be called from inside a resize callback, and in still
	// mode nothing else drives the frame boundary, so hop to the next tick.
	const scheduleStill = () => {
		if (disposed || pendingFrame) return
		pendingFrame = requestAnimationFrame(() => {
			pendingFrame = 0
			drawStill()
		})
	}

	const startLoop = () => {
		if (disposed || loop || !field || !output || !gpu) return
		const time = clock(gpu)
		loop = frameLoop(
			gpu,
			(currentFrame) => {
				// Per-frame values only. `set()` writes immediately, so anything
				// that has not changed stays out of this callback.
				field!.set({
					params: {
						time: time.time,
						pointer: [pointer.x, pointer.y],
						pointerOn: pointer.on
					}
				})
				currentFrame.pass(output!, field!)
			},
			{ fps: FPS }
		)
	}

	const stopLoop = () => {
		loop?.stop()
		loop = undefined
	}

	void (async () => {
		try {
			const context = await init({ label: 'hero-field' })
			if (disposed) {
				context.dispose()
				return
			}
			gpu = context

			const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] })
			output = canvasSurface

			field = effect(gpu, shaderSource, {
				label: 'hero-field',
				set: {
					params: {
						time: still ? STILL_TIME : 0,
						aspect: canvasSurface.size[0] / Math.max(1, canvasSurface.size[1]),
						theme: currentPalette.light,
						pointerOn: 0,
						pointer: [0, 0],
						texel: canvasSurface.texelSize,
						accent: [...currentPalette.accent, 1],
						ground: [...currentPalette.ground, 1],
						lines: linesFor(canvas.clientHeight || 400)
					}
				}
			})

			// Resolution-class values belong here, not in the render loop.
			unsubscribeResize = canvasSurface.onResize(({ width, height }) => {
				field?.set({
					params: {
						texel: canvasSurface.texelSize,
						aspect: width / Math.max(1, height),
						lines: linesFor(canvas.clientHeight || 400)
					}
				})
			})

			if (still) {
				scheduleStill()
			} else if (running) {
				startLoop()
			}
		} catch {
			if (!disposed) onError()
		}
	})()

	return {
		setPointer(x, y, on) {
			pointer.x = x
			pointer.y = y
			pointer.on = on
			if (still && on) scheduleStill()
		},
		setPalette(next) {
			currentPalette = next
			field?.set({
				params: {
					theme: next.light,
					accent: [...next.accent, 1],
					ground: [...next.ground, 1]
				}
			})
			if (still) scheduleStill()
		},
		setRunning(next) {
			running = next
			if (still) return
			if (next) startLoop()
			else stopLoop()
		},
		requestFrame() {
			if (still) scheduleStill()
		},
		dispose() {
			if (disposed) return
			disposed = true
			if (pendingFrame) cancelAnimationFrame(pendingFrame)
			stopLoop()
			unsubscribeResize?.()
			// React strict mode mounts effects twice; without this each remount
			// leaks a device and a render loop.
			gpu?.dispose()
		}
	}
}
