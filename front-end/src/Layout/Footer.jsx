import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        Made with <span className="heart">❤️</span> from Averelite &nbsp;|&nbsp; © {year}
      </p>
    </footer>
  );
}
