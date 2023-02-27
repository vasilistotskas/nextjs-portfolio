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
	const excerptTrimmed = excerpt?.substring(0, 200 - 3) + '...'

	return (
		<section className="w-full rounded border border-blue-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-900">
			<div className="mb-3 md:mb-6">
				<CoverImage slug={slug} title={title || ''} image={coverImage} priority />
			</div>
			<div className="gap-4 md:grid md:gap-x-12 lg:gap-x-6">
				<div className="grid">
					<h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
						<Link
							href={`/blog/posts/${slug}`}
							className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
						>
							{title || t('untitled', { ns: 'common' })}
						</Link>
					</h3>
					<div className="text-sm text-gray-900 hover:text-gray-600 dark:text-gray-100">
						<Date dateString={date || ''} />
					</div>
				</div>
				<div className="post_body mx-auto grid max-w-2xl gap-2 text-gray-600 dark:text-gray-400 md:gap-4">
					{excerptTrimmed && <p>{excerptTrimmed}</p>}
					{author && <AuthorAvatar name={author.name} picture={author.picture} />}
				</div>
			</div>
		</section>
	)
}
