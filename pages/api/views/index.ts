import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const totalViews = await prisma.views.aggregate({
			_sum: {
				count: true
			}
		})

		if (totalViews._sum.count === null) {
			return res.status(200).json({
				total: '0'
			})
		}

		return res.status(200).json({ total: totalViews._sum.count.toString() })
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ error: e.message })
		}
	}
}
