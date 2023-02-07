import Container from '@components/Container'
import Layout from '@components/blog/BlogLayout'
import MoreStories from '@components/blog/MoreStories'
import PostBody from '@components/blog/post/PostBody'
import PostHeader from '@components/blog/post/PostHeader'
import PostTitle from '@components/blog/post/PostTitle'
import SectionSeparator from '@components/utils/SectionSeparator'
import type { Post, Settings } from '@lib/sanity/sanity.queries'
import { notFound } from 'next/navigation'
import { urlForImage } from '@lib/sanity/sanity.image'
import { useTranslation } from 'next-i18next'

export interface PostPageProps {
	preview?: boolean
	loading?: boolean
	post: Post
	morePosts: Post[]
	settings: Settings
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
	const { t } = useTranslation(['common', 'blog_post'])
	const { preview, loading, morePosts = NO_POSTS, post, settings } = props
	const { title = post.title } = settings || {}
	const { description = post.excerpt } = settings || {}
	const {
		ogImage = urlForImage(post.coverImage).width(1200).height(627).fit('crop').url()
	} = settings || {}

	const slug = post?.slug

	if (!slug && !preview) {
		notFound()
	}

	return (
		<>
			<Layout preview={preview ?? false} loading={loading}>
				<Container
					title={title ?? settings.title}
					description={description}
					image={ogImage}
				>
					{preview && !post ? (
						<PostTitle>{t('loading', { ns: 'common' })}</PostTitle>
					) : (
						<>
							<article className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-700">
								<div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
									<PostHeader
										title={post.title}
										coverImage={post.coverImage}
										date={post.date}
										author={post.author}
									/>
									<PostBody content={post.content} />
								</div>
								<SectionSeparator />
							</article>
							{morePosts?.length > 0 && <MoreStories posts={morePosts} />}
						</>
					)}
				</Container>
			</Layout>
		</>
	)
}
