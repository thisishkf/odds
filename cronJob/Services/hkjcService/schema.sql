-- MySQL dump 10.13  Distrib 5.7.23, for osx10.13 (x86_64)
--
-- Host: localhost    Database: odds
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `crs`
--

DROP TABLE IF EXISTS `crs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crs` (
  `crs_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `S01` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S02` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S03` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S04` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S05` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S10` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S20` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S30` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S40` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S50` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S11` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S22` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S33` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S44` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S12` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S13` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S21` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S31` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S32` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S23` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S14` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S41` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S24` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S42` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S15` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S51` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S25` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S52` decimal(6,2) NOT NULL DEFAULT '0.00',
  `SMH` decimal(6,2) NOT NULL DEFAULT '0.00',
  `SMA` decimal(6,2) NOT NULL DEFAULT '0.00',
  `SMD` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`crs_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fcs`
--

DROP TABLE IF EXISTS `fcs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fcs` (
  `fcs_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `S01` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S02` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S03` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S04` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S05` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S10` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S20` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S30` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S40` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S50` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S11` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S22` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S33` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S44` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S12` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S13` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S21` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S31` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S32` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S23` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S14` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S41` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S24` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S42` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S15` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S51` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S25` decimal(6,2) NOT NULL DEFAULT '0.00',
  `S52` decimal(6,2) NOT NULL DEFAULT '0.00',
  `SMH` decimal(6,2) NOT NULL DEFAULT '0.00',
  `SMA` decimal(6,2) NOT NULL DEFAULT '0.00',
  `SMD` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fcs_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fha`
--

DROP TABLE IF EXISTS `fha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fha` (
  `had_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`had_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fts`
--

DROP TABLE IF EXISTS `fts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fts` (
  `fts_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fts_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `had`
--

DROP TABLE IF EXISTS `had`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `had` (
  `had_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`had_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hdc`
--

DROP TABLE IF EXISTS `hdc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hdc` (
  `hdc_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `handicap` decimal(4,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hdc_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hft`
--

DROP TABLE IF EXISTS `hft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hft` (
  `hft_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `away_away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away_home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away_draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `home_home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `home_away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `home_draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw_draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw_away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw_home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hft_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hha`
--

DROP TABLE IF EXISTS `hha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hha` (
  `hha_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `home` decimal(6,2) NOT NULL DEFAULT '0.00',
  `away` decimal(6,2) NOT NULL DEFAULT '0.00',
  `draw` decimal(6,2) NOT NULL DEFAULT '0.00',
  `handicap` decimal(4,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hha_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `league`
--

DROP TABLE IF EXISTS `league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `league` (
  `league_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`league_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `league_platform`
--

DROP TABLE IF EXISTS `league_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `league_platform` (
  `league_id` int(8) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `platform_league_id` int(8) NOT NULL DEFAULT '-1',
  `name_short` varchar(50) NOT NULL DEFAULT '',
  `name_ch` varchar(50) NOT NULL DEFAULT '',
  `name_en` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`league_id`,`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ooe`
--

DROP TABLE IF EXISTS `ooe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ooe` (
  `ooe_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `odd` decimal(6,2) NOT NULL DEFAULT '0.00',
  `even` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ooe_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team_platform`
--

DROP TABLE IF EXISTS `team_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_platform` (
  `team_id` int(8) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `platform_team_id` int(8) unsigned DEFAULT NULL,
  `name_ch` varchar(50) NOT NULL DEFAULT '',
  `name_en` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`team_id`,`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ttg`
--

DROP TABLE IF EXISTS `ttg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ttg` (
  `ttg_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `platform_id` int(8) unsigned NOT NULL,
  `p0` decimal(6,2) NOT NULL DEFAULT '0.00',
  `p1` decimal(6,2) NOT NULL DEFAULT '0.00',
  `p2` decimal(6,2) NOT NULL DEFAULT '0.00',
  `p3` decimal(6,2) NOT NULL DEFAULT '0.00',
  `p4` decimal(6,2) NOT NULL DEFAULT '0.00',
  `p5` decimal(6,2) NOT NULL DEFAULT '0.00',
  `p6` decimal(6,2) NOT NULL DEFAULT '0.00',
  `M7` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_date` date DEFAULT NULL,
  `create_time` time DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ttg_id`),
  KEY `match_id` (`match_id`),
  KEY `platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-01 19:06:34
