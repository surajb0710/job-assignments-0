import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VideoPlayer from './VideoPlayer';

const VideoSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container w-300">
      <Slider {...settings}>
        <div className="px-5 hover:scale-110">
          <VideoPlayer />
        </div>
        <div className="px-5 hover:scale-110">
          <VideoPlayer />
        </div>
        <div className="px-5 hover:scale-110">
          <VideoPlayer />
        </div>
      </Slider>
    </div>
  );
};

export default VideoSlider;
