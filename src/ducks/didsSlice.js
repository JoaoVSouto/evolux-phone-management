import { createSlice, createSelector } from '@reduxjs/toolkit';

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
    totalOccurrences: 0,
    orderOption: {},
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
      state.totalOccurrences = action.payload.totalOccurrences;
    },
    setDidsError(state) {
      state.hasError = true;
      state.isLoading = false;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setLastPage(state, action) {
      state.lastPage = action.payload;
    },
    setOrderOption(state, action) {
      state.orderOption = action.payload;
    },
  },
});

export const hasPagination = createSelector(
  [state => state.lastPage, state => state.totalOccurrences],
  (lastPage, totalOccurrences) =>
    lastPage > 1 && totalOccurrences > DIDS_PER_PAGE
);

const {
  setDidsLoading,
  setDidsSuccess,
  setDidsError,
  setCurrentPage,
  setLastPage,
  setOrderOption,
} = didsSlice.actions;

export const fetchDids = ({
  page = 1,
  orderOption = {},
} = {}) => async dispatch => {
  dispatch(setDidsLoading());
  dispatch(setCurrentPage(page));
  dispatch(setOrderOption(orderOption));

  try {
    const { data, headers } = await api.get('dids', {
      params: {
        _limit: DIDS_PER_PAGE,
        _page: page,
        _sort: orderOption.sort,
        _order: orderOption.order,
      },
    });

    const didsCanBePaginated = Boolean(headers.link);
    if (didsCanBePaginated) {
      dispatch(setLastPage(getPaginationLastPage(headers.link)));
    }

    const totalOccurrences = Number(headers['x-total-count']);

    const maximumPage = Math.ceil(totalOccurrences / DIDS_PER_PAGE);
    const isPageRequestedOutOfBounds = page > maximumPage;

    let dids = data;
    if (isPageRequestedOutOfBounds) {
      dispatch(setCurrentPage(maximumPage));
      dispatch(setLastPage(maximumPage));
      const didsResponse = await api.get('dids', {
        params: {
          _limit: DIDS_PER_PAGE,
          _page: maximumPage,
        },
      });
      dids = didsResponse.data;
    }

    dispatch(setDidsSuccess({ dids, totalOccurrences }));
  } catch {
    dispatch(setDidsError());
  }
};

export default didsSlice.reducer;
