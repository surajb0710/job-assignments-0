import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { userModel } from '../models/userModel.js';
import { getJobsExpiringTomorrow } from './jobController.js';

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
  const { job, authUser } = req.body;

  if (!job.email) return res.status(400).json({ message: 'Email is required' });

  console.log('------authUser.email----', authUser.email);

  const user = await userModel.findOne({ email: authUser.email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (!user.jobsApplied.includes(job._id)) {
    user.jobsApplied.push(job._id);

    await user.save();
  }

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(path.dirname(__filename));
    const templatePath = path.join(
      __dirname,
      'templates',
      'jobApplicationTemplate.html'
    );
    let jobApplication = await fs.readFile(templatePath, 'utf-8');

    jobApplication = jobApplication.replaceAll('[jobTitle]', job.title);
    jobApplication = jobApplication.replaceAll(
      '[companyName]',
      job.companyName
    );
    jobApplication = jobApplication.replaceAll(
      '[experience]',
      authUser.experience
    );
    jobApplication = jobApplication.replaceAll('[skills]', authUser.skills);
    jobApplication = jobApplication.replaceAll('[fullName]', authUser.fullName);
    jobApplication = jobApplication.replaceAll('[email]', authUser.email);
    jobApplication = jobApplication.replaceAll(
      '[phoneNumber]',
      authUser.phoneNumber
    );
    jobApplication = jobApplication.replaceAll(
      '[linkedInUrl]',
      authUser.linkedInUrl
    );
    jobApplication = jobApplication.replaceAll(
      '[professionalSummary]',
      authUser.professionalSummary
    );
    const skillsList = authUser.skills
      .map((skill) => `<li>${skill}</li>`)
      .join('\n');

    jobApplication = jobApplication.replaceAll('[skillsList]', skillsList);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: job.email,
      subject: `Application for job position ${job.title}`,
      html: jobApplication,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending Email:', error);
    res.status(500).json({ success: false, message: 'Error sending Email' });
  }
};

const sendJobExpiryEmail = async (req, res) => {
  try {
    const expiringJobsArray = await getJobsExpiringTomorrow();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(path.dirname(__filename));
    const templatePath = path.join(
      __dirname,
      'templates',
      'jobExpiryTemplate.html'
    );
    const template = await fs.readFile(templatePath, 'utf-8');

    for (const job of expiringJobsArray) {
      let emailHtml = template;

      emailHtml = emailHtml.replaceAll('[jobTitle]', job.title);
      emailHtml = emailHtml.replaceAll('[companyName]', job.companyName);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: job.email,
        subject: `Job Expiry Notice: ${job.title} is expiring soon`,
        html: emailHtml,
      });
    }

    res.json({ success: true, message: 'Expiry emails sent successfully' });
    console.log('-----Job expiry email has been sent-----');
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error sending expiry emails' });
  }
};
export {
  sendInvitationForJobEmail,
  sendJobApplicationEmail,
  sendJobExpiryEmail,
};
