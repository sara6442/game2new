'use client'

/**
 * Necklaces.tsx — Necklaces and neck jewelry.
 * Renders at z=4.8 (above top/dress neckline, under coat collar).
 */

export interface NecklaceProps {
  align?: { x: number; y: number; scale: number }
}

export interface NecklaceItem {
  id: string
  name: string
  Component: React.FC<NecklaceProps>
}

function makePngNecklace(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<NecklaceProps> {
  return function PngNecklace({ align }: NecklaceProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Add your necklaces here ──────────────────────────────────────────────────
export const Necklace1 = makePngNecklace('/necklace1.png', { x: 0, y: 0, scale: 1 })
export const Necklace2 = makePngNecklace('/necklace2.png', { x: 0, y: 0, scale: 1 })

export const NECKLACE_ITEMS: NecklaceItem[] = [
{ id: 'necklace1', name: 'Necklace 1', Component: Necklace1 },
  { id: 'necklace2', name: 'Necklace 2', Component: Necklace2 },

]

export default NECKLACE_ITEMS
