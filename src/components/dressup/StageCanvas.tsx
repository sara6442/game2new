'use client'

/**
 * StageCanvas.tsx — The layered model canvas.
 *
 * In ALIGN MODE, the currently-selected item is rendered with
 * the user's manual alignment (x/y/scale) on top of the body transform.
 *
 * Body image switches between Body-H-B.png (with bra) and
 * Body-H-NB.png (no bra) depending on which top/dress is active.
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

// ─── BODY SELECTION ───────────────────────────────────────────────────────────
// These item ids use the no-bra body (Body-H-NB.png).
// All other tops/dresses use the default bra body (Body-H-B.png).
//
// Tops:   top7=Blue Checkered, top15=Black Cut, top17=Dotted Top, top19=Floral Top3
// Dresses: dress4=Floral Dress, dress12=White Bride, dress13=Blue Ice,
//          dress14=Pink Princess, dress17=White Dress
//
const NO_BRA_IDS = new Set([
  'top7',    // Blue Checkered
  'top15',   // Black Cut
  'top17',   // Dotted Top
  'top19',   // Floral Top3
  'dress4',  // Floral Dress
  'dress12', // White Bride
  'dress13', // Blue Ice
  'dress14', // Pink Princess
  'dress17', // White Dress
])

export function StageCanvas({ selection, colors, alignments, alignOverride }: StageCanvasProps) {
  const BackgroundComp = BACKGROUND_ITEMS.find((b) => b.id === selection.background)?.Component
  const HairStyle      = HAIR_STYLES.find((h) => h.id === selection.hair)
  const TopComp        = TOP_ITEMS.find((t) => t.id === selection.top)?.Component
  const BottomComp     = BOTTOM_ITEMS.find((b) => b.id === selection.bottom)?.Component
  const DressComp      = DRESS_ITEMS.find((d) => d.id === selection.dress)?.Component
  const CoatComp       = COAT_ITEMS.find((c) => c.id === selection.coat)?.Component
  const ShoeComp       = SHOE_ITEMS.find((s) => s.id === selection.shoe)?.Component
  const AccessoryComp  = ACCESSORY_ITEMS.find((a) => a.id === selection.accessory)?.Component
  const DecorationComp = DECORATION_ITEMS.find((d) => d.id === selection.decoration)?.Component

  // ── Which body image to use ──────────────────────────────────────────────
  // If a dress is active, check the dress id. Otherwise check the top id.
  const activeClothingId = selection.dress ?? selection.top ?? null
  const bodySrc = (activeClothingId && NO_BRA_IDS.has(activeClothingId))
    ? '/Body-H-NB.png'
    : '/Body-H-B.png'

  // ── Alignment helper ─────────────────────────────────────────────────────
  // Priority: live alignOverride (align mode nudging) > saved alignments map
  const wrapAlign = (
    category: CategoryId,
    itemId: string | null,
    element: React.ReactElement,
  ): React.ReactElement => {
    if (alignOverride && alignOverride.category === category) {
      const { x, y, scale } = alignOverride.values
      return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{element}</g>
    }
    if (itemId && alignments[itemId]) {
      const { x, y, scale } = alignments[itemId]
      return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{element}</g>
    }
    return element
  }

  // ── Hair alignment ───────────────────────────────────────────────────────
  // Hair bakes its own default alignment inside the component.
  // If align mode is active on hair, or a saved override exists, pass it in
  // so the component uses it instead of its baked default.
  const hairAlign = alignOverride?.category === 'hair'
    ? alignOverride.values
    : (selection.hair && alignments[selection.hair]) || undefined

  return (
    <svg
      viewBox={CANVAS_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* z=0: BACKGROUND */}
      {BackgroundComp && <BackgroundComp />}

      <g transform={BODY_TRANSFORM}>
        {/* z=1: HAIR BACK */}
        {HairStyle && <HairStyle.back color={colors.hair} />}

        {/* z=2: BODY — switches between bra / no-bra based on active clothing */}
        <Body src={bodySrc} />

        {/* z=3: BOTTOM — hidden when a dress is active */}
        {!selection.dress && BottomComp && wrapAlign('bottom', selection.bottom,
          <BottomComp color={colors.bottom} />
        )}

        {/* z=4: TOP — hidden when a dress is active */}
        {!selection.dress && TopComp && wrapAlign('top', selection.top,
          <TopComp color={colors.top} />
        )}

        {/* z=5: DRESS */}
        {selection.dress && DressComp && wrapAlign('dress', selection.dress,
          <DressComp color={colors.dress} />
        )}

        {/* z=5.5: COAT — always in front of top/dress */}
        {CoatComp && wrapAlign('coat', selection.coat,
          <CoatComp color={colors.coat} />
        )}

        {/* z=6: HAIR FRONT — passes hairAlign so baked defaults work,
            and align-mode overrides still take effect */}
        {HairStyle && (
          <HairStyle.front color={colors.hair} align={hairAlign} />
        )}

        {/* z=7: ACCESSORY */}
        {AccessoryComp && wrapAlign('accessory', selection.accessory,
          <AccessoryComp color={colors.accessory} />
        )}

        {/* z=8: SHOE */}
        {ShoeComp && wrapAlign('shoe', selection.shoe,
          <ShoeComp color={colors.shoe} />
        )}

        {/* z=9: DECORATION */}
        {DecorationComp && wrapAlign('decoration', selection.decoration,
          <DecorationComp />
        )}
      </g>
    </svg>
  )
}

export default StageCanvas
