import { n as localeSchema } from "./locale-C8G6l4Mo.mjs";
import { n as createServerFn, o as setCookie$1 } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CA2DYK2h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locale-B6ztwtuH.js
var storageKey = "locale";
var setLocaleServerFn_createServerFn_handler = createServerRpc({
	id: "6fbd2aa7887e8a8f1ec791a02f3824d43d7540e488aa6b5e39a5b61b2ace6459",
	name: "setLocaleServerFn",
	filename: "src/libs/locale.ts"
}, (opts) => setLocaleServerFn.__executeServer(opts));
var setLocaleServerFn = createServerFn({ method: "POST" }).inputValidator(localeSchema).handler(setLocaleServerFn_createServerFn_handler, async ({ data }) => {
	setCookie$1(storageKey, data);
});
//#endregion
export { setLocaleServerFn_createServerFn_handler };
