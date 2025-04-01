import React from 'react';
import logo from '../assets/logo.svg';
import { social } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-30">
      <div className="flex gap-20">
        <div className="flex-1 flex flex-col gap-5">
          <img src={logo} alt="" height={80} width={150} />
          <p>Where Developers Get Coding Jobs</p>
          <p>
            Find your dream coding job with ease! Our platform connects
            developers to top companies, offering tailored job matchers for
            fast, hassle-free firing. Whether you're just starting or an
            experienced pro, we help you land the perfect role and advance your
            career.
          </p>
        </div>
        <div className="flex-1 flex gap-10">
          <div className="flex flex-col gap-5">
            <Link to="/">
              <p>Home</p>
            </Link>
            <Link to="/aboutus">
              <p>About Us</p>
            </Link>
            <Link to="/ourteam">
              <p>Our Team</p>
            </Link>
            <Link to="/blogs">
              <p>Blogs</p>
            </Link>
            <Link to="/faqs">
              <p>FAQs</p>
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <Link to="/privacypolicy">
              <p>Privacy Policy</p>
            </Link>
            <Link to="/termsandconditions">
              <p>Terms and Conditions</p>
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <Link to="/jobs">
              <p>Explore Jobs</p>
            </Link>
            <Link to="/candidates">
              <p>Start Hiring Developers</p>
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex justify-between mb-5">
        <p>© 2025 Careeraccelerator. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="https://www.linkedin.com/company/devs-career-accelerator/">
            <div className="p-2 flex items-center justify-center rounded-full bg-[#9793b5] h-10 w-10 cursor-pointer">
              <img src={social.linkedin} alt="" className="h-5 w-5" />
            </div>
          </Link>
          <Link to="">
            <div className="p-2 flex items-center justify-center rounded-full bg-[#9793b5] h-10 w-10 cursor-pointer">
              <img src={social.discord} alt="" className="h-5 w-5" />
            </div>
          </Link>
          <Link to="https://x.com/CareerAcce88300">
            <div className="p-2 flex items-center justify-center rounded-full bg-[#9793b5] h-10 w-10 cursor-pointer">
              <img src={social.twitter} alt="" className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
