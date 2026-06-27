'use client'

import React from 'react'

export interface GlassesProps {
  align?: { x: number; y: number; scale: number }
}

export interface GlassesItem {
  id: string
  name: string
  Component: React.FC<GlassesProps>
}

function makePngGlasses(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<GlassesProps> {
  return function PngGlasses({ align }: GlassesProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}


// ── Add your glasses/face accessories here ──────────────────────────────────
export const Glasses1 = makePngGlasses('/glasses1.png', { x: 0, y: 0, scale: 1 })
export const Glasses2 = makePngGlasses('/glasses2.png', { x: 0, y: 0, scale: 1 })
export const Glasses3 = makePngGlasses('/glasses3.png', { x: 0, y: 0, scale: 1 })

export const GLASSES_ITEMS: GlassesItem[] = [
  { id: 'glasses1', name: 'Round Glasses',  Component: Glasses1 },
  { id: 'glasses2', name: 'Black Sunglasses',  Component: Glasses2 },
  { id: 'glasses3', name: 'Sad Rounded',  Component: Glasses3 },
]


export default GLASSES_ITEMS
