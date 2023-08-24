// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

const runtimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	disable: process.env.NODE_ENV === 'development',
	skipWaiting: true,
	runtimeCaching,
	buildExcludes: [/middleware-manifest.json$/]
})

module.exports = withBundleAnalyzer(
	withPWA({
		i18n,
		reactStrictMode: true,
		images: {
			domains: [
				'i.scdn.co', // Spotify Album Art
				'pbs.twimg.com', // Twitter Profile Picture
				'img.icons8.com' // Twitter Profile Picture
			],
			remotePatterns: [{ hostname: 'cdn.sanity.io' }, { hostname: 'source.unsplash.com' }]
		},
		typescript: {
			// Set this to false if you want production builds to abort if there's type errors
			ignoreBuildErrors: true
		},
		eslint: {
			/// Set this to false if you want production builds to abort if there's lint errors
			ignoreDuringBuilds: process.env.VERCEL_ENV === 'production'
		},
		experimental: {
			// appDir: true
		},
		async headers() {
			return [
				{
					source: '/(.*)',
					headers: securityHeaders
				}
			]
		}
	})
)

// https://nextjs.org/docs/advanced-features/security-headers
const ContentSecurityPolicy = `
    child-src *.youtube.com *.google.com *.twitter.com;
    frame-src 'self';
    worker-src 'self' blob:;
    default-src 'self' 'unsafe-inline' blob:;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.googleoptimize.com *.g.doubleclick.net *.googletagmanager.com *.google-analytics.com *.analytics.google.com *.youtube.com *.twitter.com data: https://cdn.vercel-insights.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
`

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\n/g, '')
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: 'X-Frame-Options',
		value: 'DENY'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=31536000; includeSubDomains; preload'
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=()'
	}
]
