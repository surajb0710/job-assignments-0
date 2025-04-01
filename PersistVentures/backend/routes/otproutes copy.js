import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import OTPModel from '../models/otpSchema.js';

dotenv.config();

const otpRouter = express.Router();

// MongoDB Connection
// mongoose.connect(`${process.env.MONGODB_URI}/careeraccelerator`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
otpRouter.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    console.log('Attempting to save OTP:', { email, otp });

    // Check if an existing document exists
    const existingOTP = await OTPModel.findOne({ email: email });

    if (existingOTP) {
      // If a document exists, update it
      const result = await OTPModel.findOneAndUpdate(
        { email: email },
        { otp: otp },
        { new: true }
      );
      console.log('MongoDB update result:', result);
    } else {
      // If no document exists, create a new one
      const newOTP = new OTPModel({ email: email, otp: otp });
      const result = await newOTP.save();
      console.log('MongoDB create result:', result);
    }

    // Send OTP via Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
});

// Verify OTP
otpRouter.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTPModel.findOne({ email: email, otp: otp });

    if (otpRecord) {
      // await OTPModel.deleteOne({ email: email });
      return res.json({ success: true, message: 'OTP verified successfully' });
    }

    res.status(400).json({ success: false, message: 'Invalid OTP' });
  } catch (error) {
    console.error('❌ Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
});

export default otpRouter;
