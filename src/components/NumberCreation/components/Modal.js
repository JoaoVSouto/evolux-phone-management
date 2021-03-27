import PropTypes from 'prop-types';

import BModal from 'react-bootstrap/Modal';

function Modal({ children, show, onHide, locked }) {
  return (
    <BModal
      show={show}
      centered
      onHide={onHide}
      backdrop={locked ? 'static' : true}
      keyboard={!locked}
    >
      <BModal.Header closeButton={!locked}>
        <BModal.Title>DID creation</BModal.Title>
      </BModal.Header>
      <BModal.Body>{children}</BModal.Body>
    </BModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  locked: PropTypes.bool,
};

Modal.defaultProps = {
  onHide: () => {},
  locked: false,
};

export default Modal;
