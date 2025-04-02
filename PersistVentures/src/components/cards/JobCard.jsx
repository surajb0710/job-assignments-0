import { MapPin, Briefcase, Banknote } from 'lucide-react';
import { timeAgo } from '../../utils/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';

const JobCard = ({ job, applicantEmail, isRecruiter }) => {
  const [apply, setApply] = useState(false);

  useEffect(() => {
    const applyForJob = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/jobapplication',
          {
            recruiterEmail: job.email,
            title: job.title,
            applicantEmail: applicantEmail,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    apply && applyForJob(job);
  }, [job, apply, applicantEmail]);

  return (
    <div className="p-5 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] flex flex-col gap-3 bg-gradient">
      <div>
        <div className="flex justify-between">
          <h3 className="mb-1 text-lg">{job.title}</h3>
          {!isRecruiter && (
            <button
              onClick={() => setApply(true)}
              className="w-max text-base px-5 py-2 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
        <h4 className="text-sm text-[#bbafe8]">{job.company}</h4>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-1 text-sm items-center">
          <div className="bg-[#bbafe840] p-1 rounded-xl">
            <MapPin size={20} />
          </div>
          {job.location}
        </div>
        <div className="flex gap-1 text-sm items-center">
          <div className="bg-[#bbafe840] p-1 rounded-xl">
            <Briefcase size={20} />
          </div>
          {job.experience}
        </div>
        <div className="flex gap-1 text-sm items-center">
          <div className="bg-[#bbafe840] p-1 rounded-xl">
            <Banknote size={20} />
          </div>
          {job.salary}
        </div>
      </div>
      <ul className="flex gap-2">
        {job.skills.map((skill, index) => (
          <li
            key={index}
            className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="text-sm">{timeAgo(job.updatedAt)}</div>
    </div>
  );
};

export default JobCard;
