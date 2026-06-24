'use client'

/**
 * Tops.tsx — Upper-body clothing.
 *
 * Each top PNG is 325×742, rendered at body coordinates.
 *
 * sleeveLength: 'long' = full-length sleeves (selecting a coat will
 *               switch to default top), 'short' = short/sleeveless
 *               (coat can layer over it)
 */

export interface ClothProps {
  color?: string
  trim?: string
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG clothing item at body coordinates             */
/* ------------------------------------------------------------------ */
function makePngTop(src: string): React.FC<ClothProps> {
  return function PngTop() {
    return (
      <g>
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

/* ------------------------------------------------------------------ */
/* Helper: render a PNG clothing item WITH alignment support          */
/* ------------------------------------------------------------------ */
interface TopAlignment {
  x: number
  y: number
  scale: number
}

function makePngTopAligned(src: string, align: TopAlignment): React.FC<ClothProps> {
  const { x, y, scale } = align
  return function PngTopAligned() {
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

/* ------------------------------------------------------------------ */
/* New Tops 8-10 — with default alignment values                      */
/* These values come from the Align Mode tool after tuning            */
/* ------------------------------------------------------------------ */

export const Top8  = makePngTopAligned('/top8.png',  { x: 0, y: 0, scale: 1.00 })
export const Top9  = makePngTopAligned('/top9.png',  { x: -5, y: -10, scale: 1.05 })
export const Top10 = makePngTopAligned('/top10.png', { x: 3, y: -20, scale: 0.98 })

/* ------------------------------------------------------------------ */
/* Tops 1–7 — User's uploaded tops (top8 removed)                     */
/* Sleeve lengths (from vision analysis):                              */
/*   top1: long (poncho), top2: long (cape), top3: short,             */
/*   top4: short, top5: short, top6: long, top7: short                */
/* ------------------------------------------------------------------ */
export const Top1: React.FC<ClothProps> = makePngTop('/top1.png')
export const Top2: React.FC<ClothProps> = makePngTop('/top2.png')
export const Top3: React.FC<ClothProps> = makePngTop('/top3.png')
export const Top4: React.FC<ClothProps> = makePngTop('/top4.png')
export const Top5: React.FC<ClothProps> = makePngTop('/top5.png')
export const Top6: React.FC<ClothProps> = makePngTop('/top6.png')
export const Top7: React.FC<ClothProps> = makePngTop('/top7.png')

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface TopItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const TOP_ITEMS: TopItem[] = [
  { id: 'top1', name: 'Tan Poncho',       Component: Top1, sleeveLength: 'long' },
  { id: 'top2', name: 'Maroon Cape',      Component: Top2, sleeveLength: 'long' },
  { id: 'top3', name: 'White Shirt',      Component: Top3, sleeveLength: 'short' },
  { id: 'top4', name: 'Cream Blouse',     Component: Top4, sleeveLength: 'short' },
  { id: 'top5', name: 'Floral Top',       Component: Top5, sleeveLength: 'short' },
  { id: 'top6', name: 'Ruffled Blouse',   Component: Top6, sleeveLength: 'long' },
  { id: 'top7', name: 'Blue Checkered',   Component: Top7, sleeveLength: 'short' },
  // NEW TOPS:
  { id: 'top8',  name: 'Red Sweater',     Component: Top8,  sleeveLength: 'long' },
  { id: 'top9',  name: 'Silk Tank',       Component: Top9,  sleeveLength: 'short' },
  { id: 'top10', name: 'Denim Jacket',    Component: Top10, sleeveLength: 'long' },
]

export default TOP_ITEMS
