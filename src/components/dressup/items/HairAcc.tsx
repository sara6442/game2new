'use client'

/**
 * HairAccessories.tsx — Hair clips, pins, ribbons, etc.
 *
 * Renders OVER the hair front (z=6.5).
 * Mutually exclusive with Hats — selecting one removes the other.
 */

export interface HairAccProps {
  align?: { x: number; y: number; scale: number }
}

export interface HairAccItem {
  id: string
  name: string
  Component: React.FC<HairAccProps>
  defaultAlign: { x: number; y: number; scale: number }
}

function makePngHairAcc(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<HairAccProps> {
  return function PngHairAcc({ align }: HairAccProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

export const HairAcc1 = makePngHairAcc('/hairacc1.png', { x: 3,   y: -73, scale: 1   })
export const HairAcc2 = makePngHairAcc('/hairacc2.png', { x: -4,  y: -81, scale: 1   })
export const HairAcc3 = makePngHairAcc('/hairacc3.png', { x: 5,   y: -45, scale: 1   })
export const HairAcc4 = makePngHairAcc('/hairacc4.png', { x: 0,   y: -40, scale: 1   })
export const HairAcc5 = makePngHairAcc('/hairacc5.png', { x: -20, y: -36, scale: 1.1 })

export const HAIR_ACC_ITEMS: HairAccItem[] = [
  { id: 'hairacc1', name: 'Pink Ribbon',    Component: HairAcc1, defaultAlign: { x: 3,   y: -73, scale: 1   } },
  { id: 'hairacc2', name: 'Flower Crown',   Component: HairAcc2, defaultAlign: { x: -4,  y: -81, scale: 1   } },
  { id: 'hairacc3', name: 'Rose Clip',      Component: HairAcc3, defaultAlign: { x: 5,   y: -45, scale: 1   } },
  { id: 'hairacc4', name: 'Pearl Ribbon',   Component: HairAcc4, defaultAlign: { x: 0,   y: -40, scale: 1   } },
  { id: 'hairacc5', name: 'Princess Crown', Component: HairAcc5, defaultAlign: { x: -20, y: -36, scale: 1.1 } },
]

export default HAIR_ACC_ITEMS
