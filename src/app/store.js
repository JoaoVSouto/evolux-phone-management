import { configureStore } from '@reduxjs/toolkit';

import toastsSlice from '~/ducks/toastsSlice';
import didsSlice from '~/ducks/didsSlice';

export default configureStore({
  reducer: {
    toasts: toastsSlice,
    dids: didsSlice,
  },
});
