# Book Finder

A minimal, responsive React app for Alex to search books by title via the Open Library Search API.

## Tech
- React 18 + Vite
- Tailwind CSS 3

## 🚀 Live Demo  
👉 [Here is the deploy link](https://book-finder-abhishek.netlify.app/)

## 🚀 Features
- **Search by title** – Enter a book title and fetch results from Open Library.  
- **Book list display** – Shows book details like title, author(s), and year.  
- **Loading state** – Displays a spinner while fetching results.  
- **Error & empty state handling** – Graceful messages for no results or API errors.  
- **Responsive design** – Styled with Tailwind CSS for mobile-friendly UI.  
- **Pagination support** – Load results across multiple pages.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open the URL shown in the terminal.

## Build
```bash
npm run build && npm run preview
```

## API
- Search endpoint: `https://openlibrary.org/search.json?title={bookTitle}&page={n}&limit={PAGE_SIZE}`
- Covers: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`

## Structure
```
src/
  components/
    BookCard.jsx       # Presentational card for a book
    BookList.jsx       # Responsive grid that renders a list of books
    SearchBar.jsx      # Input + submit for queries
    Spinner.jsx        # Simple loading indicator
  services/
    openLibrary.js     # API helpers (search + cover URL)
  App.jsx              # App shell and state management
  main.jsx             # React entry
  index.css            # Tailwind and small utility styles
public/
  favicon.svg
  placeholder-cover.svg
```

## Notes
- State: useState/useEffect only, no external state libs.
- Pagination: uses API `page` and fixed PAGE_SIZE.
- Accessibility: labeled inputs, ARIA roles for spinner.
- Styling: Tailwind utility classes and small custom utilities.
