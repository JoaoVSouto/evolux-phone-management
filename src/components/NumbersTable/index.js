import * as React from 'react';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaSyncAlt } from 'react-icons/fa';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import OrderingButton from './components/OrderingButton';
import DeletionModal from './components/DeletionModal';

import useFetchDids from '~/hooks/useFetchDids';

function NumbersTable() {
  const { items: dids, isLoading, hasError, orderOption } = useSelector(
    state => state.dids
  );

  const fetchDids = useFetchDids();

  const [didToBeDeletedId, setDidToBeDeletedId] = React.useState(null);

  const isDeletionModalOpen = React.useMemo(() => Boolean(didToBeDeletedId), [
    didToBeDeletedId,
  ]);

  const readyToShowData = React.useMemo(() => !hasError && !isLoading, [
    hasError,
    isLoading,
  ]);

  const isSortedByAscendingId = React.useMemo(
    () =>
      (orderOption.sort === 'id' && orderOption.order === 'asc') ||
      !orderOption.sort,
    [orderOption.sort, orderOption.order]
  );

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

  const handleOrdering = ({ sort, order }) => () => {
    const url = new URL(window.location);
    url.searchParams.delete('order-desc');
    url.searchParams.delete('order-asc');
    url.searchParams.set(`order-${order}`, sort);
    window.history.replaceState({}, '', url);

    fetchDids({
      orderOption: {
        sort,
        order,
      },
    });
  };

  const handleSetDidToBeDeleted = didId => setDidToBeDeletedId(didId);

  const handleDeletionModalClosing = () => setDidToBeDeletedId(null);

  return (
    <>
      <Table striped bordered responsive className="mt-4 numbers-table">
        <thead>
          <tr>
            <th>
              <div className="d-flex align-items-center justify-content-between">
                ID
                <OrderingButton
                  active={!orderOption.sort || orderOption.sort === 'id'}
                  ascending={isSortedByAscendingId}
                  disabled={isLoading}
                  onClick={handleOrdering({
                    sort: 'id',
                    order: isSortedByAscendingId ? 'desc' : 'asc',
                  })}
                  sortField="IDs"
                />
              </div>
            </th>
            <th>
              <div className="d-flex align-items-center justify-content-between">
                Number
                <OrderingButton
                  active={orderOption.sort === 'value'}
                  ascending={isSortedByAscendingNumbers}
                  disabled={isLoading}
                  onClick={handleOrdering({
                    sort: 'value',
                    order: isSortedByAscendingNumbers ? 'desc' : 'asc',
                  })}
                  sortField="numbers"
                />
              </div>
            </th>
            <th>
              <div className="d-flex align-items-center justify-content-between">
                Monthly price
                <OrderingButton
                  active={orderOption.sort === 'monthlyPrice'}
                  ascending={isSortedByAscendingMonthlyPrice}
                  disabled={isLoading}
                  onClick={handleOrdering({
                    sort: 'monthlyPrice',
                    order: isSortedByAscendingMonthlyPrice ? 'desc' : 'asc',
                  })}
                  sortField="monthly price"
                />
              </div>
            </th>
            <th>
              <div className="d-flex align-items-center justify-content-between">
                Setup price
                <OrderingButton
                  active={orderOption.sort === 'setupPrice'}
                  ascending={isSortedByAscendingSetupPrice}
                  disabled={isLoading}
                  onClick={handleOrdering({
                    sort: 'setupPrice',
                    order: isSortedByAscendingSetupPrice ? 'desc' : 'asc',
                  })}
                  sortField="setup price"
                />
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
                    onClick={fetchDids}
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
                      onClick={() => handleSetDidToBeDeleted(did.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <DeletionModal
        onHide={handleDeletionModalClosing}
        didId={didToBeDeletedId}
        show={isDeletionModalOpen}
      />
    </>
  );
}

export default NumbersTable;
