import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from 'react-bootstrap/Pagination';

import {
  hasPagination as hasPaginationSelector,
  fetchDids,
} from '../ducks/didsSlice';

function NumbersPagination() {
  const dispatch = useDispatch();

  const hasPagination = useSelector(state => hasPaginationSelector(state.dids));
  const { currentPage, lastPage, isLoading, orderOption } = useSelector(
    state => state.dids
  );

  const isFirstPage = React.useMemo(() => currentPage === 1, [currentPage]);
  const isLastPage = React.useMemo(() => currentPage === lastPage, [
    currentPage,
    lastPage,
  ]);

  const handlePagination = page => () => {
    if (page === currentPage) {
      return;
    }

    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.replaceState({}, '', url);

    dispatch(fetchDids({ page, orderOption }));
  };

  if (!hasPagination) {
    return null;
  }

  return (
    <Pagination className="justify-content-center flex-wrap">
      <Pagination.First
        disabled={isFirstPage || isLoading}
        onClick={handlePagination(1)}
      />
      <Pagination.Prev
        disabled={isFirstPage || isLoading}
        onClick={handlePagination(currentPage - 1)}
      />
      <Pagination.Item
        disabled={isLoading && !isFirstPage}
        active={isFirstPage}
        onClick={handlePagination(1)}
      >
        1
      </Pagination.Item>
      {isFirstPage && lastPage > 2 && (
        <Pagination.Item disabled={isLoading} onClick={handlePagination(2)}>
          2
        </Pagination.Item>
      )}
      {isFirstPage && lastPage > 3 && (
        <Pagination.Item disabled={isLoading} onClick={handlePagination(3)}>
          3
        </Pagination.Item>
      )}
      {currentPage === 2 && lastPage > 2 && (
        <Pagination.Item active>2</Pagination.Item>
      )}
      {currentPage === 2 && lastPage > 3 && (
        <Pagination.Item disabled={isLoading} onClick={handlePagination(3)}>
          3
        </Pagination.Item>
      )}

      {currentPage > 3 && lastPage > 4 && <Pagination.Ellipsis disabled />}

      {currentPage > 2 && currentPage < lastPage - 1 && (
        <>
          <Pagination.Item
            disabled={isLoading}
            onClick={handlePagination(currentPage - 1)}
          >
            {currentPage - 1}
          </Pagination.Item>
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Item
            disabled={isLoading}
            onClick={handlePagination(currentPage + 1)}
          >
            {currentPage + 1}
          </Pagination.Item>
        </>
      )}

      {currentPage < lastPage - 2 && lastPage > 4 && (
        <Pagination.Ellipsis disabled />
      )}

      {currentPage === lastPage - 1 && currentPage > 2 && (
        <Pagination.Item
          disabled={isLoading}
          onClick={handlePagination(currentPage - 1)}
        >
          {currentPage - 1}
        </Pagination.Item>
      )}
      {currentPage === lastPage - 1 && currentPage > 2 && (
        <Pagination.Item active>{currentPage}</Pagination.Item>
      )}
      {isLastPage && lastPage - 2 > 1 && (
        <Pagination.Item
          disabled={isLoading}
          onClick={handlePagination(lastPage - 2)}
        >
          {lastPage - 2}
        </Pagination.Item>
      )}
      {isLastPage && lastPage - 1 > 1 && (
        <Pagination.Item
          disabled={isLoading}
          onClick={handlePagination(lastPage - 1)}
        >
          {lastPage - 1}
        </Pagination.Item>
      )}
      <Pagination.Item
        disabled={isLoading && !isLastPage}
        active={isLastPage}
        onClick={handlePagination(lastPage)}
      >
        {lastPage}
      </Pagination.Item>
      <Pagination.Next
        disabled={isLastPage || isLoading}
        onClick={handlePagination(currentPage + 1)}
      />
      <Pagination.Last
        disabled={isLastPage || isLoading}
        onClick={handlePagination(lastPage)}
      />
    </Pagination>
  );
}

export default NumbersPagination;
