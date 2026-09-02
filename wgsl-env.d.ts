// The default export of a `.wgsl` import is a `ShaderSource` object, not a
// string — pass it straight to `effect(gpu, source)`.
//
// `/// <reference types="@vgpu/wgsl/wgsl-types" />` is the shorter form the vgpu
// docs suggest, but under `moduleResolution: "bundler"` it resolves to the
// package root types instead of the `./wgsl-types` subpath and the declaration
// never lands. `@vgpu/wgsl` is also a transitive dependency, so under pnpm's
// isolated layout it is not importable from here by name. Hence the literal.
declare module '*.wgsl' {
	const source: { readonly version: 1; readonly wgsl: string }
	export default source
}
