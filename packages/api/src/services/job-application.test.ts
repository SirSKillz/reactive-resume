import { afterEach, describe, expect, it, vi } from "vitest";
import { ORPCError } from "@orpc/client";

const dbMock = vi.hoisted(() => ({
	insert: vi.fn(),
	select: vi.fn(),
	update: vi.fn(),
	delete: vi.fn(),
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
	desc: (col: unknown) => ({ op: "desc", col }),
	eq: (col: unknown, val: unknown) => ({ op: "eq", col, val }),
}));

// Lazy import to ensure mocks are applied first
const { jobApplicationService } = await import("./job-application");

const makeSelect = (rows: unknown[]) => {
	dbMock.select.mockReturnValueOnce({
		from: vi.fn().mockReturnValue({
			where: vi.fn().mockResolvedValue(rows),
		}),
	});
};

const makeSelectWithOrder = (rows: unknown[]) => {
	dbMock.select.mockReturnValueOnce({
		from: vi.fn().mockReturnValue({
			where: vi.fn().mockReturnValue({
				orderBy: vi.fn().mockResolvedValue(rows),
			}),
		}),
	});
};

const makeUpdate = () => {
	dbMock.update.mockReturnValueOnce({
		set: vi.fn().mockReturnValue({
			where: vi.fn().mockResolvedValue(undefined),
		}),
	});
};

const makeUpdateReturning = (rows: unknown[]) => {
	dbMock.update.mockReturnValueOnce({
		set: vi.fn().mockReturnValue({
			where: vi.fn().mockReturnValue({
				returning: vi.fn().mockResolvedValue(rows),
			}),
		}),
	});
};

