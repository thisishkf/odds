const CronJob = require('cron').CronJob;
const grepHKJCDataService = require(__dirname + '/../grepHKJCData');

const _getMatchesJob = function (cronTime) {
    return new CronJob({
        cronTime: cronTime,
        onTick: function () {
            console.log();
            grepHKJCDataService.getMatch();
        },
        start: false,
        timeZone: 'Asia/Hong_Kong'
    });
}

const _getOddsJob = function (cronTime) {
    return new CronJob({
        cronTime: cronTime,
        onTick: function () {
            console.log();
            grepHKJCDataService.getOdds();
        },
        start: false,
        timeZone: 'Asia/Hong_Kong'
    });
}

module.exports = {
    getMatchesJob: _getMatchesJob,
    getOddsJob: _getOddsJob
}