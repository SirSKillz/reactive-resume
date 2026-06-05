import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-icon-WdLQXPMU.js
var import_jsx_runtime = require_jsx_runtime();
function BrandIcon({ variant = "logo", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/${variant}/dark.svg`,
		alt: "Reactive Resume",
		className: cn("hidden size-12 dark:block", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/${variant}/light.svg`,
		alt: "Reactive Resume",
		className: cn("block size-12 dark:hidden", className),
		...props
	})] });
}
//#endregion
export { BrandIcon as t };
