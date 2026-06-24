'use client'

/**
 * useDressup.ts — Client state for the dress-up game.
 *
 * Includes an ALIGNMENT MODE that lets the user manually adjust the
 * X/Y/scale of each hair and dress. The adjusted values are stored
 * per-item-id and can be copied to the clipboard so the user can
 * paste them back to the developer.
 */

import { useCallback, useState } from 'react'
import { CATEGORIES, TOP_ITEMS, DRESS_ITEMS, type CategoryId } from './items'

export const DEFAULT_TOP_ID = 'top4'
export const DEFAULT_BOTTOM_ID = 'bottom1'

interface DressupState {
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

interface ColorState {
  background: string
  hair: string
  top: string
  bottom: string
  dress: string
  coat: string
  shoe: string
  accessory: string
  decoration: string
}

export interface AlignmentValues {
  x: number
  y: number
  scale: number
}

const DEFAULT_COLORS: ColorState = {
  background: '#E8DCC8',
  hair: '#3A2418',
  top: '#E8DDCB',
  bottom: '#2C2C3E',
  dress: '#6B2737',
  coat: '#3A2418',
  shoe: '#3A2418',
  accessory: '#C19A6B',
  decoration: '#A8D888',
}

const DEFAULT_STATE: DressupState = {
  background: 'white',
  hair: null,
  top: DEFAULT_TOP_ID,
  bottom: DEFAULT_BOTTOM_ID,
  dress: null,
  coat: null,
  shoe: null,
  accessory: null,
  decoration: null,
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
  const [colors, setColors] = useState<ColorState>(DEFAULT_COLORS)
  const [activeCategory, setActiveCategory] = useState<CategoryId>('background')
  const [alignMode, setAlignMode] = useState(false)
  // Per-item alignment overrides: { 'hair1': { x, y, scale }, 'dress2': {...} }
  const [alignments, setAlignments] = useState<Record<string, AlignmentValues>>({})

  const selectItem = useCallback((categoryId: CategoryId, itemId: string | null) => {
    setSelection((prev) => {
      const next = { ...prev }

      if (categoryId === 'dress') {
        if (itemId !== null) {
          next.dress = itemId
          next.top = null
          next.bottom = null
        } else {
          next.dress = null
          next.top = DEFAULT_TOP_ID
          next.bottom = DEFAULT_BOTTOM_ID
        }
      } else if (categoryId === 'top') {
        if (prev.dress) {
          next.dress = null
          next.top = itemId !== null ? itemId : DEFAULT_TOP_ID
          next.bottom = DEFAULT_BOTTOM_ID
        } else {
          next.top = itemId !== null ? itemId : DEFAULT_TOP_ID
        }
      } else if (categoryId === 'bottom') {
        if (prev.dress) {
          next.dress = null
          next.bottom = itemId !== null ? itemId : DEFAULT_BOTTOM_ID
          next.top = DEFAULT_TOP_ID
        } else {
          next.bottom = itemId !== null ? itemId : DEFAULT_BOTTOM_ID
        }
      } else if (categoryId === 'coat') {
        if (itemId !== null) {
          next.coat = itemId
          if (hasLongSleeves(prev)) {
            next.dress = null
            next.top = DEFAULT_TOP_ID
            next.bottom = DEFAULT_BOTTOM_ID
          }
        } else {
          next.coat = null
        }
      } else {
        next[categoryId] = itemId
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
      background: 'white',
      hair: null,
      top: DEFAULT_TOP_ID,
      bottom: DEFAULT_BOTTOM_ID,
      dress: null,
      coat: null,
      shoe: null,
      accessory: null,
      decoration: null,
    }))
  }, [])

  const reset = useCallback(() => {
    setSelection(DEFAULT_STATE)
    setColors(DEFAULT_COLORS)
  }, [])

  /** Get the alignment values for the currently-selected item in the active category */
  const getCurrentAlignment = useCallback((): AlignmentValues => {
    const selectedId = selection[activeCategory]
    if (!selectedId) return { x: 0, y: 0, scale: 1 }
    return alignments[selectedId] ?? { x: 0, y: 0, scale: 1 }
  }, [selection, activeCategory, alignments])

  /** Update the alignment values for the currently-selected item */
  const setCurrentAlignment = useCallback(
    (values: AlignmentValues) => {
      const selectedId = selection[activeCategory]
      if (!selectedId) return
      setAlignments((prev) => ({ ...prev, [selectedId]: values }))
    },
    [selection, activeCategory],
  )

  /** Reset the alignment for the currently-selected item */
  const resetCurrentAlignment = useCallback(() => {
    const selectedId = selection[activeCategory]
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
