import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stripSearchParams } from "../_libs/tanstack__router-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resumes-3ieTo2cD.js
var $$splitComponentImporter = () => import("./resumes-X-plBr3V.mjs");
var searchSchema = zod_default.object({
	tags: zod_default.array(zod_default.string()).default([]),
	sort: zod_default.enum([
		"lastUpdatedAt",
		"createdAt",
		"name"
	]).default("lastUpdatedAt"),
	view: zod_default.enum(["grid", "list"]).default("grid")
});
var Route = createFileRoute("/dashboard/resumes/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: searchSchema,
	search: { middlewares: [stripSearchParams({
		tags: [],
		sort: "lastUpdatedAt",
		view: "grid"
	})] }
});
//#endregion
export { Route as t };
