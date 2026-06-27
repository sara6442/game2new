'use client'

/**
 * Sidebar.tsx — Right-side control panel with grouped categories.
 */

import { useState } from 'react'
import {
  CATEGORIES,
  CATEGORY_GROUPS,
  ITEMS_BY_CATEGORY,
  type CategoryId,
} from '@/lib/dressup/items'
import { CANVAS_VIEWBOX, BODY_TRANSFORM } from '@/lib/dressup/canvas-dimensions'
import { Body } from './items/Body'
import { HAIR_STYLES } from '@/lib/dressup/items'
import AlignmentPanel from './AlignmentPanel'
import type { AlignmentValues } from '@/lib/dressup/useDressup'
import { cn } from '@/lib/utils'

interface SidebarProps {
  selection: Record<CategoryId, string | null>
  colors: Record<CategoryId, string>
  activeCategory: CategoryId
  onSelectCategory: (id: CategoryId) => void
  onSelectItem: (categoryId: CategoryId, itemId: string | null) => void
  onSetColor: (categoryId: CategoryId, color: string) => void
  alignMode: boolean
  currentAlignment: AlignmentValues
  onAlignmentChange: (values: AlignmentValues) => void
  onAlignmentReset: () => void
}

function getTrimFor(color: string): string {
  if (color.startsWith('#') && color.length === 7) {
    const r = Math.max(0, parseInt(color.slice(1, 3), 16) - 40)
    const g = Math.max(0, parseInt(color.slice(3, 5), 16) - 40)
    const b = Math.max(0, parseInt(color.slice(5, 7), 16) - 40)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
  return color
}

const HAIR_STYLES_LOOKUP = Object.fromEntries(
  HAIR_STYLES.map((h) => [h.id, h]),
) as Record<string, (typeof HAIR_STYLES)[number]>

export function Sidebar({
  selection,
  colors,
  activeCategory,
  onSelectCategory,
  onSelectItem,
  onSetColor,
  alignMode,
  currentAlignment,
  onAlignmentChange,
  onAlignmentReset,
}: SidebarProps) {
  const activeGroup = CATEGORY_GROUPS.find((g) => g.children.includes(activeCategory))
  const [openGroupId, setOpenGroupId] = useState<string>(activeGroup?.id ?? CATEGORY_GROUPS[0].id)

  const currentGroup = CATEGORY_GROUPS.find((g) => g.id === openGroupId) ?? CATEGORY_GROUPS[0]
  const subCats = currentGroup.children
    .map((id) => CATEGORIES.find((c) => c.id === id)!)
    .filter(Boolean)

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory)!
  const items = ITEMS_BY_CATEGORY[activeCategory] ?? []
  const selectedItemId = selection[activeCategory]
  const activeColor = colors[activeCategory]

  const groupHasSelection = (groupId: string) => {
    const group = CATEGORY_GROUPS.find((g) => g.id === groupId)
    return group?.children.some((id) => selection[id] !== null) ?? false
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">

      {/* ── GROUP TABS ── */}
      <div className="shrink-0 border-b border-stone-200 bg-stone-50 px-2 pt-2">
        <div className="flex flex-wrap gap-1 pb-2">
          {CATEGORY_GROUPS.map((group) => {
            const isOpen = group.id === openGroupId
            const hasSel = groupHasSelection(group.id)
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  setOpenGroupId(group.id)
                  if (!group.children.includes(activeCategory)) {
                    onSelectCategory(group.children[0])
                  }
                }}
                className={cn(
                  'relative flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold tracking-wide transition-all',
                  isOpen
                    ? 'bg-stone-800 text-amber-50 shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200',
                )}
              >
                <span>{group.icon}</span>
                <span>{group.label}</span>
                {hasSel && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
              </button>
            )
          })}
        </div>

        {/* ── SUB-CATEGORY PILLS ── */}
        {subCats.length > 1 && (
          <div className="flex gap-1 pb-2 overflow-x-auto">
            {subCats.map((cat) => {
              const isActive = cat.id === activeCategory
              const hasSel = selection[cat.id] !== null
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={cn(
                    'relative flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide transition-all',
                    isActive
                      ? 'border-stone-700 bg-stone-700 text-white'
                      : 'border-stone-300 bg-white text-stone-600 hover:border-stone-500',
                  )}
                >
                  <span className="text-sm leading-none">{cat.icon}</span>
                  <span>{cat.label}</span>
                  {hasSel && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── ALIGNMENT PANEL ── */}
      {alignMode && (
        <div className="shrink-0 border-b border-stone-200">
          <AlignmentPanel
            selectedId={selectedItemId}
            offset={currentAlignment}
            onNudge={(dx, dy) =>
              onAlignmentChange({
                ...currentAlignment,
                x: currentAlignment.x + dx,
                y: currentAlignment.y + dy,
              })
            }
            onScaleChange={(scale) =>
              onAlignmentChange({ ...currentAlignment, scale })
            }
          />
        </div>
      )}

      {/* ── COLOR PICKER ── */}
      {activeCat.supportsColor && (
        <div className="shrink-0 border-b border-stone-200 bg-stone-50/60 p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">Color</span>
            <span className="flex items-center gap-1 text-[10px] text-stone-500">
              <span
                className="inline-block h-3 w-3 rounded-full border border-stone-400"
                style={{ background: activeColor }}
                aria-hidden
              />
              <span className="italic">current</span>
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {activeCat.palette.map((color) => {
              const isSelected = activeColor.toLowerCase() === color.toLowerCase()
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onSetColor(activeCategory, color)}
                  className={cn(
                    'aspect-square rounded-sm border-2 transition-all hover:scale-110',
                    isSelected ? 'border-stone-800 ring-1 ring-stone-500' : 'border-stone-50 shadow-sm',
                  )}
                  style={{ background: color }}
                  aria-label={`Pick color ${color}`}
                  title={color}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* ── ITEM GRID ── */}
      <div className="flex min-h-0 flex-1 flex-col bg-white p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">
            {activeCat.label}
          </span>
          {selectedItemId && (
            <button
              type="button"
              onClick={() => onSelectItem(activeCategory, null)}
              className="rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-stone-500 hover:bg-stone-100 hover:text-stone-700"
            >
              Remove
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-3 gap-2">

            {/* None tile */}
            <button
              type="button"
              onClick={() => onSelectItem(activeCategory, null)}
              className={cn(
                'flex aspect-square flex-col items-center justify-center rounded-md border text-[10px] font-medium tracking-wide transition-all',
                selectedItemId === null
                  ? 'border-stone-700 bg-stone-100 text-stone-800'
                  : 'border-dashed border-stone-300 bg-stone-50 text-stone-400 hover:border-stone-500',
              )}
            >
              <span className="text-lg leading-none">∅</span>
              <span className="mt-1">None</span>
            </button>

            {items.length === 0 && (
              <div className="col-span-2 flex aspect-square flex-col items-center justify-center rounded-md border border-dashed border-stone-300 bg-stone-50/50 p-3 text-center">
                <span className="text-2xl leading-none opacity-40">📦</span>
                <p className="mt-2 text-[10px] font-medium tracking-wide text-stone-400">No items yet</p>
              </div>
            )}

            {items.map((item) => {
              const isSelected = selectedItemId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(activeCategory, item.id)}
                  className={cn(
                    'group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-md border bg-gradient-to-b from-white to-stone-50/60 p-1 transition-all',
                    isSelected
                      ? 'border-stone-800 ring-1 ring-stone-500'
                      : 'border-stone-200 hover:border-stone-500 hover:shadow-md',
                  )}
                  title={item.name}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      viewBox={CANVAS_VIEWBOX}
                      className="h-full w-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {activeCategory === 'background' ? (
                        <item.Component />
                      ) : (
                        <g transform={BODY_TRANSFORM}>
                          {/* Body in previews always uses the default bra body */}
                          {activeCategory !== 'hair' && <Body src="/Body-H-B.png" />}
                          {activeCategory === 'hair' ? (
                            <>
                              {(() => {
                                const hs = HAIR_STYLES_LOOKUP[item.id]
                                return hs ? (
                                  <>
                                    <hs.back color={activeColor} />
                                    <Body src="/Body-H-B.png" />
                                    <hs.front color={activeColor} />
                                  </>
                                ) : null
                              })()}
                            </>
                          ) : (
                            <item.Component
                              color={activeColor}
                              trim={getTrimFor(activeColor)}
                            />
                          )}
                        </g>
                      )}
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/85 px-1 py-0.5 text-center text-[9px] font-medium tracking-wide text-stone-700 backdrop-blur-sm">
                    {item.name}
                  </div>
                  {isSelected && (
                    <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-800 text-[9px] text-amber-50 shadow">
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
