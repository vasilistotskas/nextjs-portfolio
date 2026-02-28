'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { Track } from '@/lib/types'
import { cn, formatDuration } from '@/lib/utils'

type TimeRange = 'short_term' | 'medium_term'

const TIME_RANGES: TimeRange[] = ['short_term', 'medium_term']

export default function TopTracks() {
	const t = useTranslations('about.spotify')
	const [timeRange, setTimeRange] = useState<TimeRange>('short_term')
	const [tracks, setTracks] = useState<Track[] | null>(null)
	const [fetchId, setFetchId] = useState(0)

	const loading = tracks === null || fetchId > 0

	useEffect(() => {
		let cancelled = false

		fetch(`/api/spotify/top-tracks?time_range=${timeRange}`)
			.then((res) => res.json())
			.then((data: { tracks: Track[] }) => {
				if (!cancelled) {
					setTracks(data.tracks)
					setFetchId(0)
				}
			})
			.catch(() => {
				if (!cancelled) {
					setTracks([])
					setFetchId(0)
				}
			})

		return () => {
			cancelled = true
		}
	}, [timeRange])

	const handleRangeChange = (range: TimeRange) => {
		setFetchId((n) => n + 1)
		setTimeRange(range)
	}

	return (
		<div>
			<p className="text-terminal-comment mb-4 font-mono text-xs">{t('subtitle')}</p>

			{/* Time range toggle */}
			<div className="mb-4 flex gap-1 rounded-lg border border-[var(--border)] p-1">
				{TIME_RANGES.map((range) => (
					<button
						key={range}
						type="button"
						onClick={() => handleRangeChange(range)}
						className={cn(
							'flex-1 rounded-md px-2 py-1 font-mono text-[10px] transition-colors',
							timeRange === range
								? 'bg-terminal-green/10 text-terminal-green'
								: 'text-terminal-muted hover:text-terminal-text'
						)}
					>
						{t(`range.${range}`)}
					</button>
				))}
			</div>

			{/* Track list */}
			{loading ? (
				<div className="space-y-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="flex items-center gap-3">
							<span className="text-terminal-muted w-5 font-mono text-xs">
								{String(i + 1).padStart(2, '0')}
							</span>
							<div className="bg-terminal-border h-8 w-8 animate-pulse rounded" />
							<div className="flex-1 space-y-1">
								<div className="bg-terminal-border h-3 w-3/4 animate-pulse rounded" />
								<div className="bg-terminal-border h-2.5 w-1/2 animate-pulse rounded" />
							</div>
						</div>
					))}
				</div>
			) : tracks.length === 0 ? (
				<p className="text-terminal-muted font-mono text-sm">
					{t('noTracks')}
				</p>
			) : (
				<ol className="space-y-3">
					{tracks.map((track, i) => (
						<li key={track.songUrl}>
							<a
								href={track.songUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-3 transition-opacity hover:opacity-80"
							>
								<span className="text-terminal-muted w-5 font-mono text-xs">
									{String(i + 1).padStart(2, '0')}
								</span>
								{track.albumImageUrl && (
									<div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded">
										<Image
											src={track.albumImageUrl}
											alt={track.album}
											fill
											className="object-cover"
										sizes="32px"
										/>
									</div>
								)}
								<div className="min-w-0 flex-1">
									<p className="text-terminal-text group-hover:text-terminal-cyan truncate font-mono text-sm">
										{track.title}
									</p>
									<p className="text-terminal-comment truncate font-mono text-xs">
										{track.artist}
									</p>
								</div>
								<span className="text-terminal-muted flex-shrink-0 font-mono text-xs">
									{formatDuration(track.duration)}
								</span>
							</a>
						</li>
					))}
				</ol>
			)}
		</div>
	)
}
