import React, { useEffect, useRef, useState } from 'react'

/**
 * SearchBar allows entering a book title and triggers the parent on submit.
 * - Pressing Enter or clicking the button triggers onSearch with current value.
 * @param {{ initialQuery?: string, onSearch?: (q: string) => void }} props
 */
export default function SearchBar({ initialQuery = '', onSearch }) {
  const [value, setValue] = useState(initialQuery)
  const inputRef = useRef(null)

  // Sync with external query changes (e.g., pagination resets)
  useEffect(() => {
    setValue(initialQuery)
  }, [initialQuery])

  const submit = (e) => {
    e?.preventDefault()
    onSearch?.(value)
  }

  return (
    <form onSubmit={submit} className="flex gap-2" aria-label="Search books by title">
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by title…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white/80 shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 text-slate-900 placeholder:text-slate-400"
          aria-label="Book title"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 shadow-sm"
      >
        Search
      </button>
    </form>
  )
}
