'use client'

/**
 * DressupGame.tsx — Main game page with tabs, outfit saving, and randomize.
 */

import { useState, useEffect } from 'react'
import { useDressup } from '@/lib/dressup/useDressup'
import { StageCanvas } from './StageCanvas'
import { Sidebar } from './Sidebar'
import { CANVAS_ASPECT_RATIO, CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/dressup/canvas-dimensions'
import {
  TOP_ITEMS,
  BOTTOM_ITEMS,
  DRESS_ITEMS,
  COAT_ITEMS,
  HAIR_STYLES,
  BACKGROUND_ITEMS,
  SHOE_ITEMS,
  HAT_ITEMS,
  HAIR_ACC_ITEMS,
  GLASSES_ITEMS,
  FACE_ACC_ITEMS,
  GLOVE_ITEMS,
  BRACELET_ITEMS,
  HAND_DECO_ITEMS,
  RING_ITEMS,
  NECKLACE_ITEMS,
  SLEEVE_ITEMS,
} from '@/lib/dressup/items'

interface SavedOutfit {
  id: string
  name: string
  selection: any
  colors: any
  timestamp: number
}

export function DressupGame() {
  const game = useDressup()
  const [outfitName, setOutfitName] = useState('')
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([])
  const [selectedOutfitId, setSelectedOutfitId] = useState<string | null>(null)
  const [tabs, setTabs] = useState<string[]>(['main'])
  const [activeTab, setActiveTab] = useState('main')

  // Load saved outfits from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dressup-saved-outfits')
    if (saved) {
      try {
        setSavedOutfits(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved outfits:', e)
      }
    }
  }, [])

  // Save outfits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dressup-saved-outfits', JSON.stringify(savedOutfits))
  }, [savedOutfits])

  const alignOverride = game.alignMode
    ? { category: game.activeCategory, values: game.getCurrentAlignment() }
    : null

  // ── Randomize ──────────────────────────────────────────────────────────────
  const handleRandomize = () => {
    const randomItem = (items: any[]) => {
      if (!items || items.length === 0) return null
      return items[Math.floor(Math.random() * items.length)].id
    }

    // Randomly decide if wearing dress or top+bottom
    const wearDress = Math.random() > 0.5

    const randomSelection = {
      background: randomItem(BACKGROUND_ITEMS),
      hair: randomItem(HAIR_STYLES),
      top: wearDress ? null : randomItem(TOP_ITEMS),
      bottom: wearDress ? null : randomItem(BOTTOM_ITEMS),
      dress: wearDress ? randomItem(DRESS_ITEMS) : null,
      coat: Math.random() > 0.7 ? randomItem(COAT_ITEMS) : null,
      shoe: randomItem(SHOE_ITEMS),
      sleeve: Math.random() > 0.8 ? randomItem(SLEEVE_ITEMS) : null,
      decoration: null,
      glasses: Math.random() > 0.7 ? randomItem(GLASSES_ITEMS) : null,
      faceAcc: Math.random() > 0.7 ? randomItem(FACE_ACC_ITEMS) : null,
      hairAcc: Math.random() > 0.7 ? randomItem(HAIR_ACC_ITEMS) : null,
      hat: Math.random() > 0.7 ? randomItem(HAT_ITEMS) : null,
      handDeco: Math.random() > 0.8 ? randomItem(HAND_DECO_ITEMS) : null,
      ring: Math.random() > 0.8 ? randomItem(RING_ITEMS) : null,
      glove: Math.random() > 0.8 ? randomItem(GLOVE_ITEMS) : null,
      bracelet: Math.random() > 0.8 ? randomItem(BRACELET_ITEMS) : null,
      necklace: Math.random() > 0.8 ? randomItem(NECKLACE_ITEMS) : null,
    }

    game.setSelection(randomSelection)
  }

  // ── Save Outfit ────────────────────────────────────────────────────────────
  const handleSaveOutfit = () => {
    if (!outfitName.trim()) {
      alert('Please enter a name for your outfit')
      return
    }

    const newOutfit: SavedOutfit = {
      id: `outfit-${Date.now()}`,
      name: outfitName.trim(),
      selection: { ...game.selection },
      colors: { ...game.colors },
      timestamp: Date.now(),
    }

    setSavedOutfits([...savedOutfits, newOutfit])
    setOutfitName('')
    setSelectedOutfitId(newOutfit.id)
  }

  // ── Load Outfit ────────────────────────────────────────────────────────────
  const handleLoadOutfit = (outfit: SavedOutfit) => {
    game.setSelection(outfit.selection)
    game.setColors(outfit.colors)
    setSelectedOutfitId(outfit.id)
  }

  // ── Delete Outfit ──────────────────────────────────────────────────────────
  const handleDeleteOutfit = (id: string) => {
    setSavedOutfits(savedOutfits.filter(o => o.id !== id))
    if (selectedOutfitId === id) {
      setSelectedOutfitId(null)
    }
  }

  // ── Tabs ────────────────────────────────────────────────────────────────────
  const addTab = () => {
    const newTabId = `tab-${Date.now()}`
    setTabs([...tabs, newTabId])
    setActiveTab(newTabId)
    // Reset the game for new tab
    game.reset()
  }

  const removeTab = (tabId: string) => {
    if (tabs.length <= 1) return
    const newTabs = tabs.filter(t => t !== tabId)
    setTabs(newTabs)
    if (activeTab === tabId) {
      setActiveTab(newTabs[newTabs.length - 1])
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50/40 to-stone-100">
      {/* ── HEADER WITH TABS ── */}
      <header className="flex shrink-0 flex-col border-b border-stone-300/60 bg-stone-50/90 backdrop-blur">
        {/* Tab bar */}
        <div className="flex items-center gap-1 px-2 pt-2 overflow-x-auto">
          {tabs.map((tabId) => (
            <div
              key={tabId}
              className={`flex items-center gap-1 rounded-t-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === tabId
                  ? 'bg-white text-stone-800 shadow-sm'
                  : 'bg-stone-100/80 text-stone-500 hover:bg-stone-200'
              }`}
            >
              <button
                onClick={() => setActiveTab(tabId)}
                className="max-w-[120px] truncate"
              >
                {tabId === 'main' ? 'Main' : `Tab ${tabs.indexOf(tabId)}`}
              </button>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTab(tabId)
                  }}
                  className="ml-1 rounded-full p-0.5 hover:bg-stone-300/50 text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addTab}
            className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-stone-500 hover:bg-stone-200"
          >
            +
          </button>
        </div>

        {/* Header controls */}
        <div className="flex items-center justify-between px-5 py-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪡</span>
            <div>
              <h1 className="font-serif text-xl font-semibold leading-tight tracking-wide text-stone-800">
                Atelier — Dress-Up Studio
              </h1>
              <p className="text-[11px] italic tracking-wide text-stone-500">
                A sophisticated styling experience
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => game.setAlignMode(!game.alignMode)}
              className={
                game.alignMode
                  ? 'rounded-md bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-amber-600'
                  : 'rounded-md border border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-all hover:bg-amber-100'
              }
            >
              🔧 Align {game.alignMode ? 'ON' : 'OFF'}
            </button>
            <button
              type="button"
              onClick={handleRandomize}
              className="rounded-md bg-gradient-to-r from-stone-700 to-stone-900 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-50 shadow-sm transition-all hover:scale-105 hover:shadow-md"
            >
              ✦ Surprise Look
            </button>
            <button
              type="button"
              onClick={game.reset}
              className="rounded-md border border-stone-400 bg-stone-50 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-700 transition-all hover:bg-stone-100"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex min-h-0 flex-1 gap-3 overflow-hidden p-3">
        {/* ── LEFT SIDEBAR - Saved Outfits ── */}
        <aside className="flex w-[200px] shrink-0 flex-col overflow-hidden rounded-sm border border-stone-300 bg-stone-50/95 shadow-xl">
          <div className="border-b border-stone-200 p-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Saved Outfits</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {savedOutfits.length === 0 ? (
              <p className="text-center text-xs text-stone-400 py-4">No saved outfits yet</p>
            ) : (
              <div className="space-y-1.5">
                {savedOutfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    className={`group flex items-center gap-1 rounded-md p-1.5 text-sm transition-all cursor-pointer ${
                      selectedOutfitId === outfit.id
                        ? 'bg-stone-200 ring-1 ring-stone-400'
                        : 'hover:bg-stone-100'
                    }`}
                    onClick={() => handleLoadOutfit(outfit)}
                  >
                    <span className="flex-1 truncate text-xs font-medium">{outfit.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteOutfit(outfit.id)
                      }}
                      className="rounded p-0.5 text-stone-400 opacity-0 transition-opacity hover:bg-stone-300 hover:text-stone-700 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ── CANVAS ── */}
        <section className="flex min-w-0 flex-1 flex-col items-center justify-center overflow-hidden">
          {/* Outfit name input */}
          <div className="flex w-full max-w-[475px] items-center gap-2 pb-2">
            <input
              type="text"
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              placeholder="Name your outfit..."
              className="flex-1 rounded-md border border-stone-300 px-3 py-1.5 text-sm outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveOutfit()
              }}
            />
            <button
              onClick={handleSaveOutfit}
              className="rounded-md bg-stone-700 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-stone-800"
            >
              💾 Save
            </button>
          </div>

          <div
            className="relative h-full max-h-full overflow-hidden rounded-sm border border-stone-300 bg-stone-50 shadow-xl"
            style={{
              aspectRatio: CANVAS_ASPECT_RATIO,
              height: `min(100%, calc((100vw - 380px) * ${CANVAS_HEIGHT} / ${CANVAS_WIDTH}))`,
            }}
          >
            <StageCanvas
              selection={game.selection}
              colors={game.colors}
              alignments={game.alignments}
              alignOverride={alignOverride}
            />
            {game.alignMode && (
              <div className="pointer-events-none absolute left-2 top-2 rounded bg-amber-500/90 px-2 py-1 text-[10px] font-bold text-white shadow">
                🔧 ALIGN MODE — use arrow keys to nudge
              </div>
            )}
          </div>
        </section>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="flex w-[340px] shrink-0 flex-col overflow-hidden rounded-sm border border-stone-300 bg-stone-50/95 shadow-xl">
          <Sidebar
            selection={game.selection}
            colors={game.colors}
            activeCategory={game.activeCategory}
            onSelectCategory={game.setActiveCategory}
            onSelectItem={game.selectItem}
            onSetColor={game.setColor}
            alignMode={game.alignMode}
            currentAlignment={game.getCurrentAlignment()}
            onAlignmentChange={game.setCurrentAlignment}
            onAlignmentReset={game.resetCurrentAlignment}
          />
        </aside>
      </main>

      {/* ── FOOTER ── */}
      <footer className="flex shrink-0 items-center justify-center gap-4 border-t border-stone-300/60 bg-stone-50/90 px-4 py-1.5 text-[10px] tracking-wide text-stone-500 backdrop-blur">
        <span>Choose a category, pick a color, then select an item to wear.</span>
        <span className="hidden text-stone-400 sm:inline">·</span>
        <span className="hidden sm:inline italic">Dresses replace tops &amp; bottoms automatically.</span>
      </footer>
    </div>
  )
}

export default DressupGame
