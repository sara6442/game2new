'use client'

/**
 * Shoes.tsx — Footwear (shoes, boots, heels, sneakers, etc.)
 *
 * Renders at z=7, at the bottom of the body.
 */

export interface ShoeProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface ShoeItem {
  id: string
  name: string
  Component: React.FC<ShoeProps>
}

interface ShoeAlignment { x: number; y: number; scale: number }

function makePngShoe(src: string, defaultAlign: ShoeAlignment = { x: 0, y: 0, scale: 1 }): React.FC<ShoeProps> {
  return function PngShoe({ color, align }: ShoeProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image
          href={src}
          x={0}
          y={0}
          width={325}
          height={742}
          preserveAspectRatio="xMidYMid meet"
          onError={(e) => console.error(`Failed to load shoe: ${src}`, e)}
        />
      </g>
    )
  }
}

// ── Shoes with custom alignments ─────────────────────────────────────────────
export const Shoe1: React.FC<ShoeProps> = makePngShoe('/shoe1.png', { x: 0, y: 0, scale: 1 })
export const Shoe2: React.FC<ShoeProps> = makePngShoe('/shoe2.png', { x: 0, y: 0, scale: 1 })
export const Shoe3: React.FC<ShoeProps> = makePngShoe('/shoe3.png', { x: 0, y: 0, scale: 1 })
export const Shoe5: React.FC<ShoeProps> = makePngShoe('/shoe5.png', { x: 0, y: 0, scale: 1 })
export const Shoe4: React.FC<ShoeProps> = makePngShoe('/shoe4.png', { x: 0, y: 0, scale: 1 })
export const Shoe6: React.FC<ShoeProps> = makePngShoe('/shoe6.png', { x: 0, y: 0, scale: 1 })
export const Shoe7: React.FC<ShoeProps> = makePngShoe('/shoe7.png', { x: 0, y: 0, scale: 1 })
export const Shoe8: React.FC<ShoeProps> = makePngShoe('/shoe8.png', { x: 0, y: 0, scale: 1 })

export const SHOE_ITEMS: ShoeItem[] = [
  { id: 'shoe1', name: 'Summer Sandals', Component: Shoe1 },
  { id: 'shoe2', name: 'Shiny Sandals', Component: Shoe2 },
  { id: 'shoe3', name: 'Black Boots', Component: Shoe3 },
    { id: 'shoe5', name: 'Red Boats', Component: Shoe5 },
  { id: 'shoe4', name: 'Short Boots', Component: Shoe4 },
  { id: 'shoe6', name: 'Beige Ribbon', Component: Shoe6 },
  { id: 'shoe7', name: 'Pink Ribbon', Component: Shoe7 },
  { id: 'shoe8', name: 'Ballet Shoes', Component: Shoe8 },
]

export default SHOE_ITEMS
