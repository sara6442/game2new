'use client'

/**
 * Decorations.tsx — Scene decorations (props, flowers, objects, etc.).
 *
 * Currently EMPTY. The user will upload their own decoration files later.
 */

export interface DecorationProps {
  color?: string
  trim?: string
}

export interface DecorationItem {
  id: string
  name: string
  Component: React.FC<DecorationProps>
}

export const DECORATION_ITEMS: DecorationItem[] = []

export default DECORATION_ITEMS
