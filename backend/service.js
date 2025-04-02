const axios = require('axios');

async function sendOTP(email, otp) {
  await axios.post(
    'https://api.resend.com/emails',
    {
      from: 'bsuraj2307@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    },
    {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    }
  );
}
