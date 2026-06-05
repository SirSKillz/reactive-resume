import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { m as SidebarTrigger } from "./sidebar-Bdv6h83j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/header-Cf1o68Wv.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardHeader({ title, icon: IconComponent, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex items-center justify-center gap-x-2.5 md:justify-start", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, { className: "absolute inset-s-0 md:hidden" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, {
				weight: "light",
				className: "size-5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-medium text-xl tracking-tight",
				children: title
			})
		]
	});
}
//#endregion
export { DashboardHeader as t };
