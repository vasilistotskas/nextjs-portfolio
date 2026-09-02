'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Clock, Music, Repeat } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import type { NowPlayingSong, Track } from '@/lib/types'

type Mode = 'loading' | 'live' | 'recent' | 'repeat' | 'quiet'

type Shown = {
	mode: Mode
	title?: string
	artist?: string
	album?: string
	albumImageUrl?: string
	songUrl?: string
	playedAt?: string
	progressMs?: number
	durationMs?: number
}

function relativeTime(dateStr: string, t: (key: string) => string): string {
	const diff = Date.now() - new Date(dateStr).getTime()
	const minutes = Math.floor(diff / 60000)
	const hours = Math.floor(diff / 3600000)
	const days = Math.floor(diff / 86400000)

	if (minutes < 1) return t('justNow')
	if (minutes < 60) return t('minutesAgo').replace('{n}', String(minutes))
	if (hours < 24) return t('hoursAgo').replace('{n}', String(hours))
	return t('daysAgo').replace('{n}', String(days))
}

/** Smooth the progress bar between the 30-second polls. */
function useProgress(song: Shown) {
	const [progress, setProgress] = useState(0)
	const fetchedAt = useRef(0)

	const live = song.mode === 'live' && song.progressMs != null && song.durationMs != null

	useEffect(() => {
		if (!live) return
		fetchedAt.current = Date.now()
		let raf = 0

		const tick = () => {
			const elapsed = Date.now() - fetchedAt.current
			const current = Math.min(song.progressMs! + elapsed, song.durationMs!)
			setProgress(current)
			if (current < song.durationMs!) raf = requestAnimationFrame(tick)
		}

		raf = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(raf)
	}, [live, song.progressMs, song.durationMs])

	return live ? progress : 0
}

export default function NowPlaying() {
	const t = useTranslations('spotify')
	const [song, setSong] = useState<Shown>({ mode: 'loading' })
	const progress = useProgress(song)

	useEffect(() => {
		let cancelled = false
		let interval: ReturnType<typeof setInterval> | undefined

		// Nothing to poll for once Spotify says it cannot answer; a reload is the
		// only thing that can change the outcome.
		const stopPolling = () => {
			if (interval) clearInterval(interval)
			interval = undefined
		}

		// Nothing playing is the normal state, not a failure — fall back to what
		// is actually on repeat rather than printing a hardcoded track.
		const loadRepeat = async (): Promise<Shown> => {
			try {
				const res = await fetch('/api/spotify/top-tracks?time_range=short_term')
				if (!res.ok) return { mode: 'quiet' }
				const data = (await res.json()) as { tracks: Track[] }
				const top = data.tracks?.[0]
				if (!top) return { mode: 'quiet' }
				return {
					mode: 'repeat',
					title: top.title,
					artist: top.artist,
					album: top.album,
					albumImageUrl: top.albumImageUrl,
					songUrl: top.songUrl
				}
			} catch {
				return { mode: 'quiet' }
			}
		}

		const load = async () => {
			try {
				const res = await fetch('/api/spotify/now-playing')
				if (!res.ok) throw new Error(String(res.status))
				const data = (await res.json()) as NowPlayingSong

				if (data.unavailable) {
					stopPolling()
					if (!cancelled) setSong({ mode: 'quiet' })
					return
				}

				if (data.title) {
					const next: Shown = {
						mode: data.isPlaying ? 'live' : 'recent',
						title: data.title,
						artist: data.artist,
						album: data.album,
						albumImageUrl: data.albumImageUrl,
						songUrl: data.songUrl,
						playedAt: data.playedAt,
						progressMs: data.progressMs,
						durationMs: data.durationMs
					}
					if (!cancelled) setSong(next)
					return
				}

				const fallback = await loadRepeat()
				if (!cancelled) setSong(fallback)
			} catch {
				stopPolling()
				if (!cancelled) setSong({ mode: 'quiet' })
			}
		}

		void load()
		interval = setInterval(() => void load(), 30000)
		return () => {
			cancelled = true
			stopPolling()
		}
	}, [])

	if (song.mode === 'loading') {
		return (
			<div className="flex items-center gap-3" aria-hidden="true">
				<div className="bg-terminal-border/60 h-11 w-11 shrink-0 animate-pulse rounded" />
				<div className="space-y-1.5">
					<div className="bg-terminal-border/60 h-2.5 w-20 animate-pulse rounded" />
					<div className="bg-terminal-border/40 h-2.5 w-32 animate-pulse rounded" />
				</div>
			</div>
		)
	}

	if (song.mode === 'quiet') {
		return (
			<div className="text-terminal-muted flex items-center gap-3">
				<span className="bg-terminal-surface/60 border-terminal-border flex h-11 w-11 shrink-0 items-center justify-center rounded border">
					<Music size={15} />
				</span>
				<p className="font-mono text-xs">{t('quiet')}</p>
			</div>
		)
	}

	const label =
		song.mode === 'live'
			? t('nowPlaying')
			: song.mode === 'repeat'
				? t('onRepeat')
				: song.playedAt
					? t('lastPlayed').replace('{time}', relativeTime(song.playedAt, t))
					: t('lastPlayed').replace('{time}', '')

	const showProgress = song.mode === 'live' && !!song.durationMs
	const percent = showProgress ? Math.min((progress / song.durationMs!) * 100, 100) : 0

	return (
		<a
			href={song.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex max-w-full min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
		>
			{song.albumImageUrl ? (
				<span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded">
					<Image
						src={song.albumImageUrl}
						alt=""
						fill
						className="object-cover"
						sizes="44px"
					/>
				</span>
			) : (
				<span className="bg-terminal-surface/60 border-terminal-border flex h-11 w-11 shrink-0 items-center justify-center rounded border">
					<Music size={15} className="text-terminal-muted" />
				</span>
			)}

			<span className="min-w-0 flex-1">
				<span
					className={`flex items-center gap-2 font-mono text-[11px] ${
						song.mode === 'live' ? 'text-terminal-green' : 'text-terminal-muted'
					}`}
				>
					{song.mode === 'live' ? (
						// Three bars beat the word "live": the state reads before the label.
						<span className="eq" aria-hidden="true">
							<i />
							<i />
							<i />
						</span>
					) : song.mode === 'repeat' ? (
						<Repeat size={11} aria-hidden="true" />
					) : (
						<Clock size={11} aria-hidden="true" />
					)}
					{label}
				</span>

				<span className="text-terminal-text mt-0.5 block truncate font-mono text-xs">
					{song.title}
					{song.artist ? (
						<span className="text-terminal-comment"> — {song.artist}</span>
					) : null}
				</span>

				{showProgress && (
					<span className="mt-1.5 flex items-center gap-2">
						<span className="bg-terminal-border block h-[3px] w-24 overflow-hidden rounded-full">
							<span
								className="bg-terminal-green block h-full rounded-full transition-[width] duration-1000 ease-linear"
								style={{ width: `${percent}%` }}
							/>
						</span>
						<span className="text-terminal-muted font-mono text-[10px] whitespace-nowrap">
							{formatDuration(progress)} / {formatDuration(song.durationMs!)}
						</span>
					</span>
				)}
			</span>
		</a>
	)
}
