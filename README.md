# Dead Poets Archives

A cinematic book discovery application built with React and the Open Library API.

Search for books by title or author, explore results, and open individual book records for more information.

The interface is inspired by literary archives, editorial design, and the atmosphere of *Dead Poets Society*.

---

## Features

- Search books by title or author
- Controlled React search input
- Open Library API integration
- Loading, error, and empty states
- Book cards with cover, title, author, and first publish year
- Book detail pages with descriptions, subjects, and edition counts
- Load more search results
- Search queries preserved in the URL
- Responsive layout
- Reusable React components
- Client-side book data normalization
- In-memory API caching

---

## Tech Stack

- React
- JavaScript
- Vite
- React Router
- CSS
- Lucide React
- Open Library API

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
```

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Home and book search |
| `/search?q={query}` | Search results |
| `/book/:id` | Individual book details |

---

## API

This project uses the free [Open Library Search API](https://openlibrary.org/developers/api). No API key is required.

### Search

```text
https://openlibrary.org/search.json?q={query}
```

### Cover images

```text
https://covers.openlibrary.org/b/id/{cover_i}-M.jpg
```

---

## React Concepts Demonstrated

This project demonstrates:

- `useState` for search, results, loading, and error state
- `useEffect` for API requests
- Props for passing book data between components
- Conditional rendering for loading, error, empty, and result states
- React Router for client-side navigation
- Reusable components
- Asynchronous API requests
- Data normalization
- In-memory caching

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/nae-rms/book-explorer.git
cd book-explorer
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open the local URL provided by Vite.

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Design Direction

Dead Poets Archives uses a dark editorial visual system inspired by classic literary archives and *Dead Poets Society*.

The interface combines:

- Dark academic tones
- Cormorant Garamond and Inter typography
- Muted burgundy accents
- Aged-gold details
- Cinematic photography
- Archival-style image frames
- Minimal literary ornaments

The goal is to make the application feel like a fictional literary collection while keeping the search experience simple and modern.

---

## Data Source

Book metadata and cover information are provided by [Open Library](https://openlibrary.org/).

Open Library is responsible for the external book data and cover resources used by the application.

---

## Project Status

**Version 1 — In Development**

The current version focuses on the core book-search experience:

- Discovering books
- Searching the Open Library catalog
- Browsing search results
- Viewing individual book records
- Handling loading, error, and empty states
- Responsive UI

Future iterations may introduce personal saved collections and additional discovery features.

---

## Credits

Built as a React learning and portfolio project.

Book data: [Open Library](https://openlibrary.org/)

The visual direction is inspired by *Dead Poets Society* (1989). Movie imagery used during development belongs to its respective copyright holders.
