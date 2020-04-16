const cacheScheduler = require('node-cron');
const cache = require('./cacheService').memCache;
const logger = require('./logger');
const appConstants = require('../constants');

module.exports = () => {
  // At 0 seconds, 0 minutes every 4th hour
  cacheScheduler.schedule(appConstants.CRONJOB_TIMER_EXPR, () => {
    logger.info('Clearing all cached data');
    cache.del(appConstants.TRAVEL_HISTORY_DATA);
    cache.del(appConstants.OVERALL_DATA);
    cache.del(appConstants.STATEWISE_DATA);
  });
};
