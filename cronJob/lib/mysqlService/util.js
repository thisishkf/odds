const { queryType } = require(__dirname + '/constant');
const logger = require(__dirname + '/../logger');

const validateStatement = function (sql, type) {
    if (sql.toUpperCase().indexOf(type) === -1) {
        logger.debug(sql);
        throw new Error(`[MYSQL] Cannot find ${type} statement`);
    }

    let checkList = Object.assign({}, queryType);
    delete checkList[type.toLowerCase()];
    Object.keys(checkList).forEach(key => {
        let ele = checkList[key];
        if (sql.toUpperCase().indexOf(ele) > -1) {
            logger.debug(sql);
            throw new Error(`[MYSQL] Invalid ${type} statement containing ${ele}`);
        }
    });
};

const buildQuery = function (sql, params) {
    for (let key in params) {
        if (sql.indexOf(key) <= 0) {
            throw new Error(`[MySQLDB] Building SQL fail: Invalid parameter pairs of key ${key}`);
        }
        switch (typeof params[key]) {
            case 'object':
                if (params[key] !== null) throw new Error(`Invalid parameter ${key}`);
            case 'undefined':
                sql = sql.replaceAll(`:${key}`, 'NULL');
                break;
            case 'number':
                sql = sql.replaceAll(`:${key}`, `${params[key]}`);
                break;
            case 'string':
            default:
                sql = sql.replaceAll(`:${key}`, `"${params[key]}"`);
        }
    }
    return sql;
};

module.exports = {
    validateStatement: validateStatement,
    buildQuery: buildQuery
}