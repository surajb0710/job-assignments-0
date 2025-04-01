import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phoneNumber: { type: String, require: true },
  // linkedInUrl: { type: String, require: true },
  // skills: { type: Array, require: true },
});

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;
