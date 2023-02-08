import BlogHeader from '@components/blog/BlogHeader'
import Layout from '@components/blog/BlogLayout'
import HeroPost from '@components/blog/post/HeroPost'
import Container from '@components/Container'
import MoreStories from '@components/blog/MoreStories'
import type { Post, Settings } from '@lib/sanity/sanity.queries'
import { description as demoDescription } from '@lib/sanity/demo.data'
import NoResults from '@components/utils/NoResults'
import { useTranslation } from 'next-i18next'

export interface BlogPageProps {
	preview?: boolean
	loading?: boolean
	posts: Post[]
	settings: Settings
}

export default function BlogPage(props: BlogPageProps) {
	const { preview, loading, posts, settings } = props
	const [heroPost, ...morePosts] = posts || []
	const {
		title = settings.title ?? 'Blog',
		description = settings.description ?? demoDescription
	} = settings || {}
	const { t } = useTranslation(['blog'])
	const postsEmpty = posts.length <= 0
	const heroPostEmpty = heroPost === undefined

	return (
		<>
			<Layout preview={preview ?? false} loading={loading}>
				<Container title={title} description={description}>
					<div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-700">
						<BlogHeader title={title ?? ''} description={description} level={1} />
						{(postsEmpty && heroPostEmpty) && (
							<NoResults text={t('posts.notFound', { ns: 'blog' })}></NoResults>
						)}
						{heroPost && (
							<HeroPost
								title={heroPost.title}
								coverImage={heroPost.coverImage}
								date={heroPost.date}
								author={heroPost.author}
								slug={heroPost.slug}
								excerpt={heroPost.excerpt}
							/>
						)}
						{morePosts.length > 0 && <MoreStories posts={morePosts} />}
					</div>
				</Container>
			</Layout>
		</>
	)
}
