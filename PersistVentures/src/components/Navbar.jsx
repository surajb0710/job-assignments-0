import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <>
      <nav className="z-50 sticky top-10 flex justify-between items-center mt-10 py-6 px-5 bg-[#9275e0] rounded-2xl  backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
        <img src={logo} alt="" height={80} width={150} />
        <ul className="flex justify-between items-center gap-10">
          <li className="text-white">Home</li>
          <li className="text-white">Search for Jobs</li>
          <li className="text-white">Start Hiring</li>
        </ul>
        <button className="text-white bg-[#7a56d6] opacity-90 px-5 py-2 rounded-xl">
          Login
        </button>
      </nav>
    </>
  );
};

export default Navbar;
