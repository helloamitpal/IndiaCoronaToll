import React, { useState } from 'react';
import PropTypes from 'prop-types';

import translate from '../../../locale';

import './TestReport.scss';

const TestReport = ({ series }) => {
  const dataLen = series.length - 1;
  const [index, setIndex] = useState(dataLen);
  const { totalpositivecases, totalsamplestested, date, percentage } = series[index];

  const moveIndex = (evt, direction) => {
    evt.preventDefault();

    let newIndex = index;

    if (direction === 'left') {
      newIndex -= 1;
      newIndex = (newIndex < 0) ? 0 : newIndex;
    } else if (direction === 'right') {
      newIndex += 1;
      newIndex = (newIndex > dataLen) ? dataLen : newIndex;
    }

    setIndex(newIndex);
  };

  return (
    <div className="test-report-container">
      <div className="date-container red">
        <a className={`${index === 0 ? 'hidden' : ''}`} href="" onClick={(evt) => moveIndex(evt, 'left')}><span className="material-icons">keyboard_arrow_left</span></a>
        <h3>{date}</h3>
        <a className={`${index === dataLen ? 'hidden' : ''}`} href="" onClick={(evt) => moveIndex(evt, 'right')}><span className="material-icons">keyboard_arrow_right</span></a>
      </div>
      <div className="reports">
        <div>{translate('dashboard.sampleTestTitle')}</div>
        <h4>{totalsamplestested}</h4>
        <div>{translate('dashboard.positiveCaseTitle')}</div>
        <h4>{translate('dashboard.positiveCases', { COUNT: totalpositivecases, PERCENTAGE: percentage })}</h4>
      </div>
    </div>
  );
};

TestReport.propTypes = {
  series: PropTypes.array.isRequired
};

export default TestReport;
