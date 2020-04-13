import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import ZingChart from 'zingchart-react';

import * as dashboardActionCreator from '../../dashboardActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import translate from '../../../../locale';

import '../../Dashboard.scss';

const DashboardListPage = ({
  dashboardState: { loading, errors, dashboardDetails },
  dashboardActions
}) => {
  // make api call at the begining to fetch all saved links
  useEffect(() => {
    dashboardActions.getDashboardData();
  }, [dashboardActions]);

  // show toast message if any errror occurrs
  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

  const getChartConfig = (series, chartType, title) => ({
    type: chartType,
    width: '100%',
    height: '100%',
    ...series,
    title: {
      text: title
    }
  });

  const head = (
    <Helmet key="user-list-page">
      <title>{translate('dashboard.title')}</title>
      <meta property="og:title" content="Dashboard list" />
      <meta
        name="description"
        content="Get list of dashboards in TIVO"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="dashboard-page-container">
      {head}
      {loading && <LoadingIndicator />}
      <h1>{translate('dashboard.title')}</h1>
      {dashboardDetails ? (
        <div className="chart-container">
          <ZingChart data={getChartConfig(dashboardDetails.usersPerRegion, 'hbar', translate('dashboard.usersPerRegion'))} />
          <ZingChart data={getChartConfig(dashboardDetails.usersPerPackage, 'hbar', translate('dashboard.usersPerPackage'))} />
          <ZingChart data={getChartConfig(dashboardDetails.usersPerAddons, 'bar', translate('dashboard.usersPerAddons'))} />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardState: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  dashboardActions: bindActionCreators(dashboardActionCreator, dispatch)
});

DashboardListPage.propTypes = {
  dashboardState: PropTypes.object,
  dashboardActions: PropTypes.object
};

DashboardListPage.defaultProps = {
  dashboardState: {},
  dashboardActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardListPage);
