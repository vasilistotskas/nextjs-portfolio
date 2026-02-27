'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Music } from 'lucide-react'
import type { NowPlayingSong } from '@/lib/types'

export default function NowPlaying() {
	const t = useTranslations('spotify')
	const [data, setData] = useState<NowPlayingSong | null>(null)

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

	if (!data?.isPlaying) {
		return (
			<div className="text-terminal-muted flex items-center gap-2 font-mono text-xs">
				<Music size={12} />
				<span>{t('notPlaying')}</span>
			</div>
		)
	}

	return (
		<a
			href={data.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-3 transition-opacity hover:opacity-80"
		>
			{data.albumImageUrl && (
				<div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded">
					<Image
						src={data.albumImageUrl}
						alt={data.album ?? 'Album art'}
						fill
						className="object-cover"
					/>
				</div>
			)}
			<div className="min-w-0">
				<p className="text-terminal-green truncate font-mono text-xs">
					{t('nowPlaying')}
				</p>
				<p className="text-terminal-text truncate font-mono text-xs">
					{data.title} — <span className="text-terminal-comment">{data.artist}</span>
				</p>
			</div>
		</a>
	)
}
