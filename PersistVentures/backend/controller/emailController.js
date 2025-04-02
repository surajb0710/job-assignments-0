import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInvitationForJobEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You have been invited to apply for a job',
      text: `This is an invitation for a job opening`,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending Email:', error);
    res.status(500).json({ success: false, message: 'Error sending Email' });
  }
};

const sendJobApplicationEmail = async (req, res) => {
  const { recruiterEmail, title, applicantEmail } = req.body;

  if (!recruiterEmail)
    return res.status(400).json({ message: 'Email is required' });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recruiterEmail,
      subject: `Application for job position ${title}`,
      text: `Hi, I am interested in the job position and my email id is ${applicantEmail}`,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending Email:', error);
    res.status(500).json({ success: false, message: 'Error sending Email' });
  }
};

export { sendInvitationForJobEmail, sendJobApplicationEmail };
