const cacheScheduler = require('node-cron');
const cache = require('./cacheService');
const logger = require('./logger');
const {
  CRONJOB_TIMER_EXPR,
  TRAVEL_HISTORY_DATA,
  OVERALL_DATA,
  STATEWISE_DATA
} = require('../constants');

module.exports = () => {
  // At 0 seconds, 0 minutes every 4th hour, deleting all cached data
  cacheScheduler.schedule(CRONJOB_TIMER_EXPR, () => {
    logger.info('Clearing all cached data');
    cache.deleteFromCache(TRAVEL_HISTORY_DATA);
    cache.deleteFromCache(OVERALL_DATA);
    cache.deleteFromCache(STATEWISE_DATA);
  });
};
