'use client'

/**
 * Bottoms.tsx — Lower-body clothing.
 *
 * Each PNG is 325×742, rendered at body coordinates.
 *
 * NOTE: bottom7 (Brown Pleated) has its artwork starting at y=269,
 * but the body's waist is at y=240. So we shift the skirt up by 29
 * pixels so the waistband aligns with the body's waist.
 */

export interface ClothProps {
  color?: string
  trim?: string
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG clothing item at body coordinates             */
/* ------------------------------------------------------------------ */
function makePngBottom(src: string, yOffset = 0): React.FC<ClothProps> {
  return function PngBottom() {
    return (
      <g transform={yOffset !== 0 ? `translate(0, ${yOffset})` : undefined}>
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
/* Bottoms 1–7                                                        */
/* ------------------------------------------------------------------ */
export const Bottom1: React.FC<ClothProps> = makePngBottom('/bottom1.png')
export const Bottom2: React.FC<ClothProps> = makePngBottom('/bottom2.png')
export const Bottom3: React.FC<ClothProps> = makePngBottom('/bottom3.png')
export const Bottom4: React.FC<ClothProps> = makePngBottom('/bottom4.png')
export const Bottom5: React.FC<ClothProps> = makePngBottom('/bottom5.png')
export const Bottom6: React.FC<ClothProps> = makePngBottom('/bottom6.png')
export const Bottom7: React.FC<ClothProps> = makePngBottom('/bottom7.png', -29)  // brown pleated — shift up to align waist

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface BottomItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
}

export const BOTTOM_ITEMS: BottomItem[] = [
  { id: 'bottom1', name: 'Black Plaid',     Component: Bottom1 },
  { id: 'bottom2', name: 'Maroon Pleated',  Component: Bottom2 },
  { id: 'bottom3', name: 'Pink Ruffled',    Component: Bottom3 },
  { id: 'bottom4', name: 'Blue Striped',    Component: Bottom4 },
  { id: 'bottom5', name: 'Light Blue',      Component: Bottom5 },
  { id: 'bottom6', name: 'Beige Buttoned',  Component: Bottom6 },
  { id: 'bottom7', name: 'Brown Pleated',   Component: Bottom7 },
]

export default BOTTOM_ITEMS
