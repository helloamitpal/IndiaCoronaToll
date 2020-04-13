import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './UserRow.scss';

const UserRow = ({ personalInfo: { name, email, img }, index, style, className, onClick }) => (
  <div style={style} className={`virtual-row ${className}`}>
    <LazyLoadImage src={img} alt="user-profile-pic" visibleByDefault />
    <div className="row-content">
      <div>{name}</div>
      <div>{email}</div>
    </div>
    <button type="button" className="preview" onClick={() => onClick(index)}>
      <span className="material-icons">pageview</span>
    </button>
  </div>
);

UserRow.defaultProps = {
  style: {},
  className: ''
};

UserRow.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default UserRow;
