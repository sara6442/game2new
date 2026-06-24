'use client'

/**
 * Shoes.tsx — Footwear (shoes, boots, heels, sneakers, etc.).
 *
 * Currently EMPTY. The user will upload their own shoe files later.
 */

export interface ShoeProps {
  color?: string
  trim?: string
}

export interface ShoeItem {
  id: string
  name: string
  Component: React.FC<ShoeProps>
}

export const SHOE_ITEMS: ShoeItem[] = []

export default SHOE_ITEMS
