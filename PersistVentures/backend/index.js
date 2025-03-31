const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/otpAuth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
});

const OTP = mongoose.model('OTP', otpSchema);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Generate random 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP API
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  // Save OTP to database
  await OTP.create({ email, otp });

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.json({ success: false, message: 'Error sending OTP' });
    res.json({ success: true, message: 'OTP sent successfully' });
  });
});

// Verify OTP API
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const validOtp = await OTP.findOne({ email, otp });

  if (validOtp) {
    await OTP.deleteOne({ email, otp }); // Delete OTP after verification
    res.json({ success: true, message: 'OTP Verified' });
  } else {
    res.json({ success: false, message: 'Invalid OTP' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
