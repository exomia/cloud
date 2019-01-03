CREATE SCHEMA IF NOT EXISTS public;

CREATE EXTENSION IF NOT EXISTS "pgcrypto"  WITH  SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH  SCHEMA public;

CREATE SCHEMA IF NOT EXISTS private;

CREATE TABLE IF NOT EXISTS private."directory"
(
	"uuid" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"name" CHARACTER VARYING(128) NOT NULL,
	"parent_directory_uuid" UUID NULL DEFAULT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"download_count" INTEGER NOT NULL DEFAULT 0,
	"delete_timestamp" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"path_info_json" JSON NOT NULL DEFAULT '[]'::json,
	PRIMARY KEY("uuid")
);

ALTER TABLE private."directory" OWNER TO postgres;

CREATE UNIQUE INDEX directory_user_uuid_parent_directory_uuid_name_uindex ON private."directory" 
	USING btree (user_uuid, parent_directory_uuid, name) 
	WHERE parent_directory_uuid IS NOT NULL;
CREATE UNIQUE INDEX directory_user_uuid_name_uindex ON private."directory" 
	USING btree (user_uuid, name)
	WHERE parent_directory_uuid IS NULL;

CREATE TABLE IF NOT EXISTS private."file"
(
	"uuid" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"directory_uuid" UUID NULL DEFAULT NULL,
	"name" CHARACTER VARYING(128) NOT NULL,	
	"extension" CHARACTER VARYING(32) NOT NULL,
	"mimetype" CHARACTER VARYING(48) NOT NULL,
	"local_name" CHARACTER VARYING(128) NOT NULL,
	"size" BIGINT NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"clamav_status" INTEGER NOT NULL DEFAULT 0,
	"vt_uuid" UUID NULL DEFAULT NULL,
	"download_count" INTEGER NOT NULL DEFAULT 0,
	"delete_timestamp" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	PRIMARY KEY("uuid")
);

ALTER TABLE private."file" OWNER TO postgres;

CREATE UNIQUE INDEX file_user_uuid_directory_uuid_name_extension_uindex ON private."file" 
	USING btree (user_uuid, directory_uuid, name, extension)
	WHERE directory_uuid IS NOT NULL;
CREATE UNIQUE INDEX file_user_uuid_name_extension_uindex ON private."file"
	USING btree (user_uuid, name, extension)
	WHERE directory_uuid IS NULL;

CREATE UNIQUE INDEX file_local_name_uindex ON private."file" 
	USING btree (local_name);

CREATE TABLE IF NOT EXISTS private."shared_directory"
(
	"uuid" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"directory_uuid" UUID NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"expire" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"user_uuid_list" JSON NULL DEFAULT NULL,
	"hash" CHARACTER VARYING(64) NULL DEFAULT NULL,
	"password" CHARACTER VARYING(72) NULL DEFAULT NULL,
	"flags" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("uuid")
);

ALTER TABLE private."shared_directory" OWNER TO postgres;

CREATE UNIQUE INDEX shared_directory_user_uuid_directory_uuid_uindex ON private."shared_directory" 
	USING btree (user_uuid, directory_uuid)
	WHERE directory_uuid IS NOT NULL;
CREATE UNIQUE INDEX shared_directory_user_uuid_uindex ON private."shared_directory" 
	USING btree (user_uuid)
	WHERE directory_uuid IS NULL;

CREATE TABLE IF NOT EXISTS private."shared_file"
(
	"uuid" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
	"user_uuid" UUID NOT NULL,
	"file_uuid" UUID NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"expire" TIMESTAMP WITH TIME ZONE NULL DEFAULT NULL,
	"user_uuid_list" JSON NULL DEFAULT NULL,
	"hash" CHARACTER VARYING(64) NULL DEFAULT NULL,
	"password" CHARACTER VARYING(72) NULL DEFAULT NULL,
	"flags" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("uuid")
);

ALTER TABLE private."shared_file" OWNER TO postgres;

CREATE UNIQUE INDEX shared_file_user_uuid_file_uuid_uindex ON private."shared_file" 
	USING btree (user_uuid, file_uuid);

CREATE TABLE IF NOT EXISTS private."user"
(
	"uuid" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
	"name" CHARACTER VARYING(32) NOT NULL,
	"email" CHARACTER VARYING(64) NOT NULL,
	"password" CHARACTER VARYING(72) NOT NULL,
	"timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"scopes" JSON NOT NULL DEFAULT '{}'::json,
	"volume" BIGINT NOT NULL DEFAULT 102400,
	PRIMARY KEY("uuid")
);

ALTER TABLE private."user" OWNER TO postgres;

CREATE UNIQUE INDEX user_email_uindex  ON private."user" 
	USING btree (email);
CREATE UNIQUE INDEX user_name_uindex ON private."user" 
	USING btree (name);

ALTER TABLE ONLY private."directory" 
	ADD CONSTRAINT directory_directory_uuid_fk 
	FOREIGN KEY (parent_directory_uuid) REFERENCES private."directory"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."directory"
    ADD CONSTRAINT directory_user_uuid_fk 
	FOREIGN KEY (user_uuid) REFERENCES private."user"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."file"
    ADD CONSTRAINT file_directory_uuid_fk 
	FOREIGN KEY (directory_uuid) REFERENCES private."directory"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."file"
    ADD CONSTRAINT file_user_uuid_fk 
	FOREIGN KEY (user_uuid) REFERENCES private."user"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."shared_directory"
    ADD CONSTRAINT shared_directory_directory_uuid_fk 
	FOREIGN KEY (directory_uuid) REFERENCES private."directory"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."shared_directory"
    ADD CONSTRAINT shared_directory_user_uuid_fk 
	FOREIGN KEY (user_uuid) REFERENCES private."user"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."shared_file"
    ADD CONSTRAINT shared_file_file_uuid_fk 
	FOREIGN KEY (file_uuid) REFERENCES private."file"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY private."shared_file"
    ADD CONSTRAINT shared_file_user_uuid_fk 
	FOREIGN KEY (user_uuid) REFERENCES private."user"(uuid) 
	ON UPDATE CASCADE ON DELETE CASCADE;