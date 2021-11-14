import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

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
  agreeWithToS: true,
  agreeWithLicense: true,
  publishedError: null,
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
    },
    changeAgreement: (state, action) => {
      if (action.payload.type === 'tos') {
        state.agreeWithToS = !state.agreeWithToS
      } else {
        state.agreeWithLicense = !state.agreeWithLicense
      }
    },
    publishSuccess: (state, action) => {
      state.step += 1;
    },
    publishError: (state, action) => {
      state.publishedError = action.payload;
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
  changeAgreement,
  publishSuccess
} = publishSlice.actions;

export const selectStep = (state) => state.publish.step;
export const selectFiles = (state) => state.publish.files;
export const selectPaperInfo = (state) => ({
  title: state.publish.title,
  description: state.publish.description,
  github: state.publish.github,
  materials: state.publish.materials,
});
export const selectAgreements = (state) => ({
  tos: state.publish.agreeWithToS,
  license: state.publish.agreeWithLicense,
});
export const selectMaterials = (state) => state.publish.materials;
export const selectReseachFiles = (state) => state.publish.reseachFiles;
export const selectCitationIds = (state) => state.publish.citationIds;
export const selectCoAuthors = (state) => state.publish.coauthors;
export const selectPaperId = (state) => state.publish.paperId;

export const publishPaper = () => async (dispatch) => {
  console.log("PUBLISH");

  dispatch(publishSuccess())
  // const url = `http://40.121.197.64:8983/solr/OAG/select?q=${id}&df=id`;

  // await axios.post(url)
  //   .then(({ data }) => {
  //     dispatch(publishSuccess(data.response))
  //   });
}

export default publishSlice.reducer;
