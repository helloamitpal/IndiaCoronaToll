const request = require('request');

const logger = require('./util/logger');
const {
  TRAVEL_HISTORY_URL,
  NATIONAL_DATA_URL
} = require('./constants');

const ErrorHandler = (res, err, errorText, statusCode = 500) => {
  logger.error(err, errorText);
  res.status(statusCode).send('Something went wrong');
};

module.exports = (app, redisClient) => {
  app.get('/api/travelHistory', (req, res) => {
    request.get(TRAVEL_HISTORY_URL, (error, response, body) => {
      if (error) {
        ErrorHandler(res, error, 'Error in fetching travel history');
      } else {
        logger.success('travel history is fetched successfully');
        res.status(200).send(body);
      }
    });
  });

  app.get('/api/overallInfo', (req, res) => {
    request.get(NATIONAL_DATA_URL, (error, response, body) => {
      if (error) {
        ErrorHandler(res, error, 'Error in fetching overall Info');
      } else {
        logger.success('case series, state wise data and tested results are fetched successfully');
        res.status(200).send(body);
      }
    });
  });

  return app;
};
