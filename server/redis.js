const redis = require('redis');

const logger = require('./util/logger');
const addonsJSON = require('./mock/addonServices.json');
const customerInfoJSON = require('./mock/customerInfo.json');
const packagesJSON = require('./mock/packages.json');
const regionJSON = require('./mock/region.json');
const {
  REDIS_TIVO_ADDONS_SERVICES,
  REDIS_TIVO_CUSTOMER_INFO,
  REDIS_TIVO_PACKAGES,
  REDIS_TIVO_REGIONS
} = require('./constants');

module.exports = (app) => {
  // creates a new redis client
  const redisClient = redis.createClient();

  redisClient.on('connect', () => {
    logger.info('Redis connected');

    redisClient.get(REDIS_TIVO_ADDONS_SERVICES, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in setting up addons services data');
      }

      if (!arr) {
        redisClient.set(REDIS_TIVO_ADDONS_SERVICES, JSON.stringify(addonsJSON));
        logger.info('REDIS_TIVO_ADDONS_SERVICES data pushed in redis');
      }
    });

    redisClient.get(REDIS_TIVO_CUSTOMER_INFO, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in setting up customer info data');
      }

      if (!arr) {
        redisClient.set(REDIS_TIVO_CUSTOMER_INFO, JSON.stringify(customerInfoJSON));
        logger.info('REDIS_TIVO_CUSTOMER_INFO data pushed in redis');
      }
    });

    redisClient.get(REDIS_TIVO_PACKAGES, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in setting up packages data');
      }

      if (!arr) {
        redisClient.set(REDIS_TIVO_PACKAGES, JSON.stringify(packagesJSON));
        logger.info('REDIS_TIVO_PACKAGES data pushed in redis');
      }
    });

    redisClient.get(REDIS_TIVO_REGIONS, (err, arr) => {
      if (err) {
        throw new Error('Something went wrong in setting up regions data');
      }

      if (!arr) {
        redisClient.set(REDIS_TIVO_REGIONS, JSON.stringify(regionJSON));
        logger.info('REDIS_TIVO_REGIONS data pushed in redis');
      }
    });
  });

  return redisClient;
};
