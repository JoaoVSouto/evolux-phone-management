import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import BForm from 'react-bootstrap/Form';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import api from '../../../services/api';

import { addToast } from '../../../ducks/toastsSlice';

const schema = Yup.object().shape({
  value: Yup.string().matches(/^\+\d{2}\s\d{2}\s\d{5}-\d{4}$/, {
    message: 'Number is not following the pattern: +xx xx xxxxx-xxxx',
  }),
  monthlyPrice: Yup.number()
    .typeError('Monthly price must be a valid number')
    .min(0.01, 'Monthly price must cost at least 0.01'),
  setupPrice: Yup.number()
    .typeError('Setup price must be a valid number')
    .min(0.01, 'Setup price must cost at least 0.01'),
  currency: Yup.string().required('Currency is required').matches(/^\D+$/, {
    message: 'Currency cannot contain numbers',
  }),
});

function Form({ onSuccessfulSubmit }) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState('');

  const dispatch = useDispatch();

  const onSubmit = async data => {
    const { value, monthlyPrice, setupPrice, currency } = data;

    setIsSubmitting(true);
    setSubmissionError('');

    try {
      await api.post('dids', {
        value,
        currency,
        monthlyPrice: monthlyPrice.toFixed(2),
        setupPrice: setupPrice.toFixed(2),
      });

      onSuccessfulSubmit();
      dispatch(
        addToast({ title: 'Success', description: 'DID created successfully!' })
      );
    } catch {
      setSubmissionError(
        'Some error occurred while creating DID. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BForm noValidate onSubmit={handleSubmit(onSubmit)}>
      <BForm.Group controlId="didValue">
        <BForm.Label>Number</BForm.Label>
        <BForm.Control
          name="value"
          placeholder="e.g. +55 84 91234-4321"
          isInvalid={errors.value}
          ref={register}
        />
        <BForm.Control.Feedback type="invalid">
          {errors.value?.message}
        </BForm.Control.Feedback>
      </BForm.Group>

      <BForm.Group controlId="monthlyPrice">
        <BForm.Label>Monthly price</BForm.Label>
        <BForm.Control
          type="number"
          step="0.01"
          name="monthlyPrice"
          isInvalid={errors.monthlyPrice}
          ref={register}
        />
        <BForm.Control.Feedback type="invalid">
          {errors.monthlyPrice?.message}
        </BForm.Control.Feedback>
      </BForm.Group>

      <BForm.Group controlId="setupPrice">
        <BForm.Label>Setup price</BForm.Label>
        <BForm.Control
          type="number"
          step="0.01"
          name="setupPrice"
          isInvalid={errors.setupPrice}
          ref={register}
        />
        <BForm.Control.Feedback type="invalid">
          {errors.setupPrice?.message}
        </BForm.Control.Feedback>
      </BForm.Group>

      <BForm.Group controlId="didCurrency">
        <BForm.Label>Currency</BForm.Label>
        <BForm.Control
          name="currency"
          placeholder="e.g. U$"
          isInvalid={errors.currency}
          ref={register}
        />
        <BForm.Control.Feedback type="invalid">
          {errors.currency?.message}
        </BForm.Control.Feedback>
      </BForm.Group>

      <ModalFooter>
        {submissionError && (
          <small className="text-danger">{submissionError}</small>
        )}
        <Button
          type="submit"
          variant="success"
          disabled={isSubmitting || !isDirty || !isValid}
        >
          {isSubmitting ? (
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
            'Create'
          )}
        </Button>
      </ModalFooter>
    </BForm>
  );
}

Form.propTypes = {
  onSuccessfulSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSuccessfulSubmit: () => {},
};

export default Form;
