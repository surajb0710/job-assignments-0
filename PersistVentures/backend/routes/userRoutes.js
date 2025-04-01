import express from 'express';
import {
  loginUser,
  registerUser,
  getSkills,
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/skills', getSkills);

export default userRouter;
