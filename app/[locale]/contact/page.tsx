import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import Card from '@/components/ui/Card'
import ContactForm from '@/components/ui/ContactForm'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'contact' })

	return {
		title: t('title'),
		description: t('description')
	}
}

const socialLinks = [
	{
		href: 'https://github.com/vasilistotskas',
		icon: Github,
		label: 'GitHub',
		handle: '@vasilistotskas'
	},
	{
		href: 'https://linkedin.com/in/vasilistotskas',
		icon: Linkedin,
		label: 'LinkedIn',
		handle: 'vasilistotskas'
	},
	{
		href: 'https://twitter.com/vasilistotskas',
		icon: Twitter,
		label: 'Twitter',
		handle: '@vasilistotskas'
	}
]

function ContactContent() {
	const t = useTranslations('contact')
	const tc = useTranslations('common')

	return (
		<div className="mx-auto max-w-5xl px-6 py-20">
			{/* Header */}
			<div className="mb-12">
				<p className="text-terminal-comment mb-2 font-mono text-sm">{t('subtitle')}</p>
				<h1 className="text-terminal-text font-mono text-3xl font-bold md:text-4xl">
					{t('title')}
				</h1>
				<p className="text-terminal-comment mt-4 font-mono text-sm">{t('description')}</p>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
				{/* Contact info */}
				<div className="space-y-6 lg:col-span-2">
					<Card hover={false}>
						<div className="space-y-5">
							<div>
								<p className="text-terminal-comment mb-2 font-mono text-xs">
									<span className="text-terminal-prompt">{'// '}</span>
									{t('info.email')}
								</p>
								<a
									href={`mailto:${tc('myEmail')}`}
									className="text-terminal-text hover:text-terminal-cyan flex items-center gap-2 font-mono text-sm transition-colors"
								>
									<Mail size={14} className="text-terminal-cyan" />
									{tc('myEmail')}
								</a>
							</div>

							<div>
								<p className="text-terminal-comment mb-2 font-mono text-xs">
									<span className="text-terminal-prompt">{'// '}</span>
									{t('info.location')}
								</p>
								<div className="text-terminal-text flex items-center gap-2 font-mono text-sm">
									<MapPin size={14} className="text-terminal-cyan" />
									{tc('athensGreece')}
								</div>
							</div>

							<div>
								<p className="text-terminal-comment mb-3 font-mono text-xs">
									<span className="text-terminal-prompt">{'// '}</span>
									{t('info.social')}
								</p>
								<div className="space-y-2">
									{socialLinks.map(({ href, icon: Icon, label, handle }) => (
										<a
											key={label}
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-terminal-text hover:text-terminal-cyan flex items-center gap-2 font-mono text-sm transition-colors"
										>
											<Icon size={14} className="text-terminal-muted" />
											<span>{handle}</span>
										</a>
									))}
								</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Contact form */}
				<div className="lg:col-span-3">
					<Card hover={false}>
						<p className="text-terminal-comment mb-6 font-mono text-xs">
							<span className="text-terminal-prompt">$ </span>
							send-message --to vassilistotskas@msn.com
						</p>
						<ContactForm />
					</Card>
				</div>
			</div>
		</div>
	)
}

export default async function ContactPage({ params }: Props) {
	const { locale } = await params
	setRequestLocale(locale)

	return <ContactContent />
}
