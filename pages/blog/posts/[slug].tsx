import { PreviewSuspense } from '@sanity/preview-kit'
import PostPage from '@components/blog/post/PostPage'
import { getAllPostsSlugs, getPostAndMoreStories, getSettings } from '@lib/sanity/sanity.client'
import { Post, Settings } from '@lib/sanity/sanity.queries'
import { lazy } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const PreviewPostPage = lazy(() => import('components/blog/post/PreviewPostPage'))

interface PageProps {
	post: Post
	morePosts: Post[]
	settings?: Settings
	preview: boolean
	token: string | null
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
	const { settings, post, morePosts, preview, token } = props
	const { ready } = useTranslation(['common', 'blog_post'])

	if (preview && ready) {
		return (
			<PreviewSuspense
				fallback={
					<PostPage
						loading
						preview
						post={post}
						morePosts={morePosts}
						settings={settings || {}}
					/>
				}
			>
				<PreviewPostPage
					token={token}
					post={post}
					morePosts={morePosts}
					settings={settings || {}}
				/>
			</PreviewSuspense>
		)
	}

	return <PostPage post={post} morePosts={morePosts} settings={settings || {}} />
}

export async function getStaticPaths(ctx) {
	const locales = ctx.locales
	const postSlugs = await getAllPostsSlugs();
	const paths = postSlugs.map((post) => ({ params: { slug: post.slug } }))
	const pathsWithLocales = paths.map((path) => {
		return locales.map((locale) => {
			return {
				params: path.params,
				locale
			}
		})
	})
	const flattenedPaths = pathsWithLocales.flat()

	return {
		paths: flattenedPaths,
		fallback: true
	}
}

export const getStaticProps = async (ctx) => {
	const token = ctx.previewData?.token || null
	const locale = ctx.locale
	const preview = ctx.preview || false

	const [settings, { post, morePosts }, locales] = await Promise.all([
		getSettings(),
		getPostAndMoreStories(ctx.params.slug, token),
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
