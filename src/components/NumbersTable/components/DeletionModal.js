import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeletionModal({ show, onHide, didId }) {
  return (
    <Modal centered animation={false} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this record with ID{' '}
        <strong>#{didId}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={onHide}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

DeletionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  didId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
};

DeletionModal.defaultProps = {
  onHide: () => {},
  didId: null,
};

export default DeletionModal;
