'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/components/providers/ThemeProvider'
import { AnimatePresence, motion } from 'motion/react'
import { TerminalIcon, X } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { projectLayers, skillGroups } from '@/lib/stack'
import { useTypewriter } from '@/hooks/useTypewriter'

type PaletteContextValue = {
	open: () => void
	close: () => void
	isOpen: boolean
}

const PaletteContext = createContext<PaletteContextValue | null>(null)

export function useCommandPalette(): PaletteContextValue {
	const value = useContext(PaletteContext)
	if (!value) {
		throw new Error('useCommandPalette must be used inside CommandPaletteProvider')
	}
	return value
}

type Entry = { command: string; output: ReactNode }

const PROJECT_URLS: Record<string, string> = {
	webside: 'https://webside.gr',
	grooveshop: 'https://github.com/vasilistotskas/grooveshop-django-api',
	portfolio: 'https://github.com/vasilistotskas/nextjs-portfolio'
}

const SOCIAL_URLS: Record<string, string> = {
	github: 'https://github.com/vasilistotskas',
	linkedin: 'https://linkedin.com/in/vasilistotskas',
	x: 'https://x.com/vasilis_totskas'
}

function Definitions({ rows }: { rows: Array<{ term: string; detail: string }> }) {
	return (
		<dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
			{rows.map(({ term, detail }) => (
				<div key={term} className="contents">
					<dt className="text-terminal-green">{term}</dt>
					<dd className="text-terminal-comment m-0">{detail}</dd>
				</div>
			))}
		</dl>
	)
}

