import Avatar from '@components/blog/post/AuthorAvatar'
import CoverImage from '@components/blog/post/CoverImage'
import Date from '@components/blog/post/PostDate'
import type { Post } from '@lib/sanity/sanity.queries'
import Link from 'next/link'

export default function PostPreview({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug
}: Omit<Post, '_id'>) {
	return (
		<div>
			<div className="mb-5">
				<CoverImage slug={slug} title={title ?? ''} image={coverImage} priority={false} />
			</div>
			<h3 className="mb-3 text-3xl leading-snug">
				<Link href={`/blog/posts/${slug}`} className="hover:underline">
					{title}
				</Link>
			</h3>
			<div className="mb-4 text-lg">
				<Date dateString={date ?? ''} />
			</div>
			{excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
			{author && <Avatar name={author.name} picture={author.picture} />}
		</div>
	)
}
