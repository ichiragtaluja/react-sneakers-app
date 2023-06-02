import "./HeroVideo.css";
import ReactPlayer from "react-player";
import { Navigate, useNavigate } from "react-router-dom";

import React from "react";

export const HeroVideo = () => {
  const Navigate = useNavigate();
  return (
    <div className="hero-video-container">
      <div className="hero-video">
        <ReactPlayer
          url={`${process.env.PUBLIC_URL}/assets/videos/video-3.mp4`}
          // url="https://www.youtube.com/watch?v=5hR8f3eF31A"
  
        
          playing
          playbackRate={1.5}
          muted
          loop
          controls={false}
          width={"100%"}
          height={"100%"}
        />
      </div>

      <div className="hero-text">
        <h1>Sneak into Extraordinary</h1>
        <h2>Where Adventure Meets Style in Quirky Sneaker Bliss</h2>
      </div>

      <button
        onClick={() => Navigate("product-listing")}
        className="shop-now-btn"
      >
        Shop Now
      </button>
    </div>
  );
};

{
  /* <div className="hero-video">
        <ReactPlayer
          url={`${process.env.PUBLIC_URL}/assets/videos/video-1.mp4`}
          playing
          playbackRate={1.25}
          muted
          loop
          width={"100%"}
          height={"100%"}
          controls={false}
        />
      </div> */
}
