import { fbmSimplex3d } from "@vgpu/wgsl-std/noise/simplex";
import { remap, saturate } from "@vgpu/wgsl-std/math";

// The layers of a fullstack request, browser to storage.
//
// Deliberately project-agnostic: the map is the shape of the work, not a diagram
// of one client's servers. Every project lights the subset of layers it uses
// through `litMask`, so adding or retiring a project is a data change in
// `lib/stack.ts` and never a shader change.

struct Params {
  time: f32,
  aspect: f32,
  theme: f32,        // 0 = dark ground, 1 = light ground
  pointerOn: f32,    // 0 or 1
  pointer: vec2f,    // centred, height-relative space (same space as NODES)
  texel: vec2f,      // 1 / canvas size in physical pixels
  accent: vec4f,     // rgb from --green
  ground: vec4f,     // rgb from --bg
  litMask: u32,      // bit n set = layer n is lit. `active` is a reserved word in WGSL.
}
@group(0) @binding(0) var<uniform> params: Params;

// Indices match `layers` in lib/stack.ts. x is height-relative, y grows downward
// because the `uv` vgpu injects is top-origin.
var<private> NODES: array<vec2f, 10> = array<vec2f, 10>(
  vec2f(-0.72, -0.12),  // 0 browser
  vec2f(-0.46, -0.12),  // 1 edge
  vec2f(-0.19, -0.30),  // 2 frontend
  vec2f(-0.19,  0.06),  // 3 media
  vec2f( 0.09, -0.12),  // 4 api
  vec2f( 0.40, -0.34),  // 5 database
  vec2f( 0.42, -0.10),  // 6 cache
  vec2f( 0.40,  0.14),  // 7 queue
  vec2f( 0.69,  0.14),  // 8 workers
  vec2f( 0.69, -0.34)   // 9 storage
);

var<private> EDGES: array<vec2u, 10> = array<vec2u, 10>(
  vec2u(0u, 1u), vec2u(1u, 2u), vec2u(1u, 3u), vec2u(2u, 4u), vec2u(3u, 4u),
  vec2u(4u, 5u), vec2u(4u, 6u), vec2u(4u, 7u), vec2u(7u, 8u), vec2u(5u, 9u)
);

fn lit(index: u32) -> f32 {
  return f32((params.litMask >> index) & 1u);
}

// Smooth, band-limited substrate the layers sit on. fbmSimplex3d is guaranteed
// to stay inside (-1, 1), so this remaps rather than saturating the field and
// throwing away its negative half.
fn substrate(position: vec2f, seconds: f32) -> f32 {
  let warp = fbmSimplex3d(vec3f(position * 0.55, seconds * 0.02), 3, 2.17, 0.5);
  let value = fbmSimplex3d(vec3f(position * 1.1 + warp * 0.4, seconds * 0.05), 4, 2.17, 0.5);
  return saturate(remap(-0.6, 0.6, 0.0, 1.0, value));
}

fn sdSegment(position: vec2f, a: vec2f, b: vec2f) -> f32 {
  let pa = position - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let seconds = params.time;

  // Keep the map legible on narrow canvases instead of scaling it into nothing.
  let fit = clamp(params.aspect / 1.7, 0.82, 1.0);
  let p = vec2f((uv.x - 0.5) * params.aspect, uv.y - 0.5) / fit;
  let px = params.texel.y / fit;   // one physical pixel, in p units

  // Kept deliberately faint. The substrate is atmosphere behind the map, not
  // the subject: anything louder and the topology stops reading as a diagram.
  let haze = max(substrate(p, seconds) - 0.74, 0.0);
  var ambient = haze * haze * 1.6 * (1.0 - params.theme * 0.72);

  // Pointer light. Falls back to 0 on touch, where there is no hover.
  let pointerDistance = length(p - params.pointer);
  let light = params.pointerOn * exp(-pointerDistance * pointerDistance * 3.0);

  // Edges carry packets only when both ends are lit; a dead edge stays as a
  // faint trace so the shape of the whole stack still reads.
  var net = 0.0;
  var packets = 0.0;
  for (var e = 0u; e < 10u; e++) {
    let ends = EDGES[e];
    let a = NODES[ends.x];
    let b = NODES[ends.y];
    let on = lit(ends.x) * lit(ends.y);
    let distance = sdSegment(p, a, b);
    net += smoothstep(px * 1.6, 0.0, distance) * mix(0.07, 0.28, on);

    let span = length(b - a);
    let speed = 0.10 + 0.05 * f32(e % 3u);
    for (var k = 0u; k < 2u; k++) {
      let phase = fract(seconds * speed / span + f32(k) * 0.5 + f32(e) * 0.173);
      let position = mix(a, b, phase);
      let toPacket = length(p - position);
      packets += exp(-toPacket * toPacket / (px * px * 55.0)) * (0.7 + 0.5 * light) * on;
    }
  }

  var nodes = 0.0;
  for (var n = 0u; n < 10u; n++) {
    let centre = NODES[n];
    let distance = length(p - centre);
    let on = lit(n);
    let beat = (0.5 + 0.5 * sin(seconds * 1.3 + f32(n) * 1.9)) * on;
    let radius = px * (4.5 + 1.5 * beat);

    var node = smoothstep(radius, radius - px * 1.5, distance) * mix(0.22, 1.0, on);
    node += exp(-distance * distance / (radius * radius * 16.0)) * (0.20 + 0.30 * beat) * on;
    node += smoothstep(px * 1.2, 0.0, abs(distance - radius * 2.3)) * 0.35 * beat;
    nodes += node;
  }

  var intensity = ambient + net * (0.6 + 0.6 * light) + packets + nodes;
  intensity *= 1.0 + light * 0.9;
  intensity *= smoothstep(1.02, 0.60, uv.y);   // melt into the page below
  intensity = clamp(intensity, 0.0, 1.0);

  let accent = params.accent.rgb;
  let ground = params.ground.rgb;
  let hot = mix(mix(accent, vec3f(1.0), 0.65), accent * 0.55, params.theme);

  var colour = mix(ground, accent, intensity);
  colour = mix(colour, hot, smoothstep(0.78, 1.0, intensity));
  return vec4f(colour, 1.0);
}
