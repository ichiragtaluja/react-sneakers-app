import React from "react";
import "./Footer.css";
import { ImGithub } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <small> &copy; {copyrightYear} Chirag Taluja</small>
      <div className="social-links">
        <Link to="https://twitter.com/ichiragtaluja" target="_blank">
          <BsTwitter color={"white"}/>
        </Link>
        <Link to="https://github.com/ichiragtaluja" target="_blank">
          <ImGithub color={"white"}/>
        </Link>
        <Link to="https://www.linkedin.com/in/ichiragtaluja" target="_blank">
          <SiLinkedin color={"white"}/>
        </Link>
      </div>
    </div>
  );
};
