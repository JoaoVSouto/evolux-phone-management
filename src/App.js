import * as React from 'react';

import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import NumberCreation from './components/NumberCreation';
import ToastContainer from './components/ToastContainer';
import NumbersTable from './components/NumbersTable';
import NumbersPagination from './components/NumbersPagination';

import useFetchDids from './hooks/useFetchDids';

function App() {
  const fetchDids = useFetchDids();

  React.useEffect(() => {
    const url = new URL(window.location);
    const page = Number(url.searchParams.get('page')) || 1;

    const hasOrdering = Boolean(
      url.searchParams.get('order-asc') || url.searchParams.get('order-desc')
    );
    const order = url.searchParams.get('order-asc') ? 'asc' : 'desc';
    const sort =
      url.searchParams.get('order-asc') || url.searchParams.get('order-desc');

    fetchDids({
      page,
      orderOption: hasOrdering ? { sort, order } : {},
    });
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
