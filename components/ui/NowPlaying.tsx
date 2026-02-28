'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Music } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import type { NowPlayingSong } from '@/lib/types'

function getRelativeTime(dateStr: string, t: (key: string) => string): string {
	const diff = Date.now() - new Date(dateStr).getTime()
	const minutes = Math.floor(diff / 60000)
	const hours = Math.floor(diff / 3600000)
	const days = Math.floor(diff / 86400000)

	if (minutes < 1) return t('justNow')
	if (minutes < 60) return t('minutesAgo').replace('{n}', String(minutes))
	if (hours < 24) return t('hoursAgo').replace('{n}', String(hours))
	return t('daysAgo').replace('{n}', String(days))
}

function useProgress(data: NowPlayingSong | null) {
	const [progress, setProgress] = useState(0)
	const fetchedAtRef = useRef(0)

	useEffect(() => {
		if (!data?.isPlaying || !data.progressMs || !data.durationMs) {
			return
		}

		fetchedAtRef.current = Date.now()

		let rafId: number

		const tick = () => {
			const elapsed = Date.now() - fetchedAtRef.current
			const current = Math.min(data.progressMs! + elapsed, data.durationMs!)
			setProgress(current)

			if (current < data.durationMs!) {
				rafId = requestAnimationFrame(tick)
			}
		}

		rafId = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(rafId)
	}, [data])

	if (!data?.isPlaying || !data.progressMs || !data.durationMs) {
		return 0
	}

	return progress
}

export default function NowPlaying() {
	const t = useTranslations('spotify')
	const [data, setData] = useState<NowPlayingSong | null>(null)
	const progress = useProgress(data)

	useEffect(() => {
		const fetchNowPlaying = async () => {
			try {
				const res = await fetch('/api/spotify/now-playing')
				if (res.ok) {
					const json = (await res.json()) as NowPlayingSong
					setData(json)
				}
			} catch {
				// silently fail
			}
		}

		fetchNowPlaying()
		const interval = setInterval(fetchNowPlaying, 30000)
		return () => clearInterval(interval)
	}, [])

	// Nothing at all — no current track, no recent track
	if (!data?.title) {
		return (
			<div className="text-terminal-muted flex items-center gap-2 font-mono text-xs">
				<Music size={12} />
				<span>{t('notPlaying')}</span>
			</div>
		)
	}

	const label = data.isPlaying
		? t('nowPlaying')
		: data.playedAt
			? t('lastPlayed').replace('{time}', getRelativeTime(data.playedAt, t))
			: t('notPlaying')

	const showProgress = data.isPlaying && data.durationMs && data.durationMs > 0
	const pct = showProgress ? Math.min((progress / data.durationMs!) * 100, 100) : 0

	return (
		<div className="flex items-center gap-3">
			<a
				href={data.songUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
			>
				{data.albumImageUrl && (
					<div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded">
						<Image
							src={data.albumImageUrl}
							alt={data.album ?? 'Album art'}
							fill
							className="object-cover"
						sizes="32px"
						/>
					</div>
				)}
				<div className="min-w-0">
					<p
						className={`truncate font-mono text-xs ${data.isPlaying ? 'text-terminal-green' : 'text-terminal-muted'}`}
					>
						{label}
					</p>
					<p className="text-terminal-text truncate font-mono text-xs">
						{data.title} —{' '}
						<span className="text-terminal-comment">{data.artist}</span>
					</p>
					{showProgress && (
						<div className="mt-1 flex items-center gap-2">
							<div className="bg-terminal-border h-1 w-24 overflow-hidden rounded-full">
								<div
									className="bg-terminal-green h-full rounded-full transition-[width] duration-1000 ease-linear"
									style={{ width: `${pct}%` }}
								/>
							</div>
							<span className="text-terminal-muted whitespace-nowrap font-mono text-[10px]">
								{formatDuration(progress)} / {formatDuration(data.durationMs!)}
							</span>
						</div>
					)}
				</div>
			</a>
		</div>
	)
}
