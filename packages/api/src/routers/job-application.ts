import { protectedProcedure } from "../context";
import { activityDto, campaignDto, jobApplicationDto } from "../dto/job-application";
import { jobApplicationService } from "../services/job-application";

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
		.output(campaignDto.list.output)
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
		.input(campaignDto.create.input)
		.output(campaignDto.create.output)
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
		.input(campaignDto.update.input)
		.output(campaignDto.update.output)
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
		.input(campaignDto.delete.input)
		.output(campaignDto.delete.output)
		.handler(async ({ context, input }) => {
			await jobApplicationService.campaign.delete({ userId: context.user.id, id: input.id });
		}),
};

const applicationRouter = {
	list: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/applications",
			tags: ["Job Tracker"],
			operationId: "listJobApplications",
			summary: "List job applications",
			description: "Returns job applications for the authenticated user, optionally filtered by campaign.",
			successDescription: "A list of job applications.",
		})
		.input(jobApplicationDto.list.input)
		.output(jobApplicationDto.list.output)
		.handler(async ({ context, input }) => {
			return jobApplicationService.application.list({
				userId: context.user.id,
				campaignId: input?.campaignId,
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
		.input(jobApplicationDto.getById.input)
		.output(jobApplicationDto.getById.output)
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
		.input(jobApplicationDto.create.input)
		.output(jobApplicationDto.create.output)
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
		.input(jobApplicationDto.update.input)
		.output(jobApplicationDto.update.output)
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
		.input(jobApplicationDto.updateStatus.input)
		.output(jobApplicationDto.updateStatus.output)
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.updateStatus({ userId: context.user.id, ...input });
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
		.input(jobApplicationDto.delete.input)
		.output(jobApplicationDto.delete.output)
		.handler(async ({ context, input }) => {
			await jobApplicationService.application.delete({ userId: context.user.id, id: input.id });
		}),
};

const activityRouter = {
	listByApplication: protectedProcedure
		.route({
			method: "GET",
			path: "/jobs/applications/{applicationId}/activity",
			tags: ["Job Tracker"],
			operationId: "listJobApplicationActivity",
			summary: "List application activity",
			description: "Returns the activity log for a job application in chronological order.",
			successDescription: "A chronological list of activity entries.",
		})
		.input(activityDto.listByApplication.input)
		.output(activityDto.listByApplication.output)
		.handler(async ({ context, input }) => {
			return jobApplicationService.activityLog.listByApplication({
				applicationId: input.applicationId,
				userId: context.user.id,
			});
		}),
};

export const jobApplicationRouter = {
	campaign: campaignRouter,
	application: applicationRouter,
	activity: activityRouter,
};
