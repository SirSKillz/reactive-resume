import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime, ct as ComboboxItem$1, dt as ComboboxPortal, et as ComboboxItemIndicator, ft as ComboboxList$1, gt as useComboboxFilter, ht as ComboboxTrigger$1, lt as ComboboxPopup, mt as ComboboxInput$1, nt as ComboboxRoot$1, pt as ComboboxClear$1, st as ComboboxEmpty$1, tt as ComboboxValue$1, ut as ComboboxPositioner } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Mn as o, Rn as e, r as e$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { i as InputGroupInput, n as InputGroupAddon, r as InputGroupButton, t as InputGroup } from "./input-group-BUPwXtm5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/combobox-zQflN6sS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ComboboxRoot = ComboboxRoot$1;
var useFilter = useComboboxFilter;
function ComboboxValue({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxValue$1, {
		"data-slot": "combobox-value",
		...props
	});
}
function ComboboxTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxTrigger$1, {
		"data-slot": "combobox-trigger",
		className: cn("[&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "pointer-events-none size-4 text-muted-foreground" })]
	});
}
function ComboboxClear({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxClear$1, {
		"data-slot": "combobox-clear",
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
			variant: "ghost",
			size: "icon-xs"
		}),
		className: cn(className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, { className: "pointer-events-none" })
	});
}
function ComboboxInput({ className, children, disabled = false, showTrigger = true, showClear = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		className: cn("w-auto", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInput$1, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, { disabled }),
				...props
			}),
			(showTrigger || showClear) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroupAddon, {
				align: "inline-end",
				children: [showTrigger && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
					size: "icon-xs",
					variant: "ghost",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxTrigger, {}),
					"data-slot": "input-group-button",
					className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
					disabled
				}), showClear && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxClear, { disabled })]
			}),
			children
		]
	});
}
function ComboboxContent({ className, side = "bottom", sideOffset = 6, align = "start", alignOffset = 0, anchor, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPositioner, {
		side,
		sideOffset,
		align,
		alignOffset,
		anchor,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPopup, {
			"data-slot": "combobox-content",
			"data-chips": !!anchor,
			className: cn("group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-fit min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) origin-(--transform-origin) animate-none! overflow-hidden rounded-lg bg-popover/70 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in **:data-[slot$=-item]:data-highlighted:bg-foreground/10 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-9 *:data-[slot=input-group]:border-input/30 **:data-[slot$=-separator]:bg-foreground/5 *:data-[slot=input-group]:bg-input/30 **:data-[variant=destructive]:**:text-accent-foreground! **:data-[variant=destructive]:text-accent-foreground! *:data-[slot=input-group]:shadow-none **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[variant=destructive]:focus:bg-foreground/10!", className),
			...props
		})
	}) });
}
function ComboboxList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxList$1, {
		"data-slot": "combobox-list",
		className: cn("no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0", className),
		...props
	});
}
function ComboboxItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxItem$1, {
		"data-slot": "combobox-item",
		className: cn("relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1 ps-1.5 pe-8 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxItemIndicator, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-e-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "pointer-events-none" })
		})]
	});
}
function ComboboxEmpty({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxEmpty$1, {
		"data-slot": "combobox-empty",
		className: cn("hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex", className),
		...props
	});
}
function useControlledState(props) {
	const { value, defaultValue, onChange } = props;
	const [state, setInternalState] = (0, import_react.useState)(value !== void 0 ? value : defaultValue);
	(0, import_react.useEffect)(() => {
		if (value !== void 0) setInternalState(value);
	}, [value]);
	return [state, (0, import_react.useCallback)((next, ...args) => {
		setInternalState(next);
		onChange?.(next, ...args);
	}, [onChange])];
}
function Combobox$1(props) {
	const { options, multiple = false, disabled = false, showClear = false, placeholder, searchPlaceholder, emptyMessage, className, id, name, render } = props;
	const { contains } = useFilter();
	const optionMap = import_react.useMemo(() => new Map(options.map((opt) => [String(opt.value), opt])), [options]);
	const findOption = import_react.useCallback((v) => {
		if (multiple) {
			if (!v || !Array.isArray(v)) return [];
			return v.map((item) => optionMap.get(String(item)) ?? null).filter(Boolean);
		}
		if (v == null) return null;
		return optionMap.get(String(v)) ?? null;
	}, [optionMap, multiple]);
	const [selectedValue, setSelectedValue] = useControlledState({
		value: import_react.useMemo(() => props.value !== void 0 ? findOption(props.value) : void 0, [props.value, findOption]),
		defaultValue: import_react.useMemo(() => props.defaultValue !== void 0 ? findOption(props.defaultValue) : void 0, [props.defaultValue, findOption]),
		onChange: import_react.useCallback((option) => {
			if (multiple) {
				const arrOpt = Array.isArray(option) ? option : option ? [option] : [];
				props.onValueChange?.(arrOpt.length > 0 ? arrOpt.map((opt) => opt.value) : []);
			} else {
				const value = option && !Array.isArray(option) ? option.value : null;
				const cb = props.onValueChange;
				cb?.(value ?? null);
			}
		}, [props, multiple])
	});
	const itemToStringLabel = import_react.useCallback((item) => typeof item.label === "string" ? item.label : String(item.value), []);
	const isItemEqualToValue = import_react.useCallback((a, b) => String(a.value) === String(b.value), []);
	const filter = import_react.useCallback((item, query) => {
		if (contains(typeof item.label === "string" ? item.label : String(item.value), query)) return true;
		return item.keywords?.some((kw) => contains(kw, query)) ?? false;
	}, [contains]);
	const listContent = (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxItem, {
		value: item,
		disabled: item.disabled,
		children: item.label
	}, String(item.value));
	const triggerNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxTrigger, {
		id,
		disabled,
		render: render ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "outline",
			className: cn("justify-start text-left font-normal hover:bg-muted/20", className)
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 flex-1 truncate text-left",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxValue, { placeholder: placeholder ?? i18n._({ id: "O_7I0o" }) })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxRoot, {
		name,
		items: options,
		filter,
		disabled,
		value: selectedValue,
		onValueChange: setSelectedValue,
		itemToStringLabel,
		isItemEqualToValue,
		...multiple ? { multiple: true } : {},
		children: [showClear ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [triggerNode, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxClear, { disabled })]
		}) : triggerNode, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInput, {
				showTrigger: false,
				placeholder: searchPlaceholder ?? placeholder ?? i18n._({ id: "YIix5Y" }),
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					disabled,
					className: "border-none focus-visible:border-none focus-visible:ring-0"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxEmpty, { children: emptyMessage ?? i18n._({ id: "MZbQHL" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxList, { children: listContent })
		] })]
	});
}
//#endregion
export { useControlledState as n, Combobox$1 as t };
