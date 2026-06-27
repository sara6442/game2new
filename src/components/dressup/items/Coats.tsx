'use client'

/**
 * Coats.tsx — Outerwear (jackets, coats, cardigans, aprons).
 *
 * Rules:
 * - Coats render in front of tops/dresses (z=5.5)
 * - dress19 goes OVER coats
 * - Coats can be worn with any top/dress
 * - If top/dress has long sleeves, it gets replaced with default short-sleeve
 */

export interface CoatProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface CoatItem {
  id: string
  name: string
  Component: React.FC<CoatProps>
  type: 'jacket' | 'coat' | 'cardigan' | 'apron'
}

interface CoatAlignment { x: number; y: number; scale: number }

function makePngCoat(src: string, defaultAlign: CoatAlignment = { x: 0, y: 0, scale: 1 }): React.FC<CoatProps> {
  return function PngCoat({ align }: CoatProps) {
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
          onError={(e) => console.error(`Failed to load coat: ${src}`, e)}
        />
      </g>
    )
  }
}

// ── Coats with custom alignments ─────────────────────────────────────────────
export const Coat1: React.FC<CoatProps> = makePngCoat('/coat1.png', { x: 0, y: 0, scale: 1 })
export const Coat2: React.FC<CoatProps> = makePngCoat('/coat2.png', { x: 0, y: 0, scale: 1 })
export const Coat3: React.FC<CoatProps> = makePngCoat('/coat3.png', { x: 0, y: 0, scale: 1 })
export const Coat4: React.FC<CoatProps> = makePngCoat('/coat4(appronL).png', { x: 0, y: 0, scale: 1 })
export const Jacket1: React.FC<CoatProps> = makePngCoat('/jacker1.png', { x: 0, y: 0, scale: 1 })
export const Jacket2: React.FC<CoatProps> = makePngCoat('/jacket2.png', { x: 0, y: 0, scale: 1 })
export const Jacket3: React.FC<CoatProps> = makePngCoat('/jacket3.png', { x: 0, y: 0, scale: 1 })
export const Jacket4: React.FC<CoatProps> = makePngCoat('/jacket4.png', { x: 0, y: 0, scale: 1 })
export const Jacket5: React.FC<CoatProps> = makePngCoat('/jacket5.png', { x: 0, y: 0, scale: 1 })


export const COAT_ITEMS: CoatItem[] = [
  { id: 'coat1', name: 'Beige Coat', Component: Coat1, type: 'coat' },
  { id: 'coat2', name: 'Black coat', Component: Coat2, type: 'coat' },
  { id: 'coat3', name: 'Chess Coat', Component: Coat3, type: 'coat' },
  { id: 'coat4', name: 'Princess Apron', Component: Coat4, type: 'apron' },
  { id: 'jacket1', name: 'Furry Jacket', Component: Jacket1, type: 'jacket' },
  { id: 'jacket2', name: 'Beige Jacket', Component: Jacket2, type: 'jacket' },
  { id: 'jacket3', name: 'Brown Jacket', Component: Jacket3, type: 'jacket' },
  { id: 'jacket4', name: 'Leather Jacket', Component: Jacket4, type: 'jacket' },
   { id: 'jacket5', name: 'Gray Jacket', Component: Jacket5, type: 'jacket' },



]

export default COAT_ITEMS
