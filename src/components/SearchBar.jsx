import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={20} />

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title or author..."
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;