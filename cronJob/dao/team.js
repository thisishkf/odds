const SQL_I__TEAM = `INSERT INTO team (id, platform, team_id, name_ch, name_en, create_date, create_time, create_ts, modify_ts)
                    VALUES (null, :platform_id, :team_id, :name_ch, :name_en, CURDATE(), CURTIME(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`;

const insertTeam = function (platformId, teamId, nameCh, nameEn) {
    let params = {
        platform_id: platformId,
        team_id: teamId,
        name_ch: nameCh,
        name_en: nameEn,
    };
    return mysqldb.insert(SQL_I__TEAM, params);
};