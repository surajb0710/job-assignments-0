import { configureStore } from '@reduxjs/toolkit';
import jobModelReducer from '../features/jobModelSlice';
import jobPostModelReducer from '../features/jobPostModelSlice';

const store = configureStore({
  reducer: {
    jobModel: jobModelReducer,
    jobPostModel: jobPostModelReducer,
  },
});

export default store;
