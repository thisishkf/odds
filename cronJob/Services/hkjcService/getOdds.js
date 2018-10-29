const { asyncRequest } = require(__dirname + '/../../lib/request');
const logger = require(__dirname + '/../../lib/logger');

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

        try {
            let { response, html } = await asyncRequest(options);
            console.log(html);
            if (response.statusCode == 200) {
                try {
                    let data = JSON.parse(html);
                    return data;
                } catch (err) {
                    console.log(response.headers);
                    logger.debug(err.stack);
                    // return getMatchList();
                }
            }
            if (response.statusCode > 300 && response.statusCode < 400) {
                throw new Error();
            }
        } catch (err) {
            throw err;
        }
    });
}

const processOdds = function (data) {

}

module.exports = {
    getMatch: getMatch
}

const main = async function () {
    let odds = await getMatch('254cd5ab-f061-443e-a77c-ad0e89ba6f49');
    console.log(odds);
}

main();