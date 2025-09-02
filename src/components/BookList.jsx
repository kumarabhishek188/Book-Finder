import React from 'react'
import BookCard from './BookCard'

/**
 * Renders a responsive grid of BookCard components.
 * @param {{ books: any[] }} props
 */
export default function BookList({ books = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {books.map((b, idx) => (
        <BookCard key={`${b.key || idx}-${idx}`} book={b} />
      ))}
    </div>
  )
}
