'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Float, Grid, PerformanceMonitor, shaderMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import type { PointLight } from 'three'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════
   THEME PALETTES (matching globals.css semantic tokens)
   ═══════════════════════════════════════════════════════════ */
interface ThemePalette {
	green: string
	cyan: string
	purple: string
	muted: string
	nodeOpacity: number
	lineOpacity: number
	symbolOpacity: number
	gridCellColor: string
	gridSectionColor: string
	ambientIntensity: number
}

const PALETTE: Record<'dark' | 'light', ThemePalette> = {
	dark: {
		green: '#39d353',
		cyan: '#58a6ff',
		purple: '#bc8cff',
		muted: '#30363d',
		nodeOpacity: 0.6,
		lineOpacity: 0.12,
		symbolOpacity: 0.18,
		gridCellColor: '#30363d',
		gridSectionColor: '#58a6ff',
		ambientIntensity: 0.06
	},
	light: {
		green: '#1a7f37',
		cyan: '#0969da',
		purple: '#8250df',
		muted: '#d0d7de',
		nodeOpacity: 0.45,
		lineOpacity: 0.18,
		symbolOpacity: 0.3,
		gridCellColor: '#d0d7de',
		gridSectionColor: '#0969da',
		ambientIntensity: 0.15
	}
}

/* ═══════════════════════════════════════════════════════════
   REUSABLE GEOMETRIES (module-level)
   ═══════════════════════════════════════════════════════════ */
const nodeGeometry = new THREE.SphereGeometry(0.04, 6, 6)
const nodeMaterial = new THREE.MeshBasicMaterial({
	color: '#58a6ff',
	transparent: true,
	opacity: 0.6
})

/* ═══════════════════════════════════════════════════════════
   NETWORK NODE DATA (generated once at module level)
   ═══════════════════════════════════════════════════════════ */
const NODE_COUNT = 60

interface NodeData {
	position: THREE.Vector3
	connections: number[]
	speed: number
	phase: number
}

const networkNodes: NodeData[] = (() => {
	const nodes: NodeData[] = []
	for (let i = 0; i < NODE_COUNT; i++) {
		nodes.push({
			position: new THREE.Vector3(
				(Math.random() - 0.5) * 18,
				(Math.random() - 0.5) * 10,
				(Math.random() - 0.5) * 6 - 3
			),
			connections: [],
			speed: 0.15 + Math.random() * 0.25,
			phase: Math.random() * Math.PI * 2
		})
	}
	for (let i = 0; i < NODE_COUNT; i++) {
		for (let j = i + 1; j < NODE_COUNT; j++) {
			if (nodes[i].connections.length >= 2) break
			if (nodes[j].connections.length >= 2) continue
			const dist = nodes[i].position.distanceTo(nodes[j].position)
			if (dist < 4) {
				nodes[i].connections.push(j)
				nodes[j].connections.push(i)
			}
		}
	}
	return nodes
})()

const connectionPairs: [number, number][] = (() => {
	const pairs: [number, number][] = []
	const seen = new Set<string>()
	for (let i = 0; i < NODE_COUNT; i++) {
		for (const j of networkNodes[i].connections) {
			const key = `${Math.min(i, j)}-${Math.max(i, j)}`
			if (!seen.has(key)) {
				seen.add(key)
				pairs.push([i, j])
			}
		}
	}
	return pairs
})()

// Pre-build line geometries at module level
const lineGeometries = connectionPairs.map(([a, b]) =>
	new THREE.BufferGeometry().setFromPoints([
		networkNodes[a].position,
		networkNodes[b].position
	])
)

/* ═══════════════════════════════════════════════════════════
   CODE SYMBOL DEFINITIONS
   ═══════════════════════════════════════════════════════════ */
const CODE_SYMBOLS = [
	{ text: '<>', pos: [-7.5, 2.4, -2] as const, colorKey: 'green' as const },
	{ text: '{}', pos: [8, -1.2, -3] as const, colorKey: 'cyan' as const },
	{ text: '//', pos: [-6, -2, -2.5] as const, colorKey: 'muted' as const },
	{ text: '()', pos: [7, 3, -3.5] as const, colorKey: 'purple' as const },
	{ text: '=>', pos: [-8.5, -0.5, -4] as const, colorKey: 'green' as const },
	{ text: '[]', pos: [6.5, -3, -2] as const, colorKey: 'cyan' as const }
] as const

