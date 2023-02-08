import { PreviewSuspense } from '@sanity/preview-kit'
import BlogPage from '@components/blog/BlogPage'
import { getAllPosts, getSettings } from '@lib/sanity/sanity.client'
import { Post, Settings } from '@lib/sanity/sanity.queries'
import { lazy } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PreviewBlogPage = lazy(() => import('@components/blog/PreviewBlogPage'))

interface PageProps {
	posts: Post[]
	settings: Settings
	preview: boolean
	token: string | null
	blogMetaImage: string
}

export default function Page(props: PageProps) {
	const { posts, settings, preview, token, blogMetaImage } = props
	const { ready } = useTranslation(['common', 'blog'])

	if (preview && ready) {
		return (
			<PreviewSuspense
				fallback={
					<BlogPage
						loading
						preview
						posts={posts}
						settings={settings}
						blogMetaImage={blogMetaImage}
					/>
				}
			>
				<PreviewBlogPage token={token} />
			</PreviewSuspense>
		)
	}

	return <BlogPage posts={posts} settings={settings} blogMetaImage={blogMetaImage} />
}

export const getStaticProps = async (ctx) => {
	const { preview = false, previewData = {}, locale } = ctx

	const [settings, posts = [], locales] = await Promise.all([
		getSettings(),
		getAllPosts(),
		serverSideTranslations(locale, ['common', 'blog'])
	])

	const blogMetaImage = process.env.NEXT_SETTINGS_IMG_URL

	return {
		props: {
			blogMetaImage,
			posts,
			settings,
			preview,
			token: previewData.token ?? null,
			...locales
		}
	}
}
