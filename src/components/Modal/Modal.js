import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Loader } from 'components/Loader/Loader';
import {
  StyledModalImg,
  StyledItemBottomWrapper,
  StyledImageTag,
  StyledCloseButton,
} from './Modal.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflow: 'hidden',
    background: 'transparent',
  },
  overlay: {
    backgroundColor: '#23272f',
  },
};

Modal.setAppElement('#root');

export const ImageModal = ({ isOpen, onRequestClose, tags, largeImageURL }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <StyledModalImg src={largeImageURL} alt={tags} onLoad={handleImageLoad} />
      {!imageLoaded && <Loader />}
      {imageLoaded && (
        <StyledItemBottomWrapper>
          <StyledImageTag>{tags}</StyledImageTag>
          <StyledCloseButton onClick={onRequestClose}>close</StyledCloseButton>
        </StyledItemBottomWrapper>
      )}
    </Modal>
  );
};