/* ═══════════════════════════════════════════════════════════
   CUSTOM SHADER: pulsing network connection lines
   ═══════════════════════════════════════════════════════════ */
const NetworkLineMaterial = shaderMaterial(
	{ time: 0, color: new THREE.Color('#58a6ff'), opacity: 0.12 },
	/* glsl */ `
    varying float vProgress;
    void main() {
      vProgress = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	/* glsl */ `
    uniform float time;
    uniform vec3 color;
    uniform float opacity;
    varying float vProgress;
    void main() {
      float pulse = sin(vProgress * 6.28 + time * 2.0) * 0.5 + 0.5;
      gl_FragColor = vec4(color, opacity * (0.4 + pulse * 0.6));
    }
  `
)

extend({ NetworkLineMaterial })

/* ═══════════════════════════════════════════════════════════
   MODULE-LEVEL STORES for Three.js objects
   (Avoids React compiler immutability issues with refs)
   ═══════════════════════════════════════════════════════════ */
const lineMaterialStore: THREE.ShaderMaterial[] = []
const symbolMaterialStore = new Map<string, THREE.MeshBasicMaterial>()

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ─── Mouse-reactive point light ─── */
function CursorLight({ color }: { color: string }) {
	const lightRef = useRef<PointLight>(null)
	const { pointer, viewport } = useThree()

	useFrame(() => {
		if (!lightRef.current) return
		lightRef.current.position.set(
			(pointer.x * viewport.width) / 2,
			(pointer.y * viewport.height) / 2,
			4
		)
	})

	return (
		<pointLight ref={lightRef} intensity={0.4} distance={10} color={color} />
	)
}

/* ─── Network graph: instanced nodes + pulsing connection lines ─── */
function NetworkGraph({ palette }: { palette: ThemePalette }) {
	const nodesRef = useRef<THREE.InstancedMesh>(null)
	const tempObj = useRef(new THREE.Object3D())

	useEffect(() => {
		if (!nodesRef.current) return
		for (let i = 0; i < NODE_COUNT; i++) {
			const node = networkNodes[i]
			tempObj.current.position.copy(node.position)
			tempObj.current.updateMatrix()
			nodesRef.current.setMatrixAt(i, tempObj.current.matrix)
		}
		nodesRef.current.instanceMatrix.needsUpdate = true
	}, [])

	// All mutations in useFrame — avoids compiler immutability conflicts
	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()

		// Animate node positions (gentle bob)
		if (nodesRef.current) {
			const mat = nodesRef.current.material as THREE.MeshBasicMaterial
			mat.color.set(palette.cyan)
			mat.opacity = palette.nodeOpacity
			for (let i = 0; i < NODE_COUNT; i++) {
				const node = networkNodes[i]
				tempObj.current.position.set(
					node.position.x,
					node.position.y + Math.sin(t * node.speed + node.phase) * 0.15,
					node.position.z
				)
				tempObj.current.updateMatrix()
				nodesRef.current.setMatrixAt(i, tempObj.current.matrix)
			}
			nodesRef.current.instanceMatrix.needsUpdate = true
		}

		// Update line shader uniforms (time + theme colors)
		const lineColor = new THREE.Color(palette.cyan)
		for (const mat of lineMaterialStore) {
			if (mat?.uniforms) {
				mat.uniforms.time.value = t
				mat.uniforms.color.value = lineColor
				mat.uniforms.opacity.value = palette.lineOpacity
			}
		}
	})

	return (
		<group>
			<instancedMesh
				ref={nodesRef}
				args={[nodeGeometry, nodeMaterial, NODE_COUNT]}
			/>
			<group>
				{lineGeometries.map((geo, idx) => (
					<lineSegments key={idx} geometry={geo}>
						{/* @ts-expect-error - R3F shaderMaterial extend typing */}
						<networkLineMaterial
							ref={(ref: THREE.ShaderMaterial) => {
								if (ref) lineMaterialStore[idx] = ref
							}}
							transparent
							depthWrite={false}
						/>
					</lineSegments>
				))}
			</group>
		</group>
	)
}

/* ─── Floating code symbol with hover interaction ─── */
function CodeSymbol({
	text,
	position,
	color,
	opacity
}: {
	text: string
	position: readonly [number, number, number]
	color: string
	opacity: number
}) {
	const meshRef = useRef<THREE.Mesh>(null)
	const [hovered, setHovered] = useState(false)

	const [geometry] = useState(() => {
		const canvas = document.createElement('canvas')
		canvas.width = 128
		canvas.height = 64
		const ctx = canvas.getContext('2d')
		if (ctx) {
			ctx.font = 'bold 48px monospace'
			ctx.fillStyle = '#ffffff'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillText(text, 64, 32)
		}
		const texture = new THREE.CanvasTexture(canvas)
		texture.needsUpdate = true
		const mat = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			opacity,
			depthWrite: false,
			side: THREE.DoubleSide,
			color
		})
		symbolMaterialStore.set(text, mat)
		return { geo: new THREE.PlaneGeometry(1.2, 0.6), mat }
	})

	// All mutations via useFrame — compiler-safe
	useFrame((_, delta) => {
		if (!meshRef.current) return
		const mat = symbolMaterialStore.get(text)
		if (mat) {
			mat.color.set(color)
			mat.opacity = hovered ? Math.min(opacity * 2.5, 0.7) : opacity
		}
		meshRef.current.rotation.y += delta * (hovered ? 0.4 : 0.08)
		const target = hovered ? 1.35 : 1
		const s = meshRef.current.scale.x
		meshRef.current.scale.setScalar(
			THREE.MathUtils.lerp(s, target, delta * 6)
		)
	})

	return (
		<Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.6}>
			<mesh
				ref={meshRef}
				position={[position[0], position[1], position[2]]}
				geometry={geometry.geo}
				material={geometry.mat}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			/>
		</Float>
	)
}

/* ═══════════════════════════════════════════════════════════
   SCENE COMPOSITION
   ═══════════════════════════════════════════════════════════ */
function Scene({ palette }: { palette: ThemePalette }) {
	return (
		<>
			<ambientLight intensity={palette.ambientIntensity} />
			<CursorLight color={palette.cyan} />

			<Grid
				position={[0, -3.5, 0]}
				args={[40, 40]}
				cellSize={1.2}
				cellThickness={0.4}
				cellColor={palette.gridCellColor}
				sectionSize={4.8}
				sectionThickness={0.8}
				sectionColor={palette.gridSectionColor}
				fadeDistance={25}
				fadeStrength={1.2}
				infiniteGrid
			/>

			<NetworkGraph palette={palette} />

			{CODE_SYMBOLS.map((sym) => (
				<CodeSymbol
					key={sym.text}
					text={sym.text}
					position={sym.pos}
					color={palette[sym.colorKey]}
					opacity={palette.symbolOpacity}
				/>
			))}
		</>
	)
}

/* ═══════════════════════════════════════════════════════════
   CANVAS WRAPPER
   ═══════════════════════════════════════════════════════════ */
export default function HeroBackground3D() {
	const [visible, setVisible] = useState(false)
	const [dpr, setDpr] = useState(1.5)
	const { theme } = useTheme()

	const palette = theme === 'light' ? PALETTE.light : PALETTE.dark

	useEffect(() => {
		const id = setTimeout(() => setVisible(true), 800)
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
				camera={{ position: [0, 0, 6], fov: 55 }}
				dpr={dpr}
				gl={{
					antialias: false,
					alpha: true,
					powerPreference: 'high-performance'
				}}
				style={{ background: 'transparent' }}
			>
				<PerformanceMonitor
					onIncline={handleIncline}
					onDecline={handleDecline}
				/>
				<Scene palette={palette} />
			</Canvas>
		</div>
	)
}
