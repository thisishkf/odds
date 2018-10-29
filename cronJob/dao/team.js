const SQL_I__TEAM = `INSERT INTO team (id, platform, team_id, name_ch, name_en, create_date, create_time, create_ts, modify_ts)
                    VALUES (null, :platform_id, :team_id, :name_ch, :name_en, CURDATE(), CURTIME(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`;

const SQL_S__TEAM_BY_PLATFORM_TEAM_ID = `SELECT * FROM team t 
                                        INNER JOIN team_platform tp ON (t.team_id = tp.team_id) 
                                        WHERE tp.platform_team_id = :platform_team_id`;

const insertTeam = function (platformId, teamId, nameCh, nameEn) {
    let params = {
        platform_id: platformId,
        team_id: teamId,
        name_ch: nameCh,
        name_en: nameEn,
    };
    return mysqldb.insert(SQL_I__TEAM, params);
};

const selectByPlatformTeamId = function (platformTeamId) {
    let params = {
        platform_team_id: platformTeamId
    };
    return mysqldb.selectOne(SQL_S__TEAM_BY_PLATFORM_TEAM_ID, params);
}

module.exports = {
    insertTeam: insertTeam,
    selectByPlatformTeamId: selectByPlatformTeamId
}