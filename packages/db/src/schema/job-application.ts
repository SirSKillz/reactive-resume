import * as pg from "drizzle-orm/pg-core";
import { generateId } from "@reactive-resume/utils/string";
import { user } from "./auth";
import { resume } from "./resume";

export const applicationStatusEnum = pg.pgEnum("application_status", [
	"wishlist",
	"applied",
	"interviewing",
	"offer",
	"rejected",
	"ghosted",
]);

export const locationTypeEnum = pg.pgEnum("location_type", ["remote", "hybrid", "onsite"]);

export const applicationMethodEnum = pg.pgEnum("application_method", [
	"linkedin",
	"indeed",
	"glassdoor",
	"email",
	"website",
	"referral",
	"other",
]);

export const campaign = pg.pgTable(
	"campaign",
	{
		id: pg
			.text("id")
			.notNull()
			.primaryKey()
			.$defaultFn(() => generateId()),
		userId: pg
			.text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: pg.text("name").notNull(),
		description: pg.text("description"),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg
			.timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date()),
	},
	(t) => [pg.index().on(t.userId), pg.index().on(t.userId, t.createdAt.desc())],
);

export const jobApplication = pg.pgTable(
	"job_application",
	{
		id: pg
			.text("id")
			.notNull()
			.primaryKey()
			.$defaultFn(() => generateId()),
		campaignId: pg
			.text("campaign_id")
			.notNull()
			.references(() => campaign.id, { onDelete: "cascade" }),
		userId: pg
			.text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		company: pg.text("company").notNull(),
		jobTitle: pg.text("job_title").notNull(),
		jobUrl: pg.text("job_url"),
		location: pg.text("location"),
		locationType: locationTypeEnum("location_type"),
		salary: pg.text("salary"),
		status: applicationStatusEnum("status").notNull().default("wishlist"),
		position: pg.integer("position").notNull().default(0),
		jobDescription: pg.text("job_description"),
		notes: pg.text("notes"),
		applicationMethod: applicationMethodEnum("application_method"),
		resumeId: pg.text("resume_id").references(() => resume.id, { onDelete: "set null" }),
		appliedAt: pg.timestamp("applied_at", { withTimezone: true }),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg
			.timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date()),
	},
	(t) => [
		pg.index().on(t.campaignId),
		pg.index().on(t.userId),
		pg.index().on(t.campaignId, t.status),
		pg.index().on(t.userId, t.status, t.position),
	],
);

export const jobApplicationActivity = pg.pgTable(
	"job_application_activity",
	{
		id: pg
			.text("id")
			.notNull()
			.primaryKey()
			.$defaultFn(() => generateId()),
		jobApplicationId: pg
			.text("job_application_id")
			.notNull()
			.references(() => jobApplication.id, { onDelete: "cascade" }),
		userId: pg
			.text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		type: pg.text("type").notNull(),
		fromStatus: applicationStatusEnum("from_status"),
		toStatus: applicationStatusEnum("to_status"),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(t) => [pg.index().on(t.jobApplicationId, t.createdAt.asc())],
);
