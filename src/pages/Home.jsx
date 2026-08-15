import { Feather, Library, Quote } from "lucide-react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

import weltonCourtyard from "../assets/welton-courtyard.jpg";
import bedroomWriting from "../assets/bedroom-writing.jpg";
import weltonLake from "../assets/welton-lake.jpg";
import soccerSunset from "../assets/soccer-sunset.jpg";

function Home() {
  return (
    <div className="app">
      <Navbar />

      <main className="home">
        {/* HERO */}
        <section className="hero">
          <div
            className="hero-background"
            style={{
              backgroundImage: `url(${weltonCourtyard})`,
            }}
          />

          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-institution">
              <span>WELTON ACADEMY</span>
              <span>·</span>
              <span>PRIVATE COLLECTION</span>
            </div>

            <div className="hero-icon">
              <Feather size={24} strokeWidth={1.2} />
            </div>

            <p className="eyebrow">
              WORDS WORTH REMEMBERING
            </p>

            <h1>
              Dead Poets
              <br />
              Archives
            </h1>

            <p className="hero-description">
              A place for those who seek stories worth
              keeping.
            </p>

            <SearchBar />

            <p className="hero-motto">
              Carpe diem.
            </p>
          </div>
        </section>

        {/* ARCHIVE INTRODUCTION */}
        <section className="archive-introduction">
          <div className="intro-visual">
            <div className="intro-image">
              <img
                src={bedroomWriting}
                alt="Students writing together in a dorm room"
              />
            </div>

            <div className="image-caption">
              <span>ARCHIVE PHOTOGRAPH 02</span>
              <span>
                WELTON ACADEMY · PRIVATE COLLECTION
              </span>
            </div>
          </div>

          <div className="intro-content">
            <p className="eyebrow">
              THE DEAD POETS SOCIETY
            </p>

            <h2>
              Find the books
              <br />
              worth remembering.
            </h2>

            <div className="intro-icon">
              <Library size={22} strokeWidth={1.3} />
            </div>

            <p>
              Search across the collection for titles,
              authors, and works that have stayed with
              readers long after the final page.
            </p>

            <p className="intro-motto">
              Read widely. Think freely.
            </p>
          </div>
        </section>

        {/* CINEMATIC BREAK */}
        <section className="cinematic-section">
          <img
            src={weltonLake}
            alt="Autumn landscape surrounding Welton Academy"
          />

          <div className="cinematic-overlay" />

          <div className="cinematic-content">
            <Quote size={24} strokeWidth={1} />

            <p>
              "O Captain! My Captain!"
            </p>

            <span>
              A place for books, ideas, and voices.
            </span>
          </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="archive-philosophy">
          <div className="philosophy-content">
            <p className="eyebrow">
              THE SPIRIT OF THE ARCHIVE
            </p>

            <h2>
              Make room for
              <br />
              something unforgettable.
            </h2>

            <p>
              Every search is an invitation to discover
              something you haven't read yet.
            </p>

            <div className="philosophy-motto">
              <Feather size={18} strokeWidth={1.2} />
              <span>CARPE DIEM</span>
            </div>
          </div>

          <div className="philosophy-image">
            <img
              src={soccerSunset}
              alt="Students celebrating outdoors at sunset"
            />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <span
                className="footer-mark"
                aria-hidden="true"
              >
                ✦
              </span>

              <span>Dead Poets Archives</span>
            </div>

            <p>
              A literary archive for books worth
              remembering.
            </p>
          </div>

          <div className="footer-column">
            <span className="footer-heading">
              ARCHIVE
            </span>

            <a href="/">
              Search
            </a>

            <a href="/search">
              Collection
            </a>
          </div>

          <div className="footer-column">
            <span className="footer-heading">
              ABOUT
            </span>

            <span>
              Welton Academy
            </span>

            <span>
              Private Collection
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            BOOK DATA · OPEN LIBRARY
          </span>

          <span>
            CARPE DIEM
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;