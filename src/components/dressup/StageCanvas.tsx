'use client'

/**
 * StageCanvas.tsx — The layered model canvas.
 *
 * Full z-order (bottom → top):
 *   z=0    Background
 *   z=1    Hair back
 *   z=2    Body (bra or no-bra)
 *   z=3    Bottom (under dress)
 *   z=3.1  Hand decorations (nails, henna) — EXCEPT handdeco1 (Rolling Pin)
 *   z=3.15 Rings
 *   z=3.2  Gloves NON-FLUFFY (under long sleeves)
 *   z=3.3  Bracelets (under gloves)
 *   z=4    Top / z=5 Dress  ← long sleeves cover non-fluffy hand items
 *   z=4.5  Sleeves (detachable sleeves, only with short sleeves)
 *   z=5.5  Coat (over everything except dress19)
 *   z=5.6  Gloves FLUFFY (above long sleeves)
 *   z=5.7  Necklace
 *   z=5.8  Glasses (always under hair)
 *   z=5.85 FaceAcc items 1–8 (under hair)
 *   z=6    Hair front
 *   z=6.5  Hat / Hair accessories (over hair, mutually exclusive)
 *   z=7    Shoes
 *   z=8    Dress19 (over everything, even coat)
 *   z=9    Decoration items
 *   z=9.5  handdeco1 (Rolling Pin / dec1L.png) — 2nd top layer
 *   z=9.9  face9 — black cloud, covers EVERYTHING
 */

