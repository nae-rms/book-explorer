function BookCard() {
  return (
    <article className="book-card">
      <div className="book-cover">
        <span>BOOK COVER</span>
      </div>

      <div className="book-info">
        <h3>Book Title</h3>
        <p>Author Name</p>
        <span>1965</span>
      </div>
    </article>
  );
}

export default BookCard;