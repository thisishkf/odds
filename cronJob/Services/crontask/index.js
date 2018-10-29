const CronJob = require('cron').CronJob;
const hkjcService = require(__dirname + '/../hkjcService');

const getMatchesJob = function (cronTime) {
    return new CronJob({
        cronTime: cronTime,
        onTick: function () {
            hkjcService.getMatches();
        },
        start: false,
        timeZone: 'Asia/Hong_Kong'
    });
}

const getOddsJob = function (cronTime) {
    return new CronJob({
        cronTime: cronTime,
        onTick: function () {
            console.log();
            hkjcService.getOdds();
        },
        start: false,
        timeZone: 'Asia/Hong_Kong'
    });
}

module.exports = {
    getMatchesJob: getMatchesJob,
    getOddsJob: getOddsJob
}