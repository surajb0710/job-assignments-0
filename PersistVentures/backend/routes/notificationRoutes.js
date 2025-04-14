import express from 'express';
import {
  sendInvitationForJobEmail,
  sendJobApplicationEmail,
  sendJobExpiryEmail,
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
notificationRouter.post('/jobexpirynotification', sendJobExpiryEmail);

export default notificationRouter;
