import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import translate from '../../../locale';
import config from '../../../config';

import './StateReport.scss';

const StateReport = ({ reports, history }) => {
  const gotoSatePage = (evt, stateObj) => {
    evt.preventDefault();
    history.push({
      pathname: config.DASHBOARD_STATE_PAGE,
      state: { ...stateObj }
    });
  };

  return (
    <div className="state-report-container">
      <h2>{translate('dashboard.stateReports')}</h2>
      <ul>
        {
          reports.map((stateObj) => {
            const {
              statecode,
              state,
              recovered,
              lastupdatedtime,
              deaths,
              confirmed,
              active,
              deathsPerTotal,
              activePerTotal,
              recoverTotal
            } = stateObj;

            return (
              <li key={`state-row-${statecode}`}>
                <a href onClick={(evt) => gotoSatePage(evt, stateObj)}><h3>{state}</h3></a>
                <div className="italics">{`${translate('dashboard.lastUpdated', { DATE: lastupdatedtime })}`}</div>
                <div>{`${translate('dashboard.confirmedCount', { COUNT: confirmed })}`}</div>
                <div>{`${translate('dashboard.activeCount', { COUNT: active, PERCENTAGE: activePerTotal })}`}</div>
                <div>{`${translate('dashboard.recovery', { COUNT: recovered, PERCENTAGE: recoverTotal })}`}</div>
                <div>{`${translate('dashboard.deathCount', { COUNT: deaths, PERCENTAGE: deathsPerTotal })}`}</div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

StateReport.propTypes = {
  reports: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(StateReport);
