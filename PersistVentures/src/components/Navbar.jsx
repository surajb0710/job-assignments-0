import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <>
      <nav className="z-50 sticky top-10 flex justify-between items-center mt-10 py-6 px-5 bg-[#7c74a4] rounded-3xl shadow-[inset_0px_0px_10px_1px_#f7fafc90]">
        <img src={logo} alt="" height={80} width={150} />
        <ul className="flex justify-between items-center gap-10">
          <li className="text-base">Home</li>
          <li className="text-base">Search for Jobs</li>
          <li className="text-base">Start Hiring</li>
        </ul>
        <button className="text-base bg-[#7e6bd2] px-5 py-3 rounded-xl shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer">
          Login
        </button>
      </nav>
    </>
  );
};

export default Navbar;
