import React, { useEffect, useState } from 'react';
import JobCard from '../components/cards/JobCard';
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModel } from '../features/jobPostModelSlice';
import RocketAnimation from '../animation/RocketAnimation';

const DashboardPage = () => {
  const [jobsList, setJobsList] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const [skillsArray, setSkillsArray] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const [isApplying, setIsApplying] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  const showJobPostModel = useSelector(
    (state) => state.jobPostModel.showJobPostModel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.VITE_BACKEND_URL}/skills`
        );

        const formattedSkills = response.data.map((skill, index) => ({
          skills: skill,
          id: index + 1,
        }));

        setSkillsArray(formattedSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getSkills();
  }, []);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.VITE_BACKEND_URL}/jobs`
        );
        setJobsList(response.data.sortedJobs);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getJobs();
  }, [showJobPostModel]);

  useEffect(() => {
    const getAuthUser = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await axios.get(
          `${import.meta.VITE_BACKEND_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuthUser(response.data.user);
        setSelectedSkills(
          response.data.user.skills.map((skill) => ({
            skills: skill,
            id: skillsArray.find((s) => s.skills === skill)?.id || skill,
          }))
        );
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getAuthUser();
  }, [skillsArray]);

  const formik = useFormik({
    initialValues: {
      fullName: authUser?.fullName || '',
      phoneNumber: authUser?.phoneNumber || '',
      email: authUser?.email || '',
      linkedInUrl: authUser?.linkedInUrl || '',
      skills: selectedSkills,
      experience: authUser?.experience || '',
      professionalSummary: authUser?.professionalSummary || '',
      isRecruiter: authUser?.isRecruiter || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const skillsArray = values.skills.map((item) => item.skills);

        const updateResponse = await axios.patch(
          `${import.meta.VITE_BACKEND_URL}/profile`,
          {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            skills: skillsArray,
            experience: values.experience,
            professionalSummary: values.professionalSummary,
            isRecruiter: values.isRecruiter,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        if (updateResponse.data.success) {
          toast.success(updateResponse.data.message);
        } else {
          toast.error(updateResponse.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSelectSkills = (selectedList) => {
    setSelectedSkills(selectedList);
    formik.setFieldValue('skills', selectedList);
  };

  const onRemoveSkills = (selectedList) => {
    setSelectedSkills(selectedList);
    formik.setFieldValue('skills', selectedList);
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowProfile(false);
  };

  const handleProfielClick = () => {
    setShowDashboard(false);
    setShowProfile(true);
  };

  const resetApiSuccess = () => {
    setApiSuccess(false);
    setIsApplying(false);
  };

  return (
    <div className="flex w-full mt-10 gap-10">
      <div className="flex-1/4 h-max py-10 px-10 flex flex-col gap-5 rounded-2xl shadow-[inset_0px_0px_7px_1px_#f7fafc90]">
        <p
          className={`p-2 rounded-lg cursor-pointer ${
            showDashboard ? 'bg-[#9793b5]' : ''
          }`}
          onClick={handleDashboardClick}
        >
          Dashboard
        </p>
        <p
          className={`p-2 rounded-lg cursor-pointer ${
            showProfile ? 'bg-[#9793b5]' : ''
          }`}
          onClick={handleProfielClick}
        >
          User Profile
        </p>
        {formik.values.isRecruiter && (
          <button
            onClick={() => dispatch(toggleModel())}
            className="w-max text-base px-5 py-2 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] cursor-pointer"
          >
            Post a Job
          </button>
        )}
      </div>
      <RocketAnimation
        isApplying={isApplying}
        apiSuccess={apiSuccess}
        resetApiSuccess={resetApiSuccess}
      />
      {showDashboard && (
        <div className="flex-3/4 flex flex-col gap-5">
          {jobsList.length > 0 &&
            jobsList.map((job) => (
              <JobCard
                job={job}
                key={job._id}
                authUser={authUser}
                isRecruiter={formik.values.isRecruiter}
                setIsApplying={setIsApplying}
                setApiSuccess={setApiSuccess}
              />
            ))}
        </div>
      )}
      {showProfile && (
        <div className="flex-3/4 flex flex-col gap-5">
          <p className="mb-2 text-xl font-normal">Personal information</p>
          {authUser.email !== '' && (
            <form
              className="grid grid-cols-2 grid-rows-[maxContent_maxContent_maxContent_maxContent] gap-y-3 gap-x-5"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label htmlFor="fullName">Full Name</label>
                <br />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter Full Name"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                  className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                />

                {formik.touched.fullName && (
                  <p className="errorMessage">{formik.errors.fullName}</p>
                )}
              </div>
              <div>
                <label htmlFor="fullName">Phone Number</label>
                <br />
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                />

                {formik.touched.phoneNumber && (
                  <p className="errorMessage">{formik.errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <br />

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                />

                {formik.touched.email && (
                  <p className="errorMessage">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="experience">Experience</label>
                <br />

                <input
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="Enter Experince"
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                  onBlur={formik.handleBlur}
                  className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                />

                {formik.touched.experience && (
                  <p className="errorMessage">{formik.errors.experience}</p>
                )}
              </div>
              <div className="col-span-2">
                <label htmlFor="skills">Skills</label>
                <br />

                <Multiselect
                  options={skillsArray}
                  selectedValues={selectedSkills}
                  onSelect={onSelectSkills}
                  onRemove={onRemoveSkills}
                  displayValue="skills"
                  className="customMultiselect shadow-[inset_0px_0px_5px_1px_#f7fafc90] px-4 py-3 rounded-xl mt-2"
                  avoidHighlightFirstOption={true}
                  style={{
                    searchBox: {
                      border: 'none', // Corrected: Added quotes around 'none'
                      fontSize: '14px', // Corrected: Added quotes around '10px'
                    },
                    chips: {
                      // To change css chips(Selected options)
                      background: '#9793b5',
                    },
                    optionContainer: {
                      // To change css for option container
                      border: '2px solid',
                      background: '#bbafe8',
                    },
                    option: {
                      // To change css for dropdown options
                      color: '#5c5482',
                    },
                  }}
                />

                {formik.touched.skills && (
                  <p className="errorMessage">{formik.errors.skills}</p>
                )}
              </div>
              <div className="w-max flex gap-2 items-center px-4 py-3 mt-2 rounded-xl shadow-[inset_0px_0px_5px_1px_#f7fafc90]">
                <input
                  type="checkbox"
                  id="isRecruiter"
                  name="isRecruiter"
                  onChange={formik.handleChange}
                  value={formik.values.isRecruiter}
                  onBlur={formik.handleBlur}
                  className="w-5 h-5"
                  checked={formik.values.isRecruiter}
                />
                <label htmlFor="recruiter">Are you a recruiter ?</label>
              </div>
              <div className="col-span-2">
                <label htmlFor="professionalSummary">
                  Professional Summary
                </label>
                <br />

                <textarea
                  type="text"
                  id="professionalSummary"
                  name="professionalSummary"
                  placeholder="Enter Professional Summary"
                  onChange={formik.handleChange}
                  value={formik.values.professionalSummary}
                  onBlur={formik.handleBlur}
                  rows={5}
                  className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                />

                {formik.touched.professionalSummary && (
                  <p className="errorMessage">
                    {formik.errors.professionalSummary}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full col-span-2 self-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-2 rounded-xl"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
