import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// [{
//   title: 'New Measurement for Impact in Academic Research.',
//   paperid: 126,
//   authors_names: ['Paola Peynetti Velázquez'],
//   preview: 'He option of phone and video visits has expanded access to vulnerable population during a time opportunities…',
//   likes: 124,
//   comments: 92,
//   balance: 1984,
//   delta: 7,
//   apy: 7.5,
//   date: 1351351616,
// }]

const initialState = {
  searchText: '',
  status: '',
  results: [],
  count: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    searchLoading: (state) => {
      state.status = 'loading';
    },
    searchLoaded: (state, action) => {
      state.status = 'loaded';
      state.results = [...action.payload.docs];
      state.count = action.payload.numFound;
    }
  }
});

export const {
  addSearchText,
  searchLoading,
  searchLoaded,
} = searchSlice.actions;

export const selectSearchText = (state) => state.search.searchText;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchResult = (state) => state.search.results;
export const selectSearchCount = (state) => state.search.count;


export const fetchSearch = ({ q , start }) => async (dispatch) => {
  const numrows = 20
  const url = `https://searchserver1.eastus.cloudapp.azure.com:8983/solr/OAG/select?q.op=OR&q=${q}&start=${start * numrows}&rows=${numrows}`;
  dispatch(searchLoading());
  await axios.get(url)
    .then(({ data }) => {
      dispatch(searchLoaded(data.response))
    });
}

export default searchSlice.reducer;
