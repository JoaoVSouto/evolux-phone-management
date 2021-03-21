import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast(state, action) {
      const toast = action.payload;
      state.toasts.push(toast);
    },
    removeToast(state, action) {
      const toastId = action.payload;
      state.toasts = state.toasts.filter(toast => toast.id !== toastId);
    },
  },
});

export const { removeToast } = toastsSlice.actions;

export const addToast = toastData => dispatch => {
  const { type = 'success', title, description } = toastData;

  dispatch(
    toastsSlice.actions.addToast({
      id: uuid(),
      type,
      title,
      description,
    })
  );
};

export default toastsSlice.reducer;
