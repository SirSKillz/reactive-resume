import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { r as cva, t as Button$1 } from "./button-DJhXBADJ.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-group-BUPwXtm5.js
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("field-sizing-content flex min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20", className),
		...props
	});
}
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", {
		"data-slot": "input-group",
		className: cn("group/input-group relative flex h-9 w-full min-w-0 items-center rounded-lg border border-input outline-none transition-colors in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot][aria-invalid=true]]:border-destructive has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3", className),
		...props
	});
}
var inputGroupAddonVariants = cva("flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 font-medium text-muted-foreground text-sm group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first ps-2 has-[>button]:ms-[-0.3rem] has-[>kbd]:ms-[-0.15rem]",
		"inline-end": "order-last pe-2 has-[>button]:me-[-0.3rem] has-[>kbd]:me-[-0.15rem]",
		"block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
		"block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", {
		"data-align": align,
		"data-slot": "input-group-addon",
		className: cn(inputGroupAddonVariants({ align }), className),
		onKeyDown: (e) => {
			if (!(e.target instanceof Element) || !e.currentTarget.contains(e.target)) return;
			if (e.key !== " " && e.key !== "Enter") return;
			if (!e.target.closest("button")) {
				e.preventDefault();
				e.currentTarget.parentElement?.querySelector("input")?.focus();
			}
		},
		onClick: (e) => {
			if (!(e.target instanceof Element) || !e.currentTarget.contains(e.target)) return;
			if (!e.target.closest("button")) {
				e.preventDefault();
				e.currentTarget.parentElement?.querySelector("input")?.focus();
			}
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupText({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		"data-slot": "input-group-control",
		className: cn("flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0", className),
		...props
	});
}
//#endregion
export { InputGroupText as a, InputGroupInput as i, InputGroupAddon as n, Textarea as o, InputGroupButton as r, InputGroup as t };
