import cn from 'classnames'
import { urlForImage } from '@lib/sanity/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
	title: string
	slug?: string
	image: any
	priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
	const { title, slug, image: source, priority } = props
	const image = source?.asset?._ref ? (
		<div
			className={cn('shadow-small', {
				'hover:shadow-medium transition-shadow duration-200': slug
			})}
		>
			<Image
				className="h-auto w-full"
				width={2000}
				height={1000}
				alt={`Cover Image for ${title}`}
				src={urlForImage(source).height(1000).width(2000).url()}
				sizes="100vw"
				priority={priority}
			/>
		</div>
	) : (
		<div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
	)

	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/blog/posts/${slug}`} aria-label={title} title={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	)
}
