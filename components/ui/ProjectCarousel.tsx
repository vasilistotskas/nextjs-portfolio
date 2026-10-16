'use client'

import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const arrowClass =
	'terminal-border text-terminal-text hover:text-terminal-green flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-35'

/**
 * A scroll-snap row of cards: the browser does the scrolling, so touch, wheel
 * and keyboard work natively. The arrows and the "view all" link sit above it.
 */
export default function ProjectCarousel({
	count,
	children
}: {
	/** How many projects exist in total, shown on the "view all" link. */
	count: number
	children: ReactNode
}) {
	const t = useTranslations('projects')
	const locale = useLocale()
	const track = useRef<HTMLUListElement>(null)
	const [edges, setEdges] = useState({ start: true, end: true })

	const measure = useCallback(() => {
		const el = track.current
		if (!el) return
		// Sub-pixel scroll positions leave the end a fraction short of exact.
		setEdges({
			start: el.scrollLeft <= 1,
			end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
		})
	}, [])

	useEffect(() => {
		const el = track.current
		if (!el) return
		// Fires once on observe, so the arrows are right before any scrolling.
		const observer = new ResizeObserver(measure)
		observer.observe(el)
		return () => observer.disconnect()
	}, [measure])

	const step = (direction: 1 | -1) => {
		const el = track.current
		const card = el?.firstElementChild
		if (!el || !card) return
		const gap = parseFloat(getComputedStyle(el).columnGap) || 0
		// Smoothness comes from CSS `scroll-behavior`, which honours reduced motion.
		el.scrollBy({ left: direction * (card.clientWidth + gap) })
	}

	return (
		<div>
			<div className="mb-4 flex items-center justify-between gap-4">
				<Link
					href={`/${locale}/projects`}
					className="text-terminal-green flex items-center gap-1.5 font-mono text-xs hover:underline"
				>
					{t('viewAll', { count })}
					<ArrowRight size={12} />
				</Link>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => step(-1)}
						disabled={edges.start}
						aria-label={t('previous')}
						className={arrowClass}
					>
						<ChevronLeft size={16} />
					</button>
					<button
						type="button"
						onClick={() => step(1)}
						disabled={edges.end}
						aria-label={t('next')}
						className={arrowClass}
					>
						<ChevronRight size={16} />
					</button>
				</div>
			</div>

			<ul
				ref={track}
				onScroll={measure}
				aria-label={t('carouselLabel')}
				className="m-0 -my-3 flex snap-x snap-mandatory [scrollbar-width:none] list-none gap-5 overflow-x-auto scroll-smooth px-0 py-3 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
			>
				{Children.map(children, (child) => (
					<li className="min-w-0 shrink-0 basis-full snap-start md:basis-[calc((100%-1.25rem)/2)]">
						{child}
					</li>
				))}
			</ul>
		</div>
	)
}
