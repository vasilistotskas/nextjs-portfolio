/**
 * The shape of the work: the layers a request passes through in the kind of
 * system this portfolio is about.
 *
 * This is the single source for the hero shader, the Skills section and the
 * per-project layer lists. It is deliberately generic — no project or vendor
 * names live here, only layers — so a new project is a mask, not a redesign.
 *
 * Order matters: the index of a layer is its bit in the mask and its node index
 * in `components/ui/stack-field.wgsl`. Append, never reorder.
 */
export const layers = [
	'browser',
	'edge',
	'frontend',
	'media',
	'api',
	'database',
	'cache',
	'queue',
	'workers',
	'storage'
] as const

export type Layer = (typeof layers)[number]

/** Every layer lit — what the hero shows. */
export const ALL_LAYERS = (1 << layers.length) - 1

export function mask(...on: readonly Layer[]): number {
	return on.reduce((value, layer) => value | (1 << layers.indexOf(layer)), 0)
}

export function maskToLayers(value: number): Layer[] {
	return layers.filter((_, index) => (value & (1 << index)) !== 0)
}

/**
 * Which layers each project actually runs. Used to light the hero map from a
 * project card and to print the layer list under it.
 */
export const projectLayers = {
	webside: mask(...layers),
	grooveshop: mask('browser', 'frontend', 'media', 'api', 'database', 'cache'),
	portfolio: mask('browser', 'edge', 'frontend', 'api')
} as const

export type ProjectKey = keyof typeof projectLayers

/**
 * Skills grouped by the same vocabulary as the map. `daily` separates what is
 * reached for every day from what is known well enough to ship with — a weight
 * difference in the UI rather than a second list.
 */
export type Skill = { name: string; daily?: boolean }

export type SkillGroup = {
	key: 'interface' | 'services' | 'data' | 'platform'
	layers: readonly Layer[]
	skills: readonly Skill[]
}

export const skillGroups: readonly SkillGroup[] = [
	{
		key: 'interface',
		layers: ['browser', 'frontend'],
		skills: [
			{ name: 'Vue.js', daily: true },
			{ name: 'Nuxt (v3/v4)', daily: true },
			{ name: 'TypeScript', daily: true },
			{ name: 'Tailwind CSS', daily: true },
			{ name: 'JavaScript' },
			{ name: 'React' },
			{ name: 'Next.js' },
			{ name: 'Vite' },
			{ name: 'HTML' },
			{ name: 'CSS' }
		]
	},
	{
		key: 'services',
		layers: ['api', 'media'],
		skills: [
			{ name: 'Python', daily: true },
			{ name: 'Django', daily: true },
			{ name: 'Django REST', daily: true },
			{ name: 'NestJS' },
			{ name: 'Node.js' },
			{ name: 'PHP' }
		]
	},
	{
		key: 'data',
		layers: ['database', 'cache', 'queue'],
		skills: [
			{ name: 'PostgreSQL', daily: true },
			{ name: 'Redis', daily: true },
			{ name: 'RabbitMQ' },
			{ name: 'Celery' }
		]
	},
	{
		key: 'platform',
		layers: ['edge', 'workers', 'storage'],
		skills: [
			{ name: 'Docker', daily: true },
			{ name: 'Kubernetes (k3s)', daily: true },
			{ name: 'Linux', daily: true },
			{ name: 'Git', daily: true },
			{ name: 'ArgoCD' },
			{ name: 'Nginx' },
			{ name: 'Cloudflare' },
			{ name: 'Hetzner' },
			{ name: 'Vercel' },
			{ name: 'Longhorn' },
			{ name: 'Cert-Manager' }
		]
	}
]
