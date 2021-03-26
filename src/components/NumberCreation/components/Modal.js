import PropTypes from 'prop-types';

import BModal from 'react-bootstrap/Modal';

function Modal({ children, show, onHide }) {
  return (
    <BModal show={show} centered onHide={onHide}>
      <BModal.Header closeButton>
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
};

Modal.defaultProps = {
  onHide: () => {},
};

export default Modal;
