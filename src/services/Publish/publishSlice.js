import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  files: [],
  title: '',
  description: '',
  github: '',
  materials: {
    transactionID: '',
    files: [],
  },
  reseachFiles: [],
  citationIds: [],
  coauthors: [],
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
      state.materials = {
        ...state.materials,
        transactionID: action.payload.transactionID || '',
        files: action.payload.files || []
      };
      state.step += 1;
    },
    setReseachFiles: (state, action) => {
      state.reseachFiles = [...action.payload];
      state.step += 1;
    },
    setCitationIds: (state, action) => {
      state.citationIds = [...action.payload];
      state.step += 1;
    },
    setCoAuthors: (state, action) => {
      state.coauthors = [...action.payload];
      state.step += 1;
    }
  }
});

export const {
  nextStep,
  prevStep,
  setFiles,
  setPaperAttrs,
  setReseachFiles,
  setCitationIds,
  setCoAuthors,
} = publishSlice.actions;

export const selectStep = (state) => state.publish.step;
export const selectFiles = (state) => state.publish.files;
export const selectMaterials = (state) => state.publish.materials;
export const selectReseachFiles = (state) => state.publish.reseachFiles;
export const selectCitationIds = (state) => state.publish.citationIds;
export const selectCoAuthors = (state) => state.publish.coauthors;

export default publishSlice.reducer;
