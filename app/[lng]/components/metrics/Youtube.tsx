import useSWR from 'swr'

import fetcher from '@lib/fetcher'
import { YouTube } from '@lib/types'
import MetricCard from '@app/[lng]/components/metrics/Card'

export default function YouTubeCard() {
	const { data } = useSWR<YouTube>('/api/youtube', fetcher)

	const subscriberCount = Number(data?.subscriberCount)
	const viewCount = Number(data?.viewCount)
	const link = process.env.NEXT_PUBLIC_YOUTUBE_URL

	return (
		<div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
			<MetricCard
				image={'https://img.icons8.com/clouds/56/000000/youtube-play.png'}
				header="YouTube Subscribers"
				link={link}
				metric={subscriberCount}
				isCurrency={false}
			/>
			<MetricCard
				image={'https://img.icons8.com/clouds/56/000000/youtube-play.png'}
				header="YouTube Views"
				link={link}
				metric={viewCount}
				isCurrency={false}
			/>
		</div>
	)
}
