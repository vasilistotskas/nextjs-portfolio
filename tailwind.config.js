const { spacing, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
		'./ui/**/*.{js,ts,jsx,tsx}'
	],
	future: {
		hoverOnlyWhenSupported: true
	},
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'blue-opaque': 'rgb(13 42 148 / 18%)',
				gray: {
					0: '#fff',
					100: '#fafafa',
					200: '#eaeaea',
					300: '#999999',
					400: '#888888',
					500: '#666666',
					600: '#444444',
					700: '#333333',
					800: '#222222',
					900: '#111111'
				}
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans]
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.700'),
						a: {
							color: theme('colors.blue.500'),
							'&:hover': {
								color: theme('colors.blue.700')
							},
							code: { color: theme('colors.blue.400') }
						},
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32]
						},
						thead: {
							borderBottomColor: theme('colors.gray.200')
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false
					}
				},
				dark: {
					css: {
						color: theme('colors.gray.200'),
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.600')
							},
							code: { color: theme('colors.blue.400') }
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300')
						},
						'h2,h3,h4': {
							color: theme('colors.gray.100'),
							'scroll-margin-top': spacing[32]
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') }
							}
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') }
							}
						},
						strong: { color: theme('colors.gray.100') },
						thead: {
							th: {
								color: theme('colors.gray.100')
							},
							borderBottomColor: theme('colors.gray.600')
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700')
							}
						}
					}
				}
			}),
			gridTemplateColumns: {
				'auto-1fr': 'auto 1fr',
				'2fr-1fr': '2fr 1fr',
				'1fr-auto': '1fr auto',
				'auto-auto': 'auto auto',
				'auto-1fr-third_fr': 'auto 1fr 0.3fr',
				'repeat-auto-fill-mimax-80-auto': 'repeat(auto-fill, minmax(87px, auto));'
			},
			gridRow: {
				'second-row': '2',
				'one-third-row': '1 / 3'
			},
			gridColumn: {
				'full-column': '1 / span 2',
				'two-third-column': '2 / 3'
			}
		}
	},
	variants: {
		typography: ['dark']
	},
	plugins: [require('@tailwindcss/typography')]
}
