import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import userData from '@dataset/user';

const initialState = {
  status: '',
  data: null,
  papers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData: (state) => {
      state.status = 'loading';
    },
    gotUserData: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
  }
});

export const {
  getUserData,
  gotUserData,
} = userSlice.actions;

export const selectUserStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user.data;

export const fetchUser = ({ username }) => async (dispatch) => {
  // COMMENT: currently username is address
  const url = `hhttps://rosettabackendservereast.azurewebsites.net/api/v1/getuserprofile/${username}/`;
  // dispatch(gotUserData(userData.data));
  dispatch(getUserData());
  await axios.get(url)
    .then(({ data }) => {
      dispatch(gotUserData(userData.data))
    });
}

export default userSlice.reducer;
