import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className="app">
      <Navbar />

      <main className="home">
        <section className="hero">
          <p className="eyebrow">
            THE LITERARY ARCHIVE
          </p>

          <h1>
            Dead Poets
            <br />
            Archives
          </h1>

          <p className="hero-description">
            A place for those who seek books worth remembering.
          </p>

          <SearchBar />

          <p className="hero-motto">
            Carpe diem.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;