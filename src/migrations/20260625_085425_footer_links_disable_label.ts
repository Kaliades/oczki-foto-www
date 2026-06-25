import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_service_links" DROP COLUMN "link_label";
  ALTER TABLE "site_settings_page_links" DROP COLUMN "link_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_service_links" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "site_settings_page_links" ADD COLUMN "link_label" varchar NOT NULL;`)
}
