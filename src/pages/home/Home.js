import React from "react";
import { Footer } from "../../components/footer/Footer";
import { HeroSection } from "./home-components/hero-section/HeroSection";
import { CategoriesSection } from "./home-components/categories-section/CategoriesSection";
import { VideosSection } from "./home-components/videos-section/VideosSection";
import { HeroVideo } from "./home-components/HeroVideo/HeroVideo";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <HeroVideo />
        <HeroSection />
        <VideosSection />

        <CategoriesSection />
        <Footer />
      </div>
    </div>
  );
};
