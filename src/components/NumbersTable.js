import { FaEdit, FaTrash } from 'react-icons/fa';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function NumbersTable() {
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
        <tr>
          <td>1</td>
          <td>+55 96 90498-8927</td>
          <td>$0.29</td>
          <td>$3.42</td>
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
      </tbody>
    </Table>
  );
}

export default NumbersTable;
