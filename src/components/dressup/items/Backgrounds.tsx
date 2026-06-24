'use client'

/**
 * Backgrounds.tsx — Full-scene backgrounds drawn behind the model.
 *
 * The user uploaded 6 background images. Each is loaded as a PNG image
 * covering the full CANVAS_WIDTH × CANVAS_HEIGHT viewBox (475 × 742)
 * with `preserveAspectRatio="xMidYMid slice"` so the image fills the
 * canvas without distortion (like CSS `object-fit: cover`).
 *
 * Backgrounds fill the ENTIRE canvas — they are NOT offset like the
 * body and clothes. This gives the model breathing room on both sides.
 */

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/dressup/canvas-dimensions'

export interface BackgroundProps {
  color?: string
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG background that fills the entire canvas       */
/* ------------------------------------------------------------------ */
function makePngBackground(src: string): React.FC<BackgroundProps> {
  return function PngBackground() {
    return (
      <g>
        <image
          href={src}
          x={0}
          y={0}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    )
  }
}

/* ------------------------------------------------------------------ */
/* BG 1 — White (default)                                            */
/* ------------------------------------------------------------------ */
export const BgWhite: React.FC<BackgroundProps> = makePngBackground('/bg-white.png')

/* ------------------------------------------------------------------ */
/* BG 2 — City Night                                                 */
/* ------------------------------------------------------------------ */
export const BgCityNight: React.FC<BackgroundProps> = makePngBackground('/bg-city-night.png')

/* ------------------------------------------------------------------ */
/* BG 3 — Balcony Room                                               */
/* ------------------------------------------------------------------ */
export const BgBalconyRoom: React.FC<BackgroundProps> = makePngBackground('/bg-balcony-room.png')

/* ------------------------------------------------------------------ */
/* BG 4 — Starry Room                                                */
/* ------------------------------------------------------------------ */
export const BgStarryRoom: React.FC<BackgroundProps> = makePngBackground('/bg-starry-room.png')

/* ------------------------------------------------------------------ */
/* BG 5 — Plant Corner                                               */
/* ------------------------------------------------------------------ */
export const BgPlantCorner: React.FC<BackgroundProps> = makePngBackground('/bg-plant-corner.png')

/* ------------------------------------------------------------------ */
/* BG 6 — Flower Field                                               */
/* ------------------------------------------------------------------ */
export const BgFlowerField: React.FC<BackgroundProps> = makePngBackground('/bg-flower-field.png')

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface BackgroundItem {
  id: string
  name: string
  Component: React.FC<BackgroundProps>
}

export const BACKGROUND_ITEMS: BackgroundItem[] = [
  { id: 'white', name: 'White', Component: BgWhite },
  { id: 'city-night', name: 'City Night', Component: BgCityNight },
  { id: 'balcony-room', name: 'Balcony Room', Component: BgBalconyRoom },
  { id: 'starry-room', name: 'Starry Room', Component: BgStarryRoom },
  { id: 'plant-corner', name: 'Plant Corner', Component: BgPlantCorner },
  { id: 'flower-field', name: 'Flower Field', Component: BgFlowerField },
]

export default BACKGROUND_ITEMS
