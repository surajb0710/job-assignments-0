import Curious from '../components/Curious';
import GetHired from '../components/GetHired';
import HeroComponent from '../components/HeroComponent';
import NeedHelp from '../components/NeedHelp';
import RealStories from '../components/RealStories';
import SetApart from '../components/SetApart';
import TrustedPartner from '../components/TrustedPartner';
import WeDoEverything from '../components/WeDoEverything';
import React, { useRef } from 'react';

const HomePage = () => {
  const section1Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
  };

  return (
    <main className="flex flex-col items-center">
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
