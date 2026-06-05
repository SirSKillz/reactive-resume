import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { An as c } from "../_libs/phosphor-icons__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spinner-DIYcuS2L.js
var import_jsx_runtime = require_jsx_runtime();
function Spinner({ className, color, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
		role: "status",
		"aria-label": "Loading",
		color: color ?? "currentColor",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
//#endregion
export { Spinner as t };
