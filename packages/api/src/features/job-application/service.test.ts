import { afterEach, describe, expect, it, vi } from "vitest";
import { ORPCError } from "@orpc/client";

const dbMock = vi.hoisted(() => ({
	insert: vi.fn(),
	select: vi.fn(),
	update: vi.fn(),
	delete: vi.fn(),
	transaction: vi.fn(async (cb) => {
		const tx = {
			update: vi.fn().mockReturnValue({
				set: vi.fn().mockReturnValue({
					where: vi.fn().mockResolvedValue(undefined),
				}),
			}),
		};
		await cb(tx);
	}),
}));

vi.mock("@reactive-resume/db/client", () => ({ db: dbMock }));
vi.mock("@reactive-resume/db/schema", () => ({
	campaign: {},
	jobApplication: {},
	jobApplicationActivity: {},
}));
vi.mock("drizzle-orm", () => ({
	and: (...args: unknown[]) => ({ op: "and", args }),
	asc: (col: unknown) => ({ op: "asc", col }),
	count: () => ({ op: "count" }),
	desc: (col: unknown) => ({ op: "desc", col }),
	eq: (col: unknown, val: unknown) => ({ op: "eq", col, val }),
	ilike: (col: unknown, val: unknown) => ({ op: "ilike", col, val }),
	inArray: (col: unknown, vals: unknown) => ({ op: "inArray", col, vals }),
	or: (...args: unknown[]) => ({ op: "or", args }),
}));

// Lazy import to ensure mocks are applied first
const { jobApplicationService } = await import("./service");

const capturedInsertValues: unknown[] = [];

const makeSelect = (rows: unknown[]) => {
	dbMock.select.mockReturnValueOnce({
		from: vi.fn().mockReturnValue({
			where: vi.fn().mockResolvedValue(rows),
			orderBy: vi.fn().mockResolvedValue(rows),
		}),
	});
};

const makeSelectWithOrderBy = (rows: unknown[]) => {
	dbMock.select.mockReturnValueOnce({
		from: vi.fn().mockReturnValue({
			where: vi.fn().mockReturnValue({
				orderBy: vi.fn().mockResolvedValue(rows),
			}),
		}),
	});
};

const makeSelectWithLimit = (rows: unknown[]) => {
	dbMock.select.mockReturnValueOnce({
		from: vi.fn().mockReturnValue({
			where: vi.fn().mockReturnValue({
				orderBy: vi.fn().mockReturnValue({
					limit: vi.fn().mockResolvedValue(rows),
				}),
			}),
		}),
	});
};

const makeInsert = () => {
	const valuesFn = vi.fn().mockResolvedValue(undefined);
	dbMock.insert.mockReturnValueOnce({
		values: valuesFn,
	});
	valuesFn.mockImplementation((values: unknown) => {
		capturedInsertValues.push(values);
	});
};

const makeUpdateReturning = (row: unknown) => {
	const setFn = vi.fn().mockReturnValue({
		where: vi.fn().mockReturnValue({
			returning: vi.fn().mockResolvedValue([row]),
		}),
	});
	dbMock.update.mockReturnValueOnce({ set: setFn });
};

const makeDelete = () => {
	dbMock.delete.mockReturnValueOnce({
		where: vi.fn().mockResolvedValue(undefined),
	});
};

afterEach(() => {
	vi.clearAllMocks();
	capturedInsertValues.length = 0;
});

// -----------------------------------------------------------------------
// Campaign tests
// -----------------------------------------------------------------------

describe("jobApplicationService.campaign.list", () => {
	it("returns campaigns for the user", async () => {
		const campaigns = [{ id: "c1", name: "Test Campaign" }];
		makeSelectWithOrderBy(campaigns);

		const result = await jobApplicationService.campaign.list({ userId: "user-1" });

		expect(result).toEqual(campaigns);
	});

	it("returns empty array when no campaigns exist", async () => {
		makeSelectWithOrderBy([]);

		const result = await jobApplicationService.campaign.list({ userId: "user-1" });

		expect(result).toEqual([]);
	});
});

