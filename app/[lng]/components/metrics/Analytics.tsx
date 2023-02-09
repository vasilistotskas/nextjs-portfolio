import useSWR from 'swr'

import fetcher from '@lib/fetcher'
import { Views } from '@lib/types'
import MetricCard from '@app/[lng]/components/metrics/Card'

export default function AnalyticsCard() {
	const { data } = useSWR<Views>('/api/views', fetcher)

	const pageViews = Number(data?.total)
	const link = process.env.NEXT_PUBLIC_DOMAIN_NAME

	return (
		<MetricCard
			image={'https://img.icons8.com/nolan/24/google-analytics-logo.png'}
			header="All-Time Views"
			link={link}
			metric={pageViews}
			isCurrency={false}
		/>
	)
}
