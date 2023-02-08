import { PreviewSuspense } from '@sanity/preview-kit'
import PostPage from '@components/blog/post/PostPage'
import { getPostAndMoreStories, getSettings } from '@lib/sanity/sanity.client'
import { Post, Settings } from '@lib/sanity/sanity.queries'
import { lazy } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PreviewPostPage = lazy(() => import('components/blog/post/PreviewPostPage'))

interface PageProps {
	post: Post
	morePosts: Post[]
	settings?: Settings
	preview: boolean
	token: string | null
	locale: string
}

export default function ProjectSlugRoute(props: PageProps) {
	const { settings, post, morePosts, preview, token, locale } = props

	if (preview) {
		return (
			<PreviewSuspense
				fallback={
					<PostPage
						loading
						preview
						post={post}
						morePosts={morePosts}
						settings={settings ?? {}}
					/>
				}
			>
				<PreviewPostPage
					token={token}
					post={post}
					morePosts={morePosts}
					settings={settings ?? {}}
				/>
			</PreviewSuspense>
		)
	}

	return <PostPage post={post} morePosts={morePosts} settings={settings ?? {}} />
}

export const getServerSideProps = async (ctx) => {
	const { preview = false, previewData = {}, params = {} } = ctx

	const token = previewData.token
	const locale = ctx.locale

	const [settings, { post, morePosts }, locales] = await Promise.all([
		getSettings(),
		getPostAndMoreStories(params.slug, token),
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
			token: previewData.token ?? null,
			locale,
			...locales
		}
	}
}
