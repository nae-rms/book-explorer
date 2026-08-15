const OPEN_LIBRARY_COVERS_URL =
  "https://covers.openlibrary.org";

/**
 * Convert a raw Open Library search result
 * into the book object used by the application.
 *
 * @param {object} book
 * @returns {object}
 */
export function normalizeBook(book) {
  const coverId = book.cover_i || null;

  const coverEditionKey =
    book.cover_edition_key || null;

  let coverUrl = null;

  if (coverId) {
    coverUrl =
      `${OPEN_LIBRARY_COVERS_URL}/b/id/${coverId}-M.jpg`;
  } else if (coverEditionKey) {
    coverUrl =
      `${OPEN_LIBRARY_COVERS_URL}/b/olid/${coverEditionKey}-M.jpg`;
  }

  return {
    id: book.key,

    title:
      book.title || "Untitled",

    author:
      book.author_name?.[0] ||
      "Unknown author",

    publishYear:
      book.first_publish_year ||
      "Year unknown",

    editionCount:
      book.edition_count || 0,

    coverId,

    coverEditionKey,

    coverUrl,
  };
}


/**
 * Normalize multiple Open Library search results.
 *
 * @param {object[]} books
 * @returns {object[]}
 */
export function normalizeBooks(books) {
  return books
    .filter((book) => book?.title)
    .map(normalizeBook);
}


/**
 * Get the largest available cover URL.
 *
 * @param {object} book
 * @returns {string|null}
 */
export function getLargeCoverUrl(book) {
  if (!book) {
    return null;
  }

  if (book.coverId) {
    return `${OPEN_LIBRARY_COVERS_URL}/b/id/${book.coverId}-L.jpg`;
  }

  if (book.coverEditionKey) {
    return `${OPEN_LIBRARY_COVERS_URL}/b/olid/${book.coverEditionKey}-L.jpg`;
  }

  return null;
}