import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { n as createServerFn, o as setCookie$1 } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CA2DYK2h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-C7g8HLPh.js
var themeSchema = zod_default.union([zod_default.literal("light"), zod_default.literal("dark")]);
var storageKey = "theme";
var setThemeServerFn_createServerFn_handler = createServerRpc({
	id: "cbaacab2668c19cd3660647918abeb2b9ef6dd2a2800668bedfd3923a24987d3",
	name: "setThemeServerFn",
	filename: "src/libs/theme.ts"
}, (opts) => setThemeServerFn.__executeServer(opts));
var setThemeServerFn = createServerFn({ method: "POST" }).inputValidator(themeSchema).handler(setThemeServerFn_createServerFn_handler, async ({ data }) => {
	setCookie$1(storageKey, data);
});
//#endregion
export { setThemeServerFn_createServerFn_handler };