afterEach(() => {
	vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// application.getById
// ---------------------------------------------------------------------------
describe("jobApplicationService.application.getById", () => {
	it("returns the application when found", async () => {
		const app = { id: "app-1", status: "applied", userId: "user-1" };
		makeSelect([app]);

		const result = await jobApplicationService.application.getById({ id: "app-1", userId: "user-1" });
		expect(result).toEqual(app);
	});

	it("throws NOT_FOUND when no application matches", async () => {
		makeSelect([]);

		await expect(jobApplicationService.application.getById({ id: "missing", userId: "user-1" })).rejects.toThrow(
			ORPCError,
		);
	});
});

// ---------------------------------------------------------------------------
// application.create
// ---------------------------------------------------------------------------
describe("jobApplicationService.application.create", () => {
	it("inserts the application and a 'created' activity entry", async () => {
		const valuesMock = vi.fn().mockResolvedValue(undefined);
		dbMock.insert.mockReturnValue({ values: valuesMock });

		await jobApplicationService.application.create({
			userId: "user-1",
			campaignId: "campaign-1",
			company: "Acme Corp",
			jobTitle: "Senior Engineer",
		});

		expect(dbMock.insert).toHaveBeenCalledTimes(2);
		expect(valuesMock).toHaveBeenCalledTimes(2);

		// The second call should be the activity entry
		const activityInsert = valuesMock.mock.calls.at(1)?.at(0) as Record<string, unknown>;
		expect(activityInsert?.type).toBe("created");
		expect(activityInsert?.userId).toBe("user-1");
		expect(activityInsert?.toStatus).toBe("wishlist");
		expect(activityInsert?.fromStatus).toBeNull();
	});

	it("uses status 'wishlist' as default when not provided", async () => {
		const valuesMock = vi.fn().mockResolvedValue(undefined);
		dbMock.insert.mockReturnValue({ values: valuesMock });

		await jobApplicationService.application.create({
			userId: "user-1",
			campaignId: "campaign-1",
			company: "Acme Corp",
			jobTitle: "Engineer",
		});

		const appInsert = valuesMock.mock.calls.at(0)?.at(0) as Record<string, unknown>;
		expect(appInsert?.status).toBe("wishlist");
	});
});

// ---------------------------------------------------------------------------
// application.updateStatus
// ---------------------------------------------------------------------------
describe("jobApplicationService.application.updateStatus", () => {
	it("inserts a status_changed activity when status changes", async () => {
		const existingApp = { id: "app-1", status: "applied", userId: "user-1" };
		makeSelect([existingApp]);
		makeUpdate();

		const valuesMock = vi.fn().mockResolvedValue(undefined);
		dbMock.insert.mockReturnValue({ values: valuesMock });

		await jobApplicationService.application.updateStatus({
			id: "app-1",
			userId: "user-1",
			status: "interviewing",
		});

		expect(dbMock.update).toHaveBeenCalledOnce();
		expect(dbMock.insert).toHaveBeenCalledOnce();

		const activityInsert = valuesMock.mock.calls.at(0)?.at(0) as Record<string, unknown>;
		expect(activityInsert?.type).toBe("status_changed");
		expect(activityInsert?.fromStatus).toBe("applied");
		expect(activityInsert?.toStatus).toBe("interviewing");
		expect(activityInsert?.userId).toBe("user-1");
		expect(activityInsert?.jobApplicationId).toBe("app-1");
	});

	it("does not update or insert activity when status is unchanged", async () => {
		const existingApp = { id: "app-1", status: "applied", userId: "user-1" };
		makeSelect([existingApp]);

		await jobApplicationService.application.updateStatus({
			id: "app-1",
			userId: "user-1",
			status: "applied",
		});

		expect(dbMock.update).not.toHaveBeenCalled();
		expect(dbMock.insert).not.toHaveBeenCalled();
	});

	it("throws NOT_FOUND when application does not belong to user", async () => {
		makeSelect([]);

		await expect(
			jobApplicationService.application.updateStatus({
				id: "app-1",
				userId: "wrong-user",
				status: "interviewing",
			}),
		).rejects.toThrow(ORPCError);
	});
});

// ---------------------------------------------------------------------------
// campaign.list
// ---------------------------------------------------------------------------
describe("jobApplicationService.campaign.list", () => {
	it("returns campaigns belonging to the user", async () => {
		const campaigns = [
			{ id: "c-1", name: "Campaign 1", description: null, createdAt: new Date(), updatedAt: new Date() },
			{ id: "c-2", name: "Campaign 2", description: "Tech jobs", createdAt: new Date(), updatedAt: new Date() },
		];
		makeSelectWithOrder(campaigns);

		const result = await jobApplicationService.campaign.list({ userId: "user-1" });

		expect(result).toEqual(campaigns);
		expect(dbMock.select).toHaveBeenCalledOnce();
	});

	it("returns an empty array when the user has no campaigns", async () => {
		makeSelectWithOrder([]);

		const result = await jobApplicationService.campaign.list({ userId: "user-1" });

		expect(result).toEqual([]);
	});
});

// ---------------------------------------------------------------------------
// application.update
// ---------------------------------------------------------------------------
describe("jobApplicationService.application.update", () => {
	it("updates provided fields and returns the updated application", async () => {
		const existingApp = { id: "app-1", status: "applied", userId: "user-1", company: "Acme" };
		const updatedApp = { ...existingApp, company: "NewCorp" };

		makeSelect([existingApp]); // getById ownership check
		makeUpdateReturning([updatedApp]);

		const valuesMock = vi.fn().mockResolvedValue(undefined);
		dbMock.insert.mockReturnValue({ values: valuesMock });

		const result = await jobApplicationService.application.update({
			id: "app-1",
			userId: "user-1",
			company: "NewCorp",
		});

		expect(result).toEqual(updatedApp);
		// No status change, but company was provided → one "updated" activity
		expect(dbMock.insert).toHaveBeenCalledOnce();
		const activity = valuesMock.mock.calls.at(0)?.at(0) as Record<string, unknown>;
		expect(activity?.type).toBe("updated");
		expect(activity?.userId).toBe("user-1");
		expect(activity?.jobApplicationId).toBe("app-1");
	});

	it("inserts a status_changed activity when status is provided and differs", async () => {
		const existingApp = { id: "app-1", status: "applied", userId: "user-1", company: "Acme" };
		const updatedApp = { ...existingApp, status: "interviewing" };

		makeSelect([existingApp]);
		makeUpdateReturning([updatedApp]);

		const valuesMock = vi.fn().mockResolvedValue(undefined);
		dbMock.insert.mockReturnValue({ values: valuesMock });

		await jobApplicationService.application.update({
			id: "app-1",
			userId: "user-1",
			status: "interviewing",
		});

		// status changed → "status_changed" activity; no info fields → no "updated" activity
		expect(dbMock.insert).toHaveBeenCalledOnce();
		const activity = valuesMock.mock.calls.at(0)?.at(0) as Record<string, unknown>;
		expect(activity?.type).toBe("status_changed");
		expect(activity?.fromStatus).toBe("applied");
		expect(activity?.toStatus).toBe("interviewing");
	});

	it("throws NOT_FOUND when application does not belong to user", async () => {
		makeSelect([]); // getById returns nothing

		await expect(
			jobApplicationService.application.update({
				id: "app-1",
				userId: "wrong-user",
				company: "NewCorp",
			}),
		).rejects.toThrow(ORPCError);
	});
});

// ---------------------------------------------------------------------------
// activityLog.listByApplication
// ---------------------------------------------------------------------------
describe("jobApplicationService.activityLog.listByApplication", () => {
	it("returns activity entries for an application owned by the user", async () => {
		const app = { id: "app-1", status: "applied", userId: "user-1" };
		const activities = [
			{
				id: "act-1",
				jobApplicationId: "app-1",
				type: "created",
				fromStatus: null,
				toStatus: "wishlist",
				createdAt: new Date(),
			},
			{
				id: "act-2",
				jobApplicationId: "app-1",
				type: "status_changed",
				fromStatus: "wishlist",
				toStatus: "applied",
				createdAt: new Date(),
			},
		];

		makeSelect([app]); // ownership check via getById
		makeSelectWithOrder(activities);

		const result = await jobApplicationService.activityLog.listByApplication({
			applicationId: "app-1",
			userId: "user-1",
		});

		expect(result).toEqual(activities);
		expect(dbMock.select).toHaveBeenCalledTimes(2);
	});

	it("throws NOT_FOUND when application does not belong to user", async () => {
		makeSelect([]); // getById returns nothing → NOT_FOUND

		await expect(
			jobApplicationService.activityLog.listByApplication({
				applicationId: "app-1",
				userId: "wrong-user",
			}),
		).rejects.toThrow(ORPCError);
	});
});
