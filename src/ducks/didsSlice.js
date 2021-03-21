import { createSlice } from '@reduxjs/toolkit';

import api from '../services/api';

const DIDS_PER_PAGE = 20;

export const didsSlice = createSlice({
  name: 'dids',
  initialState: {
    isLoading: false,
    hasError: false,
    items: [],
  },
  reducers: {
    setDidsLoading(state) {
      state.hasError = false;
      state.isLoading = true;
    },
    setDidsSuccess(state, action) {
      state.hasError = false;
      state.isLoading = false;
      state.items = action.payload;
    },
    setDidsError(state) {
      state.hasError = true;
      state.isLoading = false;
    },
  },
});

const { setDidsLoading, setDidsSuccess, setDidsError } = didsSlice.actions;

export const fetchDids = ({ page = 1 } = {}) => async dispatch => {
  dispatch(setDidsLoading());

  try {
    const { data } = await api.get('dids', {
      params: {
        _limit: DIDS_PER_PAGE,
        _page: page,
      },
    });
    dispatch(setDidsSuccess(data));
  } catch {
    dispatch(setDidsError());
  }
};

export default didsSlice.reducer;
