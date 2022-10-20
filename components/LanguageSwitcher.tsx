import React, {
	SetStateAction,
	SyntheticEvent,
	useCallback,
	useMemo,
	useState
} from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { cloneDeep } from 'lodash'

const LanguageSwitcher: React.FC<{
	onChange?: (locale: string) => unknown
}> = ({ onChange }) => {
	const { i18n } = useTranslation()
	const { language: currentLanguage } = i18n
	const router = useRouter()
	const locales = router.locales ?? [currentLanguage]

	const languageNames = useMemo(() => {
		return new Intl.DisplayNames([currentLanguage], {
			type: 'language'
		})
	}, [currentLanguage])

	const [value, setValue] = useState({
		value: i18n.language,
		label: capitalize(languageNames.of(currentLanguage) ?? currentLanguage)
	})

	const switchToLocale = useCallback(
		(locale: string) => {
			const path = router.asPath

			return router.push(path, path, { locale })
		},
		[router]
	)
	const languageChanged = useCallback(
		async (event: SyntheticEvent) => {
			const value: SetStateAction<{ value: string; label: string }> =
				cloneDeep(event)
			setValue(value)
			const locale = (event.target as HTMLInputElement).value

			if (onChange) {
				onChange(locale)
			}

			await switchToLocale(locale)
		},
		[switchToLocale, onChange]
	)
	return (
		<select value={value.value} onChange={languageChanged} onSelect={languageChanged}>
			{locales.map((locale) => {
				const label = capitalize(languageNames.of(locale) ?? locale)
				const option = {
					value: locale,
					label
				}
				return <option key={locale} value={option.value} label={option.label} />
			})}
		</select>
	)
}

function capitalize(lang: string) {
	return lang.slice(0, 1).toUpperCase() + lang.slice(1)
}

export default LanguageSwitcher
