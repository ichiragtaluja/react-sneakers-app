import React from "react";
import ReactPlayer from "react-player";
import "./VideosSection.css";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

export const VideosSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="video-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-details/26")}
            url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-1.mp4`}
            playing
            playbackRate={1.15}
            muted
            loop
            controls={false}
            width="100%"
            height="119.9%"
          />

          <h3>Aether Ultra Pro</h3>
          <span className="notch"></span>
        </Tilt>{" "}
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-details/39")}
            url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-2.mp4`}
            playing
            playbackRate={1.6}
            muted
            loop
            controls={false}
            width="100%"
            height="112.65%"
          />

          <h3>Vanguard Accelerate</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            onClick={() => navigate("/product-details/50")}
            url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-3.mp4`}
            playing
            playbackRate={2.8}
            muted
            loop
            controls={false}
            width="100%"
            margin="0px"
            padding="0px"
            height="119.9%"
          />

          <h3>Luminary Synthesis</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          {" "}
          <ReactPlayer
            onClick={() => navigate("/product-details/76")}
            url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-4.mp4`}
            playing
            playbackRate={1}
            muted
            loop
            controls={false}
            width="100%"
            height="119.8%"
          />
          <h3>Ascend Quantum</h3>
          <span className="notch"></span>
        </Tilt>
      </div>
    </>
  );
};
