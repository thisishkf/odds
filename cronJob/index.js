const { logger, mysqldb, system } = require(__dirname + '/lib');
const crontask = require(__dirname + '/Services/crontask');

const appOnStart = async function () {
    const config = await system.loadConfig(__dirname + '/config.js');
    logger.init(config.logger);
    mysqldb.connect(config.mysql);
    crontask.getMatchesJob('00 00 */1 * * *').start();
    crontask.getOddsJob('00 */10 * * * *').start();
}

appOnStart();

