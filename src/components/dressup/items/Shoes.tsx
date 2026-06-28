'use client'

export interface ShoeProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface ShoeItem {
  id: string
  name: string
  Component: React.FC<ShoeProps>
  defaultAlign: { x: number; y: number; scale: number }
}

function makePngShoe(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<ShoeProps> {
  return function PngShoe({ align }: ShoeProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

export const Shoe1 = makePngShoe('/shoe1.png')
export const Shoe2 = makePngShoe('/shoe2.png')
export const Shoe3 = makePngShoe('/shoe3.png')
export const Shoe4 = makePngShoe('/shoe4.png')
export const Shoe5 = makePngShoe('/shoe5.png')
export const Shoe6 = makePngShoe('/shoe6.png')
export const Shoe7 = makePngShoe('/shoe7.png')
export const Shoe8 = makePngShoe('/shoe8.png')

export const SHOE_ITEMS: ShoeItem[] = [
  { id: 'shoe1', name: 'Shoe 1', Component: Shoe1, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe2', name: 'Shoe 2', Component: Shoe2, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe3', name: 'Shoe 3', Component: Shoe3, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe4', name: 'Shoe 4', Component: Shoe4, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe5', name: 'Shoe 5', Component: Shoe5, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe6', name: 'Shoe 6', Component: Shoe6, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe7', name: 'Shoe 7', Component: Shoe7, defaultAlign: { x: 0, y: 0, scale: 1 } },
  { id: 'shoe8', name: 'Shoe 8', Component: Shoe8, defaultAlign: { x: 0, y: 0, scale: 1 } },
]

export default SHOE_ITEMS
