import type { ApplicationStatus } from "@reactive-resume/schema/job-application";
import type { SQL } from "drizzle-orm";
import { ORPCError } from "@orpc/client";
import { and, asc, count, desc, eq, ilike, inArray, or } from "drizzle-orm";
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
	list: async (input: {
		userId: string;
		campaignId?: string | undefined;
		search?: string | undefined;
		status?: ApplicationStatus | undefined;
	}) => {
		const conditions = [eq(schema.jobApplication.userId, input.userId)];

		if (input.campaignId) {
			conditions.push(eq(schema.jobApplication.campaignId, input.campaignId));
		}
		if (input.status) {
			conditions.push(eq(schema.jobApplication.status, input.status));
		}
		if (input.search) {
			const companySearch = ilike(schema.jobApplication.company, `%${input.search}%`) as SQL<unknown>;
			const titleSearch = ilike(schema.jobApplication.jobTitle, `%${input.search}%`) as SQL<unknown>;
			conditions.push(or(companySearch, titleSearch) as SQL<unknown>);
		}

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
				position: schema.jobApplication.position,
				jobDescription: schema.jobApplication.jobDescription,
				notes: schema.jobApplication.notes,
				applicationMethod: schema.jobApplication.applicationMethod,
				resumeId: schema.jobApplication.resumeId,
				appliedAt: schema.jobApplication.appliedAt,
				createdAt: schema.jobApplication.createdAt,
				updatedAt: schema.jobApplication.updatedAt,
			})
			.from(schema.jobApplication)
			.where(and(...conditions))
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
				position: schema.jobApplication.position,
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
		// Verify campaign ownership
		const [campaign] = await db
			.select({ id: schema.campaign.id })
			.from(schema.campaign)
			.where(and(eq(schema.campaign.id, input.campaignId), eq(schema.campaign.userId, input.userId)));

		if (!campaign) throw new ORPCError("NOT_FOUND");

		const id = generateId();
		const status = input.status ?? "wishlist";

		// Compute position: append to end of the target status column
		const [countResult] = await db
			.select({ count: count() })
			.from(schema.jobApplication)
			.where(and(eq(schema.jobApplication.userId, input.userId), eq(schema.jobApplication.status, status)));

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
			position: countResult?.count ?? 0,
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
				position: schema.jobApplication.position,
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

		const updates: Record<string, unknown> = { status: input.status };
		// Auto-set appliedAt when transitioning to "applied" and it hasn't been set
		if (input.status === "applied" && !existing.appliedAt) {
			updates.appliedAt = new Date();
		}

		await db.update(schema.jobApplication).set(updates).where(eq(schema.jobApplication.id, input.id));

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

	reorderColumn: async (input: { userId: string; status: ApplicationStatus; orderedIds: string[] }) => {
		const apps = await db
			.select({ id: schema.jobApplication.id, userId: schema.jobApplication.userId })
			.from(schema.jobApplication)
			.where(and(inArray(schema.jobApplication.id, input.orderedIds), eq(schema.jobApplication.userId, input.userId)));

		const appMap = new Map(apps.map((a) => [a.id, a]));
		for (const id of input.orderedIds) {
			if (!appMap.has(id)) throw new ORPCError("NOT_FOUND");
		}

		// Wrap updates in a transaction for atomicity — all position/status changes
		// succeed or fail together, and the transaction reduces round-trip overhead.
		await db.transaction(async (tx) => {
			for (let index = 0; index < input.orderedIds.length; index++) {
				const id = input.orderedIds[index];
				if (id === undefined) continue;
				const updates: Record<string, unknown> = { position: index, status: input.status };
				await tx
					.update(schema.jobApplication)
					.set(updates)
					.where(and(eq(schema.jobApplication.id, id), eq(schema.jobApplication.userId, input.userId)));
			}
		});
	},

	bulkUpdateStatus: async (input: { userId: string; ids: string[]; status: ApplicationStatus }) => {
		if (input.ids.length === 0) return;

		const existingApps = await db
			.select({
				id: schema.jobApplication.id,
				userId: schema.jobApplication.userId,
				status: schema.jobApplication.status,
				appliedAt: schema.jobApplication.appliedAt,
			})
			.from(schema.jobApplication)
			.where(and(eq(schema.jobApplication.userId, input.userId), inArray(schema.jobApplication.id, input.ids)));

		if (existingApps.length !== input.ids.length) throw new ORPCError("NOT_FOUND");

		// Only set appliedAt when transitioning to "applied" and it hasn't been set yet,
		// mirroring the logic in updateStatus to avoid overwriting existing timestamps.
		const needsAppliedAt = input.status === "applied" && existingApps.some((app) => !app.appliedAt);

		const updates: Record<string, unknown> = { status: input.status };
		if (needsAppliedAt) {
			updates.appliedAt = new Date();
		}

		await db
			.update(schema.jobApplication)
			.set(updates)
			.where(and(eq(schema.jobApplication.userId, input.userId), inArray(schema.jobApplication.id, input.ids)));

		for (const app of existingApps) {
			if (app.status !== input.status) {
				await db.insert(schema.jobApplicationActivity).values({
					id: generateId(),
					jobApplicationId: app.id,
					userId: input.userId,
					type: "status_changed",
					fromStatus: app.status,
					toStatus: input.status,
				});
			}
		}
	},

	bulkDelete: async (input: { userId: string; ids: string[] }) => {
		if (input.ids.length === 0) return;

		const existingApps = await db
			.select({ id: schema.jobApplication.id, userId: schema.jobApplication.userId })
			.from(schema.jobApplication)
			.where(and(eq(schema.jobApplication.userId, input.userId), inArray(schema.jobApplication.id, input.ids)));

		if (existingApps.length !== input.ids.length) throw new ORPCError("NOT_FOUND");

		await db
			.delete(schema.jobApplication)
			.where(and(eq(schema.jobApplication.userId, input.userId), inArray(schema.jobApplication.id, input.ids)));
	},
};

// -----------------------------------------------------------------------
// Activity log operations
// -----------------------------------------------------------------------

const activityLog = {
	listByApplication: async (input: { applicationId: string; userId: string; limit?: number }) => {
		// Verify ownership before returning activity
		await application.getById({ id: input.applicationId, userId: input.userId });

		const query = db
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

		if (input.limit !== undefined) {
			return query.limit(input.limit);
		}

		return query;
	},
};

export const jobApplicationService = {
	campaign,
	application,
	activityLog,
};
