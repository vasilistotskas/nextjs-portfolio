'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import type { ContactField, ContactFormState, ContactValues } from '@/lib/validation'
import { contactFields, contactMinLength } from '@/lib/validation'

const contactSchema = z.object({
	name: z.string().min(contactMinLength.name),
	email: z.email(),
	subject: z.string().min(contactMinLength.subject),
	message: z.string().min(contactMinLength.message)
})

export async function sendContactMessage(
	_previous: ContactFormState,
	formData: FormData
): Promise<ContactFormState> {
	const field = (key: ContactField) => {
		const value = formData.get(key)
		return typeof value === 'string' ? value : ''
	}
	const values: ContactValues = {
		name: field('name'),
		email: field('email'),
		subject: field('subject'),
		message: field('message')
	}

	// The browser already enforces these rules, so this only trips on a request
	// that bypassed the form. Error copy lives in the client, which knows the locale.
	const parsed = contactSchema.safeParse(values)
	if (!parsed.success) {
		const { issues } = parsed.error
		return {
			status: 'invalid',
			values,
			invalid: contactFields.filter((key) =>
				issues.some((issue) => issue.path[0] === key)
			)
		}
	}

	const { name, email, subject, message } = parsed.data

	try {
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
			return { status: 'error', values }
		}
	} catch (err) {
		console.error('Contact action error:', err)
		return { status: 'error', values }
	}

	return { status: 'success' }
}
