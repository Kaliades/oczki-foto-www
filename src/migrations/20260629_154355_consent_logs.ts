import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_consent_logs_source" AS ENUM('banner-accept-all', 'banner-reject-all', 'banner-preferences', 'gpc');
  CREATE TABLE "consent_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"consent_id" varchar NOT NULL,
  	"policy_version" numeric NOT NULL,
  	"recorded_at" timestamp(3) with time zone NOT NULL,
  	"source" "enum_consent_logs_source" NOT NULL,
  	"choices_analytics" boolean DEFAULT false,
  	"choices_marketing" boolean DEFAULT false,
  	"context_banner_enabled" boolean DEFAULT false,
  	"context_analytics_category_enabled" boolean DEFAULT false,
  	"context_marketing_category_enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "consent_logs_id" integer;
  CREATE INDEX "consent_logs_consent_id_idx" ON "consent_logs" USING btree ("consent_id");
  CREATE INDEX "consent_logs_updated_at_idx" ON "consent_logs" USING btree ("updated_at");
  CREATE INDEX "consent_logs_created_at_idx" ON "consent_logs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consent_logs_fk" FOREIGN KEY ("consent_logs_id") REFERENCES "public"."consent_logs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_consent_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("consent_logs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "consent_logs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "consent_logs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_consent_logs_fk";
  
  DROP INDEX "payload_locked_documents_rels_consent_logs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "consent_logs_id";
  DROP TYPE "public"."enum_consent_logs_source";`)
}
