import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "galleries_details_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "galleries_duo_perspective_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "galleries_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"photo_id" integer,
  	"photo_alt" varchar
  );
  
  CREATE TABLE "_galleries_v_version_details_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_galleries_v_version_duo_perspective_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_galleries_v_version_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"photo_id" integer,
  	"photo_alt" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "galleries" ADD COLUMN "hero_heading_lead" varchar;
  ALTER TABLE "galleries" ADD COLUMN "hero_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "hero_heading_end" varchar;
  ALTER TABLE "galleries" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "galleries" ADD COLUMN "hero_background_image_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "hero_background_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "details_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN "details_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "duo_perspective_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN "duo_perspective_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "duo_perspective_lead_paragraph" varchar;
  ALTER TABLE "galleries" ADD COLUMN "duo_perspective_callout" varchar;
  ALTER TABLE "galleries" ADD COLUMN "duo_perspective_photo_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "duo_perspective_photo_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_body" varchar;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_back_image_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_back_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_front_image_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_front_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_scallop_image_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "venue_story_scallop_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "photo_gallery_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN "photo_gallery_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "photo_gallery_heading_end" varchar;
  ALTER TABLE "galleries" ADD COLUMN "photo_gallery_load_more_label" varchar;
  ALTER TABLE "galleries" ADD COLUMN "testimonial_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN "testimonial_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "memorable_moment_title" varchar;
  ALTER TABLE "galleries" ADD COLUMN "memorable_moment_body" varchar;
  ALTER TABLE "galleries" ADD COLUMN "memorable_moment_portrait_photo_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "memorable_moment_portrait_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "memorable_moment_landscape_photo_id" integer;
  ALTER TABLE "galleries" ADD COLUMN "memorable_moment_landscape_alt" varchar;
  ALTER TABLE "galleries" ADD COLUMN "closing_cta_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN "closing_cta_heading_emphasis" varchar;
  ALTER TABLE "galleries" ADD COLUMN "closing_cta_heading_end" varchar;
  ALTER TABLE "galleries" ADD COLUMN "closing_cta_body" varchar;
  ALTER TABLE "galleries" ADD COLUMN "closing_cta_cta_label" varchar DEFAULT 'Opowiedz też naszą historię';
  ALTER TABLE "galleries" ADD COLUMN "closing_cta_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "_galleries_v" ADD COLUMN "version_hero_heading_lead" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_hero_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_hero_heading_end" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_hero_description" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_hero_background_image_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_hero_background_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_details_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_details_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_duo_perspective_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_duo_perspective_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_duo_perspective_lead_paragraph" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_duo_perspective_callout" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_duo_perspective_photo_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_duo_perspective_photo_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_body" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_back_image_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_back_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_front_image_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_front_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_scallop_image_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_venue_story_scallop_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_photo_gallery_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_photo_gallery_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_photo_gallery_heading_end" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_photo_gallery_load_more_label" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_testimonial_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_testimonial_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_memorable_moment_title" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_memorable_moment_body" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_memorable_moment_portrait_photo_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_memorable_moment_portrait_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_memorable_moment_landscape_photo_id" integer;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_memorable_moment_landscape_alt" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_closing_cta_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_closing_cta_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_closing_cta_heading_end" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_closing_cta_body" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN "version_closing_cta_cta_label" varchar DEFAULT 'Opowiedz też naszą historię';
  ALTER TABLE "_galleries_v" ADD COLUMN "version_closing_cta_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "galleries_details_items" ADD CONSTRAINT "galleries_details_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_duo_perspective_highlights" ADD CONSTRAINT "galleries_duo_perspective_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_testimonial_items" ADD CONSTRAINT "galleries_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries_testimonial_items" ADD CONSTRAINT "galleries_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_details_items" ADD CONSTRAINT "_galleries_v_version_details_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_duo_perspective_highlights" ADD CONSTRAINT "_galleries_v_version_duo_perspective_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_testimonial_items" ADD CONSTRAINT "_galleries_v_version_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v_version_testimonial_items" ADD CONSTRAINT "_galleries_v_version_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_galleries_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "galleries_details_items_order_idx" ON "galleries_details_items" USING btree ("_order");
  CREATE INDEX "galleries_details_items_parent_id_idx" ON "galleries_details_items" USING btree ("_parent_id");
  CREATE INDEX "galleries_duo_perspective_highlights_order_idx" ON "galleries_duo_perspective_highlights" USING btree ("_order");
  CREATE INDEX "galleries_duo_perspective_highlights_parent_id_idx" ON "galleries_duo_perspective_highlights" USING btree ("_parent_id");
  CREATE INDEX "galleries_testimonial_items_order_idx" ON "galleries_testimonial_items" USING btree ("_order");
  CREATE INDEX "galleries_testimonial_items_parent_id_idx" ON "galleries_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "galleries_testimonial_items_photo_idx" ON "galleries_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "_galleries_v_version_details_items_order_idx" ON "_galleries_v_version_details_items" USING btree ("_order");
  CREATE INDEX "_galleries_v_version_details_items_parent_id_idx" ON "_galleries_v_version_details_items" USING btree ("_parent_id");
  CREATE INDEX "_galleries_v_version_duo_perspective_highlights_order_idx" ON "_galleries_v_version_duo_perspective_highlights" USING btree ("_order");
  CREATE INDEX "_galleries_v_version_duo_perspective_highlights_parent_id_idx" ON "_galleries_v_version_duo_perspective_highlights" USING btree ("_parent_id");
  CREATE INDEX "_galleries_v_version_testimonial_items_order_idx" ON "_galleries_v_version_testimonial_items" USING btree ("_order");
  CREATE INDEX "_galleries_v_version_testimonial_items_parent_id_idx" ON "_galleries_v_version_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "_galleries_v_version_testimonial_items_photo_idx" ON "_galleries_v_version_testimonial_items" USING btree ("photo_id");
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_duo_perspective_photo_id_media_id_fk" FOREIGN KEY ("duo_perspective_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_venue_story_back_image_id_media_id_fk" FOREIGN KEY ("venue_story_back_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_venue_story_front_image_id_media_id_fk" FOREIGN KEY ("venue_story_front_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_venue_story_scallop_image_id_media_id_fk" FOREIGN KEY ("venue_story_scallop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_memorable_moment_portrait_photo_id_media_id_fk" FOREIGN KEY ("memorable_moment_portrait_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries" ADD CONSTRAINT "galleries_memorable_moment_landscape_photo_id_media_id_fk" FOREIGN KEY ("memorable_moment_landscape_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_duo_perspective_photo_id_media_id_fk" FOREIGN KEY ("version_duo_perspective_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_venue_story_back_image_id_media_id_fk" FOREIGN KEY ("version_venue_story_back_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_venue_story_front_image_id_media_id_fk" FOREIGN KEY ("version_venue_story_front_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_venue_story_scallop_image_id_media_id_fk" FOREIGN KEY ("version_venue_story_scallop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_memorable_moment_portrait_photo_id_media_id_fk" FOREIGN KEY ("version_memorable_moment_portrait_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galleries_v" ADD CONSTRAINT "_galleries_v_version_memorable_moment_landscape_photo_id_media_id_fk" FOREIGN KEY ("version_memorable_moment_landscape_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "galleries_hero_hero_background_image_idx" ON "galleries" USING btree ("hero_background_image_id");
  CREATE INDEX "galleries_duo_perspective_duo_perspective_photo_idx" ON "galleries" USING btree ("duo_perspective_photo_id");
  CREATE INDEX "galleries_venue_story_venue_story_back_image_idx" ON "galleries" USING btree ("venue_story_back_image_id");
  CREATE INDEX "galleries_venue_story_venue_story_front_image_idx" ON "galleries" USING btree ("venue_story_front_image_id");
  CREATE INDEX "galleries_venue_story_venue_story_scallop_image_idx" ON "galleries" USING btree ("venue_story_scallop_image_id");
  CREATE INDEX "galleries_memorable_moment_memorable_moment_portrait_pho_idx" ON "galleries" USING btree ("memorable_moment_portrait_photo_id");
  CREATE INDEX "galleries_memorable_moment_memorable_moment_landscape_ph_idx" ON "galleries" USING btree ("memorable_moment_landscape_photo_id");
  CREATE INDEX "_galleries_v_version_hero_version_hero_background_image_idx" ON "_galleries_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_galleries_v_version_duo_perspective_version_duo_perspec_idx" ON "_galleries_v" USING btree ("version_duo_perspective_photo_id");
  CREATE INDEX "_galleries_v_version_venue_story_version_venue_story_bac_idx" ON "_galleries_v" USING btree ("version_venue_story_back_image_id");
  CREATE INDEX "_galleries_v_version_venue_story_version_venue_story_fro_idx" ON "_galleries_v" USING btree ("version_venue_story_front_image_id");
  CREATE INDEX "_galleries_v_version_venue_story_version_venue_story_sca_idx" ON "_galleries_v" USING btree ("version_venue_story_scallop_image_id");
  CREATE INDEX "_galleries_v_version_memorable_moment_version_memorable__idx" ON "_galleries_v" USING btree ("version_memorable_moment_portrait_photo_id");
  CREATE INDEX "_galleries_v_version_memorable_moment_version_memorabl_1_idx" ON "_galleries_v" USING btree ("version_memorable_moment_landscape_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "galleries_details_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "galleries_duo_perspective_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "galleries_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_galleries_v_version_details_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_galleries_v_version_duo_perspective_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_galleries_v_version_testimonial_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "galleries_details_items" CASCADE;
  DROP TABLE "galleries_duo_perspective_highlights" CASCADE;
  DROP TABLE "galleries_testimonial_items" CASCADE;
  DROP TABLE "_galleries_v_version_details_items" CASCADE;
  DROP TABLE "_galleries_v_version_duo_perspective_highlights" CASCADE;
  DROP TABLE "_galleries_v_version_testimonial_items" CASCADE;
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_hero_background_image_id_media_id_fk";
  
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_duo_perspective_photo_id_media_id_fk";
  
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_venue_story_back_image_id_media_id_fk";
  
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_venue_story_front_image_id_media_id_fk";
  
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_venue_story_scallop_image_id_media_id_fk";
  
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_memorable_moment_portrait_photo_id_media_id_fk";
  
  ALTER TABLE "galleries" DROP CONSTRAINT "galleries_memorable_moment_landscape_photo_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_hero_background_image_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_duo_perspective_photo_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_venue_story_back_image_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_venue_story_front_image_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_venue_story_scallop_image_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_memorable_moment_portrait_photo_id_media_id_fk";
  
  ALTER TABLE "_galleries_v" DROP CONSTRAINT "_galleries_v_version_memorable_moment_landscape_photo_id_media_id_fk";
  
  DROP INDEX "galleries_hero_hero_background_image_idx";
  DROP INDEX "galleries_duo_perspective_duo_perspective_photo_idx";
  DROP INDEX "galleries_venue_story_venue_story_back_image_idx";
  DROP INDEX "galleries_venue_story_venue_story_front_image_idx";
  DROP INDEX "galleries_venue_story_venue_story_scallop_image_idx";
  DROP INDEX "galleries_memorable_moment_memorable_moment_portrait_pho_idx";
  DROP INDEX "galleries_memorable_moment_memorable_moment_landscape_ph_idx";
  DROP INDEX "_galleries_v_version_hero_version_hero_background_image_idx";
  DROP INDEX "_galleries_v_version_duo_perspective_version_duo_perspec_idx";
  DROP INDEX "_galleries_v_version_venue_story_version_venue_story_bac_idx";
  DROP INDEX "_galleries_v_version_venue_story_version_venue_story_fro_idx";
  DROP INDEX "_galleries_v_version_venue_story_version_venue_story_sca_idx";
  DROP INDEX "_galleries_v_version_memorable_moment_version_memorable__idx";
  DROP INDEX "_galleries_v_version_memorable_moment_version_memorabl_1_idx";
  ALTER TABLE "galleries" DROP COLUMN "hero_heading_lead";
  ALTER TABLE "galleries" DROP COLUMN "hero_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "hero_heading_end";
  ALTER TABLE "galleries" DROP COLUMN "hero_description";
  ALTER TABLE "galleries" DROP COLUMN "hero_background_image_id";
  ALTER TABLE "galleries" DROP COLUMN "hero_background_alt";
  ALTER TABLE "galleries" DROP COLUMN "details_heading_start";
  ALTER TABLE "galleries" DROP COLUMN "details_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "duo_perspective_heading_start";
  ALTER TABLE "galleries" DROP COLUMN "duo_perspective_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "duo_perspective_lead_paragraph";
  ALTER TABLE "galleries" DROP COLUMN "duo_perspective_callout";
  ALTER TABLE "galleries" DROP COLUMN "duo_perspective_photo_id";
  ALTER TABLE "galleries" DROP COLUMN "duo_perspective_photo_alt";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_heading_start";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_body";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_back_image_id";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_back_alt";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_front_image_id";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_front_alt";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_scallop_image_id";
  ALTER TABLE "galleries" DROP COLUMN "venue_story_scallop_alt";
  ALTER TABLE "galleries" DROP COLUMN "photo_gallery_heading_start";
  ALTER TABLE "galleries" DROP COLUMN "photo_gallery_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "photo_gallery_heading_end";
  ALTER TABLE "galleries" DROP COLUMN "photo_gallery_load_more_label";
  ALTER TABLE "galleries" DROP COLUMN "testimonial_heading_start";
  ALTER TABLE "galleries" DROP COLUMN "testimonial_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "memorable_moment_title";
  ALTER TABLE "galleries" DROP COLUMN "memorable_moment_body";
  ALTER TABLE "galleries" DROP COLUMN "memorable_moment_portrait_photo_id";
  ALTER TABLE "galleries" DROP COLUMN "memorable_moment_portrait_alt";
  ALTER TABLE "galleries" DROP COLUMN "memorable_moment_landscape_photo_id";
  ALTER TABLE "galleries" DROP COLUMN "memorable_moment_landscape_alt";
  ALTER TABLE "galleries" DROP COLUMN "closing_cta_heading_start";
  ALTER TABLE "galleries" DROP COLUMN "closing_cta_heading_emphasis";
  ALTER TABLE "galleries" DROP COLUMN "closing_cta_heading_end";
  ALTER TABLE "galleries" DROP COLUMN "closing_cta_body";
  ALTER TABLE "galleries" DROP COLUMN "closing_cta_cta_label";
  ALTER TABLE "galleries" DROP COLUMN "closing_cta_cta_url";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_hero_heading_lead";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_hero_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_hero_heading_end";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_hero_description";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_hero_background_image_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_hero_background_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_details_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_details_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_duo_perspective_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_duo_perspective_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_duo_perspective_lead_paragraph";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_duo_perspective_callout";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_duo_perspective_photo_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_duo_perspective_photo_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_body";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_back_image_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_back_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_front_image_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_front_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_scallop_image_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_venue_story_scallop_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_photo_gallery_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_photo_gallery_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_photo_gallery_heading_end";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_photo_gallery_load_more_label";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_testimonial_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_testimonial_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_memorable_moment_title";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_memorable_moment_body";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_memorable_moment_portrait_photo_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_memorable_moment_portrait_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_memorable_moment_landscape_photo_id";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_memorable_moment_landscape_alt";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_closing_cta_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_closing_cta_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_closing_cta_heading_end";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_closing_cta_body";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_closing_cta_cta_label";
  ALTER TABLE "_galleries_v" DROP COLUMN "version_closing_cta_cta_url";`)
}
