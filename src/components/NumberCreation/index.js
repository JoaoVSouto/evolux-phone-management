import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';

import useFetchDids from '~/hooks/useFetchDids';

import Form from './components/Form';
import Modal from './components/Modal';

function NumberCreation() {
  const isLoading = useSelector(state => state.dids.isLoading);

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
      <Button
        variant="success"
        onClick={handleModalOpening}
        disabled={isLoading}
        className="align-self-stretch flex-sm-shrink-0 ml-sm-4"
      >
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
