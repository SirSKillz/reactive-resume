import { c as lazyRouteComponent, l as createFileRoute, y as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-332moyFm.js
var $$splitComponentImporter = () => import("./register-DxuLo_FE.mjs");
var Route = createFileRoute("/auth/register")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	beforeLoad: async ({ context }) => {
		if (context.session) throw redirect({
			to: "/dashboard",
			replace: true
		});
		if (context.flags.disableSignups) throw redirect({
			to: "/auth/login",
			replace: true
		});
		return { session: null };
	}
});
//#endregion
export { Route as t };
