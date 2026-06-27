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
export const Hat1 = makePngHat('/hat1.png', { x: -15, y: -11, scale: 1.09 })
export const Hat6 = makePngHat('/hat6.png', { x: 8, y: -81, scale: 1.12 })

export const HAT_ITEMS: HatItem[] = [
  { id: 'hat2', name: 'White Cap', Component: Hat2 },
  { id: 'hat3', name: 'Black Hat', Component: Hat3 },
  { id: 'hat4', name: 'Rosy Hat', Component: Hat4 },
  { id: 'hat5', name: 'Black Rose Hat', Component: Hat5 },
  { id: 'hat1', name: 'Princess Chef', Component: Hat1 },
  { id: 'hat6', name: 'Graduation Princess', Component: Hat6 },
]

export default HAT_ITEMS
