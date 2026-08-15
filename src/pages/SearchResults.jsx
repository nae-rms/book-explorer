import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import BookGrid from "../components/BookGrid";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      if (!query) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books.");
        }

        const data = await response.json();

        setBooks(data.docs);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while searching the archives.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [query]);

  return (
    <div className="app">
      <Navbar />

      <main className="results-page">
        <section className="results-header">
          <Link to="/" className="back-link">
            ← Return to the archives
          </Link>

          <p className="eyebrow">
            THE ARCHIVE · CARPE DIEM
          </p>

          <h1>Search Results</h1>

          <div className="results-meta">
            <span>
              Search: <strong>"{query}"</strong>
            </span>

            {!loading && !error && books.length > 0 && (
              <span>
                {books.length} books found
              </span>
            )}
          </div>
        </section>

        <section className="archive">
          {loading && (
            <div className="status-message">
              <p>Searching the archives...</p>
              <span>
                Good books are worth waiting for.
              </span>
            </div>
          )}

          {error && (
            <div className="status-message error">
              <p>{error}</p>
              <span>
                Even the best archives have their quiet days.
              </span>
            </div>
          )}

          {!loading && !error && books.length === 0 && (
            <div className="status-message">
              <p>No books found.</p>
              <span>
                Perhaps you haven't found the right words yet.
              </span>
            </div>
          )}

          {!loading && !error && books.length > 0 && (
            <BookGrid books={books} />
          )}
        </section>
      </main>
    </div>
  );
}

export default SearchResults;