const assert = require('assert');
const mongodb = require(__dirname + '/../../lib/MongoService');

const _combineArray = function (data, limit = 25) {
    let c = Math.ceil(data.length / limit);
    if (c > 1) {
        data = data.mergeEveryNElement(c);
    }
    return data;
}

Array.prototype.mergeEveryNElement = function (n) {
    let terget = this;
    let tmp = [];
    for (let i in terget) {
        if (i % n === (n - 1)) {
            let _val = 0;
            for (let _i = 0; _i < n; _i++) {
                _val += parseFloat(terget[i - _i]);
            }
            tmp.push(_val / n);
        }
    }
    if (terget.length % n !== 0) {
        let _val = 0;
        for (let _i = 0; _i < terget.length % n; _i++) {
            _val += parseFloat(terget[terget.length - 1 - _i]);
        }
        tmp.push(_val / (terget.length % n));
    }
    return tmp;
}

const _getMatchList = function () {
    return new Promise(resolve => {
        mongodb.get()
            .collection('match')
            .aggregate([
                {
                    "$match": {
                        time: { "$gte": JSON.stringify(new Date()).match(/"(.*)\..{3}Z"/)[1] }
                    }
                }
            ]).toArray(function (err, result) {
                assert.equal(err, null);
                resolve(result);
            });
    });
}

const _getAllOdds = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let data = [];
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    data.push(doc);
                } else {
                    resolve(data);
                }
            });
    });
}

const _getHDA = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let _data = [], data = {};
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        if (index == 0) {
                            data = { Away: [], Draw: [], Home: [] };
                        }
                        data['Away'].push(ele._raw.hadodds.A.split("@")[1]);
                        data['Draw'].push(ele._raw.hadodds.D.split("@")[1]);
                        data['Home'].push(ele._raw.hadodds.H.split("@")[1]);
                    });
                    resolve(data);
                }
            });
    });
}

const _getCHL = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let _data = [], data = {};
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        if (!('chlodds' in ele._raw)) {
                            data["--"] = { L: [], H: [] };
                        } else {
                            ele._raw.chlodds.LINELIST.forEach(function (val, i) {
                                let key = val.LINE.split('/')[0];
                                if (!(key in data)) {
                                    data[key] = { L: [], H: [] };
                                }
                                data[key].L.push(val.L.split("@")[1]);
                                data[key].H.push(val.H.split("@")[1]);
                            });
                        }
                    });
                    resolve(data);

                }
            });
    });
}

const _getHIL = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let _data = [], data = {};;
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        if (!('hilodds' in ele._raw)) {
                            data["--"] = { L: [], H: [] };
                        } else {
                            ele._raw.hilodds.LINELIST.forEach(function (val, i) {
                                let key = val.LINE;
                                if (!(key in data)) {
                                    data[key] = { L: [], H: [] };
                                }
                                data[key].L.push(val.L.split("@")[1]);
                                data[key].H.push(val.H.split("@")[1]);
                            });
                        }
                    });
                    resolve(data);
                }
            });
    });
}

const _getCRS = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let _data = [], data = {};
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        Object.keys(ele._raw.crsodds).forEach(function (score, i) {
                            if (score.indexOf("S") == 0) {
                                let rate = ele._raw.crsodds[score];
                                if (!(score in data)) {
                                    data[score] = [];
                                }
                                data[score].push(rate.split("@")[1]);
                            }
                        });
                    });
                    resolve(data);
                }
            });
    });
}


const _getAnalyse = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let data = { crs: {}, ttgo: {} };
        try {
            mongodb.get().collection('hkjc_raw')
                .findOne(criteria, function (err, doc) {
                    assert.equal(err, null);
                    data.match = `${doc.home.teamNameCH} - ${doc.away.teamNameCH}`;
                    Object.keys(doc._raw.crsodds).forEach(function (score, i) {
                        if (score.indexOf("S") == 0) {
                            data.crs[score] = doc._raw.crsodds[score].split("@")[1];
                        }
                    });
                    Object.keys(doc._raw.ttgodds).forEach(function (goal, i) {
                        if (goal.length == 2) {
                            data.ttgo[goal.substr(1, 1)] = doc._raw.ttgodds[goal].split("@")[1];
                        }
                    });
                    resolve(data);
                });
        } catch (err) {
            Logger.error(err);
        }
    });
}

