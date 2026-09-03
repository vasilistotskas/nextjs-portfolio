import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import type { GitHubStats as GitHubStatsType } from '@/lib/types'

const USER = 'vasilistotskas'

function headers() {
	return {
		Accept: 'application/vnd.github.v3+json',
		...(process.env.GITHUB_TOKEN
			? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
			: {})
	}
}

async function fetchGitHubStats(): Promise<GitHubStatsType | null> {
	try {
		const [userRes, reposRes] = await Promise.all([
			fetch(`https://api.github.com/users/${USER}`, {
				headers: headers(),
				next: { revalidate: 3600 }
			}),
			fetch(`https://api.github.com/users/${USER}/repos?per_page=100`, {
				headers: headers(),
				next: { revalidate: 3600 }
			})
		])

		if (!userRes.ok || !reposRes.ok) return null

		const user = (await userRes.json()) as { public_repos: number; followers: number }
		const repos = (await reposRes.json()) as Array<{ stargazers_count: number }>
		const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0)

		return { stars, followers: user.followers, repos: user.public_repos }
	} catch {
		return null
	}
}

/**
 * The section owns its own heading so that it can disappear whole.
 * Without `GITHUB_TOKEN` these calls run unauthenticated against a shared-IP
 * rate limit, and a rate-limited response used to leave a heading sitting over
 * an empty space.
 */
function Section({ children }: { children: React.ReactNode }) {
	const t = useTranslations('github')

	return (
		<>
			<div className="section-divider" />
			<section className="px-4 py-14 md:px-6 md:py-20">
				<div className="mx-auto max-w-5xl">
					<h2 className="text-terminal-text mb-8 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
						{t('title')}
					</h2>
					{children}
				</div>
			</section>
		</>
	)
}

function Row({ items }: { items: Array<{ label: string; value: number | null }> }) {
	return (
		<dl className="flex flex-wrap gap-x-10 gap-y-4">
			{items.map(({ label, value }) => (
				<div key={label}>
					<dt className="text-terminal-muted font-sans text-xs">{label}</dt>
					<dd className="text-terminal-text m-0 font-mono text-xl font-medium tabular-nums">
						{value === null ? (
							<span className="bg-terminal-border/50 inline-block h-5 w-8 animate-pulse rounded align-middle" />
						) : (
							value
						)}
					</dd>
				</div>
			))}
		</dl>
	)
}

function labelled(t: (key: string) => string, stats: GitHubStatsType | null) {
	return [
		{ label: t('repos'), value: stats ? stats.repos : null },
		{ label: t('stars'), value: stats ? stats.stars : null },
		{ label: t('followers'), value: stats ? stats.followers : null }
	]
}

function GitHubStatsContent({ stats }: { stats: GitHubStatsType }) {
	const t = useTranslations('github')
	return (
		<Section>
			<Row items={labelled(t, stats)} />
		</Section>
	)
}

export function GitHubStatsSkeleton() {
	const t = useTranslations('github')
	return (
		<Section>
			<Row items={labelled(t, null)} />
		</Section>
	)
}

async function GitHubStatsAsync() {
	const stats = await fetchGitHubStats()
	// Nothing to show and nothing worth explaining to a visitor: drop the
	// section rather than leave a heading over a blank.
	if (!stats) return null
	return <GitHubStatsContent stats={stats} />
}

export default function GitHubStats() {
	return (
		<Suspense fallback={<GitHubStatsSkeleton />}>
			<GitHubStatsAsync />
		</Suspense>
	)
}
