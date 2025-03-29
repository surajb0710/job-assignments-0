import React from 'react';
import VideoSlider from './VideoSlider';
import VideoPlayer from './VideoPlayer';

const RealStories = () => {
  return (
    <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 relative">
      <h2 className="text-4xl text-center">Real Stories, Real Impact</h2>
      <p className="text-center">
        We help you transform your career, unlock new opportunities, and achieve
        your full potential.
      </p>
      <VideoSlider />
    </div>
  );
};

export default RealStories;
