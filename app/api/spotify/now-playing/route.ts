import { NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify'

export const runtime = 'edge'

export async function GET() {
	try {
		const response = await getNowPlaying()

		if (response.status === 204 || response.status > 400) {
			return NextResponse.json({ isPlaying: false })
		}

		type SpotifyCurrentlyPlaying = {
			is_playing: boolean
			item: {
				name: string
				artists: Array<{ name: string }>
				album: {
					name: string
					images: Array<{ url: string }>
				}
				external_urls: { spotify: string }
			}
		}

		const song = (await response.json()) as SpotifyCurrentlyPlaying

		if (!song.item) {
			return NextResponse.json({ isPlaying: false })
		}

		return NextResponse.json({
			isPlaying: song.is_playing,
			title: song.item.name,
			artist: song.item.artists.map((a) => a.name).join(', '),
			album: song.item.album.name,
			albumImageUrl: song.item.album.images[0]?.url ?? '',
			songUrl: song.item.external_urls.spotify
		})
	} catch (err) {
		console.error('Spotify now-playing error:', err)
		return NextResponse.json({ isPlaying: false })
	}
}
