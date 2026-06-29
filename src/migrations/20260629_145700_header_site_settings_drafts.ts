import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_published_locale" AS ENUM('pl');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_socials_platform" AS ENUM('instagram', 'facebook', 'tiktok', 'pinterest', 'youtube', 'weselezklasa', 'other');
  CREATE TYPE "public"."enum__site_settings_v_version_service_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__site_settings_v_version_page_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__site_settings_v_version_newsletter_privacy_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('pl');
  CREATE TABLE "_header_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__header_v_version_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"with_dropdown_icon" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_cta_label" varchar DEFAULT 'Umów sesję',
  	"version_cta_url" varchar DEFAULT '/kontakt',
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__header_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_site_settings_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_socials_platform",
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_service_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__site_settings_v_version_service_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum__site_settings_v_version_page_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_default_og_image_id" integer,
  	"version_default_og_image_alt" varchar,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_locations_label" varchar,
  	"version_inquiry_defaults_label" varchar DEFAULT 'Pogadajmy',
  	"version_inquiry_defaults_url" varchar DEFAULT '/kontakt',
  	"version_newsletter_heading_plain" varchar,
  	"version_newsletter_heading_emphasis" varchar,
  	"version_newsletter_heading_plain_end" varchar,
  	"version_newsletter_intro" varchar,
  	"version_newsletter_submit_label" varchar,
  	"version_newsletter_privacy_link_type" "enum__site_settings_v_version_newsletter_privacy_link_type" DEFAULT 'reference',
  	"version_newsletter_privacy_link_new_tab" boolean,
  	"version_newsletter_privacy_link_url" varchar,
  	"version_newsletter_privacy_link_label" varchar,
  	"version_newsletter_photo_id" integer,
  	"version_newsletter_photo_alt" varchar,
  	"version_copyright" varchar,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_settings_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_settings_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "platform" DROP NOT NULL;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "site_settings_service_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "site_settings_page_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "site_settings_gallery_images" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "site_settings_gallery_images" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "newsletter_privacy_link_label" DROP NOT NULL;
  ALTER TABLE "header" ADD COLUMN "_status" "enum_header_status" DEFAULT 'draft';
  ALTER TABLE "site_settings" ADD COLUMN "default_og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "default_og_image_alt" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "_status" "enum_site_settings_status" DEFAULT 'draft';
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_socials" ADD CONSTRAINT "_site_settings_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_service_links" ADD CONSTRAINT "_site_settings_v_version_service_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_page_links" ADD CONSTRAINT "_site_settings_v_version_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_gallery_images" ADD CONSTRAINT "_site_settings_v_version_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_gallery_images" ADD CONSTRAINT "_site_settings_v_version_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_newsletter_photo_id_media_id_fk" FOREIGN KEY ("version_newsletter_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_rels" ADD CONSTRAINT "_site_settings_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_rels" ADD CONSTRAINT "_site_settings_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_rels" ADD CONSTRAINT "_site_settings_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_snapshot_idx" ON "_header_v" USING btree ("snapshot");
  CREATE INDEX "_header_v_published_locale_idx" ON "_header_v" USING btree ("published_locale");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "_header_v_autosave_idx" ON "_header_v" USING btree ("autosave");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_pages_id_idx" ON "_header_v_rels" USING btree ("pages_id");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id");
  CREATE INDEX "_site_settings_v_version_socials_order_idx" ON "_site_settings_v_version_socials" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_socials_parent_id_idx" ON "_site_settings_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_service_links_order_idx" ON "_site_settings_v_version_service_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_service_links_parent_id_idx" ON "_site_settings_v_version_service_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_page_links_order_idx" ON "_site_settings_v_version_page_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_page_links_parent_id_idx" ON "_site_settings_v_version_page_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_gallery_images_order_idx" ON "_site_settings_v_version_gallery_images" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_gallery_images_parent_id_idx" ON "_site_settings_v_version_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_gallery_images_image_idx" ON "_site_settings_v_version_gallery_images" USING btree ("image_id");
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_version_newsletter_version_newsletter_p_idx" ON "_site_settings_v" USING btree ("version_newsletter_photo_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");
  CREATE INDEX "_site_settings_v_rels_order_idx" ON "_site_settings_v_rels" USING btree ("order");
  CREATE INDEX "_site_settings_v_rels_parent_idx" ON "_site_settings_v_rels" USING btree ("parent_id");
  CREATE INDEX "_site_settings_v_rels_path_idx" ON "_site_settings_v_rels" USING btree ("path");
  CREATE INDEX "_site_settings_v_rels_pages_id_idx" ON "_site_settings_v_rels" USING btree ("pages_id");
  CREATE INDEX "_site_settings_v_rels_posts_id_idx" ON "_site_settings_v_rels" USING btree ("posts_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_header_v_version_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_service_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_page_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "_site_settings_v_version_socials" CASCADE;
  DROP TABLE "_site_settings_v_version_service_links" CASCADE;
  DROP TABLE "_site_settings_v_version_page_links" CASCADE;
  DROP TABLE "_site_settings_v_version_gallery_images" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_rels" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_default_og_image_id_media_id_fk";
  
  DROP INDEX "header__status_idx";
  DROP INDEX "site_settings_default_og_image_idx";
  DROP INDEX "site_settings__status_idx";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "platform" SET NOT NULL;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "site_settings_socials" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "site_settings_service_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "site_settings_page_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "site_settings_gallery_images" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "site_settings_gallery_images" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "newsletter_privacy_link_label" SET NOT NULL;
  ALTER TABLE "header" DROP COLUMN "_status";
  ALTER TABLE "site_settings" DROP COLUMN "default_og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "default_og_image_alt";
  ALTER TABLE "site_settings" DROP COLUMN "_status";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_nav_items_link_type";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum__header_v_published_locale";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_socials_platform";
  DROP TYPE "public"."enum__site_settings_v_version_service_links_link_type";
  DROP TYPE "public"."enum__site_settings_v_version_page_links_link_type";
  DROP TYPE "public"."enum__site_settings_v_version_newsletter_privacy_link_type";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum__site_settings_v_published_locale";`)
}
