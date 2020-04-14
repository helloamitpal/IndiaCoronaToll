import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import * as dashboardActionCreator from '../../dashboardActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import ChoroplethMap from '../../../../components/atoms/ChoroplethMap';
import translate from '../../../../locale';
import DaywiseSpreadReport from '../../molecules/DaywiseSpreadReport';
import TestReport from '../../molecules/TestReport';
import StateReport from '../../molecules/StateReport';

import '../../Dashboard.scss';

const DashboardHomePage = ({
  dashboardState: {
    loading,
    errors,
    travelHistory,
    overallInfo
  },
  dashboardActions
}) => {
  const title = translate('dashboard.title');

  useEffect(() => {
    dashboardActions.getOverallInfo();
  }, [dashboardActions]);

  const onMouseEnter = ({ name, value }) => (`${name}: ${value}`);

  const onMouseLeave = ({ name, value }) => ('');

  const head = (
    <Helmet key="dashboard-home-page">
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
        overallInfo && (
          <Fragment>
            <DaywiseSpreadReport kpi={overallInfo.kpi} series={overallInfo.chartSeries} />
            <TestReport series={overallInfo.testingRecords} />
            <h2>{translate('dashboard.stateReports')}</h2>
            <ChoroplethMap series={overallInfo.stateChartSeries} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            <StateReport reports={overallInfo.stateReports} />
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

DashboardHomePage.propTypes = {
  dashboardState: PropTypes.object,
  dashboardActions: PropTypes.object
};

DashboardHomePage.defaultProps = {
  dashboardState: {},
  dashboardActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHomePage);
