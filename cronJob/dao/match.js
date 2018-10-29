const { mysqldb } = require(__dirname + '/../lib')
const SQL_I__MATCH = `INSERT INTO match (match_id, platform_id, platform_match_id, league_id, home_team_id, away_team_id, match_time, create_date, create_time, create_ts) 
                        VALUES (null, :platform_id, :platform_match_id, :league_id, :home_team_id, :away_team_id, :match_time, CURDATE(), CURTIME(), CURRENT_TIMESTAMP())`;
const SQL_I__RESULT = `INSERT INTO result () VALUES ()`;

const SQK_S__NO_RESULT_MATCH = `SELECT m.match_id FROM match 
                                LEFT JOIN match_result mr ON (m.match_id = mr.match_id AND mr.)`;


const insertMatch = function (platformId, platformMatchId, leagueId, homeTeamId, awayTeamId, matchTime) {
    let params = {
        platform_id: platformId,
        platform_match_id: platformMatchId,
        league_id: leagueId,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        match_time: matchTime
    };
    return mysqldb.insert(SQL_I__MATCH, params);
};

/**
 * TODO
 */
const insetResult = function () {
    let params = {
    };
    return mysqldb.insert(SQL_I__RESULT, params);
}

module.exports = {
    insertMatch: insertMatch
};