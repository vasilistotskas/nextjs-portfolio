import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	subject: z.string().min(3, 'Subject must be at least 3 characters'),
	message: z.string().min(10, 'Message must be at least 10 characters')
})

export async function POST(request: NextRequest) {
	try {
		const body: unknown = await request.json()
		const parsed = contactSchema.safeParse(body)

		if (!parsed.success) {
			return NextResponse.json(
				{ error: 'Invalid input', details: parsed.error.flatten() },
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
