import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import KPI from './KPI';

import './DaywiseSpreadReport.scss';

const DaywiseSpreadReport = ({ series, kpi }) => {
  return (
    <div className="daywise-spread-container">
      <KPI data={kpi} />
      <div className="chart-container">
        <Line data={series} options={{ responsive: true }} />
      </div>
    </div>
  );
};

DaywiseSpreadReport.propTypes = {
  series: PropTypes.object.isRequired,
  kpi: PropTypes.object.isRequired
};

export default DaywiseSpreadReport;
