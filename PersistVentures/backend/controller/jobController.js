import jobModel from '../models/jobModel.js';

// Route for user register
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

export { addJobPost, deleteJobPost, updateJobPost };
