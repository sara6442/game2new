'use client'

/**
 * HandDecorations.tsx — Nail polish, henna, hand jewelry, etc.
 *
 * Layer order on hands (bottom → top):
 *   HandDecorations → Gloves → Bracelets → [long sleeves cover all]
 *
 * Renders at z=3.1 (lowest hand layer, directly on skin).
 */

export interface HandDecoProps {
  align?: { x: number; y: number; scale: number }
}

export interface HandDecoItem {
  id: string
  name: string
  Component: React.FC<HandDecoProps>
}

function makePngHandDeco(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<HandDecoProps> {
  return function PngHandDeco({ align }: HandDecoProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Add your hand decorations here ───────────────────────────────────────────
// Example:
export const HandDeco1 = makePngHandDeco('/dec1L.png', { x: 0, y: 0, scale: 1 })
export const HandDeco2 = makePngHandDeco('/dec2.png', { x: 0, y: 0, scale: 1 })
export const HandDeco3 = makePngHandDeco('/dec3.png', { x: 0, y: 0, scale: 1 })
export const HandDeco4 = makePngHandDeco('/nails1.png', { x: 0, y: 0, scale: 1 })
export const HandDeco5 = makePngHandDeco('/nails2.png', { x: 0, y: 0, scale: 1 })
export const HandDeco6 = makePngHandDeco('/nails3.png', { x: 0, y: 0, scale: 1 })
export const HandDeco7 = makePngHandDeco('/nails4.png', { x: 0, y: 0, scale: 1 })
export const HandDeco8 = makePngHandDeco('/nails5.png', { x: 0, y: 0, scale: 1 })
export const HandDeco9 = makePngHandDeco('/nails6.png', { x: 0, y: 0, scale: 1 })



export const HAND_DECO_ITEMS: HandDecoItem[] = [
{ id: 'handdeco1', name: 'Rolling Pin',   Component: HandDeco1 },
{ id: 'handdeco2', name: 'Henna Design', Component: HandDeco2 },
  { id: 'handdeco2', name: 'Henna Design2', Component: HandDeco2 },
{ id: 'handdeco2', name: 'Red Nails', Component: HandDeco2 },
{ id: 'handdeco2', name: 'Pink Nails', Component: HandDeco2 },
{ id: 'handdeco2', name: 'Green Nails', Component: HandDeco2 },
{ id: 'handdeco2', name: 'Navy Nails', Component: HandDeco2 },
{ id: 'handdeco2', name: 'Black Nails', Component: HandDeco2 },
{ id: 'handdeco2', name: 'French Nails', Component: HandDeco2 },
]

export default HAND_DECO_ITEMS
