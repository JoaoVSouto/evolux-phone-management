import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaSyncAlt } from 'react-icons/fa';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { fetchDids } from '../ducks/didsSlice';

function NumbersTable() {
  const dispatch = useDispatch();
  const { items: dids, isLoading, hasError } = useSelector(state => state.dids);

  const retrieveDids = React.useCallback(() => {
    dispatch(fetchDids());
  }, [dispatch]);

  React.useEffect(() => {
    retrieveDids();
  }, [retrieveDids]);

  return (
    <Table striped bordered responsive className="mt-4 numbers-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Number</th>
          <th>Monthly price</th>
          <th>Setup price</th>
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
                  onClick={retrieveDids}
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
        {!isLoading &&
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
