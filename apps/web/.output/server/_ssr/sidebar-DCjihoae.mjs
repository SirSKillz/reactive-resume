import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { a as useWindowSize } from "../_libs/usehooks-ts.mjs";
import { i as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sidebar-DCjihoae.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
var BUILDER_LAYOUT_COOKIE_NAME = "builder_layout";
var DEFAULT_BUILDER_LAYOUT = {
	left: 22,
	artboard: 56,
	right: 22
};
var mapPanelLayoutToBuilderLayout = (layout) => {
	const left = layout.left;
	const artboard = layout.artboard;
	const right = layout.right;
	if (typeof left !== "number" || typeof artboard !== "number" || typeof right !== "number") return DEFAULT_BUILDER_LAYOUT;
	return {
		left,
		artboard,
		right
	};
};
var parseBuilderLayoutCookie = (value) => {
	if (!value) return DEFAULT_BUILDER_LAYOUT;
	try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) return DEFAULT_BUILDER_LAYOUT;
		if (typeof parsed !== "object" || parsed === null) return DEFAULT_BUILDER_LAYOUT;
		const left = parsed.left;
		const artboard = parsed.artboard;
		const right = parsed.right;
		if (typeof left !== "number" || typeof artboard !== "number" || typeof right !== "number") return DEFAULT_BUILDER_LAYOUT;
		return {
			left,
			artboard,
			right
		};
	} catch {
		return DEFAULT_BUILDER_LAYOUT;
	}
};
var useBuilderSidebarStore = create((set) => ({
	layout: DEFAULT_BUILDER_LAYOUT,
	leftSidebar: null,
	rightSidebar: null,
	setLayout: (layout) => set({ layout }),
	setLeftSidebar: (ref) => set({ leftSidebar: ref }),
	setRightSidebar: (ref) => set({ rightSidebar: ref })
}));
function useBuilderSidebar(selector) {
	const isMobile = useIsMobile();
	const { width } = useWindowSize();
	const maxSidebarSize = (0, import_react.useMemo)(() => {
		if (!width) return 0;
		return isMobile ? "95%" : "45%";
	}, [width, isMobile]);
	const collapsedSidebarSize = (0, import_react.useMemo)(() => {
		if (!width) return 0;
		return isMobile ? 0 : 48;
	}, [width, isMobile]);
	const expandSize = (0, import_react.useMemo)(() => isMobile ? "95%" : "30%", [isMobile]);
	const isCollapsed = (0, import_react.useCallback)((side) => {
		const sidebar = side === "left" ? useBuilderSidebarStore.getState().leftSidebar?.current : useBuilderSidebarStore.getState().rightSidebar?.current;
		if (!sidebar) return false;
		return sidebar.isCollapsed();
	}, []);
	const toggleSidebar = (0, import_react.useCallback)((side, forceState) => {
		const sidebar = side === "left" ? useBuilderSidebarStore.getState().leftSidebar?.current : useBuilderSidebarStore.getState().rightSidebar?.current;
		if (!sidebar) return;
		if (forceState === void 0 ? sidebar.isCollapsed() : forceState) sidebar.resize(expandSize);
		else sidebar.collapse();
	}, [expandSize]);
	const state = (0, import_react.useMemo)(() => {
		return {
			maxSidebarSize,
			collapsedSidebarSize,
			isCollapsed,
			toggleSidebar
		};
	}, [
		maxSidebarSize,
		collapsedSidebarSize,
		isCollapsed,
		toggleSidebar
	]);
	return selector ? selector(state) : state;
}
//#endregion
export { useBuilderSidebar as a, parseBuilderLayoutCookie as i, DEFAULT_BUILDER_LAYOUT as n, useBuilderSidebarStore as o, mapPanelLayoutToBuilderLayout as r, useIsMobile as s, BUILDER_LAYOUT_COOKIE_NAME as t };
