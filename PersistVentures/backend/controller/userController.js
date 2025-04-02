// import jwt from 'jsonwebtoken';
import { userModel, skillEnum } from '../models/userModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const getAuthUserProfile = async (req, res) => {
  {
    try {
      res.json({ success: true, user: req.user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

const updateAuthUserProfile = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      skills,
      experience,
      professionalSummary,
      isRecruiter,
    } = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      {
        fullName,
        phoneNumber,
        skills,
        experience,
        professionalSummary,
        isRecruiter,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Your information has been updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ success: false, message: 'User does not exist' });
      return;
    }

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
      return;
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
      return;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    return;
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      linkedInUrl,
      skills,
      experience,
      professionalSummary,
      isRecruiter,
    } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.json({ success: false, message: 'User already exists' });
      return;
    }
    const newUser = new userModel({
      fullName,
      email,
      phoneNumber,
      linkedInUrl,
      skills,
      experience,
      professionalSummary,
      isRecruiter,
    });

    const user = await newUser.save();

    res.json({ success: true, message: 'User has been registred' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getSkills = async (req, res) => {
  res.json(skillEnum);
};

export {
  getAuthUserProfile,
  updateAuthUserProfile,
  loginUser,
  registerUser,
  getSkills,
};
