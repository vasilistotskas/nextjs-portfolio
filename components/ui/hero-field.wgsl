// The hero field: source code as texture.
//
// The shape of code without any code — indentation, runs of identifiers, blank
// lines between blocks — with a parse wave travelling down the file and a caret
// on the working line. Reads instantly as programming and says nothing about any
// one project, which is the point: it stays true whatever the stack becomes.
//
// Deliberately quiet. It sits behind the headline, so it is texture, not subject.

struct Params {
  time: f32,
  aspect: f32,
  theme: f32,
  pointerOn: f32,
  pointer: vec2f,
  texel: vec2f,
  accent: vec4f,
  ground: vec4f,
  /** Visible text lines. Set from the canvas's CSS height, not its pixels. */
  lines: f32,
}
@group(0) @binding(0) var<uniform> params: Params;

fn hash11(n: f32) -> f32 {
  return fract(sin(n * 127.1) * 43758.5453123);
}


@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.time;

  // A monospace grid. Lines scroll upward as the file is read.
  // Line count is computed from CSS pixels host-side; deriving it from `texel`
  // here would make the glyph size depend on the display's pixel ratio.
  let LINES = params.lines;
  // Columns follow from the line height, so cells stay roughly monospace-shaped.
  let COLS = max(24.0, LINES * params.aspect / 0.55);

  let scroll = t * 0.55;
  let ly = uv.y * LINES + scroll;
  let line = floor(ly);
  let fy = fract(ly);

  let cx = uv.x * COLS;
  let col = floor(cx);
  let fx = fract(cx);

  // Blank lines separate blocks.
  let blank = step(hash11(line * 7.13) , 0.14);

  // Indentation: a slowly varying depth, snapped to tab stops.
  let depth = floor(1.5 + 2.5 * hash11(floor(line / 4.0) * 3.7));
  let indent = depth * 2.0;

  // Line length, then a run of "words" separated by single spaces.
  let lineLen = indent + COLS * (0.14 + 0.80 * hash11(line * 2.71 + 5.0));

  // Which word does this column belong to? Words are 2..9 columns wide.
  let rel = col - indent;
  var inWord = 0.0;
  var wordSeed = 0.0;
  if (rel >= 0.0 && col < lineLen && blank < 0.5) {
    // Walk a deterministic run-length sequence for this line.
    var cursor = 0.0;
    var w = 0.0;
    for (var i = 0; i < 18; i++) {
      let s = hash11(line * 31.7 + f32(i) * 5.13);
      let len = floor(2.0 + 7.0 * s);
      if (rel >= cursor && rel < cursor + len) {
        inWord = 1.0;
        wordSeed = line * 31.7 + f32(i) * 5.13;
        w = 1.0;
      }
      cursor += len + 1.0;   // one space between words
      if (cursor > COLS) { break; }
    }
  }

  // Glyph body: a block with a little air around it.
  let glyph = inWord
    * step(0.06, fx) * step(fx, 0.86)
    * step(0.22, fy) * step(fy, 0.80);

  // The parse wave: a band travelling down the file that lights what it crosses.
  let waveY = fract(t * 0.07) * LINES + scroll - LINES * 0.5;
  let nearWave = exp(-pow((line - waveY) / 3.4, 2.0));

  // Some runs read as keywords and sit brighter at rest.
  let keyword = step(0.80, hash11(wordSeed + 1.7));

  var intensity = glyph * (0.085 + 0.075 * hash11(wordSeed) + 0.15 * keyword);
  intensity += glyph * nearWave * 0.40;

  // Caret on the line the wave is working, blinking.
  let caretLine = floor(waveY);
  let caretCol = indent + floor(COLS * (0.14 + 0.80 * hash11(caretLine * 2.71 + 5.0)));
  let caret = step(abs(line - caretLine), 0.5)
    * step(abs(col - caretCol), 0.5)
    * step(0.18, fy) * step(fy, 0.84)
    * step(0.0, sin(t * 6.0));
  intensity += caret * 0.55;

  // Pointer warms the region under the cursor.
  let pd = length(vec2f((uv.x - 0.5) * params.aspect, uv.y - 0.5) - params.pointer);
  intensity *= 1.0 + params.pointerOn * exp(-pd * pd * 5.0) * 1.1;

  intensity *= mix(1.0, 0.52, params.theme);
  intensity *= smoothstep(1.0, 0.42, uv.y);
  intensity = clamp(intensity, 0.0, 1.0);

  let accent = params.accent.rgb;
  let ground = params.ground.rgb;
  let hot = mix(mix(accent, vec3f(1.0), 0.6), accent * 0.5, params.theme);
  var colour = mix(ground, accent, intensity);
  colour = mix(colour, hot, smoothstep(0.78, 1.0, intensity));
  return vec4f(colour, 1.0);
}
