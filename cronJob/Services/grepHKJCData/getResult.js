const request = require('request');
const assert = require('assert');
const mongodb = require(__dirname + '/../../lib/MongoService');
const Logger = require(__dirname + '/../../lib/Logger');

Date.prototype.getFullDate = function () {
    let target = this;
    let year = target.getFullYear();
    let month = target.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = target.getDate();
    return `${year}${month}${day}`;
}

const _getResultData = function (match) {
    const API = "http://bet.hkjc.com/football/getJSON.aspx?jsontype=search_result.aspx&startdate=#STARTDATE#&enddate=#ENDDATE#&teamid=#TEAMID#";
    let _date = new Date(match.time).getFullDate();
    const options = {
        method: 'GET',
        url: API.replace('#STARTDATE#', _date).replace('#ENDDATE#', _date).replace('#TEAMID#', match.home.teamID),
        gzip: true
    };

    return new Promise(resolve => {
        Logger.info(`Getting ${options.url}`);
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                let result = JSON.parse(html);
                resolve(result[0] || result);
            }
        });
    });
}

const _insertDB = function (match) {
    mongodb.get().collection('match')
        .update({ hkjc: match.matchID, result: null },
            { "$set": { result: match } },
            function (err, result) {
                Logger.info(`getResult() added ${match.matchID}`);
            });
}

const _getResult = async function (match) {
    let result = await _getResultData(match);
    if ('matches' in result) {
        _insertDB(result.matches[0]);
    }
}

module.exports = {
    getResult: _getResult
}