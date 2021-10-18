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
  category: [],
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
    setFollowUsers: (state, actions) => {
      if (state.followUsers.some(n => n === actions.payload)) {
        state.followUsers = state.followUsers.filter(el => el !== actions.payload)
      } else {
        state.followUsers = [...state.followUsers, actions.payload];
      }
    },
    setFollowGroups: (state, actions) => {
      if (state.followGroups.some(n => n === actions.payload)) {
        state.followGroups = state.followGroups.filter(el => el !== actions.payload)
      } else {
        state.followGroups = [...state.followGroups, actions.payload];
      }
    },
    setPublicKey: (state, actions) => {
      state.publickey = actions.payload;
    },
    setCategory: (state, actions) => {
      if (state.category.some(n => n === actions.payload)) {
        state.category = state.category.filter(el => el !== actions.payload)
      } else {
        state.category = [...state.category, actions.payload];
      }
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
  setFollowUsers,
  setFollowGroups,
  setPublicKey,
  setCategory,
  setPhoto
} = onboardingSlice.actions;

export const selectStep = (state) => state.onboarding.step;
export const selectCategory = (state) => state.onboarding.category;
export const selectGroups = (state) => state.onboarding.followGroups;
export const selectUsers = (state) => state.onboarding.followUsers;
export const selectPapers = (state) => ({
  incorrectlyAttr: state.onboarding.papers_incorrectly_attributed,
  shouldAttr: state.onboarding.papers_which_should_have_been_attributed
});
export const selectDublicatedAuthors = (state) => state.onboarding.duplicate_author_ids;

export default onboardingSlice.reducer;
