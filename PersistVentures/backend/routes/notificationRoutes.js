import express from 'express';
import {
  sendInvitationForJobEmail,
  sendJobApplicationEmail,
} from '../controller/emailController.js';
import authMiddleware from '../middleware/auth.js';

const notificationRouter = express.Router();

notificationRouter.post(
  '/jobapplication',
  authMiddleware,
  sendJobApplicationEmail
);
notificationRouter.post(
  '/jobinvite',
  authMiddleware,
  sendInvitationForJobEmail
);

export default notificationRouter;
