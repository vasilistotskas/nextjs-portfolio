// used for SSR (getServerSideProps)
// const path = require('path')
// const localePath = path.resolve('./public/locales')

const path = require('path')

module.exports = {
	// https://www.i18next.com/overview/configuration-options#logging
	debug: process.env.NODE_ENV === 'development',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'el']
	},
	// localePath,
	reloadOnPrerender: process.env.NODE_ENV === 'development',
	// serializeConfig: false,
	localePath: path.resolve('./public/locales')
}
