import React from 'react';
import { MapPin, Briefcase, Banknote, Clock8, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModel } from '../features/jobPostModelSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import toast from 'react-hot-toast';
import BulletTextArea from '../forms/formfields/BulletTextArea';

const JobPostModel = () => {
  const dispatch = useDispatch();
  const showJobPostModel = useSelector(
    (state) => state.jobPostModel.showJobPostModel
  );

  const [skillsArray, setSkillsArray] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/skills`
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

  const formik = useFormik({
    initialValues: {
      title: '',
      companyName: '',
      location: '',
      experience: '',
      salary: '',
      email: '',
      expiryDate: '',
      responsibilities: '- ',
      whoCanApply: '',
      aboutCompany: '',
      skills: [],
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const skillsArray = values.skills.map((item) => item.skills);

        const responsibilitiesArray = values.responsibilities
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        const whoCanApplyArray = values.whoCanApply
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        const jobPostingResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/jobs`,
          {
            title: values.title,
            companyName: values.companyName,
            location: values.location,
            experience: values.experience,
            salary: values.salary,
            email: values.email,
            expiryDate: values.expiryDate,
            responsibilities: responsibilitiesArray,
            whoCanApply: whoCanApplyArray,
            aboutCompany: values.aboutCompany,
            skills: skillsArray,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        toast.success(jobPostingResponse.data.message);
        resetForm();
        dispatch(toggleModel());
      } catch (error) {
        toast.error(error.response?.data?.message);
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

  return (
    <AnimatePresence>
      {showJobPostModel && (
        <motion.div className="max-w-full flex items-center justify-center">
          <motion.div
            className="absolute top-0 flex items-center justify-center z-50 px-20"
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
              <h1 className="text-3xl text-center">Job Post Form</h1>
              <form
                className="grid grid-cols-3 grid-rows-[repeat(6, maxContent)] gap-y-3 gap-x-5"
                onSubmit={formik.handleSubmit}
              >
                <div className="col-span-3">
                  <label htmlFor="title">Title</label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Job Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.title && (
                    <p className="errorMessage">{formik.errors.title}</p>
                  )}
                </div>
                <div className="row-start-2">
                  <label htmlFor="companyName">Company Name</label>
                  <br />
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter Company Name"
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    onBlur={formik.handleBlur}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.companyName && (
                    <p className="errorMessage">{formik.errors.companyName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="location">Location</label>
                  <br />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter Job Location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    onBlur={formik.handleBlur}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.location && (
                    <p className="errorMessage">{formik.errors.location}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="experience">Experience</label>
                  <br />
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="Enter Required Experiance"
                    onChange={formik.handleChange}
                    value={formik.values.experience}
                    onBlur={formik.handleBlur}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.experience && (
                    <p className="errorMessage">{formik.errors.experience}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="salary">Salary</label>
                  <br />
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    placeholder="Enter Salary"
                    onChange={formik.handleChange}
                    value={formik.values.salary}
                    onBlur={formik.handleBlur}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.salary && (
                    <p className="errorMessage">{formik.errors.salary}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email">Recruiter's Email Address</label>
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
                  {formik.touched.email && formik.errors.email && (
                    <p className="errorMessage">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="experience">Job Expiry Date</label>
                  <br />
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="Enter Expiry Date"
                    onChange={formik.handleChange}
                    value={formik.values.expiryDate}
                    onBlur={formik.handleBlur}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.expiryDate && (
                    <p className="errorMessage">{formik.errors.expiryDate}</p>
                  )}
                </div>
                <div className="col-span-3">
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
                <div className="col-span-2 row-span-2 row-start-2">
                  <label htmlFor="responsibilities">Responsibilities</label>
                  <br />
                  <BulletTextArea
                    type="text"
                    id="responsibilities"
                    placeholder="Enter responsibilities"
                    value={formik.values.responsibilities}
                    onBlur={formik.handleBlur}
                    setFieldValue={formik.setFieldValue}
                  />
                  {formik.touched.responsibilities && (
                    <p className="errorMessage">
                      {formik.errors.responsibilities}
                    </p>
                  )}
                </div>
                <div className="col-start-2 col-span-2 row-span-2 row-start-4">
                  <label htmlFor="whoCanApply">Who Can Apply</label>
                  <br />
                  <BulletTextArea
                    type="text"
                    id="whoCanApply"
                    placeholder="Enter Who can apply"
                    value={formik.values.whoCanApply}
                    onBlur={formik.handleBlur}
                    setFieldValue={formik.setFieldValue}
                  />
                  {formik.touched.whoCanApply && (
                    <p className="errorMessage">{formik.errors.whoCanApply}</p>
                  )}
                </div>
                <div className="col-start-2 col-span-2 row-span-2 row-start-6">
                  <label htmlFor="aboutCompany">About Company</label>
                  <br />
                  <textarea
                    type="text"
                    id="aboutCompany"
                    name="aboutCompany"
                    placeholder="Enter some info about company"
                    onChange={formik.handleChange}
                    value={formik.values.aboutCompany}
                    onBlur={formik.handleBlur}
                    rows={5}
                    className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
                  />
                  {formik.touched.aboutCompany && (
                    <p className="errorMessage">{formik.errors.aboutCompany}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full col-start-2 col-span-1 self-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-2 rounded-xl"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobPostModel;
