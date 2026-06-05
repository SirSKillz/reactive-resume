import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { _ as SearchParamError, c as lazyRouteComponent, l as createFileRoute, y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-password-CDs0QSuw.js
var $$splitComponentImporter = () => import("./resume-password-Dqg-iqMJ.mjs");
var searchSchema = zod_default.object({ redirect: zod_default.string().min(1).regex(/^\/[^/]+\/[^/]+$/) });
var Route = createFileRoute("/auth/resume-password")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: searchSchema,
	onError: (error) => {
		if (error instanceof SearchParamError) throw redirect({ to: "/" });
	}
});
//#endregion
export { Route as t };
