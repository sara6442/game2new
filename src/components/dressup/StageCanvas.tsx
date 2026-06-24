'use client'

/**
 * StageCanvas.tsx — The layered model canvas.
 *
 * In ALIGN MODE, the currently-selected hair or dress is rendered with
 * the user's manual alignment (x/y/scale) on top of the body transform.
 */

import { Body } from './items/Body'
import {
  HAIR_STYLES,
  TOP_ITEMS,
  BOTTOM_ITEMS,
  DRESS_ITEMS,
  COAT_ITEMS,
  BACKGROUND_ITEMS,
  ACCESSORY_ITEMS,
  SHOE_ITEMS,
  DECORATION_ITEMS,
  type CategoryId,
} from '@/lib/dressup/items'
import { CANVAS_VIEWBOX, BODY_TRANSFORM } from '@/lib/dressup/canvas-dimensions'
import type { AlignmentValues } from '@/lib/dressup/useDressup'

interface StageCanvasProps {
  selection: {
    background: string | null
    hair: string | null
    top: string | null
    bottom: string | null
    dress: string | null
    coat: string | null
    shoe: string | null
    accessory: string | null
    decoration: string | null
  }
  colors: Record<CategoryId, string>
  alignments: Record<string, AlignmentValues>
  alignOverride?: { category: CategoryId; values: AlignmentValues } | null
}

export function StageCanvas({ selection, colors, alignments, alignOverride }: StageCanvasProps) {
  const BackgroundComp = BACKGROUND_ITEMS.find((b) => b.id === selection.background)?.Component
  const HairStyle = HAIR_STYLES.find((h) => h.id === selection.hair)
  const TopComp = TOP_ITEMS.find((t) => t.id === selection.top)?.Component
  const BottomComp = BOTTOM_ITEMS.find((b) => b.id === selection.bottom)?.Component
  const DressComp = DRESS_ITEMS.find((d) => d.id === selection.dress)?.Component
  const CoatComp = COAT_ITEMS.find((c) => c.id === selection.coat)?.Component
  const ShoeComp = SHOE_ITEMS.find((s) => s.id === selection.shoe)?.Component
  const AccessoryComp = ACCESSORY_ITEMS.find((a) => a.id === selection.accessory)?.Component
  const DecorationComp = DECORATION_ITEMS.find((d) => d.id === selection.decoration)?.Component

  // Helper: wrap a component in an alignment transform if it's the active aligned item
const wrapAlign = (category: CategoryId, itemId: string | null, element: React.ReactElement): React.ReactElement => {
  // In align mode, the override takes priority (live nudging)
  if (alignOverride && alignOverride.category === category) {
    const { x, y, scale } = alignOverride.values
    return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{element}</g>
  }
  // Otherwise use the saved alignment for this item
  if (itemId && alignments[itemId]) {
    const { x, y, scale } = alignments[itemId]
    return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{element}</g>
  }
  return element
}

  return (
    <svg
      viewBox={CANVAS_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* z=0: BACKGROUND */}
      {BackgroundComp && <BackgroundComp />}

      {/* z=1–z=9: BODY + CLOTHES + HAIR + ACCESSORIES + SHOES + DECORATIONS */}
      <g transform={BODY_TRANSFORM}>
        {/* z=1: HAIR BACK */}
        {HairStyle && <HairStyle.back color={colors.hair} />}

        {/* z=2: BODY */}
        <Body />

       {/* z=3: BOTTOM */}
      {!selection.dress && BottomComp && wrapAlign('bottom', selection.bottom, <BottomComp color={colors.bottom} />)}
      
      {/* z=4: TOP */}
      {!selection.dress && TopComp && wrapAlign('top', selection.top, <TopComp color={colors.top} />)}
      
      {/* z=5: DRESS */}
      {selection.dress && DressComp && wrapAlign('dress', selection.dress, <DressComp color={colors.dress} />)}
      
      {/* z=5.5: COAT */}
      {CoatComp && wrapAlign('coat', selection.coat, <CoatComp color={colors.coat} />)}
      
      {/* z=6: HAIR FRONT */}
      {HairStyle && wrapAlign('hair', selection.hair, <HairStyle.front color={colors.hair} />)}
      
      {/* z=7: ACCESSORY */}
      {AccessoryComp && wrapAlign('accessory', selection.accessory, <AccessoryComp color={colors.accessory} />)}
      
      {/* z=8: SHOE */}
      {ShoeComp && wrapAlign('shoe', selection.shoe, <ShoeComp color={colors.shoe} />)}
      
      {/* z=9: DECORATION */}
      {DecorationComp && wrapAlign('decoration', selection.decoration, <DecorationComp />)}
      </g>
    </svg>
  )
}

export default StageCanvas
