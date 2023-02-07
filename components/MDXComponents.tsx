import Link from 'next/link'
import Image from 'next/image'

import ProsCard from '@components/utils/ProsCard'
import ConsCard from '@components/utils/ConsCard'
import Unsplash from '@components/metrics/Unsplash'
import Analytics from '@components/metrics/Analytics'
import YouTube from '@components/metrics/Youtube'
import Step from '@components/utils/Step'
import ImageWithTheme from '@components/utils/ImageWithTheme'

const CustomLink = (props) => {
	const href = props.href
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<Link href={href}>
				<p {...props}>{props.children}</p>
			</Link>
		)
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
	return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props) {
	return (
		<div className="my-8 flex rounded-lg bg-gray-200 p-4 dark:bg-gray-800">
			<div className="mr-4 flex w-4 items-center">{props.emoji}</div>
			<div className="callout w-full">{props.children}</div>
		</div>
	)
}

const MDXComponents = {
	Image: RoundedImage,
	ImageWithTheme,
	a: CustomLink,
	Callout,
	Analytics,
	ConsCard,
	ProsCard,
	Step,
	Unsplash,
	YouTube
}

export default MDXComponents
