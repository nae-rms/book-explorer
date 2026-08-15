import {
  normalizeBooks,
} from "../utils/bookUtils";

const OPEN_LIBRARY_BASE_URL =
  "https://openlibrary.org";

const searchCache = new Map();
const bookCache = new Map();


/**
 * Search Open Library for books.
 *
 * @param {string} query
 * @param {number} page
 * @param {number} limit
 * @returns {Promise<object>}
 */
export async function searchBooks(
  query,
  page = 1,
  limit = 24
) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      books: [],
      totalResults: 0,
    };
  }

  const cacheKey =
    `${trimmedQuery.toLowerCase()}-${page}-${limit}`;

  const cachedResult =
    searchCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const url =
    `${OPEN_LIBRARY_BASE_URL}/search.json` +
    `?q=${encodeURIComponent(trimmedQuery)}` +
    `&limit=${limit}` +
    `&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch books from Open Library."
    );
  }

  const data = await response.json();

  const result = {
    books: normalizeBooks(data.docs || []),

    totalResults:
      data.numFound || 0,
  };

  searchCache.set(cacheKey, result);

  return result;
}


/**
 * Fetch a single Open Library work.
 *
 * @param {string} workKey
 * @returns {Promise<object>}
 */
export async function getBook(workKey) {
  if (!workKey) {
    throw new Error(
      "A book key is required."
    );
  }

  const cachedBook =
    bookCache.get(workKey);

  if (cachedBook) {
    return cachedBook;
  }

  const response = await fetch(
    `${OPEN_LIBRARY_BASE_URL}${workKey}.json`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch book details from Open Library."
    );
  }

  const book = await response.json();

  bookCache.set(workKey, book);

  return book;
}