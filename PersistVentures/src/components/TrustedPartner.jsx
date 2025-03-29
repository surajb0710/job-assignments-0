import React from 'react';
import HorinzontalScrollingComponent from './HorinzontalScrollingComponent';

const TrustedPartner = () => {
  return (
    <div>
      <p>Our Trusted Partners</p>
      <p>
        Collaborating with top insdustry leaders to bring you the best resource
        and opportunities for career success
      </p>
      <HorinzontalScrollingComponent direction="left-to-right" />
      <HorinzontalScrollingComponent direction="right-to-left" />
    </div>
  );
};

export default TrustedPartner;
