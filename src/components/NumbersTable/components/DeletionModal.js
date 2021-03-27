import * as React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { deleteDid } from '~/ducks/didsSlice';
import { addToast } from '~/ducks/toastsSlice';

function DeletionModal({ show, onHide, didId }) {
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deletionError, setDeletionError] = React.useState('');

  const handleDidDeletion = async () => {
    setIsDeleting(true);
    setDeletionError('');

    try {
      await deleteDid(didId)(dispatch);
      onHide();
      dispatch(
        addToast({ title: 'Success', description: 'DID deleted successfully!' })
      );
    } catch {
      setDeletionError(
        'Some error occurred while deleting DID. Please try again.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      centered
      animation={false}
      show={show}
      onHide={onHide}
      backdrop={isDeleting ? 'static' : true}
      keyboard={!isDeleting}
    >
      <Modal.Header closeButton={!isDeleting}>
        <Modal.Title>Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this record with ID{' '}
        <strong>#{didId}</strong>?
      </Modal.Body>
      <Modal.Footer>
        {deletionError && (
          <small className="text-danger">{deletionError}</small>
        )}
        <div>
          <Button variant="danger" onClick={onHide} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="success"
            className="ml-2"
            onClick={handleDidDeletion}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
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
