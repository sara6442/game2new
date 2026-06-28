'use client'

export interface CoatProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface CoatItem {
  id: string
  name: string
  Component: React.FC<CoatProps>
  type: 'coat' | 'jacket' | 'cardigan' | 'apron'
  defaultAlign: { x: number; y: number; scale: number }
}

function makePngCoat(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<CoatProps> {
  return function PngCoat({ align }: CoatProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

export const Coat1   = makePngCoat('/coat1.png')
export const Coat2   = makePngCoat('/coat2.png')
export const Coat3   = makePngCoat('/coat3.png')
export const Coat4   = makePngCoat('/coat4(appronL).png', { x: -32, y: -144, scale: 1.22 })  // ✅ Updated
export const Jacket1 = makePngCoat('/jacket1.png')
export const Jacket2 = makePngCoat('/jacket2.png', { x: 6, y: 9, scale: 1 })  // ✅ Updated
export const Jacket3 = makePngCoat('/jacket3.png', { x: -2, y: -8, scale: 1 })  // ✅ Updated
export const Jacket4 = makePngCoat('/jacket4.png', { x: 1, y: 5, scale: 1 })  // ✅ Updated
export const Jacket5 = makePngCoat('/jacket5.png', { x: -4, y: -10, scale: 1.02 })  // ✅ Updated

export const COAT_ITEMS: CoatItem[] = [
  { id: 'coat1',   name: 'Coat 1',   Component: Coat1,   type: 'coat',   defaultAlign: { x: 0,   y: 0,    scale: 1    } },
  { id: 'coat2',   name: 'Coat 2',   Component: Coat2,   type: 'coat',   defaultAlign: { x: 0,   y: 0,    scale: 1    } },
  { id: 'coat3',   name: 'Coat 3',   Component: Coat3,   type: 'coat',   defaultAlign: { x: 0,   y: 0,    scale: 1    } },
  { id: 'coat4',   name: 'Apron L',  Component: Coat4,   type: 'apron',  defaultAlign: { x: -32, y: -144, scale: 1.22 } },  // ✅ Updated
  { id: 'jacket1', name: 'Jacket 1', Component: Jacket1, type: 'jacket', defaultAlign: { x: 0,   y: 0,    scale: 1    } },
  { id: 'jacket2', name: 'Jacket 2', Component: Jacket2, type: 'jacket', defaultAlign: { x: 6,   y: 9,    scale: 1    } },  // ✅ Updated
  { id: 'jacket3', name: 'Jacket 3', Component: Jacket3, type: 'jacket', defaultAlign: { x: -2,  y: -8,   scale: 1    } },  // ✅ Updated
  { id: 'jacket4', name: 'Jacket 4', Component: Jacket4, type: 'jacket', defaultAlign: { x: 1,   y: 5,    scale: 1    } },  // ✅ Updated
  { id: 'jacket5', name: 'Jacket 5', Component: Jacket5, type: 'jacket', defaultAlign: { x: -4,  y: -10,  scale: 1.02 } },  // ✅ Updated
]

export default COAT_ITEMS
