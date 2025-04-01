import express from 'express';
import {
  addJobPost,
  deleteJobPost,
  updateJobPost,
} from '../controller/jobController.js';

const jobRouter = express.Router();

jobRouter.post('/addjobpost', addJobPost);
jobRouter.delete('/deletejobpost', deleteJobPost);
jobRouter.patch('/updatejobpost', updateJobPost);

export default jobRouter;
