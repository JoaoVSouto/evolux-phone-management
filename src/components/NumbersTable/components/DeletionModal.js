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

  const handleDidDeletion = async () => {
    setIsDeleting(true);

    try {
      await deleteDid(didId)(dispatch);
      onHide();
      dispatch(
        addToast({ title: 'Success', description: 'DID deleted successfully!' })
      );
    } catch {
      console.log('error on deletion....');
    } finally {
      setIsDeleting(false);
    }
  };

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
        <Button
          variant="success"
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
