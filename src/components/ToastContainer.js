import { FaCheckCircle } from 'react-icons/fa';
import Toast from 'react-bootstrap/Toast';

function ToastContainer() {
  return (
    <div className="toast-container">
      <Toast className="bg-white">
        <Toast.Header>
          <strong className="mr-auto text-success d-flex align-items-center">
            <FaCheckCircle className="mr-2" />
            Success
          </strong>
        </Toast.Header>
        <Toast.Body>DID created successfully!</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastContainer;
