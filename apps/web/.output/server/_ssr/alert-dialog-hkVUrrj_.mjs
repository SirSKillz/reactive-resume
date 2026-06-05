import { At as DialogClose, Dt as DialogPortal, Lt as require_jsx_runtime, Ot as DialogPopup, Tt as DialogTitle, _t as AlertDialogRoot, jt as DialogBackdrop, kt as DialogDescription } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alert-dialog-hkVUrrj_.js
var import_jsx_runtime = require_jsx_runtime();
function AlertDialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogRoot, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "alert-dialog-overlay",
		className: cn("data-open:fade-in-0 data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-xs", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPopup, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 fixed inset-s-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground outline-none ring-1 ring-foreground/10 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-closed:animate-out data-open:animate-in data-[size=default]:sm:max-w-sm rtl:translate-x-1/2", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end [form_&]:-mb-6", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "alert-dialog-title",
		className: cn("font-heading font-medium text-base sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "alert-dialog-description",
		className: cn("text-balance text-muted-foreground text-sm md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		"data-slot": "alert-dialog-action",
		className: cn(className),
		...props
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		"data-slot": "alert-dialog-cancel",
		className: cn(className),
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant,
			size
		}),
		...props
	});
}
//#endregion
export { AlertDialogDescription as a, AlertDialogTitle as c, AlertDialogContent as i, AlertDialogAction as n, AlertDialogFooter as o, AlertDialogCancel as r, AlertDialogHeader as s, AlertDialog$1 as t };
