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

const getJobsExpiringTomorrow = async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Set time range for the whole day of tomorrow
    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const jobsExpiringTomorrow = await jobModel
      .find({
        expiryDate: {
          $gte: startOfTomorrow,
          $lte: endOfTomorrow,
        },
      })
      .sort({ expiryDate: 1 });

    res.json({ success: true, jobs: jobsExpiringTomorrow });

    console.log('----jobsExpiringTomorrow----', jobsExpiringTomorrow);

    return jobsExpiringTomorrow;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return;
    }

    const currentJob = await jobModel.findById(_id);

    res.json({ success: true, currentJob });
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
      responsibilities,
      whoCanApply,
      aboutCompany,
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
      responsibilities,
      whoCanApply,
      aboutCompany,
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

export {
  getJobs,
  addJobPost,
  deleteJobPost,
  updateJobPost,
  getJobById,
  getJobsExpiringTomorrow,
};
