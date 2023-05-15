import React from "react";
import "./Footer.css";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <small> &copy; {copyrightYear} Chirag Taluja</small>
    </div>
  );
};
