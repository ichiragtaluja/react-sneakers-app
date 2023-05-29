import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection/CategoriesSection";
import { VideosSection } from "./components/VideosSection/VideosSection";
import { HeroVideo } from "./components/HeroVideo/HeroVideo";

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
