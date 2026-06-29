import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN CREATE TYPE "public"."enum_galleries_portfolio_category" AS ENUM('kobieca', 'wizerunkowa', 'slubny', 'narzezenska', 'rodzinna'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__galleries_v_version_portfolio_category" AS ENUM('kobieca', 'wizerunkowa', 'slubny', 'narzezenska', 'rodzinna'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_gallery_page_hero_content_filters_category" AS ENUM('kobieca', 'wizerunkowa', 'slubny', 'narzezenska', 'rodzinna'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_gallery_page_hero_content_default_filter" AS ENUM('kobieca', 'wizerunkowa', 'slubny', 'narzezenska', 'rodzinna'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_gallery_page_status" AS ENUM('draft', 'published'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__gallery_page_v_version_hero_content_filters_category" AS ENUM('kobieca', 'wizerunkowa', 'slubny', 'narzezenska', 'rodzinna'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__gallery_page_v_version_hero_content_default_filter" AS ENUM('kobieca', 'wizerunkowa', 'slubny', 'narzezenska', 'rodzinna'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__gallery_page_v_version_status" AS ENUM('draft', 'published'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__gallery_page_v_published_locale" AS ENUM('pl'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE TABLE IF NOT EXISTS "gallery_page_hero_content_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "enum_gallery_page_hero_content_filters_category",
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_content_title_lead" varchar,
  	"hero_content_title_emphasis" varchar,
  	"hero_content_title_trail" varchar,
  	"hero_content_description" varchar,
  	"hero_content_default_filter" "enum_gallery_page_hero_content_default_filter" DEFAULT 'kobieca',
  	"portfolio_settings_initial_count" numeric DEFAULT 12,
  	"portfolio_settings_load_more_batch_size" numeric DEFAULT 12,
  	"portfolio_settings_load_more_label" varchar DEFAULT 'Zobacz więcej zdjęć',
  	"_status" "enum_gallery_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_gallery_page_v_version_hero_content_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum__gallery_page_v_version_hero_content_filters_category",
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_gallery_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_content_title_lead" varchar,
  	"version_hero_content_title_emphasis" varchar,
  	"version_hero_content_title_trail" varchar,
  	"version_hero_content_description" varchar,
  	"version_hero_content_default_filter" "enum__gallery_page_v_version_hero_content_default_filter" DEFAULT 'kobieca',
  	"version_portfolio_settings_initial_count" numeric DEFAULT 12,
  	"version_portfolio_settings_load_more_batch_size" numeric DEFAULT 12,
  	"version_portfolio_settings_load_more_label" varchar DEFAULT 'Zobacz więcej zdjęć',
  	"version__status" "enum__gallery_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__gallery_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "galleries" ADD COLUMN IF NOT EXISTS "portfolio_category" "enum_galleries_portfolio_category" DEFAULT 'kobieca';
  ALTER TABLE "galleries" ADD COLUMN IF NOT EXISTS "show_on_portfolio" boolean DEFAULT true;
  ALTER TABLE "_galleries_v" ADD COLUMN IF NOT EXISTS "version_portfolio_category" "enum__galleries_v_version_portfolio_category" DEFAULT 'kobieca';
  ALTER TABLE "_galleries_v" ADD COLUMN IF NOT EXISTS "version_show_on_portfolio" boolean DEFAULT true;
  DO $$ BEGIN ALTER TABLE "gallery_page_hero_content_filters" ADD CONSTRAINT "gallery_page_hero_content_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN ALTER TABLE "_gallery_page_v_version_hero_content_filters" ADD CONSTRAINT "_gallery_page_v_version_hero_content_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_page_v"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE INDEX IF NOT EXISTS "gallery_page_hero_content_filters_order_idx" ON "gallery_page_hero_content_filters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "gallery_page_hero_content_filters_parent_id_idx" ON "gallery_page_hero_content_filters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "gallery_page__status_idx" ON "gallery_page" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_version_hero_content_filters_order_idx" ON "_gallery_page_v_version_hero_content_filters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_version_hero_content_filters_parent_id_idx" ON "_gallery_page_v_version_hero_content_filters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_version_version__status_idx" ON "_gallery_page_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_created_at_idx" ON "_gallery_page_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_updated_at_idx" ON "_gallery_page_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_snapshot_idx" ON "_gallery_page_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_published_locale_idx" ON "_gallery_page_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_latest_idx" ON "_gallery_page_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_gallery_page_v_autosave_idx" ON "_gallery_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "gallery_page_hero_content_filters" CASCADE;
  DROP TABLE "gallery_page" CASCADE;
  DROP TABLE "_gallery_page_v_version_hero_content_filters" CASCADE;
  DROP TABLE "_gallery_page_v" CASCADE;
  ALTER TABLE "galleries" DROP COLUMN "portfolio_category";
  ALTER TABLE "galleries" DROP COLUMN "show_on_portfolio";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_portfolio_category";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_show_on_portfolio";
  DROP TYPE "public"."enum_galleries_portfolio_category";
  DROP TYPE "public"."enum__galleries_v_version_portfolio_category";
  DROP TYPE "public"."enum_gallery_page_hero_content_filters_category";
  DROP TYPE "public"."enum_gallery_page_hero_content_default_filter";
  DROP TYPE "public"."enum_gallery_page_status";
  DROP TYPE "public"."enum__gallery_page_v_version_hero_content_filters_category";
  DROP TYPE "public"."enum__gallery_page_v_version_hero_content_default_filter";
  DROP TYPE "public"."enum__gallery_page_v_version_status";
  DROP TYPE "public"."enum__gallery_page_v_published_locale";`)
}
