const request = require('request');

const getMatchList = async function () {
    const API = "http://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_allodds.aspx";
    const options = {
        method: 'GET', url: API, gzip: true, jar: true,
        headers: {
            'Host': 'bet.hkjc.com',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6'
        }
    };
    try {
        let data = await asyncRequest(options);
        let { response, html } = data;
        if (response.statu != 200) {
            throw new Error();
        }
        return JSON.parse(html);
    } catch (err) {
        throw err;
    }
}

const asyncRequest = function (options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, html) {
            if (error) {
                return reject(error);
            }
            return resolve({ response, html });
        });
    });
}

const _getMatches = async function () {
    let MatchList = await getMatchList();

    for (let match of MatchList) {
        let data = await getMatch(match.matchID)
        _insertDB(data);
    };
}

module.exports = {
    getMatches: _getMatches
}

const main = async function () {
    let res = await getMatchList();
    console.log(res);
}

main();