import { Body } from './items/Body'
import {
  HAIR_STYLES,
  TOP_ITEMS,
  BOTTOM_ITEMS,
  DRESS_ITEMS,
  COAT_ITEMS,
  BACKGROUND_ITEMS,
  SHOE_ITEMS,
  SLEEVE_ITEMS,
  DECORATION_ITEMS,
  GLASSES_ITEMS,
  FACE_ACC_ITEMS,
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
    sleeve:      string | null
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

const NO_BRA_IDS = new Set([
  'top7', 'top15', 'top17', 'top19',
  'dress3',  // Blue Puff - needs no-bra body
  'dress4', 'dress12', 'dress13', 'dress14', 'dress17',
])

export function StageCanvas({ selection, colors, alignments, alignOverride }: StageCanvasProps) {
  const BackgroundComp  = BACKGROUND_ITEMS.find((b) => b.id === selection.background)?.Component
  const HairStyle       = HAIR_STYLES.find((h) => h.id === selection.hair)
  const TopComp         = TOP_ITEMS.find((t) => t.id === selection.top)?.Component
  const BottomComp      = BOTTOM_ITEMS.find((b) => b.id === selection.bottom)?.Component
  const DressComp       = DRESS_ITEMS.find((d) => d.id === selection.dress)?.Component
  const CoatComp        = COAT_ITEMS.find((c) => c.id === selection.coat)?.Component
  const ShoeComp        = SHOE_ITEMS.find((s) => s.id === selection.shoe)?.Component
  const SleeveComp      = SLEEVE_ITEMS.find((s) => s.id === selection.sleeve)?.Component
  const DecorationComp  = DECORATION_ITEMS.find((d) => d.id === selection.decoration)?.Component
  const GlassesComp     = GLASSES_ITEMS.find((g) => g.id === selection.glasses)?.Component
  const FaceAccComp     = FACE_ACC_ITEMS.find((f) => f.id === selection.faceAcc)?.Component
  const HairAccComp     = HAIR_ACC_ITEMS.find((h) => h.id === selection.hairAcc)?.Component
  const HatComp         = HAT_ITEMS.find((h) => h.id === selection.hat)?.Component
  const GloveComp       = GLOVE_ITEMS.find((g) => g.id === selection.glove)?.Component
  const BraceletComp    = BRACELET_ITEMS.find((b) => b.id === selection.bracelet)?.Component
  const HandDecoComp    = HAND_DECO_ITEMS.find((h) => h.id === selection.handDeco)?.Component
  const RingComp        = RING_ITEMS.find((r) => r.id === selection.ring)?.Component
  const NecklaceComp    = NECKLACE_ITEMS.find((n) => n.id === selection.necklace)?.Component

  // Body image
  const activeClothingId = selection.dress ?? selection.top ?? null
  const bodySrc = (activeClothingId && NO_BRA_IDS.has(activeClothingId))
    ? '/Body-H-NB.png'
    : '/Body-H-B.png'

  // Glove fluffy check
  const gloveFluffy = isGloveFluffy(selection.glove)

  // ✅ handdeco1 (Rolling Pin / dec1L.png) - 2nd top layer
  const isRollingPin = selection.handDeco === 'handdeco1'
  
  // ✅ dress19 - special dress that goes over everything
  const isDress19 = selection.dress === 'dress19'
  
  // ✅ face9 = black cloud = renders above EVERYTHING
  const isFace9 = selection.faceAcc === 'face9'

  // ✅ Get alignment for an item (alignOverride > saved alignment > undefined)
  const getAlignment = (category: CategoryId, itemId: string | null): AlignmentValues | undefined => {
    // 1. Check alignOverride (align mode)
    if (alignOverride && alignOverride.category === category) {
      return alignOverride.values
    }
    // 2. Check saved alignment
    if (itemId && alignments[itemId]) {
      return alignments[itemId]
    }
    // 3. Return undefined - component will use its default
    return undefined
  }

  const hairAlign = getAlignment('hair', selection.hair)

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

        {/* z=2.5: SHOES — behind everything (legs go under clothes) */}
        {ShoeComp && (
          <ShoeComp color={colors.shoe} align={getAlignment('shoe', selection.shoe)} />
        )}

        {/* z=3: BOTTOM */}
        {!selection.dress && BottomComp && (
          <BottomComp color={colors.bottom} align={getAlignment('bottom', selection.bottom)} />
        )}

        {/* z=3.1: HAND DECORATIONS — EXCEPT rolling pin (rendered at top) */}
        {HandDecoComp && !isRollingPin && (
          <HandDecoComp align={getAlignment('handDeco', selection.handDeco)} />
        )}

        {/* z=3.15: RINGS */}
        {RingComp && (
          <RingComp align={getAlignment('ring', selection.ring)} />
        )}

        {/* z=3.2: GLOVES NON-FLUFFY — under long sleeves */}
        {GloveComp && !gloveFluffy && (
          <GloveComp align={getAlignment('glove', selection.glove)} />
        )}

        {/* z=3.3: BRACELETS — under gloves */}
        {BraceletComp && (
          <BraceletComp align={getAlignment('bracelet', selection.bracelet)} />
        )}

        {/* z=4: TOP */}
        {!selection.dress && TopComp && (
          <TopComp color={colors.top} align={getAlignment('top', selection.top)} />
        )}

        {/* z=5: DRESS (except dress19) */}
        {selection.dress && !isDress19 && DressComp && (
          <DressComp color={colors.dress} align={getAlignment('dress', selection.dress)} />
        )}

        {/* z=4.5: SLEEVES */}
        {SleeveComp && (
          <SleeveComp color={colors.sleeve} align={getAlignment('sleeve', selection.sleeve)} />
        )}

        {/* z=5.5: COAT — over everything except dress19 */}
        {CoatComp && !isDress19 && (
          <CoatComp color={colors.coat} align={getAlignment('coat', selection.coat)} />
        )}

        {/* z=5.6: GLOVES FLUFFY */}
        {GloveComp && gloveFluffy && (
          <GloveComp align={getAlignment('glove', selection.glove)} />
        )}

        {/* z=5.7: NECKLACE */}
        {NecklaceComp && (
          <NecklaceComp align={getAlignment('necklace', selection.necklace)} />
        )}

        {/* z=5.8: GLASSES */}
        {GlassesComp && (
          <GlassesComp align={getAlignment('glasses', selection.glasses)} />
        )}

        {/* z=5.85: FACE ACC 1-8 */}
        {FaceAccComp && !isFace9 && (
          <FaceAccComp align={getAlignment('faceAcc', selection.faceAcc)} />
        )}

        {/* z=6: HAIR FRONT */}
        {HairStyle && (
          <HairStyle.front color={colors.hair} align={hairAlign} />
        )}

        {/* z=6.5: HAT / HAIR ACCESSORY */}
        {HatComp && (
          <HatComp align={getAlignment('hat', selection.hat)} />
        )}
        {HairAccComp && (
          <HairAccComp align={getAlignment('hairAcc', selection.hairAcc)} />
        )}


        {/* z=8: DRESS19 — over EVERYTHING except rolling pin and face9 */}
        {isDress19 && DressComp && (
          <DressComp color={colors.dress} align={getAlignment('dress', selection.dress)} />
        )}

        {/* z=9: DECORATIONS */}
        {DecorationComp && (
          <DecorationComp align={getAlignment('decoration', selection.decoration)} />
        )}

        {/* 🎯 z=9.5: Rolling Pin (handdeco1 / dec1L.png) — 2nd top layer */}
        {HandDecoComp && isRollingPin && (
          <HandDecoComp align={getAlignment('handDeco', selection.handDeco)} />
        )}

        {/* 🎯 z=9.9: face9 BLACK CLOUD — TOP LAYER */}
        {FaceAccComp && isFace9 && (
          <FaceAccComp align={getAlignment('faceAcc', selection.faceAcc)} />
        )}

      </g>
    </svg>
  )
}

export default StageCanvas
