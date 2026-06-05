import { n as localeSchema } from "./locale-C8G6l4Mo.mjs";
import { a as getServerFnById, n as createServerFn, r as getCookie, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/locale-BLKR2gqe.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var storageKey = "locale";
var defaultLocale = "en-US";
var messageLoaders = /* @__PURE__ */ Object.assign({
	"../../locales/af-ZA.po": () => import("./af-ZA-DU3OBhW1.mjs"),
	"../../locales/am-ET.po": () => import("./am-ET-BrdHALh5.mjs"),
	"../../locales/ar-SA.po": () => import("./ar-SA-BSuBPX1l.mjs"),
	"../../locales/az-AZ.po": () => import("./az-AZ-z9SIrD_N.mjs"),
	"../../locales/bg-BG.po": () => import("./bg-BG-QqxIcF4o.mjs"),
	"../../locales/bn-BD.po": () => import("./bn-BD-Co5MApT-.mjs"),
	"../../locales/ca-ES.po": () => import("./ca-ES-BxZfN117.mjs"),
	"../../locales/cs-CZ.po": () => import("./cs-CZ-BE-_SQWP.mjs"),
	"../../locales/da-DK.po": () => import("./da-DK-9Cg2fLTb.mjs"),
	"../../locales/de-DE.po": () => import("./de-DE-BHWgq2Sg.mjs"),
	"../../locales/el-GR.po": () => import("./el-GR-MvEYUAca.mjs"),
	"../../locales/en-GB.po": () => import("./en-GB-BpgZxRMj.mjs"),
	"../../locales/en-US.po": () => import("./en-US-R_mSruhf.mjs"),
	"../../locales/es-ES.po": () => import("./es-ES-BAguay1o.mjs"),
	"../../locales/fa-IR.po": () => import("./fa-IR-Cv9JU0cw.mjs"),
	"../../locales/fi-FI.po": () => import("./fi-FI-CBNxBrUM.mjs"),
	"../../locales/fr-FR.po": () => import("./fr-FR-Cotx1ZZj.mjs"),
	"../../locales/he-IL.po": () => import("./he-IL-zrn3xhnU.mjs"),
	"../../locales/hi-IN.po": () => import("./hi-IN-H9lvN4mU.mjs"),
	"../../locales/hu-HU.po": () => import("./hu-HU-552Tv66u.mjs"),
	"../../locales/id-ID.po": () => import("./id-ID-pF3AN2Kj.mjs"),
	"../../locales/it-IT.po": () => import("./it-IT-CkGev9F5.mjs"),
	"../../locales/ja-JP.po": () => import("./ja-JP-Dvp1y8Sk.mjs"),
	"../../locales/km-KH.po": () => import("./km-KH-armuyLGB.mjs"),
	"../../locales/kn-IN.po": () => import("./kn-IN-BlyGwtvi.mjs"),
	"../../locales/ko-KR.po": () => import("./ko-KR-DNMBTRWD.mjs"),
	"../../locales/lt-LT.po": () => import("./lt-LT-CP8DjBnp.mjs"),
	"../../locales/lv-LV.po": () => import("./lv-LV-Bb27mFZE.mjs"),
	"../../locales/ml-IN.po": () => import("./ml-IN-bqa9Z7oQ.mjs"),
	"../../locales/mr-IN.po": () => import("./mr-IN-DfEIyA6l.mjs"),
	"../../locales/ms-MY.po": () => import("./ms-MY-SoESkFMD.mjs"),
	"../../locales/ne-NP.po": () => import("./ne-NP-Be4jej0j.mjs"),
	"../../locales/nl-NL.po": () => import("./nl-NL-DnoSgVjq.mjs"),
	"../../locales/no-NO.po": () => import("./no-NO-BYbRGFIX.mjs"),
	"../../locales/or-IN.po": () => import("./or-IN-C-41NymM.mjs"),
	"../../locales/pl-PL.po": () => import("./pl-PL-D_m_EzeP.mjs"),
	"../../locales/pt-BR.po": () => import("./pt-BR-DHIt9BMj.mjs"),
	"../../locales/pt-PT.po": () => import("./pt-PT-CK7_zM85.mjs"),
	"../../locales/ro-RO.po": () => import("./ro-RO-DDRP7_RI.mjs"),
	"../../locales/ru-RU.po": () => import("./ru-RU-EGC7eEkG.mjs"),
	"../../locales/sk-SK.po": () => import("./sk-SK-BXann_v3.mjs"),
	"../../locales/sl-SI.po": () => import("./sl-SI-CIAlQZm4.mjs"),
	"../../locales/sq-AL.po": () => import("./sq-AL-DXMDP1fn.mjs"),
	"../../locales/sr-SP.po": () => import("./sr-SP-4-OO-z7i.mjs"),
	"../../locales/sv-SE.po": () => import("./sv-SE-BzKcTA2k.mjs"),
	"../../locales/ta-IN.po": () => import("./ta-IN-Dw_edUCq.mjs"),
	"../../locales/te-IN.po": () => import("./te-IN-CoKJyl3Q.mjs"),
	"../../locales/th-TH.po": () => import("./th-TH-D4a5sLVS.mjs"),
	"../../locales/tr-TR.po": () => import("./tr-TR-B_n7XlSq.mjs"),
	"../../locales/uk-UA.po": () => import("./uk-UA-zE3xBfAb.mjs"),
	"../../locales/uz-UZ.po": () => import("./uz-UZ-BovvtSsJ.mjs"),
	"../../locales/vi-VN.po": () => import("./vi-VN-DU6_SMdn.mjs"),
	"../../locales/zh-CN.po": () => import("./zh-CN-BwoNFB73.mjs"),
	"../../locales/zh-TW.po": () => import("./zh-TW-BF-ewhFy.mjs"),
	"../../locales/zu-ZA.po": () => import("./zu-ZA-Ban8b6t_.mjs")
});
var localeMap = {
	"af-ZA": { id: "1Cox_a" },
	"am-ET": { id: "UV0J8D" },
	"ar-SA": { id: "8HV3WN" },
	"az-AZ": { id: "_IkoRr" },
	"bg-BG": { id: "KhEBDR" },
	"bn-BD": { id: "Hds3Bq" },
	"ca-ES": { id: "M1RLfx" },
	"cs-CZ": { id: "w9VTXG" },
	"da-DK": { id: "Fo2vDn" },
	"de-DE": { id: "DDcvSo" },
	"el-GR": { id: "CZXzs4" },
	"en-US": { id: "lYGfRP" },
	"en-GB": { id: "PiMnH3" },
	"es-ES": { id: "65A04M" },
	"fa-IR": { id: "JFI3iH" },
	"fi-FI": { id: "USZ2N6" },
	"fr-FR": { id: "nLC6tu" },
	"he-IL": { id: "3oTCgM" },
	"hi-IN": { id: "tGjibo" },
	"hu-HU": { id: "mkWad2" },
	"id-ID": { id: "BQukYF" },
	"it-IT": { id: "Lj7sBL" },
	"ja-JP": { id: "dFtidv" },
	"km-KH": { id: "Fb6WVr" },
	"kn-IN": { id: "ffJEXe" },
	"ko-KR": { id: "h6S9Yz" },
	"lt-LT": { id: "Ot2qtY" },
	"lv-LV": { id: "_0YsGP" },
	"ml-IN": { id: "WQrafy" },
	"mr-IN": { id: "vKSpmV" },
	"ms-MY": { id: "tF97tn" },
	"ne-NP": { id: "3v9KAT" },
	"nl-NL": { id: "KIjvtr" },
	"no-NO": { id: "1IipHp" },
	"or-IN": { id: "S8nPbQ" },
	"pl-PL": { id: "trnWaw" },
	"pt-BR": { id: "R7-D0_" },
	"pt-PT": { id: "512Uma" },
	"ro-RO": { id: "uJc01W" },
	"ru-RU": { id: "nji0_X" },
	"sk-SK": { id: "paESr6" },
	"sl-SI": { id: "LSdcWW" },
	"sq-AL": { id: "pVxf7b" },
	"sr-SP": { id: "9aBtdW" },
	"sv-SE": { id: "UaISq3" },
	"ta-IN": { id: "fb427h" },
	"te-IN": { id: "2SnOmG" },
	"th-TH": { id: "SUr44j" },
	"tr-TR": { id: "Kz91g_" },
	"uk-UA": { id: "V9-2pH" },
	"uz-UZ": { id: "b1dG47" },
	"vi-VN": { id: "fROFIL" },
	"zh-CN": { id: "6imsQS" },
	"zh-TW": { id: "DM4gBB" },
	"zu-ZA": { id: "-v7Dt7" }
};
function isLocale(locale) {
	return localeSchema.safeParse(locale).success;
}
var resolveLocale = (locale) => {
	return isLocale(locale) ? locale : defaultLocale;
};
var RTL_LANGUAGES = new Set([
	"ar",
	"ckb",
	"dv",
	"fa",
	"he",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function isRTL(locale) {
	const language = locale.split("-")[0].toLowerCase();
	return RTL_LANGUAGES.has(language);
}
var getLocale = async () => {
	const cookieLocale = getCookie(storageKey);
	if (!cookieLocale || !isLocale(cookieLocale)) return defaultLocale;
	return cookieLocale;
};
var setLocaleServerFn = createServerFn({ method: "POST" }).inputValidator(localeSchema).handler(createSsrRpc("6fbd2aa7887e8a8f1ec791a02f3824d43d7540e488aa6b5e39a5b61b2ace6459"));
var loadMessages = async (locale) => {
	const load = messageLoaders[`../../locales/${locale}.po`];
	if (!load) throw new Error(`Unknown locale: ${locale}`);
	const { messages } = await load();
	return messages;
};
var getLocaleMessages = async (locale) => {
	const resolvedLocale = resolveLocale(locale);
	let messages;
	try {
		messages = await loadMessages(resolvedLocale);
		return {
			locale: resolvedLocale,
			messages
		};
	} catch {
		messages = await loadMessages(defaultLocale);
		return {
			locale: defaultLocale,
			messages
		};
	}
};
var loadLocale = async (locale) => {
	const { locale: resolvedLocale, messages } = await getLocaleMessages(locale);
	i18n.loadAndActivate({
		locale: resolvedLocale,
		messages
	});
};
//#endregion
export { isRTL as a, resolveLocale as c, isLocale as i, setLocaleServerFn as l, getLocale as n, loadLocale as o, getLocaleMessages as r, localeMap as s, createSsrRpc as t };
