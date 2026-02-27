import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Track } from '@/lib/types'
import { formatDuration } from '@/lib/utils'

async function fetchTopTracks(): Promise<Track[]> {
	try {
		const { getTopTracks } = await import('@/lib/spotify')
		const response = await getTopTracks()
		if (!response.ok) return []

		type SpotifyTopTracks = {
			items: Array<{
				name: string
				artists: Array<{ name: string }>
				album: { name: string; images: Array<{ url: string }> }
				external_urls: { spotify: string }
				duration_ms: number
			}>
		}

		const data = (await response.json()) as SpotifyTopTracks
		return data.items.slice(0, 10).map((track) => ({
			title: track.name,
			artist: track.artists.map((a) => a.name).join(', '),
			album: track.album.name,
			albumImageUrl: track.album.images[0]?.url ?? '',
			songUrl: track.external_urls.spotify,
			duration: track.duration_ms
		}))
	} catch {
		return []
	}
}

function TopTracksContent({ tracks }: { tracks: Track[] }) {
	const t = useTranslations('about.spotify')

	if (tracks.length === 0) {
		return <p className="text-terminal-muted font-mono text-sm">No tracks available</p>
	}

	return (
		<div>
			<p className="text-terminal-comment mb-4 font-mono text-xs">{t('subtitle')}</p>
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
		</div>
	)
}

export default async function TopTracks() {
	const tracks = await fetchTopTracks()
	return <TopTracksContent tracks={tracks} />
}
