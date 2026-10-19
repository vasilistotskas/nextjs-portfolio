// `twMerge` already joins strings and drops falsy values, which covers every
// conditional class in the codebase; only `{ class: bool }` objects would need
// a joiner like clsx, and nothing passes those.
export { twMerge as cn } from 'tailwind-merge'

export function formatDuration(ms: number): string {
	const minutes = Math.floor(ms / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
