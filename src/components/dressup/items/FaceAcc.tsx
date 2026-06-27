'use client'

import React from 'react'

export interface FaceAccProps {
  align?: { x: number; y: number; scale: number }
}

export interface FaceAccItem {
  id: string
  name: string
  Component: React.FC<FaceAccProps>
}

function makePngFaceAcc(src: string, defaultAlign = { x: 0, y: 0, scale: 1 }): React.FC<FaceAccProps> {
  return function PngFaceAcc({ align }: FaceAccProps) {
    const { x, y, scale } = align ?? defaultAlign
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

// ── Add your glasses/face accessories here ──────────────────────────────────
export const Face1 = makePngGlasses('/face1.png', { x: 0, y: 0, scale: 1 })
export const Face2 = makePngGlasses('/face2.png', { x: 0, y: 0, scale: 1 })
export const Face3 = makePngGlasses('/face3.png', { x: 0, y: 0, scale: 1 })
export const Face4 = makePngGlasses('/face4.png', { x: 0, y: 0, scale: 1 })
export const Face5 = makePngGlasses('/face5.png', { x: 0, y: 0, scale: 1 })
export const Face6 = makePngGlasses('/face6.png', { x: 0, y: 0, scale: 1 })
export const Face8 = makePngGlasses('/face7.png', { x: 0, y: 0, scale: 1 })
export const Face7 = makePngGlasses('/face8.png', { x: 8, y: 0, scale: 1 })
export const Face9 = makePngGlasses('/face9.png', { x: 0, y: 0, scale: 1 })
export const Glasses1 = makePngGlasses('/glasses1.png', { x: 0, y: 0, scale: 1 })
export const Glasses2 = makePngGlasses('/glasses2.png', { x: 0, y: 0, scale: 1 })
export const Glasses3 = makePngGlasses('/glasses3.png', { x: 0, y: 0, scale: 1 })

export const GLASSES_ITEMS: GlassesItem[] = [
  { id: 'face1', name: 'Face1', Component: Face1 },
    { id: 'face2', name: 'Strawbbery Blush', Component: Face2 },
  { id: 'face3', name: 'Nose Plaster', Component: Face3 },
  { id: 'face4', name: 'Normal Blush', Component: Face4 },
  { id: 'face5', name: 'Face Mask', Component: Face5 },
  { id: 'face6', name: 'Star Sticker', Component: Face6 },
  { id: 'face8', name: 'Heart Sticker', Component: Face8 },
  { id: 'face7', name: 'Bleeding Head', Component: Face7 },
  { id: 'face9', name: 'Black Cloud',  Component: Face9 },

  export default FACE_ACC_ITEMS
  { id: 'glasses1', name: 'Round Glasses',  Component: Glasses1 },
  { id: 'glasses2', name: 'Black Sunglasses',  Component: Glasses2 },
  { id: 'glasses3', name: 'Sad Rounded',  Component: Glasses3 },
]
