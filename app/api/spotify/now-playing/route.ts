import { NextResponse } from 'next/server'
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify'

export const runtime = 'edge'

type SpotifyCurrentlyPlaying = {
	is_playing: boolean
	progress_ms: number
	item: {
		name: string
		duration_ms: number
		artists: Array<{ name: string }>
		album: {
			name: string
			images: Array<{ url: string }>
		}
		external_urls: { spotify: string }
	}
}

type SpotifyRecentlyPlayed = {
	items: Array<{
		track: {
			name: string
			artists: Array<{ name: string }>
			album: {
				name: string
				images: Array<{ url: string }>
			}
			external_urls: { spotify: string }
		}
		played_at: string
	}>
}

export async function GET() {
	try {
		const response = await getNowPlaying()

		if (response.status !== 204 && response.status <= 400) {
			const song = (await response.json()) as SpotifyCurrentlyPlaying

			if (song.item) {
				return NextResponse.json({
					isPlaying: song.is_playing,
					title: song.item.name,
					artist: song.item.artists.map((a) => a.name).join(', '),
					album: song.item.album.name,
					albumImageUrl: song.item.album.images[0]?.url ?? '',
					songUrl: song.item.external_urls.spotify,
					progressMs: song.progress_ms,
					durationMs: song.item.duration_ms
				})
			}
		}

		// Fall back to recently played
		const recentResponse = await getRecentlyPlayed(1)

		if (recentResponse.ok) {
			const recent = (await recentResponse.json()) as SpotifyRecentlyPlayed
			const lastTrack = recent.items[0]

			if (lastTrack) {
				return NextResponse.json({
					isPlaying: false,
					title: lastTrack.track.name,
					artist: lastTrack.track.artists.map((a) => a.name).join(', '),
					album: lastTrack.track.album.name,
					albumImageUrl: lastTrack.track.album.images[0]?.url ?? '',
					songUrl: lastTrack.track.external_urls.spotify,
					playedAt: lastTrack.played_at
				})
			}
		}

		return NextResponse.json({ isPlaying: false })
	} catch (err) {
		console.error('Spotify now-playing error:', err)
		return NextResponse.json({ isPlaying: false })
	}
}
