CREATE TABLE `match` (
    `match_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `platform_id` int(8) unsigned NOT NULL,
    `platform_match_id` bigint(20) unsigned NOT NULL,
    `league_id` int(8) unsigned NOT NULL,
    `home_team_id` int(8) unsigned NOT NULL,
    `away_team_id` int(8) unsigned NOT NULL,
    `matchTime` 
    `matchDate`
    `matchDay`
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`match_id`)
) ENGINE=InnoDB;

CREATE TABLE `match_odds` (
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `HAD` tinyint(2) NOT NULL DEFAULT 0,
    `FHA` tinyint(2) NOT NULL DEFAULT 0,
    `CRS` tinyint(2) NOT NULL DEFAULT 0,
    `FCS` tinyint(2) NOT NULL DEFAULT 0,
    `FTS` tinyint(2) NOT NULL DEFAULT 0,
    `OOE` tinyint(2) NOT NULL DEFAULT 0,
    `TTG` tinyint(2) NOT NULL DEFAULT 0,
    `HFT` tinyint(2) NOT NULL DEFAULT 0,
    `HHA` tinyint(2) NOT NULL DEFAULT 0,
    `HDC` tinyint(2) NOT NULL DEFAULT 0,
    `HIL` tinyint(2) NOT NULL DEFAULT 0,
    `FHL` tinyint(2) NOT NULL DEFAULT 0,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    modify_ts timestamp NOT NULL DEFAULT current_timestamp()ON UPDATE current_timestamp(),
    UNIQUE KEY (`match_id`)
) ENGINE=InnoDB;

CREATE TABLE `match_result` (
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    // TODO
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    UNIQUE KEY (`match_id`)
) ENGINE=InnoDB;

CREATE TABLE `match_analyse` (

) ENGINE=InnoDB;

CREATE TABLE `team` (
    `team_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
    `league_id` int(8) unsigned NOT NULL ,
    PRIMARY KEY (`team_id`)
)

CREATE TABLE `team_platform` (
    `team_id` int(8) unsigned NOT NULL ,
    `platform_id` int(8) unsigned NOT NULL ,
    `name_ch` varchar(50) NOT NULL DEFAULT '',
    `name_en` varchar(50) NOT NULL DEFAULT '',
    PRIMARY KEY (`team_id`, `platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `league` (
    `league_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`league_id`)
) ENGINE=InnoDB;

CREATE TABLE `league_platform` (
    `league_id` int(8) unsigned NOT NULL ,
    `platform_id` int(8) unsigned NOT NULL ,
    `platform_league_id` int(8) NOT NULL DEFAULT -1,
    `name_short` varchar(50) NOT NULL DEFAULT '',
    `name_ch` varchar(50) NOT NULL DEFAULT '',
    `name_en` varchar(50) NOT NULL DEFAULT '',
    PRIMARY KEY (`league_id`, `platform_id`)
) ENGINE=InnoDB;


-- ODDS
CREATE TABLE `had` (
    `had_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`had_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `fha` (
    `had_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`had_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `crs` (
    `crs_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `S01` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S02` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S03` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S04` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S05` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S10` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S20` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S30` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S40` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S50` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S11` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S22` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S33` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S44` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S12` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S13` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S21` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S31` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S32` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S23` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S14` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S41` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S24` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S42` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S15` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S51` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S25` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S52` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `SMH` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `SMA` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `SMD` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`crs_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `fcs` (
    `fcs_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `S01` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S02` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S03` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S04` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S05` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S10` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S20` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S30` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S40` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S50` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S11` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S22` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S33` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S44` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S12` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S13` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S21` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S31` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S32` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S23` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S14` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S41` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S24` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S42` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S15` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S51` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S25` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `S52` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `SMH` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `SMA` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `SMD` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`fcs_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `fts` (
    `fts_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`fts_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `ooe` (
    `ooe_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `odd` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `even` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`ooe_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `ttg`(
    `ttg_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `p0` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `p1` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `p2` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `p3` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `p4` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `p5` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `p6` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `M7` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`ttg_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `hft`(
    `hft_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `away_away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away_home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away_draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `home_home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `home_away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `home_draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw_draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw_away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw_home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`hft_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `hha` (
    `hha_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `draw` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `handicap` decimal(4,2) NOT NULL DEFAULT 00.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`hha_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `hdc` (
    `hdc_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    `home` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `away` decimal(6,2) NOT NULL DEFAULT 0000.00,
    `handicap` decimal(4,2) NOT NULL DEFAULT 00.00,
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`hdc_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `hil` (
    `hil_id`  bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    // TODO
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`hil_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;

CREATE TABLE `fhl` (
    `fhl_id`  bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `match_id` bigint(20) unsigned NOT NULL,
    `platform_id` int(8) unsigned NOT NULL,
    // TODO
    `create_date` date,
    `create_time` time,
    `create_ts` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`fhl_id`),
    KEY `match_id` (`match_id`),
    KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB;Sams-iMac:Desktop sam$ 
