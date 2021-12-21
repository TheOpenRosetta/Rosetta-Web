import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: null,
  title: '',
  date: 0,
  url: '',
  publisher: '',
  highlights: [],
  authors: [],
  version: 1,
  id: 0,
};

export const paperSlice = createSlice({
  name: 'paper',
  initialState,
  reducers: {
    paperLoading: (state) => {
      state.status = 'loading';
    },
    paperLoaded: (state, action) => {
      const doc = action.payload.docs[0];
      state.status = 'loaded';
      state.title = doc.title;
      state.date = doc.date;
      state.url = doc.url;
      state.publisher = doc.publisher;
      state.highlights = doc.highlights || [];
      state.id = doc.id;

      const authorsList = [];
      doc.authors_names && doc.authors_ids && doc.authors_names.forEach((item, i) => {
        authorsList.push({
          name: item,
          id: doc.authors_ids[i],
        });
      });
      state.authors = [...authorsList];
    },
    setHighlights: (state, action) => {
      state.highlights = [...action.payload];
    },
  }
});

export const {
  paperLoading,
  paperLoaded,
  setHighlights,
} = paperSlice.actions;

export const selectStatus = (state) => state.paper.status;
export const selectTitle = (state) => state.paper.title;

export const selectPaper = (state) => ({
  title: state.paper.title,
  status: state.paper.status,
  date: state.paper.date,
  url: state.paper.url,
  publisher: state.paper.publisher,
  highlights: state.paper.highlights,
  authors: state.paper.authors,
  version: state.paper.version,
  id: state.paper.id,
});

export const fetchPaper = ({ id }) => async (dispatch) => {
  const domain = 'https://rosettabackendservereast.azurewebsites.net';
  // const domain = 'http://localhost:8080';
  const url = `${domain}/api/v1/paper?id=${id}`;
  dispatch(paperLoading());
  await axios.get(url)
    .then(({ data }) => {
      dispatch(paperLoaded(data.data))
    });
}

export default paperSlice.reducer;
