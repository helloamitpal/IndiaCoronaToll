const cache = require('memory-cache');
const Logger = require('../common/logger/index');
const constants = require('../common/constants/applicationConstants');
const axiosService = require('../services/lib/providers/httpCallProvider');
const httpsCommonService = require('../src/accessManager/common/accessManagerCommonService').getHttpsAgent;
const accessRequestService = require('../src/accessManager/accessRequest/service/accessRequestService');
const parser = require('./lib/Helpers/parsingService');
const memCache = new cache.Cache();
const axios = new axiosService();

/**
 *
 * @param {String} accessManagerBaseUri - ACCESS MANAGER BASE URL to be called
 * @param {String} key - Name with which data will be saved in cache
 * @param {Object} req - Request object
 * @returns {JSON} response - The response from the API if not cached/expired or Cached data
 */
var cachedData = (accessManagerBaseUri, key, req) => {
	let cacheContent = memCache.get(key);
	if (cacheContent) {
		Logger.info('cacheData || Retrieving cached data', req);
		return new Promise((resolve) => {
			resolve(cacheContent);
		});
	}
	else {
		Logger.info('cacheData || calling Access Manager API', req);
		return Promise.all([
			axios.get(accessManagerBaseUri,
				{ params: {cmd: 'findApplications', format: 'json', sortByColumns: 'name'} }, { httpsCommonService }),
			axios.get(accessManagerBaseUri,
				{params: {cmd: 'findDirectories',format: 'json', sortByColumns:'name'} }, { httpsCommonService })
		])
			.then((response) => {
				if (typeof response[0] === 'string') {
					response[0] = parser.parseEscapeSequences(response[0]);
				}
				if (typeof response[1] === 'string') {
					response[1] = parser.parseEscapeSequences(response[1]);
				}
				let combinerApplications = response[0];
				//Combining the data of findDirectories with findApplications
				combinerApplications.findApplications = response[0].findApplications.concat(response[1].findDirectories);

				if (key === constants.ACCESS_MANAGER_CACHE) {
					combinerApplications = accessRequestService.instance.getOnlyParentApps(combinerApplications, req);
				}
				// The cache timeout is in milliseconds. 86400000ms is equivalent to 24 hours.
				memCache.put(key, combinerApplications, constants.TIME.ONE_DAY);
				return combinerApplications;
			})
			.catch((error) => {
				Logger.error('Error occurred while caching.', error, req);
				if (error.message.includes(constants.FAILED_TO_CONNECT)) {
					throw new Error(constants.ACCESS_MANAGER_CONNECTION_FAILED);
				}
				throw new Error(error);
			});
	}
};

/**
 * store data is cache
 * @param {string} key - resource route/url
 * @param {any} data - data to be cached
 * @param {number} ttl - time to live of cache
 * @returns {void}
 */
const storeToCache = (key, data, ttl = constants.TIME.ONE_DAY) => {
	memCache.put(key, data, ttl);
};

/**
 * get data from cache
 * @param {string} key - resource route/url
 * @returns {any} - cached data
 */
const retrieveFromCache = (key) => {
	return memCache.get(key);
};

module.exports = { cachedData, memCache, storeToCache, retrieveFromCache };
