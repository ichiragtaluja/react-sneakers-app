import React from "react";
import ReactPlayer from "react-player";
import "./VideosSection.css";

export const VideosSection = () => {
  return (
    <div className="video-container">
      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-1.mp4`}
        playing
        playbackRate={1.15}
        muted
        loop
        controls={false}
        width="25vw"
      />

      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-2.mp4`}
        playing
        playbackRate={2}
        muted
        loop
        controls={false}
        width="25vw"
      />

      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-3.mp4`}
        playing
        playbackRate={2.8}
        muted
        loop
        controls={false}
        width="25vw"
        margin="0px"
        padding="0px"
      />

      <ReactPlayer
        url={`${process.env.PUBLIC_URL}/assets/videos/hero-video-4.mp4`}
        playing
        playbackRate={1.5}
        muted
        loop
        controls={false}
        width="25vw"
      />
    </div>
  );
};
