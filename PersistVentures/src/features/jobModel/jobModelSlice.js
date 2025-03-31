import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showJobModel: false,
};

const jobModelSlice = createSlice({
  name: 'jobModel',
  initialState,
  reducers: {
    toggleModel: (state) => {
      state.showJobModel = !state.showJobModel;
    },
  },
});

export default jobModelSlice.reducer;
export const { toggleModel } = jobModelSlice.actions;
