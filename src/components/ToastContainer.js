import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import Toast from 'react-bootstrap/Toast';

import { removeToast } from '../ducks/toastsSlice';

function ToastContainer() {
  const dispatch = useDispatch();

  const { toasts } = useSelector(state => state.toasts);

  const handleToastClose = toastId => {
    dispatch(removeToast(toastId));
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          className="bg-white"
          autohide
          delay={3000}
          onClose={() => handleToastClose(toast.id)}
        >
          <Toast.Header>
            <strong className="mr-auto text-success d-flex align-items-center">
              <FaCheckCircle className="mr-2" />
              {toast.title}
            </strong>
          </Toast.Header>
          <Toast.Body>{toast.description}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
}

export default ToastContainer;
