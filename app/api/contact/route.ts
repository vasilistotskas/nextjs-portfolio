import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { contactSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
	try {
		const body: unknown = await request.json()
		const parsed = contactSchema.safeParse(body)

		if (!parsed.success) {
			return NextResponse.json(
				{ error: 'Invalid input', details: z.flattenError(parsed.error) },
				{ status: 400 }
			)
		}

		const { name, email, subject, message } = parsed.data

		const resend = new Resend(process.env.RESEND_API_KEY)
		const { error } = await resend.emails.send({
			from: 'Portfolio Contact <onboarding@resend.dev>',
			to: process.env.CONTACT_EMAIL ?? 'vassilistotskas@msn.com',
			replyTo: email,
			subject: `[Portfolio] ${subject}`,
			text: `From: ${name} <${email}>\n\n${message}`
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
		}

		return NextResponse.json({ success: true })
	} catch (err) {
		console.error('Contact route error:', err)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
