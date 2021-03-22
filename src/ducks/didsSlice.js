import { createSlice } from '@reduxjs/toolkit';

import api from '../services/api';

import getPaginationLastPage from '../utils/getPaginationLastPage';

const DIDS_PER_PAGE = 20;

export const didsSlice = createSlice({
  name: 'dids',
  initialState: {
    isLoading: false,
    hasError: false,
    items: [],
    currentPage: 1,
    lastPage: 1,
  },
  reducers: {
    setDidsLoading(state) {
      state.hasError = false;
      state.isLoading = true;
    },
    setDidsSuccess(state, action) {
      state.hasError = false;
      state.isLoading = false;
      state.items = action.payload.dids;
      state.currentPage = action.payload.page;
    },
    setDidsError(state) {
      state.hasError = true;
      state.isLoading = false;
    },
    setLastPage(state, action) {
      state.lastPage = action.payload;
    },
  },
});

const {
  setDidsLoading,
  setDidsSuccess,
  setDidsError,
  setLastPage,
} = didsSlice.actions;

export const fetchDids = ({ page = 1 } = {}) => async dispatch => {
  dispatch(setDidsLoading());

  try {
    const { data, headers } = await api.get('dids', {
      params: {
        _limit: DIDS_PER_PAGE,
        _page: page,
      },
    });

    const didsCanBePaginated = Boolean(headers.link);
    if (didsCanBePaginated) {
      dispatch(setLastPage(getPaginationLastPage(headers.link)));
    }

    dispatch(setDidsSuccess({ dids: data, page }));
  } catch {
    dispatch(setDidsError());
  }
};

export default didsSlice.reducer;
