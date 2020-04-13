import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import * as dashboardActionCreator from '../../dashboardActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import translate from '../../../../locale';

import '../../Dashboard.scss';

const DashboardHomePage = ({
  dashboardState: { loading, errors, travelHistory, overallInfo },
  dashboardActions
}) => {
  const title = translate('dashboard.title');

  useEffect(() => {
    dashboardActions.getTravelHistory();
    dashboardActions.getOverallInfo();
  }, [dashboardActions]);

  const head = (
    <Helmet key="user-list-page">
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
