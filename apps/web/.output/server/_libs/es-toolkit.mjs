//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function isUnsafeProperty(key) {
	return key === "__proto__";
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/_internal/isDeepKey.mjs
function isDeepKey(key) {
	switch (typeof key) {
		case "number":
		case "symbol": return false;
		case "string": return key.includes(".") || key.includes("[") || key.includes("]");
	}
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/_internal/toKey.mjs
function toKey(value) {
	if (typeof value === "string" || typeof value === "symbol") return value;
	if (Object.is(value?.valueOf?.(), -0)) return "-0";
	return String(value);
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/util/toString.mjs
function toString(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map(toString).join(",");
	const result = String(value);
	if (result === "0" && Object.is(Number(value), -0)) return "-0";
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/util/toPath.mjs
function toPath(deepKey) {
	if (Array.isArray(deepKey)) return deepKey.map(toKey);
	if (typeof deepKey === "symbol") return [deepKey];
	deepKey = toString(deepKey);
	const result = [];
	const length = deepKey.length;
	if (length === 0) return result;
	let index = 0;
	let key = "";
	let quoteChar = "";
	let bracket = false;
	if (deepKey.charCodeAt(0) === 46) {
		result.push("");
		index++;
	}
	while (index < length) {
		const char = deepKey[index];
		if (quoteChar) if (char === "\\" && index + 1 < length) {
			index++;
			key += deepKey[index];
		} else if (char === quoteChar) quoteChar = "";
		else key += char;
		else if (bracket) if (char === "\"" || char === "'") quoteChar = char;
		else if (char === "]") {
			bracket = false;
			result.push(key);
			key = "";
		} else key += char;
		else if (char === "[") {
			bracket = true;
			if (key) {
				result.push(key);
				key = "";
			}
		} else if (char === ".") {
			if (key) {
				result.push(key);
				key = "";
			}
		} else key += char;
		index++;
	}
	if (key) result.push(key);
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/object/get.mjs
function get(object, path, defaultValue) {
	if (object == null) return defaultValue;
	switch (typeof path) {
		case "string": {
			if (isUnsafeProperty(path)) return defaultValue;
			const result = object[path];
			if (result === void 0) if (isDeepKey(path)) return get(object, toPath(path), defaultValue);
			else return defaultValue;
			return result;
		}
		case "number":
		case "symbol": {
			if (typeof path === "number") path = toKey(path);
			const result = object[path];
			if (result === void 0) return defaultValue;
			return result;
		}
		default: {
			if (Array.isArray(path)) return getWithPath(object, path, defaultValue);
			if (Object.is(path?.valueOf(), -0)) path = "-0";
			else path = String(path);
			if (isUnsafeProperty(path)) return defaultValue;
			const result = object[path];
			if (result === void 0) return defaultValue;
			return result;
		}
	}
}
function getWithPath(object, path, defaultValue) {
	if (path.length === 0) return defaultValue;
	let current = object;
	for (let index = 0; index < path.length; index++) {
		if (current == null) return defaultValue;
		if (isUnsafeProperty(path[index])) return defaultValue;
		current = current[path[index]];
	}
	if (current === void 0) return defaultValue;
	return current;
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.mjs
function isEqualsSameValueZero(value, other) {
	return value === other || Number.isNaN(value) && Number.isNaN(other);
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function getSymbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function getTag(value) {
	if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
	return Object.prototype.toString.call(value);
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var regexpTag = "[object RegExp]";
var stringTag = "[object String]";
var numberTag = "[object Number]";
var booleanTag = "[object Boolean]";
var symbolTag = "[object Symbol]";
var dateTag = "[object Date]";
var mapTag = "[object Map]";
var setTag = "[object Set]";
var arrayTag = "[object Array]";
var functionTag = "[object Function]";
var arrayBufferTag = "[object ArrayBuffer]";
var objectTag = "[object Object]";
var errorTag = "[object Error]";
var dataViewTag = "[object DataView]";
var uint8ArrayTag = "[object Uint8Array]";
var uint8ClampedArrayTag = "[object Uint8ClampedArray]";
var uint16ArrayTag = "[object Uint16Array]";
var uint32ArrayTag = "[object Uint32Array]";
var bigUint64ArrayTag = "[object BigUint64Array]";
var int8ArrayTag = "[object Int8Array]";
var int16ArrayTag = "[object Int16Array]";
var int32ArrayTag = "[object Int32Array]";
var bigInt64ArrayTag = "[object BigInt64Array]";
var float32ArrayTag = "[object Float32Array]";
var float64ArrayTag = "[object Float64Array]";
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/_internal/globalThis.mjs
var globalThis_ = typeof globalThis === "object" && globalThis || typeof window === "object" && window || typeof self === "object" && self || typeof global === "object" && global || (function() {
	return this;
})() || Function("return this")();
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function isBuffer(x) {
	return typeof globalThis_.Buffer !== "undefined" && globalThis_.Buffer.isBuffer(x);
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/function/debounce.mjs
function debounce(func, debounceMs, { signal, edges } = {}) {
	let pendingThis = void 0;
	let pendingArgs = null;
	const leading = edges != null && edges.includes("leading");
	const trailing = edges == null || edges.includes("trailing");
	const invoke = () => {
		if (pendingArgs !== null) {
			func.apply(pendingThis, pendingArgs);
			pendingThis = void 0;
			pendingArgs = null;
		}
	};
	const onTimerEnd = () => {
		if (trailing) invoke();
		cancel();
	};
	let timeoutId = null;
	const schedule = () => {
		if (timeoutId != null) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			timeoutId = null;
			onTimerEnd();
		}, debounceMs);
	};
	const cancelTimer = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};
	const cancel = () => {
		cancelTimer();
		pendingThis = void 0;
		pendingArgs = null;
	};
	const flush = () => {
		invoke();
	};
	const debounced = function(...args) {
		if (signal?.aborted) return;
		pendingThis = this;
		pendingArgs = args;
		const isFirstCall = timeoutId == null;
		schedule();
		if (leading && isFirstCall) invoke();
	};
	debounced.schedule = schedule;
	debounced.cancel = cancel;
	debounced.flush = flush;
	signal?.addEventListener("abort", cancel, { once: true });
	return debounced;
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function isPlainObject(value) {
	if (!value || typeof value !== "object") return false;
	const proto = Object.getPrototypeOf(value);
	if (!(proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null)) return false;
	return Object.prototype.toString.call(value) === "[object Object]";
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function isEqualWith(a, b, areValuesEqual) {
	return isEqualWithImpl(a, b, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a, b, property, aParent, bParent, stack, areValuesEqual) {
	const result = areValuesEqual(a, b, property, aParent, bParent, stack);
	if (result !== void 0) return result;
	if (typeof a === typeof b) switch (typeof a) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return a === b;
		case "number": return a === b || Object.is(a, b);
		case "function": return a === b;
		case "object": return areObjectsEqual(a, b, stack, areValuesEqual);
	}
	return areObjectsEqual(a, b, stack, areValuesEqual);
}
function areObjectsEqual(a, b, stack, areValuesEqual) {
	if (Object.is(a, b)) return true;
	let aTag = getTag(a);
	let bTag = getTag(b);
	if (aTag === "[object Arguments]") aTag = objectTag;
	if (bTag === "[object Arguments]") bTag = objectTag;
	if (aTag !== bTag) return false;
	switch (aTag) {
		case stringTag: return a.toString() === b.toString();
		case numberTag: return isEqualsSameValueZero(a.valueOf(), b.valueOf());
		case booleanTag:
		case dateTag:
		case symbolTag: return Object.is(a.valueOf(), b.valueOf());
		case regexpTag: return a.source === b.source && a.flags === b.flags;
		case functionTag: return a === b;
	}
	stack = stack ?? /* @__PURE__ */ new Map();
	const aStack = stack.get(a);
	const bStack = stack.get(b);
	if (aStack != null && bStack != null) return aStack === b;
	stack.set(a, b);
	stack.set(b, a);
	try {
		switch (aTag) {
			case mapTag:
				if (a.size !== b.size) return false;
				for (const [key, value] of a.entries()) if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) return false;
				return true;
			case setTag: {
				if (a.size !== b.size) return false;
				const aValues = Array.from(a.values());
				const bValues = Array.from(b.values());
				for (let i = 0; i < aValues.length; i++) {
					const aValue = aValues[i];
					const index = bValues.findIndex((bValue) => {
						return isEqualWithImpl(aValue, bValue, void 0, a, b, stack, areValuesEqual);
					});
					if (index === -1) return false;
					bValues.splice(index, 1);
				}
				return true;
			}
			case arrayTag:
			case uint8ArrayTag:
			case uint8ClampedArrayTag:
			case uint16ArrayTag:
			case uint32ArrayTag:
			case bigUint64ArrayTag:
			case int8ArrayTag:
			case int16ArrayTag:
			case int32ArrayTag:
			case bigInt64ArrayTag:
			case float32ArrayTag:
			case float64ArrayTag:
				if (isBuffer(a) !== isBuffer(b)) return false;
				if (a.length !== b.length) return false;
				for (let i = 0; i < a.length; i++) if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) return false;
				return true;
			case arrayBufferTag:
				if (a.byteLength !== b.byteLength) return false;
				return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
			case dataViewTag:
				if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) return false;
				return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
			case errorTag: return a.name === b.name && a.message === b.message;
			case objectTag: {
				if (!(areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) || isPlainObject(a) && isPlainObject(b))) return false;
				const aKeys = [...Object.keys(a), ...getSymbols(a)];
				const bKeys = [...Object.keys(b), ...getSymbols(b)];
				if (aKeys.length !== bKeys.length) return false;
				for (let i = 0; i < aKeys.length; i++) {
					const propKey = aKeys[i];
					const aProp = a[propKey];
					if (!Object.hasOwn(b, propKey)) return false;
					const bProp = b[propKey];
					if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) return false;
				}
				return true;
			}
			default: return false;
		}
	} finally {
		stack.delete(a);
		stack.delete(b);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/function/noop.mjs
function noop() {}
//#endregion
//#region ../../node_modules/.pnpm/es-toolkit@1.46.1/node_modules/es-toolkit/dist/predicate/isEqual.mjs
function isEqual(a, b) {
	return isEqualWith(a, b, noop);
}
//#endregion
export { debounce as n, get as r, isEqual as t };
