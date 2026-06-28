'use client'

export interface DecorationProps {
  color?: string
  trim?: string
  align?: { x: number; y: number; scale: number }
}

export interface DecorationItem {
  id: string
  name: string
  Component: React.FC<DecorationProps>
}

export const DECORATION_ITEMS: DecorationItem[] = []
export default DECORATION_ITEMS
