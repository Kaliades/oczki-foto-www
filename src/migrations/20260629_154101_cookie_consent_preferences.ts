import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cookie_consent" ADD COLUMN "preferences_title" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "preferences_intro" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "save_label" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "back_label" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "reject_all_label" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "necessary_category_title" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "necessary_category_description" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "analytics_category_title" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "analytics_category_description" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "marketing_category_title" varchar;
  ALTER TABLE "cookie_consent" ADD COLUMN "marketing_category_description" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_preferences_title" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_preferences_intro" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_save_label" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_back_label" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_reject_all_label" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_necessary_category_title" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_necessary_category_description" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_analytics_category_title" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_analytics_category_description" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_marketing_category_title" varchar;
  ALTER TABLE "_cookie_consent_v" ADD COLUMN "version_marketing_category_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cookie_consent" DROP COLUMN "preferences_title";
  ALTER TABLE "cookie_consent" DROP COLUMN "preferences_intro";
  ALTER TABLE "cookie_consent" DROP COLUMN "save_label";
  ALTER TABLE "cookie_consent" DROP COLUMN "back_label";
  ALTER TABLE "cookie_consent" DROP COLUMN "reject_all_label";
  ALTER TABLE "cookie_consent" DROP COLUMN "necessary_category_title";
  ALTER TABLE "cookie_consent" DROP COLUMN "necessary_category_description";
  ALTER TABLE "cookie_consent" DROP COLUMN "analytics_category_title";
  ALTER TABLE "cookie_consent" DROP COLUMN "analytics_category_description";
  ALTER TABLE "cookie_consent" DROP COLUMN "marketing_category_title";
  ALTER TABLE "cookie_consent" DROP COLUMN "marketing_category_description";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_preferences_title";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_preferences_intro";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_save_label";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_back_label";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_reject_all_label";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_necessary_category_title";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_necessary_category_description";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_analytics_category_title";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_analytics_category_description";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_marketing_category_title";
  ALTER TABLE "_cookie_consent_v" DROP COLUMN "version_marketing_category_description";`)
}
