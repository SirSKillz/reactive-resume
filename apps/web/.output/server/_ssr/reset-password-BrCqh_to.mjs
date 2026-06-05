import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { _ as SearchParamError, c as lazyRouteComponent, l as createFileRoute, y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BrCqh_to.js
var $$splitComponentImporter = () => import("./reset-password-5IxDblZh.mjs");
var searchSchema = zod_default.object({ token: zod_default.string().min(1) });
var Route = createFileRoute("/auth/reset-password")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: searchSchema,
	beforeLoad: async ({ context }) => {
		if (context.flags.disableEmailAuth) throw redirect({
			to: "/auth/login",
			replace: true
		});
	},
	onError: (error) => {
		if (error instanceof SearchParamError) throw redirect({ to: "/auth/login" });
	}
});
//#endregion
export { Route as t };
