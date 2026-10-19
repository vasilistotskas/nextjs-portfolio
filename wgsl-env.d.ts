// Types `.wgsl` imports as the prepared `ShaderSource` the loader emits. This
// needs `@vgpu/wgsl` as a direct dependency: under pnpm's isolated layout a
// transitive copy does not resolve from here.
/// <reference types="@vgpu/wgsl/wgsl-types" />
