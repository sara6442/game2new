/**
 * canvas-dimensions.ts — Shared canvas dimensions for the dress-up game.
 *
 * Adjusted to remove excess white space above and below the model,
 * while keeping enough room above the head for hair/hats.
 */

export const CANVAS_WIDTH = 520          // Narrower (was 560) — tighter frame
export const CANVAS_HEIGHT = 760         // Shorter (was 800) — removes top/bottom white space
export const BODY_WIDTH = 325
export const BODY_HEIGHT = 742

// Scale the body UP so it fills most of the frame
export const BODY_SCALE = 0.88           // Larger (was 0.82)

// Scaled body dimensions
export const SCALED_BODY_WIDTH = BODY_WIDTH * BODY_SCALE    // = 286
export const SCALED_BODY_HEIGHT = BODY_HEIGHT * BODY_SCALE  // = 652.96

// Center the body horizontally
export const BODY_OFFSET_X = (CANVAS_WIDTH - SCALED_BODY_WIDTH) / 2   // = 117

// Anchor the body near the bottom, with a small margin
const BOTTOM_MARGIN = 8
export const BODY_OFFSET_Y = CANVAS_HEIGHT - SCALED_BODY_HEIGHT - BOTTOM_MARGIN  // ≈ 99

// Space above the head (for hair/hats)
export const HEAD_SPACE_ABOVE = BODY_OFFSET_Y

// The complete SVG transform string for the body group
export const BODY_TRANSFORM = `translate(${BODY_OFFSET_X}, ${BODY_OFFSET_Y}) scale(${BODY_SCALE})`

/** The SVG viewBox string for the full canvas */
export const CANVAS_VIEWBOX = `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`

/** The aspect ratio string for CSS */
export const CANVAS_ASPECT_RATIO = `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`
