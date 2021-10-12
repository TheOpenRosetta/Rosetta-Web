import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  step: 0,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
  }
});

export const { nextStep } = onboardingSlice.actions;

export const selectStep = (state) => state.onboarding.step;

export default onboardingSlice.reducer;
