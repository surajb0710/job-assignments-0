import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase, Banknote, Clock8, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModel } from '../features/jobModelSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { applyByDate, timeAgo } from '../utils/utils';

const JobModel = () => {
  const dispatch = useDispatch();
  const showJobModel = useSelector((state) => state.jobModel.showJobModel);
  const jobId = useSelector((state) => state.jobModel.currentJobId);

  const [currentJob, setCurrentJob] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
      dispatch(toggleModel());
    }
  };

  useEffect(() => {
    const getJobDetails = async (jobId) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/job`,
          {
            _id: jobId,
          }
        );
        setCurrentJob(response.data.currentJob);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    jobId !== '' && getJobDetails(jobId);
  }, [jobId]);

  const handleCloseBtnClick = () => {
    dispatch(toggleModel());
  };

  return (
    <AnimatePresence>
      {showJobModel && (
        <motion.div className="max-w-full flex items-center justify-center">
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full h-[80%] bg-gradient my-10 gap-5 px-10 py-5 flex flex-col justify-center rounded-2xl shadow-[inset_0px_0px_7px_1px_#f7fafc90]"
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <button
                type="button"
                className="absolute right-5 top-5 p-2 bg-[#bbafe840] rounded-2xl cursor-pointer"
                onClick={handleCloseBtnClick}
              >
                <X />
              </button>
              <h1 className="text-3xl text-left">{currentJob.title}</h1>
              <div className="grid grid-cols-2 grid-rows-[1fr_max-content] space-y-2">
                <div className="flex flex-col justify-between gap-3">
                  <p className="text-lg text-[#9793b5]">
                    {currentJob.companyName}
                  </p>
                  <div className="flex gap-1 text-sm items-center">
                    <div className="bg-[#bbafe840] p-1 rounded-xl">
                      <MapPin size={20} />
                    </div>
                    {currentJob.location}
                  </div>
                  <div className="flex gap-6">
                    <div className="flex gap-1 text-sm items-center">
                      <div className="bg-[#bbafe840] p-1 rounded-xl">
                        <Briefcase size={20} />
                      </div>
                      {currentJob.experience}
                    </div>
                    <div className="flex gap-1 text-sm items-center">
                      <div className="bg-[#bbafe840] p-1 rounded-xl">
                        <Banknote size={20} />
                      </div>
                      {currentJob.salary}
                    </div>
                    <div className="flex gap-1 text-sm items-center">
                      <div className="bg-[#bbafe840] p-1 rounded-xl">
                        <Clock8 size={20} />
                      </div>
                      Apply By {applyByDate(currentJob.expiryDate)}
                    </div>
                  </div>
                  <div className="text-sm">{timeAgo(currentJob.createdAt)}</div>
                </div>
                <div>
                  <h2 className="mb-1 text-[#9793b5]">Key responsibilities</h2>
                  <ol className="list-decimal list-inside">
                    {currentJob.responsibilities?.map((item, index) => (
                      <li className="text-sm" key={index}>
                        {item.slice(2)}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="h-full">
                  <h2 className="mb-1 text-[#9793b5]">Skills Required</h2>
                  <ol className="flex gap-2">
                    {currentJob.skills?.map((item, index) => (
                      <li
                        className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg"
                        key={index}
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="h-max">
                  <h2 className="mb-1 text-[#9793b5]">Who Can Apply</h2>
                  <div className="p-2 border border-[#9793b5] rounded-md bg-[#9793b590] ml-5 w-max">
                    <p className="text-sm">
                      Only those candidates can apply who:
                    </p>
                    <ol className="list-decimal list-inside">
                      {currentJob.whoCanApply?.map((item, index) => (
                        <li className="text-sm" key={index}>
                          {item.slice(2)}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="mb-1 text-[#9793b5]">Salary</h2>
                <p className="text-sm">
                  {`Annual CTC: ${currentJob.salary} /year`}
                </p>
              </div>
              <div>
                <h2 className="mb-1 text-[#9793b5]">
                  {currentJob.companyName}
                </h2>
                <p className="text-sm text-wrap">{currentJob.aboutCompany}</p>
              </div>
              <button
                type="button"
                onClick={handleClick}
                className="w-max self-center text-base bg-[#7e6bd2] px-5 h-12 rounded-[24px] shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
              >
                Apply Now
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModel;
