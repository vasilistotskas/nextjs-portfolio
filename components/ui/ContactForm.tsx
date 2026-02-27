'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	subject: z.string().min(3),
	message: z.string().min(10)
})

type ContactFormData = z.infer<typeof contactSchema>

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
	const t = useTranslations('contact.form')
	const [status, setStatus] = useState<FormStatus>('idle')

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema)
	})

	const onSubmit = async (data: ContactFormData) => {
		setStatus('loading')
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
			if (res.ok) {
				setStatus('success')
				reset()
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	const inputClass = cn(
		'w-full rounded border bg-terminal-bg px-3 py-2 font-mono text-sm text-terminal-text',
		'placeholder:text-terminal-muted outline-none',
		'transition-colors border-terminal-border',
		'focus:border-terminal-cyan focus:ring-0'
	)

	if (status === 'success') {
		return (
			<div className="flex flex-col items-center gap-4 py-12 text-center">
				<CheckCircle size={40} className="text-terminal-green" />
				<p className="text-terminal-green font-mono">{t('success')}</p>
				<button
					onClick={() => setStatus('idle')}
					className="text-terminal-muted hover:text-terminal-cyan font-mono text-xs"
				>
					Send another message
				</button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{/* Name */}
			<div>
				<label className="text-terminal-comment mb-1.5 block font-mono text-xs">
					<span className="text-terminal-prompt">{'// '}</span>
					{t('name')}
				</label>
				<input
					{...register('name')}
					placeholder={t('namePlaceholder')}
					className={inputClass}
				/>
				{errors.name && (
					<p className="text-terminal-prompt mt-1 font-mono text-xs">
						{errors.name.message}
					</p>
				)}
			</div>

			{/* Email */}
			<div>
				<label className="text-terminal-comment mb-1.5 block font-mono text-xs">
					<span className="text-terminal-prompt">{'// '}</span>
					{t('email')}
				</label>
				<input
					{...register('email')}
					type="email"
					placeholder={t('emailPlaceholder')}
					className={inputClass}
				/>
				{errors.email && (
					<p className="text-terminal-prompt mt-1 font-mono text-xs">
						{errors.email.message}
					</p>
				)}
			</div>

			{/* Subject */}
			<div>
				<label className="text-terminal-comment mb-1.5 block font-mono text-xs">
					<span className="text-terminal-prompt">{'// '}</span>
					{t('subject')}
				</label>
				<input
					{...register('subject')}
					placeholder={t('subjectPlaceholder')}
					className={inputClass}
				/>
				{errors.subject && (
					<p className="text-terminal-prompt mt-1 font-mono text-xs">
						{errors.subject.message}
					</p>
				)}
			</div>

			{/* Message */}
			<div>
				<label className="text-terminal-comment mb-1.5 block font-mono text-xs">
					<span className="text-terminal-prompt">{'// '}</span>
					{t('message')}
				</label>
				<textarea
					{...register('message')}
					rows={5}
					placeholder={t('messagePlaceholder')}
					className={cn(inputClass, 'resize-none')}
				/>
				{errors.message && (
					<p className="text-terminal-prompt mt-1 font-mono text-xs">
						{errors.message.message}
					</p>
				)}
			</div>

			{/* Error state */}
			{status === 'error' && (
				<div className="border-terminal-prompt/30 bg-terminal-prompt/10 flex items-center gap-2 rounded border px-3 py-2">
					<AlertCircle size={14} className="text-terminal-prompt" />
					<p className="text-terminal-prompt font-mono text-xs">{t('error')}</p>
				</div>
			)}

			{/* Submit */}
			<button
				type="submit"
				disabled={status === 'loading'}
				className="border-terminal-green bg-terminal-green/10 text-terminal-green hover:bg-terminal-green hover:text-terminal-bg flex w-full items-center justify-center gap-2 rounded border px-4 py-2.5 font-mono text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50"
			>
				{status === 'loading' ? (
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
