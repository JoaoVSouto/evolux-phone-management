import * as React from 'react';

import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import NumberCreation from './components/NumberCreation';
import ToastContainer from './components/ToastContainer';
import NumbersTable from './components/NumbersTable';
import NumbersPagination from './components/NumbersPagination';

import services from './services';

import useFetchDids from './hooks/useFetchDids';

function App() {
  const fetchDids = useFetchDids();

  React.useEffect(() => {
    const { page, orderOption } = services.url.getPageAndOrderOption();

    fetchDids({ page, orderOption });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <Container className="mt-5">
        <h1>DIDs management</h1>

        <NumberCreation />

        <NumbersTable />
        <NumbersPagination />
      </Container>

      <ToastContainer />
    </>
  );
}

export default App;
