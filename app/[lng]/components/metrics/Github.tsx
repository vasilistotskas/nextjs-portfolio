import useSWR from 'swr'

import fetcher from '@lib/fetcher'
import { GitHub } from '@lib/types'
import MetricCard from '@app/[lng]/components/metrics/Card'

export default function GitHubCard() {
	const { data } = useSWR<GitHub>('/api/github', fetcher)

	const stars = Number(data?.stars)
	const link = process.env.NEXT_PUBLIC_GITHUB_URL

	return (
		<MetricCard
			image={'https://img.icons8.com/clouds/56/000000/github.png'}
			header="GitHub Stars"
			link={link}
			metric={stars}
			isCurrency={false}
		/>
	)
}
