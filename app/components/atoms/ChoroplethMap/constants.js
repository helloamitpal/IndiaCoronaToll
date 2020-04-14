const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#EEEEEE';

const GEOGRAPHY_STYLE = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#cccccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

export {
  PROJECTION_CONFIG,
  COLOR_RANGE,
  DEFAULT_COLOR,
  GEOGRAPHY_STYLE
};
