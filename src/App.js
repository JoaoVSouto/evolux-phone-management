import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import NumberCreation from './components/NumberCreation';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <>
      <Header />

      <Container className="mt-5">
        <h1>DIDs management</h1>

        <NumberCreation />
      </Container>

      <ToastContainer />
    </>
  );
}

export default App;
