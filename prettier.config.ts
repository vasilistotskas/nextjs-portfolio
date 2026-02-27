import type { Config } from 'prettier'

const config: Config = {
	arrowParens: 'always',
	printWidth: 90,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,
	plugins: ['prettier-plugin-tailwindcss']
}

export default config
