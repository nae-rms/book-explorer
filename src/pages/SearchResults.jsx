import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
          <p className="eyebrow">THE ARCHIVE · CARPE DIEM</p>

          <h1>Search Results</h1>

          <p className="results-count">
            Showing books matching "{query}".
          </p>
        </section>

        <section className="archive">
          {loading && (
            <p className="status-message">
              Searching the archives...
            </p>
          )}

          {error && (
            <p className="status-message error">
              {error}
            </p>
          )}

          {!loading && !error && books.length === 0 && (
            <p className="status-message">
              No books found.
            </p>
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