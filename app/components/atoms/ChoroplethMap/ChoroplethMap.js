import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import LinearGradient from './LinearGradient';
import INDIA_TOPO_JSON from './india.topo.json';
import {
  PROJECTION_CONFIG,
  COLOR_RANGE,
  DEFAULT_COLOR,
  GEOGRAPHY_STYLE
} from './constants';

import './ChoroplethMap.scss';

const ChoroplethMap = ({ series }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: series.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile().domain(series.map(({ value }) => (value))).range(COLOR_RANGE);

  const onMouseEnter = ({ properties: { name } }, current) => {
    setTooltipContent(`${name}: ${current.value}`);
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <div className="choropleth-map-container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={400}
        height={200}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) => geographies.map((geo) => {
            const current = series.find(({ id }) => id === geo.id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                style={GEOGRAPHY_STYLE}
                onMouseEnter={() => onMouseEnter(geo, current)}
                onMouseLeave={onMouseLeave}
              />
            );
          })}
        </Geographies>
      </ComposableMap>
      <LinearGradient data={gradientData} />
    </div>
  );
};

ChoroplethMap.propTypes = {
  series: PropTypes.array.isRequired
};

export default ChoroplethMap;
