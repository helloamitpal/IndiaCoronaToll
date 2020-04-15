import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import './MapPointing.scss';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

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
  point: PropTypes.shape({
    position: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired
};

export default MapPointing;
