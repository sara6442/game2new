'use client'

export interface ClothProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

interface DressAlignment { x: number; y: number; scale: number }

/* Bakes a default alignment in — wrapAlign in StageCanvas overrides at runtime */
function makePngDress(src: string, defaultAlign: DressAlignment = { x: 0, y: 0, scale: 1 }): React.FC<ClothProps> {
  return function PngDress({ align }: ClothProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

export const Dress1: React.FC<ClothProps> = makePngDress('/dress1.png', { x:   0, y:    0, scale: 1.00 })
export const Dress2: React.FC<ClothProps> = makePngDress('/dress2.png', { x: -22, y:  -41, scale: 1.10 })
export const Dress3: React.FC<ClothProps> = makePngDress('/dress3.png', { x: -35, y: -157, scale: 1.20 })
export const Dress5: React.FC<ClothProps> = makePngDress('/dress5.png', { x:   8, y:    4, scale: 0.95 })

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
  { id: 'dress5', name: 'White Buttoned', Component: Dress5, sleeveLength: 'long'  },
]

export default DRESS_ITEMS
