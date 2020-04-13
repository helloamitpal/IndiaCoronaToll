const request = require('request');

const logger = require('./util/logger');
const {
  TRAVEL_HISTORY_URL,
  NATIONAL_DATA_URL
} = require('./constants');

const ErrorHandler = (res, err, errorText, statusCode = 500) => {
  logger.error(err, errorText);
  res.send(statusCode, 'Something went wrong');
};

module.exports = (app, redisClient) => {
  app.get('/api/travelHistory', (req, res) => {
    request.get(TRAVEL_HISTORY_URL)
      .on('response', ({ travel_history: travelHistory }) => {
        res.send(200, travelHistory);
      })
      .on('error', (err) => {
        ErrorHandler(res, err, 'Error in fetching travel history');
      });
  });

  app.get('/api/overallInfo', (req, res) => {
    request.get(NATIONAL_DATA_URL)
      .on('response', ({ cases_time_series: caseSeries, statewise, tested }) => {
        res.send(200, {
          caseSeries,
          statewise,
          tested
        });
      })
      .on('error', (err) => {
        ErrorHandler(res, err, 'Error in fetching travel history');
      });
  });

  return app;
};
