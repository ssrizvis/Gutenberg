import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '../assets/images/Cancel.svg';
import SearchIcon from '../assets/images/Search.svg';

const DEBOUNCE_DELAY = 300;

function SearchBox({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onChange?.(newValue);
    }, DEBOUNCE_DELAY);
  };

  const handleClear = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    onChange?.('');
  };

  const hasValue = Boolean(value && value.trim().length > 0);

  const className = [
    'books-search',
    isFocused ? 'books-search--focused' : '',
    hasValue ? 'books-search--filled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      <span className="books-search__icon" aria-hidden="true">
        <img src={SearchIcon} alt="" />
      </span>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {hasValue ? (
        <button
          type="button"
          className="books-search__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <img src={CancelIcon} alt="" />
        </button>
      ) : null}
    </div>
  );
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBox;
