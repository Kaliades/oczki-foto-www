import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items" ADD COLUMN "with_dropdown_icon" boolean DEFAULT false;
  ALTER TABLE "header" ADD COLUMN "cta_label" varchar DEFAULT 'Umów sesję';
  ALTER TABLE "header" ADD COLUMN "cta_url" varchar DEFAULT '/kontakt';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items" DROP COLUMN "with_dropdown_icon";
  ALTER TABLE "header" DROP COLUMN "cta_label";
  ALTER TABLE "header" DROP COLUMN "cta_url";`)
}
