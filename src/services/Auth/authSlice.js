import { createSlice } from '@reduxjs/toolkit';

import AvatarImg from '@assets/avatar.png';

const initialState = {
  authStatus: true,
  name: 'Simon Ware',
  id: 2009723854,
  avatar: AvatarImg,
  publicKey: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
    },
    logout: (state, action) => {
      state.authStatus = false;
    },
  }
});

export const {
  login,
  logout,
} = authSlice.actions;

export const selectStatus = (state) => state.auth.authStatus;
export const selectUser = (state) => ({
  id: state.auth.id,
  name: state.auth.name,
  avatar: state.auth.avatar,
  publicKey: state.auth.publicKey
});

export default authSlice.reducer;
