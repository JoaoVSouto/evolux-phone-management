import { useSelector } from 'react-redux';

import Pagination from 'react-bootstrap/Pagination';

import { hasPagination as hasPaginationSelector } from '../ducks/didsSlice';

function NumbersPagination() {
  const hasPagination = useSelector(state => hasPaginationSelector(state.dids));

  return (
    hasPagination && (
      <Pagination>
        <Pagination.First disabled />
        <Pagination.Prev disabled />
        <Pagination.Item active>1</Pagination.Item>
        <Pagination.Item>2</Pagination.Item>
        <Pagination.Ellipsis disabled />
        <Pagination.Item>40</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    )
  );
}

export default NumbersPagination;
