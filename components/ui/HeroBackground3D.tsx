'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerformanceMonitor } from '@react-three/drei'
import { useTheme } from 'next-themes'
import type { Mesh } from 'three'

interface Palette {
	green: string
	wireOpacity: number
	solidOpacity: number
}

const PALETTE: Record<'dark' | 'light', Palette> = {
	dark: {
		green: '#34d399',
		wireOpacity: 0.15,
		solidOpacity: 0.3
	},
	light: {
		green: '#059669',
		wireOpacity: 0.25,
		solidOpacity: 0.45
	}
}

/* ─── Floating torus ring — signature piece ─── */
function TorusRing({ palette }: { palette: Palette }) {
	const ref = useRef<Mesh>(null)

	useFrame((_, delta) => {
		if (!ref.current) return
		ref.current.rotation.x += delta * 0.06
		ref.current.rotation.z += delta * 0.03
	})

	return (
		<Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.3}>
			<mesh ref={ref} position={[10, 0, -3]}>
				<torusGeometry args={[3, 0.015, 16, 120]} />
				<meshBasicMaterial
					color={palette.green}
					transparent
					opacity={palette.solidOpacity}
				/>
			</mesh>
		</Float>
	)
}

/* ─── Wireframe icosahedron ─── */
function WireIcosahedron({ palette }: { palette: Palette }) {
	const ref = useRef<Mesh>(null)

	useFrame((_, delta) => {
		if (!ref.current) return
		ref.current.rotation.y += delta * 0.1
		ref.current.rotation.x += delta * 0.05
	})

	return (
		<Float speed={0.5} rotationIntensity={0.15} floatIntensity={0.4}>
			<mesh ref={ref} position={[-10, -3.5, -3]}>
				<icosahedronGeometry args={[2, 1]} />
				<meshBasicMaterial
					color={palette.green}
					wireframe
					transparent
					opacity={palette.wireOpacity}
				/>
			</mesh>
		</Float>
	)
}

/* ─── Small accent octahedron ─── */
function AccentOctahedron({ palette }: { palette: Palette }) {
	const ref = useRef<Mesh>(null)

	useFrame((_, delta) => {
		if (!ref.current) return
		ref.current.rotation.y += delta * 0.15
	})

	return (
		<Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.5}>
			<mesh ref={ref} position={[8, 4, -4]}>
				<octahedronGeometry args={[0.7, 0]} />
				<meshBasicMaterial
					color={palette.green}
					wireframe
					transparent
					opacity={palette.wireOpacity * 0.7}
				/>
			</mesh>
		</Float>
	)
}

/* ─── Scene ─── */
function Scene({ palette }: { palette: Palette }) {
	return (
		<>
			<ambientLight intensity={0.03} />
			<TorusRing palette={palette} />
			<WireIcosahedron palette={palette} />
			<AccentOctahedron palette={palette} />
		</>
	)
}

/* ─── Canvas wrapper ─── */
export default function HeroBackground3D() {
	const [visible, setVisible] = useState(false)
	const [dpr, setDpr] = useState(1.5)
	const { theme } = useTheme()

	const palette = theme === 'light' ? PALETTE.light : PALETTE.dark

	useEffect(() => {
		const id = setTimeout(() => setVisible(true), 600)
		return () => clearTimeout(id)
	}, [])

	const handleIncline = useCallback(() => setDpr(2), [])
	const handleDecline = useCallback(() => setDpr(1), [])

	return (
		<div
			className="absolute inset-0 z-0 transition-opacity duration-1000 ease-out"
			style={{ opacity: visible ? 1 : 0 }}
			aria-hidden="true"
		>
			<Canvas
				camera={{ position: [0, 0, 8], fov: 50 }}
				dpr={dpr}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance'
				}}
				style={{ background: 'transparent' }}
			>
				<PerformanceMonitor onIncline={handleIncline} onDecline={handleDecline} />
				<Scene palette={palette} />
			</Canvas>
		</div>
	)
}
