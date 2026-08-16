import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../components/NavBar.jsx";
import BookGrid from "../components/BookGrid.jsx";
import { searchBooks } from "../services/openLibrary.js";


const BOOKS_PER_PAGE = 24;

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const hasQuery = Boolean(query?.trim());

  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInitialBooks() {
      if (!hasQuery) {
        setBooks([]);
        setTotalResults(0);
        setPage(1);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await searchBooks(
          query,
          1,
          BOOKS_PER_PAGE
        );

        setBooks(data.books);
        setTotalResults(data.totalResults);
        setPage(1);
      } catch (error) {
        console.error(error);

        setError(
          "Something went wrong while searching the archives."
        );

        setBooks([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialBooks();
  }, [query, hasQuery]);

  useEffect(() => {
  if (hasQuery) {
    document.title =
      `Dead Poets Archives | Search · ${query}`;
  } else {
    document.title =
      "Dead Poets Archives | The Archive";
  }

  return () => {
    document.title = "Dead Poets Archives";
  };
}, [query, hasQuery]);

  async function handleLoadMore() {
    if (!query || loadingMore) {
      return;
    }

    const nextPage = page + 1;

    setLoadingMore(true);
    setError("");

    try {
      const data = await searchBooks(
        query,
        nextPage,
        BOOKS_PER_PAGE
      );

      setBooks((currentBooks) => [
        ...currentBooks,
        ...data.books,
      ]);

      setPage(nextPage);
    } catch (error) {
      console.error(error);

      setError(
        "We couldn't load more books from the archives."
      );
    } finally {
      setLoadingMore(false);
    }
  }

  const hasMoreBooks =
    books.length < totalResults;

  return (
    <div className="app">
      <Navbar />

      <main className="results-page">
        <section className="results-header">
          <Link to="/" className="back-link">
            ← Return to Welton
          </Link>

          <p className="eyebrow">
            {hasQuery
              ? "THE ARCHIVE · CARPE DIEM"
              : "THE ARCHIVE"}
          </p>

          <h1>
            {hasQuery
              ? "Search Results"
              : "The Archive"}
          </h1>

          {hasQuery && (
            <div className="results-meta">
              <span>
                Search: <strong>"{query}"</strong>
              </span>

              {!loading &&
                !error &&
                books.length > 0 && (
                  <span>
                    {books.length} displayed ·{" "}
                    {totalResults} matches
                  </span>
                )}
            </div>
          )}
        </section>

        <section className="archive">
          {!hasQuery && (
            <div className="status-message">
              <p>
                The archive is waiting.
              </p>

              <span>
                Search by title or author to begin
                exploring the collection.
              </span>
            </div>
          )}

          {hasQuery && loading && (
            <div className="status-message">
              <p>
                Searching the archives...
              </p>

              <span>
                Good books are worth waiting for.
              </span>
            </div>
          )}

          {hasQuery &&
            error &&
            books.length === 0 && (
              <div className="status-message error">
                <p>{error}</p>

                <span>
                  Even the best archives have their
                  quiet days.
                </span>
              </div>
            )}

          {hasQuery &&
            !loading &&
            !error &&
            books.length === 0 && (
              <div className="status-message">
                <p>No books found.</p>

                <span>
                  Perhaps you haven't found the right
                  words yet.
                </span>
              </div>
            )}

          {hasQuery &&
            !loading &&
            books.length > 0 && (
              <>
                <BookGrid
                  books={books}
                  searchQuery={query}
                />

                {hasMoreBooks && (
                  <div className="load-more-container">
                    <button
                      className="load-more-button"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                    >
                      {loadingMore
                        ? "Opening more records..."
                        : "Load More Books"}
                    </button>

                    {error && (
                      <p className="load-more-error">
                        {error}
                      </p>
                    )}
                  </div>
                )}

                {!hasMoreBooks && (
                  <p className="archive-end">
                    You have reached the end of the
                    archive.
                  </p>
                )}
              </>
            )}
        </section>
      </main>
    </div>
  );
}

export default SearchResults;