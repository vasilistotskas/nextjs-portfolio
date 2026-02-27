import { NextResponse } from 'next/server'
import { getTopTracks } from '@/lib/spotify'

export async function GET() {
	try {
		const response = await getTopTracks()

		if (!response.ok) {
			return NextResponse.json({ tracks: [] }, { status: 502 })
		}

		type SpotifyTopTracks = {
			items: Array<{
				name: string
				artists: Array<{ name: string }>
				album: {
					name: string
					images: Array<{ url: string }>
				}
				external_urls: { spotify: string }
				duration_ms: number
			}>
		}

		const data = (await response.json()) as SpotifyTopTracks

		const tracks = data.items.slice(0, 10).map((track) => ({
			title: track.name,
			artist: track.artists.map((a) => a.name).join(', '),
			album: track.album.name,
			albumImageUrl: track.album.images[0]?.url ?? '',
			songUrl: track.external_urls.spotify,
			duration: track.duration_ms
		}))

		return NextResponse.json(
			{ tracks },
			{
				headers: {
					'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
				}
			}
		)
	} catch (err) {
		console.error('Spotify top-tracks error:', err)
		return NextResponse.json({ tracks: [] }, { status: 500 })
	}
}
