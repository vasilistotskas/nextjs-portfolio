import PostPage from '@components/blog/post/PostPage'
import { getPostAndMoreStories, getSettings } from '@lib/sanity/sanity.client'
import { Post, Settings } from '@lib/sanity/sanity.queries'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface PageProps {
	post: Post
	morePosts: Post[]
	settings?: Settings
	locale: string
}

interface serverSideProps {
	preview: boolean
	previewData: {
		token?: string
	}
	params: {
		slug: string
	}
	locale: string
}

export default function ProjectSlugRoute(props: PageProps) {
	const { settings, post, morePosts } = props
	return <PostPage post={post} morePosts={morePosts} settings={settings || {}} />
}

export const getServerSideProps = async (ctx: serverSideProps) => {
	const token = ctx.previewData?.token || null
	const locale = ctx.locale
	const preview = ctx.preview || false

	const [settings, { post, morePosts }, locales] = await Promise.all([
		getSettings(),
		getPostAndMoreStories(ctx.params.slug),
		serverSideTranslations(locale, ['common', 'blog_post'])
	])

	if (!post) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			post,
			morePosts,
			settings,
			preview,
			token,
			locale,
			...locales
		}
	}
}
