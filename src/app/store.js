import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import onboardingReducer from '../services/Onboarding/onboardingSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
