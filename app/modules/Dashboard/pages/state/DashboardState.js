import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import * as dashboardActionCreator from '../../dashboardActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import translate from '../../../../locale';

import '../../Dashboard.scss';

const DashboardStatePage = ({
  dashboardState: { loading, errors, stateRecords },
  dashboardActions,
  location,
  history
}) => {
  const stateData = location && location.state && location.state.stateData;
  const title = translate('dashboard.stateTitle');
  const { districtData, state } = stateRecords || {};

  if (!stateData) {
    history.push('');
  }

  useEffect(() => {
    if (stateData) {
      dashboardActions.getStateRecords(stateData.state);
    }
  }, [dashboardActions, stateData]);

  const head = (
    <Helmet key="dashboard-state-page">
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={title} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="dashboard-page-container">
      {head}
      {loading && <LoadingIndicator />}
      {
        districtData && stateData && (
          <Fragment>
            <h1>{translate('dashboard.stateSubTitle', { STATE: state }) }</h1>
            <section className="state-kpi-container">
              <div>
                <h3>{stateData.confirmed}</h3>
                <span>{translate('dashboard.confirmed')}</span>
              </div>
              <div>
                <h3>{stateData.deaths}</h3>
                <span>{translate('dashboard.deceased')}</span>
                <h3>{translate('dashboard.percentage', { PERCENTAGE: stateData.deathsPerTotal })}</h3>
              </div>
              <div>
                <h3>{stateData.recovered}</h3>
                <span>{translate('dashboard.recovered')}</span>
                <h3>{translate('dashboard.percentage', { PERCENTAGE: stateData.recoverPerTotal })}</h3>
              </div>
            </section>
            <h2 className="aligned-left">{translate('dashboard.districtTitle')}</h2>
            <ul className="district-list">
              {
                districtData.map(({ district, confirmed }) => (
                  <li key={`district-row-${district}`}>
                    <span>{district}</span>
                    :&nbsp;
                    <span className="bold">{confirmed}</span>
                  </li>
                ))
              }
            </ul>
          </Fragment>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardState: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  dashboardActions: bindActionCreators(dashboardActionCreator, dispatch)
});

DashboardStatePage.propTypes = {
  dashboardState: PropTypes.object,
  dashboardActions: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

DashboardStatePage.defaultProps = {
  dashboardState: {},
  dashboardActions: {},
  location: {},
  history: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatePage);
