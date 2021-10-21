import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import onboardingReducer from '../services/Onboarding/onboardingSlice';
import searchReducer from '../services/Search/searchSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
