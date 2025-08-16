import React from "react";
import Logo from "../assets/logo.png.png"; 
import "./Header.css";
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <img src={Logo} alt="Logo" className="logo" />
          {/* <span className="brand-name">AverElite</span> */}
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/report">Report</Link>
          
        </nav>
      </div>
    </header>
  );
}
