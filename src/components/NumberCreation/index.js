import * as React from 'react';

import Button from 'react-bootstrap/Button';

import useFetchDids from '~/hooks/useFetchDids';

import Form from './components/Form';
import Modal from './components/Modal';

function NumberCreation() {
  const fetchDids = useFetchDids();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

      <Modal
        show={isModalOpen}
        onHide={handleModalClosing}
        locked={isSubmitting}
      >
        <Form
          onSuccessfulSubmit={handleSuccessfulSubmit}
          isSubmitting={isSubmitting}
          onSubmissionChange={setIsSubmitting}
        />
      </Modal>
    </>
  );
}

export default NumberCreation;
