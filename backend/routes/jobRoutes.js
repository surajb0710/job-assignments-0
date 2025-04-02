import express from 'express';
import {
  getJobs,
  addJobPost,
  deleteJobPost,
  updateJobPost,
} from '../controller/jobController.js';

const jobRouter = express.Router();

jobRouter.get('/jobs', getJobs);
jobRouter.post('/jobs', addJobPost);
jobRouter.delete('/jobs', deleteJobPost);
jobRouter.patch('/jobs', updateJobPost);

export default jobRouter;
