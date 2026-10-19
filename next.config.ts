import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { wgslTurbopackRule } from '@vgpu/wgsl/next'
import type { WgslTurbopackRuleOptions } from '@vgpu/wgsl/next'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const wgslLoaderOptions: WgslTurbopackRuleOptions = { minify: true }

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
	// prepared shader. `wgslTurbopackRule()` fingerprints the installed compiler
	// in the loader options, so a restored `.next/cache` cannot serve shaders
	// built by an older one. The webpack hook only runs for `next build
	// --webpack`; the two configurations coexist.
	turbopack: {
		rules: {
			'*.wgsl': wgslTurbopackRule(wgslLoaderOptions)
		}
	},
	webpack(config) {
		config.module ??= { rules: [] }
		config.module.rules ??= []
		config.module.rules.push({
			test: /\.wgsl$/,
			loader: '@vgpu/wgsl/loader-webpack',
			options: wgslLoaderOptions
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
