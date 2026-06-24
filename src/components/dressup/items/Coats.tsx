'use client'

/**
 * Coats.tsx — Coats and jackets (outerwear).
 *
 * Currently EMPTY. The user will upload their own coat files later.
 * Add them to the COAT_ITEMS array below to populate this category.
 *
 * LAYERING:
 * Coats are drawn ABOVE the top/dress (z=5.5, between dress and hair
 * front) so the coat appears in front of the underlying garment.
 *
 * SLEEVE LOGIC (implemented in useDressup.ts):
 * When a coat is selected:
 *   - If the current top or dress has 'long' sleeves → switch to the
 *     default top (top4, which has short sleeves)
 *   - If the current top or dress has 'short' sleeves → keep it, the
 *     coat layers in front
 *
 * Each coat PNG should be 325 × 742 with transparent background,
 * matching the body's coordinate system.
 */

export interface CoatProps {
  color?: string
  trim?: string
}

export interface CoatItem {
  id: string
  name: string
  Component: React.FC<CoatProps>
}

export const COAT_ITEMS: CoatItem[] = []

export default COAT_ITEMS
