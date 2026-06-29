import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cookie_consent_privacy_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_cookie_consent_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cookie_consent_v_version_privacy_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__cookie_consent_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cookie_consent_v_published_locale" AS ENUM('pl');
  CREATE TABLE "cookie_consent" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_enabled" boolean DEFAULT false,
  	"analytics_enabled" boolean DEFAULT false,
  	"marketing_enabled" boolean DEFAULT false,
  	"policy_version" numeric DEFAULT 1,
  	"title" varchar,
  	"description_before_link" varchar,
  	"learn_more_label" varchar,
  	"learn_more_href" varchar DEFAULT '/polityka-prywatnosci#privacy-cookies',
  	"accept_label" varchar,
  	"preferences_label" varchar,
  	"reject_label" varchar,
  	"settings_link_label" varchar DEFAULT 'Ustawienia cookies',
  	"privacy_link_type" "enum_cookie_consent_privacy_link_type" DEFAULT 'reference',
  	"privacy_link_new_tab" boolean,
  	"privacy_link_url" varchar,
  	"privacy_link_label" varchar,
  	"_status" "enum_cookie_consent_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cookie_consent_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_cookie_consent_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_banner_enabled" boolean DEFAULT false,
  	"version_analytics_enabled" boolean DEFAULT false,
  	"version_marketing_enabled" boolean DEFAULT false,
  	"version_policy_version" numeric DEFAULT 1,
  	"version_title" varchar,
  	"version_description_before_link" varchar,
  	"version_learn_more_label" varchar,
  	"version_learn_more_href" varchar DEFAULT '/polityka-prywatnosci#privacy-cookies',
  	"version_accept_label" varchar,
  	"version_preferences_label" varchar,
  	"version_reject_label" varchar,
  	"version_settings_link_label" varchar DEFAULT 'Ustawienia cookies',
  	"version_privacy_link_type" "enum__cookie_consent_v_version_privacy_link_type" DEFAULT 'reference',
  	"version_privacy_link_new_tab" boolean,
  	"version_privacy_link_url" varchar,
  	"version_privacy_link_label" varchar,
  	"version__status" "enum__cookie_consent_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__cookie_consent_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_cookie_consent_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "cookie_consent_rels" ADD CONSTRAINT "cookie_consent_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cookie_consent"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_consent_rels" ADD CONSTRAINT "cookie_consent_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_consent_rels" ADD CONSTRAINT "cookie_consent_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cookie_consent_v_rels" ADD CONSTRAINT "_cookie_consent_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_cookie_consent_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cookie_consent_v_rels" ADD CONSTRAINT "_cookie_consent_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cookie_consent_v_rels" ADD CONSTRAINT "_cookie_consent_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cookie_consent__status_idx" ON "cookie_consent" USING btree ("_status");
  CREATE INDEX "cookie_consent_rels_order_idx" ON "cookie_consent_rels" USING btree ("order");
  CREATE INDEX "cookie_consent_rels_parent_idx" ON "cookie_consent_rels" USING btree ("parent_id");
  CREATE INDEX "cookie_consent_rels_path_idx" ON "cookie_consent_rels" USING btree ("path");
  CREATE INDEX "cookie_consent_rels_pages_id_idx" ON "cookie_consent_rels" USING btree ("pages_id");
  CREATE INDEX "cookie_consent_rels_posts_id_idx" ON "cookie_consent_rels" USING btree ("posts_id");
  CREATE INDEX "_cookie_consent_v_version_version__status_idx" ON "_cookie_consent_v" USING btree ("version__status");
  CREATE INDEX "_cookie_consent_v_created_at_idx" ON "_cookie_consent_v" USING btree ("created_at");
  CREATE INDEX "_cookie_consent_v_updated_at_idx" ON "_cookie_consent_v" USING btree ("updated_at");
  CREATE INDEX "_cookie_consent_v_snapshot_idx" ON "_cookie_consent_v" USING btree ("snapshot");
  CREATE INDEX "_cookie_consent_v_published_locale_idx" ON "_cookie_consent_v" USING btree ("published_locale");
  CREATE INDEX "_cookie_consent_v_latest_idx" ON "_cookie_consent_v" USING btree ("latest");
  CREATE INDEX "_cookie_consent_v_autosave_idx" ON "_cookie_consent_v" USING btree ("autosave");
  CREATE INDEX "_cookie_consent_v_rels_order_idx" ON "_cookie_consent_v_rels" USING btree ("order");
  CREATE INDEX "_cookie_consent_v_rels_parent_idx" ON "_cookie_consent_v_rels" USING btree ("parent_id");
  CREATE INDEX "_cookie_consent_v_rels_path_idx" ON "_cookie_consent_v_rels" USING btree ("path");
  CREATE INDEX "_cookie_consent_v_rels_pages_id_idx" ON "_cookie_consent_v_rels" USING btree ("pages_id");
  CREATE INDEX "_cookie_consent_v_rels_posts_id_idx" ON "_cookie_consent_v_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cookie_consent" CASCADE;
  DROP TABLE "cookie_consent_rels" CASCADE;
  DROP TABLE "_cookie_consent_v" CASCADE;
  DROP TABLE "_cookie_consent_v_rels" CASCADE;
  DROP TYPE "public"."enum_cookie_consent_privacy_link_type";
  DROP TYPE "public"."enum_cookie_consent_status";
  DROP TYPE "public"."enum__cookie_consent_v_version_privacy_link_type";
  DROP TYPE "public"."enum__cookie_consent_v_version_status";
  DROP TYPE "public"."enum__cookie_consent_v_published_locale";`)
}
