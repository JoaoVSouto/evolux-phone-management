import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import evoluxLogo from '~/assets/img/evolux-logo.png';

function Header() {
  return (
    <Navbar as="header" bg="primary" variant="dark" className="header">
      <Container>
        <Navbar.Brand>
          <img src={evoluxLogo} alt="Evolux" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
