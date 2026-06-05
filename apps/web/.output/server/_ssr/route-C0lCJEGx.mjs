import { s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as BrandIcon } from "./brand-icon-WdLQXPMU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-C0lCJEGx.js
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-svh w-dvw max-w-sm flex-col justify-center space-y-6 px-4 xs:px-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, { className: "mb-4 size-20 self-center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	});
}
//#endregion
export { RouteComponent as component };
