import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import { getBook } from "../services/openLibrary";

import {
  getLargeCoverUrl,
} from "../utils/bookUtils";

function BookDetails() {
  const { id } = useParams();
  const location = useLocation();

  const searchBook = location.state;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      setError("");

      try {
        const decodedId =
          decodeURIComponent(id);

        const data =
          await getBook(decodedId);

        setBook(data);
      } catch (error) {
        console.error(error);

        setError(
          "We couldn't retrieve this record from the archives."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  const returnToArchive =
    searchBook?.searchQuery
      ? `/search?q=${encodeURIComponent(
          searchBook.searchQuery
        )}`
      : "/";

  if (loading) {
    return (
      <div className="app">
        <Navbar />

        <main className="book-details-page">
          <div className="status-message">
            <p>
              Opening the archive record...
            </p>

            <span>
              Some books deserve a slower reading.
            </span>
          </div>
        </main>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="app">
        <Navbar />

        <main className="book-details-page">
          <div className="status-message error">
            <p>
              {error || "Book not found."}
            </p>

            <Link
              to={returnToArchive}
              className="back-link"
            >
              ← Return to the archive
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const title =
    searchBook?.title ||
    book.title ||
    "Untitled";

  const author =
    searchBook?.author ||
    "Unknown author";

  const publishYear =
    searchBook?.publishYear ||
    "Year unknown";

  const editionCount =
    searchBook?.editionCount ||
    0;

  const coverBook = {
    coverId:
      searchBook?.coverId ||
      null,

    coverEditionKey:
      searchBook?.coverEditionKey ||
      book.covers?.[0] ||
      null,
  };

  const coverUrl =
    searchBook?.coverId || searchBook?.coverEditionKey
      ? getLargeCoverUrl(coverBook)
      : book.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : null;

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "";

  const subjects =
    book.subjects?.slice(0, 12) || [];

  return (
    <div className="app">
      <Navbar />

      <main className="book-details-page">
        <div className="book-details-container">
          <Link
            to={returnToArchive}
            className="back-link"
          >
            ← Return to the archive
          </Link>

          <div className="book-details">
            <div className="book-details-cover">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={`Cover of ${title}`}
                />
              ) : (
                <span>NO COVER</span>
              )}
            </div>

            <div className="book-details-content">
              <p className="eyebrow">
                ARCHIVE RECORD
              </p>

              <h1>{title}</h1>

              <p className="book-details-author">
                {author}
              </p>

              <div className="book-details-meta">
                <span>
                  First published {publishYear}
                </span>

                <span>
                  {editionCount} editions
                </span>
              </div>

              <div className="book-details-divider" />

              {description && (
                <section>
                  <h2>About this work</h2>

                  <p className="book-details-description">
                    {description}
                  </p>
                </section>
              )}

              {subjects.length > 0 && (
                <section className="book-details-subjects">
                  <h2>Subjects</h2>

                  <div className="subject-tags">
                    {subjects.map((subject) => (
                      <span key={subject}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <p className="book-details-motto">
                Carpe diem.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetails;