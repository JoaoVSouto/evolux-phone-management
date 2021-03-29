import * as React from 'react';

import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import NumberCreation from './components/NumberCreation';
import ToastContainer from './components/ToastContainer';
import NumbersTable from './components/NumbersTable';
import NumbersPagination from './components/NumbersPagination';
import NumbersSearch from './components/NumbersSearch';

import services from './services';

import useFetchDids from './hooks/useFetchDids';

function App() {
  const fetchDids = useFetchDids();

  React.useEffect(() => {
    const storedOrderOption = services.storage.getOrder();
    const {
      page,
      orderOption: queriedOrderOption,
      query,
    } = services.url.getAllData();

    const isQueriedOrderOptionValid = Boolean(
      queriedOrderOption.order && queriedOrderOption.sort
    );
    const orderOption = isQueriedOrderOptionValid
      ? queriedOrderOption
      : storedOrderOption;

    fetchDids({ page, orderOption, query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <Container className="mt-5">
        <h1>DIDs management</h1>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4">
          <NumbersSearch />
          <NumberCreation />
        </div>

        <NumbersTable />
        <NumbersPagination />
      </Container>

      <ToastContainer />
    </>
  );
}

export default App;
