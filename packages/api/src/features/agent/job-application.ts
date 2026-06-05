import type { ApplicationStatus } from "@reactive-resume/schema/job-application";
import { ORPCError } from "@orpc/client";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@reactive-resume/db/client";
import * as schema from "@reactive-resume/db/schema";
import { generateId } from "@reactive-resume/utils/string";

// -----------------------------------------------------------------------
// Campaign operations
// -----------------------------------------------------------------------

const campaign = {
	list: async (input: { userId: string }) => {
		return db
			.select({
				id: schema.campaign.id,
				name: schema.campaign.name,
				description: schema.campaign.description,
				createdAt: schema.campaign.createdAt,
				updatedAt: schema.campaign.updatedAt,
			})
			.from(schema.campaign)
			.where(eq(schema.campaign.userId, input.userId))
			.orderBy(desc(schema.campaign.createdAt));
	},

	create: async (input: { userId: string; name: string; description?: string | null }) => {
		const id = generateId();
		await db.insert(schema.campaign).values({
			id,
			userId: input.userId,
			name: input.name,
			description: input.description ?? null,
		});
		return id;
	},

	update: async (input: {
		id: string;
		userId: string;
		name?: string | undefined;
		description?: string | null | undefined;
	}) => {
		const [existing] = await db
			.select({ id: schema.campaign.id })
			.from(schema.campaign)
			.where(and(eq(schema.campaign.id, input.id), eq(schema.campaign.userId, input.userId)));

		if (!existing) throw new ORPCError("NOT_FOUND");

		const [updated] = await db
			.update(schema.campaign)
			.set({
				...(input.name !== undefined && { name: input.name }),
				...(input.description !== undefined && { description: input.description }),
			})
			.where(eq(schema.campaign.id, input.id))
			.returning({
				id: schema.campaign.id,
				name: schema.campaign.name,
				description: schema.campaign.description,
				createdAt: schema.campaign.createdAt,
				updatedAt: schema.campaign.updatedAt,
			});

		if (!updated) throw new ORPCError("NOT_FOUND");
		return updated;
	},

	delete: async (input: { id: string; userId: string }) => {
		const [existing] = await db
			.select({ id: schema.campaign.id })
			.from(schema.campaign)
			.where(and(eq(schema.campaign.id, input.id), eq(schema.campaign.userId, input.userId)));

		if (!existing) throw new ORPCError("NOT_FOUND");

		await db.delete(schema.campaign).where(eq(schema.campaign.id, input.id));
	},
};

// -----------------------------------------------------------------------
// Job application operations
// -----------------------------------------------------------------------

