/**
 * items.ts — Central registry of all dress-up categories and items.
 */

import type { ComponentType } from 'react'
import type { ClothProps, TopItem } from '@/components/dressup/items/Tops'
import type { ClothProps as BottomClothProps, BottomItem } from '@/components/dressup/items/Bottoms'
import type { ClothProps as DressClothProps, DressItem } from '@/components/dressup/items/Dresses'
import type { ClothProps as CoatClothProps, CoatItem } from '@/components/dressup/items/Coats'
import type { HairProps, HairStyle } from '@/components/dressup/items/Hairs'
import type { BackgroundProps, BackgroundItem } from '@/components/dressup/items/Backgrounds'
import type { AccessoryProps, AccessoryItem } from '@/components/dressup/items/Accessories'
import type { ShoeProps, ShoeItem } from '@/components/dressup/items/Shoes'
import type { DecorationProps, DecorationItem } from '@/components/dressup/items/Decorations'

import { TOP_ITEMS } from '@/components/dressup/items/Tops'
import { BOTTOM_ITEMS } from '@/components/dressup/items/Bottoms'
import { DRESS_ITEMS } from '@/components/dressup/items/Dresses'
import { COAT_ITEMS } from '@/components/dressup/items/Coats'
import { HAIR_STYLES } from '@/components/dressup/items/Hairs'
import { BACKGROUND_ITEMS } from '@/components/dressup/items/Backgrounds'
import { ACCESSORY_ITEMS } from '@/components/dressup/items/Accessories'
import { SHOE_ITEMS } from '@/components/dressup/items/Shoes'
import { DECORATION_ITEMS } from '@/components/dressup/items/Decorations'

export type CategoryId =
  | 'background'
  | 'hair'
  | 'top'
  | 'bottom'
  | 'dress'
  | 'coat'
  | 'shoe'
  | 'accessory'
  | 'decoration'

export interface Category {
  id: CategoryId
  label: string
  icon: string
  supportsColor: boolean
  palette: string[]
}

export const CATEGORIES: Category[] = [
  { id: 'background',  label: 'Background',   icon: '🏛️', supportsColor: false, palette: [] },
  { id: 'hair',        label: 'Hairstyle',    icon: '💇‍♀️', supportsColor: false, palette: [] },
  { id: 'top',         label: 'Tops',         icon: '👚', supportsColor: false, palette: [] },
  { id: 'bottom',      label: 'Bottoms',      icon: '👖', supportsColor: false, palette: [] },
  { id: 'dress',       label: 'Dresses',      icon: '👗', supportsColor: false, palette: [] },
  { id: 'coat',        label: 'Coats',        icon: '🧥', supportsColor: false, palette: [] },
  { id: 'shoe',        label: 'Shoes',        icon: '👟', supportsColor: false, palette: [] },
  { id: 'accessory',   label: 'Accessories',  icon: '✨', supportsColor: false, palette: [] },
  { id: 'decoration',  label: 'Decorations',  icon: '🌷', supportsColor: false, palette: [] },
]

export interface AnyItem {
  id: string
  name: string
  Component: ComponentType<{ color?: string; trim?: string; highlight?: string }>
}

/** Flat lookup of all items per category */
export const ITEMS_BY_CATEGORY: Record<CategoryId, AnyItem[]> = {
  background: BACKGROUND_ITEMS as unknown as AnyItem[],
  hair: HAIR_STYLES.map((h: HairStyle) => ({
    id: h.id,
    name: h.name,
    Component: h.front as unknown as AnyItem['Component'],
  })),
  top: TOP_ITEMS as unknown as TopItem[] as unknown as AnyItem[],
  bottom: BOTTOM_ITEMS as unknown as BottomItem[] as unknown as AnyItem[],
  dress: DRESS_ITEMS as unknown as DressItem[] as unknown as AnyItem[],
  coat: COAT_ITEMS as unknown as CoatItem[] as unknown as AnyItem[],
  shoe: SHOE_ITEMS as unknown as ShoeItem[] as unknown as AnyItem[],
  accessory: ACCESSORY_ITEMS as unknown as AccessoryItem[] as unknown as AnyItem[],
  decoration: DECORATION_ITEMS as unknown as DecorationItem[] as unknown as AnyItem[],
}

/** For the actual stage rendering, hair needs both back+front components. */
export { HAIR_STYLES, TOP_ITEMS, BOTTOM_ITEMS, DRESS_ITEMS, COAT_ITEMS, BACKGROUND_ITEMS, ACCESSORY_ITEMS, SHOE_ITEMS, DECORATION_ITEMS }

// Re-export prop types for convenience
export type { ClothProps, BottomClothProps, DressClothProps, CoatClothProps, HairProps, BackgroundProps, AccessoryProps, ShoeProps, DecorationProps }
