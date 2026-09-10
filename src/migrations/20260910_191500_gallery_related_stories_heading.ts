import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Case-study `relatedStories.heading` (start + emphasis) — per-gallery CMS copy.
 * Needed on both live `galleries` and draft versions `_galleries_v`.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "galleries" ADD COLUMN IF NOT EXISTS "related_stories_heading_start" varchar;
  ALTER TABLE "galleries" ADD COLUMN IF NOT EXISTS "related_stories_heading_emphasis" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN IF NOT EXISTS "version_related_stories_heading_start" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN IF NOT EXISTS "version_related_stories_heading_emphasis" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "galleries" DROP COLUMN IF EXISTS "related_stories_heading_start";
  ALTER TABLE "galleries" DROP COLUMN IF EXISTS "related_stories_heading_emphasis";
  ALTER TABLE "_galleries_v" DROP COLUMN IF EXISTS "version_related_stories_heading_start";
  ALTER TABLE "_galleries_v" DROP COLUMN IF EXISTS "version_related_stories_heading_emphasis";
  `)
}
