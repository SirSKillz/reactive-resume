import { o as __toESM, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { $ as nullProcessor, $i as omit, $n as _uuidv4, $r as $ZodNever, $t as _int32, A as safeParse, Ai as $ZodXID, An as _positive, Ar as $ZodE164, At as _cidrv4, B as customProcessor, Bn as _superRefine, Br as $ZodISODate, Bt as _date, C as encodeAsync, Ci as $ZodULID, Cn as _never, Cr as $ZodCatch, D as safeDecodeAsync, Di as $ZodUnion, Dn as _null$1, Dr as $ZodDate, Dt as _base64url, E as safeDecode, Ei as $ZodUndefined, En as _normalize, Er as $ZodCustomStringFormat, Et as _base64, F as anyProcessor, Fi as hostname$1, Fn as _slugify, Fr as $ZodFile, G as functionProcessor, Gn as _uint32, Gr as $ZodJWT, Gt as _file, H as defaultProcessor, Hn as _toLowerCase, Hr as $ZodISODuration, Ht as _email, I as arrayProcessor, Ii as httpProtocol, In as _startsWith, Ir as $ZodFunction, J as literalProcessor, Ji as extend, Jn as _undefined$1, Jr as $ZodLiteral, Jt as _gt, K as intersectionProcessor, Ki as clone, Kn as _uint64, Kr as $ZodKSUID, Kt as _float32, L as bigintProcessor, Li as regexes_exports, Ln as _string, Lr as $ZodGUID, Lt as _cuid, Mi as $ZodCheck, Mn as _refine, Mr as $ZodEmoji, Ni as domain, Nn as _regex, Nr as $ZodEnum, O as safeEncode, Oi as $ZodUnknown, On as _number, Or as $ZodDefault, Ot as _bigint, Pi as hex$1, Pn as _size, Pr as $ZodExactOptional, Q as nonoptionalProcessor, Qi as normalizeParams, Qn as _uuid, Qr as $ZodNanoID, Qt as _int, R as booleanProcessor, Rn as _stringFormat, Rr as $ZodIPv4, Rt as _cuid2, S as encode, Si as $ZodType, Sn as _negative, Sr as $ZodCUID2, St as createToJSONSchemaMethod, T as parseAsync, Ti as $ZodUUID, Tn as _nonpositive, Tr as $ZodCustom, Tt as _array, U as enumProcessor, Un as _toUpperCase, Ur as $ZodISOTime, Ut as _emoji, V as dateProcessor, Vn as _symbol, Vr as $ZodISODateTime, Vt as _e164, W as fileProcessor, Wn as _trim, Wr as $ZodIntersection, Wt as _endsWith, X as nanProcessor, Xi as merge, Xn as _uppercase, Xr as $ZodMap, Xt as _guid, Y as mapProcessor, Yi as issue, Yn as _unknown, Yr as $ZodMAC, Yt as _gte, Z as neverProcessor, Zi as mergeDefs, Zn as _url, Zr as $ZodNaN, Zt as _includes, _ as zodSchema, _i as $ZodSuccess, _n as _minLength, _r as $ZodBigIntFormat, _t as undefinedProcessor, a as generateId, an as _isoDuration, ar as meta$1, at as prefaultProcessor, b as decode, bi as $ZodTransform, bn as _nan, br as $ZodCIDRv6, bt as voidProcessor, c as normalizeHeaders, ca as $constructor, ci as $ZodPipe, cn as _ksuid, cr as globalRegistry, ct as recordProcessor, d as resolve, di as $ZodPromise, dn as _lt, dt as successProcessor, ea as partial, ei as $ZodNonOptional, en as _int64, er as _uuidv6, et as nullableProcessor, f as safeParseJSON, fi as $ZodReadonly, fn as _lte, fr as $ZodAny, ft as symbolProcessor, gi as $ZodStringFormat, gn as _mime, gr as $ZodBigInt, gt as tupleProcessor, h as validateTypes, hi as $ZodString, hn as _maxSize, hr as $ZodBase64URL, ht as transformProcessor, i as createIdGenerator, ia as shallowClone, ii as $ZodNumberFormat, in as _isoDateTime, ir as describe$1, it as pipeProcessor, j as safeParseAsync, ji as $ZodXor, jn as _property, jr as $ZodEmail, jt as _cidrv6, k as safeEncodeAsync, ki as $ZodVoid, kn as _overwrite, kr as $ZodDiscriminatedUnion, kt as _boolean, l as parseJsonEventStream, li as $ZodPrefault, ln as _length, lt as setProcessor, mi as $ZodSet, mn as _maxLength, mr as $ZodBase64, na as required, ni as $ZodNullable, nn as _ipv6, nr as _void$1, nt as objectProcessor, oa as $ZodEncodeError, oi as $ZodObjectJIT, on as _isoTime, ot as promiseProcessor, p as safeValidateTypes, pi as $ZodRecord, pn as _mac, pr as $ZodArray, pt as templateLiteralProcessor, q as lazyProcessor, qi as defineLazy, qn as _ulid, qr as $ZodLazy, qt as _float64, r as asSchema, ra as safeExtend, ri as $ZodNumber, rn as _isoDate, rr as _xid, rt as optionalProcessor, s as lazySchema, si as $ZodOptional, sn as _jwt, st as readonlyProcessor, ta as pick, ti as $ZodNull, tn as _ipv4, tr as _uuidv7, tt as numberProcessor, ui as $ZodPreprocess, un as _lowercase, ut as stringProcessor, vi as $ZodSymbol, vn as _minSize, vr as $ZodBoolean, vt as unionProcessor, w as parse, wi as $ZodURL, wn as _nonnegative, wr as $ZodCodec, wt as _any, x as decodeAsync, xi as $ZodTuple, xn as _nanoid, xr as $ZodCUID, xt as createStandardJSONSchemaMethod, yi as $ZodTemplateLiteral, yn as _multipleOf, yr as $ZodCIDRv4, yt as unknownProcessor, z as catchProcessor, zn as _stringbool, zr as $ZodIPv6, zt as _custom } from "./provider-utils+[...].mjs";
import { i as TypeValidationError, t as AISDKError } from "../ai-sdk__provider.mjs";
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/checks.js
var checks_exports = /* @__PURE__ */ __exportAll({
	endsWith: () => _endsWith,
	gt: () => _gt,
	gte: () => _gte,
	includes: () => _includes,
	length: () => _length,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	negative: () => _negative,
	nonnegative: () => _nonnegative,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	overwrite: () => _overwrite,
	positive: () => _positive,
	property: () => _property,
	regex: () => _regex,
	size: () => _size,
	slugify: () => _slugify,
	startsWith: () => _startsWith,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	trim: () => _trim,
	uppercase: () => _uppercase
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
var iso_exports = /* @__PURE__ */ __exportAll({
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	date: () => date$1,
	datetime: () => datetime,
	duration: () => duration,
	time: () => time
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date$1(params) {
	return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return _isoDuration(ZodISODuration, params);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
var schemas_exports = /* @__PURE__ */ __exportAll({
	ZodAny: () => ZodAny,
	ZodArray: () => ZodArray,
	ZodBase64: () => ZodBase64,
	ZodBase64URL: () => ZodBase64URL,
	ZodBigInt: () => ZodBigInt,
	ZodBigIntFormat: () => ZodBigIntFormat,
	ZodBoolean: () => ZodBoolean,
	ZodCIDRv4: () => ZodCIDRv4,
	ZodCIDRv6: () => ZodCIDRv6,
	ZodCUID: () => ZodCUID,
	ZodCUID2: () => ZodCUID2,
	ZodCatch: () => ZodCatch,
	ZodCodec: () => ZodCodec,
	ZodCustom: () => ZodCustom,
	ZodCustomStringFormat: () => ZodCustomStringFormat,
	ZodDate: () => ZodDate,
	ZodDefault: () => ZodDefault,
	ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
	ZodE164: () => ZodE164,
	ZodEmail: () => ZodEmail,
	ZodEmoji: () => ZodEmoji,
	ZodEnum: () => ZodEnum,
	ZodExactOptional: () => ZodExactOptional,
	ZodFile: () => ZodFile,
	ZodFunction: () => ZodFunction,
	ZodGUID: () => ZodGUID,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodIntersection: () => ZodIntersection,
	ZodJWT: () => ZodJWT,
	ZodKSUID: () => ZodKSUID,
	ZodLazy: () => ZodLazy,
	ZodLiteral: () => ZodLiteral,
	ZodMAC: () => ZodMAC,
	ZodMap: () => ZodMap,
	ZodNaN: () => ZodNaN,
	ZodNanoID: () => ZodNanoID,
	ZodNever: () => ZodNever,
	ZodNonOptional: () => ZodNonOptional,
	ZodNull: () => ZodNull,
	ZodNullable: () => ZodNullable,
	ZodNumber: () => ZodNumber,
	ZodNumberFormat: () => ZodNumberFormat,
	ZodObject: () => ZodObject,
	ZodOptional: () => ZodOptional,
	ZodPipe: () => ZodPipe,
	ZodPrefault: () => ZodPrefault,
	ZodPreprocess: () => ZodPreprocess,
	ZodPromise: () => ZodPromise,
	ZodReadonly: () => ZodReadonly,
	ZodRecord: () => ZodRecord,
	ZodSet: () => ZodSet,
	ZodString: () => ZodString,
	ZodStringFormat: () => ZodStringFormat,
	ZodSuccess: () => ZodSuccess,
	ZodSymbol: () => ZodSymbol,
	ZodTemplateLiteral: () => ZodTemplateLiteral,
	ZodTransform: () => ZodTransform,
	ZodTuple: () => ZodTuple,
	ZodType: () => ZodType,
	ZodULID: () => ZodULID,
	ZodURL: () => ZodURL,
	ZodUUID: () => ZodUUID,
	ZodUndefined: () => ZodUndefined,
	ZodUnion: () => ZodUnion,
	ZodUnknown: () => ZodUnknown,
	ZodVoid: () => ZodVoid,
	ZodXID: () => ZodXID,
	ZodXor: () => ZodXor,
	_ZodString: () => _ZodString,
	_default: () => _default,
	_function: () => _function,
	any: () => any,
	array: () => array$1,
	base64: () => base64,
	base64url: () => base64url,
	bigint: () => bigint,
	boolean: () => boolean,
	catch: () => _catch,
	check: () => check,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	codec: () => codec,
	cuid: () => cuid,
	cuid2: () => cuid2,
	custom: () => custom,
	date: () => date,
	describe: () => describe,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	enum: () => _enum,
	exactOptional: () => exactOptional,
	file: () => file,
	float32: () => float32,
	float64: () => float64,
	function: () => _function,
	guid: () => guid,
	hash: () => hash,
	hex: () => hex,
	hostname: () => hostname,
	httpUrl: () => httpUrl,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	invertCodec: () => invertCodec,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	json: () => json$1,
	jwt: () => jwt,
	keyof: () => keyof,
	ksuid: () => ksuid,
	lazy: () => lazy,
	literal: () => literal,
	looseObject: () => looseObject,
	looseRecord: () => looseRecord,
	mac: () => mac,
	map: () => map,
	meta: () => meta,
	nan: () => nan,
	nanoid: () => nanoid,
	nativeEnum: () => nativeEnum,
	never: () => never,
	nonoptional: () => nonoptional,
	null: () => _null,
	nullable: () => nullable,
	nullish: () => nullish,
	number: () => number,
	object: () => object$1,
	optional: () => optional,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	prefault: () => prefault,
	preprocess: () => preprocess,
	promise: () => promise,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	set: () => set,
	strictObject: () => strictObject,
	string: () => string,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol$1,
	templateLiteral: () => templateLiteral,
	transform: () => transform,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid,
	undefined: () => _undefined,
	union: () => union,
	unknown: () => unknown,
	url: () => url,
	uuid: () => uuid,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	void: () => _void,
	xid: () => xid,
	xor: () => xor
});
var _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
	const proto = Object.getPrototypeOf(inst);
	let installed = _installedGroups.get(proto);
	if (!installed) {
		installed = /* @__PURE__ */ new Set();
		_installedGroups.set(proto, installed);
	}
	if (installed.has(group)) return;
	installed.add(group);
	for (const key in methods) {
		const fn = methods[key];
		Object.defineProperty(proto, key, {
			configurable: true,
			enumerable: false,
			get() {
				const bound = fn.bind(this);
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: bound
				});
				return bound;
			},
			set(v) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: v
				});
			}
		});
	}
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], { jsonSchema: {
		input: createStandardJSONSchemaMethod(inst, "input"),
		output: createStandardJSONSchemaMethod(inst, "output")
	} });
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	_installLazyMethods(inst, "ZodType", {
		check(...chks) {
			const def = this.def;
			return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)] }), { parent: true });
		},
		with(...chks) {
			return this.check(...chks);
		},
		clone(def, params) {
			return clone(this, def, params);
		},
		brand() {
			return this;
		},
		register(reg, meta) {
			reg.add(this, meta);
			return this;
		},
		refine(check, params) {
			return this.check(refine(check, params));
		},
		superRefine(refinement, params) {
			return this.check(superRefine(refinement, params));
		},
		overwrite(fn) {
			return this.check(_overwrite(fn));
		},
		optional() {
			return optional(this);
		},
		exactOptional() {
			return exactOptional(this);
		},
		nullable() {
			return nullable(this);
		},
		nullish() {
			return optional(nullable(this));
		},
		nonoptional(params) {
			return nonoptional(this, params);
		},
		array() {
			return array$1(this);
		},
		or(arg) {
			return union([this, arg]);
		},
		and(arg) {
			return intersection(this, arg);
		},
		transform(tx) {
			return pipe(this, transform(tx));
		},
		default(d) {
			return _default(this, d);
		},
		prefault(d) {
			return prefault(this, d);
		},
		catch(params) {
			return _catch(this, params);
		},
		pipe(target) {
			return pipe(this, target);
		},
		readonly() {
			return readonly(this);
		},
		describe(description) {
			const cl = this.clone();
			globalRegistry.add(cl, { description });
			return cl;
		},
		meta(...args) {
			if (args.length === 0) return globalRegistry.get(this);
			const cl = this.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(fn) {
			return fn(this);
		}
	});
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	return inst;
});
/** @internal */
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	_installLazyMethods(inst, "_ZodString", {
		regex(...args) {
			return this.check(_regex(...args));
		},
		includes(...args) {
			return this.check(_includes(...args));
		},
		startsWith(...args) {
			return this.check(_startsWith(...args));
		},
		endsWith(...args) {
			return this.check(_endsWith(...args));
		},
		min(...args) {
			return this.check(_minLength(...args));
		},
		max(...args) {
			return this.check(_maxLength(...args));
		},
		length(...args) {
			return this.check(_length(...args));
		},
		nonempty(...args) {
			return this.check(_minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(_lowercase(params));
		},
		uppercase(params) {
			return this.check(_uppercase(params));
		},
		trim() {
			return this.check(_trim());
		},
		normalize(...args) {
			return this.check(_normalize(...args));
		},
		toLowerCase() {
			return this.check(_toLowerCase());
		},
		toUpperCase() {
			return this.check(_toUpperCase());
		},
		slugify() {
			return this.check(_slugify());
		}
	});
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(_email(ZodEmail, params));
	inst.url = (params) => inst.check(_url(ZodURL, params));
	inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(_emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(_xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(_e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date$1(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function email(params) {
	return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function guid(params) {
	return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function uuid(params) {
	return _uuid(ZodUUID, params);
}
function uuidv4(params) {
	return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
	return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
	return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function url(params) {
	return _url(ZodURL, params);
}
function httpUrl(params) {
	return _url(ZodURL, {
		protocol: httpProtocol,
		hostname: domain,
		...normalizeParams(params)
	});
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function emoji(params) {
	return _emoji(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function nanoid(params) {
	return _nanoid(ZodNanoID, params);
}
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
/**
* Validates a CUID v1 string.
*
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
* See https://github.com/paralleldrive/cuid.
*/
function cuid(params) {
	return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cuid2(params) {
	return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ulid(params) {
	return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function xid(params) {
	return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ksuid(params) {
	return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ipv4(params) {
	return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
	$ZodMAC.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function mac(params) {
	return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ipv6(params) {
	return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
	return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
	return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function base64(params) {
	return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function base64url(params) {
	return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function e164(params) {
	return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function jwt(params) {
	return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
	$ZodCustomStringFormat.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
	return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
	return _stringFormat(ZodCustomStringFormat, "hostname", hostname$1, _params);
}
function hex(_params) {
	return _stringFormat(ZodCustomStringFormat, "hex", hex$1, _params);
}
function hash(alg, params) {
	const format = `${alg}_${params?.enc ?? "hex"}`;
	const regex = regexes_exports[format];
	if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
	return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	_installLazyMethods(inst, "ZodNumber", {
		gt(value, params) {
			return this.check(_gt(value, params));
		},
		gte(value, params) {
			return this.check(_gte(value, params));
		},
		min(value, params) {
			return this.check(_gte(value, params));
		},
		lt(value, params) {
			return this.check(_lt(value, params));
		},
		lte(value, params) {
			return this.check(_lte(value, params));
		},
		max(value, params) {
			return this.check(_lte(value, params));
		},
		int(params) {
			return this.check(int(params));
		},
		safe(params) {
			return this.check(int(params));
		},
		positive(params) {
			return this.check(_gt(0, params));
		},
		nonnegative(params) {
			return this.check(_gte(0, params));
		},
		negative(params) {
			return this.check(_lt(0, params));
		},
		nonpositive(params) {
			return this.check(_lte(0, params));
		},
		multipleOf(value, params) {
			return this.check(_multipleOf(value, params));
		},
		step(value, params) {
			return this.check(_multipleOf(value, params));
		},
		finite() {
			return this;
		}
	});
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number(params) {
	return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return _int(ZodNumberFormat, params);
}
function float32(params) {
	return _float32(ZodNumberFormat, params);
}
function float64(params) {
	return _float64(ZodNumberFormat, params);
}
function int32(params) {
	return _int32(ZodNumberFormat, params);
}
function uint32(params) {
	return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
	$ZodBigInt.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => bigintProcessor(inst, ctx, json, params);
	inst.gte = (value, params) => inst.check(_gte(value, params));
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.gt = (value, params) => inst.check(_gt(value, params));
	inst.gte = (value, params) => inst.check(_gte(value, params));
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.lt = (value, params) => inst.check(_lt(value, params));
	inst.lte = (value, params) => inst.check(_lte(value, params));
	inst.max = (value, params) => inst.check(_lte(value, params));
	inst.positive = (params) => inst.check(_gt(BigInt(0), params));
	inst.negative = (params) => inst.check(_lt(BigInt(0), params));
	inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
	inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
	inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
	const bag = inst._zod.bag;
	inst.minValue = bag.minimum ?? null;
	inst.maxValue = bag.maximum ?? null;
	inst.format = bag.format ?? null;
});
function bigint(params) {
	return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
	$ZodBigIntFormat.init(inst, def);
	ZodBigInt.init(inst, def);
});
function int64(params) {
	return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
	return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
	$ZodSymbol.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => symbolProcessor(inst, ctx, json, params);
});
function symbol$1(params) {
	return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
	$ZodUndefined.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
});
function _undefined(params) {
	return _undefined$1(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
	$ZodNull.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null(params) {
	return _null$1(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
	$ZodAny.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => anyProcessor(inst, ctx, json, params);
});
function any() {
	return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
	return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
	$ZodVoid.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
});
function _void(params) {
	return _void$1(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
	$ZodDate.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => dateProcessor(inst, ctx, json, params);
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.max = (value, params) => inst.check(_lte(value, params));
	const c = inst._zod.bag;
	inst.minDate = c.minimum ? new Date(c.minimum) : null;
	inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
	return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	_installLazyMethods(inst, "ZodArray", {
		min(n, params) {
			return this.check(_minLength(n, params));
		},
		nonempty(params) {
			return this.check(_minLength(1, params));
		},
		max(n, params) {
			return this.check(_maxLength(n, params));
		},
		length(n, params) {
			return this.check(_length(n, params));
		},
		unwrap() {
			return this.element;
		}
	});
});
function array$1(element, params) {
	return _array(ZodArray, element, params);
}
function keyof(schema) {
	const shape = schema._zod.def.shape;
	return _enum(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	_installLazyMethods(inst, "ZodObject", {
		keyof() {
			return _enum(Object.keys(this._zod.def.shape));
		},
		catchall(catchall) {
			return this.clone({
				...this._zod.def,
				catchall
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: never()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(incoming) {
			return extend(this, incoming);
		},
		safeExtend(incoming) {
			return safeExtend(this, incoming);
		},
		merge(other) {
			return merge(this, other);
		},
		pick(mask) {
			return pick(this, mask);
		},
		omit(mask) {
			return omit(this, mask);
		},
		partial(...args) {
			return partial(ZodOptional, this, args[0]);
		},
		required(...args) {
			return required(ZodNonOptional, this, args[0]);
		}
	});
});
function object$1(shape, params) {
	return new ZodObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
function strictObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: never(),
		...normalizeParams(params)
	});
}
function looseObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: unknown(),
		...normalizeParams(params)
	});
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodXor.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
/** Creates an exclusive union (XOR) where exactly one option must match.
* Unlike regular unions that succeed when any option matches, xor fails if
* zero or more than one option matches the input. */
function xor(options, params) {
	return new ZodXor({
		type: "union",
		options,
		inclusive: false,
		...normalizeParams(params)
	});
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
	$ZodTuple.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => tupleProcessor(inst, ctx, json, params);
	inst.rest = (rest) => inst.clone({
		...inst._zod.def,
		rest
	});
});
function tuple(items, _paramsOrRest, _params) {
	const hasRest = _paramsOrRest instanceof $ZodType;
	return new ZodTuple({
		type: "tuple",
		items,
		rest: hasRest ? _paramsOrRest : null,
		...normalizeParams(hasRest ? _params : _paramsOrRest)
	});
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	if (!valueType || !valueType._zod) return new ZodRecord({
		type: "record",
		keyType: string(),
		valueType: keyType,
		...normalizeParams(valueType)
	});
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
function partialRecord(keyType, valueType, params) {
	const k = clone(keyType);
	k._zod.values = void 0;
	return new ZodRecord({
		type: "record",
		keyType: k,
		valueType,
		...normalizeParams(params)
	});
}
function looseRecord(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		mode: "loose",
		...normalizeParams(params)
	});
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
	$ZodMap.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => mapProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
	inst.min = (...args) => inst.check(_minSize(...args));
	inst.nonempty = (params) => inst.check(_minSize(1, params));
	inst.max = (...args) => inst.check(_maxSize(...args));
	inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
	return new ZodMap({
		type: "map",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
	$ZodSet.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => setProcessor(inst, ctx, json, params);
	inst.min = (...args) => inst.check(_minSize(...args));
	inst.nonempty = (params) => inst.check(_minSize(1, params));
	inst.max = (...args) => inst.check(_maxSize(...args));
	inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
	return new ZodSet({
		type: "set",
		valueType,
		...normalizeParams(params)
	});
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
*
* ```ts
* enum Colors { red, green, blue }
* z.enum(Colors);
* ```
*/
function nativeEnum(entries, params) {
	return new ZodEnum({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
	$ZodFile.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => fileProcessor(inst, ctx, json, params);
	inst.min = (size, params) => inst.check(_minSize(size, params));
	inst.max = (size, params) => inst.check(_maxSize(size, params));
	inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
	return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		payload.value = output;
		payload.fallback = true;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
function nullish(innerType) {
	return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
	$ZodSuccess.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => successProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
	return new ZodSuccess({
		type: "success",
		innerType
	});
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
	$ZodNaN.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nanProcessor(inst, ctx, json, params);
});
function nan(params) {
	return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
	ZodPipe.init(inst, def);
	$ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
	return new ZodCodec({
		type: "pipe",
		in: in_,
		out,
		transform: params.decode,
		reverseTransform: params.encode
	});
}
function invertCodec(codec) {
	const def = codec._zod.def;
	return new ZodCodec({
		type: "pipe",
		in: def.out,
		out: def.in,
		transform: def.reverseTransform,
		reverseTransform: def.transform
	});
}
var ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def) => {
	ZodPipe.init(inst, def);
	$ZodPreprocess.init(inst, def);
});
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
	$ZodTemplateLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => templateLiteralProcessor(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
	return new ZodTemplateLiteral({
		type: "template_literal",
		parts,
		...normalizeParams(params)
	});
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
	$ZodLazy.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
	return new ZodLazy({
		type: "lazy",
		getter
	});
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
	$ZodPromise.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => promiseProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
	return new ZodPromise({
		type: "promise",
		innerType
	});
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
	$ZodFunction.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => functionProcessor(inst, ctx, json, params);
});
function _function(params) {
	return new ZodFunction({
		type: "function",
		input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array$1(unknown()),
		output: params?.output ?? unknown()
	});
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function check(fn) {
	const ch = new $ZodCheck({ check: "custom" });
	ch._zod.check = fn;
	return ch;
}
function custom(fn, _params) {
	return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return _superRefine(fn, params);
}
var describe = describe$1;
var meta = meta$1;
function _instanceof(cls, params = {}) {
	const inst = new ZodCustom({
		type: "custom",
		check: "custom",
		fn: (data) => data instanceof cls,
		abort: true,
		...normalizeParams(params)
	});
	inst._zod.bag.Class = cls;
	inst._zod.check = (payload) => {
		if (!(payload.value instanceof cls)) payload.issues.push({
			code: "invalid_type",
			expected: cls.name,
			input: payload.value,
			inst,
			path: [...inst._zod.def.path ?? []]
		});
	};
	return inst;
}
var stringbool = (...args) => _stringbool({
	Codec: ZodCodec,
	Boolean: ZodBoolean,
	String: ZodString
}, ...args);
function json$1(params) {
	const jsonSchema = lazy(() => {
		return union([
			string(params),
			number(),
			boolean(),
			_null(),
			array$1(jsonSchema),
			record(string(), jsonSchema)
		]);
	});
	return jsonSchema;
}
function preprocess(fn, schema) {
	return new ZodPreprocess({
		type: "pipe",
		in: transform(fn),
		out: schema
	});
}
//#endregion
//#region ../../node_modules/.pnpm/react@19.2.6/node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, assign = Object.assign, emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	}, hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	}, Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.6";
}));
//#endregion
//#region ../../node_modules/.pnpm/react@19.2.6/node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/ai@6.0.180_zod@4.4.3/node_modules/ai/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name21 in all) __defProp(target, name21, {
		get: all[name21],
		enumerable: true
	});
};
var name8 = "AI_NoObjectGeneratedError";
var marker8 = `vercel.ai.error.${name8}`;
var symbol8 = Symbol.for(marker8);
var _a8;
var NoObjectGeneratedError = class extends AISDKError {
	constructor({ message = "No object generated.", cause, text: text2, response, usage, finishReason }) {
		super({
			name: name8,
			message,
			cause
		});
		this[_a8] = true;
		this.text = text2;
		this.response = response;
		this.usage = usage;
		this.finishReason = finishReason;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker8);
	}
};
_a8 = symbol8;
var name15 = "AI_UIMessageStreamError";
var marker15 = `vercel.ai.error.${name15}`;
var symbol15 = Symbol.for(marker15);
var _a15;
var UIMessageStreamError = class extends AISDKError {
	constructor({ chunkType, chunkId, message }) {
		super({
			name: name15,
			message
		});
		this[_a15] = true;
		this.chunkType = chunkType;
		this.chunkId = chunkId;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker15);
	}
};
_a15 = symbol15;
var dataContentSchema = union([
	string(),
	_instanceof(Uint8Array),
	_instanceof(ArrayBuffer),
	custom((value) => {
		var _a21, _b;
		return (_b = (_a21 = globalThis.Buffer) == null ? void 0 : _a21.isBuffer(value)) != null ? _b : false;
	}, { message: "Must be a Buffer" })
]);
var jsonValueSchema = lazy(() => union([
	_null(),
	string(),
	number(),
	boolean(),
	record(string(), jsonValueSchema.optional()),
	array$1(jsonValueSchema)
]));
var providerMetadataSchema = record(string(), record(string(), jsonValueSchema.optional()));
var textPartSchema = object$1({
	type: literal("text"),
	text: string(),
	providerOptions: providerMetadataSchema.optional()
});
var imagePartSchema = object$1({
	type: literal("image"),
	image: union([dataContentSchema, _instanceof(URL)]),
	mediaType: string().optional(),
	providerOptions: providerMetadataSchema.optional()
});
var filePartSchema = object$1({
	type: literal("file"),
	data: union([dataContentSchema, _instanceof(URL)]),
	filename: string().optional(),
	mediaType: string(),
	providerOptions: providerMetadataSchema.optional()
});
var reasoningPartSchema = object$1({
	type: literal("reasoning"),
	text: string(),
	providerOptions: providerMetadataSchema.optional()
});
var toolCallPartSchema = object$1({
	type: literal("tool-call"),
	toolCallId: string(),
	toolName: string(),
	input: unknown(),
	providerOptions: providerMetadataSchema.optional(),
	providerExecuted: boolean().optional()
});
var outputSchema = discriminatedUnion("type", [
	object$1({
		type: literal("text"),
		value: string(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("json"),
		value: jsonValueSchema,
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("execution-denied"),
		reason: string().optional(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("error-text"),
		value: string(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("error-json"),
		value: jsonValueSchema,
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("content"),
		value: array$1(union([
			object$1({
				type: literal("text"),
				text: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("media"),
				data: string(),
				mediaType: string()
			}),
			object$1({
				type: literal("file-data"),
				data: string(),
				mediaType: string(),
				filename: string().optional(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("file-url"),
				url: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("file-id"),
				fileId: union([string(), record(string(), string())]),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("image-data"),
				data: string(),
				mediaType: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("image-url"),
				url: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("image-file-id"),
				fileId: union([string(), record(string(), string())]),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("custom"),
				providerOptions: providerMetadataSchema.optional()
			})
		]))
	})
]);
var toolResultPartSchema = object$1({
	type: literal("tool-result"),
	toolCallId: string(),
	toolName: string(),
	output: outputSchema,
	providerOptions: providerMetadataSchema.optional()
});
var toolApprovalRequestSchema = object$1({
	type: literal("tool-approval-request"),
	approvalId: string(),
	toolCallId: string()
});
var toolApprovalResponseSchema = object$1({
	type: literal("tool-approval-response"),
	approvalId: string(),
	approved: boolean(),
	reason: string().optional()
});
union([
	object$1({
		role: literal("system"),
		content: string(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		role: literal("user"),
		content: union([string(), array$1(union([
			textPartSchema,
			imagePartSchema,
			filePartSchema
		]))]),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		role: literal("assistant"),
		content: union([string(), array$1(union([
			textPartSchema,
			filePartSchema,
			reasoningPartSchema,
			toolCallPartSchema,
			toolResultPartSchema,
			toolApprovalRequestSchema
		]))]),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		role: literal("tool"),
		content: array$1(union([toolResultPartSchema, toolApprovalResponseSchema])),
		providerOptions: providerMetadataSchema.optional()
	})
]);
function mergeObjects(base, overrides) {
	if (base === void 0 && overrides === void 0) return;
	if (base === void 0) return overrides;
	if (overrides === void 0) return base;
	const result = { ...base };
	for (const key in overrides) {
		if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
		if (Object.prototype.hasOwnProperty.call(overrides, key)) {
			const overridesValue = overrides[key];
			if (overridesValue === void 0) continue;
			const baseValue = key in base ? base[key] : void 0;
			const isSourceObject = overridesValue !== null && typeof overridesValue === "object" && !Array.isArray(overridesValue) && !(overridesValue instanceof Date) && !(overridesValue instanceof RegExp);
			const isTargetObject = baseValue !== null && baseValue !== void 0 && typeof baseValue === "object" && !Array.isArray(baseValue) && !(baseValue instanceof Date) && !(baseValue instanceof RegExp);
			if (isSourceObject && isTargetObject) result[key] = mergeObjects(baseValue, overridesValue);
			else result[key] = overridesValue;
		}
	}
	return result;
}
__export({}, {
	array: () => array,
	choice: () => choice,
	json: () => json,
	object: () => object,
	text: () => text
});
function fixJson(input) {
	const stack = ["ROOT"];
	let lastValidIndex = -1;
	let literalStart = null;
	function processValueStart(char, i, swapState) {
		switch (char) {
			case "\"":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_STRING");
				break;
			case "f":
			case "t":
			case "n":
				lastValidIndex = i;
				literalStart = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_LITERAL");
				break;
			case "-":
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_NUMBER");
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_NUMBER");
				break;
			case "{":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_OBJECT_START");
				break;
			case "[":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_ARRAY_START");
				break;
		}
	}
	function processAfterObjectValue(char, i) {
		switch (char) {
			case ",":
				stack.pop();
				stack.push("INSIDE_OBJECT_AFTER_COMMA");
				break;
			case "}":
				lastValidIndex = i;
				stack.pop();
				break;
		}
	}
	function processAfterArrayValue(char, i) {
		switch (char) {
			case ",":
				stack.pop();
				stack.push("INSIDE_ARRAY_AFTER_COMMA");
				break;
			case "]":
				lastValidIndex = i;
				stack.pop();
				break;
		}
	}
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		switch (stack[stack.length - 1]) {
			case "ROOT":
				processValueStart(char, i, "FINISH");
				break;
			case "INSIDE_OBJECT_START":
				switch (char) {
					case "\"":
						stack.pop();
						stack.push("INSIDE_OBJECT_KEY");
						break;
					case "}":
						lastValidIndex = i;
						stack.pop();
						break;
				}
				break;
			case "INSIDE_OBJECT_AFTER_COMMA":
				switch (char) {
					case "\"":
						stack.pop();
						stack.push("INSIDE_OBJECT_KEY");
						break;
				}
				break;
			case "INSIDE_OBJECT_KEY":
				switch (char) {
					case "\"":
						stack.pop();
						stack.push("INSIDE_OBJECT_AFTER_KEY");
						break;
				}
				break;
			case "INSIDE_OBJECT_AFTER_KEY":
				switch (char) {
					case ":":
						stack.pop();
						stack.push("INSIDE_OBJECT_BEFORE_VALUE");
						break;
				}
				break;
			case "INSIDE_OBJECT_BEFORE_VALUE":
				processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
				break;
			case "INSIDE_OBJECT_AFTER_VALUE":
				processAfterObjectValue(char, i);
				break;
			case "INSIDE_STRING":
				switch (char) {
					case "\"":
						stack.pop();
						lastValidIndex = i;
						break;
					case "\\":
						stack.push("INSIDE_STRING_ESCAPE");
						break;
					default: lastValidIndex = i;
				}
				break;
			case "INSIDE_ARRAY_START":
				switch (char) {
					case "]":
						lastValidIndex = i;
						stack.pop();
						break;
					default:
						lastValidIndex = i;
						processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
						break;
				}
				break;
			case "INSIDE_ARRAY_AFTER_VALUE":
				switch (char) {
					case ",":
						stack.pop();
						stack.push("INSIDE_ARRAY_AFTER_COMMA");
						break;
					case "]":
						lastValidIndex = i;
						stack.pop();
						break;
					default:
						lastValidIndex = i;
						break;
				}
				break;
			case "INSIDE_ARRAY_AFTER_COMMA":
				processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
				break;
			case "INSIDE_STRING_ESCAPE":
				stack.pop();
				lastValidIndex = i;
				break;
			case "INSIDE_NUMBER":
				switch (char) {
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						lastValidIndex = i;
						break;
					case "e":
					case "E":
					case "-":
					case ".": break;
					case ",":
						stack.pop();
						if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") processAfterArrayValue(char, i);
						if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") processAfterObjectValue(char, i);
						break;
					case "}":
						stack.pop();
						if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") processAfterObjectValue(char, i);
						break;
					case "]":
						stack.pop();
						if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") processAfterArrayValue(char, i);
						break;
					default:
						stack.pop();
						break;
				}
				break;
			case "INSIDE_LITERAL": {
				const partialLiteral = input.substring(literalStart, i + 1);
				if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
					stack.pop();
					if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") processAfterObjectValue(char, i);
					else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") processAfterArrayValue(char, i);
				} else lastValidIndex = i;
				break;
			}
		}
	}
	let result = input.slice(0, lastValidIndex + 1);
	for (let i = stack.length - 1; i >= 0; i--) switch (stack[i]) {
		case "INSIDE_STRING":
			result += "\"";
			break;
		case "INSIDE_OBJECT_KEY":
		case "INSIDE_OBJECT_AFTER_KEY":
		case "INSIDE_OBJECT_AFTER_COMMA":
		case "INSIDE_OBJECT_START":
		case "INSIDE_OBJECT_BEFORE_VALUE":
		case "INSIDE_OBJECT_AFTER_VALUE":
			result += "}";
			break;
		case "INSIDE_ARRAY_START":
		case "INSIDE_ARRAY_AFTER_COMMA":
		case "INSIDE_ARRAY_AFTER_VALUE":
			result += "]";
			break;
		case "INSIDE_LITERAL": {
			const partialLiteral = input.substring(literalStart, input.length);
			if ("true".startsWith(partialLiteral)) result += "true".slice(partialLiteral.length);
			else if ("false".startsWith(partialLiteral)) result += "false".slice(partialLiteral.length);
			else if ("null".startsWith(partialLiteral)) result += "null".slice(partialLiteral.length);
		}
	}
	return result;
}
async function parsePartialJson(jsonText) {
	if (jsonText === void 0) return {
		value: void 0,
		state: "undefined-input"
	};
	let result = await safeParseJSON({ text: jsonText });
	if (result.success) return {
		value: result.value,
		state: "successful-parse"
	};
	result = await safeParseJSON({ text: fixJson(jsonText) });
	if (result.success) return {
		value: result.value,
		state: "repaired-parse"
	};
	return {
		value: void 0,
		state: "failed-parse"
	};
}
var text = () => ({
	name: "text",
	responseFormat: Promise.resolve({ type: "text" }),
	async parseCompleteOutput({ text: text2 }) {
		return text2;
	},
	async parsePartialOutput({ text: text2 }) {
		return { partial: text2 };
	},
	createElementStreamTransform() {}
});
var object = ({ schema: inputSchema, name: name21, description }) => {
	const schema = asSchema(inputSchema);
	return {
		name: "object",
		responseFormat: resolve(schema.jsonSchema).then((jsonSchema2) => ({
			type: "json",
			schema: jsonSchema2,
			...name21 != null && { name: name21 },
			...description != null && { description }
		})),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			const validationResult = await safeValidateTypes({
				value: parseResult.value,
				schema
			});
			if (!validationResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: response did not match schema.",
				cause: validationResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			return validationResult.value;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": return { partial: result.value };
			}
		},
		createElementStreamTransform() {}
	};
};
var array = ({ element: inputElementSchema, name: name21, description }) => {
	const elementSchema = asSchema(inputElementSchema);
	return {
		name: "array",
		responseFormat: resolve(elementSchema.jsonSchema).then((jsonSchema2) => {
			const { $schema, ...itemSchema } = jsonSchema2;
			return {
				type: "json",
				schema: {
					$schema: "http://json-schema.org/draft-07/schema#",
					type: "object",
					properties: { elements: {
						type: "array",
						items: itemSchema
					} },
					required: ["elements"],
					additionalProperties: false
				},
				...name21 != null && { name: name21 },
				...description != null && { description }
			};
		}),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			const outerValue = parseResult.value;
			if (outerValue == null || typeof outerValue !== "object" || !("elements" in outerValue) || !Array.isArray(outerValue.elements)) throw new NoObjectGeneratedError({
				message: "No object generated: response did not match schema.",
				cause: new TypeValidationError({
					value: outerValue,
					cause: "response must be an object with an elements array"
				}),
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			for (const element of outerValue.elements) {
				const validationResult = await safeValidateTypes({
					value: element,
					schema: elementSchema
				});
				if (!validationResult.success) throw new NoObjectGeneratedError({
					message: "No object generated: response did not match schema.",
					cause: validationResult.error,
					text: text2,
					response: context2.response,
					usage: context2.usage,
					finishReason: context2.finishReason
				});
			}
			return outerValue.elements;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": {
					const outerValue = result.value;
					if (outerValue == null || typeof outerValue !== "object" || !("elements" in outerValue) || !Array.isArray(outerValue.elements)) return;
					const rawElements = result.state === "repaired-parse" && outerValue.elements.length > 0 ? outerValue.elements.slice(0, -1) : outerValue.elements;
					const parsedElements = [];
					for (const rawElement of rawElements) {
						const validationResult = await safeValidateTypes({
							value: rawElement,
							schema: elementSchema
						});
						if (validationResult.success) parsedElements.push(validationResult.value);
					}
					return { partial: parsedElements };
				}
			}
		},
		createElementStreamTransform() {
			let publishedElements = 0;
			return new TransformStream({ transform({ partialOutput }, controller) {
				if (partialOutput != null) for (; publishedElements < partialOutput.length; publishedElements++) controller.enqueue(partialOutput[publishedElements]);
			} });
		}
	};
};
var choice = ({ options: choiceOptions, name: name21, description }) => {
	return {
		name: "choice",
		responseFormat: Promise.resolve({
			type: "json",
			schema: {
				$schema: "http://json-schema.org/draft-07/schema#",
				type: "object",
				properties: { result: {
					type: "string",
					enum: choiceOptions
				} },
				required: ["result"],
				additionalProperties: false
			},
			...name21 != null && { name: name21 },
			...description != null && { description }
		}),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			const outerValue = parseResult.value;
			if (outerValue == null || typeof outerValue !== "object" || !("result" in outerValue) || typeof outerValue.result !== "string" || !choiceOptions.includes(outerValue.result)) throw new NoObjectGeneratedError({
				message: "No object generated: response did not match schema.",
				cause: new TypeValidationError({
					value: outerValue,
					cause: "response must be an object that contains a choice value."
				}),
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			return outerValue.result;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": {
					const outerValue = result.value;
					if (outerValue == null || typeof outerValue !== "object" || !("result" in outerValue) || typeof outerValue.result !== "string") return;
					const potentialMatches = choiceOptions.filter((choiceOption) => choiceOption.startsWith(outerValue.result));
					if (result.state === "successful-parse") return potentialMatches.includes(outerValue.result) ? { partial: outerValue.result } : void 0;
					else return potentialMatches.length === 1 ? { partial: potentialMatches[0] } : void 0;
				}
			}
		},
		createElementStreamTransform() {}
	};
};
var json = ({ name: name21, description } = {}) => {
	return {
		name: "json",
		responseFormat: Promise.resolve({
			type: "json",
			...name21 != null && { name: name21 },
			...description != null && { description }
		}),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			return parseResult.value;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": return result.value === void 0 ? void 0 : { partial: result.value };
			}
		},
		createElementStreamTransform() {}
	};
};
createIdGenerator({
	prefix: "aitxt",
	size: 24
});
TransformStream;
var toolMetadataSchema = record(string(), jsonValueSchema.optional());
var uiMessageChunkSchema = lazySchema(() => zodSchema(union([
	strictObject({
		type: literal("text-start"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("text-delta"),
		id: string(),
		delta: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("text-end"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("error"),
		errorText: string()
	}),
	strictObject({
		type: literal("tool-input-start"),
		toolCallId: string(),
		toolName: string(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		title: string().optional()
	}),
	strictObject({
		type: literal("tool-input-delta"),
		toolCallId: string(),
		inputTextDelta: string()
	}),
	strictObject({
		type: literal("tool-input-available"),
		toolCallId: string(),
		toolName: string(),
		input: unknown(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		title: string().optional()
	}),
	strictObject({
		type: literal("tool-input-error"),
		toolCallId: string(),
		toolName: string(),
		input: unknown(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		errorText: string(),
		title: string().optional()
	}),
	strictObject({
		type: literal("tool-approval-request"),
		approvalId: string(),
		toolCallId: string()
	}),
	strictObject({
		type: literal("tool-output-available"),
		toolCallId: string(),
		output: unknown(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		preliminary: boolean().optional()
	}),
	strictObject({
		type: literal("tool-output-error"),
		toolCallId: string(),
		errorText: string(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional()
	}),
	strictObject({
		type: literal("tool-output-denied"),
		toolCallId: string()
	}),
	strictObject({
		type: literal("reasoning-start"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("reasoning-delta"),
		id: string(),
		delta: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("reasoning-end"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("source-url"),
		sourceId: string(),
		url: string(),
		title: string().optional(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("source-document"),
		sourceId: string(),
		mediaType: string(),
		title: string(),
		filename: string().optional(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("file"),
		url: string(),
		mediaType: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: custom((value) => typeof value === "string" && value.startsWith("data-"), { message: "Type must start with \"data-\"" }),
		id: string().optional(),
		data: unknown(),
		transient: boolean().optional()
	}),
	strictObject({ type: literal("start-step") }),
	strictObject({ type: literal("finish-step") }),
	strictObject({
		type: literal("start"),
		messageId: string().optional(),
		messageMetadata: unknown().optional()
	}),
	strictObject({
		type: literal("finish"),
		finishReason: _enum([
			"stop",
			"length",
			"content-filter",
			"tool-calls",
			"error",
			"other"
		]).optional(),
		messageMetadata: unknown().optional()
	}),
	strictObject({
		type: literal("abort"),
		reason: string().optional()
	}),
	strictObject({
		type: literal("message-metadata"),
		messageMetadata: unknown()
	})
])));
function isDataUIMessageChunk(chunk) {
	return chunk.type.startsWith("data-");
}
function isStaticToolUIPart(part) {
	return part.type.startsWith("tool-");
}
function isDynamicToolUIPart(part) {
	return part.type === "dynamic-tool";
}
function isToolUIPart(part) {
	return isStaticToolUIPart(part) || isDynamicToolUIPart(part);
}
function getStaticToolName(part) {
	return part.type.split("-").slice(1).join("-");
}
function createStreamingUIMessageState({ lastMessage, messageId }) {
	return {
		message: (lastMessage == null ? void 0 : lastMessage.role) === "assistant" ? lastMessage : {
			id: messageId,
			metadata: void 0,
			role: "assistant",
			parts: []
		},
		activeTextParts: {},
		activeReasoningParts: {},
		partialToolCalls: {}
	};
}
function processUIMessageStream({ stream, messageMetadataSchema, dataPartSchemas, runUpdateMessageJob, onError, onToolCall, onData }) {
	return stream.pipeThrough(new TransformStream({ async transform(chunk, controller) {
		await runUpdateMessageJob(async ({ state, write }) => {
			var _a21, _b, _c, _d;
			function getToolInvocation(toolCallId) {
				const toolInvocation = state.message.parts.filter(isToolUIPart).find((invocation) => invocation.toolCallId === toolCallId);
				if (toolInvocation == null) throw new UIMessageStreamError({
					chunkType: "tool-invocation",
					chunkId: toolCallId,
					message: `No tool invocation found for tool call ID "${toolCallId}".`
				});
				return toolInvocation;
			}
			function updateToolPart(options) {
				var _a22;
				const part = state.message.parts.find((part2) => isStaticToolUIPart(part2) && part2.toolCallId === options.toolCallId);
				const anyOptions = options;
				const anyPart = part;
				if (part != null) {
					part.state = options.state;
					anyPart.input = anyOptions.input;
					anyPart.output = anyOptions.output;
					anyPart.errorText = anyOptions.errorText;
					anyPart.rawInput = anyOptions.rawInput;
					anyPart.preliminary = anyOptions.preliminary;
					if (options.title !== void 0) anyPart.title = options.title;
					if (options.toolMetadata !== void 0) anyPart.toolMetadata = options.toolMetadata;
					anyPart.providerExecuted = (_a22 = anyOptions.providerExecuted) != null ? _a22 : part.providerExecuted;
					const providerMetadata = anyOptions.providerMetadata;
					if (providerMetadata != null) if (options.state === "output-available" || options.state === "output-error") {
						const resultPart = part;
						resultPart.resultProviderMetadata = providerMetadata;
					} else part.callProviderMetadata = providerMetadata;
				} else state.message.parts.push({
					type: `tool-${options.toolName}`,
					toolCallId: options.toolCallId,
					state: options.state,
					title: options.title,
					...options.toolMetadata !== void 0 ? { toolMetadata: options.toolMetadata } : {},
					input: anyOptions.input,
					output: anyOptions.output,
					rawInput: anyOptions.rawInput,
					errorText: anyOptions.errorText,
					providerExecuted: anyOptions.providerExecuted,
					preliminary: anyOptions.preliminary,
					...anyOptions.providerMetadata != null && (options.state === "output-available" || options.state === "output-error") ? { resultProviderMetadata: anyOptions.providerMetadata } : {},
					...anyOptions.providerMetadata != null && !(options.state === "output-available" || options.state === "output-error") ? { callProviderMetadata: anyOptions.providerMetadata } : {}
				});
			}
			function updateDynamicToolPart(options) {
				var _a22, _b2;
				const part = state.message.parts.find((part2) => part2.type === "dynamic-tool" && part2.toolCallId === options.toolCallId);
				const anyOptions = options;
				const anyPart = part;
				if (part != null) {
					part.state = options.state;
					anyPart.toolName = options.toolName;
					anyPart.input = anyOptions.input;
					anyPart.output = anyOptions.output;
					anyPart.errorText = anyOptions.errorText;
					anyPart.rawInput = (_a22 = anyOptions.rawInput) != null ? _a22 : anyPart.rawInput;
					anyPart.preliminary = anyOptions.preliminary;
					if (options.title !== void 0) anyPart.title = options.title;
					if (options.toolMetadata !== void 0) anyPart.toolMetadata = options.toolMetadata;
					anyPart.providerExecuted = (_b2 = anyOptions.providerExecuted) != null ? _b2 : part.providerExecuted;
					const providerMetadata = anyOptions.providerMetadata;
					if (providerMetadata != null) if (options.state === "output-available" || options.state === "output-error") {
						const resultPart = part;
						resultPart.resultProviderMetadata = providerMetadata;
					} else part.callProviderMetadata = providerMetadata;
				} else state.message.parts.push({
					type: "dynamic-tool",
					toolName: options.toolName,
					toolCallId: options.toolCallId,
					state: options.state,
					input: anyOptions.input,
					output: anyOptions.output,
					errorText: anyOptions.errorText,
					preliminary: anyOptions.preliminary,
					providerExecuted: anyOptions.providerExecuted,
					title: options.title,
					...options.toolMetadata !== void 0 ? { toolMetadata: options.toolMetadata } : {},
					...anyOptions.providerMetadata != null && (options.state === "output-available" || options.state === "output-error") ? { resultProviderMetadata: anyOptions.providerMetadata } : {},
					...anyOptions.providerMetadata != null && !(options.state === "output-available" || options.state === "output-error") ? { callProviderMetadata: anyOptions.providerMetadata } : {}
				});
			}
			async function updateMessageMetadata(metadata) {
				if (metadata != null) {
					const mergedMetadata = state.message.metadata != null ? mergeObjects(state.message.metadata, metadata) : metadata;
					if (messageMetadataSchema != null) await validateTypes({
						value: mergedMetadata,
						schema: messageMetadataSchema,
						context: {
							field: "message.metadata",
							entityId: state.message.id
						}
					});
					state.message.metadata = mergedMetadata;
				}
			}
			switch (chunk.type) {
				case "text-start": {
					const textPart = {
						type: "text",
						text: "",
						providerMetadata: chunk.providerMetadata,
						state: "streaming"
					};
					state.activeTextParts[chunk.id] = textPart;
					state.message.parts.push(textPart);
					write();
					break;
				}
				case "text-delta": {
					const textPart = state.activeTextParts[chunk.id];
					if (textPart == null) throw new UIMessageStreamError({
						chunkType: "text-delta",
						chunkId: chunk.id,
						message: `Received text-delta for missing text part with ID "${chunk.id}". Ensure a "text-start" chunk is sent before any "text-delta" chunks.`
					});
					textPart.text += chunk.delta;
					textPart.providerMetadata = (_a21 = chunk.providerMetadata) != null ? _a21 : textPart.providerMetadata;
					write();
					break;
				}
				case "text-end": {
					const textPart = state.activeTextParts[chunk.id];
					if (textPart == null) throw new UIMessageStreamError({
						chunkType: "text-end",
						chunkId: chunk.id,
						message: `Received text-end for missing text part with ID "${chunk.id}". Ensure a "text-start" chunk is sent before any "text-end" chunks.`
					});
					textPart.state = "done";
					textPart.providerMetadata = (_b = chunk.providerMetadata) != null ? _b : textPart.providerMetadata;
					delete state.activeTextParts[chunk.id];
					write();
					break;
				}
				case "reasoning-start": {
					const reasoningPart = {
						type: "reasoning",
						text: "",
						providerMetadata: chunk.providerMetadata,
						state: "streaming"
					};
					state.activeReasoningParts[chunk.id] = reasoningPart;
					state.message.parts.push(reasoningPart);
					write();
					break;
				}
				case "reasoning-delta": {
					const reasoningPart = state.activeReasoningParts[chunk.id];
					if (reasoningPart == null) throw new UIMessageStreamError({
						chunkType: "reasoning-delta",
						chunkId: chunk.id,
						message: `Received reasoning-delta for missing reasoning part with ID "${chunk.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-delta" chunks.`
					});
					reasoningPart.text += chunk.delta;
					reasoningPart.providerMetadata = (_c = chunk.providerMetadata) != null ? _c : reasoningPart.providerMetadata;
					write();
					break;
				}
				case "reasoning-end": {
					const reasoningPart = state.activeReasoningParts[chunk.id];
					if (reasoningPart == null) throw new UIMessageStreamError({
						chunkType: "reasoning-end",
						chunkId: chunk.id,
						message: `Received reasoning-end for missing reasoning part with ID "${chunk.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-end" chunks.`
					});
					reasoningPart.providerMetadata = (_d = chunk.providerMetadata) != null ? _d : reasoningPart.providerMetadata;
					reasoningPart.state = "done";
					delete state.activeReasoningParts[chunk.id];
					write();
					break;
				}
				case "file":
					state.message.parts.push({
						type: "file",
						mediaType: chunk.mediaType,
						url: chunk.url,
						...chunk.providerMetadata != null ? { providerMetadata: chunk.providerMetadata } : {}
					});
					write();
					break;
				case "source-url":
					state.message.parts.push({
						type: "source-url",
						sourceId: chunk.sourceId,
						url: chunk.url,
						title: chunk.title,
						providerMetadata: chunk.providerMetadata
					});
					write();
					break;
				case "source-document":
					state.message.parts.push({
						type: "source-document",
						sourceId: chunk.sourceId,
						mediaType: chunk.mediaType,
						title: chunk.title,
						filename: chunk.filename,
						providerMetadata: chunk.providerMetadata
					});
					write();
					break;
				case "tool-input-start": {
					const toolInvocations = state.message.parts.filter(isStaticToolUIPart);
					state.partialToolCalls[chunk.toolCallId] = {
						text: "",
						toolName: chunk.toolName,
						index: toolInvocations.length,
						dynamic: chunk.dynamic,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata
					};
					if (chunk.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-streaming",
						input: void 0,
						providerExecuted: chunk.providerExecuted,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata,
						providerMetadata: chunk.providerMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-streaming",
						input: void 0,
						providerExecuted: chunk.providerExecuted,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata,
						providerMetadata: chunk.providerMetadata
					});
					write();
					break;
				}
				case "tool-input-delta": {
					const partialToolCall = state.partialToolCalls[chunk.toolCallId];
					if (partialToolCall == null) throw new UIMessageStreamError({
						chunkType: "tool-input-delta",
						chunkId: chunk.toolCallId,
						message: `Received tool-input-delta for missing tool call with ID "${chunk.toolCallId}". Ensure a "tool-input-start" chunk is sent before any "tool-input-delta" chunks.`
					});
					partialToolCall.text += chunk.inputTextDelta;
					const { value: partialArgs } = await parsePartialJson(partialToolCall.text);
					if (partialToolCall.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: partialToolCall.toolName,
						state: "input-streaming",
						input: partialArgs,
						title: partialToolCall.title,
						toolMetadata: partialToolCall.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: partialToolCall.toolName,
						state: "input-streaming",
						input: partialArgs,
						title: partialToolCall.title,
						toolMetadata: partialToolCall.toolMetadata
					});
					write();
					break;
				}
				case "tool-input-available":
					if (chunk.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-available",
						input: chunk.input,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-available",
						input: chunk.input,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata
					});
					write();
					if (onToolCall && !chunk.providerExecuted) await onToolCall({ toolCall: chunk });
					break;
				case "tool-input-error": {
					const existingPart = state.message.parts.filter(isToolUIPart).find((p) => p.toolCallId === chunk.toolCallId);
					if (existingPart != null ? existingPart.type === "dynamic-tool" : !!chunk.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "output-error",
						input: chunk.input,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						toolMetadata: chunk.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "output-error",
						input: void 0,
						rawInput: chunk.input,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						toolMetadata: chunk.toolMetadata
					});
					write();
					break;
				}
				case "tool-approval-request": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					toolInvocation.state = "approval-requested";
					toolInvocation.approval = { id: chunk.approvalId };
					write();
					break;
				}
				case "tool-output-denied": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					toolInvocation.state = "output-denied";
					write();
					break;
				}
				case "tool-output-available": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					if (toolInvocation.type === "dynamic-tool") updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: toolInvocation.toolName,
						state: "output-available",
						input: toolInvocation.input,
						output: chunk.output,
						preliminary: chunk.preliminary,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: getStaticToolName(toolInvocation),
						state: "output-available",
						input: toolInvocation.input,
						output: chunk.output,
						providerExecuted: chunk.providerExecuted,
						preliminary: chunk.preliminary,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					write();
					break;
				}
				case "tool-output-error": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					if (toolInvocation.type === "dynamic-tool") updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: toolInvocation.toolName,
						state: "output-error",
						input: toolInvocation.input,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: getStaticToolName(toolInvocation),
						state: "output-error",
						input: toolInvocation.input,
						rawInput: toolInvocation.rawInput,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					write();
					break;
				}
				case "start-step":
					state.message.parts.push({ type: "step-start" });
					break;
				case "finish-step":
					state.activeTextParts = {};
					state.activeReasoningParts = {};
					break;
				case "start":
					if (chunk.messageId != null) state.message.id = chunk.messageId;
					await updateMessageMetadata(chunk.messageMetadata);
					if (chunk.messageId != null || chunk.messageMetadata != null) write();
					break;
				case "finish":
					if (chunk.finishReason != null) state.finishReason = chunk.finishReason;
					await updateMessageMetadata(chunk.messageMetadata);
					if (chunk.messageMetadata != null) write();
					break;
				case "message-metadata":
					await updateMessageMetadata(chunk.messageMetadata);
					if (chunk.messageMetadata != null) write();
					break;
				case "error":
					onError?.(new Error(chunk.errorText));
					break;
				default: if (isDataUIMessageChunk(chunk)) {
					if ((dataPartSchemas == null ? void 0 : dataPartSchemas[chunk.type]) != null) {
						const partIdx = state.message.parts.findIndex((p) => "id" in p && "data" in p && p.id === chunk.id && p.type === chunk.type);
						const actualPartIdx = partIdx >= 0 ? partIdx : state.message.parts.length;
						await validateTypes({
							value: chunk.data,
							schema: dataPartSchemas[chunk.type],
							context: {
								field: `message.parts[${actualPartIdx}].data`,
								entityName: chunk.type,
								entityId: chunk.id
							}
						});
					}
					const dataChunk = chunk;
					if (dataChunk.transient) {
						onData?.(dataChunk);
						break;
					}
					const existingUIPart = dataChunk.id != null ? state.message.parts.find((chunkArg) => dataChunk.type === chunkArg.type && dataChunk.id === chunkArg.id) : void 0;
					if (existingUIPart != null) existingUIPart.data = dataChunk.data;
					else state.message.parts.push(dataChunk);
					onData?.(dataChunk);
					write();
				}
			}
			controller.enqueue(chunk);
		});
	} }));
}
async function consumeStream({ stream, onError }) {
	const reader = stream.getReader();
	try {
		while (true) {
			const { done } = await reader.read();
			if (done) break;
		}
	} catch (error) {
		onError?.(error);
	} finally {
		reader.releaseLock();
	}
}
createIdGenerator({
	prefix: "aitxt",
	size: 24
});
var toolMetadataSchema2 = record(string(), jsonValueSchema.optional());
lazySchema(() => zodSchema(array$1(object$1({
	id: string(),
	role: _enum([
		"system",
		"user",
		"assistant"
	]),
	metadata: unknown().optional(),
	parts: array$1(union([
		object$1({
			type: literal("text"),
			text: string(),
			state: _enum(["streaming", "done"]).optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("reasoning"),
			text: string(),
			state: _enum(["streaming", "done"]).optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("source-url"),
			sourceId: string(),
			url: string(),
			title: string().optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("source-document"),
			sourceId: string(),
			mediaType: string(),
			title: string(),
			filename: string().optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("file"),
			mediaType: string(),
			filename: string().optional(),
			url: string(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({ type: literal("step-start") }),
		object$1({
			type: string().startsWith("data-"),
			id: string().optional(),
			data: unknown()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-streaming"),
			input: unknown().optional(),
			providerExecuted: boolean().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			output: never().optional(),
			errorText: never().optional(),
			approval: never().optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-available"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: never().optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-requested"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: never().optional(),
				reason: never().optional()
			})
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-responded"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: boolean(),
				reason: string().optional()
			})
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-available"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: unknown(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			preliminary: boolean().optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-error"),
			input: unknown(),
			rawInput: unknown().optional(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: string(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-denied"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(false),
				reason: string().optional()
			})
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-streaming"),
			providerExecuted: boolean().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			input: unknown().optional(),
			output: never().optional(),
			errorText: never().optional(),
			approval: never().optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-available"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: never().optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-requested"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: never().optional(),
				reason: never().optional()
			})
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-responded"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: boolean(),
				reason: string().optional()
			})
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-available"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			output: unknown(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			preliminary: boolean().optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-error"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			rawInput: unknown().optional(),
			output: never().optional(),
			errorText: string(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-denied"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(false),
				reason: string().optional()
			})
		})
	])).nonempty("Message must contain at least one part")
})).nonempty("Messages array must not be empty")));
createIdGenerator({
	prefix: "aiobj",
	size: 24
});
var SerialJobExecutor = class {
	constructor() {
		this.queue = [];
		this.isProcessing = false;
	}
	async processQueue() {
		if (this.isProcessing) return;
		this.isProcessing = true;
		while (this.queue.length > 0) {
			await this.queue[0]();
			this.queue.shift();
		}
		this.isProcessing = false;
	}
	async run(job) {
		return new Promise((resolve3, reject) => {
			this.queue.push(async () => {
				try {
					await job();
					resolve3();
				} catch (error) {
					reject(error);
				}
			});
			this.processQueue();
		});
	}
};
createIdGenerator({
	prefix: "aiobj",
	size: 24
});
async function convertFileListToFileUIParts(files) {
	if (files == null) return [];
	if (!globalThis.FileList || !(files instanceof globalThis.FileList)) throw new Error("FileList is not supported in the current environment");
	return Promise.all(Array.from(files).map(async (file) => {
		const { name: name21, type } = file;
		return {
			type: "file",
			mediaType: type,
			filename: name21,
			url: await new Promise((resolve3, reject) => {
				const reader = new FileReader();
				reader.onload = (readerEvent) => {
					var _a21;
					resolve3((_a21 = readerEvent.target) == null ? void 0 : _a21.result);
				};
				reader.onerror = (error) => reject(error);
				reader.readAsDataURL(file);
			})
		};
	}));
}
var HttpChatTransport = class {
	constructor({ api = "/api/chat", credentials, headers, body, fetch: fetch2, prepareSendMessagesRequest, prepareReconnectToStreamRequest }) {
		this.api = api;
		this.credentials = credentials;
		this.headers = headers;
		this.body = body;
		this.fetch = fetch2;
		this.prepareSendMessagesRequest = prepareSendMessagesRequest;
		this.prepareReconnectToStreamRequest = prepareReconnectToStreamRequest;
	}
	async sendMessages({ abortSignal, ...options }) {
		var _a21, _b, _c, _d, _e;
		const resolvedBody = await resolve(this.body);
		const resolvedHeaders = await resolve(this.headers);
		const resolvedCredentials = await resolve(this.credentials);
		const baseHeaders = {
			...normalizeHeaders(resolvedHeaders),
			...normalizeHeaders(options.headers)
		};
		const preparedRequest = await ((_a21 = this.prepareSendMessagesRequest) == null ? void 0 : _a21.call(this, {
			api: this.api,
			id: options.chatId,
			messages: options.messages,
			body: {
				...resolvedBody,
				...options.body
			},
			headers: baseHeaders,
			credentials: resolvedCredentials,
			requestMetadata: options.metadata,
			trigger: options.trigger,
			messageId: options.messageId
		}));
		const api = (_b = preparedRequest == null ? void 0 : preparedRequest.api) != null ? _b : this.api;
		const headers = (preparedRequest == null ? void 0 : preparedRequest.headers) !== void 0 ? normalizeHeaders(preparedRequest.headers) : baseHeaders;
		const body = (preparedRequest == null ? void 0 : preparedRequest.body) !== void 0 ? preparedRequest.body : {
			...resolvedBody,
			...options.body,
			id: options.chatId,
			messages: options.messages,
			trigger: options.trigger,
			messageId: options.messageId
		};
		const credentials = (_c = preparedRequest == null ? void 0 : preparedRequest.credentials) != null ? _c : resolvedCredentials;
		const response = await ((_d = this.fetch) != null ? _d : globalThis.fetch)(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers
			},
			body: JSON.stringify(body),
			credentials,
			signal: abortSignal
		});
		if (!response.ok) throw new Error((_e = await response.text()) != null ? _e : "Failed to fetch the chat response.");
		if (!response.body) throw new Error("The response body is empty.");
		return this.processResponseStream(response.body);
	}
	async reconnectToStream(options) {
		var _a21, _b, _c, _d, _e;
		const resolvedBody = await resolve(this.body);
		const resolvedHeaders = await resolve(this.headers);
		const resolvedCredentials = await resolve(this.credentials);
		const baseHeaders = {
			...normalizeHeaders(resolvedHeaders),
			...normalizeHeaders(options.headers)
		};
		const preparedRequest = await ((_a21 = this.prepareReconnectToStreamRequest) == null ? void 0 : _a21.call(this, {
			api: this.api,
			id: options.chatId,
			body: {
				...resolvedBody,
				...options.body
			},
			headers: baseHeaders,
			credentials: resolvedCredentials,
			requestMetadata: options.metadata
		}));
		const api = (_b = preparedRequest == null ? void 0 : preparedRequest.api) != null ? _b : `${this.api}/${options.chatId}/stream`;
		const headers = (preparedRequest == null ? void 0 : preparedRequest.headers) !== void 0 ? normalizeHeaders(preparedRequest.headers) : baseHeaders;
		const credentials = (_c = preparedRequest == null ? void 0 : preparedRequest.credentials) != null ? _c : resolvedCredentials;
		const response = await ((_d = this.fetch) != null ? _d : globalThis.fetch)(api, {
			method: "GET",
			headers,
			credentials
		});
		if (response.status === 204) return null;
		if (!response.ok) throw new Error((_e = await response.text()) != null ? _e : "Failed to fetch the chat response.");
		if (!response.body) throw new Error("The response body is empty.");
		return this.processResponseStream(response.body);
	}
};
var DefaultChatTransport = class extends HttpChatTransport {
	constructor(options = {}) {
		super(options);
	}
	processResponseStream(stream) {
		return parseJsonEventStream({
			stream,
			schema: uiMessageChunkSchema
		}).pipeThrough(new TransformStream({ async transform(chunk, controller) {
			if (!chunk.success) throw chunk.error;
			controller.enqueue(chunk.value);
		} }));
	}
};
var AbstractChat = class {
	constructor({ generateId: generateId2 = generateId, id = generateId2(), transport = new DefaultChatTransport(), messageMetadataSchema, dataPartSchemas, state, onError, onToolCall, onFinish, onData, sendAutomaticallyWhen }) {
		this.activeResponse = void 0;
		this.jobExecutor = new SerialJobExecutor();
		/**
		* Appends or replaces a user message to the chat list. This triggers the API call to fetch
		* the assistant's response.
		*
		* If a messageId is provided, the message will be replaced.
		*/
		this.sendMessage = async (message, options) => {
			var _a21, _b, _c, _d;
			if (message == null) {
				await this.makeRequest({
					trigger: "submit-message",
					messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
					...options
				});
				return;
			}
			let uiMessage;
			if ("text" in message || "files" in message) uiMessage = { parts: [...Array.isArray(message.files) ? message.files : await convertFileListToFileUIParts(message.files), ..."text" in message && message.text != null ? [{
				type: "text",
				text: message.text
			}] : []] };
			else uiMessage = message;
			if (message.messageId != null) {
				const messageIndex = this.state.messages.findIndex((m) => m.id === message.messageId);
				if (messageIndex === -1) throw new Error(`message with id ${message.messageId} not found`);
				if (this.state.messages[messageIndex].role !== "user") throw new Error(`message with id ${message.messageId} is not a user message`);
				this.state.messages = this.state.messages.slice(0, messageIndex + 1);
				this.state.replaceMessage(messageIndex, {
					...uiMessage,
					id: message.messageId,
					role: (_b = uiMessage.role) != null ? _b : "user",
					metadata: message.metadata
				});
			} else this.state.pushMessage({
				...uiMessage,
				id: (_c = uiMessage.id) != null ? _c : this.generateId(),
				role: (_d = uiMessage.role) != null ? _d : "user",
				metadata: message.metadata
			});
			await this.makeRequest({
				trigger: "submit-message",
				messageId: message.messageId,
				...options
			});
		};
		/**
		* Regenerate the assistant message with the provided message id.
		* If no message id is provided, the last assistant message will be regenerated.
		*/
		this.regenerate = async ({ messageId, ...options } = {}) => {
			const messageIndex = messageId == null ? this.state.messages.length - 1 : this.state.messages.findIndex((message) => message.id === messageId);
			if (messageIndex === -1) throw new Error(`message ${messageId} not found`);
			this.state.messages = this.state.messages.slice(0, this.messages[messageIndex].role === "assistant" ? messageIndex : messageIndex + 1);
			await this.makeRequest({
				trigger: "regenerate-message",
				messageId,
				...options
			});
		};
		/**
		* Attempt to resume an ongoing streaming response.
		*/
		this.resumeStream = async (options = {}) => {
			await this.makeRequest({
				trigger: "resume-stream",
				...options
			});
		};
		/**
		* Clear the error state and set the status to ready if the chat is in an error state.
		*/
		this.clearError = () => {
			if (this.status === "error") {
				this.state.error = void 0;
				this.setStatus({ status: "ready" });
			}
		};
		this.addToolApprovalResponse = async ({ id, approved, reason, options }) => this.jobExecutor.run(async () => {
			const messages = this.state.messages;
			const lastMessage = messages[messages.length - 1];
			const updatePart = (part) => isToolUIPart(part) && part.state === "approval-requested" && part.approval.id === id ? {
				...part,
				state: "approval-responded",
				approval: {
					id,
					approved,
					reason
				}
			} : part;
			this.state.replaceMessage(messages.length - 1, {
				...lastMessage,
				parts: lastMessage.parts.map(updatePart)
			});
			if (this.activeResponse) this.activeResponse.state.message.parts = this.activeResponse.state.message.parts.map(updatePart);
			if (this.status !== "streaming" && this.status !== "submitted" && this.sendAutomaticallyWhen) this.shouldSendAutomatically().then((shouldSend) => {
				var _a21;
				if (shouldSend) this.makeRequest({
					trigger: "submit-message",
					messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
					...options
				});
			});
		});
		this.addToolOutput = async ({ state = "output-available", toolCallId, output, errorText, options }) => this.jobExecutor.run(async () => {
			const messages = this.state.messages;
			const lastMessage = messages[messages.length - 1];
			const updatePart = (part) => isToolUIPart(part) && part.toolCallId === toolCallId ? {
				...part,
				state,
				output,
				errorText
			} : part;
			this.state.replaceMessage(messages.length - 1, {
				...lastMessage,
				parts: lastMessage.parts.map(updatePart)
			});
			if (this.activeResponse) this.activeResponse.state.message.parts = this.activeResponse.state.message.parts.map(updatePart);
			if (this.status !== "streaming" && this.status !== "submitted" && this.sendAutomaticallyWhen) this.shouldSendAutomatically().then((shouldSend) => {
				var _a21;
				if (shouldSend) this.makeRequest({
					trigger: "submit-message",
					messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
					...options
				});
			});
		});
		/** @deprecated Use addToolOutput */
		this.addToolResult = this.addToolOutput;
		/**
		* Abort the current request immediately, keep the generated tokens if any.
		*/
		this.stop = async () => {
			var _a21;
			if (this.status !== "streaming" && this.status !== "submitted") return;
			if ((_a21 = this.activeResponse) == null ? void 0 : _a21.abortController) this.activeResponse.abortController.abort();
		};
		this.id = id;
		this.transport = transport;
		this.generateId = generateId2;
		this.messageMetadataSchema = messageMetadataSchema;
		this.dataPartSchemas = dataPartSchemas;
		this.state = state;
		this.onError = onError;
		this.onToolCall = onToolCall;
		this.onFinish = onFinish;
		this.onData = onData;
		this.sendAutomaticallyWhen = sendAutomaticallyWhen;
	}
	/**
	* Hook status:
	*
	* - `submitted`: The message has been sent to the API and we're awaiting the start of the response stream.
	* - `streaming`: The response is actively streaming in from the API, receiving chunks of data.
	* - `ready`: The full response has been received and processed; a new user message can be submitted.
	* - `error`: An error occurred during the API request, preventing successful completion.
	*/
	get status() {
		return this.state.status;
	}
	setStatus({ status, error }) {
		if (this.status === status) return;
		this.state.status = status;
		this.state.error = error;
	}
	get error() {
		return this.state.error;
	}
	get messages() {
		return this.state.messages;
	}
	get lastMessage() {
		return this.state.messages[this.state.messages.length - 1];
	}
	set messages(messages) {
		this.state.messages = messages;
	}
	async shouldSendAutomatically() {
		if (!this.sendAutomaticallyWhen) return false;
		const result = this.sendAutomaticallyWhen({ messages: this.state.messages });
		if (result && typeof result === "object" && "then" in result) return await result;
		return result;
	}
	async makeRequest({ trigger, metadata, headers, body, messageId }) {
		var _a21, _b, _c;
		let resumeStream;
		if (trigger === "resume-stream") try {
			const reconnect = await this.transport.reconnectToStream({
				chatId: this.id,
				metadata,
				headers,
				body
			});
			if (reconnect == null) return;
			resumeStream = reconnect;
		} catch (err) {
			if (this.onError && err instanceof Error) this.onError(err);
			this.setStatus({
				status: "error",
				error: err
			});
			return;
		}
		this.setStatus({
			status: "submitted",
			error: void 0
		});
		const lastMessage = this.lastMessage;
		let isAbort = false;
		let isDisconnect = false;
		let isError = false;
		try {
			const activeResponse = {
				state: createStreamingUIMessageState({
					lastMessage: this.state.snapshot(lastMessage),
					messageId: this.generateId()
				}),
				abortController: new AbortController()
			};
			activeResponse.abortController.signal.addEventListener("abort", () => {
				isAbort = true;
			});
			this.activeResponse = activeResponse;
			let stream;
			if (trigger === "resume-stream") stream = resumeStream;
			else stream = await this.transport.sendMessages({
				chatId: this.id,
				messages: this.state.messages,
				abortSignal: activeResponse.abortController.signal,
				metadata,
				headers,
				body,
				trigger,
				messageId
			});
			const runUpdateMessageJob = (job) => this.jobExecutor.run(() => job({
				state: activeResponse.state,
				write: () => {
					var _a22;
					this.setStatus({ status: "streaming" });
					if (activeResponse.state.message.id === ((_a22 = this.lastMessage) == null ? void 0 : _a22.id)) this.state.replaceMessage(this.state.messages.length - 1, activeResponse.state.message);
					else this.state.pushMessage(activeResponse.state.message);
				}
			}));
			await consumeStream({
				stream: processUIMessageStream({
					stream,
					onToolCall: this.onToolCall,
					onData: this.onData,
					messageMetadataSchema: this.messageMetadataSchema,
					dataPartSchemas: this.dataPartSchemas,
					runUpdateMessageJob,
					onError: (error) => {
						throw error;
					}
				}),
				onError: (error) => {
					throw error;
				}
			});
			this.setStatus({ status: "ready" });
		} catch (err) {
			if (isAbort || err.name === "AbortError") {
				isAbort = true;
				this.setStatus({ status: "ready" });
				return null;
			}
			isError = true;
			if (err instanceof TypeError && (err.message.toLowerCase().includes("fetch") || err.message.toLowerCase().includes("network"))) isDisconnect = true;
			if (this.onError && err instanceof Error) this.onError(err);
			this.setStatus({
				status: "error",
				error: err
			});
		} finally {
			try {
				(_b = this.onFinish) == null || _b.call(this, {
					message: this.activeResponse.state.message,
					messages: this.state.messages,
					isAbort,
					isDisconnect,
					isError,
					finishReason: (_a21 = this.activeResponse) == null ? void 0 : _a21.state.finishReason
				});
			} catch (err) {
				console.error(err);
			}
			this.activeResponse = void 0;
		}
		if (!isError && await this.shouldSendAutomatically()) await this.makeRequest({
			trigger: "submit-message",
			messageId: (_c = this.lastMessage) == null ? void 0 : _c.id,
			metadata,
			headers,
			body
		});
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@ai-sdk+react@3.0.182_react@19.2.6_zod@4.4.3/node_modules/@ai-sdk/react/dist/index.mjs
var import_throttleit = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	function throttle(function_, wait) {
		if (typeof function_ !== "function") throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
		let timeoutId;
		let lastCallTime = 0;
		return function throttled(...arguments_) {
			clearTimeout(timeoutId);
			const now = Date.now();
			const delayForNextCall = wait - (now - lastCallTime);
			if (delayForNextCall <= 0) {
				lastCallTime = now;
				function_.apply(this, arguments_);
			} else timeoutId = setTimeout(() => {
				lastCallTime = Date.now();
				function_.apply(this, arguments_);
			}, delayForNextCall);
		};
	}
	module.exports = throttle;
})))(), 1);
var __accessCheck = (obj, member, msg) => {
	if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
	__accessCheck(obj, member, "read from private field");
	return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
	if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
	member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
	__accessCheck(obj, member, "write to private field");
	setter ? setter.call(obj, value) : member.set(obj, value);
	return value;
};
function throttle(fn, waitMs) {
	return waitMs != null ? (0, import_throttleit.default)(fn, waitMs) : fn;
}
var _messages, _status, _error, _messagesCallbacks, _statusCallbacks, _errorCallbacks, _callMessagesCallbacks, _callStatusCallbacks, _callErrorCallbacks;
var ReactChatState = class {
	constructor(initialMessages = []) {
		__privateAdd(this, _messages, void 0);
		__privateAdd(this, _status, "ready");
		__privateAdd(this, _error, void 0);
		__privateAdd(this, _messagesCallbacks, /* @__PURE__ */ new Set());
		__privateAdd(this, _statusCallbacks, /* @__PURE__ */ new Set());
		__privateAdd(this, _errorCallbacks, /* @__PURE__ */ new Set());
		this.pushMessage = (message) => {
			__privateSet(this, _messages, __privateGet(this, _messages).concat(message));
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.popMessage = () => {
			__privateSet(this, _messages, __privateGet(this, _messages).slice(0, -1));
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.replaceMessage = (index, message) => {
			__privateSet(this, _messages, [
				...__privateGet(this, _messages).slice(0, index),
				this.snapshot(message),
				...__privateGet(this, _messages).slice(index + 1)
			]);
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.snapshot = (value) => structuredClone(value);
		this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => {
			const callback = throttleWaitMs ? throttle(onChange, throttleWaitMs) : onChange;
			__privateGet(this, _messagesCallbacks).add(callback);
			return () => {
				__privateGet(this, _messagesCallbacks).delete(callback);
			};
		};
		this["~registerStatusCallback"] = (onChange) => {
			__privateGet(this, _statusCallbacks).add(onChange);
			return () => {
				__privateGet(this, _statusCallbacks).delete(onChange);
			};
		};
		this["~registerErrorCallback"] = (onChange) => {
			__privateGet(this, _errorCallbacks).add(onChange);
			return () => {
				__privateGet(this, _errorCallbacks).delete(onChange);
			};
		};
		__privateAdd(this, _callMessagesCallbacks, () => {
			__privateGet(this, _messagesCallbacks).forEach((callback) => callback());
		});
		__privateAdd(this, _callStatusCallbacks, () => {
			__privateGet(this, _statusCallbacks).forEach((callback) => callback());
		});
		__privateAdd(this, _callErrorCallbacks, () => {
			__privateGet(this, _errorCallbacks).forEach((callback) => callback());
		});
		__privateSet(this, _messages, initialMessages);
	}
	get status() {
		return __privateGet(this, _status);
	}
	set status(newStatus) {
		__privateSet(this, _status, newStatus);
		__privateGet(this, _callStatusCallbacks).call(this);
	}
	get error() {
		return __privateGet(this, _error);
	}
	set error(newError) {
		__privateSet(this, _error, newError);
		__privateGet(this, _callErrorCallbacks).call(this);
	}
	get messages() {
		return __privateGet(this, _messages);
	}
	set messages(newMessages) {
		__privateSet(this, _messages, [...newMessages]);
		__privateGet(this, _callMessagesCallbacks).call(this);
	}
};
_messages = /* @__PURE__ */ new WeakMap();
_status = /* @__PURE__ */ new WeakMap();
_error = /* @__PURE__ */ new WeakMap();
_messagesCallbacks = /* @__PURE__ */ new WeakMap();
_statusCallbacks = /* @__PURE__ */ new WeakMap();
_errorCallbacks = /* @__PURE__ */ new WeakMap();
_callMessagesCallbacks = /* @__PURE__ */ new WeakMap();
_callStatusCallbacks = /* @__PURE__ */ new WeakMap();
_callErrorCallbacks = /* @__PURE__ */ new WeakMap();
var _state;
var Chat = class extends AbstractChat {
	constructor({ messages, ...init }) {
		const state = new ReactChatState(messages);
		super({
			...init,
			state
		});
		__privateAdd(this, _state, void 0);
		this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => __privateGet(this, _state)["~registerMessagesCallback"](onChange, throttleWaitMs);
		this["~registerStatusCallback"] = (onChange) => __privateGet(this, _state)["~registerStatusCallback"](onChange);
		this["~registerErrorCallback"] = (onChange) => __privateGet(this, _state)["~registerErrorCallback"](onChange);
		__privateSet(this, _state, state);
	}
};
_state = /* @__PURE__ */ new WeakMap();
function useChat({ experimental_throttle: throttleWaitMs, resume = false, ...options } = {}) {
	const callbacksRef = (0, import_react.useRef)(!("chat" in options) ? {
		onToolCall: options.onToolCall,
		onData: options.onData,
		onFinish: options.onFinish,
		onError: options.onError,
		sendAutomaticallyWhen: options.sendAutomaticallyWhen
	} : {});
	if (!("chat" in options)) callbacksRef.current = {
		onToolCall: options.onToolCall,
		onData: options.onData,
		onFinish: options.onFinish,
		onError: options.onError,
		sendAutomaticallyWhen: options.sendAutomaticallyWhen
	};
	const optionsWithCallbacks = {
		...options,
		onToolCall: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onToolCall) == null ? void 0 : _b.call(_a, arg);
		},
		onData: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onData) == null ? void 0 : _b.call(_a, arg);
		},
		onFinish: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onFinish) == null ? void 0 : _b.call(_a, arg);
		},
		onError: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onError) == null ? void 0 : _b.call(_a, arg);
		},
		sendAutomaticallyWhen: (arg) => {
			var _a, _b, _c;
			return (_c = (_b = (_a = callbacksRef.current).sendAutomaticallyWhen) == null ? void 0 : _b.call(_a, arg)) != null ? _c : false;
		}
	};
	const chatRef = (0, import_react.useRef)("chat" in options ? options.chat : new Chat(optionsWithCallbacks));
	if ("chat" in options && options.chat !== chatRef.current || "id" in options && chatRef.current.id !== options.id) chatRef.current = "chat" in options ? options.chat : new Chat(optionsWithCallbacks);
	const messages = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((update) => chatRef.current["~registerMessagesCallback"](update, throttleWaitMs), [throttleWaitMs, chatRef.current.id]), () => chatRef.current.messages, () => chatRef.current.messages);
	const status = (0, import_react.useSyncExternalStore)(chatRef.current["~registerStatusCallback"], () => chatRef.current.status, () => chatRef.current.status);
	const error = (0, import_react.useSyncExternalStore)(chatRef.current["~registerErrorCallback"], () => chatRef.current.error, () => chatRef.current.error);
	const setMessages = (0, import_react.useCallback)((messagesParam) => {
		if (typeof messagesParam === "function") messagesParam = messagesParam(chatRef.current.messages);
		chatRef.current.messages = messagesParam;
	}, [chatRef]);
	(0, import_react.useEffect)(() => {
		if (resume) chatRef.current.resumeStream();
	}, [resume, chatRef]);
	return {
		id: chatRef.current.id,
		messages,
		setMessages,
		sendMessage: chatRef.current.sendMessage,
		regenerate: chatRef.current.regenerate,
		clearError: chatRef.current.clearError,
		stop: chatRef.current.stop,
		error,
		resumeStream: chatRef.current.resumeStream,
		status,
		/**
		* @deprecated Use `addToolOutput` instead.
		*/
		addToolResult: chatRef.current.addToolOutput,
		addToolOutput: chatRef.current.addToolOutput,
		addToolApprovalResponse: chatRef.current.addToolApprovalResponse
	};
}
//#endregion
export { ZodRecord as $, unknown as $n, hostname as $t, ZodIPv6 as A, pipe as An, base64url as At, ZodNever as B, string as Bn, date as Bt, ZodEmoji as C, nonoptional as Cn, _instanceof as Ct, ZodFunction as D, object$1 as Dn, any as Dt, ZodFile as E, number as En, _void as Et, ZodLiteral as F, record as Fn, cidrv6 as Ft, ZodNumberFormat as G, symbol$1 as Gn, emoji as Gt, ZodNull as H, stringbool as Hn, discriminatedUnion as Ht, ZodMAC as I, refine as In, codec as It, ZodPipe as J, tuple as Jn, float32 as Jt, ZodObject as K, templateLiteral as Kn, exactOptional as Kt, ZodMap as L, schemas_exports as Ln, cuid as Lt, ZodJWT as M, preprocess as Mn, boolean as Mt, ZodKSUID as N, promise as Nn, check as Nt, ZodGUID as O, optional as On, array$1 as Ot, ZodLazy as P, readonly as Pn, cidrv4 as Pt, ZodReadonly as Q, union as Qn, hex as Qt, ZodNaN as R, set as Rn, cuid2 as Rt, ZodEmail as S, never as Sn, _function as St, ZodExactOptional as T, nullish as Tn, _undefined as Tt, ZodNullable as U, success as Un, e164 as Ut, ZodNonOptional as V, stringFormat as Vn, describe as Vt, ZodNumber as W, superRefine as Wn, email as Wt, ZodPreprocess as X, uint64 as Xn, guid as Xt, ZodPrefault as Y, uint32 as Yn, float64 as Yt, ZodPromise as Z, ulid as Zn, hash as Zt, ZodCustomStringFormat as _, map as _n, ZodXor as _t, ZodBase64 as a, invertCodec as an, xid as ar, ZodTemplateLiteral as at, ZodDiscriminatedUnion as b, nanoid as bn, _default as bt, ZodBigIntFormat as c, json$1 as cn, ZodISODateTime as cr, ZodType as ct, ZodCIDRv6 as d, ksuid as dn, datetime as dr, ZodUUID as dt, httpUrl as en, url as er, ZodSet as et, ZodCUID as f, lazy as fn, iso_exports as fr, ZodUndefined as ft, ZodCustom as g, mac as gn, ZodXID as gt, ZodCodec as h, looseRecord as hn, ZodVoid as ht, ZodArray as i, intersection as in, uuidv7 as ir, ZodSymbol as it, ZodIntersection as j, prefault as jn, bigint as jt, ZodIPv4 as k, partialRecord as kn, base64 as kt, ZodBoolean as l, jwt as ln, ZodISODuration as lr, ZodULID as lt, ZodCatch as m, looseObject as mn, ZodUnknown as mt, require_react as n, int32 as nn, uuidv4 as nr, ZodStringFormat as nt, ZodBase64URL as o, ipv4 as on, xor as or, ZodTransform as ot, ZodCUID2 as p, literal as pn, checks_exports as pr, ZodUnion as pt, ZodOptional as q, transform as qn, file as qt, ZodAny as r, int64 as rn, uuidv6 as rr, ZodSuccess as rt, ZodBigInt as s, ipv6 as sn, ZodISODate as sr, ZodTuple as st, useChat as t, int as tn, uuid as tr, ZodString as tt, ZodCIDRv4 as u, keyof as un, ZodISOTime as ur, ZodURL as ut, ZodDate as v, meta as vn, _ZodString as vt, ZodEnum as w, nullable as wn, _null as wt, ZodE164 as x, nativeEnum as xn, _enum as xt, ZodDefault as y, nan as yn, _catch as yt, ZodNanoID as z, strictObject as zn, custom as zt };
