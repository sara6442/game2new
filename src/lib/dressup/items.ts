/**
 * items.ts — Central registry of all dress-up categories and items.
 */
 
import type { ComponentType } from 'react'
import type { ClothProps, TopItem }                        from '@/components/dressup/items/Tops'
import type { ClothProps as BottomClothProps, BottomItem } from '@/components/dressup/items/Bottoms'
import type { ClothProps as DressClothProps, DressItem }   from '@/components/dressup/items/Dresses'
import type { CoatProps as CoatClothProps, CoatItem }      from '@/components/dressup/items/Coats'
import type { HairProps, HairStyle }                       from '@/components/dressup/items/Hairs'
import type { BackgroundProps, BackgroundItem }            from '@/components/dressup/items/Backgrounds'
import type { ShoeProps, ShoeItem }                        from '@/components/dressup/items/Shoes'
import type { SleeveProps, SleeveItem }                    from '@/components/dressup/items/Sleeves'
import type { DecorationProps, DecorationItem }            from '@/components/dressup/items/Decorations'
import type { GlassesProps, GlassesItem }                  from '@/components/dressup/items/FaceAndGlasses'
import type { FaceAccProps, FaceAccItem }                  from '@/components/dressup/items/FaceAcc'
import type { HairAccProps, HairAccItem }                  from '@/components/dressup/items/HairAcc'
import type { HatProps, HatItem }                          from '@/components/dressup/items/Hats'
import type { GloveProps, GloveItem }                      from '@/components/dressup/items/Gloves'
import type { BraceletProps, BraceletItem }                from '@/components/dressup/items/Bracelets'
import type { HandDecoProps, HandDecoItem }                from '@/components/dressup/items/HandDec'
import type { RingProps, RingItem }                        from '@/components/dressup/items/Rings'
import type { NecklaceProps, NecklaceItem }                from '@/components/dressup/items/Necklaces'
 
import { TOP_ITEMS }        from '@/components/dressup/items/Tops'
import { BOTTOM_ITEMS }     from '@/components/dressup/items/Bottoms'
import { DRESS_ITEMS }      from '@/components/dressup/items/Dresses'
import { COAT_ITEMS }       from '@/components/dressup/items/Coats'
import { HAIR_STYLES }      from '@/components/dressup/items/Hairs'
import { BACKGROUND_ITEMS } from '@/components/dressup/items/Backgrounds'
import { SHOE_ITEMS }       from '@/components/dressup/items/Shoes'
import { SLEEVE_ITEMS }     from '@/components/dressup/items/Sleeves'
import { DECORATION_ITEMS } from '@/components/dressup/items/Decorations'
import { GLASSES_ITEMS }    from '@/components/dressup/items/FaceAndGlasses'
import { FACE_ACC_ITEMS }   from '@/components/dressup/items/FaceAcc'
import { HAIR_ACC_ITEMS }   from '@/components/dressup/items/HairAcc'
import { HAT_ITEMS }        from '@/components/dressup/items/Hats'
import { GLOVE_ITEMS }      from '@/components/dressup/items/Gloves'
import { BRACELET_ITEMS }   from '@/components/dressup/items/Bracelets'
import { HAND_DECO_ITEMS }  from '@/components/dressup/items/HandDec'
import { RING_ITEMS }       from '@/components/dressup/items/Rings'
import { NECKLACE_ITEMS }   from '@/components/dressup/items/Necklaces'
 
export type CategoryId =
  | 'background'
  | 'hair'
  | 'top'
  | 'bottom'
  | 'dress'
  | 'coat'
  | 'shoe'
  | 'sleeve'         // ✅ New: detachable sleeves
  | 'decoration'
  | 'glasses'
  | 'faceAcc'
  | 'hairAcc'
  | 'hat'
  | 'handDeco'
  | 'ring'
  | 'glove'
  | 'bracelet'
  | 'necklace'
 
export interface Category {
  id: CategoryId
  label: string
  icon: string
  supportsColor: boolean
  palette: string[]
}
 
export interface CategoryGroup {
  id: string
  label: string
  icon: string
  children: CategoryId[]
}
 
export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'scene',
    label: 'Background',
    icon: '🏛️',
    children: ['background'],
  },
  {
    id: 'face',
    label: 'Face',
    icon: '👄',
    children: ['glasses', 'faceAcc'],
  },
  {
    id: 'hair',
    label: 'Hair',
    icon: '💇‍♀️',
    children: ['hair', 'hairAcc', 'hat'],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    icon: '👗',
    children: ['top', 'bottom', 'dress', 'coat', 'sleeve'],
  },
  {
    id: 'neck',
    label: 'Necklaces',
    icon: '📿',
    children: ['necklace'],
  },
  {
    id: 'hands',
    label: 'Hands',
    icon: '🤲',
    children: ['handDeco', 'ring', 'glove', 'bracelet'],
  },
  {
    id: 'other',
    label: 'Other',
    icon: '✨',
    children: ['shoe', 'decoration'],
  },
]
 
