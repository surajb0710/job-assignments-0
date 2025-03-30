import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OtpInput from 'react-otp-input';
import OTPInput, { ResendOTP } from 'otp-input-react';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      // otp: Yup.string().required('Required'),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const [timeLeft, setTimeLeft] = React.useState(30);
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleResendOTP = () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    console.log('OTP Resent');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-150 gap-10 p-10 rounded-2xl flex flex-col justify-center shadow-[inset_0px_0px_7px_1px_#f7fafc90]">
        <h1 className="text-4xl text-center">Login</h1>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
            />
            {formik.touched.email && (
              <p className="errorMessage">{formik.errors.email}</p>
            )}
          </div>
          <div className="otp-container">
            <label htmlFor="otp">OTP</label>
            <br />
            <OtpInput
              value={formik.values.otp}
              onChange={(otp) => formik.setFieldValue('otp', otp)}
              numInputs={6}
              renderSeparator={<span> - </span>}
              renderInput={(props, index) => (
                <input
                  {...props}
                  value={formik.values.otp[index] || ''}
                  className="shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm py-3 !w-15 rounded-xl mt-2"
                />
              )}
            />
            {formik.touched.otp && (
              <p className="errorMessage">{formik.errors.otp}</p>
            )}
          </div>
          <p className="text-sm text-gray-500 text-center">
            {isResendDisabled
              ? `Resend OTP in 00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`
              : "Didn't receive OTP?"}
          </p>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResendDisabled}
            className={`px-5 py-3 cursor-pointer rounded-xl ${
              isResendDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-500 text-white glow-border'
            }`}
          >
            Resend OTP
          </button>
          <button
            type="button"
            className="w-full self-center text-base bg-[#7e6bd2] px-5 py-3 rounded-xl shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
