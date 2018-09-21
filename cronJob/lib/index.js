const logger = require(__dirname + '/logger');
const mysqldb = require(__dirname + '/mysqlService');
const system = require(__dirname + '/system');

module.exports = {
    logger: logger,
    mysqldb: mysqldb,
    system: system
};