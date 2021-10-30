import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  files: [],
};

export const publishSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setFiles: (state, action) => {
      console.log(action.payload);
      state.files = [...action.payload];
    },
  }
});

export const {
  nextStep,
  prevStep,
  setFiles
} = publishSlice.actions;

export const selectStep = (state) => state.publish.step;
export const selectFiles = (state) => state.publish.files;

export default publishSlice.reducer;
