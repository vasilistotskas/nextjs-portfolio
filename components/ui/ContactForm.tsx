'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContactField, ContactFormState } from '@/lib/validation'
import { contactMinLength } from '@/lib/validation'
import { sendContactMessage } from '@/app/[locale]/contact/actions'

const initialState: ContactFormState = { status: 'idle' }

const inputClass = cn(
	'w-full rounded-md border bg-terminal-bg px-3.5 py-2.5 font-sans text-sm text-terminal-text',
	'placeholder:text-terminal-muted outline-none',
	'transition-colors border-terminal-border',
	'focus:border-terminal-green focus:ring-0'
)

const labelClass = 'text-terminal-text mb-1.5 block font-sans text-sm font-medium'

export default function ContactForm() {
	// "Send another message" remounts the form, which clears the action state and
	// every field in one step.
	const [round, setRound] = useState(0)
	return <ContactFormRound key={round} onReset={() => setRound((n) => n + 1)} />
}

function ContactFormRound({ onReset }: { onReset: () => void }) {
	const t = useTranslations('contact.form')
	const [state, formAction, pending] = useActionState(sendContactMessage, initialState)

	if (state.status === 'success') {
		return (
			<div className="border-terminal-green/30 bg-terminal-green/5 flex flex-col items-center gap-4 rounded-lg border border-dashed py-12 text-center">
				<CheckCircle size={40} className="text-terminal-green mb-2" />
				<div className="text-terminal-green font-mono text-sm">
					{'~ $ '}{' '}
					<span className="text-terminal-green">echo $MESSAGE {'>'} /dev/vassilis</span>
				</div>
				<p className="text-terminal-text mt-2 font-sans font-medium">{t('success')}</p>
				<button
					onClick={onReset}
					className="text-terminal-comment hover:text-terminal-green decoration-terminal-comment/30 mt-4 font-mono text-xs underline underline-offset-4"
				>
					[ Send another message ]
				</button>
			</div>
		)
	}

	const values = state.status === 'idle' ? undefined : state.values
	const invalid = state.status === 'invalid' ? state.invalid : []

	// Native constraint validation catches these before submit; this is the
	// server's verdict for anything that got past it.
	const fieldError = (field: ContactField) =>
		invalid.includes(field) ? (
			<p
				id={`contact-${field}-error`}
				className="text-terminal-prompt mt-1 font-sans text-xs"
			>
				{field === 'email'
					? t('errors.email')
					: t(`errors.${field}`, { min: contactMinLength[field] })}
			</p>
		) : null

	const errorProps = (field: ContactField) =>
		invalid.includes(field)
			? { 'aria-invalid': true, 'aria-describedby': `contact-${field}-error` }
			: {}

	return (
		<form action={formAction} className="space-y-4">
			{/* Name */}
			<div>
				<label htmlFor="contact-name" className={labelClass}>
					{t('name')}
				</label>
				<input
					id="contact-name"
					name="name"
					required
					minLength={contactMinLength.name}
					autoComplete="name"
					defaultValue={values?.name}
					placeholder={t('namePlaceholder')}
					className={inputClass}
					{...errorProps('name')}
				/>
				{fieldError('name')}
			</div>

			{/* Email */}
			<div>
				<label htmlFor="contact-email" className={labelClass}>
					{t('email')}
				</label>
				<input
					id="contact-email"
					name="email"
					type="email"
					required
					autoComplete="email"
					defaultValue={values?.email}
					placeholder={t('emailPlaceholder')}
					className={inputClass}
					{...errorProps('email')}
				/>
				{fieldError('email')}
			</div>

			{/* Subject */}
			<div>
				<label htmlFor="contact-subject" className={labelClass}>
					{t('subject')}
				</label>
				<input
					id="contact-subject"
					name="subject"
					required
					minLength={contactMinLength.subject}
					defaultValue={values?.subject}
					placeholder={t('subjectPlaceholder')}
					className={inputClass}
					{...errorProps('subject')}
				/>
				{fieldError('subject')}
			</div>

			{/* Message */}
			<div>
				<label htmlFor="contact-message" className={labelClass}>
					{t('message')}
				</label>
				<textarea
					id="contact-message"
					name="message"
					required
					minLength={contactMinLength.message}
					rows={5}
					defaultValue={values?.message}
					placeholder={t('messagePlaceholder')}
					className={cn(inputClass, 'resize-none')}
					{...errorProps('message')}
				/>
				{fieldError('message')}
			</div>

			{/* Error state */}
			{state.status === 'error' && (
				<div
					role="alert"
					className="border-terminal-prompt/30 bg-terminal-prompt/10 flex items-center gap-2 rounded-md border px-3 py-2"
				>
					<AlertCircle size={14} className="text-terminal-prompt" />
					<p className="text-terminal-prompt font-sans text-xs">{t('error')}</p>
				</div>
			)}

			{/* Submit */}
			<button
				type="submit"
				disabled={pending}
				className="bg-terminal-green text-terminal-bg flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 font-sans text-sm font-semibold transition-all hover:shadow-[0_0_20px_-4px_var(--green)] disabled:cursor-not-allowed disabled:opacity-50"
			>
				{pending ? (
					<>
						<span className="border-terminal-bg inline-block h-3 w-3 animate-spin rounded-full border border-t-transparent" />
						{t('sending')}
					</>
				) : (
					<>
						<Send size={14} />
						{t('submit')}
					</>
				)}
			</button>
		</form>
	)
}
