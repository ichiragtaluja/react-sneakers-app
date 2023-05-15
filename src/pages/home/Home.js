import React from "react";
import { Footer } from "../../components/footer/Footer";
import { HeroSection } from "./home-components/hero-section/HeroSection";
import { CategoriesSection } from "./home-components/categories-section/CategoriesSection";
import { VideosSection } from "./home-components/videos-section/VideosSection";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <VideosSection />
        <HeroSection />
        <CategoriesSection />
        <Footer />
      </div>
    </div>
  );
};
