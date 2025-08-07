import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="footer">
      <div className="footer-left">
        Made with <span className="heart">❤️</span> by AverElite
      </div>
      <div className="footer-right">{currentDate}</div>
    </footer>
  );
};

export default Footer;
