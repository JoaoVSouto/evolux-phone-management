import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDids } from '../ducks/didsSlice';

export default function useFetchDids() {
  const dispatch = useDispatch();
  const { currentPage, orderOption: ordering } = useSelector(
    state => state.dids
  );

  const retrieveDids = React.useCallback(
    ({ page = currentPage, orderOption = ordering } = {}) => {
      dispatch(fetchDids({ page, orderOption }));
    },
    [currentPage, dispatch, ordering]
  );

  return retrieveDids;
}
