import FormControl from 'react-bootstrap/FormControl';

import services from '~/services';

import useDebounce from '~/hooks/useDebounce';
import useFetchDids from '~/hooks/useFetchDids';

function NumbersSearch() {
  const fetchDids = useFetchDids();

  const handleInputChange = e => {
    const inputValue = e.target.value.trim();

    services.url.setQuery(inputValue);

    fetchDids({
      query: inputValue,
    });
  };

  const debouncedHandleInputChange = useDebounce(handleInputChange, 500);

  return (
    <FormControl
      onChange={debouncedHandleInputChange}
      className="numbers-search order-1 order-sm-0 mt-3 mt-sm-0"
      placeholder="Search DIDs by number"
    />
  );
}

export default NumbersSearch;
