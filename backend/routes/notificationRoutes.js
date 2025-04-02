import express from 'express';
import {
  sendInvitationForJobEmail,
  sendJobApplicationEmail,
} from '../controller/emailController.js';

const notificationRouter = express.Router();

notificationRouter.post('/jobapplication', sendJobApplicationEmail);
notificationRouter.post('/jobinvite', sendInvitationForJobEmail);

export default notificationRouter;
