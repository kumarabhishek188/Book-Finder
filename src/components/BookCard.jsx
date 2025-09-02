import React from 'react'

/**
 * Displays a single book entry with cover, title, authors, and publish year.
 * @param {{ book: any }} props
 */
export default function BookCard({ book }) {
  const {
    title,
    author_name: authors,
    first_publish_year,
    cover_i,
  } = book || {}

  const coverUrl = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : '/placeholder-cover.svg'

  return (
    <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full bg-slate-100 aspect-[3/2] overflow-hidden">
        <img src={coverUrl} alt={title || 'No cover available'} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-slate-900 line-clamp-2" title={title}>{title || 'Untitled'}</h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2" title={Array.isArray(authors) ? authors.join(', ') : ''}>
          {Array.isArray(authors) ? authors.join(', ') : 'Unknown Author'}
        </p>
        <p className="text-xs text-slate-500 mt-1">First published: {first_publish_year || '—'}</p>
      </div>
    </div>
  )
}
