import { toast } from 'react-toastify';

const showMessage = ({ message, type }) => {
  const options = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case 'error':
    case 'danger': // Treat "danger" as an alias for "error"
      toast.error(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast.info(message || 'Unknown message type', options); // Fallback for other types
      break;
  }
};

export default showMessage;
