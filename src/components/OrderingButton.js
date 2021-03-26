import PropTypes from 'prop-types';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

import Button from 'react-bootstrap/Button';

function OrderingButton({ disabled, sortField, ascending, active, onClick }) {
  return (
    <Button
      variant="link"
      size="sm"
      disabled={disabled}
      title={`Order ${sortField} by ${
        ascending ? 'descending' : 'ascending'
      } order`}
      className={`ml-3 ${active ? 'text-info' : ''}`}
      onClick={onClick}
    >
      {ascending ? (
        <FaSortNumericUp size={20} />
      ) : (
        <FaSortNumericDown size={20} />
      )}
    </Button>
  );
}

OrderingButton.propTypes = {
  disabled: PropTypes.bool,
  sortField: PropTypes.string.isRequired,
  ascending: PropTypes.bool.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

OrderingButton.defaultProps = {
  disabled: false,
  active: false,
  onClick: () => {},
};

export default OrderingButton;