export const CATEGORIES: Category[] = [
  // ── Scene ────────────────────────────────────────────────────────────────
  { id: 'background', label: 'Background', icon: '🏛️', supportsColor: false, palette: [] },
  
  // ── Face ──────────────────────────────────────────────────────────────────
  { id: 'glasses', label: 'Glasses', icon: '👓', supportsColor: false, palette: [] },
  { id: 'faceAcc', label: 'Face Acc.', icon: '💄', supportsColor: false, palette: [] },
  
  // ── Hair ──────────────────────────────────────────────────────────────────
  { id: 'hair', label: 'Hairstyle', icon: '💇‍♀️', supportsColor: false, palette: [] },
  { id: 'hairAcc', label: 'Hair Acc.', icon: '🎀', supportsColor: false, palette: [] },
  { id: 'hat', label: 'Hats', icon: '🎩', supportsColor: false, palette: [] },
  
  // ── Clothing ──────────────────────────────────────────────────────────────
  { id: 'top', label: 'Tops', icon: '👚', supportsColor: false, palette: [] },
  { id: 'bottom', label: 'Bottoms', icon: '👖', supportsColor: false, palette: [] },
  { id: 'dress', label: 'Dresses', icon: '👗', supportsColor: false, palette: [] },
  { id: 'coat', label: 'Coats', icon: '🧥', supportsColor: false, palette: [] },
  { id: 'sleeve', label: 'Sleeves', icon: '💪', supportsColor: false, palette: [] },
  
  // ── Neck ──────────────────────────────────────────────────────────────────
  { id: 'necklace', label: 'Necklaces', icon: '📿', supportsColor: false, palette: [] },
  
  // ── Hands ──────────────────────────────────────────────────────────────────
  { id: 'handDeco', label: 'Hand Deco.', icon: '💅', supportsColor: false, palette: [] },
  { id: 'ring', label: 'Rings', icon: '💍', supportsColor: false, palette: [] },
  { id: 'glove', label: 'Gloves', icon: '🧤', supportsColor: false, palette: [] },
  { id: 'bracelet', label: 'Bracelets', icon: '📿', supportsColor: false, palette: [] },
  
  // ── Other ──────────────────────────────────────────────────────────────────
  { id: 'shoe', label: 'Shoes', icon: '👟', supportsColor: false, palette: [] },
  { id: 'decoration', label: 'Decorations', icon: '🌷', supportsColor: false, palette: [] },
]

export interface AnyItem {
  id: string
  name: string
  Component: ComponentType<{
    color?: string
    trim?: string
    highlight?: string
    align?: { x: number; y: number; scale: number }
  }>
}
 
export const ITEMS_BY_CATEGORY: Record<CategoryId, AnyItem[]> = {
  background:  BACKGROUND_ITEMS as unknown as AnyItem[],
  hair: HAIR_STYLES.map((h: HairStyle) => ({
    id: h.id,
    name: h.name,
    Component: h.front as unknown as AnyItem['Component'],
  })),
  top:         TOP_ITEMS        as unknown as AnyItem[],
  bottom:      BOTTOM_ITEMS     as unknown as AnyItem[],
  dress:       DRESS_ITEMS      as unknown as AnyItem[],
  coat:        COAT_ITEMS       as unknown as AnyItem[],
  shoe:        SHOE_ITEMS       as unknown as AnyItem[],
  sleeve:      SLEEVE_ITEMS     as unknown as AnyItem[],
  decoration:  DECORATION_ITEMS as unknown as AnyItem[],
  glasses:     GLASSES_ITEMS    as unknown as AnyItem[],
  faceAcc:     FACE_ACC_ITEMS   as unknown as AnyItem[],
  hairAcc:     HAIR_ACC_ITEMS   as unknown as AnyItem[],
  hat:         HAT_ITEMS        as unknown as AnyItem[],
  handDeco:    HAND_DECO_ITEMS  as unknown as AnyItem[],
  ring:        RING_ITEMS       as unknown as AnyItem[],
  glove:       GLOVE_ITEMS      as unknown as AnyItem[],
  bracelet:    BRACELET_ITEMS   as unknown as AnyItem[],
  necklace:    NECKLACE_ITEMS   as unknown as AnyItem[],
}
 
export {
  HAIR_STYLES, TOP_ITEMS, BOTTOM_ITEMS, DRESS_ITEMS, COAT_ITEMS,
  BACKGROUND_ITEMS, SHOE_ITEMS, SLEEVE_ITEMS, DECORATION_ITEMS,
  GLASSES_ITEMS, FACE_ACC_ITEMS, HAIR_ACC_ITEMS, HAT_ITEMS,
  GLOVE_ITEMS, BRACELET_ITEMS, HAND_DECO_ITEMS, RING_ITEMS, NECKLACE_ITEMS,
}
 
export type {
  ClothProps, BottomClothProps, DressClothProps, CoatClothProps,
  HairProps, BackgroundProps, ShoeProps, SleeveProps, DecorationProps,
  GlassesProps, FaceAccProps, HairAccProps, HatProps,
  GloveProps, BraceletProps, HandDecoProps, RingProps, NecklaceProps,
}
