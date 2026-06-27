'use client'

/**
 * Rings.tsx — Finger rings and hand jewelry.
 *
 * Layer order on hands (bottom → top):
 *   HandDecorations → Rings → Gloves → Bracelets → [long sleeves cover all]
 *
 * Renders at z=3.15 (above henna/nails, under gloves).
 */

export interface RingProps {
  align?: { x: number; y: number; scale: number }
}

export interface RingItem {
  id: string
  name: string
  Component: React.FC<RingProps>
}

function makePngRing(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<RingProps> {
  return function PngRing({ align }: RingProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Add your rings here ──────────────────────────────────────────────────────
export const Ring1 = makePngRing('/ring1.png', { x: 0, y: 0, scale: 1 })
export const Ring2 = makePngRing('/ring2.png', { x: 0, y: 0, scale: 1 })
export const Ring3 = makePngRing('/ring3.png', { x: 0, y: 0, scale: 1 })
export const Ring4 = makePngRing('/ring4.png', { x: 0, y: 0, scale: 1 })


export const RING_ITEMS: RingItem[] = [
  { id: 'ring1', name: 'Ring 1 ', Component: Ring1 },
    { id: 'ring2', name: 'Ring 2', Component: Ring2 },
  { id: 'ring3', name: 'Ring 3', Component: Ring3 },
  { id: 'ring4', name: 'Ring 4', Component: Ring4 },

]

export default RING_ITEMS
