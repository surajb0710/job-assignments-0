import { MapPin, Briefcase, Banknote } from 'lucide-react';
import { timeAgo } from '../../utils/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleModel, setCurrentJobId } from '../../features/jobModelSlice';

const JobCard = ({
  job,
  authUser,
  isRecruiter,
  setIsApplying,
  setApiSuccess,
}) => {
  const [apply, setApply] = useState(false);
  const [jobApplied, setJobApplied] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const applyForJob = async () => {
      setIsApplying(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/jobapplication`,
          {
            job: job,
            authUser: authUser,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        if (response.data.success) {
          setApiSuccess(true);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    apply && applyForJob(job, authUser);
  }, [job, apply, authUser, setApiSuccess, setIsApplying]);

  const handleApplyNowBtnClick = () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    } else {
      setApply(true);
      setJobApplied(true);
    }
  };

  const handleViewDetailsBtnClick = () => {
    dispatch(toggleModel());
    dispatch(setCurrentJobId(job._id));
  };

  return (
    <div className="p-5 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] flex gap-3 bg-gradient">
      <div className="grow flex flex-col gap-3">
        <div>
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg">{job.title}</h3>
          </div>
          <h4 className="text-sm text-[#bbafe8]">test company</h4>
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
      <div className="flex flex-col gap-3">
        <button
          onClick={handleViewDetailsBtnClick}
          className="w-full text-base px-5 py-2 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] cursor-pointer"
        >
          View Details
        </button>
        {!isRecruiter &&
          !authUser.jobsApplied.includes(job._id) &&
          !jobApplied && (
            <button
              onClick={handleApplyNowBtnClick}
              className="w-full glow-border text-base px-5 py-2 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] cursor-pointer"
            >
              Apply Now
            </button>
          )}
      </div>
    </div>
  );
};

export default JobCard;
