import AuthorAvatar from '@components/blog/post/AuthorAvatar'
import CoverImage from '@components/blog/post/CoverImage'
import Date from '@components/blog/post/PostDate'
import type { Post } from '@lib/sanity/sanity.queries'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export default function HeroPost(
	props: Pick<Post, 'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug'>
) {
	const { title, coverImage, date, excerpt, author, slug } = props
	const { t } = useTranslation(['common'])
	return (
		<section>
			<div className="mb-8 md:mb-16">
				<CoverImage slug={slug} title={title ?? ''} image={coverImage} priority />
			</div>
			<div className="mb-20 md:mb-28 md:grid md:gap-x-16 lg:gap-x-8">
				<div className="grid">
					<h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
						<Link
							href={`/blog/posts/${slug}`}
							className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
						>
							{title || t('untitled', { ns: 'common' }) }
						</Link>
					</h3>
					<div className="mb-6 text-lg text-gray-900 hover:text-gray-600 dark:text-gray-100">
						<Date dateString={date ?? ''} />
					</div>
				</div>
				<div className="mx-auto grid max-w-2xl gap-4 text-gray-600 dark:text-gray-400">
					{excerpt && <p>{excerpt}</p>}
					{author && <AuthorAvatar name={author.name} picture={author.picture} />}
				</div>
			</div>
		</section>
	)
}
