import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ picture, alt, onClose }) => {
  useEffect(() => {
    function onCloseByEsc(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', onCloseByEsc);

    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={picture} alt={alt} className={css.ModalPicture} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
