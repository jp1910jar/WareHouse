import React from "react";
import Logo from "../assets/logo.png.png"; 
import "./Header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-img" />
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/purchase">Purchase</Link> {/* ✅ New Purchase */}
        <Link to="/sales">Sales</Link>
        <Link to="/report">Report</Link>

        {/* CRM Dropdown */}
        <div className="dropdown">
          <span className="dropdown-title">CRM ▾</span>
          <div className="dropdown-content">
            <Link to="/addaccount">Add Account</Link>
            <Link to="/lead">Lead</Link>
            <Link to="/deal">Deal</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
