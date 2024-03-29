import useSWR from 'swr'

import fetcher from '@lib/fetcher'
import { Unsplash } from '@lib/types'
import MetricCard from '@components/metrics/Card'

export default function UnsplashCard() {
	const { data } = useSWR<Unsplash>('/api/unsplash', fetcher)

	const downloads = Number(data?.downloads)
	const views = Number(data?.views)
	const link = process.env.NEXT_PUBLIC_UNSPLASH_URL

	return (
		<div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
			<MetricCard
				image={'https://img.icons8.com/clouds/56/000000/stack-of-photos.png'}
				header="Unsplash Downloads"
				link={link}
				metric={downloads}
				isCurrency={false}
			/>
			<MetricCard
				image={'https://img.icons8.com/clouds/56/000000/stack-of-photos.png'}
				header="Unsplash Views"
				link={link}
				metric={views}
				isCurrency={false}
			/>
		</div>
	)
}
