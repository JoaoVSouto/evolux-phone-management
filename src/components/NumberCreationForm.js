import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Form from 'react-bootstrap/Form';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

const schema = Yup.object().shape({
  value: Yup.string().matches(/\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}/, {
    message: 'Number is not following the pattern: +xx (xx) xxxxx-xxxx',
  }),
  monthlyPrice: Yup.number()
    .typeError('Monthly price must be a valid number')
    .min(0.01, 'Monthly price must cost at least 0.01')
    .max(50, 'Monthly price must cost at maximum 50.00'),
  setupPrice: Yup.number()
    .typeError('Setup price must be a valid number')
    .min(0.01, 'Setup price must cost at least 0.01')
    .max(300, 'Setup price must cost at maximum 300.00'),
});

function NumberCreationForm() {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="didValue">
        <Form.Label>Number</Form.Label>
        <Form.Control
          name="value"
          placeholder="e.g. +55 (84) 91234-4321"
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
        <Form.Control as="select" name="currency" ref={register}>
          <option>U$</option>
          <option>R$</option>
          <option>€</option>
          <option>£</option>
        </Form.Control>
      </Form.Group>

      <ModalFooter>
        <Button type="submit" variant="success" disabled={!isDirty || !isValid}>
          Create
        </Button>
      </ModalFooter>
    </Form>
  );
}

export default NumberCreationForm;