CREATE TYPE "public"."church_type" AS ENUM('parish', 'community');--> statement-breakpoint
CREATE TABLE "churches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "church_type",
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "masses" ADD COLUMN "church_id" uuid;--> statement-breakpoint
ALTER TABLE "masses" ADD CONSTRAINT "masses_church_id_churches_id_fk" FOREIGN KEY ("church_id") REFERENCES "public"."churches"("id") ON DELETE set null ON UPDATE no action;