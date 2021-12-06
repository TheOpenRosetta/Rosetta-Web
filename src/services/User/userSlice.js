import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { data as userData } from '@dataset/user';

const initialState = {
  status: '',
  data: null,
  papers: '',
  paperCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData: (state) => {
      state.status = 'loading';
    },
    gotUserData: (state, action) => {
      state.data = {
        ...action.payload,
        bio: userData.bio,
        impactScore: userData.impactScore,
        status: userData.status,
        stats: userData.stats,
        fraudCommitted: userData.fraudCommitted,
        monthlyTokens: userData.monthlyTokens,
        onceOffTokens: userData.onceOffTokens
      };
    },
    gotFeaturePapersData: (state, action) => {
      state.papers = [...action.payload.docs];
      state.paperCount = action.payload.numFound;
      state.status = 'loaded';
    },
  }
});

export const {
  getUserData,
  gotUserData,
  getFeaturePapersData,
  gotFeaturePapersData
} = userSlice.actions;

export const selectUserStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user.data;

export const selectFeaturePaperUserStatus = (state) => state.user.paperStatus;
export const selectFeaturePaperUserData = (state) => state.user.papers;
export const selectFeaturePaperCount = (state) => state.user.paperCount;

export const fetchUser = ({ username }) => async (dispatch) => {
  // COMMENT: currently username is address
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/getuserprofile?username=${username}`;
  // const url = `http://localhost:8080/api/v1/getuserprofile?username=${username}`;
  dispatch(getUserData());
  await axios.get(url)
    .then(({ data }) => {
      dispatch(gotUserData(data.profile));
      const id = 198900819; // data.profile.id
      const url = `https://searchserver1.eastus.cloudapp.azure.com:8983/solr/OAG/query?q=authors_ids:${id}&q.op=AND&indent=true&rows=100&wt=json&start=0&qt=/select`;
      return axios.get(url);
    })
    .then(({ data }) => {
      dispatch(gotFeaturePapersData(data.response))
    });
}

export default userSlice.reducer;