const _getFCS = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let _data = [], data = {};
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        Object.keys(ele._raw.fcsodds).forEach(function (score, i) {
                            if (score.indexOf("S") == 0) {
                                let rate = ele._raw.fcsodds[score];
                                let key = score.split("S")[1];
                                switch (key) {
                                    case "M1MH":
                                        key = "主其他";
                                        break;
                                    case "M1MA":
                                        key = "客其他";
                                        break;
                                    case "M1MD":
                                        key = "和其他";
                                        break;
                                    default:
                                        key = parseInt(key.substr(0, 2)) + ":" + parseInt(key.substr(2));
                                        break;
                                }
                                if (!(key in data)) {
                                    data[key] = [];
                                }
                                data[key].push(rate.split("@")[1]);
                            }
                        });
                    });
                    resolve(data);
                }
            });
    });
}
const _getTTGO = function (id) {
    return new Promise(resolve => {
        let criteria = { hkjc: id };
        let _data = [], data = {};;
        mongodb.get().collection('hkjc_raw')
            .find(criteria)
            .each(function (err, doc) {
                if (doc != null) {
                    _data.push(doc);
                }
                else {
                    _data.forEach(function (ele, index) {
                        Object.keys(ele._raw.ttgodds).forEach(function (goal, i) {
                            if (goal.length == 2) {
                                let rate = ele._raw.ttgodds[goal];
                                let key = goal.substr(1, 1);
                                if (!(key in data)) {
                                    data[key] = [];
                                }
                                data[key].push(rate.split("@")[1]);
                            }
                        });
                    });
                    resolve(data);
                }
            }); //end Mongo connection
    });
}

const _makeChart = function (data) {
    let result = {
        ts: [],
        hadodds: { H: [], D: [], A: [] }, fhaodds: { H: [], D: [], A: [] },
        hhaodds: { H: [], D: [], A: [], HG: [] },
        hdcodds: { H: [], A: [], HG: [] },
        ttgodds: {},
        ooeodds: { O: [], E: [] },
        crsodds: {}, fcsodds: {},
        ftsodds: { N: [], A: [], H: [] },
        hilodds: {}, fhlodds: {}, chlodds: {},
        hftodds: {}
    };
    data.forEach(function (ele) {
        result.ts.push(new Date(ele.ts).getTime());
        for (let odd of ['hadodds', 'fhaodds']) {
            for (let subodd of ['H', 'D', 'A']) {
                result[odd][subodd].push(parseFloat(ele._raw[odd][subodd].split("@")[1]));
            }
        }

        for (let subodd of ['H', 'D', 'A', 'HG']) {
            if (subodd == 'HG') {
                result.hhaodds[subodd].push(parseFloat(ele._raw.hhaodds[subodd]));
            } else {
                result.hhaodds[subodd].push(parseFloat(ele._raw.hhaodds[subodd].split("@")[1]));
            }
        }

        for (let subodd of ['H', 'A', 'HG']) {
            if (subodd == 'HG') {
                let _rate = ele._raw.hdcodds[subodd].split("/");
                result.hdcodds[subodd].push((parseFloat(_rate[0]) + parseFloat(_rate[1])) / 2);
            } else {
                result.hdcodds[subodd].push(parseFloat(ele._raw.hdcodds[subodd].split("@")[1]));
            }
        }

        Object.keys(ele._raw.ttgodds).forEach(function (subodd) {
            if (subodd.length == 2) {
                let key = subodd.substr(1, 1);
                if (!(key in result.ttgodds)) {
                    result.ttgodds[key] = [];
                }
                result.ttgodds[key].push(ele._raw.ttgodds[subodd].split("@")[1]);
            }
        });

        for (let subodd of ['O', 'E']) {
            result.ooeodds[subodd].push(parseFloat(ele._raw.ooeodds[subodd].split("@")[1]));
        }

        for (let odd of ['crsodds', 'fcsodds']) {
            Object.keys(ele._raw[odd]).sort().forEach(function (subodd) {
                if (subodd.indexOf("S") == 0) {
                    if (!(subodd in result[odd])) {
                        result[odd][subodd] = [];
                    }
                    result[odd][subodd].push(ele._raw[odd][subodd].split("@")[1]);
                }
            });
        }

        for (let subodd of ['N', 'H', 'A']) {
            if (!(subodd in result.ftsodds)) {
                result.ftsodds[subodd] = [];
            }
            result.ftsodds[subodd].push(ele._raw.ftsodds[subodd].split("@")[1])
        }

        for (let odd of ['hilodds', 'fhlodds']) {
            for (let subodd of ele._raw[odd].LINELIST) {
                if (!(subodd.LINE in result[odd])) {
                    result[odd][subodd.LINE] = { L: [], H: [] };
                }
                for (let LH of ['L', 'H']) {
                    result[odd][subodd.LINE][LH].push(subodd[LH].split("@")[1]);
                }
            }
        }

        if ('chlodds' in ele._raw) {
            for (let subodd of ele._raw.chlodds.LINELIST) {
                if (!(subodd.LINE in result.chlodds)) {
                    result.chlodds[subodd.LINE] = { L: [], H: [] };
                }
                for (let LH of ['L', 'H']) {
                    result.chlodds[subodd.LINE][LH].push(subodd[LH].split("@")[1]);
                }
            }
        };

        //hftodds
        for (let h of ['H', 'D', 'A']) {
            for (let f of ['H', 'D', 'A']) {
                let subodd = h + f;
                if (!(subodd in result.hftodds)) {
                    result.hftodds[subodd] = [];
                }
                result.hftodds[subodd].push(ele._raw.hftodds[subodd].split("@")[1])
            }
        }
    });
    return _formatChartData(result);
}

