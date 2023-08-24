import BlogPage from '@components/blog/BlogPage'
import { useLiveQuery } from 'next-sanity/preview'
import { indexQuery, settingsQuery } from '@lib/sanity/sanity.queries'

export default function PreviewIndexPage({ blogMetaImage, data: initialData }) {
	const [posts, postsLoading] = useLiveQuery(initialData, indexQuery) || []
	const [settings, settingsLoading] = useLiveQuery(initialData, settingsQuery) || []

	if (postsLoading || settingsLoading) {
		return <>Loading...</>
	}

	return (
		<BlogPage preview posts={posts} settings={settings} blogMetaImage={blogMetaImage} />
	)
}
