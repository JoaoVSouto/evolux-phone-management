import Pagination from 'react-bootstrap/Pagination';

function NumbersPagination() {
  return (
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
  );
}

export default NumbersPagination;
