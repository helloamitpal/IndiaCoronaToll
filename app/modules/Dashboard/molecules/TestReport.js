import React, { useState } from 'react';
import PropTypes from 'prop-types';

import translate from '../../../locale';

import './TestReport.scss';

const TestReport = ({ series }) => {
  const dataLen = series.length - 1;
  const [index, setIndex] = useState(0);
  const {
    totalpositivecases,
    totalsamplestested,
    date,
    totaldeceased,
    totalrecovered,
    positiveCaseChange,
    deathCaseChange,
    recoveryCaseChange
  } = series[index];

  const moveIndex = (evt, direction) => {
    evt.preventDefault();

    let newIndex = index;

    if (direction === 'left') {
      newIndex += 1;
      newIndex = (newIndex > dataLen) ? dataLen : newIndex;
    } else if (direction === 'right') {
      newIndex -= 1;
      newIndex = (newIndex < 0) ? 0 : newIndex;
    }

    setIndex(newIndex);
  };

  return (
    <div className="test-report-container">
      <div className="date-container red">
        <a className={`${index === dataLen ? 'hidden' : ''}`} href="" onClick={(evt) => moveIndex(evt, 'left')}>
          <span className="material-icons">keyboard_arrow_left</span>
        </a>
        <h3>{date}</h3>
        <a className={`${index === 0 ? 'hidden' : ''}`} href="" onClick={(evt) => moveIndex(evt, 'right')}>
          <span className="material-icons">keyboard_arrow_right</span>
        </a>
      </div>
      <div className="reports">
        <div>{translate('dashboard.sampleTestTitle')}</div>
        <h4>{totalsamplestested}</h4>
        <section className="more-details-section">
          <div>
            <p>{translate('dashboard.positiveCaseTitle')}</p>
            <h4>
              {totalpositivecases}
              <i className={`${positiveCaseChange.includes('+') ? 'up' : 'down'}`}>
                {translate('common.count', { COUNT: positiveCaseChange })}
              </i>
            </h4>
          </div>
          <div>
            <p>{translate('dashboard.deceased')}</p>
            <h4>
              {totaldeceased}
              <i className={`${deathCaseChange.includes('+') ? 'up' : 'down'}`}>
                {translate('common.count', { COUNT: deathCaseChange })}
              </i>
            </h4>
          </div>
          <div>
            <p>{translate('dashboard.recovered')}</p>
            <h4>
              {totalrecovered}
              <i className={`${recoveryCaseChange.includes('+') ? 'down' : 'up'}`}>
                {translate('common.count', { COUNT: recoveryCaseChange })}
              </i>
            </h4>
          </div>
        </section>
      </div>
    </div>
  );
};

TestReport.propTypes = {
  series: PropTypes.array.isRequired
};

export default TestReport;
