import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  firstName: '',
  lastName: '',
  institution: '',
  email: '',
  photo: null,
  skills: [],
  disciplines: [],
  publickey: null,
  duplicate_author_ids: [],
  papers_incorrectly_attributed: [],
  papers_claimed_by_this_author: [],
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
    addDuplicatedAuthor: (state, action) => {
      state.duplicate_author_ids = [...action.payload];
    },
    addIncorrectPaper: (state, action) => {
      state.papers_incorrectly_attributed = [...state.papers_incorrectly_attributed, action.payload];
    },
    addShouldAttributedPaper: (state, action) => {
      state.papers_claimed_by_this_author = [...state.papers_claimed_by_this_author, action.payload];
    },
    setSkills: (state, action) => {
      state.skills = [...action.payload];
    },
    setDisciplines: (state, action) => {
      state.disciplines = [...action.payload];
    },
    setFollowUsers: (state, action) => {
      if (state.followUsers.some(n => n === action.payload)) {
        state.followUsers = state.followUsers.filter(el => el !== action.payload)
      } else {
        state.followUsers = [...state.followUsers, action.payload];
      }
    },
    setFollowGroups: (state, action) => {
      if (state.followGroups.some(n => n === action.payload)) {
        state.followGroups = state.followGroups.filter(el => el !== action.payload)
      } else {
        state.followGroups = [...state.followGroups, action.payload];
      }
    },
    setPublicKey: (state, action) => {
      state.publickey = action.payload;
    },
    setCategory: (state, action) => {
      if (state.category.some(n => n === action.payload)) {
        state.category = state.category.filter(el => el !== action.payload)
      } else {
        state.category = [...state.category, action.payload];
      }
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
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
  setSkills,
  setDisciplines,
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
  shouldAttr: state.onboarding.papers_claimed_by_this_author
});
export const selectDublicatedAuthors = (state) => state.onboarding.duplicate_author_ids;

export const selectPublishData = (state) => ({
  email: state.onboarding.email,
  firstName: state.onboarding.firstName,
  lastName: state.onboarding.lastName,
  publickey: state.onboarding.publickey,
  duplicate_author_ids: state.onboarding.duplicate_author_ids,
  papers_claimed_by_this_author: state.onboarding.papers_claimed_by_this_author,
  institution: state.onboarding.institution,
  photo: new File([state.onboarding.photo], "photo"),
  skills: state.onboarding.skills,
  disciplines: state.onboarding.disciplines,
  category: state.onboarding.category,
  followGroups: state.onboarding.followGroups,
  followUsers: state.onboarding.followUsers,
});

export default onboardingSlice.reducer;
