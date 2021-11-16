import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import arweave from 'arweave';

import AvatarImg from '@assets/avatar.png';

const initialState = {
  authStatus: true,
  bytes: null,
  signature: null,
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
    setNonce: (state, action) => {
      const { nonce } = action.payload;
      state.bytes = arweave.utils.stringToBuffer(nonce);
    },
    saveSignature: (state, action) => {
      state.signature = action.payload;
    }
  }
});

export const {
  login,
  logout,
  setNonce,
  saveSignature
} = authSlice.actions;

export const selectStatus = (state) => state.auth.authStatus;
export const selectBytes = (state) => state.auth.bytes;
export const selectSignature = (state) => state.auth.signature;
export const selectUser = (state) => ({
  id: state.auth.id,
  name: state.auth.name,
  avatar: state.auth.avatar,
  balance: state.auth.balance,
  monthlyYield: state.auth.monthlyYield,
  papers: state.auth.papers,
  publicKey: state.auth.publicKey
});

export const getNonce = (address) => async (dispatch) => {
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/getNonce/${address}`;
  await axios.get(url)
    .then(({ data }) => {
      dispatch(setNonce(data))
    });
}

export const signIn = ({ address, signature }) => async (dispatch) => {
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/login`;
  await axios.post(url, {
    address,
    signature
  })
    .then(({ data }) => {
      dispatch(login(data.response))
    });
}

export default authSlice.reducer;
