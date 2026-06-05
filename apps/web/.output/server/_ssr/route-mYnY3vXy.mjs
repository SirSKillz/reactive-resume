import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { c as lazyRouteComponent, l as createFileRoute, y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./locale-BLKR2gqe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-mYnY3vXy.js
var getDashboardSidebarServerFn = createServerFn({ method: "GET" }).handler(createSsrRpc("513aca5e0aecd5ef992128f5d4c9f895e12f04155f3f4abd4b56c78ca99ffe64"));
var setDashboardSidebarServerFn = createServerFn({ method: "POST" }).inputValidator(zod_default.boolean()).handler(createSsrRpc("0a9b531e4949df5a7e5b01de45fa3f757b2e20ce8fda163d34303c4021aaf35e"));
var $$splitComponentImporter = () => import("./route-GoO8dUSp.mjs");
var Route = createFileRoute("/dashboard")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	beforeLoad: async ({ context }) => {
		if (!context.session) throw redirect({
			to: "/auth/login",
			replace: true
		});
		return { session: context.session };
	},
	loader: async () => {
		return { sidebarState: await getDashboardSidebarServerFn() };
	}
});
//#endregion
export { setDashboardSidebarServerFn as n, Route as t };
