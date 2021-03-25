import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaSortNumericDown,
  FaSortNumericUp,
} from 'react-icons/fa';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { fetchDids } from '../ducks/didsSlice';

function NumbersTable() {
  const dispatch = useDispatch();
  const {
    items: dids,
    isLoading,
    hasError,
    currentPage,
    orderOption,
  } = useSelector(state => state.dids);

  const readyToShowData = React.useMemo(() => !hasError && !isLoading, [
    hasError,
    isLoading,
  ]);

  const isSortedByAscendingNumbers = React.useMemo(
    () => orderOption.sort === 'value' && orderOption.order === 'asc',
    [orderOption.sort, orderOption.order]
  );

  const isSortedByAscendingMonthlyPrice = React.useMemo(
    () => orderOption.sort === 'monthlyPrice' && orderOption.order === 'asc',
    [orderOption.sort, orderOption.order]
  );

  const isSortedByAscendingSetupPrice = React.useMemo(
    () => orderOption.sort === 'setupPrice' && orderOption.order === 'asc',
    [orderOption.sort, orderOption.order]
  );

  const retrieveDids = React.useCallback(
    (page, ordering = {}) => {
      dispatch(fetchDids({ page, orderOption: ordering }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    const url = new URL(window.location);

    retrieveDids(Number(url.searchParams.get('page')) || 1);
  }, [retrieveDids]);

  return (
    <Table striped bordered responsive className="mt-4 numbers-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>
            <div className="d-flex align-items-center justify-content-between">
              Number
              <Button
                variant="link"
                size="sm"
                disabled={isLoading}
                title={`Order numbers by ${
                  isSortedByAscendingNumbers ? 'descending' : 'ascending'
                } order`}
                className="ml-3"
                onClick={() =>
                  retrieveDids(currentPage, {
                    sort: 'value',
                    order: isSortedByAscendingNumbers ? 'desc' : 'asc',
                  })
                }
              >
                {isSortedByAscendingNumbers ? (
                  <FaSortNumericUp size={20} />
                ) : (
                  <FaSortNumericDown size={20} />
                )}
              </Button>
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center justify-content-between">
              Monthly price
              <Button
                variant="link"
                size="sm"
                disabled={isLoading}
                title={`Order monthly price by ${
                  isSortedByAscendingMonthlyPrice ? 'descending' : 'ascending'
                } order`}
                className="ml-3"
                onClick={() =>
                  retrieveDids(currentPage, {
                    sort: 'monthlyPrice',
                    order: isSortedByAscendingMonthlyPrice ? 'desc' : 'asc',
                  })
                }
              >
                {isSortedByAscendingMonthlyPrice ? (
                  <FaSortNumericUp size={20} />
                ) : (
                  <FaSortNumericDown size={20} />
                )}
              </Button>
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center justify-content-between">
              Setup price
              <Button
                variant="link"
                size="sm"
                disabled={isLoading}
                title={`Order setup price by ${
                  isSortedByAscendingSetupPrice ? 'descending' : 'ascending'
                } order`}
                className="ml-3"
                onClick={() =>
                  retrieveDids(currentPage, {
                    sort: 'setupPrice',
                    order: isSortedByAscendingSetupPrice ? 'desc' : 'asc',
                  })
                }
              >
                {isSortedByAscendingSetupPrice ? (
                  <FaSortNumericUp size={20} />
                ) : (
                  <FaSortNumericDown size={20} />
                )}
              </Button>
            </div>
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {hasError && (
          <tr className="bg-transparent">
            <td colSpan={5}>
              <div className="d-flex align-items-center">
                <p className="m-0 text-primary">
                  Some error occurred while fetching DIDs. Please try again.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  title="Refetch DIDs"
                  className="ml-2"
                  onClick={() => retrieveDids(currentPage, orderOption)}
                >
                  <FaSyncAlt />
                </Button>
              </div>
            </td>
          </tr>
        )}
        {isLoading && (
          <tr className="bg-transparent">
            <td colSpan={5}>
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
                <h4 className="mb-0 ml-3">Loading DIDs...</h4>
              </div>
            </td>
          </tr>
        )}
        {readyToShowData && dids.length === 0 && (
          <tr className="bg-transparent">
            <td colSpan={5}>
              <p className="m-0 text-primary">Oops. No DIDs were found.</p>
            </td>
          </tr>
        )}
        {readyToShowData &&
          dids.map(did => (
            <tr key={did.id}>
              <td>{did.id}</td>
              <td>{did.value}</td>
              <td>
                {did.currency} {did.monthlyPrice}
              </td>
              <td>
                {did.currency} {did.setupPrice}
              </td>
              <td>
                <div className="d-flex">
                  <Button variant="info" size="sm" title="Edit DID">
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    title="Delete DID"
                    className="ml-2"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default NumbersTable;
