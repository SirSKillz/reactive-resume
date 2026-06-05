import { Ct as Input, Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-BlB5m6_6.js
var import_jsx_runtime = require_jsx_runtime();
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type,
		"data-slot": "input",
		className: cn("h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20", className),
		...props
	});
}
//#endregion
export { Input$1 as t };
