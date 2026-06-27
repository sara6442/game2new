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

export const Dress1: React.FC<ClothProps> = makePngDress('/dress1.png', { x: 31, y: 54, scale: 0.8 })
export const Dress2: React.FC<ClothProps> = makePngDress('/dress2.png', { x: -22, y: -41, scale: 1.10 })
export const Dress3: React.FC<ClothProps> = makePngDress('/dress3.png', { x: -49, y: -273, scale: 1.27 })
export const Dress4: React.FC<ClothProps> = makePngDress('/dress4.png', { x: -133, y: -334, scale: 1.74 })
export const Dress5: React.FC<ClothProps> = makePngDress('/dress5.png', { x: 8, y: 4, scale: 0.95 })
export const Dress6: React.FC<ClothProps> = makePngDress('/dress6.png', { x: -41, y: -147, scale: 1.25 })
export const Dress7: React.FC<ClothProps> = makePngDress('/dress7.png', { x: 0, y: 0, scale: 1.00 })
export const Dress8: React.FC<ClothProps> = makePngDress('/dress8.png', { x: -10, y: -37, scale: 1.25 })
export const Dress9: React.FC<ClothProps> = makePngDress('/dress9.png', { x: 0, y: 0, scale: 1 })
export const Dress10: React.FC<ClothProps> = makePngDress('/dress10.png', { x: 4, y: 37, scale: 0.99 })
export const Dress11: React.FC<ClothProps> = makePngDress('/dress11.png', { x: -141, y: -45, scale: 1.87 })
export const Dress12: React.FC<ClothProps> = makePngDress('/dress12.png', { x: -7, y: 55, scale: 1.04 })
export const Dress13: React.FC<ClothProps> = makePngDress('/dress13.png', { x: -4, y: -151, scale: 1 })
export const Dress14: React.FC<ClothProps> = makePngDress('/dress14.png', { x: -4, y: -133, scale: 1 })
export const Dress15: React.FC<ClothProps> = makePngDress('/dress15.png', { x: 17, y: 43, scale: 0.89 })
export const Dress16: React.FC<ClothProps> = makePngDress('/dress16.png', { x: -7, y: 34, scale: 1.04 })
export const Dress17: React.FC<ClothProps> = makePngDress('/dress17.png', { x: 2, y: -15, scale: 1 })
export const Dress18: React.FC<ClothProps> = makePngDress('/dress18.png', { x: 31, y: 48, scale: 0.8 })
export const Dress19: React.FC<ClothProps> = makePngDress('/dress1.png', { x: 31, y: 48, scale: 0.8 })


export interface DressItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const DRESS_ITEMS: DressItem[] = [
  { id: 'dress1', name: 'Tie-Dye', Component: Dress1, sleeveLength: 'short' },
  { id: 'dress2', name: 'Green A-Line', Component: Dress2, sleeveLength: 'short' },
  { id: 'dress3', name: 'Blue Puff', Component: Dress3, sleeveLength: 'short' },
  { id: 'dress4', name: 'Floral Dress', Component: Dress4, sleeveLength: 'short' },
  { id: 'dress5', name: 'White Buttoned', Component: Dress5, sleeveLength: 'long' },
  { id: 'dress6', name: 'Gothic Black', Component: Dress6, sleeveLength: 'long' },
  { id: 'dress7', name: 'Red A-line', Component: Dress7, sleeveLength: 'short' },
  { id: 'dress8', name: 'Long Old', Component: Dress8, sleeveLength: 'short' },
  { id: 'dress9', name: 'Beige Dress', Component: Dress9, sleeveLength: 'short' },
  { id: 'dress10', name: 'Jeans Dress', Component: Dress10, sleeveLength: 'short' },
  { id: 'dress11', name: 'Green Elegant', Component: Dress11, sleeveLength: 'short' },
  { id: 'dress12', name: 'White Bride', Component: Dress12, sleeveLength: 'short' },
  { id: 'dress13', name: 'Blue Ice', Component: Dress13, sleeveLength: 'short' },
  { id: 'dress14', name: 'Pink Princess', Component: Dress14, sleeveLength: 'short' },
  { id: 'dress15', name: 'White Patterned', Component: Dress15, sleeveLength: 'long' },
  { id: 'dress16', name: 'Green Victorian', Component: Dress16, sleeveLength: 'long' },
  { id: 'dress17', name: 'White Dress', Component: Dress17, sleeveLength: 'short' },
  { id: 'dress18', name: 'Yellow Floral', Component: Dress18, sleeveLength: 'short' },
  { id: 'dress18', name: 'Graduated Princess', Component: Dress18, sleeveLength: 'short' },
]

export default DRESS_ITEMS
