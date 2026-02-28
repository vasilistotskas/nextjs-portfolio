export type NowPlayingSong = {
	isPlaying: boolean
	title?: string
	artist?: string
	album?: string
	albumImageUrl?: string
	songUrl?: string
	playedAt?: string
	progressMs?: number
	durationMs?: number
}

export type Track = {
	title: string
	artist: string
	album: string
	albumImageUrl: string
	songUrl: string
	duration: number
}

export type GitHubStats = {
	stars: number
	followers: number
	repos: number
}
