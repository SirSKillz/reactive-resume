import { describe, expect, it } from "vitest";
import {
	activityTypeSchema,
	applicationMethodSchema,
	applicationStatusSchema,
	locationTypeSchema,
} from "./job-application";

describe("applicationStatusSchema", () => {
	it("accepts all valid statuses", () => {
		for (const value of ["wishlist", "applied", "interviewing", "offer", "rejected", "ghosted"]) {
			expect(applicationStatusSchema.safeParse(value).success, value).toBe(true);
		}
	});

	it("rejects unknown values", () => {
		expect(applicationStatusSchema.safeParse("pending").success).toBe(false);
		expect(applicationStatusSchema.safeParse("").success).toBe(false);
		expect(applicationStatusSchema.safeParse("APPLIED").success).toBe(false);
	});

	it("contains exactly 6 options", () => {
		expect(applicationStatusSchema.options).toHaveLength(6);
	});
});

describe("locationTypeSchema", () => {
	it("accepts all valid location types", () => {
		for (const value of ["remote", "hybrid", "onsite"]) {
			expect(locationTypeSchema.safeParse(value).success, value).toBe(true);
		}
	});

	it("rejects unknown values", () => {
		expect(locationTypeSchema.safeParse("in-person").success).toBe(false);
		expect(locationTypeSchema.safeParse("REMOTE").success).toBe(false);
	});

	it("contains exactly 3 options", () => {
		expect(locationTypeSchema.options).toHaveLength(3);
	});
});

describe("applicationMethodSchema", () => {
	it("accepts all valid application methods", () => {
		for (const value of ["linkedin", "indeed", "glassdoor", "email", "website", "referral", "other"]) {
			expect(applicationMethodSchema.safeParse(value).success, value).toBe(true);
		}
	});

	it("rejects unknown values", () => {
		expect(applicationMethodSchema.safeParse("twitter").success).toBe(false);
		expect(applicationMethodSchema.safeParse("LinkedIn").success).toBe(false);
	});

	it("contains exactly 7 options", () => {
		expect(applicationMethodSchema.options).toHaveLength(7);
	});
});

describe("activityTypeSchema", () => {
	it("accepts created, status_changed, and updated", () => {
		expect(activityTypeSchema.safeParse("created").success).toBe(true);
		expect(activityTypeSchema.safeParse("status_changed").success).toBe(true);
		expect(activityTypeSchema.safeParse("updated").success).toBe(true);
	});

	it("rejects unknown activity types", () => {
		expect(activityTypeSchema.safeParse("deleted").success).toBe(false);
		expect(activityTypeSchema.safeParse("archived").success).toBe(false);
		expect(activityTypeSchema.safeParse("UPDATED").success).toBe(false);
		expect(activityTypeSchema.safeParse("").success).toBe(false);
	});
});
