import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { GitHub } from 'lib/types'
import MetricCard from 'components/metrics/Card'

export default function GitHubCard() {
    const { data } = useSWR<GitHub>('/api/github', fetcher)

    const stars = Number(data?.stars)
    const link = 'https://github.com/vasilistotskas'

    return (
        <MetricCard
            image={'https://img.icons8.com/material-outlined/24/000000/github.png'}
            header="GitHub Stars"
            link={link}
            metric={stars}
            isCurrency={false}
        />
    )
}
