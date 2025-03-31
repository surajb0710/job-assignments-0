import React from 'react';

const NeedHelp = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:team@devscareeraccelerator.com';
  };

  return (
    <div className="w-full flex flex-col items-center rounded-4xl gap-y-5 py-10 px-20 backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
      <h2 className="text-4xl text-center">Need Help? We're Here for You!</h2>
      <p className="text-center">
        Got questions or need assistance with the program? Our team is just an
        email away. Reach out anytime, and we'll be happy to support you on your
        journey!
      </p>
      <button
        type="button"
        onClick={handleEmailClick}
        className="w-max text-base bg-[#7e6bd2] px-5 h-12 rounded-[24px] shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
      >
        team@devscareeraccelerator.com
      </button>
    </div>
  );
};

export default NeedHelp;
