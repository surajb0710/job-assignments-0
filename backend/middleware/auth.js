import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findOne({ email: decoded.id });

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, invalid token' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, invalid token' });
  }
};

export default authMiddleware;
