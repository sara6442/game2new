'use client'

import { useEffect, useState } from 'react'

interface Offset {
  x: number
  y: number
  scale: number
}

interface AlignmentPanelProps {
  selectedId: string | null
  offset: Offset
  onNudge: (dx: number, dy: number) => void
  onScaleChange: (scale: number) => void
}

export default function AlignmentPanel({ selectedId, offset, onNudge, onScaleChange }: AlignmentPanelProps) {
  // ✅ Local state to track values without losing precision
  const [localOffset, setLocalOffset] = useState<Offset>(offset)

  // ✅ Update local state when offset prop changes (from parent)
  useEffect(() => {
    setLocalOffset(offset)
  }, [offset])

  // ✅ Also update when selectedId changes (new item selected)
  useEffect(() => {
    setLocalOffset(offset)
  }, [selectedId, offset])

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
    const text = `// ${selectedId}: { x: ${localOffset.x}, y: ${localOffset.y}, scale: ${localOffset.scale} }`
    navigator.clipboard.writeText(text)
  }

  if (!selectedId) {
    return <div className="p-3 text-sm text-gray-400 italic">Select an item to align it.</div>
  }

  return (
    <div className="p-3 space-y-3">
      {/* Live values display */}
      <div className="text-xs font-mono bg-gray-100 rounded p-2 leading-5">
        <div className="font-semibold truncate">{selectedId}</div>
        <div>x: <span className="text-blue-600">{localOffset.x}</span> &nbsp; y: <span className="text-blue-600">{localOffset.y}</span></div>
        <div>scale: <span className="text-purple-600">{localOffset.scale.toFixed(2)}</span></div>
      </div>

      {/* Arrow buttons */}
      <div className="grid grid-cols-3 gap-1 w-28 mx-auto text-center">
        <div />
        <button onClick={() => onNudge(0, -1)} className="bg-gray-200 hover:bg-gray-300 rounded h-8 w-8 text-base">↑</button>
        <div />
        <button onClick={() => onNudge(-1, 0)} className="bg-gray-200 hover:bg-gray-300 rounded h-8 w-8 text-base">←</button>
        <div className="flex items-center justify-center text-xs text-gray-400">move</div>
        <button onClick={() => onNudge(1, 0)}  className="bg-gray-200 hover:bg-gray-300 rounded h-8 w-8 text-base">→</button>
        <div />
        <button onClick={() => onNudge(0, 1)}  className="bg-gray-200 hover:bg-gray-300 rounded h-8 w-8 text-base">↓</button>
        <div />
      </div>
      <p className="text-xs text-gray-400 text-center">
        Hold <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> for ×10 steps
      </p>

      {/* Scale input */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Scale</label>
        <input
          type="number"
          step="0.01"
          min="0.1"
          max="3"
          value={localOffset.scale}
          onChange={(e) => {
            const newScale = parseFloat(e.target.value) || 1
            setLocalOffset({ ...localOffset, scale: newScale })
            onScaleChange(newScale)
          }}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm font-mono"
        />
        {/* Quick presets */}
        <div className="flex gap-1 flex-wrap">
          {[0.5, 0.75, 1, 1.25, 1.5].map(s => (
            <button
              key={s}
              onClick={() => {
                setLocalOffset({ ...localOffset, scale: s })
                onScaleChange(s)
              }}
              className={`text-xs px-1.5 py-0.5 rounded border ${
                localOffset.scale === s ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >{s}×</button>
          ))}
        </div>
      </div>

      <button
        onClick={copyValues}
        className="w-full text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded py-1.5"
      >
        📋 Copy Values
      </button>
    </div>
  )
}
