import React from 'react';

const SetApart = () => {
  return (
    <div className="flex justify-between w-full gap-5 ">
      <div className="rounded-2xl flex-3/7 p-5 flex items-center justify-center max-h-[300px] backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
        <img
          src="https://images.pexels.com/photos/31316995/pexels-photo-31316995/free-photo-of-dramatic-black-and-white-bridge-arch-in-paris.jpeg"
          alt=""
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex-4/7 shrink-0 flex flex-col justify-between">
        <p className="text-4xl text-center">
          Hundreds apply for the same job - so what sets you apart?
        </p>
        <p>
          Truth is, everyone's grinding LeetCode, attending bootcamps, and
          following the same playbook. But landing the job isn't just about
          coding skills-it's about knowing how to get hired.
        </p>
        <p>
          That's why you see less-skilled candidates securing top roles while
          others struggle. The real advantage? Mastering the jon hunt, not just
          the code.
        </p>
        <button className="self-start h-10 rounded-[20px] px-5 bg-amber-200">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SetApart;
