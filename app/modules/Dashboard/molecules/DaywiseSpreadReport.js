import React from 'react';
// import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import KPI from './KPI';

import './DaywiseSpreadReport.scss';

const DaywiseSpreadReport = ({ series, kpi }) => {
  return (
    <div className="daywise-spread-container">
      <KPI data={kpi} />
      <div className="chart-container">
        <Chart
          options={series.options}
          series={series.datasets}
          type="line"
        />
      </div>
    </div>
  );
};

DaywiseSpreadReport.propTypes = {
  series: PropTypes.object.isRequired,
  kpi: PropTypes.object.isRequired
};

export default DaywiseSpreadReport;
