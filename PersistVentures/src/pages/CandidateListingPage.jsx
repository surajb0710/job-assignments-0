import React from 'react';
import data from '../../data.json';
import { Mail, Briefcase, Phone } from 'lucide-react';

const CandidateListingPage = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      {data.map((user, index) => (
        <CandidateCard user={user} key={index} />
      ))}
    </div>
  );
};

export default CandidateListingPage;

const CandidateCard = ({ user }) => {
  return (
    <div className="shadow-[inset_0px_0px_5px_1px_#f7fafc90] p-5 rounded-2xl flex flex-col gap-3 bg-gradient">
      <h2>{user.fullName}</h2>
      <div className="flex gap-5">
        <div className="text-sm flex items-center gap-1">
          <div className="bg-[#bbafe840] p-1.5 rounded-xl w-max">
            <Phone size={20} />
          </div>
          {user.phoneNumber}
        </div>
        <div className="text-sm flex items-center gap-1">
          <div className="bg-[#bbafe840] p-1.5 rounded-xl w-max">
            <Mail size={20} />
          </div>
          {user.email}
        </div>
      </div>

      <ul className="flex gap-2">
        {user.skills.map((skill, index) => (
          <li
            key={index}
            className="text-[12px] px-1 py-0.5 bg-[#9793b5] rounded-lg"
          >
            {skill}
          </li>
        ))}
      </ul>
      <p className="text-sm ">{user.linkedInUrl}</p>
      <div className="text-sm flex items-center gap-1">
        <div className="bg-[#bbafe840] p-1.5 rounded-xl w-max">
          <Briefcase size={20} />
        </div>
        {user.experience}
      </div>
      <p className="text-sm">{user.professionalSummary}</p>
    </div>
  );
};
