import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      setError("");

      try {
        const decodedId = decodeURIComponent(id);

        const response = await fetch(
          `https://openlibrary.org${decodedId}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }

        const data = await response.json();

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

  if (loading) {
    return (
      <div className="app">
        <Navbar />

        <main className="book-details-page">
          <div className="status-message">
            <p>Opening the archive record...</p>
            <span>
              Take your time. Some books deserve a slower reading.
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

            <Link to="/search" className="back-link">
              ← Return to the archive
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const title = book.title || "Untitled";

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "";

  const subjects = book.subjects?.slice(0, 12) || [];

  return (
    <div className="app">
      <Navbar />

      <main className="book-details-page">
        <div className="book-details-container">
          <Link to="/search" className="back-link">
            ← Return to the archive
          </Link>

          <div className="book-details">
            <div className="book-details-cover">
              {book.covers?.[0] ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
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
                Open Library record
              </p>

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
                "I was good, I was really good"
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetails;