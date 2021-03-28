import { createSlice, createSelector } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import store from '~/app/store';

import services from '~/services';

import getPaginationLastPage from '~/utils/getPaginationLastPage';

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
    query: '',
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
    setQuery(state, action) {
      state.query = action.payload;
    },
    decreaseTotalOccurrences(state) {
      if (state.totalOccurrences > 0) {
        state.totalOccurrences -= 1;
      }
    },
    removeDid(state, action) {
      const didId = action.payload;
      state.items = state.items.filter(did => did.id !== didId);
    },
    updateDid(state, action) {
      const { id, ...updatedData } = action.payload;

      const didToBeUpdatedIndex = state.items.findIndex(did => did.id === id);

      if (didToBeUpdatedIndex === -1) {
        return;
      }

      state.items[didToBeUpdatedIndex] = {
        id,
        ...updatedData,
      };
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
  setQuery,
  decreaseTotalOccurrences,
  removeDid,
} = didsSlice.actions;

export const fetchDids = ({
  page = 1,
  orderOption = {},
  query = '',
} = {}) => async dispatch => {
  dispatch(setDidsLoading());
  dispatch(setCurrentPage(page));
  dispatch(setOrderOption(orderOption));
  dispatch(setQuery(query));

  const queryWithoutPlusSign = query.replace(/\+/g, '');

  try {
    const payload = {
      _limit: DIDS_PER_PAGE,
      _page: page,
      _sort: orderOption.sort,
      _order: orderOption.order,
      _query: queryWithoutPlusSign,
    };

    const { data, headers } = await services.did.index(payload);

    const didsCanBePaginated = Boolean(headers.link);
    if (didsCanBePaginated) {
      dispatch(setLastPage(getPaginationLastPage(headers.link)));
    }

    const totalOccurrences = Number(headers['x-total-count']);

    const maximumPage = Math.ceil(totalOccurrences / DIDS_PER_PAGE);
    const isPageRequestedOutOfBounds = page > maximumPage;
    const isThereElementsToBeSearched = totalOccurrences > 0;

    let dids = data;
    if (isPageRequestedOutOfBounds && isThereElementsToBeSearched) {
      dispatch(setCurrentPage(maximumPage));
      dispatch(setLastPage(maximumPage));
      const didsResponse = await services.did.index({
        ...payload,
        _page: maximumPage,
      });
      dids = didsResponse.data;
    }

    dispatch(setDidsSuccess({ dids, totalOccurrences }));
  } catch {
    dispatch(setDidsError());
  }
};

export const updateDid = updatedData => async dispatch => {
  try {
    await services.did.update(updatedData);
    dispatch(didsSlice.actions.updateDid(updatedData));
  } catch {
    throw new Error('Unable to update DID');
  }
};

export const deleteDid = didId => async dispatch => {
  try {
    await services.did.delete(didId);
    dispatch(removeDid(didId));
    dispatch(decreaseTotalOccurrences());

    const didsState = store.getState().dids;
    const isItemsEmpty = didsState.items.length === 0;
    const isThereMoreDids = didsState.totalOccurrences > 1;
    if (isItemsEmpty && isThereMoreDids) {
      dispatch(
        fetchDids({
          page: didsState.currentPage,
          orderOption: didsState.orderOption,
        })
      );
    }
  } catch {
    throw new Error('Unable to delete DID');
  }
};

export default didsSlice.reducer;
