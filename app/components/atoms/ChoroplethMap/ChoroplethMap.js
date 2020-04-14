import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import LinearGradient from './LinearGradient';
import INDIA_TOPO_JSON from './india.topo.json';
import { PROJECTION_CONFIG, COLOR_RANGE, DEFAULT_COLOR, GEOGRAPHY_STYLE } from './constants';

import './ChoroplethMap.scss';

const ChoroplethMap = ({ series, legend, onMouseEnter, onMouseLeave, height, width }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  const gradientData = () => ({
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: series.reduce((max, item) => (item.value > max ? item.value : max), 0)
  });

  const colorScale = scaleQuantile().domain(series.map(({ value }) => (value))).range(COLOR_RANGE);

  const onMapMouseMove = ({ properties: { name } }, current, movementType) => {
    let text;

    if (movementType === 'enter') {
      text = onMouseEnter && onMouseEnter({ name, value: current.value });
    } else if (movementType === 'leave') {
      text = onMouseLeave && onMouseLeave({ name, value: current.value });
    }

    if (text !== null || text !== undefined) {
      setTooltipContent(text);
    }
  };

  return (
    <div className="choropleth-map-container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={width}
        height={height}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) => geographies.map((geo) => {
            const current = series.find(({ id }) => (id === geo.id));

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={(current) ? colorScale(current.value) : DEFAULT_COLOR}
                style={GEOGRAPHY_STYLE}
                onMouseEnter={() => onMapMouseMove(geo, current, 'enter')}
                onMouseLeave={() => onMapMouseMove(geo, current, 'leave')}
              />
            );
          })}
        </Geographies>
      </ComposableMap>
      {legend ? <LinearGradient data={gradientData()} /> : null}
    </div>
  );
};

ChoroplethMap.defaultProps = {
  legend: true,
  onMouseEnter: null,
  onMouseLeave: null,
  series: [],
  height: 200,
  width: 400
};

ChoroplethMap.propTypes = {
  series: PropTypes.array,
  legend: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number
};

export default ChoroplethMap;
