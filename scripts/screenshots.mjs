/**
 * Retake the project screenshots in `public/projects/<key>/` from the live
 * sites, as listed in `lib/projects.ts`.
 *
 *   pnpm screenshots              every project
 *   pnpm screenshots webside      only the named projects
 *
 * Drives the installed Chrome (`playwright-core` ships no browser).
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { projects, shotSrc, viewports } from '../lib/projects.ts'

/** Cookie banners get the privacy-preserving answer before the shot. */
const DECLINE = /^(Απόρριψη|Μόνο τα απαραίτητα|Reject|Decline)$/i

/** Time for entrance animations and lazy images to settle. */
const SETTLE_MS = 2500

const only = process.argv.slice(2)
const selected = only.length ? projects.filter((p) => only.includes(p.key)) : projects

if (only.length && selected.length !== only.length) {
	const known = projects.map((p) => p.key).join(', ')
	console.error(`Unknown project in "${only.join(' ')}". Known: ${known}`)
	process.exit(1)
}

const browser = await chromium.launch({ channel: 'chrome' })

try {
	for (const project of selected) {
		await mkdir(new URL(`../public/projects/${project.key}/`, import.meta.url), {
			recursive: true
		})

		for (const shot of project.shots) {
			const { width, height, scale } = viewports[shot.viewport]
			const context = await browser.newContext({
				viewport: { width, height },
				deviceScaleFactor: scale,
				isMobile: shot.viewport === 'mobile',
				hasTouch: shot.viewport === 'mobile',
				colorScheme: 'dark'
			})
			const page = await context.newPage()
			const url = new URL(shot.path, project.live).href

			await page.goto(url, { waitUntil: 'networkidle' })

			const decline = page.getByRole('button', { name: DECLINE })
			if (await decline.count()) {
				await decline.first().click()
			}

			await page.waitForTimeout(SETTLE_MS)

			const file = fileURLToPath(
				new URL(`../public${shotSrc(project.key, shot)}`, import.meta.url)
			)
			await page.screenshot({ path: file })
			console.log(`${project.key}/${shot.name}  ${url}`)

			await context.close()
		}
	}
} finally {
	await browser.close()
}
