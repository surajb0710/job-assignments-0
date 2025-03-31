const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();
const otpStorage = {}; // Temporary storage, replace with DB in production

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = crypto.randomInt(100000, 999999).toString();
  otpStorage[email] = otp;

  // Send OTP via Email
  try {
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
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStorage[email] && otpStorage[email] === otp) {
    delete otpStorage[email]; // Clear OTP after verification
    return res.json({ success: true, message: 'OTP verified successfully' });
  }

  res.status(400).json({ success: false, message: 'Invalid OTP' });
});

module.exports = router;
