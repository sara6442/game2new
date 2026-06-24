'use client'

import { useEffect } from 'react'

interface AlignmentPanelProps {
  selectedId: string | null
  offset: { x: number; y: number }
  onNudge: (dx: number, dy: number) => void
}

export default function AlignmentPanel({ selectedId, offset, onNudge }: AlignmentPanelProps) {
  // Arrow-key listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedId) return
      const step = e.shiftKey ? 10 : 1
      if (e.key === 'ArrowUp')    { e.preventDefault(); onNudge(0, -step) }
      if (e.key === 'ArrowDown')  { e.preventDefault(); onNudge(0,  step) }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); onNudge(-step, 0) }
      if (e.key === 'ArrowRight') { e.preventDefault(); onNudge( step, 0) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedId, onNudge])

  const copyValues = () => {
    if (!selectedId) return
    const text = `// ${selectedId}: offset={{ x: ${offset.x}, y: ${offset.y} }}`
    navigator.clipboard.writeText(text)
  }

  if (!selectedId) {
    return (
      <div className="p-3 text-sm text-gray-400 italic">
        Select an item to align it.
      </div>
    )
  }

  return (
    <div className="p-3 space-y-3">
      {/* Current values */}
      <div className="text-xs font-mono bg-gray-100 rounded p-2">
        <span className="font-semibold">{selectedId}</span>
        <br />
        x: <span className="text-blue-600">{offset.x}</span>
        &nbsp;&nbsp;
        y: <span className="text-blue-600">{offset.y}</span>
      </div>

      {/* Arrow buttons */}
      <div className="grid grid-cols-3 gap-1 w-28 mx-auto">
        <div />
        <button
          onClick={() => onNudge(0, -1)}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-lg h-8 w-8"
          title="Up (↑)"
        >↑</button>
        <div />

        <button
          onClick={() => onNudge(-1, 0)}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-lg h-8 w-8"
          title="Left (←)"
        >←</button>
        <div className="flex items-center justify-center text-xs text-gray-400">nudge</div>
        <button
          onClick={() => onNudge(1, 0)}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-lg h-8 w-8"
          title="Right (→)"
        >→</button>

        <div />
        <button
          onClick={() => onNudge(0, 1)}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-lg h-8 w-8"
          title="Down (↓)"
        >↓</button>
        <div />
      </div>

      <p className="text-xs text-gray-400 text-center">
        Hold <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> + arrow key = ×10
      </p>

      {/* Copy button */}
      <button
        onClick={copyValues}
        className="w-full text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded py-1.5"
      >
        📋 Copy Values
      </button>
    </div>
  )
}