describe("jobApplicationService.campaign.create", () => {
	it("creates a campaign and returns its ID", async () => {
		makeInsert();

		const result = await jobApplicationService.campaign.create({
			userId: "user-1",
			name: "Test Campaign",
		});

		expect(dbMock.insert).toHaveBeenCalledTimes(1);
		expect(typeof result).toBe("string");
	});

	it("accepts optional description", async () => {
		makeInsert();

		await jobApplicationService.campaign.create({
			userId: "user-1",
			name: "Test Campaign",
			description: "Optional description",
		});

		const insertValues = capturedInsertValues[0];
		expect(insertValues).toMatchObject({ description: "Optional description" });
	});
});

describe("jobApplicationService.campaign.update", () => {
	it("updates campaign when it belongs to the user", async () => {
		makeSelect([{ id: "c1" }]);
		makeUpdateReturning({ id: "c1", name: "Updated Name" });

		const result = await jobApplicationService.campaign.update({
			id: "c1",
			userId: "user-1",
			name: "Updated Name",
		});

		expect(result).toMatchObject({ name: "Updated Name" });
	});

	it("throws NOT_FOUND when campaign does not belong to user", async () => {
		makeSelect([]);

		const promise = jobApplicationService.campaign.update({
			id: "c1",
			userId: "user-1",
			name: "Updated Name",
		});

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});

	it("supports partial updates", async () => {
		makeSelect([{ id: "c1" }]);
		makeUpdateReturning({ id: "c1", description: "New description" });

		const result = await jobApplicationService.campaign.update({
			id: "c1",
			userId: "user-1",
			description: "New description",
		});

		expect(result).toMatchObject({ description: "New description" });
	});
});

describe("jobApplicationService.campaign.delete", () => {
	it("deletes campaign when it belongs to the user", async () => {
		makeSelect([{ id: "c1" }]);
		makeDelete();

		await jobApplicationService.campaign.delete({ id: "c1", userId: "user-1" });

		expect(dbMock.delete).toHaveBeenCalledTimes(1);
	});

	it("throws NOT_FOUND when campaign does not belong to user", async () => {
		makeSelect([]);

		const promise = jobApplicationService.campaign.delete({ id: "c1", userId: "user-1" });

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});
});

// -----------------------------------------------------------------------
// Application tests
// -----------------------------------------------------------------------

describe("jobApplicationService.application.getById", () => {
	it("returns the application when it exists", async () => {
		const app = { id: "app-1", company: "Acme" };
		makeSelect([app]);

		const result = await jobApplicationService.application.getById({ id: "app-1", userId: "user-1" });

		expect(result).toEqual(app);
	});

	it("throws NOT_FOUND when the application does not exist", async () => {
		makeSelect([]);

		const promise = jobApplicationService.application.getById({ id: "missing", userId: "user-1" });

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});
});

describe("jobApplicationService.application.create", () => {
	it("creates an application and records a created activity", async () => {
		// Campaign ownership check select + count select + 2 inserts
		makeSelect([{ id: "campaign-1" }]);
		makeSelect([{ count: 0 }]);
		makeInsert();
		makeInsert();

		await jobApplicationService.application.create({
			userId: "user-1",
			campaignId: "campaign-1",
			company: "Acme",
			jobTitle: "Engineer",
		});

		expect(dbMock.insert).toHaveBeenCalledTimes(2);
	});

	it("defaults status to wishlist when not provided", async () => {
		makeSelect([{ id: "campaign-1" }]);
		makeSelect([{ count: 0 }]);
		makeInsert();
		makeInsert();

		await jobApplicationService.application.create({
			userId: "user-1",
			campaignId: "campaign-1",
			company: "Acme",
			jobTitle: "Engineer",
		});

		const activityInsert = capturedInsertValues.find(
			(v) => typeof v === "object" && v && "type" in v && v.type === "created",
		);
		expect(activityInsert).toMatchObject({ type: "created", toStatus: "wishlist" });
	});

	it("throws NOT_FOUND when campaign does not belong to user", async () => {
		makeSelect([]);

		const promise = jobApplicationService.application.create({
			userId: "user-1",
			campaignId: "other-campaign",
			company: "Acme",
			jobTitle: "Engineer",
		});

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});

	it("sets position based on existing count for status", async () => {
		makeSelect([{ id: "campaign-1" }]);
		makeSelect([{ count: 3 }]);
		makeInsert();
		makeInsert();

		await jobApplicationService.application.create({
			userId: "user-1",
			campaignId: "campaign-1",
			company: "Acme",
			jobTitle: "Engineer",
			status: "wishlist",
		});

		const appInsert = capturedInsertValues.find((v) => typeof v === "object" && v && "company" in v);
		expect(appInsert).toMatchObject({ position: 3 });
	});
});

