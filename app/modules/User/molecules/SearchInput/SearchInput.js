import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../components/atoms/Input';
import translate from '../../../../locale';

import './SearchInput.scss';

const SearchInput = ({ onSearch, className, placeholder, ...restProps }) => {
  const [text, setText] = useState();

  const onChangeSearch = (val) => {
    setText(val);
  };

  return (
    <div className={`search-input-container ${className}`}>
      <Input
        {...restProps}
        value={text}
        onChange={onChangeSearch}
        placeholder={placeholder}
      />
      <button type="button" onClick={() => onSearch(text)}>
        <span className="material-icons">search</span>
      </button>
    </div>
  );
};

SearchInput.defaultProps = {
  className: '',
  placeholder: translate('user.searchByNamePlaceholder')
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default SearchInput;
