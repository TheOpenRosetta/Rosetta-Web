import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import onboardingReducer from '../services/Onboarding/onboardingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding: onboardingReducer,
  },
});
