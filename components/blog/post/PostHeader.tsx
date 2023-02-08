import Avatar from '@components/blog/post/AuthorAvatar'
import CoverImage from '@components/blog/post/CoverImage'
import Date from '@components/blog/post/PostDate'
import PostTitle from '@components/blog/post/PostTitle'
import type { Post } from '@lib/sanity/sanity.queries'

export default function PostHeader(
	props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>
) {
	const { title, coverImage, date, author, slug } = props
	return (
		<>
			<PostTitle>{title}</PostTitle>
			<div className="hidden md:mb-12 md:block">
				{author && <Avatar name={author.name} picture={author.picture} />}
			</div>
			<div className="mb-4 sm:mx-0 md:mb-8">
				<CoverImage title={title ?? ''} image={coverImage} priority slug={slug} />
			</div>
			<div className="mx-auto max-w-2xl">
				<div className="mb-6 block md:hidden">
					{author && <Avatar name={author.name} picture={author.picture} />}
				</div>
				<div className="text-sm text-gray-900 hover:text-gray-600 dark:text-gray-100">
					<Date dateString={date ?? ''} />
				</div>
			</div>
		</>
	)
}
