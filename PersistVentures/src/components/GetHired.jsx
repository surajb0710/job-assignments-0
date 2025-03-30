import React from 'react';
import linkedin from '../assets/images/linkedin.png';
import globe from '../assets/images/globe.png';
import arrow02 from '../assets/images/arrow02.png';
import { person } from '../assets/assets';
import rocket from '../assets/images/rocket.png';
import target from '../assets/images/target.png';
import ScrollTriggered from './CardAnimation';
import AnimatedJobCards from './CardAnimation';

const GetHired = () => {
  return (
    <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 relative">
      <img
        src={arrow02}
        alt=""
        className="h-50 w-50 absolute z-20 top-80 -rotate-10"
      />
      <img
        src={arrow02}
        alt=""
        className="h-50 w-50 absolute z-20 top-180 rotate-180"
      />
      <h2 className="text-4xl text-center">
        Get Hired or Hire Top Talent - Fast!
      </h2>
      <p className="text-center">
        Accelerate your career or hire top developers with ease!
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-10">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2 pl-50 h-max self-end">
          <Card
            title="Land Your Dream Job"
            description="Optimize your LinkedIn to attract top recruiters."
            buttonLabel="Explore Now"
            img={rocket}
          />
        </div>
        <div className="h-100 overflow-clip relative col-start-2 col-end-3 row-start-1 row-end-2 rounded-2xl backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
          <div className="absolute bottom-[-10px] right-[-10px] z-20">
            <JobCard />
          </div>
          <div className="absolute top-[-10px] right-[-70px] z-10">
            <JobCard />
          </div>
          <div className="absolute bottom-[-40px] right-[190px] z-10">
            <JobCard />
          </div>
          <div className="absolute bottom-[80px] right-[100px]">
            <JobCard />
          </div>
        </div>
        <div className="h-100 overflow-clip relative col-start-2 col-end-3 row-start-1 row-end-2 rounded-2xl backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
          <AnimatedJobCards />
        </div>
        <div className="relative h-100 overflow-clip col-start-1 col-end-2 row-start-2 row-end-3 rounded-2xl backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
          <div className="absolute top-0 left-[100px]">
            <UserProfileCard />
          </div>
          <div className="absolute bottom-35 left-[150px] scale-50">
            <UserProfileCard />
          </div>
          <div className="absolute bottom-5 left-[100px] scale-130">
            <UserProfileCard />
          </div>
        </div>
        <div className="col-start-2 col-end-3 row-start-2 row-end-3 pr-50 h-max self-start">
          <Card
            title="Hire Top Developers Fast!"
            description="Access job-ready tech talent and fill roles effortlessly."
            buttonLabel="Start Posting"
            img={target}
          />
        </div>
      </div>
    </div>
  );
};

export default GetHired;

const JobCard = () => {
  return (
    <div className="bg-black rounded-2xl p-6 flex flex-col gap-3 border border-white">
      <div className="flex gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded-xl w-max text-white border border-white text-sm"
        >
          Job
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-xl w-max text-white border border-white text-sm glow-border"
        >
          Full Time
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-white p-2 rounded-full">
          <img src={linkedin} alt="" />
        </div>
        <div>
          <p className="text-white">Flutter Developer</p>
          <p className="text-white text-[12px]">Persist Ventures</p>
        </div>
      </div>
      <hr className="h-0.5 text-white" />
      <div className="flex gap-4">
        <p className="text-white text-[12px] flex gap-1">
          <span>$</span>1,00,000
        </p>
        <div className="text-white text-[12px] flex gap-2 items-center relative">
          <div className="relative h-3 w-3">
            <img
              src={globe}
              alt=""
              className="absolute h-3 w-3 z-10 animate-ping"
            />
          </div>
          WorldWide
        </div>
      </div>
      <button className="w-max text-sm bg-[#7e6bd2] px-5 py-2 rounded-xl border-white shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer">
        View Details
      </button>
    </div>
  );
};

const Card = ({ title, description, buttonLabel, img }) => {
  return (
    <div className="h-full flex flex-col justify-between gap-4 p-6 rounded-2xl border-2 border-[#f7fafc90] shadow-[8px_8px_1px_1px_#615c8c]">
      <h3 className="text-3xl">
        {title}
        <img src={img} alt="" className="h-8 w-8" />
      </h3>
      <p>{description}</p>
      <button className="w-max text-base px-5 py-3 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] cursor-pointer">
        {buttonLabel}
      </button>
    </div>
  );
};

const UserProfileCard = () => {
  return (
    <div className="flex items-center w-max gap-4 p-3 rounded-2xl bg-black">
      <img
        src={person.person1}
        alt=""
        className="rounded-full h-10 w-10 object-cover blur-[1px]"
      />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-gray-500 rounded animate-pulse"></div>
        <div className="h-3 w-24 bg-gray-500 rounded animate-pulse"></div>
        <div className="h-2 w-16 bg-gray-500 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

const UserProfileCardSkeleton = () => {
  return (
    <div className="flex items-center w-max gap-4 p-2 rounded-2xl bg-black">
      {/* Skeleton for image */}
      <div className="h-10 w-10 rounded-full bg-gray-500 animate-pulse"></div>

      {/* Skeleton for text */}
      <div className="flex flex-col gap-1">
        <div className="h-4 w-32 bg-gray-500 rounded animate-pulse"></div>
        <div className="h-3 w-24 bg-gray-500 rounded animate-pulse"></div>
        <div className="h-2 w-16 bg-gray-500 rounded animate-pulse"></div>
      </div>
    </div>
  );
};
