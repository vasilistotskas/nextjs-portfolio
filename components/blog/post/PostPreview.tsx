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
	slug,
	className
}: Omit<Post, '_id'> & { className?: string }) {
	return (
		<div className={className}>
			<div className="grid h-full w-full items-center rounded border border-blue-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-900">
				<div className="mb-5">
					<CoverImage
						slug={slug}
						title={title || ''}
						image={coverImage}
						priority={false}
					/>
				</div>
				<h3 className="mb-3 text-3xl leading-snug">
					<Link
						href={`/blog/posts/${slug}`}
						className="mb-4 text-lg font-bold tracking-tight text-black hover:underline dark:text-white md:text-xl"
					>
						{title?.substring(0, 40 - 3) + '...'}
					</Link>
				</h3>
				<div className="gap-6 md:grid md:gap-x-16 lg:gap-x-8">
					<div className="text-sm text-gray-900 hover:text-gray-600 dark:text-gray-100">
						<Date dateString={date || ''} />
					</div>
					{excerpt && (
						<p className="post_body mx-auto grid max-w-2xl gap-2 leading-relaxed text-gray-600 dark:text-gray-400 md:gap-4">
							{excerpt.substring(0, 100 - 3) + '...'}
						</p>
					)}
					{author && <Avatar name={author.name} picture={author.picture} />}
				</div>
			</div>
		</div>
	)
}
