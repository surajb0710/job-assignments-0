import React from 'react';

const NeedHelp = () => {
  return (
    <div className="w-full flex flex-col items-center rounded-4xl gap-y-5 py-10 px-20 backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
      <h2 className="text-4xl text-center">Need Help? We're Here for You!</h2>
      <p className="text-center">
        Got questions or need assistance with the program? Our team is just an
        email away. Reach out anytime, and we'll be happy to support you on your
        journey!
      </p>
      <button type="button" className="h-10 rounded-[20px] px-5 bg-amber-200">
        team@devscareeraccelerator.com
      </button>
    </div>
  );
};

export default NeedHelp;
