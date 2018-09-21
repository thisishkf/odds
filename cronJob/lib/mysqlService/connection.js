const mysql = require('mysql');
const { validateStatement, buildQuery } = require(__dirname + '/util');
const { queryType } = require(__dirname + '/constant');

require('mysql/lib/Connection').prototype.asyncQuery = function (sql) {
    let _this = this;
    return new Promise((resolve, reject) => {
        _this.query(sql, null, function (error, results, fields) {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

/**
 *
 * @return {Promise<Boolean>}	- MySQL Commit Result
 * @throws Mysql Commit Fail Error
 */
require('mysql/lib/Connection').prototype.commit = async function () {
    let _this = this;
    const sql = "COMMIT";
    let res = await _this.asyncQuery(sql);
    _this.release();
    return res;
}

/**
 *
 * @return {Promise<Boolean>}	- MySQL Rollback Result
 * @throws Mysql Rollback Fail Error
 */
require('mysql/lib/Connection').prototype.rollback = async function () {
    let _this = this;
    const sql = "ROLLBACK";
    let res = await _this.asyncQuery(sql);
    _this.release();
    return res;
};

/**
 *
 * @return {Promise<Object>}	- MySQL Query Result
 * @throws SQL statement invalid Error
 * @throws Build SQL query Fail Error
 * @throws SQL query Fail Error
 */
require('mysql/lib/Connection').prototype.select = async function (sql, params = null, i = 0) {
    let _this = this;
    validateStatement(sql, queryType.select);
    if (params != null) {
        sql = buildQuery(sql, params);
    }
    try {
        let results = await _this.asyncQuery(sql);
        return results || [];
    } catch (err) {
        if (i < state.config.maxRetry) {
            return _this.select(sql, null, ++i);
        } else {
            throw err;
        }
    }
};

/**
 *
 * @return {Promise<Object>}	- MySQL Query Result
 * @throws SQL statement invalid Error
 * @throws Build SQL query Fail Error
 * @throws SQL query Fail Error
 */
require('mysql/lib/Connection').prototype.selectOne = async function (sql, params = null, i = 0) {
    let _this = this;
    validateStatement(sql, queryType.select);
    if (params != null) {
        sql = buildQuery(sql, params);
    }
    try {
        let results = await _this.asyncQuery(sql);
        return results[0] || null;
    } catch (err) {
        if (i < state.config.maxRetry) {
            return _this.select(sql, null, ++i);
        } else {
            throw err;
        }
    }
};

/**
 *
 * @return {Promise<Object>}	- MySQL Query Result
 * @throws SQL statement invalid Error
 * @throws Build SQL query Fail Error
 * @throws SQL query Fail Error
 */
require('mysql/lib/Connection').prototype.insert = async function (sql, params = null, i = 0) {
    let _this = this;
    validateStatement(sql, queryType.insert);
    if (params != null) {
        sql = buildQuery(sql, params);
    }
    try {
        let results = await _this.asyncQuery(sql);
        return results.insertId;
    } catch (err) {
        if (i < state.config.maxRetry) {
            return _this.insert(sql, null, ++i);
        } else {
            throw err;
        }
    }
};

/**
 *
 * @return {Promise<Object>}	- MySQL Query Result
 * @throws SQL statement invalid Error
 * @throws Build SQL query Fail Error
 * @throws SQL query Fail Error
 */
require('mysql/lib/Connection').prototype.update = async function (sql, params = null, i = 0) {
    let _this = this;
    validateStatement(sql, queryType.update);
    if (params != null) {
        sql = buildQuery(sql, params);
    }
    try {
        let results = await _this.asyncQuery(sql);
        return results.changedRows;
    } catch (err) {
        if (i < state.config.maxRetry) {
            return _this.update(sql, null, ++i);
        } else {
            throw err;
        }
    }
};