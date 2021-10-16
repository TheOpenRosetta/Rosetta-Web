import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  step: 0,
  firstName: '',
  lastName: '',
  institution: '',
  email: '',
  photo: null,
  skills: [],
  desciplines: [],
  publickey: null,
  duplicate_author_ids: [],
  papers_incorrectly_attributed: [],
  papers_which_should_have_been_attributed: [],
  category: null,
  followGroups: [],
  followUsers: []
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    sendFirstData: (state, action) => {
      state.firstName = action.payload.firstName || state.firstName;
      state.lastName = action.payload.lastName || state.lastName;
      state.institution = action.payload.institution || state.institution;
      state.email = action.payload.email || state.email;
    },
    addDuplicatedAuthor: (state, actions) => {
      state.duplicate_author_ids = [...state.duplicate_author_ids, actions.payload];
    },
    addIncorrectPaper: (state, actions) => {
      state.papers_incorrectly_attributed = [...state.papers_incorrectly_attributed, actions.payload];
    },
    addShouldAttributedPaper: (state, actions) => {
      state.papers_which_should_have_been_attributed = [...state.papers_which_should_have_been_attributed, actions.payload];
    },
    addSkills: (state, actions) => {
      state.skills = [...state.skills, actions.payload];
    },
    addDisciplines: (state, actions) => {
      state.disciplines = [...state.disciplines, actions.payload];
    },
    addFollowUsers: (state, actions) => {
      state.followUsers = [...state.followUsers, actions.payload];
    },
    addFollowGroups: (state, actions) => {
      state.followGroups = [...state.followGroups, actions.payload];
    },
    setPublicKey: (state, actions) => {
      state.publickey = actions.payload;
    },
    setCategory: (state, actions) => {
      state.category = actions.payload;
    },
    setPhoto: (state, actions) => {
      state.photo = actions.payload;
    },
  }
});

export const {
  nextStep,
  prevStep,
  sendFirstData,
  addDuplicatedAuthor,
  addIncorrectPaper,
  addShouldAttributedPaper,
  addSkills,
  addDisciplines,
  addFollowUsers,
  addFollowGroups,
  setPublicKey,
  setCategory,
  setPhoto
} = onboardingSlice.actions;

export const selectStep = (state) => state.onboarding.step;
export const selectDublicatedAuthors = (state) => state.onboarding.duplicate_author_ids;

export default onboardingSlice.reducer;
