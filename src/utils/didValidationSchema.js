import * as Yup from 'yup';

export default Yup.object().shape({
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
