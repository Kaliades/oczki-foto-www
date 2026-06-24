import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "offer_items_approach_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "offer_items_packages_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "offer_items_packages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"price" varchar,
  	"badge_label" varchar
  );
  
  CREATE TABLE "offer_items_inclusions_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "offer_items_inclusions_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "offer_items_care_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "offer_items_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"photo_id" integer,
  	"photo_alt" varchar
  );
  
  CREATE TABLE "offer_items_process_steps_items_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "offer_items_process_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "offer_items_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"caption_title" varchar,
  	"caption_subtitle" varchar
  );
  
  CREATE TABLE "offer_items_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_approach_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_packages_items_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_packages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"price" varchar,
  	"badge_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_inclusions_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_inclusions_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_care_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"photo_id" integer,
  	"photo_alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_process_steps_items_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_process_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"caption_title" varchar,
  	"caption_subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_items_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "offer_items" ADD COLUMN "hero_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "hero_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "hero_cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "offer_items" ADD COLUMN "hero_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "offer_items" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "offer_items" ADD COLUMN "hero_image_alt" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "approach_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "approach_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "approach_heading_end" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "approach_intro_paragraph1" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "approach_intro_paragraph2" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "approach_portrait_image_id" integer;
  ALTER TABLE "offer_items" ADD COLUMN "approach_portrait_alt" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "packages_catalog_download_label" varchar DEFAULT 'Pobierz katalog';
  ALTER TABLE "offer_items" ADD COLUMN "packages_catalog_download_url" varchar DEFAULT '/katalog';
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_heading_end" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_intro" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_accordion_heading" varchar DEFAULT 'Dodatkowe informacje';
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_main_image_alt" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_scallop_image_alt" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "care_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "care_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "care_heading_end" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "care_intro" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "care_image_id" integer;
  ALTER TABLE "offer_items" ADD COLUMN "care_image_alt" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "care_cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "offer_items" ADD COLUMN "care_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "offer_items" ADD COLUMN "testimonial_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "testimonial_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "process_steps_heading_plain" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "process_steps_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "process_steps_intro" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "process_steps_cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "offer_items" ADD COLUMN "process_steps_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "offer_items" ADD COLUMN "gallery_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "gallery_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "gallery_description" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "gallery_cta_label" varchar DEFAULT 'Zobacz wszystkie zdjęcia';
  ALTER TABLE "offer_items" ADD COLUMN "gallery_cta_url" varchar DEFAULT '/galeria';
  ALTER TABLE "offer_items" ADD COLUMN "closing_cta_heading" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "closing_cta_body" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "closing_cta_cta_label" varchar DEFAULT 'Zarezerwuj czas dla siebie';
  ALTER TABLE "offer_items" ADD COLUMN "closing_cta_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "offer_items" ADD COLUMN "faq_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "faq_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN "faq_intro" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_description" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_hero_image_alt" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_heading_end" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_intro_paragraph1" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_intro_paragraph2" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_portrait_image_id" integer;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_approach_portrait_alt" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_packages_catalog_download_label" varchar DEFAULT 'Pobierz katalog';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_packages_catalog_download_url" varchar DEFAULT '/katalog';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_heading_end" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_intro" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_accordion_heading" varchar DEFAULT 'Dodatkowe informacje';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_main_image_alt" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_scallop_image_alt" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_heading_end" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_intro" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_image_id" integer;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_image_alt" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_care_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_testimonial_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_testimonial_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_process_steps_heading_plain" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_process_steps_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_process_steps_intro" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_process_steps_cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_process_steps_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_gallery_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_gallery_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_gallery_description" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_gallery_cta_label" varchar DEFAULT 'Zobacz wszystkie zdjęcia';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_gallery_cta_url" varchar DEFAULT '/galeria';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_closing_cta_heading" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_closing_cta_body" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_closing_cta_cta_label" varchar DEFAULT 'Zarezerwuj czas dla siebie';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_closing_cta_cta_url" varchar DEFAULT '/kontakt';
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_faq_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_faq_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_faq_intro" varchar;
  ALTER TABLE "offer_items_approach_blocks" ADD CONSTRAINT "offer_items_approach_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_packages_items_features" ADD CONSTRAINT "offer_items_packages_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items_packages_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_packages_items" ADD CONSTRAINT "offer_items_packages_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offer_items_packages_items" ADD CONSTRAINT "offer_items_packages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_inclusions_checklist" ADD CONSTRAINT "offer_items_inclusions_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_inclusions_accordion" ADD CONSTRAINT "offer_items_inclusions_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_care_features" ADD CONSTRAINT "offer_items_care_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_testimonial_items" ADD CONSTRAINT "offer_items_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offer_items_testimonial_items" ADD CONSTRAINT "offer_items_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_process_steps_items_paragraphs" ADD CONSTRAINT "offer_items_process_steps_items_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items_process_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_process_steps_items" ADD CONSTRAINT "offer_items_process_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_gallery_items" ADD CONSTRAINT "offer_items_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offer_items_gallery_items" ADD CONSTRAINT "offer_items_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_items_faq_items" ADD CONSTRAINT "offer_items_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_approach_blocks" ADD CONSTRAINT "_offer_items_v_version_approach_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_packages_items_features" ADD CONSTRAINT "_offer_items_v_version_packages_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v_version_packages_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_packages_items" ADD CONSTRAINT "_offer_items_v_version_packages_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_packages_items" ADD CONSTRAINT "_offer_items_v_version_packages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_inclusions_checklist" ADD CONSTRAINT "_offer_items_v_version_inclusions_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_inclusions_accordion" ADD CONSTRAINT "_offer_items_v_version_inclusions_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_care_features" ADD CONSTRAINT "_offer_items_v_version_care_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_testimonial_items" ADD CONSTRAINT "_offer_items_v_version_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_testimonial_items" ADD CONSTRAINT "_offer_items_v_version_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_process_steps_items_paragraphs" ADD CONSTRAINT "_offer_items_v_version_process_steps_items_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v_version_process_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_process_steps_items" ADD CONSTRAINT "_offer_items_v_version_process_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_gallery_items" ADD CONSTRAINT "_offer_items_v_version_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_gallery_items" ADD CONSTRAINT "_offer_items_v_version_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_items_v_version_faq_items" ADD CONSTRAINT "_offer_items_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "offer_items_approach_blocks_order_idx" ON "offer_items_approach_blocks" USING btree ("_order");
  CREATE INDEX "offer_items_approach_blocks_parent_id_idx" ON "offer_items_approach_blocks" USING btree ("_parent_id");
  CREATE INDEX "offer_items_packages_items_features_order_idx" ON "offer_items_packages_items_features" USING btree ("_order");
  CREATE INDEX "offer_items_packages_items_features_parent_id_idx" ON "offer_items_packages_items_features" USING btree ("_parent_id");
  CREATE INDEX "offer_items_packages_items_order_idx" ON "offer_items_packages_items" USING btree ("_order");
  CREATE INDEX "offer_items_packages_items_parent_id_idx" ON "offer_items_packages_items" USING btree ("_parent_id");
  CREATE INDEX "offer_items_packages_items_image_idx" ON "offer_items_packages_items" USING btree ("image_id");
  CREATE INDEX "offer_items_inclusions_checklist_order_idx" ON "offer_items_inclusions_checklist" USING btree ("_order");
  CREATE INDEX "offer_items_inclusions_checklist_parent_id_idx" ON "offer_items_inclusions_checklist" USING btree ("_parent_id");
  CREATE INDEX "offer_items_inclusions_accordion_order_idx" ON "offer_items_inclusions_accordion" USING btree ("_order");
  CREATE INDEX "offer_items_inclusions_accordion_parent_id_idx" ON "offer_items_inclusions_accordion" USING btree ("_parent_id");
  CREATE INDEX "offer_items_care_features_order_idx" ON "offer_items_care_features" USING btree ("_order");
  CREATE INDEX "offer_items_care_features_parent_id_idx" ON "offer_items_care_features" USING btree ("_parent_id");
  CREATE INDEX "offer_items_testimonial_items_order_idx" ON "offer_items_testimonial_items" USING btree ("_order");
  CREATE INDEX "offer_items_testimonial_items_parent_id_idx" ON "offer_items_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "offer_items_testimonial_items_photo_idx" ON "offer_items_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "offer_items_process_steps_items_paragraphs_order_idx" ON "offer_items_process_steps_items_paragraphs" USING btree ("_order");
  CREATE INDEX "offer_items_process_steps_items_paragraphs_parent_id_idx" ON "offer_items_process_steps_items_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "offer_items_process_steps_items_order_idx" ON "offer_items_process_steps_items" USING btree ("_order");
  CREATE INDEX "offer_items_process_steps_items_parent_id_idx" ON "offer_items_process_steps_items" USING btree ("_parent_id");
  CREATE INDEX "offer_items_gallery_items_order_idx" ON "offer_items_gallery_items" USING btree ("_order");
  CREATE INDEX "offer_items_gallery_items_parent_id_idx" ON "offer_items_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "offer_items_gallery_items_image_idx" ON "offer_items_gallery_items" USING btree ("image_id");
  CREATE INDEX "offer_items_faq_items_order_idx" ON "offer_items_faq_items" USING btree ("_order");
  CREATE INDEX "offer_items_faq_items_parent_id_idx" ON "offer_items_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_approach_blocks_order_idx" ON "_offer_items_v_version_approach_blocks" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_approach_blocks_parent_id_idx" ON "_offer_items_v_version_approach_blocks" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_packages_items_features_order_idx" ON "_offer_items_v_version_packages_items_features" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_packages_items_features_parent_id_idx" ON "_offer_items_v_version_packages_items_features" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_packages_items_order_idx" ON "_offer_items_v_version_packages_items" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_packages_items_parent_id_idx" ON "_offer_items_v_version_packages_items" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_packages_items_image_idx" ON "_offer_items_v_version_packages_items" USING btree ("image_id");
  CREATE INDEX "_offer_items_v_version_inclusions_checklist_order_idx" ON "_offer_items_v_version_inclusions_checklist" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_inclusions_checklist_parent_id_idx" ON "_offer_items_v_version_inclusions_checklist" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_inclusions_accordion_order_idx" ON "_offer_items_v_version_inclusions_accordion" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_inclusions_accordion_parent_id_idx" ON "_offer_items_v_version_inclusions_accordion" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_care_features_order_idx" ON "_offer_items_v_version_care_features" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_care_features_parent_id_idx" ON "_offer_items_v_version_care_features" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_testimonial_items_order_idx" ON "_offer_items_v_version_testimonial_items" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_testimonial_items_parent_id_idx" ON "_offer_items_v_version_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_testimonial_items_photo_idx" ON "_offer_items_v_version_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "_offer_items_v_version_process_steps_items_paragraphs_order_idx" ON "_offer_items_v_version_process_steps_items_paragraphs" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_process_steps_items_paragraphs_parent_id_idx" ON "_offer_items_v_version_process_steps_items_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_process_steps_items_order_idx" ON "_offer_items_v_version_process_steps_items" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_process_steps_items_parent_id_idx" ON "_offer_items_v_version_process_steps_items" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_gallery_items_order_idx" ON "_offer_items_v_version_gallery_items" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_gallery_items_parent_id_idx" ON "_offer_items_v_version_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_offer_items_v_version_gallery_items_image_idx" ON "_offer_items_v_version_gallery_items" USING btree ("image_id");
  CREATE INDEX "_offer_items_v_version_faq_items_order_idx" ON "_offer_items_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_offer_items_v_version_faq_items_parent_id_idx" ON "_offer_items_v_version_faq_items" USING btree ("_parent_id");
  ALTER TABLE "offer_items" ADD CONSTRAINT "offer_items_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offer_items" ADD CONSTRAINT "offer_items_approach_portrait_image_id_media_id_fk" FOREIGN KEY ("approach_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offer_items" ADD CONSTRAINT "offer_items_care_image_id_media_id_fk" FOREIGN KEY ("care_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v" ADD CONSTRAINT "_offer_items_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v" ADD CONSTRAINT "_offer_items_v_version_approach_portrait_image_id_media_id_fk" FOREIGN KEY ("version_approach_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v" ADD CONSTRAINT "_offer_items_v_version_care_image_id_media_id_fk" FOREIGN KEY ("version_care_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "offer_items_hero_hero_image_idx" ON "offer_items" USING btree ("hero_image_id");
  CREATE INDEX "offer_items_approach_approach_portrait_image_idx" ON "offer_items" USING btree ("approach_portrait_image_id");
  CREATE INDEX "offer_items_care_care_image_idx" ON "offer_items" USING btree ("care_image_id");
  CREATE INDEX "_offer_items_v_version_hero_version_hero_image_idx" ON "_offer_items_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_offer_items_v_version_approach_version_approach_portrai_idx" ON "_offer_items_v" USING btree ("version_approach_portrait_image_id");
  CREATE INDEX "_offer_items_v_version_care_version_care_image_idx" ON "_offer_items_v" USING btree ("version_care_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "offer_items_approach_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_packages_items_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_packages_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_inclusions_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_inclusions_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_care_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_process_steps_items_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_process_steps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offer_items_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_approach_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_packages_items_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_packages_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_inclusions_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_inclusions_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_care_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_process_steps_items_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_process_steps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_offer_items_v_version_faq_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "offer_items_approach_blocks" CASCADE;
  DROP TABLE "offer_items_packages_items_features" CASCADE;
  DROP TABLE "offer_items_packages_items" CASCADE;
  DROP TABLE "offer_items_inclusions_checklist" CASCADE;
  DROP TABLE "offer_items_inclusions_accordion" CASCADE;
  DROP TABLE "offer_items_care_features" CASCADE;
  DROP TABLE "offer_items_testimonial_items" CASCADE;
  DROP TABLE "offer_items_process_steps_items_paragraphs" CASCADE;
  DROP TABLE "offer_items_process_steps_items" CASCADE;
  DROP TABLE "offer_items_gallery_items" CASCADE;
  DROP TABLE "offer_items_faq_items" CASCADE;
  DROP TABLE "_offer_items_v_version_approach_blocks" CASCADE;
  DROP TABLE "_offer_items_v_version_packages_items_features" CASCADE;
  DROP TABLE "_offer_items_v_version_packages_items" CASCADE;
  DROP TABLE "_offer_items_v_version_inclusions_checklist" CASCADE;
  DROP TABLE "_offer_items_v_version_inclusions_accordion" CASCADE;
  DROP TABLE "_offer_items_v_version_care_features" CASCADE;
  DROP TABLE "_offer_items_v_version_testimonial_items" CASCADE;
  DROP TABLE "_offer_items_v_version_process_steps_items_paragraphs" CASCADE;
  DROP TABLE "_offer_items_v_version_process_steps_items" CASCADE;
  DROP TABLE "_offer_items_v_version_gallery_items" CASCADE;
  DROP TABLE "_offer_items_v_version_faq_items" CASCADE;
  ALTER TABLE "offer_items" DROP CONSTRAINT "offer_items_hero_image_id_media_id_fk";
  
  ALTER TABLE "offer_items" DROP CONSTRAINT "offer_items_approach_portrait_image_id_media_id_fk";
  
  ALTER TABLE "offer_items" DROP CONSTRAINT "offer_items_care_image_id_media_id_fk";
  
  ALTER TABLE "_offer_items_v" DROP CONSTRAINT "_offer_items_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_offer_items_v" DROP CONSTRAINT "_offer_items_v_version_approach_portrait_image_id_media_id_fk";
  
  ALTER TABLE "_offer_items_v" DROP CONSTRAINT "_offer_items_v_version_care_image_id_media_id_fk";
  
  DROP INDEX "offer_items_hero_hero_image_idx";
  DROP INDEX "offer_items_approach_approach_portrait_image_idx";
  DROP INDEX "offer_items_care_care_image_idx";
  DROP INDEX "_offer_items_v_version_hero_version_hero_image_idx";
  DROP INDEX "_offer_items_v_version_approach_version_approach_portrai_idx";
  DROP INDEX "_offer_items_v_version_care_version_care_image_idx";
  ALTER TABLE "offer_items" DROP COLUMN "hero_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "hero_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "hero_description";
  ALTER TABLE "offer_items" DROP COLUMN "hero_cta_label";
  ALTER TABLE "offer_items" DROP COLUMN "hero_cta_url";
  ALTER TABLE "offer_items" DROP COLUMN "hero_image_id";
  ALTER TABLE "offer_items" DROP COLUMN "hero_image_alt";
  ALTER TABLE "offer_items" DROP COLUMN "approach_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "approach_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "approach_heading_end";
  ALTER TABLE "offer_items" DROP COLUMN "approach_intro_paragraph1";
  ALTER TABLE "offer_items" DROP COLUMN "approach_intro_paragraph2";
  ALTER TABLE "offer_items" DROP COLUMN "approach_portrait_image_id";
  ALTER TABLE "offer_items" DROP COLUMN "approach_portrait_alt";
  ALTER TABLE "offer_items" DROP COLUMN "packages_catalog_download_label";
  ALTER TABLE "offer_items" DROP COLUMN "packages_catalog_download_url";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_heading_end";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_intro";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_accordion_heading";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_main_image_alt";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_scallop_image_alt";
  ALTER TABLE "offer_items" DROP COLUMN "care_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "care_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "care_heading_end";
  ALTER TABLE "offer_items" DROP COLUMN "care_intro";
  ALTER TABLE "offer_items" DROP COLUMN "care_image_id";
  ALTER TABLE "offer_items" DROP COLUMN "care_image_alt";
  ALTER TABLE "offer_items" DROP COLUMN "care_cta_label";
  ALTER TABLE "offer_items" DROP COLUMN "care_cta_url";
  ALTER TABLE "offer_items" DROP COLUMN "testimonial_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "testimonial_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "process_steps_heading_plain";
  ALTER TABLE "offer_items" DROP COLUMN "process_steps_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "process_steps_intro";
  ALTER TABLE "offer_items" DROP COLUMN "process_steps_cta_label";
  ALTER TABLE "offer_items" DROP COLUMN "process_steps_cta_url";
  ALTER TABLE "offer_items" DROP COLUMN "gallery_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "gallery_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "gallery_description";
  ALTER TABLE "offer_items" DROP COLUMN "gallery_cta_label";
  ALTER TABLE "offer_items" DROP COLUMN "gallery_cta_url";
  ALTER TABLE "offer_items" DROP COLUMN "closing_cta_heading";
  ALTER TABLE "offer_items" DROP COLUMN "closing_cta_body";
  ALTER TABLE "offer_items" DROP COLUMN "closing_cta_cta_label";
  ALTER TABLE "offer_items" DROP COLUMN "closing_cta_cta_url";
  ALTER TABLE "offer_items" DROP COLUMN "faq_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN "faq_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN "faq_intro";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_description";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_cta_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_cta_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_hero_image_alt";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_heading_end";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_intro_paragraph1";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_intro_paragraph2";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_portrait_image_id";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_approach_portrait_alt";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_packages_catalog_download_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_packages_catalog_download_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_heading_end";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_intro";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_accordion_heading";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_main_image_alt";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_scallop_image_alt";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_heading_end";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_intro";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_image_id";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_image_alt";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_cta_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_care_cta_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_testimonial_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_testimonial_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_process_steps_heading_plain";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_process_steps_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_process_steps_intro";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_process_steps_cta_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_process_steps_cta_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_gallery_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_gallery_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_gallery_description";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_gallery_cta_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_gallery_cta_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_closing_cta_heading";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_closing_cta_body";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_closing_cta_cta_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_closing_cta_cta_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_faq_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_faq_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_faq_intro";`)
}
