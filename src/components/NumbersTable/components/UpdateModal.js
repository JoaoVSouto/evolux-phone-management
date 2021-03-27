import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import didValidationSchema from '~/utils/didValidationSchema';

import { updateDid } from '~/ducks/didsSlice';

function UpdateModal({ onHide, did }) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: yupResolver(didValidationSchema),
    mode: 'all',
    defaultValues: {
      value: did.value,
      monthlyPrice: did.monthlyPrice,
      setupPrice: did.setupPrice,
      currency: did.currency,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async data => {
    const payload = {
      id: did.id,
      currency: data.currency,
      monthlyPrice: data.monthlyPrice.toFixed(2),
      setupPrice: data.setupPrice.toFixed(2),
      value: data.value,
    };
    await updateDid(payload)(dispatch);
  };

  return (
    <Modal centered animation={false} show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit DID #{did.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="didValue">
            <Form.Label>Number</Form.Label>
            <Form.Control
              name="value"
              placeholder="e.g. +55 84 91234-4321"
              isInvalid={errors.value}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.value?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="monthlyPrice">
            <Form.Label>Monthly price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="monthlyPrice"
              isInvalid={errors.monthlyPrice}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.monthlyPrice?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="setupPrice">
            <Form.Label>Setup price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="setupPrice"
              isInvalid={errors.setupPrice}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.setupPrice?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="didCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              name="currency"
              placeholder="e.g. U$"
              isInvalid={errors.currency}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currency?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <Button variant="danger" onClick={onHide}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={!isDirty || !isValid}
            >
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

UpdateModal.propTypes = {
  onHide: PropTypes.func,
  did: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    monthlyPrice: PropTypes.string,
    setupPrice: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
};

UpdateModal.defaultProps = {
  onHide: () => {},
};

export default UpdateModal;
