import React from 'react';
import PropTypes from 'prop-types';

import translate from '../../../locale';

const KPI = ({ data }) => {
  return (
    <div className="kpi-container">
      <ul>
        {
          Object.entries(data).map(([key, { growth, count, label, growthCount }]) => (
            <li key={`kpi-${key}`} className={`${growth}`}>
              <span>{translate('common.total')}</span>
              <h3>{count}</h3>
              <span>{label}</span>
              <span className="bold">{growthCount}</span>
              <span>{translate('common.new')}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

KPI.propTypes = {
  data: PropTypes.object.isRequired
};

export default KPI;
