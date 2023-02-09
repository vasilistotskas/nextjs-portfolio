import Link from 'next/link'
import Image from 'next/image'

import ProsCard from '@app/[lng]/components/utils/ProsCard'
import ConsCard from '@app/[lng]/components/utils/ConsCard'
import Unsplash from '@app/[lng]/components/metrics/Unsplash'
import Analytics from '@app/[lng]/components/metrics/Analytics'
import YouTube from '@app/[lng]/components/metrics/Youtube'
import Step from '@app/[lng]/components/utils/Step'
import ImageWithTheme from '@app/[lng]/components/utils/ImageWithTheme'

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
