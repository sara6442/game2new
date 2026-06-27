'use client'

/**
 * Bracelets.tsx — Bracelets and wrist accessories.
 *
 * Layer order on hands (bottom → top):
 *   HandDecorations → Gloves → Bracelets → [long sleeves cover all]
 *
 * Renders at z=3.3 (above gloves, still under long sleeves).
 */

export interface BraceletProps {
  align?: { x: number; y: number; scale: number }
}

export interface BraceletItem {
  id: string
  name: string
  Component: React.FC<BraceletProps>
}

function makePngBracelet(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<BraceletProps> {
  return function PngBracelet({ align }: BraceletProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Add your bracelets here ──────────────────────────────────────────────────
export const Bracelet1 = makePngBracelet('/bracelet1.png', { x: 0, y: 0, scale: 1 })
export const Bracelet2 = makePngBracelet('/bracelet2.png', { x: 0, y: 0, scale: 1 })
export const Bracelet3 = makePngBracelet('/bracelet3.png', { x: 0, y: 0, scale: 1 })


export const BRACELET_ITEMS: BraceletItem[] = [
{ id: 'bracelet1', name: 'Gold Bracelet', Component: Bracelet1 },
 { id: 'bracelet2', name: 'Gold Watch', Component: Bracelet2 },
{ id: 'bracelet3', name: 'Silver Bracelet', Component: Bracelet3 },

]

export default BRACELET_ITEMS
