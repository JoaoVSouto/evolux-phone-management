import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDids } from '~/ducks/didsSlice';

export default function useFetchDids() {
  const dispatch = useDispatch();
  const { currentPage, orderOption: ordering, query: q } = useSelector(
    state => state.dids
  );

  const retrieveDids = React.useCallback(
    ({ page = currentPage, orderOption = ordering, query = q } = {}) => {
      dispatch(fetchDids({ page, orderOption, query }));
    },
    [currentPage, dispatch, ordering, q]
  );

  return retrieveDids;
}
