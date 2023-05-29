import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "./hero-image-men-1.png";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <>
      <div className="hero-heading-container">
        <h1 className="hero-title">Elevate Your Style</h1>
        <h2 className="hero-subtitle">
          Discover the Heroic Sneaker Line that Transcends Boundaries
        </h2>
      </div>
    </>
  );
};
