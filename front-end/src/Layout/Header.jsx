import React, { useState } from "react";
import "./Header.css";
import Logo from "../assets/logo.png.png"; // Rename your logo as logo.png and place in src/assets

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container">
        <img src={Logo} alt="AverElite Logo" className="logo-img" />
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/inventory">Inventory</a>
        <a href="/sales">Sales</a>
        <a href="/reports">Reports</a>
      </nav>

      {/* Hamburger Menu */}
      <div
        className={`hamburger ${menuOpen ? "toggle" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
