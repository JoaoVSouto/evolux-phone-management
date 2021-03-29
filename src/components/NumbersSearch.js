import { useSelector } from 'react-redux';

import FormControl from 'react-bootstrap/FormControl';

import useDebounce from '~/hooks/useDebounce';
import useFetchDids from '~/hooks/useFetchDids';

function NumbersSearch() {
  const query = useSelector(state => state.dids.query);
  const isLoading = useSelector(state => state.dids.isLoading);

  const fetchDids = useFetchDids();

  const handleInputChange = e => {
    const inputValue = e.target.value.trim();

    fetchDids({
      query: inputValue,
      page: 1,
    });
  };

  const debouncedHandleInputChange = useDebounce(handleInputChange, 500);

  return (
    <FormControl
      disabled={isLoading}
      defaultValue={query}
      onInput={debouncedHandleInputChange}
      className="numbers-search order-1 order-sm-0 mt-3 mt-sm-0"
      placeholder="Search DIDs by number"
    />
  );
}

export default NumbersSearch;
