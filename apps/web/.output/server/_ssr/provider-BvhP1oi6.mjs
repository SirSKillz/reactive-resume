import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as createServerFn, r as getCookie } from "./ssr.mjs";
import { t as createSsrRpc } from "./locale-BLKR2gqe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider-BvhP1oi6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var themeSchema = zod_default.union([zod_default.literal("light"), zod_default.literal("dark")]);
var storageKey = "theme";
var defaultTheme = "dark";
var themeMap = {
	light: { id: "1njn7W" },
	dark: { id: "pvnfJD" }
};
function isTheme(theme) {
	return themeSchema.safeParse(theme).success;
}
var getTheme = async () => {
	const cookieTheme = getCookie(storageKey);
	if (!cookieTheme || !isTheme(cookieTheme)) return defaultTheme;
	return cookieTheme;
};
var setThemeServerFn = createServerFn({ method: "POST" }).inputValidator(themeSchema).handler(createSsrRpc("cbaacab2668c19cd3660647918abeb2b9ef6dd2a2800668bedfd3923a24987d3"));
var ThemeContext = (0, import_react.createContext)(null);
function ThemeProvider({ children, theme }) {
	const router = useRouter();
	async function setTheme(value, options = {}) {
		const { playSound = true } = options;
		document.documentElement.classList.toggle("dark", value === "dark");
		await setThemeServerFn({ data: value });
		router.invalidate();
		if (!playSound) return;
		try {
			await new Audio(value === "dark" ? "/sounds/switch-off.mp3" : "/sounds/switch-on.mp3").play();
		} catch {}
	}
	function toggleTheme(options = {}) {
		setTheme(theme === "dark" ? "light" : "dark", options);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext, {
		value: {
			theme,
			setTheme,
			toggleTheme
		},
		children
	});
}
function useTheme() {
	const value = (0, import_react.use)(ThemeContext);
	if (!value) throw new Error("useTheme must be used within a ThemeProvider");
	return value;
}
//#endregion
export { themeMap as a, setThemeServerFn as i, getTheme as n, useTheme as o, isTheme as r, ThemeProvider as t };
