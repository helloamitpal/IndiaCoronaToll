import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = ({ data: { fromColor, toColor, min, max } }) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${fromColor} , ${toColor})`,
    height: 20
  };
  return (
    <div className="gradient-container">
      <div className="gradient box">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div className="box mt-10" style={{ ...gradientStyle }} />
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired
};

export default LinearGradient;
