import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isArchivePage = location.pathname === "/search";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark" aria-hidden="true">
          ✦
        </span>

        <span>Dead Poets Archives</span>
      </Link>

      <div className="nav-links">
        <Link
          to="/search"
          className={isArchivePage ? "active" : ""}
        >
          Archive
        </Link>

        <Link to="/">
          Discover
        </Link>

        <Link to="/">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;