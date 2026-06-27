/**
 * items.ts — Central registry of all dress-up categories and items.
 *
 * New categories added:
 *   glasses     — face accessories (glasses go under hair; face9 goes over hair)
 *   hairAcc     — hair clips/pins (mutually exclusive with hats)
 *   hat         — hats (mutually exclusive with hairAcc)
 *   handDeco    — nails/henna (lowest hand layer)
 *   glove       — gloves (above handDeco, under bracelets)
 *   bracelet    — bracelets (above gloves, all hand items under long sleeves)
 */
 
import type { ComponentType } from 'react'
import type { ClothProps, TopItem }                       from '@/components/dressup/items/Tops'
import type { ClothProps as BottomClothProps, BottomItem } from '@/components/dressup/items/Bottoms'
import type { ClothProps as DressClothProps, DressItem }   from '@/components/dressup/items/Dresses'
import type { ClothProps as CoatClothProps, CoatItem }     from '@/components/dressup/items/Coats'
import type { HairProps, HairStyle }                       from '@/components/dressup/items/Hairs'
import type { BackgroundProps, BackgroundItem }            from '@/components/dressup/items/Backgrounds'
import type { AccessoryProps, AccessoryItem }              from '@/components/dressup/items/Accessories'
import type { ShoeProps, ShoeItem }                        from '@/components/dressup/items/Shoes'
import type { DecorationProps, DecorationItem }            from '@/components/dressup/items/Decorations'
import type { GlassesProps, GlassesItem }                  from '@/components/dressup/items/Glasses'
import type { HairAccProps, HairAccItem }                  from '@/components/dressup/items/HairAccessories'
import type { HatProps, HatItem }                          from '@/components/dressup/items/Hats'
import type { GloveProps, GloveItem }                      from '@/components/dressup/items/Gloves'
import type { BraceletProps, BraceletItem }                from '@/components/dressup/items/Bracelets'
import type { HandDecoProps, HandDecoItem }                from '@/components/dressup/items/HandDecorations'
 
import { TOP_ITEMS }        from '@/components/dressup/items/Tops'
import { BOTTOM_ITEMS }     from '@/components/dressup/items/Bottoms'
import { DRESS_ITEMS }      from '@/components/dressup/items/Dresses'
import { COAT_ITEMS }       from '@/components/dressup/items/Coats'
import { HAIR_STYLES }      from '@/components/dressup/items/Hairs'
import { BACKGROUND_ITEMS } from '@/components/dressup/items/Backgrounds'
import { ACCESSORY_ITEMS }  from '@/components/dressup/items/Accessories'
import { SHOE_ITEMS }       from '@/components/dressup/items/Shoes'
import { DECORATION_ITEMS } from '@/components/dressup/items/Decorations'
import { GLASSES_ITEMS }    from '@/components/dressup/items/Glasses'
import { HAIR_ACC_ITEMS }   from '@/components/dressup/items/HairAccessories'
import { HAT_ITEMS }        from '@/components/dressup/items/Hats'
import { GLOVE_ITEMS }      from '@/components/dressup/items/Gloves'
import { BRACELET_ITEMS }   from '@/components/dressup/items/Bracelets'
import { HAND_DECO_ITEMS }  from '@/components/dressup/items/HandDecorations'
 
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
  | 'glasses'    // face accessories — most go under hair, face9 goes over
  | 'hairAcc'    // hair clips/pins — mutually exclusive with hat
  | 'hat'        // hats — mutually exclusive with hairAcc
  | 'handDeco'   // nails, henna — lowest hand layer
  | 'glove'      // gloves — above handDeco, under bracelet
  | 'bracelet'   // bracelets — above gloves, all under long sleeves
 
export interface Category {
  id: CategoryId
  label: string
  icon: string
  supportsColor: boolean
  palette: string[]
}
 
export const CATEGORIES: Category[] = [
  // ── Scene ────────────────────────────────────────────────────────────────
  { id: 'background', label: 'Background',  icon: '🏛️',  supportsColor: false, palette: [] },
 
  // ── Head / Hair ───────────────────────────────────────────────────────────
  { id: 'hair',       label: 'Hairstyle',   icon: '💇‍♀️', supportsColor: false, palette: [] },
  { id: 'hat',        label: 'Hats',        icon: '🎩',  supportsColor: false, palette: [] },
  { id: 'hairAcc',    label: 'Hair Acc.',   icon: '🎀',  supportsColor: false, palette: [] },
  { id: 'glasses',    label: 'Face Acc.',   icon: '👓',  supportsColor: false, palette: [] },
 
  // ── Clothing ──────────────────────────────────────────────────────────────
  { id: 'top',        label: 'Tops',        icon: '👚',  supportsColor: false, palette: [] },
  { id: 'bottom',     label: 'Bottoms',     icon: '👖',  supportsColor: false, palette: [] },
  { id: 'dress',      label: 'Dresses',     icon: '👗',  supportsColor: false, palette: [] },
  { id: 'coat',       label: 'Coats',       icon: '🧥',  supportsColor: false, palette: [] },
 
  // ── Hands ────────────────────────────────────────────────────────────────
  { id: 'handDeco',   label: 'Hand Deco.',  icon: '💅',  supportsColor: false, palette: [] },
  { id: 'glove',      label: 'Gloves',      icon: '🧤',  supportsColor: false, palette: [] },
  { id: 'bracelet',   label: 'Bracelets',  icon: '📿',  supportsColor: false, palette: [] },
 
  // ── Other ────────────────────────────────────────────────────────────────
  { id: 'shoe',       label: 'Shoes',       icon: '👟',  supportsColor: false, palette: [] },
  { id: 'accessory',  label: 'Accessories', icon: '✨',  supportsColor: false, palette: [] },
  { id: 'decoration', label: 'Decorations', icon: '🌷',  supportsColor: false, palette: [] },
]
 
export interface AnyItem {
  id: string
  name: string
  Component: ComponentType<{ color?: string; trim?: string; highlight?: string; align?: { x: number; y: number; scale: number } }>
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
  accessory:   ACCESSORY_ITEMS  as unknown as AnyItem[],
  decoration:  DECORATION_ITEMS as unknown as AnyItem[],
  glasses:     GLASSES_ITEMS    as unknown as AnyItem[],
  hairAcc:     HAIR_ACC_ITEMS   as unknown as AnyItem[],
  hat:         HAT_ITEMS        as unknown as AnyItem[],
  handDeco:    HAND_DECO_ITEMS  as unknown as AnyItem[],
  glove:       GLOVE_ITEMS      as unknown as AnyItem[],
  bracelet:    BRACELET_ITEMS   as unknown as AnyItem[],
}
 
export {
  HAIR_STYLES, TOP_ITEMS, BOTTOM_ITEMS, DRESS_ITEMS, COAT_ITEMS,
  BACKGROUND_ITEMS, ACCESSORY_ITEMS, SHOE_ITEMS, DECORATION_ITEMS,
  GLASSES_ITEMS, HAIR_ACC_ITEMS, HAT_ITEMS, GLOVE_ITEMS, BRACELET_ITEMS, HAND_DECO_ITEMS,
}
 
export type {
  ClothProps, BottomClothProps, DressClothProps, CoatClothProps,
  HairProps, BackgroundProps, AccessoryProps, ShoeProps, DecorationProps,
  GlassesProps, HairAccProps, HatProps, GloveProps, BraceletProps, HandDecoProps,
}
