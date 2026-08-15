import BookCard from "./BookCard";

function BookGrid({
  books,
  searchQuery,
}) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

export default BookGrid;