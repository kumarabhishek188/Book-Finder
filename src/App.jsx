import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import BookList from './components/BookList'
import Spinner from './components/Spinner'
import { searchByTitle } from './services/openLibrary'

const PAGE_SIZE = 20

export default function App() {
  // Search input and pagination state
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  // Data + UI state
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [numFound, setNumFound] = useState(0)

  /** Trigger an API search and update UI state */
  const performSearch = async (q, p = 1) => {
    if (!q?.trim()) {
      setBooks([])
      setNumFound(0)
      setError('')
      return
    }
    try {
      setLoading(true)
      setError('')
      const { docs, numFound } = await searchByTitle(q, p, PAGE_SIZE)
      setBooks(docs)
      setNumFound(numFound)
    } catch (e) {
      setError('Something went wrong. Please try again.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Trigger search when page changes (query is set via onSearch)
  useEffect(() => {
    performSearch(query, page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Called when Alex submits a new query
  const onSearch = (q) => {
    setPage(1)
    setQuery(q)
    performSearch(q, 1)
  }

  const totalPages = Math.max(1, Math.ceil(numFound / PAGE_SIZE))

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Book Finder</h1>
          <p className="text-sm text-slate-600 mt-1">Hi Alex — search books by title via Open Library.</p>
          <div className="mt-4">
            <SearchBar initialQuery={query} onSearch={onSearch} />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {loading && (
          <div className="py-20">
            <Spinner label="Fetching books" />
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 text-red-800 border border-red-200 rounded-xl p-4">
            <div className="font-medium">We hit a snag</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        )}

        {!loading && !error && books.length === 0 && query && (
          <div className="text-center py-16">
            <div className="text-2xl font-semibold text-slate-800">No results</div>
            <p className="text-slate-600 mt-2">Try a different title or check your spelling.</p>
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <>
            <BookList books={books} />
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
              <div className="flex gap-2">
                <button
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  ← Previous
                </button>
                <button
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Data from Open Library. Built for Alex.
      </footer>
    </div>
  )
}
