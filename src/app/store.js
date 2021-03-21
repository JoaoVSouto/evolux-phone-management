import { configureStore } from '@reduxjs/toolkit';

import toastsSlice from '../ducks/toastsSlice';

export default configureStore({
  reducer: {
    toasts: toastsSlice,
  },
});
