import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const slug = req.query.slug?.toString()
		if (!slug) {
			return res.status(400).json({ error: 'Missing slug' })
		}
		if (req.method === 'POST') {
			const newOrUpdatedViews = await prisma.views.upsert({
				where: { slug },
				create: {
					slug
				},
				update: {
					count: {
						increment: 1
					}
				}
			})

			return res.status(200).json({
				total: newOrUpdatedViews.count.toString()
			})
		}

		if (req.method === 'GET') {
			const views = await prisma.views.findUnique({
				where: {
					slug
				}
			})

			if (views === null) {
				return res.status(200).json({
					total: '0'
				})
			}

			return res.status(200).json({ total: views.count.toString() })
		}
	} catch (error) {
		if (error instanceof Error || error instanceof TypeError) {
			const message = error.message
			return res.status(500).json({ message: message })
		}
	}
}
