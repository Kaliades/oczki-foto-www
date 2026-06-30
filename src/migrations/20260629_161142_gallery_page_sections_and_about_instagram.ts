import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page_instagram_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"crop_class_name" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "_about_page_v_version_instagram_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"crop_class_name" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "gallery_page_faq_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_gallery_page_v_version_faq_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"question" varchar,
  	"answer" varchar
  );
  
  ALTER TABLE "about_page" ADD COLUMN "instagram_avatar_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "instagram_avatar_alt" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_instagram_avatar_id" integer;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_instagram_avatar_alt" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "ease_section_heading_start" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "ease_section_heading_emphasis" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "ease_section_body" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "ease_section_photo_id" integer;
  ALTER TABLE "gallery_page" ADD COLUMN "ease_section_photo_alt" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "faq_section_heading_emphasis" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "faq_section_heading_start" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "faq_section_intro" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "cta_section_heading_start" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "cta_section_heading_emphasis" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "cta_section_heading_end" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "cta_section_body" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "cta_section_button_label" varchar;
  ALTER TABLE "gallery_page" ADD COLUMN "cta_section_button_url" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_ease_section_heading_start" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_ease_section_heading_emphasis" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_ease_section_body" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_ease_section_photo_id" integer;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_ease_section_photo_alt" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_faq_section_heading_emphasis" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_faq_section_heading_start" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_faq_section_intro" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_cta_section_heading_start" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_cta_section_heading_emphasis" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_cta_section_heading_end" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_cta_section_body" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_cta_section_button_label" varchar;
  ALTER TABLE "_gallery_page_v" ADD COLUMN "version_cta_section_button_url" varchar;
  ALTER TABLE "about_page_instagram_posts" ADD CONSTRAINT "about_page_instagram_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_instagram_posts" ADD CONSTRAINT "about_page_instagram_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_instagram_posts" ADD CONSTRAINT "_about_page_v_version_instagram_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_instagram_posts" ADD CONSTRAINT "_about_page_v_version_instagram_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_page_faq_section_items" ADD CONSTRAINT "gallery_page_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_page_v_version_faq_section_items" ADD CONSTRAINT "_gallery_page_v_version_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_instagram_posts_order_idx" ON "about_page_instagram_posts" USING btree ("_order");
  CREATE INDEX "about_page_instagram_posts_parent_id_idx" ON "about_page_instagram_posts" USING btree ("_parent_id");
  CREATE INDEX "about_page_instagram_posts_image_idx" ON "about_page_instagram_posts" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_instagram_posts_order_idx" ON "_about_page_v_version_instagram_posts" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_instagram_posts_parent_id_idx" ON "_about_page_v_version_instagram_posts" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_instagram_posts_image_idx" ON "_about_page_v_version_instagram_posts" USING btree ("image_id");
  CREATE INDEX "gallery_page_faq_section_items_order_idx" ON "gallery_page_faq_section_items" USING btree ("_order");
  CREATE INDEX "gallery_page_faq_section_items_parent_id_idx" ON "gallery_page_faq_section_items" USING btree ("_parent_id");
  CREATE INDEX "_gallery_page_v_version_faq_section_items_order_idx" ON "_gallery_page_v_version_faq_section_items" USING btree ("_order");
  CREATE INDEX "_gallery_page_v_version_faq_section_items_parent_id_idx" ON "_gallery_page_v_version_faq_section_items" USING btree ("_parent_id");
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_instagram_avatar_id_media_id_fk" FOREIGN KEY ("instagram_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_instagram_avatar_id_media_id_fk" FOREIGN KEY ("version_instagram_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page" ADD CONSTRAINT "gallery_page_ease_section_photo_id_media_id_fk" FOREIGN KEY ("ease_section_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_page_v" ADD CONSTRAINT "_gallery_page_v_version_ease_section_photo_id_media_id_fk" FOREIGN KEY ("version_ease_section_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_instagram_instagram_avatar_idx" ON "about_page" USING btree ("instagram_avatar_id");
  CREATE INDEX "_about_page_v_version_instagram_version_instagram_avatar_idx" ON "_about_page_v" USING btree ("version_instagram_avatar_id");
  CREATE INDEX "gallery_page_ease_section_ease_section_photo_idx" ON "gallery_page" USING btree ("ease_section_photo_id");
  CREATE INDEX "_gallery_page_v_version_ease_section_version_ease_sectio_idx" ON "_gallery_page_v" USING btree ("version_ease_section_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page_instagram_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_instagram_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_faq_section_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_page_v_version_faq_section_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_instagram_posts" CASCADE;
  DROP TABLE "_about_page_v_version_instagram_posts" CASCADE;
  DROP TABLE "gallery_page_faq_section_items" CASCADE;
  DROP TABLE "_gallery_page_v_version_faq_section_items" CASCADE;
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_instagram_avatar_id_media_id_fk";
  
  ALTER TABLE "_about_page_v" DROP CONSTRAINT "_about_page_v_version_instagram_avatar_id_media_id_fk";
  
  ALTER TABLE "gallery_page" DROP CONSTRAINT "gallery_page_ease_section_photo_id_media_id_fk";
  
  ALTER TABLE "_gallery_page_v" DROP CONSTRAINT "_gallery_page_v_version_ease_section_photo_id_media_id_fk";
  
  DROP INDEX "about_page_instagram_instagram_avatar_idx";
  DROP INDEX "_about_page_v_version_instagram_version_instagram_avatar_idx";
  DROP INDEX "gallery_page_ease_section_ease_section_photo_idx";
  DROP INDEX "_gallery_page_v_version_ease_section_version_ease_sectio_idx";
  ALTER TABLE "about_page" DROP COLUMN "instagram_avatar_id";
  ALTER TABLE "about_page" DROP COLUMN "instagram_avatar_alt";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_instagram_avatar_id";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_instagram_avatar_alt";
  ALTER TABLE "gallery_page" DROP COLUMN "ease_section_heading_start";
  ALTER TABLE "gallery_page" DROP COLUMN "ease_section_heading_emphasis";
  ALTER TABLE "gallery_page" DROP COLUMN "ease_section_body";
  ALTER TABLE "gallery_page" DROP COLUMN "ease_section_photo_id";
  ALTER TABLE "gallery_page" DROP COLUMN "ease_section_photo_alt";
  ALTER TABLE "gallery_page" DROP COLUMN "faq_section_heading_emphasis";
  ALTER TABLE "gallery_page" DROP COLUMN "faq_section_heading_start";
  ALTER TABLE "gallery_page" DROP COLUMN "faq_section_intro";
  ALTER TABLE "gallery_page" DROP COLUMN "cta_section_heading_start";
  ALTER TABLE "gallery_page" DROP COLUMN "cta_section_heading_emphasis";
  ALTER TABLE "gallery_page" DROP COLUMN "cta_section_heading_end";
  ALTER TABLE "gallery_page" DROP COLUMN "cta_section_body";
  ALTER TABLE "gallery_page" DROP COLUMN "cta_section_button_label";
  ALTER TABLE "gallery_page" DROP COLUMN "cta_section_button_url";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_ease_section_heading_start";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_ease_section_heading_emphasis";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_ease_section_body";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_ease_section_photo_id";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_ease_section_photo_alt";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_faq_section_heading_emphasis";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_faq_section_heading_start";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_faq_section_intro";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_cta_section_heading_start";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_cta_section_heading_emphasis";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_cta_section_heading_end";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_cta_section_body";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_cta_section_button_label";
  ALTER TABLE "_gallery_page_v" DROP COLUMN "version_cta_section_button_url";`)
}
