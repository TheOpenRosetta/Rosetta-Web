import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import arweave from 'arweave';

import AvatarImg from '@assets/avatar.png';

const initialState = {
  bytes: null,
  signature: null,
  name: 'Simon Ware',
  id: null,
  avatar: AvatarImg,
  publicKey: '',
  institution: '',
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
      const { profile } = action.payload;
      state.name = `${profile.firstName} ${profile.lastName}`;
      state.id = profile.id;
      state.institution = profile.institution;
      state.publicKey = profile.publickey;
    },
    logout: (state) => {
      state.bytes = null;
      state.signature = null;
      state.name = '';
      state.id = null;
      state.institution = '';
      state.publicKey = '';
      localStorage.removeItem('rosetta_address');
      localStorage.removeItem('rosetta_signature');
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

export const selectStatus = (state) => !!state.auth.id;
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

export const checkAuth = () => async (dispatch) => {
  const address = localStorage.getItem('rosetta_address');
  const signature = JSON.parse(localStorage.getItem('rosetta_signature'));
  if (!address || !signature) {
    dispatch(logout())
  } else {
    const buf = new Uint8Array(Object.values(signature));
    const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/getuserdata/${address}/${buf}`;
    await axios.get(url)
      .then(({ data }) => {
        localStorage.setItem('rosetta_address', address);
        localStorage.setItem('rosetta_signature', JSON.stringify(signature));
        dispatch(login(data))
      })
      .catch(() => {
        dispatch(logout())
      });
  }
}

export const signIn = ({ address, signature }) => async (dispatch) => {
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/login`;
  const buf = new Uint8Array(Object.values(signature));
  await axios.post(url, {
    address,
    signature: arweave.utils.bufferTob64Url(buf),
  })
    .then(({ data }) => {
      localStorage.setItem('rosetta_address', address);
      localStorage.setItem('rosetta_signature', JSON.stringify(signature));
      dispatch(login(data))
    })
    .catch(() => {
      dispatch(logout())
    });
}

export default authSlice.reducer;
