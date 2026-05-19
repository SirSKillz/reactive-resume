import { describe, expect, it } from "vitest";
import { getTableColumns, getTableName } from "drizzle-orm";
import { campaign, jobApplication, jobApplicationActivity } from "./job-application";

describe("campaign table definition", () => {
	it("is named 'campaign' in the database", () => {
		expect(getTableName(campaign)).toBe("campaign");
	});

	it("declares the expected columns", () => {
		const columns = getTableColumns(campaign);
		for (const name of ["id", "userId", "name", "description", "createdAt", "updatedAt"]) {
			expect(columns[name as keyof typeof columns], name).toBeDefined();
		}
	});
});

describe("jobApplication table definition", () => {
	it("is named 'job_application' in the database", () => {
		expect(getTableName(jobApplication)).toBe("job_application");
	});

	it("declares all expected columns", () => {
		const columns = getTableColumns(jobApplication);
		for (const name of [
			"id",
			"campaignId",
			"userId",
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
			"resumeId",
			"appliedAt",
			"createdAt",
			"updatedAt",
		]) {
			expect(columns[name as keyof typeof columns], name).toBeDefined();
		}
	});

	it("status column has a default value defined", () => {
		const { status } = getTableColumns(jobApplication);
		expect(status).toBeDefined();
		// The column has a default — drizzle exposes it on the column config
		expect((status as { default?: unknown }).default).toBeDefined();
	});
});

describe("jobApplicationActivity table definition", () => {
	it("is named 'job_application_activity' in the database", () => {
		expect(getTableName(jobApplicationActivity)).toBe("job_application_activity");
	});

	it("declares the expected columns", () => {
		const columns = getTableColumns(jobApplicationActivity);
		for (const name of ["id", "jobApplicationId", "userId", "type", "fromStatus", "toStatus", "createdAt"]) {
			expect(columns[name as keyof typeof columns], name).toBeDefined();
		}
	});
});
