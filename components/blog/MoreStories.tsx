import PostPreview from '@components/blog/post/PostPreview'
import type { Post } from '@lib/sanity/sanity.queries'
import { EmblaCarousel } from '@components/utils/EmblaCarousel'

export default function MoreStories({ posts }: { posts: Post[] }) {
	return (
		<section className="relative my-4 w-full md:my-8">
			<h2 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
				More Stories
			</h2>
			<EmblaCarousel>
				{posts.map((post) => (
					<PostPreview
						key={post._id}
						title={post.title}
						coverImage={post.coverImage}
						date={post.date}
						author={post.author}
						slug={post.slug}
						excerpt={post.excerpt}
					/>
				))}
			</EmblaCarousel>
		</section>
	)
}