describe("jobApplicationService.application.list", () => {
	it("returns all applications for the user", async () => {
		const apps = [{ id: "app-1", company: "Acme" }];
		makeSelectWithOrderBy(apps);

		const result = await jobApplicationService.application.list({ userId: "user-1" });

		expect(result).toEqual(apps);
	});

	it("filters by campaignId when provided", async () => {
		const apps = [{ id: "app-1", company: "Acme" }];
		makeSelectWithOrderBy(apps);

		const result = await jobApplicationService.application.list({
			userId: "user-1",
			campaignId: "campaign-1",
		});

		expect(result).toEqual(apps);
	});

	it("filters by status when provided", async () => {
		const apps = [{ id: "app-1", status: "applied" }];
		makeSelectWithOrderBy(apps);

		const result = await jobApplicationService.application.list({
			userId: "user-1",
			status: "applied",
		});

		expect(result).toEqual(apps);
	});

	it("filters by search term when provided", async () => {
		const apps = [{ id: "app-1", company: "Acme Corp" }];
		makeSelectWithOrderBy(apps);

		const result = await jobApplicationService.application.list({
			userId: "user-1",
			search: "Acme",
		});

		expect(result).toEqual(apps);
	});
});

describe("jobApplicationService.application.update", () => {
	it("updates application fields", async () => {
		const existing = { id: "app-1", company: "Acme", status: "wishlist" };
		makeSelect([existing]);
		makeUpdateReturning({ id: "app-1", company: "Acme Updated" });
		makeInsert();

		const result = await jobApplicationService.application.update({
			id: "app-1",
			userId: "user-1",
			company: "Acme Updated",
		});

		expect(result).toMatchObject({ company: "Acme Updated" });
	});

	it("records status_changed activity when status changes", async () => {
		const existing = { id: "app-1", company: "Acme", status: "wishlist" };
		makeSelect([existing]);
		makeUpdateReturning({ id: "app-1", status: "applied" });
		makeInsert();

		await jobApplicationService.application.update({
			id: "app-1",
			userId: "user-1",
			status: "applied",
		});

		const statusActivity = capturedInsertValues.find(
			(v) => typeof v === "object" && v && "type" in v && v.type === "status_changed",
		);
		expect(statusActivity).toMatchObject({ type: "status_changed", fromStatus: "wishlist", toStatus: "applied" });
	});

	it("records updated activity when info fields change", async () => {
		const existing = { id: "app-1", company: "Acme", status: "wishlist" };
		makeSelect([existing]);
		makeUpdateReturning({ id: "app-1", company: "Acme Updated" });
		makeInsert();

		await jobApplicationService.application.update({
			id: "app-1",
			userId: "user-1",
			company: "Acme Updated",
		});

		const infoActivity = capturedInsertValues.find(
			(v) => typeof v === "object" && v && "type" in v && v.type === "updated",
		);
		expect(infoActivity).toMatchObject({ type: "updated" });
	});
});

