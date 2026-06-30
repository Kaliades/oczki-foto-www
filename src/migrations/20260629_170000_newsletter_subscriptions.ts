import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_newsletter_subscriptions_source" AS ENUM('home', 'about', 'contact', 'offer-service', 'privacy', 'gallery');
  CREATE TABLE "newsletter_subscriptions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"source" "enum_newsletter_subscriptions_source" NOT NULL,
  	"consent_given" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "newsletter_subscriptions_id" integer;
  CREATE UNIQUE INDEX "newsletter_subscriptions_email_idx" ON "newsletter_subscriptions" USING btree ("email");
  CREATE INDEX "newsletter_subscriptions_updated_at_idx" ON "newsletter_subscriptions" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscriptions_created_at_idx" ON "newsletter_subscriptions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscriptions_fk" FOREIGN KEY ("newsletter_subscriptions_id") REFERENCES "public"."newsletter_subscriptions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscriptions_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "newsletter_subscriptions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "newsletter_subscriptions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_subscriptions_fk";
  
  DROP INDEX "payload_locked_documents_rels_newsletter_subscriptions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "newsletter_subscriptions_id";
  DROP TYPE "public"."enum_newsletter_subscriptions_source";`)
}
