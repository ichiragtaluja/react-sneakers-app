import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "./hero-image-men-1.png";
import "./HeroSection.css";

export const HeroSection = () => {
  const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate("product-listing")}>
      {" "}
      <img className="hero-image" src={heroImg} alt="model wearing sneakers" />
    </div>
  );
};
