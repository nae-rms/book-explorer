import { useState } from "react";
import {
  Search,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmedQuery =
      searchQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(
        trimmedQuery
      )}`
    );

    setSearchOpen(false);
    setSearchQuery("");
  }

  function handleOpenSearch() {
    setSearchOpen(true);
  }

  function handleCloseSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  const isHome =
    location.pathname === "/";

  const isMyArchive =
    location.pathname === "/my-archive";

  const isDiscover =
    location.pathname === "/search";

  return (
    <header className="navbar">

      <Link
        to="/"
        className="logo"
        aria-label="Dead Poets Archives home"
      >
        <span
          className="logo-mark"
          aria-hidden="true"
        >
          ✦
        </span>

        <span>
          Dead Poets Archives
        </span>
      </Link>


      {!searchOpen && (
        <nav className="nav-links">

          <Link
            to="/"
            className={
              isHome ? "active" : ""
            }
          >
            Home
          </Link>

          <Link
            to="/my-archive"
            className={
              isMyArchive ? "active" : ""
            }
          >
            My Archive
          </Link>

          <Link
            to="/search"
            className={
              isDiscover ? "active" : ""
            }
          >
            Discover
          </Link>

          <a href="#about">
            About
          </a>

        </nav>
      )}


      <div
        className={`navbar-search ${
          searchOpen
            ? "open"
            : ""
        }`}
      >
        {!searchOpen && (
          <button
            type="button"
            className="navbar-search-toggle"
            onClick={handleOpenSearch}
            aria-label="Search books"
          >
            <Search
              size={17}
              strokeWidth={1.5}
            />
          </button>
        )}

        {searchOpen && (
          <form
            className="navbar-search-form"
            onSubmit={handleSearchSubmit}
          >
            <Search
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="Search books..."
              autoFocus
              aria-label="Search books"
            />

            <button
              type="button"
              className="navbar-search-close"
              onClick={handleCloseSearch}
              aria-label="Close search"
            >
              <X
                size={16}
                strokeWidth={1.5}
              />
            </button>
          </form>
        )}
      </div>

    </header>
  );
}

export default Navbar;