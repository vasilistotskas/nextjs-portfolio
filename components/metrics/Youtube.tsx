import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { YouTube } from 'lib/types'
import MetricCard from 'components/metrics/Card'

export default function YouTubeCard() {
    const { data } = useSWR<YouTube>('/api/youtube', fetcher)

    const subscriberCount = Number(data?.subscriberCount)
    const viewCount = Number(data?.viewCount)
    const link = 'https://www.youtube.com/channel/UCO3k4jsz6awlr6TpQHncVYQ'

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
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
