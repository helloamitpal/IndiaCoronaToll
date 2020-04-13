import React from 'react';
import PropTypes from 'prop-types';

import translate from '../../../locale';

const KPI = ({ data }) => {
  return (
    <div className="kpi-container">
      <h2>{translate('dashboard.asOfToday')}</h2>
      <ul>
        {
          Object.entries(data).map(([key, { growth, count, label, growthCount }]) => (
            <li key={`kpi-${key}`} className={`${growth}`}>
              <span>Total</span>
              <h3>{count}</h3>
              <span>{label}</span>
              <span className="bold">{growthCount}</span>
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
