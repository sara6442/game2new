'use client'

/**
 * AlignmentPanel.tsx — Interactive alignment tool.
 *
 * Lets the user adjust the X, Y, and scale of the currently-selected
 * hair or dress using arrow keys or +/- buttons. The adjusted values
 * are shown live and can be copied to the clipboard so the user can
 * paste them back to me.
 *
 * HOW TO USE:
 * 1. Click the "🔧 Align Mode" button (top-right of the sidebar)
 * 2. Select a hairstyle or dress from the categories
 * 3. Use the arrow buttons (or keyboard arrows) to nudge the item
 *    - Up/Down arrows: move Y (up = more negative)
 *    - Left/Right arrows: move X
 *    - +/- keys: scale up/down
 * 4. Click "Copy Values" to copy the alignment to your clipboard
 * 5. Paste the values back to me in the chat
 */

import { useState, useEffect, useCallback } from 'react'

export interface AlignmentValues {
  x: number
  y: number
  scale: number
}

interface AlignmentPanelProps {
  /** Currently active category */
  activeCategory: string
  /** Currently selected item id in the active category */
  selectedItemId: string | null
  /** Current alignment values for the selected item */
  values: AlignmentValues
  /** Called when the user adjusts the values */
  onValuesChange: (values: AlignmentValues) => void
  /** Called when the user clicks "Reset alignment" */
  onReset: () => void
}

export function AlignmentPanel({
  activeCategory,
  selectedItemId,
  values,
  onValuesChange,
  onReset,
}: AlignmentPanelProps) {
  const [copied, setCopied] = useState(false)

  // Only show for hair and dress categories
  const isAlignable = activeCategory === 'hair' || activeCategory === 'dress'

  // Keyboard arrow controls
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isAlignable || !selectedItemId) return

      const step = e.shiftKey ? 10 : 1  // Shift = 10x faster
      let { x, y, scale } = values

      switch (e.key) {
        case 'ArrowUp':
          y -= step
          e.preventDefault()
          break
        case 'ArrowDown':
          y += step
          e.preventDefault()
          break
        case 'ArrowLeft':
          x -= step
          e.preventDefault()
          break
        case 'ArrowRight':
          x += step
          e.preventDefault()
          break
        case '+':
        case '=':
          scale = Math.min(2, scale + 0.02)
          e.preventDefault()
          break
        case '-':
        case '_':
          scale = Math.max(0.3, scale - 0.02)
          e.preventDefault()
          break
        default:
          return
      }

      onValuesChange({ x, y, scale })
    },
    [isAlignable, selectedItemId, values, onValuesChange],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleCopy = useCallback(async () => {
    const text = `${selectedItemId}: { x: ${values.x}, y: ${values.y}, scale: ${values.scale} }`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: show the text so the user can copy manually
      window.prompt('Copy these values:', text)
    }
  }, [selectedItemId, values])

  if (!isAlignable) {
    return (
      <div className="shrink-0 rounded-md border border-amber-300 bg-amber-50 p-2 text-[10px] text-amber-700">
        🔧 Alignment mode is active. Select a <strong>hairstyle</strong> or <strong>dress</strong> to adjust its position.
      </div>
    )
  }

  if (!selectedItemId) {
    return (
      <div className="shrink-0 rounded-md border border-amber-300 bg-amber-50 p-2 text-[10px] text-amber-700">
        🔧 Select an item to align it.
      </div>
    )
  }

  const nudge = (dx: number, dy: number, ds: number) => {
    onValuesChange({
      x: values.x + dx,
      y: values.y + dy,
      scale: Math.max(0.3, Math.min(2, values.scale + ds)),
    })
  }

  return (
    <div className="shrink-0 rounded-md border-2 border-amber-400 bg-amber-50 p-2.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-800">
          🔧 Aligning: {selectedItemId}
        </span>
        <button
          type="button"
          onClick={onReset}
          className="rounded bg-amber-200 px-1.5 py-0.5 text-[9px] font-medium text-amber-800 hover:bg-amber-300"
        >
          Reset
        </button>
      </div>

      {/* Position display */}
      <div className="mb-2 grid grid-cols-3 gap-1 text-center text-[10px]">
        <div className="rounded bg-white px-1 py-0.5">
          <div className="text-[8px] text-gray-500">X</div>
          <div className="font-mono font-bold text-amber-800">{values.x}</div>
        </div>
        <div className="rounded bg-white px-1 py-0.5">
          <div className="text-[8px] text-gray-500">Y</div>
          <div className="font-mono font-bold text-amber-800">{values.y}</div>
        </div>
        <div className="rounded bg-white px-1 py-0.5">
          <div className="text-[8px] text-gray-500">Scale</div>
          <div className="font-mono font-bold text-amber-800">{values.scale.toFixed(2)}</div>
        </div>
      </div>

      {/* Arrow buttons */}
      <div className="mb-2 flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => nudge(0, -1, 0)}
            className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100"
            title="Move up 1px (Shift = 10px)"
          >
            ↑
          </button>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => nudge(-1, 0, 0)}
            className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100"
            title="Move left 1px"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => nudge(0, 1, 0)}
            className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100"
            title="Move down 1px"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => nudge(1, 0, 0)}
            className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100"
            title="Move right 1px"
          >
            →
          </button>
        </div>
        <div className="mt-1 flex gap-1">
          <button
            type="button"
            onClick={() => nudge(0, 0, -0.05)}
            className="flex h-6 w-8 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100"
            title="Scale down"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => nudge(0, 0, 0.05)}
            className="flex h-6 w-8 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100"
            title="Scale up"
          >
            +
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="mb-2 text-center text-[9px] text-amber-700">
        Or use <kbd className="rounded bg-white px-1">arrow keys</kbd> + <kbd className="rounded bg-white px-1">+/−</kbd>
        <br />
        <span className="text-[8px]">Hold Shift for 10x</span>
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopy}
        className="w-full rounded bg-amber-600 px-2 py-1.5 text-[10px] font-bold text-white shadow-sm hover:bg-amber-700"
      >
        {copied ? '✓ Copied!' : '📋 Copy Values'}
      </button>
    </div>
  )
}

export default AlignmentPanel
