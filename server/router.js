const logger = require('./util/logger');
const cacheService = require('./util/cacheService');
const {
  TRAVEL_HISTORY_URL,
  TRAVEL_HISTORY_DATA,
  NATIONAL_DATA_URL,
  OVERALL_DATA,
  STATEWISE_DATA_URL,
  STATEWISE_DATA
} = require('./constants');

const ErrorHandler = (res, err, errorText, statusCode = 500) => {
  logger.error(err, errorText);
  res.status(statusCode).send('Something went wrong');
};

module.exports = (app, redisClient) => {
  app.get('/api/travelHistory', (req, res) => {
    cacheService.cachedData(TRAVEL_HISTORY_URL, TRAVEL_HISTORY_DATA).then((body) => {
      logger.success('travel history is fetched successfully');
      res.status(200).send(body);
    }, (error) => {
      ErrorHandler(res, error, 'Error in fetching travel history');
    });
  });

  app.get('/api/overallInfo', (req, res) => {
    cacheService.cachedData(NATIONAL_DATA_URL, OVERALL_DATA).then((body) => {
      logger.success('case series, state wise data and tested results are fetched successfully');
      res.status(200).send(body);
    }, (error) => {
      ErrorHandler(res, error, 'Error in fetching overall Info');
    });
  });

  app.get('/api/stateWiseData', (req, res) => {
    cacheService.cachedData(STATEWISE_DATA_URL, STATEWISE_DATA).then((body) => {
      logger.success('state wise data is fetched successfully');

      const { state } = req.query;

      if (!state) {
        throw new Error('state param is not sent');
      }

      const filteredData = body.find(({ state: resState }) => (resState.toLowerCase().includes(state.toLowerCase())));

      res.status(200).send(filteredData);
    }, (error) => {
      ErrorHandler(res, error, 'Error in fetching state wise Info');
    });
  });

  return app;
};
