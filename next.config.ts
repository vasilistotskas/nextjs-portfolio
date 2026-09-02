import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const securityHeaders = [
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin'
	},
	{
		key: 'X-Frame-Options',
		value: 'DENY'
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on'
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=31536000; includeSubDomains; preload'
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=()'
	}
]

const nextConfig: NextConfig = {
	reactStrictMode: true,
	// Resolve `.wgsl` import graphs at build time and hand `effect()` one
	// finished shader. Turbopack needs `as: '*.js'` so it treats the loader
	// output as a module; the webpack hook only runs for commands without
	// `--turbopack`, and the two configurations coexist.
	turbopack: {
		rules: {
			'*.wgsl': {
				loaders: ['@vgpu/wgsl/loader-webpack'],
				as: '*.js'
			}
		}
	},
	webpack(config) {
		config.module ??= { rules: [] }
		config.module.rules ??= []
		config.module.rules.push({
			test: /\.wgsl$/,
			loader: '@vgpu/wgsl/loader-webpack',
			options: { minify: true }
		})
		return config
	},
	images: {
		remotePatterns: [
			{ hostname: 'i.scdn.co' },
			{ hostname: 'mosaic.scdn.co' },
			{ hostname: 'avatars.githubusercontent.com' }
		]
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders
			}
		]
	}
}

export default withNextIntl(nextConfig)
