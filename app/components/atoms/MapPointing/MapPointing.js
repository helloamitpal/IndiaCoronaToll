import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import PropTypes from 'prop-types';

import './MapPointing.scss';

const MapPointing = ({ point: { position, zoom, address } }) => {
  return (
    <div className="map-pointing-container">
      <LeafletMap center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
};

MapPointing.propTypes = {
  point: PropTypes.object.isRequired
};

export default MapPointing;
