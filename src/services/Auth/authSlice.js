import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import AvatarImg from '@assets/avatar.png';

const initialState = {
  authStatus: true,
  name: 'Simon Ware',
  id: 2009723854,
  avatar: AvatarImg,
  publicKey: '',
  balance: 0,
  monthlyYield: 0,
  papers: 0,
  loginError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.authStatus = true;
    },
    logout: (state, action) => {
      state.authStatus = false;
    },
  }
});

export const {
  login,
  logout
} = authSlice.actions;

export const selectStatus = (state) => state.auth.authStatus;
export const selectUser = (state) => ({
  id: state.auth.id,
  name: state.auth.name,
  avatar: state.auth.avatar,
  balance: state.auth.balance,
  monthlyYield: state.auth.monthlyYield,
  papers: state.auth.papers,
  publicKey: state.auth.publicKey
});

export const signIn = ({ key }) => async (dispatch) => {
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/getUserForPublicKey?publicKey=${key}`;
  await axios.get(url)
    .then(({ data }) => {
      dispatch(login(data.response))
    });
}

export default authSlice.reducer;
