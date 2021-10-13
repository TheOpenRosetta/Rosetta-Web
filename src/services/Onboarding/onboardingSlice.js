import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  step: 0,
  firstName: '',
  lastName: '',
  institution: '',
  email: '',
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    sendFirstData: (state, action) => {
      state.firstName = action.payload.firstName || state.firstName;
      state.lastName = action.payload.lastName || state.lastName;
      state.institution = action.payload.institution || state.institution;
      state.email = action.payload.email || state.email;
    }
  }
});

export const { nextStep, sendFirstData } = onboardingSlice.actions;

export const selectStep = (state) => state.onboarding.step;

export default onboardingSlice.reducer;
