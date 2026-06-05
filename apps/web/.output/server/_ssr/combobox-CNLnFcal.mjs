import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { i as isLocale, l as setLocaleServerFn, o as loadLocale, s as localeMap } from "./locale-BLKR2gqe.mjs";
import { r as useLingui } from "../_libs/lingui__react.mjs";
import { t as Combobox$1 } from "./combobox-zQflN6sS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/combobox-CNLnFcal.js
var import_jsx_runtime = require_jsx_runtime();
var getLocaleOptions = () => {
	return Object.entries(localeMap).map(([value, label]) => ({
		value,
		label: i18n.t(label),
		keywords: [i18n.t(label)]
	}));
};
function LocaleCombobox(props) {
	const { i18n } = useLingui();
	const onLocaleChange = async (value) => {
		if (!value || !isLocale(value)) return;
		await Promise.all([loadLocale(value), setLocaleServerFn({ data: value })]);
		window.location.reload();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
		showClear: false,
		defaultValue: i18n.locale,
		options: getLocaleOptions(),
		onValueChange: onLocaleChange,
		...props
	});
}
//#endregion
export { getLocaleOptions as n, LocaleCombobox as t };
