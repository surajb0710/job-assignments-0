import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import * as Yup from 'yup';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const navigate = useNavigate();

  const [skillsArray, setSkillsArray] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/skills');

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
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      otp: '',
      linkedInUrl:
        localStorage.getItem('linkedInUrl') === null
          ? ''
          : localStorage.getItem('linkedInUrl'),
      skills: [],
      experience: '',
      professionalSummary: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      otp: otpSent
        ? Yup.string().length(6, 'OTP must be 6 digits').required('Required')
        : Yup.string(),
      linkedInUrl: Yup.string(),
      skills: Yup.array().required('Required'),
      experience: Yup.string().required('Required'),
      profileSummary: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log('onSubmit called!');
      setLoading(true);
      setErrorMessage('');

      console.log('Formik Values:', values); // Debugging
      console.log('Selected Skills:', selectedSkills); //debugging

      try {
        if (!otpSent) {
          const response = await axios.post(
            'http://localhost:5000/api/send-otp',
            { email: values.email }
          );
          toast.success(response.data.message);
          setOtpSent(true);
          setTimeLeft(30);
          setIsResendDisabled(true);
        } else {
          const response = await axios.post(
            'http://localhost:5000/api/verify-otp',
            {
              email: values.email,
              otp: values.otp,
            }
          );

          if (response.data.success) {
            localStorage.setItem('authToken', response.data.token);

            const skillsArray = values.skills.map((item) => item.skills);

            const registerResponse = await axios.post(
              'http://localhost:5000/api/signup',
              {
                fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                linkedInUrl: values.linkedInUrl,
                skills: skillsArray,
                experience: values.experience,
                professionalSummary: values.professionalSummary,
              }
            );

            if (registerResponse.data.success) {
              toast.success(registerResponse.data.message);
              resetForm();
              setOtpSent(false);
              navigate('/dashboard');
            } else {
              toast.error(registerResponse.data.message);
              navigate('/dashboard');
            }
          } else {
            setErrorMessage(response.data.message);
          }
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleResendOTP = async () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    await axios.post('http://localhost:5000/api/send-otp', {
      email: formik.values.email,
    });
  };

  const onSelectSkills = (selectedList) => {
    console.log('onSelectSkills called!');
    setSelectedSkills(selectedList);
    formik.setFieldValue('skills', selectedList);
  };

  const onRemoveSkills = (selectedList) => {
    console.log('onRemoveSkills called!');
    setSelectedSkills(selectedList);
    formik.setFieldValue('skills', selectedList);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-150 gap-2 px-10 py-5 rounded-2xl flex flex-col justify-center shadow-[inset_0px_0px_7px_1px_#f7fafc90]">
        <h1 className="text-4xl text-center">Sign Up</h1>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

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
            <label htmlFor="phoneNumber">Phone Number</label>
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
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={otpSent}
              className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
            />
            {formik.touched.email && formik.errors.email && (
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
          <div className="col-span-2">
            <label htmlFor="professionalSummary">Professional Summary</label>
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

          {otpSent && (
            <div className="otp-container col-span-2">
              <label htmlFor="otp">Enter OTP</label>
              <OtpInput
                value={formik.values.otp}
                onChange={(otp) => formik.setFieldValue('otp', otp)}
                numInputs={6}
                isInputNum
                renderSeparator={<span> - </span>}
                renderInput={(props, index) => (
                  <input
                    {...props}
                    value={formik.values.otp[index] || ''}
                    className="shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm py-3 !w-15 rounded-xl mt-2 "
                  />
                )}
              />
              {formik.touched.otp && formik.errors.otp && (
                <p className="errorMessage">{formik.errors.otp}</p>
              )}
            </div>
          )}

          <div className=" col-span-2 flex gap-2 justify-center items-center">
            {otpSent && (
              <p
                className={`text-sm text-center col-span-2
              }`}
              >
                {isResendDisabled
                  ? `Resend OTP in 00:${
                      timeLeft < 10 ? `0${timeLeft}` : timeLeft
                    }`
                  : "Didn't receive OTP?"}
              </p>
            )}

            {otpSent && (
              <p
                type="button"
                onClick={handleResendOTP}
                disabled={isResendDisabled}
                className={`cursor-pointer rounded-xl col-span-2 ${
                  isResendDisabled ? ' cursor-not-allowed' : ' text-[#7e6bd2]'
                }`}
              >
                Resend OTP
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full col-span-2 self-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-2 rounded-xl"
            disabled={loading}
          >
            {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
        <Link to="/">
          <button
            type="button"
            className="w-full flex gap-2 justify-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-2 rounded-xl"
          >
            <ArrowLeft /> Back to Home Page
          </button>
        </Link>
        <p className="text-sm text-center">
          Already have an account?
          <Link to="/login">
            <span className="ml-1 text-[#7e6bd2]">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