const _formatChartData = function (result) {
    result.ts = _combineArray(result.ts);
    for (let odd of ['hadodds', 'fhaodds']) {
        for (let subodd of ['H', 'D', 'A']) {
            result[odd][subodd] = _combineArray(result[odd][subodd]);
        }
    }

    for (let subodd of ['H', 'D', 'A', 'HG']) {
        result.hhaodds[subodd] = _combineArray(result.hhaodds[subodd]);
    }

    for (let subodd of ['H', 'A', 'HG']) {
        result.hdcodds[subodd] = _combineArray(result.hdcodds[subodd]);
    }

    Object.keys(result.ttgodds).forEach(function (subodd) {
        if (subodd.length == 2) {
            result.ttgodds[subodd.substr(1, 1)] = _combineArray(result.ttgodds[subodd.substr(1, 1)]);
        }
    });

    for (let subodd of ['O', 'E']) {
        result.ooeodds[subodd] = _combineArray(result.ooeodds[subodd]);
    }

    for (let odd of ['crsodds', 'fcsodds']) {
        Object.keys(result[odd]).sort().forEach(function (subodd) {
            if (subodd.indexOf("S") == 0) {
                result[odd][subodd] = _combineArray(result[odd][subodd]);
            }
        });
    }

    for (let subodd of ['N', 'H', 'A']) {
        result.ftsodds[subodd] = _combineArray(result.ftsodds[subodd]);
    }

    for (let odd of ['hilodds', 'fhlodds']) {
        Object.keys(result[odd]).sort().forEach(function(subodd){
            for (let LH of ['L', 'H']) {
                result[odd][subodd][LH] = _combineArray(result[odd][subodd][LH]);
            }
        });
    }

    if ('chlodds' in result) {
        Object.keys(result.chlodds).sort().forEach(function(subodd){
            for (let LH of ['L', 'H']) {
                result.chlodds[subodd][LH] = _combineArray(result.chlodds[subodd][LH]);
            }
        });
    };
    for (let h of ['H', 'D', 'A']) {
        for (let f of ['H', 'D', 'A']) {
            result.hftodds[h + f] = _combineArray(result.hftodds[h + f]);
        }
    }
    return result;
}

module.exports = {
    getMatchList: _getMatchList,
    getAllOdds: _getAllOdds,
    getHDA: _getHDA,
    getCHL: _getCHL,
    getHIL: _getHIL,
    getCRS: _getCRS,
    getFCS: _getFCS,
    getTTGO: _getTTGO,
    getAnalyse: _getAnalyse,
    makeChart: _makeChart
}

