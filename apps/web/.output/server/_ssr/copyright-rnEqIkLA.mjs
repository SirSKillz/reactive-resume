import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/copyright-rnEqIkLA.js
var import_jsx_runtime = require_jsx_runtime();
function Copyright({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("text-muted-foreground/80 text-xs leading-relaxed", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
				id: "e7w6jE",
				components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://github.com/AmruthPillai/Reactive-Resume/blob/main/LICENSE",
					target: "_blank",
					rel: "noopener",
					className: "font-medium underline underline-offset-2"
				}) }
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "omb6Pp" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
				id: "CGSYXE",
				components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					target: "_blank",
					rel: "noopener",
					href: "https://amruthpillai.com",
					className: "font-medium underline underline-offset-2"
				}) }
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					id: "D-Rr7d",
					values: { __APP_VERSION__: "5.1.3" }
				})
			})
		]
	});
}
//#endregion
export { Copyright as t };
