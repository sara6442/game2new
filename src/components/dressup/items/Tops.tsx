'use client'

import React from 'react'

export interface ClothProps {
  color?: string
  trim?: string
  align?: { x: number; y: number; scale: number }
}

/* ------------------------------------------------------------------ */
/* Helper — renders a PNG at body coordinates, no transform baked in  */
/* StageCanvas / wrapAlign handles x/y/scale at runtime               */
/* ------------------------------------------------------------------ */
function makePngTop(src: string): React.FC<ClothProps> {
  return function PngTop() {
    return (
      <image
        href={src}
        x={0}
        y={0}
        width={325}
        height={742}
        preserveAspectRatio="xMidYMid meet"
      />
    )
  }
}

/* ------------------------------------------------------------------ */
/* Tops 1–10                                                          */
/* ------------------------------------------------------------------ */
export const Top1:  React.FC<ClothProps> = makePngTop('/top1.png')
export const Top2:  React.FC<ClothProps> = makePngTop('/top2.png')
export const Top3:  React.FC<ClothProps> = makePngTop('/top3.png')
export const Top4:  React.FC<ClothProps> = makePngTop('/top4.png')
export const Top5:  React.FC<ClothProps> = makePngTop('/top5.png')
export const Top6:  React.FC<ClothProps> = makePngTop('/top6.png')
export const Top7:  React.FC<ClothProps> = makePngTop('/top7.png')
export const Top8:  React.FC<ClothProps> = makePngTop('/top8.png')
export const Top9:  React.FC<ClothProps> = makePngTop('/top9.png')
export const Top10: React.FC<ClothProps> = makePngTop('/top10.png')

/* ------------------------------------------------------------------ */
/* Registry                                                           */
/* ------------------------------------------------------------------ */
export interface TopItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const TOP_ITEMS: TopItem[] = [
  { id: 'top1',  name: 'Tan Poncho',     Component: Top1,  sleeveLength: 'long'  },
  { id: 'top2',  name: 'Maroon Cape',    Component: Top2,  sleeveLength: 'long'  },
  { id: 'top3',  name: 'White Shirt',    Component: Top3,  sleeveLength: 'short' },
  { id: 'top4',  name: 'Cream Blouse',   Component: Top4,  sleeveLength: 'short' },
  { id: 'top5',  name: 'Floral Top',     Component: Top5,  sleeveLength: 'short' },
  { id: 'top6',  name: 'Ruffled Blouse', Component: Top6,  sleeveLength: 'long'  },
  { id: 'top7',  name: 'Blue Checkered', Component: Top7,  sleeveLength: 'short' },
  { id: 'top8',  name: 'Red Sweater',    Component: Top8,  sleeveLength: 'long'  },
  { id: 'top9',  name: 'Silk Tank',      Component: Top9,  sleeveLength: 'short' },
  { id: 'top10', name: 'Denim Jacket',   Component: Top10, sleeveLength: 'long'  },
]

export default TOP_ITEMS
