import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ onChange, validate, placeholder, value, type }) => {
  const [error, setError] = useState(false);

  const onChangeText = ({ target: { value: inputVal } }) => {
    const trimmedVal = inputVal;

    if (validate) {
      const valid = validate.call(null, trimmedVal);
      setError(!valid);
    }
    onChange(trimmedVal);
  };

  return (
    <div className={`input-container ${error ? 'error' : ''}`}>
      <input type={type} value={value} onChange={onChangeText} placeholder={placeholder} />
    </div>
  );
};

Input.defaultProps = {
  validate: null,
  placeholder: '',
  value: '',
  type: 'text'
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string
};

export default Input;
