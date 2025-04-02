import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showJobPostModel: false,
};

const jobPostModelSlice = createSlice({
  name: 'jobPostModel',
  initialState,
  reducers: {
    toggleModel: (state) => {
      state.showJobPostModel = !state.showJobPostModel;
    },
  },
});

export default jobPostModelSlice.reducer;
export const { toggleModel } = jobPostModelSlice.actions;
