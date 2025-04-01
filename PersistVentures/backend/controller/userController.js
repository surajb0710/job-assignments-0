// import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
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
    const { fullName, email, phoneNumber } = req.body;
    // checking if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.json({ success: false, message: 'User already exists' });
      return;
    }
    const newUser = new userModel({ fullName, email, phoneNumber });

    const user = await newUser.save();

    res.json({ success: true, message: 'User has been registred' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
