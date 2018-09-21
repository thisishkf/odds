/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2018-04-19
 * @modified 	2018-09-13
 */
const mysql = require('mysql');
require(__dirname + '/../core');
require(__dirname + '/connection');
const logger = require(__dirname + '/../logger');
const { queryType, defaultValue } = require(__dirname + '/constant');
const { validateStatement, buildQuery } = require(__dirname + '/util');

var state = {
	config: null,
	pool :null,
};

const _connect = function (config) {
	logger.info(`[MYSQLDB] Connecting to: ${config.host}:${config.port}`);
	config.maxRetry = config.maxRetry || defaultValue.maxRetry;
	config.queueLimit = config.queueLimit || defaultValue.queueLimit;
	config.connectTimeout = config.connectTimeout || defaultValue.connectTimeout;
	config.acquireTimeout = config.acquireTimeout || defaultValue.acquireTimeout;
	state.pool = mysql.createPool(config);

	logger.info(`[MYSQLDB] Connection build at ${Date()}`);
	if (state.pool) {
		state.config = config;
	}
	return state.pool;
};

/**
 *
 * @private
 */
const _getConnection = function () {
	return new Promise((resolve, reject) => {
		state.pool.getConnection(function (err, connection) {
			if (err) return reject(err);
			resolve(connection);
		});
	});
};

/**
 *
 * @param {String} sql
 * @param {Object} params
 */
const _query = async function (sql, params = null) {
	logger.debug(`sql : ${sql}, params : ${JSON.stringify(params)}`);
	if (params != null) {
		sql = buildQuery(sql, params);
	}
	let connection = await _getConnection();
	let results = await connection.asyncQuery(sql);
	connection.release();
	return results;
};

/**
 *
 * @param {String} sql
 * @param {Object} params
 */
const _select = async function (sql, params = null) {
	validateStatement(sql, queryType.select);
	let results = await _query(sql, params);
	return results || [];
};

/**
 *
 * @param {String} sql
 * @param {Object} params
 */
const _selectOne = async function (sql, params = null) {
	validateStatement(sql, queryType.select);
	let results = await _query(sql, params);
	return results[0] || null;
};

/**
 *
 * @param {String} sql
 * @param {Object} params
 */
const _insert = async function (sql, params = null) {
	validateStatement(sql, queryType.insert);
	let results = await _query(sql, params);
	return results.insertId;
};

/**
 *
 * @param {String} sql
 * @param {Object} params
 */
const _update = async function (sql, params = null) {
	validateStatement(sql, queryType.update);
	let results = await _query(sql, params);
	return results.changedRows;
};

/**
 *
 * @return {Promise<Object>}	- MySQL Connection Object
 * @throws Build Query Fail Error
 * @throws Get Connection Fail  Error
 * @throws Begin Transaction Fail  Error
 */
const _begin = async function () {
	const sql = 'START TRANSACTION';
	let connection = await _getConnection();
	await connection.asyncQuery(sql);
	return connection;
};


module.exports = {
	connect: _connect,
	query: _query,
	select: _select,
	selectOne: _selectOne,
	insert: _insert,
	update: _update,
	begin: _begin
};
