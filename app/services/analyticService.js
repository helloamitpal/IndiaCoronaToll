const EVENT = Object.freeze({
  ERROR: 'ERROR',
  CLICK: 'CLICK',
  SEARCH: 'SEARCH',
  SUCCESS: 'SUCCESS',
  DETAILS: 'DETAILS',
  PAGE: 'PAGE'
});

const AnalyticService = {
  track: (eventName, message) => {
    // analytics code
  },
  EVENT
};

export default AnalyticService;
