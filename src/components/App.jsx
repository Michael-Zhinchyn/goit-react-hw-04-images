import React, { useEffect, useState, useCallback } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import { SearchBar } from './Searchbar/Searchbar';
import { LoadMoreBtn } from './Button/LoadMoreBtn';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './API';
import { Logo } from './Logo/Logo';
import { Loader } from './Loader/Loader';
import { ScrollToTopBtn } from './ScrollToTop/ScrollToTop';

const SCROLL_OFFSET = 1000;
const IMAGES_PER_PAGE = 20;

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');
  const [prevPage, setPrevPage] = useState(1);
  const [error, setError] = useState(null);

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
    setError(null);

    try {
      const newImages = await getImages({ query: actualQuery, page });
      setImages(prev => [...prev, ...newImages]);
      setHasMoreImages(newImages.length >= IMAGES_PER_PAGE);
    } catch (error) {
      setError('Failed to load images. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (prevQuery !== query || prevPage !== page) {
      setPrevQuery(query);
      setPrevPage(page);
      loadImages({ query, page });
    }
  }, [query, page, prevQuery, prevPage]);

  const checkScrollPosition = useCallback(() => {
    if (typeof window !== 'undefined') {
      const offset = window.scrollY || 0;

      if (offset > SCROLL_OFFSET && !showScrollBtn) {
        setShowScrollBtn(true);
      } else if (offset <= SCROLL_OFFSET && showScrollBtn) {
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
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      {showScrollBtn && (
        <ScrollToTopBtn
          style={{ position: 'fixed', bottom: '10px', right: '10px' }}
        />
      )}
      <GlobalStyle />
    </div>
  );
};
