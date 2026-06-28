'use client'

import React from 'react'
export interface ClothProps {
  color?: string
  trim?: string
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

export const Bottom1:  React.FC<ClothProps> = makePngBottom('/bottom1.png',  { x: 2,  y: 0,   scale: 1    })
export const Bottom2:  React.FC<ClothProps> = makePngBottom('/bottom2.png',  { x: 16, y: 17,  scale: 0.9  })
export const Bottom3:  React.FC<ClothProps> = makePngBottom('/bottom3.png')
export const Bottom4:  React.FC<ClothProps> = makePngBottom('/bottom4.png',  { x: 15, y: 19,  scale: 0.91 })
export const Bottom5:  React.FC<ClothProps> = makePngBottom('/bottom5.png')
export const Bottom6:  React.FC<ClothProps> = makePngBottom('/bottom6.png')
export const Bottom7:  React.FC<ClothProps> = makePngBottom('/bottom7.png',  { x: 2,  y: -36, scale: 1    })
export const Bottom8:  React.FC<ClothProps> = makePngBottom('/bottom8.png')
export const Bottom9:  React.FC<ClothProps> = makePngBottom('/bottom9.png',  { x: 30, y: 55,  scale: 0.8  })
export const Bottom10: React.FC<ClothProps> = makePngBottom('/bottom10.png', { x: 36, y: 73,  scale: 0.78 })
export const Bottom11: React.FC<ClothProps> = makePngBottom('/bottom11.png', { x: 26, y: 57,  scale: 0.83 })
export const Bottom12: React.FC<ClothProps> = makePngBottom('/bottom12.png', { x: 41, y: 70,  scale: 0.75 })
export const Bottom13: React.FC<ClothProps> = makePngBottom('/bottom13.png', { x: 40, y: 77,  scale: 0.75 })
export const Bottom14: React.FC<ClothProps> = makePngBottom('/bottom14.png', { x: 35, y: 81,  scale: 0.77 })
export const Bottom15: React.FC<ClothProps> = makePngBottom('/bottom15.png', { x: 39, y: 67,  scale: 0.78 })
export const Bottom16: React.FC<ClothProps> = makePngBottom('/bottom16.png', { x: 35, y: 66,  scale: 0.8  })
export const Bottom17: React.FC<ClothProps> = makePngBottom('/bottom17.png', { x: 34, y: 77,  scale: 0.79 })
export const Bottom18: React.FC<ClothProps> = makePngBottom('/bottom18.png', { x: 34, y: 65,  scale: 0.79 })
export const Bottom19: React.FC<ClothProps> = makePngBottom('/bottom19.png', { x: 43, y: 74,  scale: 0.75 })
export const Bottom20: React.FC<ClothProps> = makePngBottom('/bottom20.png', { x: 29, y: 68,  scale: 0.8  })
export const Bottom21: React.FC<ClothProps> = makePngBottom('/bottom21.png', { x: 8,  y: 1,   scale: 1    })

export interface BottomItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  defaultAlign: { x: number; y: number; scale: number }
}

export const BOTTOM_ITEMS: BottomItem[] = [
  { id: 'bottom1',  name: 'Bottom 1',  Component: Bottom1,  defaultAlign: { x: 2,  y: 0,   scale: 1    } },
  { id: 'bottom2',  name: 'Bottom 2',  Component: Bottom2,  defaultAlign: { x: 16, y: 17,  scale: 0.9  } },
  { id: 'bottom3',  name: 'Bottom 3',  Component: Bottom3,  defaultAlign: { x: 0,  y: 0,   scale: 1    } },
  { id: 'bottom4',  name: 'Bottom 4',  Component: Bottom4,  defaultAlign: { x: 15, y: 19,  scale: 0.91 } },
  { id: 'bottom5',  name: 'Bottom 5',  Component: Bottom5,  defaultAlign: { x: 0,  y: 0,   scale: 1    } },
  { id: 'bottom6',  name: 'Bottom 6',  Component: Bottom6,  defaultAlign: { x: 0,  y: 0,   scale: 1    } },
  { id: 'bottom7',  name: 'Bottom 7',  Component: Bottom7,  defaultAlign: { x: 2,  y: -36, scale: 1    } },
  { id: 'bottom8',  name: 'Bottom 8',  Component: Bottom8,  defaultAlign: { x: 0,  y: 0,   scale: 1    } },
  { id: 'bottom9',  name: 'Bottom 9',  Component: Bottom9,  defaultAlign: { x: 30, y: 55,  scale: 0.8  } },
  { id: 'bottom10', name: 'Bottom 10', Component: Bottom10, defaultAlign: { x: 36, y: 73,  scale: 0.78 } },
  { id: 'bottom11', name: 'Bottom 11', Component: Bottom11, defaultAlign: { x: 26, y: 57,  scale: 0.83 } },
  { id: 'bottom12', name: 'Bottom 12', Component: Bottom12, defaultAlign: { x: 41, y: 70,  scale: 0.75 } },
  { id: 'bottom13', name: 'Bottom 13', Component: Bottom13, defaultAlign: { x: 40, y: 77,  scale: 0.75 } },
  { id: 'bottom14', name: 'Bottom 14', Component: Bottom14, defaultAlign: { x: 35, y: 81,  scale: 0.77 } },
  { id: 'bottom15', name: 'Bottom 15', Component: Bottom15, defaultAlign: { x: 39, y: 67,  scale: 0.78 } },
  { id: 'bottom16', name: 'Bottom 16', Component: Bottom16, defaultAlign: { x: 35, y: 66,  scale: 0.8  } },
  { id: 'bottom17', name: 'Bottom 17', Component: Bottom17, defaultAlign: { x: 34, y: 77,  scale: 0.79 } },
  { id: 'bottom18', name: 'Bottom 18', Component: Bottom18, defaultAlign: { x: 34, y: 65,  scale: 0.79 } },
  { id: 'bottom19', name: 'Bottom 19', Component: Bottom19, defaultAlign: { x: 43, y: 74,  scale: 0.75 } },
  { id: 'bottom20', name: 'Bottom 20', Component: Bottom20, defaultAlign: { x: 29, y: 68,  scale: 0.8  } },
  { id: 'bottom21', name: 'Bottom 21', Component: Bottom21, defaultAlign: { x: 8,  y: 1,   scale: 1    } },
]

export default BOTTOM_ITEMS
