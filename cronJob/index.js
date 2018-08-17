const mongodb = require(__dirname + '/lib/MongoService');
const crontask = require(__dirname + '/Services/crontask');

const appOnStart = async function () {
    await mongodb.connect();
    // crontask.getMatchesJob('00 */1 * * * *').start();
    crontask.getMatchesJob('00 00 */6 * * *').start();
    crontask.getOddsJob('00 */10 * * * *').start();
}

appOnStart();

