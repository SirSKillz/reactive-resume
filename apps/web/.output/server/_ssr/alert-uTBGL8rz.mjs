import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { r as cva } from "./button-DJhXBADJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alert-uTBGL8rz.js
var import_jsx_runtime = require_jsx_runtime();
var alertVariants = cva("group/alert relative grid w-full gap-0.5 rounded-lg border p-4 text-start text-sm has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 has-data-[slot=alert-action]:pe-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-title",
		className: cn("font-medium group-has-[>svg]/alert:col-start-2", className),
		...props
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-description",
		className: cn("text-balance text-muted-foreground text-sm md:text-pretty [&_p:not(:last-child)]:mb-4", className),
		...props
	});
}
//#endregion
export { AlertDescription as n, AlertTitle as r, Alert as t };
