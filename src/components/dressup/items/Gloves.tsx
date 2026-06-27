'use client'

/**
 * Gloves.tsx — Gloves and hand coverings.
 *
 * Layer order on hands (bottom → top):
 *   HandDecorations (henna, nails) → Gloves → Bracelets → [long sleeves cover all]
 *
 * Renders at z=3.2 (above hand decorations, below bracelets, under long sleeves).
 */

export interface GloveProps {
  align?: { x: number; y: number; scale: number }
}

export interface GloveItem {
  id: string
  name: string
  Component: React.FC<GloveProps>
}

function makePngGlove(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<GloveProps> {
  return function PngGlove({ align }: GloveProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Add your gloves here ─────────────────────────────────────────────────────
export const Gloves1 = makePngGlove('/gloves1.png', { x: 0, y: 0, scale: 1 })
export const Gloves2 = makePngGlove('/gloves2.png', { x: 0, y: 0, scale: 1 })


export const GLOVE_ITEMS: GloveItem[] = [
 { id: 'gloves1', name: 'Long White', Component: Gloves1 },
 { id: 'gloves2', name: 'Short Black', Component: Gloves2 },
]

export default GLOVE_ITEMS
