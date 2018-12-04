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

-- Dumping structure for table private.directory
CREATE TABLE IF NOT EXISTS "directory" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4() COMMENT E'',
	"user_uuid" UUID NOT NULL COMMENT E'',
	"name" CHARACTER VARYING(128) NOT NULL COMMENT E'',
	"parent_directory_uuid" UUID NULL DEFAULT NULL COMMENT E'',
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT E'',
	"download_count" INTEGER NOT NULL DEFAULT 0 COMMENT E'',
	"delete_timestamp" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL COMMENT E'',
	"path_info_json" JSON NOT NULL DEFAULT '[]'::json COMMENT E'',
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.file
CREATE TABLE IF NOT EXISTS "file" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4() COMMENT E'',
	"user_uuid" UUID NOT NULL COMMENT E'',
	"directory_uuid" UUID NULL DEFAULT NULL COMMENT E'',
	"name" CHARACTER VARYING(128) NOT NULL COMMENT E'',
	"local_name" CHARACTER VARYING(128) NOT NULL COMMENT E'',
	"size" BIGINT NOT NULL COMMENT E'',
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT E'',
	"clamav_status" INTEGER NOT NULL DEFAULT 0 COMMENT E'',
	"vt_uuid" UUID NULL DEFAULT NULL COMMENT E'',
	"download_count" INTEGER NOT NULL DEFAULT 0 COMMENT E'',
	"delete_timestamp" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL COMMENT E'',
	"mimetype" CHARACTER VARYING(48) NOT NULL COMMENT E'',
	"extension" CHARACTER VARYING(32) NOT NULL COMMENT E'',
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.shared_directory
CREATE TABLE IF NOT EXISTS "shared_directory" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4() COMMENT E'',
	"user_uuid" UUID NOT NULL COMMENT E'',
	"directory_uuid" UUID NOT NULL COMMENT E'',
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT E'',
	"expire" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL COMMENT E'',
	"user_uuid_list" JSON NULL DEFAULT NULL COMMENT E'',
	"hash" CHARACTER VARYING(64) NULL DEFAULT NULL COMMENT E'',
	"password" CHARACTER VARYING(72) NULL DEFAULT NULL COMMENT E'',
	"flags" INTEGER NOT NULL DEFAULT 0 COMMENT E'',
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.shared_file
CREATE TABLE IF NOT EXISTS "shared_file" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4() COMMENT E'',
	"user_uuid" UUID NOT NULL COMMENT E'',
	"file_uuid" UUID NOT NULL COMMENT E'',
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT E'',
	"expire" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL COMMENT E'',
	"user_uuid_list" JSON NULL DEFAULT NULL COMMENT E'',
	"hash" CHARACTER VARYING(64) NULL DEFAULT NULL COMMENT E'',
	"password" CHARACTER VARYING(72) NULL DEFAULT NULL COMMENT E'',
	"flags" INTEGER NOT NULL DEFAULT 0 COMMENT E'',
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for table private.user
CREATE TABLE IF NOT EXISTS "user" (
	"uuid" UUID NOT NULL DEFAULT uuid_generate_v4() COMMENT E'',
	"username" CHARACTER VARYING(32) NOT NULL COMMENT E'',
	"email" CHARACTER VARYING(64) NOT NULL COMMENT E'',
	"password" CHARACTER VARYING(72) NOT NULL COMMENT E'',
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT E'',
	"scopes" JSON NOT NULL DEFAULT '{}'::json COMMENT E'',
	"volume" BIGINT NOT NULL DEFAULT 102400 COMMENT E'',
	PRIMARY KEY ("uuid")
);

-- Data exporting was unselected.
-- Dumping structure for function public.armor
DELIMITER //
CREATE FUNCTION "armor"() RETURNS TEXT AS $$ pg_armor $$//
DELIMITER ;

-- Dumping structure for function public.armor
DELIMITER //
CREATE FUNCTION "armor"() RETURNS TEXT AS $$ pg_armor $$//
DELIMITER ;

