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

function GitHubStatsContent({ stats }: { stats: GitHubStatsType | null }) {
	const t = useTranslations('github')

	if (!stats) return null

	return (
		<Row
			items={[
				{ label: t('repos'), value: stats.repos },
				{ label: t('stars'), value: stats.stars },
				{ label: t('followers'), value: stats.followers }
			]}
		/>
	)
}

export function GitHubStatsSkeleton() {
	const t = useTranslations('github')

	return (
		<Row
			items={[
				{ label: t('repos'), value: null },
				{ label: t('stars'), value: null },
				{ label: t('followers'), value: null }
			]}
		/>
	)
}

async function GitHubStatsAsync() {
	const stats = await fetchGitHubStats()
	return <GitHubStatsContent stats={stats} />
}

export default function GitHubStats() {
	return (
		<Suspense fallback={<GitHubStatsSkeleton />}>
			<GitHubStatsAsync />
		</Suspense>
	)
}
