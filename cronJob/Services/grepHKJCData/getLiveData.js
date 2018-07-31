const request = require('request');
const assert = require('assert');
const mongodb = require(__dirname + '/../../lib/MongoService');
const Logger = require(__dirname + '/../../lib/Logger');

const _getLiveMatch = function (match) {
    let homeAway = `${match.home}-${match.away}`;
    Logger.info(`Getting Match Data of ${homeAway}`);
    const options = {
        method: 'GET',
        url: `http://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_allodds.aspx&matchid=${match.id}`,
        gzip: true
    };
    request(options, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            let _json = JSON.parse(html);
            for (let _data of _json) {
                if (_data.matchID == match.id) {
                    //INSERT INTO MONGO
                    try {
                        let doc = {
                            match,
                            _raw: _data,
                            ts: new Date()
                        };
                        mongodb.get().collection('hkjc_raw').insertOne(doc, function (err, res) {
                            assert.equal(err, null);
                            if (res.ok) {
                                console.log(`${homeAway} has been added to database`);
                            }
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    });
}

module.exports = {
    getLiveMatch: _getLiveMatch
}