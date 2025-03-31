import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      <nav className="z-50 sticky top-10 flex justify-between items-center mt-10 py-6 px-5 bg-[#7c74a4] rounded-3xl shadow-[inset_0px_0px_10px_1px_#f7fafc90]">
        <img src={logo} alt="" height={80} width={150} />
        <ul className="flex justify-between items-center gap-10">
          <Link to="/">
            <li className="text-base">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="text-base">Search for Jobs</li>
          </Link>
          <Link to="/candidates">
            <li className="text-base">Start Hiring</li>
          </Link>
        </ul>
        {!isAuthenticated && (
          <Link to="/login">
            <button className="text-base bg-[#7e6bd2] px-5 py-3 rounded-xl shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer">
              Login
            </button>
          </Link>
        )}
        {isAuthenticated && (
          <div className="flex gap-5">
            <Link to="/dashboard">
              <button className="text-base bg-[#7e6bd2] px-5 py-3 rounded-xl shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer">
                Dashboard
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="text-base bg-[#7e6bd2] px-5 py-3 rounded-xl shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
