import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './message.scss';

const Message = ({ title, description, type }) => (
  <div className={`message-container ${type}`}>
    {title ? <h1 className="title">{title}</h1> : null}
    {description ? <div className="description">{description}</div> : null}
  </div>
);

Message.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'default'])
};

Message.defaultProps = {
  description: '',
  type: 'default',
  title: ''
};

export default memo(Message);
