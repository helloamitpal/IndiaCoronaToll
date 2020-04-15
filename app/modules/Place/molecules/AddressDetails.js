import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import translate from '../../../locale';

import './AddressDetails.scss';

const AddressDetails = ({ address: { modeoftravel, datasource, timefrom, timeto, address, accuracylocation } }) => {
  return (
    <div className="address-details-container">
      <p>{translate('place.address', { LOCATION: accuracylocation ? `${accuracylocation} ` : '' })}</p>
      <h4>{address}</h4>
      {modeoftravel ? (
        <Fragment>
          <p>{translate('place.modeoftravel')}</p>
          <h4>{modeoftravel}</h4>
        </Fragment>
      ) : null}
      {timefrom && (
        <Fragment>
          <p>{translate('place.timefrom')}</p>
          <span className="bold">{timefrom}</span>
          {timeto && (
            <Fragment>
              <span>{translate('place.timeto')}</span>
              <span className="bold">{timeto}</span>
            </Fragment>
          )}
        </Fragment>
      )}
      {datasource ? (
        <a href={datasource} target="_blank" rel="noopener noreferrer">{translate('place.datasource')}</a>
      ) : null}
    </div>
  );
};

AddressDetails.propTypes = {
  address: PropTypes.object.isRequired
};

export default AddressDetails;
