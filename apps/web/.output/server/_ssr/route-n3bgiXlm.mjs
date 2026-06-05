import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { f as Link, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime, Pt as require_react_dom } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { B as r, Kt as t, Yn as r$1, h as e$2, pt as e, z as e$1 } from "../_libs/phosphor-icons__react.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as BrandIcon } from "./brand-icon-WdLQXPMU.mjs";
import { a as useSpring, c as useMotionValue, l as motion } from "../_libs/framer-motion.mjs";
import { t as CountUp } from "./count-up-VniHQ91S.mjs";
import { o as useTheme } from "./provider-BvhP1oi6.mjs";
import { t as LocaleCombobox } from "./combobox-CNLnFcal.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-n3bgiXlm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function GithubStarsButton() {
	const { data: starCount } = useQuery(orpc.statistics.github.getStarCount.queryOptions());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		variant: "outline",
		nativeButton: false,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			target: "_blank",
			href: "https://github.com/amruthpillai/reactive-resume",
			"aria-label": starCount != null ? i18n._({
				id: "6IpkuG",
				values: { 0: starCount.toLocaleString() }
			}) : i18n._({ id: "0j6Igx" }),
			rel: "noopener",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, { "aria-hidden": "true" }),
				starCount != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
					to: starCount,
					duration: .5,
					separator: ",",
					className: "font-bold",
					"aria-hidden": "true"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, { "aria-hidden": "true" })
			]
		})
	});
}
function ThemeToggleButton(props) {
	const { theme, toggleTheme } = useTheme();
	const buttonRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		size: "icon",
		variant: "ghost",
		ref: buttonRef,
		onClick: (0, import_react.useCallback)(async () => {
			if (!buttonRef.current || !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				toggleTheme();
				return;
			}
			let timeout;
			const style = document.createElement("style");
			style.textContent = `
			::view-transition-old(root), ::view-transition-new(root) {
				mix-blend-mode: normal !important;
				animation: none !important;
			}
		`;
			function transitionCallback() {
				(0, import_react_dom.flushSync)(() => {
					toggleTheme();
					timeout = setTimeout(() => {
						clearTimeout(timeout);
						document.head.removeChild(style);
					}, 1e3);
				});
			}
			document.head.appendChild(style);
			await document.startViewTransition(transitionCallback).ready;
			const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
			const x = left + width / 2;
			const y = top + height / 2;
			const right = window.innerWidth - left;
			const bottom = window.innerHeight - top;
			const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
			document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] }, {
				duration: 500,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)"
			});
		}, [toggleTheme]),
		"aria-label": theme === "dark" ? i18n._({ id: "e0IFR-" }) : i18n._({ id: "yNR1Vx" }),
		...props,
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, { "aria-hidden": "true" })
	});
}
function Header() {
	const y = useMotionValue(0);
	const lastScroll = (0, import_react.useRef)(0);
	const ticking = (0, import_react.useRef)(false);
	const springY = useSpring(y, {
		stiffness: 300,
		damping: 40
	});
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		function onScroll() {
			const current = window.scrollY ?? 0;
			if (!ticking.current) {
				window.requestAnimationFrame(() => {
					if (current > 32 && current > lastScroll.current) y.set(-100);
					else y.set(0);
					lastScroll.current = current;
					ticking.current = false;
				});
				ticking.current = true;
			}
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [y]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
		style: { y: springY },
		className: "fixed inset-x-0 top-0 z-50 border-transparent border-b bg-background/80 backdrop-blur-lg transition-colors",
		initial: {
			y: -100,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: .35,
			ease: "easeOut"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": i18n._({ id: "HRha_x" }),
			className: "container mx-auto flex items-center gap-x-4 p-3 lg:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "transition-opacity hover:opacity-80",
				"aria-label": i18n._({ id: "JBTpau" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, { className: "size-10" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-x-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleCombobox, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "icon",
						variant: "ghost",
						"aria-label": i18n._({ id: "-DEogc" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggleButton, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-x-4 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GithubStarsButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							nativeButton: false,
							"aria-label": i18n._({ id: "10Xyas" }),
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, { "aria-hidden": "true" })
							})
						})]
					})
				]
			})]
		})
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#main-content",
			className: "sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "wELyS0" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	] });
}
//#endregion
export { RouteComponent as component };
