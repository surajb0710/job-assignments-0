import { useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
import play from '../assets/images/play.png';
import pause from '../assets/images/pause.png';

export default function VideoPlayer({ src }) {
  //https://assets.mixkit.co/j895u6t27rx6okbipf5x18crtpim

  //https://st2.depositphotos.com/2572561/47892/v/600/depositphotos_478921772-stock-video-vertical-video-female-car-portrait.mp4
  //https://st2.depositphotos.com/2572561/45884/v/600/depositphotos_458849666-stock-video-vertical-video-portrait-doctor.mp4
  //https://st5.depositphotos.com/7356568/79975/v/600/depositphotos_799757612-stock-video-vertical-format-video-senior-doctors.mp4
  //https://st2.depositphotos.com/5598072/45995/v/600/depositphotos_459950692-stock-video-vertical-shot-stylishly-dressed-millennial.mp4
  //https://st5.depositphotos.com/3644443/62571/v/600/depositphotos_625712874-stock-video-young-woman-walks-city-street.mp4

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 relative w-full h-150 rounded-4xl overflow-clip">
      <video ref={videoRef} src={src} className="" playsInline />
      <button
        onClick={togglePlayPause}
        className="p-2 bg-black rounded-xl border border-white absolute bottom-4 right-4 cursor-pointer"
      >
        <img
          src={`${isPlaying ? pause : play}`}
          alt=""
          className="h-5 w-5 text"
        />
      </button>
    </div>
  );
}
