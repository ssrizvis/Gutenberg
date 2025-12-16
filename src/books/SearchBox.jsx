import { useState } from 'react';
import CancelIcon from '../assets/images/Cancel.svg';
import SearchIcon from '../assets/images/Search.svg';

function SearchBox({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  const hasValue = Boolean(value && value.trim().length > 0);

  const className = [
    'search-box',
    isFocused ? 'search-box--focused' : '',
    hasValue ? 'search-box--filled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      <span className="search-box__icon" aria-hidden="true">
        <img style={{ marginTop: 5 }} src={SearchIcon} alt="" />
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
          className="search-box__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <img src={CancelIcon} alt="" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchBox;
