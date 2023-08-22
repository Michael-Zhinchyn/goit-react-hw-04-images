import { Report } from 'notiflix/build/notiflix-report-aio';
import {
  StyledSearchInput,
  StyledSearchBtn,
  StyledSearchForm,
} from './Searchbar.styled';
import { useState } from 'react';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      Report.info(
        'Ooops',
        "Looks like You didn't enter anything for the search.",
        'Okay',
        {
          svgSize: '42px',
          messageMaxLength: 1923,
          plainText: false,
          color: 'green',
          titleFontSize: '20px',
          messageFontSize: '16px',
        }
      );
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleInputChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <div>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchInput
          onChange={handleInputChange}
          value={query}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <StyledSearchBtn>Submit</StyledSearchBtn>
      </StyledSearchForm>
    </div>
  );
};
