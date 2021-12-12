import { createSlice } from '@reduxjs/toolkit';
import queryString from 'query-string';
import axios from 'axios';

const initialState = {
  searchText: '',
  status: '',
  results: [],
  keyParam: 'title',
  filters: {
    study: null,
    dates: { min: 1800, max: 2022 },
    // types: null
  },
  sort: {
    type: 'n_citation',
    direction: 'asc'
  },
  page: 0,
  numrows: 20,
  count: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    changeFilter: (state, action) => {
      if (action.payload.date) {
        state.filters.dates = action.payload.date;
      }
      if (action.payload.study) {
        state.filters.study = action.payload.study;
      }
      if (action.payload.keyParam) {
        state.keyParam = action.payload.keyParam;
      }
    },
    changeSort: (state, action) => {
      state.sort = {
        ...state.sort,
        ...action.payload
      };
    },
    searchLoading: (state) => {
      state.status = 'loading';
    },
    searchLoaded: (state, action) => {
      state.status = 'loaded';
      state.results = action.payload.docs.length ? [...action.payload.docs] : [];
      state.count = action.payload.numFound;
    }
  }
});

export const {
  addSearchText,
  searchLoading,
  searchLoaded,
  changeFilter,
  changeSort,
} = searchSlice.actions;

export const selectSearchText = (state) => state.search.searchText;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchResult = (state) => state.search.results;
export const selectSearchCount = (state) => state.search.count;
export const selectSearchSort = (state) => state.search.sort;
export const selectSearchFilters = (state) => state.search.filters;
export const selectKeyParam = (state) => state.search.keyParam;

export const fetchSearch = ({ keyParam, q, start, sort, filters }) => async (dispatch) => {
  const numrows = 20;

  const params = {
    q: keyParam === 'author' ? `authors_names:"${q}"`: q,
    rows: numrows,
    page: start,
    sort: sort && sort.type,
    sortDir: sort && sort.direction,
    year: filters.dates && `[${filters.dates.min} TO ${filters.dates.max}}`,
    doc_type: filters.study ? filters.study.value : null
  }
  dispatch(searchLoading({ text: q, page: start }));
  const url = `https://rosettabackendservereast.azurewebsites.net/api/v1/search?${queryString.stringify(params)}`;
  // const url = `http://localhost:8080/api/v1/search?${queryString.stringify(params)}`;
  await axios.get(url)
    .then(({ data }) => {
      dispatch(searchLoaded(data.data))
    });
}

export default searchSlice.reducer;
