//#region ../../node_modules/.pnpm/@lingui+core@6.0.1_babel-plugin-macros@3.1.0/node_modules/@lingui/core/dist/index.mjs
var isString = (s) => typeof s === "string";
var isFunction = (f) => typeof f === "function";
var cache = /* @__PURE__ */ new Map();
var defaultLocale = "en";
function normalizeLocales(locales) {
	return [...Array.isArray(locales) ? locales : [locales], defaultLocale];
}
function date(locales, value, format) {
	const _locales = normalizeLocales(locales);
	if (!format) format = "default";
	let o;
	if (typeof format === "string") {
		o = {
			day: "numeric",
			month: "short",
			year: "numeric"
		};
		switch (format) {
			case "full": o.weekday = "long";
			case "long":
				o.month = "long";
				break;
			case "short":
				o.month = "numeric";
				break;
		}
	} else o = format;
	return getMemoized(() => cacheKey("date", _locales, format), () => new Intl.DateTimeFormat(_locales, o)).format(isString(value) ? new Date(value) : value);
}
function time(locales, value, format) {
	let o;
	if (!format) format = "default";
	if (typeof format === "string") {
		o = {
			second: "numeric",
			minute: "numeric",
			hour: "numeric"
		};
		switch (format) {
			case "full":
			case "long":
				o.timeZoneName = "short";
				break;
			case "short": delete o.second;
		}
	} else o = format;
	return date(locales, value, o);
}
function number(locales, value, format) {
	const _locales = normalizeLocales(locales);
	return getMemoized(() => cacheKey("number", _locales, format), () => new Intl.NumberFormat(_locales, format)).format(value);
}
function plural(locales, ordinal, value, { offset = 0, ...rules }) {
	const _locales = normalizeLocales(locales);
	const plurals = ordinal ? getMemoized(() => cacheKey("plural-ordinal", _locales), () => new Intl.PluralRules(_locales, { type: "ordinal" })) : getMemoized(() => cacheKey("plural-cardinal", _locales), () => new Intl.PluralRules(_locales, { type: "cardinal" }));
	return rules[value] ?? rules[plurals.select(value - offset)] ?? rules.other;
}
function getMemoized(getKey, construct) {
	const key = getKey();
	let formatter = cache.get(key);
	if (!formatter) {
		formatter = construct();
		cache.set(key, formatter);
	}
	return formatter;
}
function cacheKey(type, locales, options) {
	return `${type}-${locales.join("-")}-${JSON.stringify(options)}`;
}
var ESCAPE_SEQUENCE_REGEX = /\\u[a-fA-F0-9]{4}|\\x[a-fA-F0-9]{2}/;
var decodeEscapeSequences = (str) => {
	return str.replace(/\\u([a-fA-F0-9]{4})|\\x([a-fA-F0-9]{2})/g, (_, unicode, hex) => {
		if (unicode) {
			const codePoint = parseInt(unicode, 16);
			return String.fromCharCode(codePoint);
		} else {
			const codePoint = parseInt(hex, 16);
			return String.fromCharCode(codePoint);
		}
	});
};
var OCTOTHORPE_PH = "%__lingui_octothorpe__%";
var getDefaultFormats = (locale, passedLocales, formats = {}) => {
	const locales = passedLocales || locale;
	const style = (format) => {
		if (typeof format === "object") return format;
		return formats[format];
	};
	const replaceOctothorpe = (value, message) => {
		const valueStr = number(locales, value, Object.keys(formats).length ? style("number") : void 0);
		return message.replace(new RegExp(OCTOTHORPE_PH, "g"), valueStr);
	};
	return {
		plural: (value, cases) => {
			const { offset = 0 } = cases;
			const message = plural(locales, false, value, cases);
			return replaceOctothorpe(value - offset, message);
		},
		selectordinal: (value, cases) => {
			const { offset = 0 } = cases;
			const message = plural(locales, true, value, cases);
			return replaceOctothorpe(value - offset, message);
		},
		select: selectFormatter,
		number: (value, format) => number(locales, value, style(format) || { style: format }),
		date: (value, format) => date(locales, value, style(format) || format),
		time: (value, format) => time(locales, value, style(format) || format)
	};
};
var selectFormatter = (value, rules) => rules[value] ?? rules.other;
function interpolate(translation, locale, locales) {
	return (values = {}, formats) => {
		const formatters = getDefaultFormats(locale, locales, formats);
		const formatMessage = (tokens, replaceOctothorpe = false) => {
			if (!Array.isArray(tokens)) return tokens;
			return tokens.reduce((message, token) => {
				if (token === "#" && replaceOctothorpe) return message + OCTOTHORPE_PH;
				if (isString(token)) return message + token;
				const [name, type, format] = token;
				let interpolatedFormat = {};
				if (type === "plural" || type === "selectordinal" || type === "select") Object.entries(format).forEach(([key, value2]) => {
					interpolatedFormat[key] = formatMessage(value2, type === "plural" || type === "selectordinal");
				});
				else interpolatedFormat = format;
				let value;
				if (type) {
					const formatter = formatters[type];
					value = formatter(values[name], interpolatedFormat);
				} else value = values[name];
				if (value == null) return message;
				return message + value;
			}, "");
		};
		const result = formatMessage(translation);
		if (isString(result) && ESCAPE_SEQUENCE_REGEX.test(result)) return decodeEscapeSequences(result);
		if (isString(result)) return result;
		return result ? String(result) : "";
	};
}
var EventEmitter = class {
	_events = {};
	on(event, listener) {
		this._events[event] ??= /* @__PURE__ */ new Set();
		this._events[event].add(listener);
		return () => this.removeListener(event, listener);
	}
	removeListener(event, listener) {
		const listeners = this._events[event];
		listeners?.delete(listener);
		if (listeners?.size === 0) delete this._events[event];
	}
	emit(event, ...args) {
		const listeners = this._events[event];
		if (!listeners) return;
		for (const listener of [...listeners]) listener.apply(this, args);
	}
};
var I18n = class extends EventEmitter {
	_locale = "";
	_locales;
	_messages = {};
	_missing;
	_messageCompiler;
	constructor(params) {
		super();
		if (params.missing != null) this._missing = params.missing;
		if (params.messages != null) this.load(params.messages);
		if (typeof params.locale === "string" || params.locales) this.activate(params.locale ?? defaultLocale, params.locales);
	}
	get locale() {
		return this._locale;
	}
	get locales() {
		return this._locales;
	}
	get messages() {
		return this._messages[this._locale] ?? {};
	}
	/**
	* Registers a `MessageCompiler` to enable the use of uncompiled catalogs at runtime.
	*
	* In production builds, the `MessageCompiler` is typically excluded to reduce bundle size.
	* By default, message catalogs should be precompiled during the build process. However,
	* if you need to compile catalogs at runtime, you can use this method to set a message compiler.
	*
	* Example usage:
	*
	* ```ts
	* import { compileMessage } from "@lingui/message-utils/compileMessage";
	*
	* i18n.setMessagesCompiler(compileMessage);
	* ```
	*/
	setMessagesCompiler(compiler) {
		this._messageCompiler = compiler;
		return this;
	}
	_load(locale, messages) {
		const maybeMessages = this._messages[locale];
		if (!maybeMessages) this._messages[locale] = messages;
		else Object.assign(maybeMessages, messages);
	}
	load(localeOrMessages, messages) {
		if (typeof localeOrMessages == "string" && typeof messages === "object") this._load(localeOrMessages, messages);
		else Object.entries(localeOrMessages).forEach(([locale, messages2]) => this._load(locale, messages2));
		this.emit("change");
	}
	/**
	* @param options {@link LoadAndActivateOptions}
	*/
	loadAndActivate({ locale, locales, messages }) {
		this._locale = locale;
		this._locales = locales || void 0;
		this._messages[this._locale] = messages;
		this.emit("change");
	}
	activate(locale, locales) {
		this._locale = locale;
		this._locales = locales;
		this.emit("change");
	}
	_(id, values, options) {
		if (!this.locale) throw new Error("Lingui: Attempted to call a translation function without setting a locale.\nMake sure to call `i18n.activate(locale)` before using Lingui functions.\nThis issue may also occur due to a race condition in your initialization logic.");
		let message = options?.message;
		if (!id) id = "";
		if (!isString(id)) {
			values = id.values || values;
			message = id.message;
			id = id.id;
		}
		const messageForId = this.messages[id];
		const messageMissing = messageForId === void 0;
		const missing = this._missing;
		if (missing && messageMissing) return isFunction(missing) ? missing(this._locale, id) : missing;
		if (messageMissing) this.emit("missing", {
			id,
			locale: this._locale
		});
		let translation = messageForId || message || id;
		if (isString(translation)) if (this._messageCompiler) translation = this._messageCompiler(translation);
		else console.warn(`Uncompiled message detected! Message:

> ${translation}

That means you use raw catalog or your catalog doesn't have a translation for the message and fallback was used.
ICU features such as interpolation and plurals will not work properly for that message. 

Please compile your catalog first. 
`);
		if (isString(translation) && ESCAPE_SEQUENCE_REGEX.test(translation)) return decodeEscapeSequences(translation);
		if (isString(translation)) return translation;
		return interpolate(translation, this._locale, this._locales)(values, options?.formats);
	}
	/**
	* Alias for {@see I18n._}
	*/
	t = this._.bind(this);
	/**
	* @deprecated Use `Intl.DateTimeFormat` directly. This helper will be removed.
	*/
	date(value, format) {
		return date(this._locales || this._locale, value, format);
	}
	/**
	* @deprecated Use `Intl.NumberFormat` directly. This helper will be removed.
	*/
	number(value, format) {
		return number(this._locales || this._locale, value, format);
	}
};
function setupI18n(params = {}) {
	return new I18n(params);
}
var i18n = setupI18n();
//#endregion
export { setupI18n as n, i18n as t };
