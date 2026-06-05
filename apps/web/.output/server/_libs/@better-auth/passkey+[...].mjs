import { r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { Bn as string, Dn as object, Dt as any, Fn as record, xt as _enum } from "../@ai-sdk/react+[...].mjs";
import { Y as generateRandomString, _t as defineErrorCodes, a as freshSessionMiddleware, b as mergeSchema, c as sessionMiddleware, ft as APIError, it as base64$1, m as setSessionCookie, o as getSessionFromCtx, ot as createAuthEndpoint, st as createAuthMiddleware } from "./api-key+[...].mjs";
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet, __decorate, __extends, __generator, __read, __spread, __values } from "tslib";
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/middlewares/authorization.mjs
/**
* Middleware that verifies the authenticated user owns a resource.
* Must be used after sessionMiddleware in the `use` array.
*
* Fetches the resource by ID from the request body or query,
* then verifies `resource[ownerField] === session.user.id`.
* Throws NOT_FOUND if the resource doesn't exist, FORBIDDEN if
* the user doesn't own it.
*
* The fetched resource is returned on `ctx.context.verifiedResource`
* so the handler can use it without a redundant DB query.
*/
function requireResourceOwnership(config) {
	const ownerField = config.ownerField ?? "userId";
	const forbiddenStatus = config.forbiddenStatus ?? "FORBIDDEN";
	return createAuthMiddleware(async (ctx) => {
		const session = ctx.context.session;
		if (!session?.user?.id) throw new APIError("UNAUTHORIZED");
		const resourceId = (config.idSource === "body" ? ctx.body : ctx.query)?.[config.idParam];
		if (!resourceId) throw new APIError("BAD_REQUEST", { message: `Missing required parameter: ${config.idParam}` });
		const resource = await ctx.context.adapter.findOne({
			model: config.model,
			where: [{
				field: "id",
				value: resourceId
			}]
		});
		if (!resource) {
			if (config.notFoundError) throw APIError.from("NOT_FOUND", config.notFoundError);
			throw new APIError("NOT_FOUND");
		}
		if (resource[ownerField] !== session.user.id) {
			if (config.forbiddenError) throw APIError.from(forbiddenStatus, config.forbiddenError);
			throw new APIError(forbiddenStatus);
		}
		return { verifiedResource: resource };
	});
}
//#endregion
//#region ../../node_modules/.pnpm/nanostores@1.3.0/node_modules/nanostores/atom/index.js
var listenerQueue = [];
var lqIndex = 0;
var QUEUE_ITEMS_PER_LISTENER = 4;
var nanostoresGlobal = globalThis.nanostoresGlobal ||= { epoch: 0 };
var atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
	let listeners = [];
	let $atom = {
		get() {
			if (!$atom.lc) $atom.listen(() => {})();
			return $atom.value;
		},
		init: initialValue,
		lc: 0,
		listen(listener) {
			$atom.lc = listeners.push(listener);
			return () => {
				for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;) if (listenerQueue[i] === listener) listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
				else i += QUEUE_ITEMS_PER_LISTENER;
				let index = listeners.indexOf(listener);
				if (~index) {
					listeners.splice(index, 1);
					if (!--$atom.lc) $atom.off();
				}
			};
		},
		notify(oldValue, changedKey) {
			nanostoresGlobal.epoch++;
			let runListenerQueue = !listenerQueue.length;
			for (let listener of listeners) listenerQueue.push(listener, $atom.value, oldValue, changedKey);
			if (runListenerQueue) {
				for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
				listenerQueue.length = 0;
			}
		},
		off() {},
		set(newValue) {
			let oldValue = $atom.value;
			if (oldValue !== newValue) {
				$atom.value = newValue;
				$atom.notify(oldValue);
			}
		},
		subscribe(listener) {
			let unbind = $atom.listen(listener);
			listener($atom.value);
			return unbind;
		},
		value: initialValue
	};
	return $atom;
};
//#endregion
//#region ../../node_modules/.pnpm/nanostores@1.3.0/node_modules/nanostores/lifecycle/index.js
var MOUNT = 5;
var UNMOUNT = 6;
var REVERT_MUTATION = 10;
var on = (object, listener, eventKey, mutateStore) => {
	object.events = object.events || {};
	if (!object.events[eventKey + REVERT_MUTATION]) object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
		object.events[eventKey].reduceRight((event, l) => (l(event), event), {
			shared: {},
			...eventProps
		});
	});
	object.events[eventKey] = object.events[eventKey] || [];
	object.events[eventKey].push(listener);
	return () => {
		let currentListeners = object.events[eventKey];
		let index = currentListeners.indexOf(listener);
		currentListeners.splice(index, 1);
		if (!currentListeners.length) {
			delete object.events[eventKey];
			object.events[eventKey + REVERT_MUTATION]();
			delete object.events[eventKey + REVERT_MUTATION];
		}
	};
};
var STORE_UNMOUNT_DELAY = 1e3;
var onMount = ($store, initialize) => {
	let listener = (payload) => {
		let destroy = initialize(payload);
		if (destroy) $store.events[UNMOUNT].push(destroy);
	};
	return on($store, listener, MOUNT, (runListeners) => {
		let originListen = $store.listen;
		$store.listen = (...args) => {
			if (!$store.lc && !$store.active) {
				$store.active = true;
				runListeners();
			}
			return originListen(...args);
		};
		let originOff = $store.off;
		$store.events[UNMOUNT] = [];
		$store.off = () => {
			originOff();
			setTimeout(() => {
				if ($store.active && !$store.lc) {
					$store.active = false;
					for (let destroy of $store.events[UNMOUNT]) destroy();
					$store.events[UNMOUNT] = [];
				}
			}, STORE_UNMOUNT_DELAY);
		};
		return () => {
			$store.listen = originListen;
			$store.off = originOff;
		};
	});
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/client/query.mjs
var isServer = () => typeof window === "undefined";
var useAuthQuery = (initializedAtom, path, $fetch, options) => {
	const value = /* @__PURE__ */ atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch: (queryParams) => fn(queryParams)
	});
	const fn = async (queryParams) => {
		return new Promise((resolve) => {
			const opts = typeof options === "function" ? options({
				data: value.get().data,
				error: value.get().error,
				isPending: value.get().isPending
			}) : options;
			$fetch(path, {
				...opts,
				query: {
					...opts?.query,
					...queryParams?.query
				},
				async onSuccess(context) {
					value.set({
						data: context.data,
						error: null,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onSuccess?.(context);
				},
				async onError(context) {
					const { request } = context;
					const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
					const retryAttempt = request.retryAttempt || 0;
					if (retryAttempts && retryAttempt < retryAttempts) return;
					const isUnauthorized = context.error.status === 401;
					value.set({
						error: context.error,
						data: isUnauthorized ? null : value.get().data,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onError?.(context);
				},
				async onRequest(context) {
					const currentValue = value.get();
					value.set({
						isPending: currentValue.data === null,
						data: currentValue.data,
						error: null,
						isRefetching: true,
						refetch: value.value.refetch
					});
					await opts?.onRequest?.(context);
				}
			}).catch((error) => {
				value.set({
					error,
					data: value.get().data,
					isPending: false,
					isRefetching: false,
					refetch: value.value.refetch
				});
			}).finally(() => {
				resolve(void 0);
			});
		});
	};
	initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [initializedAtom];
	let isInitialized = false;
	for (const initAtom of initializedAtom) initAtom.subscribe(async () => {
		if (isServer()) return;
		if (isInitialized) await fn();
		else onMount(value, () => {
			const timeoutId = setTimeout(async () => {
				if (!isInitialized) {
					isInitialized = true;
					await fn();
				}
			}, 0);
			return () => {
				value.off();
				initAtom.off();
				clearTimeout(timeoutId);
			};
		});
	});
	return value;
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+passkey@1.6.11_3e13a7ad3e345fe36220ffb1a5de39e3/node_modules/@better-auth/passkey/dist/version-IQa8sLtV.mjs
var PASSKEY_ERROR_CODES = defineErrorCodes({
	CHALLENGE_NOT_FOUND: "Challenge not found",
	YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY: "You are not allowed to register this passkey",
	FAILED_TO_VERIFY_REGISTRATION: "Failed to verify registration",
	PASSKEY_NOT_FOUND: "Passkey not found",
	AUTHENTICATION_FAILED: "Authentication failed",
	UNABLE_TO_CREATE_SESSION: "Unable to create session",
	FAILED_TO_UPDATE_PASSKEY: "Failed to update passkey",
	PREVIOUSLY_REGISTERED: "Previously registered",
	REGISTRATION_CANCELLED: "Registration cancelled",
	AUTH_CANCELLED: "Auth cancelled",
	UNKNOWN_ERROR: "Unknown error",
	SESSION_REQUIRED: "Passkey registration requires an authenticated session",
	RESOLVE_USER_REQUIRED: "Passkey registration requires either an authenticated session or a resolveUser callback when requireSession is false",
	RESOLVED_USER_INVALID: "Resolved user is invalid"
});
var PACKAGE_VERSION = "1.6.11";
//#endregion
//#region ../../node_modules/.pnpm/@hexagon+base64@1.1.28/node_modules/@hexagon/base64/src/base64.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", charsUrl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", genLookup = (target) => {
	const lookupTemp = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
	const len = 64;
	for (let i = 0; i < len; i++) lookupTemp[target.charCodeAt(i)] = i;
	return lookupTemp;
}, lookup = genLookup(chars), lookupUrl = genLookup(charsUrl);
/**
* Pre-calculated regexes for validating base64 and base64url
*/
var base64UrlPattern = /^[-A-Za-z0-9\-_]*$/;
var base64Pattern = /^[-A-Za-z0-9+/]*={0,3}$/;
/**
* @namespace base64
*/
var base64 = {};
/**
* Convenience function for converting a base64 encoded string to an ArrayBuffer instance
* @public
* 
* @param {string} data - Base64 representation of data
* @param {boolean} [urlMode] - If set to true, URL mode string will be expected
* @returns {ArrayBuffer} - Decoded data
*/
base64.toArrayBuffer = (data, urlMode) => {
	const len = data.length;
	let bufferLength = data.length * .75, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	if (data[data.length - 1] === "=") {
		bufferLength--;
		if (data[data.length - 2] === "=") bufferLength--;
	}
	const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer), target = urlMode ? lookupUrl : lookup;
	for (i = 0; i < len; i += 4) {
		encoded1 = target[data.charCodeAt(i)];
		encoded2 = target[data.charCodeAt(i + 1)];
		encoded3 = target[data.charCodeAt(i + 2)];
		encoded4 = target[data.charCodeAt(i + 3)];
		bytes[p++] = encoded1 << 2 | encoded2 >> 4;
		bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
		bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	}
	return arraybuffer;
};
/**
* Convenience function for creating a base64 encoded string from an ArrayBuffer instance
* @public
* 
* @param {ArrayBuffer} arrBuf - ArrayBuffer to be encoded
* @param {boolean} [urlMode] - If set to true, URL mode string will be returned
* @returns {string} - Base64 representation of data
*/
base64.fromArrayBuffer = (arrBuf, urlMode) => {
	const bytes = new Uint8Array(arrBuf);
	let i, result = "";
	const len = bytes.length, target = urlMode ? charsUrl : chars;
	for (i = 0; i < len; i += 3) {
		result += target[bytes[i] >> 2];
		result += target[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
		result += target[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
		result += target[bytes[i + 2] & 63];
	}
	const remainder = len % 3;
	if (remainder === 2) result = result.substring(0, result.length - 1) + (urlMode ? "" : "=");
	else if (remainder === 1) result = result.substring(0, result.length - 2) + (urlMode ? "" : "==");
	return result;
};
/**
* Convenience function for converting base64 to string
* @public
* 
* @param {string} str - Base64 encoded string to be decoded
* @param {boolean} [urlMode] - If set to true, URL mode string will be expected
* @returns {string} - Decoded string
*/
base64.toString = (str, urlMode) => {
	return new TextDecoder().decode(base64.toArrayBuffer(str, urlMode));
};
/**
* Convenience function for converting a javascript string to base64
* @public
* 
* @param {string} str - String to be converted to base64
* @param {boolean} [urlMode] - If set to true, URL mode string will be returned
* @returns {string} - Base64 encoded string
*/
base64.fromString = (str, urlMode) => {
	return base64.fromArrayBuffer(new TextEncoder().encode(str), urlMode);
};
/**
* Function to validate base64
* @public
* @param {string} encoded - Base64 or Base64url encoded data
* @param {boolean} [urlMode] - If set to true, base64url will be expected
* @returns {boolean} - Valid base64/base64url?
*/
base64.validate = (encoded, urlMode) => {
	if (!(typeof encoded === "string" || encoded instanceof String)) return false;
	try {
		return urlMode ? base64UrlPattern.test(encoded) : base64Pattern.test(encoded);
	} catch (_e) {
		return false;
	}
};
base64.base64 = base64;
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoBase64URL.js
/**
* A runtime-agnostic collection of methods for working with Base64URL encoding
* @module
*/
/**
* Decode from a Base64URL-encoded string to an ArrayBuffer. Best used when converting a
* credential ID from a JSON string to an ArrayBuffer, like in allowCredentials or
* excludeCredentials.
*
* @param buffer Value to decode from base64
* @param to (optional) The decoding to use, in case it's desirable to decode from base64 instead
*/
function toBuffer(base64urlString, from = "base64url") {
	const _buffer = base64.toArrayBuffer(base64urlString, from === "base64url");
	return new Uint8Array(_buffer);
}
/**
* Encode the given array buffer into a Base64URL-encoded string. Ideal for converting various
* credential response ArrayBuffers to string for sending back to the server as JSON.
*
* @param buffer Value to encode to base64
* @param to (optional) The encoding to use, in case it's desirable to encode to base64 instead
*/
function fromBuffer(buffer, to = "base64url") {
	/**
	* Gracefully handle Uint8Array subclass types, like Node's Buffer, that can have a large
	* ArrayBuffer backing it.
	*/
	const _normalized = new Uint8Array(buffer);
	return base64.fromArrayBuffer(_normalized.buffer, to === "base64url");
}
/**
* Convert a base64url string into base64
*/
function toBase64(base64urlString) {
	const fromBase64Url = base64.toArrayBuffer(base64urlString, true);
	return base64.fromArrayBuffer(fromBase64Url);
}
/**
* Decode a base64url string into its original UTF-8 string
*/
function toUTF8String$1(base64urlString) {
	return base64.toString(base64urlString, true);
}
/**
* Confirm that the string is encoded into base64
*/
function isBase64(input) {
	return base64.validate(input, false);
}
/**
* Confirm that the string is encoded into base64url, with support for optional padding
*/
function isBase64URL(input) {
	input = trimPadding(input);
	return base64.validate(input, true);
}
/**
* Remove optional padding from a base64url-encoded string
*/
function trimPadding(input) {
	return input.replace(/=/g, "");
}
//#endregion
//#region ../../node_modules/.pnpm/@levischuck+tiny-cbor@0.2.11/node_modules/@levischuck/tiny-cbor/esm/cbor/cbor_internal.js
function decodeLength(data, argument, index) {
	if (argument < 24) return [argument, 1];
	const remainingDataLength = data.byteLength - index - 1;
	const view = new DataView(data.buffer, index + 1);
	let output;
	let bytes = 0;
	switch (argument) {
		case 24:
			if (remainingDataLength > 0) {
				output = view.getUint8(0);
				bytes = 2;
			}
			break;
		case 25:
			if (remainingDataLength > 1) {
				output = view.getUint16(0, false);
				bytes = 3;
			}
			break;
		case 26:
			if (remainingDataLength > 3) {
				output = view.getUint32(0, false);
				bytes = 5;
			}
			break;
		case 27:
			if (remainingDataLength > 7) {
				const bigOutput = view.getBigUint64(0, false);
				if (bigOutput >= 24n && bigOutput <= Number.MAX_SAFE_INTEGER) return [Number(bigOutput), 9];
			}
			break;
	}
	if (output && output >= 24) return [output, bytes];
	throw new Error("Length not supported or not well formed");
}
function encodeLength(major, argument) {
	const majorEncoded = major << 5;
	if (argument < 0) throw new Error("CBOR Data Item argument must not be negative");
	let bigintArgument;
	if (typeof argument == "number") {
		if (!Number.isInteger(argument)) throw new Error("CBOR Data Item argument must be an integer");
		bigintArgument = BigInt(argument);
	} else bigintArgument = argument;
	if (major == 1) {
		if (bigintArgument == 0n) throw new Error("CBOR Data Item argument cannot be zero when negative");
		bigintArgument = bigintArgument - 1n;
	}
	if (bigintArgument > 18446744073709551615n) throw new Error("CBOR number out of range");
	const buffer = new Uint8Array(8);
	new DataView(buffer.buffer).setBigUint64(0, bigintArgument, false);
	if (bigintArgument <= 23) return [majorEncoded | buffer[7]];
	else if (bigintArgument <= 255) return [majorEncoded | 24, buffer[7]];
	else if (bigintArgument <= 65535) return [majorEncoded | 25, ...buffer.slice(6)];
	else if (bigintArgument <= 4294967295) return [majorEncoded | 26, ...buffer.slice(4)];
	else return [majorEncoded | 27, ...buffer];
}
//#endregion
//#region ../../node_modules/.pnpm/@levischuck+tiny-cbor@0.2.11/node_modules/@levischuck/tiny-cbor/esm/cbor/cbor.js
/**
* A value which is wrapped with a CBOR Tag.
* Several tags are registered with defined meanings like 0 for a date string.
* These meanings are **not interpreted** when decoded or encoded.
*
* This class is an immutable record.
* If the tag number or value needs to change, then construct a new tag
*/
var CBORTag = class {
	/**
	* Wrap a value with a tag number.
	* When encoded, this tag will be attached to the value.
	*
	* @param tag Tag number
	* @param value Wrapped value
	*/
	constructor(tag, value) {
		Object.defineProperty(this, "tagId", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "tagValue", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		this.tagId = tag;
		this.tagValue = value;
	}
	/**
	* Read the tag number
	*/
	get tag() {
		return this.tagId;
	}
	/**
	* Read the value
	*/
	get value() {
		return this.tagValue;
	}
};
function decodeUnsignedInteger(data, argument, index) {
	return decodeLength(data, argument, index);
}
function decodeNegativeInteger(data, argument, index) {
	const [value, length] = decodeUnsignedInteger(data, argument, index);
	return [-value - 1, length];
}
function decodeByteString(data, argument, index) {
	const [lengthValue, lengthConsumed] = decodeLength(data, argument, index);
	const dataStartIndex = index + lengthConsumed;
	return [new Uint8Array(data.buffer.slice(dataStartIndex, dataStartIndex + lengthValue)), lengthConsumed + lengthValue];
}
var TEXT_DECODER = new TextDecoder();
function decodeString(data, argument, index) {
	const [value, length] = decodeByteString(data, argument, index);
	return [TEXT_DECODER.decode(value), length];
}
function decodeArray(data, argument, index) {
	if (argument === 0) return [[], 1];
	const [length, lengthConsumed] = decodeLength(data, argument, index);
	let consumedLength = lengthConsumed;
	const value = [];
	for (let i = 0; i < length; i++) {
		if (data.byteLength - index - consumedLength <= 0) throw new Error("array is not supported or well formed");
		const [decodedValue, consumed] = decodeNext(data, index + consumedLength);
		value.push(decodedValue);
		consumedLength += consumed;
	}
	return [value, consumedLength];
}
var MAP_ERROR = "Map is not supported or well formed";
function decodeMap(data, argument, index) {
	if (argument === 0) return [/* @__PURE__ */ new Map(), 1];
	const [length, lengthConsumed] = decodeLength(data, argument, index);
	let consumedLength = lengthConsumed;
	const result = /* @__PURE__ */ new Map();
	for (let i = 0; i < length; i++) {
		let remainingDataLength = data.byteLength - index - consumedLength;
		if (remainingDataLength <= 0) throw new Error(MAP_ERROR);
		const [key, keyConsumed] = decodeNext(data, index + consumedLength);
		consumedLength += keyConsumed;
		remainingDataLength -= keyConsumed;
		if (remainingDataLength <= 0) throw new Error(MAP_ERROR);
		if (typeof key !== "string" && typeof key !== "number") throw new Error(MAP_ERROR);
		if (result.has(key)) throw new Error(MAP_ERROR);
		const [value, valueConsumed] = decodeNext(data, index + consumedLength);
		consumedLength += valueConsumed;
		result.set(key, value);
	}
	return [result, consumedLength];
}
function decodeFloat16(data, index) {
	if (index + 3 > data.byteLength) throw new Error("CBOR stream ended before end of Float 16");
	const result = data.getUint16(index + 1, false);
	if (result == 31744) return [Infinity, 3];
	else if (result == 32256) return [NaN, 3];
	else if (result == 64512) return [-Infinity, 3];
	throw new Error("Float16 data is unsupported");
}
function decodeFloat32(data, index) {
	if (index + 5 > data.byteLength) throw new Error("CBOR stream ended before end of Float 32");
	return [data.getFloat32(index + 1, false), 5];
}
function decodeFloat64(data, index) {
	if (index + 9 > data.byteLength) throw new Error("CBOR stream ended before end of Float 64");
	return [data.getFloat64(index + 1, false), 9];
}
function decodeTag(data, argument, index) {
	const [tag, tagBytes] = decodeLength(data, argument, index);
	const [value, valueBytes] = decodeNext(data, index + tagBytes);
	return [new CBORTag(tag, value), tagBytes + valueBytes];
}
function decodeNext(data, index) {
	if (index >= data.byteLength) throw new Error("CBOR stream ended before tag value");
	const byte = data.getUint8(index);
	const majorType = byte >> 5;
	const argument = byte & 31;
	switch (majorType) {
		case 0: return decodeUnsignedInteger(data, argument, index);
		case 1: return decodeNegativeInteger(data, argument, index);
		case 2: return decodeByteString(data, argument, index);
		case 3: return decodeString(data, argument, index);
		case 4: return decodeArray(data, argument, index);
		case 5: return decodeMap(data, argument, index);
		case 6: return decodeTag(data, argument, index);
		case 7: switch (argument) {
			case 20: return [false, 1];
			case 21: return [true, 1];
			case 22: return [null, 1];
			case 23: return [void 0, 1];
			case 25: return decodeFloat16(data, index);
			case 26: return decodeFloat32(data, index);
			case 27: return decodeFloat64(data, index);
		}
	}
	throw new Error(`Unsupported or not well formed at ${index}`);
}
function encodeSimple(data) {
	if (data === true) return 245;
	else if (data === false) return 244;
	else if (data === null) return 246;
	return 247;
}
function encodeFloat(data) {
	if (Math.fround(data) == data || !Number.isFinite(data) || Number.isNaN(data)) {
		const output = new Uint8Array(5);
		output[0] = 250;
		new DataView(output.buffer).setFloat32(1, data, false);
		return output;
	} else {
		const output = new Uint8Array(9);
		output[0] = 251;
		new DataView(output.buffer).setFloat64(1, data, false);
		return output;
	}
}
function encodeNumber(data) {
	if (typeof data == "number") {
		if (Number.isSafeInteger(data)) if (data < 0) return encodeLength(1, Math.abs(data));
		else return encodeLength(0, data);
		return [encodeFloat(data)];
	} else if (data < 0n) return encodeLength(1, data * -1n);
	else return encodeLength(0, data);
}
var ENCODER = new TextEncoder();
function encodeString(data, output) {
	output.push(...encodeLength(3, data.length));
	output.push(ENCODER.encode(data));
}
function encodeBytes(data, output) {
	output.push(...encodeLength(2, data.length));
	output.push(data);
}
function encodeArray(data, output) {
	output.push(...encodeLength(4, data.length));
	for (const element of data) encodePartialCBOR(element, output);
}
function encodeMap(data, output) {
	output.push(new Uint8Array(encodeLength(5, data.size)));
	for (const [key, value] of data.entries()) {
		encodePartialCBOR(key, output);
		encodePartialCBOR(value, output);
	}
}
function encodeTag(tag, output) {
	output.push(...encodeLength(6, tag.tag));
	encodePartialCBOR(tag.value, output);
}
function encodePartialCBOR(data, output) {
	if (typeof data == "boolean" || data === null || data == void 0) {
		output.push(encodeSimple(data));
		return;
	}
	if (typeof data == "number" || typeof data == "bigint") {
		output.push(...encodeNumber(data));
		return;
	}
	if (typeof data == "string") {
		encodeString(data, output);
		return;
	}
	if (data instanceof Uint8Array) {
		encodeBytes(data, output);
		return;
	}
	if (Array.isArray(data)) {
		encodeArray(data, output);
		return;
	}
	if (data instanceof Map) {
		encodeMap(data, output);
		return;
	}
	if (data instanceof CBORTag) {
		encodeTag(data, output);
		return;
	}
	throw new Error("Not implemented");
}
/**
* Like {decodeCBOR}, but the length of the data is unknown and there is likely
* more -- possibly unrelated non-CBOR -- data afterwards.
*
* Examples:
*
* ```ts
* import {decodePartialCBOR} from './cbor.ts'
* decodePartialCBOR(new Uint8Array([1, 2, 245, 3, 4]), 2)
* // returns [true, 1]
* // It did not decode the leading [1, 2] or trailing [3, 4]
* ```
*
* @param data a data stream to read data from
* @param index where to start reading in the data stream
* @returns a tuple of the value followed by bytes read.
* @throws {Error}
*   When the data stream ends early or the CBOR data is not well formed
*/
function decodePartialCBOR(data, index) {
	if (data.byteLength === 0 || data.byteLength <= index || index < 0) throw new Error("No data");
	if (data instanceof Uint8Array) return decodeNext(new DataView(data.buffer), index);
	else if (data instanceof ArrayBuffer) return decodeNext(new DataView(data), index);
	return decodeNext(data, index);
}
/**
* Encode a supported structure to a CBOR byte string.
*
* Example:
*
* ```ts
* import {encodeCBOR, CBORType, CBORTag} from './cbor.ts'
* encodeCBOR(new Map<string | number, CBORType>([
*   ["key", "value"],
*   [1, "another value"]
* ]));
* // returns new Uint8Array([162, 99, 107, 101, 121, 101, 118, 97, 108, 117, 101, 1, 109, 97, 110, 111, 116, 104, 101, 114, 32 118, 97, 108, 117, 101])
*
* encodeCBOR(new CBORTag(1234, "hello"))
* // returns new UInt8Array([217, 4, 210, 101, 104, 101, 108, 108, 111])
* ```
*
* @param data Data to encode
* @returns A byte string as a Uint8Array
* @throws Error
*   if unsupported data is found during encoding
*/
function encodeCBOR(data) {
	const results = [];
	encodePartialCBOR(data, results);
	let length = 0;
	for (const result of results) if (typeof result == "number") length += 1;
	else length += result.length;
	const output = new Uint8Array(length);
	let index = 0;
	for (const result of results) if (typeof result == "number") {
		output[index] = result;
		index += 1;
	} else {
		output.set(result, index);
		index += result.length;
	}
	return output;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCBOR.js
/**
* A runtime-agnostic collection of methods for working with CBOR encoding
* @module
*/
/**
* Whatever CBOR encoder is used should keep CBOR data the same length when data is re-encoded
*
* MOST CRITICALLY, this means the following needs to be true of whatever CBOR library we use:
* - CBOR Map type values MUST decode to JavaScript Maps
* - CBOR tag 64 (uint8 Typed Array) MUST NOT be used when encoding Uint8Arrays back to CBOR
*
* So long as these requirements are maintained, then CBOR sequences can be encoded and decoded
* freely while maintaining their lengths for the most accurate pointer movement across them.
*/
/**
* Decode and return the first item in a sequence of CBOR-encoded values
*
* @param input The CBOR data to decode
* @param asObject (optional) Whether to convert any CBOR Maps into JavaScript Objects. Defaults to
* `false`
*/
function decodeFirst(input) {
	const [first] = decodePartialCBOR(new Uint8Array(input), 0);
	return first;
}
/**
* Encode data to CBOR
*/
function encode$1(input) {
	return encodeCBOR(input);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/cose.js
/**
* A type guard for determining if a COSE public key is an OKP key pair
*/
function isCOSEPublicKeyOKP(cosePublicKey) {
	const kty = cosePublicKey.get(COSEKEYS.kty);
	return isCOSEKty(kty) && kty === COSEKTY.OKP;
}
/**
* A type guard for determining if a COSE public key is an EC2 key pair
*/
function isCOSEPublicKeyEC2(cosePublicKey) {
	const kty = cosePublicKey.get(COSEKEYS.kty);
	return isCOSEKty(kty) && kty === COSEKTY.EC2;
}
/**
* A type guard for determining if a COSE public key is an RSA key pair
*/
function isCOSEPublicKeyRSA(cosePublicKey) {
	const kty = cosePublicKey.get(COSEKEYS.kty);
	return isCOSEKty(kty) && kty === COSEKTY.RSA;
}
/**
* COSE Keys
*
* https://www.iana.org/assignments/cose/cose.xhtml#key-common-parameters
* https://www.iana.org/assignments/cose/cose.xhtml#key-type-parameters
*/
var COSEKEYS;
(function(COSEKEYS) {
	COSEKEYS[COSEKEYS["kty"] = 1] = "kty";
	COSEKEYS[COSEKEYS["alg"] = 3] = "alg";
	COSEKEYS[COSEKEYS["crv"] = -1] = "crv";
	COSEKEYS[COSEKEYS["x"] = -2] = "x";
	COSEKEYS[COSEKEYS["y"] = -3] = "y";
	COSEKEYS[COSEKEYS["n"] = -1] = "n";
	COSEKEYS[COSEKEYS["e"] = -2] = "e";
})(COSEKEYS || (COSEKEYS = {}));
/**
* COSE Key Types
*
* https://www.iana.org/assignments/cose/cose.xhtml#key-type
*/
var COSEKTY;
(function(COSEKTY) {
	COSEKTY[COSEKTY["OKP"] = 1] = "OKP";
	COSEKTY[COSEKTY["EC2"] = 2] = "EC2";
	COSEKTY[COSEKTY["RSA"] = 3] = "RSA";
})(COSEKTY || (COSEKTY = {}));
function isCOSEKty(kty) {
	return Object.values(COSEKTY).indexOf(kty) >= 0;
}
/**
* COSE Curves
*
* https://www.iana.org/assignments/cose/cose.xhtml#elliptic-curves
*/
var COSECRV;
(function(COSECRV) {
	COSECRV[COSECRV["P256"] = 1] = "P256";
	COSECRV[COSECRV["P384"] = 2] = "P384";
	COSECRV[COSECRV["P521"] = 3] = "P521";
	COSECRV[COSECRV["ED25519"] = 6] = "ED25519";
	COSECRV[COSECRV["SECP256K1"] = 8] = "SECP256K1";
})(COSECRV || (COSECRV = {}));
function isCOSECrv(crv) {
	return Object.values(COSECRV).indexOf(crv) >= 0;
}
/**
* COSE Algorithms
*
* https://www.iana.org/assignments/cose/cose.xhtml#algorithms
*/
var COSEALG;
(function(COSEALG) {
	COSEALG[COSEALG["ES256"] = -7] = "ES256";
	COSEALG[COSEALG["EdDSA"] = -8] = "EdDSA";
	COSEALG[COSEALG["ES384"] = -35] = "ES384";
	COSEALG[COSEALG["ES512"] = -36] = "ES512";
	COSEALG[COSEALG["PS256"] = -37] = "PS256";
	COSEALG[COSEALG["PS384"] = -38] = "PS384";
	COSEALG[COSEALG["PS512"] = -39] = "PS512";
	COSEALG[COSEALG["ES256K"] = -47] = "ES256K";
	COSEALG[COSEALG["RS256"] = -257] = "RS256";
	COSEALG[COSEALG["RS384"] = -258] = "RS384";
	COSEALG[COSEALG["RS512"] = -259] = "RS512";
	COSEALG[COSEALG["RS1"] = -65535] = "RS1";
})(COSEALG || (COSEALG = {}));
function isCOSEAlg(alg) {
	return Object.values(COSEALG).indexOf(alg) >= 0;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/mapCoseAlgToWebCryptoAlg.js
/**
* Convert a COSE alg ID into a corresponding string value that WebCrypto APIs expect
*/
function mapCoseAlgToWebCryptoAlg(alg) {
	if ([COSEALG.RS1].indexOf(alg) >= 0) return "SHA-1";
	else if ([
		COSEALG.ES256,
		COSEALG.PS256,
		COSEALG.RS256
	].indexOf(alg) >= 0) return "SHA-256";
	else if ([
		COSEALG.ES384,
		COSEALG.PS384,
		COSEALG.RS384
	].indexOf(alg) >= 0) return "SHA-384";
	else if ([
		COSEALG.ES512,
		COSEALG.PS512,
		COSEALG.RS512,
		COSEALG.EdDSA
	].indexOf(alg) >= 0) return "SHA-512";
	throw new Error(`Could not map COSE alg value of ${alg} to a WebCrypto alg`);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/getWebCrypto.js
var webCrypto = void 0;
/**
* Try to get an instance of the Crypto API from the current runtime. Should support Node,
* as well as others, like Deno, that implement Web APIs.
*/
function getWebCrypto() {
	return new Promise((resolve, reject) => {
		if (webCrypto) return resolve(webCrypto);
		/**
		* Naively attempt to access Crypto as a global object, which popular ESM-centric run-times
		* support (and Node v20+)
		*/
		const _globalThisCrypto = _getWebCryptoInternals.stubThisGlobalThisCrypto();
		if (_globalThisCrypto) {
			webCrypto = _globalThisCrypto;
			return resolve(webCrypto);
		}
		return reject(new MissingWebCrypto());
	});
}
var MissingWebCrypto = class extends Error {
	constructor() {
		super("An instance of the Crypto API could not be located");
		this.name = "MissingWebCrypto";
	}
};
var _getWebCryptoInternals = {
	stubThisGlobalThisCrypto: () => globalThis.crypto,
	setCachedCrypto: (newCrypto) => {
		webCrypto = newCrypto;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/digest.js
/**
* Generate a digest of the provided data.
*
* @param data The data to generate a digest of
* @param algorithm A COSE algorithm ID that maps to a desired SHA algorithm
*/
async function digest(data, algorithm) {
	const WebCrypto = await getWebCrypto();
	const subtleAlgorithm = mapCoseAlgToWebCryptoAlg(algorithm);
	const hashed = await WebCrypto.subtle.digest(subtleAlgorithm, data);
	return new Uint8Array(hashed);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/getRandomValues.js
/**
* Fill up the provided bytes array with random bytes equal to its length.
*
* @returns the same bytes array passed into the method
*/
async function getRandomValues(array) {
	(await getWebCrypto()).getRandomValues(array);
	return array;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/importKey.js
async function importKey(opts) {
	const WebCrypto = await getWebCrypto();
	const { keyData, algorithm } = opts;
	return WebCrypto.subtle.importKey("jwk", keyData, algorithm, false, ["verify"]);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/verifyEC2.js
/**
* Verify a signature using an EC2 public key
*/
async function verifyEC2(opts) {
	const { cosePublicKey, signature, data, shaHashOverride } = opts;
	const WebCrypto = await getWebCrypto();
	const alg = cosePublicKey.get(COSEKEYS.alg);
	const crv = cosePublicKey.get(COSEKEYS.crv);
	const x = cosePublicKey.get(COSEKEYS.x);
	const y = cosePublicKey.get(COSEKEYS.y);
	if (!alg) throw new Error("Public key was missing alg (EC2)");
	if (!crv) throw new Error("Public key was missing crv (EC2)");
	if (!x) throw new Error("Public key was missing x (EC2)");
	if (!y) throw new Error("Public key was missing y (EC2)");
	let _crv;
	if (crv === COSECRV.P256) _crv = "P-256";
	else if (crv === COSECRV.P384) _crv = "P-384";
	else if (crv === COSECRV.P521) _crv = "P-521";
	else throw new Error(`Unexpected COSE crv value of ${crv} (EC2)`);
	const key = await importKey({
		keyData: {
			kty: "EC",
			crv: _crv,
			x: fromBuffer(x),
			y: fromBuffer(y),
			ext: false
		},
		algorithm: {
			/**
			* Note to future self: you can't use `mapCoseAlgToWebCryptoKeyAlgName()` here because some
			* leaf certs from actual devices specified an RSA SHA value for `alg` (e.g. `-257`) which
			* would then map here to `'RSASSA-PKCS1-v1_5'`. We always want `'ECDSA'` here so we'll
			* hard-code this.
			*/
			name: "ECDSA",
			namedCurve: _crv
		}
	});
	let subtleAlg = mapCoseAlgToWebCryptoAlg(alg);
	if (shaHashOverride) subtleAlg = mapCoseAlgToWebCryptoAlg(shaHashOverride);
	const verifyAlgorithm = {
		name: "ECDSA",
		hash: { name: subtleAlg }
	};
	return WebCrypto.subtle.verify(verifyAlgorithm, key, signature, data);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/mapCoseAlgToWebCryptoKeyAlgName.js
/**
* Convert a COSE alg ID into a corresponding key algorithm string value that WebCrypto APIs expect
*/
function mapCoseAlgToWebCryptoKeyAlgName(alg) {
	if ([COSEALG.EdDSA].indexOf(alg) >= 0) return "Ed25519";
	else if ([
		COSEALG.ES256,
		COSEALG.ES384,
		COSEALG.ES512,
		COSEALG.ES256K
	].indexOf(alg) >= 0) return "ECDSA";
	else if ([
		COSEALG.RS256,
		COSEALG.RS384,
		COSEALG.RS512,
		COSEALG.RS1
	].indexOf(alg) >= 0) return "RSASSA-PKCS1-v1_5";
	else if ([
		COSEALG.PS256,
		COSEALG.PS384,
		COSEALG.PS512
	].indexOf(alg) >= 0) return "RSA-PSS";
	throw new Error(`Could not map COSE alg value of ${alg} to a WebCrypto key alg name`);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/verifyRSA.js
/**
* Verify a signature using an RSA public key
*/
async function verifyRSA(opts) {
	const { cosePublicKey, signature, data, shaHashOverride } = opts;
	const WebCrypto = await getWebCrypto();
	const alg = cosePublicKey.get(COSEKEYS.alg);
	const n = cosePublicKey.get(COSEKEYS.n);
	const e = cosePublicKey.get(COSEKEYS.e);
	if (!alg) throw new Error("Public key was missing alg (RSA)");
	if (!isCOSEAlg(alg)) throw new Error(`Public key had invalid alg ${alg} (RSA)`);
	if (!n) throw new Error("Public key was missing n (RSA)");
	if (!e) throw new Error("Public key was missing e (RSA)");
	const keyData = {
		kty: "RSA",
		alg: "",
		n: fromBuffer(n),
		e: fromBuffer(e),
		ext: false
	};
	const keyAlgorithm = {
		name: mapCoseAlgToWebCryptoKeyAlgName(alg),
		hash: { name: mapCoseAlgToWebCryptoAlg(alg) }
	};
	const verifyAlgorithm = { name: mapCoseAlgToWebCryptoKeyAlgName(alg) };
	if (shaHashOverride) keyAlgorithm.hash.name = mapCoseAlgToWebCryptoAlg(shaHashOverride);
	if (keyAlgorithm.name === "RSASSA-PKCS1-v1_5") {
		if (keyAlgorithm.hash.name === "SHA-256") keyData.alg = "RS256";
		else if (keyAlgorithm.hash.name === "SHA-384") keyData.alg = "RS384";
		else if (keyAlgorithm.hash.name === "SHA-512") keyData.alg = "RS512";
		else if (keyAlgorithm.hash.name === "SHA-1") keyData.alg = "RS1";
	} else if (keyAlgorithm.name === "RSA-PSS") {
		/**
		* salt length. The default value is 20 but the convention is to use hLen, the length of the
		* output of the hash function in bytes. A salt length of zero is permitted and will result in
		* a deterministic signature value. The actual salt length used can be determined from the
		* signature value.
		*
		* From https://www.cryptosys.net/pki/manpki/pki_rsaschemes.html
		*/
		let saltLength = 0;
		if (keyAlgorithm.hash.name === "SHA-256") {
			keyData.alg = "PS256";
			saltLength = 32;
		} else if (keyAlgorithm.hash.name === "SHA-384") {
			keyData.alg = "PS384";
			saltLength = 48;
		} else if (keyAlgorithm.hash.name === "SHA-512") {
			keyData.alg = "PS512";
			saltLength = 64;
		}
		verifyAlgorithm.saltLength = saltLength;
	} else throw new Error(`Unexpected RSA key algorithm ${alg} (${keyAlgorithm.name})`);
	const key = await importKey({
		keyData,
		algorithm: keyAlgorithm
	});
	return WebCrypto.subtle.verify(verifyAlgorithm, key, signature, data);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/convertAAGUIDToString.js
/**
* Convert the aaguid buffer in authData into a UUID string
*/
function convertAAGUIDToString(aaguid) {
	const hex = toHex(aaguid);
	return [
		hex.slice(0, 8),
		hex.slice(8, 12),
		hex.slice(12, 16),
		hex.slice(16, 20),
		hex.slice(20, 32)
	].join("-");
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/convertCertBufferToPEM.js
/**
* Convert buffer to an OpenSSL-compatible PEM text format.
*/
function convertCertBufferToPEM(certBuffer) {
	let b64cert;
	/**
	* Get certBuffer to a base64 representation
	*/
	if (typeof certBuffer === "string") if (isBase64URL(certBuffer)) b64cert = toBase64(certBuffer);
	else if (isBase64(certBuffer)) b64cert = certBuffer;
	else throw new Error("Certificate is not a valid base64 or base64url string");
	else b64cert = fromBuffer(certBuffer, "base64");
	let PEMKey = "";
	for (let i = 0; i < Math.ceil(b64cert.length / 64); i += 1) {
		const start = 64 * i;
		PEMKey += `${b64cert.substr(start, 64)}\n`;
	}
	PEMKey = `-----BEGIN CERTIFICATE-----\n${PEMKey}-----END CERTIFICATE-----\n`;
	return PEMKey;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/convertCOSEtoPKCS.js
/**
* Takes COSE-encoded public key and converts it to PKCS key
*/
function convertCOSEtoPKCS(cosePublicKey) {
	const struct = decodeFirst(cosePublicKey);
	const tag = Uint8Array.from([4]);
	const x = struct.get(COSEKEYS.x);
	const y = struct.get(COSEKEYS.y);
	if (!x) throw new Error("COSE public key was missing x");
	if (y) return concat([
		tag,
		x,
		y
	]);
	return concat([tag, x]);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/decodeAttestationObject.js
/**
* Convert an AttestationObject buffer to a proper object
*
* @param base64AttestationObject Attestation Object buffer
*/
function decodeAttestationObject(attestationObject) {
	return _decodeAttestationObjectInternals.stubThis(decodeFirst(attestationObject));
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _decodeAttestationObjectInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/decodeClientDataJSON.js
/**
* Decode an authenticator's base64url-encoded clientDataJSON to JSON
*/
function decodeClientDataJSON(data) {
	const toString = toUTF8String$1(data);
	const clientData = JSON.parse(toString);
	return _decodeClientDataJSONInternals.stubThis(clientData);
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _decodeClientDataJSONInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/decodeCredentialPublicKey.js
function decodeCredentialPublicKey(publicKey) {
	return _decodeCredentialPublicKeyInternals.stubThis(decodeFirst(publicKey));
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _decodeCredentialPublicKeyInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/generateUserID.js
/**
* Generate a suitably random value to be used as user ID
*/
async function generateUserID() {
	/**
	* WebAuthn spec says user.id has a max length of 64 bytes. I prefer how 32 random bytes look
	* after they're base64url-encoded so I'm choosing to go with that here.
	*/
	const newUserID = new Uint8Array(32);
	await getRandomValues(newUserID);
	return _generateUserIDInternals.stubThis(newUserID);
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _generateUserIDInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/pvtsutils@1.3.6/node_modules/pvtsutils/build/index.es.js
/*!
* MIT License
* 
* Copyright (c) 2017-2024 Peculiar Ventures, LLC
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* 
*/
var ARRAY_BUFFER_NAME = "[object ArrayBuffer]";
var BufferSourceConverter = class BufferSourceConverter {
	static isArrayBuffer(data) {
		return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;
	}
	static toArrayBuffer(data) {
		if (this.isArrayBuffer(data)) return data;
		if (data.byteLength === data.buffer.byteLength) return data.buffer;
		if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) return data.buffer;
		return this.toUint8Array(data.buffer).slice(data.byteOffset, data.byteOffset + data.byteLength).buffer;
	}
	static toUint8Array(data) {
		return this.toView(data, Uint8Array);
	}
	static toView(data, type) {
		if (data.constructor === type) return data;
		if (this.isArrayBuffer(data)) return new type(data);
		if (this.isArrayBufferView(data)) return new type(data.buffer, data.byteOffset, data.byteLength);
		throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
	}
	static isBufferSource(data) {
		return this.isArrayBufferView(data) || this.isArrayBuffer(data);
	}
	static isArrayBufferView(data) {
		return ArrayBuffer.isView(data) || data && this.isArrayBuffer(data.buffer);
	}
	static isEqual(a, b) {
		const aView = BufferSourceConverter.toUint8Array(a);
		const bView = BufferSourceConverter.toUint8Array(b);
		if (aView.length !== bView.byteLength) return false;
		for (let i = 0; i < aView.length; i++) if (aView[i] !== bView[i]) return false;
		return true;
	}
	static concat(...args) {
		let buffers;
		if (Array.isArray(args[0]) && !(args[1] instanceof Function)) buffers = args[0];
		else if (Array.isArray(args[0]) && args[1] instanceof Function) buffers = args[0];
		else if (args[args.length - 1] instanceof Function) buffers = args.slice(0, args.length - 1);
		else buffers = args;
		let size = 0;
		for (const buffer of buffers) size += buffer.byteLength;
		const res = new Uint8Array(size);
		let offset = 0;
		for (const buffer of buffers) {
			const view = this.toUint8Array(buffer);
			res.set(view, offset);
			offset += view.length;
		}
		if (args[args.length - 1] instanceof Function) return this.toView(res, args[args.length - 1]);
		return res.buffer;
	}
};
var STRING_TYPE = "string";
var HEX_REGEX = /^[0-9a-f\s]+$/i;
var BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
var BASE64URL_REGEX = /^[a-zA-Z0-9-_]+$/;
var Utf8Converter = class {
	static fromString(text) {
		const s = unescape(encodeURIComponent(text));
		const uintArray = new Uint8Array(s.length);
		for (let i = 0; i < s.length; i++) uintArray[i] = s.charCodeAt(i);
		return uintArray.buffer;
	}
	static toString(buffer) {
		const buf = BufferSourceConverter.toUint8Array(buffer);
		let encodedString = "";
		for (let i = 0; i < buf.length; i++) encodedString += String.fromCharCode(buf[i]);
		return decodeURIComponent(escape(encodedString));
	}
};
var Utf16Converter = class {
	static toString(buffer, littleEndian = false) {
		const arrayBuffer = BufferSourceConverter.toArrayBuffer(buffer);
		const dataView = new DataView(arrayBuffer);
		let res = "";
		for (let i = 0; i < arrayBuffer.byteLength; i += 2) {
			const code = dataView.getUint16(i, littleEndian);
			res += String.fromCharCode(code);
		}
		return res;
	}
	static fromString(text, littleEndian = false) {
		const res = /* @__PURE__ */ new ArrayBuffer(text.length * 2);
		const dataView = new DataView(res);
		for (let i = 0; i < text.length; i++) dataView.setUint16(i * 2, text.charCodeAt(i), littleEndian);
		return res;
	}
};
var Convert = class Convert {
	static isHex(data) {
		return typeof data === STRING_TYPE && HEX_REGEX.test(data);
	}
	static isBase64(data) {
		return typeof data === STRING_TYPE && BASE64_REGEX.test(data);
	}
	static isBase64Url(data) {
		return typeof data === STRING_TYPE && BASE64URL_REGEX.test(data);
	}
	static ToString(buffer, enc = "utf8") {
		const buf = BufferSourceConverter.toUint8Array(buffer);
		switch (enc.toLowerCase()) {
			case "utf8": return this.ToUtf8String(buf);
			case "binary": return this.ToBinary(buf);
			case "hex": return this.ToHex(buf);
			case "base64": return this.ToBase64(buf);
			case "base64url": return this.ToBase64Url(buf);
			case "utf16le": return Utf16Converter.toString(buf, true);
			case "utf16":
			case "utf16be": return Utf16Converter.toString(buf);
			default: throw new Error(`Unknown type of encoding '${enc}'`);
		}
	}
	static FromString(str, enc = "utf8") {
		if (!str) return /* @__PURE__ */ new ArrayBuffer(0);
		switch (enc.toLowerCase()) {
			case "utf8": return this.FromUtf8String(str);
			case "binary": return this.FromBinary(str);
			case "hex": return this.FromHex(str);
			case "base64": return this.FromBase64(str);
			case "base64url": return this.FromBase64Url(str);
			case "utf16le": return Utf16Converter.fromString(str, true);
			case "utf16":
			case "utf16be": return Utf16Converter.fromString(str);
			default: throw new Error(`Unknown type of encoding '${enc}'`);
		}
	}
	static ToBase64(buffer) {
		const buf = BufferSourceConverter.toUint8Array(buffer);
		if (typeof btoa !== "undefined") {
			const binary = this.ToString(buf, "binary");
			return btoa(binary);
		} else return Buffer.from(buf).toString("base64");
	}
	static FromBase64(base64) {
		const formatted = this.formatString(base64);
		if (!formatted) return /* @__PURE__ */ new ArrayBuffer(0);
		if (!Convert.isBase64(formatted)) throw new TypeError("Argument 'base64Text' is not Base64 encoded");
		if (typeof atob !== "undefined") return this.FromBinary(atob(formatted));
		else return new Uint8Array(Buffer.from(formatted, "base64")).buffer;
	}
	static FromBase64Url(base64url) {
		const formatted = this.formatString(base64url);
		if (!formatted) return /* @__PURE__ */ new ArrayBuffer(0);
		if (!Convert.isBase64Url(formatted)) throw new TypeError("Argument 'base64url' is not Base64Url encoded");
		return this.FromBase64(this.Base64Padding(formatted.replace(/\-/g, "+").replace(/\_/g, "/")));
	}
	static ToBase64Url(data) {
		return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
	}
	static FromUtf8String(text, encoding = Convert.DEFAULT_UTF8_ENCODING) {
		switch (encoding) {
			case "ascii": return this.FromBinary(text);
			case "utf8": return Utf8Converter.fromString(text);
			case "utf16":
			case "utf16be": return Utf16Converter.fromString(text);
			case "utf16le":
			case "usc2": return Utf16Converter.fromString(text, true);
			default: throw new Error(`Unknown type of encoding '${encoding}'`);
		}
	}
	static ToUtf8String(buffer, encoding = Convert.DEFAULT_UTF8_ENCODING) {
		switch (encoding) {
			case "ascii": return this.ToBinary(buffer);
			case "utf8": return Utf8Converter.toString(buffer);
			case "utf16":
			case "utf16be": return Utf16Converter.toString(buffer);
			case "utf16le":
			case "usc2": return Utf16Converter.toString(buffer, true);
			default: throw new Error(`Unknown type of encoding '${encoding}'`);
		}
	}
	static FromBinary(text) {
		const stringLength = text.length;
		const resultView = new Uint8Array(stringLength);
		for (let i = 0; i < stringLength; i++) resultView[i] = text.charCodeAt(i);
		return resultView.buffer;
	}
	static ToBinary(buffer) {
		const buf = BufferSourceConverter.toUint8Array(buffer);
		let res = "";
		for (let i = 0; i < buf.length; i++) res += String.fromCharCode(buf[i]);
		return res;
	}
	static ToHex(buffer) {
		const buf = BufferSourceConverter.toUint8Array(buffer);
		let result = "";
		const len = buf.length;
		for (let i = 0; i < len; i++) {
			const byte = buf[i];
			if (byte < 16) result += "0";
			result += byte.toString(16);
		}
		return result;
	}
	static FromHex(hexString) {
		let formatted = this.formatString(hexString);
		if (!formatted) return /* @__PURE__ */ new ArrayBuffer(0);
		if (!Convert.isHex(formatted)) throw new TypeError("Argument 'hexString' is not HEX encoded");
		if (formatted.length % 2) formatted = `0${formatted}`;
		const res = new Uint8Array(formatted.length / 2);
		for (let i = 0; i < formatted.length; i = i + 2) {
			const c = formatted.slice(i, i + 2);
			res[i / 2] = parseInt(c, 16);
		}
		return res.buffer;
	}
	static ToUtf16String(buffer, littleEndian = false) {
		return Utf16Converter.toString(buffer, littleEndian);
	}
	static FromUtf16String(text, littleEndian = false) {
		return Utf16Converter.fromString(text, littleEndian);
	}
	static Base64Padding(base64) {
		const padCount = 4 - base64.length % 4;
		if (padCount < 4) for (let i = 0; i < padCount; i++) base64 += "=";
		return base64;
	}
	static formatString(data) {
		return (data === null || data === void 0 ? void 0 : data.replace(/[\n\r\t ]/g, "")) || "";
	}
};
Convert.DEFAULT_UTF8_ENCODING = "utf8";
function combine(...buf) {
	const totalByteLength = buf.map((item) => item.byteLength).reduce((prev, cur) => prev + cur);
	const res = new Uint8Array(totalByteLength);
	let currentPos = 0;
	buf.map((item) => new Uint8Array(item)).forEach((arr) => {
		for (const item2 of arr) res[currentPos++] = item2;
	});
	return res.buffer;
}
function isEqual(bytes1, bytes2) {
	if (!(bytes1 && bytes2)) return false;
	if (bytes1.byteLength !== bytes2.byteLength) return false;
	const b1 = new Uint8Array(bytes1);
	const b2 = new Uint8Array(bytes2);
	for (let i = 0; i < bytes1.byteLength; i++) if (b1[i] !== b2[i]) return false;
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/pvutils@1.1.5/node_modules/pvutils/build/utils.es.js
/*!
Copyright (c) Peculiar Ventures, LLC
*/
function utilFromBase(inputBuffer, inputBase) {
	let result = 0;
	if (inputBuffer.length === 1) return inputBuffer[0];
	for (let i = inputBuffer.length - 1; i >= 0; i--) result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
	return result;
}
function utilToBase(value, base, reserved = -1) {
	const internalReserved = reserved;
	let internalValue = value;
	let result = 0;
	let biggest = Math.pow(2, base);
	for (let i = 1; i < 8; i++) {
		if (value < biggest) {
			let retBuf;
			if (internalReserved < 0) {
				retBuf = new ArrayBuffer(i);
				result = i;
			} else {
				if (internalReserved < i) return /* @__PURE__ */ new ArrayBuffer(0);
				retBuf = new ArrayBuffer(internalReserved);
				result = internalReserved;
			}
			const retView = new Uint8Array(retBuf);
			for (let j = i - 1; j >= 0; j--) {
				const basis = Math.pow(2, j * base);
				retView[result - j - 1] = Math.floor(internalValue / basis);
				internalValue -= retView[result - j - 1] * basis;
			}
			return retBuf;
		}
		biggest *= Math.pow(2, base);
	}
	return /* @__PURE__ */ new ArrayBuffer(0);
}
function utilConcatView(...views) {
	let outputLength = 0;
	let prevLength = 0;
	for (const view of views) outputLength += view.length;
	const retBuf = new ArrayBuffer(outputLength);
	const retView = new Uint8Array(retBuf);
	for (const view of views) {
		retView.set(view, prevLength);
		prevLength += view.length;
	}
	return retView;
}
function utilDecodeTC() {
	const buf = new Uint8Array(this.valueHex);
	if (this.valueHex.byteLength >= 2) {
		const condition1 = buf[0] === 255 && buf[1] & 128;
		const condition2 = buf[0] === 0 && (buf[1] & 128) === 0;
		if (condition1 || condition2) this.warnings.push("Needlessly long format");
	}
	const bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
	const bigIntView = new Uint8Array(bigIntBuffer);
	for (let i = 0; i < this.valueHex.byteLength; i++) bigIntView[i] = 0;
	bigIntView[0] = buf[0] & 128;
	const bigInt = utilFromBase(bigIntView, 8);
	const smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
	const smallIntView = new Uint8Array(smallIntBuffer);
	for (let j = 0; j < this.valueHex.byteLength; j++) smallIntView[j] = buf[j];
	smallIntView[0] &= 127;
	return utilFromBase(smallIntView, 8) - bigInt;
}
function utilEncodeTC(value) {
	const modValue = value < 0 ? value * -1 : value;
	let bigInt = 128;
	for (let i = 1; i < 8; i++) {
		if (modValue <= bigInt) {
			if (value < 0) {
				const retBuf = utilToBase(bigInt - modValue, 8, i);
				const retView = new Uint8Array(retBuf);
				retView[0] |= 128;
				return retBuf;
			}
			let retBuf = utilToBase(modValue, 8, i);
			let retView = new Uint8Array(retBuf);
			if (retView[0] & 128) {
				const tempBuf = retBuf.slice(0);
				const tempView = new Uint8Array(tempBuf);
				retBuf = new ArrayBuffer(retBuf.byteLength + 1);
				retView = new Uint8Array(retBuf);
				for (let k = 0; k < tempBuf.byteLength; k++) retView[k + 1] = tempView[k];
				retView[0] = 0;
			}
			return retBuf;
		}
		bigInt *= Math.pow(2, 8);
	}
	return /* @__PURE__ */ new ArrayBuffer(0);
}
function isEqualBuffer(inputBuffer1, inputBuffer2) {
	if (inputBuffer1.byteLength !== inputBuffer2.byteLength) return false;
	const view1 = new Uint8Array(inputBuffer1);
	const view2 = new Uint8Array(inputBuffer2);
	for (let i = 0; i < view1.length; i++) if (view1[i] !== view2[i]) return false;
	return true;
}
function padNumber(inputNumber, fullLength) {
	const str = inputNumber.toString(10);
	if (fullLength < str.length) return "";
	const dif = fullLength - str.length;
	const padding = new Array(dif);
	for (let i = 0; i < dif; i++) padding[i] = "0";
	return padding.join("").concat(str);
}
//#endregion
//#region ../../node_modules/.pnpm/asn1js@3.0.10/node_modules/asn1js/build/index.es.js
/*!
* Copyright (c) 2014, GMO GlobalSign
* Copyright (c) 2015-2022, Peculiar Ventures
* All rights reserved.
* 
* Author 2014-2019, Yury Strozhevsky
* 
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
* 
* * Redistributions of source code must retain the above copyright notice, this
*   list of conditions and the following disclaimer.
* 
* * Redistributions in binary form must reproduce the above copyright notice, this
*   list of conditions and the following disclaimer in the documentation and/or
*   other materials provided with the distribution.
* 
* * Neither the name of the copyright holder nor the names of its
*   contributors may be used to endorse or promote products derived from
*   this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
* ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
* ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* 
*/
var index_es_exports = /* @__PURE__ */ __exportAll({
	Any: () => Any,
	BaseBlock: () => BaseBlock,
	BaseStringBlock: () => BaseStringBlock,
	BitString: () => BitString$1,
	BmpString: () => BmpString,
	Boolean: () => Boolean$1,
	CharacterString: () => CharacterString,
	Choice: () => Choice,
	Constructed: () => Constructed,
	DATE: () => DATE,
	DEFAULT_MAX_CONTENT_LENGTH: () => DEFAULT_MAX_CONTENT_LENGTH,
	DEFAULT_MAX_DEPTH: () => 100,
	DEFAULT_MAX_NODES: () => DEFAULT_MAX_NODES,
	DateTime: () => DateTime,
	Duration: () => Duration,
	EndOfContent: () => EndOfContent,
	Enumerated: () => Enumerated,
	GeneralString: () => GeneralString,
	GeneralizedTime: () => GeneralizedTime,
	GraphicString: () => GraphicString,
	HexBlock: () => HexBlock,
	IA5String: () => IA5String,
	Integer: () => Integer,
	Null: () => Null,
	NumericString: () => NumericString,
	ObjectIdentifier: () => ObjectIdentifier,
	OctetString: () => OctetString$1,
	Primitive: () => Primitive,
	PrintableString: () => PrintableString,
	RawData: () => RawData,
	RelativeObjectIdentifier: () => RelativeObjectIdentifier,
	Repeated: () => Repeated,
	Sequence: () => Sequence,
	Set: () => Set$1,
	TIME: () => TIME,
	TeletexString: () => TeletexString,
	TimeOfDay: () => TimeOfDay,
	UTCTime: () => UTCTime,
	UniversalString: () => UniversalString,
	Utf8String: () => Utf8String,
	ValueBlock: () => ValueBlock,
	VideotexString: () => VideotexString,
	ViewWriter: () => ViewWriter,
	VisibleString: () => VisibleString,
	compareSchema: () => compareSchema,
	fromBER: () => fromBER,
	verifySchema: () => verifySchema
});
function assertBigInt() {
	if (typeof BigInt === "undefined") throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
}
function concat$1(buffers) {
	let outputLength = 0;
	let prevLength = 0;
	for (let i = 0; i < buffers.length; i++) {
		const buffer = buffers[i];
		outputLength += buffer.byteLength;
	}
	const retView = new Uint8Array(outputLength);
	for (let i = 0; i < buffers.length; i++) {
		const buffer = buffers[i];
		retView.set(new Uint8Array(buffer), prevLength);
		prevLength += buffer.byteLength;
	}
	return retView.buffer;
}
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
	if (!(inputBuffer instanceof Uint8Array)) {
		baseBlock.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
		return false;
	}
	if (!inputBuffer.byteLength) {
		baseBlock.error = "Wrong parameter: inputBuffer has zero length";
		return false;
	}
	if (inputOffset < 0) {
		baseBlock.error = "Wrong parameter: inputOffset less than zero";
		return false;
	}
	if (inputLength < 0) {
		baseBlock.error = "Wrong parameter: inputLength less than zero";
		return false;
	}
	if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
		baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
		return false;
	}
	return true;
}
var ViewWriter = class {
	constructor() {
		this.items = [];
	}
	write(buf) {
		this.items.push(buf);
	}
	final() {
		return concat$1(this.items);
	}
};
var powers2 = [new Uint8Array([1])];
var digitsString = "0123456789";
var NAME$1 = "name";
var VALUE_HEX_VIEW = "valueHexView";
var IS_HEX_ONLY = "isHexOnly";
var ID_BLOCK = "idBlock";
var TAG_CLASS = "tagClass";
var TAG_NUMBER = "tagNumber";
var IS_CONSTRUCTED = "isConstructed";
var FROM_BER = "fromBER";
var TO_BER = "toBER";
var LOCAL = "local";
var EMPTY_STRING = "";
var EMPTY_BUFFER = /* @__PURE__ */ new ArrayBuffer(0);
var EMPTY_VIEW = new Uint8Array(0);
var END_OF_CONTENT_NAME = "EndOfContent";
var OCTET_STRING_NAME = "OCTET STRING";
var BIT_STRING_NAME = "BIT STRING";
function HexBlock(BaseClass) {
	var _a;
	return _a = class Some extends BaseClass {
		get valueHex() {
			return this.valueHexView.slice().buffer;
		}
		set valueHex(value) {
			this.valueHexView = new Uint8Array(value);
		}
		constructor(...args) {
			var _b;
			super(...args);
			const params = args[0] || {};
			this.isHexOnly = (_b = params.isHexOnly) !== null && _b !== void 0 ? _b : false;
			this.valueHexView = params.valueHex ? BufferSourceConverter.toUint8Array(params.valueHex) : EMPTY_VIEW;
		}
		fromBER(inputBuffer, inputOffset, inputLength, _context) {
			const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
			if (!checkBufferParams(this, view, inputOffset, inputLength)) return -1;
			const endLength = inputOffset + inputLength;
			this.valueHexView = view.subarray(inputOffset, endLength);
			if (!this.valueHexView.length) {
				this.warnings.push("Zero buffer length");
				return inputOffset;
			}
			this.blockLength = inputLength;
			return endLength;
		}
		toBER(sizeOnly = false) {
			if (!this.isHexOnly) {
				this.error = "Flag 'isHexOnly' is not set, abort";
				return EMPTY_BUFFER;
			}
			if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
			return this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer;
		}
		toJSON() {
			return {
				...super.toJSON(),
				isHexOnly: this.isHexOnly,
				valueHex: Convert.ToHex(this.valueHexView)
			};
		}
	}, _a.NAME = "hexBlock", _a;
}
var LocalBaseBlock = class {
	static blockName() {
		return this.NAME;
	}
	get valueBeforeDecode() {
		return this.valueBeforeDecodeView.slice().buffer;
	}
	set valueBeforeDecode(value) {
		this.valueBeforeDecodeView = new Uint8Array(value);
	}
	constructor({ blockLength = 0, error = EMPTY_STRING, warnings = [], valueBeforeDecode = EMPTY_VIEW } = {}) {
		this.blockLength = blockLength;
		this.error = error;
		this.warnings = warnings;
		this.valueBeforeDecodeView = BufferSourceConverter.toUint8Array(valueBeforeDecode);
	}
	toJSON() {
		return {
			blockName: this.constructor.NAME,
			blockLength: this.blockLength,
			error: this.error,
			warnings: this.warnings,
			valueBeforeDecode: Convert.ToHex(this.valueBeforeDecodeView)
		};
	}
};
LocalBaseBlock.NAME = "baseBlock";
var ValueBlock = class extends LocalBaseBlock {
	fromBER(_inputBuffer, _inputOffset, _inputLength, _context) {
		throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
	}
	toBER(_sizeOnly, _writer) {
		throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
	}
};
ValueBlock.NAME = "valueBlock";
var LocalIdentificationBlock = class extends HexBlock(LocalBaseBlock) {
	constructor({ idBlock = {} } = {}) {
		var _a, _b, _c, _d;
		super();
		if (idBlock) {
			this.isHexOnly = (_a = idBlock.isHexOnly) !== null && _a !== void 0 ? _a : false;
			this.valueHexView = idBlock.valueHex ? BufferSourceConverter.toUint8Array(idBlock.valueHex) : EMPTY_VIEW;
			this.tagClass = (_b = idBlock.tagClass) !== null && _b !== void 0 ? _b : -1;
			this.tagNumber = (_c = idBlock.tagNumber) !== null && _c !== void 0 ? _c : -1;
			this.isConstructed = (_d = idBlock.isConstructed) !== null && _d !== void 0 ? _d : false;
		} else {
			this.tagClass = -1;
			this.tagNumber = -1;
			this.isConstructed = false;
		}
	}
	toBER(sizeOnly = false) {
		let firstOctet = 0;
		switch (this.tagClass) {
			case 1:
				firstOctet |= 0;
				break;
			case 2:
				firstOctet |= 64;
				break;
			case 3:
				firstOctet |= 128;
				break;
			case 4:
				firstOctet |= 192;
				break;
			default:
				this.error = "Unknown tag class";
				return EMPTY_BUFFER;
		}
		if (this.isConstructed) firstOctet |= 32;
		if (this.tagNumber < 31 && !this.isHexOnly) {
			const retView = new Uint8Array(1);
			if (!sizeOnly) {
				let number = this.tagNumber;
				number &= 31;
				firstOctet |= number;
				retView[0] = firstOctet;
			}
			return retView.buffer;
		}
		if (!this.isHexOnly) {
			const encodedBuf = utilToBase(this.tagNumber, 7);
			const encodedView = new Uint8Array(encodedBuf);
			const size = encodedBuf.byteLength;
			const retView = new Uint8Array(size + 1);
			retView[0] = firstOctet | 31;
			if (!sizeOnly) {
				for (let i = 0; i < size - 1; i++) retView[i + 1] = encodedView[i] | 128;
				retView[size] = encodedView[size - 1];
			}
			return retView.buffer;
		}
		const retView = new Uint8Array(this.valueHexView.byteLength + 1);
		retView[0] = firstOctet | 31;
		if (!sizeOnly) {
			const curView = this.valueHexView;
			for (let i = 0; i < curView.length - 1; i++) retView[i + 1] = curView[i] | 128;
			retView[this.valueHexView.byteLength] = curView[curView.length - 1];
		}
		return retView.buffer;
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		const inputView = BufferSourceConverter.toUint8Array(inputBuffer);
		if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
		const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
		if (intBuffer.length === 0) {
			this.error = "Zero buffer length";
			return -1;
		}
		switch (intBuffer[0] & 192) {
			case 0:
				this.tagClass = 1;
				break;
			case 64:
				this.tagClass = 2;
				break;
			case 128:
				this.tagClass = 3;
				break;
			case 192:
				this.tagClass = 4;
				break;
			default:
				this.error = "Unknown tag class";
				return -1;
		}
		this.isConstructed = (intBuffer[0] & 32) === 32;
		this.isHexOnly = false;
		const tagNumberMask = intBuffer[0] & 31;
		if (tagNumberMask !== 31) {
			this.tagNumber = tagNumberMask;
			this.blockLength = 1;
		} else {
			let count = 0;
			while (true) {
				const tagByteIndex = count + 1;
				if (tagByteIndex >= intBuffer.length) {
					this.error = "End of input reached before message was fully decoded";
					return -1;
				}
				count++;
				if ((intBuffer[tagByteIndex] & 128) === 0) break;
			}
			this.blockLength = count + 1;
			const intTagNumberBuffer = this.valueHexView = new Uint8Array(count);
			for (let i = 0; i < count; i++) intTagNumberBuffer[i] = intBuffer[i + 1] & 127;
			if (this.blockLength <= 9) this.tagNumber = utilFromBase(intTagNumberBuffer, 7);
			else {
				this.isHexOnly = true;
				this.warnings.push("Tag too long, represented as hex-coded");
			}
		}
		if (this.tagClass === 1 && this.isConstructed) switch (this.tagNumber) {
			case 1:
			case 2:
			case 5:
			case 6:
			case 9:
			case 13:
			case 14:
			case 23:
			case 24:
			case 31:
			case 32:
			case 33:
			case 34:
				this.error = "Constructed encoding used for primitive type";
				return -1;
		}
		return inputOffset + this.blockLength;
	}
	toJSON() {
		return {
			...super.toJSON(),
			tagClass: this.tagClass,
			tagNumber: this.tagNumber,
			isConstructed: this.isConstructed
		};
	}
};
LocalIdentificationBlock.NAME = "identificationBlock";
var LocalLengthBlock = class extends LocalBaseBlock {
	constructor({ lenBlock = {} } = {}) {
		var _a, _b, _c;
		super();
		this.isIndefiniteForm = (_a = lenBlock.isIndefiniteForm) !== null && _a !== void 0 ? _a : false;
		this.longFormUsed = (_b = lenBlock.longFormUsed) !== null && _b !== void 0 ? _b : false;
		this.length = (_c = lenBlock.length) !== null && _c !== void 0 ? _c : 0;
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		const view = BufferSourceConverter.toUint8Array(inputBuffer);
		if (!checkBufferParams(this, view, inputOffset, inputLength)) return -1;
		const intBuffer = view.subarray(inputOffset, inputOffset + inputLength);
		if (intBuffer.length === 0) {
			this.error = "Zero buffer length";
			return -1;
		}
		if (intBuffer[0] === 255) {
			this.error = "Length block 0xFF is reserved by standard";
			return -1;
		}
		this.isIndefiniteForm = intBuffer[0] === 128;
		if (this.isIndefiniteForm) {
			this.blockLength = 1;
			return inputOffset + this.blockLength;
		}
		this.longFormUsed = !!(intBuffer[0] & 128);
		if (this.longFormUsed === false) {
			this.length = intBuffer[0];
			this.blockLength = 1;
			return inputOffset + this.blockLength;
		}
		const count = intBuffer[0] & 127;
		if (count > 8) {
			this.error = "Too big integer";
			return -1;
		}
		if (count + 1 > intBuffer.length) {
			this.error = "End of input reached before message was fully decoded";
			return -1;
		}
		const lenOffset = inputOffset + 1;
		const lengthBufferView = view.subarray(lenOffset, lenOffset + count);
		if (lengthBufferView[count - 1] === 0) this.warnings.push("Needlessly long encoded length");
		this.length = utilFromBase(lengthBufferView, 8);
		if (this.longFormUsed && this.length <= 127) this.warnings.push("Unnecessary usage of long length form");
		this.blockLength = count + 1;
		return inputOffset + this.blockLength;
	}
	toBER(sizeOnly = false) {
		let retBuf;
		let retView;
		if (this.length > 127) this.longFormUsed = true;
		if (this.isIndefiniteForm) {
			retBuf = /* @__PURE__ */ new ArrayBuffer(1);
			if (sizeOnly === false) {
				retView = new Uint8Array(retBuf);
				retView[0] = 128;
			}
			return retBuf;
		}
		if (this.longFormUsed) {
			const encodedBuf = utilToBase(this.length, 8);
			if (encodedBuf.byteLength > 127) {
				this.error = "Too big length";
				return EMPTY_BUFFER;
			}
			retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);
			if (sizeOnly) return retBuf;
			const encodedView = new Uint8Array(encodedBuf);
			retView = new Uint8Array(retBuf);
			retView[0] = encodedBuf.byteLength | 128;
			for (let i = 0; i < encodedBuf.byteLength; i++) retView[i + 1] = encodedView[i];
			return retBuf;
		}
		retBuf = /* @__PURE__ */ new ArrayBuffer(1);
		if (sizeOnly === false) {
			retView = new Uint8Array(retBuf);
			retView[0] = this.length;
		}
		return retBuf;
	}
	toJSON() {
		return {
			...super.toJSON(),
			isIndefiniteForm: this.isIndefiniteForm,
			longFormUsed: this.longFormUsed,
			length: this.length
		};
	}
};
LocalLengthBlock.NAME = "lengthBlock";
var typeStore = {};
var BaseBlock = class extends LocalBaseBlock {
	constructor({ name = EMPTY_STRING, optional = false, primitiveSchema, ...parameters } = {}, valueBlockType) {
		super(parameters);
		this.name = name;
		this.optional = optional;
		if (primitiveSchema) this.primitiveSchema = primitiveSchema;
		this.idBlock = new LocalIdentificationBlock(parameters);
		this.lenBlock = new LocalLengthBlock(parameters);
		this.valueBlock = valueBlockType ? new valueBlockType(parameters) : new ValueBlock(parameters);
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length, context);
		if (resultOffset === -1) {
			this.error = this.valueBlock.error;
			return resultOffset;
		}
		if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
		if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
		if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
		return resultOffset;
	}
	toBER(sizeOnly, writer) {
		const _writer = writer || new ViewWriter();
		if (!writer) prepareIndefiniteForm(this);
		const idBlockBuf = this.idBlock.toBER(sizeOnly);
		_writer.write(idBlockBuf);
		if (this.lenBlock.isIndefiniteForm) {
			_writer.write(new Uint8Array([128]).buffer);
			this.valueBlock.toBER(sizeOnly, _writer);
			_writer.write(/* @__PURE__ */ new ArrayBuffer(2));
		} else {
			const valueBlockBuf = this.valueBlock.toBER(sizeOnly);
			this.lenBlock.length = valueBlockBuf.byteLength;
			const lenBlockBuf = this.lenBlock.toBER(sizeOnly);
			_writer.write(lenBlockBuf);
			_writer.write(valueBlockBuf);
		}
		if (!writer) return _writer.final();
		return EMPTY_BUFFER;
	}
	toJSON() {
		const object = {
			...super.toJSON(),
			idBlock: this.idBlock.toJSON(),
			lenBlock: this.lenBlock.toJSON(),
			valueBlock: this.valueBlock.toJSON(),
			name: this.name,
			optional: this.optional
		};
		if (this.primitiveSchema) object.primitiveSchema = this.primitiveSchema.toJSON();
		return object;
	}
	toString(encoding = "ascii") {
		if (encoding === "ascii") return this.onAsciiEncoding();
		return Convert.ToHex(this.toBER());
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : ${Convert.ToHex(this.valueBlock.valueBeforeDecodeView)}`;
	}
	isEqual(other) {
		if (this === other) return true;
		if (!(other instanceof this.constructor)) return false;
		return isEqualBuffer(this.toBER(), other.toBER());
	}
};
BaseBlock.NAME = "BaseBlock";
function prepareIndefiniteForm(baseBlock) {
	var _a;
	if (baseBlock instanceof typeStore.Constructed) {
		for (const value of baseBlock.valueBlock.value) if (prepareIndefiniteForm(value)) baseBlock.lenBlock.isIndefiniteForm = true;
	}
	return !!((_a = baseBlock.lenBlock) === null || _a === void 0 ? void 0 : _a.isIndefiniteForm);
}
var BaseStringBlock = class extends BaseBlock {
	getValue() {
		return this.valueBlock.value;
	}
	setValue(value) {
		this.valueBlock.value = value;
	}
	constructor({ value = EMPTY_STRING, ...parameters } = {}, stringValueBlockType) {
		super(parameters, stringValueBlockType);
		if (value) this.fromString(value);
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
		if (resultOffset === -1) {
			this.error = this.valueBlock.error;
			return resultOffset;
		}
		this.fromBuffer(this.valueBlock.valueHexView);
		if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
		if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
		if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
		return resultOffset;
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
	}
};
BaseStringBlock.NAME = "BaseStringBlock";
var LocalPrimitiveValueBlock = class extends HexBlock(ValueBlock) {
	constructor({ isHexOnly = true, ...parameters } = {}) {
		super(parameters);
		this.isHexOnly = isHexOnly;
	}
};
LocalPrimitiveValueBlock.NAME = "PrimitiveValueBlock";
var _a$w;
var Primitive = class extends BaseBlock {
	constructor(parameters = {}) {
		super(parameters, LocalPrimitiveValueBlock);
		this.idBlock.isConstructed = false;
	}
};
_a$w = Primitive;
typeStore.Primitive = _a$w;
Primitive.NAME = "PRIMITIVE";
var DEFAULT_MAX_NODES = 1e4;
var DEFAULT_MAX_CONTENT_LENGTH = 16 * 1024 * 1024;
var MAX_DEPTH_EXCEEDED_ERROR = "Maximum ASN.1 nesting depth exceeded";
var MAX_NODES_EXCEEDED_ERROR = "Maximum ASN.1 node count exceeded";
var MAX_CONTENT_LENGTH_EXCEEDED_ERROR = "Maximum ASN.1 content length exceeded";
function createFromBerContext(options = {}) {
	var _a, _b, _c;
	return {
		depth: 0,
		maxDepth: (_a = options.maxDepth) !== null && _a !== void 0 ? _a : 100,
		nodesCount: 0,
		maxNodes: (_b = options.maxNodes) !== null && _b !== void 0 ? _b : DEFAULT_MAX_NODES,
		maxContentLength: (_c = options.maxContentLength) !== null && _c !== void 0 ? _c : DEFAULT_MAX_CONTENT_LENGTH
	};
}
function createErrorResult(error) {
	const result = new BaseBlock({}, ValueBlock);
	result.error = error;
	return {
		offset: -1,
		result
	};
}
function checkNodesLimit(context) {
	context.nodesCount += 1;
	if (context.nodesCount > context.maxNodes) return MAX_NODES_EXCEEDED_ERROR;
}
function checkContentLengthLimit(inputLength, context) {
	if (inputLength > context.maxContentLength) return MAX_CONTENT_LENGTH_EXCEEDED_ERROR;
}
function localFromBERWithChildContext(inputBuffer, inputOffset, inputLength, context) {
	const childDepth = context.depth + 1;
	if (childDepth > context.maxDepth) return createErrorResult(MAX_DEPTH_EXCEEDED_ERROR);
	context.depth = childDepth;
	try {
		return localFromBER(inputBuffer, inputOffset, inputLength, context);
	} finally {
		context.depth -= 1;
	}
}
function localChangeType(inputObject, newType) {
	if (inputObject instanceof newType) return inputObject;
	const newObject = new newType();
	newObject.idBlock = inputObject.idBlock;
	newObject.lenBlock = inputObject.lenBlock;
	newObject.warnings = inputObject.warnings;
	newObject.valueBeforeDecodeView = inputObject.valueBeforeDecodeView;
	return newObject;
}
function localFromBER(inputBuffer, inputOffset = 0, inputLength = inputBuffer.length, context = createFromBerContext()) {
	const incomingOffset = inputOffset;
	let returnObject = new BaseBlock({}, ValueBlock);
	const baseBlock = new LocalBaseBlock();
	if (!checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)) {
		returnObject.error = baseBlock.error;
		return {
			offset: -1,
			result: returnObject
		};
	}
	if (!inputBuffer.subarray(inputOffset, inputOffset + inputLength).length) {
		returnObject.error = "Zero buffer length";
		return {
			offset: -1,
			result: returnObject
		};
	}
	const nodesLimitError = checkNodesLimit(context);
	if (nodesLimitError) {
		returnObject.error = nodesLimitError;
		return {
			offset: -1,
			result: returnObject
		};
	}
	let resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
	if (returnObject.idBlock.warnings.length) returnObject.warnings.concat(returnObject.idBlock.warnings);
	if (resultOffset === -1) {
		returnObject.error = returnObject.idBlock.error;
		return {
			offset: -1,
			result: returnObject
		};
	}
	inputOffset = resultOffset;
	inputLength -= returnObject.idBlock.blockLength;
	resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
	if (returnObject.lenBlock.warnings.length) returnObject.warnings.concat(returnObject.lenBlock.warnings);
	if (resultOffset === -1) {
		returnObject.error = returnObject.lenBlock.error;
		return {
			offset: -1,
			result: returnObject
		};
	}
	inputOffset = resultOffset;
	inputLength -= returnObject.lenBlock.blockLength;
	const valueLength = returnObject.lenBlock.isIndefiniteForm ? inputLength : returnObject.lenBlock.length;
	const contentLengthError = checkContentLengthLimit(valueLength, context);
	if (contentLengthError) {
		returnObject.error = contentLengthError;
		return {
			offset: -1,
			result: returnObject
		};
	}
	if (!returnObject.idBlock.isConstructed && returnObject.lenBlock.isIndefiniteForm) {
		returnObject.error = "Indefinite length form used for primitive encoding form";
		return {
			offset: -1,
			result: returnObject
		};
	}
	let newASN1Type = BaseBlock;
	switch (returnObject.idBlock.tagClass) {
		case 1:
			if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
				returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
				return {
					offset: -1,
					result: returnObject
				};
			}
			switch (returnObject.idBlock.tagNumber) {
				case 0:
					if (returnObject.idBlock.isConstructed && returnObject.lenBlock.length > 0) {
						returnObject.error = "Type [UNIVERSAL 0] is reserved";
						return {
							offset: -1,
							result: returnObject
						};
					}
					newASN1Type = typeStore.EndOfContent;
					break;
				case 1:
					newASN1Type = typeStore.Boolean;
					break;
				case 2:
					newASN1Type = typeStore.Integer;
					break;
				case 3:
					newASN1Type = typeStore.BitString;
					break;
				case 4:
					newASN1Type = typeStore.OctetString;
					break;
				case 5:
					newASN1Type = typeStore.Null;
					break;
				case 6:
					newASN1Type = typeStore.ObjectIdentifier;
					break;
				case 10:
					newASN1Type = typeStore.Enumerated;
					break;
				case 12:
					newASN1Type = typeStore.Utf8String;
					break;
				case 13:
					newASN1Type = typeStore.RelativeObjectIdentifier;
					break;
				case 14:
					newASN1Type = typeStore.TIME;
					break;
				case 15:
					returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
					return {
						offset: -1,
						result: returnObject
					};
				case 16:
					newASN1Type = typeStore.Sequence;
					break;
				case 17:
					newASN1Type = typeStore.Set;
					break;
				case 18:
					newASN1Type = typeStore.NumericString;
					break;
				case 19:
					newASN1Type = typeStore.PrintableString;
					break;
				case 20:
					newASN1Type = typeStore.TeletexString;
					break;
				case 21:
					newASN1Type = typeStore.VideotexString;
					break;
				case 22:
					newASN1Type = typeStore.IA5String;
					break;
				case 23:
					newASN1Type = typeStore.UTCTime;
					break;
				case 24:
					newASN1Type = typeStore.GeneralizedTime;
					break;
				case 25:
					newASN1Type = typeStore.GraphicString;
					break;
				case 26:
					newASN1Type = typeStore.VisibleString;
					break;
				case 27:
					newASN1Type = typeStore.GeneralString;
					break;
				case 28:
					newASN1Type = typeStore.UniversalString;
					break;
				case 29:
					newASN1Type = typeStore.CharacterString;
					break;
				case 30:
					newASN1Type = typeStore.BmpString;
					break;
				case 31:
					newASN1Type = typeStore.DATE;
					break;
				case 32:
					newASN1Type = typeStore.TimeOfDay;
					break;
				case 33:
					newASN1Type = typeStore.DateTime;
					break;
				case 34:
					newASN1Type = typeStore.Duration;
					break;
				default: {
					const newObject = returnObject.idBlock.isConstructed ? new typeStore.Constructed() : new typeStore.Primitive();
					newObject.idBlock = returnObject.idBlock;
					newObject.lenBlock = returnObject.lenBlock;
					newObject.warnings = returnObject.warnings;
					returnObject = newObject;
				}
			}
			break;
		default: newASN1Type = returnObject.idBlock.isConstructed ? typeStore.Constructed : typeStore.Primitive;
	}
	returnObject = localChangeType(returnObject, newASN1Type);
	resultOffset = returnObject.fromBER(inputBuffer, inputOffset, valueLength, context);
	returnObject.valueBeforeDecodeView = inputBuffer.subarray(incomingOffset, incomingOffset + returnObject.blockLength);
	return {
		offset: resultOffset,
		result: returnObject
	};
}
function fromBER(inputBuffer, options = {}) {
	if (!inputBuffer.byteLength) {
		const result = new BaseBlock({}, ValueBlock);
		result.error = "Input buffer has zero length";
		return {
			offset: -1,
			result
		};
	}
	return localFromBER(BufferSourceConverter.toUint8Array(inputBuffer).slice(), 0, inputBuffer.byteLength, createFromBerContext(options));
}
function checkLen(indefiniteLength, length) {
	if (indefiniteLength) return 1;
	return length;
}
var LocalConstructedValueBlock = class extends ValueBlock {
	constructor({ value = [], isIndefiniteForm = false, ...parameters } = {}) {
		super(parameters);
		this.value = value;
		this.isIndefiniteForm = isIndefiniteForm;
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		const view = BufferSourceConverter.toUint8Array(inputBuffer);
		const parseContext = context !== null && context !== void 0 ? context : createFromBerContext();
		if (!checkBufferParams(this, view, inputOffset, inputLength)) return -1;
		this.valueBeforeDecodeView = view.subarray(inputOffset, inputOffset + inputLength);
		if (this.valueBeforeDecodeView.length === 0) {
			this.warnings.push("Zero buffer length");
			return inputOffset;
		}
		let currentOffset = inputOffset;
		while (checkLen(this.isIndefiniteForm, inputLength) > 0) {
			const returnObject = localFromBERWithChildContext(view, currentOffset, inputLength, parseContext);
			if (returnObject.offset === -1) {
				this.error = returnObject.result.error;
				this.warnings.concat(returnObject.result.warnings);
				return -1;
			}
			currentOffset = returnObject.offset;
			this.blockLength += returnObject.result.blockLength;
			inputLength -= returnObject.result.blockLength;
			this.value.push(returnObject.result);
			if (this.isIndefiniteForm && returnObject.result.constructor.NAME === END_OF_CONTENT_NAME) break;
		}
		if (this.isIndefiniteForm) if (this.value[this.value.length - 1].constructor.NAME === END_OF_CONTENT_NAME) this.value.pop();
		else this.warnings.push("No EndOfContent block encoded");
		return currentOffset;
	}
	toBER(sizeOnly, writer) {
		const _writer = writer || new ViewWriter();
		for (let i = 0; i < this.value.length; i++) this.value[i].toBER(sizeOnly, _writer);
		if (!writer) return _writer.final();
		return EMPTY_BUFFER;
	}
	toJSON() {
		const object = {
			...super.toJSON(),
			isIndefiniteForm: this.isIndefiniteForm,
			value: []
		};
		for (const value of this.value) object.value.push(value.toJSON());
		return object;
	}
};
LocalConstructedValueBlock.NAME = "ConstructedValueBlock";
var _a$v;
var Constructed = class extends BaseBlock {
	constructor(parameters = {}) {
		super(parameters, LocalConstructedValueBlock);
		this.idBlock.isConstructed = true;
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length, context);
		if (resultOffset === -1) {
			this.error = this.valueBlock.error;
			return resultOffset;
		}
		if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
		if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
		if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
		return resultOffset;
	}
	onAsciiEncoding() {
		const values = [];
		for (const value of this.valueBlock.value) values.push(value.toString("ascii").split("\n").map((o) => `  ${o}`).join("\n"));
		const blockName = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
		return values.length ? `${blockName} :\n${values.join("\n")}` : `${blockName} :`;
	}
};
_a$v = Constructed;
typeStore.Constructed = _a$v;
Constructed.NAME = "CONSTRUCTED";
var LocalEndOfContentValueBlock = class extends ValueBlock {
	fromBER(inputBuffer, inputOffset, _inputLength) {
		return inputOffset;
	}
	toBER(_sizeOnly) {
		return EMPTY_BUFFER;
	}
};
LocalEndOfContentValueBlock.override = "EndOfContentValueBlock";
var _a$u;
var EndOfContent = class extends BaseBlock {
	constructor(parameters = {}) {
		super(parameters, LocalEndOfContentValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 0;
	}
};
_a$u = EndOfContent;
typeStore.EndOfContent = _a$u;
EndOfContent.NAME = END_OF_CONTENT_NAME;
var _a$t;
var Null = class extends BaseBlock {
	constructor(parameters = {}) {
		super(parameters, ValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 5;
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		if (this.lenBlock.length > 0) this.warnings.push("Non-zero length of value block for Null type");
		if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
		if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
		this.blockLength += inputLength;
		if (inputOffset + inputLength > inputBuffer.byteLength) {
			this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
			return -1;
		}
		return inputOffset + inputLength;
	}
	toBER(sizeOnly, writer) {
		const retBuf = /* @__PURE__ */ new ArrayBuffer(2);
		if (!sizeOnly) {
			const retView = new Uint8Array(retBuf);
			retView[0] = 5;
			retView[1] = 0;
		}
		if (writer) writer.write(retBuf);
		return retBuf;
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME}`;
	}
};
_a$t = Null;
typeStore.Null = _a$t;
Null.NAME = "NULL";
var LocalBooleanValueBlock = class extends HexBlock(ValueBlock) {
	get value() {
		for (const octet of this.valueHexView) if (octet > 0) return true;
		return false;
	}
	set value(value) {
		this.valueHexView[0] = value ? 255 : 0;
	}
	constructor({ value, ...parameters } = {}) {
		super(parameters);
		if (parameters.valueHex) this.valueHexView = BufferSourceConverter.toUint8Array(parameters.valueHex);
		else this.valueHexView = new Uint8Array(1);
		if (value) this.value = value;
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		const inputView = BufferSourceConverter.toUint8Array(inputBuffer);
		if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
		this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);
		if (inputLength > 1) this.warnings.push("Boolean value encoded in more then 1 octet");
		this.isHexOnly = true;
		utilDecodeTC.call(this);
		this.blockLength = inputLength;
		return inputOffset + inputLength;
	}
	toBER() {
		return this.valueHexView.slice();
	}
	toJSON() {
		return {
			...super.toJSON(),
			value: this.value
		};
	}
};
LocalBooleanValueBlock.NAME = "BooleanValueBlock";
var _a$s;
var Boolean$1 = class extends BaseBlock {
	getValue() {
		return this.valueBlock.value;
	}
	setValue(value) {
		this.valueBlock.value = value;
	}
	constructor(parameters = {}) {
		super(parameters, LocalBooleanValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 1;
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : ${this.getValue}`;
	}
};
_a$s = Boolean$1;
typeStore.Boolean = _a$s;
Boolean$1.NAME = "BOOLEAN";
var LocalOctetStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
	constructor({ isConstructed = false, ...parameters } = {}) {
		super(parameters);
		this.isConstructed = isConstructed;
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		let resultOffset = 0;
		if (this.isConstructed) {
			this.isHexOnly = false;
			resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength, context);
			if (resultOffset === -1) return resultOffset;
			for (let i = 0; i < this.value.length; i++) {
				const currentBlockName = this.value[i].constructor.NAME;
				if (currentBlockName === END_OF_CONTENT_NAME) if (this.isIndefiniteForm) break;
				else {
					this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
					return -1;
				}
				if (currentBlockName !== OCTET_STRING_NAME) {
					this.error = "OCTET STRING may consists of OCTET STRINGs only";
					return -1;
				}
			}
		} else {
			this.isHexOnly = true;
			resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
			this.blockLength = inputLength;
		}
		return resultOffset;
	}
	toBER(sizeOnly, writer) {
		if (this.isConstructed) return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
		return sizeOnly ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
	}
	toJSON() {
		return {
			...super.toJSON(),
			isConstructed: this.isConstructed
		};
	}
};
LocalOctetStringValueBlock.NAME = "OctetStringValueBlock";
var _a$r;
var OctetString$1 = class extends BaseBlock {
	constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
		var _b, _c;
		(_b = parameters.isConstructed) !== null && _b !== void 0 || (parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length));
		super({
			idBlock: {
				isConstructed: parameters.isConstructed,
				...idBlock
			},
			lenBlock: {
				...lenBlock,
				isIndefiniteForm: !!parameters.isIndefiniteForm
			},
			...parameters
		}, LocalOctetStringValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 4;
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		this.valueBlock.isConstructed = this.idBlock.isConstructed;
		this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
		if (inputLength === 0) {
			if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;
			if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;
			return inputOffset;
		}
		if (!this.valueBlock.isConstructed) {
			const buf = (inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer).subarray(inputOffset, inputOffset + inputLength);
			try {
				if (buf.byteLength) {
					const parseContext = context !== null && context !== void 0 ? context : createFromBerContext();
					const asn = localFromBERWithChildContext(buf, 0, buf.byteLength, parseContext);
					if (asn.offset !== -1 && asn.offset === inputLength) this.valueBlock.value = [asn.result];
				}
			} catch {}
		}
		return super.fromBER(inputBuffer, inputOffset, inputLength, context);
	}
	onAsciiEncoding() {
		if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) return Constructed.prototype.onAsciiEncoding.call(this);
		return `${this.constructor.NAME} : ${Convert.ToHex(this.valueBlock.valueHexView)}`;
	}
	getValue() {
		if (!this.idBlock.isConstructed) return this.valueBlock.valueHexView.slice().buffer;
		const array = [];
		for (const content of this.valueBlock.value) if (content instanceof _a$r) array.push(content.valueBlock.valueHexView);
		return BufferSourceConverter.concat(array);
	}
};
_a$r = OctetString$1;
typeStore.OctetString = _a$r;
OctetString$1.NAME = OCTET_STRING_NAME;
var LocalBitStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
	constructor({ unusedBits = 0, isConstructed = false, ...parameters } = {}) {
		super(parameters);
		this.unusedBits = unusedBits;
		this.isConstructed = isConstructed;
		this.blockLength = this.valueHexView.byteLength;
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		if (!inputLength) return inputOffset;
		let resultOffset = -1;
		if (this.isConstructed) {
			resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength, context);
			if (resultOffset === -1) return resultOffset;
			for (const value of this.value) {
				const currentBlockName = value.constructor.NAME;
				if (currentBlockName === END_OF_CONTENT_NAME) if (this.isIndefiniteForm) break;
				else {
					this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
					return -1;
				}
				if (currentBlockName !== BIT_STRING_NAME) {
					this.error = "BIT STRING may consists of BIT STRINGs only";
					return -1;
				}
				const valueBlock = value.valueBlock;
				if (this.unusedBits > 0 && valueBlock.unusedBits > 0) {
					this.error = "Using of \"unused bits\" inside constructive BIT STRING allowed for least one only";
					return -1;
				}
				this.unusedBits = valueBlock.unusedBits;
			}
			return resultOffset;
		}
		const inputView = BufferSourceConverter.toUint8Array(inputBuffer);
		if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
		const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
		this.unusedBits = intBuffer[0];
		if (this.unusedBits > 7) {
			this.error = "Unused bits for BitString must be in range 0-7";
			return -1;
		}
		if (!this.unusedBits) {
			const buf = intBuffer.subarray(1);
			try {
				if (buf.byteLength) {
					const parseContext = context !== null && context !== void 0 ? context : createFromBerContext();
					const asn = localFromBERWithChildContext(buf, 0, buf.byteLength, parseContext);
					if (asn.offset !== -1 && asn.offset === inputLength - 1) this.value = [asn.result];
				}
			} catch {}
		}
		this.valueHexView = intBuffer.subarray(1);
		this.blockLength = intBuffer.length;
		return inputOffset + inputLength;
	}
	toBER(sizeOnly, writer) {
		if (this.isConstructed) return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
		if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength + 1);
		if (!this.valueHexView.byteLength) {
			const empty = new Uint8Array(1);
			empty[0] = 0;
			return empty.buffer;
		}
		const retView = new Uint8Array(this.valueHexView.length + 1);
		retView[0] = this.unusedBits;
		retView.set(this.valueHexView, 1);
		return retView.buffer;
	}
	toJSON() {
		return {
			...super.toJSON(),
			unusedBits: this.unusedBits,
			isConstructed: this.isConstructed
		};
	}
};
LocalBitStringValueBlock.NAME = "BitStringValueBlock";
var _a$q;
var BitString$1 = class extends BaseBlock {
	constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
		var _b, _c;
		(_b = parameters.isConstructed) !== null && _b !== void 0 || (parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length));
		super({
			idBlock: {
				isConstructed: parameters.isConstructed,
				...idBlock
			},
			lenBlock: {
				...lenBlock,
				isIndefiniteForm: !!parameters.isIndefiniteForm
			},
			...parameters
		}, LocalBitStringValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 3;
	}
	fromBER(inputBuffer, inputOffset, inputLength, context) {
		this.valueBlock.isConstructed = this.idBlock.isConstructed;
		this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
		return super.fromBER(inputBuffer, inputOffset, inputLength, context);
	}
	onAsciiEncoding() {
		if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) return Constructed.prototype.onAsciiEncoding.call(this);
		else {
			const bits = [];
			const valueHex = this.valueBlock.valueHexView;
			for (const byte of valueHex) bits.push(byte.toString(2).padStart(8, "0"));
			const bitsStr = bits.join("");
			return `${this.constructor.NAME} : ${bitsStr.substring(0, bitsStr.length - this.valueBlock.unusedBits)}`;
		}
	}
};
_a$q = BitString$1;
typeStore.BitString = _a$q;
BitString$1.NAME = BIT_STRING_NAME;
var _a$p;
function viewAdd(first, second) {
	const c = new Uint8Array([0]);
	const firstView = new Uint8Array(first);
	const secondView = new Uint8Array(second);
	let firstViewCopy = firstView.slice(0);
	const firstViewCopyLength = firstViewCopy.length - 1;
	const secondViewCopy = secondView.slice(0);
	const secondViewCopyLength = secondViewCopy.length - 1;
	let value = 0;
	const max = secondViewCopyLength < firstViewCopyLength ? firstViewCopyLength : secondViewCopyLength;
	let counter = 0;
	for (let i = max; i >= 0; i--, counter++) {
		switch (true) {
			case counter < secondViewCopy.length:
				value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
				break;
			default: value = firstViewCopy[firstViewCopyLength - counter] + c[0];
		}
		c[0] = value / 10;
		switch (true) {
			case counter >= firstViewCopy.length:
				firstViewCopy = utilConcatView(new Uint8Array([value % 10]), firstViewCopy);
				break;
			default: firstViewCopy[firstViewCopyLength - counter] = value % 10;
		}
	}
	if (c[0] > 0) firstViewCopy = utilConcatView(c, firstViewCopy);
	return firstViewCopy;
}
function power2(n) {
	if (n >= powers2.length) for (let p = powers2.length; p <= n; p++) {
		const c = new Uint8Array([0]);
		let digits = powers2[p - 1].slice(0);
		for (let i = digits.length - 1; i >= 0; i--) {
			const newValue = new Uint8Array([(digits[i] << 1) + c[0]]);
			c[0] = newValue[0] / 10;
			digits[i] = newValue[0] % 10;
		}
		if (c[0] > 0) digits = utilConcatView(c, digits);
		powers2.push(digits);
	}
	return powers2[n];
}
function viewSub(first, second) {
	let b = 0;
	const firstView = new Uint8Array(first);
	const secondView = new Uint8Array(second);
	const firstViewCopy = firstView.slice(0);
	const firstViewCopyLength = firstViewCopy.length - 1;
	const secondViewCopy = secondView.slice(0);
	const secondViewCopyLength = secondViewCopy.length - 1;
	let value;
	let counter = 0;
	for (let i = secondViewCopyLength; i >= 0; i--, counter++) {
		value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
		switch (true) {
			case value < 0:
				b = 1;
				firstViewCopy[firstViewCopyLength - counter] = value + 10;
				break;
			default:
				b = 0;
				firstViewCopy[firstViewCopyLength - counter] = value;
		}
	}
	if (b > 0) for (let i = firstViewCopyLength - secondViewCopyLength + 1; i >= 0; i--, counter++) {
		value = firstViewCopy[firstViewCopyLength - counter] - b;
		if (value < 0) {
			b = 1;
			firstViewCopy[firstViewCopyLength - counter] = value + 10;
		} else {
			b = 0;
			firstViewCopy[firstViewCopyLength - counter] = value;
			break;
		}
	}
	return firstViewCopy.slice();
}
var LocalIntegerValueBlock = class extends HexBlock(ValueBlock) {
	setValueHex() {
		if (this.valueHexView.length >= 4) {
			this.warnings.push("Too big Integer for decoding, hex only");
			this.isHexOnly = true;
			this._valueDec = 0;
		} else {
			this.isHexOnly = false;
			if (this.valueHexView.length > 0) this._valueDec = utilDecodeTC.call(this);
		}
	}
	constructor({ value, ...parameters } = {}) {
		super(parameters);
		this._valueDec = 0;
		if (parameters.valueHex) this.setValueHex();
		if (value !== void 0) this.valueDec = value;
	}
	set valueDec(v) {
		this._valueDec = v;
		this.isHexOnly = false;
		this.valueHexView = new Uint8Array(utilEncodeTC(v));
	}
	get valueDec() {
		return this._valueDec;
	}
	fromDER(inputBuffer, inputOffset, inputLength, expectedLength = 0) {
		const offset = this.fromBER(inputBuffer, inputOffset, inputLength);
		if (offset === -1) return offset;
		const view = this.valueHexView;
		if (view[0] === 0 && (view[1] & 128) !== 0) this.valueHexView = view.subarray(1);
		else if (expectedLength !== 0) {
			if (view.length < expectedLength) {
				if (expectedLength - view.length > 1) expectedLength = view.length + 1;
				this.valueHexView = view.subarray(expectedLength - view.length);
			}
		}
		return offset;
	}
	toDER(sizeOnly = false) {
		const view = this.valueHexView;
		switch (true) {
			case (view[0] & 128) !== 0:
				{
					const updatedView = new Uint8Array(this.valueHexView.length + 1);
					updatedView[0] = 0;
					updatedView.set(view, 1);
					this.valueHexView = updatedView;
				}
				break;
			case view[0] === 0 && (view[1] & 128) === 0:
				this.valueHexView = this.valueHexView.subarray(1);
				break;
		}
		return this.toBER(sizeOnly);
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		const resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
		if (resultOffset === -1) return resultOffset;
		this.setValueHex();
		return resultOffset;
	}
	toBER(sizeOnly) {
		return sizeOnly ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
	}
	toJSON() {
		return {
			...super.toJSON(),
			valueDec: this.valueDec
		};
	}
	toString() {
		const firstBit = this.valueHexView.length * 8 - 1;
		let digits = new Uint8Array(this.valueHexView.length * 8 / 3);
		let bitNumber = 0;
		let currentByte;
		const asn1View = this.valueHexView;
		let result = "";
		let flag = false;
		for (let byteNumber = asn1View.byteLength - 1; byteNumber >= 0; byteNumber--) {
			currentByte = asn1View[byteNumber];
			for (let i = 0; i < 8; i++) {
				if ((currentByte & 1) === 1) switch (bitNumber) {
					case firstBit:
						digits = viewSub(power2(bitNumber), digits);
						result = "-";
						break;
					default: digits = viewAdd(digits, power2(bitNumber));
				}
				bitNumber++;
				currentByte >>= 1;
			}
		}
		for (let i = 0; i < digits.length; i++) {
			if (digits[i]) flag = true;
			if (flag) result += digitsString.charAt(digits[i]);
		}
		if (flag === false) result += digitsString.charAt(0);
		return result;
	}
};
_a$p = LocalIntegerValueBlock;
LocalIntegerValueBlock.NAME = "IntegerValueBlock";
Object.defineProperty(_a$p.prototype, "valueHex", {
	set: function(v) {
		this.valueHexView = new Uint8Array(v);
		this.setValueHex();
	},
	get: function() {
		return this.valueHexView.slice().buffer;
	}
});
var _a$o;
var Integer = class extends BaseBlock {
	constructor(parameters = {}) {
		super(parameters, LocalIntegerValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 2;
	}
	toBigInt() {
		assertBigInt();
		return BigInt(this.valueBlock.toString());
	}
	static fromBigInt(value) {
		assertBigInt();
		const bigIntValue = BigInt(value);
		const writer = new ViewWriter();
		const hex = bigIntValue.toString(16).replace(/^-/, "");
		const view = new Uint8Array(Convert.FromHex(hex));
		if (bigIntValue < 0) {
			const first = new Uint8Array(view.length + (view[0] & 128 ? 1 : 0));
			first[0] |= 128;
			const secondInt = BigInt(`0x${Convert.ToHex(first)}`) + bigIntValue;
			const second = BufferSourceConverter.toUint8Array(Convert.FromHex(secondInt.toString(16)));
			second[0] |= 128;
			writer.write(second);
		} else {
			if (view[0] & 128) writer.write(new Uint8Array([0]));
			writer.write(view);
		}
		return new _a$o({ valueHex: writer.final() });
	}
	convertToDER() {
		const integer = new _a$o({ valueHex: this.valueBlock.valueHexView });
		integer.valueBlock.toDER();
		return integer;
	}
	convertFromDER() {
		return new _a$o({ valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView });
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
	}
};
_a$o = Integer;
typeStore.Integer = _a$o;
Integer.NAME = "INTEGER";
var _a$n;
var Enumerated = class extends Integer {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 10;
	}
};
_a$n = Enumerated;
typeStore.Enumerated = _a$n;
Enumerated.NAME = "ENUMERATED";
var LocalSidValueBlock = class extends HexBlock(ValueBlock) {
	constructor({ valueDec = -1, isFirstSid = false, ...parameters } = {}) {
		super(parameters);
		this.valueDec = valueDec;
		this.isFirstSid = isFirstSid;
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		if (!inputLength) return inputOffset;
		const inputView = BufferSourceConverter.toUint8Array(inputBuffer);
		if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
		const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
		this.valueHexView = new Uint8Array(inputLength);
		for (let i = 0; i < inputLength; i++) {
			this.valueHexView[i] = intBuffer[i] & 127;
			this.blockLength++;
			if ((intBuffer[i] & 128) === 0) break;
		}
		const tempView = new Uint8Array(this.blockLength);
		for (let i = 0; i < this.blockLength; i++) tempView[i] = this.valueHexView[i];
		this.valueHexView = tempView;
		if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
			this.error = "End of input reached before message was fully decoded";
			return -1;
		}
		if (this.valueHexView[0] === 0) this.warnings.push("Needlessly long format of SID encoding");
		if (this.blockLength <= 8) this.valueDec = utilFromBase(this.valueHexView, 7);
		else {
			this.isHexOnly = true;
			this.warnings.push("Too big SID for decoding, hex only");
		}
		return inputOffset + this.blockLength;
	}
	set valueBigInt(value) {
		assertBigInt();
		let bits = BigInt(value).toString(2);
		while (bits.length % 7) bits = "0" + bits;
		const bytes = new Uint8Array(bits.length / 7);
		for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(bits.slice(i * 7, i * 7 + 7), 2) + (i + 1 < bytes.length ? 128 : 0);
		this.fromBER(bytes.buffer, 0, bytes.length);
	}
	toBER(sizeOnly) {
		if (this.isHexOnly) {
			if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
			const curView = this.valueHexView;
			const retView = new Uint8Array(this.blockLength);
			for (let i = 0; i < this.blockLength - 1; i++) retView[i] = curView[i] | 128;
			retView[this.blockLength - 1] = curView[this.blockLength - 1];
			return retView.buffer;
		}
		const encodedBuf = utilToBase(this.valueDec, 7);
		if (encodedBuf.byteLength === 0) {
			this.error = "Error during encoding SID value";
			return EMPTY_BUFFER;
		}
		const retView = new Uint8Array(encodedBuf.byteLength);
		if (!sizeOnly) {
			const encodedView = new Uint8Array(encodedBuf);
			const len = encodedBuf.byteLength - 1;
			for (let i = 0; i < len; i++) retView[i] = encodedView[i] | 128;
			retView[len] = encodedView[len];
		}
		return retView;
	}
	toString() {
		let result = "";
		if (this.isHexOnly) result = Convert.ToHex(this.valueHexView);
		else if (this.isFirstSid) {
			let sidValue = this.valueDec;
			if (this.valueDec <= 39) result = "0.";
			else if (this.valueDec <= 79) {
				result = "1.";
				sidValue -= 40;
			} else {
				result = "2.";
				sidValue -= 80;
			}
			result += sidValue.toString();
		} else result = this.valueDec.toString();
		return result;
	}
	toJSON() {
		return {
			...super.toJSON(),
			valueDec: this.valueDec,
			isFirstSid: this.isFirstSid
		};
	}
};
LocalSidValueBlock.NAME = "sidBlock";
var LocalObjectIdentifierValueBlock = class extends ValueBlock {
	constructor({ value = EMPTY_STRING, ...parameters } = {}) {
		super(parameters);
		this.value = [];
		if (value) this.fromString(value);
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		let resultOffset = inputOffset;
		while (inputLength > 0) {
			const sidBlock = new LocalSidValueBlock();
			resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
			if (resultOffset === -1) {
				this.blockLength = 0;
				this.error = sidBlock.error;
				return resultOffset;
			}
			if (this.value.length === 0) sidBlock.isFirstSid = true;
			this.blockLength += sidBlock.blockLength;
			inputLength -= sidBlock.blockLength;
			this.value.push(sidBlock);
		}
		return resultOffset;
	}
	toBER(sizeOnly) {
		const retBuffers = [];
		for (let i = 0; i < this.value.length; i++) {
			const valueBuf = this.value[i].toBER(sizeOnly);
			if (valueBuf.byteLength === 0) {
				this.error = this.value[i].error;
				return EMPTY_BUFFER;
			}
			retBuffers.push(valueBuf);
		}
		return concat$1(retBuffers);
	}
	fromString(string) {
		this.value = [];
		let pos1 = 0;
		let pos2 = 0;
		let sid = "";
		let flag = false;
		do {
			pos2 = string.indexOf(".", pos1);
			if (pos2 === -1) sid = string.substring(pos1);
			else sid = string.substring(pos1, pos2);
			pos1 = pos2 + 1;
			if (flag) {
				const sidBlock = this.value[0];
				let plus = 0;
				switch (sidBlock.valueDec) {
					case 0: break;
					case 1:
						plus = 40;
						break;
					case 2:
						plus = 80;
						break;
					default:
						this.value = [];
						return;
				}
				const parsedSID = parseInt(sid, 10);
				if (isNaN(parsedSID)) return;
				sidBlock.valueDec = parsedSID + plus;
				flag = false;
			} else {
				const sidBlock = new LocalSidValueBlock();
				if (sid > Number.MAX_SAFE_INTEGER) {
					assertBigInt();
					sidBlock.valueBigInt = BigInt(sid);
				} else {
					sidBlock.valueDec = parseInt(sid, 10);
					if (isNaN(sidBlock.valueDec)) return;
				}
				if (!this.value.length) {
					sidBlock.isFirstSid = true;
					flag = true;
				}
				this.value.push(sidBlock);
			}
		} while (pos2 !== -1);
	}
	toString() {
		let result = "";
		let isHexOnly = false;
		for (let i = 0; i < this.value.length; i++) {
			isHexOnly = this.value[i].isHexOnly;
			let sidStr = this.value[i].toString();
			if (i !== 0) result = `${result}.`;
			if (isHexOnly) {
				sidStr = `{${sidStr}}`;
				if (this.value[i].isFirstSid) result = `2.{${sidStr} - 80}`;
				else result += sidStr;
			} else result += sidStr;
		}
		return result;
	}
	toJSON() {
		const object = {
			...super.toJSON(),
			value: this.toString(),
			sidArray: []
		};
		for (let i = 0; i < this.value.length; i++) object.sidArray.push(this.value[i].toJSON());
		return object;
	}
};
LocalObjectIdentifierValueBlock.NAME = "ObjectIdentifierValueBlock";
var _a$m;
var ObjectIdentifier = class extends BaseBlock {
	getValue() {
		return this.valueBlock.toString();
	}
	setValue(value) {
		this.valueBlock.fromString(value);
	}
	constructor(parameters = {}) {
		super(parameters, LocalObjectIdentifierValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 6;
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
	}
	toJSON() {
		return {
			...super.toJSON(),
			value: this.getValue()
		};
	}
};
_a$m = ObjectIdentifier;
typeStore.ObjectIdentifier = _a$m;
ObjectIdentifier.NAME = "OBJECT IDENTIFIER";
var LocalRelativeSidValueBlock = class extends HexBlock(LocalBaseBlock) {
	constructor({ valueDec = 0, ...parameters } = {}) {
		super(parameters);
		this.valueDec = valueDec;
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		if (inputLength === 0) return inputOffset;
		const inputView = BufferSourceConverter.toUint8Array(inputBuffer);
		if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
		const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
		this.valueHexView = new Uint8Array(inputLength);
		for (let i = 0; i < inputLength; i++) {
			this.valueHexView[i] = intBuffer[i] & 127;
			this.blockLength++;
			if ((intBuffer[i] & 128) === 0) break;
		}
		const tempView = new Uint8Array(this.blockLength);
		for (let i = 0; i < this.blockLength; i++) tempView[i] = this.valueHexView[i];
		this.valueHexView = tempView;
		if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
			this.error = "End of input reached before message was fully decoded";
			return -1;
		}
		if (this.valueHexView[0] === 0) this.warnings.push("Needlessly long format of SID encoding");
		if (this.blockLength <= 8) this.valueDec = utilFromBase(this.valueHexView, 7);
		else {
			this.isHexOnly = true;
			this.warnings.push("Too big SID for decoding, hex only");
		}
		return inputOffset + this.blockLength;
	}
	toBER(sizeOnly) {
		if (this.isHexOnly) {
			if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
			const curView = this.valueHexView;
			const retView = new Uint8Array(this.blockLength);
			for (let i = 0; i < this.blockLength - 1; i++) retView[i] = curView[i] | 128;
			retView[this.blockLength - 1] = curView[this.blockLength - 1];
			return retView.buffer;
		}
		const encodedBuf = utilToBase(this.valueDec, 7);
		if (encodedBuf.byteLength === 0) {
			this.error = "Error during encoding SID value";
			return EMPTY_BUFFER;
		}
		const retView = new Uint8Array(encodedBuf.byteLength);
		if (!sizeOnly) {
			const encodedView = new Uint8Array(encodedBuf);
			const len = encodedBuf.byteLength - 1;
			for (let i = 0; i < len; i++) retView[i] = encodedView[i] | 128;
			retView[len] = encodedView[len];
		}
		return retView.buffer;
	}
	toString() {
		let result = "";
		if (this.isHexOnly) result = Convert.ToHex(this.valueHexView);
		else result = this.valueDec.toString();
		return result;
	}
	toJSON() {
		return {
			...super.toJSON(),
			valueDec: this.valueDec
		};
	}
};
LocalRelativeSidValueBlock.NAME = "relativeSidBlock";
var LocalRelativeObjectIdentifierValueBlock = class extends ValueBlock {
	constructor({ value = EMPTY_STRING, ...parameters } = {}) {
		super(parameters);
		this.value = [];
		if (value) this.fromString(value);
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		let resultOffset = inputOffset;
		while (inputLength > 0) {
			const sidBlock = new LocalRelativeSidValueBlock();
			resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
			if (resultOffset === -1) {
				this.blockLength = 0;
				this.error = sidBlock.error;
				return resultOffset;
			}
			this.blockLength += sidBlock.blockLength;
			inputLength -= sidBlock.blockLength;
			this.value.push(sidBlock);
		}
		return resultOffset;
	}
	toBER(sizeOnly, _writer) {
		const retBuffers = [];
		for (let i = 0; i < this.value.length; i++) {
			const valueBuf = this.value[i].toBER(sizeOnly);
			if (valueBuf.byteLength === 0) {
				this.error = this.value[i].error;
				return EMPTY_BUFFER;
			}
			retBuffers.push(valueBuf);
		}
		return concat$1(retBuffers);
	}
	fromString(string) {
		this.value = [];
		let pos1 = 0;
		let pos2 = 0;
		let sid = "";
		do {
			pos2 = string.indexOf(".", pos1);
			if (pos2 === -1) sid = string.substring(pos1);
			else sid = string.substring(pos1, pos2);
			pos1 = pos2 + 1;
			const sidBlock = new LocalRelativeSidValueBlock();
			sidBlock.valueDec = parseInt(sid, 10);
			if (isNaN(sidBlock.valueDec)) return true;
			this.value.push(sidBlock);
		} while (pos2 !== -1);
		return true;
	}
	toString() {
		let result = "";
		let isHexOnly = false;
		for (let i = 0; i < this.value.length; i++) {
			isHexOnly = this.value[i].isHexOnly;
			let sidStr = this.value[i].toString();
			if (i !== 0) result = `${result}.`;
			if (isHexOnly) {
				sidStr = `{${sidStr}}`;
				result += sidStr;
			} else result += sidStr;
		}
		return result;
	}
	toJSON() {
		const object = {
			...super.toJSON(),
			value: this.toString(),
			sidArray: []
		};
		for (let i = 0; i < this.value.length; i++) object.sidArray.push(this.value[i].toJSON());
		return object;
	}
};
LocalRelativeObjectIdentifierValueBlock.NAME = "RelativeObjectIdentifierValueBlock";
var _a$l;
var RelativeObjectIdentifier = class extends BaseBlock {
	getValue() {
		return this.valueBlock.toString();
	}
	setValue(value) {
		this.valueBlock.fromString(value);
	}
	constructor(parameters = {}) {
		super(parameters, LocalRelativeObjectIdentifierValueBlock);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 13;
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
	}
	toJSON() {
		return {
			...super.toJSON(),
			value: this.getValue()
		};
	}
};
_a$l = RelativeObjectIdentifier;
typeStore.RelativeObjectIdentifier = _a$l;
RelativeObjectIdentifier.NAME = "RelativeObjectIdentifier";
var _a$k;
var Sequence = class extends Constructed {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 16;
	}
};
_a$k = Sequence;
typeStore.Sequence = _a$k;
Sequence.NAME = "SEQUENCE";
var _a$j;
var Set$1 = class extends Constructed {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 17;
	}
};
_a$j = Set$1;
typeStore.Set = _a$j;
Set$1.NAME = "SET";
var LocalStringValueBlock = class extends HexBlock(ValueBlock) {
	constructor({ ...parameters } = {}) {
		super(parameters);
		this.isHexOnly = true;
		this.value = EMPTY_STRING;
	}
	toJSON() {
		return {
			...super.toJSON(),
			value: this.value
		};
	}
};
LocalStringValueBlock.NAME = "StringValueBlock";
var LocalSimpleStringValueBlock = class extends LocalStringValueBlock {};
LocalSimpleStringValueBlock.NAME = "SimpleStringValueBlock";
var LocalSimpleStringBlock = class extends BaseStringBlock {
	constructor({ ...parameters } = {}) {
		super(parameters, LocalSimpleStringValueBlock);
	}
	fromBuffer(inputBuffer) {
		this.valueBlock.value = String.fromCharCode.apply(null, BufferSourceConverter.toUint8Array(inputBuffer));
	}
	fromString(inputString) {
		const strLen = inputString.length;
		const view = this.valueBlock.valueHexView = new Uint8Array(strLen);
		for (let i = 0; i < strLen; i++) view[i] = inputString.charCodeAt(i);
		this.valueBlock.value = inputString;
	}
};
LocalSimpleStringBlock.NAME = "SIMPLE STRING";
var LocalUtf8StringValueBlock = class extends LocalSimpleStringBlock {
	fromBuffer(inputBuffer) {
		this.valueBlock.valueHexView = BufferSourceConverter.toUint8Array(inputBuffer);
		try {
			this.valueBlock.value = Convert.ToUtf8String(inputBuffer);
		} catch (ex) {
			this.warnings.push(`Error during "decodeURIComponent": ${ex}, using raw string`);
			this.valueBlock.value = Convert.ToBinary(inputBuffer);
		}
	}
	fromString(inputString) {
		this.valueBlock.valueHexView = new Uint8Array(Convert.FromUtf8String(inputString));
		this.valueBlock.value = inputString;
	}
};
LocalUtf8StringValueBlock.NAME = "Utf8StringValueBlock";
var _a$i;
var Utf8String = class extends LocalUtf8StringValueBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 12;
	}
};
_a$i = Utf8String;
typeStore.Utf8String = _a$i;
Utf8String.NAME = "UTF8String";
var LocalBmpStringValueBlock = class extends LocalSimpleStringBlock {
	fromBuffer(inputBuffer) {
		this.valueBlock.value = Convert.ToUtf16String(inputBuffer);
		this.valueBlock.valueHexView = BufferSourceConverter.toUint8Array(inputBuffer);
	}
	fromString(inputString) {
		this.valueBlock.value = inputString;
		this.valueBlock.valueHexView = new Uint8Array(Convert.FromUtf16String(inputString));
	}
};
LocalBmpStringValueBlock.NAME = "BmpStringValueBlock";
var _a$h;
var BmpString = class extends LocalBmpStringValueBlock {
	constructor({ ...parameters } = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 30;
	}
};
_a$h = BmpString;
typeStore.BmpString = _a$h;
BmpString.NAME = "BMPString";
var LocalUniversalStringValueBlock = class extends LocalSimpleStringBlock {
	fromBuffer(inputBuffer) {
		const copyBuffer = ArrayBuffer.isView(inputBuffer) ? inputBuffer.slice().buffer : inputBuffer.slice(0);
		const valueView = new Uint8Array(copyBuffer);
		for (let i = 0; i < valueView.length; i += 4) {
			valueView[i] = valueView[i + 3];
			valueView[i + 1] = valueView[i + 2];
			valueView[i + 2] = 0;
			valueView[i + 3] = 0;
		}
		this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
	}
	fromString(inputString) {
		const strLength = inputString.length;
		const valueHexView = this.valueBlock.valueHexView = new Uint8Array(strLength * 4);
		for (let i = 0; i < strLength; i++) {
			const codeBuf = utilToBase(inputString.charCodeAt(i), 8);
			const codeView = new Uint8Array(codeBuf);
			if (codeView.length > 4) continue;
			const dif = 4 - codeView.length;
			for (let j = codeView.length - 1; j >= 0; j--) valueHexView[i * 4 + j + dif] = codeView[j];
		}
		this.valueBlock.value = inputString;
	}
};
LocalUniversalStringValueBlock.NAME = "UniversalStringValueBlock";
var _a$g;
var UniversalString = class extends LocalUniversalStringValueBlock {
	constructor({ ...parameters } = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 28;
	}
};
_a$g = UniversalString;
typeStore.UniversalString = _a$g;
UniversalString.NAME = "UniversalString";
var _a$f;
var NumericString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 18;
	}
};
_a$f = NumericString;
typeStore.NumericString = _a$f;
NumericString.NAME = "NumericString";
var _a$e;
var PrintableString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 19;
	}
};
_a$e = PrintableString;
typeStore.PrintableString = _a$e;
PrintableString.NAME = "PrintableString";
var _a$d;
var TeletexString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 20;
	}
};
_a$d = TeletexString;
typeStore.TeletexString = _a$d;
TeletexString.NAME = "TeletexString";
var _a$c;
var VideotexString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 21;
	}
};
_a$c = VideotexString;
typeStore.VideotexString = _a$c;
VideotexString.NAME = "VideotexString";
var _a$b;
var IA5String = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 22;
	}
};
_a$b = IA5String;
typeStore.IA5String = _a$b;
IA5String.NAME = "IA5String";
var _a$a;
var GraphicString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 25;
	}
};
_a$a = GraphicString;
typeStore.GraphicString = _a$a;
GraphicString.NAME = "GraphicString";
var _a$9;
var VisibleString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 26;
	}
};
_a$9 = VisibleString;
typeStore.VisibleString = _a$9;
VisibleString.NAME = "VisibleString";
var _a$8;
var GeneralString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 27;
	}
};
_a$8 = GeneralString;
typeStore.GeneralString = _a$8;
GeneralString.NAME = "GeneralString";
var _a$7;
var CharacterString = class extends LocalSimpleStringBlock {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 29;
	}
};
_a$7 = CharacterString;
typeStore.CharacterString = _a$7;
CharacterString.NAME = "CharacterString";
var _a$6;
var UTCTime = class extends VisibleString {
	constructor({ value, valueDate, ...parameters } = {}) {
		super(parameters);
		this.year = 0;
		this.month = 0;
		this.day = 0;
		this.hour = 0;
		this.minute = 0;
		this.second = 0;
		if (value) {
			this.fromString(value);
			this.valueBlock.valueHexView = new Uint8Array(value.length);
			for (let i = 0; i < value.length; i++) this.valueBlock.valueHexView[i] = value.charCodeAt(i);
		}
		if (valueDate) {
			this.fromDate(valueDate);
			this.valueBlock.valueHexView = new Uint8Array(this.toBuffer());
		}
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 23;
	}
	fromBuffer(inputBuffer) {
		this.fromString(String.fromCharCode.apply(null, BufferSourceConverter.toUint8Array(inputBuffer)));
	}
	toBuffer() {
		const str = this.toString();
		const buffer = new ArrayBuffer(str.length);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
		return buffer;
	}
	fromDate(inputDate) {
		this.year = inputDate.getUTCFullYear();
		this.month = inputDate.getUTCMonth() + 1;
		this.day = inputDate.getUTCDate();
		this.hour = inputDate.getUTCHours();
		this.minute = inputDate.getUTCMinutes();
		this.second = inputDate.getUTCSeconds();
	}
	toDate() {
		return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
	}
	fromString(inputString) {
		const parserArray = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/gi.exec(inputString);
		if (parserArray === null) {
			this.error = "Wrong input string for conversion";
			return;
		}
		const year = parseInt(parserArray[1], 10);
		if (year >= 50) this.year = 1900 + year;
		else this.year = 2e3 + year;
		this.month = parseInt(parserArray[2], 10);
		this.day = parseInt(parserArray[3], 10);
		this.hour = parseInt(parserArray[4], 10);
		this.minute = parseInt(parserArray[5], 10);
		this.second = parseInt(parserArray[6], 10);
	}
	toString(encoding = "iso") {
		if (encoding === "iso") {
			const outputArray = new Array(7);
			outputArray[0] = padNumber(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2);
			outputArray[1] = padNumber(this.month, 2);
			outputArray[2] = padNumber(this.day, 2);
			outputArray[3] = padNumber(this.hour, 2);
			outputArray[4] = padNumber(this.minute, 2);
			outputArray[5] = padNumber(this.second, 2);
			outputArray[6] = "Z";
			return outputArray.join("");
		}
		return super.toString(encoding);
	}
	onAsciiEncoding() {
		return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
	}
	toJSON() {
		return {
			...super.toJSON(),
			year: this.year,
			month: this.month,
			day: this.day,
			hour: this.hour,
			minute: this.minute,
			second: this.second
		};
	}
};
_a$6 = UTCTime;
typeStore.UTCTime = _a$6;
UTCTime.NAME = "UTCTime";
var _a$5;
var GeneralizedTime = class extends UTCTime {
	constructor(parameters = {}) {
		var _b;
		super(parameters);
		(_b = this.millisecond) !== null && _b !== void 0 || (this.millisecond = 0);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 24;
	}
	fromDate(inputDate) {
		super.fromDate(inputDate);
		this.millisecond = inputDate.getUTCMilliseconds();
	}
	toDate() {
		const utcDate = Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond);
		return new Date(utcDate);
	}
	fromString(inputString) {
		let isUTC = false;
		let timeString = "";
		let dateTimeString = "";
		let fractionPart = 0;
		let parser;
		let hourDifference = 0;
		let minuteDifference = 0;
		if (inputString[inputString.length - 1] === "Z") {
			timeString = inputString.substring(0, inputString.length - 1);
			isUTC = true;
		} else {
			const number = new Number(inputString[inputString.length - 1]);
			if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
			timeString = inputString;
		}
		if (isUTC) {
			if (timeString.indexOf("+") !== -1) throw new Error("Wrong input string for conversion");
			if (timeString.indexOf("-") !== -1) throw new Error("Wrong input string for conversion");
		} else {
			let multiplier = 1;
			let differencePosition = timeString.indexOf("+");
			let differenceString = "";
			if (differencePosition === -1) {
				differencePosition = timeString.indexOf("-");
				multiplier = -1;
			}
			if (differencePosition !== -1) {
				differenceString = timeString.substring(differencePosition + 1);
				timeString = timeString.substring(0, differencePosition);
				if (differenceString.length !== 2 && differenceString.length !== 4) throw new Error("Wrong input string for conversion");
				let number = parseInt(differenceString.substring(0, 2), 10);
				if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
				hourDifference = multiplier * number;
				if (differenceString.length === 4) {
					number = parseInt(differenceString.substring(2, 4), 10);
					if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
					minuteDifference = multiplier * number;
				}
			}
		}
		let fractionPointPosition = timeString.indexOf(".");
		if (fractionPointPosition === -1) fractionPointPosition = timeString.indexOf(",");
		if (fractionPointPosition !== -1) {
			const fractionPartCheck = /* @__PURE__ */ new Number(`0${timeString.substring(fractionPointPosition)}`);
			if (isNaN(fractionPartCheck.valueOf())) throw new Error("Wrong input string for conversion");
			fractionPart = fractionPartCheck.valueOf();
			dateTimeString = timeString.substring(0, fractionPointPosition);
		} else dateTimeString = timeString;
		switch (true) {
			case dateTimeString.length === 8:
				parser = /(\d{4})(\d{2})(\d{2})/gi;
				if (fractionPointPosition !== -1) throw new Error("Wrong input string for conversion");
				break;
			case dateTimeString.length === 10:
				parser = /(\d{4})(\d{2})(\d{2})(\d{2})/gi;
				if (fractionPointPosition !== -1) {
					let fractionResult = 60 * fractionPart;
					this.minute = Math.floor(fractionResult);
					fractionResult = 60 * (fractionResult - this.minute);
					this.second = Math.floor(fractionResult);
					fractionResult = 1e3 * (fractionResult - this.second);
					this.millisecond = Math.floor(fractionResult);
				}
				break;
			case dateTimeString.length === 12:
				parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/gi;
				if (fractionPointPosition !== -1) {
					let fractionResult = 60 * fractionPart;
					this.second = Math.floor(fractionResult);
					fractionResult = 1e3 * (fractionResult - this.second);
					this.millisecond = Math.floor(fractionResult);
				}
				break;
			case dateTimeString.length === 14:
				parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/gi;
				if (fractionPointPosition !== -1) {
					const fractionResult = 1e3 * fractionPart;
					this.millisecond = Math.floor(fractionResult);
				}
				break;
			default: throw new Error("Wrong input string for conversion");
		}
		const parserArray = parser.exec(dateTimeString);
		if (parserArray === null) throw new Error("Wrong input string for conversion");
		for (let j = 1; j < parserArray.length; j++) switch (j) {
			case 1:
				this.year = parseInt(parserArray[j], 10);
				break;
			case 2:
				this.month = parseInt(parserArray[j], 10);
				break;
			case 3:
				this.day = parseInt(parserArray[j], 10);
				break;
			case 4:
				this.hour = parseInt(parserArray[j], 10) + hourDifference;
				break;
			case 5:
				this.minute = parseInt(parserArray[j], 10) + minuteDifference;
				break;
			case 6:
				this.second = parseInt(parserArray[j], 10);
				break;
			default: throw new Error("Wrong input string for conversion");
		}
		if (isUTC === false) {
			const tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
			this.year = tempDate.getUTCFullYear();
			this.month = tempDate.getUTCMonth();
			this.day = tempDate.getUTCDay();
			this.hour = tempDate.getUTCHours();
			this.minute = tempDate.getUTCMinutes();
			this.second = tempDate.getUTCSeconds();
			this.millisecond = tempDate.getUTCMilliseconds();
		}
	}
	toString(encoding = "iso") {
		if (encoding === "iso") {
			const outputArray = [];
			outputArray.push(padNumber(this.year, 4));
			outputArray.push(padNumber(this.month, 2));
			outputArray.push(padNumber(this.day, 2));
			outputArray.push(padNumber(this.hour, 2));
			outputArray.push(padNumber(this.minute, 2));
			outputArray.push(padNumber(this.second, 2));
			if (this.millisecond !== 0) {
				outputArray.push(".");
				outputArray.push(padNumber(this.millisecond, 3));
			}
			outputArray.push("Z");
			return outputArray.join("");
		}
		return super.toString(encoding);
	}
	toJSON() {
		return {
			...super.toJSON(),
			millisecond: this.millisecond
		};
	}
};
_a$5 = GeneralizedTime;
typeStore.GeneralizedTime = _a$5;
GeneralizedTime.NAME = "GeneralizedTime";
var _a$4;
var DATE = class extends Utf8String {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 31;
	}
};
_a$4 = DATE;
typeStore.DATE = _a$4;
DATE.NAME = "DATE";
var _a$3;
var TimeOfDay = class extends Utf8String {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 32;
	}
};
_a$3 = TimeOfDay;
typeStore.TimeOfDay = _a$3;
TimeOfDay.NAME = "TimeOfDay";
var _a$2;
var DateTime = class extends Utf8String {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 33;
	}
};
_a$2 = DateTime;
typeStore.DateTime = _a$2;
DateTime.NAME = "DateTime";
var _a$1;
var Duration = class extends Utf8String {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 34;
	}
};
_a$1 = Duration;
typeStore.Duration = _a$1;
Duration.NAME = "Duration";
var _a$10;
var TIME = class extends Utf8String {
	constructor(parameters = {}) {
		super(parameters);
		this.idBlock.tagClass = 1;
		this.idBlock.tagNumber = 14;
	}
};
_a$10 = TIME;
typeStore.TIME = _a$10;
TIME.NAME = "TIME";
var Any = class {
	constructor({ name = EMPTY_STRING, optional = false } = {}) {
		this.name = name;
		this.optional = optional;
	}
};
var Choice = class extends Any {
	constructor({ value = [], ...parameters } = {}) {
		super(parameters);
		this.value = value;
	}
};
var Repeated = class extends Any {
	constructor({ value = new Any(), local = false, ...parameters } = {}) {
		super(parameters);
		this.value = value;
		this.local = local;
	}
};
var RawData = class {
	get data() {
		return this.dataView.slice().buffer;
	}
	set data(value) {
		this.dataView = BufferSourceConverter.toUint8Array(value);
	}
	constructor({ data = EMPTY_VIEW } = {}) {
		this.dataView = BufferSourceConverter.toUint8Array(data);
	}
	fromBER(inputBuffer, inputOffset, inputLength) {
		const endLength = inputOffset + inputLength;
		this.dataView = BufferSourceConverter.toUint8Array(inputBuffer).subarray(inputOffset, endLength);
		return endLength;
	}
	toBER(_sizeOnly) {
		return this.dataView.slice().buffer;
	}
};
function compareSchema(root, inputData, inputSchema) {
	if (inputSchema instanceof Choice) {
		for (const element of inputSchema.value) if (compareSchema(root, inputData, element).verified) return {
			verified: true,
			result: root
		};
		{
			const _result = {
				verified: false,
				result: { error: "Wrong values for Choice type" }
			};
			if (inputSchema.hasOwnProperty(NAME$1)) _result.name = inputSchema.name;
			return _result;
		}
	}
	if (inputSchema instanceof Any) {
		if (inputSchema.hasOwnProperty(NAME$1)) root[inputSchema.name] = inputData;
		return {
			verified: true,
			result: root
		};
	}
	if (root instanceof Object === false) return {
		verified: false,
		result: { error: "Wrong root object" }
	};
	if (inputData instanceof Object === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 data" }
	};
	if (inputSchema instanceof Object === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (ID_BLOCK in inputSchema === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (FROM_BER in inputSchema.idBlock === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (TO_BER in inputSchema.idBlock === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	const encodedId = inputSchema.idBlock.toBER(false);
	if (encodedId.byteLength === 0) return {
		verified: false,
		result: { error: "Error encoding idBlock for ASN.1 schema" }
	};
	if (inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength) === -1) return {
		verified: false,
		result: { error: "Error decoding idBlock for ASN.1 schema" }
	};
	if (inputSchema.idBlock.hasOwnProperty(TAG_CLASS) === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass) return {
		verified: false,
		result: root
	};
	if (inputSchema.idBlock.hasOwnProperty(TAG_NUMBER) === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber) return {
		verified: false,
		result: root
	};
	if (inputSchema.idBlock.hasOwnProperty(IS_CONSTRUCTED) === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed) return {
		verified: false,
		result: root
	};
	if (!(IS_HEX_ONLY in inputSchema.idBlock)) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema" }
	};
	if (inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly) return {
		verified: false,
		result: root
	};
	if (inputSchema.idBlock.isHexOnly) {
		if (VALUE_HEX_VIEW in inputSchema.idBlock === false) return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
		const schemaView = inputSchema.idBlock.valueHexView;
		const asn1View = inputData.idBlock.valueHexView;
		if (schemaView.length !== asn1View.length) return {
			verified: false,
			result: root
		};
		for (let i = 0; i < schemaView.length; i++) if (schemaView[i] !== asn1View[1]) return {
			verified: false,
			result: root
		};
	}
	if (inputSchema.name) {
		inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
		if (inputSchema.name) root[inputSchema.name] = inputData;
	}
	if (inputSchema instanceof typeStore.Constructed) {
		let admission = 0;
		let result = {
			verified: false,
			result: { error: "Unknown error" }
		};
		let maxLength = inputSchema.valueBlock.value.length;
		if (maxLength > 0) {
			if (inputSchema.valueBlock.value[0] instanceof Repeated) maxLength = inputData.valueBlock.value.length;
		}
		if (maxLength === 0) return {
			verified: true,
			result: root
		};
		if (inputData.valueBlock.value.length === 0 && inputSchema.valueBlock.value.length !== 0) {
			let _optional = true;
			for (let i = 0; i < inputSchema.valueBlock.value.length; i++) _optional = _optional && (inputSchema.valueBlock.value[i].optional || false);
			if (_optional) return {
				verified: true,
				result: root
			};
			if (inputSchema.name) {
				inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
				if (inputSchema.name) delete root[inputSchema.name];
			}
			root.error = "Inconsistent object length";
			return {
				verified: false,
				result: root
			};
		}
		for (let i = 0; i < maxLength; i++) if (i - admission >= inputData.valueBlock.value.length) {
			if (inputSchema.valueBlock.value[i].optional === false) {
				const _result = {
					verified: false,
					result: root
				};
				root.error = "Inconsistent length between ASN.1 data and schema";
				if (inputSchema.name) {
					inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
					if (inputSchema.name) {
						delete root[inputSchema.name];
						_result.name = inputSchema.name;
					}
				}
				return _result;
			}
		} else if (inputSchema.valueBlock.value[0] instanceof Repeated) {
			result = compareSchema(root, inputData.valueBlock.value[i], inputSchema.valueBlock.value[0].value);
			if (result.verified === false) if (inputSchema.valueBlock.value[0].optional) admission++;
			else {
				if (inputSchema.name) {
					inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
					if (inputSchema.name) delete root[inputSchema.name];
				}
				return result;
			}
			if (NAME$1 in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].name.length > 0) {
				let arrayRoot = {};
				if (LOCAL in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].local) arrayRoot = inputData;
				else arrayRoot = root;
				if (typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined") arrayRoot[inputSchema.valueBlock.value[0].name] = [];
				arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[i]);
			}
		} else {
			result = compareSchema(root, inputData.valueBlock.value[i - admission], inputSchema.valueBlock.value[i]);
			if (result.verified === false) if (inputSchema.valueBlock.value[i].optional) admission++;
			else {
				if (inputSchema.name) {
					inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
					if (inputSchema.name) delete root[inputSchema.name];
				}
				return result;
			}
		}
		if (result.verified === false) {
			const _result = {
				verified: false,
				result: root
			};
			if (inputSchema.name) {
				inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
				if (inputSchema.name) {
					delete root[inputSchema.name];
					_result.name = inputSchema.name;
				}
			}
			return _result;
		}
		return {
			verified: true,
			result: root
		};
	}
	if (inputSchema.primitiveSchema && VALUE_HEX_VIEW in inputData.valueBlock) {
		const asn1 = localFromBER(inputData.valueBlock.valueHexView);
		if (asn1.offset === -1) {
			const _result = {
				verified: false,
				result: asn1.result
			};
			if (inputSchema.name) {
				inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
				if (inputSchema.name) {
					delete root[inputSchema.name];
					_result.name = inputSchema.name;
				}
			}
			return _result;
		}
		return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
	}
	return {
		verified: true,
		result: root
	};
}
function verifySchema(inputBuffer, inputSchema) {
	if (inputSchema instanceof Object === false) return {
		verified: false,
		result: { error: "Wrong ASN.1 schema type" }
	};
	const asn1 = localFromBER(BufferSourceConverter.toUint8Array(inputBuffer));
	if (asn1.offset === -1) return {
		verified: false,
		result: asn1.result
	};
	return compareSchema(asn1.result, asn1.result, inputSchema);
}
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+utils@2.0.3/node_modules/@peculiar/utils/build/esm/bytes/buffer-source.js
var ARRAY_BUFFER_TAG = "[object ArrayBuffer]";
var SHARED_ARRAY_BUFFER_TAG = "[object SharedArrayBuffer]";
function tagOf(value) {
	return Object.prototype.toString.call(value);
}
function isArrayBufferViewLike(value) {
	if (ArrayBuffer.isView(value)) return true;
	if (!value || typeof value !== "object") return false;
	const view = value;
	return typeof view.byteOffset === "number" && typeof view.byteLength === "number" && isArrayBufferLike(view.buffer);
}
function isArrayBuffer(value) {
	return tagOf(value) === ARRAY_BUFFER_TAG;
}
function isSharedArrayBuffer(value) {
	return typeof SharedArrayBuffer !== "undefined" && tagOf(value) === SHARED_ARRAY_BUFFER_TAG;
}
function isArrayBufferLike(value) {
	return isArrayBuffer(value) || isSharedArrayBuffer(value);
}
function isArrayBufferView(value) {
	return isArrayBufferViewLike(value);
}
function isBufferSource(value) {
	return isArrayBufferLike(value) || isArrayBufferView(value);
}
function assertBufferSource(value) {
	if (!isBufferSource(value)) throw new TypeError("Expected ArrayBuffer, SharedArrayBuffer, or ArrayBufferView");
}
function toUint8Array(data) {
	assertBufferSource(data);
	if (isArrayBufferLike(data)) return new Uint8Array(data);
	return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
function toArrayBuffer(data) {
	assertBufferSource(data);
	if (isArrayBuffer(data)) return data;
	const buffer = new ArrayBuffer(data.byteLength);
	new Uint8Array(buffer).set(toUint8Array(data));
	return buffer;
}
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+utils@2.0.3/node_modules/@peculiar/utils/build/esm/bytes/equal.js
function equal(a, b, options = {}) {
	const left = toUint8Array(a);
	const right = toUint8Array(b);
	if (!options.constantTime && left.byteLength !== right.byteLength) return false;
	const length = Math.max(left.byteLength, right.byteLength);
	let diff = left.byteLength ^ right.byteLength;
	for (let i = 0; i < length; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
	return diff === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/enums.js
var AsnTypeTypes;
(function(AsnTypeTypes) {
	AsnTypeTypes[AsnTypeTypes["Sequence"] = 0] = "Sequence";
	AsnTypeTypes[AsnTypeTypes["Set"] = 1] = "Set";
	AsnTypeTypes[AsnTypeTypes["Choice"] = 2] = "Choice";
})(AsnTypeTypes || (AsnTypeTypes = {}));
var AsnPropTypes;
(function(AsnPropTypes) {
	AsnPropTypes[AsnPropTypes["Any"] = 1] = "Any";
	AsnPropTypes[AsnPropTypes["Boolean"] = 2] = "Boolean";
	AsnPropTypes[AsnPropTypes["OctetString"] = 3] = "OctetString";
	AsnPropTypes[AsnPropTypes["BitString"] = 4] = "BitString";
	AsnPropTypes[AsnPropTypes["Integer"] = 5] = "Integer";
	AsnPropTypes[AsnPropTypes["Enumerated"] = 6] = "Enumerated";
	AsnPropTypes[AsnPropTypes["ObjectIdentifier"] = 7] = "ObjectIdentifier";
	AsnPropTypes[AsnPropTypes["Utf8String"] = 8] = "Utf8String";
	AsnPropTypes[AsnPropTypes["BmpString"] = 9] = "BmpString";
	AsnPropTypes[AsnPropTypes["UniversalString"] = 10] = "UniversalString";
	AsnPropTypes[AsnPropTypes["NumericString"] = 11] = "NumericString";
	AsnPropTypes[AsnPropTypes["PrintableString"] = 12] = "PrintableString";
	AsnPropTypes[AsnPropTypes["TeletexString"] = 13] = "TeletexString";
	AsnPropTypes[AsnPropTypes["VideotexString"] = 14] = "VideotexString";
	AsnPropTypes[AsnPropTypes["IA5String"] = 15] = "IA5String";
	AsnPropTypes[AsnPropTypes["GraphicString"] = 16] = "GraphicString";
	AsnPropTypes[AsnPropTypes["VisibleString"] = 17] = "VisibleString";
	AsnPropTypes[AsnPropTypes["GeneralString"] = 18] = "GeneralString";
	AsnPropTypes[AsnPropTypes["CharacterString"] = 19] = "CharacterString";
	AsnPropTypes[AsnPropTypes["UTCTime"] = 20] = "UTCTime";
	AsnPropTypes[AsnPropTypes["GeneralizedTime"] = 21] = "GeneralizedTime";
	AsnPropTypes[AsnPropTypes["DATE"] = 22] = "DATE";
	AsnPropTypes[AsnPropTypes["TimeOfDay"] = 23] = "TimeOfDay";
	AsnPropTypes[AsnPropTypes["DateTime"] = 24] = "DateTime";
	AsnPropTypes[AsnPropTypes["Duration"] = 25] = "Duration";
	AsnPropTypes[AsnPropTypes["TIME"] = 26] = "TIME";
	AsnPropTypes[AsnPropTypes["Null"] = 27] = "Null";
})(AsnPropTypes || (AsnPropTypes = {}));
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/types/bit_string.js
var BitString = class {
	unusedBits = 0;
	value = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params, unusedBits = 0) {
		if (params) if (typeof params === "number") this.fromNumber(params);
		else if (isBufferSource(params)) {
			this.unusedBits = unusedBits;
			this.value = toArrayBuffer(params);
		} else throw TypeError("Unsupported type of 'params' argument for BitString");
	}
	fromASN(asn) {
		if (!(asn instanceof BitString$1)) throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
		this.unusedBits = asn.valueBlock.unusedBits;
		this.value = toArrayBuffer(asn.valueBlock.valueHex);
		return this;
	}
	toASN() {
		return new BitString$1({
			unusedBits: this.unusedBits,
			valueHex: this.value
		});
	}
	toSchema(name) {
		return new BitString$1({ name });
	}
	toNumber() {
		let res = "";
		const uintArray = new Uint8Array(this.value);
		for (const octet of uintArray) res += octet.toString(2).padStart(8, "0");
		res = res.split("").reverse().join("");
		if (this.unusedBits) res = res.slice(this.unusedBits).padStart(this.unusedBits, "0");
		return parseInt(res, 2);
	}
	fromNumber(value) {
		let bits = value.toString(2);
		const octetSize = bits.length + 7 >> 3;
		this.unusedBits = (octetSize << 3) - bits.length;
		const octets = new Uint8Array(octetSize);
		bits = bits.padStart(octetSize << 3, "0").split("").reverse().join("");
		let index = 0;
		while (index < octetSize) {
			octets[index] = parseInt(bits.slice(index << 3, (index << 3) + 8), 2);
			index++;
		}
		this.value = octets.buffer;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js
var OctetString = class {
	buffer;
	get byteLength() {
		return this.buffer.byteLength;
	}
	get byteOffset() {
		return 0;
	}
	constructor(param) {
		if (typeof param === "number") this.buffer = new ArrayBuffer(param);
		else if (isBufferSource(param)) this.buffer = toArrayBuffer(param);
		else if (Array.isArray(param)) this.buffer = new Uint8Array(param).buffer;
		else this.buffer = /* @__PURE__ */ new ArrayBuffer(0);
	}
	fromASN(asn) {
		if (!(asn instanceof OctetString$1)) throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
		this.buffer = toArrayBuffer(asn.valueBlock.valueHex);
		return this;
	}
	toASN() {
		return new OctetString$1({ valueHex: this.buffer });
	}
	toSchema(name) {
		return new OctetString$1({ name });
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/converters.js
var AsnAnyConverter = {
	fromASN: (value) => value instanceof Null ? null : toArrayBuffer(value.valueBeforeDecodeView),
	toASN: (value) => {
		if (value === null) return new Null();
		const schema = fromBER(value);
		if (schema.result.error) throw new Error(schema.result.error);
		return schema.result;
	}
};
var AsnIntegerConverter = {
	fromASN: (value) => value.valueBlock.valueHexView.byteLength >= 4 ? value.valueBlock.toString() : value.valueBlock.valueDec,
	toASN: (value) => new Integer({ value: +value })
};
var AsnEnumeratedConverter = {
	fromASN: (value) => value.valueBlock.valueDec,
	toASN: (value) => new Enumerated({ value })
};
var AsnIntegerArrayBufferConverter = {
	fromASN: (value) => toArrayBuffer(value.valueBlock.valueHexView),
	toASN: (value) => new Integer({ valueHex: value })
};
var AsnBitStringConverter = {
	fromASN: (value) => toArrayBuffer(value.valueBlock.valueHexView),
	toASN: (value) => new BitString$1({ valueHex: value })
};
var AsnObjectIdentifierConverter = {
	fromASN: (value) => value.valueBlock.toString(),
	toASN: (value) => new ObjectIdentifier({ value })
};
var AsnBooleanConverter = {
	fromASN: (value) => value.valueBlock.value,
	toASN: (value) => new Boolean$1({ value })
};
var AsnOctetStringConverter = {
	fromASN: (value) => toArrayBuffer(value.valueBlock.valueHexView),
	toASN: (value) => new OctetString$1({ valueHex: value })
};
var AsnConstructedOctetStringConverter = {
	fromASN: (value) => new OctetString(value.getValue()),
	toASN: (value) => value.toASN()
};
function createStringConverter(Asn1Type) {
	return {
		fromASN: (value) => value.valueBlock.value,
		toASN: (value) => new Asn1Type({ value })
	};
}
var AsnUtf8StringConverter = createStringConverter(Utf8String);
var AsnBmpStringConverter = createStringConverter(BmpString);
var AsnUniversalStringConverter = createStringConverter(UniversalString);
var AsnNumericStringConverter = createStringConverter(NumericString);
var AsnPrintableStringConverter = createStringConverter(PrintableString);
var AsnTeletexStringConverter = createStringConverter(TeletexString);
var AsnVideotexStringConverter = createStringConverter(VideotexString);
var AsnIA5StringConverter = createStringConverter(IA5String);
var AsnGraphicStringConverter = createStringConverter(GraphicString);
var AsnVisibleStringConverter = createStringConverter(VisibleString);
var AsnGeneralStringConverter = createStringConverter(GeneralString);
var AsnCharacterStringConverter = createStringConverter(CharacterString);
var AsnUTCTimeConverter = {
	fromASN: (value) => value.toDate(),
	toASN: (value) => new UTCTime({ valueDate: value })
};
var AsnGeneralizedTimeConverter = {
	fromASN: (value) => value.toDate(),
	toASN: (value) => new GeneralizedTime({ valueDate: value })
};
var AsnNullConverter = {
	fromASN: () => null,
	toASN: () => {
		return new Null();
	}
};
function defaultConverter(type) {
	switch (type) {
		case AsnPropTypes.Any: return AsnAnyConverter;
		case AsnPropTypes.BitString: return AsnBitStringConverter;
		case AsnPropTypes.BmpString: return AsnBmpStringConverter;
		case AsnPropTypes.Boolean: return AsnBooleanConverter;
		case AsnPropTypes.CharacterString: return AsnCharacterStringConverter;
		case AsnPropTypes.Enumerated: return AsnEnumeratedConverter;
		case AsnPropTypes.GeneralString: return AsnGeneralStringConverter;
		case AsnPropTypes.GeneralizedTime: return AsnGeneralizedTimeConverter;
		case AsnPropTypes.GraphicString: return AsnGraphicStringConverter;
		case AsnPropTypes.IA5String: return AsnIA5StringConverter;
		case AsnPropTypes.Integer: return AsnIntegerConverter;
		case AsnPropTypes.Null: return AsnNullConverter;
		case AsnPropTypes.NumericString: return AsnNumericStringConverter;
		case AsnPropTypes.ObjectIdentifier: return AsnObjectIdentifierConverter;
		case AsnPropTypes.OctetString: return AsnOctetStringConverter;
		case AsnPropTypes.PrintableString: return AsnPrintableStringConverter;
		case AsnPropTypes.TeletexString: return AsnTeletexStringConverter;
		case AsnPropTypes.UTCTime: return AsnUTCTimeConverter;
		case AsnPropTypes.UniversalString: return AsnUniversalStringConverter;
		case AsnPropTypes.Utf8String: return AsnUtf8StringConverter;
		case AsnPropTypes.VideotexString: return AsnVideotexStringConverter;
		case AsnPropTypes.VisibleString: return AsnVisibleStringConverter;
		default: return null;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/helper.js
function isConvertible(target) {
	if (typeof target === "function" && target.prototype) if (target.prototype.toASN && target.prototype.fromASN) return true;
	else return isConvertible(target.prototype);
	else return !!(target && typeof target === "object" && "toASN" in target && "fromASN" in target);
}
function isTypeOfArray(target) {
	if (target) {
		const proto = Object.getPrototypeOf(target);
		if (proto?.prototype?.constructor === Array) return true;
		return isTypeOfArray(proto);
	}
	return false;
}
function isArrayEqual(bytes1, bytes2) {
	if (!(bytes1 && bytes2)) return false;
	if (bytes1.byteLength !== bytes2.byteLength) return false;
	const b1 = new Uint8Array(bytes1);
	const b2 = new Uint8Array(bytes2);
	for (let i = 0; i < bytes1.byteLength; i++) if (b1[i] !== b2[i]) return false;
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/schema.js
var AsnSchemaStorage = class {
	items = /* @__PURE__ */ new WeakMap();
	has(target) {
		return this.items.has(target);
	}
	get(target, checkSchema = false) {
		const schema = this.items.get(target);
		if (!schema) throw new Error(`Cannot get schema for '${target.prototype.constructor.name}' target`);
		if (checkSchema && !schema.schema) throw new Error(`Schema '${target.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);
		return schema;
	}
	cache(target) {
		const schema = this.get(target);
		if (!schema.schema) schema.schema = this.create(target, true);
	}
	createDefault(target) {
		const schema = {
			type: AsnTypeTypes.Sequence,
			items: {}
		};
		const parentSchema = this.findParentSchema(target);
		if (parentSchema) {
			Object.assign(schema, parentSchema);
			schema.items = Object.assign({}, schema.items, parentSchema.items);
		}
		return schema;
	}
	create(target, useNames) {
		const schema = this.items.get(target) || this.createDefault(target);
		const asn1Value = [];
		for (const key in schema.items) {
			const item = schema.items[key];
			const name = useNames ? key : "";
			let asn1Item;
			if (typeof item.type === "number") {
				const Asn1TypeName = AsnPropTypes[item.type];
				const Asn1Type = index_es_exports[Asn1TypeName];
				if (!Asn1Type) throw new Error(`Cannot get ASN1 class by name '${Asn1TypeName}'`);
				asn1Item = new Asn1Type({ name });
			} else if (isConvertible(item.type)) asn1Item = new item.type().toSchema(name);
			else if (item.optional) if (this.get(item.type).type === AsnTypeTypes.Choice) asn1Item = new Any({ name });
			else {
				asn1Item = this.create(item.type, false);
				asn1Item.name = name;
			}
			else asn1Item = new Any({ name });
			const optional = !!item.optional || item.defaultValue !== void 0;
			if (item.repeated) {
				asn1Item.name = "";
				asn1Item = new (item.repeated === "set" ? Set$1 : Sequence)({
					name: "",
					value: [new Repeated({
						name,
						value: asn1Item
					})]
				});
			}
			if (item.context !== null && item.context !== void 0) if (item.implicit) if (typeof item.type === "number" || isConvertible(item.type)) {
				const Container = item.repeated ? Constructed : Primitive;
				asn1Value.push(new Container({
					name,
					optional,
					idBlock: {
						tagClass: 3,
						tagNumber: item.context
					}
				}));
			} else {
				this.cache(item.type);
				const isRepeated = !!item.repeated;
				let value = !isRepeated ? this.get(item.type, true).schema : asn1Item;
				value = "valueBlock" in value ? value.valueBlock.value : value.value;
				asn1Value.push(new Constructed({
					name: !isRepeated ? name : "",
					optional,
					idBlock: {
						tagClass: 3,
						tagNumber: item.context
					},
					value
				}));
			}
			else asn1Value.push(new Constructed({
				optional,
				idBlock: {
					tagClass: 3,
					tagNumber: item.context
				},
				value: [asn1Item]
			}));
			else {
				asn1Item.optional = optional;
				asn1Value.push(asn1Item);
			}
		}
		switch (schema.type) {
			case AsnTypeTypes.Sequence: return new Sequence({
				value: asn1Value,
				name: ""
			});
			case AsnTypeTypes.Set: return new Set$1({
				value: asn1Value,
				name: ""
			});
			case AsnTypeTypes.Choice: return new Choice({
				value: asn1Value,
				name: ""
			});
			default: throw new Error("Unsupported ASN1 type in use");
		}
	}
	set(target, schema) {
		this.items.set(target, schema);
		return this;
	}
	findParentSchema(target) {
		const parent = Object.getPrototypeOf(target);
		if (parent) return this.items.get(parent) || this.findParentSchema(parent);
		return null;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/storage.js
var schemaStorage = new AsnSchemaStorage();
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js
var AsnType = (options) => (target) => {
	let schema;
	if (!schemaStorage.has(target)) {
		schema = schemaStorage.createDefault(target);
		schemaStorage.set(target, schema);
	} else schema = schemaStorage.get(target);
	Object.assign(schema, options);
};
var AsnProp = (options) => (target, propertyKey) => {
	let schema;
	if (!schemaStorage.has(target.constructor)) {
		schema = schemaStorage.createDefault(target.constructor);
		schemaStorage.set(target.constructor, schema);
	} else schema = schemaStorage.get(target.constructor);
	const copyOptions = Object.assign({}, options);
	if (typeof copyOptions.type === "number" && !copyOptions.converter) {
		const defaultConverter$1 = defaultConverter(options.type);
		if (!defaultConverter$1) throw new Error(`Cannot get default converter for property '${propertyKey}' of ${target.constructor.name}`);
		copyOptions.converter = defaultConverter$1;
	}
	copyOptions.raw = options.raw;
	schema.items[propertyKey] = copyOptions;
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/errors/schema_validation.js
var AsnSchemaValidationError = class extends Error {
	schemas = [];
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/parser.js
var AsnParser = class {
	static parse(data, target) {
		const asn1Parsed = fromBER(toArrayBuffer(data));
		if (asn1Parsed.result.error) throw new Error(asn1Parsed.result.error);
		return this.fromASN(asn1Parsed.result, target);
	}
	static fromASN(asn1Schema, target) {
		try {
			if (isConvertible(target)) return new target().fromASN(asn1Schema);
			const schema = schemaStorage.get(target);
			schemaStorage.cache(target);
			let targetSchema = schema.schema;
			const choiceResult = this.handleChoiceTypes(asn1Schema, schema, target, targetSchema);
			if (choiceResult?.result) return choiceResult.result;
			if (choiceResult?.targetSchema) targetSchema = choiceResult.targetSchema;
			const sequenceResult = this.handleSequenceTypes(asn1Schema, schema, target, targetSchema);
			const res = new target();
			if (isTypeOfArray(target)) return this.handleArrayTypes(asn1Schema, schema, target);
			this.processSchemaItems(schema, sequenceResult, res);
			return res;
		} catch (error) {
			if (error instanceof AsnSchemaValidationError) error.schemas.push(target.name);
			throw error;
		}
	}
	static handleChoiceTypes(asn1Schema, schema, target, targetSchema) {
		if (asn1Schema.constructor === Constructed && schema.type === AsnTypeTypes.Choice && asn1Schema.idBlock.tagClass === 3) for (const key in schema.items) {
			const schemaItem = schema.items[key];
			if (schemaItem.context === asn1Schema.idBlock.tagNumber && schemaItem.implicit) {
				if (typeof schemaItem.type === "function" && schemaStorage.has(schemaItem.type)) {
					const fieldSchema = schemaStorage.get(schemaItem.type);
					if (fieldSchema && fieldSchema.type === AsnTypeTypes.Sequence) {
						const newSeq = new Sequence();
						if ("value" in asn1Schema.valueBlock && Array.isArray(asn1Schema.valueBlock.value) && "value" in newSeq.valueBlock) {
							newSeq.valueBlock.value = asn1Schema.valueBlock.value;
							const fieldValue = this.fromASN(newSeq, schemaItem.type);
							const res = new target();
							res[key] = fieldValue;
							return { result: res };
						}
					}
				}
			}
		}
		else if (asn1Schema.constructor === Constructed && schema.type !== AsnTypeTypes.Choice) {
			const newTargetSchema = new Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: asn1Schema.idBlock.tagNumber
				},
				value: schema.schema.valueBlock.value
			});
			for (const key in schema.items) delete asn1Schema[key];
			return { targetSchema: newTargetSchema };
		}
		return null;
	}
	static handleSequenceTypes(asn1Schema, schema, target, targetSchema) {
		if (schema.type === AsnTypeTypes.Sequence) {
			const asn1ComparedSchema = compareSchema({}, asn1Schema, targetSchema);
			if (!asn1ComparedSchema.verified) throw new AsnSchemaValidationError(`Data does not match to ${target.name} ASN1 schema.${asn1ComparedSchema.result.error ? ` ${asn1ComparedSchema.result.error}` : ""}`);
			return asn1ComparedSchema;
		} else {
			const asn1ComparedSchema = compareSchema({}, asn1Schema, targetSchema);
			if (!asn1ComparedSchema.verified) throw new AsnSchemaValidationError(`Data does not match to ${target.name} ASN1 schema.${asn1ComparedSchema.result.error ? ` ${asn1ComparedSchema.result.error}` : ""}`);
			return asn1ComparedSchema;
		}
	}
	static processRepeatedField(asn1Elements, asn1Index, schemaItem) {
		let elementsToProcess = asn1Elements.slice(asn1Index);
		if (elementsToProcess.length === 1 && elementsToProcess[0].constructor.name === "Sequence") {
			const seq = elementsToProcess[0];
			if (seq.valueBlock && seq.valueBlock.value && Array.isArray(seq.valueBlock.value)) elementsToProcess = seq.valueBlock.value;
		}
		if (typeof schemaItem.type === "number") {
			const converter = defaultConverter(schemaItem.type);
			if (!converter) throw new Error(`No converter for ASN.1 type ${schemaItem.type}`);
			return elementsToProcess.filter((el) => el && el.valueBlock).map((el) => {
				try {
					return converter.fromASN(el);
				} catch {
					return;
				}
			}).filter((v) => v !== void 0);
		} else return elementsToProcess.filter((el) => el && el.valueBlock).map((el) => {
			try {
				return this.fromASN(el, schemaItem.type);
			} catch {
				return;
			}
		}).filter((v) => v !== void 0);
	}
	static processPrimitiveField(asn1Element, schemaItem) {
		const converter = defaultConverter(schemaItem.type);
		if (!converter) throw new Error(`No converter for ASN.1 type ${schemaItem.type}`);
		return converter.fromASN(asn1Element);
	}
	static isOptionalChoiceField(schemaItem) {
		return schemaItem.optional && typeof schemaItem.type === "function" && schemaStorage.has(schemaItem.type) && schemaStorage.get(schemaItem.type).type === AsnTypeTypes.Choice;
	}
	static processOptionalChoiceField(asn1Element, schemaItem) {
		try {
			return {
				processed: true,
				value: this.fromASN(asn1Element, schemaItem.type)
			};
		} catch (err) {
			if (err instanceof AsnSchemaValidationError && /Wrong values for Choice type/.test(err.message)) return { processed: false };
			throw err;
		}
	}
	static handleArrayTypes(asn1Schema, schema, target) {
		if (!("value" in asn1Schema.valueBlock && Array.isArray(asn1Schema.valueBlock.value))) throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
		const itemType = schema.itemType;
		if (typeof itemType === "number") {
			const converter = defaultConverter(itemType);
			if (!converter) throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
			return target.from(asn1Schema.valueBlock.value, (element) => converter.fromASN(element));
		} else return target.from(asn1Schema.valueBlock.value, (element) => this.fromASN(element, itemType));
	}
	static processSchemaItems(schema, asn1ComparedSchema, res) {
		for (const key in schema.items) {
			const asn1SchemaValue = asn1ComparedSchema.result[key];
			if (!asn1SchemaValue) continue;
			const schemaItem = schema.items[key];
			const schemaItemType = schemaItem.type;
			let parsedValue;
			if (typeof schemaItemType === "number" || isConvertible(schemaItemType)) parsedValue = this.processPrimitiveSchemaItem(asn1SchemaValue, schemaItem, schemaItemType);
			else parsedValue = this.processComplexSchemaItem(asn1SchemaValue, schemaItem, schemaItemType);
			if (parsedValue && typeof parsedValue === "object" && "value" in parsedValue && "raw" in parsedValue) {
				res[key] = parsedValue.value;
				res[`${key}Raw`] = parsedValue.raw;
			} else res[key] = parsedValue;
		}
	}
	static processPrimitiveSchemaItem(asn1SchemaValue, schemaItem, schemaItemType) {
		const converter = schemaItem.converter ?? (isConvertible(schemaItemType) ? new schemaItemType() : null);
		if (!converter) throw new Error("Converter is empty");
		if (schemaItem.repeated) return this.processRepeatedPrimitiveItem(asn1SchemaValue, schemaItem, converter);
		else return this.processSinglePrimitiveItem(asn1SchemaValue, schemaItem, schemaItemType, converter);
	}
	static processRepeatedPrimitiveItem(asn1SchemaValue, schemaItem, converter) {
		if (schemaItem.implicit) {
			const newItem = new (schemaItem.repeated === "sequence" ? Sequence : Set$1)();
			newItem.valueBlock = asn1SchemaValue.valueBlock;
			const newItemAsn = fromBER(newItem.toBER(false));
			if (newItemAsn.offset === -1) throw new Error(`Cannot parse the child item. ${newItemAsn.result.error}`);
			if (!("value" in newItemAsn.result.valueBlock && Array.isArray(newItemAsn.result.valueBlock.value))) throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
			const value = newItemAsn.result.valueBlock.value;
			return Array.from(value, (element) => converter.fromASN(element));
		} else return Array.from(asn1SchemaValue, (element) => converter.fromASN(element));
	}
	static processSinglePrimitiveItem(asn1SchemaValue, schemaItem, schemaItemType, converter) {
		let value = asn1SchemaValue;
		if (schemaItem.implicit) {
			let newItem;
			if (isConvertible(schemaItemType)) newItem = new schemaItemType().toSchema("");
			else {
				const Asn1TypeName = AsnPropTypes[schemaItemType];
				const Asn1Type = index_es_exports[Asn1TypeName];
				if (!Asn1Type) throw new Error(`Cannot get '${Asn1TypeName}' class from asn1js module`);
				newItem = new Asn1Type();
			}
			newItem.valueBlock = value.valueBlock;
			value = fromBER(newItem.toBER(false)).result;
		}
		return converter.fromASN(value);
	}
	static processComplexSchemaItem(asn1SchemaValue, schemaItem, schemaItemType) {
		if (schemaItem.repeated) {
			if (!Array.isArray(asn1SchemaValue)) throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");
			return Array.from(asn1SchemaValue, (element) => this.fromASN(element, schemaItemType));
		} else {
			const valueToProcess = this.handleImplicitTagging(asn1SchemaValue, schemaItem, schemaItemType);
			if (this.isOptionalChoiceField(schemaItem)) try {
				return this.fromASN(valueToProcess, schemaItemType);
			} catch (err) {
				if (err instanceof AsnSchemaValidationError && /Wrong values for Choice type/.test(err.message)) return;
				throw err;
			}
			else {
				const parsedValue = this.fromASN(valueToProcess, schemaItemType);
				if (schemaItem.raw) return {
					value: parsedValue,
					raw: asn1SchemaValue.valueBeforeDecodeView
				};
				return parsedValue;
			}
		}
	}
	static handleImplicitTagging(asn1SchemaValue, schemaItem, schemaItemType) {
		if (schemaItem.implicit && typeof schemaItem.context === "number") {
			const schema = schemaStorage.get(schemaItemType);
			if (schema.type === AsnTypeTypes.Sequence) {
				const newSeq = new Sequence();
				if ("value" in asn1SchemaValue.valueBlock && Array.isArray(asn1SchemaValue.valueBlock.value) && "value" in newSeq.valueBlock) {
					newSeq.valueBlock.value = asn1SchemaValue.valueBlock.value;
					return newSeq;
				}
			} else if (schema.type === AsnTypeTypes.Set) {
				const newSet = new Set$1();
				if ("value" in asn1SchemaValue.valueBlock && Array.isArray(asn1SchemaValue.valueBlock.value) && "value" in newSet.valueBlock) {
					newSet.valueBlock.value = asn1SchemaValue.valueBlock.value;
					return newSet;
				}
			}
		}
		return asn1SchemaValue;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/serializer.js
var AsnSerializer = class AsnSerializer {
	static serialize(obj) {
		if (obj instanceof BaseBlock) return obj.toBER(false);
		return this.toASN(obj).toBER(false);
	}
	static toASN(obj) {
		if (obj && typeof obj === "object" && isConvertible(obj)) return obj.toASN();
		if (!(obj && typeof obj === "object")) throw new TypeError("Parameter 1 should be type of Object.");
		const target = obj.constructor;
		const schema = schemaStorage.get(target);
		schemaStorage.cache(target);
		let asn1Value = [];
		if (schema.itemType) {
			if (!Array.isArray(obj)) throw new TypeError("Parameter 1 should be type of Array.");
			if (typeof schema.itemType === "number") {
				const converter = defaultConverter(schema.itemType);
				if (!converter) throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
				asn1Value = obj.map((o) => converter.toASN(o));
			} else asn1Value = obj.map((o) => this.toAsnItem({ type: schema.itemType }, "[]", target, o));
		} else for (const key in schema.items) {
			const schemaItem = schema.items[key];
			const objProp = obj[key];
			if (objProp === void 0 || schemaItem.defaultValue === objProp || typeof schemaItem.defaultValue === "object" && typeof objProp === "object" && isArrayEqual(this.serialize(schemaItem.defaultValue), this.serialize(objProp))) continue;
			const asn1Item = AsnSerializer.toAsnItem(schemaItem, key, target, objProp);
			if (typeof schemaItem.context === "number") if (schemaItem.implicit) if (!schemaItem.repeated && (typeof schemaItem.type === "number" || isConvertible(schemaItem.type))) {
				const value = {};
				value.valueHex = asn1Item instanceof Null ? toArrayBuffer(asn1Item.valueBeforeDecodeView) : asn1Item.valueBlock.toBER();
				asn1Value.push(new Primitive({
					optional: schemaItem.optional,
					idBlock: {
						tagClass: 3,
						tagNumber: schemaItem.context
					},
					...value
				}));
			} else asn1Value.push(new Constructed({
				optional: schemaItem.optional,
				idBlock: {
					tagClass: 3,
					tagNumber: schemaItem.context
				},
				value: asn1Item.valueBlock.value
			}));
			else asn1Value.push(new Constructed({
				optional: schemaItem.optional,
				idBlock: {
					tagClass: 3,
					tagNumber: schemaItem.context
				},
				value: [asn1Item]
			}));
			else if (schemaItem.repeated) asn1Value = asn1Value.concat(asn1Item);
			else asn1Value.push(asn1Item);
		}
		let asnSchema;
		switch (schema.type) {
			case AsnTypeTypes.Sequence:
				asnSchema = new Sequence({ value: asn1Value });
				break;
			case AsnTypeTypes.Set:
				asnSchema = new Set$1({ value: asn1Value });
				break;
			case AsnTypeTypes.Choice:
				if (!asn1Value[0]) throw new Error(`Schema '${target.name}' has wrong data. Choice cannot be empty.`);
				asnSchema = asn1Value[0];
				break;
		}
		return asnSchema;
	}
	static toAsnItem(schemaItem, key, target, objProp) {
		let asn1Item;
		if (typeof schemaItem.type === "number") {
			const converter = schemaItem.converter;
			if (!converter) throw new Error(`Property '${key}' doesn't have converter for type ${AsnPropTypes[schemaItem.type]} in schema '${target.name}'`);
			if (schemaItem.repeated) {
				if (!Array.isArray(objProp)) throw new TypeError("Parameter 'objProp' should be type of Array.");
				const items = Array.from(objProp, (element) => converter.toASN(element));
				asn1Item = new (schemaItem.repeated === "sequence" ? Sequence : Set$1)({ value: items });
			} else asn1Item = converter.toASN(objProp);
		} else if (schemaItem.repeated) {
			if (!Array.isArray(objProp)) throw new TypeError("Parameter 'objProp' should be type of Array.");
			const items = Array.from(objProp, (element) => this.toASN(element));
			asn1Item = new (schemaItem.repeated === "sequence" ? Sequence : Set$1)({ value: items });
		} else asn1Item = this.toASN(objProp);
		return asn1Item;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/objects.js
var AsnArray = class extends Array {
	constructor(items = []) {
		if (typeof items === "number") super(items);
		else {
			super();
			for (const item of items) this.push(item);
		}
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-schema@2.7.0/node_modules/@peculiar/asn1-schema/build/es2015/convert.js
var AsnConvert = class AsnConvert {
	static serialize(obj) {
		return AsnSerializer.serialize(obj);
	}
	static parse(data, target) {
		return AsnParser.parse(data, target);
	}
	static toString(data) {
		const asn = fromBER(isBufferSource(data) ? toArrayBuffer(data) : AsnConvert.serialize(data));
		if (asn.offset === -1) throw new Error(`Cannot decode ASN.1 data. ${asn.result.error}`);
		return asn.result.toString();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+utils@2.0.3/node_modules/@peculiar/utils/build/esm/encoding/hex.js
function groupPairs(pairs, group) {
	if (!group) return pairs.join("");
	if (!Number.isInteger(group.size) || group.size < 1) throw new RangeError("Hex group size must be a positive integer");
	const chunks = [];
	for (let index = 0; index < pairs.length; index += group.size) chunks.push(pairs.slice(index, index + group.size).join(""));
	return chunks.join(group.separator);
}
function encode(data, options = {}) {
	const bytes = toUint8Array(data);
	const casing = options.case ?? "lower";
	const pairs = Array.from(bytes, (byte) => {
		const text = byte.toString(16).padStart(2, "0");
		return casing === "upper" ? text.toUpperCase() : text;
	});
	let body = "";
	if (options.line) {
		const bytesPerLine = options.line.bytesPerLine;
		if (!Number.isInteger(bytesPerLine) || bytesPerLine < 1) throw new RangeError("Hex bytesPerLine must be a positive integer");
		const separator = options.line.separator ?? "\n";
		const lines = [];
		for (let index = 0; index < pairs.length; index += bytesPerLine) lines.push(groupPairs(pairs.slice(index, index + bytesPerLine), options.group));
		body = lines.join(separator);
	} else body = groupPairs(pairs, options.group);
	return `${options.prefix ?? ""}${body}`;
}
Object.freeze({}), Object.freeze({ case: "upper" }), Object.freeze({ group: {
	size: 1,
	separator: ":"
} }), Object.freeze({
	case: "upper",
	group: {
		size: 1,
		separator: ":"
	}
}), Object.freeze({ group: {
	size: 4,
	separator: " "
} }), Object.freeze({ prefix: "0x" });
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/ip_converter.js
var IpConverter = class {
	static isIPv4(ip) {
		return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
	}
	static parseIPv4(ip) {
		const parts = ip.split(".");
		if (parts.length !== 4) throw new Error("Invalid IPv4 address");
		return parts.map((part) => {
			const num = parseInt(part, 10);
			if (isNaN(num) || num < 0 || num > 255) throw new Error("Invalid IPv4 address part");
			return num;
		});
	}
	static parseIPv6(ip) {
		const parts = this.expandIPv6(ip).split(":");
		if (parts.length !== 8) throw new Error("Invalid IPv6 address");
		return parts.reduce((bytes, part) => {
			const num = parseInt(part, 16);
			if (isNaN(num) || num < 0 || num > 65535) throw new Error("Invalid IPv6 address part");
			bytes.push(num >> 8 & 255);
			bytes.push(num & 255);
			return bytes;
		}, []);
	}
	static expandIPv6(ip) {
		if (!ip.includes("::")) return ip;
		const parts = ip.split("::");
		if (parts.length > 2) throw new Error("Invalid IPv6 address");
		const left = parts[0] ? parts[0].split(":") : [];
		const right = parts[1] ? parts[1].split(":") : [];
		const missing = 8 - (left.length + right.length);
		if (missing < 0) throw new Error("Invalid IPv6 address");
		return [
			...left,
			...Array(missing).fill("0"),
			...right
		].join(":");
	}
	static formatIPv6(bytes) {
		const parts = [];
		for (let i = 0; i < 16; i += 2) parts.push((bytes[i] << 8 | bytes[i + 1]).toString(16));
		return this.compressIPv6(parts.join(":"));
	}
	static compressIPv6(ip) {
		const parts = ip.split(":");
		let longestZeroStart = -1;
		let longestZeroLength = 0;
		let currentZeroStart = -1;
		let currentZeroLength = 0;
		for (let i = 0; i < parts.length; i++) if (parts[i] === "0") {
			if (currentZeroStart === -1) currentZeroStart = i;
			currentZeroLength++;
		} else {
			if (currentZeroLength > longestZeroLength) {
				longestZeroStart = currentZeroStart;
				longestZeroLength = currentZeroLength;
			}
			currentZeroStart = -1;
			currentZeroLength = 0;
		}
		if (currentZeroLength > longestZeroLength) {
			longestZeroStart = currentZeroStart;
			longestZeroLength = currentZeroLength;
		}
		if (longestZeroLength > 1) return `${parts.slice(0, longestZeroStart).join(":")}::${parts.slice(longestZeroStart + longestZeroLength).join(":")}`;
		return ip;
	}
	static parseCIDR(text) {
		const [addr, prefixStr] = text.split("/");
		const prefix = parseInt(prefixStr, 10);
		if (this.isIPv4(addr)) {
			if (prefix < 0 || prefix > 32) throw new Error("Invalid IPv4 prefix length");
			return [this.parseIPv4(addr), prefix];
		} else {
			if (prefix < 0 || prefix > 128) throw new Error("Invalid IPv6 prefix length");
			return [this.parseIPv6(addr), prefix];
		}
	}
	static decodeIP(value) {
		if (value.length === 64 && parseInt(value, 16) === 0) return "::/0";
		if (value.length !== 16) return value;
		const mask = parseInt(value.slice(8), 16).toString(2).split("").reduce((a, k) => a + +k, 0);
		let ip = value.slice(0, 8).replace(/(.{2})/g, (match) => `${parseInt(match, 16)}.`);
		ip = ip.slice(0, -1);
		return `${ip}/${mask}`;
	}
	static toString(buf) {
		const uint8 = new Uint8Array(buf);
		if (uint8.length === 4) return Array.from(uint8).join(".");
		if (uint8.length === 16) return this.formatIPv6(uint8);
		if (uint8.length === 8 || uint8.length === 32) {
			const half = uint8.length / 2;
			const addrBytes = uint8.slice(0, half);
			const maskBytes = uint8.slice(half);
			if (uint8.every((byte) => byte === 0)) return uint8.length === 8 ? "0.0.0.0/0" : "::/0";
			const prefixLen = maskBytes.reduce((a, b) => a + (b.toString(2).match(/1/g) || []).length, 0);
			if (uint8.length === 8) return `${Array.from(addrBytes).join(".")}/${prefixLen}`;
			else return `${this.formatIPv6(addrBytes)}/${prefixLen}`;
		}
		return this.decodeIP(encode(buf));
	}
	static fromString(text) {
		if (text.includes("/")) {
			const [addr, prefix] = this.parseCIDR(text);
			const maskBytes = new Uint8Array(addr.length);
			let bitsLeft = prefix;
			for (let i = 0; i < maskBytes.length; i++) if (bitsLeft >= 8) {
				maskBytes[i] = 255;
				bitsLeft -= 8;
			} else if (bitsLeft > 0) {
				maskBytes[i] = 255 << 8 - bitsLeft;
				bitsLeft = 0;
			}
			const out = new Uint8Array(addr.length * 2);
			out.set(addr, 0);
			out.set(maskBytes, addr.length);
			return out.buffer;
		}
		const bytes = this.isIPv4(text) ? this.parseIPv4(text) : this.parseIPv6(text);
		return new Uint8Array(bytes).buffer;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/name.js
var RelativeDistinguishedName_1, RDNSequence_1, Name_1;
var DirectoryString = class DirectoryString {
	teletexString;
	printableString;
	universalString;
	utf8String;
	bmpString;
	constructor(params = {}) {
		Object.assign(this, params);
	}
	toString() {
		return this.bmpString || this.printableString || this.teletexString || this.universalString || this.utf8String || "";
	}
};
__decorate([AsnProp({ type: AsnPropTypes.TeletexString })], DirectoryString.prototype, "teletexString", void 0);
__decorate([AsnProp({ type: AsnPropTypes.PrintableString })], DirectoryString.prototype, "printableString", void 0);
__decorate([AsnProp({ type: AsnPropTypes.UniversalString })], DirectoryString.prototype, "universalString", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Utf8String })], DirectoryString.prototype, "utf8String", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BmpString })], DirectoryString.prototype, "bmpString", void 0);
DirectoryString = __decorate([AsnType({ type: AsnTypeTypes.Choice })], DirectoryString);
var AttributeValue = class AttributeValue extends DirectoryString {
	ia5String;
	anyValue;
	constructor(params = {}) {
		super(params);
		Object.assign(this, params);
	}
	toString() {
		return this.ia5String || (this.anyValue ? encode(this.anyValue) : super.toString());
	}
};
__decorate([AsnProp({ type: AsnPropTypes.IA5String })], AttributeValue.prototype, "ia5String", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], AttributeValue.prototype, "anyValue", void 0);
AttributeValue = __decorate([AsnType({ type: AsnTypeTypes.Choice })], AttributeValue);
var AttributeTypeAndValue = class {
	type = "";
	value = new AttributeValue();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], AttributeTypeAndValue.prototype, "type", void 0);
__decorate([AsnProp({ type: AttributeValue })], AttributeTypeAndValue.prototype, "value", void 0);
var RelativeDistinguishedName = RelativeDistinguishedName_1 = class RelativeDistinguishedName extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, RelativeDistinguishedName_1.prototype);
	}
};
RelativeDistinguishedName = RelativeDistinguishedName_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: AttributeTypeAndValue
})], RelativeDistinguishedName);
var RDNSequence = RDNSequence_1 = class RDNSequence extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, RDNSequence_1.prototype);
	}
};
RDNSequence = RDNSequence_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: RelativeDistinguishedName
})], RDNSequence);
var Name$1 = Name_1 = class Name extends RDNSequence {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, Name_1.prototype);
	}
};
Name$1 = Name_1 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], Name$1);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js
var AsnIpConverter = {
	fromASN: (value) => IpConverter.toString(AsnOctetStringConverter.fromASN(value)),
	toASN: (value) => AsnOctetStringConverter.toASN(IpConverter.fromString(value))
};
var OtherName = class {
	typeId = "";
	value = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], OtherName.prototype, "typeId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 0
})], OtherName.prototype, "value", void 0);
var EDIPartyName = class {
	nameAssigner;
	partyName = new DirectoryString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: DirectoryString,
	optional: true,
	context: 0,
	implicit: true
})], EDIPartyName.prototype, "nameAssigner", void 0);
__decorate([AsnProp({
	type: DirectoryString,
	context: 1,
	implicit: true
})], EDIPartyName.prototype, "partyName", void 0);
var GeneralName$1 = class GeneralName {
	otherName;
	rfc822Name;
	dNSName;
	x400Address;
	directoryName;
	ediPartyName;
	uniformResourceIdentifier;
	iPAddress;
	registeredID;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: OtherName,
	context: 0,
	implicit: true
})], GeneralName$1.prototype, "otherName", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.IA5String,
	context: 1,
	implicit: true
})], GeneralName$1.prototype, "rfc822Name", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.IA5String,
	context: 2,
	implicit: true
})], GeneralName$1.prototype, "dNSName", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 3,
	implicit: true
})], GeneralName$1.prototype, "x400Address", void 0);
__decorate([AsnProp({
	type: Name$1,
	context: 4,
	implicit: false
})], GeneralName$1.prototype, "directoryName", void 0);
__decorate([AsnProp({
	type: EDIPartyName,
	context: 5
})], GeneralName$1.prototype, "ediPartyName", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.IA5String,
	context: 6,
	implicit: true
})], GeneralName$1.prototype, "uniformResourceIdentifier", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.OctetString,
	context: 7,
	implicit: true,
	converter: AsnIpConverter
})], GeneralName$1.prototype, "iPAddress", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.ObjectIdentifier,
	context: 8,
	implicit: true
})], GeneralName$1.prototype, "registeredID", void 0);
GeneralName$1 = __decorate([AsnType({ type: AsnTypeTypes.Choice })], GeneralName$1);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/object_identifiers.js
var id_pkix = "1.3.6.1.5.5.7";
var id_pe = `${id_pkix}.1`;
var id_qt = `${id_pkix}.2`;
var id_kp = `${id_pkix}.3`;
var id_ad = `${id_pkix}.48`;
`${id_qt}`;
`${id_qt}`;
var id_ad_ocsp = `${id_ad}.1`;
var id_ad_caIssuers = `${id_ad}.2`;
var id_ad_timeStamping = `${id_ad}.3`;
var id_ad_caRepository = `${id_ad}.5`;
var id_ce = "2.5.29";
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/authority_information_access.js
var AuthorityInfoAccessSyntax_1;
var id_pe_authorityInfoAccess = `${id_pe}.1`;
var AccessDescription = class {
	accessMethod = "";
	accessLocation = new GeneralName$1();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], AccessDescription.prototype, "accessMethod", void 0);
__decorate([AsnProp({ type: GeneralName$1 })], AccessDescription.prototype, "accessLocation", void 0);
var AuthorityInfoAccessSyntax = AuthorityInfoAccessSyntax_1 = class AuthorityInfoAccessSyntax extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, AuthorityInfoAccessSyntax_1.prototype);
	}
};
AuthorityInfoAccessSyntax = AuthorityInfoAccessSyntax_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: AccessDescription
})], AuthorityInfoAccessSyntax);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/authority_key_identifier.js
var id_ce_authorityKeyIdentifier = `${id_ce}.35`;
var KeyIdentifier = class extends OctetString {};
var AuthorityKeyIdentifier = class {
	keyIdentifier;
	authorityCertIssuer;
	authorityCertSerialNumber;
	constructor(params = {}) {
		if (params) Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: KeyIdentifier,
	context: 0,
	optional: true,
	implicit: true
})], AuthorityKeyIdentifier.prototype, "keyIdentifier", void 0);
__decorate([AsnProp({
	type: GeneralName$1,
	context: 1,
	optional: true,
	implicit: true,
	repeated: "sequence"
})], AuthorityKeyIdentifier.prototype, "authorityCertIssuer", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 2,
	optional: true,
	implicit: true,
	converter: AsnIntegerArrayBufferConverter
})], AuthorityKeyIdentifier.prototype, "authorityCertSerialNumber", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/basic_constraints.js
var id_ce_basicConstraints = `${id_ce}.19`;
var BasicConstraints = class {
	cA = false;
	pathLenConstraint;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	defaultValue: false
})], BasicConstraints.prototype, "cA", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	optional: true
})], BasicConstraints.prototype, "pathLenConstraint", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js
var GeneralNames_1;
var GeneralNames$1 = GeneralNames_1 = class GeneralNames extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, GeneralNames_1.prototype);
	}
};
GeneralNames$1 = GeneralNames_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: GeneralName$1
})], GeneralNames$1);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/certificate_issuer.js
var CertificateIssuer_1;
`${id_ce}`;
var CertificateIssuer = CertificateIssuer_1 = class CertificateIssuer extends GeneralNames$1 {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, CertificateIssuer_1.prototype);
	}
};
CertificateIssuer = CertificateIssuer_1 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], CertificateIssuer);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/certificate_policies.js
var CertificatePolicies_1;
var id_ce_certificatePolicies = `${id_ce}.32`;
`${id_ce_certificatePolicies}`;
var DisplayText = class DisplayText {
	ia5String;
	visibleString;
	bmpString;
	utf8String;
	constructor(params = {}) {
		Object.assign(this, params);
	}
	toString() {
		return this.ia5String || this.visibleString || this.bmpString || this.utf8String || "";
	}
};
__decorate([AsnProp({ type: AsnPropTypes.IA5String })], DisplayText.prototype, "ia5String", void 0);
__decorate([AsnProp({ type: AsnPropTypes.VisibleString })], DisplayText.prototype, "visibleString", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BmpString })], DisplayText.prototype, "bmpString", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Utf8String })], DisplayText.prototype, "utf8String", void 0);
DisplayText = __decorate([AsnType({ type: AsnTypeTypes.Choice })], DisplayText);
var NoticeReference = class {
	organization = new DisplayText();
	noticeNumbers = [];
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: DisplayText })], NoticeReference.prototype, "organization", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	repeated: "sequence"
})], NoticeReference.prototype, "noticeNumbers", void 0);
var UserNotice = class {
	noticeRef;
	explicitText;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: NoticeReference,
	optional: true
})], UserNotice.prototype, "noticeRef", void 0);
__decorate([AsnProp({
	type: DisplayText,
	optional: true
})], UserNotice.prototype, "explicitText", void 0);
var Qualifier = class Qualifier {
	cPSuri;
	userNotice;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.IA5String })], Qualifier.prototype, "cPSuri", void 0);
__decorate([AsnProp({ type: UserNotice })], Qualifier.prototype, "userNotice", void 0);
Qualifier = __decorate([AsnType({ type: AsnTypeTypes.Choice })], Qualifier);
var PolicyQualifierInfo = class {
	policyQualifierId = "";
	qualifier = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], PolicyQualifierInfo.prototype, "policyQualifierId", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], PolicyQualifierInfo.prototype, "qualifier", void 0);
var PolicyInformation = class {
	policyIdentifier = "";
	policyQualifiers;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], PolicyInformation.prototype, "policyIdentifier", void 0);
__decorate([AsnProp({
	type: PolicyQualifierInfo,
	repeated: "sequence",
	optional: true
})], PolicyInformation.prototype, "policyQualifiers", void 0);
var CertificatePolicies = CertificatePolicies_1 = class CertificatePolicies extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, CertificatePolicies_1.prototype);
	}
};
CertificatePolicies = CertificatePolicies_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: PolicyInformation
})], CertificatePolicies);
`${id_ce}`;
var CRLNumber = class CRLNumber {
	value;
	constructor(value = 0) {
		this.value = value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], CRLNumber.prototype, "value", void 0);
CRLNumber = __decorate([AsnType({ type: AsnTypeTypes.Choice })], CRLNumber);
`${id_ce}`;
var BaseCRLNumber = class BaseCRLNumber extends CRLNumber {};
BaseCRLNumber = __decorate([AsnType({ type: AsnTypeTypes.Choice })], BaseCRLNumber);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_distribution_points.js
var CRLDistributionPoints_1;
var id_ce_cRLDistributionPoints = `${id_ce}.31`;
var ReasonFlags;
(function(ReasonFlags) {
	ReasonFlags[ReasonFlags["unused"] = 1] = "unused";
	ReasonFlags[ReasonFlags["keyCompromise"] = 2] = "keyCompromise";
	ReasonFlags[ReasonFlags["cACompromise"] = 4] = "cACompromise";
	ReasonFlags[ReasonFlags["affiliationChanged"] = 8] = "affiliationChanged";
	ReasonFlags[ReasonFlags["superseded"] = 16] = "superseded";
	ReasonFlags[ReasonFlags["cessationOfOperation"] = 32] = "cessationOfOperation";
	ReasonFlags[ReasonFlags["certificateHold"] = 64] = "certificateHold";
	ReasonFlags[ReasonFlags["privilegeWithdrawn"] = 128] = "privilegeWithdrawn";
	ReasonFlags[ReasonFlags["aACompromise"] = 256] = "aACompromise";
})(ReasonFlags || (ReasonFlags = {}));
var Reason = class extends BitString {
	toJSON() {
		const res = [];
		const flags = this.toNumber();
		if (flags & ReasonFlags.aACompromise) res.push("aACompromise");
		if (flags & ReasonFlags.affiliationChanged) res.push("affiliationChanged");
		if (flags & ReasonFlags.cACompromise) res.push("cACompromise");
		if (flags & ReasonFlags.certificateHold) res.push("certificateHold");
		if (flags & ReasonFlags.cessationOfOperation) res.push("cessationOfOperation");
		if (flags & ReasonFlags.keyCompromise) res.push("keyCompromise");
		if (flags & ReasonFlags.privilegeWithdrawn) res.push("privilegeWithdrawn");
		if (flags & ReasonFlags.superseded) res.push("superseded");
		if (flags & ReasonFlags.unused) res.push("unused");
		return res;
	}
	toString() {
		return `[${this.toJSON().join(", ")}]`;
	}
};
var DistributionPointName = class DistributionPointName {
	fullName;
	nameRelativeToCRLIssuer;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralName$1,
	context: 0,
	repeated: "sequence",
	implicit: true
})], DistributionPointName.prototype, "fullName", void 0);
__decorate([AsnProp({
	type: RelativeDistinguishedName,
	context: 1,
	implicit: true
})], DistributionPointName.prototype, "nameRelativeToCRLIssuer", void 0);
DistributionPointName = __decorate([AsnType({ type: AsnTypeTypes.Choice })], DistributionPointName);
var DistributionPoint = class {
	distributionPoint;
	reasons;
	cRLIssuer;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: DistributionPointName,
	context: 0,
	optional: true
})], DistributionPoint.prototype, "distributionPoint", void 0);
__decorate([AsnProp({
	type: Reason,
	context: 1,
	optional: true,
	implicit: true
})], DistributionPoint.prototype, "reasons", void 0);
__decorate([AsnProp({
	type: GeneralName$1,
	context: 2,
	optional: true,
	repeated: "sequence",
	implicit: true
})], DistributionPoint.prototype, "cRLIssuer", void 0);
var CRLDistributionPoints = CRLDistributionPoints_1 = class CRLDistributionPoints extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, CRLDistributionPoints_1.prototype);
	}
};
CRLDistributionPoints = CRLDistributionPoints_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: DistributionPoint
})], CRLDistributionPoints);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_freshest.js
var FreshestCRL_1;
`${id_ce}`;
var FreshestCRL = FreshestCRL_1 = class FreshestCRL extends CRLDistributionPoints {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, FreshestCRL_1.prototype);
	}
};
FreshestCRL = FreshestCRL_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: DistributionPoint
})], FreshestCRL);
`${id_ce}`;
var IssuingDistributionPoint = class IssuingDistributionPoint {
	static ONLY = false;
	distributionPoint;
	onlyContainsUserCerts = IssuingDistributionPoint.ONLY;
	onlyContainsCACerts = IssuingDistributionPoint.ONLY;
	onlySomeReasons;
	indirectCRL = IssuingDistributionPoint.ONLY;
	onlyContainsAttributeCerts = IssuingDistributionPoint.ONLY;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: DistributionPointName,
	context: 0,
	optional: true
})], IssuingDistributionPoint.prototype, "distributionPoint", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	context: 1,
	defaultValue: IssuingDistributionPoint.ONLY,
	implicit: true
})], IssuingDistributionPoint.prototype, "onlyContainsUserCerts", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	context: 2,
	defaultValue: IssuingDistributionPoint.ONLY,
	implicit: true
})], IssuingDistributionPoint.prototype, "onlyContainsCACerts", void 0);
__decorate([AsnProp({
	type: Reason,
	context: 3,
	optional: true,
	implicit: true
})], IssuingDistributionPoint.prototype, "onlySomeReasons", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	context: 4,
	defaultValue: IssuingDistributionPoint.ONLY,
	implicit: true
})], IssuingDistributionPoint.prototype, "indirectCRL", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	context: 5,
	defaultValue: IssuingDistributionPoint.ONLY,
	implicit: true
})], IssuingDistributionPoint.prototype, "onlyContainsAttributeCerts", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_reason.js
var id_ce_cRLReasons = `${id_ce}.21`;
var CRLReasons;
(function(CRLReasons) {
	CRLReasons[CRLReasons["unspecified"] = 0] = "unspecified";
	CRLReasons[CRLReasons["keyCompromise"] = 1] = "keyCompromise";
	CRLReasons[CRLReasons["cACompromise"] = 2] = "cACompromise";
	CRLReasons[CRLReasons["affiliationChanged"] = 3] = "affiliationChanged";
	CRLReasons[CRLReasons["superseded"] = 4] = "superseded";
	CRLReasons[CRLReasons["cessationOfOperation"] = 5] = "cessationOfOperation";
	CRLReasons[CRLReasons["certificateHold"] = 6] = "certificateHold";
	CRLReasons[CRLReasons["removeFromCRL"] = 8] = "removeFromCRL";
	CRLReasons[CRLReasons["privilegeWithdrawn"] = 9] = "privilegeWithdrawn";
	CRLReasons[CRLReasons["aACompromise"] = 10] = "aACompromise";
})(CRLReasons || (CRLReasons = {}));
var CRLReason = class CRLReason {
	reason = CRLReasons.unspecified;
	constructor(reason = CRLReasons.unspecified) {
		this.reason = reason;
	}
	toJSON() {
		return CRLReasons[this.reason];
	}
	toString() {
		return this.toJSON();
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], CRLReason.prototype, "reason", void 0);
CRLReason = __decorate([AsnType({ type: AsnTypeTypes.Choice })], CRLReason);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/extended_key_usage.js
var ExtendedKeyUsage_1;
var id_ce_extKeyUsage = `${id_ce}.37`;
var ExtendedKeyUsage$1 = ExtendedKeyUsage_1 = class ExtendedKeyUsage extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, ExtendedKeyUsage_1.prototype);
	}
};
ExtendedKeyUsage$1 = ExtendedKeyUsage_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: AsnPropTypes.ObjectIdentifier
})], ExtendedKeyUsage$1);
`${id_ce_extKeyUsage}`;
var id_kp_serverAuth = `${id_kp}.1`;
var id_kp_clientAuth = `${id_kp}.2`;
var id_kp_codeSigning = `${id_kp}.3`;
var id_kp_emailProtection = `${id_kp}.4`;
var id_kp_timeStamping = `${id_kp}.8`;
var id_kp_OCSPSigning = `${id_kp}.9`;
`${id_ce}`;
var InhibitAnyPolicy = class InhibitAnyPolicy {
	value;
	constructor(value = /* @__PURE__ */ new ArrayBuffer(0)) {
		this.value = value;
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], InhibitAnyPolicy.prototype, "value", void 0);
InhibitAnyPolicy = __decorate([AsnType({ type: AsnTypeTypes.Choice })], InhibitAnyPolicy);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/invalidity_date.js
var id_ce_invalidityDate = `${id_ce}.24`;
var InvalidityDate = class InvalidityDate {
	value = /* @__PURE__ */ new Date();
	constructor(value) {
		if (value) this.value = value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.GeneralizedTime })], InvalidityDate.prototype, "value", void 0);
InvalidityDate = __decorate([AsnType({ type: AsnTypeTypes.Choice })], InvalidityDate);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/issuer_alternative_name.js
var IssueAlternativeName_1;
var id_ce_issuerAltName = `${id_ce}.18`;
var IssueAlternativeName = IssueAlternativeName_1 = class IssueAlternativeName extends GeneralNames$1 {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, IssueAlternativeName_1.prototype);
	}
};
IssueAlternativeName = IssueAlternativeName_1 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], IssueAlternativeName);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/key_usage.js
var id_ce_keyUsage = `${id_ce}.15`;
var KeyUsageFlags$1;
(function(KeyUsageFlags) {
	KeyUsageFlags[KeyUsageFlags["digitalSignature"] = 1] = "digitalSignature";
	KeyUsageFlags[KeyUsageFlags["nonRepudiation"] = 2] = "nonRepudiation";
	KeyUsageFlags[KeyUsageFlags["keyEncipherment"] = 4] = "keyEncipherment";
	KeyUsageFlags[KeyUsageFlags["dataEncipherment"] = 8] = "dataEncipherment";
	KeyUsageFlags[KeyUsageFlags["keyAgreement"] = 16] = "keyAgreement";
	KeyUsageFlags[KeyUsageFlags["keyCertSign"] = 32] = "keyCertSign";
	KeyUsageFlags[KeyUsageFlags["cRLSign"] = 64] = "cRLSign";
	KeyUsageFlags[KeyUsageFlags["encipherOnly"] = 128] = "encipherOnly";
	KeyUsageFlags[KeyUsageFlags["decipherOnly"] = 256] = "decipherOnly";
})(KeyUsageFlags$1 || (KeyUsageFlags$1 = {}));
var KeyUsage = class extends BitString {
	toJSON() {
		const flag = this.toNumber();
		const res = [];
		if (flag & KeyUsageFlags$1.cRLSign) res.push("crlSign");
		if (flag & KeyUsageFlags$1.dataEncipherment) res.push("dataEncipherment");
		if (flag & KeyUsageFlags$1.decipherOnly) res.push("decipherOnly");
		if (flag & KeyUsageFlags$1.digitalSignature) res.push("digitalSignature");
		if (flag & KeyUsageFlags$1.encipherOnly) res.push("encipherOnly");
		if (flag & KeyUsageFlags$1.keyAgreement) res.push("keyAgreement");
		if (flag & KeyUsageFlags$1.keyCertSign) res.push("keyCertSign");
		if (flag & KeyUsageFlags$1.keyEncipherment) res.push("keyEncipherment");
		if (flag & KeyUsageFlags$1.nonRepudiation) res.push("nonRepudiation");
		return res;
	}
	toString() {
		return `[${this.toJSON().join(", ")}]`;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/name_constraints.js
var GeneralSubtrees_1;
`${id_ce}`;
var GeneralSubtree = class {
	base = new GeneralName$1();
	minimum = 0;
	maximum;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: GeneralName$1 })], GeneralSubtree.prototype, "base", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 0,
	defaultValue: 0,
	implicit: true
})], GeneralSubtree.prototype, "minimum", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 1,
	optional: true,
	implicit: true
})], GeneralSubtree.prototype, "maximum", void 0);
var GeneralSubtrees = GeneralSubtrees_1 = class GeneralSubtrees extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, GeneralSubtrees_1.prototype);
	}
};
GeneralSubtrees = GeneralSubtrees_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: GeneralSubtree
})], GeneralSubtrees);
var NameConstraints = class {
	permittedSubtrees;
	excludedSubtrees;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralSubtrees,
	context: 0,
	optional: true,
	implicit: true
})], NameConstraints.prototype, "permittedSubtrees", void 0);
__decorate([AsnProp({
	type: GeneralSubtrees,
	context: 1,
	optional: true,
	implicit: true
})], NameConstraints.prototype, "excludedSubtrees", void 0);
`${id_ce}`;
var PolicyConstraints = class {
	requireExplicitPolicy;
	inhibitPolicyMapping;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 0,
	implicit: true,
	optional: true,
	converter: AsnIntegerArrayBufferConverter
})], PolicyConstraints.prototype, "requireExplicitPolicy", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 1,
	implicit: true,
	optional: true,
	converter: AsnIntegerArrayBufferConverter
})], PolicyConstraints.prototype, "inhibitPolicyMapping", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/policy_mappings.js
var PolicyMappings_1;
`${id_ce}`;
var PolicyMapping = class {
	issuerDomainPolicy = "";
	subjectDomainPolicy = "";
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], PolicyMapping.prototype, "issuerDomainPolicy", void 0);
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], PolicyMapping.prototype, "subjectDomainPolicy", void 0);
var PolicyMappings = PolicyMappings_1 = class PolicyMappings extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, PolicyMappings_1.prototype);
	}
};
PolicyMappings = PolicyMappings_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: PolicyMapping
})], PolicyMappings);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_alternative_name.js
var SubjectAlternativeName_1;
var id_ce_subjectAltName = `${id_ce}.17`;
var SubjectAlternativeName = SubjectAlternativeName_1 = class SubjectAlternativeName extends GeneralNames$1 {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, SubjectAlternativeName_1.prototype);
	}
};
SubjectAlternativeName = SubjectAlternativeName_1 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], SubjectAlternativeName);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/attribute.js
var Attribute$2 = class {
	type = "";
	values = [];
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], Attribute$2.prototype, "type", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	repeated: "set"
})], Attribute$2.prototype, "values", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_directory_attributes.js
var SubjectDirectoryAttributes_1;
`${id_ce}`;
var SubjectDirectoryAttributes = SubjectDirectoryAttributes_1 = class SubjectDirectoryAttributes extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, SubjectDirectoryAttributes_1.prototype);
	}
};
SubjectDirectoryAttributes = SubjectDirectoryAttributes_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: Attribute$2
})], SubjectDirectoryAttributes);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_key_identifier.js
var id_ce_subjectKeyIdentifier = `${id_ce}.14`;
var SubjectKeyIdentifier = class extends KeyIdentifier {};
`${id_ce}`;
var PrivateKeyUsagePeriod = class {
	notBefore;
	notAfter;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.GeneralizedTime,
	context: 0,
	implicit: true,
	optional: true
})], PrivateKeyUsagePeriod.prototype, "notBefore", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.GeneralizedTime,
	context: 1,
	implicit: true,
	optional: true
})], PrivateKeyUsagePeriod.prototype, "notAfter", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/entrust_version_info.js
var EntrustInfoFlags;
(function(EntrustInfoFlags) {
	EntrustInfoFlags[EntrustInfoFlags["keyUpdateAllowed"] = 1] = "keyUpdateAllowed";
	EntrustInfoFlags[EntrustInfoFlags["newExtensions"] = 2] = "newExtensions";
	EntrustInfoFlags[EntrustInfoFlags["pKIXCertificate"] = 4] = "pKIXCertificate";
})(EntrustInfoFlags || (EntrustInfoFlags = {}));
var EntrustInfo = class extends BitString {
	toJSON() {
		const res = [];
		const flags = this.toNumber();
		if (flags & EntrustInfoFlags.pKIXCertificate) res.push("pKIXCertificate");
		if (flags & EntrustInfoFlags.newExtensions) res.push("newExtensions");
		if (flags & EntrustInfoFlags.keyUpdateAllowed) res.push("keyUpdateAllowed");
		return res;
	}
	toString() {
		return `[${this.toJSON().join(", ")}]`;
	}
};
var EntrustVersionInfo = class {
	entrustVers = "";
	entrustInfoFlags = new EntrustInfo();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.GeneralString })], EntrustVersionInfo.prototype, "entrustVers", void 0);
__decorate([AsnProp({ type: EntrustInfo })], EntrustVersionInfo.prototype, "entrustInfoFlags", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_info_access.js
var SubjectInfoAccessSyntax_1;
`${id_pe}`;
var SubjectInfoAccessSyntax = SubjectInfoAccessSyntax_1 = class SubjectInfoAccessSyntax extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, SubjectInfoAccessSyntax_1.prototype);
	}
};
SubjectInfoAccessSyntax = SubjectInfoAccessSyntax_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: AccessDescription
})], SubjectInfoAccessSyntax);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js
var AlgorithmIdentifier = class AlgorithmIdentifier {
	algorithm = "";
	parameters;
	constructor(params = {}) {
		Object.assign(this, params);
	}
	isEqual(data) {
		return data instanceof AlgorithmIdentifier && data.algorithm == this.algorithm && (data.parameters && this.parameters && equal(data.parameters, this.parameters) || data.parameters === this.parameters);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], AlgorithmIdentifier.prototype, "algorithm", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	optional: true
})], AlgorithmIdentifier.prototype, "parameters", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/subject_public_key_info.js
var SubjectPublicKeyInfo = class {
	algorithm = new AlgorithmIdentifier();
	subjectPublicKey = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AlgorithmIdentifier })], SubjectPublicKeyInfo.prototype, "algorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], SubjectPublicKeyInfo.prototype, "subjectPublicKey", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/time.js
var Time = class Time {
	utcTime;
	generalTime;
	constructor(time) {
		if (time) if (typeof time === "string" || typeof time === "number" || time instanceof Date) {
			const date = new Date(time);
			date.setMilliseconds(0);
			if (date.getUTCFullYear() > 2049) this.generalTime = date;
			else this.utcTime = date;
		} else Object.assign(this, time);
	}
	getTime() {
		const time = this.utcTime || this.generalTime;
		if (!time) throw new Error("Cannot get time from CHOICE object");
		return time;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.UTCTime })], Time.prototype, "utcTime", void 0);
__decorate([AsnProp({ type: AsnPropTypes.GeneralizedTime })], Time.prototype, "generalTime", void 0);
Time = __decorate([AsnType({ type: AsnTypeTypes.Choice })], Time);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/validity.js
var Validity = class {
	notBefore = new Time(/* @__PURE__ */ new Date());
	notAfter = new Time(/* @__PURE__ */ new Date());
	constructor(params) {
		if (params) {
			this.notBefore = new Time(params.notBefore);
			this.notAfter = new Time(params.notAfter);
		}
	}
};
__decorate([AsnProp({ type: Time })], Validity.prototype, "notBefore", void 0);
__decorate([AsnProp({ type: Time })], Validity.prototype, "notAfter", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/extension.js
var Extensions_1;
var Extension$1 = class Extension$1 {
	static CRITICAL = false;
	extnID = "";
	critical = Extension$1.CRITICAL;
	extnValue = new OctetString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], Extension$1.prototype, "extnID", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	defaultValue: Extension$1.CRITICAL
})], Extension$1.prototype, "critical", void 0);
__decorate([AsnProp({ type: OctetString })], Extension$1.prototype, "extnValue", void 0);
var Extensions = Extensions_1 = class Extensions extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, Extensions_1.prototype);
	}
};
Extensions = Extensions_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: Extension$1
})], Extensions);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/types.js
var Version$2;
(function(Version) {
	Version[Version["v1"] = 0] = "v1";
	Version[Version["v2"] = 1] = "v2";
	Version[Version["v3"] = 2] = "v3";
})(Version$2 || (Version$2 = {}));
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/tbs_certificate.js
var TBSCertificate = class {
	version = Version$2.v1;
	serialNumber = /* @__PURE__ */ new ArrayBuffer(0);
	signature = new AlgorithmIdentifier();
	issuer = new Name$1();
	validity = new Validity();
	subject = new Name$1();
	subjectPublicKeyInfo = new SubjectPublicKeyInfo();
	issuerUniqueID;
	subjectUniqueID;
	extensions;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 0,
	defaultValue: Version$2.v1
})], TBSCertificate.prototype, "version", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], TBSCertificate.prototype, "serialNumber", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], TBSCertificate.prototype, "signature", void 0);
__decorate([AsnProp({ type: Name$1 })], TBSCertificate.prototype, "issuer", void 0);
__decorate([AsnProp({ type: Validity })], TBSCertificate.prototype, "validity", void 0);
__decorate([AsnProp({ type: Name$1 })], TBSCertificate.prototype, "subject", void 0);
__decorate([AsnProp({ type: SubjectPublicKeyInfo })], TBSCertificate.prototype, "subjectPublicKeyInfo", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.BitString,
	context: 1,
	implicit: true,
	optional: true
})], TBSCertificate.prototype, "issuerUniqueID", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.BitString,
	context: 2,
	implicit: true,
	optional: true
})], TBSCertificate.prototype, "subjectUniqueID", void 0);
__decorate([AsnProp({
	type: Extensions,
	context: 3,
	optional: true
})], TBSCertificate.prototype, "extensions", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/certificate.js
var Certificate = class {
	tbsCertificate = new TBSCertificate();
	tbsCertificateRaw;
	signatureAlgorithm = new AlgorithmIdentifier();
	signatureValue = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: TBSCertificate,
	raw: true
})], Certificate.prototype, "tbsCertificate", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], Certificate.prototype, "signatureAlgorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], Certificate.prototype, "signatureValue", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/tbs_cert_list.js
var RevokedCertificate = class {
	userCertificate = /* @__PURE__ */ new ArrayBuffer(0);
	revocationDate = new Time();
	crlEntryExtensions;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RevokedCertificate.prototype, "userCertificate", void 0);
__decorate([AsnProp({ type: Time })], RevokedCertificate.prototype, "revocationDate", void 0);
__decorate([AsnProp({
	type: Extension$1,
	optional: true,
	repeated: "sequence"
})], RevokedCertificate.prototype, "crlEntryExtensions", void 0);
var TBSCertList = class {
	version;
	signature = new AlgorithmIdentifier();
	issuer = new Name$1();
	thisUpdate = new Time();
	nextUpdate;
	revokedCertificates;
	crlExtensions;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	optional: true
})], TBSCertList.prototype, "version", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], TBSCertList.prototype, "signature", void 0);
__decorate([AsnProp({ type: Name$1 })], TBSCertList.prototype, "issuer", void 0);
__decorate([AsnProp({ type: Time })], TBSCertList.prototype, "thisUpdate", void 0);
__decorate([AsnProp({
	type: Time,
	optional: true
})], TBSCertList.prototype, "nextUpdate", void 0);
__decorate([AsnProp({
	type: RevokedCertificate,
	repeated: "sequence",
	optional: true
})], TBSCertList.prototype, "revokedCertificates", void 0);
__decorate([AsnProp({
	type: Extension$1,
	optional: true,
	context: 0,
	repeated: "sequence"
})], TBSCertList.prototype, "crlExtensions", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509@2.7.0/node_modules/@peculiar/asn1-x509/build/es2015/certificate_list.js
var CertificateList = class {
	tbsCertList = new TBSCertList();
	tbsCertListRaw;
	signatureAlgorithm = new AlgorithmIdentifier();
	signature = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: TBSCertList,
	raw: true
})], CertificateList.prototype, "tbsCertList", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], CertificateList.prototype, "signatureAlgorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], CertificateList.prototype, "signature", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/getCertificateInfo.js
var issuerSubjectIDKey = {
	"2.5.4.6": "C",
	"2.5.4.10": "O",
	"2.5.4.11": "OU",
	"2.5.4.3": "CN"
};
/**
* Extract PEM certificate info
*
* @param pemCertificate Result from call to `convertASN1toPEM(x5c[0])`
*/
function getCertificateInfo(leafCertBuffer) {
	const x509 = AsnParser.parse(leafCertBuffer, Certificate);
	const parsedCert = x509.tbsCertificate;
	const issuer = { combined: "" };
	parsedCert.issuer.forEach(([iss]) => {
		const key = issuerSubjectIDKey[iss.type];
		if (key) issuer[key] = iss.value.toString();
	});
	issuer.combined = issuerSubjectToString(issuer);
	const subject = { combined: "" };
	parsedCert.subject.forEach(([iss]) => {
		const key = issuerSubjectIDKey[iss.type];
		if (key) subject[key] = iss.value.toString();
	});
	subject.combined = issuerSubjectToString(subject);
	let basicConstraintsCA = false;
	if (parsedCert.extensions) {
		for (const ext of parsedCert.extensions) if (ext.extnID === id_ce_basicConstraints) basicConstraintsCA = AsnParser.parse(ext.extnValue, BasicConstraints).cA;
	}
	return {
		issuer,
		subject,
		version: parsedCert.version,
		basicConstraintsCA,
		notBefore: parsedCert.validity.notBefore.getTime(),
		notAfter: parsedCert.validity.notAfter.getTime(),
		parsedCertificate: x509
	};
}
/**
* Stringify the parts of Issuer or Subject info for easier comparison of subject issuers with
* issuer subjects.
*
* The order might seem arbitrary, because it is. It should be enough that the two are stringified
* in the same order.
*/
function issuerSubjectToString(input) {
	const parts = [];
	if (input.C) parts.push(input.C);
	if (input.O) parts.push(input.O);
	if (input.OU) parts.push(input.OU);
	if (input.CN) parts.push(input.CN);
	return parts.join(" : ");
}
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
(/* @__PURE__ */ __commonJSMin((() => {
	var Reflect;
	(function(Reflect) {
		(function(factory) {
			var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
			var exporter = makeExporter(Reflect);
			if (typeof root.Reflect !== "undefined") exporter = makeExporter(root.Reflect, exporter);
			factory(exporter, root);
			if (typeof root.Reflect === "undefined") root.Reflect = Reflect;
			function makeExporter(target, previous) {
				return function(key, value) {
					Object.defineProperty(target, key, {
						configurable: true,
						writable: true,
						value
					});
					if (previous) previous(key, value);
				};
			}
			function functionThis() {
				try {
					return Function("return this;")();
				} catch (_) {}
			}
			function indirectEvalThis() {
				try {
					return (0, eval)("(function() { return this; })()");
				} catch (_) {}
			}
			function sloppyModeThis() {
				return functionThis() || indirectEvalThis();
			}
		})(function(exporter, root) {
			var hasOwn = Object.prototype.hasOwnProperty;
			var supportsSymbol = typeof Symbol === "function";
			var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
			var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
			var supportsCreate = typeof Object.create === "function";
			var supportsProto = { __proto__: [] } instanceof Array;
			var downLevel = !supportsCreate && !supportsProto;
			var HashMap = {
				create: supportsCreate ? function() {
					return MakeDictionary(Object.create(null));
				} : supportsProto ? function() {
					return MakeDictionary({ __proto__: null });
				} : function() {
					return MakeDictionary({});
				},
				has: downLevel ? function(map, key) {
					return hasOwn.call(map, key);
				} : function(map, key) {
					return key in map;
				},
				get: downLevel ? function(map, key) {
					return hasOwn.call(map, key) ? map[key] : void 0;
				} : function(map, key) {
					return map[key];
				}
			};
			var functionPrototype = Object.getPrototypeOf(Function);
			var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
			var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
			var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
			var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
			var metadataRegistry = GetOrCreateMetadataRegistry();
			var metadataProvider = CreateMetadataProvider(metadataRegistry);
			/**
			* Applies a set of decorators to a property of a target object.
			* @param decorators An array of decorators.
			* @param target The target object.
			* @param propertyKey (Optional) The property key to decorate.
			* @param attributes (Optional) The property descriptor for the target key.
			* @remarks Decorators are applied in reverse order.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     Example = Reflect.decorate(decoratorsArray, Example);
			*
			*     // property (on constructor)
			*     Reflect.decorate(decoratorsArray, Example, "staticProperty");
			*
			*     // property (on prototype)
			*     Reflect.decorate(decoratorsArray, Example.prototype, "property");
			*
			*     // method (on constructor)
			*     Object.defineProperty(Example, "staticMethod",
			*         Reflect.decorate(decoratorsArray, Example, "staticMethod",
			*             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
			*
			*     // method (on prototype)
			*     Object.defineProperty(Example.prototype, "method",
			*         Reflect.decorate(decoratorsArray, Example.prototype, "method",
			*             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
			*
			*/
			function decorate(decorators, target, propertyKey, attributes) {
				if (!IsUndefined(propertyKey)) {
					if (!IsArray(decorators)) throw new TypeError();
					if (!IsObject(target)) throw new TypeError();
					if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
					if (IsNull(attributes)) attributes = void 0;
					propertyKey = ToPropertyKey(propertyKey);
					return DecorateProperty(decorators, target, propertyKey, attributes);
				} else {
					if (!IsArray(decorators)) throw new TypeError();
					if (!IsConstructor(target)) throw new TypeError();
					return DecorateConstructor(decorators, target);
				}
			}
			exporter("decorate", decorate);
			/**
			* A default metadata decorator factory that can be used on a class, class member, or parameter.
			* @param metadataKey The key for the metadata entry.
			* @param metadataValue The value for the metadata entry.
			* @returns A decorator function.
			* @remarks
			* If `metadataKey` is already defined for the target and target key, the
			* metadataValue for that key will be overwritten.
			* @example
			*
			*     // constructor
			*     @Reflect.metadata(key, value)
			*     class Example {
			*     }
			*
			*     // property (on constructor, TypeScript only)
			*     class Example {
			*         @Reflect.metadata(key, value)
			*         static staticProperty;
			*     }
			*
			*     // property (on prototype, TypeScript only)
			*     class Example {
			*         @Reflect.metadata(key, value)
			*         property;
			*     }
			*
			*     // method (on constructor)
			*     class Example {
			*         @Reflect.metadata(key, value)
			*         static staticMethod() { }
			*     }
			*
			*     // method (on prototype)
			*     class Example {
			*         @Reflect.metadata(key, value)
			*         method() { }
			*     }
			*
			*/
			function metadata(metadataKey, metadataValue) {
				function decorator(target, propertyKey) {
					if (!IsObject(target)) throw new TypeError();
					if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
					OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
				}
				return decorator;
			}
			exporter("metadata", metadata);
			/**
			* Define a unique metadata entry on the target.
			* @param metadataKey A key used to store and retrieve metadata.
			* @param metadataValue A value that contains attached metadata.
			* @param target The target object on which to define metadata.
			* @param propertyKey (Optional) The property key for the target.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     Reflect.defineMetadata("custom:annotation", options, Example);
			*
			*     // property (on constructor)
			*     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
			*
			*     // property (on prototype)
			*     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
			*
			*     // method (on constructor)
			*     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
			*
			*     // method (on prototype)
			*     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
			*
			*     // decorator factory as metadata-producing annotation.
			*     function MyAnnotation(options): Decorator {
			*         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
			*     }
			*
			*/
			function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
			}
			exporter("defineMetadata", defineMetadata);
			/**
			* Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
			* @param metadataKey A key used to store and retrieve metadata.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.hasMetadata("custom:annotation", Example);
			*
			*     // property (on constructor)
			*     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
			*
			*/
			function hasMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryHasMetadata(metadataKey, target, propertyKey);
			}
			exporter("hasMetadata", hasMetadata);
			/**
			* Gets a value indicating whether the target object has the provided metadata key defined.
			* @param metadataKey A key used to store and retrieve metadata.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.hasOwnMetadata("custom:annotation", Example);
			*
			*     // property (on constructor)
			*     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
			*
			*/
			function hasOwnMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
			}
			exporter("hasOwnMetadata", hasOwnMetadata);
			/**
			* Gets the metadata value for the provided metadata key on the target object or its prototype chain.
			* @param metadataKey A key used to store and retrieve metadata.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns The metadata value for the metadata key if found; otherwise, `undefined`.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.getMetadata("custom:annotation", Example);
			*
			*     // property (on constructor)
			*     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
			*
			*/
			function getMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryGetMetadata(metadataKey, target, propertyKey);
			}
			exporter("getMetadata", getMetadata);
			/**
			* Gets the metadata value for the provided metadata key on the target object.
			* @param metadataKey A key used to store and retrieve metadata.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns The metadata value for the metadata key if found; otherwise, `undefined`.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.getOwnMetadata("custom:annotation", Example);
			*
			*     // property (on constructor)
			*     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
			*
			*/
			function getOwnMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
			}
			exporter("getOwnMetadata", getOwnMetadata);
			/**
			* Gets the metadata keys defined on the target object or its prototype chain.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns An array of unique metadata keys.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.getMetadataKeys(Example);
			*
			*     // property (on constructor)
			*     result = Reflect.getMetadataKeys(Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.getMetadataKeys(Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.getMetadataKeys(Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.getMetadataKeys(Example.prototype, "method");
			*
			*/
			function getMetadataKeys(target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryMetadataKeys(target, propertyKey);
			}
			exporter("getMetadataKeys", getMetadataKeys);
			/**
			* Gets the unique metadata keys defined on the target object.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns An array of unique metadata keys.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.getOwnMetadataKeys(Example);
			*
			*     // property (on constructor)
			*     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
			*
			*/
			function getOwnMetadataKeys(target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				return OrdinaryOwnMetadataKeys(target, propertyKey);
			}
			exporter("getOwnMetadataKeys", getOwnMetadataKeys);
			/**
			* Deletes the metadata entry from the target object with the provided key.
			* @param metadataKey A key used to store and retrieve metadata.
			* @param target The target object on which the metadata is defined.
			* @param propertyKey (Optional) The property key for the target.
			* @returns `true` if the metadata entry was found and deleted; otherwise, false.
			* @example
			*
			*     class Example {
			*         // property declarations are not part of ES6, though they are valid in TypeScript:
			*         // static staticProperty;
			*         // property;
			*
			*         constructor(p) { }
			*         static staticMethod(p) { }
			*         method(p) { }
			*     }
			*
			*     // constructor
			*     result = Reflect.deleteMetadata("custom:annotation", Example);
			*
			*     // property (on constructor)
			*     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
			*
			*     // property (on prototype)
			*     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
			*
			*     // method (on constructor)
			*     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
			*
			*     // method (on prototype)
			*     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
			*
			*/
			function deleteMetadata(metadataKey, target, propertyKey) {
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				if (!IsObject(target)) throw new TypeError();
				if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
				var provider = GetMetadataProvider(target, propertyKey, false);
				if (IsUndefined(provider)) return false;
				return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
			}
			exporter("deleteMetadata", deleteMetadata);
			function DecorateConstructor(decorators, target) {
				for (var i = decorators.length - 1; i >= 0; --i) {
					var decorator = decorators[i];
					var decorated = decorator(target);
					if (!IsUndefined(decorated) && !IsNull(decorated)) {
						if (!IsConstructor(decorated)) throw new TypeError();
						target = decorated;
					}
				}
				return target;
			}
			function DecorateProperty(decorators, target, propertyKey, descriptor) {
				for (var i = decorators.length - 1; i >= 0; --i) {
					var decorator = decorators[i];
					var decorated = decorator(target, propertyKey, descriptor);
					if (!IsUndefined(decorated) && !IsNull(decorated)) {
						if (!IsObject(decorated)) throw new TypeError();
						descriptor = decorated;
					}
				}
				return descriptor;
			}
			function OrdinaryHasMetadata(MetadataKey, O, P) {
				if (OrdinaryHasOwnMetadata(MetadataKey, O, P)) return true;
				var parent = OrdinaryGetPrototypeOf(O);
				if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
				return false;
			}
			function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
				var provider = GetMetadataProvider(O, P, false);
				if (IsUndefined(provider)) return false;
				return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
			}
			function OrdinaryGetMetadata(MetadataKey, O, P) {
				if (OrdinaryHasOwnMetadata(MetadataKey, O, P)) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
				var parent = OrdinaryGetPrototypeOf(O);
				if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
			}
			function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
				var provider = GetMetadataProvider(O, P, false);
				if (IsUndefined(provider)) return;
				return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
			}
			function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
				GetMetadataProvider(O, P, true).OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
			}
			function OrdinaryMetadataKeys(O, P) {
				var ownKeys = OrdinaryOwnMetadataKeys(O, P);
				var parent = OrdinaryGetPrototypeOf(O);
				if (parent === null) return ownKeys;
				var parentKeys = OrdinaryMetadataKeys(parent, P);
				if (parentKeys.length <= 0) return ownKeys;
				if (ownKeys.length <= 0) return parentKeys;
				var set = new _Set();
				var keys = [];
				for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
					var key = ownKeys_1[_i];
					var hasKey = set.has(key);
					if (!hasKey) {
						set.add(key);
						keys.push(key);
					}
				}
				for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
					var key = parentKeys_1[_a];
					var hasKey = set.has(key);
					if (!hasKey) {
						set.add(key);
						keys.push(key);
					}
				}
				return keys;
			}
			function OrdinaryOwnMetadataKeys(O, P) {
				var provider = GetMetadataProvider(O, P, false);
				if (!provider) return [];
				return provider.OrdinaryOwnMetadataKeys(O, P);
			}
			function Type(x) {
				if (x === null) return 1;
				switch (typeof x) {
					case "undefined": return 0;
					case "boolean": return 2;
					case "string": return 3;
					case "symbol": return 4;
					case "number": return 5;
					case "object": return x === null ? 1 : 6;
					default: return 6;
				}
			}
			function IsUndefined(x) {
				return x === void 0;
			}
			function IsNull(x) {
				return x === null;
			}
			function IsSymbol(x) {
				return typeof x === "symbol";
			}
			function IsObject(x) {
				return typeof x === "object" ? x !== null : typeof x === "function";
			}
			function ToPrimitive(input, PreferredType) {
				switch (Type(input)) {
					case 0: return input;
					case 1: return input;
					case 2: return input;
					case 3: return input;
					case 4: return input;
					case 5: return input;
				}
				var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
				var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
				if (exoticToPrim !== void 0) {
					var result = exoticToPrim.call(input, hint);
					if (IsObject(result)) throw new TypeError();
					return result;
				}
				return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
			}
			function OrdinaryToPrimitive(O, hint) {
				if (hint === "string") {
					var toString_1 = O.toString;
					if (IsCallable(toString_1)) {
						var result = toString_1.call(O);
						if (!IsObject(result)) return result;
					}
					var valueOf = O.valueOf;
					if (IsCallable(valueOf)) {
						var result = valueOf.call(O);
						if (!IsObject(result)) return result;
					}
				} else {
					var valueOf = O.valueOf;
					if (IsCallable(valueOf)) {
						var result = valueOf.call(O);
						if (!IsObject(result)) return result;
					}
					var toString_2 = O.toString;
					if (IsCallable(toString_2)) {
						var result = toString_2.call(O);
						if (!IsObject(result)) return result;
					}
				}
				throw new TypeError();
			}
			function ToBoolean(argument) {
				return !!argument;
			}
			function ToString(argument) {
				return "" + argument;
			}
			function ToPropertyKey(argument) {
				var key = ToPrimitive(argument, 3);
				if (IsSymbol(key)) return key;
				return ToString(key);
			}
			function IsArray(argument) {
				return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
			}
			function IsCallable(argument) {
				return typeof argument === "function";
			}
			function IsConstructor(argument) {
				return typeof argument === "function";
			}
			function IsPropertyKey(argument) {
				switch (Type(argument)) {
					case 3: return true;
					case 4: return true;
					default: return false;
				}
			}
			function SameValueZero(x, y) {
				return x === y || x !== x && y !== y;
			}
			function GetMethod(V, P) {
				var func = V[P];
				if (func === void 0 || func === null) return void 0;
				if (!IsCallable(func)) throw new TypeError();
				return func;
			}
			function GetIterator(obj) {
				var method = GetMethod(obj, iteratorSymbol);
				if (!IsCallable(method)) throw new TypeError();
				var iterator = method.call(obj);
				if (!IsObject(iterator)) throw new TypeError();
				return iterator;
			}
			function IteratorValue(iterResult) {
				return iterResult.value;
			}
			function IteratorStep(iterator) {
				var result = iterator.next();
				return result.done ? false : result;
			}
			function IteratorClose(iterator) {
				var f = iterator["return"];
				if (f) f.call(iterator);
			}
			function OrdinaryGetPrototypeOf(O) {
				var proto = Object.getPrototypeOf(O);
				if (typeof O !== "function" || O === functionPrototype) return proto;
				if (proto !== functionPrototype) return proto;
				var prototype = O.prototype;
				var prototypeProto = prototype && Object.getPrototypeOf(prototype);
				if (prototypeProto == null || prototypeProto === Object.prototype) return proto;
				var constructor = prototypeProto.constructor;
				if (typeof constructor !== "function") return proto;
				if (constructor === O) return proto;
				return constructor;
			}
			/**
			* Creates a registry used to allow multiple `reflect-metadata` providers.
			*/
			function CreateMetadataRegistry() {
				var fallback;
				if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") fallback = CreateFallbackProvider(root.Reflect);
				var first;
				var second;
				var rest;
				var targetProviderMap = new _WeakMap();
				var registry = {
					registerProvider,
					getProvider,
					setProvider
				};
				return registry;
				function registerProvider(provider) {
					if (!Object.isExtensible(registry)) throw new Error("Cannot add provider to a frozen registry.");
					switch (true) {
						case fallback === provider: break;
						case IsUndefined(first):
							first = provider;
							break;
						case first === provider: break;
						case IsUndefined(second):
							second = provider;
							break;
						case second === provider: break;
						default:
							if (rest === void 0) rest = new _Set();
							rest.add(provider);
							break;
					}
				}
				function getProviderNoCache(O, P) {
					if (!IsUndefined(first)) {
						if (first.isProviderFor(O, P)) return first;
						if (!IsUndefined(second)) {
							if (second.isProviderFor(O, P)) return first;
							if (!IsUndefined(rest)) {
								var iterator = GetIterator(rest);
								while (true) {
									var next = IteratorStep(iterator);
									if (!next) return;
									var provider = IteratorValue(next);
									if (provider.isProviderFor(O, P)) {
										IteratorClose(iterator);
										return provider;
									}
								}
							}
						}
					}
					if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) return fallback;
				}
				function getProvider(O, P) {
					var providerMap = targetProviderMap.get(O);
					var provider;
					if (!IsUndefined(providerMap)) provider = providerMap.get(P);
					if (!IsUndefined(provider)) return provider;
					provider = getProviderNoCache(O, P);
					if (!IsUndefined(provider)) {
						if (IsUndefined(providerMap)) {
							providerMap = new _Map();
							targetProviderMap.set(O, providerMap);
						}
						providerMap.set(P, provider);
					}
					return provider;
				}
				function hasProvider(provider) {
					if (IsUndefined(provider)) throw new TypeError();
					return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
				}
				function setProvider(O, P, provider) {
					if (!hasProvider(provider)) throw new Error("Metadata provider not registered.");
					var existingProvider = getProvider(O, P);
					if (existingProvider !== provider) {
						if (!IsUndefined(existingProvider)) return false;
						var providerMap = targetProviderMap.get(O);
						if (IsUndefined(providerMap)) {
							providerMap = new _Map();
							targetProviderMap.set(O, providerMap);
						}
						providerMap.set(P, provider);
					}
					return true;
				}
			}
			/**
			* Gets or creates the shared registry of metadata providers.
			*/
			function GetOrCreateMetadataRegistry() {
				var metadataRegistry;
				if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) metadataRegistry = root.Reflect[registrySymbol];
				if (IsUndefined(metadataRegistry)) metadataRegistry = CreateMetadataRegistry();
				if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) Object.defineProperty(root.Reflect, registrySymbol, {
					enumerable: false,
					configurable: false,
					writable: false,
					value: metadataRegistry
				});
				return metadataRegistry;
			}
			function CreateMetadataProvider(registry) {
				var metadata = new _WeakMap();
				var provider = {
					isProviderFor: function(O, P) {
						var targetMetadata = metadata.get(O);
						if (IsUndefined(targetMetadata)) return false;
						return targetMetadata.has(P);
					},
					OrdinaryDefineOwnMetadata,
					OrdinaryHasOwnMetadata,
					OrdinaryGetOwnMetadata,
					OrdinaryOwnMetadataKeys,
					OrdinaryDeleteMetadata
				};
				metadataRegistry.registerProvider(provider);
				return provider;
				function GetOrCreateMetadataMap(O, P, Create) {
					var targetMetadata = metadata.get(O);
					var createdTargetMetadata = false;
					if (IsUndefined(targetMetadata)) {
						if (!Create) return void 0;
						targetMetadata = new _Map();
						metadata.set(O, targetMetadata);
						createdTargetMetadata = true;
					}
					var metadataMap = targetMetadata.get(P);
					if (IsUndefined(metadataMap)) {
						if (!Create) return void 0;
						metadataMap = new _Map();
						targetMetadata.set(P, metadataMap);
						if (!registry.setProvider(O, P, provider)) {
							targetMetadata.delete(P);
							if (createdTargetMetadata) metadata.delete(O);
							throw new Error("Wrong provider for target.");
						}
					}
					return metadataMap;
				}
				function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return false;
					return ToBoolean(metadataMap.has(MetadataKey));
				}
				function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return void 0;
					return metadataMap.get(MetadataKey);
				}
				function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
					GetOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
				}
				function OrdinaryOwnMetadataKeys(O, P) {
					var keys = [];
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return keys;
					var iterator = GetIterator(metadataMap.keys());
					var k = 0;
					while (true) {
						var next = IteratorStep(iterator);
						if (!next) {
							keys.length = k;
							return keys;
						}
						var nextValue = IteratorValue(next);
						try {
							keys[k] = nextValue;
						} catch (e) {
							try {
								IteratorClose(iterator);
							} finally {
								throw e;
							}
						}
						k++;
					}
				}
				function OrdinaryDeleteMetadata(MetadataKey, O, P) {
					var metadataMap = GetOrCreateMetadataMap(O, P, false);
					if (IsUndefined(metadataMap)) return false;
					if (!metadataMap.delete(MetadataKey)) return false;
					if (metadataMap.size === 0) {
						var targetMetadata = metadata.get(O);
						if (!IsUndefined(targetMetadata)) {
							targetMetadata.delete(P);
							if (targetMetadata.size === 0) metadata.delete(targetMetadata);
						}
					}
					return true;
				}
			}
			function CreateFallbackProvider(reflect) {
				var defineMetadata = reflect.defineMetadata, hasOwnMetadata = reflect.hasOwnMetadata, getOwnMetadata = reflect.getOwnMetadata, getOwnMetadataKeys = reflect.getOwnMetadataKeys, deleteMetadata = reflect.deleteMetadata;
				var metadataOwner = new _WeakMap();
				return {
					isProviderFor: function(O, P) {
						var metadataPropertySet = metadataOwner.get(O);
						if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) return true;
						if (getOwnMetadataKeys(O, P).length) {
							if (IsUndefined(metadataPropertySet)) {
								metadataPropertySet = new _Set();
								metadataOwner.set(O, metadataPropertySet);
							}
							metadataPropertySet.add(P);
							return true;
						}
						return false;
					},
					OrdinaryDefineOwnMetadata: defineMetadata,
					OrdinaryHasOwnMetadata: hasOwnMetadata,
					OrdinaryGetOwnMetadata: getOwnMetadata,
					OrdinaryOwnMetadataKeys: getOwnMetadataKeys,
					OrdinaryDeleteMetadata: deleteMetadata
				};
			}
			/**
			* Gets the metadata provider for an object. If the object has no metadata provider and this is for a create operation,
			* then this module's metadata provider is assigned to the object.
			*/
			function GetMetadataProvider(O, P, Create) {
				var registeredProvider = metadataRegistry.getProvider(O, P);
				if (!IsUndefined(registeredProvider)) return registeredProvider;
				if (Create) {
					if (metadataRegistry.setProvider(O, P, metadataProvider)) return metadataProvider;
					throw new Error("Illegal state.");
				}
			}
			function CreateMapPolyfill() {
				var cacheSentinel = {};
				var arraySentinel = [];
				var MapIterator = function() {
					function MapIterator(keys, values, selector) {
						this._index = 0;
						this._keys = keys;
						this._values = values;
						this._selector = selector;
					}
					MapIterator.prototype["@@iterator"] = function() {
						return this;
					};
					MapIterator.prototype[iteratorSymbol] = function() {
						return this;
					};
					MapIterator.prototype.next = function() {
						var index = this._index;
						if (index >= 0 && index < this._keys.length) {
							var result = this._selector(this._keys[index], this._values[index]);
							if (index + 1 >= this._keys.length) {
								this._index = -1;
								this._keys = arraySentinel;
								this._values = arraySentinel;
							} else this._index++;
							return {
								value: result,
								done: false
							};
						}
						return {
							value: void 0,
							done: true
						};
					};
					MapIterator.prototype.throw = function(error) {
						if (this._index >= 0) {
							this._index = -1;
							this._keys = arraySentinel;
							this._values = arraySentinel;
						}
						throw error;
					};
					MapIterator.prototype.return = function(value) {
						if (this._index >= 0) {
							this._index = -1;
							this._keys = arraySentinel;
							this._values = arraySentinel;
						}
						return {
							value,
							done: true
						};
					};
					return MapIterator;
				}();
				return function() {
					function Map() {
						this._keys = [];
						this._values = [];
						this._cacheKey = cacheSentinel;
						this._cacheIndex = -2;
					}
					Object.defineProperty(Map.prototype, "size", {
						get: function() {
							return this._keys.length;
						},
						enumerable: true,
						configurable: true
					});
					Map.prototype.has = function(key) {
						return this._find(key, false) >= 0;
					};
					Map.prototype.get = function(key) {
						var index = this._find(key, false);
						return index >= 0 ? this._values[index] : void 0;
					};
					Map.prototype.set = function(key, value) {
						var index = this._find(key, true);
						this._values[index] = value;
						return this;
					};
					Map.prototype.delete = function(key) {
						var index = this._find(key, false);
						if (index >= 0) {
							var size = this._keys.length;
							for (var i = index + 1; i < size; i++) {
								this._keys[i - 1] = this._keys[i];
								this._values[i - 1] = this._values[i];
							}
							this._keys.length--;
							this._values.length--;
							if (SameValueZero(key, this._cacheKey)) {
								this._cacheKey = cacheSentinel;
								this._cacheIndex = -2;
							}
							return true;
						}
						return false;
					};
					Map.prototype.clear = function() {
						this._keys.length = 0;
						this._values.length = 0;
						this._cacheKey = cacheSentinel;
						this._cacheIndex = -2;
					};
					Map.prototype.keys = function() {
						return new MapIterator(this._keys, this._values, getKey);
					};
					Map.prototype.values = function() {
						return new MapIterator(this._keys, this._values, getValue);
					};
					Map.prototype.entries = function() {
						return new MapIterator(this._keys, this._values, getEntry);
					};
					Map.prototype["@@iterator"] = function() {
						return this.entries();
					};
					Map.prototype[iteratorSymbol] = function() {
						return this.entries();
					};
					Map.prototype._find = function(key, insert) {
						if (!SameValueZero(this._cacheKey, key)) {
							this._cacheIndex = -1;
							for (var i = 0; i < this._keys.length; i++) if (SameValueZero(this._keys[i], key)) {
								this._cacheIndex = i;
								break;
							}
						}
						if (this._cacheIndex < 0 && insert) {
							this._cacheIndex = this._keys.length;
							this._keys.push(key);
							this._values.push(void 0);
						}
						return this._cacheIndex;
					};
					return Map;
				}();
				function getKey(key, _) {
					return key;
				}
				function getValue(_, value) {
					return value;
				}
				function getEntry(key, value) {
					return [key, value];
				}
			}
			function CreateSetPolyfill() {
				return function() {
					function Set() {
						this._map = new _Map();
					}
					Object.defineProperty(Set.prototype, "size", {
						get: function() {
							return this._map.size;
						},
						enumerable: true,
						configurable: true
					});
					Set.prototype.has = function(value) {
						return this._map.has(value);
					};
					Set.prototype.add = function(value) {
						return this._map.set(value, value), this;
					};
					Set.prototype.delete = function(value) {
						return this._map.delete(value);
					};
					Set.prototype.clear = function() {
						this._map.clear();
					};
					Set.prototype.keys = function() {
						return this._map.keys();
					};
					Set.prototype.values = function() {
						return this._map.keys();
					};
					Set.prototype.entries = function() {
						return this._map.entries();
					};
					Set.prototype["@@iterator"] = function() {
						return this.keys();
					};
					Set.prototype[iteratorSymbol] = function() {
						return this.keys();
					};
					return Set;
				}();
			}
			function CreateWeakMapPolyfill() {
				var UUID_SIZE = 16;
				var keys = HashMap.create();
				var rootKey = CreateUniqueKey();
				return function() {
					function WeakMap() {
						this._key = CreateUniqueKey();
					}
					WeakMap.prototype.has = function(target) {
						var table = GetOrCreateWeakMapTable(target, false);
						return table !== void 0 ? HashMap.has(table, this._key) : false;
					};
					WeakMap.prototype.get = function(target) {
						var table = GetOrCreateWeakMapTable(target, false);
						return table !== void 0 ? HashMap.get(table, this._key) : void 0;
					};
					WeakMap.prototype.set = function(target, value) {
						var table = GetOrCreateWeakMapTable(target, true);
						table[this._key] = value;
						return this;
					};
					WeakMap.prototype.delete = function(target) {
						var table = GetOrCreateWeakMapTable(target, false);
						return table !== void 0 ? delete table[this._key] : false;
					};
					WeakMap.prototype.clear = function() {
						this._key = CreateUniqueKey();
					};
					return WeakMap;
				}();
				function CreateUniqueKey() {
					var key;
					do
						key = "@@WeakMap@@" + CreateUUID();
					while (HashMap.has(keys, key));
					keys[key] = true;
					return key;
				}
				function GetOrCreateWeakMapTable(target, create) {
					if (!hasOwn.call(target, rootKey)) {
						if (!create) return void 0;
						Object.defineProperty(target, rootKey, { value: HashMap.create() });
					}
					return target[rootKey];
				}
				function FillRandomBytes(buffer, size) {
					for (var i = 0; i < size; ++i) buffer[i] = Math.random() * 255 | 0;
					return buffer;
				}
				function GenRandomBytes(size) {
					if (typeof Uint8Array === "function") {
						var array = new Uint8Array(size);
						if (typeof crypto !== "undefined") crypto.getRandomValues(array);
						else if (typeof msCrypto !== "undefined") msCrypto.getRandomValues(array);
						else FillRandomBytes(array, size);
						return array;
					}
					return FillRandomBytes(new Array(size), size);
				}
				function CreateUUID() {
					var data = GenRandomBytes(UUID_SIZE);
					data[6] = data[6] & 79 | 64;
					data[8] = data[8] & 191 | 128;
					var result = "";
					for (var offset = 0; offset < UUID_SIZE; ++offset) {
						var byte = data[offset];
						if (offset === 4 || offset === 6 || offset === 8) result += "-";
						if (byte < 16) result += "0";
						result += byte.toString(16).toLowerCase();
					}
					return result;
				}
			}
			function MakeDictionary(obj) {
				obj.__ = void 0;
				delete obj.__;
				return obj;
			}
		});
	})(Reflect || (Reflect = {}));
})))();
var IssuerAndSerialNumber = class {
	issuer = new Name$1();
	serialNumber = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: Name$1 })], IssuerAndSerialNumber.prototype, "issuer", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], IssuerAndSerialNumber.prototype, "serialNumber", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/signer_identifier.js
var SignerIdentifier = class SignerIdentifier {
	subjectKeyIdentifier;
	issuerAndSerialNumber;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: SubjectKeyIdentifier,
	context: 0,
	implicit: true
})], SignerIdentifier.prototype, "subjectKeyIdentifier", void 0);
__decorate([AsnProp({ type: IssuerAndSerialNumber })], SignerIdentifier.prototype, "issuerAndSerialNumber", void 0);
SignerIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Choice })], SignerIdentifier);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/types.js
var CMSVersion;
(function(CMSVersion) {
	CMSVersion[CMSVersion["v0"] = 0] = "v0";
	CMSVersion[CMSVersion["v1"] = 1] = "v1";
	CMSVersion[CMSVersion["v2"] = 2] = "v2";
	CMSVersion[CMSVersion["v3"] = 3] = "v3";
	CMSVersion[CMSVersion["v4"] = 4] = "v4";
	CMSVersion[CMSVersion["v5"] = 5] = "v5";
})(CMSVersion || (CMSVersion = {}));
var DigestAlgorithmIdentifier = class DigestAlgorithmIdentifier extends AlgorithmIdentifier {};
DigestAlgorithmIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], DigestAlgorithmIdentifier);
var SignatureAlgorithmIdentifier = class SignatureAlgorithmIdentifier extends AlgorithmIdentifier {};
SignatureAlgorithmIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], SignatureAlgorithmIdentifier);
var KeyEncryptionAlgorithmIdentifier = class KeyEncryptionAlgorithmIdentifier extends AlgorithmIdentifier {};
KeyEncryptionAlgorithmIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], KeyEncryptionAlgorithmIdentifier);
var ContentEncryptionAlgorithmIdentifier = class ContentEncryptionAlgorithmIdentifier extends AlgorithmIdentifier {};
ContentEncryptionAlgorithmIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], ContentEncryptionAlgorithmIdentifier);
var MessageAuthenticationCodeAlgorithm = class MessageAuthenticationCodeAlgorithm extends AlgorithmIdentifier {};
MessageAuthenticationCodeAlgorithm = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], MessageAuthenticationCodeAlgorithm);
var KeyDerivationAlgorithmIdentifier = class KeyDerivationAlgorithmIdentifier extends AlgorithmIdentifier {};
KeyDerivationAlgorithmIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], KeyDerivationAlgorithmIdentifier);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/attribute.js
var Attribute$1 = class {
	attrType = "";
	attrValues = [];
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], Attribute$1.prototype, "attrType", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	repeated: "set"
})], Attribute$1.prototype, "attrValues", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/signer_info.js
var SignerInfos_1;
var SignerInfo = class {
	version = CMSVersion.v0;
	sid = new SignerIdentifier();
	digestAlgorithm = new DigestAlgorithmIdentifier();
	signedAttrs;
	signedAttrsRaw;
	signatureAlgorithm = new SignatureAlgorithmIdentifier();
	signature = new OctetString();
	unsignedAttrs;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], SignerInfo.prototype, "version", void 0);
__decorate([AsnProp({ type: SignerIdentifier })], SignerInfo.prototype, "sid", void 0);
__decorate([AsnProp({ type: DigestAlgorithmIdentifier })], SignerInfo.prototype, "digestAlgorithm", void 0);
__decorate([AsnProp({
	type: Attribute$1,
	repeated: "set",
	context: 0,
	implicit: true,
	optional: true,
	raw: true
})], SignerInfo.prototype, "signedAttrs", void 0);
__decorate([AsnProp({ type: SignatureAlgorithmIdentifier })], SignerInfo.prototype, "signatureAlgorithm", void 0);
__decorate([AsnProp({ type: OctetString })], SignerInfo.prototype, "signature", void 0);
__decorate([AsnProp({
	type: Attribute$1,
	repeated: "set",
	context: 1,
	implicit: true,
	optional: true
})], SignerInfo.prototype, "unsignedAttrs", void 0);
var SignerInfos = SignerInfos_1 = class SignerInfos extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, SignerInfos_1.prototype);
	}
};
SignerInfos = SignerInfos_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: SignerInfo
})], SignerInfos);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/attributes/counter_signature.js
var CounterSignature$1 = class CounterSignature extends SignerInfo {};
CounterSignature$1 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], CounterSignature$1);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/attributes/signing_time.js
var SigningTime$1 = class SigningTime extends Time {};
SigningTime$1 = __decorate([AsnType({ type: AsnTypeTypes.Choice })], SigningTime$1);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_clear_attrs.js
var ACClearAttrs = class {
	acIssuer = new GeneralName$1();
	acSerial = 0;
	attrs = [];
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: GeneralName$1 })], ACClearAttrs.prototype, "acIssuer", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Integer })], ACClearAttrs.prototype, "acSerial", void 0);
__decorate([AsnProp({
	type: Attribute$2,
	repeated: "sequence"
})], ACClearAttrs.prototype, "attrs", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_spec.js
var AttrSpec_1;
var AttrSpec = AttrSpec_1 = class AttrSpec extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, AttrSpec_1.prototype);
	}
};
AttrSpec = AttrSpec_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: AsnPropTypes.ObjectIdentifier
})], AttrSpec);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_controls.js
var AAControls = class {
	pathLenConstraint;
	permittedAttrs;
	excludedAttrs;
	permitUnSpecified = true;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	optional: true
})], AAControls.prototype, "pathLenConstraint", void 0);
__decorate([AsnProp({
	type: AttrSpec,
	implicit: true,
	context: 0,
	optional: true
})], AAControls.prototype, "permittedAttrs", void 0);
__decorate([AsnProp({
	type: AttrSpec,
	implicit: true,
	context: 1,
	optional: true
})], AAControls.prototype, "excludedAttrs", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Boolean,
	defaultValue: true
})], AAControls.prototype, "permitUnSpecified", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js
var IssuerSerial = class {
	issuer = new GeneralNames$1();
	serial = /* @__PURE__ */ new ArrayBuffer(0);
	issuerUID = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: GeneralNames$1 })], IssuerSerial.prototype, "issuer", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], IssuerSerial.prototype, "serial", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.BitString,
	optional: true
})], IssuerSerial.prototype, "issuerUID", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js
var DigestedObjectType;
(function(DigestedObjectType) {
	DigestedObjectType[DigestedObjectType["publicKey"] = 0] = "publicKey";
	DigestedObjectType[DigestedObjectType["publicKeyCert"] = 1] = "publicKeyCert";
	DigestedObjectType[DigestedObjectType["otherObjectTypes"] = 2] = "otherObjectTypes";
})(DigestedObjectType || (DigestedObjectType = {}));
var ObjectDigestInfo = class {
	digestedObjectType = DigestedObjectType.publicKey;
	otherObjectTypeID;
	digestAlgorithm = new AlgorithmIdentifier();
	objectDigest = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], ObjectDigestInfo.prototype, "digestedObjectType", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.ObjectIdentifier,
	optional: true
})], ObjectDigestInfo.prototype, "otherObjectTypeID", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], ObjectDigestInfo.prototype, "digestAlgorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], ObjectDigestInfo.prototype, "objectDigest", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/v2_form.js
var V2Form = class {
	issuerName;
	baseCertificateID;
	objectDigestInfo;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralNames$1,
	optional: true
})], V2Form.prototype, "issuerName", void 0);
__decorate([AsnProp({
	type: IssuerSerial,
	context: 0,
	implicit: true,
	optional: true
})], V2Form.prototype, "baseCertificateID", void 0);
__decorate([AsnProp({
	type: ObjectDigestInfo,
	context: 1,
	implicit: true,
	optional: true
})], V2Form.prototype, "objectDigestInfo", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_issuer.js
var AttCertIssuer = class AttCertIssuer {
	v1Form;
	v2Form;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralName$1,
	repeated: "sequence"
})], AttCertIssuer.prototype, "v1Form", void 0);
__decorate([AsnProp({
	type: V2Form,
	context: 0,
	implicit: true
})], AttCertIssuer.prototype, "v2Form", void 0);
AttCertIssuer = __decorate([AsnType({ type: AsnTypeTypes.Choice })], AttCertIssuer);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_validity_period.js
var AttCertValidityPeriod = class {
	notBeforeTime = /* @__PURE__ */ new Date();
	notAfterTime = /* @__PURE__ */ new Date();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.GeneralizedTime })], AttCertValidityPeriod.prototype, "notBeforeTime", void 0);
__decorate([AsnProp({ type: AsnPropTypes.GeneralizedTime })], AttCertValidityPeriod.prototype, "notAfterTime", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/holder.js
var Holder = class {
	baseCertificateID;
	entityName;
	objectDigestInfo;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: IssuerSerial,
	implicit: true,
	context: 0,
	optional: true
})], Holder.prototype, "baseCertificateID", void 0);
__decorate([AsnProp({
	type: GeneralNames$1,
	implicit: true,
	context: 1,
	optional: true
})], Holder.prototype, "entityName", void 0);
__decorate([AsnProp({
	type: ObjectDigestInfo,
	implicit: true,
	context: 2,
	optional: true
})], Holder.prototype, "objectDigestInfo", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate_info.js
var AttCertVersion;
(function(AttCertVersion) {
	AttCertVersion[AttCertVersion["v2"] = 1] = "v2";
})(AttCertVersion || (AttCertVersion = {}));
var AttributeCertificateInfo = class {
	version = AttCertVersion.v2;
	holder = new Holder();
	issuer = new AttCertIssuer();
	signature = new AlgorithmIdentifier();
	serialNumber = /* @__PURE__ */ new ArrayBuffer(0);
	attrCertValidityPeriod = new AttCertValidityPeriod();
	attributes = [];
	issuerUniqueID;
	extensions;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], AttributeCertificateInfo.prototype, "version", void 0);
__decorate([AsnProp({ type: Holder })], AttributeCertificateInfo.prototype, "holder", void 0);
__decorate([AsnProp({ type: AttCertIssuer })], AttributeCertificateInfo.prototype, "issuer", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], AttributeCertificateInfo.prototype, "signature", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], AttributeCertificateInfo.prototype, "serialNumber", void 0);
__decorate([AsnProp({ type: AttCertValidityPeriod })], AttributeCertificateInfo.prototype, "attrCertValidityPeriod", void 0);
__decorate([AsnProp({
	type: Attribute$2,
	repeated: "sequence"
})], AttributeCertificateInfo.prototype, "attributes", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.BitString,
	optional: true
})], AttributeCertificateInfo.prototype, "issuerUniqueID", void 0);
__decorate([AsnProp({
	type: Extensions,
	optional: true
})], AttributeCertificateInfo.prototype, "extensions", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate.js
var AttributeCertificate = class {
	acinfo = new AttributeCertificateInfo();
	signatureAlgorithm = new AlgorithmIdentifier();
	signatureValue = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AttributeCertificateInfo })], AttributeCertificate.prototype, "acinfo", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], AttributeCertificate.prototype, "signatureAlgorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], AttributeCertificate.prototype, "signatureValue", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/class_list.js
var ClassListFlags;
(function(ClassListFlags) {
	ClassListFlags[ClassListFlags["unmarked"] = 1] = "unmarked";
	ClassListFlags[ClassListFlags["unclassified"] = 2] = "unclassified";
	ClassListFlags[ClassListFlags["restricted"] = 4] = "restricted";
	ClassListFlags[ClassListFlags["confidential"] = 8] = "confidential";
	ClassListFlags[ClassListFlags["secret"] = 16] = "secret";
	ClassListFlags[ClassListFlags["topSecret"] = 32] = "topSecret";
})(ClassListFlags || (ClassListFlags = {}));
var ClassList = class extends BitString {};
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/security_category.js
var SecurityCategory = class {
	type = "";
	value = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.ObjectIdentifier,
	implicit: true,
	context: 0
})], SecurityCategory.prototype, "type", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	implicit: true,
	context: 1
})], SecurityCategory.prototype, "value", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/clearance.js
var Clearance = class {
	policyId = "";
	classList = new ClassList(ClassListFlags.unclassified);
	securityCategories;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], Clearance.prototype, "policyId", void 0);
__decorate([AsnProp({
	type: ClassList,
	defaultValue: new ClassList(ClassListFlags.unclassified)
})], Clearance.prototype, "classList", void 0);
__decorate([AsnProp({
	type: SecurityCategory,
	repeated: "set"
})], Clearance.prototype, "securityCategories", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/ietf_attr_syntax.js
var IetfAttrSyntaxValueChoices = class {
	cotets;
	oid;
	string;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: OctetString })], IetfAttrSyntaxValueChoices.prototype, "cotets", void 0);
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], IetfAttrSyntaxValueChoices.prototype, "oid", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Utf8String })], IetfAttrSyntaxValueChoices.prototype, "string", void 0);
var IetfAttrSyntax = class {
	policyAuthority;
	values = [];
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralNames$1,
	implicit: true,
	context: 0,
	optional: true
})], IetfAttrSyntax.prototype, "policyAuthority", void 0);
__decorate([AsnProp({
	type: IetfAttrSyntaxValueChoices,
	repeated: "sequence"
})], IetfAttrSyntax.prototype, "values", void 0);
`${id_pe}`;
`${id_pe}`;
`${id_pe}`;
`${id_ce}`;
var id_aca = `${id_pkix}.10`;
`${id_aca}`;
`${id_aca}`;
`${id_aca}`;
`${id_aca}`;
`${id_aca}`;
var id_at = "2.5.4";
`${id_at}`;
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/target.js
var Targets_1;
var TargetCert = class {
	targetCertificate = new IssuerSerial();
	targetName;
	certDigestInfo;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: IssuerSerial })], TargetCert.prototype, "targetCertificate", void 0);
__decorate([AsnProp({
	type: GeneralName$1,
	optional: true
})], TargetCert.prototype, "targetName", void 0);
__decorate([AsnProp({
	type: ObjectDigestInfo,
	optional: true
})], TargetCert.prototype, "certDigestInfo", void 0);
var Target = class Target {
	targetName;
	targetGroup;
	targetCert;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralName$1,
	context: 0,
	implicit: true
})], Target.prototype, "targetName", void 0);
__decorate([AsnProp({
	type: GeneralName$1,
	context: 1,
	implicit: true
})], Target.prototype, "targetGroup", void 0);
__decorate([AsnProp({
	type: TargetCert,
	context: 2,
	implicit: true
})], Target.prototype, "targetCert", void 0);
Target = __decorate([AsnType({ type: AsnTypeTypes.Choice })], Target);
var Targets = Targets_1 = class Targets extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, Targets_1.prototype);
	}
};
Targets = Targets_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: Target
})], Targets);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/proxy_info.js
var ProxyInfo_1;
var ProxyInfo = ProxyInfo_1 = class ProxyInfo extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, ProxyInfo_1.prototype);
	}
};
ProxyInfo = ProxyInfo_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: Targets
})], ProxyInfo);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/role_syntax.js
var RoleSyntax = class {
	roleAuthority;
	roleName;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: GeneralNames$1,
	implicit: true,
	context: 0,
	optional: true
})], RoleSyntax.prototype, "roleAuthority", void 0);
__decorate([AsnProp({
	type: GeneralName$1,
	implicit: true,
	context: 1
})], RoleSyntax.prototype, "roleName", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-x509-attr@2.7.0/node_modules/@peculiar/asn1-x509-attr/build/es2015/svce_auth_info.js
var SvceAuthInfo = class {
	service = new GeneralName$1();
	ident = new GeneralName$1();
	authInfo;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: GeneralName$1 })], SvceAuthInfo.prototype, "service", void 0);
__decorate([AsnProp({ type: GeneralName$1 })], SvceAuthInfo.prototype, "ident", void 0);
__decorate([AsnProp({
	type: OctetString,
	optional: true
})], SvceAuthInfo.prototype, "authInfo", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/certificate_choices.js
var CertificateSet_1;
var OtherCertificateFormat = class {
	otherCertFormat = "";
	otherCert = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], OtherCertificateFormat.prototype, "otherCertFormat", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], OtherCertificateFormat.prototype, "otherCert", void 0);
var CertificateChoices = class CertificateChoices {
	certificate;
	v2AttrCert;
	other;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: Certificate })], CertificateChoices.prototype, "certificate", void 0);
__decorate([AsnProp({
	type: AttributeCertificate,
	context: 2,
	implicit: true
})], CertificateChoices.prototype, "v2AttrCert", void 0);
__decorate([AsnProp({
	type: OtherCertificateFormat,
	context: 3,
	implicit: true
})], CertificateChoices.prototype, "other", void 0);
CertificateChoices = __decorate([AsnType({ type: AsnTypeTypes.Choice })], CertificateChoices);
var CertificateSet = CertificateSet_1 = class CertificateSet extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, CertificateSet_1.prototype);
	}
};
CertificateSet = CertificateSet_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: CertificateChoices
})], CertificateSet);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/content_info.js
var ContentInfo = class {
	contentType = "";
	content = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], ContentInfo.prototype, "contentType", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 0
})], ContentInfo.prototype, "content", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/encapsulated_content_info.js
var EncapsulatedContent = class EncapsulatedContent {
	single;
	any;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: OctetString })], EncapsulatedContent.prototype, "single", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], EncapsulatedContent.prototype, "any", void 0);
EncapsulatedContent = __decorate([AsnType({ type: AsnTypeTypes.Choice })], EncapsulatedContent);
var EncapsulatedContentInfo = class {
	eContentType = "";
	eContent;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], EncapsulatedContentInfo.prototype, "eContentType", void 0);
__decorate([AsnProp({
	type: EncapsulatedContent,
	context: 0,
	optional: true
})], EncapsulatedContentInfo.prototype, "eContent", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/encrypted_content_info.js
var EncryptedContent = class EncryptedContent {
	value;
	constructedValue;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: OctetString,
	context: 0,
	implicit: true,
	optional: true
})], EncryptedContent.prototype, "value", void 0);
__decorate([AsnProp({
	type: OctetString,
	converter: AsnConstructedOctetStringConverter,
	context: 0,
	implicit: true,
	optional: true,
	repeated: "sequence"
})], EncryptedContent.prototype, "constructedValue", void 0);
EncryptedContent = __decorate([AsnType({ type: AsnTypeTypes.Choice })], EncryptedContent);
var EncryptedContentInfo = class {
	contentType = "";
	contentEncryptionAlgorithm = new ContentEncryptionAlgorithmIdentifier();
	encryptedContent;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], EncryptedContentInfo.prototype, "contentType", void 0);
__decorate([AsnProp({ type: ContentEncryptionAlgorithmIdentifier })], EncryptedContentInfo.prototype, "contentEncryptionAlgorithm", void 0);
__decorate([AsnProp({
	type: EncryptedContent,
	optional: true
})], EncryptedContentInfo.prototype, "encryptedContent", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/other_key_attribute.js
var OtherKeyAttribute = class {
	keyAttrId = "";
	keyAttr;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], OtherKeyAttribute.prototype, "keyAttrId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	optional: true
})], OtherKeyAttribute.prototype, "keyAttr", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/key_agree_recipient_info.js
var RecipientEncryptedKeys_1;
var RecipientKeyIdentifier = class {
	subjectKeyIdentifier = new SubjectKeyIdentifier();
	date;
	other;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: SubjectKeyIdentifier })], RecipientKeyIdentifier.prototype, "subjectKeyIdentifier", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.GeneralizedTime,
	optional: true
})], RecipientKeyIdentifier.prototype, "date", void 0);
__decorate([AsnProp({
	type: OtherKeyAttribute,
	optional: true
})], RecipientKeyIdentifier.prototype, "other", void 0);
var KeyAgreeRecipientIdentifier = class KeyAgreeRecipientIdentifier {
	rKeyId;
	issuerAndSerialNumber;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: RecipientKeyIdentifier,
	context: 0,
	implicit: true,
	optional: true
})], KeyAgreeRecipientIdentifier.prototype, "rKeyId", void 0);
__decorate([AsnProp({
	type: IssuerAndSerialNumber,
	optional: true
})], KeyAgreeRecipientIdentifier.prototype, "issuerAndSerialNumber", void 0);
KeyAgreeRecipientIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Choice })], KeyAgreeRecipientIdentifier);
var RecipientEncryptedKey = class {
	rid = new KeyAgreeRecipientIdentifier();
	encryptedKey = new OctetString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: KeyAgreeRecipientIdentifier })], RecipientEncryptedKey.prototype, "rid", void 0);
__decorate([AsnProp({ type: OctetString })], RecipientEncryptedKey.prototype, "encryptedKey", void 0);
var RecipientEncryptedKeys = RecipientEncryptedKeys_1 = class RecipientEncryptedKeys extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, RecipientEncryptedKeys_1.prototype);
	}
};
RecipientEncryptedKeys = RecipientEncryptedKeys_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: RecipientEncryptedKey
})], RecipientEncryptedKeys);
var OriginatorPublicKey = class {
	algorithm = new AlgorithmIdentifier();
	publicKey = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AlgorithmIdentifier })], OriginatorPublicKey.prototype, "algorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], OriginatorPublicKey.prototype, "publicKey", void 0);
var OriginatorIdentifierOrKey = class OriginatorIdentifierOrKey {
	subjectKeyIdentifier;
	originatorKey;
	issuerAndSerialNumber;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: SubjectKeyIdentifier,
	context: 0,
	implicit: true,
	optional: true
})], OriginatorIdentifierOrKey.prototype, "subjectKeyIdentifier", void 0);
__decorate([AsnProp({
	type: OriginatorPublicKey,
	context: 1,
	implicit: true,
	optional: true
})], OriginatorIdentifierOrKey.prototype, "originatorKey", void 0);
__decorate([AsnProp({
	type: IssuerAndSerialNumber,
	optional: true
})], OriginatorIdentifierOrKey.prototype, "issuerAndSerialNumber", void 0);
OriginatorIdentifierOrKey = __decorate([AsnType({ type: AsnTypeTypes.Choice })], OriginatorIdentifierOrKey);
var KeyAgreeRecipientInfo = class {
	version = CMSVersion.v3;
	originator = new OriginatorIdentifierOrKey();
	ukm;
	keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
	recipientEncryptedKeys = new RecipientEncryptedKeys();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KeyAgreeRecipientInfo.prototype, "version", void 0);
__decorate([AsnProp({
	type: OriginatorIdentifierOrKey,
	context: 0
})], KeyAgreeRecipientInfo.prototype, "originator", void 0);
__decorate([AsnProp({
	type: OctetString,
	context: 1,
	optional: true
})], KeyAgreeRecipientInfo.prototype, "ukm", void 0);
__decorate([AsnProp({ type: KeyEncryptionAlgorithmIdentifier })], KeyAgreeRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([AsnProp({ type: RecipientEncryptedKeys })], KeyAgreeRecipientInfo.prototype, "recipientEncryptedKeys", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/key_trans_recipient_info.js
var RecipientIdentifier = class RecipientIdentifier {
	subjectKeyIdentifier;
	issuerAndSerialNumber;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: SubjectKeyIdentifier,
	context: 0,
	implicit: true
})], RecipientIdentifier.prototype, "subjectKeyIdentifier", void 0);
__decorate([AsnProp({ type: IssuerAndSerialNumber })], RecipientIdentifier.prototype, "issuerAndSerialNumber", void 0);
RecipientIdentifier = __decorate([AsnType({ type: AsnTypeTypes.Choice })], RecipientIdentifier);
var KeyTransRecipientInfo = class {
	version = CMSVersion.v0;
	rid = new RecipientIdentifier();
	keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
	encryptedKey = new OctetString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KeyTransRecipientInfo.prototype, "version", void 0);
__decorate([AsnProp({ type: RecipientIdentifier })], KeyTransRecipientInfo.prototype, "rid", void 0);
__decorate([AsnProp({ type: KeyEncryptionAlgorithmIdentifier })], KeyTransRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([AsnProp({ type: OctetString })], KeyTransRecipientInfo.prototype, "encryptedKey", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/kek_recipient_info.js
var KEKIdentifier = class {
	keyIdentifier = new OctetString();
	date;
	other;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: OctetString })], KEKIdentifier.prototype, "keyIdentifier", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.GeneralizedTime,
	optional: true
})], KEKIdentifier.prototype, "date", void 0);
__decorate([AsnProp({
	type: OtherKeyAttribute,
	optional: true
})], KEKIdentifier.prototype, "other", void 0);
var KEKRecipientInfo = class {
	version = CMSVersion.v4;
	kekid = new KEKIdentifier();
	keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
	encryptedKey = new OctetString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KEKRecipientInfo.prototype, "version", void 0);
__decorate([AsnProp({ type: KEKIdentifier })], KEKRecipientInfo.prototype, "kekid", void 0);
__decorate([AsnProp({ type: KeyEncryptionAlgorithmIdentifier })], KEKRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([AsnProp({ type: OctetString })], KEKRecipientInfo.prototype, "encryptedKey", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/password_recipient_info.js
var PasswordRecipientInfo = class {
	version = CMSVersion.v0;
	keyDerivationAlgorithm;
	keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
	encryptedKey = new OctetString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], PasswordRecipientInfo.prototype, "version", void 0);
__decorate([AsnProp({
	type: KeyDerivationAlgorithmIdentifier,
	context: 0,
	optional: true
})], PasswordRecipientInfo.prototype, "keyDerivationAlgorithm", void 0);
__decorate([AsnProp({ type: KeyEncryptionAlgorithmIdentifier })], PasswordRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([AsnProp({ type: OctetString })], PasswordRecipientInfo.prototype, "encryptedKey", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/recipient_info.js
var OtherRecipientInfo = class {
	oriType = "";
	oriValue = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], OtherRecipientInfo.prototype, "oriType", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], OtherRecipientInfo.prototype, "oriValue", void 0);
var RecipientInfo = class RecipientInfo {
	ktri;
	kari;
	kekri;
	pwri;
	ori;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: KeyTransRecipientInfo,
	optional: true
})], RecipientInfo.prototype, "ktri", void 0);
__decorate([AsnProp({
	type: KeyAgreeRecipientInfo,
	context: 1,
	implicit: true,
	optional: true
})], RecipientInfo.prototype, "kari", void 0);
__decorate([AsnProp({
	type: KEKRecipientInfo,
	context: 2,
	implicit: true,
	optional: true
})], RecipientInfo.prototype, "kekri", void 0);
__decorate([AsnProp({
	type: PasswordRecipientInfo,
	context: 3,
	implicit: true,
	optional: true
})], RecipientInfo.prototype, "pwri", void 0);
__decorate([AsnProp({
	type: OtherRecipientInfo,
	context: 4,
	implicit: true,
	optional: true
})], RecipientInfo.prototype, "ori", void 0);
RecipientInfo = __decorate([AsnType({ type: AsnTypeTypes.Choice })], RecipientInfo);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/recipient_infos.js
var RecipientInfos_1;
var RecipientInfos = RecipientInfos_1 = class RecipientInfos extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, RecipientInfos_1.prototype);
	}
};
RecipientInfos = RecipientInfos_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: RecipientInfo
})], RecipientInfos);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/revocation_info_choice.js
var RevocationInfoChoices_1;
var id_ri = `${id_pkix}.16`;
`${id_ri}`;
`${id_ri}`;
var OtherRevocationInfoFormat = class {
	otherRevInfoFormat = "";
	otherRevInfo = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], OtherRevocationInfoFormat.prototype, "otherRevInfoFormat", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], OtherRevocationInfoFormat.prototype, "otherRevInfo", void 0);
var RevocationInfoChoice = class RevocationInfoChoice {
	other = new OtherRevocationInfoFormat();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: OtherRevocationInfoFormat,
	context: 1,
	implicit: true
})], RevocationInfoChoice.prototype, "other", void 0);
RevocationInfoChoice = __decorate([AsnType({ type: AsnTypeTypes.Choice })], RevocationInfoChoice);
var RevocationInfoChoices = RevocationInfoChoices_1 = class RevocationInfoChoices extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, RevocationInfoChoices_1.prototype);
	}
};
RevocationInfoChoices = RevocationInfoChoices_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: RevocationInfoChoice
})], RevocationInfoChoices);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/originator_info.js
var OriginatorInfo = class {
	certs;
	crls;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: CertificateSet,
	context: 0,
	implicit: true,
	optional: true
})], OriginatorInfo.prototype, "certs", void 0);
__decorate([AsnProp({
	type: RevocationInfoChoices,
	context: 1,
	implicit: true,
	optional: true
})], OriginatorInfo.prototype, "crls", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/enveloped_data.js
var UnprotectedAttributes_1;
var UnprotectedAttributes = UnprotectedAttributes_1 = class UnprotectedAttributes extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, UnprotectedAttributes_1.prototype);
	}
};
UnprotectedAttributes = UnprotectedAttributes_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: Attribute$1
})], UnprotectedAttributes);
var EnvelopedData = class {
	version = CMSVersion.v0;
	originatorInfo;
	recipientInfos = new RecipientInfos();
	encryptedContentInfo = new EncryptedContentInfo();
	unprotectedAttrs;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], EnvelopedData.prototype, "version", void 0);
__decorate([AsnProp({
	type: OriginatorInfo,
	context: 0,
	implicit: true,
	optional: true
})], EnvelopedData.prototype, "originatorInfo", void 0);
__decorate([AsnProp({ type: RecipientInfos })], EnvelopedData.prototype, "recipientInfos", void 0);
__decorate([AsnProp({ type: EncryptedContentInfo })], EnvelopedData.prototype, "encryptedContentInfo", void 0);
__decorate([AsnProp({
	type: UnprotectedAttributes,
	context: 1,
	implicit: true,
	optional: true
})], EnvelopedData.prototype, "unprotectedAttrs", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/object_identifiers.js
var id_signedData = "1.2.840.113549.1.7.2";
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-cms@2.7.0/node_modules/@peculiar/asn1-cms/build/es2015/signed_data.js
var DigestAlgorithmIdentifiers_1;
var DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers_1 = class DigestAlgorithmIdentifiers extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, DigestAlgorithmIdentifiers_1.prototype);
	}
};
DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: DigestAlgorithmIdentifier
})], DigestAlgorithmIdentifiers);
var SignedData = class {
	version = CMSVersion.v0;
	digestAlgorithms = new DigestAlgorithmIdentifiers();
	encapContentInfo = new EncapsulatedContentInfo();
	certificates;
	crls;
	signerInfos = new SignerInfos();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], SignedData.prototype, "version", void 0);
__decorate([AsnProp({ type: DigestAlgorithmIdentifiers })], SignedData.prototype, "digestAlgorithms", void 0);
__decorate([AsnProp({ type: EncapsulatedContentInfo })], SignedData.prototype, "encapContentInfo", void 0);
__decorate([AsnProp({
	type: CertificateSet,
	context: 0,
	implicit: true,
	optional: true
})], SignedData.prototype, "certificates", void 0);
__decorate([AsnProp({
	type: RevocationInfoChoices,
	context: 1,
	implicit: true,
	optional: true
})], SignedData.prototype, "crls", void 0);
__decorate([AsnProp({ type: SignerInfos })], SignedData.prototype, "signerInfos", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-ecc@2.7.0/node_modules/@peculiar/asn1-ecc/build/es2015/object_identifiers.js
var id_ecPublicKey = "1.2.840.10045.2.1";
var id_ecdsaWithSHA1 = "1.2.840.10045.4.1";
var id_ecdsaWithSHA224 = "1.2.840.10045.4.3.1";
var id_ecdsaWithSHA256 = "1.2.840.10045.4.3.2";
var id_ecdsaWithSHA384 = "1.2.840.10045.4.3.3";
var id_ecdsaWithSHA512 = "1.2.840.10045.4.3.4";
var id_secp256r1 = "1.2.840.10045.3.1.7";
var id_secp384r1 = "1.3.132.0.34";
var id_secp521r1 = "1.3.132.0.35";
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-ecc@2.7.0/node_modules/@peculiar/asn1-ecc/build/es2015/algorithms.js
function create$1(algorithm) {
	return new AlgorithmIdentifier({ algorithm });
}
var ecdsaWithSHA1 = create$1(id_ecdsaWithSHA1);
create$1(id_ecdsaWithSHA224);
var ecdsaWithSHA256 = create$1(id_ecdsaWithSHA256);
var ecdsaWithSHA384 = create$1(id_ecdsaWithSHA384);
var ecdsaWithSHA512 = create$1(id_ecdsaWithSHA512);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-ecc@2.7.0/node_modules/@peculiar/asn1-ecc/build/es2015/rfc3279.js
var FieldID = class FieldID {
	fieldType;
	parameters;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], FieldID.prototype, "fieldType", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Any })], FieldID.prototype, "parameters", void 0);
FieldID = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], FieldID);
var ECPoint = class extends OctetString {};
var Curve = class Curve {
	a;
	b;
	seed;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.OctetString })], Curve.prototype, "a", void 0);
__decorate([AsnProp({ type: AsnPropTypes.OctetString })], Curve.prototype, "b", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.BitString,
	optional: true
})], Curve.prototype, "seed", void 0);
Curve = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], Curve);
var ECPVer;
(function(ECPVer) {
	ECPVer[ECPVer["ecpVer1"] = 1] = "ecpVer1";
})(ECPVer || (ECPVer = {}));
var SpecifiedECDomain = class SpecifiedECDomain {
	version = ECPVer.ecpVer1;
	fieldID;
	curve;
	base;
	order;
	cofactor;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], SpecifiedECDomain.prototype, "version", void 0);
__decorate([AsnProp({ type: FieldID })], SpecifiedECDomain.prototype, "fieldID", void 0);
__decorate([AsnProp({ type: Curve })], SpecifiedECDomain.prototype, "curve", void 0);
__decorate([AsnProp({ type: ECPoint })], SpecifiedECDomain.prototype, "base", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], SpecifiedECDomain.prototype, "order", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	optional: true
})], SpecifiedECDomain.prototype, "cofactor", void 0);
SpecifiedECDomain = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], SpecifiedECDomain);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-ecc@2.7.0/node_modules/@peculiar/asn1-ecc/build/es2015/ec_parameters.js
var ECParameters = class ECParameters {
	namedCurve;
	implicitCurve;
	specifiedCurve;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], ECParameters.prototype, "namedCurve", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Null })], ECParameters.prototype, "implicitCurve", void 0);
__decorate([AsnProp({ type: SpecifiedECDomain })], ECParameters.prototype, "specifiedCurve", void 0);
ECParameters = __decorate([AsnType({ type: AsnTypeTypes.Choice })], ECParameters);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-ecc@2.7.0/node_modules/@peculiar/asn1-ecc/build/es2015/ec_private_key.js
var ECPrivateKey = class {
	version = 1;
	privateKey = new OctetString();
	parameters;
	publicKey;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], ECPrivateKey.prototype, "version", void 0);
__decorate([AsnProp({ type: OctetString })], ECPrivateKey.prototype, "privateKey", void 0);
__decorate([AsnProp({
	type: ECParameters,
	context: 0,
	optional: true
})], ECPrivateKey.prototype, "parameters", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.BitString,
	context: 1,
	optional: true
})], ECPrivateKey.prototype, "publicKey", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-ecc@2.7.0/node_modules/@peculiar/asn1-ecc/build/es2015/ec_signature_value.js
var ECDSASigValue = class {
	r = /* @__PURE__ */ new ArrayBuffer(0);
	s = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], ECDSASigValue.prototype, "r", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], ECDSASigValue.prototype, "s", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/object_identifiers.js
var id_pkcs_1 = "1.2.840.113549.1.1";
var id_rsaEncryption = `${id_pkcs_1}.1`;
var id_RSAES_OAEP = `${id_pkcs_1}.7`;
var id_pSpecified = `${id_pkcs_1}.9`;
var id_RSASSA_PSS = `${id_pkcs_1}.10`;
var id_md2WithRSAEncryption = `${id_pkcs_1}.2`;
var id_md5WithRSAEncryption = `${id_pkcs_1}.4`;
var id_sha1WithRSAEncryption = `${id_pkcs_1}.5`;
var id_sha224WithRSAEncryption = `${id_pkcs_1}.14`;
var id_sha256WithRSAEncryption = `${id_pkcs_1}.11`;
var id_sha384WithRSAEncryption = `${id_pkcs_1}.12`;
var id_sha512WithRSAEncryption = `${id_pkcs_1}.13`;
var id_sha512_224WithRSAEncryption = `${id_pkcs_1}.15`;
var id_sha512_256WithRSAEncryption = `${id_pkcs_1}.16`;
var id_sha1 = "1.3.14.3.2.26";
var id_sha224 = "2.16.840.1.101.3.4.2.4";
var id_sha256 = "2.16.840.1.101.3.4.2.1";
var id_sha384 = "2.16.840.1.101.3.4.2.2";
var id_sha512 = "2.16.840.1.101.3.4.2.3";
var id_sha512_224 = "2.16.840.1.101.3.4.2.5";
var id_sha512_256 = "2.16.840.1.101.3.4.2.6";
var id_md2 = "1.2.840.113549.2.2";
var id_md5 = "1.2.840.113549.2.5";
var id_mgf1 = `${id_pkcs_1}.8`;
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/algorithms.js
function create(algorithm) {
	return new AlgorithmIdentifier({
		algorithm,
		parameters: null
	});
}
create(id_md2);
create(id_md5);
var sha1 = create(id_sha1);
create(id_sha224);
create(id_sha256);
create(id_sha384);
create(id_sha512);
create(id_sha512_224);
create(id_sha512_256);
var mgf1SHA1 = new AlgorithmIdentifier({
	algorithm: id_mgf1,
	parameters: AsnConvert.serialize(sha1)
});
var pSpecifiedEmpty = new AlgorithmIdentifier({
	algorithm: id_pSpecified,
	parameters: AsnConvert.serialize(AsnOctetStringConverter.toASN(new Uint8Array([
		218,
		57,
		163,
		238,
		94,
		107,
		75,
		13,
		50,
		85,
		191,
		239,
		149,
		96,
		24,
		144,
		175,
		216,
		7,
		9
	]).buffer))
});
create(id_rsaEncryption);
create(id_md2WithRSAEncryption);
create(id_md5WithRSAEncryption);
create(id_sha1WithRSAEncryption);
create(id_sha512_224WithRSAEncryption);
create(id_sha512_256WithRSAEncryption);
create(id_sha384WithRSAEncryption);
create(id_sha512WithRSAEncryption);
create(id_sha512_224WithRSAEncryption);
create(id_sha512_256WithRSAEncryption);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsaes_oaep.js
var RsaEsOaepParams = class {
	hashAlgorithm = new AlgorithmIdentifier(sha1);
	maskGenAlgorithm = new AlgorithmIdentifier({
		algorithm: id_mgf1,
		parameters: AsnConvert.serialize(sha1)
	});
	pSourceAlgorithm = new AlgorithmIdentifier(pSpecifiedEmpty);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AlgorithmIdentifier,
	context: 0,
	defaultValue: sha1
})], RsaEsOaepParams.prototype, "hashAlgorithm", void 0);
__decorate([AsnProp({
	type: AlgorithmIdentifier,
	context: 1,
	defaultValue: mgf1SHA1
})], RsaEsOaepParams.prototype, "maskGenAlgorithm", void 0);
__decorate([AsnProp({
	type: AlgorithmIdentifier,
	context: 2,
	defaultValue: pSpecifiedEmpty
})], RsaEsOaepParams.prototype, "pSourceAlgorithm", void 0);
new AlgorithmIdentifier({
	algorithm: id_RSAES_OAEP,
	parameters: AsnConvert.serialize(new RsaEsOaepParams())
});
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pss.js
var RsaSaPssParams = class {
	hashAlgorithm = new AlgorithmIdentifier(sha1);
	maskGenAlgorithm = new AlgorithmIdentifier({
		algorithm: id_mgf1,
		parameters: AsnConvert.serialize(sha1)
	});
	saltLength = 20;
	trailerField = 1;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AlgorithmIdentifier,
	context: 0,
	defaultValue: sha1
})], RsaSaPssParams.prototype, "hashAlgorithm", void 0);
__decorate([AsnProp({
	type: AlgorithmIdentifier,
	context: 1,
	defaultValue: mgf1SHA1
})], RsaSaPssParams.prototype, "maskGenAlgorithm", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 2,
	defaultValue: 20
})], RsaSaPssParams.prototype, "saltLength", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	context: 3,
	defaultValue: 1
})], RsaSaPssParams.prototype, "trailerField", void 0);
new AlgorithmIdentifier({
	algorithm: id_RSASSA_PSS,
	parameters: AsnConvert.serialize(new RsaSaPssParams())
});
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pkcs1_v1_5.js
var DigestInfo = class {
	digestAlgorithm = new AlgorithmIdentifier();
	digest = new OctetString();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AlgorithmIdentifier })], DigestInfo.prototype, "digestAlgorithm", void 0);
__decorate([AsnProp({ type: OctetString })], DigestInfo.prototype, "digest", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/other_prime_info.js
var OtherPrimeInfos_1;
var OtherPrimeInfo = class {
	prime = /* @__PURE__ */ new ArrayBuffer(0);
	exponent = /* @__PURE__ */ new ArrayBuffer(0);
	coefficient = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], OtherPrimeInfo.prototype, "prime", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], OtherPrimeInfo.prototype, "exponent", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], OtherPrimeInfo.prototype, "coefficient", void 0);
var OtherPrimeInfos = OtherPrimeInfos_1 = class OtherPrimeInfos extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, OtherPrimeInfos_1.prototype);
	}
};
OtherPrimeInfos = OtherPrimeInfos_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: OtherPrimeInfo
})], OtherPrimeInfos);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_private_key.js
var RSAPrivateKey = class {
	version = 0;
	modulus = /* @__PURE__ */ new ArrayBuffer(0);
	publicExponent = /* @__PURE__ */ new ArrayBuffer(0);
	privateExponent = /* @__PURE__ */ new ArrayBuffer(0);
	prime1 = /* @__PURE__ */ new ArrayBuffer(0);
	prime2 = /* @__PURE__ */ new ArrayBuffer(0);
	exponent1 = /* @__PURE__ */ new ArrayBuffer(0);
	exponent2 = /* @__PURE__ */ new ArrayBuffer(0);
	coefficient = /* @__PURE__ */ new ArrayBuffer(0);
	otherPrimeInfos;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], RSAPrivateKey.prototype, "version", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "modulus", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "publicExponent", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "privateExponent", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "prime1", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "prime2", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "exponent1", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "exponent2", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPrivateKey.prototype, "coefficient", void 0);
__decorate([AsnProp({
	type: OtherPrimeInfos,
	optional: true
})], RSAPrivateKey.prototype, "otherPrimeInfos", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-rsa@2.7.0/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_public_key.js
var RSAPublicKey = class {
	modulus = /* @__PURE__ */ new ArrayBuffer(0);
	publicExponent = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPublicKey.prototype, "modulus", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	converter: AsnIntegerArrayBufferConverter
})], RSAPublicKey.prototype, "publicExponent", void 0);
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/types/lifecycle.js
var Lifecycle;
(function(Lifecycle) {
	Lifecycle[Lifecycle["Transient"] = 0] = "Transient";
	Lifecycle[Lifecycle["Singleton"] = 1] = "Singleton";
	Lifecycle[Lifecycle["ResolutionScoped"] = 2] = "ResolutionScoped";
	Lifecycle[Lifecycle["ContainerScoped"] = 3] = "ContainerScoped";
})(Lifecycle || (Lifecycle = {}));
var lifecycle_default = Lifecycle;
function getParamInfo(target) {
	var params = Reflect.getMetadata("design:paramtypes", target) || [];
	var injectionTokens = Reflect.getOwnMetadata("injectionTokens", target) || {};
	Object.keys(injectionTokens).forEach(function(key) {
		params[+key] = injectionTokens[key];
	});
	return params;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/providers/class-provider.js
function isClassProvider(provider) {
	return !!provider.useClass;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/providers/factory-provider.js
function isFactoryProvider(provider) {
	return !!provider.useFactory;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/lazy-helpers.js
var DelayedConstructor = function() {
	function DelayedConstructor(wrap) {
		this.wrap = wrap;
		this.reflectMethods = [
			"get",
			"getPrototypeOf",
			"setPrototypeOf",
			"getOwnPropertyDescriptor",
			"defineProperty",
			"has",
			"set",
			"deleteProperty",
			"apply",
			"construct",
			"ownKeys"
		];
	}
	DelayedConstructor.prototype.createProxy = function(createObject) {
		var _this = this;
		var target = {};
		var init = false;
		var value;
		var delayedObject = function() {
			if (!init) {
				value = createObject(_this.wrap());
				init = true;
			}
			return value;
		};
		return new Proxy(target, this.createHandler(delayedObject));
	};
	DelayedConstructor.prototype.createHandler = function(delayedObject) {
		var handler = {};
		var install = function(name) {
			handler[name] = function() {
				var args = [];
				for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
				args[0] = delayedObject();
				return Reflect[name].apply(void 0, __spread(args));
			};
		};
		this.reflectMethods.forEach(install);
		return handler;
	};
	return DelayedConstructor;
}();
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/providers/injection-token.js
function isNormalToken(token) {
	return typeof token === "string" || typeof token === "symbol";
}
function isTokenDescriptor(descriptor) {
	return typeof descriptor === "object" && "token" in descriptor && "multiple" in descriptor;
}
function isTransformDescriptor(descriptor) {
	return typeof descriptor === "object" && "token" in descriptor && "transform" in descriptor;
}
function isConstructorToken(token) {
	return typeof token === "function" || token instanceof DelayedConstructor;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/providers/token-provider.js
function isTokenProvider(provider) {
	return !!provider.useToken;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/providers/value-provider.js
function isValueProvider(provider) {
	return provider.useValue != void 0;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/providers/provider.js
function isProvider(provider) {
	return isClassProvider(provider) || isValueProvider(provider) || isTokenProvider(provider) || isFactoryProvider(provider);
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/registry-base.js
var RegistryBase = function() {
	function RegistryBase() {
		this._registryMap = /* @__PURE__ */ new Map();
	}
	RegistryBase.prototype.entries = function() {
		return this._registryMap.entries();
	};
	RegistryBase.prototype.getAll = function(key) {
		this.ensure(key);
		return this._registryMap.get(key);
	};
	RegistryBase.prototype.get = function(key) {
		this.ensure(key);
		var value = this._registryMap.get(key);
		return value[value.length - 1] || null;
	};
	RegistryBase.prototype.set = function(key, value) {
		this.ensure(key);
		this._registryMap.get(key).push(value);
	};
	RegistryBase.prototype.setAll = function(key, value) {
		this._registryMap.set(key, value);
	};
	RegistryBase.prototype.has = function(key) {
		this.ensure(key);
		return this._registryMap.get(key).length > 0;
	};
	RegistryBase.prototype.clear = function() {
		this._registryMap.clear();
	};
	RegistryBase.prototype.ensure = function(key) {
		if (!this._registryMap.has(key)) this._registryMap.set(key, []);
	};
	return RegistryBase;
}();
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/registry.js
var Registry = function(_super) {
	__extends(Registry, _super);
	function Registry() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return Registry;
}(RegistryBase);
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/resolution-context.js
var ResolutionContext = function() {
	function ResolutionContext() {
		this.scopedResolutions = /* @__PURE__ */ new Map();
	}
	return ResolutionContext;
}();
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/error-helpers.js
function formatDependency(params, idx) {
	if (params === null) return "at position #" + idx;
	return "\"" + params.split(",")[idx].trim() + "\" at position #" + idx;
}
function composeErrorMessage(msg, e, indent) {
	if (indent === void 0) indent = "    ";
	return __spread([msg], e.message.split("\n").map(function(l) {
		return indent + l;
	})).join("\n");
}
function formatErrorCtor(ctor, paramIdx, error) {
	var _b = __read(ctor.toString().match(/constructor\(([\w, ]+)\)/) || [], 2)[1];
	return composeErrorMessage("Cannot inject the dependency " + formatDependency(_b === void 0 ? null : _b, paramIdx) + " of \"" + ctor.name + "\" constructor. Reason:", error);
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/types/disposable.js
function isDisposable(value) {
	if (typeof value.dispose !== "function") return false;
	if (value.dispose.length > 0) return false;
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/interceptors.js
var PreResolutionInterceptors = function(_super) {
	__extends(PreResolutionInterceptors, _super);
	function PreResolutionInterceptors() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return PreResolutionInterceptors;
}(RegistryBase);
var PostResolutionInterceptors = function(_super) {
	__extends(PostResolutionInterceptors, _super);
	function PostResolutionInterceptors() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return PostResolutionInterceptors;
}(RegistryBase);
var Interceptors = function() {
	function Interceptors() {
		this.preResolution = new PreResolutionInterceptors();
		this.postResolution = new PostResolutionInterceptors();
	}
	return Interceptors;
}();
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/dependency-container.js
var typeInfo = /* @__PURE__ */ new Map();
var instance = new (function() {
	function InternalDependencyContainer(parent) {
		this.parent = parent;
		this._registry = new Registry();
		this.interceptors = new Interceptors();
		this.disposed = false;
		this.disposables = /* @__PURE__ */ new Set();
	}
	InternalDependencyContainer.prototype.register = function(token, providerOrConstructor, options) {
		if (options === void 0) options = { lifecycle: lifecycle_default.Transient };
		this.ensureNotDisposed();
		var provider;
		if (!isProvider(providerOrConstructor)) provider = { useClass: providerOrConstructor };
		else provider = providerOrConstructor;
		if (isTokenProvider(provider)) {
			var path = [token];
			var tokenProvider = provider;
			while (tokenProvider != null) {
				var currentToken = tokenProvider.useToken;
				if (path.includes(currentToken)) throw new Error("Token registration cycle detected! " + __spread(path, [currentToken]).join(" -> "));
				path.push(currentToken);
				var registration = this._registry.get(currentToken);
				if (registration && isTokenProvider(registration.provider)) tokenProvider = registration.provider;
				else tokenProvider = null;
			}
		}
		if (options.lifecycle === lifecycle_default.Singleton || options.lifecycle == lifecycle_default.ContainerScoped || options.lifecycle == lifecycle_default.ResolutionScoped) {
			if (isValueProvider(provider) || isFactoryProvider(provider)) throw new Error("Cannot use lifecycle \"" + lifecycle_default[options.lifecycle] + "\" with ValueProviders or FactoryProviders");
		}
		this._registry.set(token, {
			provider,
			options
		});
		return this;
	};
	InternalDependencyContainer.prototype.registerType = function(from, to) {
		this.ensureNotDisposed();
		if (isNormalToken(to)) return this.register(from, { useToken: to });
		return this.register(from, { useClass: to });
	};
	InternalDependencyContainer.prototype.registerInstance = function(token, instance) {
		this.ensureNotDisposed();
		return this.register(token, { useValue: instance });
	};
	InternalDependencyContainer.prototype.registerSingleton = function(from, to) {
		this.ensureNotDisposed();
		if (isNormalToken(from)) {
			if (isNormalToken(to)) return this.register(from, { useToken: to }, { lifecycle: lifecycle_default.Singleton });
			else if (to) return this.register(from, { useClass: to }, { lifecycle: lifecycle_default.Singleton });
			throw new Error("Cannot register a type name as a singleton without a \"to\" token");
		}
		var useClass = from;
		if (to && !isNormalToken(to)) useClass = to;
		return this.register(from, { useClass }, { lifecycle: lifecycle_default.Singleton });
	};
	InternalDependencyContainer.prototype.resolve = function(token, context, isOptional) {
		if (context === void 0) context = new ResolutionContext();
		if (isOptional === void 0) isOptional = false;
		this.ensureNotDisposed();
		var registration = this.getRegistration(token);
		if (!registration && isNormalToken(token)) {
			if (isOptional) return;
			throw new Error("Attempted to resolve unregistered dependency token: \"" + token.toString() + "\"");
		}
		this.executePreResolutionInterceptor(token, "Single");
		if (registration) {
			var result = this.resolveRegistration(registration, context);
			this.executePostResolutionInterceptor(token, result, "Single");
			return result;
		}
		if (isConstructorToken(token)) {
			var result = this.construct(token, context);
			this.executePostResolutionInterceptor(token, result, "Single");
			return result;
		}
		throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.");
	};
	InternalDependencyContainer.prototype.executePreResolutionInterceptor = function(token, resolutionType) {
		var e_1, _a;
		if (this.interceptors.preResolution.has(token)) {
			var remainingInterceptors = [];
			try {
				for (var _b = __values(this.interceptors.preResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()) {
					var interceptor = _c.value;
					if (interceptor.options.frequency != "Once") remainingInterceptors.push(interceptor);
					interceptor.callback(token, resolutionType);
				}
			} catch (e_1_1) {
				e_1 = { error: e_1_1 };
			} finally {
				try {
					if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
				} finally {
					if (e_1) throw e_1.error;
				}
			}
			this.interceptors.preResolution.setAll(token, remainingInterceptors);
		}
	};
	InternalDependencyContainer.prototype.executePostResolutionInterceptor = function(token, result, resolutionType) {
		var e_2, _a;
		if (this.interceptors.postResolution.has(token)) {
			var remainingInterceptors = [];
			try {
				for (var _b = __values(this.interceptors.postResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()) {
					var interceptor = _c.value;
					if (interceptor.options.frequency != "Once") remainingInterceptors.push(interceptor);
					interceptor.callback(token, result, resolutionType);
				}
			} catch (e_2_1) {
				e_2 = { error: e_2_1 };
			} finally {
				try {
					if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
				} finally {
					if (e_2) throw e_2.error;
				}
			}
			this.interceptors.postResolution.setAll(token, remainingInterceptors);
		}
	};
	InternalDependencyContainer.prototype.resolveRegistration = function(registration, context) {
		this.ensureNotDisposed();
		if (registration.options.lifecycle === lifecycle_default.ResolutionScoped && context.scopedResolutions.has(registration)) return context.scopedResolutions.get(registration);
		var isSingleton = registration.options.lifecycle === lifecycle_default.Singleton;
		var isContainerScoped = registration.options.lifecycle === lifecycle_default.ContainerScoped;
		var returnInstance = isSingleton || isContainerScoped;
		var resolved;
		if (isValueProvider(registration.provider)) resolved = registration.provider.useValue;
		else if (isTokenProvider(registration.provider)) resolved = returnInstance ? registration.instance || (registration.instance = this.resolve(registration.provider.useToken, context)) : this.resolve(registration.provider.useToken, context);
		else if (isClassProvider(registration.provider)) resolved = returnInstance ? registration.instance || (registration.instance = this.construct(registration.provider.useClass, context)) : this.construct(registration.provider.useClass, context);
		else if (isFactoryProvider(registration.provider)) resolved = registration.provider.useFactory(this);
		else resolved = this.construct(registration.provider, context);
		if (registration.options.lifecycle === lifecycle_default.ResolutionScoped) context.scopedResolutions.set(registration, resolved);
		return resolved;
	};
	InternalDependencyContainer.prototype.resolveAll = function(token, context, isOptional) {
		var _this = this;
		if (context === void 0) context = new ResolutionContext();
		if (isOptional === void 0) isOptional = false;
		this.ensureNotDisposed();
		var registrations = this.getAllRegistrations(token);
		if (!registrations && isNormalToken(token)) {
			if (isOptional) return [];
			throw new Error("Attempted to resolve unregistered dependency token: \"" + token.toString() + "\"");
		}
		this.executePreResolutionInterceptor(token, "All");
		if (registrations) {
			var result_1 = registrations.map(function(item) {
				return _this.resolveRegistration(item, context);
			});
			this.executePostResolutionInterceptor(token, result_1, "All");
			return result_1;
		}
		var result = [this.construct(token, context)];
		this.executePostResolutionInterceptor(token, result, "All");
		return result;
	};
	InternalDependencyContainer.prototype.isRegistered = function(token, recursive) {
		if (recursive === void 0) recursive = false;
		this.ensureNotDisposed();
		return this._registry.has(token) || recursive && (this.parent || false) && this.parent.isRegistered(token, true);
	};
	InternalDependencyContainer.prototype.reset = function() {
		this.ensureNotDisposed();
		this._registry.clear();
		this.interceptors.preResolution.clear();
		this.interceptors.postResolution.clear();
	};
	InternalDependencyContainer.prototype.clearInstances = function() {
		var e_3, _a;
		this.ensureNotDisposed();
		try {
			for (var _b = __values(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
				var _d = __read(_c.value, 2), token = _d[0], registrations = _d[1];
				this._registry.setAll(token, registrations.filter(function(registration) {
					return !isValueProvider(registration.provider);
				}).map(function(registration) {
					registration.instance = void 0;
					return registration;
				}));
			}
		} catch (e_3_1) {
			e_3 = { error: e_3_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_3) throw e_3.error;
			}
		}
	};
	InternalDependencyContainer.prototype.createChildContainer = function() {
		var e_4, _a;
		this.ensureNotDisposed();
		var childContainer = new InternalDependencyContainer(this);
		try {
			for (var _b = __values(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
				var _d = __read(_c.value, 2), token = _d[0], registrations = _d[1];
				if (registrations.some(function(_a) {
					return _a.options.lifecycle === lifecycle_default.ContainerScoped;
				})) childContainer._registry.setAll(token, registrations.map(function(registration) {
					if (registration.options.lifecycle === lifecycle_default.ContainerScoped) return {
						provider: registration.provider,
						options: registration.options
					};
					return registration;
				}));
			}
		} catch (e_4_1) {
			e_4 = { error: e_4_1 };
		} finally {
			try {
				if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
			} finally {
				if (e_4) throw e_4.error;
			}
		}
		return childContainer;
	};
	InternalDependencyContainer.prototype.beforeResolution = function(token, callback, options) {
		if (options === void 0) options = { frequency: "Always" };
		this.interceptors.preResolution.set(token, {
			callback,
			options
		});
	};
	InternalDependencyContainer.prototype.afterResolution = function(token, callback, options) {
		if (options === void 0) options = { frequency: "Always" };
		this.interceptors.postResolution.set(token, {
			callback,
			options
		});
	};
	InternalDependencyContainer.prototype.dispose = function() {
		return __awaiter(this, void 0, void 0, function() {
			var promises;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						this.disposed = true;
						promises = [];
						this.disposables.forEach(function(disposable) {
							var maybePromise = disposable.dispose();
							if (maybePromise) promises.push(maybePromise);
						});
						return [4, Promise.all(promises)];
					case 1:
						_a.sent();
						return [2];
				}
			});
		});
	};
	InternalDependencyContainer.prototype.getRegistration = function(token) {
		if (this.isRegistered(token)) return this._registry.get(token);
		if (this.parent) return this.parent.getRegistration(token);
		return null;
	};
	InternalDependencyContainer.prototype.getAllRegistrations = function(token) {
		if (this.isRegistered(token)) return this._registry.getAll(token);
		if (this.parent) return this.parent.getAllRegistrations(token);
		return null;
	};
	InternalDependencyContainer.prototype.construct = function(ctor, context) {
		var _this = this;
		if (ctor instanceof DelayedConstructor) return ctor.createProxy(function(target) {
			return _this.resolve(target, context);
		});
		var instance = (function() {
			var paramInfo = typeInfo.get(ctor);
			if (!paramInfo || paramInfo.length === 0) if (ctor.length === 0) return new ctor();
			else throw new Error("TypeInfo not known for \"" + ctor.name + "\"");
			var params = paramInfo.map(_this.resolveParams(context, ctor));
			return new (ctor.bind.apply(ctor, __spread([void 0], params)))();
		})();
		if (isDisposable(instance)) this.disposables.add(instance);
		return instance;
	};
	InternalDependencyContainer.prototype.resolveParams = function(context, ctor) {
		var _this = this;
		return function(param, idx) {
			var _a, _b, _c;
			try {
				if (isTokenDescriptor(param)) if (isTransformDescriptor(param)) return param.multiple ? (_a = _this.resolve(param.transform)).transform.apply(_a, __spread([_this.resolveAll(param.token, new ResolutionContext(), param.isOptional)], param.transformArgs)) : (_b = _this.resolve(param.transform)).transform.apply(_b, __spread([_this.resolve(param.token, context, param.isOptional)], param.transformArgs));
				else return param.multiple ? _this.resolveAll(param.token, new ResolutionContext(), param.isOptional) : _this.resolve(param.token, context, param.isOptional);
				else if (isTransformDescriptor(param)) return (_c = _this.resolve(param.transform, context)).transform.apply(_c, __spread([_this.resolve(param.token, context)], param.transformArgs));
				return _this.resolve(param, context);
			} catch (e) {
				throw new Error(formatErrorCtor(ctor, idx, e));
			}
		};
	};
	InternalDependencyContainer.prototype.ensureNotDisposed = function() {
		if (this.disposed) throw new Error("This container has been disposed, you cannot interact with a disposed container");
	};
	return InternalDependencyContainer;
}())();
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/decorators/injectable.js
function injectable(options) {
	return function(target) {
		typeInfo.set(target, getParamInfo(target));
		if (options && options.token) if (!Array.isArray(options.token)) instance.register(options.token, target);
		else options.token.forEach(function(token) {
			instance.register(token, target);
		});
	};
}
//#endregion
//#region ../../node_modules/.pnpm/tsyringe@4.10.0/node_modules/tsyringe/dist/esm5/index.js
if (typeof Reflect === "undefined" || !Reflect.getMetadata) throw new Error("tsyringe requires a reflect polyfill. Please add 'import \"reflect-metadata\"' to the top of your entry point.");
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/attribute.js
var PKCS12AttrSet_1;
var PKCS12Attribute = class {
	attrId = "";
	attrValues = [];
	constructor(params = {}) {
		Object.assign(params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], PKCS12Attribute.prototype, "attrId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	repeated: "set"
})], PKCS12Attribute.prototype, "attrValues", void 0);
var PKCS12AttrSet = PKCS12AttrSet_1 = class PKCS12AttrSet extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, PKCS12AttrSet_1.prototype);
	}
};
PKCS12AttrSet = PKCS12AttrSet_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: PKCS12Attribute
})], PKCS12AttrSet);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/authenticated_safe.js
var AuthenticatedSafe_1;
var AuthenticatedSafe = AuthenticatedSafe_1 = class AuthenticatedSafe extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, AuthenticatedSafe_1.prototype);
	}
};
AuthenticatedSafe = AuthenticatedSafe_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: ContentInfo
})], AuthenticatedSafe);
var id_pkcs_12 = `1.2.840.113549.1.12`;
var id_pkcs_12PbeIds = `${id_pkcs_12}.1`;
`${id_pkcs_12PbeIds}`;
`${id_pkcs_12PbeIds}`;
`${id_pkcs_12PbeIds}`;
`${id_pkcs_12PbeIds}`;
`${id_pkcs_12PbeIds}`;
`${id_pkcs_12PbeIds}`;
var id_bagtypes = `${id_pkcs_12}.10.1`;
`${id_bagtypes}`;
`${id_bagtypes}`;
`${id_bagtypes}`;
`${id_bagtypes}`;
`${id_bagtypes}`;
`${id_bagtypes}`;
var id_pkcs_9 = "1.2.840.113549.1.9";
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/bags/cert_bag.js
var CertBag = class {
	certId = "";
	certValue = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], CertBag.prototype, "certId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 0
})], CertBag.prototype, "certValue", void 0);
var id_certTypes$1 = `${id_pkcs_9}.22`;
`${id_certTypes$1}`;
`${id_certTypes$1}`;
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/bags/crl_bag.js
var CRLBag = class {
	crlId = "";
	crltValue = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], CRLBag.prototype, "crlId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 0
})], CRLBag.prototype, "crltValue", void 0);
`${id_pkcs_9}`;
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pkcs8@2.7.0/node_modules/@peculiar/asn1-pkcs8/build/es2015/encrypted_private_key_info.js
var EncryptedData = class extends OctetString {};
var EncryptedPrivateKeyInfo$1 = class {
	encryptionAlgorithm = new AlgorithmIdentifier();
	encryptedData = new EncryptedData();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AlgorithmIdentifier })], EncryptedPrivateKeyInfo$1.prototype, "encryptionAlgorithm", void 0);
__decorate([AsnProp({ type: EncryptedData })], EncryptedPrivateKeyInfo$1.prototype, "encryptedData", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pkcs8@2.7.0/node_modules/@peculiar/asn1-pkcs8/build/es2015/private_key_info.js
var Attributes_1$1;
var Version$1;
(function(Version) {
	Version[Version["v1"] = 0] = "v1";
})(Version$1 || (Version$1 = {}));
var PrivateKey = class extends OctetString {};
var Attributes$1 = Attributes_1$1 = class Attributes extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, Attributes_1$1.prototype);
	}
};
Attributes$1 = Attributes_1$1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: Attribute$2
})], Attributes$1);
var PrivateKeyInfo = class {
	version = Version$1.v1;
	privateKeyAlgorithm = new AlgorithmIdentifier();
	privateKey = new PrivateKey();
	attributes;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], PrivateKeyInfo.prototype, "version", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], PrivateKeyInfo.prototype, "privateKeyAlgorithm", void 0);
__decorate([AsnProp({ type: PrivateKey })], PrivateKeyInfo.prototype, "privateKey", void 0);
__decorate([AsnProp({
	type: Attributes$1,
	implicit: true,
	context: 0,
	optional: true
})], PrivateKeyInfo.prototype, "attributes", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/bags/key_bag.js
var KeyBag = class KeyBag extends PrivateKeyInfo {};
KeyBag = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], KeyBag);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/bags/pkcs8_shrouded_key_bag.js
var PKCS8ShroudedKeyBag = class PKCS8ShroudedKeyBag extends EncryptedPrivateKeyInfo$1 {};
PKCS8ShroudedKeyBag = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], PKCS8ShroudedKeyBag);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/bags/secret_bag.js
var SecretBag = class {
	secretTypeId = "";
	secretValue = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], SecretBag.prototype, "secretTypeId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 0
})], SecretBag.prototype, "secretValue", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/mac_data.js
var MacData = class {
	mac = new DigestInfo();
	macSalt = new OctetString();
	iterations = 1;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: DigestInfo })], MacData.prototype, "mac", void 0);
__decorate([AsnProp({ type: OctetString })], MacData.prototype, "macSalt", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Integer,
	defaultValue: 1
})], MacData.prototype, "iterations", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/pfx.js
var PFX = class {
	version = 3;
	authSafe = new ContentInfo();
	macData = new MacData();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], PFX.prototype, "version", void 0);
__decorate([AsnProp({ type: ContentInfo })], PFX.prototype, "authSafe", void 0);
__decorate([AsnProp({
	type: MacData,
	optional: true
})], PFX.prototype, "macData", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pfx@2.7.0/node_modules/@peculiar/asn1-pfx/build/es2015/safe_bag.js
var SafeContents_1;
var SafeBag = class {
	bagId = "";
	bagValue = /* @__PURE__ */ new ArrayBuffer(0);
	bagAttributes;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], SafeBag.prototype, "bagId", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.Any,
	context: 0
})], SafeBag.prototype, "bagValue", void 0);
__decorate([AsnProp({
	type: PKCS12Attribute,
	repeated: "set",
	optional: true
})], SafeBag.prototype, "bagAttributes", void 0);
var SafeContents = SafeContents_1 = class SafeContents extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, SafeContents_1.prototype);
	}
};
SafeContents = SafeContents_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: SafeBag
})], SafeContents);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-pkcs9@2.7.0/node_modules/@peculiar/asn1-pkcs9/build/es2015/index.js
var ExtensionRequest_1, ExtendedCertificateAttributes_1, SMIMECapabilities_1;
var id_pkcs9 = "1.2.840.113549.1.9";
`${id_pkcs9}`;
var id_pkcs9_oc = `${id_pkcs9}.24`;
var id_pkcs9_at = `${id_pkcs9}.25`;
var id_pkcs9_sx = `${id_pkcs9}.26`;
var id_pkcs9_mr = `${id_pkcs9}.27`;
`${id_pkcs9_oc}`;
`${id_pkcs9_oc}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
var id_pkcs9_at_challengePassword = `${id_pkcs9}.7`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
var id_pkcs9_at_extensionRequest = `${id_pkcs9}.14`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9_at}`;
`${id_pkcs9_at}`;
`${id_pkcs9_at}`;
`${id_pkcs9_at}`;
`${id_pkcs9_at}`;
var id_ietf_at = "1.3.6.1.5.5.7.9";
`${id_ietf_at}`;
`${id_ietf_at}`;
`${id_ietf_at}`;
`${id_ietf_at}`;
`${id_ietf_at}`;
`${id_pkcs9_sx}`;
`${id_pkcs9_sx}`;
`${id_pkcs9_mr}`;
`${id_pkcs9_mr}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_pkcs9}`;
`${id_at}`;
var PKCS9String = class PKCS9String extends DirectoryString {
	ia5String;
	constructor(params = {}) {
		super(params);
	}
	toString() {
		({}).toString();
		return this.ia5String || super.toString();
	}
};
__decorate([AsnProp({ type: AsnPropTypes.IA5String })], PKCS9String.prototype, "ia5String", void 0);
PKCS9String = __decorate([AsnType({ type: AsnTypeTypes.Choice })], PKCS9String);
var Pkcs7PDU = class Pkcs7PDU extends ContentInfo {};
Pkcs7PDU = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], Pkcs7PDU);
var UserPKCS12 = class UserPKCS12 extends PFX {};
UserPKCS12 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], UserPKCS12);
var EncryptedPrivateKeyInfo = class EncryptedPrivateKeyInfo extends EncryptedPrivateKeyInfo$1 {};
EncryptedPrivateKeyInfo = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], EncryptedPrivateKeyInfo);
var EmailAddress = class EmailAddress {
	value;
	constructor(value = "") {
		this.value = value;
	}
	toString() {
		return this.value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.IA5String })], EmailAddress.prototype, "value", void 0);
EmailAddress = __decorate([AsnType({ type: AsnTypeTypes.Choice })], EmailAddress);
var UnstructuredName = class UnstructuredName extends PKCS9String {};
UnstructuredName = __decorate([AsnType({ type: AsnTypeTypes.Choice })], UnstructuredName);
var UnstructuredAddress = class UnstructuredAddress extends DirectoryString {};
UnstructuredAddress = __decorate([AsnType({ type: AsnTypeTypes.Choice })], UnstructuredAddress);
var DateOfBirth = class DateOfBirth {
	value;
	constructor(value = /* @__PURE__ */ new Date()) {
		this.value = value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.GeneralizedTime })], DateOfBirth.prototype, "value", void 0);
DateOfBirth = __decorate([AsnType({ type: AsnTypeTypes.Choice })], DateOfBirth);
var PlaceOfBirth = class PlaceOfBirth extends DirectoryString {};
PlaceOfBirth = __decorate([AsnType({ type: AsnTypeTypes.Choice })], PlaceOfBirth);
var Gender = class Gender {
	value;
	constructor(value = "M") {
		this.value = value;
	}
	toString() {
		return this.value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.PrintableString })], Gender.prototype, "value", void 0);
Gender = __decorate([AsnType({ type: AsnTypeTypes.Choice })], Gender);
var CountryOfCitizenship = class CountryOfCitizenship {
	value;
	constructor(value = "") {
		this.value = value;
	}
	toString() {
		return this.value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.PrintableString })], CountryOfCitizenship.prototype, "value", void 0);
CountryOfCitizenship = __decorate([AsnType({ type: AsnTypeTypes.Choice })], CountryOfCitizenship);
var CountryOfResidence = class CountryOfResidence extends CountryOfCitizenship {};
CountryOfResidence = __decorate([AsnType({ type: AsnTypeTypes.Choice })], CountryOfResidence);
var Pseudonym = class Pseudonym extends DirectoryString {};
Pseudonym = __decorate([AsnType({ type: AsnTypeTypes.Choice })], Pseudonym);
var ContentType = class ContentType {
	value;
	constructor(value = "") {
		this.value = value;
	}
	toString() {
		return this.value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.ObjectIdentifier })], ContentType.prototype, "value", void 0);
ContentType = __decorate([AsnType({ type: AsnTypeTypes.Choice })], ContentType);
var SigningTime = class SigningTime extends Time {};
SigningTime = __decorate([AsnType({ type: AsnTypeTypes.Choice })], SigningTime);
var SequenceNumber = class SequenceNumber {
	value;
	constructor(value = 0) {
		this.value = value;
	}
	toString() {
		return this.value.toString();
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], SequenceNumber.prototype, "value", void 0);
SequenceNumber = __decorate([AsnType({ type: AsnTypeTypes.Choice })], SequenceNumber);
var CounterSignature = class CounterSignature extends SignerInfo {};
CounterSignature = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], CounterSignature);
var ChallengePassword = class ChallengePassword extends DirectoryString {};
ChallengePassword = __decorate([AsnType({ type: AsnTypeTypes.Choice })], ChallengePassword);
var ExtensionRequest = ExtensionRequest_1 = class ExtensionRequest extends Extensions {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, ExtensionRequest_1.prototype);
	}
};
ExtensionRequest = ExtensionRequest_1 = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], ExtensionRequest);
var ExtendedCertificateAttributes = ExtendedCertificateAttributes_1 = class ExtendedCertificateAttributes extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, ExtendedCertificateAttributes_1.prototype);
	}
};
ExtendedCertificateAttributes = ExtendedCertificateAttributes_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: Attribute$1
})], ExtendedCertificateAttributes);
var FriendlyName = class FriendlyName {
	value;
	constructor(value = "") {
		this.value = value;
	}
	toString() {
		return this.value;
	}
};
__decorate([AsnProp({ type: AsnPropTypes.BmpString })], FriendlyName.prototype, "value", void 0);
FriendlyName = __decorate([AsnType({ type: AsnTypeTypes.Choice })], FriendlyName);
var SMIMECapability = class SMIMECapability extends AlgorithmIdentifier {};
SMIMECapability = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], SMIMECapability);
var SMIMECapabilities = SMIMECapabilities_1 = class SMIMECapabilities extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, SMIMECapabilities_1.prototype);
	}
};
SMIMECapabilities = SMIMECapabilities_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: SMIMECapability
})], SMIMECapabilities);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-csr@2.7.0/node_modules/@peculiar/asn1-csr/build/es2015/attributes.js
var Attributes_1;
var Attributes = Attributes_1 = class Attributes extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, Attributes_1.prototype);
	}
};
Attributes = Attributes_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: Attribute$2
})], Attributes);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-csr@2.7.0/node_modules/@peculiar/asn1-csr/build/es2015/certification_request_info.js
var CertificationRequestInfo = class {
	version = 0;
	subject = new Name$1();
	subjectPKInfo = new SubjectPublicKeyInfo();
	attributes = new Attributes();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], CertificationRequestInfo.prototype, "version", void 0);
__decorate([AsnProp({ type: Name$1 })], CertificationRequestInfo.prototype, "subject", void 0);
__decorate([AsnProp({ type: SubjectPublicKeyInfo })], CertificationRequestInfo.prototype, "subjectPKInfo", void 0);
__decorate([AsnProp({
	type: Attributes,
	implicit: true,
	context: 0,
	optional: true
})], CertificationRequestInfo.prototype, "attributes", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-csr@2.7.0/node_modules/@peculiar/asn1-csr/build/es2015/certification_request.js
var CertificationRequest = class {
	certificationRequestInfo = new CertificationRequestInfo();
	certificationRequestInfoRaw;
	signatureAlgorithm = new AlgorithmIdentifier();
	signature = /* @__PURE__ */ new ArrayBuffer(0);
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: CertificationRequestInfo,
	raw: true
})], CertificationRequest.prototype, "certificationRequestInfo", void 0);
__decorate([AsnProp({ type: AlgorithmIdentifier })], CertificationRequest.prototype, "signatureAlgorithm", void 0);
__decorate([AsnProp({ type: AsnPropTypes.BitString })], CertificationRequest.prototype, "signature", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+x509@1.14.3/node_modules/@peculiar/x509/build/x509.es.js
/*!
* MIT License
* 
* Copyright (c) Peculiar Ventures. All rights reserved.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* 
*/
var diAlgorithm = "crypto.algorithm";
var AlgorithmProvider = class {
	getAlgorithms() {
		return instance.resolveAll(diAlgorithm);
	}
	toAsnAlgorithm(alg) {
		({ ...alg });
		for (const algorithm of this.getAlgorithms()) {
			const res = algorithm.toAsnAlgorithm(alg);
			if (res) return res;
		}
		if (/^[0-9.]+$/.test(alg.name)) {
			const res = new AlgorithmIdentifier({ algorithm: alg.name });
			if ("parameters" in alg) res.parameters = alg.parameters;
			return res;
		}
		throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm");
	}
	toWebAlgorithm(alg) {
		for (const algorithm of this.getAlgorithms()) {
			const res = algorithm.toWebAlgorithm(alg);
			if (res) return res;
		}
		return {
			name: alg.algorithm,
			parameters: alg.parameters
		};
	}
};
var diAlgorithmProvider = "crypto.algorithmProvider";
instance.registerSingleton(diAlgorithmProvider, AlgorithmProvider);
var EcAlgorithm_1;
var idVersionOne = "1.3.36.3.3.2.8.1.1";
var idBrainpoolP160r1 = `${idVersionOne}.1`;
var idBrainpoolP160t1 = `${idVersionOne}.2`;
var idBrainpoolP192r1 = `${idVersionOne}.3`;
var idBrainpoolP192t1 = `${idVersionOne}.4`;
var idBrainpoolP224r1 = `${idVersionOne}.5`;
var idBrainpoolP224t1 = `${idVersionOne}.6`;
var idBrainpoolP256r1 = `${idVersionOne}.7`;
var idBrainpoolP256t1 = `${idVersionOne}.8`;
var idBrainpoolP320r1 = `${idVersionOne}.9`;
var idBrainpoolP320t1 = `${idVersionOne}.10`;
var idBrainpoolP384r1 = `${idVersionOne}.11`;
var idBrainpoolP384t1 = `${idVersionOne}.12`;
var idBrainpoolP512r1 = `${idVersionOne}.13`;
var idBrainpoolP512t1 = `${idVersionOne}.14`;
var brainpoolP160r1 = "brainpoolP160r1";
var brainpoolP160t1 = "brainpoolP160t1";
var brainpoolP192r1 = "brainpoolP192r1";
var brainpoolP192t1 = "brainpoolP192t1";
var brainpoolP224r1 = "brainpoolP224r1";
var brainpoolP224t1 = "brainpoolP224t1";
var brainpoolP256r1 = "brainpoolP256r1";
var brainpoolP256t1 = "brainpoolP256t1";
var brainpoolP320r1 = "brainpoolP320r1";
var brainpoolP320t1 = "brainpoolP320t1";
var brainpoolP384r1 = "brainpoolP384r1";
var brainpoolP384t1 = "brainpoolP384t1";
var brainpoolP512r1 = "brainpoolP512r1";
var brainpoolP512t1 = "brainpoolP512t1";
var ECDSA = "ECDSA";
var EcAlgorithm = EcAlgorithm_1 = class EcAlgorithm {
	toAsnAlgorithm(alg) {
		switch (alg.name.toLowerCase()) {
			case ECDSA.toLowerCase(): if ("hash" in alg) switch ((typeof alg.hash === "string" ? alg.hash : alg.hash.name).toLowerCase()) {
				case "sha-1": return ecdsaWithSHA1;
				case "sha-256": return ecdsaWithSHA256;
				case "sha-384": return ecdsaWithSHA384;
				case "sha-512": return ecdsaWithSHA512;
			}
			else if ("namedCurve" in alg) {
				let parameters = "";
				switch (alg.namedCurve) {
					case "P-256":
						parameters = id_secp256r1;
						break;
					case "K-256":
						parameters = EcAlgorithm_1.SECP256K1;
						break;
					case "P-384":
						parameters = id_secp384r1;
						break;
					case "P-521":
						parameters = id_secp521r1;
						break;
					case brainpoolP160r1:
						parameters = idBrainpoolP160r1;
						break;
					case brainpoolP160t1:
						parameters = idBrainpoolP160t1;
						break;
					case brainpoolP192r1:
						parameters = idBrainpoolP192r1;
						break;
					case brainpoolP192t1:
						parameters = idBrainpoolP192t1;
						break;
					case brainpoolP224r1:
						parameters = idBrainpoolP224r1;
						break;
					case brainpoolP224t1:
						parameters = idBrainpoolP224t1;
						break;
					case brainpoolP256r1:
						parameters = idBrainpoolP256r1;
						break;
					case brainpoolP256t1:
						parameters = idBrainpoolP256t1;
						break;
					case brainpoolP320r1:
						parameters = idBrainpoolP320r1;
						break;
					case brainpoolP320t1:
						parameters = idBrainpoolP320t1;
						break;
					case brainpoolP384r1:
						parameters = idBrainpoolP384r1;
						break;
					case brainpoolP384t1:
						parameters = idBrainpoolP384t1;
						break;
					case brainpoolP512r1:
						parameters = idBrainpoolP512r1;
						break;
					case brainpoolP512t1:
						parameters = idBrainpoolP512t1;
						break;
				}
				if (parameters) return new AlgorithmIdentifier({
					algorithm: id_ecPublicKey,
					parameters: AsnConvert.serialize(new ECParameters({ namedCurve: parameters }))
				});
			}
		}
		return null;
	}
	toWebAlgorithm(alg) {
		switch (alg.algorithm) {
			case id_ecdsaWithSHA1: return {
				name: ECDSA,
				hash: { name: "SHA-1" }
			};
			case id_ecdsaWithSHA256: return {
				name: ECDSA,
				hash: { name: "SHA-256" }
			};
			case id_ecdsaWithSHA384: return {
				name: ECDSA,
				hash: { name: "SHA-384" }
			};
			case id_ecdsaWithSHA512: return {
				name: ECDSA,
				hash: { name: "SHA-512" }
			};
			case id_ecPublicKey:
				if (!alg.parameters) throw new TypeError("Cannot get required parameters from EC algorithm");
				switch (AsnConvert.parse(alg.parameters, ECParameters).namedCurve) {
					case id_secp256r1: return {
						name: ECDSA,
						namedCurve: "P-256"
					};
					case EcAlgorithm_1.SECP256K1: return {
						name: ECDSA,
						namedCurve: "K-256"
					};
					case id_secp384r1: return {
						name: ECDSA,
						namedCurve: "P-384"
					};
					case id_secp521r1: return {
						name: ECDSA,
						namedCurve: "P-521"
					};
					case idBrainpoolP160r1: return {
						name: ECDSA,
						namedCurve: brainpoolP160r1
					};
					case idBrainpoolP160t1: return {
						name: ECDSA,
						namedCurve: brainpoolP160t1
					};
					case idBrainpoolP192r1: return {
						name: ECDSA,
						namedCurve: brainpoolP192r1
					};
					case idBrainpoolP192t1: return {
						name: ECDSA,
						namedCurve: brainpoolP192t1
					};
					case idBrainpoolP224r1: return {
						name: ECDSA,
						namedCurve: brainpoolP224r1
					};
					case idBrainpoolP224t1: return {
						name: ECDSA,
						namedCurve: brainpoolP224t1
					};
					case idBrainpoolP256r1: return {
						name: ECDSA,
						namedCurve: brainpoolP256r1
					};
					case idBrainpoolP256t1: return {
						name: ECDSA,
						namedCurve: brainpoolP256t1
					};
					case idBrainpoolP320r1: return {
						name: ECDSA,
						namedCurve: brainpoolP320r1
					};
					case idBrainpoolP320t1: return {
						name: ECDSA,
						namedCurve: brainpoolP320t1
					};
					case idBrainpoolP384r1: return {
						name: ECDSA,
						namedCurve: brainpoolP384r1
					};
					case idBrainpoolP384t1: return {
						name: ECDSA,
						namedCurve: brainpoolP384t1
					};
					case idBrainpoolP512r1: return {
						name: ECDSA,
						namedCurve: brainpoolP512r1
					};
					case idBrainpoolP512t1: return {
						name: ECDSA,
						namedCurve: brainpoolP512t1
					};
				}
		}
		return null;
	}
};
EcAlgorithm.SECP256K1 = "1.3.132.0.10";
EcAlgorithm = EcAlgorithm_1 = __decorate([injectable()], EcAlgorithm);
instance.registerSingleton(diAlgorithm, EcAlgorithm);
var NAME = Symbol("name");
var VALUE = Symbol("value");
var TextObject = class {
	constructor(name, items = {}, value = "") {
		this[NAME] = name;
		this[VALUE] = value;
		for (const key in items) this[key] = items[key];
	}
};
TextObject.NAME = NAME;
TextObject.VALUE = VALUE;
var DefaultAlgorithmSerializer = class {
	static toTextObject(alg) {
		const obj = new TextObject("Algorithm Identifier", {}, OidSerializer.toString(alg.algorithm));
		if (alg.parameters) switch (alg.algorithm) {
			case id_ecPublicKey: {
				const ecAlg = new EcAlgorithm().toWebAlgorithm(alg);
				if (ecAlg && "namedCurve" in ecAlg) obj["Named Curve"] = ecAlg.namedCurve;
				else obj["Parameters"] = alg.parameters;
				break;
			}
			default: obj["Parameters"] = alg.parameters;
		}
		return obj;
	}
};
var OidSerializer = class {
	static toString(oid) {
		const name = this.items[oid];
		if (name) return name;
		return oid;
	}
};
OidSerializer.items = {
	[id_sha1]: "sha1",
	[id_sha224]: "sha224",
	[id_sha256]: "sha256",
	[id_sha384]: "sha384",
	[id_sha512]: "sha512",
	[id_rsaEncryption]: "rsaEncryption",
	[id_sha1WithRSAEncryption]: "sha1WithRSAEncryption",
	[id_sha224WithRSAEncryption]: "sha224WithRSAEncryption",
	[id_sha256WithRSAEncryption]: "sha256WithRSAEncryption",
	[id_sha384WithRSAEncryption]: "sha384WithRSAEncryption",
	[id_sha512WithRSAEncryption]: "sha512WithRSAEncryption",
	[id_ecPublicKey]: "ecPublicKey",
	[id_ecdsaWithSHA1]: "ecdsaWithSHA1",
	[id_ecdsaWithSHA224]: "ecdsaWithSHA224",
	[id_ecdsaWithSHA256]: "ecdsaWithSHA256",
	[id_ecdsaWithSHA384]: "ecdsaWithSHA384",
	[id_ecdsaWithSHA512]: "ecdsaWithSHA512",
	[id_kp_serverAuth]: "TLS WWW server authentication",
	[id_kp_clientAuth]: "TLS WWW client authentication",
	[id_kp_codeSigning]: "Code Signing",
	[id_kp_emailProtection]: "E-mail Protection",
	[id_kp_timeStamping]: "Time Stamping",
	[id_kp_OCSPSigning]: "OCSP Signing",
	[id_signedData]: "Signed Data"
};
var TextConverter = class {
	static serialize(obj) {
		return this.serializeObj(obj).join("\n");
	}
	static pad(deep = 0) {
		return "".padStart(2 * deep, " ");
	}
	static serializeObj(obj, deep = 0) {
		const res = [];
		let pad = this.pad(deep++);
		let value = "";
		const objValue = obj[TextObject.VALUE];
		if (objValue) value = ` ${objValue}`;
		res.push(`${pad}${obj[TextObject.NAME]}:${value}`);
		pad = this.pad(deep);
		for (const key in obj) {
			if (typeof key === "symbol") continue;
			const value = obj[key];
			const keyValue = key ? `${key}: ` : "";
			if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") res.push(`${pad}${keyValue}${value}`);
			else if (value instanceof Date) res.push(`${pad}${keyValue}${value.toUTCString()}`);
			else if (Array.isArray(value)) for (const obj of value) {
				obj[TextObject.NAME] = key;
				res.push(...this.serializeObj(obj, deep));
			}
			else if (value instanceof TextObject) {
				value[TextObject.NAME] = key;
				res.push(...this.serializeObj(value, deep));
			} else if (BufferSourceConverter.isBufferSource(value)) if (key) {
				res.push(`${pad}${keyValue}`);
				res.push(...this.serializeBufferSource(value, deep + 1));
			} else res.push(...this.serializeBufferSource(value, deep));
			else if ("toTextObject" in value) {
				const obj = value.toTextObject();
				obj[TextObject.NAME] = key;
				res.push(...this.serializeObj(obj, deep));
			} else throw new TypeError("Cannot serialize data in text format. Unsupported type.");
		}
		return res;
	}
	static serializeBufferSource(buffer, deep = 0) {
		const pad = this.pad(deep);
		const view = BufferSourceConverter.toUint8Array(buffer);
		const res = [];
		for (let i = 0; i < view.length;) {
			const row = [];
			for (let j = 0; j < 16 && i < view.length; j++) {
				if (j === 8) row.push("");
				const hex = view[i++].toString(16).padStart(2, "0");
				row.push(hex);
			}
			res.push(`${pad}${row.join(" ")}`);
		}
		return res;
	}
	static serializeAlgorithm(alg) {
		return this.algorithmSerializer.toTextObject(alg);
	}
};
TextConverter.oidSerializer = OidSerializer;
TextConverter.algorithmSerializer = DefaultAlgorithmSerializer;
var _AsnData_rawData;
var AsnData = class AsnData {
	get rawData() {
		if (!__classPrivateFieldGet(this, _AsnData_rawData, "f")) __classPrivateFieldSet(this, _AsnData_rawData, AsnConvert.serialize(this.asn), "f");
		return __classPrivateFieldGet(this, _AsnData_rawData, "f");
	}
	constructor(...args) {
		_AsnData_rawData.set(this, void 0);
		if (BufferSourceConverter.isBufferSource(args[0])) {
			this.asn = AsnConvert.parse(args[0], args[1]);
			__classPrivateFieldSet(this, _AsnData_rawData, BufferSourceConverter.toArrayBuffer(args[0]), "f");
			this.onInit(this.asn);
		} else {
			this.asn = args[0];
			this.onInit(this.asn);
		}
	}
	equal(data) {
		if (data instanceof AsnData) return isEqual(data.rawData, this.rawData);
		return false;
	}
	toString(format = "text") {
		switch (format) {
			case "asn": return AsnConvert.toString(this.rawData);
			case "text": return TextConverter.serialize(this.toTextObject());
			case "hex": return Convert.ToHex(this.rawData);
			case "base64": return Convert.ToBase64(this.rawData);
			case "base64url": return Convert.ToBase64Url(this.rawData);
			default: throw TypeError("Argument 'format' is unsupported value");
		}
	}
	getTextName() {
		return this.constructor.NAME;
	}
	toTextObject() {
		const obj = this.toTextObjectEmpty();
		obj[""] = this.rawData;
		return obj;
	}
	toTextObjectEmpty(value) {
		return new TextObject(this.getTextName(), {}, value);
	}
};
_AsnData_rawData = /* @__PURE__ */ new WeakMap();
AsnData.NAME = "ASN";
var Extension = class Extension extends AsnData {
	constructor(...args) {
		let raw;
		if (BufferSourceConverter.isBufferSource(args[0])) raw = BufferSourceConverter.toArrayBuffer(args[0]);
		else raw = AsnConvert.serialize(new Extension$1({
			extnID: args[0],
			critical: args[1],
			extnValue: new OctetString(BufferSourceConverter.toArrayBuffer(args[2]))
		}));
		super(raw, Extension$1);
	}
	onInit(asn) {
		this.type = asn.extnID;
		this.critical = asn.critical;
		this.value = asn.extnValue.buffer;
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj[""] = this.value;
		return obj;
	}
	toTextObjectWithoutValue() {
		const obj = this.toTextObjectEmpty(this.critical ? "critical" : void 0);
		if (obj[TextObject.NAME] === Extension.NAME) obj[TextObject.NAME] = OidSerializer.toString(this.type);
		return obj;
	}
};
var _a;
var CryptoProvider = class CryptoProvider {
	static isCryptoKeyPair(data) {
		return data && data.privateKey && data.publicKey;
	}
	static isCryptoKey(data) {
		return data && data.usages && data.type && data.algorithm && data.extractable !== void 0;
	}
	constructor() {
		this.items = /* @__PURE__ */ new Map();
		this[_a] = "CryptoProvider";
		if (typeof self !== "undefined" && typeof crypto !== "undefined") this.set(CryptoProvider.DEFAULT, crypto);
		else if (typeof global !== "undefined" && global.crypto && global.crypto.subtle) this.set(CryptoProvider.DEFAULT, global.crypto);
	}
	clear() {
		this.items.clear();
	}
	delete(key) {
		return this.items.delete(key);
	}
	forEach(callbackfn, thisArg) {
		return this.items.forEach(callbackfn, thisArg);
	}
	has(key) {
		return this.items.has(key);
	}
	get size() {
		return this.items.size;
	}
	entries() {
		return this.items.entries();
	}
	keys() {
		return this.items.keys();
	}
	values() {
		return this.items.values();
	}
	[Symbol.iterator]() {
		return this.items[Symbol.iterator]();
	}
	get(key = CryptoProvider.DEFAULT) {
		const crypto = this.items.get(key.toLowerCase());
		if (!crypto) throw new Error(`Cannot get Crypto by name '${key}'`);
		return crypto;
	}
	set(key, value) {
		if (typeof key === "string") {
			if (!value) throw new TypeError("Argument 'value' is required");
			this.items.set(key.toLowerCase(), value);
		} else this.items.set(CryptoProvider.DEFAULT, key);
		return this;
	}
};
_a = Symbol.toStringTag;
CryptoProvider.DEFAULT = "default";
var cryptoProvider = new CryptoProvider();
var OID_REGEX = /^[0-2](?:\.[1-9][0-9]*)+$/;
function isOID(id) {
	return new RegExp(OID_REGEX).test(id);
}
var NameIdentifier = class {
	constructor(names = {}) {
		this.items = {};
		for (const id in names) this.register(id, names[id]);
	}
	get(idOrName) {
		return this.items[idOrName] || null;
	}
	findId(idOrName) {
		if (!isOID(idOrName)) return this.get(idOrName);
		return idOrName;
	}
	register(id, name) {
		this.items[id] = name;
		this.items[name] = id;
	}
};
var names = new NameIdentifier();
names.register("CN", "2.5.4.3");
names.register("L", "2.5.4.7");
names.register("ST", "2.5.4.8");
names.register("O", "2.5.4.10");
names.register("OU", "2.5.4.11");
names.register("C", "2.5.4.6");
names.register("DC", "0.9.2342.19200300.100.1.25");
names.register("E", "1.2.840.113549.1.9.1");
names.register("G", "2.5.4.42");
names.register("I", "2.5.4.43");
names.register("SN", "2.5.4.4");
names.register("T", "2.5.4.12");
function replaceUnknownCharacter(text, char) {
	return `\\${Convert.ToHex(Convert.FromUtf8String(char)).toUpperCase()}`;
}
function escape$1(data) {
	return data.replace(/([,+"\\<>;])/g, "\\$1").replace(/^([ #])/, "\\$1").replace(/([ ]$)/, "\\$1").replace(/([\r\n\t])/, replaceUnknownCharacter);
}
var Name = class Name {
	static isASCII(text) {
		for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) > 255) return false;
		return true;
	}
	static isPrintableString(text) {
		return /^[A-Za-z0-9 '()+,-./:=?]*$/g.test(text);
	}
	constructor(data, extraNames = {}) {
		this.extraNames = new NameIdentifier();
		this.asn = new Name$1();
		for (const key in extraNames) if (Object.prototype.hasOwnProperty.call(extraNames, key)) {
			const value = extraNames[key];
			this.extraNames.register(key, value);
		}
		if (typeof data === "string") this.asn = this.fromString(data);
		else if (data instanceof Name$1) this.asn = data;
		else if (BufferSourceConverter.isBufferSource(data)) this.asn = AsnConvert.parse(data, Name$1);
		else this.asn = this.fromJSON(data);
	}
	getField(idOrName) {
		const id = this.extraNames.findId(idOrName) || names.findId(idOrName);
		const res = [];
		for (const name of this.asn) for (const rdn of name) if (rdn.type === id) res.push(rdn.value.toString());
		return res;
	}
	getName(idOrName) {
		return this.extraNames.get(idOrName) || names.get(idOrName);
	}
	toString() {
		return this.asn.map((rdn) => rdn.map((o) => {
			return `${this.getName(o.type) || o.type}=${o.value.anyValue ? `#${Convert.ToHex(o.value.anyValue)}` : escape$1(o.value.toString())}`;
		}).join("+")).join(", ");
	}
	toJSON() {
		var _a;
		const json = [];
		for (const rdn of this.asn) {
			const jsonItem = {};
			for (const attr of rdn) {
				const type = this.getName(attr.type) || attr.type;
				(_a = jsonItem[type]) !== null && _a !== void 0 || (jsonItem[type] = []);
				jsonItem[type].push(attr.value.anyValue ? `#${Convert.ToHex(attr.value.anyValue)}` : attr.value.toString());
			}
			json.push(jsonItem);
		}
		return json;
	}
	fromString(data) {
		const asn = new Name$1();
		const regex = /(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+"\\](?=[,+]|$))|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g;
		let matches = null;
		let level = ",";
		while (matches = regex.exec(`${data},`)) {
			let [, type, value] = matches;
			const lastChar = value[value.length - 1];
			if (lastChar === "," || lastChar === "+") {
				value = value.slice(0, value.length - 1);
				matches[3] = lastChar;
			}
			const next = matches[3];
			type = this.getTypeOid(type);
			const attr = this.createAttribute(type, value);
			if (level === "+") asn[asn.length - 1].push(attr);
			else asn.push(new RelativeDistinguishedName([attr]));
			level = next;
		}
		return asn;
	}
	fromJSON(data) {
		const asn = new Name$1();
		for (const item of data) {
			const asnRdn = new RelativeDistinguishedName();
			for (const type in item) {
				const typeId = this.getTypeOid(type);
				const values = item[type];
				for (const value of values) {
					const asnAttr = this.createAttribute(typeId, value);
					asnRdn.push(asnAttr);
				}
			}
			asn.push(asnRdn);
		}
		return asn;
	}
	getTypeOid(type) {
		if (!/[\d.]+/.test(type)) type = this.getName(type) || "";
		if (!type) throw new Error(`Cannot get OID for name type '${type}'`);
		return type;
	}
	createAttribute(type, value) {
		const attr = new AttributeTypeAndValue({ type });
		if (typeof value === "object") for (const key in value) switch (key) {
			case "ia5String":
				attr.value.ia5String = value[key];
				break;
			case "utf8String":
				attr.value.utf8String = value[key];
				break;
			case "universalString":
				attr.value.universalString = value[key];
				break;
			case "bmpString":
				attr.value.bmpString = value[key];
				break;
			case "printableString":
				attr.value.printableString = value[key];
				break;
		}
		else if (value[0] === "#") attr.value.anyValue = Convert.FromHex(value.slice(1));
		else {
			const processedValue = this.processStringValue(value);
			if (type === this.getName("E") || type === this.getName("DC")) attr.value.ia5String = processedValue;
			else if (Name.isPrintableString(processedValue)) attr.value.printableString = processedValue;
			else attr.value.utf8String = processedValue;
		}
		return attr;
	}
	processStringValue(value) {
		const quotedMatches = /"(.*?[^\\])?"/.exec(value);
		if (quotedMatches) value = quotedMatches[1];
		return value.replace(/\\0a/gi, "\n").replace(/\\0d/gi, "\r").replace(/\\0g/gi, "	").replace(/\\(.)/g, "$1");
	}
	toArrayBuffer() {
		return AsnConvert.serialize(this.asn);
	}
	async getThumbprint(...args) {
		var _a;
		let crypto;
		let algorithm = "SHA-1";
		if (args.length >= 1 && !((_a = args[0]) === null || _a === void 0 ? void 0 : _a.subtle)) {
			algorithm = args[0] || algorithm;
			crypto = args[1] || cryptoProvider.get();
		} else crypto = args[0] || cryptoProvider.get();
		return await crypto.subtle.digest(algorithm, this.toArrayBuffer());
	}
};
var ERR_GN_CONSTRUCTOR = "Cannot initialize GeneralName from ASN.1 data.";
var ERR_GN_STRING_FORMAT = `${ERR_GN_CONSTRUCTOR} Unsupported string format in use.`;
var ERR_GUID = `${ERR_GN_CONSTRUCTOR} Value doesn't match to GUID regular expression.`;
var GUID_REGEX = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i;
var id_GUID = "1.3.6.1.4.1.311.25.1";
var id_UPN = "1.3.6.1.4.1.311.20.2.3";
var EMAIL = "email";
var GUID = "guid";
var GeneralName = class extends AsnData {
	constructor(...args) {
		let name;
		if (args.length === 2) switch (args[0]) {
			case "dn": {
				const derName = new Name(args[1]).toArrayBuffer();
				const asnName = AsnConvert.parse(derName, Name$1);
				name = new GeneralName$1({ directoryName: asnName });
				break;
			}
			case "dns":
				name = new GeneralName$1({ dNSName: args[1] });
				break;
			case EMAIL:
				name = new GeneralName$1({ rfc822Name: args[1] });
				break;
			case GUID: {
				const matches = new RegExp(GUID_REGEX, "i").exec(args[1]);
				if (!matches) throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");
				const hex = matches.slice(1).map((o, i) => {
					if (i < 3) return Convert.ToHex(new Uint8Array(Convert.FromHex(o)).reverse());
					return o;
				}).join("");
				name = new GeneralName$1({ otherName: new OtherName({
					typeId: id_GUID,
					value: AsnConvert.serialize(new OctetString(Convert.FromHex(hex)))
				}) });
				break;
			}
			case "ip":
				name = new GeneralName$1({ iPAddress: args[1] });
				break;
			case "id":
				name = new GeneralName$1({ registeredID: args[1] });
				break;
			case "upn":
				name = new GeneralName$1({ otherName: new OtherName({
					typeId: id_UPN,
					value: AsnConvert.serialize(AsnUtf8StringConverter.toASN(args[1]))
				}) });
				break;
			case "url":
				name = new GeneralName$1({ uniformResourceIdentifier: args[1] });
				break;
			default: throw new Error("Cannot create GeneralName. Unsupported type of the name");
		}
		else if (BufferSourceConverter.isBufferSource(args[0])) name = AsnConvert.parse(args[0], GeneralName$1);
		else name = args[0];
		super(name);
	}
	onInit(asn) {
		if (asn.dNSName != void 0) {
			this.type = "dns";
			this.value = asn.dNSName;
		} else if (asn.rfc822Name != void 0) {
			this.type = EMAIL;
			this.value = asn.rfc822Name;
		} else if (asn.iPAddress != void 0) {
			this.type = "ip";
			this.value = asn.iPAddress;
		} else if (asn.uniformResourceIdentifier != void 0) {
			this.type = "url";
			this.value = asn.uniformResourceIdentifier;
		} else if (asn.registeredID != void 0) {
			this.type = "id";
			this.value = asn.registeredID;
		} else if (asn.directoryName != void 0) {
			this.type = "dn";
			this.value = new Name(asn.directoryName).toString();
		} else if (asn.otherName != void 0) if (asn.otherName.typeId === id_GUID) {
			this.type = GUID;
			const guid = AsnConvert.parse(asn.otherName.value, OctetString);
			const matches = new RegExp(GUID_REGEX, "i").exec(Convert.ToHex(guid));
			if (!matches) throw new Error(ERR_GUID);
			this.value = matches.slice(1).map((o, i) => {
				if (i < 3) return Convert.ToHex(new Uint8Array(Convert.FromHex(o)).reverse());
				return o;
			}).join("-");
		} else if (asn.otherName.typeId === id_UPN) {
			this.type = "upn";
			this.value = AsnConvert.parse(asn.otherName.value, DirectoryString).toString();
		} else throw new Error(ERR_GN_STRING_FORMAT);
		else throw new Error(ERR_GN_STRING_FORMAT);
	}
	toJSON() {
		return {
			type: this.type,
			value: this.value
		};
	}
	toTextObject() {
		let type;
		switch (this.type) {
			case "dn":
			case "dns":
			case GUID:
			case "ip":
			case "id":
			case "upn":
			case "url":
				type = this.type.toUpperCase();
				break;
			case EMAIL:
				type = "Email";
				break;
			default: throw new Error("Unsupported GeneralName type");
		}
		let value = this.value;
		if (this.type === "id") value = OidSerializer.toString(value);
		return new TextObject(type, void 0, value);
	}
};
var GeneralNames = class extends AsnData {
	constructor(params) {
		let names;
		if (params instanceof GeneralNames$1) names = params;
		else if (Array.isArray(params)) {
			const items = [];
			for (const name of params) if (name instanceof GeneralName$1) items.push(name);
			else {
				const asnName = AsnConvert.parse(new GeneralName(name.type, name.value).rawData, GeneralName$1);
				items.push(asnName);
			}
			names = new GeneralNames$1(items);
		} else if (BufferSourceConverter.isBufferSource(params)) names = AsnConvert.parse(params, GeneralNames$1);
		else throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");
		super(names);
	}
	onInit(asn) {
		const items = [];
		for (const asnName of asn) {
			let name = null;
			try {
				name = new GeneralName(asnName);
			} catch {
				continue;
			}
			items.push(name);
		}
		this.items = items;
	}
	toJSON() {
		return this.items.map((o) => o.toJSON());
	}
	toTextObject() {
		const res = super.toTextObjectEmpty();
		for (const name of this.items) {
			const nameObj = name.toTextObject();
			let field = res[nameObj[TextObject.NAME]];
			if (!Array.isArray(field)) {
				field = [];
				res[nameObj[TextObject.NAME]] = field;
			}
			field.push(nameObj);
		}
		return res;
	}
};
GeneralNames.NAME = "GeneralNames";
var rPaddingTag = "-{5}";
var rEolChars = "\\n";
var rBeginTag = `${rPaddingTag}BEGIN (${`[^${rEolChars}]+`}(?=${rPaddingTag}))${rPaddingTag}`;
var rEndTag = `${rPaddingTag}END \\1${rPaddingTag}`;
var rEolGroup = "\\n";
var rPem = `${rBeginTag}${rEolGroup}(?:((?:${`[^:${rEolChars}]+`}: ${`(?:[^${rEolChars}]+${rEolGroup}(?: +[^${rEolChars}]+${rEolGroup})*)`})+))?${rEolGroup}?(${`(?:[a-zA-Z0-9=+/]+${rEolGroup})+`})${rEndTag}`;
var PemConverter = class {
	static isPem(data) {
		return typeof data === "string" && new RegExp(rPem, "g").test(data.replace(/\r/g, ""));
	}
	static decodeWithHeaders(pem) {
		pem = pem.replace(/\r/g, "");
		const pattern = new RegExp(rPem, "g");
		const res = [];
		let matches = null;
		while (matches = pattern.exec(pem)) {
			const base64 = matches[3].replace(new RegExp(`[${rEolChars}]+`, "g"), "");
			const pemStruct = {
				type: matches[1],
				headers: [],
				rawData: Convert.FromBase64(base64)
			};
			const headersString = matches[2];
			if (headersString) {
				const headers = headersString.split(new RegExp(rEolGroup, "g"));
				let lastHeader = null;
				for (const header of headers) {
					const [key, value] = header.split(/:(.*)/);
					if (value === void 0) {
						if (!lastHeader) throw new Error("Cannot parse PEM string. Incorrect header value");
						lastHeader.value += key.trim();
					} else {
						if (lastHeader) pemStruct.headers.push(lastHeader);
						lastHeader = {
							key,
							value: value.trim()
						};
					}
				}
				if (lastHeader) pemStruct.headers.push(lastHeader);
			}
			res.push(pemStruct);
		}
		return res;
	}
	static decode(pem) {
		return this.decodeWithHeaders(pem).map((o) => o.rawData);
	}
	static decodeFirst(pem) {
		const items = this.decode(pem);
		if (!items.length) throw new RangeError("PEM string doesn't contain any objects");
		return items[0];
	}
	static encode(rawData, tag) {
		if (Array.isArray(rawData)) {
			const raws = new Array();
			if (tag) rawData.forEach((element) => {
				if (!BufferSourceConverter.isBufferSource(element)) throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");
				raws.push(this.encodeStruct({
					type: tag,
					rawData: BufferSourceConverter.toArrayBuffer(element)
				}));
			});
			else rawData.forEach((element) => {
				if (!("type" in element)) throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");
				raws.push(this.encodeStruct(element));
			});
			return raws.join("\n");
		} else {
			if (!tag) throw new Error("Required argument 'tag' is missed");
			return this.encodeStruct({
				type: tag,
				rawData: BufferSourceConverter.toArrayBuffer(rawData)
			});
		}
	}
	static encodeStruct(pem) {
		var _a;
		const upperCaseType = pem.type.toLocaleUpperCase();
		const res = [];
		res.push(`-----BEGIN ${upperCaseType}-----`);
		if ((_a = pem.headers) === null || _a === void 0 ? void 0 : _a.length) {
			for (const header of pem.headers) res.push(`${header.key}: ${header.value}`);
			res.push("");
		}
		const base64 = Convert.ToBase64(pem.rawData);
		let sliced;
		let offset = 0;
		const rows = Array();
		while (offset < base64.length) {
			if (base64.length - offset < 64) sliced = base64.substring(offset);
			else {
				sliced = base64.substring(offset, offset + 64);
				offset += 64;
			}
			if (sliced.length !== 0) {
				rows.push(sliced);
				if (sliced.length < 64) break;
			} else break;
		}
		res.push(...rows);
		res.push(`-----END ${upperCaseType}-----`);
		return res.join("\n");
	}
};
PemConverter.CertificateTag = "CERTIFICATE";
PemConverter.CrlTag = "CRL";
PemConverter.CertificateRequestTag = "CERTIFICATE REQUEST";
PemConverter.PublicKeyTag = "PUBLIC KEY";
PemConverter.PrivateKeyTag = "PRIVATE KEY";
var PemData = class PemData extends AsnData {
	static isAsnEncoded(data) {
		return BufferSourceConverter.isBufferSource(data) || typeof data === "string";
	}
	static toArrayBuffer(raw) {
		if (typeof raw === "string") if (PemConverter.isPem(raw)) return PemConverter.decode(raw)[0];
		else if (Convert.isHex(raw)) return Convert.FromHex(raw);
		else if (Convert.isBase64(raw)) return Convert.FromBase64(raw);
		else if (Convert.isBase64Url(raw)) return Convert.FromBase64Url(raw);
		else throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
		else {
			const buffer = BufferSourceConverter.toUint8Array(raw);
			if (buffer.length > 0 && buffer[0] === 48) return BufferSourceConverter.toArrayBuffer(raw);
			const stringRaw = Convert.ToBinary(raw);
			if (PemConverter.isPem(stringRaw)) return PemConverter.decode(stringRaw)[0];
			else if (Convert.isHex(stringRaw)) return Convert.FromHex(stringRaw);
			else if (Convert.isBase64(stringRaw)) return Convert.FromBase64(stringRaw);
			else if (Convert.isBase64Url(stringRaw)) return Convert.FromBase64Url(stringRaw);
			throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
		}
	}
	constructor(...args) {
		if (PemData.isAsnEncoded(args[0])) super(PemData.toArrayBuffer(args[0]), args[1]);
		else super(args[0]);
	}
	toString(format = "pem") {
		switch (format) {
			case "pem": return PemConverter.encode(this.rawData, this.tag);
			default: return super.toString(format);
		}
	}
};
var PublicKey = class PublicKey extends PemData {
	static async create(data, crypto = cryptoProvider.get()) {
		if (data instanceof PublicKey) return data;
		else if (CryptoProvider.isCryptoKey(data)) {
			if (data.type !== "public") throw new TypeError("Public key is required");
			return new PublicKey(await crypto.subtle.exportKey("spki", data));
		} else if (data.publicKey) return data.publicKey;
		else if (BufferSourceConverter.isBufferSource(data)) return new PublicKey(data);
		else throw new TypeError("Unsupported PublicKeyType");
	}
	constructor(param) {
		if (PemData.isAsnEncoded(param)) super(param, SubjectPublicKeyInfo);
		else super(param);
		this.tag = PemConverter.PublicKeyTag;
	}
	async export(...args) {
		let crypto;
		let keyUsages = ["verify"];
		let algorithm = {
			hash: "SHA-256",
			...this.algorithm
		};
		if (args.length > 1) {
			algorithm = args[0] || algorithm;
			keyUsages = args[1] || keyUsages;
			crypto = args[2] || cryptoProvider.get();
		} else crypto = args[0] || cryptoProvider.get();
		let raw = this.rawData;
		const asnSpki = AsnConvert.parse(this.rawData, SubjectPublicKeyInfo);
		if (asnSpki.algorithm.algorithm === id_RSASSA_PSS) raw = convertSpkiToRsaPkcs1(asnSpki, raw);
		return crypto.subtle.importKey("spki", raw, algorithm, true, keyUsages);
	}
	onInit(asn) {
		const algProv = instance.resolve(diAlgorithmProvider);
		const algorithm = this.algorithm = algProv.toWebAlgorithm(asn.algorithm);
		switch (asn.algorithm.algorithm) {
			case id_rsaEncryption: {
				const rsaPublicKey = AsnConvert.parse(asn.subjectPublicKey, RSAPublicKey);
				const modulus = BufferSourceConverter.toUint8Array(rsaPublicKey.modulus);
				algorithm.publicExponent = BufferSourceConverter.toUint8Array(rsaPublicKey.publicExponent);
				algorithm.modulusLength = (!modulus[0] ? modulus.slice(1) : modulus).byteLength << 3;
				break;
			}
		}
	}
	async getThumbprint(...args) {
		var _a;
		let crypto;
		let algorithm = "SHA-1";
		if (args.length >= 1 && !((_a = args[0]) === null || _a === void 0 ? void 0 : _a.subtle)) {
			algorithm = args[0] || algorithm;
			crypto = args[1] || cryptoProvider.get();
		} else crypto = args[0] || cryptoProvider.get();
		return await crypto.subtle.digest(algorithm, this.rawData);
	}
	async getKeyIdentifier(...args) {
		let crypto;
		let algorithm = "SHA-1";
		if (args.length === 1) if (typeof args[0] === "string") {
			algorithm = args[0];
			crypto = cryptoProvider.get();
		} else crypto = args[0];
		else if (args.length === 2) {
			algorithm = args[0];
			crypto = args[1];
		} else crypto = cryptoProvider.get();
		const asn = AsnConvert.parse(this.rawData, SubjectPublicKeyInfo);
		return await crypto.subtle.digest(algorithm, asn.subjectPublicKey);
	}
	toTextObject() {
		const obj = this.toTextObjectEmpty();
		const asn = AsnConvert.parse(this.rawData, SubjectPublicKeyInfo);
		obj["Algorithm"] = TextConverter.serializeAlgorithm(asn.algorithm);
		switch (asn.algorithm.algorithm) {
			case id_ecPublicKey:
				obj["EC Point"] = asn.subjectPublicKey;
				break;
			case id_rsaEncryption:
			default: obj["Raw Data"] = asn.subjectPublicKey;
		}
		return obj;
	}
};
function convertSpkiToRsaPkcs1(asnSpki, raw) {
	asnSpki.algorithm = new AlgorithmIdentifier({
		algorithm: id_rsaEncryption,
		parameters: null
	});
	raw = AsnConvert.serialize(asnSpki);
	return raw;
}
var AuthorityKeyIdentifierExtension = class AuthorityKeyIdentifierExtension extends Extension {
	static async create(param, critical = false, crypto = cryptoProvider.get()) {
		if ("name" in param && "serialNumber" in param) return new AuthorityKeyIdentifierExtension(param, critical);
		const id = await (await PublicKey.create(param, crypto)).getKeyIdentifier(crypto);
		return new AuthorityKeyIdentifierExtension(Convert.ToHex(id), critical);
	}
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else if (typeof args[0] === "string") {
			const value = new AuthorityKeyIdentifier({ keyIdentifier: new KeyIdentifier(Convert.FromHex(args[0])) });
			super(id_ce_authorityKeyIdentifier, args[1], AsnConvert.serialize(value));
		} else {
			const certId = args[0];
			const value = new AuthorityKeyIdentifier({
				authorityCertIssuer: certId.name instanceof GeneralNames ? AsnConvert.parse(certId.name.rawData, GeneralNames$1) : certId.name,
				authorityCertSerialNumber: Convert.FromHex(certId.serialNumber)
			});
			super(id_ce_authorityKeyIdentifier, args[1], AsnConvert.serialize(value));
		}
	}
	onInit(asn) {
		super.onInit(asn);
		const aki = AsnConvert.parse(asn.extnValue, AuthorityKeyIdentifier);
		if (aki.keyIdentifier) this.keyId = Convert.ToHex(aki.keyIdentifier);
		if (aki.authorityCertIssuer || aki.authorityCertSerialNumber) this.certId = {
			name: aki.authorityCertIssuer || [],
			serialNumber: aki.authorityCertSerialNumber ? Convert.ToHex(aki.authorityCertSerialNumber) : ""
		};
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		const asn = AsnConvert.parse(this.value, AuthorityKeyIdentifier);
		if (asn.authorityCertIssuer) obj["Authority Issuer"] = new GeneralNames(asn.authorityCertIssuer).toTextObject();
		if (asn.authorityCertSerialNumber) obj["Authority Serial Number"] = asn.authorityCertSerialNumber;
		if (asn.keyIdentifier) obj[""] = asn.keyIdentifier;
		return obj;
	}
};
AuthorityKeyIdentifierExtension.NAME = "Authority Key Identifier";
var BasicConstraintsExtension = class extends Extension {
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) {
			super(args[0]);
			const value = AsnConvert.parse(this.value, BasicConstraints);
			this.ca = value.cA;
			this.pathLength = value.pathLenConstraint;
		} else {
			const value = new BasicConstraints({
				cA: args[0],
				pathLenConstraint: args[1]
			});
			super(id_ce_basicConstraints, args[2], AsnConvert.serialize(value));
			this.ca = args[0];
			this.pathLength = args[1];
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		if (this.ca) obj["CA"] = this.ca;
		if (this.pathLength !== void 0) obj["Path Length"] = this.pathLength;
		return obj;
	}
};
BasicConstraintsExtension.NAME = "Basic Constraints";
var ExtendedKeyUsage;
(function(ExtendedKeyUsage) {
	ExtendedKeyUsage["serverAuth"] = "1.3.6.1.5.5.7.3.1";
	ExtendedKeyUsage["clientAuth"] = "1.3.6.1.5.5.7.3.2";
	ExtendedKeyUsage["codeSigning"] = "1.3.6.1.5.5.7.3.3";
	ExtendedKeyUsage["emailProtection"] = "1.3.6.1.5.5.7.3.4";
	ExtendedKeyUsage["timeStamping"] = "1.3.6.1.5.5.7.3.8";
	ExtendedKeyUsage["ocspSigning"] = "1.3.6.1.5.5.7.3.9";
})(ExtendedKeyUsage || (ExtendedKeyUsage = {}));
var ExtendedKeyUsageExtension = class extends Extension {
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) {
			super(args[0]);
			const value = AsnConvert.parse(this.value, ExtendedKeyUsage$1);
			this.usages = value.map((o) => o);
		} else {
			const value = new ExtendedKeyUsage$1(args[0]);
			super(id_ce_extKeyUsage, args[1], AsnConvert.serialize(value));
			this.usages = args[0];
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj[""] = this.usages.map((o) => OidSerializer.toString(o)).join(", ");
		return obj;
	}
};
ExtendedKeyUsageExtension.NAME = "Extended Key Usages";
var KeyUsageFlags;
(function(KeyUsageFlags) {
	KeyUsageFlags[KeyUsageFlags["digitalSignature"] = 1] = "digitalSignature";
	KeyUsageFlags[KeyUsageFlags["nonRepudiation"] = 2] = "nonRepudiation";
	KeyUsageFlags[KeyUsageFlags["keyEncipherment"] = 4] = "keyEncipherment";
	KeyUsageFlags[KeyUsageFlags["dataEncipherment"] = 8] = "dataEncipherment";
	KeyUsageFlags[KeyUsageFlags["keyAgreement"] = 16] = "keyAgreement";
	KeyUsageFlags[KeyUsageFlags["keyCertSign"] = 32] = "keyCertSign";
	KeyUsageFlags[KeyUsageFlags["cRLSign"] = 64] = "cRLSign";
	KeyUsageFlags[KeyUsageFlags["encipherOnly"] = 128] = "encipherOnly";
	KeyUsageFlags[KeyUsageFlags["decipherOnly"] = 256] = "decipherOnly";
})(KeyUsageFlags || (KeyUsageFlags = {}));
var KeyUsagesExtension = class extends Extension {
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) {
			super(args[0]);
			const value = AsnConvert.parse(this.value, KeyUsage);
			this.usages = value.toNumber();
		} else {
			const value = new KeyUsage(args[0]);
			super(id_ce_keyUsage, args[1], AsnConvert.serialize(value));
			this.usages = args[0];
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj[""] = AsnConvert.parse(this.value, KeyUsage).toJSON().join(", ");
		return obj;
	}
};
KeyUsagesExtension.NAME = "Key Usages";
var SubjectKeyIdentifierExtension = class SubjectKeyIdentifierExtension extends Extension {
	static async create(publicKey, critical = false, crypto = cryptoProvider.get()) {
		const id = await (await PublicKey.create(publicKey, crypto)).getKeyIdentifier(crypto);
		return new SubjectKeyIdentifierExtension(Convert.ToHex(id), critical);
	}
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) {
			super(args[0]);
			const value = AsnConvert.parse(this.value, SubjectKeyIdentifier);
			this.keyId = Convert.ToHex(value);
		} else {
			const identifier = typeof args[0] === "string" ? Convert.FromHex(args[0]) : args[0];
			const value = new SubjectKeyIdentifier(identifier);
			super(id_ce_subjectKeyIdentifier, args[1], AsnConvert.serialize(value));
			this.keyId = Convert.ToHex(identifier);
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj[""] = AsnConvert.parse(this.value, SubjectKeyIdentifier);
		return obj;
	}
};
SubjectKeyIdentifierExtension.NAME = "Subject Key Identifier";
var SubjectAlternativeNameExtension = class extends Extension {
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else super(id_ce_subjectAltName, args[1], new GeneralNames(args[0] || []).rawData);
	}
	onInit(asn) {
		super.onInit(asn);
		const value = AsnConvert.parse(asn.extnValue, SubjectAlternativeName);
		this.names = new GeneralNames(value);
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		const namesObj = this.names.toTextObject();
		for (const key in namesObj) obj[key] = namesObj[key];
		return obj;
	}
};
SubjectAlternativeNameExtension.NAME = "Subject Alternative Name";
var ExtensionFactory = class {
	static register(id, type) {
		this.items.set(id, type);
	}
	static create(data) {
		const extension = new Extension(data);
		const Type = this.items.get(extension.type);
		if (Type) return new Type(data);
		return extension;
	}
};
ExtensionFactory.items = /* @__PURE__ */ new Map();
var CertificatePolicyExtension = class extends Extension {
	constructor(...args) {
		var _a;
		if (BufferSourceConverter.isBufferSource(args[0])) {
			super(args[0]);
			const asnPolicies = AsnConvert.parse(this.value, CertificatePolicies);
			this.policies = asnPolicies.map((o) => o.policyIdentifier);
		} else {
			const policies = args[0];
			const critical = (_a = args[1]) !== null && _a !== void 0 ? _a : false;
			const value = new CertificatePolicies(policies.map((o) => new PolicyInformation({ policyIdentifier: o })));
			super(id_ce_certificatePolicies, critical, AsnConvert.serialize(value));
			this.policies = policies;
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj["Policy"] = this.policies.map((o) => new TextObject("", {}, OidSerializer.toString(o)));
		return obj;
	}
};
CertificatePolicyExtension.NAME = "Certificate Policies";
ExtensionFactory.register(id_ce_certificatePolicies, CertificatePolicyExtension);
var CRLDistributionPointsExtension = class extends Extension {
	constructor(...args) {
		var _a;
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else if (Array.isArray(args[0]) && typeof args[0][0] === "string") {
			const dps = args[0].map((url) => {
				return new DistributionPoint({ distributionPoint: new DistributionPointName({ fullName: [new GeneralName$1({ uniformResourceIdentifier: url })] }) });
			});
			const value = new CRLDistributionPoints(dps);
			super(id_ce_cRLDistributionPoints, args[1], AsnConvert.serialize(value));
		} else {
			const value = new CRLDistributionPoints(args[0]);
			super(id_ce_cRLDistributionPoints, args[1], AsnConvert.serialize(value));
		}
		(_a = this.distributionPoints) !== null && _a !== void 0 || (this.distributionPoints = []);
	}
	onInit(asn) {
		super.onInit(asn);
		const crlExt = AsnConvert.parse(asn.extnValue, CRLDistributionPoints);
		this.distributionPoints = crlExt;
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj["Distribution Point"] = this.distributionPoints.map((dp) => {
			var _a;
			const dpObj = {};
			if (dp.distributionPoint) dpObj[""] = (_a = dp.distributionPoint.fullName) === null || _a === void 0 ? void 0 : _a.map((name) => new GeneralName(name).toString()).join(", ");
			if (dp.reasons) dpObj["Reasons"] = dp.reasons.toString();
			if (dp.cRLIssuer) dpObj["CRL Issuer"] = dp.cRLIssuer.map((issuer) => issuer.toString()).join(", ");
			return dpObj;
		});
		return obj;
	}
};
CRLDistributionPointsExtension.NAME = "CRL Distribution Points";
var AuthorityInfoAccessExtension = class extends Extension {
	constructor(...args) {
		var _a, _b, _c, _d;
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else if (args[0] instanceof AuthorityInfoAccessSyntax) {
			const value = new AuthorityInfoAccessSyntax(args[0]);
			super(id_pe_authorityInfoAccess, args[1], AsnConvert.serialize(value));
		} else {
			const params = args[0];
			const value = new AuthorityInfoAccessSyntax();
			addAccessDescriptions(value, params, id_ad_ocsp, "ocsp");
			addAccessDescriptions(value, params, id_ad_caIssuers, "caIssuers");
			addAccessDescriptions(value, params, id_ad_timeStamping, "timeStamping");
			addAccessDescriptions(value, params, id_ad_caRepository, "caRepository");
			super(id_pe_authorityInfoAccess, args[1], AsnConvert.serialize(value));
		}
		(_a = this.ocsp) !== null && _a !== void 0 || (this.ocsp = []);
		(_b = this.caIssuers) !== null && _b !== void 0 || (this.caIssuers = []);
		(_c = this.timeStamping) !== null && _c !== void 0 || (this.timeStamping = []);
		(_d = this.caRepository) !== null && _d !== void 0 || (this.caRepository = []);
	}
	onInit(asn) {
		super.onInit(asn);
		this.ocsp = [];
		this.caIssuers = [];
		this.timeStamping = [];
		this.caRepository = [];
		AsnConvert.parse(asn.extnValue, AuthorityInfoAccessSyntax).forEach((accessDescription) => {
			switch (accessDescription.accessMethod) {
				case id_ad_ocsp:
					this.ocsp.push(new GeneralName(accessDescription.accessLocation));
					break;
				case id_ad_caIssuers:
					this.caIssuers.push(new GeneralName(accessDescription.accessLocation));
					break;
				case id_ad_timeStamping:
					this.timeStamping.push(new GeneralName(accessDescription.accessLocation));
					break;
				case id_ad_caRepository:
					this.caRepository.push(new GeneralName(accessDescription.accessLocation));
					break;
			}
		});
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		if (this.ocsp.length) addUrlsToObject(obj, "OCSP", this.ocsp);
		if (this.caIssuers.length) addUrlsToObject(obj, "CA Issuers", this.caIssuers);
		if (this.timeStamping.length) addUrlsToObject(obj, "Time Stamping", this.timeStamping);
		if (this.caRepository.length) addUrlsToObject(obj, "CA Repository", this.caRepository);
		return obj;
	}
};
AuthorityInfoAccessExtension.NAME = "Authority Info Access";
function addUrlsToObject(obj, key, urls) {
	if (urls.length === 1) obj[key] = urls[0].toTextObject();
	else {
		const names = new TextObject("");
		urls.forEach((name, index) => {
			const nameObj = name.toTextObject();
			const indexedKey = `${nameObj[TextObject.NAME]} ${index + 1}`;
			let field = names[indexedKey];
			if (!Array.isArray(field)) {
				field = [];
				names[indexedKey] = field;
			}
			field.push(nameObj);
		});
		obj[key] = names;
	}
}
function addAccessDescriptions(value, params, method, key) {
	const items = params[key];
	if (items) (Array.isArray(items) ? items : [items]).forEach((url) => {
		if (typeof url === "string") url = new GeneralName("url", url);
		value.push(new AccessDescription({
			accessMethod: method,
			accessLocation: AsnConvert.parse(url.rawData, GeneralName$1)
		}));
	});
}
var IssuerAlternativeNameExtension = class extends Extension {
	constructor(...args) {
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else super(id_ce_issuerAltName, args[1], new GeneralNames(args[0] || []).rawData);
	}
	onInit(asn) {
		super.onInit(asn);
		const value = AsnConvert.parse(asn.extnValue, GeneralNames$1);
		this.names = new GeneralNames(value);
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		const namesObj = this.names.toTextObject();
		for (const key in namesObj) obj[key] = namesObj[key];
		return obj;
	}
};
IssuerAlternativeNameExtension.NAME = "Issuer Alternative Name";
var Attribute = class Attribute extends AsnData {
	constructor(...args) {
		let raw;
		if (BufferSourceConverter.isBufferSource(args[0])) raw = BufferSourceConverter.toArrayBuffer(args[0]);
		else {
			const type = args[0];
			const values = Array.isArray(args[1]) ? args[1].map((o) => BufferSourceConverter.toArrayBuffer(o)) : [];
			raw = AsnConvert.serialize(new Attribute$2({
				type,
				values
			}));
		}
		super(raw, Attribute$2);
	}
	onInit(asn) {
		this.type = asn.type;
		this.values = asn.values;
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj["Value"] = this.values.map((o) => new TextObject("", { "": o }));
		return obj;
	}
	toTextObjectWithoutValue() {
		const obj = this.toTextObjectEmpty();
		if (obj[TextObject.NAME] === Attribute.NAME) obj[TextObject.NAME] = OidSerializer.toString(this.type);
		return obj;
	}
};
Attribute.NAME = "Attribute";
var ChallengePasswordAttribute = class extends Attribute {
	constructor(...args) {
		var _a;
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else {
			const value = new ChallengePassword({ printableString: args[0] });
			super(id_pkcs9_at_challengePassword, [AsnConvert.serialize(value)]);
		}
		(_a = this.password) !== null && _a !== void 0 || (this.password = "");
	}
	onInit(asn) {
		super.onInit(asn);
		if (this.values[0]) {
			const value = AsnConvert.parse(this.values[0], ChallengePassword);
			this.password = value.toString();
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		obj[TextObject.VALUE] = this.password;
		return obj;
	}
};
ChallengePasswordAttribute.NAME = "Challenge Password";
var ExtensionsAttribute = class extends Attribute {
	constructor(...args) {
		var _a;
		if (BufferSourceConverter.isBufferSource(args[0])) super(args[0]);
		else {
			const extensions = args[0];
			const value = new Extensions();
			for (const extension of extensions) value.push(AsnConvert.parse(extension.rawData, Extension$1));
			super(id_pkcs9_at_extensionRequest, [AsnConvert.serialize(value)]);
		}
		(_a = this.items) !== null && _a !== void 0 || (this.items = []);
	}
	onInit(asn) {
		super.onInit(asn);
		if (this.values[0]) {
			const value = AsnConvert.parse(this.values[0], Extensions);
			this.items = value.map((o) => ExtensionFactory.create(AsnConvert.serialize(o)));
		}
	}
	toTextObject() {
		const obj = this.toTextObjectWithoutValue();
		const extensions = this.items.map((o) => o.toTextObject());
		for (const extension of extensions) obj[extension[TextObject.NAME]] = extension;
		return obj;
	}
};
ExtensionsAttribute.NAME = "Extensions";
var AttributeFactory = class {
	static register(id, type) {
		this.items.set(id, type);
	}
	static create(data) {
		const attribute = new Attribute(data);
		const Type = this.items.get(attribute.type);
		if (Type) return new Type(data);
		return attribute;
	}
};
AttributeFactory.items = /* @__PURE__ */ new Map();
var diAsnSignatureFormatter = "crypto.signatureFormatter";
var AsnDefaultSignatureFormatter = class {
	toAsnSignature(algorithm, signature) {
		return BufferSourceConverter.toArrayBuffer(signature);
	}
	toWebSignature(algorithm, signature) {
		return BufferSourceConverter.toArrayBuffer(signature);
	}
};
var RsaAlgorithm_1;
var RsaAlgorithm = RsaAlgorithm_1 = class RsaAlgorithm {
	static createPssParams(hash, saltLength) {
		const hashAlgorithm = RsaAlgorithm_1.getHashAlgorithm(hash);
		if (!hashAlgorithm) return null;
		return new RsaSaPssParams({
			hashAlgorithm,
			maskGenAlgorithm: new AlgorithmIdentifier({
				algorithm: id_mgf1,
				parameters: AsnConvert.serialize(hashAlgorithm)
			}),
			saltLength
		});
	}
	static getHashAlgorithm(alg) {
		const algProv = instance.resolve(diAlgorithmProvider);
		if (typeof alg === "string") return algProv.toAsnAlgorithm({ name: alg });
		if (typeof alg === "object" && alg && "name" in alg) return algProv.toAsnAlgorithm(alg);
		return null;
	}
	toAsnAlgorithm(alg) {
		switch (alg.name.toLowerCase()) {
			case "rsassa-pkcs1-v1_5":
				if ("hash" in alg) {
					let hash;
					if (typeof alg.hash === "string") hash = alg.hash;
					else if (alg.hash && typeof alg.hash === "object" && "name" in alg.hash && typeof alg.hash.name === "string") hash = alg.hash.name.toUpperCase();
					else throw new Error("Cannot get hash algorithm name");
					switch (hash.toLowerCase()) {
						case "sha-1": return new AlgorithmIdentifier({
							algorithm: id_sha1WithRSAEncryption,
							parameters: null
						});
						case "sha-256": return new AlgorithmIdentifier({
							algorithm: id_sha256WithRSAEncryption,
							parameters: null
						});
						case "sha-384": return new AlgorithmIdentifier({
							algorithm: id_sha384WithRSAEncryption,
							parameters: null
						});
						case "sha-512": return new AlgorithmIdentifier({
							algorithm: id_sha512WithRSAEncryption,
							parameters: null
						});
					}
				} else return new AlgorithmIdentifier({
					algorithm: id_rsaEncryption,
					parameters: null
				});
				break;
			case "rsa-pss": if ("hash" in alg) {
				if (!("saltLength" in alg && typeof alg.saltLength === "number")) throw new Error("Cannot get 'saltLength' from 'alg' argument");
				const pssParams = RsaAlgorithm_1.createPssParams(alg.hash, alg.saltLength);
				if (!pssParams) throw new Error("Cannot create PSS parameters");
				return new AlgorithmIdentifier({
					algorithm: id_RSASSA_PSS,
					parameters: AsnConvert.serialize(pssParams)
				});
			} else return new AlgorithmIdentifier({
				algorithm: id_RSASSA_PSS,
				parameters: null
			});
		}
		return null;
	}
	toWebAlgorithm(alg) {
		switch (alg.algorithm) {
			case id_rsaEncryption: return { name: "RSASSA-PKCS1-v1_5" };
			case id_sha1WithRSAEncryption: return {
				name: "RSASSA-PKCS1-v1_5",
				hash: { name: "SHA-1" }
			};
			case id_sha256WithRSAEncryption: return {
				name: "RSASSA-PKCS1-v1_5",
				hash: { name: "SHA-256" }
			};
			case id_sha384WithRSAEncryption: return {
				name: "RSASSA-PKCS1-v1_5",
				hash: { name: "SHA-384" }
			};
			case id_sha512WithRSAEncryption: return {
				name: "RSASSA-PKCS1-v1_5",
				hash: { name: "SHA-512" }
			};
			case id_RSASSA_PSS: if (alg.parameters) {
				const pssParams = AsnConvert.parse(alg.parameters, RsaSaPssParams);
				return {
					name: "RSA-PSS",
					hash: instance.resolve(diAlgorithmProvider).toWebAlgorithm(pssParams.hashAlgorithm),
					saltLength: pssParams.saltLength
				};
			} else return { name: "RSA-PSS" };
		}
		return null;
	}
};
RsaAlgorithm = RsaAlgorithm_1 = __decorate([injectable()], RsaAlgorithm);
instance.registerSingleton(diAlgorithm, RsaAlgorithm);
var ShaAlgorithm = class ShaAlgorithm {
	toAsnAlgorithm(alg) {
		switch (alg.name.toLowerCase()) {
			case "sha-1": return new AlgorithmIdentifier({ algorithm: id_sha1 });
			case "sha-256": return new AlgorithmIdentifier({ algorithm: id_sha256 });
			case "sha-384": return new AlgorithmIdentifier({ algorithm: id_sha384 });
			case "sha-512": return new AlgorithmIdentifier({ algorithm: id_sha512 });
		}
		return null;
	}
	toWebAlgorithm(alg) {
		switch (alg.algorithm) {
			case id_sha1: return { name: "SHA-1" };
			case id_sha256: return { name: "SHA-256" };
			case id_sha384: return { name: "SHA-384" };
			case id_sha512: return { name: "SHA-512" };
		}
		return null;
	}
};
ShaAlgorithm = __decorate([injectable()], ShaAlgorithm);
instance.registerSingleton(diAlgorithm, ShaAlgorithm);
var AsnEcSignatureFormatter = class AsnEcSignatureFormatter {
	addPadding(pointSize, data) {
		const bytes = BufferSourceConverter.toUint8Array(data);
		const res = new Uint8Array(pointSize);
		res.set(bytes, pointSize - bytes.length);
		return res.buffer;
	}
	removePadding(data, positive = false) {
		let bytes = BufferSourceConverter.toUint8Array(data);
		for (let i = 0; i < bytes.length; i++) {
			if (!bytes[i]) continue;
			bytes = bytes.slice(i);
			break;
		}
		if (positive && bytes[0] > 127) {
			const result = new Uint8Array(bytes.length + 1);
			result.set(bytes, 1);
			return result.buffer;
		}
		return bytes.buffer;
	}
	toAsnSignature(algorithm, signature) {
		if (algorithm.name === "ECDSA") {
			const namedCurve = algorithm.namedCurve;
			const pointSize = AsnEcSignatureFormatter.namedCurveSize.get(namedCurve) || AsnEcSignatureFormatter.defaultNamedCurveSize;
			const ecSignature = new ECDSASigValue();
			const uint8Signature = BufferSourceConverter.toUint8Array(signature);
			ecSignature.r = this.removePadding(uint8Signature.slice(0, pointSize), true);
			ecSignature.s = this.removePadding(uint8Signature.slice(pointSize, pointSize + pointSize), true);
			return AsnConvert.serialize(ecSignature);
		}
		return null;
	}
	toWebSignature(algorithm, signature) {
		if (algorithm.name === "ECDSA") {
			const ecSigValue = AsnConvert.parse(signature, ECDSASigValue);
			const namedCurve = algorithm.namedCurve;
			const pointSize = AsnEcSignatureFormatter.namedCurveSize.get(namedCurve) || AsnEcSignatureFormatter.defaultNamedCurveSize;
			return combine(this.addPadding(pointSize, this.removePadding(ecSigValue.r)), this.addPadding(pointSize, this.removePadding(ecSigValue.s)));
		}
		return null;
	}
};
AsnEcSignatureFormatter.namedCurveSize = /* @__PURE__ */ new Map();
AsnEcSignatureFormatter.defaultNamedCurveSize = 32;
var idX25519 = "1.3.101.110";
var idX448 = "1.3.101.111";
var idEd25519 = "1.3.101.112";
var idEd448 = "1.3.101.113";
var EdAlgorithm = class EdAlgorithm {
	toAsnAlgorithm(alg) {
		let algorithm = null;
		switch (alg.name.toLowerCase()) {
			case "ed25519":
				algorithm = idEd25519;
				break;
			case "x25519":
				algorithm = idX25519;
				break;
			case "eddsa":
				switch (alg.namedCurve.toLowerCase()) {
					case "ed25519":
						algorithm = idEd25519;
						break;
					case "ed448":
						algorithm = idEd448;
						break;
				}
				break;
			case "ecdh-es": switch (alg.namedCurve.toLowerCase()) {
				case "x25519":
					algorithm = idX25519;
					break;
				case "x448":
					algorithm = idX448;
					break;
			}
		}
		if (algorithm) return new AlgorithmIdentifier({ algorithm });
		return null;
	}
	toWebAlgorithm(alg) {
		switch (alg.algorithm) {
			case idEd25519: return { name: "Ed25519" };
			case idEd448: return {
				name: "EdDSA",
				namedCurve: "Ed448"
			};
			case idX25519: return { name: "X25519" };
			case idX448: return {
				name: "ECDH-ES",
				namedCurve: "X448"
			};
		}
		return null;
	}
};
EdAlgorithm = __decorate([injectable()], EdAlgorithm);
instance.registerSingleton(diAlgorithm, EdAlgorithm);
var _Pkcs10CertificateRequest_tbs, _Pkcs10CertificateRequest_subjectName, _Pkcs10CertificateRequest_subject, _Pkcs10CertificateRequest_signatureAlgorithm, _Pkcs10CertificateRequest_signature, _Pkcs10CertificateRequest_publicKey, _Pkcs10CertificateRequest_attributes, _Pkcs10CertificateRequest_extensions;
var Pkcs10CertificateRequest = class extends PemData {
	get subjectName() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_subjectName, "f")) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_subjectName, new Name(this.asn.certificationRequestInfo.subject), "f");
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_subjectName, "f");
	}
	get subject() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_subject, "f")) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_subject, this.subjectName.toString(), "f");
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_subject, "f");
	}
	get signatureAlgorithm() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_signatureAlgorithm, "f")) {
			const algProv = instance.resolve(diAlgorithmProvider);
			__classPrivateFieldSet(this, _Pkcs10CertificateRequest_signatureAlgorithm, algProv.toWebAlgorithm(this.asn.signatureAlgorithm), "f");
		}
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_signatureAlgorithm, "f");
	}
	get signature() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_signature, "f")) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_signature, this.asn.signature, "f");
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_signature, "f");
	}
	get publicKey() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_publicKey, "f")) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_publicKey, new PublicKey(this.asn.certificationRequestInfo.subjectPKInfo), "f");
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_publicKey, "f");
	}
	get attributes() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_attributes, "f")) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_attributes, this.asn.certificationRequestInfo.attributes.map((o) => AttributeFactory.create(AsnConvert.serialize(o))), "f");
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_attributes, "f");
	}
	get extensions() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_extensions, "f")) {
			__classPrivateFieldSet(this, _Pkcs10CertificateRequest_extensions, [], "f");
			const extensions = this.getAttribute(id_pkcs9_at_extensionRequest);
			if (extensions instanceof ExtensionsAttribute) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_extensions, extensions.items, "f");
		}
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_extensions, "f");
	}
	get tbs() {
		if (!__classPrivateFieldGet(this, _Pkcs10CertificateRequest_tbs, "f")) __classPrivateFieldSet(this, _Pkcs10CertificateRequest_tbs, this.asn.certificationRequestInfoRaw || AsnConvert.serialize(this.asn.certificationRequestInfo), "f");
		return __classPrivateFieldGet(this, _Pkcs10CertificateRequest_tbs, "f");
	}
	constructor(param) {
		const args = PemData.isAsnEncoded(param) ? [param, CertificationRequest] : [param];
		super(args[0], args[1]);
		_Pkcs10CertificateRequest_tbs.set(this, void 0);
		_Pkcs10CertificateRequest_subjectName.set(this, void 0);
		_Pkcs10CertificateRequest_subject.set(this, void 0);
		_Pkcs10CertificateRequest_signatureAlgorithm.set(this, void 0);
		_Pkcs10CertificateRequest_signature.set(this, void 0);
		_Pkcs10CertificateRequest_publicKey.set(this, void 0);
		_Pkcs10CertificateRequest_attributes.set(this, void 0);
		_Pkcs10CertificateRequest_extensions.set(this, void 0);
		this.tag = PemConverter.CertificateRequestTag;
	}
	onInit(_asn) {}
	getAttribute(type) {
		for (const attr of this.attributes) if (attr.type === type) return attr;
		return null;
	}
	getAttributes(type) {
		return this.attributes.filter((o) => o.type === type);
	}
	getExtension(type) {
		for (const ext of this.extensions) if (ext.type === type) return ext;
		return null;
	}
	getExtensions(type) {
		return this.extensions.filter((o) => o.type === type);
	}
	async verify(crypto = cryptoProvider.get()) {
		const algorithm = {
			...this.publicKey.algorithm,
			...this.signatureAlgorithm
		};
		const publicKey = await this.publicKey.export(algorithm, ["verify"], crypto);
		const signatureFormatters = instance.resolveAll(diAsnSignatureFormatter).reverse();
		let signature = null;
		for (const signatureFormatter of signatureFormatters) {
			signature = signatureFormatter.toWebSignature(algorithm, this.signature);
			if (signature) break;
		}
		if (!signature) throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
		return await crypto.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
	}
	toTextObject() {
		const obj = this.toTextObjectEmpty();
		const req = AsnConvert.parse(this.rawData, CertificationRequest);
		const tbs = req.certificationRequestInfo;
		const data = new TextObject("", {
			Version: `${Version$2[tbs.version]} (${tbs.version})`,
			Subject: this.subject,
			"Subject Public Key Info": this.publicKey
		});
		if (this.attributes.length) {
			const attrs = new TextObject("");
			for (const ext of this.attributes) {
				const attrObj = ext.toTextObject();
				attrs[attrObj[TextObject.NAME]] = attrObj;
			}
			data["Attributes"] = attrs;
		}
		obj["Data"] = data;
		obj["Signature"] = new TextObject("", {
			Algorithm: TextConverter.serializeAlgorithm(req.signatureAlgorithm),
			"": req.signature
		});
		return obj;
	}
};
_Pkcs10CertificateRequest_tbs = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_subjectName = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_subject = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_signatureAlgorithm = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_signature = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_publicKey = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_attributes = /* @__PURE__ */ new WeakMap(), _Pkcs10CertificateRequest_extensions = /* @__PURE__ */ new WeakMap();
Pkcs10CertificateRequest.NAME = "PKCS#10 Certificate Request";
var _X509Certificate_tbs, _X509Certificate_serialNumber, _X509Certificate_subjectName, _X509Certificate_subject, _X509Certificate_issuerName, _X509Certificate_issuer, _X509Certificate_notBefore, _X509Certificate_notAfter, _X509Certificate_signatureAlgorithm, _X509Certificate_signature, _X509Certificate_extensions, _X509Certificate_publicKey;
var X509Certificate = class extends PemData {
	get publicKey() {
		if (!__classPrivateFieldGet(this, _X509Certificate_publicKey, "f")) __classPrivateFieldSet(this, _X509Certificate_publicKey, new PublicKey(this.asn.tbsCertificate.subjectPublicKeyInfo), "f");
		return __classPrivateFieldGet(this, _X509Certificate_publicKey, "f");
	}
	get serialNumber() {
		if (!__classPrivateFieldGet(this, _X509Certificate_serialNumber, "f")) {
			const tbs = this.asn.tbsCertificate;
			let serialNumberBytes = new Uint8Array(tbs.serialNumber);
			if (serialNumberBytes.length > 1 && serialNumberBytes[0] === 0 && serialNumberBytes[1] > 127) serialNumberBytes = serialNumberBytes.slice(1);
			__classPrivateFieldSet(this, _X509Certificate_serialNumber, Convert.ToHex(serialNumberBytes), "f");
		}
		return __classPrivateFieldGet(this, _X509Certificate_serialNumber, "f");
	}
	get subjectName() {
		if (!__classPrivateFieldGet(this, _X509Certificate_subjectName, "f")) __classPrivateFieldSet(this, _X509Certificate_subjectName, new Name(this.asn.tbsCertificate.subject), "f");
		return __classPrivateFieldGet(this, _X509Certificate_subjectName, "f");
	}
	get subject() {
		if (!__classPrivateFieldGet(this, _X509Certificate_subject, "f")) __classPrivateFieldSet(this, _X509Certificate_subject, this.subjectName.toString(), "f");
		return __classPrivateFieldGet(this, _X509Certificate_subject, "f");
	}
	get issuerName() {
		if (!__classPrivateFieldGet(this, _X509Certificate_issuerName, "f")) __classPrivateFieldSet(this, _X509Certificate_issuerName, new Name(this.asn.tbsCertificate.issuer), "f");
		return __classPrivateFieldGet(this, _X509Certificate_issuerName, "f");
	}
	get issuer() {
		if (!__classPrivateFieldGet(this, _X509Certificate_issuer, "f")) __classPrivateFieldSet(this, _X509Certificate_issuer, this.issuerName.toString(), "f");
		return __classPrivateFieldGet(this, _X509Certificate_issuer, "f");
	}
	get notBefore() {
		if (!__classPrivateFieldGet(this, _X509Certificate_notBefore, "f")) {
			const notBefore = this.asn.tbsCertificate.validity.notBefore.utcTime || this.asn.tbsCertificate.validity.notBefore.generalTime;
			if (!notBefore) throw new Error("Cannot get 'notBefore' value");
			__classPrivateFieldSet(this, _X509Certificate_notBefore, notBefore, "f");
		}
		return __classPrivateFieldGet(this, _X509Certificate_notBefore, "f");
	}
	get notAfter() {
		if (!__classPrivateFieldGet(this, _X509Certificate_notAfter, "f")) {
			const notAfter = this.asn.tbsCertificate.validity.notAfter.utcTime || this.asn.tbsCertificate.validity.notAfter.generalTime;
			if (!notAfter) throw new Error("Cannot get 'notAfter' value");
			__classPrivateFieldSet(this, _X509Certificate_notAfter, notAfter, "f");
		}
		return __classPrivateFieldGet(this, _X509Certificate_notAfter, "f");
	}
	get signatureAlgorithm() {
		if (!__classPrivateFieldGet(this, _X509Certificate_signatureAlgorithm, "f")) {
			const algProv = instance.resolve(diAlgorithmProvider);
			__classPrivateFieldSet(this, _X509Certificate_signatureAlgorithm, algProv.toWebAlgorithm(this.asn.signatureAlgorithm), "f");
		}
		return __classPrivateFieldGet(this, _X509Certificate_signatureAlgorithm, "f");
	}
	get signature() {
		if (!__classPrivateFieldGet(this, _X509Certificate_signature, "f")) __classPrivateFieldSet(this, _X509Certificate_signature, this.asn.signatureValue, "f");
		return __classPrivateFieldGet(this, _X509Certificate_signature, "f");
	}
	get extensions() {
		if (!__classPrivateFieldGet(this, _X509Certificate_extensions, "f")) {
			__classPrivateFieldSet(this, _X509Certificate_extensions, [], "f");
			if (this.asn.tbsCertificate.extensions) __classPrivateFieldSet(this, _X509Certificate_extensions, this.asn.tbsCertificate.extensions.map((o) => ExtensionFactory.create(AsnConvert.serialize(o))), "f");
		}
		return __classPrivateFieldGet(this, _X509Certificate_extensions, "f");
	}
	get tbs() {
		if (!__classPrivateFieldGet(this, _X509Certificate_tbs, "f")) __classPrivateFieldSet(this, _X509Certificate_tbs, this.asn.tbsCertificateRaw || AsnConvert.serialize(this.asn.tbsCertificate), "f");
		return __classPrivateFieldGet(this, _X509Certificate_tbs, "f");
	}
	constructor(param) {
		const args = PemData.isAsnEncoded(param) ? [param, Certificate] : [param];
		super(args[0], args[1]);
		_X509Certificate_tbs.set(this, void 0);
		_X509Certificate_serialNumber.set(this, void 0);
		_X509Certificate_subjectName.set(this, void 0);
		_X509Certificate_subject.set(this, void 0);
		_X509Certificate_issuerName.set(this, void 0);
		_X509Certificate_issuer.set(this, void 0);
		_X509Certificate_notBefore.set(this, void 0);
		_X509Certificate_notAfter.set(this, void 0);
		_X509Certificate_signatureAlgorithm.set(this, void 0);
		_X509Certificate_signature.set(this, void 0);
		_X509Certificate_extensions.set(this, void 0);
		_X509Certificate_publicKey.set(this, void 0);
		this.tag = PemConverter.CertificateTag;
	}
	onInit(_asn) {}
	getExtension(type) {
		for (const ext of this.extensions) if (typeof type === "string") {
			if (ext.type === type) return ext;
		} else if (ext instanceof type) return ext;
		return null;
	}
	getExtensions(type) {
		return this.extensions.filter((o) => {
			if (typeof type === "string") return o.type === type;
			else return o instanceof type;
		});
	}
	async verify(params = {}, crypto = cryptoProvider.get()) {
		let keyAlgorithm;
		let publicKey;
		const paramsKey = params.publicKey;
		try {
			if (!paramsKey) {
				keyAlgorithm = {
					...this.publicKey.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = await this.publicKey.export(keyAlgorithm, ["verify"], crypto);
			} else if ("publicKey" in paramsKey) {
				keyAlgorithm = {
					...paramsKey.publicKey.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = await paramsKey.publicKey.export(keyAlgorithm, ["verify"], crypto);
			} else if (paramsKey instanceof PublicKey) {
				keyAlgorithm = {
					...paramsKey.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = await paramsKey.export(keyAlgorithm, ["verify"], crypto);
			} else if (BufferSourceConverter.isBufferSource(paramsKey)) {
				const key = new PublicKey(paramsKey);
				keyAlgorithm = {
					...key.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = await key.export(keyAlgorithm, ["verify"], crypto);
			} else {
				keyAlgorithm = {
					...paramsKey.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = paramsKey;
			}
		} catch {
			return false;
		}
		const signatureFormatters = instance.resolveAll(diAsnSignatureFormatter).reverse();
		let signature = null;
		for (const signatureFormatter of signatureFormatters) {
			signature = signatureFormatter.toWebSignature(keyAlgorithm, this.signature);
			if (signature) break;
		}
		if (!signature) throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
		const ok = await crypto.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
		if (params.signatureOnly) return ok;
		else {
			const time = (params.date || /* @__PURE__ */ new Date()).getTime();
			return ok && this.notBefore.getTime() < time && time < this.notAfter.getTime();
		}
	}
	async getThumbprint(...args) {
		let crypto;
		let algorithm = "SHA-1";
		if (args[0]) if (!args[0].subtle) {
			algorithm = args[0] || algorithm;
			crypto = args[1];
		} else crypto = args[0];
		crypto !== null && crypto !== void 0 || (crypto = cryptoProvider.get());
		return await crypto.subtle.digest(algorithm, this.rawData);
	}
	async isSelfSigned(crypto = cryptoProvider.get()) {
		return this.subject === this.issuer && await this.verify({ signatureOnly: true }, crypto);
	}
	toTextObject() {
		const obj = this.toTextObjectEmpty();
		const cert = AsnConvert.parse(this.rawData, Certificate);
		const tbs = cert.tbsCertificate;
		const data = new TextObject("", {
			Version: `${Version$2[tbs.version]} (${tbs.version})`,
			"Serial Number": tbs.serialNumber,
			"Signature Algorithm": TextConverter.serializeAlgorithm(tbs.signature),
			Issuer: this.issuer,
			Validity: new TextObject("", {
				"Not Before": tbs.validity.notBefore.getTime(),
				"Not After": tbs.validity.notAfter.getTime()
			}),
			Subject: this.subject,
			"Subject Public Key Info": this.publicKey
		});
		if (tbs.issuerUniqueID) data["Issuer Unique ID"] = tbs.issuerUniqueID;
		if (tbs.subjectUniqueID) data["Subject Unique ID"] = tbs.subjectUniqueID;
		if (this.extensions.length) {
			const extensions = new TextObject("");
			for (const ext of this.extensions) {
				const extObj = ext.toTextObject();
				extensions[extObj[TextObject.NAME]] = extObj;
			}
			data["Extensions"] = extensions;
		}
		obj["Data"] = data;
		obj["Signature"] = new TextObject("", {
			Algorithm: TextConverter.serializeAlgorithm(cert.signatureAlgorithm),
			"": cert.signatureValue
		});
		return obj;
	}
};
_X509Certificate_tbs = /* @__PURE__ */ new WeakMap(), _X509Certificate_serialNumber = /* @__PURE__ */ new WeakMap(), _X509Certificate_subjectName = /* @__PURE__ */ new WeakMap(), _X509Certificate_subject = /* @__PURE__ */ new WeakMap(), _X509Certificate_issuerName = /* @__PURE__ */ new WeakMap(), _X509Certificate_issuer = /* @__PURE__ */ new WeakMap(), _X509Certificate_notBefore = /* @__PURE__ */ new WeakMap(), _X509Certificate_notAfter = /* @__PURE__ */ new WeakMap(), _X509Certificate_signatureAlgorithm = /* @__PURE__ */ new WeakMap(), _X509Certificate_signature = /* @__PURE__ */ new WeakMap(), _X509Certificate_extensions = /* @__PURE__ */ new WeakMap(), _X509Certificate_publicKey = /* @__PURE__ */ new WeakMap();
X509Certificate.NAME = "Certificate";
function generateCertificateSerialNumber(input, crypto = cryptoProvider.get()) {
	const inputView = BufferSourceConverter.toUint8Array(Convert.FromHex(input || ""));
	let serialNumber = inputView && inputView.length && inputView.some((o) => o > 0) ? new Uint8Array(inputView) : void 0;
	if (!serialNumber) serialNumber = crypto.getRandomValues(new Uint8Array(16));
	let firstNonZero = 0;
	while (firstNonZero < serialNumber.length - 1 && serialNumber[firstNonZero] === 0) firstNonZero++;
	serialNumber = serialNumber.slice(firstNonZero);
	if (serialNumber[0] > 127) {
		const newSerialNumber = new Uint8Array(serialNumber.length + 1);
		newSerialNumber[0] = 0;
		newSerialNumber.set(serialNumber, 1);
		serialNumber = newSerialNumber;
	}
	return serialNumber.buffer;
}
var _X509CrlEntry_serialNumber, _X509CrlEntry_revocationDate, _X509CrlEntry_reason, _X509CrlEntry_invalidity, _X509CrlEntry_extensions;
var X509CrlReason;
(function(X509CrlReason) {
	X509CrlReason[X509CrlReason["unspecified"] = 0] = "unspecified";
	X509CrlReason[X509CrlReason["keyCompromise"] = 1] = "keyCompromise";
	X509CrlReason[X509CrlReason["cACompromise"] = 2] = "cACompromise";
	X509CrlReason[X509CrlReason["affiliationChanged"] = 3] = "affiliationChanged";
	X509CrlReason[X509CrlReason["superseded"] = 4] = "superseded";
	X509CrlReason[X509CrlReason["cessationOfOperation"] = 5] = "cessationOfOperation";
	X509CrlReason[X509CrlReason["certificateHold"] = 6] = "certificateHold";
	X509CrlReason[X509CrlReason["removeFromCRL"] = 8] = "removeFromCRL";
	X509CrlReason[X509CrlReason["privilegeWithdrawn"] = 9] = "privilegeWithdrawn";
	X509CrlReason[X509CrlReason["aACompromise"] = 10] = "aACompromise";
})(X509CrlReason || (X509CrlReason = {}));
var X509CrlEntry = class extends AsnData {
	get serialNumber() {
		if (!__classPrivateFieldGet(this, _X509CrlEntry_serialNumber, "f")) __classPrivateFieldSet(this, _X509CrlEntry_serialNumber, Convert.ToHex(this.asn.userCertificate), "f");
		return __classPrivateFieldGet(this, _X509CrlEntry_serialNumber, "f");
	}
	get revocationDate() {
		if (!__classPrivateFieldGet(this, _X509CrlEntry_revocationDate, "f")) __classPrivateFieldSet(this, _X509CrlEntry_revocationDate, this.asn.revocationDate.getTime(), "f");
		return __classPrivateFieldGet(this, _X509CrlEntry_revocationDate, "f");
	}
	get reason() {
		if (__classPrivateFieldGet(this, _X509CrlEntry_reason, "f") === void 0) this.extensions;
		return __classPrivateFieldGet(this, _X509CrlEntry_reason, "f");
	}
	get invalidity() {
		if (__classPrivateFieldGet(this, _X509CrlEntry_invalidity, "f") === void 0) this.extensions;
		return __classPrivateFieldGet(this, _X509CrlEntry_invalidity, "f");
	}
	get extensions() {
		if (!__classPrivateFieldGet(this, _X509CrlEntry_extensions, "f")) {
			__classPrivateFieldSet(this, _X509CrlEntry_extensions, [], "f");
			if (this.asn.crlEntryExtensions) __classPrivateFieldSet(this, _X509CrlEntry_extensions, this.asn.crlEntryExtensions.map((o) => {
				const extension = ExtensionFactory.create(AsnConvert.serialize(o));
				switch (extension.type) {
					case id_ce_cRLReasons:
						if (__classPrivateFieldGet(this, _X509CrlEntry_reason, "f") === void 0) __classPrivateFieldSet(this, _X509CrlEntry_reason, AsnConvert.parse(extension.value, CRLReason).reason, "f");
						break;
					case id_ce_invalidityDate:
						if (__classPrivateFieldGet(this, _X509CrlEntry_invalidity, "f") === void 0) __classPrivateFieldSet(this, _X509CrlEntry_invalidity, AsnConvert.parse(extension.value, InvalidityDate).value, "f");
						break;
				}
				return extension;
			}), "f");
		}
		return __classPrivateFieldGet(this, _X509CrlEntry_extensions, "f");
	}
	constructor(...args) {
		let raw;
		if (BufferSourceConverter.isBufferSource(args[0])) raw = BufferSourceConverter.toArrayBuffer(args[0]);
		else if (typeof args[0] === "string") raw = AsnConvert.serialize(new RevokedCertificate({
			userCertificate: generateCertificateSerialNumber(args[0]),
			revocationDate: new Time(args[1]),
			crlEntryExtensions: args[2]
		}));
		else if (args[0] instanceof RevokedCertificate) raw = args[0];
		if (!raw) throw new TypeError("Cannot create X509CrlEntry instance. Wrong constructor arguments.");
		super(raw, RevokedCertificate);
		_X509CrlEntry_serialNumber.set(this, void 0);
		_X509CrlEntry_revocationDate.set(this, void 0);
		_X509CrlEntry_reason.set(this, void 0);
		_X509CrlEntry_invalidity.set(this, void 0);
		_X509CrlEntry_extensions.set(this, void 0);
	}
	onInit(_asn) {}
};
_X509CrlEntry_serialNumber = /* @__PURE__ */ new WeakMap(), _X509CrlEntry_revocationDate = /* @__PURE__ */ new WeakMap(), _X509CrlEntry_reason = /* @__PURE__ */ new WeakMap(), _X509CrlEntry_invalidity = /* @__PURE__ */ new WeakMap(), _X509CrlEntry_extensions = /* @__PURE__ */ new WeakMap();
var _X509Crl_tbs, _X509Crl_signatureAlgorithm, _X509Crl_issuerName, _X509Crl_thisUpdate, _X509Crl_nextUpdate, _X509Crl_entries, _X509Crl_extensions;
var X509Crl = class extends PemData {
	get version() {
		return this.asn.tbsCertList.version;
	}
	get signatureAlgorithm() {
		if (!__classPrivateFieldGet(this, _X509Crl_signatureAlgorithm, "f")) {
			const algProv = instance.resolve(diAlgorithmProvider);
			__classPrivateFieldSet(this, _X509Crl_signatureAlgorithm, algProv.toWebAlgorithm(this.asn.signatureAlgorithm), "f");
		}
		return __classPrivateFieldGet(this, _X509Crl_signatureAlgorithm, "f");
	}
	get signature() {
		return this.asn.signature;
	}
	get issuer() {
		return this.issuerName.toString();
	}
	get issuerName() {
		if (!__classPrivateFieldGet(this, _X509Crl_issuerName, "f")) __classPrivateFieldSet(this, _X509Crl_issuerName, new Name(this.asn.tbsCertList.issuer), "f");
		return __classPrivateFieldGet(this, _X509Crl_issuerName, "f");
	}
	get thisUpdate() {
		if (!__classPrivateFieldGet(this, _X509Crl_thisUpdate, "f")) {
			const thisUpdate = this.asn.tbsCertList.thisUpdate.getTime();
			if (!thisUpdate) throw new Error("Cannot get 'thisUpdate' value");
			__classPrivateFieldSet(this, _X509Crl_thisUpdate, thisUpdate, "f");
		}
		return __classPrivateFieldGet(this, _X509Crl_thisUpdate, "f");
	}
	get nextUpdate() {
		var _a;
		if (__classPrivateFieldGet(this, _X509Crl_nextUpdate, "f") === void 0) __classPrivateFieldSet(this, _X509Crl_nextUpdate, ((_a = this.asn.tbsCertList.nextUpdate) === null || _a === void 0 ? void 0 : _a.getTime()) || void 0, "f");
		return __classPrivateFieldGet(this, _X509Crl_nextUpdate, "f");
	}
	get entries() {
		var _a;
		if (!__classPrivateFieldGet(this, _X509Crl_entries, "f")) __classPrivateFieldSet(this, _X509Crl_entries, ((_a = this.asn.tbsCertList.revokedCertificates) === null || _a === void 0 ? void 0 : _a.map((o) => new X509CrlEntry(o))) || [], "f");
		return __classPrivateFieldGet(this, _X509Crl_entries, "f");
	}
	get extensions() {
		if (!__classPrivateFieldGet(this, _X509Crl_extensions, "f")) {
			__classPrivateFieldSet(this, _X509Crl_extensions, [], "f");
			if (this.asn.tbsCertList.crlExtensions) __classPrivateFieldSet(this, _X509Crl_extensions, this.asn.tbsCertList.crlExtensions.map((o) => ExtensionFactory.create(AsnConvert.serialize(o))), "f");
		}
		return __classPrivateFieldGet(this, _X509Crl_extensions, "f");
	}
	get tbs() {
		if (!__classPrivateFieldGet(this, _X509Crl_tbs, "f")) __classPrivateFieldSet(this, _X509Crl_tbs, this.asn.tbsCertListRaw || AsnConvert.serialize(this.asn.tbsCertList), "f");
		return __classPrivateFieldGet(this, _X509Crl_tbs, "f");
	}
	get tbsCertListSignatureAlgorithm() {
		return this.asn.tbsCertList.signature;
	}
	get certListSignatureAlgorithm() {
		return this.asn.signatureAlgorithm;
	}
	constructor(param) {
		super(param, PemData.isAsnEncoded(param) ? CertificateList : void 0);
		this.tag = PemConverter.CrlTag;
		_X509Crl_tbs.set(this, void 0);
		_X509Crl_signatureAlgorithm.set(this, void 0);
		_X509Crl_issuerName.set(this, void 0);
		_X509Crl_thisUpdate.set(this, void 0);
		_X509Crl_nextUpdate.set(this, void 0);
		_X509Crl_entries.set(this, void 0);
		_X509Crl_extensions.set(this, void 0);
	}
	onInit(_asn) {}
	getExtension(type) {
		for (const ext of this.extensions) if (typeof type === "string") {
			if (ext.type === type) return ext;
		} else if (ext instanceof type) return ext;
		return null;
	}
	getExtensions(type) {
		return this.extensions.filter((o) => {
			if (typeof type === "string") return o.type === type;
			else return o instanceof type;
		});
	}
	async verify(params, crypto = cryptoProvider.get()) {
		if (!this.certListSignatureAlgorithm.isEqual(this.tbsCertListSignatureAlgorithm)) throw new Error("algorithm identifier in the sequence tbsCertList and CertificateList mismatch");
		let keyAlgorithm;
		let publicKey;
		const paramsKey = params.publicKey;
		try {
			if (paramsKey instanceof X509Certificate) {
				keyAlgorithm = {
					...paramsKey.publicKey.algorithm,
					...paramsKey.signatureAlgorithm
				};
				publicKey = await paramsKey.publicKey.export(keyAlgorithm, ["verify"]);
			} else if (paramsKey instanceof PublicKey) {
				keyAlgorithm = {
					...paramsKey.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = await paramsKey.export(keyAlgorithm, ["verify"]);
			} else {
				keyAlgorithm = {
					...paramsKey.algorithm,
					...this.signatureAlgorithm
				};
				publicKey = paramsKey;
			}
		} catch {
			return false;
		}
		const signatureFormatters = instance.resolveAll(diAsnSignatureFormatter).reverse();
		let signature = null;
		for (const signatureFormatter of signatureFormatters) {
			signature = signatureFormatter.toWebSignature(keyAlgorithm, this.signature);
			if (signature) break;
		}
		if (!signature) throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
		return await crypto.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
	}
	async getThumbprint(...args) {
		let crypto;
		let algorithm = "SHA-1";
		if (args[0]) if (!args[0].subtle) {
			algorithm = args[0] || algorithm;
			crypto = args[1];
		} else crypto = args[0];
		crypto !== null && crypto !== void 0 || (crypto = cryptoProvider.get());
		return await crypto.subtle.digest(algorithm, this.rawData);
	}
	findRevoked(certOrSerialNumber) {
		const serialBuffer = generateCertificateSerialNumber(typeof certOrSerialNumber === "string" ? certOrSerialNumber : certOrSerialNumber.serialNumber);
		for (const revoked of this.asn.tbsCertList.revokedCertificates || []) if (BufferSourceConverter.isEqual(revoked.userCertificate, serialBuffer)) return new X509CrlEntry(AsnConvert.serialize(revoked));
		return null;
	}
};
_X509Crl_tbs = /* @__PURE__ */ new WeakMap(), _X509Crl_signatureAlgorithm = /* @__PURE__ */ new WeakMap(), _X509Crl_issuerName = /* @__PURE__ */ new WeakMap(), _X509Crl_thisUpdate = /* @__PURE__ */ new WeakMap(), _X509Crl_nextUpdate = /* @__PURE__ */ new WeakMap(), _X509Crl_entries = /* @__PURE__ */ new WeakMap(), _X509Crl_extensions = /* @__PURE__ */ new WeakMap();
ExtensionFactory.register(id_ce_basicConstraints, BasicConstraintsExtension);
ExtensionFactory.register(id_ce_extKeyUsage, ExtendedKeyUsageExtension);
ExtensionFactory.register(id_ce_keyUsage, KeyUsagesExtension);
ExtensionFactory.register(id_ce_subjectKeyIdentifier, SubjectKeyIdentifierExtension);
ExtensionFactory.register(id_ce_authorityKeyIdentifier, AuthorityKeyIdentifierExtension);
ExtensionFactory.register(id_ce_subjectAltName, SubjectAlternativeNameExtension);
ExtensionFactory.register(id_ce_cRLDistributionPoints, CRLDistributionPointsExtension);
ExtensionFactory.register(id_pe_authorityInfoAccess, AuthorityInfoAccessExtension);
ExtensionFactory.register(id_ce_issuerAltName, IssuerAlternativeNameExtension);
AttributeFactory.register(id_pkcs9_at_challengePassword, ChallengePasswordAttribute);
AttributeFactory.register(id_pkcs9_at_extensionRequest, ExtensionsAttribute);
instance.registerSingleton(diAsnSignatureFormatter, AsnDefaultSignatureFormatter);
instance.registerSingleton(diAsnSignatureFormatter, AsnEcSignatureFormatter);
AsnEcSignatureFormatter.namedCurveSize.set("P-256", 32);
AsnEcSignatureFormatter.namedCurveSize.set("K-256", 32);
AsnEcSignatureFormatter.namedCurveSize.set("P-384", 48);
AsnEcSignatureFormatter.namedCurveSize.set("P-521", 66);
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/fetch.js
/**
* A simple method for requesting data via standard `fetch`. Should work
* across multiple runtimes.
*/
function fetch(url) {
	return _fetchInternals.stubThis(url);
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _fetchInternals = { stubThis: (url) => globalThis.fetch(url) };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/isCertRevoked.js
var cacheRevokedCerts = {};
/**
* A method to pull a CRL from a certificate and compare its serial number to the list of revoked
* certificate serial numbers within the CRL.
*
* CRL certificate structure referenced from https://tools.ietf.org/html/rfc5280#page-117
*/
async function isCertRevoked(cert) {
	const { extensions } = cert;
	if (!extensions) return false;
	let extAuthorityKeyID;
	let extSubjectKeyID;
	let extCRLDistributionPoints;
	extensions.forEach((ext) => {
		if (ext instanceof AuthorityKeyIdentifierExtension) extAuthorityKeyID = ext;
		else if (ext instanceof SubjectKeyIdentifierExtension) extSubjectKeyID = ext;
		else if (ext instanceof CRLDistributionPointsExtension) extCRLDistributionPoints = ext;
	});
	let keyIdentifier = void 0;
	if (extAuthorityKeyID && extAuthorityKeyID.keyId) keyIdentifier = extAuthorityKeyID.keyId;
	else if (extSubjectKeyID)
 /**
	* We might be dealing with a self-signed root certificate. Check the
	* Subject key Identifier extension next.
	*/
	keyIdentifier = extSubjectKeyID.keyId;
	if (keyIdentifier) {
		const cached = cacheRevokedCerts[keyIdentifier];
		if (cached) {
			const now = /* @__PURE__ */ new Date();
			if (!cached.nextUpdate || cached.nextUpdate > now) return cached.revokedCerts.indexOf(cert.serialNumber) >= 0;
		}
	}
	const crlURL = extCRLDistributionPoints?.distributionPoints?.[0].distributionPoint?.fullName?.[0].uniformResourceIdentifier;
	if (!crlURL) return false;
	let certListBytes;
	try {
		certListBytes = await (await fetch(crlURL)).arrayBuffer();
	} catch (_err) {
		return false;
	}
	let data;
	try {
		data = new X509Crl(certListBytes);
	} catch (_err) {
		return false;
	}
	const newCached = {
		revokedCerts: [],
		nextUpdate: void 0
	};
	if (data.nextUpdate) newCached.nextUpdate = data.nextUpdate;
	const revokedCerts = data.entries;
	if (revokedCerts) {
		for (const cert of revokedCerts) {
			const revokedHex = cert.serialNumber;
			newCached.revokedCerts.push(revokedHex);
		}
		if (keyIdentifier) cacheRevokedCerts[keyIdentifier] = newCached;
		return newCached.revokedCerts.indexOf(cert.serialNumber) >= 0;
	}
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/decodeAuthenticatorExtensions.js
/**
* Convert authenticator extension data buffer to a proper object
*
* @param extensionData Authenticator Extension Data buffer
*/
function decodeAuthenticatorExtensions(extensionData) {
	let toCBOR;
	try {
		toCBOR = decodeFirst(extensionData);
	} catch (err) {
		throw new Error(`Error decoding authenticator extensions: ${err.message}`);
	}
	return convertMapToObjectDeep(toCBOR);
}
/**
* CBOR-encoded extensions can be deeply-nested Maps, which are too deep for a simple
* `Object.entries()`. This method will recursively make sure that all Maps are converted into
* basic objects.
*/
function convertMapToObjectDeep(input) {
	const mapped = {};
	for (const [key, value] of input) if (value instanceof Map) mapped[key] = convertMapToObjectDeep(value);
	else mapped[key] = value;
	return mapped;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/parseAuthenticatorData.js
/**
* Make sense of the authData buffer contained in an Attestation
*/
function parseAuthenticatorData(authData) {
	if (authData.byteLength < 37) throw new Error(`Authenticator data was ${authData.byteLength} bytes, expected at least 37 bytes`);
	let pointer = 0;
	const dataView = toDataView(authData);
	const rpIdHash = authData.slice(pointer, pointer += 32);
	const flagsBuf = authData.slice(pointer, pointer += 1);
	const flagsInt = flagsBuf[0];
	const flags = {
		up: !!(flagsInt & 1),
		uv: !!(flagsInt & 4),
		be: !!(flagsInt & 8),
		bs: !!(flagsInt & 16),
		at: !!(flagsInt & 64),
		ed: !!(flagsInt & 128),
		flagsInt
	};
	const counterBuf = authData.slice(pointer, pointer + 4);
	const counter = dataView.getUint32(pointer, false);
	pointer += 4;
	let aaguid = void 0;
	let credentialID = void 0;
	let credentialPublicKey = void 0;
	if (flags.at) {
		aaguid = authData.slice(pointer, pointer += 16);
		const credIDLen = dataView.getUint16(pointer);
		pointer += 2;
		credentialID = authData.slice(pointer, pointer += credIDLen);
		/**
		* Firefox 117 incorrectly CBOR-encodes authData when EdDSA (-8) is used for the public key.
		* A CBOR "Map of 3 items" (0xa3) should be "Map of 4 items" (0xa4), and if we manually adjust
		* the single byte there's a good chance the authData can be correctly parsed.
		*
		* This browser release also incorrectly uses the string labels "OKP" and "Ed25519" instead of
		* their integer representations for kty and crv respectively. That's why the COSE public key
		* in the hex below looks so odd.
		*/
		const badEdDSACBOR = fromHex("a301634f4b500327206745643235353139");
		const bytesAtCurrentPosition = authData.slice(pointer, pointer + badEdDSACBOR.byteLength);
		let foundBadCBOR = false;
		if (areEqual(badEdDSACBOR, bytesAtCurrentPosition)) {
			foundBadCBOR = true;
			authData[pointer] = 164;
		}
		const firstDecoded = decodeFirst(authData.slice(pointer));
		const firstEncoded = Uint8Array.from(
			/**
			* Casting to `Map` via `as unknown` here because TS doesn't make it possible to define Maps
			* with discrete keys and properties with known types per pair, and CBOR libs typically parse
			* CBOR Major Type 5 to `Map` because you can have numbers for keys. A `COSEPublicKey` can be
			* generalized as "a Map with numbers for keys and either numbers or bytes for values" though.
			* If this presumption falls apart then other parts of verification later on will fail so we
			* should be safe doing this here.
			*/
			encode$1(firstDecoded)
		);
		if (foundBadCBOR) authData[pointer] = 163;
		credentialPublicKey = firstEncoded;
		pointer += firstEncoded.byteLength;
	}
	let extensionsData = void 0;
	let extensionsDataBuffer = void 0;
	if (flags.ed) {
		const firstDecoded = decodeFirst(authData.slice(pointer));
		extensionsDataBuffer = Uint8Array.from(encode$1(firstDecoded));
		extensionsData = decodeAuthenticatorExtensions(extensionsDataBuffer);
		pointer += extensionsDataBuffer.byteLength;
	}
	if (authData.byteLength > pointer) throw new Error("Leftover bytes detected while parsing authenticator data");
	return _parseAuthenticatorDataInternals.stubThis({
		rpIdHash,
		flagsBuf,
		flags,
		counter,
		counterBuf,
		aaguid,
		credentialID,
		credentialPublicKey,
		extensionsData,
		extensionsDataBuffer
	});
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _parseAuthenticatorDataInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/toHash.js
/**
* Returns hash digest of the given data, using the given algorithm when provided. Defaults to using
* SHA-256.
*/
function toHash(data, algorithm = -7) {
	if (typeof data === "string") data = fromUTF8String(data);
	return digest(data, algorithm);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/validateCertificatePath.js
/**
* Traverse an array of PEM certificates and ensure they form a proper chain
* @param x5cCertsPEM Typically the result of `x5c.map(convertASN1toPEM)`
* @param trustAnchorsPEM PEM-formatted certs that an attestation statement x5c may chain back to
*/
async function validateCertificatePath(x5cCertsPEM, trustAnchorsPEM = []) {
	if (trustAnchorsPEM.length === 0) return true;
	const WebCrypto = await getWebCrypto();
	const x5cCertsParsed = x5cCertsPEM.map((certPEM) => new X509Certificate(certPEM));
	for (let i = 0; i < x5cCertsParsed.length; i++) {
		const cert = x5cCertsParsed[i];
		const certPEM = x5cCertsPEM[i];
		try {
			await assertCertNotRevoked(cert);
		} catch (_err) {
			throw new Error(`Found revoked certificate in x5c:\n${certPEM}`);
		}
		try {
			assertCertIsWithinValidTimeWindow(cert.notBefore, cert.notAfter);
		} catch (_err) {
			throw new Error(`Found certificate out of validity period in x5c:\n${certPEM}`);
		}
	}
	const trustAnchorsParsed = trustAnchorsPEM.map((certPEM) => {
		try {
			return new X509Certificate(certPEM);
		} catch (err) {
			const _err = err;
			throw new Error(`Could not parse trust anchor certificate:\n${certPEM}`, { cause: _err });
		}
	});
	const validTrustAnchors = [];
	for (let i = 0; i < trustAnchorsParsed.length; i++) {
		const cert = trustAnchorsParsed[i];
		try {
			await assertCertNotRevoked(cert);
		} catch (_err) {
			continue;
		}
		try {
			assertCertIsWithinValidTimeWindow(cert.notBefore, cert.notAfter);
		} catch (_err) {
			continue;
		}
		validTrustAnchors.push(cert);
	}
	if (validTrustAnchors.length === 0) throw new Error("No specified trust anchor was valid for verifying x5c");
	let invalidSubjectAndIssuerError = false;
	for (const anchor of trustAnchorsParsed) try {
		const x5cWithTrustAnchor = x5cCertsParsed.concat([anchor]);
		if (new Set(x5cWithTrustAnchor).size !== x5cWithTrustAnchor.length) throw new Error("Invalid certificate path: found duplicate certificates");
		for (let i = 0; i < x5cWithTrustAnchor.length - 1; i++) {
			const subject = x5cWithTrustAnchor[i];
			const issuer = x5cWithTrustAnchor[i + 1];
			if (!await subject.verify({
				publicKey: issuer.publicKey,
				signatureOnly: true
			}, WebCrypto)) throw new InvalidSubjectAndIssuer();
			if (issuer.subject === issuer.issuer) {
				if (!await issuer.verify({
					publicKey: issuer.publicKey,
					signatureOnly: true
				}, WebCrypto)) throw new InvalidSubjectAndIssuer();
				break;
			}
		}
		invalidSubjectAndIssuerError = false;
		break;
	} catch (err) {
		if (err instanceof InvalidSubjectAndIssuer) invalidSubjectAndIssuerError = true;
		else throw new Error("Unexpected error while validating certificate path", { cause: err });
	}
	if (invalidSubjectAndIssuerError) throw new InvalidSubjectAndIssuer();
	return true;
}
/**
* Check if the certificate is revoked or not. If it is, raise an error
*/
async function assertCertNotRevoked(certificate) {
	if (await isCertRevoked(certificate)) throw new Error("Found revoked certificate in certificate path");
}
/**
* Require the cert to be within its notBefore and notAfter time window
*/
function assertCertIsWithinValidTimeWindow(certNotBefore, certNotAfter) {
	const now = new Date(Date.now());
	if (certNotBefore > now || certNotAfter < now) throw new Error("Certificate is not yet valid or expired");
}
var InvalidSubjectAndIssuer = class extends Error {
	constructor() {
		super("Subject issuer did not match issuer subject");
		this.name = "InvalidSubjectAndIssuer";
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/mapX509SignatureAlgToCOSEAlg.js
/**
* Map X.509 signature algorithm OIDs to COSE algorithm IDs
*
* - EC2 OIDs: https://oidref.com/1.2.840.10045.4.3
* - RSA OIDs: https://oidref.com/1.2.840.113549.1.1
*/
function mapX509SignatureAlgToCOSEAlg(signatureAlgorithm) {
	let alg;
	if (signatureAlgorithm === "1.2.840.10045.4.3.2") alg = COSEALG.ES256;
	else if (signatureAlgorithm === "1.2.840.10045.4.3.3") alg = COSEALG.ES384;
	else if (signatureAlgorithm === "1.2.840.10045.4.3.4") alg = COSEALG.ES512;
	else if (signatureAlgorithm === "1.2.840.113549.1.1.11") alg = COSEALG.RS256;
	else if (signatureAlgorithm === "1.2.840.113549.1.1.12") alg = COSEALG.RS384;
	else if (signatureAlgorithm === "1.2.840.113549.1.1.13") alg = COSEALG.RS512;
	else if (signatureAlgorithm === "1.2.840.113549.1.1.5") alg = COSEALG.RS1;
	else throw new Error(`Unable to map X.509 signature algorithm ${signatureAlgorithm} to a COSE algorithm`);
	return alg;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/convertX509PublicKeyToCOSE.js
function convertX509PublicKeyToCOSE(x509Certificate) {
	let cosePublicKey = /* @__PURE__ */ new Map();
	const { tbsCertificate } = AsnParser.parse(x509Certificate, Certificate);
	const { subjectPublicKeyInfo, signature: _tbsSignature } = tbsCertificate;
	const signatureAlgorithm = _tbsSignature.algorithm;
	const publicKeyAlgorithmID = subjectPublicKeyInfo.algorithm.algorithm;
	if (publicKeyAlgorithmID === "1.2.840.10045.2.1") {
		/**
		* EC2 Public Key
		*/
		if (!subjectPublicKeyInfo.algorithm.parameters) throw new Error("Certificate public key was missing parameters (EC2)");
		const ecParameters = AsnParser.parse(new Uint8Array(subjectPublicKeyInfo.algorithm.parameters), ECParameters);
		let crv = -999;
		const { namedCurve } = ecParameters;
		if (namedCurve === "1.2.840.10045.3.1.7") crv = COSECRV.P256;
		else if (namedCurve === "1.3.132.0.34") crv = COSECRV.P384;
		else throw new Error(`Certificate public key contained unexpected namedCurve ${namedCurve} (EC2)`);
		const subjectPublicKey = new Uint8Array(subjectPublicKeyInfo.subjectPublicKey);
		let x;
		let y;
		if (subjectPublicKey[0] === 4) {
			let pointer = 1;
			const halfLength = (subjectPublicKey.length - 1) / 2;
			x = subjectPublicKey.slice(pointer, pointer += halfLength);
			y = subjectPublicKey.slice(pointer);
		} else throw new Error("TODO: Figure out how to handle public keys in \"compressed form\"");
		const coseEC2PubKey = /* @__PURE__ */ new Map();
		coseEC2PubKey.set(COSEKEYS.kty, COSEKTY.EC2);
		coseEC2PubKey.set(COSEKEYS.alg, mapX509SignatureAlgToCOSEAlg(signatureAlgorithm));
		coseEC2PubKey.set(COSEKEYS.crv, crv);
		coseEC2PubKey.set(COSEKEYS.x, x);
		coseEC2PubKey.set(COSEKEYS.y, y);
		cosePublicKey = coseEC2PubKey;
	} else if (publicKeyAlgorithmID === id_rsaEncryption) {
		/**
		* RSA public key
		*/
		const rsaPublicKey = AsnParser.parse(subjectPublicKeyInfo.subjectPublicKey, RSAPublicKey);
		const coseRSAPubKey = /* @__PURE__ */ new Map();
		coseRSAPubKey.set(COSEKEYS.kty, COSEKTY.RSA);
		coseRSAPubKey.set(COSEKEYS.alg, mapX509SignatureAlgToCOSEAlg(signatureAlgorithm));
		coseRSAPubKey.set(COSEKEYS.n, new Uint8Array(rsaPublicKey.modulus));
		coseRSAPubKey.set(COSEKEYS.e, new Uint8Array(rsaPublicKey.publicExponent));
		cosePublicKey = coseRSAPubKey;
	} else throw new Error(`Certificate public key contained unexpected algorithm ID ${publicKeyAlgorithmID}`);
	return cosePublicKey;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/verifySignature.js
/**
* Verify an authenticator's signature
*/
function verifySignature(opts) {
	const { signature, data, credentialPublicKey, x509Certificate, hashAlgorithm } = opts;
	if (!x509Certificate && !credentialPublicKey) throw new Error("Must declare either \"leafCert\" or \"credentialPublicKey\"");
	if (x509Certificate && credentialPublicKey) throw new Error("Must not declare both \"leafCert\" and \"credentialPublicKey\"");
	let cosePublicKey = /* @__PURE__ */ new Map();
	if (credentialPublicKey) cosePublicKey = decodeCredentialPublicKey(credentialPublicKey);
	else if (x509Certificate) cosePublicKey = convertX509PublicKeyToCOSE(x509Certificate);
	return _verifySignatureInternals.stubThis(verify({
		cosePublicKey,
		signature,
		data,
		shaHashOverride: hashAlgorithm
	}));
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _verifySignatureInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/metadata/parseJWT.js
/**
* Process a JWT into Javascript-friendly data structures
*/
function parseJWT(jwt) {
	const parts = jwt.split(".");
	return [
		JSON.parse(toUTF8String$1(parts[0])),
		JSON.parse(toUTF8String$1(parts[1])),
		parts[2]
	];
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/metadata/verifyJWT.js
/**
* Lightweight verification for FIDO MDS JWTs. Supports use of EC2 and RSA.
*
* If this ever needs to support more JWS algorithms, here's the list of them:
*
* https://www.rfc-editor.org/rfc/rfc7518.html#section-3.1
*
* (Pulled from https://www.rfc-editor.org/rfc/rfc7515#section-4.1.1)
*/
function verifyJWT(jwt, leafCert) {
	const [header, payload, signature] = jwt.split(".");
	const certCOSE = convertX509PublicKeyToCOSE(leafCert);
	const data = fromUTF8String(`${header}.${payload}`);
	const signatureBytes = toBuffer(signature);
	if (isCOSEPublicKeyEC2(certCOSE)) return verifyEC2({
		data,
		signature: signatureBytes,
		cosePublicKey: certCOSE,
		shaHashOverride: COSEALG.ES256
	});
	else if (isCOSEPublicKeyRSA(certCOSE)) return verifyRSA({
		data,
		signature: signatureBytes,
		cosePublicKey: certCOSE
	});
	const kty = certCOSE.get(COSEKEYS.kty);
	throw new Error(`JWT verification with public key of kty ${kty} is not supported by this method`);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/convertPEMToBytes.js
/**
* Take a certificate in PEM format and convert it to bytes
*/
function convertPEMToBytes(pem) {
	return toBuffer(pem.replace("-----BEGIN CERTIFICATE-----", "").replace("-----END CERTIFICATE-----", "").replace(/[\n ]/g, ""), "base64");
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/services/defaultRootCerts/android-safetynet.js
/**
* GlobalSign Root CA
*
* Downloaded from https://pki.goog/roots.pem
*
* Valid until 2028-01-28 @ 04:00 PST
*
* SHA256 Fingerprint
* EB:D4:10:40:E4:BB:3E:C7:42:C9:E3:81:D3:1E:F2:A4:1A:48:B6:68:5C:96:E7:CE:F3:C1:DF:6C:D4:33:1C:99
*/
var GlobalSign_Root_CA = `-----BEGIN CERTIFICATE-----
MIIDdTCCAl2gAwIBAgILBAAAAAABFUtaw5QwDQYJKoZIhvcNAQEFBQAwVzELMAkG
A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw
MDBaFw0yODAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT
aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ
jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp
xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp
1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG
snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ
U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8
9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8E
BTADAQH/MB0GA1UdDgQWBBRge2YaRQ2XyolQL30EzTSo//z9SzANBgkqhkiG9w0B
AQUFAAOCAQEA1nPnfE920I2/7LqivjTFKDK1fPxsnCwrvQmeU79rXqoRSLblCKOz
yj1hTdNGCbM+w6DjY1Ub8rrvrTnhQ7k4o+YviiY776BQVvnGCv04zcQLcFGUl5gE
38NflNUVyRRBnMRddWQVDf9VMOyGj/8N7yy5Y0b2qvzfvGn9LhJIZJrglfCm7ymP
AbEVtQwdpf5pLGkkeB6zpxxxYu7KyJesF12KwvhHhm4qxFYxldBniYUr+WymXUad
DKqC5JlR3XC321Y9YeRq4VzW9v493kHMB65jUr9TU/Qr6cf9tveCX4XSQRjbgbME
HMUfpIBvFSDJ3gyICh3WZlXi/EjJKSZp4A==
-----END CERTIFICATE-----
`;
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/services/defaultRootCerts/android-key.js
/**
* Google Hardware Attestation Root 1
*
* Downloaded from https://developer.android.com/training/articles/security-key-attestation#root_certificate
* (first entry)
*
* Valid until 2026-05-24 @ 09:28 PST
*
* SHA256 Fingerprint
* C1:98:4A:3E:F4:5C:1E:2A:91:85:51:DE:10:60:3C:86:F7:05:1B:22:49:C4:89:1C:AE:32:30:EA:BD:0C:97:D5
*/
var Google_Hardware_Attestation_Root_1 = `-----BEGIN CERTIFICATE-----
MIIFYDCCA0igAwIBAgIJAOj6GWMU0voYMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMTYwNTI2MTYyODUyWhcNMjYwNTI0MTYy
ODUyWjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaOBpjCBozAdBgNVHQ4EFgQUNmHhAHyIBQlRi0RsR/8aTMnqTxIwHwYD
VR0jBBgwFoAUNmHhAHyIBQlRi0RsR/8aTMnqTxIwDwYDVR0TAQH/BAUwAwEB/zAO
BgNVHQ8BAf8EBAMCAYYwQAYDVR0fBDkwNzA1oDOgMYYvaHR0cHM6Ly9hbmRyb2lk
Lmdvb2dsZWFwaXMuY29tL2F0dGVzdGF0aW9uL2NybC8wDQYJKoZIhvcNAQELBQAD
ggIBACDIw41L3KlXG0aMiS//cqrG+EShHUGo8HNsw30W1kJtjn6UBwRM6jnmiwfB
Pb8VA91chb2vssAtX2zbTvqBJ9+LBPGCdw/E53Rbf86qhxKaiAHOjpvAy5Y3m00m
qC0w/Zwvju1twb4vhLaJ5NkUJYsUS7rmJKHHBnETLi8GFqiEsqTWpG/6ibYCv7rY
DBJDcR9W62BW9jfIoBQcxUCUJouMPH25lLNcDc1ssqvC2v7iUgI9LeoM1sNovqPm
QUiG9rHli1vXxzCyaMTjwftkJLkf6724DFhuKug2jITV0QkXvaJWF4nUaHOTNA4u
JU9WDvZLI1j83A+/xnAJUucIv/zGJ1AMH2boHqF8CY16LpsYgBt6tKxxWH00XcyD
CdW2KlBCeqbQPcsFmWyWugxdcekhYsAWyoSf818NUsZdBWBaR/OukXrNLfkQ79Iy
ZohZbvabO/X+MVT3rriAoKc8oE2Uws6DF+60PV7/WIPjNvXySdqspImSN78mflxD
qwLqRBYkA3I75qppLGG9rp7UCdRjxMl8ZDBld+7yvHVgt1cVzJx9xnyGCC23Uaic
MDSXYrB4I4WHXPGjxhZuCuPBLTdOLU8YRvMYdEvYebWHMpvwGCF6bAx3JBpIeOQ1
wDB5y0USicV3YgYGmi+NZfhA4URSh77Yd6uuJOJENRaNVTzk
-----END CERTIFICATE-----
`;
/**
* Google Hardware Attestation Root 2
*
* Downloaded from https://developer.android.com/training/articles/security-key-attestation#root_certificate
* (second entry)
*
* Valid until 2034-11-18 @ 12:37 PST
*
* SHA256 Fingerprint
* 1E:F1:A0:4B:8B:A5:8A:B9:45:89:AC:49:8C:89:82:A7:83:F2:4E:A7:30:7E:01:59:A0:C3:A7:3B:37:7D:87:CC
*/
var Google_Hardware_Attestation_Root_2 = `-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJANUP8luj8tazMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMTkxMTIyMjAzNzU4WhcNMzQxMTE4MjAz
NzU4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQBOMaBc8oumXb2voc7XCWnu
XKhBBK3e2KMGz39t7lA3XXRe2ZLLAkLM5y3J7tURkf5a1SutfdOyXAmeE6SRo83U
h6WszodmMkxK5GM4JGrnt4pBisu5igXEydaW7qq2CdC6DOGjG+mEkN8/TA6p3cno
L/sPyz6evdjLlSeJ8rFBH6xWyIZCbrcpYEJzXaUOEaxxXxgYz5/cTiVKN2M1G2ok
QBUIYSY6bjEL4aUN5cfo7ogP3UvliEo3Eo0YgwuzR2v0KR6C1cZqZJSTnghIC/vA
D32KdNQ+c3N+vl2OTsUVMC1GiWkngNx1OO1+kXW+YTnnTUOtOIswUP/Vqd5SYgAI
mMAfY8U9/iIgkQj6T2W6FsScy94IN9fFhE1UtzmLoBIuUFsVXJMTz+Jucth+IqoW
Fua9v1R93/k98p41pjtFX+H8DslVgfP097vju4KDlqN64xV1grw3ZLl4CiOe/A91
oeLm2UHOq6wn3esB4r2EIQKb6jTVGu5sYCcdWpXr0AUVqcABPdgL+H7qJguBw09o
jm6xNIrw2OocrDKsudk/okr/AwqEyPKw9WnMlQgLIKw1rODG2NvU9oR3GVGdMkUB
ZutL8VuFkERQGt6vQ2OCw0sV47VMkuYbacK/xyZFiRcrPJPb41zgbQj9XAEyLKCH
ex0SdDrx+tWUDqG8At2JHA==
-----END CERTIFICATE-----
`;
/**
* Google Hardware Attestation Root 3
*
* Downloaded from https://developer.android.com/training/articles/security-key-attestation#root_certificate
* (third entry)
*
* Valid until 2036-11-13 @ 15:10 PST
*
* SHA256 Fingerprint
* AB:66:41:17:8A:36:E1:79:AA:0C:1C:DD:DF:9A:16:EB:45:FA:20:94:3E:2B:8C:D7:C7:C0:5C:26:CF:8B:48:7A
*/
var Google_Hardware_Attestation_Root_3 = `
-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAMNrfES5rhgxMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjExMTE3MjMxMDQyWhcNMzYxMTEzMjMx
MDQyWjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQBTNNZe5cuf8oiq+jV0itTG
zWVhSTjOBEk2FQvh11J3o3lna0o7rd8RFHnN00q4hi6TapFhh4qaw/iG6Xg+xOan
63niLWIC5GOPFgPeYXM9+nBb3zZzC8ABypYuCusWCmt6Tn3+Pjbz3MTVhRGXuT/T
QH4KGFY4PhvzAyXwdjTOCXID+aHud4RLcSySr0Fq/L+R8TWalvM1wJJPhyRjqRCJ
erGtfBagiALzvhnmY7U1qFcS0NCnKjoO7oFedKdWlZz0YAfu3aGCJd4KHT0MsGiL
Zez9WP81xYSrKMNEsDK+zK5fVzw6jA7cxmpXcARTnmAuGUeI7VVDhDzKeVOctf3a
0qQLwC+d0+xrETZ4r2fRGNw2YEs2W8Qj6oDcfPvq9JySe7pJ6wcHnl5EZ0lwc4xH
7Y4Dx9RA1JlfooLMw3tOdJZH0enxPXaydfAD3YifeZpFaUzicHeLzVJLt9dvGB0b
HQLE4+EqKFgOZv2EoP686DQqbVS1u+9k0p2xbMA105TBIk7npraa8VM0fnrRKi7w
lZKwdH+aNAyhbXRW9xsnODJ+g8eF452zvbiKKngEKirK5LGieoXBX7tZ9D1GNBH2
Ob3bKOwwIWdEFle/YF/h6zWgdeoaNGDqVBrLr2+0DtWoiB1aDEjLWl9FmyIUyUm7
mD/vFDkzF+wm7cyWpQpCVQ==
-----END CERTIFICATE-----
`;
/**
* Google Hardware Attestation Root 4
*
* Downloaded from https://developer.android.com/training/articles/security-key-attestation#root_certificate
* (fourth entry)
*
* Valid until 2042-03-15 @ 11:07 PDT
*
* SHA256 Fingerprint
* CE:DB:1C:B6:DC:89:6A:E5:EC:79:73:48:BC:E9:28:67:53:C2:B3:8E:E7:1C:E0:FB:E3:4A:9A:12:48:80:0D:FC
*/
var Google_Hardware_Attestation_Root_4 = `
-----BEGIN CERTIFICATE-----
MIIFHDCCAwSgAwIBAgIJAPHBcqaZ6vUdMA0GCSqGSIb3DQEBCwUAMBsxGTAXBgNV
BAUTEGY5MjAwOWU4NTNiNmIwNDUwHhcNMjIwMzIwMTgwNzQ4WhcNNDIwMzE1MTgw
NzQ4WjAbMRkwFwYDVQQFExBmOTIwMDllODUzYjZiMDQ1MIICIjANBgkqhkiG9w0B
AQEFAAOCAg8AMIICCgKCAgEAr7bHgiuxpwHsK7Qui8xUFmOr75gvMsd/dTEDDJdS
Sxtf6An7xyqpRR90PL2abxM1dEqlXnf2tqw1Ne4Xwl5jlRfdnJLmN0pTy/4lj4/7
tv0Sk3iiKkypnEUtR6WfMgH0QZfKHM1+di+y9TFRtv6y//0rb+T+W8a9nsNL/ggj
nar86461qO0rOs2cXjp3kOG1FEJ5MVmFmBGtnrKpa73XpXyTqRxB/M0n1n/W9nGq
C4FSYa04T6N5RIZGBN2z2MT5IKGbFlbC8UrW0DxW7AYImQQcHtGl/m00QLVWutHQ
oVJYnFPlXTcHYvASLu+RhhsbDmxMgJJ0mcDpvsC4PjvB+TxywElgS70vE0XmLD+O
JtvsBslHZvPBKCOdT0MS+tgSOIfga+z1Z1g7+DVagf7quvmag8jfPioyKvxnK/Eg
sTUVi2ghzq8wm27ud/mIM7AY2qEORR8Go3TVB4HzWQgpZrt3i5MIlCaY504LzSRi
igHCzAPlHws+W0rB5N+er5/2pJKnfBSDiCiFAVtCLOZ7gLiMm0jhO2B6tUXHI/+M
RPjy02i59lINMRRev56GKtcd9qO/0kUJWdZTdA2XoS82ixPvZtXQpUpuL12ab+9E
aDK8Z4RHJYYfCT3Q5vNAXaiWQ+8PTWm2QgBR/bkwSWc+NpUFgNPN9PvQi8WEg5Um
AGMCAwEAAaNjMGEwHQYDVR0OBBYEFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMB8GA1Ud
IwQYMBaAFDZh4QB8iAUJUYtEbEf/GkzJ6k8SMA8GA1UdEwEB/wQFMAMBAf8wDgYD
VR0PAQH/BAQDAgIEMA0GCSqGSIb3DQEBCwUAA4ICAQB8cMqTllHc8U+qCrOlg3H7
174lmaCsbo/bJ0C17JEgMLb4kvrqsXZs01U3mB/qABg/1t5Pd5AORHARs1hhqGIC
W/nKMav574f9rZN4PC2ZlufGXb7sIdJpGiO9ctRhiLuYuly10JccUZGEHpHSYM2G
tkgYbZba6lsCPYAAP83cyDV+1aOkTf1RCp/lM0PKvmxYN10RYsK631jrleGdcdkx
oSK//mSQbgcWnmAEZrzHoF1/0gso1HZgIn0YLzVhLSA/iXCX4QT2h3J5z3znluKG
1nv8NQdxei2DIIhASWfu804CA96cQKTTlaae2fweqXjdN1/v2nqOhngNyz1361mF
mr4XmaKH/ItTwOe72NI9ZcwS1lVaCvsIkTDCEXdm9rCNPAY10iTunIHFXRh+7KPz
lHGewCq/8TOohBRn0/NNfh7uRslOSZ/xKbN9tMBtw37Z8d2vvnXq/YWdsm1+JLVw
n6yYD/yacNJBlwpddla8eaVMjsF6nBnIgQOf9zKSe06nSTqvgwUHosgOECZJZ1Eu
zbH4yswbt02tKtKEFhx+v+OTge/06V+jGsqTWLsfrOCNLuA8H++z+pUENmpqnnHo
vaI47gC+TNpkgYGkkBT6B/m/U01BuOBBTzhIlMEZq9qkDWuM2cA5kW5V3FJUcfHn
w1IdYIg2Wxg7yHcQZemFQg==
-----END CERTIFICATE-----
`;
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/services/defaultRootCerts/apple.js
/**
* Apple WebAuthn Root CA
*
* Downloaded from https://www.apple.com/certificateauthority/Apple_WebAuthn_Root_CA.pem
*
* Valid until 2045-03-14 @ 17:00 PST
*
* SHA256 Fingerprint
* 09:15:DD:5C:07:A2:8D:B5:49:D1:F6:77:BB:5A:75:D4:BF:BE:95:61:A7:73:42:43:27:76:2E:9E:02:F9:BB:29
*/
var Apple_WebAuthn_Root_CA = `-----BEGIN CERTIFICATE-----
MIICEjCCAZmgAwIBAgIQaB0BbHo84wIlpQGUKEdXcTAKBggqhkjOPQQDAzBLMR8w
HQYDVQQDDBZBcHBsZSBXZWJBdXRobiBSb290IENBMRMwEQYDVQQKDApBcHBsZSBJ
bmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMB4XDTIwMDMxODE4MjEzMloXDTQ1MDMx
NTAwMDAwMFowSzEfMB0GA1UEAwwWQXBwbGUgV2ViQXV0aG4gUm9vdCBDQTETMBEG
A1UECgwKQXBwbGUgSW5jLjETMBEGA1UECAwKQ2FsaWZvcm5pYTB2MBAGByqGSM49
AgEGBSuBBAAiA2IABCJCQ2pTVhzjl4Wo6IhHtMSAzO2cv+H9DQKev3//fG59G11k
xu9eI0/7o6V5uShBpe1u6l6mS19S1FEh6yGljnZAJ+2GNP1mi/YK2kSXIuTHjxA/
pcoRf7XkOtO4o1qlcaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUJtdk
2cV4wlpn0afeaxLQG2PxxtcwDgYDVR0PAQH/BAQDAgEGMAoGCCqGSM49BAMDA2cA
MGQCMFrZ+9DsJ1PW9hfNdBywZDsWDbWFp28it1d/5w2RPkRX3Bbn/UbDTNLx7Jr3
jAGGiQIwHFj+dJZYUJR786osByBelJYsVZd2GbHQu209b5RCmGQ21gpSAk9QZW4B
1bWeT0vT
-----END CERTIFICATE-----
`;
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/services/defaultRootCerts/mds.js
/**
* GlobalSign Root CA - R3
*
* Downloaded from https://valid.r3.roots.globalsign.com/
*
* Valid until 2029-03-18 @ 00:00 PST
*
* SHA256 Fingerprint
* CB:B5:22:D7:B7:F1:27:AD:6A:01:13:86:5B:DF:1C:D4:10:2E:7D:07:59:AF:63:5A:7C:F4:72:0D:C9:63:C5:3B
*/
var GlobalSign_Root_CA_R3 = `-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----
 `;
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/services/settingsService.js
var BaseSettingsService = class {
	constructor() {
		Object.defineProperty(this, "pemCertificates", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		this.pemCertificates = /* @__PURE__ */ new Map();
	}
	setRootCertificates(opts) {
		const { identifier, certificates } = opts;
		const newCertificates = [];
		for (const cert of certificates) if (cert instanceof Uint8Array) newCertificates.push(convertCertBufferToPEM(cert));
		else newCertificates.push(cert);
		this.pemCertificates.set(identifier, newCertificates);
	}
	getRootCertificates(opts) {
		const { identifier } = opts;
		return this.pemCertificates.get(identifier) ?? [];
	}
};
/**
* A basic service for specifying acceptable root certificates for all supported attestation
* statement formats.
*
* In addition, default root certificates are included for the following statement formats:
*
* - `'android-key'`
* - `'android-safetynet'`
* - `'apple'`
* - `'android-mds'`
*
* These can be overwritten as needed by setting alternative root certificates for their format
* identifier using `setRootCertificates()`.
*/
var SettingsService = new BaseSettingsService();
SettingsService.setRootCertificates({
	identifier: "android-key",
	certificates: [
		Google_Hardware_Attestation_Root_1,
		Google_Hardware_Attestation_Root_2,
		Google_Hardware_Attestation_Root_3,
		Google_Hardware_Attestation_Root_4
	]
});
SettingsService.setRootCertificates({
	identifier: "android-safetynet",
	certificates: [GlobalSign_Root_CA]
});
SettingsService.setRootCertificates({
	identifier: "apple",
	certificates: [Apple_WebAuthn_Root_CA]
});
SettingsService.setRootCertificates({
	identifier: "mds",
	certificates: [GlobalSign_Root_CA_R3]
});
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/metadata/verifyMDSBlob.js
/**
* Perform authenticity and integrity verification of a
* [FIDO Metadata Service (MDS)](https://fidoalliance.org/metadata/)-compatible blob, and then
* extract the FIDO2 metadata statements included within. This method will make network requests
* for things like CRL checks.
*
* @param blob - A JWT downloaded from an MDS server (e.g. https://mds3.fidoalliance.org)
*/
async function verifyMDSBlob(blob) {
	const parsedJWT = parseJWT(blob);
	const header = parsedJWT[0];
	const payload = parsedJWT[1];
	const headerCertsPEM = header.x5c.map(convertCertBufferToPEM);
	try {
		await validateCertificatePath(headerCertsPEM, SettingsService.getRootCertificates({ identifier: "mds" }));
	} catch (error) {
		throw new Error("BLOB certificate path could not be validated", { cause: error });
	}
	const leafCert = headerCertsPEM[0];
	if (!await verifyJWT(blob, convertPEMToBytes(leafCert))) throw new Error("BLOB signature could not be verified");
	const statements = [];
	for (const entry of payload.entries) if (entry.aaguid && entry.metadataStatement) statements.push(entry.metadataStatement);
	const [year, month, day] = payload.nextUpdate.split("-");
	return {
		statements,
		parsedNextUpdate: new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)),
		payload
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/verifyOKP.js
async function verifyOKP(opts) {
	const { cosePublicKey, signature, data } = opts;
	const WebCrypto = await getWebCrypto();
	const alg = cosePublicKey.get(COSEKEYS.alg);
	const crv = cosePublicKey.get(COSEKEYS.crv);
	const x = cosePublicKey.get(COSEKEYS.x);
	if (!alg) throw new Error("Public key was missing alg (OKP)");
	if (!isCOSEAlg(alg)) throw new Error(`Public key had invalid alg ${alg} (OKP)`);
	if (!crv) throw new Error("Public key was missing crv (OKP)");
	if (!x) throw new Error("Public key was missing x (OKP)");
	let _crv;
	if (crv === COSECRV.ED25519) _crv = "Ed25519";
	else throw new Error(`Unexpected COSE crv value of ${crv} (OKP)`);
	const key = await importKey({
		keyData: {
			kty: "OKP",
			crv: _crv,
			alg: "EdDSA",
			x: fromBuffer(x),
			ext: false
		},
		algorithm: {
			name: _crv,
			namedCurve: _crv
		}
	});
	const verifyAlgorithm = { name: _crv };
	return WebCrypto.subtle.verify(verifyAlgorithm, key, signature, data);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/unwrapEC2Signature.js
/**
* In WebAuthn, EC2 signatures are wrapped in ASN.1 structure so we need to peel r and s apart.
*
* See https://www.w3.org/TR/webauthn-2/#sctn-signature-attestation-types
*/
function unwrapEC2Signature(signature, crv) {
	const parsedSignature = AsnParser.parse(signature, ECDSASigValue);
	const rBytes = new Uint8Array(parsedSignature.r);
	const sBytes = new Uint8Array(parsedSignature.s);
	const componentLength = getSignatureComponentLength(crv);
	return concat([toNormalizedBytes(rBytes, componentLength), toNormalizedBytes(sBytes, componentLength)]);
}
/**
* The SubtleCrypto Web Crypto API expects ECDSA signatures with `r` and `s` values to be encoded
* to a specific length depending on the order of the curve. This function returns the expected
* byte-length for each of the `r` and `s` signature components.
*
* See <https://www.w3.org/TR/WebCryptoAPI/#ecdsa-operations>
*/
function getSignatureComponentLength(crv) {
	switch (crv) {
		case COSECRV.P256: return 32;
		case COSECRV.P384: return 48;
		case COSECRV.P521: return 66;
		default: throw new Error(`Unexpected COSE crv value of ${crv} (EC2)`);
	}
}
/**
* Converts the ASN.1 integer representation to bytes of a specific length `n`.
*
* DER encodes integers as big-endian byte arrays, with as small as possible representation and
* requires a leading `0` byte to disambiguate between negative and positive numbers. This means
* that `r` and `s` can potentially not be the expected byte-length that is needed by the
* SubtleCrypto Web Crypto API: if there are leading `0`s it can be shorter than expected, and if
* it has a leading `1` bit, it can be one byte longer.
*
* See <https://www.itu.int/rec/T-REC-X.690-202102-I/en>
* See <https://www.w3.org/TR/WebCryptoAPI/#ecdsa-operations>
*/
function toNormalizedBytes(bytes, componentLength) {
	let normalizedBytes;
	if (bytes.length < componentLength) {
		normalizedBytes = new Uint8Array(componentLength);
		normalizedBytes.set(bytes, componentLength - bytes.length);
	} else if (bytes.length === componentLength) normalizedBytes = bytes;
	else if (bytes.length === componentLength + 1 && bytes[0] === 0 && (bytes[1] & 128) === 128) normalizedBytes = bytes.subarray(1);
	else throw new Error(`Invalid signature component length ${bytes.length}, expected ${componentLength}`);
	return normalizedBytes;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoCrypto/verify.js
/**
* Verify signatures with their public key. Supports EC2 and RSA public keys.
*/
function verify(opts) {
	const { cosePublicKey, signature, data, shaHashOverride } = opts;
	if (isCOSEPublicKeyEC2(cosePublicKey)) {
		const crv = cosePublicKey.get(COSEKEYS.crv);
		if (!isCOSECrv(crv)) throw new Error(`unknown COSE curve ${crv}`);
		return verifyEC2({
			cosePublicKey,
			signature: unwrapEC2Signature(signature, crv),
			data,
			shaHashOverride
		});
	} else if (isCOSEPublicKeyRSA(cosePublicKey)) return verifyRSA({
		cosePublicKey,
		signature,
		data,
		shaHashOverride
	});
	else if (isCOSEPublicKeyOKP(cosePublicKey)) return verifyOKP({
		cosePublicKey,
		signature,
		data
	});
	const kty = cosePublicKey.get(COSEKEYS.kty);
	throw new Error(`Signature verification with public key of kty ${kty} is not supported by this method`);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/iso/isoUint8Array.js
/**
* A runtime-agnostic collection of methods for working with Uint8Arrays
* @module
*/
/**
* Make sure two Uint8Arrays are deeply equivalent
*/
function areEqual(array1, array2) {
	if (array1.length != array2.length) return false;
	return array1.every((val, i) => val === array2[i]);
}
/**
* Convert a Uint8Array to Hexadecimal.
*
* A replacement for `Buffer.toString('hex')`
*/
function toHex(array) {
	return Array.from(array, (i) => i.toString(16).padStart(2, "0")).join("");
}
/**
* Convert a hexadecimal string to isoUint8Array.
*
* A replacement for `Buffer.from('...', 'hex')`
*/
function fromHex(hex) {
	if (!hex) return Uint8Array.from([]);
	if (!(hex.length !== 0 && hex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(hex))) throw new Error("Invalid hex string");
	const byteStrings = hex.match(/.{1,2}/g) ?? [];
	return Uint8Array.from(byteStrings.map((byte) => parseInt(byte, 16)));
}
/**
* Combine multiple Uint8Arrays into a single Uint8Array
*/
function concat(arrays) {
	let pointer = 0;
	const totalLength = arrays.reduce((prev, curr) => prev + curr.length, 0);
	const toReturn = new Uint8Array(totalLength);
	arrays.forEach((arr) => {
		toReturn.set(arr, pointer);
		pointer += arr.length;
	});
	return toReturn;
}
/**
* Convert bytes into a UTF-8 string
*/
function toUTF8String(array) {
	return new globalThis.TextDecoder("utf-8").decode(array);
}
/**
* Convert a UTF-8 string back into bytes
*/
function fromUTF8String(utf8String) {
	return new globalThis.TextEncoder().encode(utf8String);
}
/**
* Convert an ASCII string to Uint8Array
*/
function fromASCIIString(value) {
	return Uint8Array.from(value.split("").map((x) => x.charCodeAt(0)));
}
/**
* Prepare a DataView we can slice our way around in as we parse the bytes in a Uint8Array
*/
function toDataView(array) {
	return new DataView(array.buffer, array.byteOffset, array.length);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/generateChallenge.js
/**
* Generate a suitably random value to be used as an attestation or assertion challenge
*/
async function generateChallenge() {
	/**
	* WebAuthn spec says that 16 bytes is a good minimum:
	*
	* "In order to prevent replay attacks, the challenges MUST contain enough entropy to make
	* guessing them infeasible. Challenges SHOULD therefore be at least 16 bytes long."
	*
	* Just in case, let's double it
	*/
	const challenge = new Uint8Array(32);
	await getRandomValues(challenge);
	return _generateChallengeInternals.stubThis(challenge);
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _generateChallengeInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/generateRegistrationOptions.js
/**
* Supported crypto algo identifiers
* See https://w3c.github.io/webauthn/#sctn-alg-identifier
* and https://www.iana.org/assignments/cose/cose.xhtml#algorithms
*/
var supportedCOSEAlgorithmIdentifiers = [
	-8,
	-7,
	-36,
	-37,
	-38,
	-39,
	-257,
	-258,
	-259,
	-65535
];
/**
* Set up some default authenticator selection options as per the latest spec:
* https://www.w3.org/TR/webauthn-2/#dictdef-authenticatorselectioncriteria
*
* Helps with some older platforms (e.g. Android 7.0 Nougat) that may not be aware of these
* defaults.
*/
var defaultAuthenticatorSelection = {
	residentKey: "preferred",
	userVerification: "preferred"
};
/**
* Use the most commonly-supported algorithms
* See the following:
*   - https://www.iana.org/assignments/cose/cose.xhtml#algorithms
*   - https://w3c.github.io/webauthn/#dom-publickeycredentialcreationoptions-pubkeycredparams
*/
var defaultSupportedAlgorithmIDs = [
	-8,
	-7,
	-257
];
/**
* Prepare a value to pass into navigator.credentials.create(...) for authenticator registration
*
* **Options:**
*
* @param rpName - User-visible, "friendly" website/service name
* @param rpID - Valid domain name (after `https://`)
* @param userName - User's website-specific username (email, etc...)
* @param userID **(Optional)** - User's website-specific unique ID. Defaults to generating a random identifier
* @param challenge **(Optional)** - Random value the authenticator needs to sign and pass back. Defaults to generating a random value
* @param userDisplayName **(Optional)** - User's actual name. Defaults to `""`
* @param timeout **(Optional)** - How long (in ms) the user can take to complete attestation. Defaults to `60000`
* @param attestationType **(Optional)** - Specific attestation statement. Defaults to `"none"`
* @param excludeCredentials **(Optional)** - Authenticators registered by the user so the user can't register the same credential multiple times. Defaults to `[]`
* @param authenticatorSelection **(Optional)** - Advanced criteria for restricting the types of authenticators that may be used. Defaults to `{ residentKey: 'preferred', userVerification: 'preferred' }`
* @param extensions **(Optional)** - Additional plugins the authenticator or browser should use during attestation
* @param supportedAlgorithmIDs **(Optional)** - Array of numeric COSE algorithm identifiers supported for attestation by this RP. See https://www.iana.org/assignments/cose/cose.xhtml#algorithms. Defaults to `[-8, -7, -257]`
* @param preferredAuthenticatorType **(Optional)** - Encourage the browser to prompt the user to register a specific type of authenticator
*/
async function generateRegistrationOptions(options) {
	const { rpName, rpID, userName, userID, challenge = await generateChallenge(), userDisplayName = "", timeout = 6e4, attestationType = "none", excludeCredentials = [], authenticatorSelection = defaultAuthenticatorSelection, extensions, supportedAlgorithmIDs = defaultSupportedAlgorithmIDs, preferredAuthenticatorType } = options;
	/**
	* Prepare pubKeyCredParams from the array of algorithm ID's
	*/
	const pubKeyCredParams = supportedAlgorithmIDs.map((id) => ({
		alg: id,
		type: "public-key"
	}));
	/**
	* Capture some of the nuances of how `residentKey` and `requireResidentKey` how either is set
	* depending on when either is defined in the options
	*/
	if (authenticatorSelection.residentKey === void 0) {
		/**
		* `residentKey`: "If no value is given then the effective value is `required` if
		* requireResidentKey is true or `discouraged` if it is false or absent."
		*
		* See https://www.w3.org/TR/webauthn-2/#dom-authenticatorselectioncriteria-residentkey
		*/
		if (authenticatorSelection.requireResidentKey) authenticatorSelection.residentKey = "required";
	} else
 /**
	* `requireResidentKey`: "Relying Parties SHOULD set it to true if, and only if, residentKey is
	* set to "required""
	*
	* Spec says this property defaults to `false` so we should still be okay to assign `false` too
	*
	* See https://www.w3.org/TR/webauthn-2/#dom-authenticatorselectioncriteria-requireresidentkey
	*/
	authenticatorSelection.requireResidentKey = authenticatorSelection.residentKey === "required";
	/**
	* Preserve ability to specify `string` values for challenges
	*/
	let _challenge = challenge;
	if (typeof _challenge === "string") _challenge = fromUTF8String(_challenge);
	/**
	* Explicitly disallow use of strings for userID anymore because `isoBase64URL.fromBuffer()` below
	* will return an empty string if one gets through!
	*/
	if (typeof userID === "string") throw new Error(`String values for \`userID\` are no longer supported. See https://simplewebauthn.dev/docs/advanced/server/custom-user-ids`);
	/**
	* Generate a user ID if one is not provided
	*/
	let _userID = userID;
	if (!_userID) _userID = await generateUserID();
	/**
	* Map authenticator preference to hints. Map to authenticatorAttachment as well for
	* backwards-compatibility.
	*/
	const hints = [];
	if (preferredAuthenticatorType) {
		if (preferredAuthenticatorType === "securityKey") {
			hints.push("security-key");
			authenticatorSelection.authenticatorAttachment = "cross-platform";
		} else if (preferredAuthenticatorType === "localDevice") {
			hints.push("client-device");
			authenticatorSelection.authenticatorAttachment = "platform";
		} else if (preferredAuthenticatorType === "remoteDevice") {
			hints.push("hybrid");
			authenticatorSelection.authenticatorAttachment = "cross-platform";
		}
	}
	return {
		challenge: fromBuffer(_challenge),
		rp: {
			name: rpName,
			id: rpID
		},
		user: {
			id: fromBuffer(_userID),
			name: userName,
			displayName: userDisplayName
		},
		pubKeyCredParams,
		timeout,
		attestation: attestationType,
		excludeCredentials: excludeCredentials.map((cred) => {
			if (!isBase64URL(cred.id)) throw new Error(`excludeCredential id "${cred.id}" is not a valid base64url string`);
			return {
				...cred,
				id: trimPadding(cred.id),
				type: "public-key"
			};
		}),
		authenticatorSelection,
		extensions: {
			...extensions,
			credProps: true
		},
		hints
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/parseBackupFlags.js
/**
* Make sense of Bits 3 and 4 in authenticator indicating:
*
* - Whether the credential can be used on multiple devices
* - Whether the credential is backed up or not
*
* Invalid configurations will raise an `Error`
*/
function parseBackupFlags({ be, bs }) {
	const credentialBackedUp = bs;
	let credentialDeviceType = "singleDevice";
	if (be) credentialDeviceType = "multiDevice";
	if (credentialDeviceType === "singleDevice" && credentialBackedUp) throw new InvalidBackupFlags("Single-device credential indicated that it was backed up, which should be impossible.");
	return {
		credentialDeviceType,
		credentialBackedUp
	};
}
var InvalidBackupFlags = class extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidBackupFlags";
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/matchExpectedRPID.js
/**
* Go through each expected RP ID and try to find one that matches. Returns the unhashed RP ID
* that matched the hash in the response.
*
* Raises an `UnexpectedRPIDHash` error if no match is found
*/
async function matchExpectedRPID(rpIDHash, expectedRPIDs) {
	try {
		return await Promise.any(expectedRPIDs.map((expected) => {
			return new Promise((resolve, reject) => {
				toHash(fromASCIIString(expected)).then((expectedRPIDHash) => {
					if (areEqual(rpIDHash, expectedRPIDHash)) resolve(expected);
					else reject();
				});
			});
		}));
	} catch (err) {
		if (err.name === "AggregateError") throw new UnexpectedRPIDHash();
		throw err;
	}
}
var UnexpectedRPIDHash = class extends Error {
	constructor() {
		super("Unexpected RP ID hash");
		this.name = "UnexpectedRPIDHash";
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/verifyAttestationFIDOU2F.js
/**
* Verify an attestation response with fmt 'fido-u2f'
*/
async function verifyAttestationFIDOU2F(options) {
	const { attStmt, clientDataHash, rpIdHash, credentialID, credentialPublicKey, aaguid, rootCertificates } = options;
	const signatureBase = concat([
		Uint8Array.from([0]),
		rpIdHash,
		clientDataHash,
		credentialID,
		convertCOSEtoPKCS(credentialPublicKey)
	]);
	const sig = attStmt.get("sig");
	const x5c = attStmt.get("x5c");
	if (!x5c) throw new Error("No attestation certificate provided in attestation statement (FIDOU2F)");
	if (!sig) throw new Error("No attestation signature provided in attestation statement (FIDOU2F)");
	const aaguidToHex = Number.parseInt(toHex(aaguid), 16);
	if (aaguidToHex !== 0) throw new Error(`AAGUID "${aaguidToHex}" was not expected value`);
	try {
		await validateCertificatePath(x5c.map(convertCertBufferToPEM), rootCertificates);
	} catch (err) {
		throw new Error(`${err.message} (FIDOU2F)`);
	}
	return verifySignature({
		signature: sig,
		data: signatureBase,
		x509Certificate: x5c[0],
		hashAlgorithm: COSEALG.ES256
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/validateExtFIDOGenCEAAGUID.js
/**
* Attestation Certificate Extension OID: `id-fido-gen-ce-aaguid`
*
* Sourced from https://fidoalliance.org/specs/fido-v2.0-ps-20150904/fido-key-attestation-v2.0-ps-20150904.html#verifying-an-attestation-statement
*/
var id_fido_gen_ce_aaguid = "1.3.6.1.4.1.45724.1.1.4";
/**
* Look for the id-fido-gen-ce-aaguid certificate extension. If it's present then check it against
* the attestation statement AAGUID.
*/
function validateExtFIDOGenCEAAGUID(certExtensions, aaguid) {
	if (!certExtensions) return true;
	const extFIDOGenCEAAGUID = certExtensions.find((ext) => ext.extnID === id_fido_gen_ce_aaguid);
	if (!extFIDOGenCEAAGUID) return true;
	const parsedExtFIDOGenCEAAGUID = AsnParser.parse(extFIDOGenCEAAGUID.extnValue, OctetString);
	const extValue = new Uint8Array(parsedExtFIDOGenCEAAGUID.buffer);
	if (!areEqual(aaguid, extValue)) {
		const _debugExtHex = toHex(extValue);
		const _debugAAGUIDHex = toHex(aaguid);
		throw new Error(`Certificate extension id-fido-gen-ce-aaguid (${id_fido_gen_ce_aaguid}) value of "${_debugExtHex}" was present but not equal to attestation statement AAGUID value of "${_debugAAGUIDHex}"`);
	}
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/helpers/logging.js
/**
* Generate an instance of a `debug` logger that extends off of the "simplewebauthn" namespace for
* consistent naming.
*
* See https://www.npmjs.com/package/debug for information on how to control logging output when
* using @simplewebauthn/server
*
* Example:
*
* ```
* const log = getLogger('mds');
* log('hello'); // simplewebauthn:mds hello +0ms
* ```
*/
function getLogger(_name) {
	return (_message, ..._rest) => {};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/services/metadataService.js
/**
* An instance of `CachedMDS` that will not trigger attempts to refresh the associated entry's blob
*/
var NonRefreshingMDS = {
	url: "",
	no: 0,
	nextUpdate: /* @__PURE__ */ new Date(0)
};
var defaultURLMDS = "https://mds.fidoalliance.org/";
var SERVICE_STATE;
(function(SERVICE_STATE) {
	SERVICE_STATE[SERVICE_STATE["DISABLED"] = 0] = "DISABLED";
	SERVICE_STATE[SERVICE_STATE["REFRESHING"] = 1] = "REFRESHING";
	SERVICE_STATE[SERVICE_STATE["READY"] = 2] = "READY";
})(SERVICE_STATE || (SERVICE_STATE = {}));
var log = getLogger("MetadataService");
/**
* An implementation of `MetadataService` that can download and parse BLOBs, and support on-demand
* requesting and caching of individual metadata statements.
*
* https://fidoalliance.org/metadata/
*/
var BaseMetadataService = class {
	constructor() {
		Object.defineProperty(this, "mdsCache", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: {}
		});
		Object.defineProperty(this, "statementCache", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: {}
		});
		Object.defineProperty(this, "state", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: SERVICE_STATE.DISABLED
		});
		Object.defineProperty(this, "verificationMode", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "strict"
		});
	}
	async initialize(opts = {}) {
		this.statementCache = {};
		const { mdsServers = [defaultURLMDS], statements, verificationMode } = opts;
		this.setState(SERVICE_STATE.REFRESHING);
		/**
		* If metadata statements are provided, load them into the cache first. These statements will
		* not be refreshed when a stale one is detected.
		*/
		if (statements?.length) {
			let statementsAdded = 0;
			statements.forEach((statement) => {
				if (statement.aaguid) {
					this.statementCache[statement.aaguid] = {
						entry: {
							metadataStatement: statement,
							statusReports: [],
							timeOfLastStatusChange: "1970-01-01"
						},
						url: NonRefreshingMDS.url
					};
					statementsAdded += 1;
				}
			});
			log(`Cached ${statementsAdded} local statements`);
		}
		/**
		* If MDS servers are provided, then download blobs from them, verify them, and then add their
		* entries to the cache. Blobs loaded in this way will be refreshed when a stale entry within is
		* detected.
		*/
		if (mdsServers?.length) {
			const currentCacheCount = Object.keys(this.statementCache).length;
			let numServers = mdsServers.length;
			for (const url of mdsServers) try {
				const cachedMDS = {
					url,
					no: 0,
					nextUpdate: /* @__PURE__ */ new Date(0)
				};
				const blob = await this.downloadBlob(cachedMDS);
				await this.verifyBlob(blob, cachedMDS);
			} catch (err) {
				log(`Could not download BLOB from ${url}:`, err);
				numServers -= 1;
			}
			log(`Cached ${Object.keys(this.statementCache).length - currentCacheCount} statements from ${numServers} metadata server(s)`);
		}
		if (verificationMode) this.verificationMode = verificationMode;
		this.setState(SERVICE_STATE.READY);
	}
	async getStatement(aaguid) {
		if (this.state === SERVICE_STATE.DISABLED) return;
		if (!aaguid) return;
		if (aaguid instanceof Uint8Array) aaguid = convertAAGUIDToString(aaguid);
		await this.pauseUntilReady();
		const cachedStatement = this.statementCache[aaguid];
		if (!cachedStatement) {
			if (this.verificationMode === "strict") throw new Error(`No metadata statement found for aaguid "${aaguid}"`);
			return;
		}
		if (cachedStatement.url) {
			const mds = this.mdsCache[cachedStatement.url];
			if (/* @__PURE__ */ new Date() > mds.nextUpdate) try {
				this.setState(SERVICE_STATE.REFRESHING);
				const blob = await this.downloadBlob(mds);
				await this.verifyBlob(blob, mds);
			} finally {
				this.setState(SERVICE_STATE.READY);
			}
		}
		const { entry } = cachedStatement;
		for (const report of entry.statusReports) {
			const { status } = report;
			if (status === "USER_VERIFICATION_BYPASS" || status === "ATTESTATION_KEY_COMPROMISE" || status === "USER_KEY_REMOTE_COMPROMISE" || status === "USER_KEY_PHYSICAL_COMPROMISE") throw new Error(`Detected compromised aaguid "${aaguid}"`);
		}
		return entry.metadataStatement;
	}
	/**
	* Download and process the latest BLOB from MDS
	*/
	async downloadBlob(cachedMDS) {
		const { url } = cachedMDS;
		return await (await fetch(url)).text();
	}
	/**
	* Verify and process the MDS metadata blob
	*/
	async verifyBlob(blob, cachedMDS) {
		const { url, no } = cachedMDS;
		const { payload, parsedNextUpdate } = await verifyMDSBlob(blob);
		if (payload.no <= no) throw new Error(`Latest BLOB no. ${payload.no} is not greater than previous no. ${no}`);
		for (const entry of payload.entries) if (entry.aaguid) this.statementCache[entry.aaguid] = {
			entry,
			url
		};
		if (url) this.mdsCache[url] = {
			...cachedMDS,
			no: payload.no,
			nextUpdate: parsedNextUpdate
		};
		else if (parsedNextUpdate < /* @__PURE__ */ new Date()) log(`⚠️ This MDS blob (serial: ${payload.no}) contains stale data as of ${parsedNextUpdate.toISOString()}. Please consider re-initializing MetadataService with a newer MDS blob.`);
	}
	/**
	* A helper method to pause execution until the service is ready
	*/
	pauseUntilReady() {
		if (this.state === SERVICE_STATE.READY) return new Promise((resolve) => {
			resolve();
		});
		return new Promise((resolve, reject) => {
			const totalTimeoutMS = 7e4;
			const intervalMS = 100;
			let iterations = totalTimeoutMS / intervalMS;
			const intervalID = globalThis.setInterval(() => {
				if (iterations < 1) {
					clearInterval(intervalID);
					reject(`State did not become ready in ${totalTimeoutMS / 1e3} seconds`);
				} else if (this.state === SERVICE_STATE.READY) {
					clearInterval(intervalID);
					resolve();
				}
				iterations -= 1;
			}, intervalMS);
		});
	}
	/**
	* Report service status on change
	*/
	setState(newState) {
		this.state = newState;
		if (newState === SERVICE_STATE.DISABLED) log("MetadataService is DISABLED");
		else if (newState === SERVICE_STATE.REFRESHING) log("MetadataService is REFRESHING");
		else if (newState === SERVICE_STATE.READY) log("MetadataService is READY");
	}
};
/**
* A basic service for coordinating interactions with the FIDO Metadata Service. This includes BLOB
* download and parsing, and on-demand requesting and caching of individual metadata statements.
*
* https://fidoalliance.org/metadata/
*/
var MetadataService = new BaseMetadataService();
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/metadata/verifyAttestationWithMetadata.js
/**
* Match properties of the authenticator's attestation statement against expected values as
* registered with the FIDO Alliance Metadata Service
*/
async function verifyAttestationWithMetadata({ statement, credentialPublicKey, x5c, attestationStatementAlg }) {
	const { authenticationAlgorithms, authenticatorGetInfo, attestationRootCertificates } = statement;
	const keypairCOSEAlgs = /* @__PURE__ */ new Set();
	authenticationAlgorithms.forEach((algSign) => {
		const algSignCOSEINFO = algSignToCOSEInfoMap[algSign];
		if (algSignCOSEINFO) keypairCOSEAlgs.add(algSignCOSEINFO);
	});
	const decodedPublicKey = decodeCredentialPublicKey(credentialPublicKey);
	const kty = decodedPublicKey.get(COSEKEYS.kty);
	const alg = decodedPublicKey.get(COSEKEYS.alg);
	if (!kty) throw new Error("Credential public key was missing kty");
	if (!alg) throw new Error("Credential public key was missing alg");
	if (!kty) throw new Error("Credential public key was missing kty");
	const publicKeyCOSEInfo = {
		kty,
		alg
	};
	if (isCOSEPublicKeyEC2(decodedPublicKey)) publicKeyCOSEInfo.crv = decodedPublicKey.get(COSEKEYS.crv);
	/**
	* Attempt to match the credential public key's algorithm to one specified in the device's
	* metadata
	*/
	let foundMatch = false;
	for (const keypairAlg of keypairCOSEAlgs) {
		if (keypairAlg.alg === publicKeyCOSEInfo.alg && keypairAlg.kty === publicKeyCOSEInfo.kty) if ((keypairAlg.kty === COSEKTY.EC2 || keypairAlg.kty === COSEKTY.OKP) && keypairAlg.crv === publicKeyCOSEInfo.crv) foundMatch = true;
		else foundMatch = true;
		if (foundMatch) break;
	}
	if (!foundMatch) {
		/**
		* Craft some useful error output from the MDS algorithms
		*
		* Example:
		*
		* ```
		* [
		*   'rsassa_pss_sha256_raw' (COSE info: { kty: 3, alg: -37 }),
		*   'secp256k1_ecdsa_sha256_raw' (COSE info: { kty: 2, alg: -47, crv: 8 })
		* ]
		* ```
		*/
		const debugMDSAlgs = authenticationAlgorithms.map((algSign) => `'${algSign}' (COSE info: ${stringifyCOSEInfo(algSignToCOSEInfoMap[algSign])})`);
		const strMDSAlgs = JSON.stringify(debugMDSAlgs, null, 2).replace(/"/g, "");
		/**
		* Construct useful error output about the public key
		*/
		const strPubKeyAlg = stringifyCOSEInfo(publicKeyCOSEInfo);
		throw new Error(`Public key parameters ${strPubKeyAlg} did not match any of the following metadata algorithms:\n${strMDSAlgs}`);
	}
	/**
	* Confirm the attestation statement's algorithm is one supported according to metadata
	*/
	if (attestationStatementAlg !== void 0 && authenticatorGetInfo?.algorithms !== void 0) {
		const getInfoAlgs = authenticatorGetInfo.algorithms.map((_alg) => _alg.alg);
		if (getInfoAlgs.indexOf(attestationStatementAlg) < 0) throw new Error(`Attestation statement alg ${attestationStatementAlg} did not match one of ${getInfoAlgs}`);
	}
	const authenticatorCerts = x5c.map(convertCertBufferToPEM);
	const statementRootCerts = attestationRootCertificates.map(convertCertBufferToPEM);
	/**
	* If an authenticator returns exactly one certificate in its x5c, and that cert is found in the
	* metadata statement then the authenticator is "self-referencing". In this case we forego
	* certificate chain validation.
	*/
	let authenticatorIsSelfReferencing = false;
	if (authenticatorCerts.length === 1 && statementRootCerts.indexOf(authenticatorCerts[0]) >= 0) authenticatorIsSelfReferencing = true;
	if (!authenticatorIsSelfReferencing) try {
		await validateCertificatePath(authenticatorCerts, statementRootCerts);
	} catch (err) {
		throw new Error(`Could not validate certificate path with any metadata root certificates: ${err.message}`);
	}
	return true;
}
/**
* Convert ALG_SIGN values to COSE info
*
* Values pulled from `ALG_KEY_COSE` definitions in the FIDO Registry of Predefined Values
*
* https://fidoalliance.org/specs/common-specs/fido-registry-v2.2-ps-20220523.html#authentication-algorithms
*/
var algSignToCOSEInfoMap = {
	secp256r1_ecdsa_sha256_raw: {
		kty: 2,
		alg: -7,
		crv: 1
	},
	secp256r1_ecdsa_sha256_der: {
		kty: 2,
		alg: -7,
		crv: 1
	},
	rsassa_pss_sha256_raw: {
		kty: 3,
		alg: -37
	},
	rsassa_pss_sha256_der: {
		kty: 3,
		alg: -37
	},
	secp256k1_ecdsa_sha256_raw: {
		kty: 2,
		alg: -47,
		crv: 8
	},
	secp256k1_ecdsa_sha256_der: {
		kty: 2,
		alg: -47,
		crv: 8
	},
	rsassa_pss_sha384_raw: {
		kty: 3,
		alg: -38
	},
	rsassa_pkcsv15_sha256_raw: {
		kty: 3,
		alg: -257
	},
	rsassa_pkcsv15_sha384_raw: {
		kty: 3,
		alg: -258
	},
	rsassa_pkcsv15_sha512_raw: {
		kty: 3,
		alg: -259
	},
	rsassa_pkcsv15_sha1_raw: {
		kty: 3,
		alg: -65535
	},
	secp384r1_ecdsa_sha384_raw: {
		kty: 2,
		alg: -35,
		crv: 2
	},
	secp512r1_ecdsa_sha256_raw: {
		kty: 2,
		alg: -36,
		crv: 3
	},
	ed25519_eddsa_sha512_raw: {
		kty: 1,
		alg: -8,
		crv: 6
	}
};
/**
* A helper to format COSEInfo a little nicer than we can achieve with JSON.stringify()
*
* Input: `{ "kty": 3, "alg": -257 }`
*
* Output: `"{ kty: 3, alg: -257 }"`
*/
function stringifyCOSEInfo(info) {
	const { kty, alg, crv } = info;
	let toReturn = "";
	if (kty !== COSEKTY.RSA) toReturn = `{ kty: ${kty}, alg: ${alg}, crv: ${crv} }`;
	else toReturn = `{ kty: ${kty}, alg: ${alg} }`;
	return toReturn;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/verifyAttestationPacked.js
/**
* Verify an attestation response with fmt 'packed'
*/
async function verifyAttestationPacked(options) {
	const { attStmt, clientDataHash, authData, credentialPublicKey, aaguid, rootCertificates } = options;
	const sig = attStmt.get("sig");
	const x5c = attStmt.get("x5c");
	const alg = attStmt.get("alg");
	if (!sig) throw new Error("No attestation signature provided in attestation statement (Packed)");
	if (!alg) throw new Error("Attestation statement did not contain alg (Packed)");
	if (!isCOSEAlg(alg)) throw new Error(`Attestation statement contained invalid alg ${alg} (Packed)`);
	const signatureBase = concat([authData, clientDataHash]);
	let verified = false;
	if (x5c) {
		const { subject, basicConstraintsCA, version, notBefore, notAfter, parsedCertificate } = getCertificateInfo(x5c[0]);
		const { OU, CN, O, C } = subject;
		if (OU !== "Authenticator Attestation") throw new Error("Certificate OU was not \"Authenticator Attestation\" (Packed|Full)");
		if (!CN) throw new Error("Certificate CN was empty (Packed|Full)");
		if (!O) throw new Error("Certificate O was empty (Packed|Full)");
		if (!C || C.length !== 2) throw new Error("Certificate C was not two-character ISO 3166 code (Packed|Full)");
		if (basicConstraintsCA) throw new Error("Certificate basic constraints CA was not `false` (Packed|Full)");
		if (version !== 2) throw new Error("Certificate version was not `3` (ASN.1 value of 2) (Packed|Full)");
		let now = /* @__PURE__ */ new Date();
		if (notBefore > now) throw new Error(`Certificate not good before "${notBefore.toString()}" (Packed|Full)`);
		now = /* @__PURE__ */ new Date();
		if (notAfter < now) throw new Error(`Certificate not good after "${notAfter.toString()}" (Packed|Full)`);
		try {
			await validateExtFIDOGenCEAAGUID(parsedCertificate.tbsCertificate.extensions, aaguid);
		} catch (err) {
			throw new Error(`${err.message} (Packed|Full)`);
		}
		const statement = await MetadataService.getStatement(aaguid);
		if (statement) {
			if (statement.attestationTypes.indexOf("basic_full") < 0) throw new Error("Metadata does not indicate support for full attestations (Packed|Full)");
			try {
				await verifyAttestationWithMetadata({
					statement,
					credentialPublicKey,
					x5c,
					attestationStatementAlg: alg
				});
			} catch (err) {
				throw new Error(`${err.message} (Packed|Full)`);
			}
		} else try {
			await validateCertificatePath(x5c.map(convertCertBufferToPEM), rootCertificates);
		} catch (err) {
			throw new Error(`${err.message} (Packed|Full)`);
		}
		verified = await verifySignature({
			signature: sig,
			data: signatureBase,
			x509Certificate: x5c[0]
		});
	} else verified = await verifySignature({
		signature: sig,
		data: signatureBase,
		credentialPublicKey,
		hashAlgorithm: alg
	});
	return verified;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/verifyAttestationAndroidSafetyNet.js
/**
* Verify an attestation response with fmt 'android-safetynet'
*/
async function verifyAttestationAndroidSafetyNet(options) {
	const { attStmt, clientDataHash, authData, aaguid, rootCertificates, verifyTimestampMS = true, credentialPublicKey, attestationSafetyNetEnforceCTSCheck } = options;
	const alg = attStmt.get("alg");
	const response = attStmt.get("response");
	if (!attStmt.get("ver")) throw new Error("No ver value in attestation (SafetyNet)");
	if (!response) throw new Error("No response was included in attStmt by authenticator (SafetyNet)");
	const jwtParts = toUTF8String(response).split(".");
	const HEADER = JSON.parse(toUTF8String$1(jwtParts[0]));
	const PAYLOAD = JSON.parse(toUTF8String$1(jwtParts[1]));
	const SIGNATURE = jwtParts[2];
	/**
	* START Verify PAYLOAD
	*/
	const { nonce, ctsProfileMatch, timestampMs } = PAYLOAD;
	if (verifyTimestampMS) {
		let now = Date.now();
		if (timestampMs > Date.now()) throw new Error(`Payload timestamp "${timestampMs}" was later than "${now}" (SafetyNet)`);
		const timestampPlusDelay = timestampMs + 60 * 1e3;
		now = Date.now();
		if (timestampPlusDelay < now) throw new Error(`Payload timestamp "${timestampPlusDelay}" has expired (SafetyNet)`);
	}
	if (nonce !== fromBuffer(await toHash(concat([authData, clientDataHash])), "base64")) throw new Error("Could not verify payload nonce (SafetyNet)");
	if (attestationSafetyNetEnforceCTSCheck && !ctsProfileMatch) throw new Error("Could not verify device integrity (SafetyNet)");
	/**
	* END Verify PAYLOAD
	*/
	/**
	* START Verify Header
	*/
	const leafCertBuffer = toBuffer(HEADER.x5c[0], "base64");
	const { subject } = getCertificateInfo(leafCertBuffer);
	if (subject.CN !== "attest.android.com") throw new Error("Certificate common name was not \"attest.android.com\" (SafetyNet)");
	const statement = await MetadataService.getStatement(aaguid);
	if (statement) try {
		await verifyAttestationWithMetadata({
			statement,
			credentialPublicKey,
			x5c: HEADER.x5c,
			attestationStatementAlg: alg
		});
	} catch (err) {
		throw new Error(`${err.message} (SafetyNet)`);
	}
	else try {
		await validateCertificatePath(HEADER.x5c.map(convertCertBufferToPEM), rootCertificates);
	} catch (err) {
		throw new Error(`${err.message} (SafetyNet)`);
	}
	/**
	* END Verify Header
	*/
	/**
	* START Verify Signature
	*/
	const signatureBaseBuffer = fromUTF8String(`${jwtParts[0]}.${jwtParts[1]}`);
	/**
	* END Verify Signature
	*/
	return await verifySignature({
		signature: toBuffer(SIGNATURE),
		data: signatureBaseBuffer,
		x509Certificate: leafCertBuffer
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/tpm/constants.js
/**
* A whole lotta domain knowledge is captured here, with hazy connections to source
* documents. Good places to start searching for more info on these values are the
* following Trusted Computing Group TPM Library docs linked in the WebAuthn API:
*
* - https://www.trustedcomputinggroup.org/wp-content/uploads/TPM-Rev-2.0-Part-1-Architecture-01.38.pdf
* - https://www.trustedcomputinggroup.org/wp-content/uploads/TPM-Rev-2.0-Part-2-Structures-01.38.pdf
* - https://www.trustedcomputinggroup.org/wp-content/uploads/TPM-Rev-2.0-Part-3-Commands-01.38.pdf
*/
/**
* 6.9 TPM_ST (Structure Tags)
*/
var TPM_ST = {
	196: "TPM_ST_RSP_COMMAND",
	32768: "TPM_ST_NULL",
	32769: "TPM_ST_NO_SESSIONS",
	32770: "TPM_ST_SESSIONS",
	32788: "TPM_ST_ATTEST_NV",
	32789: "TPM_ST_ATTEST_COMMAND_AUDIT",
	32790: "TPM_ST_ATTEST_SESSION_AUDIT",
	32791: "TPM_ST_ATTEST_CERTIFY",
	32792: "TPM_ST_ATTEST_QUOTE",
	32793: "TPM_ST_ATTEST_TIME",
	32794: "TPM_ST_ATTEST_CREATION",
	32801: "TPM_ST_CREATION",
	32802: "TPM_ST_VERIFIED",
	32803: "TPM_ST_AUTH_SECRET",
	32804: "TPM_ST_HASHCHECK",
	32805: "TPM_ST_AUTH_SIGNED",
	32809: "TPM_ST_FU_MANIFEST"
};
/**
* 6.3 TPM_ALG_ID
*/
var TPM_ALG = {
	0: "TPM_ALG_ERROR",
	1: "TPM_ALG_RSA",
	4: "TPM_ALG_SHA",
	4: "TPM_ALG_SHA1",
	5: "TPM_ALG_HMAC",
	6: "TPM_ALG_AES",
	7: "TPM_ALG_MGF1",
	8: "TPM_ALG_KEYEDHASH",
	10: "TPM_ALG_XOR",
	11: "TPM_ALG_SHA256",
	12: "TPM_ALG_SHA384",
	13: "TPM_ALG_SHA512",
	16: "TPM_ALG_NULL",
	18: "TPM_ALG_SM3_256",
	19: "TPM_ALG_SM4",
	20: "TPM_ALG_RSASSA",
	21: "TPM_ALG_RSAES",
	22: "TPM_ALG_RSAPSS",
	23: "TPM_ALG_OAEP",
	24: "TPM_ALG_ECDSA",
	25: "TPM_ALG_ECDH",
	26: "TPM_ALG_ECDAA",
	27: "TPM_ALG_SM2",
	28: "TPM_ALG_ECSCHNORR",
	29: "TPM_ALG_ECMQV",
	32: "TPM_ALG_KDF1_SP800_56A",
	33: "TPM_ALG_KDF2",
	34: "TPM_ALG_KDF1_SP800_108",
	35: "TPM_ALG_ECC",
	37: "TPM_ALG_SYMCIPHER",
	38: "TPM_ALG_CAMELLIA",
	64: "TPM_ALG_CTR",
	65: "TPM_ALG_OFB",
	66: "TPM_ALG_CBC",
	67: "TPM_ALG_CFB",
	68: "TPM_ALG_ECB"
};
/**
* 6.4 TPM_ECC_CURVE
*/
var TPM_ECC_CURVE = {
	0: "TPM_ECC_NONE",
	1: "TPM_ECC_NIST_P192",
	2: "TPM_ECC_NIST_P224",
	3: "TPM_ECC_NIST_P256",
	4: "TPM_ECC_NIST_P384",
	5: "TPM_ECC_NIST_P521",
	16: "TPM_ECC_BN_P256",
	17: "TPM_ECC_BN_P638",
	32: "TPM_ECC_SM2_P256"
};
/**
* Sourced from https://trustedcomputinggroup.org/resource/vendor-id-registry/
*
* Latest version:
* https://trustedcomputinggroup.org/wp-content/uploads/TCG-TPM-Vendor-ID-Registry-Version-1.02-Revision-1.00.pdf
*/
var TPM_MANUFACTURERS = {
	"id:414D4400": {
		name: "AMD",
		id: "AMD"
	},
	"id:414E5400": {
		name: "Ant Group",
		id: "ANT"
	},
	"id:41544D4C": {
		name: "Atmel",
		id: "ATML"
	},
	"id:4252434D": {
		name: "Broadcom",
		id: "BRCM"
	},
	"id:4353434F": {
		name: "Cisco",
		id: "CSCO"
	},
	"id:464C5953": {
		name: "Flyslice Technologies",
		id: "FLYS"
	},
	"id:524F4343": {
		name: "Fuzhou Rockchip",
		id: "ROCC"
	},
	"id:474F4F47": {
		name: "Google",
		id: "GOOG"
	},
	"id:48504900": {
		name: "HPI",
		id: "HPI"
	},
	"id:48504500": {
		name: "HPE",
		id: "HPE"
	},
	"id:48495349": {
		name: "Huawei",
		id: "HISI"
	},
	"id:49424d00": {
		name: "IBM",
		id: "IBM"
	},
	"id:49424D00": {
		name: "IBM",
		id: "IBM"
	},
	"id:49465800": {
		name: "Infineon",
		id: "IFX"
	},
	"id:494E5443": {
		name: "Intel",
		id: "INTC"
	},
	"id:4C454E00": {
		name: "Lenovo",
		id: "LEN"
	},
	"id:4D534654": {
		name: "Microsoft",
		id: "MSFT"
	},
	"id:4E534D20": {
		name: "National Semiconductor",
		id: "NSM"
	},
	"id:4E545A00": {
		name: "Nationz",
		id: "NTZ"
	},
	"id:4E534700": {
		name: "NSING",
		id: "NSG"
	},
	"id:4E544300": {
		name: "Nuvoton Technology",
		id: "NTC"
	},
	"id:51434F4D": {
		name: "Qualcomm",
		id: "QCOM"
	},
	"id:534D534E": {
		name: "Samsung",
		id: "SMSN"
	},
	"id:53454345": {
		name: "SecEdge",
		id: "SECE"
	},
	"id:534E5300": {
		name: "Sinosun",
		id: "SNS"
	},
	"id:534D5343": {
		name: "SMSC",
		id: "SMSC"
	},
	"id:53544D20": {
		name: "STMicroelectronics",
		id: "STM"
	},
	"id:54584E00": {
		name: "Texas Instruments",
		id: "TXN"
	},
	"id:57454300": {
		name: "Winbond",
		id: "WEC"
	},
	"id:5345414C": {
		name: "Wisekey",
		id: "SEAL"
	},
	"id:FFFFF1D0": {
		name: "FIDO Alliance",
		id: "FIDO"
	}
};
/**
* Match TPM public area curve ID's to `crv` numbers used in COSE public keys
*/
var TPM_ECC_CURVE_COSE_CRV_MAP = {
	TPM_ECC_NIST_P256: 1,
	TPM_ECC_NIST_P384: 2,
	TPM_ECC_NIST_P521: 3,
	TPM_ECC_BN_P256: 1,
	TPM_ECC_SM2_P256: 1
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/tpm/parseCertInfo.js
/**
* Cut up a TPM attestation's certInfo into intelligible chunks
*/
function parseCertInfo(certInfo) {
	let pointer = 0;
	const dataView = toDataView(certInfo);
	const magic = dataView.getUint32(pointer);
	pointer += 4;
	const typeBuffer = dataView.getUint16(pointer);
	pointer += 2;
	const type = TPM_ST[typeBuffer];
	const qualifiedSignerLength = dataView.getUint16(pointer);
	pointer += 2;
	const qualifiedSigner = certInfo.slice(pointer, pointer += qualifiedSignerLength);
	const extraDataLength = dataView.getUint16(pointer);
	pointer += 2;
	const extraData = certInfo.slice(pointer, pointer += extraDataLength);
	const clock = certInfo.slice(pointer, pointer += 8);
	const resetCount = dataView.getUint32(pointer);
	pointer += 4;
	const restartCount = dataView.getUint32(pointer);
	pointer += 4;
	const clockInfo = {
		clock,
		resetCount,
		restartCount,
		safe: !!certInfo.slice(pointer, pointer += 1)
	};
	const firmwareVersion = certInfo.slice(pointer, pointer += 8);
	const attestedNameLength = dataView.getUint16(pointer);
	pointer += 2;
	const attestedName = certInfo.slice(pointer, pointer += attestedNameLength);
	const attestedNameDataView = toDataView(attestedName);
	const qualifiedNameLength = dataView.getUint16(pointer);
	pointer += 2;
	const qualifiedName = certInfo.slice(pointer, pointer += qualifiedNameLength);
	return {
		magic,
		type,
		qualifiedSigner,
		extraData,
		clockInfo,
		firmwareVersion,
		attested: {
			nameAlg: TPM_ALG[attestedNameDataView.getUint16(0)],
			nameAlgBuffer: attestedName.slice(0, 2),
			name: attestedName,
			qualifiedName
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/tpm/parsePubArea.js
/**
* Break apart a TPM attestation's pubArea buffer
*
* See 12.2.4 TPMT_PUBLIC here:
* https://trustedcomputinggroup.org/wp-content/uploads/TPM-Rev-2.0-Part-2-Structures-00.96-130315.pdf
*/
function parsePubArea(pubArea) {
	let pointer = 0;
	const dataView = toDataView(pubArea);
	const type = TPM_ALG[dataView.getUint16(pointer)];
	pointer += 2;
	const nameAlg = TPM_ALG[dataView.getUint16(pointer)];
	pointer += 2;
	const objectAttributesInt = dataView.getUint32(pointer);
	pointer += 4;
	const objectAttributes = {
		fixedTPM: !!(objectAttributesInt & 1),
		stClear: !!(objectAttributesInt & 2),
		fixedParent: !!(objectAttributesInt & 8),
		sensitiveDataOrigin: !!(objectAttributesInt & 16),
		userWithAuth: !!(objectAttributesInt & 32),
		adminWithPolicy: !!(objectAttributesInt & 64),
		noDA: !!(objectAttributesInt & 512),
		encryptedDuplication: !!(objectAttributesInt & 1024),
		restricted: !!(objectAttributesInt & 32768),
		decrypt: !!(objectAttributesInt & 65536),
		signOrEncrypt: !!(objectAttributesInt & 131072)
	};
	const authPolicyLength = dataView.getUint16(pointer);
	pointer += 2;
	const authPolicy = pubArea.slice(pointer, pointer += authPolicyLength);
	const parameters = {};
	let unique = Uint8Array.from([]);
	if (type === "TPM_ALG_RSA") {
		const symmetric = TPM_ALG[dataView.getUint16(pointer)];
		pointer += 2;
		const scheme = TPM_ALG[dataView.getUint16(pointer)];
		pointer += 2;
		const keyBits = dataView.getUint16(pointer);
		pointer += 2;
		const exponent = dataView.getUint32(pointer);
		pointer += 4;
		parameters.rsa = {
			symmetric,
			scheme,
			keyBits,
			exponent
		};
		/**
		* See 11.2.4.5 TPM2B_PUBLIC_KEY_RSA here:
		* https://trustedcomputinggroup.org/wp-content/uploads/TPM-Rev-2.0-Part-2-Structures-00.96-130315.pdf
		*/
		const uniqueLength = dataView.getUint16(pointer);
		pointer += 2;
		unique = pubArea.slice(pointer, pointer += uniqueLength);
	} else if (type === "TPM_ALG_ECC") {
		const symmetric = TPM_ALG[dataView.getUint16(pointer)];
		pointer += 2;
		const scheme = TPM_ALG[dataView.getUint16(pointer)];
		pointer += 2;
		const curveID = TPM_ECC_CURVE[dataView.getUint16(pointer)];
		pointer += 2;
		const kdf = TPM_ALG[dataView.getUint16(pointer)];
		pointer += 2;
		parameters.ecc = {
			symmetric,
			scheme,
			curveID,
			kdf
		};
		/**
		* See 11.2.5.1 TPM2B_ECC_PARAMETER here:
		* https://trustedcomputinggroup.org/wp-content/uploads/TPM-Rev-2.0-Part-2-Structures-00.96-130315.pdf
		*/
		const uniqueXLength = dataView.getUint16(pointer);
		pointer += 2;
		const uniqueX = pubArea.slice(pointer, pointer += uniqueXLength);
		const uniqueYLength = dataView.getUint16(pointer);
		pointer += 2;
		unique = concat([uniqueX, pubArea.slice(pointer, pointer += uniqueYLength)]);
	} else throw new Error(`Unexpected type "${type}" (TPM)`);
	return {
		type,
		nameAlg,
		objectAttributes,
		authPolicy,
		parameters,
		unique
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/tpm/verifyAttestationTPM.js
async function verifyAttestationTPM(options) {
	const { aaguid, attStmt, authData, credentialPublicKey, clientDataHash, rootCertificates } = options;
	const ver = attStmt.get("ver");
	const sig = attStmt.get("sig");
	const alg = attStmt.get("alg");
	const x5c = attStmt.get("x5c");
	const pubArea = attStmt.get("pubArea");
	const certInfo = attStmt.get("certInfo");
	/**
	* Verify structures
	*/
	if (ver !== "2.0") throw new Error(`Unexpected ver "${ver}", expected "2.0" (TPM)`);
	if (!sig) throw new Error("No attestation signature provided in attestation statement (TPM)");
	if (!alg) throw new Error(`Attestation statement did not contain alg (TPM)`);
	if (!isCOSEAlg(alg)) throw new Error(`Attestation statement contained invalid alg ${alg} (TPM)`);
	if (!x5c) throw new Error("No attestation certificate provided in attestation statement (TPM)");
	if (!pubArea) throw new Error("Attestation statement did not contain pubArea (TPM)");
	if (!certInfo) throw new Error("Attestation statement did not contain certInfo (TPM)");
	const { unique, type: pubType, parameters } = parsePubArea(pubArea);
	const cosePublicKey = decodeCredentialPublicKey(credentialPublicKey);
	if (pubType === "TPM_ALG_RSA") {
		if (!isCOSEPublicKeyRSA(cosePublicKey)) throw new Error(`Credential public key with kty ${cosePublicKey.get(COSEKEYS.kty)} did not match ${pubType}`);
		const n = cosePublicKey.get(COSEKEYS.n);
		const e = cosePublicKey.get(COSEKEYS.e);
		if (!n) throw new Error("COSE public key missing n (TPM|RSA)");
		if (!e) throw new Error("COSE public key missing e (TPM|RSA)");
		if (!areEqual(unique, n)) throw new Error("PubArea unique is not same as credentialPublicKey (TPM|RSA)");
		if (!parameters.rsa) throw new Error(`Parsed pubArea type is RSA, but missing parameters.rsa (TPM|RSA)`);
		const eBuffer = e;
		const pubAreaExponent = parameters.rsa.exponent || 65537;
		const eSum = eBuffer[0] + (eBuffer[1] << 8) + (eBuffer[2] << 16);
		if (pubAreaExponent !== eSum) throw new Error(`Unexpected public key exp ${eSum}, expected ${pubAreaExponent} (TPM|RSA)`);
	} else if (pubType === "TPM_ALG_ECC") {
		if (!isCOSEPublicKeyEC2(cosePublicKey)) throw new Error(`Credential public key with kty ${cosePublicKey.get(COSEKEYS.kty)} did not match ${pubType}`);
		const crv = cosePublicKey.get(COSEKEYS.crv);
		const x = cosePublicKey.get(COSEKEYS.x);
		const y = cosePublicKey.get(COSEKEYS.y);
		if (!crv) throw new Error("COSE public key missing crv (TPM|ECC)");
		if (!x) throw new Error("COSE public key missing x (TPM|ECC)");
		if (!y) throw new Error("COSE public key missing y (TPM|ECC)");
		if (!areEqual(unique, concat([x, y]))) throw new Error("PubArea unique is not same as public key x and y (TPM|ECC)");
		if (!parameters.ecc) throw new Error(`Parsed pubArea type is ECC, but missing parameters.ecc (TPM|ECC)`);
		const pubAreaCurveID = parameters.ecc.curveID;
		const pubAreaCurveIDMapToCOSECRV = TPM_ECC_CURVE_COSE_CRV_MAP[pubAreaCurveID];
		if (pubAreaCurveIDMapToCOSECRV !== crv) throw new Error(`Public area key curve ID "${pubAreaCurveID}" mapped to "${pubAreaCurveIDMapToCOSECRV}" which did not match public key crv of "${crv}" (TPM|ECC)`);
	} else throw new Error(`Unsupported pubArea.type "${pubType}"`);
	const { magic, type: certType, attested, extraData } = parseCertInfo(certInfo);
	if (magic !== 4283712327) throw new Error(`Unexpected magic value "${magic}", expected "0xff544347" (TPM)`);
	if (certType !== "TPM_ST_ATTEST_CERTIFY") throw new Error(`Unexpected type "${certType}", expected "TPM_ST_ATTEST_CERTIFY" (TPM)`);
	const pubAreaHash = await toHash(pubArea, attestedNameAlgToCOSEAlg(attested.nameAlg));
	const attestedName = concat([attested.nameAlgBuffer, pubAreaHash]);
	if (!areEqual(attested.name, attestedName)) throw new Error(`Attested name comparison failed (TPM)`);
	if (!areEqual(extraData, await toHash(concat([authData, clientDataHash]), alg))) throw new Error("CertInfo extra data did not equal hashed attestation (TPM)");
	/**
	* Verify signature
	*/
	if (x5c.length < 1) throw new Error("No certificates present in x5c array (TPM)");
	const { basicConstraintsCA, version, subject, notAfter, notBefore } = getCertificateInfo(x5c[0]);
	if (basicConstraintsCA) throw new Error("Certificate basic constraints CA was not `false` (TPM)");
	if (version !== 2) throw new Error("Certificate version was not `3` (ASN.1 value of 2) (TPM)");
	if (subject.combined.length > 0) throw new Error("Certificate subject was not empty (TPM)");
	let now = /* @__PURE__ */ new Date();
	if (notBefore > now) throw new Error(`Certificate not good before "${notBefore.toString()}" (TPM)`);
	now = /* @__PURE__ */ new Date();
	if (notAfter < now) throw new Error(`Certificate not good after "${notAfter.toString()}" (TPM)`);
	/**
	* Plumb the depths of the certificate's ASN.1-formatted data for some values we need to verify
	*/
	const parsedCert = AsnParser.parse(x5c[0], Certificate);
	if (!parsedCert.tbsCertificate.extensions) throw new Error("Certificate was missing extensions (TPM)");
	let subjectAltNamePresent;
	let extKeyUsage;
	parsedCert.tbsCertificate.extensions.forEach((ext) => {
		if (ext.extnID === id_ce_subjectAltName) subjectAltNamePresent = AsnParser.parse(ext.extnValue, SubjectAlternativeName);
		else if (ext.extnID === id_ce_extKeyUsage) extKeyUsage = AsnParser.parse(ext.extnValue, ExtendedKeyUsage$1);
	});
	if (!subjectAltNamePresent) throw new Error("Certificate did not contain subjectAltName extension (TPM)");
	if (!subjectAltNamePresent[0].directoryName?.[0].length) throw new Error("Certificate subjectAltName extension directoryName was empty (TPM)");
	const { tcgAtTpmManufacturer, tcgAtTpmModel, tcgAtTpmVersion } = getTcgAtTpmValues(subjectAltNamePresent[0].directoryName);
	if (!tcgAtTpmManufacturer || !tcgAtTpmModel || !tcgAtTpmVersion) throw new Error("Certificate contained incomplete subjectAltName data (TPM)");
	if (!extKeyUsage) throw new Error("Certificate did not contain ExtendedKeyUsage extension (TPM)");
	if (!TPM_MANUFACTURERS[tcgAtTpmManufacturer]) throw new Error(`Could not match TPM manufacturer "${tcgAtTpmManufacturer}" (TPM)`);
	if (extKeyUsage[0] !== "2.23.133.8.3") throw new Error(`Unexpected extKeyUsage "${extKeyUsage[0]}", expected "2.23.133.8.3" (TPM)`);
	try {
		await validateExtFIDOGenCEAAGUID(parsedCert.tbsCertificate.extensions, aaguid);
	} catch (err) {
		throw new Error(`${err.message} (TPM)`);
	}
	const statement = await MetadataService.getStatement(aaguid);
	if (statement) try {
		await verifyAttestationWithMetadata({
			statement,
			credentialPublicKey,
			x5c,
			attestationStatementAlg: alg
		});
	} catch (err) {
		throw new Error(`${err.message} (TPM)`);
	}
	else try {
		await validateCertificatePath(x5c.map(convertCertBufferToPEM), rootCertificates);
	} catch (err) {
		throw new Error(`${err.message} (TPM)`);
	}
	return verifySignature({
		signature: sig,
		data: certInfo,
		x509Certificate: x5c[0],
		hashAlgorithm: alg
	});
}
/**
* Contain logic for pulling TPM-specific values out of subjectAlternativeName extension
*/
function getTcgAtTpmValues(root) {
	const oidManufacturer = "2.23.133.2.1";
	const oidModel = "2.23.133.2.2";
	const oidVersion = "2.23.133.2.3";
	let tcgAtTpmManufacturer;
	let tcgAtTpmModel;
	let tcgAtTpmVersion;
	/**
	* Iterate through the following potential structures:
	*
	* (Good, follows the spec)
	* https://trustedcomputinggroup.org/wp-content/uploads/TCG_IWG_EKCredentialProfile_v2p3_r2_pub.pdf (page 33)
	* Name [
	*   RelativeDistinguishedName [
	*     AttributeTypeAndValue { type, value }
	*   ]
	*   RelativeDistinguishedName [
	*     AttributeTypeAndValue { type, value }
	*   ]
	*   RelativeDistinguishedName [
	*     AttributeTypeAndValue { type, value }
	*   ]
	* ]
	*
	* (Bad, does not follow the spec)
	* Name [
	*   RelativeDistinguishedName [
	*     AttributeTypeAndValue { type, value }
	*     AttributeTypeAndValue { type, value }
	*     AttributeTypeAndValue { type, value }
	*   ]
	* ]
	*
	* Both structures have been seen in the wild and need to be supported
	*/
	root.forEach((relName) => {
		relName.forEach((attr) => {
			if (attr.type === oidManufacturer) tcgAtTpmManufacturer = attr.value.toString();
			else if (attr.type === oidModel) tcgAtTpmModel = attr.value.toString();
			else if (attr.type === oidVersion) tcgAtTpmVersion = attr.value.toString();
		});
	});
	return {
		tcgAtTpmManufacturer,
		tcgAtTpmModel,
		tcgAtTpmVersion
	};
}
/**
* Convert TPM-specific SHA algorithm ID's with COSE-specific equivalents. Note that the choice to
* use ECDSA SHA IDs is arbitrary; any such COSEALG that would map to SHA-256 in
* `mapCoseAlgToWebCryptoAlg()`
*
* SHA IDs referenced from here:
*
* https://trustedcomputinggroup.org/wp-content/uploads/TCG_TPM2_r1p59_Part2_Structures_pub.pdf
*/
function attestedNameAlgToCOSEAlg(alg) {
	if (alg === "TPM_ALG_SHA256") return COSEALG.ES256;
	else if (alg === "TPM_ALG_SHA384") return COSEALG.ES384;
	else if (alg === "TPM_ALG_SHA512") return COSEALG.ES512;
	throw new Error(`Unexpected TPM attested name alg ${alg}`);
}
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-android@2.7.0/node_modules/@peculiar/asn1-android/build/es2015/key_description.js
var IntegerSet_1;
var id_ce_keyDescription = "1.3.6.1.4.1.11129.2.1.17";
var VerifiedBootState;
(function(VerifiedBootState) {
	VerifiedBootState[VerifiedBootState["verified"] = 0] = "verified";
	VerifiedBootState[VerifiedBootState["selfSigned"] = 1] = "selfSigned";
	VerifiedBootState[VerifiedBootState["unverified"] = 2] = "unverified";
	VerifiedBootState[VerifiedBootState["failed"] = 3] = "failed";
})(VerifiedBootState || (VerifiedBootState = {}));
var RootOfTrust = class {
	verifiedBootKey = new OctetString();
	deviceLocked = false;
	verifiedBootState = VerifiedBootState.verified;
	verifiedBootHash;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: OctetString })], RootOfTrust.prototype, "verifiedBootKey", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Boolean })], RootOfTrust.prototype, "deviceLocked", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], RootOfTrust.prototype, "verifiedBootState", void 0);
__decorate([AsnProp({
	type: OctetString,
	optional: true
})], RootOfTrust.prototype, "verifiedBootHash", void 0);
var IntegerSet = IntegerSet_1 = class IntegerSet extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, IntegerSet_1.prototype);
	}
};
IntegerSet = IntegerSet_1 = __decorate([AsnType({
	type: AsnTypeTypes.Set,
	itemType: AsnPropTypes.Integer
})], IntegerSet);
var AuthorizationList = class {
	purpose;
	algorithm;
	keySize;
	digest;
	padding;
	ecCurve;
	rsaPublicExponent;
	mgfDigest;
	rollbackResistance;
	earlyBootOnly;
	activeDateTime;
	originationExpireDateTime;
	usageExpireDateTime;
	usageCountLimit;
	noAuthRequired;
	userAuthType;
	authTimeout;
	allowWhileOnBody;
	trustedUserPresenceRequired;
	trustedConfirmationRequired;
	unlockedDeviceRequired;
	allApplications;
	applicationId;
	creationDateTime;
	origin;
	rollbackResistant;
	rootOfTrust;
	osVersion;
	osPatchLevel;
	attestationApplicationId;
	attestationIdBrand;
	attestationIdDevice;
	attestationIdProduct;
	attestationIdSerial;
	attestationIdImei;
	attestationIdMeid;
	attestationIdManufacturer;
	attestationIdModel;
	vendorPatchLevel;
	bootPatchLevel;
	deviceUniqueAttestation;
	attestationIdSecondImei;
	moduleHash;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	context: 1,
	type: IntegerSet,
	optional: true
})], AuthorizationList.prototype, "purpose", void 0);
__decorate([AsnProp({
	context: 2,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "algorithm", void 0);
__decorate([AsnProp({
	context: 3,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "keySize", void 0);
__decorate([AsnProp({
	context: 5,
	type: IntegerSet,
	optional: true
})], AuthorizationList.prototype, "digest", void 0);
__decorate([AsnProp({
	context: 6,
	type: IntegerSet,
	optional: true
})], AuthorizationList.prototype, "padding", void 0);
__decorate([AsnProp({
	context: 10,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "ecCurve", void 0);
__decorate([AsnProp({
	context: 200,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "rsaPublicExponent", void 0);
__decorate([AsnProp({
	context: 203,
	type: IntegerSet,
	optional: true
})], AuthorizationList.prototype, "mgfDigest", void 0);
__decorate([AsnProp({
	context: 303,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "rollbackResistance", void 0);
__decorate([AsnProp({
	context: 305,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "earlyBootOnly", void 0);
__decorate([AsnProp({
	context: 400,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "activeDateTime", void 0);
__decorate([AsnProp({
	context: 401,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "originationExpireDateTime", void 0);
__decorate([AsnProp({
	context: 402,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "usageExpireDateTime", void 0);
__decorate([AsnProp({
	context: 405,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "usageCountLimit", void 0);
__decorate([AsnProp({
	context: 503,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "noAuthRequired", void 0);
__decorate([AsnProp({
	context: 504,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "userAuthType", void 0);
__decorate([AsnProp({
	context: 505,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "authTimeout", void 0);
__decorate([AsnProp({
	context: 506,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "allowWhileOnBody", void 0);
__decorate([AsnProp({
	context: 507,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "trustedUserPresenceRequired", void 0);
__decorate([AsnProp({
	context: 508,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "trustedConfirmationRequired", void 0);
__decorate([AsnProp({
	context: 509,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "unlockedDeviceRequired", void 0);
__decorate([AsnProp({
	context: 600,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "allApplications", void 0);
__decorate([AsnProp({
	context: 601,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "applicationId", void 0);
__decorate([AsnProp({
	context: 701,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "creationDateTime", void 0);
__decorate([AsnProp({
	context: 702,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "origin", void 0);
__decorate([AsnProp({
	context: 703,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "rollbackResistant", void 0);
__decorate([AsnProp({
	context: 704,
	type: RootOfTrust,
	optional: true
})], AuthorizationList.prototype, "rootOfTrust", void 0);
__decorate([AsnProp({
	context: 705,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "osVersion", void 0);
__decorate([AsnProp({
	context: 706,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "osPatchLevel", void 0);
__decorate([AsnProp({
	context: 709,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationApplicationId", void 0);
__decorate([AsnProp({
	context: 710,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdBrand", void 0);
__decorate([AsnProp({
	context: 711,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdDevice", void 0);
__decorate([AsnProp({
	context: 712,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdProduct", void 0);
__decorate([AsnProp({
	context: 713,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdSerial", void 0);
__decorate([AsnProp({
	context: 714,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdImei", void 0);
__decorate([AsnProp({
	context: 715,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdMeid", void 0);
__decorate([AsnProp({
	context: 716,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdManufacturer", void 0);
__decorate([AsnProp({
	context: 717,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdModel", void 0);
__decorate([AsnProp({
	context: 718,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "vendorPatchLevel", void 0);
__decorate([AsnProp({
	context: 719,
	type: AsnPropTypes.Integer,
	optional: true
})], AuthorizationList.prototype, "bootPatchLevel", void 0);
__decorate([AsnProp({
	context: 720,
	type: AsnPropTypes.Null,
	optional: true
})], AuthorizationList.prototype, "deviceUniqueAttestation", void 0);
__decorate([AsnProp({
	context: 723,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "attestationIdSecondImei", void 0);
__decorate([AsnProp({
	context: 724,
	type: OctetString,
	optional: true
})], AuthorizationList.prototype, "moduleHash", void 0);
var SecurityLevel;
(function(SecurityLevel) {
	SecurityLevel[SecurityLevel["software"] = 0] = "software";
	SecurityLevel[SecurityLevel["trustedEnvironment"] = 1] = "trustedEnvironment";
	SecurityLevel[SecurityLevel["strongBox"] = 2] = "strongBox";
})(SecurityLevel || (SecurityLevel = {}));
var Version;
(function(Version) {
	Version[Version["KM2"] = 1] = "KM2";
	Version[Version["KM3"] = 2] = "KM3";
	Version[Version["KM4"] = 3] = "KM4";
	Version[Version["KM4_1"] = 4] = "KM4_1";
	Version[Version["keyMint1"] = 100] = "keyMint1";
	Version[Version["keyMint2"] = 200] = "keyMint2";
	Version[Version["keyMint3"] = 300] = "keyMint3";
	Version[Version["keyMint4"] = 400] = "keyMint4";
})(Version || (Version = {}));
var KeyDescription = class {
	attestationVersion = Version.KM4;
	attestationSecurityLevel = SecurityLevel.software;
	keymasterVersion = 0;
	keymasterSecurityLevel = SecurityLevel.software;
	attestationChallenge = new OctetString();
	uniqueId = new OctetString();
	softwareEnforced = new AuthorizationList();
	teeEnforced = new AuthorizationList();
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KeyDescription.prototype, "attestationVersion", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], KeyDescription.prototype, "attestationSecurityLevel", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KeyDescription.prototype, "keymasterVersion", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], KeyDescription.prototype, "keymasterSecurityLevel", void 0);
__decorate([AsnProp({ type: OctetString })], KeyDescription.prototype, "attestationChallenge", void 0);
__decorate([AsnProp({ type: OctetString })], KeyDescription.prototype, "uniqueId", void 0);
__decorate([AsnProp({ type: AuthorizationList })], KeyDescription.prototype, "softwareEnforced", void 0);
__decorate([AsnProp({ type: AuthorizationList })], KeyDescription.prototype, "teeEnforced", void 0);
var KeyMintKeyDescription = class KeyMintKeyDescription {
	attestationVersion = Version.keyMint4;
	attestationSecurityLevel = SecurityLevel.software;
	keyMintVersion = 0;
	keyMintSecurityLevel = SecurityLevel.software;
	attestationChallenge = new OctetString();
	uniqueId = new OctetString();
	softwareEnforced = new AuthorizationList();
	hardwareEnforced = new AuthorizationList();
	constructor(params = {}) {
		Object.assign(this, params);
	}
	toLegacyKeyDescription() {
		return new KeyDescription({
			attestationVersion: this.attestationVersion,
			attestationSecurityLevel: this.attestationSecurityLevel,
			keymasterVersion: this.keyMintVersion,
			keymasterSecurityLevel: this.keyMintSecurityLevel,
			attestationChallenge: this.attestationChallenge,
			uniqueId: this.uniqueId,
			softwareEnforced: this.softwareEnforced,
			teeEnforced: this.hardwareEnforced
		});
	}
	static fromLegacyKeyDescription(keyDesc) {
		return new KeyMintKeyDescription({
			attestationVersion: keyDesc.attestationVersion,
			attestationSecurityLevel: keyDesc.attestationSecurityLevel,
			keyMintVersion: keyDesc.keymasterVersion,
			keyMintSecurityLevel: keyDesc.keymasterSecurityLevel,
			attestationChallenge: keyDesc.attestationChallenge,
			uniqueId: keyDesc.uniqueId,
			softwareEnforced: keyDesc.softwareEnforced,
			hardwareEnforced: keyDesc.teeEnforced
		});
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KeyMintKeyDescription.prototype, "attestationVersion", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], KeyMintKeyDescription.prototype, "attestationSecurityLevel", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Integer })], KeyMintKeyDescription.prototype, "keyMintVersion", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], KeyMintKeyDescription.prototype, "keyMintSecurityLevel", void 0);
__decorate([AsnProp({ type: OctetString })], KeyMintKeyDescription.prototype, "attestationChallenge", void 0);
__decorate([AsnProp({ type: OctetString })], KeyMintKeyDescription.prototype, "uniqueId", void 0);
__decorate([AsnProp({ type: AuthorizationList })], KeyMintKeyDescription.prototype, "softwareEnforced", void 0);
__decorate([AsnProp({ type: AuthorizationList })], KeyMintKeyDescription.prototype, "hardwareEnforced", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-android@2.7.0/node_modules/@peculiar/asn1-android/build/es2015/nonstandard.js
var NonStandardAuthorizationList_1;
var NonStandardAuthorization = class NonStandardAuthorization extends AuthorizationList {};
NonStandardAuthorization = __decorate([AsnType({ type: AsnTypeTypes.Choice })], NonStandardAuthorization);
var NonStandardAuthorizationList = NonStandardAuthorizationList_1 = class NonStandardAuthorizationList extends AsnArray {
	constructor(items) {
		super(items);
		Object.setPrototypeOf(this, NonStandardAuthorizationList_1.prototype);
	}
	findProperty(key) {
		const prop = this.find((o) => o[key] !== void 0);
		if (prop) return prop[key];
	}
};
NonStandardAuthorizationList = NonStandardAuthorizationList_1 = __decorate([AsnType({
	type: AsnTypeTypes.Sequence,
	itemType: NonStandardAuthorization
})], NonStandardAuthorizationList);
var NonStandardKeyDescription = class {
	attestationVersion = Version.KM4;
	attestationSecurityLevel = SecurityLevel.software;
	keymasterVersion = 0;
	keymasterSecurityLevel = SecurityLevel.software;
	attestationChallenge = new OctetString();
	uniqueId = new OctetString();
	softwareEnforced = new NonStandardAuthorizationList();
	teeEnforced = new NonStandardAuthorizationList();
	get keyMintVersion() {
		return this.keymasterVersion;
	}
	set keyMintVersion(value) {
		this.keymasterVersion = value;
	}
	get keyMintSecurityLevel() {
		return this.keymasterSecurityLevel;
	}
	set keyMintSecurityLevel(value) {
		this.keymasterSecurityLevel = value;
	}
	get hardwareEnforced() {
		return this.teeEnforced;
	}
	set hardwareEnforced(value) {
		this.teeEnforced = value;
	}
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.Integer })], NonStandardKeyDescription.prototype, "attestationVersion", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], NonStandardKeyDescription.prototype, "attestationSecurityLevel", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Integer })], NonStandardKeyDescription.prototype, "keymasterVersion", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Enumerated })], NonStandardKeyDescription.prototype, "keymasterSecurityLevel", void 0);
__decorate([AsnProp({ type: OctetString })], NonStandardKeyDescription.prototype, "attestationChallenge", void 0);
__decorate([AsnProp({ type: OctetString })], NonStandardKeyDescription.prototype, "uniqueId", void 0);
__decorate([AsnProp({ type: NonStandardAuthorizationList })], NonStandardKeyDescription.prototype, "softwareEnforced", void 0);
__decorate([AsnProp({ type: NonStandardAuthorizationList })], NonStandardKeyDescription.prototype, "teeEnforced", void 0);
var NonStandardKeyMintKeyDescription = class NonStandardKeyMintKeyDescription extends NonStandardKeyDescription {
	constructor(params = {}) {
		if ("keymasterVersion" in params && !("keyMintVersion" in params)) params.keyMintVersion = params.keymasterVersion;
		if ("keymasterSecurityLevel" in params && !("keyMintSecurityLevel" in params)) params.keyMintSecurityLevel = params.keymasterSecurityLevel;
		if ("teeEnforced" in params && !("hardwareEnforced" in params)) params.hardwareEnforced = params.teeEnforced;
		super(params);
	}
};
NonStandardKeyMintKeyDescription = __decorate([AsnType({ type: AsnTypeTypes.Sequence })], NonStandardKeyMintKeyDescription);
//#endregion
//#region ../../node_modules/.pnpm/@peculiar+asn1-android@2.7.0/node_modules/@peculiar/asn1-android/build/es2015/attestation.js
var AttestationPackageInfo = class {
	packageName;
	version;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({ type: AsnPropTypes.OctetString })], AttestationPackageInfo.prototype, "packageName", void 0);
__decorate([AsnProp({ type: AsnPropTypes.Integer })], AttestationPackageInfo.prototype, "version", void 0);
var AttestationApplicationId = class {
	packageInfos;
	signatureDigests;
	constructor(params = {}) {
		Object.assign(this, params);
	}
};
__decorate([AsnProp({
	type: AttestationPackageInfo,
	repeated: "set"
})], AttestationApplicationId.prototype, "packageInfos", void 0);
__decorate([AsnProp({
	type: AsnPropTypes.OctetString,
	repeated: "set"
})], AttestationApplicationId.prototype, "signatureDigests", void 0);
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/verifyAttestationAndroidKey.js
/**
* Verify an attestation response with fmt 'android-key'
*/
async function verifyAttestationAndroidKey(options) {
	const { authData, clientDataHash, attStmt, credentialPublicKey, aaguid, rootCertificates } = options;
	const x5c = attStmt.get("x5c");
	const sig = attStmt.get("sig");
	const alg = attStmt.get("alg");
	if (!x5c) throw new Error("No attestation certificate provided in attestation statement (Android Key)");
	if (!sig) throw new Error("No attestation signature provided in attestation statement (Android Key)");
	if (!alg) throw new Error(`Attestation statement did not contain alg (Android Key)`);
	if (!isCOSEAlg(alg)) throw new Error(`Attestation statement contained invalid alg ${alg} (Android Key)`);
	/**
	* Verify that the public key in the first certificate in x5c matches the credentialPublicKey in
	* the attestedCredentialData in authenticatorData.
	*/
	const parsedCert = AsnParser.parse(x5c[0], Certificate);
	const parsedCertPubKey = new Uint8Array(parsedCert.tbsCertificate.subjectPublicKeyInfo.subjectPublicKey);
	if (!areEqual(convertCOSEtoPKCS(credentialPublicKey), parsedCertPubKey)) throw new Error("Credential public key does not equal leaf cert public key (Android Key)");
	/**
	* Verify that the attestationChallenge field in the attestation certificate extension data is
	* identical to clientDataHash.
	*/
	const extKeyStore = parsedCert.tbsCertificate.extensions?.find((ext) => ext.extnID === id_ce_keyDescription);
	if (!extKeyStore) throw new Error("Certificate did not contain extKeyStore (Android Key)");
	const { attestationChallenge, teeEnforced, softwareEnforced } = AsnParser.parse(extKeyStore.extnValue, KeyDescription);
	if (!areEqual(new Uint8Array(attestationChallenge.buffer), clientDataHash)) throw new Error("Attestation challenge was not equal to client data hash (Android Key)");
	/**
	* The AuthorizationList.allApplications field is not present on either authorization list
	* (softwareEnforced nor teeEnforced), since PublicKeyCredential MUST be scoped to the RP ID.
	*
	* (i.e. These shouldn't contain the [600] tag)
	*/
	if (teeEnforced.allApplications !== void 0) throw new Error("teeEnforced contained \"allApplications [600]\" tag (Android Key)");
	if (softwareEnforced.allApplications !== void 0) throw new Error("teeEnforced contained \"allApplications [600]\" tag (Android Key)");
	const statement = await MetadataService.getStatement(aaguid);
	if (statement) try {
		await verifyAttestationWithMetadata({
			statement,
			credentialPublicKey,
			x5c,
			attestationStatementAlg: alg
		});
	} catch (err) {
		const _err = err;
		throw new Error(`${_err.message} (Android Key)`, { cause: _err });
	}
	else {
		/**
		* Verify that x5c contains a full certificate path.
		*/
		const x5cNoRootPEM = x5c.slice(0, -1).map(convertCertBufferToPEM);
		const x5cRootPEM = x5c.slice(-1).map(convertCertBufferToPEM);
		try {
			await validateCertificatePath(x5cNoRootPEM, x5cRootPEM);
		} catch (err) {
			const _err = err;
			throw new Error(`${_err.message} (Android Key)`, { cause: _err });
		}
		/**
		* Make sure the root certificate is one of the Google Hardware Attestation Root certificates
		*
		* https://developer.android.com/privacy-and-security/security-key-attestation#root_certificate
		*/
		if (rootCertificates.length > 0 && rootCertificates.indexOf(x5cRootPEM[0]) < 0) throw new Error("x5c root certificate was not a known root certificate (Android Key)");
	}
	return verifySignature({
		signature: sig,
		data: concat([authData, clientDataHash]),
		x509Certificate: x5c[0],
		hashAlgorithm: alg
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifications/verifyAttestationApple.js
async function verifyAttestationApple(options) {
	const { attStmt, authData, clientDataHash, credentialPublicKey, rootCertificates } = options;
	const x5c = attStmt.get("x5c");
	if (!x5c) throw new Error("No attestation certificate provided in attestation statement (Apple)");
	/**
	* Verify certificate path
	*/
	try {
		await validateCertificatePath(x5c.map(convertCertBufferToPEM), rootCertificates);
	} catch (err) {
		throw new Error(`${err.message} (Apple)`);
	}
	const { extensions, subjectPublicKeyInfo } = AsnParser.parse(x5c[0], Certificate).tbsCertificate;
	if (!extensions) throw new Error("credCert missing extensions (Apple)");
	const extCertNonce = extensions.find((ext) => ext.extnID === "1.2.840.113635.100.8.2");
	if (!extCertNonce) throw new Error("credCert missing \"1.2.840.113635.100.8.2\" extension (Apple)");
	if (!areEqual(await toHash(concat([authData, clientDataHash])), new Uint8Array(extCertNonce.extnValue.buffer).slice(6))) throw new Error(`credCert nonce was not expected value (Apple)`);
	if (!areEqual(convertCOSEtoPKCS(credentialPublicKey), new Uint8Array(subjectPublicKeyInfo.subjectPublicKey))) throw new Error("Credential public key does not equal credCert public key (Apple)");
	return true;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/registration/verifyRegistrationResponse.js
/**
* Verify that the user has legitimately completed the registration process
*
* **Options:**
*
* @param response - Response returned by **@simplewebauthn/browser**'s `startAuthentication()`
* @param expectedChallenge - The base64url-encoded `options.challenge` returned by `generateRegistrationOptions()`
* @param expectedOrigin - Website URL (or array of URLs) that the registration should have occurred on
* @param expectedRPID - RP ID (or array of IDs) that was specified in the registration options
* @param expectedType **(Optional)** - The response type expected ('webauthn.create')
* @param requireUserPresence **(Optional)** - Enforce user presence by the authenticator (or skip it during auto registration) Defaults to `true`
* @param requireUserVerification **(Optional)** - Enforce user verification by the authenticator (via PIN, fingerprint, etc...) Defaults to `true`
* @param supportedAlgorithmIDs **(Optional)** - Array of numeric COSE algorithm identifiers supported for attestation by this RP. See https://www.iana.org/assignments/cose/cose.xhtml#algorithms. Defaults to all supported algorithm IDs
* @param attestationSafetyNetEnforceCTSCheck **(Optional)** - Require that an Android device's system integrity has not been tampered with if it uses SafetyNet attestation. Defaults to `true`
*/
async function verifyRegistrationResponse(options) {
	const { response, expectedChallenge, expectedOrigin, expectedRPID, expectedType, requireUserPresence = true, requireUserVerification = true, supportedAlgorithmIDs = supportedCOSEAlgorithmIdentifiers, attestationSafetyNetEnforceCTSCheck = true } = options;
	const { id, rawId, type: credentialType, response: attestationResponse } = response;
	if (!id) throw new Error("Missing credential ID");
	if (id !== rawId) throw new Error("Credential ID was not base64url-encoded");
	if (credentialType !== "public-key") throw new Error(`Unexpected credential type ${credentialType}, expected "public-key"`);
	const clientDataJSON = decodeClientDataJSON(attestationResponse.clientDataJSON);
	const { type, origin, challenge, tokenBinding } = clientDataJSON;
	if (Array.isArray(expectedType)) {
		if (!expectedType.includes(type)) {
			const joinedExpectedType = expectedType.join(", ");
			throw new Error(`Unexpected registration response type "${type}", expected one of: ${joinedExpectedType}`);
		}
	} else if (expectedType) {
		if (type !== expectedType) throw new Error(`Unexpected registration response type "${type}", expected "${expectedType}"`);
	} else if (type !== "webauthn.create") throw new Error(`Unexpected registration response type: ${type}`);
	if (typeof expectedChallenge === "function") {
		if (!await expectedChallenge(challenge)) throw new Error(`Custom challenge verifier returned false for registration response challenge "${challenge}"`);
	} else if (challenge !== expectedChallenge) throw new Error(`Unexpected registration response challenge "${challenge}", expected "${expectedChallenge}"`);
	if (Array.isArray(expectedOrigin)) {
		if (!expectedOrigin.includes(origin)) throw new Error(`Unexpected registration response origin "${origin}", expected one of: ${expectedOrigin.join(", ")}`);
	} else if (origin !== expectedOrigin) throw new Error(`Unexpected registration response origin "${origin}", expected "${expectedOrigin}"`);
	if (tokenBinding) {
		if (typeof tokenBinding !== "object") throw new Error(`Unexpected value for TokenBinding "${tokenBinding}"`);
		if ([
			"present",
			"supported",
			"not-supported"
		].indexOf(tokenBinding.status) < 0) throw new Error(`Unexpected tokenBinding.status value of "${tokenBinding.status}"`);
	}
	const attestationObject = toBuffer(attestationResponse.attestationObject);
	const decodedAttestationObject = decodeAttestationObject(attestationObject);
	const fmt = decodedAttestationObject.get("fmt");
	const authData = decodedAttestationObject.get("authData");
	const attStmt = decodedAttestationObject.get("attStmt");
	const { aaguid, rpIdHash, flags, credentialID, counter, credentialPublicKey, extensionsData } = parseAuthenticatorData(authData);
	let matchedRPID;
	if (expectedRPID) {
		let expectedRPIDs = [];
		if (typeof expectedRPID === "string") expectedRPIDs = [expectedRPID];
		else expectedRPIDs = expectedRPID;
		matchedRPID = await matchExpectedRPID(rpIdHash, expectedRPIDs);
	}
	if (requireUserPresence && !flags.up) throw new Error("User presence was required, but user was not present");
	if (requireUserVerification && !flags.uv) throw new Error("User verification was required, but user could not be verified");
	if (!credentialID) throw new Error("No credential ID was provided by authenticator");
	if (!credentialPublicKey) throw new Error("No public key was provided by authenticator");
	if (!aaguid) throw new Error("No AAGUID was present during registration");
	const alg = decodeCredentialPublicKey(credentialPublicKey).get(COSEKEYS.alg);
	if (typeof alg !== "number") throw new Error("Credential public key was missing numeric alg");
	if (!supportedAlgorithmIDs.includes(alg)) {
		const supported = supportedAlgorithmIDs.join(", ");
		throw new Error(`Unexpected public key alg "${alg}", expected one of "${supported}"`);
	}
	const verifierOpts = {
		aaguid,
		attStmt,
		authData,
		clientDataHash: await toHash(toBuffer(attestationResponse.clientDataJSON)),
		credentialID,
		credentialPublicKey,
		rootCertificates: SettingsService.getRootCertificates({ identifier: fmt }),
		rpIdHash,
		attestationSafetyNetEnforceCTSCheck
	};
	/**
	* Verification can only be performed when attestation = 'direct'
	*/
	let verified = false;
	if (fmt === "fido-u2f") verified = await verifyAttestationFIDOU2F(verifierOpts);
	else if (fmt === "packed") verified = await verifyAttestationPacked(verifierOpts);
	else if (fmt === "android-safetynet") verified = await verifyAttestationAndroidSafetyNet(verifierOpts);
	else if (fmt === "android-key") verified = await verifyAttestationAndroidKey(verifierOpts);
	else if (fmt === "tpm") verified = await verifyAttestationTPM(verifierOpts);
	else if (fmt === "apple") verified = await verifyAttestationApple(verifierOpts);
	else if (fmt === "none") {
		if (attStmt.size > 0) throw new Error("None attestation had unexpected attestation statement");
		verified = true;
	} else throw new Error(`Unsupported Attestation Format: ${fmt}`);
	if (!verified) return { verified: false };
	const { credentialDeviceType, credentialBackedUp } = parseBackupFlags(flags);
	return {
		verified: true,
		registrationInfo: {
			fmt,
			aaguid: convertAAGUIDToString(aaguid),
			credentialType,
			credential: {
				id: fromBuffer(credentialID),
				publicKey: credentialPublicKey,
				counter,
				transports: response.response.transports
			},
			attestationObject,
			userVerified: flags.uv,
			credentialDeviceType,
			credentialBackedUp,
			origin: clientDataJSON.origin,
			rpID: matchedRPID,
			authenticatorExtensionResults: extensionsData
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/authentication/generateAuthenticationOptions.js
/**
* Prepare a value to pass into navigator.credentials.get(...) for authenticator authentication
*
* **Options:**
*
* @param rpID - Valid domain name (after `https://`)
* @param allowCredentials **(Optional)** - Authenticators previously registered by the user, if any. If undefined the client will ask the user which credential they want to use
* @param challenge **(Optional)** - Random value the authenticator needs to sign and pass back user for authentication. Defaults to generating a random value
* @param timeout **(Optional)** - How long (in ms) the user can take to complete authentication. Defaults to `60000`
* @param userVerification **(Optional)** - Set to `'discouraged'` when asserting as part of a 2FA flow, otherwise set to `'preferred'` or `'required'` as desired. Defaults to `"preferred"`
* @param extensions **(Optional)** - Additional plugins the authenticator or browser should use during authentication
*/
async function generateAuthenticationOptions(options) {
	const { allowCredentials, challenge = await generateChallenge(), timeout = 6e4, userVerification = "preferred", extensions, rpID } = options;
	/**
	* Preserve ability to specify `string` values for challenges
	*/
	let _challenge = challenge;
	if (typeof _challenge === "string") _challenge = fromUTF8String(_challenge);
	return {
		rpId: rpID,
		challenge: fromBuffer(_challenge),
		allowCredentials: allowCredentials?.map((cred) => {
			if (!isBase64URL(cred.id)) throw new Error(`allowCredential id "${cred.id}" is not a valid base64url string`);
			return {
				...cred,
				id: trimPadding(cred.id),
				type: "public-key"
			};
		}),
		timeout,
		userVerification,
		extensions
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+server@13.3.0/node_modules/@simplewebauthn/server/esm/authentication/verifyAuthenticationResponse.js
/**
* Verify that the user has legitimately completed the authentication process
*
* **Options:**
*
* @param response - Response returned by **@simplewebauthn/browser**'s `startAuthentication()`
* @param expectedChallenge - The base64url-encoded `options.challenge` returned by `generateAuthenticationOptions()`
* @param expectedOrigin - Website URL (or array of URLs) that the registration should have occurred on
* @param expectedRPID - RP ID (or array of IDs) that was specified in the registration options
* @param credential - An internal {@link WebAuthnCredential} corresponding to `id` in the authentication response
* @param expectedType **(Optional)** - The response type expected ('webauthn.get')
* @param requireUserVerification **(Optional)** - Enforce user verification by the authenticator (via PIN, fingerprint, etc...) Defaults to `true`
* @param advancedFIDOConfig **(Optional)** - Options for satisfying more stringent FIDO RP feature requirements
* @param advancedFIDOConfig.userVerification **(Optional)** - Enable alternative rules for evaluating the User Presence and User Verified flags in authenticator data: UV (and UP) flags are optional unless this value is `"required"`
*/
async function verifyAuthenticationResponse(options) {
	const { response, expectedChallenge, expectedOrigin, expectedRPID, expectedType, credential, requireUserVerification = true, advancedFIDOConfig } = options;
	const { id, rawId, type: credentialType, response: assertionResponse } = response;
	if (!id) throw new Error("Missing credential ID");
	if (id !== rawId) throw new Error("Credential ID was not base64url-encoded");
	if (credentialType !== "public-key") throw new Error(`Unexpected credential type ${credentialType}, expected "public-key"`);
	if (!response) throw new Error("Credential missing response");
	if (typeof assertionResponse?.clientDataJSON !== "string") throw new Error("Credential response clientDataJSON was not a string");
	const clientDataJSON = decodeClientDataJSON(assertionResponse.clientDataJSON);
	const { type, origin, challenge, tokenBinding } = clientDataJSON;
	if (Array.isArray(expectedType)) {
		if (!expectedType.includes(type)) {
			const joinedExpectedType = expectedType.join(", ");
			throw new Error(`Unexpected authentication response type "${type}", expected one of: ${joinedExpectedType}`);
		}
	} else if (expectedType) {
		if (type !== expectedType) throw new Error(`Unexpected authentication response type "${type}", expected "${expectedType}"`);
	} else if (type !== "webauthn.get") throw new Error(`Unexpected authentication response type: ${type}`);
	if (typeof expectedChallenge === "function") {
		if (!await expectedChallenge(challenge)) throw new Error(`Custom challenge verifier returned false for registration response challenge "${challenge}"`);
	} else if (challenge !== expectedChallenge) throw new Error(`Unexpected authentication response challenge "${challenge}", expected "${expectedChallenge}"`);
	if (Array.isArray(expectedOrigin)) {
		if (!expectedOrigin.includes(origin)) {
			const joinedExpectedOrigin = expectedOrigin.join(", ");
			throw new Error(`Unexpected authentication response origin "${origin}", expected one of: ${joinedExpectedOrigin}`);
		}
	} else if (origin !== expectedOrigin) throw new Error(`Unexpected authentication response origin "${origin}", expected "${expectedOrigin}"`);
	if (!isBase64URL(assertionResponse.authenticatorData)) throw new Error("Credential response authenticatorData was not a base64url string");
	if (!isBase64URL(assertionResponse.signature)) throw new Error("Credential response signature was not a base64url string");
	if (assertionResponse.userHandle && typeof assertionResponse.userHandle !== "string") throw new Error("Credential response userHandle was not a string");
	if (tokenBinding) {
		if (typeof tokenBinding !== "object") throw new Error("ClientDataJSON tokenBinding was not an object");
		if ([
			"present",
			"supported",
			"notSupported"
		].indexOf(tokenBinding.status) < 0) throw new Error(`Unexpected tokenBinding status ${tokenBinding.status}`);
	}
	const authDataBuffer = toBuffer(assertionResponse.authenticatorData);
	const { rpIdHash, flags, counter, extensionsData } = parseAuthenticatorData(authDataBuffer);
	let expectedRPIDs = [];
	if (typeof expectedRPID === "string") expectedRPIDs = [expectedRPID];
	else expectedRPIDs = expectedRPID;
	const matchedRPID = await matchExpectedRPID(rpIdHash, expectedRPIDs);
	if (advancedFIDOConfig !== void 0) {
		const { userVerification: fidoUserVerification } = advancedFIDOConfig;
		/**
		* Use FIDO Conformance-defined rules for verifying UP and UV flags
		*/
		if (fidoUserVerification === "required") {
			if (!flags.uv) throw new Error("User verification required, but user could not be verified");
		} else if (fidoUserVerification === "preferred" || fidoUserVerification === "discouraged") {}
	} else {
		/**
		* Use WebAuthn spec-defined rules for verifying UP and UV flags
		*/
		if (!flags.up) throw new Error("User not present during authentication");
		if (requireUserVerification && !flags.uv) throw new Error("User verification required, but user could not be verified");
	}
	const signatureBase = concat([authDataBuffer, await toHash(toBuffer(assertionResponse.clientDataJSON))]);
	const signature = toBuffer(assertionResponse.signature);
	if ((counter > 0 || credential.counter > 0) && counter <= credential.counter) throw new Error(`Response counter value ${counter} was lower than expected ${credential.counter}`);
	const { credentialDeviceType, credentialBackedUp } = parseBackupFlags(flags);
	return {
		verified: await verifySignature({
			signature,
			data: signatureBase,
			credentialPublicKey: credential.publicKey
		}),
		authenticationInfo: {
			newCounter: counter,
			credentialID: credential.id,
			userVerified: flags.uv,
			credentialDeviceType,
			credentialBackedUp,
			authenticatorExtensionResults: extensionsData,
			origin: clientDataJSON.origin,
			rpID: matchedRPID
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+passkey@1.6.11_3e13a7ad3e345fe36220ffb1a5de39e3/node_modules/@better-auth/passkey/dist/index.mjs
function getRpID(options, baseURL) {
	return options.rpID || (baseURL ? new URL(baseURL).hostname : "localhost");
}
var resolveExtensions = async (extensions, ctx) => {
	if (!extensions) return;
	if (typeof extensions === "function") return await extensions({ ctx });
	return extensions;
};
var resolveRegistrationUser = async (opts, ctx) => {
	if (opts.registration?.requireSession ?? true) {
		const session = ctx.context?.session;
		if (!session?.user?.id) throw APIError.from("UNAUTHORIZED", PASSKEY_ERROR_CODES.SESSION_REQUIRED);
		const sessionName = session.user.email || session.user.id;
		return {
			id: session.user.id,
			name: sessionName,
			displayName: sessionName
		};
	}
	const session = await getSessionFromCtx(ctx);
	if (session?.user?.id) {
		const sessionName = session.user.email || session.user.id;
		return {
			id: session.user.id,
			name: sessionName,
			displayName: sessionName
		};
	}
	if (!opts.registration?.resolveUser) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.RESOLVE_USER_REQUIRED);
	const resolvedUser = await opts.registration.resolveUser({
		ctx,
		context: ctx.query?.context ?? null
	});
	if (!resolvedUser?.id || !resolvedUser?.name) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.RESOLVED_USER_INVALID);
	return resolvedUser;
};
var generatePasskeyQuerySchema = object({
	authenticatorAttachment: _enum(["platform", "cross-platform"]).optional(),
	name: string().optional(),
	context: string().optional()
}).optional();
var generatePasskeyRegistrationOptions = (opts, { maxAgeInSeconds }) => {
	return createAuthEndpoint("/passkey/generate-register-options", {
		method: "GET",
		use: opts.registration?.requireSession ?? true ? [freshSessionMiddleware] : [],
		query: generatePasskeyQuerySchema,
		metadata: { openapi: {
			operationId: "generatePasskeyRegistrationOptions",
			description: "Generate registration options for a new passkey",
			responses: { 200: {
				description: "Success",
				parameters: { query: {
					authenticatorAttachment: {
						description: `Type of authenticator to use for registration.
                          "platform" for device-specific authenticators,
                          "cross-platform" for authenticators that can be used across devices.`,
						required: false
					},
					name: {
						description: `Optional custom name for the passkey.
                          This can help identify the passkey when managing multiple credentials.`,
						required: false
					},
					context: {
						description: "Optional context for passkey-first registration flows.",
						required: false
					}
				} },
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						challenge: { type: "string" },
						rp: {
							type: "object",
							properties: {
								name: { type: "string" },
								id: { type: "string" }
							}
						},
						user: {
							type: "object",
							properties: {
								id: { type: "string" },
								name: { type: "string" },
								displayName: { type: "string" }
							}
						},
						pubKeyCredParams: {
							type: "array",
							items: {
								type: "object",
								properties: {
									type: { type: "string" },
									alg: { type: "number" }
								}
							}
						},
						timeout: { type: "number" },
						excludeCredentials: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									type: { type: "string" },
									transports: {
										type: "array",
										items: { type: "string" }
									}
								}
							}
						},
						authenticatorSelection: {
							type: "object",
							properties: {
								authenticatorAttachment: { type: "string" },
								requireResidentKey: { type: "boolean" },
								userVerification: { type: "string" }
							}
						},
						attestation: { type: "string" },
						extensions: { type: "object" }
					}
				} } }
			} }
		} }
	}, async (ctx) => {
		const user = await resolveRegistrationUser(opts, ctx);
		const userPasskeys = await ctx.context.adapter.findMany({
			model: "passkey",
			where: [{
				field: "userId",
				value: user.id
			}]
		});
		const registrationExtensions = await resolveExtensions(opts.registration?.extensions, ctx);
		const userID = new TextEncoder().encode(generateRandomString(32, "a-z", "0-9"));
		const baseURLString = typeof ctx.context.options.baseURL === "string" ? ctx.context.options.baseURL : void 0;
		const options = await generateRegistrationOptions({
			rpName: opts.rpName || ctx.context.appName,
			rpID: getRpID(opts, baseURLString),
			userID,
			userName: ctx.query?.name || user.name || user.id,
			userDisplayName: user.displayName || user.name || user.id,
			attestationType: "none",
			excludeCredentials: userPasskeys.map((passkey) => ({
				id: passkey.credentialID,
				transports: passkey.transports?.split(",")
			})),
			authenticatorSelection: {
				residentKey: "preferred",
				userVerification: "preferred",
				...opts.authenticatorSelection || {},
				...ctx.query?.authenticatorAttachment ? { authenticatorAttachment: ctx.query.authenticatorAttachment } : {}
			},
			extensions: registrationExtensions
		});
		const verificationToken = generateRandomString(32);
		const webAuthnCookie = ctx.context.createAuthCookie(opts.advanced.webAuthnChallengeCookie);
		await ctx.setSignedCookie(webAuthnCookie.name, verificationToken, ctx.context.secret, {
			...webAuthnCookie.attributes,
			maxAge: maxAgeInSeconds
		});
		const expirationTime = new Date(Date.now() + maxAgeInSeconds * 1e3);
		await ctx.context.internalAdapter.createVerificationValue({
			identifier: verificationToken,
			value: JSON.stringify({
				expectedChallenge: options.challenge,
				userData: {
					id: user.id,
					name: user.name,
					displayName: user.displayName
				},
				context: ctx.query?.context ?? null
			}),
			expiresAt: expirationTime
		});
		return ctx.json(options, { status: 200 });
	});
};
var generatePasskeyAuthenticationOptions = (opts, { maxAgeInSeconds }) => createAuthEndpoint("/passkey/generate-authenticate-options", {
	method: "GET",
	metadata: { openapi: {
		operationId: "passkeyGenerateAuthenticateOptions",
		description: "Generate authentication options for a passkey",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					challenge: { type: "string" },
					rp: {
						type: "object",
						properties: {
							name: { type: "string" },
							id: { type: "string" }
						}
					},
					user: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" },
							displayName: { type: "string" }
						}
					},
					timeout: { type: "number" },
					allowCredentials: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: { type: "string" },
								type: { type: "string" },
								transports: {
									type: "array",
									items: { type: "string" }
								}
							}
						}
					},
					userVerification: { type: "string" },
					authenticatorSelection: {
						type: "object",
						properties: {
							authenticatorAttachment: { type: "string" },
							requireResidentKey: { type: "boolean" },
							userVerification: { type: "string" }
						}
					},
					extensions: { type: "object" }
				}
			} } }
		} }
	} }
}, async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	let userPasskeys = [];
	if (session) userPasskeys = await ctx.context.adapter.findMany({
		model: "passkey",
		where: [{
			field: "userId",
			value: session.user.id
		}]
	});
	const baseURLString = typeof ctx.context.options.baseURL === "string" ? ctx.context.options.baseURL : void 0;
	const authenticationExtensions = await resolveExtensions(opts.authentication?.extensions, ctx);
	const options = await generateAuthenticationOptions({
		rpID: getRpID(opts, baseURLString),
		userVerification: "preferred",
		extensions: authenticationExtensions,
		...userPasskeys.length ? { allowCredentials: userPasskeys.map((passkey) => ({
			id: passkey.credentialID,
			transports: passkey.transports?.split(",")
		})) } : {}
	});
	const data = {
		expectedChallenge: options.challenge,
		userData: { id: session?.user.id || "" }
	};
	const verificationToken = generateRandomString(32);
	const webAuthnCookie = ctx.context.createAuthCookie(opts.advanced.webAuthnChallengeCookie);
	await ctx.setSignedCookie(webAuthnCookie.name, verificationToken, ctx.context.secret, {
		...webAuthnCookie.attributes,
		maxAge: maxAgeInSeconds
	});
	const expirationTime = new Date(Date.now() + maxAgeInSeconds * 1e3);
	await ctx.context.internalAdapter.createVerificationValue({
		identifier: verificationToken,
		value: JSON.stringify(data),
		expiresAt: expirationTime
	});
	return ctx.json(options, { status: 200 });
});
var verifyPasskeyRegistrationBodySchema = object({
	response: any(),
	name: string().meta({ description: "Name of the passkey" }).optional()
});
var verifyPasskeyRegistration = (options) => {
	const requireSession = options.registration?.requireSession ?? true;
	return createAuthEndpoint("/passkey/verify-registration", {
		method: "POST",
		body: verifyPasskeyRegistrationBodySchema,
		use: requireSession ? [freshSessionMiddleware] : [],
		metadata: { openapi: {
			operationId: "passkeyVerifyRegistration",
			description: "Verify registration of a new passkey",
			responses: {
				200: {
					description: "Success",
					content: { "application/json": { schema: { $ref: "#/components/schemas/Passkey" } } }
				},
				400: { description: "Bad request" }
			}
		} }
	}, async (ctx) => {
		const origin = options?.origin || ctx.headers?.get("origin") || "";
		if (!origin) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.FAILED_TO_VERIFY_REGISTRATION);
		const resp = ctx.body.response;
		const webAuthnCookie = ctx.context.createAuthCookie(options.advanced.webAuthnChallengeCookie);
		const verificationToken = await ctx.getSignedCookie(webAuthnCookie.name, ctx.context.secret);
		if (!verificationToken) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.CHALLENGE_NOT_FOUND);
		const data = await ctx.context.internalAdapter.findVerificationValue(verificationToken);
		if (!data) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.CHALLENGE_NOT_FOUND);
		const { expectedChallenge, userData, context } = JSON.parse(data.value);
		const session = requireSession ? ctx.context.session : await getSessionFromCtx(ctx);
		if (session?.user?.id && userData.id !== session.user.id) throw APIError.from("UNAUTHORIZED", PASSKEY_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY);
		try {
			const verification = await verifyRegistrationResponse({
				response: resp,
				expectedChallenge,
				expectedOrigin: origin,
				expectedRPID: getRpID(options, typeof ctx.context.options.baseURL === "string" ? ctx.context.options.baseURL : void 0),
				requireUserVerification: false
			});
			const { verified, registrationInfo } = verification;
			if (!verified || !registrationInfo) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.FAILED_TO_VERIFY_REGISTRATION);
			const { aaguid, credentialDeviceType, credentialBackedUp, credential } = registrationInfo;
			const resolvedUser = {
				id: userData.id,
				name: userData.name || userData.id,
				displayName: userData.displayName
			};
			let targetUserId = resolvedUser.id;
			if (options.registration?.afterVerification) {
				const result = await options.registration.afterVerification({
					ctx,
					verification,
					user: resolvedUser,
					clientData: resp,
					context
				});
				if (result?.userId) {
					if (typeof result.userId !== "string" || !result.userId) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.RESOLVED_USER_INVALID);
					if (session?.user?.id && result.userId !== session.user.id) throw APIError.from("UNAUTHORIZED", PASSKEY_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY);
					targetUserId = result.userId;
				}
			}
			const pubKey = base64$1.encode(credential.publicKey);
			const newPasskey = {
				name: ctx.body.name,
				userId: targetUserId,
				credentialID: credential.id,
				publicKey: pubKey,
				counter: credential.counter,
				deviceType: credentialDeviceType,
				transports: resp.response.transports.join(","),
				backedUp: credentialBackedUp,
				createdAt: /* @__PURE__ */ new Date(),
				aaguid
			};
			const newPasskeyRes = await ctx.context.adapter.create({
				model: "passkey",
				data: newPasskey
			});
			await ctx.context.internalAdapter.deleteVerificationByIdentifier(verificationToken);
			return ctx.json(newPasskeyRes, { status: 200 });
		} catch (e) {
			ctx.context.logger.error("Failed to verify registration", e);
			throw APIError.from("INTERNAL_SERVER_ERROR", PASSKEY_ERROR_CODES.FAILED_TO_VERIFY_REGISTRATION);
		}
	});
};
var verifyPasskeyAuthenticationBodySchema = object({ response: record(any(), any()) });
var verifyPasskeyAuthentication = (options) => createAuthEndpoint("/passkey/verify-authentication", {
	method: "POST",
	body: verifyPasskeyAuthenticationBodySchema,
	metadata: {
		openapi: {
			operationId: "passkeyVerifyAuthentication",
			description: "Verify authentication of a passkey",
			responses: { 200: {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						session: { $ref: "#/components/schemas/Session" },
						user: { $ref: "#/components/schemas/User" }
					}
				} } }
			} }
		},
		$Infer: { body: {} }
	}
}, async (ctx) => {
	const origin = options?.origin || ctx.headers?.get("origin") || "";
	if (!origin) throw new APIError("BAD_REQUEST", { message: "origin missing" });
	const resp = ctx.body.response;
	const webAuthnCookie = ctx.context.createAuthCookie(options.advanced.webAuthnChallengeCookie);
	const verificationToken = await ctx.getSignedCookie(webAuthnCookie.name, ctx.context.secret);
	if (!verificationToken) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.CHALLENGE_NOT_FOUND);
	const data = await ctx.context.internalAdapter.findVerificationValue(verificationToken);
	if (!data) throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.CHALLENGE_NOT_FOUND);
	const { expectedChallenge } = JSON.parse(data.value);
	const passkey = await ctx.context.adapter.findOne({
		model: "passkey",
		where: [{
			field: "credentialID",
			value: resp.id
		}]
	});
	if (!passkey) throw APIError.from("UNAUTHORIZED", PASSKEY_ERROR_CODES.PASSKEY_NOT_FOUND);
	try {
		const verification = await verifyAuthenticationResponse({
			response: resp,
			expectedChallenge,
			expectedOrigin: origin,
			expectedRPID: getRpID(options, typeof ctx.context.options.baseURL === "string" ? ctx.context.options.baseURL : void 0),
			credential: {
				id: passkey.credentialID,
				publicKey: base64$1.decode(passkey.publicKey),
				counter: passkey.counter,
				transports: passkey.transports?.split(",")
			},
			requireUserVerification: false
		});
		const { verified } = verification;
		if (!verified) throw APIError.from("UNAUTHORIZED", PASSKEY_ERROR_CODES.AUTHENTICATION_FAILED);
		if (options.authentication?.afterVerification) await options.authentication.afterVerification({
			ctx,
			verification,
			clientData: resp
		});
		await ctx.context.adapter.update({
			model: "passkey",
			where: [{
				field: "id",
				value: passkey.id
			}],
			update: { counter: verification.authenticationInfo.newCounter }
		});
		const s = await ctx.context.internalAdapter.createSession(passkey.userId);
		if (!s) throw APIError.from("INTERNAL_SERVER_ERROR", PASSKEY_ERROR_CODES.UNABLE_TO_CREATE_SESSION);
		const user = await ctx.context.internalAdapter.findUserById(passkey.userId);
		if (!user) throw new APIError("INTERNAL_SERVER_ERROR", { message: "User not found" });
		await setSessionCookie(ctx, {
			session: s,
			user
		});
		await ctx.context.internalAdapter.deleteVerificationByIdentifier(verificationToken);
		return ctx.json({
			session: s,
			user
		}, { status: 200 });
	} catch (e) {
		ctx.context.logger.error("Failed to verify authentication", e);
		throw APIError.from("BAD_REQUEST", PASSKEY_ERROR_CODES.AUTHENTICATION_FAILED);
	}
});
/**
* ### Endpoint
*
* GET `/passkey/list-user-passkeys`
*
* ### API Methods
*
* **server:**
* `auth.api.listPasskeys`
*
* **client:**
* `authClient.passkey.listUserPasskeys`
*
* @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/passkey#api-method-passkey-list-user-passkeys)
*/
var listPasskeys = createAuthEndpoint("/passkey/list-user-passkeys", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "List all passkeys for the authenticated user",
		responses: { "200": {
			description: "Passkeys retrieved successfully",
			content: { "application/json": { schema: {
				type: "array",
				items: {
					$ref: "#/components/schemas/Passkey",
					required: [
						"id",
						"userId",
						"publicKey",
						"createdAt",
						"updatedAt"
					]
				},
				description: "Array of passkey objects associated with the user"
			} } }
		} }
	} }
}, async (ctx) => {
	const passkeys = await ctx.context.adapter.findMany({
		model: "passkey",
		where: [{
			field: "userId",
			value: ctx.context.session.user.id
		}]
	});
	return ctx.json(passkeys, { status: 200 });
});
/**
* ### Endpoint
*
* POST `/passkey/delete-passkey`
*
* ### API Methods
*
* **server:**
* `auth.api.deletePasskey`
*
* **client:**
* `authClient.passkey.deletePasskey`
*
* @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/passkey#api-method-passkey-delete-passkey)
*/
var deletePasskey = createAuthEndpoint("/passkey/delete-passkey", {
	method: "POST",
	body: object({ id: string().meta({ description: "The ID of the passkey to delete. Eg: \"some-passkey-id\"" }) }),
	use: [sessionMiddleware, requireResourceOwnership({
		model: "passkey",
		idParam: "id",
		idSource: "body",
		notFoundError: PASSKEY_ERROR_CODES.PASSKEY_NOT_FOUND,
		forbiddenStatus: "UNAUTHORIZED"
	})],
	metadata: { openapi: {
		description: "Delete a specific passkey",
		responses: { "200": {
			description: "Passkey deleted successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates whether the deletion was successful"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	await ctx.context.adapter.delete({
		model: "passkey",
		where: [{
			field: "id",
			value: ctx.body.id
		}]
	});
	return ctx.json({ status: true });
});
/**
* ### Endpoint
*
* POST `/passkey/update-passkey`
*
* ### API Methods
*
* **server:**
* `auth.api.updatePasskey`
*
* **client:**
* `authClient.passkey.updatePasskey`
*
* @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/passkey#api-method-passkey-update-passkey)
*/
var updatePasskey = createAuthEndpoint("/passkey/update-passkey", {
	method: "POST",
	body: object({
		id: string().meta({ description: `The ID of the passkey which will be updated. Eg: \"passkey-id\"` }),
		name: string().meta({ description: `The new name which the passkey will be updated to. Eg: \"my-new-passkey-name\"` })
	}),
	use: [sessionMiddleware, requireResourceOwnership({
		model: "passkey",
		idParam: "id",
		idSource: "body",
		notFoundError: PASSKEY_ERROR_CODES.PASSKEY_NOT_FOUND,
		forbiddenError: PASSKEY_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY,
		forbiddenStatus: "UNAUTHORIZED"
	})],
	metadata: { openapi: {
		description: "Update a specific passkey's name",
		responses: { "200": {
			description: "Passkey updated successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: { passkey: { $ref: "#/components/schemas/Passkey" } },
				required: ["passkey"]
			} } }
		} }
	} }
}, async (ctx) => {
	const updatedPasskey = await ctx.context.adapter.update({
		model: "passkey",
		where: [{
			field: "id",
			value: ctx.body.id
		}],
		update: { name: ctx.body.name }
	});
	if (!updatedPasskey) throw APIError.from("INTERNAL_SERVER_ERROR", PASSKEY_ERROR_CODES.FAILED_TO_UPDATE_PASSKEY);
	return ctx.json({ passkey: updatedPasskey }, { status: 200 });
});
var schema = { passkey: { fields: {
	name: {
		type: "string",
		required: false
	},
	publicKey: {
		type: "string",
		required: true
	},
	userId: {
		type: "string",
		references: {
			model: "user",
			field: "id"
		},
		required: true,
		index: true
	},
	credentialID: {
		type: "string",
		required: true,
		index: true
	},
	counter: {
		type: "number",
		required: true
	},
	deviceType: {
		type: "string",
		required: true
	},
	backedUp: {
		type: "boolean",
		required: true
	},
	transports: {
		type: "string",
		required: false
	},
	createdAt: {
		type: "date",
		required: false
	},
	aaguid: {
		type: "string",
		required: false
	}
} } };
var MAX_AGE_IN_SECONDS = 300;
var passkey = (options) => {
	const opts = {
		origin: null,
		...options,
		advanced: {
			webAuthnChallengeCookie: "better-auth-passkey",
			...options?.advanced
		}
	};
	return {
		id: "passkey",
		version: PACKAGE_VERSION,
		endpoints: {
			generatePasskeyRegistrationOptions: generatePasskeyRegistrationOptions(opts, { maxAgeInSeconds: MAX_AGE_IN_SECONDS }),
			generatePasskeyAuthenticationOptions: generatePasskeyAuthenticationOptions(opts, { maxAgeInSeconds: MAX_AGE_IN_SECONDS }),
			verifyPasskeyRegistration: verifyPasskeyRegistration(opts),
			verifyPasskeyAuthentication: verifyPasskeyAuthentication(opts),
			listPasskeys,
			deletePasskey,
			updatePasskey
		},
		schema: mergeSchema(schema, options?.schema),
		$ERROR_CODES: PASSKEY_ERROR_CODES,
		options
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/bufferToBase64URLString.js
/**
* Convert the given array buffer into a Base64URL-encoded string. Ideal for converting various
* credential response ArrayBuffers to string for sending back to the server as JSON.
*
* Helper method to compliment `base64URLStringToBuffer`
*/
function bufferToBase64URLString(buffer) {
	const bytes = new Uint8Array(buffer);
	let str = "";
	for (const charCode of bytes) str += String.fromCharCode(charCode);
	return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/base64URLStringToBuffer.js
/**
* Convert from a Base64URL-encoded string to an Array Buffer. Best used when converting a
* credential ID from a JSON string to an ArrayBuffer, like in allowCredentials or
* excludeCredentials
*
* Helper method to compliment `bufferToBase64URLString`
*/
function base64URLStringToBuffer(base64URLString) {
	const base64 = base64URLString.replace(/-/g, "+").replace(/_/g, "/");
	/**
	* Pad with '=' until it's a multiple of four
	* (4 - (85 % 4 = 1) = 3) % 4 = 3 padding
	* (4 - (86 % 4 = 2) = 2) % 4 = 2 padding
	* (4 - (87 % 4 = 3) = 1) % 4 = 1 padding
	* (4 - (88 % 4 = 0) = 4) % 4 = 0 padding
	*/
	const padLength = (4 - base64.length % 4) % 4;
	const padded = base64.padEnd(base64.length + padLength, "=");
	const binary = atob(padded);
	const buffer = new ArrayBuffer(binary.length);
	const bytes = new Uint8Array(buffer);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return buffer;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/browserSupportsWebAuthn.js
/**
* Determine if the browser is capable of Webauthn
*/
function browserSupportsWebAuthn() {
	return _browserSupportsWebAuthnInternals.stubThis(globalThis?.PublicKeyCredential !== void 0 && typeof globalThis.PublicKeyCredential === "function");
}
/**
* Make it possible to stub the return value during testing
* @ignore Don't include this in docs output
*/
var _browserSupportsWebAuthnInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/toPublicKeyCredentialDescriptor.js
function toPublicKeyCredentialDescriptor(descriptor) {
	const { id } = descriptor;
	return {
		...descriptor,
		id: base64URLStringToBuffer(id),
		/**
		* `descriptor.transports` is an array of our `AuthenticatorTransportFuture` that includes newer
		* transports that TypeScript's DOM lib is ignorant of. Convince TS that our list of transports
		* are fine to pass to WebAuthn since browsers will recognize the new value.
		*/
		transports: descriptor.transports
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/isValidDomain.js
/**
* A simple test to determine if a hostname is a properly-formatted domain name
*
* A "valid domain" is defined here: https://url.spec.whatwg.org/#valid-domain
*
* Regex was originally sourced from here, then remixed to add punycode support:
* https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
*/
function isValidDomain(hostname) {
	return hostname === "localhost" || /^((xn--[a-z0-9-]+|[a-z0-9]+(-[a-z0-9]+)*)\.)+([a-z]{2,}|xn--[a-z0-9-]+)$/i.test(hostname);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/webAuthnError.js
/**
* A custom Error used to return a more nuanced error detailing _why_ one of the eight documented
* errors in the spec was raised after calling `navigator.credentials.create()` or
* `navigator.credentials.get()`:
*
* - `AbortError`
* - `ConstraintError`
* - `InvalidStateError`
* - `NotAllowedError`
* - `NotSupportedError`
* - `SecurityError`
* - `TypeError`
* - `UnknownError`
*
* Error messages were determined through investigation of the spec to determine under which
* scenarios a given error would be raised.
*/
var WebAuthnError = class extends Error {
	constructor({ message, code, cause, name }) {
		super(message, { cause });
		Object.defineProperty(this, "code", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		this.name = name ?? cause.name;
		this.code = code;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/identifyRegistrationError.js
/**
* Attempt to intuit _why_ an error was raised after calling `navigator.credentials.create()`
*/
function identifyRegistrationError({ error, options }) {
	const { publicKey } = options;
	if (!publicKey) throw Error("options was missing required publicKey property");
	if (error.name === "AbortError") {
		if (options.signal instanceof AbortSignal) return new WebAuthnError({
			message: "Registration ceremony was sent an abort signal",
			code: "ERROR_CEREMONY_ABORTED",
			cause: error
		});
	} else if (error.name === "ConstraintError") {
		if (publicKey.authenticatorSelection?.requireResidentKey === true) return new WebAuthnError({
			message: "Discoverable credentials were required but no available authenticator supported it",
			code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
			cause: error
		});
		else if (options.mediation === "conditional" && publicKey.authenticatorSelection?.userVerification === "required") return new WebAuthnError({
			message: "User verification was required during automatic registration but it could not be performed",
			code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
			cause: error
		});
		else if (publicKey.authenticatorSelection?.userVerification === "required") return new WebAuthnError({
			message: "User verification was required but no available authenticator supported it",
			code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
			cause: error
		});
	} else if (error.name === "InvalidStateError") return new WebAuthnError({
		message: "The authenticator was previously registered",
		code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
		cause: error
	});
	else if (error.name === "NotAllowedError")
 /**
	* Pass the error directly through. Platforms are overloading this error beyond what the spec
	* defines and we don't want to overwrite potentially useful error messages.
	*/
	return new WebAuthnError({
		message: error.message,
		code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
		cause: error
	});
	else if (error.name === "NotSupportedError") {
		if (publicKey.pubKeyCredParams.filter((param) => param.type === "public-key").length === 0) return new WebAuthnError({
			message: "No entry in pubKeyCredParams was of type \"public-key\"",
			code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
			cause: error
		});
		return new WebAuthnError({
			message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
			code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
			cause: error
		});
	} else if (error.name === "SecurityError") {
		const effectiveDomain = globalThis.location.hostname;
		if (!isValidDomain(effectiveDomain)) return new WebAuthnError({
			message: `${globalThis.location.hostname} is an invalid domain`,
			code: "ERROR_INVALID_DOMAIN",
			cause: error
		});
		else if (publicKey.rp.id !== effectiveDomain) return new WebAuthnError({
			message: `The RP ID "${publicKey.rp.id}" is invalid for this domain`,
			code: "ERROR_INVALID_RP_ID",
			cause: error
		});
	} else if (error.name === "TypeError") {
		if (publicKey.user.id.byteLength < 1 || publicKey.user.id.byteLength > 64) return new WebAuthnError({
			message: "User ID was not between 1 and 64 characters",
			code: "ERROR_INVALID_USER_ID_LENGTH",
			cause: error
		});
	} else if (error.name === "UnknownError") return new WebAuthnError({
		message: "The authenticator was unable to process the specified options, or could not create a new credential",
		code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
		cause: error
	});
	return error;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/webAuthnAbortService.js
var BaseWebAuthnAbortService = class {
	constructor() {
		Object.defineProperty(this, "controller", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
	}
	createNewAbortSignal() {
		if (this.controller) {
			const abortError = /* @__PURE__ */ new Error("Cancelling existing WebAuthn API call for new one");
			abortError.name = "AbortError";
			this.controller.abort(abortError);
		}
		const newController = new AbortController();
		this.controller = newController;
		return newController.signal;
	}
	cancelCeremony() {
		if (this.controller) {
			const abortError = /* @__PURE__ */ new Error("Manually cancelling existing WebAuthn API call");
			abortError.name = "AbortError";
			this.controller.abort(abortError);
			this.controller = void 0;
		}
	}
};
/**
* A service singleton to help ensure that only a single WebAuthn ceremony is active at a time.
*
* Users of **@simplewebauthn/browser** shouldn't typically need to use this, but it can help e.g.
* developers building projects that use client-side routing to better control the behavior of
* their UX in response to router navigation events.
*/
var WebAuthnAbortService = new BaseWebAuthnAbortService();
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/toAuthenticatorAttachment.js
var attachments = ["cross-platform", "platform"];
/**
* If possible coerce a `string` value into a known `AuthenticatorAttachment`
*/
function toAuthenticatorAttachment(attachment) {
	if (!attachment) return;
	if (attachments.indexOf(attachment) < 0) return;
	return attachment;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/methods/startRegistration.js
/**
* Begin authenticator "registration" via WebAuthn attestation
*
* @param optionsJSON Output from **@simplewebauthn/server**'s `generateRegistrationOptions()`
* @param useAutoRegister (Optional) Try to silently create a passkey with the password manager that the user just signed in with. Defaults to `false`.
*/
async function startRegistration(options) {
	if (!options.optionsJSON && options.challenge) {
		console.warn("startRegistration() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information.");
		options = { optionsJSON: options };
	}
	const { optionsJSON, useAutoRegister = false } = options;
	if (!browserSupportsWebAuthn()) throw new Error("WebAuthn is not supported in this browser");
	const publicKey = {
		...optionsJSON,
		challenge: base64URLStringToBuffer(optionsJSON.challenge),
		user: {
			...optionsJSON.user,
			id: base64URLStringToBuffer(optionsJSON.user.id)
		},
		excludeCredentials: optionsJSON.excludeCredentials?.map(toPublicKeyCredentialDescriptor)
	};
	const createOptions = {};
	/**
	* Try to use conditional create to register a passkey for the user with the password manager
	* the user just used to authenticate with. The user won't be shown any prominent UI by the
	* browser.
	*/
	if (useAutoRegister) createOptions.mediation = "conditional";
	createOptions.publicKey = publicKey;
	createOptions.signal = WebAuthnAbortService.createNewAbortSignal();
	let credential;
	try {
		credential = await navigator.credentials.create(createOptions);
	} catch (err) {
		throw identifyRegistrationError({
			error: err,
			options: createOptions
		});
	}
	if (!credential) throw new Error("Registration was not completed");
	const { id, rawId, response, type } = credential;
	let transports = void 0;
	if (typeof response.getTransports === "function") transports = response.getTransports();
	let responsePublicKeyAlgorithm = void 0;
	if (typeof response.getPublicKeyAlgorithm === "function") try {
		responsePublicKeyAlgorithm = response.getPublicKeyAlgorithm();
	} catch (error) {
		warnOnBrokenImplementation("getPublicKeyAlgorithm()", error);
	}
	let responsePublicKey = void 0;
	if (typeof response.getPublicKey === "function") try {
		const _publicKey = response.getPublicKey();
		if (_publicKey !== null) responsePublicKey = bufferToBase64URLString(_publicKey);
	} catch (error) {
		warnOnBrokenImplementation("getPublicKey()", error);
	}
	let responseAuthenticatorData;
	if (typeof response.getAuthenticatorData === "function") try {
		responseAuthenticatorData = bufferToBase64URLString(response.getAuthenticatorData());
	} catch (error) {
		warnOnBrokenImplementation("getAuthenticatorData()", error);
	}
	return {
		id,
		rawId: bufferToBase64URLString(rawId),
		response: {
			attestationObject: bufferToBase64URLString(response.attestationObject),
			clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
			transports,
			publicKeyAlgorithm: responsePublicKeyAlgorithm,
			publicKey: responsePublicKey,
			authenticatorData: responseAuthenticatorData
		},
		type,
		clientExtensionResults: credential.getClientExtensionResults(),
		authenticatorAttachment: toAuthenticatorAttachment(credential.authenticatorAttachment)
	};
}
/**
* Visibly warn when we detect an issue related to a passkey provider intercepting WebAuthn API
* calls
*/
function warnOnBrokenImplementation(methodName, cause) {
	console.warn(`The browser extension that intercepted this WebAuthn API call incorrectly implemented ${methodName}. You should report this error to them.\n`, cause);
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/browserSupportsWebAuthnAutofill.js
/**
* Determine if the browser supports conditional UI, so that WebAuthn credentials can
* be shown to the user in the browser's typical password autofill popup.
*/
function browserSupportsWebAuthnAutofill() {
	if (!browserSupportsWebAuthn()) return _browserSupportsWebAuthnAutofillInternals.stubThis(new Promise((resolve) => resolve(false)));
	/**
	* I don't like the `as unknown` here but there's a `declare var PublicKeyCredential` in
	* TS' DOM lib that's making it difficult for me to just go `as PublicKeyCredentialFuture` as I
	* want. I think I'm fine with this for now since it's _supposed_ to be temporary, until TS types
	* have a chance to catch up.
	*/
	const globalPublicKeyCredential = globalThis.PublicKeyCredential;
	if (globalPublicKeyCredential?.isConditionalMediationAvailable === void 0) return _browserSupportsWebAuthnAutofillInternals.stubThis(new Promise((resolve) => resolve(false)));
	return _browserSupportsWebAuthnAutofillInternals.stubThis(globalPublicKeyCredential.isConditionalMediationAvailable());
}
var _browserSupportsWebAuthnAutofillInternals = { stubThis: (value) => value };
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/helpers/identifyAuthenticationError.js
/**
* Attempt to intuit _why_ an error was raised after calling `navigator.credentials.get()`
*/
function identifyAuthenticationError({ error, options }) {
	const { publicKey } = options;
	if (!publicKey) throw Error("options was missing required publicKey property");
	if (error.name === "AbortError") {
		if (options.signal instanceof AbortSignal) return new WebAuthnError({
			message: "Authentication ceremony was sent an abort signal",
			code: "ERROR_CEREMONY_ABORTED",
			cause: error
		});
	} else if (error.name === "NotAllowedError")
 /**
	* Pass the error directly through. Platforms are overloading this error beyond what the spec
	* defines and we don't want to overwrite potentially useful error messages.
	*/
	return new WebAuthnError({
		message: error.message,
		code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
		cause: error
	});
	else if (error.name === "SecurityError") {
		const effectiveDomain = globalThis.location.hostname;
		if (!isValidDomain(effectiveDomain)) return new WebAuthnError({
			message: `${globalThis.location.hostname} is an invalid domain`,
			code: "ERROR_INVALID_DOMAIN",
			cause: error
		});
		else if (publicKey.rpId !== effectiveDomain) return new WebAuthnError({
			message: `The RP ID "${publicKey.rpId}" is invalid for this domain`,
			code: "ERROR_INVALID_RP_ID",
			cause: error
		});
	} else if (error.name === "UnknownError") return new WebAuthnError({
		message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
		code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
		cause: error
	});
	return error;
}
//#endregion
//#region ../../node_modules/.pnpm/@simplewebauthn+browser@13.3.0/node_modules/@simplewebauthn/browser/esm/methods/startAuthentication.js
/**
* Begin authenticator "login" via WebAuthn assertion
*
* @param optionsJSON Output from **@simplewebauthn/server**'s `generateAuthenticationOptions()`
* @param useBrowserAutofill (Optional) Initialize conditional UI to enable logging in via browser autofill prompts. Defaults to `false`.
* @param verifyBrowserAutofillInput (Optional) Ensure a suitable `<input>` element is present when `useBrowserAutofill` is `true`. Defaults to `true`.
*/
async function startAuthentication(options) {
	if (!options.optionsJSON && options.challenge) {
		console.warn("startAuthentication() was not called correctly. It will try to continue with the provided options, but this call should be refactored to use the expected call structure instead. See https://simplewebauthn.dev/docs/packages/browser#typeerror-cannot-read-properties-of-undefined-reading-challenge for more information.");
		options = { optionsJSON: options };
	}
	const { optionsJSON, useBrowserAutofill = false, verifyBrowserAutofillInput = true } = options;
	if (!browserSupportsWebAuthn()) throw new Error("WebAuthn is not supported in this browser");
	let allowCredentials;
	if (optionsJSON.allowCredentials?.length !== 0) allowCredentials = optionsJSON.allowCredentials?.map(toPublicKeyCredentialDescriptor);
	const publicKey = {
		...optionsJSON,
		challenge: base64URLStringToBuffer(optionsJSON.challenge),
		allowCredentials
	};
	const getOptions = {};
	/**
	* Set up the page to prompt the user to select a credential for authentication via the browser's
	* input autofill mechanism.
	*/
	if (useBrowserAutofill) {
		if (!await browserSupportsWebAuthnAutofill()) throw Error("Browser does not support WebAuthn autofill");
		if (document.querySelectorAll("input[autocomplete$='webauthn']").length < 1 && verifyBrowserAutofillInput) throw Error("No <input> with \"webauthn\" as the only or last value in its `autocomplete` attribute was detected");
		getOptions.mediation = "conditional";
		publicKey.allowCredentials = [];
	}
	getOptions.publicKey = publicKey;
	getOptions.signal = WebAuthnAbortService.createNewAbortSignal();
	let credential;
	try {
		credential = await navigator.credentials.get(getOptions);
	} catch (err) {
		throw identifyAuthenticationError({
			error: err,
			options: getOptions
		});
	}
	if (!credential) throw new Error("Authentication was not completed");
	const { id, rawId, response, type } = credential;
	let userHandle = void 0;
	if (response.userHandle) userHandle = bufferToBase64URLString(response.userHandle);
	return {
		id,
		rawId: bufferToBase64URLString(rawId),
		response: {
			authenticatorData: bufferToBase64URLString(response.authenticatorData),
			clientDataJSON: bufferToBase64URLString(response.clientDataJSON),
			signature: bufferToBase64URLString(response.signature),
			userHandle
		},
		type,
		clientExtensionResults: credential.getClientExtensionResults(),
		authenticatorAttachment: toAuthenticatorAttachment(credential.authenticatorAttachment)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+passkey@1.6.11_3e13a7ad3e345fe36220ffb1a5de39e3/node_modules/@better-auth/passkey/dist/client.mjs
var getPasskeyActions = ($fetch, { $listPasskeys, $store }) => {
	const signInPasskey = async (opts, options) => {
		const response = await $fetch("/passkey/generate-authenticate-options", {
			method: "GET",
			throw: false
		});
		if (!response.data) return response;
		const mergedExtensions = response.data.extensions || opts?.extensions ? {
			...response.data.extensions || {},
			...opts?.extensions || {}
		} : void 0;
		let res;
		try {
			res = await startAuthentication({
				optionsJSON: {
					...response.data,
					extensions: mergedExtensions
				},
				useBrowserAutofill: opts?.autoFill
			});
		} catch (err) {
			return {
				data: null,
				error: {
					code: err instanceof WebAuthnError ? err.code : "AUTH_CANCELLED",
					message: PASSKEY_ERROR_CODES.AUTH_CANCELLED.message,
					status: 400,
					statusText: "BAD_REQUEST"
				}
			};
		}
		try {
			const { clientExtensionResults, ...responseBody } = res;
			const verified = await $fetch("/passkey/verify-authentication", {
				body: { response: responseBody },
				...opts?.fetchOptions,
				...options,
				method: "POST",
				throw: false
			});
			$listPasskeys.set(Math.random());
			$store.notify("$sessionSignal");
			if (opts?.returnWebAuthnResponse) return {
				...verified,
				webauthn: {
					response: res,
					clientExtensionResults
				}
			};
			return verified;
		} catch (err) {
			console.error(`[Better Auth] Error verifying passkey`, err);
			return {
				data: null,
				error: {
					code: "AUTH_CANCELLED",
					message: PASSKEY_ERROR_CODES.AUTH_CANCELLED.message,
					status: 400,
					statusText: "BAD_REQUEST"
				}
			};
		}
	};
	const registerPasskey = async (opts, fetchOpts) => {
		const options = await $fetch("/passkey/generate-register-options", {
			method: "GET",
			query: {
				...opts?.authenticatorAttachment && { authenticatorAttachment: opts.authenticatorAttachment },
				...opts?.name && { name: opts.name },
				...opts?.context && { context: opts.context }
			},
			throw: false
		});
		if (!options.data) return options;
		try {
			const mergedExtensions = options.data.extensions || opts?.extensions ? {
				...options.data.extensions || {},
				...opts?.extensions || {}
			} : void 0;
			const res = await startRegistration({
				optionsJSON: {
					...options.data,
					extensions: mergedExtensions
				},
				useAutoRegister: opts?.useAutoRegister
			});
			const { clientExtensionResults, ...responseBody } = res;
			const verified = await $fetch("/passkey/verify-registration", {
				...opts?.fetchOptions,
				...fetchOpts,
				body: {
					response: responseBody,
					name: opts?.name
				},
				method: "POST",
				throw: false
			});
			if (!verified.data) return verified;
			$listPasskeys.set(Math.random());
			if (opts?.returnWebAuthnResponse) return {
				...verified,
				webauthn: {
					response: res,
					clientExtensionResults
				}
			};
			return verified;
		} catch (e) {
			if (e instanceof WebAuthnError) {
				if (e.code === "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED") return {
					data: null,
					error: {
						code: e.code,
						message: PASSKEY_ERROR_CODES.PREVIOUSLY_REGISTERED.message,
						status: 400,
						statusText: "BAD_REQUEST"
					}
				};
				if (e.code === "ERROR_CEREMONY_ABORTED") return {
					data: null,
					error: {
						code: e.code,
						message: PASSKEY_ERROR_CODES.REGISTRATION_CANCELLED.message,
						status: 400,
						statusText: "BAD_REQUEST"
					}
				};
				return {
					data: null,
					error: {
						code: e.code,
						message: e.message,
						status: 400,
						statusText: "BAD_REQUEST"
					}
				};
			}
			return {
				data: null,
				error: {
					code: "UNKNOWN_ERROR",
					message: e instanceof Error ? e.message : PASSKEY_ERROR_CODES.UNKNOWN_ERROR.message,
					status: 500,
					statusText: "INTERNAL_SERVER_ERROR"
				}
			};
		}
	};
	return {
		signIn: { passkey: signInPasskey },
		passkey: { addPasskey: registerPasskey },
		$Infer: {}
	};
};
var passkeyClient = () => {
	const $listPasskeys = /* @__PURE__ */ atom();
	return {
		id: "passkey",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {},
		getActions: ($fetch, $store) => getPasskeyActions($fetch, {
			$listPasskeys,
			$store
		}),
		getAtoms($fetch) {
			return {
				listPasskeys: useAuthQuery($listPasskeys, "/passkey/list-user-passkeys", $fetch, { method: "GET" }),
				$listPasskeys
			};
		},
		pathMethods: {
			"/passkey/register": "POST",
			"/passkey/authenticate": "POST"
		},
		atomListeners: [{
			matcher(path) {
				return path === "/passkey/verify-registration" || path === "/passkey/delete-passkey" || path === "/passkey/update-passkey" || path === "/sign-out";
			},
			signal: "$listPasskeys"
		}, {
			matcher: (path) => path === "/passkey/verify-authentication",
			signal: "$sessionSignal"
		}],
		$ERROR_CODES: PASSKEY_ERROR_CODES
	};
};
//#endregion
export { passkey as n, passkeyClient as t };
