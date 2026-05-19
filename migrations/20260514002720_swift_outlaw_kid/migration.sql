CREATE TYPE "application_method" AS ENUM('linkedin', 'indeed', 'glassdoor', 'email', 'website', 'referral', 'other');--> statement-breakpoint
CREATE TYPE "application_status" AS ENUM('wishlist', 'applied', 'interviewing', 'offer', 'rejected', 'ghosted');--> statement-breakpoint
CREATE TYPE "location_type" AS ENUM('remote', 'hybrid', 'onsite');--> statement-breakpoint
CREATE TABLE "campaign" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_application" (
	"id" text PRIMARY KEY,
	"campaign_id" text NOT NULL,
	"user_id" text NOT NULL,
	"company" text NOT NULL,
	"job_title" text NOT NULL,
	"job_url" text,
	"location" text,
	"location_type" "location_type",
	"salary" text,
	"status" "application_status" DEFAULT 'wishlist'::"application_status" NOT NULL,
	"job_description" text,
	"notes" text,
	"application_method" "application_method",
	"resume_id" text,
	"applied_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_application_activity" (
	"id" text PRIMARY KEY,
	"job_application_id" text NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"from_status" "application_status",
	"to_status" "application_status",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "campaign_user_id_index" ON "campaign" ("user_id");--> statement-breakpoint
CREATE INDEX "campaign_user_id_created_at_index" ON "campaign" ("user_id","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "job_application_campaign_id_index" ON "job_application" ("campaign_id");--> statement-breakpoint
CREATE INDEX "job_application_user_id_index" ON "job_application" ("user_id");--> statement-breakpoint
CREATE INDEX "job_application_campaign_id_status_index" ON "job_application" ("campaign_id","status");--> statement-breakpoint
CREATE INDEX "job_application_activity_job_application_id_created_at_index" ON "job_application_activity" ("job_application_id","created_at");--> statement-breakpoint
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_campaign_id_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_resume_id_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "job_application_activity" ADD CONSTRAINT "job_application_activity_bmRmvUelbwyi_fkey" FOREIGN KEY ("job_application_id") REFERENCES "job_application"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "job_application_activity" ADD CONSTRAINT "job_application_activity_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;