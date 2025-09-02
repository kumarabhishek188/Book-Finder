/**
 * Open Library Search API utilities
 * Docs: https://openlibrary.org/dev/docs/api/search
 */

const API_BASE = 'https://openlibrary.org/search.json'
const COVERS_BASE = 'https://covers.openlibrary.org/b/id/'

/**
 * Build cover URL for a given cover id.
 * @param {number|string|undefined} cover_i
 * @param {'S'|'M'|'L'} size default 'M'
 * @returns {string|null}
 */
export function getCoverUrl(cover_i, size = 'M') {
  if (!cover_i && cover_i !== 0) return null
  return `${COVERS_BASE}${cover_i}-${size}.jpg`
}

/**
 * Perform a title search on Open Library.
 * @param {string} title
 * @param {number} page 1-based page index
 * @param {number} limit results per page
 * @returns {Promise<{docs: any[], numFound: number}>}
 */
export async function searchByTitle(title, page = 1, limit = 20) {
  const url = new URL(API_BASE)
  url.searchParams.set('title', title.trim())
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(limit))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const data = await res.json()
  return {
    docs: Array.isArray(data.docs) ? data.docs : [],
    numFound: Number.isFinite(data.numFound) ? data.numFound : 0,
  }
}
