import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/NavBar";

function MyArchive() {
  useEffect(() => {
    document.title =
      "Dead Poets Archives | My Archive";

    return () => {
      document.title =
        "Dead Poets Archives";
    };
  }, []);

  return (
    <div className="app">
      <Navbar />

      <main className="archive-placeholder">
        <section className="archive-placeholder-content">
          <p className="eyebrow">
            MY ARCHIVE
          </p>

          <h1>
            Your collection
            <br />
            begins here.
          </h1>

          <p>
            Save books you want to remember and
            return to them whenever you're ready.
          </p>

          <Link
            to="/search"
            className="archive-placeholder-link"
          >
            Discover books
          </Link>
        </section>
      </main>
    </div>
  );
}

export default MyArchive;