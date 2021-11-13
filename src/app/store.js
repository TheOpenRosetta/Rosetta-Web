import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import onboardingReducer from '../services/Onboarding/onboardingSlice';
import searchReducer from '../services/Search/searchSlice';
import publishReducer from '../services/Publish/publishSlice';
import paperReducer from '../services/Paper/paperSlice';
import authReducer from '../services/Auth/authSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    search: searchReducer,
    publish: publishReducer,
    paper: paperReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
