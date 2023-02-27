import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { cloneDeep } from 'lodash'

const LanguageSwitcher: React.FC<{
	onChange?: (locale: string) => unknown
}> = ({ onChange }) => {
	const { i18n } = useTranslation()
	const { language: currentLanguage } = i18n
	const router = useRouter()

	const locales = useMemo(
		() => router.locales || [currentLanguage],
		[router.locales, currentLanguage]
	)

	const sortedLocales = useMemo(() => {
		const localesCopy = cloneDeep(locales)
		const selectedLocaleIndex = localesCopy.indexOf(currentLanguage)
		localesCopy.splice(selectedLocaleIndex, 1)
		localesCopy.unshift(currentLanguage)
		return localesCopy
	}, [locales, currentLanguage])

	const languageNames = useMemo(() => {
		return new Intl.DisplayNames([currentLanguage], {
			type: 'language'
		})
	}, [currentLanguage])

	const [] = useState({
		value: i18n.language,
		label: capitalize(languageNames.of(currentLanguage) || currentLanguage)
	})

	const switchToLocale = useCallback(
		(locale: string) => {
			const path = router.asPath

			return router.push(path, path, { locale })
		},
		[router]
	)
	const languageChanged = useCallback(
		async (event) => {
			const locale = event.currentTarget.value

			if (onChange) {
				onChange(locale)
			}

			await switchToLocale(locale)
		},
		[switchToLocale, onChange]
	)

	const [isOpen, setIsOpen] = useState(false)
	const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])

	useEffect(() => {
		// Add event listener to document to close toggle when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			const languageSwitcher = document.getElementById('language-switcher')
			const languageSwitcherMenu = document.getElementById('language-switcher-menu')
			if (
				!languageSwitcher?.contains(target) &&
				!languageSwitcherMenu?.contains(target)
			) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	return (
		<div className="relative grid items-center justify-center">
			<button
				className="relative flex cursor-pointer items-center justify-center rounded-lg border p-2 text-left font-normal text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800 sm:text-sm"
				id="language-switcher"
				type="button"
				aria-label={currentLanguage}
				aria-haspopup="true"
				aria-expanded="true"
				onClick={toggleOpen}
			>
				<svg
					viewBox="0 0 88.6 77.3"
					className="h-6 w-6 text-gray-700 dark:text-gray-200"
					role="img"
				>
					<path
						fill="currentColor"
						d="M61 24.6h7.9l18.7 51.6h-7.7l-5.4-15.5H54.3l-5.6 15.5h-7.2L61 24.6zM72.6 55l-8-22.8L56.3 55h16.3z"
					></path>
					<path
						fill="currentColor"
						d="M53.6 60.6c-10-4-16-9-22-14 0 0 1.3 1.3 0 0-6 5-20 13-20 13l-4-6c8-5 10-6 19-13-2.1-1.9-12-13-13-19h8c4 9 10 14 10 14 10-8 10-19 10-19h8s-1 13-12 24c5 5 10 9 19 13l-3 7zm-52-44h56v-8h-23v-7h-9v7h-24v8z"
					></path>
				</svg>
			</button>
			{isOpen && (
				<ul
					id="language-switcher-menu"
					className="focus-none shadow-l absolute top-11 left-0 z-40 mt-1 table max-h-60 w-full -translate-y-0 transform overflow-auto rounded-lg border bg-white text-base opacity-100 focus:outline-none focus-visible:outline-none sm:text-sm md:grid"
					role="listbox"
					aria-orientation="vertical"
				>
					{sortedLocales.map((locale) => {
						const label = capitalize(languageNames.of(locale) || locale)
						const option = {
							value: locale,
							label
						}
						return (
							<li
								className={`${
									i18n.language === option.value ? 'bg-green-200' : 'bg-white'
								} focus-none false relative cursor-pointer rounded-lg py-2 px-4 text-gray-800 outline-none`}
								key={locale}
								value={option.value}
								role="option"
								aria-selected="false"
								onClick={() => languageChanged({ currentTarget: { value: locale } })}
							>
								<span> {option.label}</span>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

function capitalize(lang: string) {
	return lang.slice(0, 1).toUpperCase() + lang.slice(1)
}

export default LanguageSwitcher
