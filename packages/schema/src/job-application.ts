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
