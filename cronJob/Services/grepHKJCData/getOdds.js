const request = require('request');
const assert = require('assert');
const mongodb = require(__dirname + '/../../lib/MongoService');
const Logger = require(__dirname + '/../../lib/Logger');
const { getResult } = require(__dirname + '/getResult');

const _getMatchList = function () {
    return new Promise(resolve => {
        mongodb.get()
            .collection('match')
            .find({ "result": null })
            .toArray(function (err, result) {
                assert.equal(err, null);
                resolve(result);
            });
    });
}


const _getMatch = function (hkjc) {
    const API = 'http://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_allodds.aspx&matchid=#ID#';
    let result = null;
    return new Promise(resolve => {
        const options = {
            method: 'GET',
            url: API.replace('#ID#', hkjc),
            gzip: true
        };
        Logger.info(`Getting ${options.url}`);
        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                let _oddsList = JSON.parse(html);
                for (let _odds of _oddsList) {
                    if (_odds.matchID == hkjc) {
                        result = _odds;
                    }
                }
            }
            resolve(result);
        });
    });
}

const _insertDB = function (match, odds) {
    let doc = match;
    doc._raw = odds;
    doc.ts = new Date();
    doc._id = `${doc.hkjc}-${doc.ts.toString()}`;
    mongodb.get()
        .collection('hkjc_raw')
        .insertOne(doc, function (err, res) {
            assert.equal(err, null);
            console.log(res);
            Logger.info(`getOdds() added ${doc.hkjc}`);
        });

}

const _getOdds = async function () {
    Logger.info(`Cron Job getOdds() started`);
    let matchList = await _getMatchList();
    for (let match of matchList) {
        let odds = await _getMatch(match.hkjc);
        if (odds) {
            _insertDB(match, odds);
        } else if (match.result == null) {
            getResult(match);
        }
    }
    Logger.info(`Cron Job getOdds() finished`);
}

module.exports = {
    getOdds: _getOdds,
    getMatch: _getMatch
}