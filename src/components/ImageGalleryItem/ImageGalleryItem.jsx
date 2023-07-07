import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, modalURL, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <img
        src={url}
        alt={alt}
        className={css.imageGalleryItem_image}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal largeURL={modalURL} alt={alt} closeModal={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  modalURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
