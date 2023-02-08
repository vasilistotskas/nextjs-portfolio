import { getAllPosts } from '@lib/sanity/sanity.client'

const createSitemap = (slugs, locales) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${locales
					.map((locale) => {
						return slugs
							.map((slug) => {
								return `
                        <url>
                            <loc>${process.env.NEXT_PUBLIC_DOMAIN_NAME}/${locale}/${slug}</loc>
                        </url>
                    `
							})
							.join('')
					})
					.join('')}
    </urlset>
`

export async function getServerSideProps({ res, locales }) {
	const allPages = [
		...['', 'about', 'dashboard', 'guestbook', 'uses', 'blog', '404', 'offline']
	]

	const posts = await getAllPosts()
	const postPaths = posts.map((post) => `blog/${post.slug}`)
	allPages.push(...postPaths)

	res.setHeader('Content-Type', 'text/xml')
	res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')
	res.write(createSitemap(allPages, locales))
	res.end()

	return {
		props: {}
	}
}

export default function Sitemap() {
	return null
}
