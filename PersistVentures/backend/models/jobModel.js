import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, require: true },
  companyName: { type: String, require: true, unique: true },
  location: { type: String, require: true },
  experience: { type: String, require: true },
  requiredSkills: { type: Array, require: true },
  salary: { type: String, require: true },
});

const jobModel = mongoose.model.user || mongoose.model('job', jobSchema);

export default jobModel;
