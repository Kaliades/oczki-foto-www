import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Reportaż CMS support:
 * - optional package `description` (“Dla Ciebie, jeśli…”)
 * - gallery heading `end` (mosaic: “… w naszych kadrach”)
 * - optional `storiesGallery` group + items (second rail)
 *
 * Additive only — does not touch existing offer rows.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "offer_items_packages_items" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "_offer_items_v_version_packages_items" ADD COLUMN IF NOT EXISTS "description" varchar;

  ALTER TABLE "offer_items" ADD COLUMN IF NOT EXISTS "gallery_heading_end" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN IF NOT EXISTS "version_gallery_heading_end" varchar;

  ALTER TABLE "offer_items" ADD COLUMN IF NOT EXISTS "stories_gallery_heading_start" varchar;
  ALTER TABLE "offer_items" ADD COLUMN IF NOT EXISTS "stories_gallery_heading_emphasis" varchar;
  ALTER TABLE "offer_items" ADD COLUMN IF NOT EXISTS "stories_gallery_description" varchar;
  ALTER TABLE "offer_items" ADD COLUMN IF NOT EXISTS "stories_gallery_cta_label" varchar;
  ALTER TABLE "offer_items" ADD COLUMN IF NOT EXISTS "stories_gallery_cta_url" varchar;

  ALTER TABLE "_offer_items_v" ADD COLUMN IF NOT EXISTS "version_stories_gallery_heading_start" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN IF NOT EXISTS "version_stories_gallery_heading_emphasis" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN IF NOT EXISTS "version_stories_gallery_description" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN IF NOT EXISTS "version_stories_gallery_cta_label" varchar;
  ALTER TABLE "_offer_items_v" ADD COLUMN IF NOT EXISTS "version_stories_gallery_cta_url" varchar;

  CREATE TABLE IF NOT EXISTS "offer_items_stories_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "image_id" integer,
    "image_alt" varchar,
    "caption_title" varchar,
    "caption_subtitle" varchar
  );

  CREATE TABLE IF NOT EXISTS "_offer_items_v_version_stories_gallery_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "image_id" integer,
    "image_alt" varchar,
    "caption_title" varchar,
    "caption_subtitle" varchar,
    "_uuid" varchar
  );
  `)

  // Constraints / indexes — ignore if already present (safe re-run locally).
  await db.execute(sql`
  DO $$ BEGIN
    ALTER TABLE "offer_items_stories_gallery_items"
      ADD CONSTRAINT "offer_items_stories_gallery_items_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "offer_items_stories_gallery_items"
      ADD CONSTRAINT "offer_items_stories_gallery_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "_offer_items_v_version_stories_gallery_items"
      ADD CONSTRAINT "_offer_items_v_version_stories_gallery_items_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "_offer_items_v_version_stories_gallery_items"
      ADD CONSTRAINT "_offer_items_v_version_stories_gallery_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_items_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;

  CREATE INDEX IF NOT EXISTS "offer_items_stories_gallery_items_order_idx"
    ON "offer_items_stories_gallery_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "offer_items_stories_gallery_items_parent_id_idx"
    ON "offer_items_stories_gallery_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "offer_items_stories_gallery_items_image_idx"
    ON "offer_items_stories_gallery_items" USING btree ("image_id");

  CREATE INDEX IF NOT EXISTS "_offer_items_v_version_stories_gallery_items_order_idx"
    ON "_offer_items_v_version_stories_gallery_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_offer_items_v_version_stories_gallery_items_parent_id_idx"
    ON "_offer_items_v_version_stories_gallery_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_offer_items_v_version_stories_gallery_items_image_idx"
    ON "_offer_items_v_version_stories_gallery_items" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "offer_items_stories_gallery_items" CASCADE;
  DROP TABLE IF EXISTS "_offer_items_v_version_stories_gallery_items" CASCADE;

  ALTER TABLE "offer_items" DROP COLUMN IF EXISTS "stories_gallery_heading_start";
  ALTER TABLE "offer_items" DROP COLUMN IF EXISTS "stories_gallery_heading_emphasis";
  ALTER TABLE "offer_items" DROP COLUMN IF EXISTS "stories_gallery_description";
  ALTER TABLE "offer_items" DROP COLUMN IF EXISTS "stories_gallery_cta_label";
  ALTER TABLE "offer_items" DROP COLUMN IF EXISTS "stories_gallery_cta_url";
  ALTER TABLE "offer_items" DROP COLUMN IF EXISTS "gallery_heading_end";

  ALTER TABLE "_offer_items_v" DROP COLUMN IF EXISTS "version_stories_gallery_heading_start";
  ALTER TABLE "_offer_items_v" DROP COLUMN IF EXISTS "version_stories_gallery_heading_emphasis";
  ALTER TABLE "_offer_items_v" DROP COLUMN IF EXISTS "version_stories_gallery_description";
  ALTER TABLE "_offer_items_v" DROP COLUMN IF EXISTS "version_stories_gallery_cta_label";
  ALTER TABLE "_offer_items_v" DROP COLUMN IF EXISTS "version_stories_gallery_cta_url";
  ALTER TABLE "_offer_items_v" DROP COLUMN IF EXISTS "version_gallery_heading_end";

  ALTER TABLE "offer_items_packages_items" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_offer_items_v_version_packages_items" DROP COLUMN IF EXISTS "description";
  `)
}
