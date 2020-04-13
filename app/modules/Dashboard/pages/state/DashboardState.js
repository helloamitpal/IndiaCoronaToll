import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import * as dashboardActionCreator from '../../dashboardActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import translate from '../../../../locale';

import '../../Dashboard.scss';

const DashboardListPage = ({
  dashboardState: { loading, errors, dashboardDetails },
  dashboardActions
}) => {
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
