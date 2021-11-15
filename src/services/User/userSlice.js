import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

import userData from '@dataset/user';

const initialState = {
  status: '',
  data: null,
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
    }
  }
});

export const {
  getUserData,
  gotUserData,
} = userSlice.actions;

export const selectUserStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user.data;

export const fetchUser = ({ username }) => async (dispatch) => {
  console.log(username);
  // const url = `http://40.121.197.64:8983/solr/OAG/select?q=${q || '*:*'}&df=authors_names&start=${start * 10}&rows=10`;
  dispatch(gotUserData(userData.data));
  // dispatch(getUserData());
  // await axios.get(url)
  //   .then(({ data }) => {
  //     dispatch(gotUserData(userData.data))
  //   });
}

export default userSlice.reducer;
