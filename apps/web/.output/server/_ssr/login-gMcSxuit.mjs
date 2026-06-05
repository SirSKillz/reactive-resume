import { c as lazyRouteComponent, l as createFileRoute, y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-gMcSxuit.js
var $$splitComponentImporter = () => import("./login-BzZ76YTL.mjs");
var Route = createFileRoute("/auth/login")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	beforeLoad: async ({ context }) => {
		if (context.session) throw redirect({
			to: "/dashboard",
			replace: true
		});
		return { session: null };
	}
});
//#endregion
export { Route as t };
