import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as Spinner } from "./spinner-DIYcuS2L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loading-screen-CCLlz1nZ.js
var import_jsx_runtime = require_jsx_runtime();
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex h-svh w-svw items-center justify-center gap-x-3 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Z3FXyt" })
		})]
	});
}
//#endregion
export { LoadingScreen as t };
