import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateModal({ show, onHide, didId }) {
  return (
    <Modal centered animation={false} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit DID #{didId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group controlId="didValue">
            <Form.Label>Number</Form.Label>
            <Form.Control name="value" placeholder="e.g. +55 84 91234-4321" />
          </Form.Group>

          <Form.Group controlId="monthlyPrice">
            <Form.Label>Monthly price</Form.Label>
            <Form.Control type="number" step="0.01" name="monthlyPrice" />
          </Form.Group>

          <Form.Group controlId="setupPrice">
            <Form.Label>Setup price</Form.Label>
            <Form.Control type="number" step="0.01" name="setupPrice" />
          </Form.Group>

          <Form.Group controlId="didCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control name="currency" placeholder="e.g. U$" />
          </Form.Group>

          <Modal.Footer>
            <Button variant="danger" onClick={onHide}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

UpdateModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  didId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
};

UpdateModal.defaultProps = {
  show: false,
  onHide: () => {},
  didId: null,
};

export default UpdateModal;
