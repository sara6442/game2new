'use client'

/**
 * DressupGame.tsx — Main game page.
 *
 * Includes an ALIGN MODE toggle (🔧 button in the header) that lets
 * the user manually adjust the position of hairstyles and dresses.
 */

import { useDressup } from '@/lib/dressup/useDressup'
import { StageCanvas } from './StageCanvas'
import { Sidebar } from './Sidebar'
import { CANVAS_ASPECT_RATIO, CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/dressup/canvas-dimensions'

export function DressupGame() {
  const game = useDressup()

  // Compute the alignment override for the canvas (only in align mode)
  const alignOverride = game.alignMode
    ? {
        category: game.activeCategory,
        values: game.getCurrentAlignment(),
      }
    : null

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50/40 to-stone-100">
      {/* ====== HEADER ====== */}
      <header className="flex shrink-0 items-center justify-between border-b border-stone-300/60 bg-stone-50/90 px-5 py-2.5 backdrop-blur">
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
          {/* Align Mode toggle */}
          <button
            type="button"
            onClick={() => game.setAlignMode(!game.alignMode)}
            className={
              game.alignMode
                ? 'rounded-md bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-amber-600'
                : 'rounded-md border border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-all hover:bg-amber-100'
            }
            title="Toggle alignment mode to adjust hair/dress positions"
          >
            🔧 Align {game.alignMode ? 'ON' : 'OFF'}
          </button>
          <button
            type="button"
            onClick={game.randomize}
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
      </header>

      {/* ====== MAIN BODY ====== */}
      <main className="flex min-h-0 flex-1 gap-3 overflow-hidden p-3">
        {/* ----- LEFT: MODEL CANVAS ----- */}
        <section className="flex min-w-0 flex-1 items-center justify-center overflow-hidden">
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
              alignOverride={alignOverride}
            />
            {/* Align mode indicator overlay */}
            {game.alignMode && (
              <div className="pointer-events-none absolute left-2 top-2 rounded bg-amber-500/90 px-2 py-1 text-[10px] font-bold text-white shadow">
                🔧 ALIGN MODE — use arrow keys to nudge
              </div>
            )}
          </div>
        </section>

        {/* ----- RIGHT: SIDEBAR (tall, fixed-width) ----- */}
        <aside
          className="flex w-[340px] shrink-0 flex-col overflow-hidden rounded-sm border border-stone-300 bg-stone-50/95 shadow-xl"
        >
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

      {/* ====== FOOTER ====== */}
      <footer className="flex shrink-0 items-center justify-center gap-4 border-t border-stone-300/60 bg-stone-50/90 px-4 py-1.5 text-[10px] tracking-wide text-stone-500 backdrop-blur">
        <span>Choose a category, pick a color, then select an item to wear.</span>
        <span className="hidden text-stone-400 sm:inline">·</span>
        <span className="hidden sm:inline italic">Dresses replace tops &amp; bottoms automatically.</span>
      </footer>
    </div>
  )
}

export default DressupGame
