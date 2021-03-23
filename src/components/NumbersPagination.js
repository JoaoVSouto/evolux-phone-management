import * as React from 'react';
import { useSelector } from 'react-redux';

import Pagination from 'react-bootstrap/Pagination';

import { hasPagination as hasPaginationSelector } from '../ducks/didsSlice';

function NumbersPagination() {
  const hasPagination = useSelector(state => hasPaginationSelector(state.dids));
  const { currentPage, lastPage } = useSelector(state => state.dids);

  const isFirstPage = React.useMemo(() => currentPage === 1, [currentPage]);
  const isLastPage = React.useMemo(() => currentPage === lastPage, [
    currentPage,
    lastPage,
  ]);

  if (!hasPagination) {
    return null;
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.First disabled={isFirstPage} />
      <Pagination.Prev disabled={isFirstPage} />
      <Pagination.Item active={isFirstPage}>1</Pagination.Item>
      {isFirstPage && lastPage > 2 && <Pagination.Item>2</Pagination.Item>}
      {isFirstPage && lastPage > 3 && <Pagination.Item>3</Pagination.Item>}
      {currentPage === 2 && lastPage > 2 && (
        <Pagination.Item active>2</Pagination.Item>
      )}
      {currentPage === 2 && lastPage > 3 && (
        <Pagination.Item>3</Pagination.Item>
      )}

      {currentPage > 3 && lastPage > 4 && <Pagination.Ellipsis disabled />}

      {currentPage > 2 && currentPage < lastPage - 1 && (
        <>
          <Pagination.Item>{currentPage - 1}</Pagination.Item>
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Item>{currentPage + 1}</Pagination.Item>
        </>
      )}

      {currentPage < lastPage - 2 && lastPage > 4 && (
        <Pagination.Ellipsis disabled />
      )}

      {currentPage === lastPage - 1 && currentPage > 2 && (
        <Pagination.Item>{currentPage - 1}</Pagination.Item>
      )}
      {currentPage === lastPage - 1 && currentPage > 2 && (
        <Pagination.Item active>{currentPage}</Pagination.Item>
      )}
      {isLastPage && lastPage - 2 > 1 && (
        <Pagination.Item>{lastPage - 2}</Pagination.Item>
      )}
      {isLastPage && lastPage - 1 > 1 && (
        <Pagination.Item>{lastPage - 1}</Pagination.Item>
      )}
      <Pagination.Item active={isLastPage}>{lastPage}</Pagination.Item>
      <Pagination.Next disabled={isLastPage} />
      <Pagination.Last disabled={isLastPage} />
    </Pagination>
  );
}

export default NumbersPagination;
