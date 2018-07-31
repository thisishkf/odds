const request = require('request');
const assert = require('assert');
const mongodb = require(__dirname + '/../../lib/MongoService');
const Logger = require(__dirname + '/../../lib/Logger');
const { getMatch } = require(__dirname + '/getOdds');

const _getMatchData = function () {
    const API = "http://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_allodds.aspx";
    return new Promise((resolve) => {
        const options = {
            method: 'GET',
            url: API,
            gzip: true
        };
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(html));
            }
        });
    });
}

const _insertDB = function (match) {
    let doc = {
        league: match.league,
        home: match.homeTeam,
        away: match.awayTeam,
        time: match.matchTime.substr(0, match.matchTime.indexOf("+")),
        hkjc: match.matchID,
        odds500: null,
        wh: null,
        macauSlot: null,
        result: null,
        status: "preMatch"
    };
    let options = { upsert: true };
    try {
        mongodb.get()
            .collection('match')
            .insertOne(doc, options, function (err, res) {
                Logger.info(`getMatches() adding - ${match.matchID}`);
            });
    } catch (err) {
        Logger.error(err);
    }
}

const _getMatches = async function () {
    Logger.info('Cron Job getMatches() Start');
    let matchList = await _getMatchData();
    for (let match of matchList) {
        let data = await getMatch(match.matchID)
        _insertDB(data);
    };
}

module.exports = {
    getMatches: _getMatches
}