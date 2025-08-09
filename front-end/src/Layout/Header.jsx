import React from "react";
import Logo from "../assets/logo.png.png"; // Update your logo path
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <img src={Logo} alt="Logo" className="logo" />
          <span className="brand-name">AverElite</span>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="/inventory">Inventory</a>
          <a href="/sales">Sales</a>
          <a href="/reports">Report</a>
        </nav>
      </div>
    </header>
  );
}
