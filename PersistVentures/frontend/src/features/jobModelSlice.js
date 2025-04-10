import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showJobModel: false,
  currentJobId: '',
};

const jobModelSlice = createSlice({
  name: 'jobModel',
  initialState,
  reducers: {
    toggleModel: (state) => {
      state.showJobModel = !state.showJobModel;
    },
    setCurrentJobId: (state, action) => {
      state.currentJobId = action.payload;
    },
  },
});

export default jobModelSlice.reducer;
export const { toggleModel, setCurrentJobId } = jobModelSlice.actions;
