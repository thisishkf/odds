/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2018-04-19
 * @modified 	2018-05-16
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require(__dirname + '/../Logger');
const config = require(__dirname + '/../../config').MONGODB;

var state = {
	db: null
};

/**
 * @param 	{string} 	url 	Mongo connection url
 * @return 	{Promise}			resolve with MongoDB Connection Object || reject with err object
 */
const _connect = function (database =null, url = null) {
	return new Promise((resolve, reject) => {
		if (state.db) {
			return resolve(state.db);
		}
		if (url === null) {
			url = 'mongodb://';
			if ('user' in config && 'password' in config) {
				url += `${config.user}:${config.password}@`
			}
			url += `${config.host}:${config.port}/${config.database}`;
		}
		logger.info(`[MongoDB] Connecting to: ${url}`);
		try {
			MongoClient.connect(url, function (err, db) {
				assert.equal(err, null);
				logger.info(`[MongoDB] Connection build at ${Date()}`);
				state.db = db;
				resolve(state.db);
			});
		} catch (err) {
			Logger.error(MongoDB,err);
			reject({ err: "[MongoDB] Unable to connect MongoDB" });
		}
	});
}

/**
 * @return {Object}	MongoDB Connection Object
 */
const _get = function () {
	return state.db;
}

/**
 * @callback done
 * @param {function} done 
 */
const _close = function (done) {
	if (state.db) {
		state.db.close(function (err, result) {
			state.db = null;
			done(err);
		});
	} else {
		done(err);
	}
}


module.exports = {
	connect: _connect,
	get: _get,
	close: _close
};