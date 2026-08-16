import { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/NavBar";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";

import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

import {
  searchBooks,
} from "../services/openLibrary";

const BOOKS_PER_PAGE = 24;

function SearchResults() {
  const [searchParams] =
    useSearchParams();

  const query =
    searchParams.get("q");

  const hasQuery =
    Boolean(query?.trim());

  const [books, setBooks] =
    useState([]);

  const [totalResults, setTotalResults] =
    useState(0);

  const [page, setPage] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] =
    useState("");


  /* =========================================================
     INITIAL SEARCH
  ========================================================= */

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
        const data =
          await searchBooks(
            query,
            1,
            BOOKS_PER_PAGE
          );

        setBooks(data.books);

        setTotalResults(
          data.totalResults
        );

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


  /* =========================================================
     PAGE TITLE
  ========================================================= */

  useEffect(() => {
    if (hasQuery) {
      document.title =
        `Dead Poets Archives | Search · ${query}`;
    } else {
      document.title =
        "Dead Poets Archives | The Archive";
    }

    return () => {
      document.title =
        "Dead Poets Archives";
    };
  }, [query, hasQuery]);


  /* =========================================================
     LOAD MORE
  ========================================================= */

  async function handleLoadMore() {
    if (!query || loadingMore) {
      return;
    }

    const nextPage =
      page + 1;

    setLoadingMore(true);
    setError("");

    try {
      const data =
        await searchBooks(
          query,
          nextPage,
          BOOKS_PER_PAGE
        );

      setBooks(
        (currentBooks) => [
          ...currentBooks,
          ...data.books,
        ]
      );

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

        {/* =================================================
            RESULTS HEADER
        ================================================= */}

        <section className="results-header">

          <Link
            to="/"
            className="back-link"
          >
            ← Return to Welton
          </Link>


          <div className="results-title-row">

            <div className="results-header-content">
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
                    Search:{" "}
                    <strong>
                      "{query}"
                    </strong>
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
            </div>


            {!hasQuery && (
              <div className="discover-search">
                <SearchBar />
              </div>
            )}

          </div>

        </section>


        {/* =================================================
            RESULTS
        ================================================= */}

        <section className="archive">

          {!hasQuery && (
            <EmptyState
              message="The archive is waiting."
              detail="Search by title or author to begin exploring the collection."
            />
          )}


          {hasQuery && loading && (
            <LoadingState
              message="Searching the archives..."
              detail="Good books are worth waiting for."
            />
          )}


          {hasQuery &&
            error &&
            books.length === 0 && (
              <ErrorState
                message={error}
                detail="Even the best archives have their quiet days."
              />
            )}


          {hasQuery &&
            !loading &&
            !error &&
            books.length === 0 && (
              <EmptyState
                message="No books found."
                detail="Perhaps you haven't found the right words yet."
              />
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
                    You have reached the end
                    of the archive.
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