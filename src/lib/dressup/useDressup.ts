/* useDressup.ts */
'use client'

import { useCallback, useState } from 'react'
import { CATEGORIES, GLOVE_ITEMS, TOP_ITEMS, DRESS_ITEMS, COAT_ITEMS, getItemDefaultAlign, type CategoryId } from './items'

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
  glasses:     string | null
  faceAcc:     string | null
  hairAcc:     string | null
  hat:         string | null
  handDeco:    string | null
  ring:        string | null
  glove:       string | null
  bracelet:    string | null
  necklace:    string | null
  sleeve:      string | null
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
  sleeve:      string
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
  sleeve:      '#E8DDCB',
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
  sleeve:      null,
}

export function isGloveFluffy(gloveId: string | null): boolean {
  if (!gloveId) return false
  const glove = GLOVE_ITEMS.find((g) => g.id === gloveId)
  return !!(glove as { fluffy?: boolean } & typeof glove)?.fluffy
    || gloveId.includes('fluffy')
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
  const [selection, setSelectionState] = useState<DressupState>(DEFAULT_STATE)  // ✅ Renamed
  const [colors, setColorsState] = useState<ColorState>(DEFAULT_COLORS)          // ✅ Renamed
  const [activeCategory, setActiveCategory] = useState<CategoryId>('background')
  const [alignMode, setAlignMode] = useState(false)
  const [alignments, setAlignments] = useState<Record<string, AlignmentValues>>({})

  const selectItem = useCallback((categoryId: CategoryId, itemId: string | null) => {
    setSelectionState((prev) => {
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
        if (itemId !== null && prev.sleeve) {
          next.sleeve = null
        }
        next.coat = itemId
      } else if (categoryId === 'sleeve') {
        if (itemId !== null) {
          if (!hasShortSleeves(prev)) {
            console.warn('Sleeves can only be worn with short-sleeve tops/dresses')
            return prev
          }
          if (prev.coat) {
            next.coat = null
          }
        }
        next.sleeve = itemId
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
    setColorsState((prev) => ({ ...prev, [categoryId]: color }))
  }, [])

  const getRandomColorFor = useCallback((categoryId: CategoryId) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId)
    if (!cat || !cat.supportsColor) return null
    return cat.palette[Math.floor(Math.random() * cat.palette.length)]
  }, [])

  const randomize = useCallback(() => {
    setSelectionState(DEFAULT_STATE)
  }, [])

  const reset = useCallback(() => {
    setSelectionState(DEFAULT_STATE)
    setColorsState(DEFAULT_COLORS)
  }, [])

  const getCurrentAlignment = useCallback((): AlignmentValues => {
    const selectedId = (selection as unknown as Record<string, string | null>)[activeCategory]
    if (!selectedId) return { x: 0, y: 0, scale: 1 }
    return alignments[selectedId] ?? getItemDefaultAlign(selectedId)
  }, [selection, activeCategory, alignments])

  const setCurrentAlignment = useCallback(
    (values: AlignmentValues) => {
      const selectedId = (selection as unknown as Record<string, string | null>)[activeCategory]
      if (!selectedId) return
      setAlignments((prev) => {
        const current = prev[selectedId]
        if (
          current &&
          current.x     === values.x &&
          current.y     === values.y &&
          current.scale === values.scale
        ) return prev
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

  // ✅ These are the NEW functions for setting entire selection/colors at once
  const setSelection = useCallback((newSelection: Partial<DressupState>) => {
    setSelectionState((prev) => ({ ...prev, ...newSelection }))
  }, [])

  const setColors = useCallback((newColors: Partial<ColorState>) => {
    setColorsState((prev) => ({ ...prev, ...newColors }))
  }, [])

  return {
    selection,
    colors,
    activeCategory,
    setActiveCategory,
    selectItem,
    setColor,
    setSelection, // ✅ NEW - for loading saved outfits
    setColors,    // ✅ NEW - for loading saved outfits
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