function Line({ children, tone }: { children: ReactNode; tone?: 'warn' }) {
	return (
		<div className={tone === 'warn' ? 'text-terminal-yellow' : 'text-terminal-text'}>
			{children}
		</div>
	)
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
	const t = useTranslations('terminal')
	const tc = useTranslations('common')
	const tp = useTranslations('projects')
	const ts = useTranslations('stack')
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const { setTheme } = useTheme()

	const [history, setHistory] = useState<Entry[]>([])
	const [value, setValue] = useState('')
	const [recall, setRecall] = useState<number | null>(null)

	const inputRef = useRef<HTMLInputElement>(null)
	const scrollRef = useRef<HTMLDivElement>(null)
	const dialogRef = useRef<HTMLDivElement>(null)
	const restoreFocusTo = useRef<Element | null>(null)

	// The typewriter that used to gate the hero now lives here, where it costs
	// nobody anything: it demonstrates the prompt while the palette is open.
	const demo = useTypewriter({
		text: 'help',
		baseSpeed: 26,
		variationRange: 20,
		startDelay: 420,
		enabled: history.length === 0 && value === ''
	})

	const commandHelp = useMemo(
		() =>
			(
				[
					'help',
					'whoami',
					'stack',
					'projects',
					'contact',
					'resume',
					'theme',
					'lang',
					'clear'
				] as const
			).map((name) => ({ term: name, detail: t(`commands.${name}`) })),
		[t]
	)

	const goTo = useCallback(
		(path: string) => {
			router.push(`/${locale}${path}`)
			onClose()
		},
		[router, locale, onClose]
	)

	const switchLocale = useCallback(
		(next: string) => {
			const segments = pathname.split('/')
			segments[1] = next
			router.push(segments.join('/'))
		},
		[pathname, router]
	)

	const run = useCallback(
		(raw: string): ReactNode => {
			const input = raw.trim().toLowerCase()
			const [head, ...rest] = input.split(/\s+/)
			const arg = rest.join(' ')

			switch (head) {
				case 'help':
					return <Definitions rows={commandHelp} />

				case 'whoami':
					return (
						<Line>
							<span className="text-terminal-green">{tc('myName')}</span>
							{' — '}
							{t('role')}
						</Line>
					)

				case 'stack':
					// One row per group, not per layer: the ten layers cluster into
					// four, and printing the same tools ten times says nothing.
					return (
						<Definitions
							rows={skillGroups.map((group) => ({
								term: group.layers.map((layer) => ts(`layers.${layer}`)).join(' / '),
								detail: group.skills
									.filter((skill) => skill.daily)
									.map((skill) => skill.name)
									.join(', ')
							}))}
						/>
					)

				case 'ls':
				case 'projects': {
					const keys = Object.keys(projectLayers)
					return (
						<ul className="mt-1 list-none space-y-1 p-0">
							{keys.map((key) => (
								<li key={key}>
									<a
										href={PROJECT_URLS[key]}
										target="_blank"
										rel="noopener noreferrer"
										className="text-terminal-green underline decoration-dotted underline-offset-4"
									>
										{tp(`items.${key as 'portfolio' | 'grooveshop' | 'webside'}.name`)}
									</a>
								</li>
							))}
						</ul>
					)
				}

				case 'contact':
					if (arg === 'page') {
						goTo('/contact')
						return null
					}
					return (
						<Line>
							<a
								href={`mailto:${tc('myEmail')}`}
								className="text-terminal-green underline decoration-dotted underline-offset-4"
							>
								{tc('myEmail')}
							</a>
						</Line>
					)

				case 'resume':
				case 'cv':
					window.open('/vasilistotskas.pdf', '_blank', 'noopener,noreferrer')
					return <Line>{t('opening', { target: 'vasilistotskas.pdf' })}</Line>

				case 'theme': {
					const next = arg === 'light' || arg === 'dark' ? arg : undefined
					setTheme(
						next ??
							(document.documentElement.classList.contains('dark') ? 'light' : 'dark')
					)
					return <Line>{t('themeSet')}</Line>
				}

				case 'lang': {
					const next = routing.locales.find((one) => one === arg)
					const target = next ?? routing.locales.find((one) => one !== locale)!
					switchLocale(target)
					return <Line>{t('langSet', { lang: target.toUpperCase() })}</Line>
				}

				case 'home':
					goTo('')
					return null

				case 'about':
					goTo('/about')
					return null

				case 'go': {
					const destination =
						arg === 'about'
							? '/about'
							: arg === 'contact'
								? '/contact'
								: arg === 'home' || arg === ''
									? ''
									: null
					if (destination === null) return <Line tone="warn">{t('unknownTarget')}</Line>
					goTo(destination)
					return null
				}

				case 'github':
				case 'linkedin':
				case 'x':
				case 'open': {
					const key = head === 'open' ? arg : head
					const url = SOCIAL_URLS[key]
					if (!url) return <Line tone="warn">{t('unknownTarget')}</Line>
					window.open(url, '_blank', 'noopener,noreferrer')
					return <Line>{t('opening', { target: key })}</Line>
				}

				case 'sudo':
					return <span className="text-terminal-comment">{t('sudo')}</span>

				case 'exit':
				case 'q':
					onClose()
					return null

				default:
					return (
						<span className="text-terminal-yellow">
							{t('notFound', { command: raw.trim() })}
						</span>
					)
			}
		},
		[commandHelp, goTo, locale, onClose, setTheme, switchLocale, t, tc, tp, ts]
	)

	const submit = useCallback(() => {
		const raw = value.trim()
		setValue('')
		setRecall(null)
		if (!raw) return
		if (raw.toLowerCase() === 'clear') {
			setHistory([])
			return
		}
		const output = run(raw)
		setHistory((entries) => [...entries, { command: raw, output }])
	}, [run, value])

	// Focus the prompt on open and hand focus back to whatever opened it.
	useEffect(() => {
		restoreFocusTo.current = document.activeElement
		inputRef.current?.focus()
		return () => {
			const target = restoreFocusTo.current
			if (target instanceof HTMLElement) target.focus()
		}
	}, [])

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
	}, [history])

	// Keep tabbing inside the dialog while it is open.
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key !== 'Tab') return
		const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
		)
		if (!focusable || focusable.length === 0) return
		const first = focusable[0]
		const last = focusable[focusable.length - 1]
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault()
			last.focus()
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault()
			first.focus()
		}
	}

	const commands = history.map((entry) => entry.command)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15 }}
			className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-16 sm:px-6 sm:pt-24"
		>
			<button
				type="button"
				aria-label={t('close')}
				onClick={onClose}
				className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
			/>

			<motion.div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={t('title')}
				onKeyDown={handleKeyDown}
				initial={{ opacity: 0, y: -12, scale: 0.985 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: -8, scale: 0.99 }}
				transition={{ duration: 0.18, ease: 'easeOut' }}
				className="glass glass-blur terminal-border bg-terminal-bg/90 relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl shadow-2xl"
			>
				<div className="border-terminal-border bg-terminal-bg/80 flex items-center gap-3 border-b px-4 py-2.5">
					<TerminalIcon size={13} className="text-terminal-green shrink-0" />
					<span className="text-terminal-muted flex-1 truncate font-mono text-xs">
						{t('title')}
					</span>
					<button
						type="button"
						onClick={onClose}
						aria-label={t('close')}
						className="text-terminal-muted hover:text-terminal-text -mr-1 rounded p-1 transition-colors"
					>
						<X size={14} />
					</button>
				</div>

				<div
					ref={scrollRef}
					className="max-h-[min(60vh,26rem)] space-y-3 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:text-sm"
				>
					{history.length === 0 && <p className="text-terminal-comment">{t('intro')}</p>}

					{history.map((entry, index) => (
						<div key={`${entry.command}-${index}`} className="space-y-1">
							<p>
								<span className="text-terminal-green">{'~ $ '}</span>
								<span className="text-terminal-text">{entry.command}</span>
							</p>
							{entry.output}
						</div>
					))}

					<div className="flex items-center gap-2">
						<span className="text-terminal-green shrink-0">{'~ $'}</span>
						<input
							ref={inputRef}
							type="text"
							value={value}
							onChange={(event) => setValue(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault()
									submit()
									return
								}
								if (event.key === 'ArrowUp' && commands.length > 0) {
									event.preventDefault()
									const next =
										recall === null ? commands.length - 1 : Math.max(0, recall - 1)
									setRecall(next)
									setValue(commands[next])
									return
								}
								if (event.key === 'ArrowDown' && recall !== null) {
									event.preventDefault()
									const next = recall + 1
									if (next >= commands.length) {
										setRecall(null)
										setValue('')
									} else {
										setRecall(next)
										setValue(commands[next])
									}
								}
							}}
							// A placeholder that types itself, rather than a five-second
							// animation standing between the visitor and the page.
							placeholder={history.length === 0 ? demo.displayedText : ''}
							aria-label={t('placeholder')}
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck={false}
							className="text-terminal-text placeholder:text-terminal-muted/70 w-full min-w-0 flex-1 bg-transparent font-mono outline-none"
						/>
					</div>
				</div>

				<p className="border-terminal-border text-terminal-muted hidden border-t px-4 py-2 font-mono text-[11px] sm:block">
					{t('footerHint')}
				</p>
			</motion.div>
		</motion.div>
	)
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)

	const open = useCallback(() => setIsOpen(true), [])
	const close = useCallback(() => setIsOpen(false), [])

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				event.preventDefault()
				setIsOpen(false)
				return
			}
			if (event.key !== '/' || isOpen) return
			if (event.metaKey || event.ctrlKey || event.altKey) return

			// Never steal the key from someone typing into the contact form.
			const target = event.target
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable ||
					target instanceof HTMLInputElement ||
					target instanceof HTMLTextAreaElement ||
					target instanceof HTMLSelectElement)
			) {
				return
			}
			event.preventDefault()
			setIsOpen(true)
		}

		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [isOpen])

	// Stop the page behind the dialog from scrolling.
	useEffect(() => {
		if (!isOpen) return
		const previous = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = previous
		}
	}, [isOpen])

	const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])

	return (
		<PaletteContext.Provider value={value}>
			{children}
			<AnimatePresence>{isOpen && <PaletteDialog onClose={close} />}</AnimatePresence>
		</PaletteContext.Provider>
	)
}