const application = {
	list: async (input: { userId: string; campaignId?: string | undefined }) => {
		return db
			.select({
				id: schema.jobApplication.id,
				campaignId: schema.jobApplication.campaignId,
				company: schema.jobApplication.company,
				jobTitle: schema.jobApplication.jobTitle,
				jobUrl: schema.jobApplication.jobUrl,
				location: schema.jobApplication.location,
				locationType: schema.jobApplication.locationType,
				salary: schema.jobApplication.salary,
				status: schema.jobApplication.status,
				jobDescription: schema.jobApplication.jobDescription,
				notes: schema.jobApplication.notes,
				applicationMethod: schema.jobApplication.applicationMethod,
				resumeId: schema.jobApplication.resumeId,
				appliedAt: schema.jobApplication.appliedAt,
				createdAt: schema.jobApplication.createdAt,
				updatedAt: schema.jobApplication.updatedAt,
			})
			.from(schema.jobApplication)
			.where(
				and(
					eq(schema.jobApplication.userId, input.userId),
					input.campaignId ? eq(schema.jobApplication.campaignId, input.campaignId) : undefined,
				),
			)
			.orderBy(desc(schema.jobApplication.createdAt));
	},

	getById: async (input: { id: string; userId: string }) => {
		const [app] = await db
			.select({
				id: schema.jobApplication.id,
				campaignId: schema.jobApplication.campaignId,
				company: schema.jobApplication.company,
				jobTitle: schema.jobApplication.jobTitle,
				jobUrl: schema.jobApplication.jobUrl,
				location: schema.jobApplication.location,
				locationType: schema.jobApplication.locationType,
				salary: schema.jobApplication.salary,
				status: schema.jobApplication.status,
				jobDescription: schema.jobApplication.jobDescription,
				notes: schema.jobApplication.notes,
				applicationMethod: schema.jobApplication.applicationMethod,
				resumeId: schema.jobApplication.resumeId,
				appliedAt: schema.jobApplication.appliedAt,
				createdAt: schema.jobApplication.createdAt,
				updatedAt: schema.jobApplication.updatedAt,
			})
			.from(schema.jobApplication)
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)));

		if (!app) throw new ORPCError("NOT_FOUND");
		return app;
	},

	create: async (input: {
		userId: string;
		campaignId: string;
		company: string;
		jobTitle: string;
		jobUrl?: string | null | undefined;
		location?: string | null | undefined;
		locationType?: "remote" | "hybrid" | "onsite" | null | undefined;
		salary?: string | null | undefined;
		status?: ApplicationStatus | undefined;
		jobDescription?: string | null | undefined;
		notes?: string | null | undefined;
		applicationMethod?:
			| "linkedin"
			| "indeed"
			| "glassdoor"
			| "email"
			| "website"
			| "referral"
			| "other"
			| null
			| undefined;
		resumeId?: string | null | undefined;
		appliedAt?: Date | null | undefined;
	}) => {
		const id = generateId();
		const status = input.status ?? "wishlist";

		await db.insert(schema.jobApplication).values({
			id,
			campaignId: input.campaignId,
			userId: input.userId,
			company: input.company,
			jobTitle: input.jobTitle,
			jobUrl: input.jobUrl ?? null,
			location: input.location ?? null,
			locationType: input.locationType ?? null,
			salary: input.salary ?? null,
			status,
			jobDescription: input.jobDescription ?? null,
			notes: input.notes ?? null,
			applicationMethod: input.applicationMethod ?? null,
			resumeId: input.resumeId ?? null,
			appliedAt: input.appliedAt ?? null,
		});

		await db.insert(schema.jobApplicationActivity).values({
			id: generateId(),
			jobApplicationId: id,
			userId: input.userId,
			type: "created",
			fromStatus: null,
			toStatus: status,
		});

		return id;
	},

	update: async (input: {
		id: string;
		userId: string;
		company?: string | undefined;
		jobTitle?: string | undefined;
		jobUrl?: string | null | undefined;
		location?: string | null | undefined;
		locationType?: "remote" | "hybrid" | "onsite" | null | undefined;
		salary?: string | null | undefined;
		status?: ApplicationStatus | undefined;
		jobDescription?: string | null | undefined;
		notes?: string | null | undefined;
		applicationMethod?:
			| "linkedin"
			| "indeed"
			| "glassdoor"
			| "email"
			| "website"
			| "referral"
			| "other"
			| null
			| undefined;
		resumeId?: string | null | undefined;
		appliedAt?: Date | null | undefined;
	}) => {
		const existing = await application.getById({ id: input.id, userId: input.userId });

		const [updated] = await db
			.update(schema.jobApplication)
			.set({
				...(input.company !== undefined && { company: input.company }),
				...(input.jobTitle !== undefined && { jobTitle: input.jobTitle }),
				...(input.jobUrl !== undefined && { jobUrl: input.jobUrl }),
				...(input.location !== undefined && { location: input.location }),
				...(input.locationType !== undefined && { locationType: input.locationType }),
				...(input.salary !== undefined && { salary: input.salary }),
				...(input.status !== undefined && { status: input.status }),
				...(input.jobDescription !== undefined && { jobDescription: input.jobDescription }),
				...(input.notes !== undefined && { notes: input.notes }),
				...(input.applicationMethod !== undefined && { applicationMethod: input.applicationMethod }),
				...(input.resumeId !== undefined && { resumeId: input.resumeId }),
				...(input.appliedAt !== undefined && { appliedAt: input.appliedAt }),
			})
			.where(eq(schema.jobApplication.id, input.id))
			.returning({
				id: schema.jobApplication.id,
				campaignId: schema.jobApplication.campaignId,
				company: schema.jobApplication.company,
				jobTitle: schema.jobApplication.jobTitle,
				jobUrl: schema.jobApplication.jobUrl,
				location: schema.jobApplication.location,
				locationType: schema.jobApplication.locationType,
				salary: schema.jobApplication.salary,
				status: schema.jobApplication.status,
				jobDescription: schema.jobApplication.jobDescription,
				notes: schema.jobApplication.notes,
				applicationMethod: schema.jobApplication.applicationMethod,
				resumeId: schema.jobApplication.resumeId,
				appliedAt: schema.jobApplication.appliedAt,
				createdAt: schema.jobApplication.createdAt,
				updatedAt: schema.jobApplication.updatedAt,
			});

		if (!updated) throw new ORPCError("NOT_FOUND");

		if (input.status !== undefined && input.status !== existing.status) {
			await db.insert(schema.jobApplicationActivity).values({
				id: generateId(),
				jobApplicationId: input.id,
				userId: input.userId,
				type: "status_changed",
				fromStatus: existing.status,
				toStatus: input.status,
			});
		}

		const hasInfoUpdate = [
			input.company,
			input.jobTitle,
			input.jobUrl,
			input.location,
			input.locationType,
			input.salary,
			input.applicationMethod,
			input.resumeId,
			input.appliedAt,
			input.jobDescription,
		].some((v) => v !== undefined);

		if (hasInfoUpdate) {
			await db.insert(schema.jobApplicationActivity).values({
				id: generateId(),
				jobApplicationId: input.id,
				userId: input.userId,
				type: "updated",
				fromStatus: null,
				toStatus: null,
			});
		}

		return updated;
	},

	updateStatus: async (input: { id: string; userId: string; status: ApplicationStatus }) => {
		const existing = await application.getById({ id: input.id, userId: input.userId });

		if (existing.status === input.status) return;

		await db.update(schema.jobApplication).set({ status: input.status }).where(eq(schema.jobApplication.id, input.id));

		await db.insert(schema.jobApplicationActivity).values({
			id: generateId(),
			jobApplicationId: input.id,
			userId: input.userId,
			type: "status_changed",
			fromStatus: existing.status,
			toStatus: input.status,
		});
	},

	delete: async (input: { id: string; userId: string }) => {
		const [existing] = await db
			.select({ id: schema.jobApplication.id })
			.from(schema.jobApplication)
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)));

		if (!existing) throw new ORPCError("NOT_FOUND");

		await db.delete(schema.jobApplication).where(eq(schema.jobApplication.id, input.id));
	},
};

// -----------------------------------------------------------------------
// Activity log operations
// -----------------------------------------------------------------------

const activityLog = {
	listByApplication: async (input: { applicationId: string; userId: string }) => {
		// Verify ownership before returning activity
		await application.getById({ id: input.applicationId, userId: input.userId });

		return db
			.select({
				id: schema.jobApplicationActivity.id,
				jobApplicationId: schema.jobApplicationActivity.jobApplicationId,
				type: schema.jobApplicationActivity.type,
				fromStatus: schema.jobApplicationActivity.fromStatus,
				toStatus: schema.jobApplicationActivity.toStatus,
				createdAt: schema.jobApplicationActivity.createdAt,
			})
			.from(schema.jobApplicationActivity)
			.where(eq(schema.jobApplicationActivity.jobApplicationId, input.applicationId))
			.orderBy(asc(schema.jobApplicationActivity.createdAt));
	},
};

export const jobApplicationService = {
	campaign,
	application,
	activityLog,
};
