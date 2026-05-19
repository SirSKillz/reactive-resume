import { createSelectSchema } from "drizzle-zod";
import z from "zod";
import * as schema from "@reactive-resume/db/schema";
import {
	applicationMethodSchema,
	applicationStatusSchema,
	locationTypeSchema,
} from "@reactive-resume/schema/job-application";

// -----------------------------------------------------------------------
// Derived select schemas
// -----------------------------------------------------------------------

const campaignSchema = createSelectSchema(schema.campaign, {
	id: z.string().describe("The ID of the campaign."),
	userId: z.string().describe("The ID of the user who owns the campaign."),
	name: z.string().trim().min(1).describe("The name of the campaign."),
	description: z.string().nullable().describe("An optional description of the campaign."),
	createdAt: z.date().describe("The date and time the campaign was created."),
	updatedAt: z.date().describe("The date and time the campaign was last updated."),
});

const jobApplicationSchema = createSelectSchema(schema.jobApplication, {
	id: z.string().describe("The ID of the job application."),
	campaignId: z.string().describe("The ID of the campaign this application belongs to."),
	userId: z.string().describe("The ID of the user who owns this application."),
	company: z.string().trim().min(1).describe("The company or organization name."),
	jobTitle: z.string().trim().min(1).describe("The job title of the position."),
	jobUrl: z.string().url().nullable().describe("A link to the original job posting."),
	location: z.string().nullable().describe("The location of the job."),
	locationType: locationTypeSchema.nullable().describe("Whether the job is remote, hybrid, or on-site."),
	salary: z.string().nullable().describe("The salary range or expected salary."),
	status: applicationStatusSchema.describe("The current status of the application."),
	jobDescription: z.string().nullable().describe("The full job description text."),
	notes: z.string().nullable().describe("Personal notes about this application."),
	applicationMethod: applicationMethodSchema
		.nullable()
		.describe("The channel through which this application was submitted."),
	resumeId: z.string().nullable().describe("The ID of the linked resume, if any."),
	appliedAt: z.date().nullable().describe("The date and time the application was submitted."),
	createdAt: z.date().describe("The date and time the application was created."),
	updatedAt: z.date().describe("The date and time the application was last updated."),
});

const activitySchema = createSelectSchema(schema.jobApplicationActivity, {
	id: z.string().describe("The ID of the activity entry."),
	jobApplicationId: z.string().describe("The ID of the job application this activity belongs to."),
	userId: z.string().describe("The ID of the user who triggered this activity."),
	type: z.string().describe("The type of activity (created, status_changed)."),
	fromStatus: applicationStatusSchema.nullable().describe("The previous status before a status change."),
	toStatus: applicationStatusSchema.nullable().describe("The new status after a status change."),
	createdAt: z.date().describe("The date and time this activity was recorded."),
});

// -----------------------------------------------------------------------
// DTOs
// -----------------------------------------------------------------------

export const campaignDto = {
	list: {
		output: z.array(campaignSchema.omit({ userId: true })),
	},

	create: {
		input: campaignSchema.pick({ name: true, description: true }),
		output: z.string().describe("The ID of the created campaign."),
	},

	update: {
		input: campaignSchema.pick({ name: true, description: true }).partial().extend({ id: z.string() }),
		output: campaignSchema.omit({ userId: true }),
	},

	delete: {
		input: campaignSchema.pick({ id: true }),
		output: z.void(),
	},
};

export const jobApplicationDto = {
	list: {
		input: z.object({ campaignId: z.string().optional() }).optional().default({}),
		output: z.array(jobApplicationSchema.omit({ userId: true })),
	},

	getById: {
		input: jobApplicationSchema.pick({ id: true }),
		output: jobApplicationSchema.omit({ userId: true }),
	},

	create: {
		input: jobApplicationSchema
			.pick({
				campaignId: true,
				company: true,
				jobTitle: true,
				jobUrl: true,
				location: true,
				locationType: true,
				salary: true,
				status: true,
				jobDescription: true,
				notes: true,
				applicationMethod: true,
				resumeId: true,
				appliedAt: true,
			})
			.extend({
				jobUrl: z.string().url().nullable().optional(),
				location: z.string().nullable().optional(),
				locationType: locationTypeSchema.nullable().optional(),
				salary: z.string().nullable().optional(),
				status: applicationStatusSchema.optional().default("wishlist"),
				jobDescription: z.string().nullable().optional(),
				notes: z.string().nullable().optional(),
				applicationMethod: applicationMethodSchema.nullable().optional(),
				resumeId: z.string().nullable().optional(),
				appliedAt: z.date().nullable().optional(),
			}),
		output: z.string().describe("The ID of the created job application."),
	},

	update: {
		input: jobApplicationSchema
			.pick({
				company: true,
				jobTitle: true,
				jobUrl: true,
				location: true,
				locationType: true,
				salary: true,
				status: true,
				jobDescription: true,
				notes: true,
				applicationMethod: true,
				resumeId: true,
				appliedAt: true,
			})
			.partial()
			.extend({ id: z.string() }),
		output: jobApplicationSchema.omit({ userId: true }),
	},

	updateStatus: {
		input: z.object({
			id: z.string(),
			status: applicationStatusSchema,
		}),
		output: z.void(),
	},

	delete: {
		input: jobApplicationSchema.pick({ id: true }),
		output: z.void(),
	},
};

export const activityDto = {
	listByApplication: {
		input: z.object({ applicationId: z.string() }),
		output: z.array(activitySchema.omit({ userId: true })),
	},
};
