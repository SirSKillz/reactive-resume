import type {
	ApplicationMethod,
	ApplicationStatus,
	CsvRecord,
	LocationType,
} from "@reactive-resume/schema/job-application";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";
import * as schema from "@reactive-resume/db/schema";
import {
	applicationMethodSchema,
	applicationStatusSchema,
	importApplicationSchema,
	locationTypeSchema,
} from "@reactive-resume/schema/job-application";
import { protectedProcedure } from "../../context";
import { jobApplicationService } from "./service";

// -----------------------------------------------------------------------
// Export/Import schemas
// -----------------------------------------------------------------------

const exportFormatSchema = z.enum(["json", "csv"]).default("json");

// -----------------------------------------------------------------------
// Shared input schemas
// -----------------------------------------------------------------------

const listInputBaseSchema = z.object({
	campaignId: z.string().optional(),
	search: z.string().optional(),
	status: applicationStatusSchema.optional(),
});

const listInputSchema = listInputBaseSchema.optional().default({});

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
	position: z.number().describe("The display order within the current status column."),
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
// Campaign router
// -----------------------------------------------------------------------

const campaignRouter = {
	list: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/campaigns",
			tags: ["Job Tracker"],
			operationId: "listCampaigns",
			summary: "List all campaigns",
			description: "Returns all job search campaigns for the authenticated user.",
			successDescription: "A list of campaigns.",
		})
		.output(z.array(campaignSchema.omit({ userId: true })))
		.handler(async ({ context }) => {
			return jobApplicationService.campaign.list({ userId: context.user.id });
		}),

	create: protectedProcedure
		.route({
			method: "POST",
			path: "/jobs/campaigns",
			tags: ["Job Tracker"],
			operationId: "createCampaign",
			summary: "Create a campaign",
			description: "Creates a new job search campaign for the authenticated user.",
			successDescription: "The ID of the newly created campaign.",
		})
		.input(campaignSchema.pick({ name: true, description: true }))
		.output(z.string().describe("The ID of the created campaign."))
		.handler(async ({ context, input }) => {
			return jobApplicationService.campaign.create({ userId: context.user.id, ...input });
		}),

	update: protectedProcedure
		.route({
			method: "PUT",
			path: "/jobs/campaigns/{id}",
			tags: ["Job Tracker"],
			operationId: "updateCampaign",
			summary: "Update a campaign",
			description: "Updates an existing campaign belonging to the authenticated user.",
			successDescription: "The updated campaign.",
		})
		.input(campaignSchema.pick({ name: true, description: true }).partial().extend({ id: z.string() }))
		.output(campaignSchema.omit({ userId: true }))
		.handler(async ({ context, input }) => {
			return jobApplicationService.campaign.update({ userId: context.user.id, ...input });
		}),

	delete: protectedProcedure
		.route({
			method: "DELETE",
			path: "/jobs/campaigns/{id}",
			tags: ["Job Tracker"],
			operationId: "deleteCampaign",
			summary: "Delete a campaign",
			description: "Deletes a campaign and all its job applications.",
			successDescription: "No content.",
		})
		.input(campaignSchema.pick({ id: true }))
		.output(z.void())
		.handler(async ({ context, input }) => {
			await jobApplicationService.campaign.delete({ userId: context.user.id, id: input.id });
		}),
};

// -----------------------------------------------------------------------
// Application router
// -----------------------------------------------------------------------

