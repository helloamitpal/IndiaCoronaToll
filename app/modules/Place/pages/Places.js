import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Select from 'react-select';

import * as placeActionCreator from '../placeActionCreator';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import MapPointing from '../../../components/atoms/MapPointing';
import translate from '../../../locale';
import AddressDetails from '../molecules/AddressDetails';

import '../Place.scss';

const PlacePage = ({ placeState: { loading, errors, travelHistory }, placeActions }) => {
  const title = translate('dashboard.title');
  const [address, setAddress] = useState(travelHistory[0]);

  useEffect(() => {
    placeActions.getTravelHistory();
  }, [placeActions]);

  const onUpdateAddress = (newValue) => {
    setAddress(newValue);
  };

  const getMapPoints = () => {
    const { label } = address;
    return travelHistory.find(({ address: listAddr }) => (listAddr === label)) || {};
  };

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
            <p>{translate('place.unsafePlaceTitle')}</p>
            <Select
              className="select-box"
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              autoFocus
              options={travelHistory}
              clearable
              value={address}
              onChange={onUpdateAddress}
              searchable
            />
            <MapPointing point={getMapPoints()} />
            <AddressDetails address={address} />
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
