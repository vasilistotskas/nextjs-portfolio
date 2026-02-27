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
