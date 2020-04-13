import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ onClose, children }) => (
  <div className="overlay modal-container">
    <div className="modal-content">
      <button type="button" className="close-btn" onClick={onClose}>
        <span className="material-icons">close</span>
      </button>
      <div className="modal-body">{children}</div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
