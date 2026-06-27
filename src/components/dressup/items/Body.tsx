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
 */'use client'

/**
 * Body.tsx — Base body layer for the dress-up game.
 *
 * Accepts a `src` prop so StageCanvas can switch between:
 *   /Body-H-B.png  — body with bra (default, used for most clothes)
 *   /Body-H-NB.png — body without bra (used for open/cut clothes)
 */

interface BodyProps {
  src?: string
}

export function Body({ src = '/Body-H-B.png' }: BodyProps) {
  return (
    <image
      href={src}
      x={0}
      y={0}
      width={325}
      height={742}
      preserveAspectRatio="xMidYMid meet"
    />
  )
}

export default Body
