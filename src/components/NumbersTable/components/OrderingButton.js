import PropTypes from 'prop-types';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

import Button from 'react-bootstrap/Button';

import services from '~/services';

import useFetchDids from '~/hooks/useFetchDids';

function OrderingButton({ disabled, sortLabel, sortKey, ascending, active }) {
  const fetchDids = useFetchDids();

  const handleOrderChange = () => {
    const order = ascending ? 'desc' : 'asc';

    services.url.setOrder(order, sortKey);

    fetchDids({
      orderOption: {
        sort: sortKey,
        order,
      },
    });
  };

  return (
    <Button
      variant="link"
      size="sm"
      disabled={disabled}
      title={`Order ${sortLabel} by ${
        ascending ? 'descending' : 'ascending'
      } order`}
      className={`ml-3 ${active ? 'text-info' : ''}`}
      onClick={handleOrderChange}
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
  sortLabel: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  ascending: PropTypes.bool.isRequired,
  active: PropTypes.bool,
};

OrderingButton.defaultProps = {
  disabled: false,
  active: false,
};

export default OrderingButton;
