import React from 'react';
import linkedIn from '../assets/images/linkedin.png';

const WeDoEverything = () => {
  return (
    <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 ">
      <h2 className="text-4xl text-center">We Do Everything For You!</h2>
      <p className="text-center">
        Looking for your next big career move? Relax - We will handle it all!
      </p>
      <div className="grid grid-cols-3 grid-rows-2 gap-5">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2">
          <Card1
            title="Craft a Standout Resume"
            description="Stand out with a professionally designed, tailor-made resume."
          />
        </div>
        <div className="col-start-2 col-end-3 row-start-1 row-end-2">
          <Card1
            title="LinkedIn Profile Enhancement"
            description="Optimize your LinkedIn to attract top recruiters."
          />
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2">
          <Card1
            title="Automated Job Applications"
            description="Let automation work for you, apply to jobs without lifting a finger"
          />
        </div>
        <div className="col-start-1 col-end-2 row-start-2 row-end-3">
          <Card1
            title="Personalized Career Advice"
            description="Receive guidance tailored to your goals, plus interview prep and insider tips."
          />
        </div>
        <div className="col-start-2 col-end-4 row-start-2 row-end-3">
          <Card2 />
        </div>
      </div>
    </div>
  );
};

export default WeDoEverything;

const Card1 = ({ title, description }) => {
  return (
    <div className="h-full flex flex-col gap-4 p-6 rounded-2xl backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
      <div className="p-2 rounded-xl bg-amber-300 h-10 w-10">
        <img src={linkedIn} alt="" className="" />
      </div>
      <p className="text-2xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};

const Card2 = () => {
  return (
    <div className="h-full flex flex-col justify-between gap-4 p-6 rounded-2xl backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
      <p className="text-3xl">Take Stress out of job hunting</p>
      <p>
        Join our accelerator program and focus on your future while we handle
        the hard work.
      </p>
      <button
        type="button"
        className="h-10 rounded-[20px] px-5 bg-amber-200 w-max"
      >
        Get Started Now
      </button>
    </div>
  );
};
