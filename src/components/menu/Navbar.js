import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchInput("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", searchInput);
    // Add your search logic here
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Kebonarum Logo" className="logo-image" />
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-menu-list">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/sejarah">Sejarah</a>
            </li>
            <li>
              <a href="/gereja">Gereja</a>
            </li>
            <li>
              <a href="/media">Media</a>
            </li>
            <li>
              <a href="/pengumuman">Pengumuman</a>
            </li>
            <li>
              <a href="/komisi">Komisi</a>
            </li>
            <li>
              <a href="/statistik">Statistik</a>
            </li>
            <li>
              <a href="/formulir">Formulir</a>
            </li>
            <li>
              <a href="/persembahan">Persembahan</a>
            </li>
          </ul>

          {/* Mobile search inside the fullscreen menu */}
          <div className="navbar-search mobile">
            <button className="search-icon" onClick={toggleSearch}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.9999 14.9999L19 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isSearchOpen && (
              <form
                className="search-form mobile-search-form"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  autoFocus
                />
              </form>
            )}
          </div>
        </div>

        {/* Desktop search (hidden on mobile) */}
        <div className="navbar-search desktop">
          <button className="search-icon" onClick={toggleSearch}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9999 14.9999L19 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isSearchOpen && (
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
              />
            </form>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Close button for mobile menu */}
        {isMenuOpen && (
          <button
            className="close-menu-btn"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="8"
                y1="8"
                x2="24"
                y2="24"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="24"
                y1="8"
                x2="8"
                y2="24"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
