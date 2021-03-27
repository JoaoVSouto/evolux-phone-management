import { configureStore } from '@reduxjs/toolkit';

import toastsSlice from '~/ducks/toastsSlice';
// eslint-disable-next-line import/no-cycle
import didsSlice from '~/ducks/didsSlice';

export default configureStore({
  reducer: {
    toasts: toastsSlice,
    dids: didsSlice,
  },
});
