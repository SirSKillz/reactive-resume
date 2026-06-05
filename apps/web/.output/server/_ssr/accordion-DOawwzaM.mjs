import { Lt as require_jsx_runtime, St as AccordionRoot, bt as AccordionHeader, vt as AccordionPanel, xt as AccordionItem$1, yt as AccordionTrigger$1 } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { In as o, Rn as e } from "../_libs/phosphor-icons__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accordion-DOawwzaM.js
var import_jsx_runtime = require_jsx_runtime();
function Accordion$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionRoot, {
		"data-slot": "accordion",
		className: cn("flex w-full flex-col", className),
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
		"data-slot": "accordion-item",
		className: cn("not-last:border-b", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
			"data-slot": "accordion-trigger",
			className: cn("group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-start font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground", className),
			...props,
			children: [
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
					"data-slot": "accordion-trigger-icon",
					className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
					"data-slot": "accordion-trigger-icon",
					className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
				})
			]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionPanel, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_p:not(:last-child)]:mb-4", className),
			children
		})
	});
}
//#endregion
export { AccordionTrigger as i, AccordionContent as n, AccordionItem as r, Accordion$1 as t };
