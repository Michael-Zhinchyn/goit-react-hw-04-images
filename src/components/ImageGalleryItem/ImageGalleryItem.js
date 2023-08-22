import { useState } from 'react';
import { StyledImageItem, StyledItemImg } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <StyledImageItem>
      <StyledItemImg onClick={openModal} src={webformatURL} alt={tags} />
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        tags={tags}
        largeImageURL={largeImageURL}
      />
    </StyledImageItem>
  );
};
