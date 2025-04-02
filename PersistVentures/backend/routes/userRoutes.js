import express from 'express';
import {
  loginUser,
  registerUser,
  getSkills,
  getAuthUserProfile,
  updateAuthUserProfile,
} from '../controller/userController.js';

import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, getAuthUserProfile);
userRouter.patch('/profile', authMiddleware, updateAuthUserProfile);
userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/skills', getSkills);

export default userRouter;