const applicationRouter = {
	list: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/applications",
			tags: ["Job Tracker"],
			operationId: "listJobApplications",
			summary: "List job applications",
			description:
				"Returns job applications for the authenticated user, optionally filtered by campaign, status, or search term.",
			successDescription: "A list of job applications.",
		})
		.input(listInputSchema)
		.output(z.array(jobApplicationSchema.omit({ userId: true })))
		.handler(async ({ context, input }) => {
			return jobApplicationService.application.list({
				userId: context.user.id,
				campaignId: input?.campaignId,
				search: input?.search,
				status: input?.status,
			});
		}),

	getById: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/applications/{id}",
			tags: ["Job Tracker"],
			operationId: "getJobApplication",
			summary: "Get a job application",
			description: "Returns a single job application by ID. Only accessible by its owner.",
			successDescription: "The job application.",
		})
		.input(jobApplicationSchema.pick({ id: true }))
		.output(jobApplicationSchema.omit({ userId: true }))
		.handler(async ({ context, input }) => {
			return jobApplicationService.application.getById({ id: input.id, userId: context.user.id });
		}),

	create: protectedProcedure
		.route({
			method: "POST",
			path: "/jobs/applications",
			tags: ["Job Tracker"],
			operationId: "createJobApplication",
			summary: "Create a job application",
			description: "Creates a new job application and records an initial activity entry.",
			successDescription: "The ID of the newly created job application.",
		})
		.input(
			jobApplicationSchema
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
		)
		.output(z.string().describe("The ID of the created job application."))
		.handler(async ({ context, input }) => {
			return jobApplicationService.application.create({ userId: context.user.id, ...input });
		}),

	update: protectedProcedure
		.route({
			method: "PUT",
			path: "/jobs/applications/{id}",
			tags: ["Job Tracker"],
			operationId: "updateJobApplication",
			summary: "Update a job application",
			description: "Updates a job application. If the status changes, an activity entry is recorded.",
			successDescription: "The updated job application.",
		})
		.input(
			jobApplicationSchema
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
		)
		.output(jobApplicationSchema.omit({ userId: true }))
		.handler(async ({ context, input }) => {
			return jobApplicationService.application.update({ userId: context.user.id, ...input });
		}),

	updateStatus: protectedProcedure
		.route({
			method: "PATCH",
			path: "/jobs/applications/{id}/status",
			tags: ["Job Tracker"],
			operationId: "updateJobApplicationStatus",
			summary: "Update application status",
			description:
				"Updates only the status of a job application (used for Kanban drag-and-drop). Records a status_changed activity entry.",
			successDescription: "No content.",
		})
		.input(
			z.object({
				id: z.string(),
				status: applicationStatusSchema,
			}),
		)
		.output(z.void())
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.updateStatus({ userId: context.user.id, ...input });
		}),

	reorderColumn: protectedProcedure
		.route({
			method: "POST",
			path: "/jobs/applications/reorder",
			tags: ["Job Tracker"],
			operationId: "reorderJobApplications",
			summary: "Reorder applications in a column",
			description:
				"Reorders job applications within a Kanban column by setting their position and status. Used for drag-and-drop reordering.",
			successDescription: "No content.",
		})
		.input(
			z.object({
				status: applicationStatusSchema,
				orderedIds: z.array(z.string()).min(1),
			}),
		)
		.output(z.void())
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.reorderColumn({
				userId: context.user.id,
				...input,
			});
		}),

	delete: protectedProcedure
		.route({
			method: "DELETE",
			path: "/jobs/applications/{id}",
			tags: ["Job Tracker"],
			operationId: "deleteJobApplication",
			summary: "Delete a job application",
			description: "Permanently deletes a job application and its activity log.",
			successDescription: "No content.",
		})
		.input(jobApplicationSchema.pick({ id: true }))
		.output(z.void())
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.delete({ userId: context.user.id, id: input.id });
		}),

	bulkUpdateStatus: protectedProcedure
		.route({
			method: "PATCH",
			path: "/jobs/applications/bulk/status",
			tags: ["Job Tracker"],
			operationId: "bulkUpdateJobApplicationStatus",
			summary: "Bulk update application status",
			description:
				"Updates the status of multiple job applications at once. Used for bulk operations on the Kanban board.",
			successDescription: "No content.",
		})
		.input(
			z.object({
				ids: z.array(z.string()).min(1),
				status: applicationStatusSchema,
			}),
		)
		.output(z.void())
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.bulkUpdateStatus({
				userId: context.user.id,
				...input,
			});
		}),

	bulkDelete: protectedProcedure
		.route({
			method: "DELETE",
			path: "/jobs/applications/bulk",
			tags: ["Job Tracker"],
			operationId: "bulkDeleteJobApplications",
			summary: "Bulk delete job applications",
			description: "Permanently deletes multiple job applications and their activity logs.",
			successDescription: "No content.",
		})
		.input(
			z.object({
				ids: z.array(z.string()).min(1),
			}),
		)
		.output(z.void())
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.bulkDelete({
				userId: context.user.id,
				...input,
			});
		}),

	export: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/applications/export",
			tags: ["Job Tracker"],
			operationId: "exportJobApplications",
			summary: "Export job applications",
			description: "Exports job applications as JSON or CSV. Supports filtering by campaign, status, or search term.",
			successDescription: "Exported applications in the requested format.",
		})
		.input(
			listInputBaseSchema.extend({
				format: exportFormatSchema,
			}),
		)
		.output(
			z.object({
				format: exportFormatSchema,
				data: z.union([z.array(jobApplicationSchema.omit({ userId: true })), z.string()]),
			}),
		)
		.handler(async ({ context, input }) => {
			const apps = await jobApplicationService.application.list({
				userId: context.user.id,
				campaignId: input?.campaignId,
				search: input?.search,
				status: input?.status,
			});

			if (input.format === "csv") {
				const headers = [
					"company",
					"jobTitle",
					"jobUrl",
					"location",
					"locationType",
					"salary",
					"status",
					"jobDescription",
					"notes",
					"applicationMethod",
					"appliedAt",
					"createdAt",
					"updatedAt",
				];
				const rows = apps.map((app) =>
					headers.map((h) => {
						const val = app[h as keyof typeof app];
						if (val === null || val === undefined) return "";
						if (val instanceof Date) return val.toISOString();
						const str = String(val);
						// Escape CSV fields that contain commas, quotes, or newlines
						if (str.includes(",") || str.includes('"') || str.includes("\n")) {
							return `"${str.replace(/"/g, '""')}"`;
						}
						return str;
					}),
				);
				const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
				return { format: "csv", data: csv };
			}

			return { format: "json", data: apps };
		}),

	import: protectedProcedure
		.route({
			method: "POST",
			path: "/jobs/applications/import",
			tags: ["Job Tracker"],
			operationId: "importJobApplications",
			summary: "Import job applications",
			description:
				"Imports job applications from JSON or CSV data. Applications are created under the specified campaign.",
			successDescription: "The number of applications successfully imported.",
		})
		.input(
			z.object({
				campaignId: z.string(),
				format: exportFormatSchema,
				data: z.union([z.array(importApplicationSchema), z.string()]),
			}),
		)
		.output(z.object({ count: z.number() }))
		.handler(async ({ context, input }) => {
			let apps: z.infer<typeof importApplicationSchema>[];

			if (input.format === "csv" && typeof input.data === "string") {
				// Parse CSV: first line is headers, rest are data rows
				const lines = input.data.split("\n").filter((l) => l.trim());
				if (lines.length < 2) return { count: 0 };

				const headerLine = lines[0];
				if (!headerLine) return { count: 0 };
				const headers = headerLine.split(",").map((h) => h.trim());
				apps = lines.slice(1).map((line) => {
					const values: string[] = [];
					let current = "";
					let inQuotes = false;
					for (let i = 0; i < line.length; i++) {
						const char = line[i];
						if (char === '"') {
							if (inQuotes && line[i + 1] === '"') {
								current += '"';
								i++;
							} else {
								inQuotes = !inQuotes;
							}
						} else if (char === "," && !inQuotes) {
							values.push(current);
							current = "";
						} else {
							current += char;
						}
					}
					values.push(current);

					const record: CsvRecord = {} as CsvRecord;
					headers.forEach((h, idx) => {
						record[h as keyof CsvRecord] = values[idx] ?? "";
					});

					const rawStatus = record.status as ApplicationStatus | undefined;
					const rawLocationType = record.locationType as LocationType | undefined;
					const rawApplicationMethod = record.applicationMethod as ApplicationMethod | undefined;
					const rawAppliedAt = record.appliedAt;

					return {
						company: record.company ?? "",
						jobTitle: record.jobTitle ?? "",
						jobUrl: record.jobUrl || null,
						location: record.location || null,
						locationType: rawLocationType || null,
						salary: record.salary || null,
						status: rawStatus ?? "wishlist",
						jobDescription: record.jobDescription || null,
						notes: record.notes || null,
						applicationMethod: rawApplicationMethod || null,
						appliedAt: rawAppliedAt ? new Date(rawAppliedAt).toISOString() : null,
					};
				});
			} else {
				apps = input.data as z.infer<typeof importApplicationSchema>[];
			}

			let count = 0;
			for (const app of apps) {
				try {
					await jobApplicationService.application.create({
						userId: context.user.id,
						campaignId: input.campaignId,
						company: app.company,
						jobTitle: app.jobTitle,
						jobUrl: app.jobUrl,
						location: app.location,
						locationType: app.locationType,
						salary: app.salary,
						status: app.status,
						jobDescription: app.jobDescription,
						notes: app.notes,
						applicationMethod: app.applicationMethod,
						appliedAt: app.appliedAt ? new Date(app.appliedAt) : null,
					});
					count++;
				} catch {
					// Skip invalid entries
				}
			}

			return { count };
		}),
};

// -----------------------------------------------------------------------
// Activity router
// -----------------------------------------------------------------------

const activityRouter = {
	listByApplication: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/applications/{applicationId}/activity",
			tags: ["Job Tracker"],
			operationId: "listJobApplicationActivity",
			summary: "List application activity",
			description:
				"Returns the activity log for a job application in chronological order. Supports pagination via the limit parameter.",
			successDescription: "A chronological list of activity entries.",
		})
		.input(
			z.object({
				applicationId: z.string(),
				limit: z.number().int().positive().max(100).optional(),
			}),
		)
		.output(z.array(activitySchema.omit({ userId: true })))
		.handler(async ({ context, input }) => {
			return jobApplicationService.activityLog.listByApplication({
				applicationId: input.applicationId,
				userId: context.user.id,
				...(input.limit !== undefined && { limit: input.limit }),
			});
		}),
};

export const jobApplicationRouter = {
	campaign: campaignRouter,
	application: applicationRouter,
	activity: activityRouter,
};
