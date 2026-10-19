// The default export of a `.wgsl` import is a `ShaderSource` object, not a
// string — pass it straight to `effect(gpu, source)`.
//
// `/// <reference types="@vgpu/wgsl/wgsl-types" />` is the shorter form the vgpu
// docs suggest, but under `moduleResolution: "bundler"` it resolves to the
// package root types instead of the `./wgsl-types` subpath and the declaration
// never lands. `@vgpu/wgsl` is a transitive dependency, so under pnpm's isolated
// layout it is not importable from here by name — but `vgpu` re-exports the
// type, so reference it there instead of copying its shape.
declare module '*.wgsl' {
	import type { ShaderSource } from 'vgpu'
	const source: ShaderSource
	export default source
}
