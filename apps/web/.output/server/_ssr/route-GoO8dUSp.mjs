import { f as Link, g as useRouter, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as getInitials } from "./string-DY6EtMBd.mjs";
import { Bn as o, Ft as o$3, K as o$2, Q as e, Vn as r$1, l as r, o as r$2, qt as o$1 } from "../_libs/phosphor-icons__react.mjs";
import { a as SidebarGroupContent, c as SidebarMenu, d as SidebarProvider, f as SidebarRail, h as useSidebarState, i as SidebarGroup, l as SidebarMenuButton, n as SidebarContent, o as SidebarGroupLabel, p as SidebarSeparator, r as SidebarFooter, s as SidebarHeader, t as Sidebar, u as SidebarMenuItem } from "./sidebar-Bdv6h83j.mjs";
import { n as Trans, r as useLingui } from "../_libs/lingui__react.mjs";
import { t as BrandIcon } from "./brand-icon-WdLQXPMU.mjs";
import { d as AnimatePresence, l as motion } from "../_libs/framer-motion.mjs";
import { t as Copyright } from "./copyright-rnEqIkLA.mjs";
import { i as UserDropdownMenu, n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./dropdown-menu-B0Dl2pL6.mjs";
import { n as setDashboardSidebarServerFn, t as Route } from "./route-mYnY3vXy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-GoO8dUSp.js
var import_jsx_runtime = require_jsx_runtime();
var appSidebarItems = [{
	icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}),
	label: { id: "oTBjeH" },
	href: "/dashboard/resumes"
}, {
	icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}),
	label: { id: "Tof7pX" },
	href: "/dashboard/jobs"
}];
var settingsSidebarItems = [
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}),
		label: { id: "vERlcd" },
		href: "/dashboard/settings/profile"
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}),
		label: { id: "Q6hhn8" },
		href: "/dashboard/settings/preferences"
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {}),
		label: { id: "P8fBlG" },
		href: "/dashboard/settings/authentication"
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$3, {}),
		label: { id: "FfSJ1Y" },
		href: "/dashboard/settings/api-keys"
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, {}),
		label: { id: "nbfdhU" },
		href: "/dashboard/settings/integrations"
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$2, {}),
		label: { id: "ZQKLI1" },
		href: "/dashboard/settings/danger-zone"
	}
];
function SidebarItemList({ items }) {
	const { i18n } = useLingui();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
		title: i18n.t(item.label),
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: item.href,
			activeProps: { className: "bg-sidebar-accent" },
			children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 transition-[margin,opacity] duration-200 ease-in-out group-data-[collapsible=icon]:-ms-8 group-data-[collapsible=icon]:opacity-0",
				children: i18n.t(item.label)
			})]
		})
	}) }, item.href)) });
}
function DashboardSidebar() {
	const { state } = useSidebarState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		variant: "floating",
		collapsible: "icon",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
				className: "h-auto justify-center",
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, {
						variant: "icon",
						className: "size-6"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "sr-only",
						children: "Reactive Resume"
					})]
				})
			}) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "LMUw1U" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItemList, { items: appSidebarItems }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Tz0i8g" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItemList, { items: settingsSidebarItems }) })] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarFooter, {
				className: "gap-y-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserDropdownMenu, { children: ({ session }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
					className: "h-auto gap-x-3 group-data-[collapsible=icon]:p-1!",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
						className: "size-8 shrink-0 transition-all group-data-[collapsible=icon]:size-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: session.user.image ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "group-data-[collapsible=icon]:text-[0.5rem]",
							children: getInitials(session.user.name)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "transition-[margin,opacity] duration-200 ease-in-out group-data-[collapsible=icon]:-ms-8 group-data-[collapsible=icon]:opacity-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: session.user.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs",
							children: session.user.email
						})]
					})]
				}) }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: state === "expanded" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "will-change-[transform,opacity]",
					initial: {
						y: 12,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					exit: {
						y: 12,
						opacity: 0
					},
					transition: {
						duration: .2,
						ease: "easeOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copyright, { className: "wrap-break-word shrink-0 whitespace-normal p-2" })
				}, "copyright") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarRail, {})
		]
	});
}
function RouteComponent() {
	const router = useRouter();
	const { sidebarState } = Route.useLoaderData();
	const handleSidebarOpenChange = async (open) => {
		await setDashboardSidebarServerFn({ data: open });
		router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
		open: sidebarState,
		onOpenChange: handleSidebarOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "@container flex-1 p-4 md:ps-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})]
	});
}
//#endregion
export { RouteComponent as component };
