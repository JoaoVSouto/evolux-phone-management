import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function NumberCreation() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpening = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClosing = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
          <Form>
            <Form.Group controlId="didValue">
              <Form.Label>Number</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group controlId="monthlyPrice">
              <Form.Label>Monthly Price</Form.Label>
              <Form.Control type="number" step="0.01" />
            </Form.Group>

            <Form.Group controlId="setupPrice">
              <Form.Label>Setup Price</Form.Label>
              <Form.Control type="number" step="0.01" />
            </Form.Group>

            <Form.Group controlId="didCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control as="select">
                <option>U$</option>
                <option>R$</option>
                <option>€</option>
                <option>£</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NumberCreation;
