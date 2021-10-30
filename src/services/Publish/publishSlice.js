import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  files: [],
  title: '',
  description: '',
  github: '',
  note: '',
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
      state.files = [...action.payload];
    },
    setPaperAttrs: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.github = action.payload.github;
      state.note = action.payload.note;
      state.step += 1;
    },
  }
});

export const {
  nextStep,
  prevStep,
  setFiles,
  setPaperAttrs,
} = publishSlice.actions;

export const selectStep = (state) => state.publish.step;
export const selectFiles = (state) => state.publish.files;

export default publishSlice.reducer;
