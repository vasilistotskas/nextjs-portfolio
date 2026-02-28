import dynamic from 'next/dynamic'

const HeroBackground3D = dynamic(
	() => import('@/components/ui/HeroBackground3D'),
	{ ssr: false }
)

export default function HeroBackground3DWrapper() {
	return <HeroBackground3D />
}