-- Dumping structure for function public.crypt
DELIMITER //
CREATE FUNCTION "crypt"() RETURNS TEXT AS $$ pg_crypt $$//
DELIMITER ;

-- Dumping structure for function public.dearmor
DELIMITER //
CREATE FUNCTION "dearmor"() RETURNS BYTEA AS $$ pg_dearmor $$//
DELIMITER ;

-- Dumping structure for function public.decrypt
DELIMITER //
CREATE FUNCTION "decrypt"() RETURNS BYTEA AS $$ pg_decrypt $$//
DELIMITER ;

-- Dumping structure for function public.decrypt_iv
DELIMITER //
CREATE FUNCTION "decrypt_iv"() RETURNS BYTEA AS $$ pg_decrypt_iv $$//
DELIMITER ;

-- Dumping structure for function public.digest
DELIMITER //
CREATE FUNCTION "digest"() RETURNS BYTEA AS $$ pg_digest $$//
DELIMITER ;

-- Dumping structure for function public.digest
DELIMITER //
CREATE FUNCTION "digest"() RETURNS BYTEA AS $$ pg_digest $$//
DELIMITER ;

-- Dumping structure for function public.encrypt
DELIMITER //
CREATE FUNCTION "encrypt"() RETURNS BYTEA AS $$ pg_encrypt $$//
DELIMITER ;

-- Dumping structure for function public.encrypt_iv
DELIMITER //
CREATE FUNCTION "encrypt_iv"() RETURNS BYTEA AS $$ pg_encrypt_iv $$//
DELIMITER ;

-- Dumping structure for function public.gen_random_bytes
DELIMITER //
CREATE FUNCTION "gen_random_bytes"() RETURNS BYTEA AS $$ pg_random_bytes $$//
DELIMITER ;

-- Dumping structure for function public.gen_random_uuid
DELIMITER //
CREATE FUNCTION "gen_random_uuid"() RETURNS UUID AS $$ pg_random_uuid $$//
DELIMITER ;

-- Dumping structure for function public.gen_salt
DELIMITER //
CREATE FUNCTION "gen_salt"() RETURNS TEXT AS $$ pg_gen_salt $$//
DELIMITER ;

-- Dumping structure for function public.gen_salt
DELIMITER //
CREATE FUNCTION "gen_salt"() RETURNS TEXT AS $$ pg_gen_salt $$//
DELIMITER ;

-- Dumping structure for function public.hmac
DELIMITER //
CREATE FUNCTION "hmac"() RETURNS BYTEA AS $$ pg_hmac $$//
DELIMITER ;

-- Dumping structure for function public.hmac
DELIMITER //
CREATE FUNCTION "hmac"() RETURNS BYTEA AS $$ pg_hmac $$//
DELIMITER ;

-- Dumping structure for function public.pgp_armor_headers
DELIMITER //
CREATE FUNCTION "pgp_armor_headers"("" TEXT, key , value ) RETURNS UNKNOWN AS $$ pgp_armor_headers $$//
DELIMITER ;

