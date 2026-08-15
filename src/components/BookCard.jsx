import { Link } from "react-router-dom";

function BookCard({
  book,
  searchQuery,
}) {
  return (
    <Link
      to={`/book/${encodeURIComponent(book.id)}`}
      state={{
        ...book,
        searchQuery,
      }}
      className="book-card"
    >
      <div className="book-cover">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
          />
        ) : (
          <span>NO COVER</span>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>

        <p>{book.author}</p>

        <span>{book.publishYear}</span>
      </div>
    </Link>
  );
}

export default BookCard;