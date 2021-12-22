import { createSlice } from '@reduxjs/toolkit';
import queryString from 'query-string';
import axios from 'axios';

// import { data as userData } from '@dataset/user';

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
      state.data = {
        ...action.payload
      };
      state.status = 'loaded';
    },
    updateUserPapers: (state, action) => {
      state.data.papers = action.payload;
    }
  }
});

export const {
  getUserData,
  gotUserData,
  updateUserPapers,
  getFeaturePapersData,
  gotFeaturePapersData
} = userSlice.actions;

export const selectUserStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user.data;

// HELP UTIL
const getID = (username) => {
  let id = 198900819;
  if (username.lastIndexOf("_") > 0) {
    id = username.substring(username.lastIndexOf("_") + 1);
  }
  return id;
}

export const getPapers = ({ id, start }) => async (dispatch) => {
  const numrows = 20;
  const params = {
    q: `authors_ids:${id}`,
    rows: numrows,
    page: start,
    sort: 'prb_score',
    sortDir: 'desc',
  }

  const domain = 'https://rosettabackendservereast.azurewebsites.net';
  // const domain = 'http://localhost:8080';
  const url = `${domain}/api/v1/search?${queryString.stringify(params)}`;

  await axios.get(url)
    .then(({ data }) => {
      dispatch(updateUserPapers(data.data.docs));
    });
}

export const fetchUser = ({ username }) => async (dispatch) => {
  let name = username.substring(0, username.lastIndexOf("_"));
  const id = getID(username);

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
