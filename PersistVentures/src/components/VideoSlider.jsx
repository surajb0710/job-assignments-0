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

  const testimonials = [
    'https://bpqhyuekxyzgvumdgycr.supabase.co/storage/v1/object/public/testimonies/36c7e471-774a-4a9c-8d24-c107dd3699cc.mp4',
    'https://bpqhyuekxyzgvumdgycr.supabase.co/storage/v1/object/public/testimonies/5e380c20-024f-4552-a77f-25e8f2455c26.mp4',
    'https://bpqhyuekxyzgvumdgycr.supabase.co/storage/v1/object/public/testimonies/885b4337-0511-48da-b084-7b711ac74195.mp4',
    'https://st2.depositphotos.com/2572561/48535/v/600/depositphotos_485352334-stock-video-vertical-footage-political-party-speaker.mp4',
    'https://st2.depositphotos.com/2572561/47892/v/600/depositphotos_478921772-stock-video-vertical-video-female-car-portrait.mp4',
  ];

  return (
    <div className="slider-container w-300">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="px-5 hover:scale-110" key={index}>
            <VideoPlayer src={testimonial} key={index} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
