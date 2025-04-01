import React from 'react';

const SetApart = ({ targetRef, onNavigate }) => {
  return (
    <div className="flex justify-between w-full gap-12 mt-20">
      <div className="rounded-2xl flex-3/7 flex items-center justify-center max-h-[300px] backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
        <img
          src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b"
          alt=""
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex-4/7 shrink-0 flex flex-col justify-between">
        <p className="text-4xl text-center">
          Hundreds apply for the same job - so what sets you apart?
        </p>
        <p className="text-base">
          Truth is, everyone's grinding LeetCode, attending bootcamps, and
          following the same playbook. But landing the job isn't just about
          coding skills-it's about knowing how to get hired.
        </p>
        <p className="text-base">
          That's why you see less-skilled candidates securing top roles while
          others struggle. The real advantage? Mastering the jon hunt, not just
          the code.
        </p>
        <button
          onClick={() => onNavigate(targetRef)}
          className="w-max text-base bg-[#7e6bd2] px-5 h-12 rounded-[24px] shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SetApart;
