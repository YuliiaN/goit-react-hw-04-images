import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ preview, picture, tags }) => {
  const [opened, setOpened] = useState(false);

  const toggleModal = () => {
    setOpened(prevState => !prevState);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={preview}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={toggleModal}
      />
      {opened && <Modal picture={picture} alt={tags} onClose={toggleModal} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
