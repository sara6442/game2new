'use client'

/**
 * Body.tsx — Base body layer for the dress-up game.
 *
 * Uses the ORIGINAL uploaded body image directly. The image already
 * has the properties the user wants:
 *   - A blank head (no facial features) — only hairstyles layer on top
 *   - A built-in white bandeau + gray pencil skirt as a modesty base
 *     → the model is NEVER naked, even if all clothing items are removed
 *   - Tall, slender fashion-illustration proportions (325 × 742)
 *   - Arms slightly away from the torso (room for sleeves)
 *
 * The image is drawn at the bottom of the layer stack (z=2). Every
 * clothing / hairstyle / accessory SVG uses the same 325 × 742 viewBox
 * so they overlay the body perfectly.
 */

export function Body() {
  return (
    <g>
      <image
        href="/body.png"
        x={0}
        y={0}
        width={325}
        height={742}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  )
}

export default Body
