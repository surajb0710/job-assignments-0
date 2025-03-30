import React from 'react';
import search from '../assets/images/search.png';

const HeroComponent = () => {
  return (
    <div className="flex flex-col items-center mt-10 w-200 px-15 gap-y-8">
      <div className="relative flex justify-center items-center gap-4 border border-white h-10 rounded-[20px] w-max px-5 shadow-[inset_0px_0px_7px_1px_#f7fafc90]">
        {/* <div className="flashing"></div> */}
        <div className="absolute flashing w-[30px] h-[30px] cursor-default left-[10px] m-auto z-10"></div>
        <span className="ml-7 text-sm">Automate</span>
        <span className="text-sm">Accelerate</span>
        <span className="text-sm">Achieve</span>
      </div>
      <h1 className="text-6xl text-center">Unlock Your Dream Job with Ease</h1>
      <p className="text-base text-center">
        Boost your salary by $10k-$300k with our all in one career accelerator.
      </p>
      <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 shadow-[inset_0px_0px_10px_1px_#f7fafc90]">
        <h2 className="text-4xl text-center flex justify-between items-start">
          <img src={search} alt="" className="h-10 w-10" /> Check Your
          Elligibility in Seconds!
        </h2>
        <p className="text-center">
          Just drop your linkedin profile link below, and we will guide you
          through the journey
        </p>
        <form
          action=""
          className="flex justify-between items-center gap-2 w-full"
        >
          <input
            type="text"
            placeholder="Paste your Linkedin Url here..."
            className="h-10 rounded-[20px] grow px-5 shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm"
          />
          <button className="text-base bg-[#7e6bd2] px-5 h-12 rounded-[24px] shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer">
            Check now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroComponent;
