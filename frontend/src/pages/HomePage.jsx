import Curious from '../components/Curious';
import GetHired from '../components/GetHired';
import HeroComponent from '../components/HeroComponent';
import NeedHelp from '../components/NeedHelp';
import RealStories from '../components/RealStories';
import SetApart from '../components/SetApart';
import TrustedPartner from '../components/TrustedPartner';
import WeDoEverything from '../components/WeDoEverything';
import React, { useRef } from 'react';
import linkedin from '../assets/images/linkedin_01.png';
import typescript from '../assets/images/typescript.png';

const HomePage = () => {
  const section1Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex flex-col items-center">
      <div className="absolute -right-20 top-50 blur-xs">
        <img src={linkedin} alt="" className="w-60 aspect-square rotate-15" />
      </div>
      <div className="absolute -left-20 top-120 blur-xs">
        <img
          src={typescript}
          alt=""
          className="w-60 aspect-square -rotate-15"
        />
      </div>
      <HeroComponent section1Ref={section1Ref} />
      <TrustedPartner />
      <SetApart targetRef={section1Ref} onNavigate={scrollToSection} />
      <WeDoEverything targetRef={section1Ref} onNavigate={scrollToSection} />
      <GetHired />
      <RealStories />
      <Curious />
      <NeedHelp />
    </main>
  );
};

export default HomePage;
