import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SpotifyUnavailableError, getTopTracks } from '@/lib/spotify'
import type { TimeRange } from '@/lib/spotify'

// A music widget that cannot authenticate is not a server error. Answer 200
// with an empty list and let the UI show its quiet state.
const UNAVAILABLE = { tracks: [], unavailable: true } as const

const VALID_RANGES = new Set<TimeRange>(['short_term', 'medium_term'])

export async function GET(request: NextRequest) {
	try {
		const timeRange = (request.nextUrl.searchParams.get('time_range') ??
			'short_term') as TimeRange

		if (!VALID_RANGES.has(timeRange)) {
			return NextResponse.json({ tracks: [] }, { status: 400 })
		}

		const response = await getTopTracks(timeRange)

		if (!response.ok) {
			return NextResponse.json(UNAVAILABLE)
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
		if (err instanceof SpotifyUnavailableError) {
			// Already logged once, with the reason, by the token refresh.
			return NextResponse.json(UNAVAILABLE)
		}
		console.error('Spotify top-tracks error:', err)
		return NextResponse.json(UNAVAILABLE)
	}
}
