import React from 'react';
import HorinzontalScrollingComponent from './HorinzontalScrollingComponent';

const TrustedPartner = () => {
  return (
    <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 relative mt-10">
      <h2 className="text-4xl text-center">Our Trusted Partners</h2>
      <p className="text-center">
        Collaborating with top insdustry leaders to bring you the best resource
        and opportunities for career success
      </p>
      <HorinzontalScrollingComponent direction="left-to-right" />
      <HorinzontalScrollingComponent direction="right-to-left" />
    </div>
  );
};

export default TrustedPartner;
