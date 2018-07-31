const assert = require('assert');
const hkjc = require(__dirname + '/hkjc');
const odds500 = require(__dirname + '/odds500');
const mongodb = require(__dirname + '/../../lib/MongoService');
const williamHill = require(__dirname + '/williamHill');

const _getMatch = function (hkjc) {
    return new Promise(resolve => {
        mongodb.get()
            .collection('match')
            .findOne({ hkjc: hkjc }, function (err, result) {
                assert.equal(err, null);
                resolve(result);
            });
    });
}

const _analyse = async function (hkjc_id, odds500_id, wh_id) {
    let hkjcOdds = await hkjc.getAnalyse(hkjc_id);
    let odds500CRS = await odds500.getCRS(odds500_id);
    let whTTGO = await williamHill.getTTGO(wh_id);

    return new Promise(function (resolve) {
        let result = {
            match : hkjcOdds.match,
            id: hkjc_id,
            crs: _analyseWithCRS(hkjcOdds.crs, odds500CRS),
            ttgo: _analyseWithTTGO(hkjcOdds.ttgo, whTTGO),
        };
        resolve(result);
    });
}

const _getHKJCMinBet = function (key, data) {
    return parseFloat(data[key]);
}

const _getODDS500MinBet = function (key, data) {
    if (!(key in data) || data[key].length == 0) {
        return 0;
    }
    return Math.min(...data[key]);
}

const _insertDB = function (doc) {
    doc.ts = new Date();
    try {
        mongodb.get()
            .collection('report_analyse')
            .insertOne(doc, function (err, res) {
                assert.equal(err, null);
            });
    } catch (err) {
        Logger.error(err);
    }
}

const _analyseWithTTGO = function (hkjcTTGO, whTTGO) {
    let ttgoResult = {};
    Object.keys(hkjcTTGO).forEach(function (ele) {
        if (ele in whTTGO) {
            let diff = hkjcTTGO[ele] - whTTGO[ele];
            ttgoResult[ele] = {
                hkjc: hkjcTTGO[ele],
                wh: whTTGO[ele],
                diff: diff,
                analyse: null
            }
            if (diff < 0) {
                ttgoResult[ele].analyse = 'HKJC Lower than WilliamHill';
            } else if (diff == 0) {
                ttgoResult[ele].analyse = 'HKJC Equals WilliamHill';
            } else if (diff < 0.25) {
                ttgoResult[ele].analyse = 'HKJC Close to WilliamHill';
            }
        }
    });
    return ttgoResult;
}

const _analyseWithCRS = function (hkjcCRS, odds500CRS) {
    let crsResult = {};
    //Main
    Object.keys(hkjcCRS).sort().forEach(function (ele) {
        //Get min value in HKJC
        let min_hkjc = _getHKJCMinBet(ele, hkjcCRS);
        let min_all = _getODDS500MinBet(ele, odds500CRS);
        let diff = min_hkjc - min_all;
        //Make comparison
        crsResult[ele] = {
            hkjc: min_hkjc,
            odds500: min_all,
            diff: diff,
            analyse: null
        };

        if (diff < 0) {
            crsResult[ele].analyse = 'HKJC Lower than ODDS.500';
        } else if (diff == 0) {
            crsResult[ele].analyse = 'HKJC Equals ODDS.500';
        } else if (diff < 0.25) {
            crsResult[ele].analyse = 'HKJC Close to ODDS.500';
        }
    });
    return crsResult;
}

const _initAnaylseData = function (hkjc_id, odds500_id, wh_id) {
    let doc = {
        "$set": {
            odds500ID: odds500_id,
            whID: wh_id
        }
    };
    return new Promise(resolve => {
        mongodb.get()
            .collection('match')
            .updateOne({ hkjc: hkjc_id }, doc, function (err, result) {
                assert.equal(err, null);
                resolve(result);
            })
    });

}

module.exports = {
    getMatch: _getMatch,
    initAnaylseData: _initAnaylseData,
    analyse: _analyse
}

const test = async function () {
    await mongodb.connect();
    let data = await _analyse("01bc5108-63a8-49a7-bbb1-ddaef6d997a6", "734166", "13182575");
    _insertDB(data);
    return new Promise(resolve => {
        resolve(true);
    });
}

// test();