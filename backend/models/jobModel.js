import mongoose from 'mongoose';
import { skillEnum } from './userModel.js';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    companyName: { type: String, require: true },
    location: { type: String, require: true },
    experience: { type: String, require: true },
    salary: { type: String, require: true },
    email: { type: String, require: true },
    expiryDate: { type: Date },
    skills: {
      type: [
        {
          type: String,
          enum: skillEnum,
        },
      ],
      require: true,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model.user || mongoose.model('job', jobSchema);

export default jobModel;
