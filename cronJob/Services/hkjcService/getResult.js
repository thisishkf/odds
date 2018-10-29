const request = require('request');
const logger = require(__dirname + '/../../lib/logger');
const moment = require('moment');

const _getResultData = function (match) {
    const API = "http://bet.hkjc.com/football/getJSON.aspx?jsontype=search_result.aspx&startdate=#STARTDATE#&enddate=#ENDDATE#&teamid=#TEAMID#";
    
    console.log(match.time, new Date(match.time));
    moment(match.match_time).format('YYYYMMDD');
    let _date = (new Date(match.time)).getFullDate();
    const options = {
        method: 'GET',
        url: API.replace('#STARTDATE#', _date).replace('#ENDDATE#', _date).replace('#TEAMID#', match.home.teamID),
        gzip: true
    };

    return new Promise(resolve => {
        Logger.info(`Getting ${options.url}`);
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                console.log(html);
                try {
                    let result = JSON.parse(html);
                    resolve(result[0] || result);
                } catch (err) {
                }
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