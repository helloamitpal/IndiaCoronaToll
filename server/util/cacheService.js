const cache = require('memory-cache');
const request = require('request');

const Logger = require('./logger');
const {
  MAX_CACHE_DURATION
} = require('../constants');

const memCache = new cache.Cache();

const storeToCache = (key, data, ttl = MAX_CACHE_DURATION) => {
  memCache.put(key, data, ttl);
};

const retrieveFromCache = (key) => {
  return memCache.get(key);
};

const deleteFromCache = (key) => {
  memCache.del(key);
};

const cachedData = (url, key) => {
  const cacheContent = retrieveFromCache(key);

  if (cacheContent) {
    Logger.info('cacheData || Retrieving cached data');
    return new Promise((resolve) => {
      resolve(cacheContent);
    });
  }

  Logger.info('cacheData || data is not cached. Hence, calling API');
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error) {
        Logger.info('cacheData || failed API');
        reject(error);
      } else {
        Logger.info('cacheData || API has the success and storing data in cache');
        const parsedBody = (typeof body === 'string') ? JSON.parse(body) : body;
        storeToCache(key, parsedBody);
        resolve(parsedBody);
      }
    });
  });
};

module.exports = {
  cachedData,
  deleteFromCache
};
