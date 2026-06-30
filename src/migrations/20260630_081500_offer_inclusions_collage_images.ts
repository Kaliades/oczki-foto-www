import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_main_image_id" integer;
  ALTER TABLE "offer_items" ADD COLUMN "inclusions_scallop_image_id" integer;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_main_image_id" integer;
  ALTER TABLE "_offer_items_v" ADD COLUMN "version_inclusions_scallop_image_id" integer;
  ALTER TABLE "offer_items" ADD CONSTRAINT "offer_items_inclusions_main_image_id_media_id_fk" FOREIGN KEY ("inclusions_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offer_items" ADD CONSTRAINT "offer_items_inclusions_scallop_image_id_media_id_fk" FOREIGN KEY ("inclusions_scallop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v" ADD CONSTRAINT "_offer_items_v_version_inclusions_main_image_id_media_id_fk" FOREIGN KEY ("version_inclusions_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offer_items_v" ADD CONSTRAINT "_offer_items_v_version_inclusions_scallop_image_id_media_id_fk" FOREIGN KEY ("version_inclusions_scallop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "offer_items_inclusions_inclusions_main_image_idx" ON "offer_items" USING btree ("inclusions_main_image_id");
  CREATE INDEX "offer_items_inclusions_inclusions_scallop_image_idx" ON "offer_items" USING btree ("inclusions_scallop_image_id");
  CREATE INDEX "_offer_items_v_version_inclusions_version_inclusions_ma_idx" ON "_offer_items_v" USING btree ("version_inclusions_main_image_id");
  CREATE INDEX "_offer_items_v_version_inclusions_version_inclusions_sc_idx" ON "_offer_items_v" USING btree ("version_inclusions_scallop_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "offer_items" DROP CONSTRAINT "offer_items_inclusions_main_image_id_media_id_fk";
  ALTER TABLE "offer_items" DROP CONSTRAINT "offer_items_inclusions_scallop_image_id_media_id_fk";
  ALTER TABLE "_offer_items_v" DROP CONSTRAINT "_offer_items_v_version_inclusions_main_image_id_media_id_fk";
  ALTER TABLE "_offer_items_v" DROP CONSTRAINT "_offer_items_v_version_inclusions_scallop_image_id_media_id_fk";
  DROP INDEX "offer_items_inclusions_inclusions_main_image_idx";
  DROP INDEX "offer_items_inclusions_inclusions_scallop_image_idx";
  DROP INDEX "_offer_items_v_version_inclusions_version_inclusions_ma_idx";
  DROP INDEX "_offer_items_v_version_inclusions_version_inclusions_sc_idx";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_main_image_id";
  ALTER TABLE "offer_items" DROP COLUMN "inclusions_scallop_image_id";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_main_image_id";
  ALTER TABLE "_offer_items_v" DROP COLUMN "version_inclusions_scallop_image_id";`)
}
