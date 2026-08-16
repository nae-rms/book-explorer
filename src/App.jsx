import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import SearchResults from "./pages/SearchResults";
import BookDetails from "./pages/BookDetails";
import MyArchive from "./pages/MyArchive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/my-archive" element={<MyArchive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;