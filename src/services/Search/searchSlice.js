import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchText: '',
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

export default searchSlice.reducer;
