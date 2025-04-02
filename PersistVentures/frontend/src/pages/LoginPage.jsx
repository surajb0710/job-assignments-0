import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const formik = useFormik({
    initialValues: { email: '', otp: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      otp: otpSent
        ? Yup.string().length(6, 'OTP must be 6 digits').required('Required')
        : Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setErrorMessage('');

      try {
        if (!otpSent) {
          const response = await axios.post(
            `${import.meta.VITE_BACKEND_URL}/send-otp`,
            { email: values.email }
          );
          console.log(response);
          setOtpSent(true);
          setTimeLeft(30);
          setIsResendDisabled(true);
        } else {
          const response = await axios.post(
            `${import.meta.VITE_BACKEND_URL}/verify-otp`,
            {
              email: values.email,
              otp: values.otp,
            }
          );

          if (response.data.success) {
            console.log('User authenticated!');
            localStorage.setItem('authToken', response.data.token);
            resetForm();
            setOtpSent(false);
            navigate('/dashboard');
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
    await axios.post(`${import.meta.VITE_BACKEND_URL}/send-otp`, {
      email: formik.values.email,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-150 gap-5 px-10 py-5 rounded-2xl flex flex-col justify-center shadow-[inset_0px_0px_7px_1px_#f7fafc90]">
        <h1 className="text-4xl text-center">Login</h1>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
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
              className="w-full bg-transparent shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {otpSent && (
            <div className="otp-container">
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
                    className="shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm py-3 !w-15 rounded-xl mt-2"
                  />
                )}
              />
              {formik.touched.otp && formik.errors.otp && (
                <p className="text-red-500">{formik.errors.otp}</p>
              )}
            </div>
          )}

          {/* Resend OTP Timer */}
          {otpSent && (
            <p className="text-sm text-gray-500 text-center">
              {isResendDisabled
                ? `Resend OTP in 00:${
                    timeLeft < 10 ? `0${timeLeft}` : timeLeft
                  }`
                : "Didn't receive OTP?"}
            </p>
          )}

          {/* Resend OTP Button */}
          {otpSent && (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className={`px-5 py-3 cursor-pointer rounded-xl ${
                isResendDisabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-500 text-white'
              }`}
            >
              Resend OTP
            </button>
          )}

          <button
            type="submit"
            className="w-full self-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-3 rounded-xl"
            disabled={loading}
          >
            {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
        <Link to="/">
          <button
            type="button"
            className="w-full flex gap-2 justify-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-3 rounded-xl"
          >
            <ArrowLeft /> Back to Home Page
          </button>
        </Link>
        <p className="text-sm text-center">
          Dont have an account?
          <Link to="/signup">
            <span className="ml-1 text-[#7e6bd2]">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
