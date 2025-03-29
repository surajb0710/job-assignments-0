import React from 'react';
import logo from '../assets/logo.svg';
import { social } from '../assets/assets';

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
            <p>Home</p>
            <p>About Us</p>
            <p>Our Team</p>
            <p>Blogs</p>
            <p>FAQs</p>
          </div>
          <div className="flex flex-col gap-5">
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
          </div>
          <div className="flex flex-col gap-5">
            <p>Explore Jobs</p>
            <p>Start Hiring Developers</p>
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex justify-between mb-5">
        <p>© 2025 Careeraccelerator. All rights reserved.</p>
        <div className="flex gap-5">
          <img src={social.linkedin} alt="" className="h-6 w-6" />
          <img src={social.discord} alt="" className="h-6 w-6" />
          <img src={social.twitter} alt="" className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
