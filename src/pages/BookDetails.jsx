import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookDetails() {
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
              <span>BOOK COVER</span>
            </div>

            <div className="book-details-content">
              <p className="eyebrow">ARCHIVE RECORD</p>

              <h1>Book Title</h1>

              <p className="book-details-author">
                Author Name
              </p>

              <div className="book-details-meta">
                <span>First published 1965</span>
                <span>12 editions</span>
              </div>

              <div className="book-details-divider" />

              <section>
                <h2>Subjects</h2>

                <div className="subject-tags">
                  <span>Fiction</span>
                  <span>Literature</span>
                  <span>Adventure</span>
                </div>
              </section>

              <p className="book-details-motto">
                "Carpe diem."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetails;