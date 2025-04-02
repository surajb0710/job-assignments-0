import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(path.dirname(__filename));
    const templatePath = path.join(
      __dirname,
      'templates',
      'jobApplicationTemplate.html'
    );
    let jobApplication = await fs.readFile(templatePath, 'utf-8');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recruiterEmail,
      subject: `Application for job position ${title}`,
      // text: `Hi, I am interested in the job position and my email id is ${applicantEmail}`,
      html: jobApplication,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending Email:', error);
    res.status(500).json({ success: false, message: 'Error sending Email' });
  }
};

export { sendInvitationForJobEmail, sendJobApplicationEmail };
