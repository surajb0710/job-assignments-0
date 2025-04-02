import jobModel from '../models/jobModel.js';

const getJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({});

    const sortedJobs = jobs.slice().sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });

    res.json({ sortedJobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addJobPost = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      experience,
      salary,
      email,
      expiryDate,
      skills,
    } = req.body;

    const newJobPost = new jobModel({
      title,
      companyName,
      location,
      experience,
      salary,
      email,
      expiryDate,
      skills,
    });

    const jobPost = await newJobPost.save();

    res.json({ success: true, message: 'Job posting has been added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateJobPost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteJobPost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getJobs, addJobPost, deleteJobPost, updateJobPost };
