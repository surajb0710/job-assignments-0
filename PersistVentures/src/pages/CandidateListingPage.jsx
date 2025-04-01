import React from 'react';

const CandidateListingPage = () => {
  return (
    <div className="">
      <div className="w-full h-100 bg-green-300 my-10"></div>
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>{' '}
      <div className="w-full h-100 bg-green-300 my-10"></div>
    </div>
  );
};

export default CandidateListingPage;

const CandidateCard = ({ user }) => {
  return (
    <div className="">
      <img src={user.profilePic} alt="" className="" />
      <h2>{user.fullName}</h2>
      <p>{user.phoneNumber}</p>
      <p>{user.email}</p>
      <p>{user.profileSummary}</p>
      <ul className="flex gap-2">
        {user.skills.map((skill, index) => (
          <li
            key={index}
            className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg"
          >
            {skill}
          </li>
        ))}
      </ul>
      <p>{user.linkedinUrl}</p>
      <p>{user.experience}</p>
    </div>
  );
};
