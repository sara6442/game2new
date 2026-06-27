'use client'

/**
 * FaceAcc.tsx — Face accessories (blush, freckles, face paint, masks, etc.)
 *
 * Layer rule:
 *   - All items render UNDER the hair front (z=5.85)
 *   - Exception: id === 'face9' renders OVER hair front AND over everything (z=6.2)
 *     face9 is the 9th face accessory — a black cloud PNG that covers
 *     the entire head including the hair.
 *
 * This file is for face decorations that are NOT eyewear.
 * Glasses → FaceAndGlasses.tsx
 */

import React from 'react'

export interface FaceAccProps {
  align?: { x: number; y: number; scale: number }
}

export interface FaceAccItem {
  id: string
  name: string
  Component: React.FC<FaceAccProps>
}

function makePngFaceAcc(
  src: string,
  defaultAlign = { x: 0, y: 0, scale: 1 },
): React.FC<FaceAccProps> {
  return function PngFaceAcc({ align }: FaceAccProps) {
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
        />
      </g>
    )
  }
}

// ── Add your glasses/face accessories here ──────────────────────────────────
export const Face1 = makePngFaceAcc('/face1.png', { x: 0, y: 0, scale: 1 })
export const Face2 = makePngFaceAcc('/face2.png', { x: 0, y: 0, scale: 1 })
export const Face3 = makePngFaceAcc('/face3.png', { x: 0, y: 0, scale: 1 })
export const Face4 = makePngFaceAcc('/face4.png', { x: 0, y: 0, scale: 1 })
export const Face5 = makePngFaceAcc('/face5.png', { x: 0, y: 0, scale: 1 })
export const Face6 = makePngFaceAcc('/face6.png', { x: 0, y: 0, scale: 1 })
export const Face8 = makePngFaceAcc('/face8.png', { x: 0, y: 0, scale: 1 })
export const Face7 = makePngFaceAcc('/face7.png', { x: -3, y: 15, scale: 1 })
export const Face9 = makePngFaceAcc('/face9.png', { x: 0, y: 0, scale: 1 })

export const FACE_ACC_ITEMS: FaceAccItem[] = [
  { id: 'face1', name: 'Face1', Component: Face1 },
    { id: 'face2', name: 'Strawbbery Blush', Component: Face2 },
  { id: 'face3', name: 'Nose Plaster', Component: Face3 },
  { id: 'face4', name: 'Normal Blush', Component: Face4 },
  { id: 'face5', name: 'Face Mask', Component: Face5 },
  { id: 'face6', name: 'Star Sticker', Component: Face6 },
  { id: 'face8', name: 'Heart Sticker', Component: Face8 },
  { id: 'face7', name: 'Bleeding Head', Component: Face7 },
  { id: 'face9', name: 'Black Cloud',  Component: Face9 },
]

export default FACE_ACC_ITEMS
