'use client'

/**
 * StageCanvas.tsx — The layered model canvas.
 *
 * Full z-order (bottom → top):
 *   z=0    Background
 *   z=1    Hair back
 *   z=2    Body
 *   z=3.1  Hand decorations (nails, henna)
 *   z=3.15 Rings
 *   z=3.2  Gloves NON-FLUFFY (under long sleeves)
 *   z=3.3  Bracelets
 *   z=3    Bottom
 *   z=4    Top       ─┐ long sleeves cover non-fluffy gloves/rings/nails
 *   z=5    Dress      ─┘
 *   z=5.5  Coat
 *   z=5.6  Gloves FLUFFY (above long sleeves — always visible)
 *   z=5.7  Necklace (above top/dress neckline, under coat)
 *   z=5.8  Glasses (under hair front, except face9 which is over)
 *   z=5.85 Face Accessories (same rule as glasses)
 *   z=6    Hair front
 *   z=6.2  face9 / faceAcc face9 (OVER hair front)
 *   z=6.5  Hat / Hair accessories (both over hair)
 *   z=7    Shoes
 *   z=8    Accessories
 *   z=9    Decorations
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
  GLASSES_ITEMS,
  HAIR_ACC_ITEMS,
  HAT_ITEMS,
  GLOVE_ITEMS,
  BRACELET_ITEMS,
  HAND_DECO_ITEMS,
  RING_ITEMS,
  NECKLACE_ITEMS,
  type CategoryId,
} from '@/lib/dressup/items'
import { isGloveFluffy } from '@/lib/dressup/useDressup'
import { CANVAS_VIEWBOX, BODY_TRANSFORM } from '@/lib/dressup/canvas-dimensions'
import type { AlignmentValues } from '@/lib/dressup/useDressup'

interface StageCanvasProps {
  selection: {
    background:  string | null
    hair:        string | null
    top:         string | null
    bottom:      string | null
    dress:       string | null
    coat:        string | null
    shoe:        string | null
    accessory:   string | null
    decoration:  string | null
    glasses:     string | null
    faceAcc:     string | null
    hairAcc:     string | null
    hat:         string | null
    handDeco:    string | null
    ring:        string | null
    glove:       string | null
    bracelet:    string | null
    necklace:    string | null
  }
  colors: Record<CategoryId, string>
  alignments: Record<string, AlignmentValues>
  alignOverride?: { category: CategoryId; values: AlignmentValues } | null
}

// Items that use the no-bra body image
const NO_BRA_IDS = new Set([
  'top7', 'top15', 'top17', 'top19',
  'dress4', 'dress12', 'dress13', 'dress14', 'dress17',
])

export function StageCanvas({ selection, colors, alignments, alignOverride }: StageCanvasProps) {
  // ── Component lookups ────────────────────────────────────────────────────
  const BackgroundComp  = BACKGROUND_ITEMS.find((b) => b.id === selection.background)?.Component
  const HairStyle       = HAIR_STYLES.find((h) => h.id === selection.hair)
  const TopComp         = TOP_ITEMS.find((t) => t.id === selection.top)?.Component
  const BottomComp      = BOTTOM_ITEMS.find((b) => b.id === selection.bottom)?.Component
  const DressComp       = DRESS_ITEMS.find((d) => d.id === selection.dress)?.Component
  const CoatComp        = COAT_ITEMS.find((c) => c.id === selection.coat)?.Component
  const ShoeComp        = SHOE_ITEMS.find((s) => s.id === selection.shoe)?.Component
  const AccessoryComp   = ACCESSORY_ITEMS.find((a) => a.id === selection.accessory)?.Component
  const DecorationComp  = DECORATION_ITEMS.find((d) => d.id === selection.decoration)?.Component
  const GlassesComp     = GLASSES_ITEMS.find((g) => g.id === selection.glasses)?.Component
  // faceAcc also uses the GLASSES_ITEMS pool (same file, same components)
  const FaceAccComp     = GLASSES_ITEMS.find((g) => g.id === selection.faceAcc)?.Component
  const HairAccComp     = HAIR_ACC_ITEMS.find((h) => h.id === selection.hairAcc)?.Component
  const HatComp         = HAT_ITEMS.find((h) => h.id === selection.hat)?.Component
  const GloveComp       = GLOVE_ITEMS.find((g) => g.id === selection.glove)?.Component
  const BraceletComp    = BRACELET_ITEMS.find((b) => b.id === selection.bracelet)?.Component
  const HandDecoComp    = HAND_DECO_ITEMS.find((h) => h.id === selection.handDeco)?.Component
  const RingComp        = RING_ITEMS.find((r) => r.id === selection.ring)?.Component
  const NecklaceComp    = NECKLACE_ITEMS.find((n) => n.id === selection.necklace)?.Component

  // ── Body image ───────────────────────────────────────────────────────────
  const activeClothingId = selection.dress ?? selection.top ?? null
  const bodySrc = (activeClothingId && NO_BRA_IDS.has(activeClothingId))
    ? '/Body-H-NB.png'
    : '/Body-H-B.png'

  // ── Glove fluffy check ───────────────────────────────────────────────────
  const gloveFluffy = isGloveFluffy(selection.glove)

  // ── face9 special rule: renders OVER hair front ──────────────────────────
  const isFace9     = selection.glasses === 'face9'
  const isFaceAcc9  = selection.faceAcc === 'face9'

  // ── Alignment helper ─────────────────────────────────────────────────────
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

        {/* z=2: BODY */}
        <Body src={bodySrc} />

        {/* z=3.1: HAND DECORATIONS — nails, henna */}
        {HandDecoComp && wrapAlign('handDeco', selection.handDeco,
          <HandDecoComp align={undefined} />
        )}

        {/* z=3.15: RINGS — above nails, under gloves */}
        {RingComp && wrapAlign('ring', selection.ring,
          <RingComp align={undefined} />
        )}

        {/* z=3.2: GLOVES NON-FLUFFY — under long sleeves */}
        {GloveComp && !gloveFluffy && wrapAlign('glove', selection.glove,
          <GloveComp align={undefined} />
        )}

        {/* z=3.3: BRACELETS — above gloves */}
        {BraceletComp && wrapAlign('bracelet', selection.bracelet,
          <BraceletComp align={undefined} />
        )}

        {/* z=3: BOTTOM */}
        {!selection.dress && BottomComp && wrapAlign('bottom', selection.bottom,
          <BottomComp color={colors.bottom} />
        )}

        {/* z=4: TOP — long sleeves cover non-fluffy hand items above */}
        {!selection.dress && TopComp && wrapAlign('top', selection.top,
          <TopComp color={colors.top} />
        )}

        {/* z=5: DRESS */}
        {selection.dress && DressComp && wrapAlign('dress', selection.dress,
          <DressComp color={colors.dress} />
        )}

        {/* z=5.5: COAT */}
        {CoatComp && wrapAlign('coat', selection.coat,
          <CoatComp color={colors.coat} />
        )}

        {/* z=5.6: GLOVES FLUFFY — above long sleeves, always visible */}
        {GloveComp && gloveFluffy && wrapAlign('glove', selection.glove,
          <GloveComp align={undefined} />
        )}

        {/* z=5.7: NECKLACE — above top/dress neckline */}
        {NecklaceComp && wrapAlign('necklace', selection.necklace,
          <NecklaceComp align={undefined} />
        )}

        {/* z=5.8: GLASSES — under hair front (except face9) */}
        {GlassesComp && !isFace9 && wrapAlign('glasses', selection.glasses,
          <GlassesComp align={undefined} />
        )}

        {/* z=5.85: FACE ACCESSORIES — under hair front (except face9) */}
        {FaceAccComp && !isFaceAcc9 && wrapAlign('faceAcc', selection.faceAcc,
          <FaceAccComp align={undefined} />
        )}

        {/* z=6: HAIR FRONT */}
        {HairStyle && (
          <HairStyle.front color={colors.hair} align={hairAlign} />
        )}

        {/* z=6.2: face9 glasses OVER hair front */}
        {GlassesComp && isFace9 && wrapAlign('glasses', selection.glasses,
          <GlassesComp align={undefined} />
        )}

        {/* z=6.2: face9 faceAcc OVER hair front */}
        {FaceAccComp && isFaceAcc9 && wrapAlign('faceAcc', selection.faceAcc,
          <FaceAccComp align={undefined} />
        )}

        {/* z=6.5: HAT (mutually exclusive with hairAcc) */}
        {HatComp && wrapAlign('hat', selection.hat,
          <HatComp align={undefined} />
        )}

        {/* z=6.5: HAIR ACCESSORY (mutually exclusive with hat) */}
        {HairAccComp && wrapAlign('hairAcc', selection.hairAcc,
          <HairAccComp align={undefined} />
        )}

        {/* z=7: SHOES */}
        {ShoeComp && wrapAlign('shoe', selection.shoe,
          <ShoeComp color={colors.shoe} />
        )}

        {/* z=8: ACCESSORIES */}
        {AccessoryComp && wrapAlign('accessory', selection.accessory,
          <AccessoryComp color={colors.accessory} />
        )}

        {/* z=9: DECORATIONS */}
        {DecorationComp && wrapAlign('decoration', selection.decoration,
          <DecorationComp />
        )}
      </g>
    </svg>
  )
}

export default StageCanvas
