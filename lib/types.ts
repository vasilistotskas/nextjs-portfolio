export type GuestbookEntry = {
	id: string
	email: string
	body: string
	created_by: string
	created_at: string
	updated_at: string
}

export enum Form {
	Initial,
	Loading,
	Success,
	Error
}

export type FormState = {
	state: Form
	message?: string
}

export type Views = {
	total: number
}

export type Song = {
	songUrl: string
	artist: string
	title: string
}

export type NowPlayingSong = {
	album: string
	albumImageUrl: string
	artist: string
	isPlaying: boolean
	songUrl: string
	title: string
}

export type TopTracks = {
	tracks: Song[]
}

export type YouTube = {
	subscriberCount: number
	viewCount: number
}

export type GitHub = {
	stars: number
}

export type Unsplash = {
	downloads: number
	views: number
}
