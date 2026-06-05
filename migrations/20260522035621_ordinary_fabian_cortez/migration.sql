ALTER TABLE "job_application" ADD COLUMN "position" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
-- Backfill positions based on creation order (newest first = position 0)
UPDATE "job_application"
SET "position" = sub.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id, status ORDER BY created_at DESC) - 1 AS row_num
  FROM "job_application"
) sub
WHERE "job_application".id = sub.id;--> statement-breakpoint
CREATE INDEX "job_application_user_id_status_position_index" ON "job_application" ("user_id","status","position");