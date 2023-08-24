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
	blogMetaImage: string | null
}

export default function Page(props: PageProps) {
	const { posts, settings, preview, blogMetaImage } = props
	const { ready } = useTranslation(['common', 'blog'])

	if (preview && ready) {
		return <PreviewBlogPage data={posts} blogMetaImage={blogMetaImage} />
	}

	return <BlogPage posts={posts} settings={settings} blogMetaImage={blogMetaImage} />
}

export const getStaticProps = async (ctx) => {
	const { preview = false, locale } = ctx

	const [settings, posts = [], locales] = await Promise.all([
		getSettings(),
		getAllPosts(),
		serverSideTranslations(locale, ['common', 'blog'])
	])

	const blogMetaImage = process.env.NEXT_SETTINGS_IMG_URL || null

	return {
		props: {
			blogMetaImage,
			posts,
			settings,
			preview,
			...locales
		}
	}
}
