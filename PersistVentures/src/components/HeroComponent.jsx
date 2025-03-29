import React from 'react';

const HeroComponent = () => {
  return (
    <div className="flex flex-col items-center mt-10 w-200 px-15 gap-y-8">
      <div className="flex justify-center items-center  gap-4 border border-white h-10 rounded-[20px] w-max px-5">
        <div className="rounded-full h-2 w-2 backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]"></div>
        <span>Automate</span>
        <span>Accelerate</span>
        <span>Achieve</span>
      </div>
      <h1 className="text-6xl text-center">Unlock Your Dream Job with Ease</h1>
      <p>
        Boost your salary by $10k-$300k with our all in one career accelerator
      </p>
      <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
        <h2 className="text-4xl text-center">
          Check Your Elligibility in Seconds!
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
            className="h-10 rounded-[20px] grow border px-5"
          />
          <button
            type="submit"
            className="h-10 rounded-[20px] px-5 bg-amber-200"
          >
            Check now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroComponent;
