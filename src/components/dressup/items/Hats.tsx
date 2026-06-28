'use client'

/**
 * Hats.tsx — Hats and headwear.
 *
 * Renders OVER the hair front (z=6.5).
 * Mutually exclusive with HairAccessories — selecting one removes the other.
 */

export interface HatProps {
  align?: { x: number; y: number; scale: number }
}
export interface HatItem {
  id: string
  name: string
  Component: React.FC<HatProps>
  defaultAlign: { x: number; y: number; scale: number }
}

function makePngHat(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<HatProps> {
  return function PngHat({ align }: HatProps) {
    // ✅ If align is passed from StageCanvas (saved alignment or align mode), use it
    // Otherwise fall back to the default baked-in alignment
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Hats with default alignments ────────────────────────────────────────────
export const Hat2 = makePngHat('/hat2.png', { x: -1, y: -89, scale: 1.14 })
export const Hat3 = makePngHat('/hat3.png', { x: -10, y: -89, scale: 1.14 })
export const Hat4 = makePngHat('/hat4.png', { x: -44, y: -222, scale: 1.25 })
export const Hat5 = makePngHat('/hat5.png', { x: -44, y: -64, scale: 1.25 })
export const Hat1 = makePngHat('/hat1.png', { x: 15, y: -86, scale: 1.07 })
export const Hat6 = makePngHat('/hat6.png', { x: -36, y: -97, scale: 1.2 })


export const HAT_ITEMS: HatItem[] = [
  { id: 'hat1', name: 'Hat 1', Component: Hat1, defaultAlign: { x: 15,  y: -86,  scale: 1.07 } },
  { id: 'hat2', name: 'Hat 2', Component: Hat2, defaultAlign: { x: -1,  y: -89,  scale: 1.14 } },
  { id: 'hat3', name: 'Hat 3', Component: Hat3, defaultAlign: { x: -10, y: -89,  scale: 1.14 } },
  { id: 'hat4', name: 'Hat 4', Component: Hat4, defaultAlign: { x: -44, y: -222, scale: 1.25 } },
  { id: 'hat5', name: 'Hat 5', Component: Hat5, defaultAlign: { x: -44, y: -64,  scale: 1.25 } },
  { id: 'hat6', name: 'Hat 6', Component: Hat6, defaultAlign: { x: -36, y: -97,  scale: 1.2  } },
]
export default HAT_ITEMS
