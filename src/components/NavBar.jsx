import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Dead Poets Archives
      </Link>

      <div className="nav-links">
        <Link to="/search">Archive</Link>
        <Link to="/">Discover</Link>
        <Link to="/">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;