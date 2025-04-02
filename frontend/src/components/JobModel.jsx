import React from 'react';
import { MapPin, Briefcase, Banknote, Clock8, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModel } from '../features/jobModelSlice';
import { motion, AnimatePresence } from 'framer-motion';

const JobModel = () => {
  const dispatch = useDispatch();
  const showJobModel = useSelector((state) => state.jobModel.showJobModel);

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
              className="relative bg-gradient my-10 gap-5 px-10 py-5 flex flex-col justify-center rounded-2xl shadow-[inset_0px_0px_7px_1px_#f7fafc90]"
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <button
                type="button"
                className="absolute right-5 top-5 p-2 bg-[#bbafe840] rounded-2xl cursor-pointer"
                onClick={() => dispatch(toggleModel())}
              >
                <X />
              </button>
              <h1 className="text-3xl text-left">Junior PHP Developer</h1>
              <div className="grid grid-cols-2 grid-rows-[1fr_max-content] space-y-2">
                <div className="flex flex-col justify-between">
                  <p className="text-lg text-[#9793b5]">
                    Brandzzy SoftTech Private Limited
                  </p>
                  <div className="flex gap-1 text-sm items-center">
                    <div className="bg-[#bbafe840] p-1 rounded-xl">
                      <MapPin size={20} />
                    </div>
                    Bhubaneswar
                  </div>
                  <div className="flex gap-6">
                    <div className="flex gap-1 text-sm items-center">
                      <div className="bg-[#bbafe840] p-1 rounded-xl">
                        <Briefcase size={20} />
                      </div>
                      1 year(s)
                    </div>
                    <div className="flex gap-1 text-sm items-center">
                      <div className="bg-[#bbafe840] p-1 rounded-xl">
                        <Banknote size={20} />
                      </div>
                      ₹ 2,00,000 - 3,00,000
                    </div>
                    <div className="flex gap-1 text-sm items-center">
                      <div className="bg-[#bbafe840] p-1 rounded-xl">
                        <Clock8 size={20} />
                      </div>
                      Apply By 28 Apr' 25
                    </div>
                  </div>
                  <div className="text-sm">1 day ago</div>
                </div>
                <div>
                  <h2 className="mb-1 text-[#9793b5]">Key responsibilities</h2>
                  <ol className="list-decimal list-inside">
                    <li className="text-sm">
                      Create and manage Laravel-based applications.
                    </li>
                    <li className="text-sm">
                      Work with senior developers on new features.
                    </li>
                    <li className="text-sm">Optimize and debug apps.</li>
                    <li className="text-sm">
                      Stay up to date on the latest technology trends.
                    </li>
                    <li className="text-sm">
                      Use AI tools to increase productivity.
                    </li>
                  </ol>
                </div>
                <div className="h-full">
                  <h2 className="mb-1 text-[#9793b5]">Skills Required</h2>
                  <ol className="flex gap-2">
                    <li className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg">
                      Bash
                    </li>
                    <li className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg">
                      CI/CD
                    </li>
                    <li className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg">
                      PHP
                    </li>
                    <li className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg">
                      React
                    </li>
                    <li className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg">
                      Linux
                    </li>
                  </ol>
                </div>
                <div className="h-max">
                  <h2 className="mb-1 text-[#9793b5]">Who Can Apply</h2>
                  <div className="p-2 border border-[#9793b5] rounded-md bg-[#9793b590] ml-5 w-max">
                    <p className="text-sm">
                      Only those candidates can apply who:
                    </p>
                    <ol className="list-decimal list-inside">
                      <li className="text-sm">
                        have minimum 1 years of experience
                      </li>
                      <li className="text-sm">have required skillsets</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="mb-1 text-[#9793b5]">Salary</h2>
                <p className="text-sm">
                  Annual CTC: ₹ 2,00,000 - 3,00,000 /year
                </p>
              </div>
              <div>
                <h2 className="mb-1 text-[#9793b5]">
                  About Brandzzy SoftTech Private Limited
                </h2>
                <p className="text-sm text-wrap">
                  Brandzzy SoftTech is a software company. We are creators and
                  innovators, with an unwavering focus on developing superior
                  software products. LaraPush is our flagship product, offering
                  a robust push notification technology designed to drive user
                  engagement and conversions for website owners. With LaraPush,
                  staying connected with your audience has never been easier or
                  more effective.
                </p>
              </div>
              <button
                type="button"
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
