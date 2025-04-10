import mongoose from 'mongoose';

const singleNotificationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  type: {
    type: String,
    enum: [
      'ApplicationConfirmation',
      'ApplicationStatusUpdate',
      'InterviewInvitation',
      'JobRecommendation',
      'DeadlineReminder',
      'FeedbackRequest',
      'NewApplicationReceived',
      'JobPostingExpiry',
      'InterviewScheduled',
      'Digest',
    ],
    required: true,
  },
  content: { type: String, required: true },
  metadata: { type: Object },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  isRead: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now },
});

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  notifications: [singleNotificationSchema],
});

notificationSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('Notification', notificationSchema);
