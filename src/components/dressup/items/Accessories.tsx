'use client'
export interface AccessoryProps { color?: string; trim?: string }
export interface AccessoryItem { id: string; name: string; Component: React.FC<AccessoryProps> }
export const ACCESSORY_ITEMS: AccessoryItem[] = []
export default ACCESSORY_ITEMS
