import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// import { data as userData } from '@dataset/user';

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
        ...action.payload
      };
      state.status = 'loaded';
    }
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
  let id = 198900819;
  let name = username.substring(0, username.lastIndexOf("_"));
  if (username.lastIndexOf("_") > 0) {
    id = username.substring(username.lastIndexOf("_") + 1);
  }

  const [firstName, lastName] = name.split("_");
  // COMMENT: currently username is address
  const domain = 'https://rosettabackendservereast.azurewebsites.net';
  // const domain = 'http://localhost:8080';
  const url = `${domain}/api/v1/getProfile?firstName=${firstName}&lastName=${lastName}&author_id=${id}`;
  dispatch(getUserData());

  await axios.get(url)
    .then(({ data }) => {
      console.log(data);
      dispatch(gotUserData({
        ...data.profile
      }));
    });
}

export default userSlice.reducer;
