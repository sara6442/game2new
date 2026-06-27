'use client'

import React from 'react'

export interface ClothProps {
  color?: string
  trim?: string
  align?: { x: number; y: number; scale: number }
}

interface TopAlignment { x: number; y: number; scale: number }

function makePngTop(src: string, defaultAlign: TopAlignment = { x: 0, y: 0, scale: 1 }): React.FC<ClothProps> {
  return function PngTop({ align }: ClothProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image
          href={src}
          x={0}
          y={0}
          width={325}
          height={742}
          preserveAspectRatio="xMidYMid meet"
          onError={(e) => console.error(`Failed to load: ${src}`, e)}
        />
      </g>
    )
  }
}

export const Top1: React.FC<ClothProps> = makePngTop('/top1.png')
export const Top2: React.FC<ClothProps> = makePngTop('/top2.png')
export const Top3: React.FC<ClothProps> = makePngTop('/top3.png')
export const Top4: React.FC<ClothProps> = makePngTop('/top4.png')
export const Top5: React.FC<ClothProps> = makePngTop('/top5.png')
export const Top6: React.FC<ClothProps> = makePngTop('/top6.png')
export const Top7: React.FC<ClothProps> = makePngTop('/top7.png')
export const Top9: React.FC<ClothProps> = makePngTop('/top9.png')

// Tops with custom alignment
export const Top10: React.FC<ClothProps> = makePngTop('/top10.png', { x: -45, y: 8, scale: 1.25 })
export const Top11: React.FC<ClothProps> = makePngTop('/top11.png', { x: 21, y: 30, scale: 0.86 })
export const Top12: React.FC<ClothProps> = makePngTop('/top12.png', { x: -5, y: 12, scale: 1.06 })
export const Top13: React.FC<ClothProps> = makePngTop('/top13.png', { x: 24, y: 50, scale: 0.85 })
export const Top14: React.FC<ClothProps> = makePngTop('/top14.png', { x: 29, y: 37, scale: 0.83 })
export const Top15: React.FC<ClothProps> = makePngTop('/top15.png', { x: -28, y: -51, scale: 1.17 })
export const Top16: React.FC<ClothProps> = makePngTop('/top16.png', { x: 0, y: 36, scale: 1 })
export const Top17: React.FC<ClothProps> = makePngTop('/top17.png', { x: 17, y: 49, scale: 0.89 })
export const Top18: React.FC<ClothProps> = makePngTop('/top18.png', { x: 40, y: 59, scale: 0.75 })
export const Top19: React.FC<ClothProps> = makePngTop('/top19.png', { x: 37, y: 61, scale: 0.77 })
export const Top20: React.FC<ClothProps> = makePngTop('/top20.png', { x: 25, y: 32, scale: 0.84 })

export interface TopItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const TOP_ITEMS: TopItem[] = [
  { id: 'top1', name: 'Tan Poncho', Component: Top1, sleeveLength: 'long' },
  { id: 'top2', name: 'Maroon Cape', Component: Top2, sleeveLength: 'long' },
  { id: 'top3', name: 'White Shirt', Component: Top3, sleeveLength: 'short' },
  { id: 'top4', name: 'Cream Blouse', Component: Top4, sleeveLength: 'short' },
  { id: 'top5', name: 'Floral Top', Component: Top5, sleeveLength: 'long' },
  { id: 'top6', name: 'Ruffled Blouse', Component: Top6, sleeveLength: 'long' },
  { id: 'top7', name: 'Blue Checkered', Component: Top7, sleeveLength: 'short' },
  { id: 'top9', name: 'Silk Tank', Component: Top9, sleeveLength: 'long' },
  { id: 'top10', name: 'Denim Jacket', Component: Top10, sleeveLength: 'long' },
  { id: 'top11', name: 'White Blouse', Component: Top11, sleeveLength: 'long' },
  { id: 'top12', name: 'Black Blouse', Component: Top12, sleeveLength: 'long' },
  { id: 'top13', name: 'Blue Blouse', Component: Top13, sleeveLength: 'short' },
  { id: 'top14', name: 'Red Denim', Component: Top14, sleeveLength: 'long' },
  { id: 'top15', name: 'Black Cut', Component: Top15, sleeveLength: 'short' },
  { id: 'top16', name: 'Floral Top2', Component: Top16, sleeveLength: 'long' },
  { id: 'top17', name: 'Dottet Top', Component: Top17, sleeveLength: 'long' },
  { id: 'top18', name: 'Beige Top', Component: Top18, sleeveLength: 'short' },
  { id: 'top19', name: 'Floral Top3', Component: Top19, sleeveLength: 'short' },
  { id: 'top20', name: 'Blue Ribbon', Component: Top20, sleeveLength: 'short' },
]

export default TOP_ITEMS
