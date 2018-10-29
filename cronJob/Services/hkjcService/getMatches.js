const { asyncRequest } = require(__dirname + '/../../lib/request');
const logger = require(__dirname + '/../../lib/logger');
const matchDao = require(__dirname + '/../../dao/match');

const getMatchList = async function () {
    const API = "http://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_allodds.aspx";
    const options = {
        method: 'GET', url: API, gzip: true,
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
}

const getMatches = async function () {
    let MatchList = await getMatchList();

    for (let match of MatchList) {
        let homeTeamId = teamDao.selectByPlatformTeamId(match.homeTeam.teamID);
        let awayTeamId = teamDao.selectByPlatformTeamId(match.awayTeam.teamID);
        await matchDao.insertMatch(
            platformId,
            match.matchID,
            null,
            homeTeamId,
            awayTeamId,
            match.matchTime
        );
    };
}

module.exports = {
    getMatches: getMatches
}

getMatches();