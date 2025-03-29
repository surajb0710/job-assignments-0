import Curious from '../components/Curious';
import GetHired from '../components/GetHired';
import HeroComponent from '../components/HeroComponent';
import NeedHelp from '../components/NeedHelp';
import RealStories from '../components/RealStories';
import SetApart from '../components/SetApart';
import TrustedPartner from '../components/TrustedPartner';
import WeDoEverything from '../components/WeDoEverything';

const HomePage = () => {
  return (
    <main className="flex flex-col items-center">
      <HeroComponent />
      <TrustedPartner />
      <SetApart />
      <WeDoEverything />
      <GetHired />
      <RealStories />
      <Curious />
      <NeedHelp />
    </main>
  );
};

export default HomePage;
