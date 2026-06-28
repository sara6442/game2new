'use client'

import React from 'react'
export interface ClothProps {
  color?: string
  trim?: string
  align?: { x: number; y: number; scale: number }
}

interface DressAlignment { x: number; y: number; scale: number }

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

export const Dress1:  React.FC<ClothProps> = makePngDress('/dress1.png',  { x: 31,   y: 54,   scale: 0.8  })
export const Dress2:  React.FC<ClothProps> = makePngDress('/dress2.png',  { x: -22,  y: -41,  scale: 1.10 })
export const Dress3:  React.FC<ClothProps> = makePngDress('/dress3.png',  { x: -48,  y: 4,    scale: 1.28 })  // ✅ Updated
export const Dress4:  React.FC<ClothProps> = makePngDress('/dress4.png',  { x: -133, y: -334, scale: 1.74 })
export const Dress5:  React.FC<ClothProps> = makePngDress('/dress5.png',  { x: 8,    y: 4,    scale: 0.95 })
export const Dress6:  React.FC<ClothProps> = makePngDress('/dress6.png',  { x: -41,  y: -147, scale: 1.25 })
export const Dress7:  React.FC<ClothProps> = makePngDress('/dress7.png',  { x: 0,    y: 0,    scale: 1.00 })
export const Dress8:  React.FC<ClothProps> = makePngDress('/dress8.png',  { x: -10,  y: -37,  scale: 1.25 })
export const Dress9:  React.FC<ClothProps> = makePngDress('/dress9.png',  { x: 0,    y: 0,    scale: 1    })
export const Dress10: React.FC<ClothProps> = makePngDress('/dress10.png', { x: 4,    y: 37,   scale: 0.99 })
export const Dress11: React.FC<ClothProps> = makePngDress('/dress11.png', { x: -141, y: -45,  scale: 1.87 })
export const Dress12: React.FC<ClothProps> = makePngDress('/dress12.png', { x: -7,   y: 55,   scale: 1.04 })
export const Dress13: React.FC<ClothProps> = makePngDress('/dress13.png', { x: -68,  y: -159, scale: 1.39 })  // ✅ Updated
export const Dress14: React.FC<ClothProps> = makePngDress('/dress14.png', { x: -102, y: -154, scale: 1.63 })  // ✅ Updated
export const Dress15: React.FC<ClothProps> = makePngDress('/dress15.png', { x: 17,   y: 43,   scale: 0.89 })
export const Dress16: React.FC<ClothProps> = makePngDress('/dress16.png', { x: -7,   y: 34,   scale: 1.04 })
export const Dress17: React.FC<ClothProps> = makePngDress('/dress17.png', { x: 7,    y: 6,    scale: 0.96 })  // ✅ Updated
export const Dress18: React.FC<ClothProps> = makePngDress('/dress18.png', { x: 31,   y: 48,   scale: 0.8  })
export const Dress19: React.FC<ClothProps> = makePngDress('/dress19M.png',{ x: -79,  y: -176, scale: 1.5  })

export interface DressItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short' | 'none'
  defaultAlign: { x: number; y: number; scale: number }
}

export const DRESS_ITEMS: DressItem[] = [
  { id: 'dress1',  name: 'Dress 1',  Component: Dress1,  sleeveLength: 'long',  defaultAlign: { x: 31,   y: 54,   scale: 0.8  } },
  { id: 'dress2',  name: 'Dress 2',  Component: Dress2,  sleeveLength: 'long',  defaultAlign: { x: -22,  y: -41,  scale: 1.10 } },
  { id: 'dress3',  name: 'Dress 3',  Component: Dress3,  sleeveLength: 'long',  defaultAlign: { x: -48,  y: 4,    scale: 1.28 } },  // ✅ Updated
  { id: 'dress4',  name: 'Dress 4',  Component: Dress4,  sleeveLength: 'long',  defaultAlign: { x: -133, y: -334, scale: 1.74 } },
  { id: 'dress5',  name: 'Dress 5',  Component: Dress5,  sleeveLength: 'short', defaultAlign: { x: 8,    y: 4,    scale: 0.95 } },
  { id: 'dress6',  name: 'Dress 6',  Component: Dress6,  sleeveLength: 'long',  defaultAlign: { x: -41,  y: -147, scale: 1.25 } },
  { id: 'dress7',  name: 'Dress 7',  Component: Dress7,  sleeveLength: 'short', defaultAlign: { x: 0,    y: 0,    scale: 1.00 } },
  { id: 'dress8',  name: 'Dress 8',  Component: Dress8,  sleeveLength: 'long',  defaultAlign: { x: -10,  y: -37,  scale: 1.25 } },
  { id: 'dress9',  name: 'Dress 9',  Component: Dress9,  sleeveLength: 'none',  defaultAlign: { x: 0,    y: 0,    scale: 1    } },
  { id: 'dress10', name: 'Dress 10', Component: Dress10, sleeveLength: 'long',  defaultAlign: { x: 4,    y: 37,   scale: 0.99 } },
  { id: 'dress11', name: 'Dress 11', Component: Dress11, sleeveLength: 'long',  defaultAlign: { x: -141, y: -45,  scale: 1.87 } },
  { id: 'dress12', name: 'Dress 12', Component: Dress12, sleeveLength: 'none',  defaultAlign: { x: -7,   y: 55,   scale: 1.04 } },
  { id: 'dress13', name: 'Dress 13', Component: Dress13, sleeveLength: 'long',  defaultAlign: { x: -68,  y: -159, scale: 1.39 } },  // ✅ Updated
  { id: 'dress14', name: 'Dress 14', Component: Dress14, sleeveLength: 'none',  defaultAlign: { x: -102, y: -154, scale: 1.63 } },  // ✅ Updated
  { id: 'dress15', name: 'Dress 15', Component: Dress15, sleeveLength: 'short', defaultAlign: { x: 17,   y: 43,   scale: 0.89 } },
  { id: 'dress16', name: 'Dress 16', Component: Dress16, sleeveLength: 'long',  defaultAlign: { x: -7,   y: 34,   scale: 1.04 } },
  { id: 'dress17', name: 'Dress 17', Component: Dress17, sleeveLength: 'none',  defaultAlign: { x: 7,    y: 6,    scale: 0.96 } },  // ✅ Updated
  { id: 'dress18', name: 'Dress 18', Component: Dress18, sleeveLength: 'long',  defaultAlign: { x: 31,   y: 48,   scale: 0.8  } },
  { id: 'dress19', name: 'Dress 19', Component: Dress19, sleeveLength: 'long',  defaultAlign: { x: -79,  y: -176, scale: 1.5  } },
]

export default DRESS_ITEMS
