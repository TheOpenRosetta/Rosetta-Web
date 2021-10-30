import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import onboardingReducer from '../services/Onboarding/onboardingSlice';
import searchReducer from '../services/Search/searchSlice';
import publishReducer from '../services/Publish/publishSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    search: searchReducer,
    publish: publishReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
