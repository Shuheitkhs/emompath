// components/VideoBackground.tsx
import React from "react";

const VideoBackground: React.FC = () => {
  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
      autoPlay
      loop
      muted
    >
      <source src="/emompath.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
