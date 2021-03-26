import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import Toast from 'react-bootstrap/Toast';

import { removeToast } from '~/ducks/toastsSlice';

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
          className={`toast-container__toast toast-container__toast--${toast.type}`}
          autohide
          delay={3000}
          onClose={() => handleToastClose(toast.id)}
        >
          <Toast.Header className="toast-container__toast__header">
            <strong className="toast-container__toast__title">
              {toast.type === 'success' && (
                <FaCheckCircle className="toast-container__toast__icon" />
              )}
              {toast.type === 'danger' && (
                <FaTimesCircle className="toast-container__toast__icon" />
              )}
              {toast.title}
            </strong>
          </Toast.Header>
          <Toast.Body className="toast-container__toast__body">
            {toast.description}
          </Toast.Body>
        </Toast>
      ))}
    </div>
  );
}

export default ToastContainer;
