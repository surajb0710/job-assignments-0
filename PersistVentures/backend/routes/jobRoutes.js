import express from 'express';
import {
  getJobs,
  addJobPost,
  deleteJobPost,
  updateJobPost,
  getJobById,
} from '../controller/jobController.js';

import authMiddleware from '../middleware/auth.js';

const jobRouter = express.Router();

jobRouter.get('/jobs', getJobs);
jobRouter.post('/jobs', authMiddleware, addJobPost);
jobRouter.delete('/jobs', authMiddleware, deleteJobPost);
jobRouter.patch('/jobs', authMiddleware, updateJobPost);
jobRouter.post('/job', getJobById);

export default jobRouter;
