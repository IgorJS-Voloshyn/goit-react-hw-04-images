import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Enter your query!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchForm_button}>
          <span>
            <ImSearch />
          </span>
        </button>

        <input
          onChange={handleChange}
          className={css.searchForm_input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
