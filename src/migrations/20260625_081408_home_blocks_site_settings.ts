import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_home_about_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_home_instagram_profile_profile_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_home_cta_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_home_about_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_home_instagram_profile_profile_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_home_cta_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_service_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_page_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_newsletter_privacy_link_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_site_settings_socials_platform" ADD VALUE IF NOT EXISTS 'weselezklasa' BEFORE 'other';
  CREATE TABLE "pages_blocks_home_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_start" varchar,
  	"heading_emphasis" varchar,
  	"heading_end" varchar,
  	"paragraph_one" varchar,
  	"paragraph_two" varchar,
  	"portrait_id" integer,
  	"portrait_alt" varchar,
  	"cta_type" "enum_pages_blocks_home_about_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_instagram_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"href" varchar,
  	"crop_class_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_instagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_plain" varchar,
  	"heading_emphasis" varchar,
  	"profile_avatar_id" integer,
  	"profile_avatar_alt" varchar,
  	"profile_profile_link_type" "enum_pages_blocks_home_instagram_profile_profile_link_type" DEFAULT 'reference',
  	"profile_profile_link_new_tab" boolean,
  	"profile_profile_link_url" varchar,
  	"profile_profile_link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_plain" varchar,
  	"heading_emphasis" varchar,
  	"body" varchar,
  	"cta_type" "enum_pages_blocks_home_cta_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_start" varchar,
  	"heading_emphasis" varchar,
  	"heading_end" varchar,
  	"paragraph_one" varchar,
  	"paragraph_two" varchar,
  	"portrait_id" integer,
  	"portrait_alt" varchar,
  	"cta_type" "enum__pages_v_blocks_home_about_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_instagram_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"href" varchar,
  	"crop_class_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_instagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_plain" varchar,
  	"heading_emphasis" varchar,
  	"profile_avatar_id" integer,
  	"profile_avatar_alt" varchar,
  	"profile_profile_link_type" "enum__pages_v_blocks_home_instagram_profile_profile_link_type" DEFAULT 'reference',
  	"profile_profile_link_new_tab" boolean,
  	"profile_profile_link_url" varchar,
  	"profile_profile_link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_plain" varchar,
  	"heading_emphasis" varchar,
  	"body" varchar,
  	"cta_type" "enum__pages_v_blocks_home_cta_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"cta_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_settings_service_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_site_settings_service_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_site_settings_page_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_heading_plain" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_heading_emphasis" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_heading_plain_end" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_intro" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_submit_label" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_privacy_link_type" "enum_site_settings_newsletter_privacy_link_type" DEFAULT 'reference';
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_privacy_link_new_tab" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_privacy_link_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_privacy_link_label" varchar NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_photo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "newsletter_photo_alt" varchar;
  ALTER TABLE "pages_blocks_home_about" ADD CONSTRAINT "pages_blocks_home_about_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_about" ADD CONSTRAINT "pages_blocks_home_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_instagram_posts" ADD CONSTRAINT "pages_blocks_home_instagram_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_instagram_posts" ADD CONSTRAINT "pages_blocks_home_instagram_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_instagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_instagram" ADD CONSTRAINT "pages_blocks_home_instagram_profile_avatar_id_media_id_fk" FOREIGN KEY ("profile_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_instagram" ADD CONSTRAINT "pages_blocks_home_instagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_cta" ADD CONSTRAINT "pages_blocks_home_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_about" ADD CONSTRAINT "_pages_v_blocks_home_about_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_about" ADD CONSTRAINT "_pages_v_blocks_home_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_instagram_posts" ADD CONSTRAINT "_pages_v_blocks_home_instagram_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_instagram_posts" ADD CONSTRAINT "_pages_v_blocks_home_instagram_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_instagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_instagram" ADD CONSTRAINT "_pages_v_blocks_home_instagram_profile_avatar_id_media_id_fk" FOREIGN KEY ("profile_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_instagram" ADD CONSTRAINT "_pages_v_blocks_home_instagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_cta" ADD CONSTRAINT "_pages_v_blocks_home_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_service_links" ADD CONSTRAINT "site_settings_service_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_page_links" ADD CONSTRAINT "site_settings_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_gallery_images" ADD CONSTRAINT "site_settings_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_gallery_images" ADD CONSTRAINT "site_settings_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_rels" ADD CONSTRAINT "site_settings_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_about_order_idx" ON "pages_blocks_home_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_about_parent_id_idx" ON "pages_blocks_home_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_about_path_idx" ON "pages_blocks_home_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_about_portrait_idx" ON "pages_blocks_home_about" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_home_instagram_posts_order_idx" ON "pages_blocks_home_instagram_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_instagram_posts_parent_id_idx" ON "pages_blocks_home_instagram_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_instagram_posts_image_idx" ON "pages_blocks_home_instagram_posts" USING btree ("image_id");
  CREATE INDEX "pages_blocks_home_instagram_order_idx" ON "pages_blocks_home_instagram" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_instagram_parent_id_idx" ON "pages_blocks_home_instagram" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_instagram_path_idx" ON "pages_blocks_home_instagram" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_instagram_profile_profile_avatar_idx" ON "pages_blocks_home_instagram" USING btree ("profile_avatar_id");
  CREATE INDEX "pages_blocks_home_cta_order_idx" ON "pages_blocks_home_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_cta_parent_id_idx" ON "pages_blocks_home_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_cta_path_idx" ON "pages_blocks_home_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_about_order_idx" ON "_pages_v_blocks_home_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_about_parent_id_idx" ON "_pages_v_blocks_home_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_about_path_idx" ON "_pages_v_blocks_home_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_about_portrait_idx" ON "_pages_v_blocks_home_about" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_home_instagram_posts_order_idx" ON "_pages_v_blocks_home_instagram_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_instagram_posts_parent_id_idx" ON "_pages_v_blocks_home_instagram_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_instagram_posts_image_idx" ON "_pages_v_blocks_home_instagram_posts" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_home_instagram_order_idx" ON "_pages_v_blocks_home_instagram" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_instagram_parent_id_idx" ON "_pages_v_blocks_home_instagram" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_instagram_path_idx" ON "_pages_v_blocks_home_instagram" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_instagram_profile_profile_avatar_idx" ON "_pages_v_blocks_home_instagram" USING btree ("profile_avatar_id");
  CREATE INDEX "_pages_v_blocks_home_cta_order_idx" ON "_pages_v_blocks_home_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_cta_parent_id_idx" ON "_pages_v_blocks_home_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_cta_path_idx" ON "_pages_v_blocks_home_cta" USING btree ("_path");
  CREATE INDEX "site_settings_service_links_order_idx" ON "site_settings_service_links" USING btree ("_order");
  CREATE INDEX "site_settings_service_links_parent_id_idx" ON "site_settings_service_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_page_links_order_idx" ON "site_settings_page_links" USING btree ("_order");
  CREATE INDEX "site_settings_page_links_parent_id_idx" ON "site_settings_page_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_gallery_images_order_idx" ON "site_settings_gallery_images" USING btree ("_order");
  CREATE INDEX "site_settings_gallery_images_parent_id_idx" ON "site_settings_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "site_settings_gallery_images_image_idx" ON "site_settings_gallery_images" USING btree ("image_id");
  CREATE INDEX "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
  CREATE INDEX "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
  CREATE INDEX "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
  CREATE INDEX "site_settings_rels_pages_id_idx" ON "site_settings_rels" USING btree ("pages_id");
  CREATE INDEX "site_settings_rels_posts_id_idx" ON "site_settings_rels" USING btree ("posts_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_newsletter_photo_id_media_id_fk" FOREIGN KEY ("newsletter_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_newsletter_newsletter_photo_idx" ON "site_settings" USING btree ("newsletter_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_home_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_home_instagram_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_home_instagram" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_home_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_instagram_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_instagram" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_service_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_page_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_home_about" CASCADE;
  DROP TABLE "pages_blocks_home_instagram_posts" CASCADE;
  DROP TABLE "pages_blocks_home_instagram" CASCADE;
  DROP TABLE "pages_blocks_home_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_home_about" CASCADE;
  DROP TABLE "_pages_v_blocks_home_instagram_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_home_instagram" CASCADE;
  DROP TABLE "_pages_v_blocks_home_cta" CASCADE;
  DROP TABLE "site_settings_service_links" CASCADE;
  DROP TABLE "site_settings_page_links" CASCADE;
  DROP TABLE "site_settings_gallery_images" CASCADE;
  DROP TABLE "site_settings_rels" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_newsletter_photo_id_media_id_fk";
  
  ALTER TABLE "site_settings_socials" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_site_settings_socials_platform";
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('instagram', 'facebook', 'tiktok', 'pinterest', 'youtube', 'other');
  ALTER TABLE "site_settings_socials" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_site_settings_socials_platform" USING "platform"::"public"."enum_site_settings_socials_platform";
  DROP INDEX "site_settings_newsletter_newsletter_photo_idx";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_heading_plain";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_heading_emphasis";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_heading_plain_end";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_intro";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_submit_label";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_privacy_link_type";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_privacy_link_new_tab";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_privacy_link_url";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_privacy_link_label";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_photo_id";
  ALTER TABLE "site_settings" DROP COLUMN "newsletter_photo_alt";
  DROP TYPE "public"."enum_pages_blocks_home_about_cta_type";
  DROP TYPE "public"."enum_pages_blocks_home_instagram_profile_profile_link_type";
  DROP TYPE "public"."enum_pages_blocks_home_cta_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_home_about_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_home_instagram_profile_profile_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_home_cta_cta_type";
  DROP TYPE "public"."enum_site_settings_service_links_link_type";
  DROP TYPE "public"."enum_site_settings_page_links_link_type";
  DROP TYPE "public"."enum_site_settings_newsletter_privacy_link_type";`)
}
