import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import userData from '@dataset/user';

const initialState = {
  status: '',
  data: null,
  papers: '',
  paperStatus: '',
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
    getFeaturePapersData: (state) => {
      state.paperStatus = 'loading';
    },
    gotFeaturePapersData: (state, action) => {
      state.papers = action.payload;
      state.paperStatus = 'loaded';
    },
  }
});

export const {
  getUserData,
  gotUserData,
  getFeaturePapersData,
  gotFeaturePapersData,
} = userSlice.actions;

export const selectUserStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user.data;

export const selectFeaturePaperUserStatus = (state) => state.user.paperStatus;
export const selectFeaturePaperUserData = (state) => state.user.papers;

export const fetchUser = ({ username }) => async (dispatch) => {
  // COMMENT: currently username is address
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/getuserprofile/${username}/`;
  // dispatch(gotUserData(userData.data));
  dispatch(getUserData());
  await axios.get(url)
    .then(({ data }) => {
      dispatch(gotUserData(userData.data))
    });
}

export const fetchFeaturedPaperUser = ({ authorId }) => async (dispatch) => {
  // COMMENT: currently fetching featured paper
  const url = `https://searchserver1.eastus.cloudapp.azure.com:8983/solr/OAG/query?q=authors_ids:${authorId}&q.op=AND&indent=true&rows=2&wt=json&start=1&qt=/select`;
  dispatch(getFeaturePapersData());
  await axios.get(url)
    .then(({ data }) => {
      dispatch(gotFeaturePapersData(data.response.docs))
    });
}
export default userSlice.reducer;
