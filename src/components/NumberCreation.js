import * as React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import useFetchDids from '../hooks/useFetchDids';

import NumberCreationForm from './NumberCreationForm';

function NumberCreation() {
  const fetchDids = useFetchDids();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpening = () => setIsModalOpen(true);

  const handleModalClosing = () => setIsModalOpen(false);

  const handleSuccessfulSubmit = () => {
    setIsModalOpen(false);
    fetchDids();
  };

  return (
    <>
      <Button variant="success" className="mt-3" onClick={handleModalOpening}>
        Create a new DID
      </Button>

      <Modal show={isModalOpen} centered onHide={handleModalClosing}>
        <Modal.Header closeButton>
          <Modal.Title>DID creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NumberCreationForm onSuccessfulSubmit={handleSuccessfulSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NumberCreation;
