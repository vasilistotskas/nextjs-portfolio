import BlogPage from '@components/blog/BlogPage'
import { usePreview } from '@lib/sanity/sanity.preview'
import {
	indexQuery,
	type Post,
	type Settings,
	settingsQuery
} from '@lib/sanity/sanity.queries'

export default function PreviewIndexPage({ token }: { token: null | string }) {
	const posts: Post[] = usePreview(token, indexQuery) || []

	const settings: Settings = usePreview(token, settingsQuery) || {}

	if (!settings.title) {
		settings.title = process.env.NEXT_SETTINGS_TITLE
	}
	if (!settings.description) {
		settings.description = [process.env.NEXT_SETTINGS_DESCRIPTION]
	}

	return <BlogPage preview posts={posts} settings={settings} />
}
