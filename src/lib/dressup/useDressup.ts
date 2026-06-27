'use client'
 
/**
 * useDressup.ts — Client state for the dress-up game.
 *
 * New categories: glasses, hairAcc, hat, handDeco, glove, bracelet
 *
 * Rules enforced:
 *  - hat and hairAcc are mutually exclusive (selecting one clears the other)
 *  - gloves/bracelets/handDeco are all independent (can all be worn together)
 *  - coat: always layers over anything — no sleeve restriction
 */
 
import { useCallback, useState } from 'react'
import { CATEGORIES, TOP_ITEMS, DRESS_ITEMS, type CategoryId } from './items'
 
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
  // ── new ──
  glasses:     string | null   // face accessories (glasses etc.)
  hairAcc:     string | null   // hair clips/pins — exclusive with hat
  hat:         string | null   // hats — exclusive with hairAcc
  handDeco:    string | null   // nails, henna
  glove:       string | null   // gloves
  bracelet:    string | null   // bracelets
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
  hairAcc:     string
  hat:         string
  handDeco:    string
  glove:       string
  bracelet:    string
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
  hairAcc:     '#C19A6B',
  hat:         '#3A2418',
  handDeco:    '#C19A6B',
  glove:       '#F5F0E8',
  bracelet:    '#C19A6B',
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
  hairAcc:     null,
  hat:         null,
  handDeco:    null,
  glove:       null,
  bracelet:    null,
}
 
/** Check if the current top or dress has long sleeves */
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
        // Coat is always allowed — layers in front of anything
        next.coat = itemId
 
      } else if (categoryId === 'hat') {
        // Hat and hairAcc are mutually exclusive
        next.hat    = itemId
        next.hairAcc = null
 
      } else if (categoryId === 'hairAcc') {
        // HairAcc and hat are mutually exclusive
        next.hairAcc = itemId
        next.hat     = null
 
      } else {
        // All other categories: glasses, handDeco, glove, bracelet,
        // shoe, accessory, decoration, hair, background
        ;(next as Record<string, string | null>)[categoryId] = itemId
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
    setSelection((prev) => ({
      ...prev,
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
      hairAcc:     null,
      hat:         null,
      handDeco:    null,
      glove:       null,
      bracelet:    null,
    }))
  }, [])
 
  const reset = useCallback(() => {
    setSelection(DEFAULT_STATE)
    setColors(DEFAULT_COLORS)
  }, [])
 
  const getCurrentAlignment = useCallback((): AlignmentValues => {
    const selectedId = (selection as Record<string, string | null>)[activeCategory]
    if (!selectedId) return { x: 0, y: 0, scale: 1 }
    return alignments[selectedId] ?? { x: 0, y: 0, scale: 1 }
  }, [selection, activeCategory, alignments])
 
  const setCurrentAlignment = useCallback(
    (values: AlignmentValues) => {
      const selectedId = (selection as Record<string, string | null>)[activeCategory]
      if (!selectedId) return
      setAlignments((prev) => ({ ...prev, [selectedId]: values }))
    },
    [selection, activeCategory],
  )
 
  const resetCurrentAlignment = useCallback(() => {
    const selectedId = (selection as Record<string, string | null>)[activeCategory]
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
 
