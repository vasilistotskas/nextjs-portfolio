import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const entries = await prisma.guestbook.findMany({
			orderBy: {
				updated_at: 'desc'
			}
		})

		return res.json(
			entries.map((entry) => ({
				id: entry.id.toString(),
				body: entry.body,
				created_by: entry.created_by,
				updated_at: entry.updated_at
			}))
		)
	}

	const session = await getServerSession(req, res, authOptions)

	if (!session) {
		return res.status(403).send('Unauthorized')
	}
	const email = session?.user?.email
	const name = session?.user?.name

	if (!email || !name) {
		return res.status(403).send('Unauthorized')
	}

	if (req.method === 'POST') {
		const newEntry = await prisma.guestbook.create({
			data: {
				email,
				body: (req.body.body || '').slice(0, 500),
				created_by: name
			}
		})

		return res.status(200).json({
			id: newEntry.id.toString(),
			body: newEntry.body,
			created_by: newEntry.created_by,
			updated_at: newEntry.updated_at
		})
	}

	return res.send('Method not allowed.')
}
