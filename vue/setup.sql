-- --------------------------------------------------------
-- Host:                         exomia.com
-- Server version:               PostgreSQL 11.0 (Debian 11.0-1.pgdg90+2) on x86_64-pc-linux-gnu, compiled by gcc (Debian 6.3.0-18+deb9u1) 6.3.0 20170516, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Dumping structure for table private.directory
CREATE TABLE IF NOT EXISTS "directory" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"name" CHARACTER VARYING(128) NOT NULL,
	"parent_directory_uuid" UUID NULL DEFAULT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"download_count" INTEGER NOT NULL DEFAULT 0,
	"delete_timestamp" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"path_info_json" JSON NOT NULL DEFAULT '[]'::json,
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.file
CREATE TABLE IF NOT EXISTS "file" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"directory_uuid" UUID NULL DEFAULT NULL,
	"name" CHARACTER VARYING(128) NOT NULL,
	"local_name" CHARACTER VARYING(128) NOT NULL,
	"size" BIGINT NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"clamav_status" INTEGER NOT NULL DEFAULT 0,
	"vt_uuid" UUID NULL DEFAULT NULL,
	"download_count" INTEGER NOT NULL DEFAULT 0,
	"delete_timestamp" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"mimetype" CHARACTER VARYING(48) NOT NULL,
	"extension" CHARACTER VARYING(32) NOT NULL,
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.shared_directory
CREATE TABLE IF NOT EXISTS "shared_directory" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"directory_uuid" UUID NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"expire" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"user_uuid_list" JSON NULL DEFAULT NULL,
	"hash" CHARACTER VARYING(64) NULL DEFAULT NULL,
	"password" CHARACTER VARYING(72) NULL DEFAULT NULL,
	"flags" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.shared_file
CREATE TABLE IF NOT EXISTS "shared_file" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"file_uuid" UUID NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"expire" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"user_uuid_list" JSON NULL DEFAULT NULL,
	"hash" CHARACTER VARYING(64) NULL DEFAULT NULL,
	"password" CHARACTER VARYING(72) NULL DEFAULT NULL,
	"flags" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.user
CREATE TABLE IF NOT EXISTS "user" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
	"username" CHARACTER VARYING(32) NOT NULL,
	"email" CHARACTER VARYING(64) NOT NULL,
	"password" CHARACTER VARYING(72) NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"scopes" JSON NOT NULL DEFAULT '{}'::json,
	"volume" BIGINT NOT NULL DEFAULT 102400,
	PRIMARY KEY ("uuid")
);

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;