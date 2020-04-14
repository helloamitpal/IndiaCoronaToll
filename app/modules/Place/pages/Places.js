import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import * as placeActionCreator from '../placeActionCreator';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import MapPointing from '../../../components/atoms/MapPointing';
import translate from '../../../locale';

import '../Place.scss';

const PlacePage = ({ placeState: { loading, errors, travelHistory }, placeActions }) => {
  const title = translate('dashboard.title');

  useEffect(() => {
    placeActions.getTravelHistory();
  }, [placeActions]);

  const head = (
    <Helmet key="unsafe-places-page">
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={title} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="places-container">
      {head}
      {loading && <LoadingIndicator />}
      {
        travelHistory && (
          <Fragment>
            <h2>{translate('place.unsafePlaceTitle')}</h2>
            <MapPointing point={travelHistory[0]} />
          </Fragment>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  placeState: state.place
});

const mapDispatchToProps = (dispatch) => ({
  placeActions: bindActionCreators(placeActionCreator, dispatch)
});

PlacePage.propTypes = {
  placeState: PropTypes.object,
  placeActions: PropTypes.object
};

PlacePage.defaultProps = {
  placeState: {},
  placeActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacePage);