describe("jobApplicationService.application.updateStatus", () => {
	it("updates status and records activity", async () => {
		const existing = { id: "app-1", status: "wishlist", appliedAt: null };
		makeSelect([existing]);
		makeUpdateReturning({ id: "app-1", status: "applied" });
		makeInsert();

		await jobApplicationService.application.updateStatus({
			id: "app-1",
			userId: "user-1",
			status: "applied",
		});

		expect(dbMock.update).toHaveBeenCalledTimes(1);
		expect(dbMock.insert).toHaveBeenCalledTimes(1);
	});

	it("auto-sets appliedAt when transitioning to applied", async () => {
		const existing = { id: "app-1", status: "wishlist", appliedAt: null };
		makeSelect([existing]);
		const capturedUpdates: Record<string, unknown>[] = [];
		dbMock.update.mockReturnValueOnce({
			set: vi.fn().mockImplementation((updates: Record<string, unknown>) => {
				capturedUpdates.push(updates);
				return { where: vi.fn().mockResolvedValue([{ id: "app-1" }]) };
			}),
		});
		makeInsert();

		await jobApplicationService.application.updateStatus({
			id: "app-1",
			userId: "user-1",
			status: "applied",
		});

		expect(capturedUpdates).toHaveLength(1);
		expect(capturedUpdates[0]).toMatchObject({ appliedAt: expect.any(Date) });
	});

	it("does not set appliedAt when already set", async () => {
		const existing = { id: "app-1", status: "wishlist", appliedAt: new Date("2026-01-01") };
		makeSelect([existing]);
		const capturedUpdates: Record<string, unknown>[] = [];
		dbMock.update.mockReturnValueOnce({
			set: vi.fn().mockImplementation((updates: Record<string, unknown>) => {
				capturedUpdates.push(updates);
				return { where: vi.fn().mockResolvedValue([{ id: "app-1" }]) };
			}),
		});
		makeInsert();

		await jobApplicationService.application.updateStatus({
			id: "app-1",
			userId: "user-1",
			status: "applied",
		});

		expect(capturedUpdates).toHaveLength(1);
		expect(capturedUpdates[0]).not.toHaveProperty("appliedAt");
	});

	it("returns early when status is unchanged", async () => {
		const existing = { id: "app-1", status: "wishlist" };
		makeSelect([existing]);

		await jobApplicationService.application.updateStatus({
			id: "app-1",
			userId: "user-1",
			status: "wishlist",
		});

		expect(dbMock.update).not.toHaveBeenCalled();
	});
});

describe("jobApplicationService.application.delete", () => {
	it("deletes application when it belongs to the user", async () => {
		makeSelect([{ id: "app-1" }]);
		makeDelete();

		await jobApplicationService.application.delete({ id: "app-1", userId: "user-1" });

		expect(dbMock.delete).toHaveBeenCalledTimes(1);
	});

	it("throws NOT_FOUND when application does not belong to user", async () => {
		makeSelect([]);

		const promise = jobApplicationService.application.delete({ id: "app-1", userId: "user-1" });

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});
});

describe("jobApplicationService.application.reorderColumn", () => {
	it("reorders positions for applications in a column", async () => {
		const apps = [
			{ id: "app-1", userId: "user-1" },
			{ id: "app-2", userId: "user-1" },
		];
		makeSelect(apps);

		await jobApplicationService.application.reorderColumn({
			userId: "user-1",
			status: "wishlist",
			orderedIds: ["app-1", "app-2"],
		});

		expect(dbMock.transaction).toHaveBeenCalledTimes(1);
	});

	it("throws NOT_FOUND when an ID in orderedIds does not belong to user", async () => {
		const apps = [{ id: "app-1", userId: "user-1" }];
		makeSelect(apps);

		const promise = jobApplicationService.application.reorderColumn({
			userId: "user-1",
			status: "wishlist",
			orderedIds: ["app-1", "nonexistent"],
		});

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});
});

// -----------------------------------------------------------------------
// Activity log tests
// -----------------------------------------------------------------------

describe("jobApplicationService.activityLog.listByApplication", () => {
	it("returns activities for the application", async () => {
		makeSelect([{ id: "app-1" }]);
		const activities = [{ id: "act-1", type: "created" }];
		makeSelectWithOrderBy(activities);

		const result = await jobApplicationService.activityLog.listByApplication({
			applicationId: "app-1",
			userId: "user-1",
		});

		expect(result).toEqual(activities);
	});

	it("throws NOT_FOUND when application does not belong to user", async () => {
		makeSelect([]);

		const promise = jobApplicationService.activityLog.listByApplication({
			applicationId: "app-1",
			userId: "user-1",
		});

		await expect(promise).rejects.toBeInstanceOf(ORPCError);
		await expect(promise).rejects.toMatchObject({ code: "NOT_FOUND" });
	});

	it("applies limit when provided", async () => {
		makeSelect([{ id: "app-1" }]);
		const activities = [{ id: "act-1", type: "created" }];
		makeSelectWithLimit(activities);

		const result = await jobApplicationService.activityLog.listByApplication({
			applicationId: "app-1",
			userId: "user-1",
			limit: 10,
		});

		expect(result).toEqual(activities);
	});
});
