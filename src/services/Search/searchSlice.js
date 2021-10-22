import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchText: '',
  results: [{
    title: 'New Measurement for Impact in Academic Research.',
    slug: 'some_slug_address',
    paperid: 123,
    authors: ['Paola Peynetti Velázquez', 'Mutheiwana Dombo'],
    preview: 'He option of phone and video visits has expanded access to vulnerable population during a time opportunities…',
    likes: 124,
    comments: 92,
    balance: 1984,
    delta: 7,
    apy: 7.5,
    timestamp: 1351351616,
  }, {
    title: 'New Measurement for Impact in Academic Research.',
    slug: 'some_slug_address',
    paperid: 124,
    authors: ['Paola Peynetti Velázquez', 'Mutheiwana Dombo', 'Paola Peynetti Velázquez', 'Mutheiwana Dombo'],
    preview: 'He option of phone and video visits has expanded access to vulnerable population during a time opportunities…',
    likes: 124,
    comments: 92,
    balance: 1984,
    delta: 7,
    apy: 7.5,
    timestamp: 1351351616,
  }, {
    title: 'New Measurement for Impact in Academic Research.',
    slug: 'some_slug_address',
    paperid: 125,
    authors: ['Paola Peynetti Velázquez', 'Mutheiwana Dombo', 'Paola Peynetti Velázquez', 'Mutheiwana Dombo', 'Paola Peynetti Velázquez', 'Mutheiwana Dombo'],
    preview: 'He option of phone and video visits has expanded access to vulnerable population during a time opportunities…',
    likes: 124,
    comments: 92,
    balance: 1984,
    delta: 7,
    apy: 7.5,
    timestamp: 1351351616,
  }, {
    title: 'New Measurement for Impact in Academic Research.',
    slug: 'some_slug_address',
    paperid: 126,
    authors: ['Paola Peynetti Velázquez'],
    preview: 'He option of phone and video visits has expanded access to vulnerable population during a time opportunities…',
    likes: 124,
    comments: 92,
    balance: 1984,
    delta: 7,
    apy: 7.5,
    timestamp: 1351351616,
  }]
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  }
});

export const {
  addSearchText,
} = searchSlice.actions;

export const selectSearchText = (state) => state.search.searchText;
export const selectSearchResult = (state) => state.search.results;

export default searchSlice.reducer;