-- Dumping structure for function public.pgp_key_id
DELIMITER //
CREATE FUNCTION "pgp_key_id"() RETURNS TEXT AS $$ pgp_key_id_w $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_decrypt
DELIMITER //
CREATE FUNCTION "pgp_pub_decrypt"() RETURNS TEXT AS $$ pgp_pub_decrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_decrypt
DELIMITER //
CREATE FUNCTION "pgp_pub_decrypt"() RETURNS TEXT AS $$ pgp_pub_decrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_decrypt
DELIMITER //
CREATE FUNCTION "pgp_pub_decrypt"() RETURNS TEXT AS $$ pgp_pub_decrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_decrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_pub_decrypt_bytea"() RETURNS BYTEA AS $$ pgp_pub_decrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_decrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_pub_decrypt_bytea"() RETURNS BYTEA AS $$ pgp_pub_decrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_decrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_pub_decrypt_bytea"() RETURNS BYTEA AS $$ pgp_pub_decrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_encrypt
DELIMITER //
CREATE FUNCTION "pgp_pub_encrypt"() RETURNS BYTEA AS $$ pgp_pub_encrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_encrypt
DELIMITER //
CREATE FUNCTION "pgp_pub_encrypt"() RETURNS BYTEA AS $$ pgp_pub_encrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_encrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_pub_encrypt_bytea"() RETURNS BYTEA AS $$ pgp_pub_encrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_pub_encrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_pub_encrypt_bytea"() RETURNS BYTEA AS $$ pgp_pub_encrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_decrypt
DELIMITER //
CREATE FUNCTION "pgp_sym_decrypt"() RETURNS TEXT AS $$ pgp_sym_decrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_decrypt
DELIMITER //
CREATE FUNCTION "pgp_sym_decrypt"() RETURNS TEXT AS $$ pgp_sym_decrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_decrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_sym_decrypt_bytea"() RETURNS BYTEA AS $$ pgp_sym_decrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_decrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_sym_decrypt_bytea"() RETURNS BYTEA AS $$ pgp_sym_decrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_encrypt
DELIMITER //
CREATE FUNCTION "pgp_sym_encrypt"() RETURNS BYTEA AS $$ pgp_sym_encrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_encrypt
DELIMITER //
CREATE FUNCTION "pgp_sym_encrypt"() RETURNS BYTEA AS $$ pgp_sym_encrypt_text $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_encrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_sym_encrypt_bytea"() RETURNS BYTEA AS $$ pgp_sym_encrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.pgp_sym_encrypt_bytea
DELIMITER //
CREATE FUNCTION "pgp_sym_encrypt_bytea"() RETURNS BYTEA AS $$ pgp_sym_encrypt_bytea $$//
DELIMITER ;

-- Dumping structure for function public.uuid_generate_v1
DELIMITER //
CREATE FUNCTION "uuid_generate_v1"() RETURNS UUID AS $$ uuid_generate_v1 $$//
DELIMITER ;

-- Dumping structure for function public.uuid_generate_v1mc
DELIMITER //
CREATE FUNCTION "uuid_generate_v1mc"() RETURNS UUID AS $$ uuid_generate_v1mc $$//
DELIMITER ;

-- Dumping structure for function public.uuid_generate_v3
DELIMITER //
CREATE FUNCTION "uuid_generate_v3"(namespace UUID, name TEXT) RETURNS UUID AS $$ uuid_generate_v3 $$//
DELIMITER ;

-- Dumping structure for function public.uuid_generate_v4
DELIMITER //
CREATE FUNCTION "uuid_generate_v4"() RETURNS UUID AS $$ uuid_generate_v4 $$//
DELIMITER ;

-- Dumping structure for function public.uuid_generate_v5
DELIMITER //
CREATE FUNCTION "uuid_generate_v5"(namespace UUID, name TEXT) RETURNS UUID AS $$ uuid_generate_v5 $$//
DELIMITER ;

-- Dumping structure for function public.uuid_nil
DELIMITER //
CREATE FUNCTION "uuid_nil"() RETURNS UUID AS $$ uuid_nil $$//
DELIMITER ;

-- Dumping structure for function public.uuid_ns_dns
DELIMITER //
CREATE FUNCTION "uuid_ns_dns"() RETURNS UUID AS $$ uuid_ns_dns $$//
DELIMITER ;

-- Dumping structure for function public.uuid_ns_oid
DELIMITER //
CREATE FUNCTION "uuid_ns_oid"() RETURNS UUID AS $$ uuid_ns_oid $$//
DELIMITER ;

-- Dumping structure for function public.uuid_ns_url
DELIMITER //
CREATE FUNCTION "uuid_ns_url"() RETURNS UUID AS $$ uuid_ns_url $$//
DELIMITER ;

-- Dumping structure for function public.uuid_ns_x500
DELIMITER //
CREATE FUNCTION "uuid_ns_x500"() RETURNS UUID AS $$ uuid_ns_x500 $$//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
