'use client'

/**
 * Hairs.tsx — Hairstyle layers.
 *
 * Each hairstyle PNG is 325×742. The alignment values (x, y, scale)
 * were manually adjusted by the user using the alignment tool and
 * baked in here as defaults.
 *
 * The transform is applied INSIDE the body's coordinate system:
 *   translate(x, y) scale(scale)
 * So x/y are in body-frame pixels, and scale is relative to the
 * hair's natural size.
 */

import type { ComponentType } from 'react'

export interface HairProps {
  color?: string
  highlight?: string
}

interface HairAlignment {
  x: number
  y: number
  scale: number
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG hairstyle with alignment transform             */
/* ------------------------------------------------------------------ */
function makePngHair(src: string, align: HairAlignment): React.FC<HairProps> {
  const { x, y, scale } = align
  return function PngHair() {
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

const NoopBack: React.FC<HairProps> = () => null

/* ------------------------------------------------------------------ */
/* Hairstyles 2–10 — with user-adjusted alignment values              */
/* (hair1 removed by user request)                                     */
/* ------------------------------------------------------------------ */
const Hair2Front  = makePngHair('/hair2.png',  { x: -16, y:  -80, scale: 1.10 })
const Hair3Front  = makePngHair('/hair3.png',  { x:  -7, y:  -53, scale: 1.00 })
const Hair4Front  = makePngHair('/hair4.png',  { x:   5, y:  -53, scale: 1.05 })
const Hair5Front  = makePngHair('/hair5.png',  { x:   9, y:  -67, scale: 1.05 })
const Hair6Front  = makePngHair('/hair6.png',  { x:  -4, y:  -61, scale: 1.00 })
const Hair7Front  = makePngHair('/hair7.png',  { x: -52, y: -133, scale: 1.25 })
const Hair8Front  = makePngHair('/hair8.png',  { x:  -5, y:  -79, scale: 1.10 })
const Hair9Front  = makePngHair('/hair9.png',  { x: -38, y:  -68, scale: 1.15 })
const Hair10Front = makePngHair('/hair10.png', { x:  22, y:  -96, scale: 1.00 })

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface HairStyle {
  id: string
  name: string
  back: ComponentType<HairProps>
  front: ComponentType<HairProps>
}

export const HAIR_STYLES: HairStyle[] = [
  { id: 'hair2',  name: 'Style 1',  back: NoopBack, front: Hair2Front },
  { id: 'hair3',  name: 'Style 2',  back: NoopBack, front: Hair3Front },
  { id: 'hair4',  name: 'Style 3',  back: NoopBack, front: Hair4Front },
  { id: 'hair5',  name: 'Style 4',  back: NoopBack, front: Hair5Front },
  { id: 'hair6',  name: 'Style 5',  back: NoopBack, front: Hair6Front },
  { id: 'hair7',  name: 'Style 6',  back: NoopBack, front: Hair7Front },
  { id: 'hair8',  name: 'Style 7',  back: NoopBack, front: Hair8Front },
  { id: 'hair9',  name: 'Style 8',  back: NoopBack, front: Hair9Front },
  { id: 'hair10', name: 'Style 9',  back: NoopBack, front: Hair10Front },
]

export default HAIR_STYLES
