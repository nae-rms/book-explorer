import { Link } from "react-router-dom";

function BookCard({ book, searchQuery }) {
  const coverId = book.cover_i;

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const author =
    book.author_name?.[0] || "Unknown author";

  const publishYear =
    book.first_publish_year || "Year unknown";

  const editionCount =
    book.edition_count || 0;

  return (
    <Link
      to={`/book/${encodeURIComponent(book.key)}`}
      state={{
        title: book.title,
        author,
        publishYear,
        editionCount,
        coverId,
        searchQuery,
      }}
      className="book-card"
    >
      <div className="book-cover">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
          />
        ) : (
          <span>NO COVER</span>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>

        <p>{author}</p>

        <span>{publishYear}</span>
      </div>
    </Link>
  );
}

export default BookCard;