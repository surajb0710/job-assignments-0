import { configureStore } from '@reduxjs/toolkit';
import jobModelReducer from '../features/jobModel/jobModelSlice';

const store = configureStore({
  reducer: {
    jobModel: jobModelReducer,
  },
});

export default store;
