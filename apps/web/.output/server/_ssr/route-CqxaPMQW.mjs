import { n as createServerFn, o as setCookie$1, r as getCookie } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CA2DYK2h.mjs";
import { i as parseBuilderLayoutCookie, n as DEFAULT_BUILDER_LAYOUT, t as BUILDER_LAYOUT_COOKIE_NAME } from "./sidebar-DCjihoae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CqxaPMQW.js
var setBuilderLayoutServerFn_createServerFn_handler = createServerRpc({
	id: "4cf8a2dd9971804ed852b0e8800e0801d53148f92b5cde984ecc2402a068ba3c",
	name: "setBuilderLayoutServerFn",
	filename: "src/routes/builder/$resumeId/route.tsx"
}, (opts) => setBuilderLayoutServerFn.__executeServer(opts));
var setBuilderLayoutServerFn = createServerFn({ method: "POST" }).inputValidator((data) => parseBuilderLayoutCookie(JSON.stringify(data))).handler(setBuilderLayoutServerFn_createServerFn_handler, async ({ data }) => {
	setCookie$1(BUILDER_LAYOUT_COOKIE_NAME, JSON.stringify(data), { path: "/" });
});
var getBuilderLayoutServerFn_createServerFn_handler = createServerRpc({
	id: "87b9e274e18165348265760f0c6066b95da714ecd2e1a1b30427498be3225e01",
	name: "getBuilderLayoutServerFn",
	filename: "src/routes/builder/$resumeId/route.tsx"
}, (opts) => getBuilderLayoutServerFn.__executeServer(opts));
var getBuilderLayoutServerFn = createServerFn({ method: "GET" }).handler(getBuilderLayoutServerFn_createServerFn_handler, async () => {
	const layout = getCookie(BUILDER_LAYOUT_COOKIE_NAME);
	if (!layout) return DEFAULT_BUILDER_LAYOUT;
	return parseBuilderLayoutCookie(layout);
});
//#endregion
export { getBuilderLayoutServerFn_createServerFn_handler, setBuilderLayoutServerFn_createServerFn_handler };
