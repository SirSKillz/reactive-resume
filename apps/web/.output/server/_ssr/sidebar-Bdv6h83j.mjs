import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime, Nt as mergeProps, t as useRender } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { r as cva, t as Button$1 } from "./button-DJhXBADJ.mjs";
import { G as o } from "../_libs/phosphor-icons__react.mjs";
import "./input-BlB5m6_6.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-ByBzK8eA.mjs";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip$1 } from "./tooltip-BJTNuvqu.mjs";
import "./skeleton-C4VsvR82.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sidebar-Bdv6h83j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_QUERY = `(max-width: 767px)`;
function useIsMobile() {
	const [isMobile, setIsMobile] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		const mql = window.matchMedia(MOBILE_QUERY);
		const onChange = (e) => {
			setIsMobile(e.matches);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(mql.matches);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "18rem";
var SIDEBAR_WIDTH_MOBILE = "20rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebarState() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebarState must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		if ("cookieStore" in window) window.cookieStore.set({
			name: SIDEBAR_COOKIE_NAME,
			value: String(openState),
			expires: Date.now() + SIDEBAR_COOKIE_MAX_AGE * 1e3,
			path: "/"
		});
		else document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [isMobile, setOpen]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": SIDEBAR_WIDTH,
				"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
				...style
			},
			className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
			...props,
			children
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebarState();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar",
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			dir,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": side,
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=right]:right-0 data-[side=left]:left-0 data-[side=right]:group-data-[collapsible=offcanvas]:-right-(--sidebar-width) data-[side=left]:group-data-[collapsible=offcanvas]:-left-(--sidebar-width) md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=right]:border-s group-data-[side=left]:border-e", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children
			})
		})]
	});
}
function SidebarTrigger({ className, onClick, ...props }) {
	const { toggleSidebar } = useSidebarState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: cn(className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "rtl:rotate-180" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function SidebarRail({ className, ...props }) {
	const { toggleSidebar } = useSidebarState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-sidebar": "rail",
		"data-slot": "sidebar-rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-s-1/2 after:inset-y-0 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize rtl:in-data-[side=left]:cursor-e-resize rtl:in-data-[side=right]:cursor-w-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize rtl:[[data-side=left][data-state=collapsed]_&]:cursor-w-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=right][data-state=collapsed]_&]:cursor-e-resize", "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:inset-s-full rtl:group-data-[collapsible=offcanvas]:translate-x-0", "[[data-side=left][data-collapsible=offcanvas]_&]:-inset-e-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-inset-s-2", className),
		...props
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: cn("w-auto bg-sidebar-border", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
}
function SidebarGroupLabel({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("flex h-9 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function SidebarGroupContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: cn("w-full text-sm", className),
		...props
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("flex w-full min-w-0 flex-col gap-1", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-9 text-sm",
			sm: "h-8 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const { isMobile, state } = useSidebarState();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps({ className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className) }, props),
		render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { render }),
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive
		}
	});
	if (!tooltip) return comp;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [comp, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
//#endregion
export { SidebarGroupContent as a, SidebarMenu as c, SidebarProvider as d, SidebarRail as f, useSidebarState as h, SidebarGroup as i, SidebarMenuButton as l, SidebarTrigger as m, SidebarContent as n, SidebarGroupLabel as o, SidebarSeparator as p, SidebarFooter as r, SidebarHeader as s, Sidebar as t, SidebarMenuItem as u };
