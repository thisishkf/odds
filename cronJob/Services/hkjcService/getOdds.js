const request = require('request');

const getMatch = function (hkjc) {
    const API = 'http://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_allodds.aspx&matchid=#ID#';
    let result = [];
    return new Promise(resolve => {
        const options = {
            method: 'GET',
            url: API.replace('#ID#', hkjc),
            gzip: true,
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
        request(options, function (error, response, html) {
            console.log(response.headers);
            if (!error) {

            }
            if (response.statusCode != 200) {

            }

            try {
                let _oddsList = JSON.parse(html);
                for (let _odds of _oddsList) {
                    if (_odds.matchID == hkjc) {
                        result = _odds;
                    }
                }
            } catch (e) {
                console.error('GET <HTML/>');
            }
            resolve(result);
        });
    });
}

const _getOdds = async function () {
    for (let match of await getMatchList()) {
        let odds = await getMatch(match.hkjc);
        if (odds) {
            _insertDB(match, odds);
        }
    }
}

module.exports = {
    getOdds: _getOdds,
    getMatch: getMatch
}

const main = async function () {
    let odds = await getMatch('254cd5ab-f061-443e-a77c-ad0e89ba6f49');
    console.log(odds);
}

main();