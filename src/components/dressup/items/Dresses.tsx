'use client'

/**
 * Dresses.tsx — Full-body dresses.
 *
 * Each dress PNG is 325×742. The alignment values (x, y, scale) were
 * manually adjusted by the user using the alignment tool and baked
 * in here as defaults.
 *
 * dress1 was not adjusted — it renders at its natural position.
 *
 * Sleeve lengths are recorded for the coat logic (see useDressup.ts):
 *   - 'long'  → selecting a coat will switch to default top
 *   - 'short' → selecting a coat keeps the dress
 */

export interface ClothProps {
  color?: string
  trim?: string
}

interface DressAlignment {
  x: number
  y: number
  scale: number
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG dress with alignment transform                 */
/* ------------------------------------------------------------------ */
function makePngDress(src: string, align: DressAlignment): React.FC<ClothProps> {
  const { x, y, scale } = align
  return function PngDress() {
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image
          href={src}
          x={0}
          y={0}
          width={325}
          height={742}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Dresses — with user-adjusted alignment values                      */
/* ------------------------------------------------------------------ */

// dress1 (Tie-Dye): natural position, no adjustment
export const Dress1: React.FC<ClothProps> = makePngDress('/dress1.png', { x:   0, y:    0, scale: 1.00 })

// dress2 (Green A-Line): user-aligned
export const Dress2: React.FC<ClothProps> = makePngDress('/dress2.png', { x: -22, y:  -41, scale: 1.10 })

// dress3 (Blue Puff): user-aligned
export const Dress3: React.FC<ClothProps> = makePngDress('/dress3.png', { x: -35, y: -157, scale: 1.20 })

// dress4 (Cream Floral): REMOVED by user request

// dress5 (White Buttoned): user-aligned
export const Dress5: React.FC<ClothProps> = makePngDress('/dress5.png', { x:   8, y:    4, scale: 0.95 })

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface DressItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const DRESS_ITEMS: DressItem[] = [
  { id: 'dress1', name: 'Tie-Dye',        Component: Dress1, sleeveLength: 'short' },
  { id: 'dress2', name: 'Green A-Line',   Component: Dress2, sleeveLength: 'short' },
  { id: 'dress3', name: 'Blue Puff',      Component: Dress3, sleeveLength: 'short' },
  { id: 'dress5', name: 'White Buttoned', Component: Dress5, sleeveLength: 'long' },
]

export default DRESS_ITEMS
