import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

import googleAuth from '@lib/google'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const auth = await googleAuth.getClient()
	const youtube = google.youtube({
		auth,
		version: 'v3'
	})

	const response = await youtube.channels.list({
		id: ['UCO3k4jsz6awlr6TpQHncVYQ'],
		part: ['statistics']
	})

	if (!response.data.items) {
		return res.status(404).end()
	}

	const channel = response.data.items[0]

	if (!channel.statistics) {
		return res.status(404).end()
	}

	const subscriberCount = channel.statistics.subscriberCount
	const viewCount = channel.statistics.viewCount

	res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

	return res.status(200).json({
		subscriberCount,
		viewCount
	})
}
