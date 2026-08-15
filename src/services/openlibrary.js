const OPEN_LIBRARY_BASE_URL =
  "https://openlibrary.org";

/**
 * Search Open Library for books.
 *
 * @param {string} query - Search term.
 * @param {number} page - Page number.
 * @param {number} limit - Number of results per request.
 * @returns {Promise<object>} Open Library search response.
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

  return {
    books: data.docs.filter((book) => book.title),
    totalResults: data.numFound || 0,
  };
}


/**
 * Fetch a single Open Library work.
 *
 * @param {string} workKey - Example: "/works/OL123W"
 * @returns {Promise<object>} Open Library work object.
 */
export async function getBook(workKey) {
  if (!workKey) {
    throw new Error("A book key is required.");
  }

  const response = await fetch(
    `${OPEN_LIBRARY_BASE_URL}${workKey}.json`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch book details from Open Library."
    );
  }

  return response.json();
}