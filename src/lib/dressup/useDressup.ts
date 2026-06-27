Let me check those two things first.

Found both bugs. Let me check the full picture:

Both bugs are just wrong filenames in the code. Here are the exact fixes:

---

**`src/components/dressup/items/FaceAndGlasses.tsx` — Line 43**

```ts
// WRONG (file doesn't exist):
export const Face9 = makePngGlasses('/face9.png', ...)

// FIX:
export const Face9 = makePngGlasses('/face9(top).png', { x: 0, y: 0, scale: 1 })
```

---

**`src/components/dressup/items/Dresses.tsx` — Line 40**

```ts
// WRONG (file doesn't exist):
export const Dress19 = makePngDress('/dress19.png', ...)

// FIX:
export const Dress19 = makePngDress('/dress19M.png', { x: 31, y: 48, scale: 0.8 })
```

Just the PNG filename in each line — everything else stays the same.

---

Now here's the full `useDressup.ts`:

```ts
'use client'

/**
 * useDressup.ts — Client state for the dress-up game.
 *
 * Category rules:
 *  - hat and hairAcc are mutually exclusive (selecting one clears the other)
 *  - glasses and faceAcc are independent (can both be worn)
 *  - handDeco → ring → glove → bracelet are all independent (stack together)
 *  - glove fluffy flag: fluffy gloves render ABOVE long sleeves; non-fluffy UNDER
 *  - necklace is fully independent
 *  - coat always layers in front — no sleeve restriction
 */

import { useCallback, useState } from 'react'
import { CATEGORIES, TOP_ITEMS, DRESS_ITEMS, GLOVE_ITEMS, type CategoryId } from './items'

export const DEFAULT_TOP_ID    = 'top4'
export const DEFAULT_BOTTOM_ID = 'bottom8'

interface DressupState {
  background:  string | null
  hair:        string | null
  top:         string | null
  bottom:      string | null
  dress:       string | null
  coat:        string | null
  shoe:        string | null
  accessory:   string | null
  decoration:  string | null
  glasses:     string | null   // glasses — under hair (face9 is over)
  faceAcc:     string | null   // face accessories — under hair (face9 is over)
  hairAcc:     string | null   // hair clips/pins — mutually exclusive with hat
  hat:         string | null   // hats — mutually exclusive with hairAcc
  handDeco:    string | null   // nails, henna — lowest hand layer
  ring:        string | null   // rings — above nails, under gloves
  glove:       string | null   // gloves — fluffy=above sleeves, non-fluffy=under
  bracelet:    string | null   // bracelets — above gloves
  necklace:    string | null   // necklaces — separate neck layer
}

interface ColorState {
  background:  string
  hair:        string
  top:         string
  bottom:      string
  dress:       string
  coat:        string
  shoe:        string
  accessory:   string
  decoration:  string
  glasses:     string
  faceAcc:     string
  hairAcc:     string
  hat:         string
  handDeco:    string
  ring:        string
  glove:       string
  bracelet:    string
  necklace:    string
}

export interface AlignmentValues {
  x: number
  y: number
  scale: number
}

const DEFAULT_COLORS: ColorState = {
  background:  '#E8DCC8',
  hair:        '#3A2418',
  top:         '#E8DDCB',
  bottom:      '#2C2C3E',
  dress:       '#6B2737',
  coat:        '#3A2418',
  shoe:        '#3A2418',
  accessory:   '#C19A6B',
  decoration:  '#A8D888',
  glasses:     '#2C2C2C',
  faceAcc:     '#C19A6B',
  hairAcc:     '#C19A6B',
  hat:         '#3A2418',
  handDeco:    '#C19A6B',
  ring:        '#C0A060',
  glove:       '#F5F0E8',
  bracelet:    '#C19A6B',
  necklace:    '#C0A060',
}

const DEFAULT_STATE: DressupState = {
  background:  'white',
  hair:        null,
  top:         DEFAULT_TOP_ID,
  bottom:      DEFAULT_BOTTOM_ID,
  dress:       null,
  coat:        null,
  shoe:        null,
  accessory:   null,
  decoration:  null,
  glasses:     null,
  faceAcc:     null,
  hairAcc:     null,
  hat:         null,
  handDeco:    null,
  ring:        null,
  glove:       null,
  bracelet:    null,
  necklace:    null,
}

/** Returns true if the selected glove is fluffy (renders above long sleeves) */
export function isGloveFluffy(gloveId: string | null): boolean {
  if (!gloveId) return false
  const glove = GLOVE_ITEMS.find((g) => g.id === gloveId)
  return !!(glove as { fluffy?: boolean } & typeof glove)?.fluffy
    || gloveId.includes('fluffy')
}

export function useDressup() {
  const [selection, setSelection] = useState<DressupState>(DEFAULT_STATE)
  const [colors, setColors]       = useState<ColorState>(DEFAULT_COLORS)
  const [activeCategory, setActiveCategory] = useState<CategoryId>('background')
  const [alignMode, setAlignMode] = useState(false)
  const [alignments, setAlignments] = useState<Record<string, AlignmentValues>>({})

  const selectItem = useCallback((categoryId: CategoryId, itemId: string | null) => {
    setSelection((prev) => {
      const next = { ...prev }

      if (categoryId === 'dress') {
        if (itemId !== null) {
          next.dress  = itemId
          next.top    = null
          next.bottom = null
        } else {
          next.dress  = null
          next.top    = DEFAULT_TOP_ID
          next.bottom = DEFAULT_BOTTOM_ID
        }

      } else if (categoryId === 'top') {
        if (prev.dress) {
          next.dress  = null
          next.top    = itemId ?? DEFAULT_TOP_ID
          next.bottom = DEFAULT_BOTTOM_ID
        } else {
          next.top = itemId ?? DEFAULT_TOP_ID
        }

      } else if (categoryId === 'bottom') {
        if (prev.dress) {
          next.dress  = null
          next.bottom = itemId ?? DEFAULT_BOTTOM_ID
          next.top    = DEFAULT_TOP_ID
        } else {
          next.bottom = itemId ?? DEFAULT_BOTTOM_ID
        }

      } else if (categoryId === 'coat') {
        next.coat = itemId

      } else if (categoryId === 'hat') {
        next.hat     = itemId
        next.hairAcc = null

      } else if (categoryId === 'hairAcc') {
        next.hairAcc = itemId
        next.hat     = null

      } else {
        ;(next as unknown as Record<string, string | null>)[categoryId] = itemId
      }

      return next
    })
  }, [])

  const setColor = useCallback((categoryId: CategoryId, color: string) => {
    setColors((prev) => ({ ...prev, [categoryId]: color }))
  }, [])

  const getRandomColorFor = useCallback((categoryId: CategoryId) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId)
    if (!cat || !cat.supportsColor) return null
    return cat.palette[Math.floor(Math.random() * cat.palette.length)]
  }, [])

  const randomize = useCallback(() => {
    setSelection(DEFAULT_STATE)
  }, [])

  const reset = useCallback(() => {
    setSelection(DEFAULT_STATE)
    setColors(DEFAULT_COLORS)
  }, [])

  const getCurrentAlignment = useCallback((): AlignmentValues => {
    const selectedId = (selection as unknown as Record<string, string | null>)[activeCategory]
    if (!selectedId) return { x: 0, y: 0, scale: 1 }
    return alignments[selectedId] ?? { x: 0, y: 0, scale: 1 }
  }, [selection, activeCategory, alignments])

  const setCurrentAlignment = useCallback(
    (values: AlignmentValues) => {
      const selectedId = (selection as unknown as Record<string, string | null>)[activeCategory]
      if (!selectedId) return
      setAlignments((prev) => ({ ...prev, [selectedId]: values }))
    },
    [selection, activeCategory],
  )

  const resetCurrentAlignment = useCallback(() => {
    const selectedId = (selection as unknown as Record<string, string | null>)[activeCategory]
    if (!selectedId) return
    setAlignments((prev) => {
      const next = { ...prev }
      delete next[selectedId]
      return next
    })
  }, [selection, activeCategory])

  return {
    selection,
    colors,
    activeCategory,
    setActiveCategory,
    selectItem,
    setColor,
    getRandomColorFor,
    randomize,
    reset,
    alignMode,
    setAlignMode,
    alignments,
    getCurrentAlignment,
    setCurrentAlignment,
    resetCurrentAlignment,
  }
}

export type UseDressupReturn = ReturnType<typeof useDressup>
```
