'use client'
 
/**
 * useDressup.ts — Client state for the dress-up game.
 */
 
import { useCallback, useState } from 'react'
import { CATEGORIES, GLOVE_ITEMS, TOP_ITEMS, DRESS_ITEMS, COAT_ITEMS, type CategoryId } from './items'
 
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
 
interface ColorState {
  background:  string
  hair:        string
  top:         string
  bottom:      string
  dress:       string
  coat:        string
  shoe:        string
  sleeve:      string
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
  shoe:        '#2C2C2C',
  sleeve:      '#F5F0E8',
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
  sleeve:      null,
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
 
export function isGloveFluffy(gloveId: string | null): boolean {
  if (!gloveId) return false
  const glove = GLOVE_ITEMS.find((g) => g.id === gloveId) as
    | ({ fluffy?: boolean } & (typeof GLOVE_ITEMS)[number])
    | undefined
  return glove?.fluffy === true || gloveId.includes('fluffy')
}

function hasLongSleeves(state: DressupState): boolean {
  if (state.dress) {
    const dress = DRESS_ITEMS.find((d) => d.id === state.dress)
    return dress?.sleeveLength === 'long'
  }
  if (state.top) {
    const top = TOP_ITEMS.find((t) => t.id === state.top)
    return top?.sleeveLength === 'long'
  }
  return false
}

function hasShortSleeves(state: DressupState): boolean {
  if (state.dress) {
    const dress = DRESS_ITEMS.find((d) => d.id === state.dress)
    return dress?.sleeveLength === 'short'
  }
  if (state.top) {
    const top = TOP_ITEMS.find((t) => t.id === state.top)
    return top?.sleeveLength === 'short'
  }
  return false
}

function isJacket(coatId: string | null): boolean {
  if (!coatId) return false
  const coat = COAT_ITEMS.find((c) => c.id === coatId)
  return coat?.type === 'jacket'
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
          next.sleeve = null
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
        next.sleeve = null
 
      } else if (categoryId === 'bottom') {
        if (prev.dress) {
          next.dress  = null
          next.bottom = itemId ?? DEFAULT_BOTTOM_ID
          next.top    = DEFAULT_TOP_ID
        } else {
          next.bottom = itemId ?? DEFAULT_BOTTOM_ID
        }
 
      } else if (categoryId === 'coat') {
        if (itemId === null) {
          next.coat = null
          return next
        }
        
        // ✅ FIXED: Only jackets replace long sleeves. Coats/cardigans/aprons can be worn over anything.
        if (isJacket(itemId) && hasLongSleeves(prev)) {
          if (prev.dress) {
            next.dress = null
            next.top = DEFAULT_TOP_ID
            next.bottom = DEFAULT_BOTTOM_ID
          } else if (prev.top) {
            next.top = DEFAULT_TOP_ID
          }
          next.sleeve = null
        }
        
        next.coat = itemId

      } else if (categoryId === 'sleeve') {
        if (itemId !== null && !hasShortSleeves(prev)) {
          console.warn('Sleeves can only be worn with short-sleeve tops/dresses')
          return prev
        }
        next.sleeve = itemId

      } else if (categoryId === 'hat') {
        next.hat     = itemId
        next.hairAcc = null
 
      } else if (categoryId === 'hairAcc') {
        next.hairAcc = itemId
        next.hat     = null

      } else if (categoryId === 'glove') {
        if (itemId !== null) {
          next.ring = null
          next.handDeco = null
        }
        next.glove = itemId

      } else if (categoryId === 'ring') {
        if (itemId !== null && prev.glove) {
          next.glove = null
        }
        next.ring = itemId

      } else if (categoryId === 'handDeco') {
        if (itemId !== null && prev.glove) {
          next.glove = null
        }
        next.handDeco = itemId
 
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
      setAlignments((prev) => {
        // ✅ Preserve existing values, only update the one being modified
        return { ...prev, [selectedId]: values }
      })
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
