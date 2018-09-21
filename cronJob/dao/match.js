const { mysqldb } = require(__dirname + '/../lib')

const SQL_I__MATCH = `INSERT INTO match (id, match_id, match_id_in_official, match_num, match_date, match_day, home_team_id, away_team_id, create_date, create_time, create_ts, modify_ts ) 
                        VALUES (null, :match_id, :match_id_in_official, :match_num, :match_date, :match_day, :home_team_id, :away_team_id, CURDATE(), CURTIME(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`;
const SQL_I__RESULT = `INSERT INTO result () VALUES ()`;

const insertMatch = function () {
    let params = {

    };
    return mysqldb.insert(SQL_I__MATCH, params);
};

module.exports = {
    insertMatch: insertMatch
};