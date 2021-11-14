import { createSlice } from '@reduxjs/toolkit';

import json from '@dataset/jury.json';

const initialState = {
  data: [],
};

export const jurySlice = createSlice({
  name: 'jury',
  initialState,
  reducers: {
    juryLoaded: (state, action) => {
      state.data = [...action.payload];
    },
  }
});

export const {
  juryLoaded
} = jurySlice.actions;

export const selectData = (state) => state.jury.data;

export const fetchJury = () => async (dispatch) => {
  await dispatch(juryLoaded(json.data))
}

export default jurySlice.reducer;
