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
  align?: { x: number; y: number; scale: number }
}

interface HairAlignment {
  x: number
  y: number
  scale: number
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG hairstyle with alignment transform             */
/* ------------------------------------------------------------------ */
function makePngHair(src: string, defaultAlign: HairAlignment): React.FC<HairProps> {
  return function PngHair({ align }: HairProps) {
    // If an external align override is passed (from align mode), use it.
    // Otherwise fall back to the baked-in default for this hairstyle.
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

const NoopBack: React.FC<HairProps> = () => null

/* ------------------------------------------------------------------ */
/* Hairstyles 2–10 — with user-adjusted alignment values              */
/* (hair1 removed by user request)                                     */
/* ------------------------------------------------------------------ */
const Hair1Front  = makePngHair('/hair1.png',  { x: 16, y: -90, scale: 1.03 })
const Hair2Front  = makePngHair('/hair2.png',  { x: -16, y:  -80, scale: 1.10 })
const Hair3Front  = makePngHair('/hair3.png',  { x: -8, y: -54, scale: 1 })
const Hair4Front  = makePngHair('/hair4.png',  { x: -11, y: -45, scale: 1 })
const Hair5Front  = makePngHair('/hair5.png',  { x:   9, y:  -67, scale: 1.05 })
const Hair6Front  = makePngHair('/hair6.png',  { x:  -4, y:  -61, scale: 1.00 })
const Hair7Front  = makePngHair('/hair7.png',  { x: -43, y: -70, scale: 1.23 })
const Hair8Front  = makePngHair('/hair8.png',  { x:  -5, y:  -79, scale: 1.10 })
const Hair9Front  = makePngHair('/hair9.png',  { x: -38, y:  -68, scale: 1.15 })
const Hair10Front = makePngHair('/hair10.png', { x:  22, y:  -96, scale: 1.00 })
const Hair11Front = makePngHair('/hair11.png', { x: 5, y: -192, scale: 1.5 })

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface HairStyle {
  id: string
  name: string
  back: React.FC<HairProps>
  front: React.FC<HairProps>
  defaultAlign: { x: number; y: number; scale: number }
}

export const HAIR_STYLES: HairStyle[] = [
  { id: 'hair1',  name: 'Hair 1',  back: NoopBack, front: Hair1Front,  defaultAlign: { x: 16,  y: -90,  scale: 1.03 } },
  { id: 'hair2',  name: 'Hair 2',  back: NoopBack, front: Hair2Front,  defaultAlign: { x: -16, y: -80,  scale: 1.10 } },
  { id: 'hair3',  name: 'Hair 3',  back: NoopBack, front: Hair3Front,  defaultAlign: { x: -8,  y: -54,  scale: 1    } },
  { id: 'hair4',  name: 'Hair 4',  back: NoopBack, front: Hair4Front,  defaultAlign: { x: -11, y: -45,  scale: 1    } },
  { id: 'hair5',  name: 'Hair 5',  back: NoopBack, front: Hair5Front,  defaultAlign: { x: 9,   y: -67,  scale: 1.05 } },
  { id: 'hair6',  name: 'Hair 6',  back: NoopBack, front: Hair6Front,  defaultAlign: { x: -4,  y: -61,  scale: 1.00 } },
  { id: 'hair7',  name: 'Hair 7',  back: NoopBack, front: Hair7Front,  defaultAlign: { x: -43, y: -70,  scale: 1.23 } },
  { id: 'hair8',  name: 'Hair 8',  back: NoopBack, front: Hair8Front,  defaultAlign: { x: -5,  y: -79,  scale: 1.10 } },
  { id: 'hair9',  name: 'Hair 9',  back: NoopBack, front: Hair9Front,  defaultAlign: { x: -38, y: -68,  scale: 1.15 } },
  { id: 'hair10', name: 'Hair 10', back: NoopBack, front: Hair10Front, defaultAlign: { x: 22,  y: -96,  scale: 1.00 } },
  { id: 'hair11', name: 'Hair 11', back: NoopBack, front: Hair11Front, defaultAlign: { x: 5,   y: -192, scale: 1.5  } },
]

export default HAIR_STYLES
