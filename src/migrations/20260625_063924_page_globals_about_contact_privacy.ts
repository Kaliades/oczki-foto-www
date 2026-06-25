import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('pl');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_published_locale" AS ENUM('pl');
  CREATE TYPE "public"."enum_privacy_policy_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__privacy_policy_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__privacy_policy_page_v_published_locale" AS ENUM('pl');
  CREATE TABLE "about_page_philosophy_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_session_feel_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_expertise_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_beyond_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_dual_profile_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_pillars_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading_start" varchar,
  	"hero_heading_emphasis" varchar,
  	"hero_description" varchar,
  	"hero_cta_label" varchar DEFAULT 'Umów sesję',
  	"hero_cta_url" varchar DEFAULT '/kontakt',
  	"hero_portrait_id" integer,
  	"hero_portrait_alt" varchar,
  	"hero_secondary_photo_id" integer,
  	"hero_secondary_photo_alt" varchar,
  	"philosophy_heading_start" varchar,
  	"philosophy_heading_emphasis" varchar,
  	"philosophy_intro" varchar,
  	"session_feel_heading_start" varchar,
  	"session_feel_heading_emphasis" varchar,
  	"session_feel_intro" varchar,
  	"expertise_heading_start" varchar,
  	"expertise_heading_emphasis" varchar,
  	"expertise_intro" varchar,
  	"beyond_heading_start" varchar,
  	"beyond_heading_emphasis" varchar,
  	"beyond_heading_end" varchar,
  	"beyond_intro" varchar,
  	"beyond_backdrop_id" integer,
  	"beyond_backdrop_alt" varchar,
  	"dual_heading_emphasis" varchar,
  	"dual_heading_end" varchar,
  	"dual_intro" varchar,
  	"dual_portrait_id" integer,
  	"dual_portrait_alt" varchar,
  	"dual_profile_heading" varchar,
  	"pillars_heading_start" varchar,
  	"pillars_heading_emphasis" varchar,
  	"pillars_heading_end" varchar,
  	"pillars_intro" varchar,
  	"instagram_heading_plain" varchar,
  	"instagram_heading_emphasis" varchar,
  	"instagram_profile_url" varchar,
  	"cta_heading_text" varchar,
  	"cta_body" varchar,
  	"cta_button_label" varchar DEFAULT 'Umów sesję zdjęciową',
  	"cta_button_url" varchar DEFAULT '/kontakt',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_philosophy_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_session_feel_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_expertise_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_beyond_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_dual_profile_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_pillars_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading_start" varchar,
  	"version_hero_heading_emphasis" varchar,
  	"version_hero_description" varchar,
  	"version_hero_cta_label" varchar DEFAULT 'Umów sesję',
  	"version_hero_cta_url" varchar DEFAULT '/kontakt',
  	"version_hero_portrait_id" integer,
  	"version_hero_portrait_alt" varchar,
  	"version_hero_secondary_photo_id" integer,
  	"version_hero_secondary_photo_alt" varchar,
  	"version_philosophy_heading_start" varchar,
  	"version_philosophy_heading_emphasis" varchar,
  	"version_philosophy_intro" varchar,
  	"version_session_feel_heading_start" varchar,
  	"version_session_feel_heading_emphasis" varchar,
  	"version_session_feel_intro" varchar,
  	"version_expertise_heading_start" varchar,
  	"version_expertise_heading_emphasis" varchar,
  	"version_expertise_intro" varchar,
  	"version_beyond_heading_start" varchar,
  	"version_beyond_heading_emphasis" varchar,
  	"version_beyond_heading_end" varchar,
  	"version_beyond_intro" varchar,
  	"version_beyond_backdrop_id" integer,
  	"version_beyond_backdrop_alt" varchar,
  	"version_dual_heading_emphasis" varchar,
  	"version_dual_heading_end" varchar,
  	"version_dual_intro" varchar,
  	"version_dual_portrait_id" integer,
  	"version_dual_portrait_alt" varchar,
  	"version_dual_profile_heading" varchar,
  	"version_pillars_heading_start" varchar,
  	"version_pillars_heading_emphasis" varchar,
  	"version_pillars_heading_end" varchar,
  	"version_pillars_intro" varchar,
  	"version_instagram_heading_plain" varchar,
  	"version_instagram_heading_emphasis" varchar,
  	"version_instagram_profile_url" varchar,
  	"version_cta_heading_text" varchar,
  	"version_cta_body" varchar,
  	"version_cta_button_label" varchar DEFAULT 'Umów sesję zdjęciową',
  	"version_cta_button_url" varchar DEFAULT '/kontakt',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contact_page_service_area_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "contact_page_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading_start" varchar,
  	"hero_heading_emphasis" varchar,
  	"hero_heading_end" varchar,
  	"hero_description" varchar,
  	"hero_session_question" varchar DEFAULT 'O jakiej sesji marzysz?',
  	"hero_submit_label" varchar DEFAULT 'Wyślij wiadomość',
  	"service_area_heading" varchar,
  	"service_area_intro_paragraph1" varchar,
  	"service_area_intro_paragraph2" varchar,
  	"service_area_footer" varchar,
  	"service_area_cta_label" varchar DEFAULT 'Umów sesję',
  	"service_area_cta_url" varchar DEFAULT '/kontakt',
  	"faq_heading_emphasis" varchar,
  	"faq_heading_start" varchar,
  	"faq_intro" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v_version_service_area_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "_contact_page_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading_start" varchar,
  	"version_hero_heading_emphasis" varchar,
  	"version_hero_heading_end" varchar,
  	"version_hero_description" varchar,
  	"version_hero_session_question" varchar DEFAULT 'O jakiej sesji marzysz?',
  	"version_hero_submit_label" varchar DEFAULT 'Wyślij wiadomość',
  	"version_service_area_heading" varchar,
  	"version_service_area_intro_paragraph1" varchar,
  	"version_service_area_intro_paragraph2" varchar,
  	"version_service_area_footer" varchar,
  	"version_service_area_cta_label" varchar DEFAULT 'Umów sesję',
  	"version_service_area_cta_url" varchar DEFAULT '/kontakt',
  	"version_faq_heading_emphasis" varchar,
  	"version_faq_heading_start" varchar,
  	"version_faq_intro" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__contact_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "privacy_policy_page_sections_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "privacy_policy_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"intro" varchar
  );
  
  CREATE TABLE "privacy_policy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar,
  	"intro" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"_status" "enum_privacy_policy_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_privacy_policy_page_v_version_sections_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_privacy_policy_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"title" varchar,
  	"body" varchar,
  	"intro" varchar
  );
  
  CREATE TABLE "_privacy_policy_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_page_title" varchar,
  	"version_intro" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version__status" "enum__privacy_policy_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__privacy_policy_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "about_page_philosophy_principles" ADD CONSTRAINT "about_page_philosophy_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_session_feel_steps" ADD CONSTRAINT "about_page_session_feel_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_expertise_cards" ADD CONSTRAINT "about_page_expertise_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_beyond_features" ADD CONSTRAINT "about_page_beyond_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_dual_profile_items" ADD CONSTRAINT "about_page_dual_profile_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_pillars_items" ADD CONSTRAINT "about_page_pillars_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_portrait_id_media_id_fk" FOREIGN KEY ("hero_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_secondary_photo_id_media_id_fk" FOREIGN KEY ("hero_secondary_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_beyond_backdrop_id_media_id_fk" FOREIGN KEY ("beyond_backdrop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_dual_portrait_id_media_id_fk" FOREIGN KEY ("dual_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_philosophy_principles" ADD CONSTRAINT "_about_page_v_version_philosophy_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_session_feel_steps" ADD CONSTRAINT "_about_page_v_version_session_feel_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_expertise_cards" ADD CONSTRAINT "_about_page_v_version_expertise_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_beyond_features" ADD CONSTRAINT "_about_page_v_version_beyond_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_dual_profile_items" ADD CONSTRAINT "_about_page_v_version_dual_profile_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_pillars_items" ADD CONSTRAINT "_about_page_v_version_pillars_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_portrait_id_media_id_fk" FOREIGN KEY ("version_hero_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_secondary_photo_id_media_id_fk" FOREIGN KEY ("version_hero_secondary_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_beyond_backdrop_id_media_id_fk" FOREIGN KEY ("version_beyond_backdrop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_dual_portrait_id_media_id_fk" FOREIGN KEY ("version_dual_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_service_area_accordion" ADD CONSTRAINT "contact_page_service_area_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_faq_items" ADD CONSTRAINT "contact_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_service_area_accordion" ADD CONSTRAINT "_contact_page_v_version_service_area_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_faq_items" ADD CONSTRAINT "_contact_page_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_page_sections_bullets" ADD CONSTRAINT "privacy_policy_page_sections_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_page_sections" ADD CONSTRAINT "privacy_policy_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_privacy_policy_page_v_version_sections_bullets" ADD CONSTRAINT "_privacy_policy_page_v_version_sections_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_privacy_policy_page_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_privacy_policy_page_v_version_sections" ADD CONSTRAINT "_privacy_policy_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_privacy_policy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_philosophy_principles_order_idx" ON "about_page_philosophy_principles" USING btree ("_order");
  CREATE INDEX "about_page_philosophy_principles_parent_id_idx" ON "about_page_philosophy_principles" USING btree ("_parent_id");
  CREATE INDEX "about_page_session_feel_steps_order_idx" ON "about_page_session_feel_steps" USING btree ("_order");
  CREATE INDEX "about_page_session_feel_steps_parent_id_idx" ON "about_page_session_feel_steps" USING btree ("_parent_id");
  CREATE INDEX "about_page_expertise_cards_order_idx" ON "about_page_expertise_cards" USING btree ("_order");
  CREATE INDEX "about_page_expertise_cards_parent_id_idx" ON "about_page_expertise_cards" USING btree ("_parent_id");
  CREATE INDEX "about_page_beyond_features_order_idx" ON "about_page_beyond_features" USING btree ("_order");
  CREATE INDEX "about_page_beyond_features_parent_id_idx" ON "about_page_beyond_features" USING btree ("_parent_id");
  CREATE INDEX "about_page_dual_profile_items_order_idx" ON "about_page_dual_profile_items" USING btree ("_order");
  CREATE INDEX "about_page_dual_profile_items_parent_id_idx" ON "about_page_dual_profile_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_pillars_items_order_idx" ON "about_page_pillars_items" USING btree ("_order");
  CREATE INDEX "about_page_pillars_items_parent_id_idx" ON "about_page_pillars_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_hero_portrait_idx" ON "about_page" USING btree ("hero_portrait_id");
  CREATE INDEX "about_page_hero_hero_secondary_photo_idx" ON "about_page" USING btree ("hero_secondary_photo_id");
  CREATE INDEX "about_page_beyond_beyond_backdrop_idx" ON "about_page" USING btree ("beyond_backdrop_id");
  CREATE INDEX "about_page_dual_dual_portrait_idx" ON "about_page" USING btree ("dual_portrait_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_philosophy_principles_order_idx" ON "_about_page_v_version_philosophy_principles" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_philosophy_principles_parent_id_idx" ON "_about_page_v_version_philosophy_principles" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_session_feel_steps_order_idx" ON "_about_page_v_version_session_feel_steps" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_session_feel_steps_parent_id_idx" ON "_about_page_v_version_session_feel_steps" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_expertise_cards_order_idx" ON "_about_page_v_version_expertise_cards" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_expertise_cards_parent_id_idx" ON "_about_page_v_version_expertise_cards" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_beyond_features_order_idx" ON "_about_page_v_version_beyond_features" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_beyond_features_parent_id_idx" ON "_about_page_v_version_beyond_features" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_dual_profile_items_order_idx" ON "_about_page_v_version_dual_profile_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_dual_profile_items_parent_id_idx" ON "_about_page_v_version_dual_profile_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_pillars_items_order_idx" ON "_about_page_v_version_pillars_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_pillars_items_parent_id_idx" ON "_about_page_v_version_pillars_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_portrait_idx" ON "_about_page_v" USING btree ("version_hero_portrait_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_secondary_photo_idx" ON "_about_page_v" USING btree ("version_hero_secondary_photo_id");
  CREATE INDEX "_about_page_v_version_beyond_version_beyond_backdrop_idx" ON "_about_page_v" USING btree ("version_beyond_backdrop_id");
  CREATE INDEX "_about_page_v_version_dual_version_dual_portrait_idx" ON "_about_page_v" USING btree ("version_dual_portrait_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_snapshot_idx" ON "_about_page_v" USING btree ("snapshot");
  CREATE INDEX "_about_page_v_published_locale_idx" ON "_about_page_v" USING btree ("published_locale");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "contact_page_service_area_accordion_order_idx" ON "contact_page_service_area_accordion" USING btree ("_order");
  CREATE INDEX "contact_page_service_area_accordion_parent_id_idx" ON "contact_page_service_area_accordion" USING btree ("_parent_id");
  CREATE INDEX "contact_page_faq_items_order_idx" ON "contact_page_faq_items" USING btree ("_order");
  CREATE INDEX "contact_page_faq_items_parent_id_idx" ON "contact_page_faq_items" USING btree ("_parent_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_service_area_accordion_order_idx" ON "_contact_page_v_version_service_area_accordion" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_service_area_accordion_parent_id_idx" ON "_contact_page_v_version_service_area_accordion" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_faq_items_order_idx" ON "_contact_page_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_faq_items_parent_id_idx" ON "_contact_page_v_version_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_snapshot_idx" ON "_contact_page_v" USING btree ("snapshot");
  CREATE INDEX "_contact_page_v_published_locale_idx" ON "_contact_page_v" USING btree ("published_locale");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  CREATE INDEX "privacy_policy_page_sections_bullets_order_idx" ON "privacy_policy_page_sections_bullets" USING btree ("_order");
  CREATE INDEX "privacy_policy_page_sections_bullets_parent_id_idx" ON "privacy_policy_page_sections_bullets" USING btree ("_parent_id");
  CREATE INDEX "privacy_policy_page_sections_order_idx" ON "privacy_policy_page_sections" USING btree ("_order");
  CREATE INDEX "privacy_policy_page_sections_parent_id_idx" ON "privacy_policy_page_sections" USING btree ("_parent_id");
  CREATE INDEX "privacy_policy_page__status_idx" ON "privacy_policy_page" USING btree ("_status");
  CREATE INDEX "_privacy_policy_page_v_version_sections_bullets_order_idx" ON "_privacy_policy_page_v_version_sections_bullets" USING btree ("_order");
  CREATE INDEX "_privacy_policy_page_v_version_sections_bullets_parent_id_idx" ON "_privacy_policy_page_v_version_sections_bullets" USING btree ("_parent_id");
  CREATE INDEX "_privacy_policy_page_v_version_sections_order_idx" ON "_privacy_policy_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_privacy_policy_page_v_version_sections_parent_id_idx" ON "_privacy_policy_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_privacy_policy_page_v_version_version__status_idx" ON "_privacy_policy_page_v" USING btree ("version__status");
  CREATE INDEX "_privacy_policy_page_v_created_at_idx" ON "_privacy_policy_page_v" USING btree ("created_at");
  CREATE INDEX "_privacy_policy_page_v_updated_at_idx" ON "_privacy_policy_page_v" USING btree ("updated_at");
  CREATE INDEX "_privacy_policy_page_v_snapshot_idx" ON "_privacy_policy_page_v" USING btree ("snapshot");
  CREATE INDEX "_privacy_policy_page_v_published_locale_idx" ON "_privacy_policy_page_v" USING btree ("published_locale");
  CREATE INDEX "_privacy_policy_page_v_latest_idx" ON "_privacy_policy_page_v" USING btree ("latest");
  CREATE INDEX "_privacy_policy_page_v_autosave_idx" ON "_privacy_policy_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page_philosophy_principles" CASCADE;
  DROP TABLE "about_page_session_feel_steps" CASCADE;
  DROP TABLE "about_page_expertise_cards" CASCADE;
  DROP TABLE "about_page_beyond_features" CASCADE;
  DROP TABLE "about_page_dual_profile_items" CASCADE;
  DROP TABLE "about_page_pillars_items" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_philosophy_principles" CASCADE;
  DROP TABLE "_about_page_v_version_session_feel_steps" CASCADE;
  DROP TABLE "_about_page_v_version_expertise_cards" CASCADE;
  DROP TABLE "_about_page_v_version_beyond_features" CASCADE;
  DROP TABLE "_about_page_v_version_dual_profile_items" CASCADE;
  DROP TABLE "_about_page_v_version_pillars_items" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contact_page_service_area_accordion" CASCADE;
  DROP TABLE "contact_page_faq_items" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v_version_service_area_accordion" CASCADE;
  DROP TABLE "_contact_page_v_version_faq_items" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "privacy_policy_page_sections_bullets" CASCADE;
  DROP TABLE "privacy_policy_page_sections" CASCADE;
  DROP TABLE "privacy_policy_page" CASCADE;
  DROP TABLE "_privacy_policy_page_v_version_sections_bullets" CASCADE;
  DROP TABLE "_privacy_policy_page_v_version_sections" CASCADE;
  DROP TABLE "_privacy_policy_page_v" CASCADE;
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum__about_page_v_published_locale";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum__contact_page_v_published_locale";
  DROP TYPE "public"."enum_privacy_policy_page_status";
  DROP TYPE "public"."enum__privacy_policy_page_v_version_status";
  DROP TYPE "public"."enum__privacy_policy_page_v_published_locale";`)
}
