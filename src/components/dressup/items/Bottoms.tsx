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

interface BottomAlignment { x: number; y: number; scale: number }

function makePngBottom(src: string, defaultAlign: BottomAlignment = { x: 0, y: 0, scale: 1 }): React.FC<ClothProps> {
  return function PngBottom({ align }: ClothProps) {
    const { x, y, scale } = align ?? defaultAlign
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
export const Bottom1: React.FC<ClothProps> = makePngBottom('/bottom1.png', { x: 2, y: 0, scale: 1 })
export const Bottom2: React.FC<ClothProps> = makePngBottom('/bottom2.png', { x: 0, y: -9, scale: 1 })
export const Bottom3: React.FC<ClothProps> = makePngBottom('/bottom3.png')
export const Bottom4: React.FC<ClothProps> = makePngBottom('/bottom4.png', { x: 21, y: 44, scale: 0.87 })
export const Bottom5: React.FC<ClothProps> = makePngBottom('/bottom5.png')
export const Bottom6: React.FC<ClothProps> = makePngBottom('/bottom6.png')
export const Bottom7: React.FC<ClothProps> = makePngBottom('/bottom7.png', { x: 0, y: -29, scale: 1 })
export const Bottom8: React.FC<ClothProps> = makePngBottom('/bottom8.png')
export const Bottom9: React.FC<ClothProps> = makePngBottom('/bottom9.png', { x: 33, y: 76, scale: 0.79 })
export const Bottom10: React.FC<ClothProps> = makePngBottom('/bottom10.png', { x: 36, y: 73, scale: 0.78 })
export const Bottom11: React.FC<ClothProps> = makePngBottom('/bottom11.png', { x: 26, y: 57, scale: 0.83 })
export const Bottom12: React.FC<ClothProps> = makePngBottom('/bottom12.png', { x: 41, y: 70, scale: 0.75 })
export const Bottom13: React.FC<ClothProps> = makePngBottom('/bottom13.png', { x: 40, y: 80, scale: 0.75 })
export const Bottom18: React.FC<ClothProps> = makePngBottom('/bottom18.png', { x: 34, y: 65, scale: 0.79 })
export const Bottom14: React.FC<ClothProps> = makePngBottom('/bottom14.png', { x: 35, y: 81, scale: 0.77 })
export const Bottom15: React.FC<ClothProps> = makePngBottom('/bottom15.png', { x: 52, y: 89, scale: 0.69 })
export const Bottom16: React.FC<ClothProps> = makePngBottom('/bottom16.png', { x: 35, y: 66, scale: 0.8 })
export const Bottom17: React.FC<ClothProps> = makePngBottom('/bottom17.png', { x: 38, y: 80, scale: 0.76 })
export const Bottom19: React.FC<ClothProps> = makePngBottom('/bottom19.png', { x: 41, y: 75, scale: 0.75 })
export const Bottom20: React.FC<ClothProps> = makePngBottom('/bottom20.png', { x: 33, y: 67, scale: 0.78 })
export const Bottom21: React.FC<ClothProps> = makePngBottom('/bottom21.png', { x: 8, y: 1, scale: 1 })

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface BottomItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
}

export const BOTTOM_ITEMS: BottomItem[] = [
  { id: 'bottom1', name: 'Black Plaid', Component: Bottom1 },
  { id: 'bottom2', name: 'Maroon Pleated', Component: Bottom2 },
  { id: 'bottom3', name: 'Pink Ruffled', Component: Bottom3 },
  { id: 'bottom4', name: 'Blue Striped', Component: Bottom4 },
  { id: 'bottom5', name: 'Light Blue', Component: Bottom5 },
  { id: 'bottom6', name: 'Beige Buttoned', Component: Bottom6 },
  { id: 'bottom7', name: 'Brown Pleated', Component: Bottom7 },
  { id: 'bottom8', name: 'White Bottom', Component: Bottom8 },
  { id: 'bottom9', name: 'Brown Striped', Component: Bottom9 },
  { id: 'bottom10', name: 'Jeans Buttoned', Component: Bottom10 },
  { id: 'bottom11', name: 'Pink A-line', Component: Bottom11 },
  { id: 'bottom12', name: 'Fluffy Blue', Component: Bottom12 },
  { id: 'bottom13', name: 'Brown Straight', Component: Bottom13 },
  { id: 'bottom18', name: 'Black Straight', Component: Bottom18 },
  { id: 'bottom14', name: 'Green Bottom', Component: Bottom14 },
  { id: 'bottom15', name: 'Fluffy Flowers', Component: Bottom15 },
  { id: 'bottom16', name: 'Red Ruffled', Component: Bottom16 },
  { id: 'bottom17', name: 'Red Striped', Component: Bottom17 },
  { id: 'bottom19', name: 'Asymmetrical Jeans', Component: Bottom19 },
  { id: 'bottom20', name: 'Brown Pleated2', Component: Bottom20 },
  { id: 'bottom21', name: 'Black Pleated', Component: Bottom21 },
]

export default BOTTOM_ITEMS
