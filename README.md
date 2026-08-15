# Dead Poets Archives

A cinematic book discovery application built with React and the Open Library API.

Search for books by title or author, explore results, and open individual archive records for more information.

The interface is inspired by literary archives, classic editorial design, and the atmosphere of *Dead Poets Society*.

---

## Preview

### Home

A cinematic landing page centered around book discovery.

### Search Results

Search Open Library and browse books with covers, authors, publication years, and additional results through pagination.

### Book Details

Open individual books to view descriptions, subjects, editions, and additional metadata.

---

## Features

- Search books by title or author
- Controlled React search input
- Open Library API integration
- Loading, error, and empty states
- Book result cards with cover images
- Book detail pages
- Load more results
- Search results stored in URL parameters
- Responsive layout
- Cinematic, literary-inspired interface

---

## Tech Stack

- React
- JavaScript
- Vite
- React Router
- CSS
- Open Library API
- Lucide React

---

## Project Structure

```text
src/
├── assets/
│   ├── bedroom-writing.jpg
│   ├── soccer-sunset.jpg
│   ├── welton-courtyard.jpg
│   └── welton-lake.jpg
│
├── components/
│   ├── BookCard.jsx
│   ├── BookGrid.jsx
│   ├── Navbar.jsx
│   └── SearchBar.jsx
│
├── pages/
│   ├── BookDetails.jsx
│   ├── Home.jsx
│   └── SearchResults.jsx
│
├── services/
│   └── openLibrary.js
│
├── utils/
│   └── bookUtils.js
│
├── App.jsx
├── index.css
└── main.jsx