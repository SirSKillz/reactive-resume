import z from "zod";

export const applicationStatusSchema = z.enum(["wishlist", "applied", "interviewing", "offer", "rejected", "ghosted"]);

export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;

export const locationTypeSchema = z.enum(["remote", "hybrid", "onsite"]);

export type LocationType = z.infer<typeof locationTypeSchema>;

export const applicationMethodSchema = z.enum([
	"linkedin",
	"indeed",
	"glassdoor",
	"email",
	"website",
	"referral",
	"other",
]);

export type ApplicationMethod = z.infer<typeof applicationMethodSchema>;

export const activityTypeSchema = z.enum(["created", "status_changed", "updated"]);

export type ActivityType = z.infer<typeof activityTypeSchema>;

export const importApplicationSchema = z.object({
	company: z.string().trim().min(1),
	jobTitle: z.string().trim().min(1),
	jobUrl: z.string().url().nullable().optional(),
	location: z.string().nullable().optional(),
	locationType: locationTypeSchema.nullable().optional(),
	salary: z.string().nullable().optional(),
	status: applicationStatusSchema.optional(),
	jobDescription: z.string().nullable().optional(),
	notes: z.string().nullable().optional(),
	applicationMethod: applicationMethodSchema.nullable().optional(),
	appliedAt: z.string().nullable().optional(),
});

export type ImportApplication = z.infer<typeof importApplicationSchema>;

type CsvRecord = Record<keyof ImportApplication, string>;

export type { CsvRecord };
