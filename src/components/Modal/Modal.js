import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onCloseByEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onCloseByEsc);
//   }

//   onCloseByEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <div className={css.Overlay} onClick={this.handleClick}>
//         <div className={css.Modal}>
//           <img
//             src={this.props.picture}
//             alt={this.props.alt}
//             className={css.ModalPicture}
//           />
//         </div>
//       </div>
//     );
//   }
// }

export const Modal = ({ picture, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseByEsc);

    function onCloseByEsc(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

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
