import React from 'react'

/**
 * Simple spinner with an accessible label for loading states.
 * @param {{ label?: string }} props
 */
export default function Spinner({ label = 'Loading' }) {
  return (
    <div className="flex items-center justify-center gap-3 text-gray-600" role="status" aria-live="polite" aria-label={label}>
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-sky-500" aria-hidden="true"></span>
      <span className="text-sm">{label}…</span>
    </div>
  )
}
