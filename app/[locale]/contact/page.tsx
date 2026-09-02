import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/ui/BrandIcons'
import Card from '@/components/ui/Card'
import ContactForm from '@/components/ui/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('contact')
	const tc = await getTranslations('common')

	// `contact.description` is the on-page intro ("Thanks for reaching out!") —
	// it reads as a reply, which is wrong in a search result or link preview.
	return buildPageMetadata({
		path: '/contact',
		title: t('title'),
		description: t('metaDescription', { name: tc('myName') })
	})
}

const socialLinks = [
	{
		href: 'https://github.com/vasilistotskas',
		icon: GithubIcon,
		label: 'GitHub',
		handle: '@vasilistotskas'
	},
	{
		href: 'https://linkedin.com/in/vasilistotskas',
		icon: LinkedinIcon,
		label: 'LinkedIn',
		handle: 'vasilistotskas'
	},
	{
		href: 'https://x.com/vasilis_totskas',
		icon: XIcon,
		label: 'X',
		handle: '@vasilis_totskas'
	}
]

function ContactContent() {
	const t = useTranslations('contact')
	const tc = useTranslations('common')

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-20">
			{/* Header */}
			<div className="mb-12">
				<h1 className="text-terminal-text font-sans text-3xl font-semibold tracking-tight md:text-4xl">
					{t('title')}
				</h1>
				<p className="text-terminal-comment mt-4 max-w-[52ch] font-sans text-base">
					{t('description')}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-5">
				{/* Contact info */}
				<div className="space-y-6 lg:col-span-2">
					<Card hover={false}>
						<div className="space-y-5">
							<div>
								<p className="text-terminal-muted mb-2 font-sans text-xs font-medium tracking-wide uppercase">
									{t('info.email')}
								</p>
								<a
									href={`mailto:${tc('myEmail')}`}
									className="text-terminal-text hover:text-terminal-green flex items-center gap-2 font-sans text-sm transition-colors"
								>
									<Mail size={14} className="text-terminal-green" />
									{tc('myEmail')}
								</a>
							</div>

							<div>
								<p className="text-terminal-muted mb-2 font-sans text-xs font-medium tracking-wide uppercase">
									{t('info.location')}
								</p>
								<div className="text-terminal-text flex items-center gap-2 font-sans text-sm">
									<MapPin size={14} className="text-terminal-green" />
									{tc('athensGreece')}
								</div>
							</div>

							<div>
								<p className="text-terminal-muted mb-3 font-sans text-xs font-medium tracking-wide uppercase">
									{t('info.social')}
								</p>
								<div className="space-y-2">
									{socialLinks.map(({ href, icon: Icon, label, handle }) => (
										<a
											key={label}
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-terminal-text hover:text-terminal-green flex items-center gap-2 font-sans text-sm transition-colors"
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
						<h2 className="text-terminal-text mb-6 font-sans text-lg font-semibold">
							{t('form.heading')}
						</h2>
						<ContactForm />
					</Card>
				</div>
			</div>
		</div>
	)
}

export default function ContactPage() {
	return <ContactContent />
}
