import express from 'express';
import { sendOTP, verifyOTP } from '../controller/otpController.js';

const otpRouter = express.Router();

otpRouter.post('/send-otp', sendOTP);
otpRouter.post('/verify-otp', verifyOTP);

export default otpRouter;
