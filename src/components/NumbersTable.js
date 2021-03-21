import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { fetchDids } from '../ducks/didsSlice';

function NumbersTable() {
  const dispatch = useDispatch();
  const { items: dids } = useSelector(state => state.dids);

  React.useEffect(() => {
    dispatch(fetchDids());
  }, []);

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
        {dids.map(did => (
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
