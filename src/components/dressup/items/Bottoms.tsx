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
  align?: { x: number; y: number; scale: number }
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG clothing item at body coordinates             */
/* ------------------------------------------------------------------ */
function makePngBottom(src: string, defaultY = 0): React.FC<ClothProps> {
  return function PngBottom({ align }: ClothProps) {
    const x = align?.x ?? 0
    const y = align?.y ?? defaultY
    const scale = align?.scale ?? 1
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Bottoms 1–21                                                        */
/* ------------------------------------------------------------------ */
export const Bottom1: React.FC<ClothProps> = makePngBottom('/bottom1.png')
export const Bottom2: React.FC<ClothProps> = makePngBottom('/bottom2.png')
export const Bottom3: React.FC<ClothProps> = makePngBottom('/bottom3.png')
export const Bottom4: React.FC<ClothProps> = makePngBottom('/bottom4.png')
export const Bottom5: React.FC<ClothProps> = makePngBottom('/bottom5.png')
export const Bottom6: React.FC<ClothProps> = makePngBottom('/bottom6.png')
export const Bottom7: React.FC<ClothProps> = makePngBottom('/bottom7.png', -29)
export const Bottom8: React.FC<ClothProps> = makePngBottom('/bottom8.png')
export const Bottom9: React.FC<ClothProps> = makePngBottom('/bottom9.png')
export const Bottom10: React.FC<ClothProps> = makePngBottom('/bottom10.png')
export const Bottom11: React.FC<ClothProps> = makePngBottom('/bottom11.png')
export const Bottom12: React.FC<ClothProps> = makePngBottom('/bottom12.png')
export const Bottom13: React.FC<ClothProps> = makePngBottom('/bottom13.png')
export const Bottom14: React.FC<ClothProps> = makePngBottom('/bottom14.png')
export const Bottom15: React.FC<ClothProps> = makePngBottom('/bottom15.png')
export const Bottom16: React.FC<ClothProps> = makePngBottom('/bottom16.png')
export const Bottom17: React.FC<ClothProps> = makePngBottom('/bottom17.png')
export const Bottom18: React.FC<ClothProps> = makePngBottom('/bottom18.png')
export const Bottom19: React.FC<ClothProps> = makePngBottom('/bottom19.png')
export const Bottom20: React.FC<ClothProps> = makePngBottom('/bottom20.png')
export const Bottom21: React.FC<ClothProps> = makePngBottom('/bottom21.png')

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
  { id: 'bottom8', name: 'Black Plaid',     Component: Bottom8 },
  { id: 'bottom9', name: 'Maroon Pleated',  Component: Bottom9 },
  { id: 'bottom10', name: 'Pink Ruffled',    Component: Bottom10 },
  { id: 'bottom11', name: 'Blue Striped',    Component: Bottom11 },
  { id: 'bottom12', name: 'Light Blue',      Component: Bottom12 },
  { id: 'bottom13', name: 'Beige Buttoned',  Component: Bottom13 },
  { id: 'bottom14', name: 'Brown Pleated',   Component: Bottom14 },
  { id: 'bottom15', name: 'Black Plaid',     Component: Bottom15 },
  { id: 'bottom16', name: 'Maroon Pleated',  Component: Bottom16 },
  { id: 'bottom17', name: 'Pink Ruffled',    Component: Bottom17 },
  { id: 'bottom18', name: 'Blue Striped',    Component: Bottom18 },
  { id: 'bottom19', name: 'Light Blue',      Component: Bottom19 },
  { id: 'bottom20', name: 'Beige Buttoned',  Component: Bottom20 },
  { id: 'bottom21', name: 'Brown Pleated',   Component: Bottom21 },
]

export default BOTTOM_ITEMS
