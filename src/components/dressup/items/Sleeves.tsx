'use client'

/**
 * Sleeves.tsx — Detachable sleeves, arm warmers, etc.
 *
 * Rules:
 * - Only worn with short-sleeve tops/dresses
 * - Mutually exclusive with coats and jackets
 * - Renders at z=4.5 (between top/dress and coat)
 */

export interface SleeveProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface SleeveItem {
  id: string
  name: string
  Component: React.FC<SleeveProps>
  defaultAlign: { x: number; y: number; scale: number }
}

interface SleeveAlignment { x: number; y: number; scale: number }

function makePngSleeve(src: string, defaultAlign: SleeveAlignment = { x: 0, y: 0, scale: 1 }): React.FC<SleeveProps> {
  return function PngSleeve({ align }: SleeveProps) {
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
          onError={(e) => console.error(`Failed to load sleeve: ${src}`, e)}
        />
      </g>
    )
  }
}

// ── Sleeves with custom alignments ──────────────────────────────────────────
export const Sleeve1: React.FC<SleeveProps> = makePngSleeve('/sleeves1.png', { x: 0, y: 0, scale: 1 })

export const SLEEVE_ITEMS: SleeveItem[] = [
  { id: 'sleeve1', name: 'Black Sleeves', Component: Sleeve1, defaultAlign: { x: 0, y: 0, scale: 1 } },
]

export default SLEEVE_ITEMS
