import React, { useEffect, useState, useCallback } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import { SearchBar } from './Searchbar/Searchbar';
import { LoadMoreBtn } from './Button/LoadMoreBtn';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './API';
import { Logo } from './Logo/Logo';
import { Loader } from './Loader/Loader';
import { ScrollToTopBtn } from './ScrollToTop/ScrollToTop';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [prevQuery, setPrevQuery] = useState(query);
  const [prevPage, setPrevPage] = useState(page);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setHasMoreImages(true);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const loadImages = async ({ query, page }) => {
    const actualQuery = query.split('/')[1];
    setIsLoading(true);
    const newImages = await getImages({ query: actualQuery, page });
    setImages(prev => [...prev, ...newImages]);
    setHasMoreImages(newImages.length >= 20);
    setIsLoading(false);
  };

  useEffect(() => {
    if (prevQuery !== query || prevPage !== page) {
      loadImages({ query, page });
    }

    setPrevQuery(query);
    setPrevPage(page);
  }, [query, page, prevQuery, prevPage]);

  const checkScrollPosition = useCallback(() => {
    if (typeof window !== 'undefined') {
      const offset = window.scrollY || 0;

      if (offset > 1000 && !showScrollBtn) {
        setShowScrollBtn(true);
      } else if (offset <= 1000 && showScrollBtn) {
        setShowScrollBtn(false);
      }
    }
  }, [showScrollBtn]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return (
    <div>
      <Logo />
      <SearchBar onSubmit={changeQuery} />
      <ImageGallery images={images} />
      {images.length > 0 && hasMoreImages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {showScrollBtn && (
        <ScrollToTopBtn
          style={{ position: 'fixed', bottom: '10px', right: '10px' }}
        />
      )}
      <GlobalStyle />
    </div>
  );
};
