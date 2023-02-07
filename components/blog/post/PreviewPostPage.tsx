import PostPage, { PostPageProps } from '@components/blog/post/PostPage'
import { usePreview } from '@lib/sanity/sanity.preview'
import { type Post, postAndMoreStoriesQuery } from '@lib/sanity/sanity.queries'

export default function PreviewPostPage({
	token,
	post,
	settings
}: {
	token: null | string
} & PostPageProps) {
	const { post: postPreview, morePosts }: { post: Post; morePosts: Post[] } = usePreview(
		token,
		postAndMoreStoriesQuery,
		{
			slug: post.slug
		}
	) || { post: null, morePosts: [] }

	return <PostPage preview post={postPreview} morePosts={morePosts} settings={settings} />
}
