import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Case-study hero is heading-only now — drop unused `hero.description`.
 * Safe: IF EXISTS on both live + versions tables. Content in that column is discarded
 * (it is no longer rendered on the site).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "galleries" DROP COLUMN IF EXISTS "hero_description";
  ALTER TABLE "_galleries_v" DROP COLUMN IF EXISTS "version_hero_description";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "galleries" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "_galleries_v" ADD COLUMN IF NOT EXISTS "version_hero_description" varchar;
  `)
}
