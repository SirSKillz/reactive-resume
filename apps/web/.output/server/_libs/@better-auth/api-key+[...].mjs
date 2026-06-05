import { r as __exportAll } from "../../_runtime.mjs";
import { A as safeParse, An as _positive, C as encodeAsync, Ct as TimePrecision, D as safeDecodeAsync, E as safeDecode, En as _normalize, Fn as _slugify, Ft as _coercedNumber, Gi as treeifyError, Hi as flattenError, Hn as _toLowerCase, In as _startsWith, It as _coercedString, Jt as _gt, Ki as clone, Li as regexes_exports, M as ZodError, Mt as _coercedBigint, N as ZodRealError, Nn as _regex, Nt as _coercedBoolean, O as safeEncode, P as core_exports, Pn as _size, Pt as _coercedDate, S as encode$2, Sn as _negative, T as parseAsync, Tn as _nonpositive, Ui as formatError, Un as _toUpperCase, Wi as prettifyError, Wn as _trim, Wt as _endsWith, Xn as _uppercase, Yt as _gte, Zt as _includes, _n as _minLength, aa as util_exports, b as decode$1, cr as globalRegistry, dn as _lt, dr as en_default, fn as _lte, gn as _mime, hn as _maxSize, j as safeParseAsync, jn as _property, k as safeEncodeAsync, kn as _overwrite, la as NEVER, ln as _length, lr as registry, mn as _maxLength, mt as toJSONSchema, or as $input, sa as $brand, sr as $output, ua as config, un as _lowercase, ur as locales_exports, vn as _minSize, w as parse$1, wn as _nonnegative, x as decodeAsync, yn as _multipleOf } from "../@ai-sdk/provider-utils+[...].mjs";
import { $ as ZodRecord, $n as unknown, $t as hostname, A as ZodIPv6, An as pipe, At as base64url, B as ZodNever, Bn as string$1, Bt as date$1, C as ZodEmoji, Cn as nonoptional, Ct as _instanceof, D as ZodFunction, Dn as object, Dt as any, E as ZodFile, En as number$1, Et as _void, F as ZodLiteral, Fn as record, Ft as cidrv6, G as ZodNumberFormat, Gn as symbol$1, Gt as emoji, H as ZodNull, Hn as stringbool, Ht as discriminatedUnion, I as ZodMAC, In as refine, It as codec, J as ZodPipe, Jn as tuple, Jt as float32, K as ZodObject, Kn as templateLiteral, Kt as exactOptional, L as ZodMap, Ln as schemas_exports, Lt as cuid, M as ZodJWT, Mn as preprocess, Mt as boolean$1, N as ZodKSUID, Nn as promise, Nt as check$1, O as ZodGUID, On as optional, Ot as array, P as ZodLazy, Pn as readonly, Pt as cidrv4, Q as ZodReadonly, Qn as union, Qt as hex$1, R as ZodNaN, Rn as set, Rt as cuid2, S as ZodEmail, Sn as never, St as _function, T as ZodExactOptional, Tn as nullish, Tt as _undefined, U as ZodNullable, Un as success, Ut as e164, V as ZodNonOptional, Vn as stringFormat, Vt as describe, W as ZodNumber, Wn as superRefine, Wt as email, X as ZodPreprocess, Xn as uint64, Xt as guid, Y as ZodPrefault, Yn as uint32, Yt as float64, Z as ZodPromise, Zn as ulid, Zt as hash, _ as ZodCustomStringFormat, _n as map, _t as ZodXor, a as ZodBase64, an as invertCodec, ar as xid, at as ZodTemplateLiteral, b as ZodDiscriminatedUnion, bn as nanoid, bt as _default, c as ZodBigIntFormat, cn as json, cr as ZodISODateTime, ct as ZodType, d as ZodCIDRv6, dn as ksuid, dt as ZodUUID, en as httpUrl, er as url, et as ZodSet, f as ZodCUID, fn as lazy, fr as iso_exports, ft as ZodUndefined, g as ZodCustom, gn as mac, gt as ZodXID, h as ZodCodec, hn as looseRecord, ht as ZodVoid, i as ZodArray, in as intersection, ir as uuidv7, it as ZodSymbol, j as ZodIntersection, jn as prefault, jt as bigint$1, k as ZodIPv4, kn as partialRecord, kt as base64$1, l as ZodBoolean, ln as jwt, lr as ZodISODuration, lt as ZodULID, m as ZodCatch, mn as looseObject, mt as ZodUnknown, nn as int32, nr as uuidv4, nt as ZodStringFormat, o as ZodBase64URL, on as ipv4, or as xor, ot as ZodTransform, p as ZodCUID2, pn as literal, pr as checks_exports, pt as ZodUnion, q as ZodOptional, qn as transform$1, qt as file, r as ZodAny, rn as int64, rr as uuidv6, rt as ZodSuccess, s as ZodBigInt, sn as ipv6, sr as ZodISODate, st as ZodTuple, tn as int, tr as uuid, tt as ZodString, u as ZodCIDRv4, un as keyof, ur as ZodISOTime, ut as ZodURL, v as ZodDate, vn as meta, vt as _ZodString, w as ZodEnum, wn as nullable, wt as _null, x as ZodE164, xn as nativeEnum, xt as _enum, y as ZodDefault, yn as nan, yt as _catch, z as ZodNanoID, zn as strictObject, zt as custom } from "../@ai-sdk/react+[...].mjs";
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/compat.js
/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
var ZodIssueCode = {
	invalid_type: "invalid_type",
	too_big: "too_big",
	too_small: "too_small",
	invalid_format: "invalid_format",
	not_multiple_of: "not_multiple_of",
	unrecognized_keys: "unrecognized_keys",
	invalid_union: "invalid_union",
	invalid_key: "invalid_key",
	invalid_element: "invalid_element",
	invalid_value: "invalid_value",
	custom: "custom"
};
/** @deprecated Use `z.config(params)` instead. */
function setErrorMap(map) {
	config({ customError: map });
}
/** @deprecated Use `z.config()` instead. */
function getErrorMap() {
	return config().customError;
}
/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/from-json-schema.js
var z = {
	...schemas_exports,
	...checks_exports,
	iso: iso_exports
};
var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
	"$schema",
	"$ref",
	"$defs",
	"definitions",
	"$id",
	"id",
	"$comment",
	"$anchor",
	"$vocabulary",
	"$dynamicRef",
	"$dynamicAnchor",
	"type",
	"enum",
	"const",
	"anyOf",
	"oneOf",
	"allOf",
	"not",
	"properties",
	"required",
	"additionalProperties",
	"patternProperties",
	"propertyNames",
	"minProperties",
	"maxProperties",
	"items",
	"prefixItems",
	"additionalItems",
	"minItems",
	"maxItems",
	"uniqueItems",
	"contains",
	"minContains",
	"maxContains",
	"minLength",
	"maxLength",
	"pattern",
	"format",
	"minimum",
	"maximum",
	"exclusiveMinimum",
	"exclusiveMaximum",
	"multipleOf",
	"description",
	"default",
	"contentEncoding",
	"contentMediaType",
	"contentSchema",
	"unevaluatedItems",
	"unevaluatedProperties",
	"if",
	"then",
	"else",
	"dependentSchemas",
	"dependentRequired",
	"nullable",
	"readOnly"
]);
function detectVersion(schema, defaultTarget) {
	const $schema = schema.$schema;
	if ($schema === "https://json-schema.org/draft/2020-12/schema") return "draft-2020-12";
	if ($schema === "http://json-schema.org/draft-07/schema#") return "draft-7";
	if ($schema === "http://json-schema.org/draft-04/schema#") return "draft-4";
	return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
	if (!ref.startsWith("#")) throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
	const path = ref.slice(1).split("/").filter(Boolean);
	if (path.length === 0) return ctx.rootSchema;
	const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
	if (path[0] === defsKey) {
		const key = path[1];
		if (!key || !ctx.defs[key]) throw new Error(`Reference not found: ${ref}`);
		return ctx.defs[key];
	}
	throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
	if (schema.not !== void 0) {
		if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) return z.never();
		throw new Error("not is not supported in Zod (except { not: {} } for never)");
	}
	if (schema.unevaluatedItems !== void 0) throw new Error("unevaluatedItems is not supported");
	if (schema.unevaluatedProperties !== void 0) throw new Error("unevaluatedProperties is not supported");
	if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) throw new Error("Conditional schemas (if/then/else) are not supported");
	if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) throw new Error("dependentSchemas and dependentRequired are not supported");
	if (schema.$ref) {
		const refPath = schema.$ref;
		if (ctx.refs.has(refPath)) return ctx.refs.get(refPath);
		if (ctx.processing.has(refPath)) return z.lazy(() => {
			if (!ctx.refs.has(refPath)) throw new Error(`Circular reference not resolved: ${refPath}`);
			return ctx.refs.get(refPath);
		});
		ctx.processing.add(refPath);
		const zodSchema = convertSchema(resolveRef(refPath, ctx), ctx);
		ctx.refs.set(refPath, zodSchema);
		ctx.processing.delete(refPath);
		return zodSchema;
	}
	if (schema.enum !== void 0) {
		const enumValues = schema.enum;
		if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) return z.null();
		if (enumValues.length === 0) return z.never();
		if (enumValues.length === 1) return z.literal(enumValues[0]);
		if (enumValues.every((v) => typeof v === "string")) return z.enum(enumValues);
		const literalSchemas = enumValues.map((v) => z.literal(v));
		if (literalSchemas.length < 2) return literalSchemas[0];
		return z.union([
			literalSchemas[0],
			literalSchemas[1],
			...literalSchemas.slice(2)
		]);
	}
	if (schema.const !== void 0) return z.literal(schema.const);
	const type = schema.type;
	if (Array.isArray(type)) {
		const typeSchemas = type.map((t) => {
			return convertBaseSchema({
				...schema,
				type: t
			}, ctx);
		});
		if (typeSchemas.length === 0) return z.never();
		if (typeSchemas.length === 1) return typeSchemas[0];
		return z.union(typeSchemas);
	}
	if (!type) return z.any();
	let zodSchema;
	switch (type) {
		case "string": {
			let stringSchema = z.string();
			if (schema.format) {
				const format = schema.format;
				if (format === "email") stringSchema = stringSchema.check(z.email());
				else if (format === "uri" || format === "uri-reference") stringSchema = stringSchema.check(z.url());
				else if (format === "uuid" || format === "guid") stringSchema = stringSchema.check(z.uuid());
				else if (format === "date-time") stringSchema = stringSchema.check(z.iso.datetime());
				else if (format === "date") stringSchema = stringSchema.check(z.iso.date());
				else if (format === "time") stringSchema = stringSchema.check(z.iso.time());
				else if (format === "duration") stringSchema = stringSchema.check(z.iso.duration());
				else if (format === "ipv4") stringSchema = stringSchema.check(z.ipv4());
				else if (format === "ipv6") stringSchema = stringSchema.check(z.ipv6());
				else if (format === "mac") stringSchema = stringSchema.check(z.mac());
				else if (format === "cidr") stringSchema = stringSchema.check(z.cidrv4());
				else if (format === "cidr-v6") stringSchema = stringSchema.check(z.cidrv6());
				else if (format === "base64") stringSchema = stringSchema.check(z.base64());
				else if (format === "base64url") stringSchema = stringSchema.check(z.base64url());
				else if (format === "e164") stringSchema = stringSchema.check(z.e164());
				else if (format === "jwt") stringSchema = stringSchema.check(z.jwt());
				else if (format === "emoji") stringSchema = stringSchema.check(z.emoji());
				else if (format === "nanoid") stringSchema = stringSchema.check(z.nanoid());
				else if (format === "cuid") stringSchema = stringSchema.check(z.cuid());
				else if (format === "cuid2") stringSchema = stringSchema.check(z.cuid2());
				else if (format === "ulid") stringSchema = stringSchema.check(z.ulid());
				else if (format === "xid") stringSchema = stringSchema.check(z.xid());
				else if (format === "ksuid") stringSchema = stringSchema.check(z.ksuid());
			}
			if (typeof schema.minLength === "number") stringSchema = stringSchema.min(schema.minLength);
			if (typeof schema.maxLength === "number") stringSchema = stringSchema.max(schema.maxLength);
			if (schema.pattern) stringSchema = stringSchema.regex(new RegExp(schema.pattern));
			zodSchema = stringSchema;
			break;
		}
		case "number":
		case "integer": {
			let numberSchema = type === "integer" ? z.number().int() : z.number();
			if (typeof schema.minimum === "number") numberSchema = numberSchema.min(schema.minimum);
			if (typeof schema.maximum === "number") numberSchema = numberSchema.max(schema.maximum);
			if (typeof schema.exclusiveMinimum === "number") numberSchema = numberSchema.gt(schema.exclusiveMinimum);
			else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") numberSchema = numberSchema.gt(schema.minimum);
			if (typeof schema.exclusiveMaximum === "number") numberSchema = numberSchema.lt(schema.exclusiveMaximum);
			else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") numberSchema = numberSchema.lt(schema.maximum);
			if (typeof schema.multipleOf === "number") numberSchema = numberSchema.multipleOf(schema.multipleOf);
			zodSchema = numberSchema;
			break;
		}
		case "boolean":
			zodSchema = z.boolean();
			break;
		case "null":
			zodSchema = z.null();
			break;
		case "object": {
			const shape = {};
			const properties = schema.properties || {};
			const requiredSet = new Set(schema.required || []);
			for (const [key, propSchema] of Object.entries(properties)) {
				const propZodSchema = convertSchema(propSchema, ctx);
				shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
			}
			if (schema.propertyNames) {
				const keySchema = convertSchema(schema.propertyNames, ctx);
				const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
				if (Object.keys(shape).length === 0) {
					zodSchema = z.record(keySchema, valueSchema);
					break;
				}
				const objectSchema = z.object(shape).passthrough();
				const recordSchema = z.looseRecord(keySchema, valueSchema);
				zodSchema = z.intersection(objectSchema, recordSchema);
				break;
			}
			if (schema.patternProperties) {
				const patternProps = schema.patternProperties;
				const patternKeys = Object.keys(patternProps);
				const looseRecords = [];
				for (const pattern of patternKeys) {
					const patternValue = convertSchema(patternProps[pattern], ctx);
					const keySchema = z.string().regex(new RegExp(pattern));
					looseRecords.push(z.looseRecord(keySchema, patternValue));
				}
				const schemasToIntersect = [];
				if (Object.keys(shape).length > 0) schemasToIntersect.push(z.object(shape).passthrough());
				schemasToIntersect.push(...looseRecords);
				if (schemasToIntersect.length === 0) zodSchema = z.object({}).passthrough();
				else if (schemasToIntersect.length === 1) zodSchema = schemasToIntersect[0];
				else {
					let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
					for (let i = 2; i < schemasToIntersect.length; i++) result = z.intersection(result, schemasToIntersect[i]);
					zodSchema = result;
				}
				break;
			}
			const objectSchema = z.object(shape);
			if (schema.additionalProperties === false) zodSchema = objectSchema.strict();
			else if (typeof schema.additionalProperties === "object") zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
			else zodSchema = objectSchema.passthrough();
			break;
		}
		case "array": {
			const prefixItems = schema.prefixItems;
			const items = schema.items;
			if (prefixItems && Array.isArray(prefixItems)) {
				const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
				const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
				if (rest) zodSchema = z.tuple(tupleItems).rest(rest);
				else zodSchema = z.tuple(tupleItems);
				if (typeof schema.minItems === "number") zodSchema = zodSchema.check(z.minLength(schema.minItems));
				if (typeof schema.maxItems === "number") zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
			} else if (Array.isArray(items)) {
				const tupleItems = items.map((item) => convertSchema(item, ctx));
				const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
				if (rest) zodSchema = z.tuple(tupleItems).rest(rest);
				else zodSchema = z.tuple(tupleItems);
				if (typeof schema.minItems === "number") zodSchema = zodSchema.check(z.minLength(schema.minItems));
				if (typeof schema.maxItems === "number") zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
			} else if (items !== void 0) {
				const element = convertSchema(items, ctx);
				let arraySchema = z.array(element);
				if (typeof schema.minItems === "number") arraySchema = arraySchema.min(schema.minItems);
				if (typeof schema.maxItems === "number") arraySchema = arraySchema.max(schema.maxItems);
				zodSchema = arraySchema;
			} else zodSchema = z.array(z.any());
			break;
		}
		default: throw new Error(`Unsupported type: ${type}`);
	}
	return zodSchema;
}
function convertSchema(schema, ctx) {
	if (typeof schema === "boolean") return schema ? z.any() : z.never();
	let baseSchema = convertBaseSchema(schema, ctx);
	const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
	if (schema.anyOf && Array.isArray(schema.anyOf)) {
		const options = schema.anyOf.map((s) => convertSchema(s, ctx));
		const anyOfUnion = z.union(options);
		baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
	}
	if (schema.oneOf && Array.isArray(schema.oneOf)) {
		const options = schema.oneOf.map((s) => convertSchema(s, ctx));
		const oneOfUnion = z.xor(options);
		baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
	}
	if (schema.allOf && Array.isArray(schema.allOf)) if (schema.allOf.length === 0) baseSchema = hasExplicitType ? baseSchema : z.any();
	else {
		let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
		const startIdx = hasExplicitType ? 0 : 1;
		for (let i = startIdx; i < schema.allOf.length; i++) result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
		baseSchema = result;
	}
	if (schema.nullable === true && ctx.version === "openapi-3.0") baseSchema = z.nullable(baseSchema);
	if (schema.readOnly === true) baseSchema = z.readonly(baseSchema);
	if (schema.default !== void 0) baseSchema = baseSchema.default(schema.default);
	const extraMeta = {};
	for (const key of [
		"$id",
		"id",
		"$comment",
		"$anchor",
		"$vocabulary",
		"$dynamicRef",
		"$dynamicAnchor"
	]) if (key in schema) extraMeta[key] = schema[key];
	for (const key of [
		"contentEncoding",
		"contentMediaType",
		"contentSchema"
	]) if (key in schema) extraMeta[key] = schema[key];
	for (const key of Object.keys(schema)) if (!RECOGNIZED_KEYS.has(key)) extraMeta[key] = schema[key];
	if (Object.keys(extraMeta).length > 0) ctx.registry.add(baseSchema, extraMeta);
	if (schema.description) baseSchema = baseSchema.describe(schema.description);
	return baseSchema;
}
/**
* Converts a JSON Schema to a Zod schema. This function should be considered semi-experimental. It's behavior is liable to change. */
function fromJSONSchema(schema, params) {
	if (typeof schema === "boolean") return schema ? z.any() : z.never();
	let normalized;
	try {
		normalized = JSON.parse(JSON.stringify(schema));
	} catch {
		throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
	}
	const ctx = {
		version: detectVersion(normalized, params?.defaultTarget),
		defs: normalized.$defs || normalized.definitions || {},
		refs: /* @__PURE__ */ new Map(),
		processing: /* @__PURE__ */ new Set(),
		rootSchema: normalized,
		registry: params?.registry ?? globalRegistry
	};
	return convertSchema(normalized, ctx);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/coerce.js
var coerce_exports = /* @__PURE__ */ __exportAll({
	bigint: () => bigint,
	boolean: () => boolean,
	date: () => date,
	number: () => number,
	string: () => string
});
function string(params) {
	return _coercedString(ZodString, params);
}
function number(params) {
	return _coercedNumber(ZodNumber, params);
}
function boolean(params) {
	return _coercedBoolean(ZodBoolean, params);
}
function bigint(params) {
	return _coercedBigint(ZodBigInt, params);
}
function date(params) {
	return _coercedDate(ZodDate, params);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/external.js
var external_exports = /* @__PURE__ */ __exportAll({
	$brand: () => $brand,
	$input: () => $input,
	$output: () => $output,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
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
	ZodError: () => ZodError,
	ZodExactOptional: () => ZodExactOptional,
	ZodFile: () => ZodFile,
	ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
	ZodFunction: () => ZodFunction,
	ZodGUID: () => ZodGUID,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	ZodIntersection: () => ZodIntersection,
	ZodIssueCode: () => ZodIssueCode,
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
	ZodRealError: () => ZodRealError,
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
	array: () => array,
	base64: () => base64$1,
	base64url: () => base64url,
	bigint: () => bigint$1,
	boolean: () => boolean$1,
	catch: () => _catch,
	check: () => check$1,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	clone: () => clone,
	codec: () => codec,
	coerce: () => coerce_exports,
	config: () => config,
	core: () => core_exports,
	cuid: () => cuid,
	cuid2: () => cuid2,
	custom: () => custom,
	date: () => date$1,
	decode: () => decode$1,
	decodeAsync: () => decodeAsync,
	describe: () => describe,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	encode: () => encode$2,
	encodeAsync: () => encodeAsync,
	endsWith: () => _endsWith,
	enum: () => _enum,
	exactOptional: () => exactOptional,
	file: () => file,
	flattenError: () => flattenError,
	float32: () => float32,
	float64: () => float64,
	formatError: () => formatError,
	fromJSONSchema: () => fromJSONSchema,
	function: () => _function,
	getErrorMap: () => getErrorMap,
	globalRegistry: () => globalRegistry,
	gt: () => _gt,
	gte: () => _gte,
	guid: () => guid,
	hash: () => hash,
	hex: () => hex$1,
	hostname: () => hostname,
	httpUrl: () => httpUrl,
	includes: () => _includes,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	invertCodec: () => invertCodec,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	iso: () => iso_exports,
	json: () => json,
	jwt: () => jwt,
	keyof: () => keyof,
	ksuid: () => ksuid,
	lazy: () => lazy,
	length: () => _length,
	literal: () => literal,
	locales: () => locales_exports,
	looseObject: () => looseObject,
	looseRecord: () => looseRecord,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	mac: () => mac,
	map: () => map,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	meta: () => meta,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	nan: () => nan,
	nanoid: () => nanoid,
	nativeEnum: () => nativeEnum,
	negative: () => _negative,
	never: () => never,
	nonnegative: () => _nonnegative,
	nonoptional: () => nonoptional,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	null: () => _null,
	nullable: () => nullable,
	nullish: () => nullish,
	number: () => number$1,
	object: () => object,
	optional: () => optional,
	overwrite: () => _overwrite,
	parse: () => parse$1,
	parseAsync: () => parseAsync,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	positive: () => _positive,
	prefault: () => prefault,
	preprocess: () => preprocess,
	prettifyError: () => prettifyError,
	promise: () => promise,
	property: () => _property,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	regex: () => _regex,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeDecode: () => safeDecode,
	safeDecodeAsync: () => safeDecodeAsync,
	safeEncode: () => safeEncode,
	safeEncodeAsync: () => safeEncodeAsync,
	safeParse: () => safeParse,
	safeParseAsync: () => safeParseAsync,
	set: () => set,
	setErrorMap: () => setErrorMap,
	size: () => _size,
	slugify: () => _slugify,
	startsWith: () => _startsWith,
	strictObject: () => strictObject,
	string: () => string$1,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol$1,
	templateLiteral: () => templateLiteral,
	toJSONSchema: () => toJSONSchema,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	transform: () => transform$1,
	treeifyError: () => treeifyError,
	trim: () => _trim,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid,
	undefined: () => _undefined,
	union: () => union,
	unknown: () => unknown,
	uppercase: () => _uppercase,
	url: () => url,
	util: () => util_exports,
	uuid: () => uuid,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	void: () => _void,
	xid: () => xid,
	xor: () => xor
});
config(en_default());
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/index.js
var zod_default = external_exports;
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/error-codes.mjs
function defineErrorCodes(codes) {
	return Object.fromEntries(Object.entries(codes).map(([key, value]) => [key, {
		code: key,
		message: value,
		toString: () => key
	}]));
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+api-key@1.6.11_4b02081a4327d0bc2ec8c25cb65be4e6/node_modules/@better-auth/api-key/dist/version-CwRZx9_C.mjs
var API_KEY_ERROR_CODES = defineErrorCodes({
	INVALID_METADATA_TYPE: "metadata must be an object or undefined",
	REFILL_AMOUNT_AND_INTERVAL_REQUIRED: "refillAmount is required when refillInterval is provided",
	REFILL_INTERVAL_AND_AMOUNT_REQUIRED: "refillInterval is required when refillAmount is provided",
	USER_BANNED: "User is banned",
	UNAUTHORIZED_SESSION: "Unauthorized or invalid session",
	KEY_NOT_FOUND: "API Key not found",
	KEY_DISABLED: "API Key is disabled",
	KEY_EXPIRED: "API Key has expired",
	USAGE_EXCEEDED: "API Key has reached its usage limit",
	KEY_NOT_RECOVERABLE: "API Key is not recoverable",
	EXPIRES_IN_IS_TOO_SMALL: "The expiresIn is smaller than the predefined minimum value.",
	EXPIRES_IN_IS_TOO_LARGE: "The expiresIn is larger than the predefined maximum value.",
	INVALID_REMAINING: "The remaining count is either too large or too small.",
	INVALID_PREFIX_LENGTH: "The prefix length is either too large or too small.",
	INVALID_NAME_LENGTH: "The name length is either too large or too small.",
	METADATA_DISABLED: "Metadata is disabled.",
	RATE_LIMIT_EXCEEDED: "Rate limit exceeded.",
	NO_VALUES_TO_UPDATE: "No values to update.",
	KEY_DISABLED_EXPIRATION: "Custom key expiration values are disabled.",
	INVALID_API_KEY: "Invalid API key.",
	INVALID_USER_ID_FROM_API_KEY: "The user id from the API key is invalid.",
	INVALID_REFERENCE_ID_FROM_API_KEY: "The reference id from the API key is invalid.",
	INVALID_API_KEY_GETTER_RETURN_TYPE: "API Key getter returned an invalid key type. Expected string.",
	SERVER_ONLY_PROPERTY: "The property you're trying to set can only be set from the server auth instance only.",
	FAILED_TO_UPDATE_API_KEY: "Failed to update API key",
	NAME_REQUIRED: "API Key name is required.",
	ORGANIZATION_ID_REQUIRED: "Organization ID is required for organization-owned API keys.",
	USER_NOT_MEMBER_OF_ORGANIZATION: "You are not a member of the organization that owns this API key.",
	INSUFFICIENT_API_KEY_PERMISSIONS: "You do not have permission to perform this action on organization API keys.",
	NO_DEFAULT_API_KEY_CONFIGURATION_FOUND: "No default api-key configuration found.",
	ORGANIZATION_PLUGIN_REQUIRED: "Organization plugin is required for organization-owned API keys. Please install and configure the organization plugin."
});
var PACKAGE_VERSION = "1.6.11";
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/context/global.mjs
var symbol = Symbol.for("better-auth:global");
var bind = null;
var __context = {};
var __betterAuthVersion = "1.6.11";
/**
* We store context instance in the globalThis.
*
* The reason we do this is that some bundlers, web framework, or package managers might
* create multiple copies of BetterAuth in the same process intentionally or unintentionally.
*
* For example, yarn v1, Next.js, SSR, Vite...
*
* @internal
*/
function __getBetterAuthGlobal() {
	if (!globalThis[symbol]) {
		globalThis[symbol] = {
			version: __betterAuthVersion,
			epoch: 1,
			context: __context
		};
		bind = globalThis[symbol];
	}
	bind = globalThis[symbol];
	if (bind.version !== __betterAuthVersion) {
		bind.version = __betterAuthVersion;
		bind.epoch++;
	}
	return globalThis[symbol];
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/async_hooks/index.mjs
var AsyncLocalStoragePromise = import(
	/* @vite-ignore */
	/* webpackIgnore: true */
	"node:async_hooks"
).then((mod) => mod.AsyncLocalStorage).catch((err) => {
	if ("AsyncLocalStorage" in globalThis) return globalThis.AsyncLocalStorage;
	if (typeof window !== "undefined") return null;
	console.warn("[better-auth] Warning: AsyncLocalStorage is not available in this environment. Some features may not work as expected.");
	console.warn("[better-auth] Please read more about this warning at https://better-auth.com/docs/installation#mount-handler");
	console.warn("[better-auth] If you are using Cloudflare Workers, please see: https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag");
	throw err;
});
async function getAsyncLocalStorage() {
	const mod = await AsyncLocalStoragePromise;
	if (mod === null) throw new Error("getAsyncLocalStorage is only available in server code");
	else return mod;
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/context/endpoint-context.mjs
var ensureAsyncStorage$1 = async () => {
	const betterAuthGlobal = __getBetterAuthGlobal();
	if (!betterAuthGlobal.context.endpointContextAsyncStorage) {
		const AsyncLocalStorage = await getAsyncLocalStorage();
		betterAuthGlobal.context.endpointContextAsyncStorage = new AsyncLocalStorage();
	}
	return betterAuthGlobal.context.endpointContextAsyncStorage;
};
async function getCurrentAuthContext() {
	const context = (await ensureAsyncStorage$1()).getStore();
	if (!context) throw new Error("No auth context found. Please make sure you are calling this function within a `runWithEndpointContext` callback.");
	return context;
}
async function runWithEndpointContext(context, fn) {
	return (await ensureAsyncStorage$1()).run(context, fn);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/error/codes.mjs
var BASE_ERROR_CODES = defineErrorCodes({
	USER_NOT_FOUND: "User not found",
	FAILED_TO_CREATE_USER: "Failed to create user",
	FAILED_TO_CREATE_SESSION: "Failed to create session",
	FAILED_TO_UPDATE_USER: "Failed to update user",
	FAILED_TO_GET_SESSION: "Failed to get session",
	INVALID_PASSWORD: "Invalid password",
	INVALID_EMAIL: "Invalid email",
	INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
	INVALID_USER: "Invalid user",
	SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked",
	PROVIDER_NOT_FOUND: "Provider not found",
	INVALID_TOKEN: "Invalid token",
	TOKEN_EXPIRED: "Token expired",
	ID_TOKEN_NOT_SUPPORTED: "id_token not supported",
	FAILED_TO_GET_USER_INFO: "Failed to get user info",
	USER_EMAIL_NOT_FOUND: "User email not found",
	EMAIL_NOT_VERIFIED: "Email not verified",
	PASSWORD_TOO_SHORT: "Password too short",
	PASSWORD_TOO_LONG: "Password too long",
	USER_ALREADY_EXISTS: "User already exists.",
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.",
	EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated",
	CHANGE_EMAIL_DISABLED: "Change email is disabled",
	CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found",
	SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.",
	FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account",
	ACCOUNT_NOT_FOUND: "Account not found",
	USER_ALREADY_HAS_PASSWORD: "User already has a password. Provide that to delete the account.",
	CROSS_SITE_NAVIGATION_LOGIN_BLOCKED: "Cross-site navigation login blocked. This request appears to be a CSRF attack.",
	VERIFICATION_EMAIL_NOT_ENABLED: "Verification email isn't enabled",
	EMAIL_ALREADY_VERIFIED: "Email is already verified",
	EMAIL_MISMATCH: "Email mismatch",
	SESSION_NOT_FRESH: "Session is not fresh",
	LINKED_ACCOUNT_ALREADY_EXISTS: "Linked account already exists",
	INVALID_ORIGIN: "Invalid origin",
	INVALID_CALLBACK_URL: "Invalid callbackURL",
	INVALID_REDIRECT_URL: "Invalid redirectURL",
	INVALID_ERROR_CALLBACK_URL: "Invalid errorCallbackURL",
	INVALID_NEW_USER_CALLBACK_URL: "Invalid newUserCallbackURL",
	MISSING_OR_NULL_ORIGIN: "Missing or null Origin",
	CALLBACK_URL_REQUIRED: "callbackURL is required",
	FAILED_TO_CREATE_VERIFICATION: "Unable to create verification",
	FIELD_NOT_ALLOWED: "Field not allowed to be set",
	ASYNC_VALIDATION_NOT_SUPPORTED: "Async validation is not supported",
	VALIDATION_ERROR: "Validation Error",
	MISSING_FIELD: "Field is required",
	METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED: "POST method requires deferSessionRefresh to be enabled in session config",
	BODY_MUST_BE_AN_OBJECT: "Body must be an object",
	PASSWORD_ALREADY_SET: "User already has a password set"
});
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/error.mjs
function isErrorStackTraceLimitWritable() {
	const desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
	if (desc === void 0) return Object.isExtensible(Error);
	return Object.prototype.hasOwnProperty.call(desc, "writable") ? desc.writable : desc.set !== void 0;
}
/**
* Hide internal stack frames from the error stack trace.
*/
function hideInternalStackFrames(stack) {
	const lines = stack.split("\n    at ");
	if (lines.length <= 1) return stack;
	lines.splice(1, 1);
	return lines.join("\n    at ");
}
/**
* Creates a custom error class that hides stack frames.
*/
function makeErrorForHideStackFrame(Base, clazz) {
	class HideStackFramesError extends Base {
		#hiddenStack;
		constructor(...args) {
			if (isErrorStackTraceLimitWritable()) {
				const limit = Error.stackTraceLimit;
				Error.stackTraceLimit = 0;
				super(...args);
				Error.stackTraceLimit = limit;
			} else super(...args);
			const stack = (/* @__PURE__ */ new Error()).stack;
			if (stack) this.#hiddenStack = hideInternalStackFrames(stack.replace(/^Error/, this.name));
		}
		get errorStack() {
			return this.#hiddenStack;
		}
	}
	Object.defineProperty(HideStackFramesError.prototype, "constructor", {
		get() {
			return clazz;
		},
		enumerable: false,
		configurable: true
	});
	return HideStackFramesError;
}
var statusCodes = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	SEE_OTHER: 303,
	NOT_MODIFIED: 304,
	TEMPORARY_REDIRECT: 307,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	"I'M_A_TEAPOT": 418,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_ENTITY: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NOT_EXTENDED: 510,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var InternalAPIError = class extends Error {
	constructor(status = "INTERNAL_SERVER_ERROR", body = void 0, headers = {}, statusCode = typeof status === "number" ? status : statusCodes[status]) {
		super(body?.message, body?.cause ? { cause: body.cause } : void 0);
		this.status = status;
		this.body = body;
		this.headers = headers;
		this.statusCode = statusCode;
		this.name = "APIError";
		this.status = status;
		this.headers = headers;
		this.statusCode = statusCode;
		this.body = body;
	}
};
var ValidationError = class extends InternalAPIError {
	constructor(message, issues) {
		super(400, {
			message,
			code: "VALIDATION_ERROR"
		});
		this.message = message;
		this.issues = issues;
		this.issues = issues;
	}
};
var BetterCallError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "BetterCallError";
	}
};
var kAPIErrorHeaderSymbol = Symbol.for("better-call:api-error-headers");
var APIError$1 = makeErrorForHideStackFrame(InternalAPIError, Error);
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/error/index.mjs
var BetterAuthError = class extends Error {
	constructor(message, options) {
		super(message, options);
		this.name = "BetterAuthError";
		this.message = message;
		this.stack = "";
	}
};
var APIError = class APIError extends APIError$1 {
	constructor(...args) {
		super(...args);
	}
	static fromStatus(status, body) {
		return new APIError(status, body);
	}
	static from(status, error) {
		return new APIError(status, {
			message: error.message,
			code: error.code
		});
	}
};
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/utils.mjs
function isAPIError$2(error) {
	return error instanceof APIError$1 || error?.name === "APIError";
}
function tryDecode$1(str) {
	try {
		return str.includes("%") ? decodeURIComponent(str) : str;
	} catch {
		return str;
	}
}
async function tryCatch(promise) {
	try {
		return {
			data: await promise,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error
		};
	}
}
/**
* Check if an object is a `Request`
* - `instanceof`: works for native Request instances
* - `toString`: handles where instanceof check fails but the object is still a valid Request
*/
function isRequest(obj) {
	return obj instanceof Request || Object.prototype.toString.call(obj) === "[object Request]";
}
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/to-response.mjs
function isJSONSerializable(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function safeStringify(obj, replacer, space) {
	let id = 0;
	const seen = /* @__PURE__ */ new WeakMap();
	const safeReplacer = (key, value) => {
		if (typeof value === "bigint") return value.toString();
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) return `[Circular ref-${seen.get(value)}]`;
			seen.set(value, id++);
		}
		if (replacer) return replacer(key, value);
		return value;
	};
	return JSON.stringify(obj, safeReplacer, space);
}
function isJSONResponse(value) {
	if (!value || typeof value !== "object") return false;
	return "_flag" in value && value._flag === "json";
}
/**
* Headers that MUST be stripped when building an HTTP response from
* arbitrary header input. These are request-only, hop-by-hop, or
* transport-managed headers that cause protocol violations when present
* on responses (e.g. Content-Length mismatch → net::ERR_CONTENT_LENGTH_MISMATCH).
*
* Sources:
*   - RFC 9110 §10.1   (Request Context Fields)
*   - RFC 9110 §7.6.1  (Connection / hop-by-hop)
*   - RFC 9110 §11.6-7 (Authentication credentials)
*   - RFC 9110 §12.5   (Content negotiation)
*   - RFC 9110 §13.1   (Conditional request headers)
*   - RFC 9110 §14.2   (Range requests)
*   - RFC 6265 §5.4    (Cookie)
*   - RFC 6454         (Origin)
*/
var REQUEST_ONLY_HEADERS = new Set([
	"host",
	"user-agent",
	"referer",
	"from",
	"expect",
	"authorization",
	"proxy-authorization",
	"cookie",
	"origin",
	"accept-charset",
	"accept-encoding",
	"accept-language",
	"if-match",
	"if-none-match",
	"if-modified-since",
	"if-unmodified-since",
	"if-range",
	"range",
	"max-forwards",
	"connection",
	"keep-alive",
	"transfer-encoding",
	"te",
	"upgrade",
	"trailer",
	"proxy-connection",
	"content-length"
]);
function stripRequestOnlyHeaders(headers) {
	for (const name of REQUEST_ONLY_HEADERS) headers.delete(name);
}
function toResponse(data, init) {
	if (data instanceof Response) {
		if (init?.headers) {
			const safeHeaders = new Headers(init.headers);
			stripRequestOnlyHeaders(safeHeaders);
			safeHeaders.forEach((value, key) => {
				data.headers.set(key, value);
			});
		}
		return data;
	}
	if (isJSONResponse(data)) {
		const body = data.body;
		const routerResponse = data.routerResponse;
		if (routerResponse instanceof Response) return routerResponse;
		const headers = new Headers();
		if (routerResponse?.headers) {
			const headers = new Headers(routerResponse.headers);
			for (const [key, value] of headers.entries()) headers.set(key, value);
		}
		if (data.headers) for (const [key, value] of new Headers(data.headers).entries()) headers.set(key, value);
		if (init?.headers) {
			const safeHeaders = new Headers(init.headers);
			stripRequestOnlyHeaders(safeHeaders);
			for (const [key, value] of safeHeaders.entries()) headers.set(key, value);
		}
		headers.set("Content-Type", "application/json");
		return new Response(JSON.stringify(body), {
			...routerResponse,
			headers,
			status: data.status ?? init?.status ?? routerResponse?.status,
			statusText: init?.statusText ?? routerResponse?.statusText
		});
	}
	if (isAPIError$2(data)) return toResponse(data.body, {
		status: init?.status ?? data.statusCode,
		statusText: data.status.toString(),
		headers: init?.headers || data.headers
	});
	let body = data;
	const headers = new Headers(init?.headers);
	stripRequestOnlyHeaders(headers);
	if (!data) {
		if (data === null) body = JSON.stringify(null);
		headers.set("content-type", "application/json");
	} else if (typeof data === "string") {
		body = data;
		headers.set("Content-Type", "text/plain");
	} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
		body = data;
		headers.set("Content-Type", "application/octet-stream");
	} else if (data instanceof Blob) {
		body = data;
		headers.set("Content-Type", data.type || "application/octet-stream");
	} else if (data instanceof FormData) body = data;
	else if (data instanceof URLSearchParams) {
		body = data;
		headers.set("Content-Type", "application/x-www-form-urlencoded");
	} else if (data instanceof ReadableStream) {
		body = data;
		headers.set("Content-Type", "application/octet-stream");
	} else if (isJSONSerializable(data)) {
		body = safeStringify(data);
		headers.set("Content-Type", "application/json");
	}
	return new Response(body, {
		...init,
		headers
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/index.mjs
function getWebcryptoSubtle() {
	const cr = typeof globalThis !== "undefined" && globalThis.crypto;
	if (cr && typeof cr.subtle === "object" && cr.subtle != null) return cr.subtle;
	throw new Error("crypto.subtle must be defined");
}
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/crypto.mjs
var algorithm$1 = {
	name: "HMAC",
	hash: "SHA-256"
};
var getCryptoKey$3 = async (secret) => {
	const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
	return await getWebcryptoSubtle().importKey("raw", secretBuf, algorithm$1, false, ["sign", "verify"]);
};
var verifySignature = async (base64Signature, value, secret) => {
	try {
		const signatureBinStr = atob(base64Signature);
		const signature = new Uint8Array(signatureBinStr.length);
		for (let i = 0, len = signatureBinStr.length; i < len; i++) signature[i] = signatureBinStr.charCodeAt(i);
		return await getWebcryptoSubtle().verify(algorithm$1, secret, signature, new TextEncoder().encode(value));
	} catch (e) {
		return false;
	}
};
var makeSignature$1 = async (value, secret) => {
	const key = await getCryptoKey$3(secret);
	const signature = await getWebcryptoSubtle().sign(algorithm$1.name, key, new TextEncoder().encode(value));
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
var signCookieValue = async (value, secret) => {
	const signature = await makeSignature$1(value, secret);
	value = `${value}.${signature}`;
	value = encodeURIComponent(value);
	return value;
};
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/cookies.mjs
var getCookieKey = (key, prefix) => {
	let finalKey = key;
	if (prefix) if (prefix === "secure") finalKey = "__Secure-" + key;
	else if (prefix === "host") finalKey = "__Host-" + key;
	else return;
	return finalKey;
};
/**
* Parse an HTTP Cookie header string and returning an object of all cookie
* name-value pairs.
*
* Inspired by https://github.com/unjs/cookie-es/blob/main/src/cookie/parse.ts
*
* @param str the string representing a `Cookie` header value
*/
function parseCookies(str) {
	if (typeof str !== "string") throw new TypeError("argument str must be a string");
	const cookies = /* @__PURE__ */ new Map();
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (!cookies.has(key)) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.codePointAt(0) === 34) val = val.slice(1, -1);
			cookies.set(key, tryDecode$1(val));
		}
		index = endIdx + 1;
	}
	return cookies;
}
var _serialize = (key, value, opt = {}) => {
	let cookie;
	if (opt?.prefix === "secure") cookie = `${`__Secure-${key}`}=${value}`;
	else if (opt?.prefix === "host") cookie = `${`__Host-${key}`}=${value}`;
	else cookie = `${key}=${value}`;
	if (key.startsWith("__Secure-") && !opt.secure) opt.secure = true;
	if (key.startsWith("__Host-")) {
		if (!opt.secure) opt.secure = true;
		if (opt.path !== "/") opt.path = "/";
		if (opt.domain) opt.domain = void 0;
	}
	if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
		if (opt.maxAge > 3456e4) throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
		cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
	}
	if (opt.domain && opt.prefix !== "host") cookie += `; Domain=${opt.domain}`;
	if (opt.path) cookie += `; Path=${opt.path}`;
	if (opt.expires) {
		if (opt.expires.getTime() - Date.now() > 3456e7) throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
		cookie += `; Expires=${opt.expires.toUTCString()}`;
	}
	if (opt.httpOnly) cookie += "; HttpOnly";
	if (opt.secure) cookie += "; Secure";
	if (opt.sameSite) cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
	if (opt.partitioned) {
		if (!opt.secure) opt.secure = true;
		cookie += "; Partitioned";
	}
	return cookie;
};
var serializeCookie = (key, value, opt) => {
	value = encodeURIComponent(value);
	return _serialize(key, value, opt);
};
var serializeSignedCookie = async (key, value, secret, opt) => {
	value = await signCookieValue(value, secret);
	return _serialize(key, value, opt);
};
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/validator.mjs
/**
* Runs validation on body and query
* @returns error and data object
*/
async function runValidation(options, context = {}) {
	let request = {
		body: context.body,
		query: context.query
	};
	if (options.body) {
		const result = await options.body["~standard"].validate(context.body);
		if (result.issues) return {
			data: null,
			error: fromError(result.issues, "body")
		};
		request.body = result.value;
	}
	if (options.query) {
		const result = await options.query["~standard"].validate(context.query);
		if (result.issues) return {
			data: null,
			error: fromError(result.issues, "query")
		};
		request.query = result.value;
	}
	if (options.requireHeaders && !context.headers) return {
		data: null,
		error: {
			message: "Headers is required",
			issues: []
		}
	};
	if (options.requireRequest && !context.request) return {
		data: null,
		error: {
			message: "Request is required",
			issues: []
		}
	};
	return {
		data: request,
		error: null
	};
}
function fromError(error, validating) {
	return {
		message: error.map((e) => {
			return `[${e.path?.length ? `${validating}.` + e.path.map((x) => typeof x === "object" ? x.key : x).join(".") : validating}] ${e.message}`;
		}).join("; "),
		issues: error
	};
}
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/context.mjs
var createInternalContext = async (context, { options, path }) => {
	const headers = new Headers();
	let responseStatus = void 0;
	const { data, error } = await runValidation(options, context);
	if (error) throw new ValidationError(error.message, error.issues);
	const requestHeaders = "headers" in context ? context.headers instanceof Headers ? context.headers : new Headers(context.headers) : "request" in context && isRequest(context.request) ? context.request.headers : null;
	const requestCookies = requestHeaders?.get("cookie");
	const parsedCookies = requestCookies ? parseCookies(requestCookies) : void 0;
	const internalContext = {
		...context,
		body: data.body,
		query: data.query,
		path: context.path || path || "virtual:",
		context: "context" in context && context.context ? context.context : {},
		returned: void 0,
		headers: context?.headers,
		request: context?.request,
		params: "params" in context ? context.params : void 0,
		method: context.method ?? (Array.isArray(options.method) ? options.method[0] : options.method === "*" ? "GET" : options.method),
		setHeader: (key, value) => {
			headers.set(key, value);
		},
		getHeader: (key) => {
			if (!requestHeaders) return null;
			return requestHeaders.get(key);
		},
		getCookie: (key, prefix) => {
			const finalKey = getCookieKey(key, prefix);
			if (!finalKey) return null;
			return parsedCookies?.get(finalKey) || null;
		},
		getSignedCookie: async (key, secret, prefix) => {
			const finalKey = getCookieKey(key, prefix);
			if (!finalKey) return null;
			const value = parsedCookies?.get(finalKey);
			if (!value) return null;
			const signatureStartPos = value.lastIndexOf(".");
			if (signatureStartPos < 1) return null;
			const signedValue = value.substring(0, signatureStartPos);
			const signature = value.substring(signatureStartPos + 1);
			if (signature.length !== 44 || !signature.endsWith("=")) return null;
			return await verifySignature(signature, signedValue, await getCryptoKey$3(secret)) ? signedValue : false;
		},
		setCookie: (key, value, options) => {
			const cookie = serializeCookie(key, value, options);
			headers.append("set-cookie", cookie);
			return cookie;
		},
		setSignedCookie: async (key, value, secret, options) => {
			const cookie = await serializeSignedCookie(key, value, secret, options);
			headers.append("set-cookie", cookie);
			return cookie;
		},
		redirect: (url) => {
			headers.set("location", url);
			return new APIError$1("FOUND", void 0, headers);
		},
		error: (status, body, headers) => {
			return new APIError$1(status, body, headers);
		},
		setStatus: (status) => {
			responseStatus = status;
		},
		json: (json, routerResponse) => {
			if (!context.asResponse) return json;
			return {
				body: routerResponse?.body || json,
				routerResponse,
				_flag: "json"
			};
		},
		responseHeaders: headers,
		get responseStatus() {
			return responseStatus;
		}
	};
	for (const middleware of options.use || []) {
		const response = await middleware({
			...internalContext,
			returnHeaders: true,
			asResponse: false
		});
		if (response.response) Object.assign(internalContext.context, response.response);
		/**
		* Apply headers from the middleware to the endpoint headers
		*/
		if (response.headers) response.headers.forEach((value, key) => {
			internalContext.responseHeaders.set(key, value);
		});
	}
	return internalContext;
};
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/endpoint.mjs
function createEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
	const path = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
	const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
	const handler = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
	if ((options.method === "GET" || options.method === "HEAD") && options.body) throw new BetterCallError("Body is not allowed with GET or HEAD methods");
	if (path && /\/{2,}/.test(path)) throw new BetterCallError("Path cannot contain consecutive slashes");
	const internalHandler = async (...inputCtx) => {
		const context = inputCtx[0] || {};
		const { data: internalContext, error: validationError } = await tryCatch(createInternalContext(context, {
			options,
			path
		}));
		if (validationError) {
			if (!(validationError instanceof ValidationError)) throw validationError;
			if (options.onValidationError) await options.onValidationError({
				message: validationError.message,
				issues: validationError.issues
			});
			throw new APIError$1(400, {
				message: validationError.message,
				code: "VALIDATION_ERROR"
			});
		}
		const response = await handler(internalContext).catch(async (e) => {
			if (isAPIError$2(e)) {
				const onAPIError = options.onAPIError;
				if (onAPIError) await onAPIError(e);
				if (context.asResponse) return e;
			}
			throw e;
		});
		const headers = internalContext.responseHeaders;
		const status = internalContext.responseStatus;
		return context.asResponse ? toResponse(response, {
			headers,
			status
		}) : context.returnHeaders ? context.returnStatus ? {
			headers,
			response,
			status
		} : {
			headers,
			response
		} : context.returnStatus ? {
			response,
			status
		} : response;
	};
	internalHandler.options = options;
	internalHandler.path = path;
	return internalHandler;
}
createEndpoint.create = (opts) => {
	return (path, options, handler) => {
		return createEndpoint(path, {
			...options,
			use: [...options?.use || [], ...opts?.use || []]
		}, handler);
	};
};
//#endregion
//#region ../../node_modules/.pnpm/better-call@1.3.5_zod@4.4.3/node_modules/better-call/dist/middleware.mjs
function createMiddleware(optionsOrHandler, handler) {
	const internalHandler = async (inputCtx) => {
		const context = inputCtx;
		const _handler = typeof optionsOrHandler === "function" ? optionsOrHandler : handler;
		const internalContext = await createInternalContext(context, {
			options: typeof optionsOrHandler === "function" ? {} : optionsOrHandler,
			path: "/"
		});
		if (!_handler) throw new Error("handler must be defined");
		try {
			const response = await _handler(internalContext);
			const headers = internalContext.responseHeaders;
			return context.returnHeaders ? {
				headers,
				response
			} : response;
		} catch (e) {
			if (isAPIError$2(e)) Object.defineProperty(e, kAPIErrorHeaderSymbol, {
				enumerable: false,
				configurable: true,
				get() {
					return internalContext.responseHeaders;
				}
			});
			throw e;
		}
	};
	internalHandler.options = typeof optionsOrHandler === "function" ? {} : optionsOrHandler;
	return internalHandler;
}
createMiddleware.create = (opts) => {
	function fn(optionsOrHandler, handler) {
		if (typeof optionsOrHandler === "function") return createMiddleware({ use: opts?.use }, optionsOrHandler);
		if (!handler) throw new Error("Middleware handler is required");
		return createMiddleware({
			...optionsOrHandler,
			method: "*",
			use: [...opts?.use || [], ...optionsOrHandler.use || []]
		}, handler);
	}
	return fn;
};
//#endregion
//#region ../../node_modules/.pnpm/rou3@0.7.12/node_modules/rou3/dist/index.mjs
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
/**
* Create a new router context.
*/
function createRouter() {
	return {
		root: { key: "" },
		static: new NullProtoObj()
	};
}
function splitPath(path) {
	const [_, ...s] = path.split("/");
	return s[s.length - 1] === "" ? s.slice(0, -1) : s;
}
function getMatchParams(segments, paramsMap) {
	const params = new NullProtoObj();
	for (const [index, name] of paramsMap) {
		const segment = index < 0 ? segments.slice(-(index + 1)).join("/") : segments[index];
		if (typeof name === "string") params[name] = segment;
		else {
			const match = segment.match(name);
			if (match) for (const key in match.groups) params[key] = match.groups[key];
		}
	}
	return params;
}
/**
* Add a route to the router context.
*/
function addRoute(ctx, method = "", path, data) {
	method = method.toUpperCase();
	if (path.charCodeAt(0) !== 47) path = `/${path}`;
	path = path.replace(/\\:/g, "%3A");
	const segments = splitPath(path);
	let node = ctx.root;
	let _unnamedParamIndex = 0;
	const paramsMap = [];
	const paramsRegexp = [];
	for (let i = 0; i < segments.length; i++) {
		let segment = segments[i];
		if (segment.startsWith("**")) {
			if (!node.wildcard) node.wildcard = { key: "**" };
			node = node.wildcard;
			paramsMap.push([
				-(i + 1),
				segment.split(":")[1] || "_",
				segment.length === 2
			]);
			break;
		}
		if (segment === "*" || segment.includes(":")) {
			if (!node.param) node.param = { key: "*" };
			node = node.param;
			if (segment === "*") paramsMap.push([
				i,
				`_${_unnamedParamIndex++}`,
				true
			]);
			else if (segment.includes(":", 1)) {
				const regexp = getParamRegexp(segment);
				paramsRegexp[i] = regexp;
				node.hasRegexParam = true;
				paramsMap.push([
					i,
					regexp,
					false
				]);
			} else paramsMap.push([
				i,
				segment.slice(1),
				false
			]);
			continue;
		}
		if (segment === "\\*") segment = segments[i] = "*";
		else if (segment === "\\*\\*") segment = segments[i] = "**";
		const child = node.static?.[segment];
		if (child) node = child;
		else {
			const staticNode = { key: segment };
			if (!node.static) node.static = new NullProtoObj();
			node.static[segment] = staticNode;
			node = staticNode;
		}
	}
	const hasParams = paramsMap.length > 0;
	if (!node.methods) node.methods = new NullProtoObj();
	node.methods[method] ??= [];
	node.methods[method].push({
		data: data || null,
		paramsRegexp,
		paramsMap: hasParams ? paramsMap : void 0
	});
	if (!hasParams) ctx.static["/" + segments.join("/")] = node;
}
function getParamRegexp(segment) {
	const regex = segment.replace(/:(\w+)/g, (_, id) => `(?<${id}>[^/]+)`).replace(/\./g, "\\.");
	return /* @__PURE__ */ new RegExp(`^${regex}$`);
}
/**
* Find a route by path.
*/
function findRoute(ctx, method = "", path, opts) {
	if (path.charCodeAt(path.length - 1) === 47) path = path.slice(0, -1);
	const staticNode = ctx.static[path];
	if (staticNode && staticNode.methods) {
		const staticMatch = staticNode.methods[method] || staticNode.methods[""];
		if (staticMatch !== void 0) return staticMatch[0];
	}
	const segments = splitPath(path);
	const match = _lookupTree(ctx, ctx.root, method, segments, 0)?.[0];
	if (match === void 0) return;
	if (opts?.params === false) return match;
	return {
		data: match.data,
		params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : void 0
	};
}
function _lookupTree(ctx, node, method, segments, index) {
	if (index === segments.length) {
		if (node.methods) {
			const match = node.methods[method] || node.methods[""];
			if (match) return match;
		}
		if (node.param && node.param.methods) {
			const match = node.param.methods[method] || node.param.methods[""];
			if (match) {
				const pMap = match[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) return match;
			}
		}
		if (node.wildcard && node.wildcard.methods) {
			const match = node.wildcard.methods[method] || node.wildcard.methods[""];
			if (match) {
				const pMap = match[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) return match;
			}
		}
		return;
	}
	const segment = segments[index];
	if (node.static) {
		const staticChild = node.static[segment];
		if (staticChild) {
			const match = _lookupTree(ctx, staticChild, method, segments, index + 1);
			if (match) return match;
		}
	}
	if (node.param) {
		const match = _lookupTree(ctx, node.param, method, segments, index + 1);
		if (match) {
			if (node.param.hasRegexParam) {
				const exactMatch = match.find((m) => m.paramsRegexp[index]?.test(segment)) || match.find((m) => !m.paramsRegexp[index]);
				return exactMatch ? [exactMatch] : void 0;
			}
			return match;
		}
	}
	if (node.wildcard && node.wildcard.methods) return node.wildcard.methods[method] || node.wildcard.methods[""];
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/is-api-error.mjs
function isAPIError$1(error) {
	return error instanceof APIError$1 || error instanceof APIError || error?.name === "APIError";
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/api/index.mjs
/**
* Better-call's createEndpoint re-throws APIError without exposing the headers
* accumulated on ctx.responseHeaders (e.g. Set-Cookie from deleteSessionCookie
* before throw). Attach them to the error via kAPIErrorHeaderSymbol — matching
* better-call's createMiddleware contract so the outer pipeline can merge them
* into the response.
*/
function attachResponseHeadersToAPIError(responseHeaders, e) {
	if (!isAPIError$1(e) || !responseHeaders) return;
	Object.defineProperty(e, kAPIErrorHeaderSymbol, {
		enumerable: false,
		configurable: true,
		value: responseHeaders,
		writable: false
	});
}
var optionsMiddleware = createMiddleware(async () => {
	/**
	* This will be passed on the instance of
	* the context. Used to infer the type
	* here.
	*/
	return {};
});
var createAuthMiddleware = createMiddleware.create({ use: [optionsMiddleware, createMiddleware(async () => {
	return {};
})] });
var use = [optionsMiddleware];
function createAuthEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
	const path = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
	const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
	const handler = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
	const wrapped = async (ctx) => {
		const runtimeCtx = ctx;
		try {
			return await runWithEndpointContext(ctx, () => handler(ctx));
		} catch (e) {
			attachResponseHeadersToAPIError(runtimeCtx.responseHeaders, e);
			throw e;
		}
	};
	if (path) return createEndpoint(path, {
		...options,
		use: [...options?.use || [], ...use]
	}, wrapped);
	return createEndpoint({
		...options,
		use: [...options?.use || [], ...use]
	}, wrapped);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/base64.mjs
function getAlphabet(urlSafe) {
	return urlSafe ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
}
function base64Encode(data, alphabet, padding) {
	let result = "";
	let buffer = 0;
	let shift = 0;
	for (const byte of data) {
		buffer = buffer << 8 | byte;
		shift += 8;
		while (shift >= 6) {
			shift -= 6;
			result += alphabet[buffer >> shift & 63];
		}
	}
	if (shift > 0) result += alphabet[buffer << 6 - shift & 63];
	if (padding) {
		const padCount = (4 - result.length % 4) % 4;
		result += "=".repeat(padCount);
	}
	return result;
}
function base64Decode(data, alphabet) {
	const decodeMap = /* @__PURE__ */ new Map();
	for (let i = 0; i < alphabet.length; i++) decodeMap.set(alphabet[i], i);
	const result = [];
	let buffer = 0;
	let bitsCollected = 0;
	for (const char of data) {
		if (char === "=") break;
		const value = decodeMap.get(char);
		if (value === void 0) throw new Error(`Invalid Base64 character: ${char}`);
		buffer = buffer << 6 | value;
		bitsCollected += 6;
		if (bitsCollected >= 8) {
			bitsCollected -= 8;
			result.push(buffer >> bitsCollected & 255);
		}
	}
	return Uint8Array.from(result);
}
var base64 = {
	encode(data, options = {}) {
		const alphabet = getAlphabet(false);
		return base64Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		if (typeof data !== "string") data = new TextDecoder().decode(data);
		const alphabet = getAlphabet(data.includes("-") || data.includes("_"));
		return base64Decode(data, alphabet);
	}
};
var base64Url = {
	encode(data, options = {}) {
		const alphabet = getAlphabet(true);
		return base64Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		return base64Decode(data, getAlphabet(data.includes("-") || data.includes("_")));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/hash.mjs
function createHash(algorithm, encoding) {
	return { digest: async (input) => {
		const encoder = new TextEncoder();
		const data = typeof input === "string" ? encoder.encode(input) : input;
		const hashBuffer = await getWebcryptoSubtle().digest(algorithm, data);
		if (encoding === "hex") return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
		if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
			if (encoding.includes("url")) return base64Url.encode(hashBuffer, { padding: encoding !== "base64urlnopad" });
			return base64.encode(hashBuffer);
		}
		return hashBuffer;
	} };
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/utils/wildcard.mjs
/**
* Escapes a character if it has a special meaning in regular expressions
* and returns the character as is if it doesn't
*/
function escapeRegExpChar(char) {
	if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
	else return char;
}
/**
* Escapes all characters in a given string that have a special meaning in regular expressions
*/
function escapeRegExpString(str) {
	let result = "";
	for (let i = 0; i < str.length; i++) result += escapeRegExpChar(str[i]);
	return result;
}
/**
* Transforms one or more glob patterns into a RegExp pattern
*/
function transform(pattern, separator = true) {
	if (Array.isArray(pattern)) return `(?:${pattern.map((p) => `^${transform(p, separator)}$`).join("|")})`;
	let separatorSplitter = "";
	let separatorMatcher = "";
	let wildcard = ".";
	if (separator === true) {
		separatorSplitter = "/";
		separatorMatcher = "[/\\\\]";
		wildcard = "[^/\\\\]";
	} else if (separator) {
		separatorSplitter = separator;
		separatorMatcher = escapeRegExpString(separatorSplitter);
		if (separatorMatcher.length > 1) {
			separatorMatcher = `(?:${separatorMatcher})`;
			wildcard = `((?!${separatorMatcher}).)`;
		} else wildcard = `[^${separatorMatcher}]`;
	}
	const requiredSeparator = separator ? `${separatorMatcher}+?` : "";
	const optionalSeparator = separator ? `${separatorMatcher}*?` : "";
	const segments = separator ? pattern.split(separatorSplitter) : [pattern];
	let result = "";
	for (let s = 0; s < segments.length; s++) {
		const segment = segments[s];
		const nextSegment = segments[s + 1];
		let currentSeparator = "";
		if (!segment && s > 0) continue;
		if (separator) if (s === segments.length - 1) currentSeparator = optionalSeparator;
		else if (nextSegment !== "**") currentSeparator = requiredSeparator;
		else currentSeparator = "";
		if (separator && segment === "**") {
			if (currentSeparator) {
				result += s === 0 ? "" : currentSeparator;
				result += `(?:${wildcard}*?${currentSeparator})*?`;
			}
			continue;
		}
		for (let c = 0; c < segment.length; c++) {
			const char = segment[c];
			if (char === "\\") {
				if (c < segment.length - 1) {
					result += escapeRegExpChar(segment[c + 1]);
					c++;
				}
			} else if (char === "?") result += wildcard;
			else if (char === "*") result += `${wildcard}*?`;
			else result += escapeRegExpChar(char);
		}
		result += currentSeparator;
	}
	return result;
}
function isMatch(regexp, sample) {
	if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
	return regexp.test(sample);
}
/**
* Compiles one or more glob patterns into a RegExp and returns an isMatch function.
* The isMatch function takes a sample string as its only argument and returns `true`
* if the string matches the pattern(s).
*
* ```js
* wildcardMatch('src/*.js')('src/index.js') //=> true
* ```
*
* ```js
* const isMatch = wildcardMatch('*.example.com', '.')
* isMatch('foo.example.com') //=> true
* isMatch('foo.bar.com') //=> false
* ```
*/
function wildcardMatch(pattern, options) {
	if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
	if (typeof options === "string" || typeof options === "boolean") options = { separator: options };
	if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
	options = options || {};
	if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
	const regexpPattern = transform(pattern, options.separator);
	const regexp = new RegExp(`^${regexpPattern}$`, options.flags);
	const fn = isMatch.bind(null, regexp);
	fn.options = options;
	fn.pattern = pattern;
	fn.regexp = regexp;
	return fn;
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/env/env-impl.mjs
var _envShim = Object.create(null);
var _getEnv = (useShim) => globalThis.process?.env || globalThis.Deno?.env.toObject() || globalThis.__env__ || (useShim ? _envShim : globalThis);
var env = new Proxy(_envShim, {
	get(_, prop) {
		return _getEnv()[prop] ?? _envShim[prop];
	},
	has(_, prop) {
		return prop in _getEnv() || prop in _envShim;
	},
	set(_, prop, value) {
		const env = _getEnv(true);
		env[prop] = value;
		return true;
	},
	deleteProperty(_, prop) {
		if (!prop) return false;
		const env = _getEnv(true);
		delete env[prop];
		return true;
	},
	ownKeys() {
		const env = _getEnv(true);
		return Object.keys(env);
	}
});
function toBoolean(val) {
	return val ? val !== "false" : false;
}
var nodeENV = typeof process !== "undefined" && process.env && "production" || "";
/** Detect if `NODE_ENV` environment variable is `dev` or `development` */
var isDevelopment = () => nodeENV === "dev" || nodeENV === "development";
/** Detect if `NODE_ENV` environment variable is `test` */
var isTest = () => nodeENV === "test" || toBoolean(env.TEST);
/**
* Get environment variable with fallback
*/
function getEnvVar(key, fallback) {
	if (typeof process !== "undefined" && process.env) return process.env[key] ?? fallback;
	if (typeof Deno !== "undefined") return Deno.env.get(key) ?? fallback;
	if (typeof Bun !== "undefined") return Bun.env[key] ?? fallback;
	return fallback;
}
Object.freeze({
	get BETTER_AUTH_SECRET() {
		return getEnvVar("BETTER_AUTH_SECRET");
	},
	get AUTH_SECRET() {
		return getEnvVar("AUTH_SECRET");
	},
	get BETTER_AUTH_TELEMETRY() {
		return getEnvVar("BETTER_AUTH_TELEMETRY");
	},
	get BETTER_AUTH_TELEMETRY_ID() {
		return getEnvVar("BETTER_AUTH_TELEMETRY_ID");
	},
	get NODE_ENV() {
		return getEnvVar("NODE_ENV", "development");
	},
	get PACKAGE_VERSION() {
		return getEnvVar("PACKAGE_VERSION", "0.0.0");
	},
	get BETTER_AUTH_TELEMETRY_ENDPOINT() {
		return getEnvVar("BETTER_AUTH_TELEMETRY_ENDPOINT", "");
	}
});
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/env/color-depth.mjs
var COLORS_2 = 1;
var COLORS_16 = 4;
var COLORS_256 = 8;
var COLORS_16m = 24;
var TERM_ENVS = {
	eterm: COLORS_16,
	cons25: COLORS_16,
	console: COLORS_16,
	cygwin: COLORS_16,
	dtterm: COLORS_16,
	gnome: COLORS_16,
	hurd: COLORS_16,
	jfbterm: COLORS_16,
	konsole: COLORS_16,
	kterm: COLORS_16,
	mlterm: COLORS_16,
	mosh: COLORS_16m,
	putty: COLORS_16,
	st: COLORS_16,
	"rxvt-unicode-24bit": COLORS_16m,
	terminator: COLORS_16m,
	"xterm-kitty": COLORS_16m
};
var CI_ENVS_MAP = new Map(Object.entries({
	APPVEYOR: COLORS_256,
	BUILDKITE: COLORS_256,
	CIRCLECI: COLORS_16m,
	DRONE: COLORS_256,
	GITEA_ACTIONS: COLORS_16m,
	GITHUB_ACTIONS: COLORS_16m,
	GITLAB_CI: COLORS_256,
	TRAVIS: COLORS_256
}));
var TERM_ENVS_REG_EXP = [
	/ansi/,
	/color/,
	/linux/,
	/direct/,
	/^con[0-9]*x[0-9]/,
	/^rxvt/,
	/^screen/,
	/^xterm/,
	/^vt100/,
	/^vt220/
];
function getColorDepth() {
	if (getEnvVar("FORCE_COLOR") !== void 0) switch (getEnvVar("FORCE_COLOR")) {
		case "":
		case "1":
		case "true": return COLORS_16;
		case "2": return COLORS_256;
		case "3": return COLORS_16m;
		default: return COLORS_2;
	}
	if (getEnvVar("NODE_DISABLE_COLORS") !== void 0 && getEnvVar("NODE_DISABLE_COLORS") !== "" || getEnvVar("NO_COLOR") !== void 0 && getEnvVar("NO_COLOR") !== "" || getEnvVar("TERM") === "dumb") return COLORS_2;
	if (getEnvVar("TMUX")) return COLORS_16m;
	if ("TF_BUILD" in env && "AGENT_NAME" in env) return COLORS_16;
	if ("CI" in env) {
		for (const { 0: envName, 1: colors } of CI_ENVS_MAP) if (envName in env) return colors;
		if (getEnvVar("CI_NAME") === "codeship") return COLORS_256;
		return COLORS_2;
	}
	if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.exec(getEnvVar("TEAMCITY_VERSION")) !== null ? COLORS_16 : COLORS_2;
	switch (getEnvVar("TERM_PROGRAM")) {
		case "iTerm.app":
			if (!getEnvVar("TERM_PROGRAM_VERSION") || /^[0-2]\./.exec(getEnvVar("TERM_PROGRAM_VERSION")) !== null) return COLORS_256;
			return COLORS_16m;
		case "HyperTerm":
		case "MacTerm": return COLORS_16m;
		case "Apple_Terminal": return COLORS_256;
	}
	if (getEnvVar("COLORTERM") === "truecolor" || getEnvVar("COLORTERM") === "24bit") return COLORS_16m;
	if (getEnvVar("TERM")) {
		if (/truecolor/.exec(getEnvVar("TERM")) !== null) return COLORS_16m;
		if (/^xterm-256/.exec(getEnvVar("TERM")) !== null) return COLORS_256;
		const termEnv = getEnvVar("TERM").toLowerCase();
		if (TERM_ENVS[termEnv]) return TERM_ENVS[termEnv];
		if (TERM_ENVS_REG_EXP.some((term) => term.exec(termEnv) !== null)) return COLORS_16;
	}
	if (getEnvVar("COLORTERM")) return COLORS_16;
	return COLORS_2;
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/env/logger.mjs
var TTY_COLORS = {
	reset: "\x1B[0m",
	bright: "\x1B[1m",
	dim: "\x1B[2m",
	undim: "\x1B[22m",
	underscore: "\x1B[4m",
	blink: "\x1B[5m",
	reverse: "\x1B[7m",
	hidden: "\x1B[8m",
	fg: {
		black: "\x1B[30m",
		red: "\x1B[31m",
		green: "\x1B[32m",
		yellow: "\x1B[33m",
		blue: "\x1B[34m",
		magenta: "\x1B[35m",
		cyan: "\x1B[36m",
		white: "\x1B[37m"
	},
	bg: {
		black: "\x1B[40m",
		red: "\x1B[41m",
		green: "\x1B[42m",
		yellow: "\x1B[43m",
		blue: "\x1B[44m",
		magenta: "\x1B[45m",
		cyan: "\x1B[46m",
		white: "\x1B[47m"
	}
};
var levels = [
	"debug",
	"info",
	"success",
	"warn",
	"error"
];
function shouldPublishLog(currentLogLevel, logLevel) {
	return levels.indexOf(logLevel) >= levels.indexOf(currentLogLevel);
}
var levelColors = {
	info: TTY_COLORS.fg.blue,
	success: TTY_COLORS.fg.green,
	warn: TTY_COLORS.fg.yellow,
	error: TTY_COLORS.fg.red,
	debug: TTY_COLORS.fg.magenta
};
var formatMessage = (level, message, colorsEnabled) => {
	const timestamp = (/* @__PURE__ */ new Date()).toISOString();
	if (colorsEnabled) return `${TTY_COLORS.dim}${timestamp}${TTY_COLORS.reset} ${levelColors[level]}${level.toUpperCase()}${TTY_COLORS.reset} ${TTY_COLORS.bright}[Better Auth]:${TTY_COLORS.reset} ${message}`;
	return `${timestamp} ${level.toUpperCase()} [Better Auth]: ${message}`;
};
var createLogger = (options) => {
	const enabled = options?.disabled !== true;
	const logLevel = options?.level ?? "warn";
	const colorsEnabled = options?.disableColors !== void 0 ? !options.disableColors : getColorDepth() !== 1;
	const LogFunc = (level, message, args = []) => {
		if (!enabled || !shouldPublishLog(logLevel, level)) return;
		const formattedMessage = formatMessage(level, message, colorsEnabled);
		if (!options || typeof options.log !== "function") {
			if (level === "error") console.error(formattedMessage, ...args);
			else if (level === "warn") console.warn(formattedMessage, ...args);
			else console.log(formattedMessage, ...args);
			return;
		}
		options.log(level === "success" ? "info" : level, message, ...args);
	};
	return {
		...Object.fromEntries(levels.map((level) => [level, (...[message, ...args]) => LogFunc(level, message, args)])),
		get level() {
			return logLevel;
		}
	};
};
var logger = createLogger();
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/utils/url.mjs
function getOrigin(url) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.origin === "null" ? null : parsedUrl.origin;
	} catch {
		return null;
	}
}
function getProtocol(url) {
	try {
		return new URL(url).protocol;
	} catch {
		return null;
	}
}
function getHost(url) {
	try {
		return new URL(url).host;
	} catch {
		return null;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/random.mjs
function expandAlphabet(alphabet) {
	switch (alphabet) {
		case "a-z": return "abcdefghijklmnopqrstuvwxyz";
		case "A-Z": return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		case "0-9": return "0123456789";
		case "-_": return "-_";
		default: throw new Error(`Unsupported alphabet: ${alphabet}`);
	}
}
function createRandomStringGenerator(...baseAlphabets) {
	const baseCharSet = baseAlphabets.map(expandAlphabet).join("");
	if (baseCharSet.length === 0) throw new Error("No valid characters provided for random string generation.");
	const baseCharSetLength = baseCharSet.length;
	return (length, ...alphabets) => {
		if (length <= 0) throw new Error("Length must be a positive integer.");
		let charSet = baseCharSet;
		let charSetLength = baseCharSetLength;
		if (alphabets.length > 0) {
			charSet = alphabets.map(expandAlphabet).join("");
			charSetLength = charSet.length;
		}
		const maxValid = Math.floor(256 / charSetLength) * charSetLength;
		const buf = new Uint8Array(length * 2);
		const bufLength = buf.length;
		let result = "";
		let bufIndex = bufLength;
		let rand;
		while (result.length < length) {
			if (bufIndex >= bufLength) {
				crypto.getRandomValues(buf);
				bufIndex = 0;
			}
			rand = buf[bufIndex++];
			if (rand < maxValid) result += charSet[rand % charSetLength];
		}
		return result;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/crypto/random.mjs
var generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js
/**
* Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
* @param a - value to test
* @returns `true` when the value is a Uint8Array-compatible view.
* @example
* Check whether a value is a Uint8Array-compatible view.
* ```ts
* isBytes(new Uint8Array([1, 2, 3]));
* ```
*/
function isBytes$1(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
/**
* Asserts something is a non-negative integer.
* @param n - number to validate
* @param title - label included in thrown errors
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate a non-negative integer option.
* ```ts
* anumber(32, 'length');
* ```
*/
function anumber$1(n, title = "") {
	if (typeof n !== "number") {
		const prefix = title && `"${title}" `;
		throw new TypeError(`${prefix}expected number, got ${typeof n}`);
	}
	if (!Number.isSafeInteger(n) || n < 0) {
		const prefix = title && `"${title}" `;
		throw new RangeError(`${prefix}expected integer >= 0, got ${n}`);
	}
}
/**
* Asserts something is Uint8Array.
* @param value - value to validate
* @param length - optional exact length constraint
* @param title - label included in thrown errors
* @returns The validated byte array.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate that a value is a byte array.
* ```ts
* abytes(new Uint8Array([1, 2, 3]));
* ```
*/
function abytes$1(value, length, title = "") {
	const bytes = isBytes$1(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		const message = prefix + "expected Uint8Array" + ofLen + ", got " + got;
		if (!bytes) throw new TypeError(message);
		throw new RangeError(message);
	}
	return value;
}
/**
* Asserts something is a wrapped hash constructor.
* @param h - hash constructor to validate
* @throws On wrong argument types or invalid hash wrapper shape. {@link TypeError}
* @throws On invalid hash metadata ranges or values. {@link RangeError}
* @throws If the hash metadata allows empty outputs or block sizes. {@link Error}
* @example
* Validate a callable hash wrapper.
* ```ts
* import { ahash } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* ahash(sha256);
* ```
*/
function ahash(h) {
	if (typeof h !== "function" || typeof h.create !== "function") throw new TypeError("Hash must wrapped by utils.createHasher");
	anumber$1(h.outputLen);
	anumber$1(h.blockLen);
	if (h.outputLen < 1) throw new Error("\"outputLen\" must be >= 1");
	if (h.blockLen < 1) throw new Error("\"blockLen\" must be >= 1");
}
/**
* Asserts a hash instance has not been destroyed or finished.
* @param instance - hash instance to validate
* @param checkFinished - whether to reject finalized instances
* @throws If the hash instance has already been destroyed or finalized. {@link Error}
* @example
* Validate that a hash instance is still usable.
* ```ts
* import { aexists } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const hash = sha256.create();
* aexists(hash);
* ```
*/
function aexists$1(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/**
* Asserts output is a sufficiently-sized byte array.
* @param out - destination buffer
* @param instance - hash instance providing output length
* Oversized buffers are allowed; downstream code only promises to fill the first `outputLen` bytes.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate a caller-provided digest buffer.
* ```ts
* import { aoutput } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const hash = sha256.create();
* aoutput(new Uint8Array(hash.outputLen), hash);
* ```
*/
function aoutput$1(out, instance) {
	abytes$1(out, void 0, "digestInto() output");
	const min = instance.outputLen;
	if (out.length < min) throw new RangeError("\"digestInto() output\" expected to be of length >=" + min);
}
/**
* Zeroizes typed arrays in place. Warning: JS provides no guarantees.
* @param arrays - arrays to overwrite with zeros
* @example
* Zeroize sensitive buffers in place.
* ```ts
* clean(new Uint8Array([1, 2, 3]));
* ```
*/
function clean$1(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/**
* Creates a DataView for byte-level manipulation.
* @param arr - source typed array
* @returns DataView over the same buffer region.
* @example
* Create a DataView over an existing buffer.
* ```ts
* createView(new Uint8Array(4));
* ```
*/
function createView$1(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/**
* Rotate-right operation for uint32 values.
* @param word - source word
* @param shift - shift amount in bits
* @returns Rotated word.
* @example
* Rotate a 32-bit word to the right.
* ```ts
* rotr(0x12345678, 8);
* ```
*/
function rotr(word, shift) {
	return word << 32 - shift | word >>> shift;
}
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
typeof Uint8Array.from([]).toHex === "function" && Uint8Array.fromHex;
/**
* Creates a callable hash function from a stateful class constructor.
* @param hashCons - hash constructor or factory
* @param info - optional metadata such as DER OID
* @returns Frozen callable hash wrapper with `.create()`.
*   Wrapper construction eagerly calls `hashCons(undefined)` once to read
*   `outputLen` / `blockLen`, so constructor side effects happen at module
*   init time.
* @example
* Wrap a stateful hash constructor into a callable helper.
* ```ts
* import { createHasher } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const wrapped = createHasher(sha256.create, { oid: sha256.oid });
* wrapped(new Uint8Array([1]));
* ```
*/
function createHasher(hashCons, info = {}) {
	const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
	const tmp = hashCons(void 0);
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.canXOF = tmp.canXOF;
	hashC.create = (opts) => hashCons(opts);
	Object.assign(hashC, info);
	return Object.freeze(hashC);
}
/**
* Creates OID metadata for NIST hashes with prefix `06 09 60 86 48 01 65 03 04 02`.
* @param suffix - final OID byte for the selected hash.
*   The helper accepts any byte even though only the documented NIST hash
*   suffixes are meaningful downstream.
* @returns Object containing the DER-encoded OID.
* @example
* Build OID metadata for a NIST hash.
* ```ts
* oidNist(0x01);
* ```
*/
var oidNist = (suffix) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	suffix
]) });
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/hmac.js
/**
* HMAC: RFC2104 message authentication code.
* @module
*/
/**
* Internal class for HMAC.
* Accepts any byte key, although RFC 2104 §3 recommends keys at least
* `HashLen` bytes long.
*/
var _HMAC = class {
	oHash;
	iHash;
	blockLen;
	outputLen;
	canXOF = false;
	finished = false;
	destroyed = false;
	constructor(hash, key) {
		ahash(hash);
		abytes$1(key, void 0, "key");
		this.iHash = hash.create();
		if (typeof this.iHash.update !== "function") throw new Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen;
		this.outputLen = this.iHash.outputLen;
		const blockLen = this.blockLen;
		const pad = new Uint8Array(blockLen);
		pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
		for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
		this.iHash.update(pad);
		this.oHash = hash.create();
		for (let i = 0; i < pad.length; i++) pad[i] ^= 106;
		this.oHash.update(pad);
		clean$1(pad);
	}
	update(buf) {
		aexists$1(this);
		this.iHash.update(buf);
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		this.finished = true;
		const buf = out.subarray(0, this.outputLen);
		this.iHash.digestInto(buf);
		this.oHash.update(buf);
		this.oHash.digestInto(buf);
		this.destroy();
	}
	digest() {
		const out = new Uint8Array(this.oHash.outputLen);
		this.digestInto(out);
		return out;
	}
	_cloneInto(to) {
		to ||= Object.create(Object.getPrototypeOf(this), {});
		const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		to = to;
		to.finished = finished;
		to.destroyed = destroyed;
		to.blockLen = blockLen;
		to.outputLen = outputLen;
		to.oHash = oHash._cloneInto(to.oHash);
		to.iHash = iHash._cloneInto(to.iHash);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = true;
		this.oHash.destroy();
		this.iHash.destroy();
	}
};
var hmac = /* @__PURE__ */ (() => {
	const hmac_ = ((hash, key, message) => new _HMAC(hash, key).update(message).digest());
	hmac_.create = (hash, key) => new _HMAC(hash, key);
	return hmac_;
})();
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/hkdf.js
/**
* HKDF (RFC 5869): extract + expand in one step.
* See {@link https://soatok.blog/2021/11/17/understanding-hkdf/}.
* @module
*/
/**
* HKDF-extract from spec. Less important part. `HKDF-Extract(IKM, salt) -> PRK`
* Arguments position differs from spec (IKM is first one, since it is not optional)
* Local validation only checks `hash`; `ikm` / `salt` byte validation is delegated to `hmac()`.
* @param hash - hash function that would be used (e.g. sha256)
* @param ikm - input keying material, the initial key
* @param salt - optional salt value (a non-secret random value)
* @returns Pseudorandom key derived from input keying material.
* @example
* Run the HKDF extract step.
* ```ts
* import { extract } from '@noble/hashes/hkdf.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* extract(sha256, new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6]));
* ```
*/
function extract(hash, ikm, salt) {
	ahash(hash);
	if (salt === void 0) salt = new Uint8Array(hash.outputLen);
	return hmac(hash, salt, ikm);
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.of(0);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
/**
* HKDF-expand from the spec. The most important part. `HKDF-Expand(PRK, info, L) -> OKM`
* @param hash - hash function that would be used (e.g. sha256)
* @param prk - a pseudorandom key of at least HashLen octets
*   (usually, the output from the extract step)
* @param info - optional context and application specific information (can be a zero-length string)
* @param length - length of output keying material in bytes.
*   RFC 5869 §2.3 allows `0..255*HashLen`, so `0` returns an empty OKM.
* @returns Output keying material with the requested length.
* @throws If the requested output length exceeds the HKDF limit
*   for the selected hash. {@link Error}
* @example
* Run the HKDF expand step.
* ```ts
* import { expand } from '@noble/hashes/hkdf.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* expand(sha256, new Uint8Array(32), new Uint8Array([1, 2, 3]), 16);
* ```
*/
function expand(hash, prk, info, length = 32) {
	ahash(hash);
	anumber$1(length, "length");
	abytes$1(prk, void 0, "prk");
	const olen = hash.outputLen;
	if (prk.length < olen) throw new Error("\"prk\" must be at least HashLen octets");
	if (length > 255 * olen) throw new Error("Length must be <= 255*HashLen");
	const blocks = Math.ceil(length / olen);
	if (info === void 0) info = EMPTY_BUFFER;
	else abytes$1(info, void 0, "info");
	const okm = new Uint8Array(blocks * olen);
	const HMAC = hmac.create(hash, prk);
	const HMACTmp = HMAC._cloneInto();
	const T = new Uint8Array(HMAC.outputLen);
	for (let counter = 0; counter < blocks; counter++) {
		HKDF_COUNTER[0] = counter + 1;
		HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
		okm.set(T, olen * counter);
		HMAC._cloneInto(HMACTmp);
	}
	HMAC.destroy();
	HMACTmp.destroy();
	clean$1(T, HKDF_COUNTER);
	return okm.slice(0, length);
}
/**
* HKDF (RFC 5869): derive keys from an initial input.
* Combines hkdf_extract + hkdf_expand in one step
* @param hash - hash function that would be used (e.g. sha256)
* @param ikm - input keying material, the initial key
* @param salt - optional salt value (a non-secret random value)
* @param info - optional context and application specific information bytes
* @param length - length of output keying material in bytes.
*   RFC 5869 §2.3 allows `0..255*HashLen`, so `0` returns an empty OKM.
* @returns Output keying material derived from the input key.
* @throws If the requested output length exceeds the HKDF limit
*   for the selected hash. {@link Error}
* @example
* HKDF (RFC 5869): derive keys from an initial input.
* ```ts
* import { hkdf } from '@noble/hashes/hkdf.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* import { randomBytes, utf8ToBytes } from '@noble/hashes/utils.js';
* const inputKey = randomBytes(32);
* const salt = randomBytes(32);
* const info = utf8ToBytes('application-key');
* const okm = hkdf(sha256, inputKey, salt, info, 32);
* ```
*/
var hkdf = (hash, ikm, salt, info, length) => expand(hash, extract(hash, ikm, salt), info, length);
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_md.js
/**
* Internal Merkle-Damgard hash utils.
* @module
*/
/**
* Shared 32-bit conditional boolean primitive reused by SHA-256, SHA-1, and MD5 `F`.
* Returns bits from `b` when `a` is set, otherwise from `c`.
* The XOR form is equivalent to MD5's `F(X,Y,Z) = XY v not(X)Z` because the masked terms never
* set the same bit.
* @param a - selector word
* @param b - word chosen when selector bit is set
* @param c - word chosen when selector bit is clear
* @returns Mixed 32-bit word.
* @example
* Combine three words with the shared 32-bit choice primitive.
* ```ts
* Chi(0xffffffff, 0x12345678, 0x87654321);
* ```
*/
function Chi(a, b, c) {
	return a & b ^ ~a & c;
}
/**
* Shared 32-bit majority primitive reused by SHA-256 and SHA-1.
* Returns bits shared by at least two inputs.
* @param a - first input word
* @param b - second input word
* @param c - third input word
* @returns Mixed 32-bit word.
* @example
* Combine three words with the shared 32-bit majority primitive.
* ```ts
* Maj(0xffffffff, 0x12345678, 0x87654321);
* ```
*/
function Maj(a, b, c) {
	return a & b ^ a & c ^ b & c;
}
/**
* Merkle-Damgard hash construction base class.
* Could be used to create MD5, RIPEMD, SHA1, SHA2.
* Accepts only byte-aligned `Uint8Array` input, even when the underlying spec describes bit
* strings with partial-byte tails.
* @param blockLen - internal block size in bytes
* @param outputLen - digest size in bytes
* @param padOffset - trailing length field size in bytes
* @param isLE - whether length and state words are encoded in little-endian
* @example
* Use a concrete subclass to get the shared Merkle-Damgard update/digest flow.
* ```ts
* import { _SHA1 } from '@noble/hashes/legacy.js';
* const hash = new _SHA1();
* hash.update(new Uint8Array([97, 98, 99]));
* hash.digest();
* ```
*/
var HashMD = class {
	blockLen;
	outputLen;
	canXOF = false;
	padOffset;
	isLE;
	buffer;
	view;
	finished = false;
	length = 0;
	pos = 0;
	destroyed = false;
	constructor(blockLen, outputLen, padOffset, isLE) {
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView$1(this.buffer);
	}
	update(data) {
		aexists$1(this);
		abytes$1(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView$1(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
			}
		}
		this.length += data.length;
		this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		clean$1(this.buffer.subarray(pos));
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			pos = 0;
		}
		for (let i = pos; i < blockLen; i++) buffer[i] = 0;
		view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE);
		this.process(view, 0);
		const oview = createView$1(out);
		const len = this.outputLen;
		if (len % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
		const outLen = len / 4;
		const state = this.get();
		if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		to ||= new this.constructor();
		to.set(...this.get());
		const { blockLen, buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (length % blockLen) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/**
* Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
* Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
*/
/** Initial SHA256 state from RFC 6234 §6.1: the first 32 bits of the fractional parts of the
* square roots of the first eight prime numbers. Exported as a shared table; callers must treat
* it as read-only because constructors copy words from it by index. */
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]);
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
	if (le) return {
		h: Number(n & U32_MASK64),
		l: Number(n >> _32n & U32_MASK64)
	};
	return {
		h: Number(n >> _32n & U32_MASK64) | 0,
		l: Number(n & U32_MASK64) | 0
	};
}
function split(lst, le = false) {
	const len = lst.length;
	let Ah = new Uint32Array(len);
	let Al = new Uint32Array(len);
	for (let i = 0; i < len; i++) {
		const { h, l } = fromBig(lst[i], le);
		[Ah[i], Al[i]] = [h, l];
	}
	return [Ah, Al];
}
//#endregion
//#region ../../node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/sha2.js
/**
* SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
* SHA256 is the fastest hash implementable in JS, even faster than Blake3.
* Check out {@link https://www.rfc-editor.org/rfc/rfc4634 | RFC 4634} and
* {@link https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | FIPS 180-4}.
* @module
*/
/**
* SHA-224 / SHA-256 round constants from RFC 6234 §5.1: the first 32 bits
* of the cube roots of the first 64 primes (2..311).
*/
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
/** Reusable SHA-224 / SHA-256 message schedule buffer `W_t` from RFC 6234 §6.2 step 1. */
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
/** Internal SHA-224 / SHA-256 compression engine from RFC 6234 §6.2. */
var SHA2_32B = class extends HashMD {
	constructor(outputLen) {
		super(64, outputLen, 8, false);
	}
	get() {
		const { A, B, C, D, E, F, G, H } = this;
		return [
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H
		];
	}
	set(A, B, C, D, E, F, G, H) {
		this.A = A | 0;
		this.B = B | 0;
		this.C = C | 0;
		this.D = D | 0;
		this.E = E | 0;
		this.F = F | 0;
		this.G = G | 0;
		this.H = H | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
		for (let i = 16; i < 64; i++) {
			const W15 = SHA256_W[i - 15];
			const W2 = SHA256_W[i - 2];
			const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
			SHA256_W[i] = (rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10) + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
		}
		let { A, B, C, D, E, F, G, H } = this;
		for (let i = 0; i < 64; i++) {
			const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
			const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
			const T2 = (rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)) + Maj(A, B, C) | 0;
			H = G;
			G = F;
			F = E;
			E = D + T1 | 0;
			D = C;
			C = B;
			B = A;
			A = T1 + T2 | 0;
		}
		A = A + this.A | 0;
		B = B + this.B | 0;
		C = C + this.C | 0;
		D = D + this.D | 0;
		E = E + this.E | 0;
		F = F + this.F | 0;
		G = G + this.G | 0;
		H = H + this.H | 0;
		this.set(A, B, C, D, E, F, G, H);
	}
	roundClean() {
		clean$1(SHA256_W);
	}
	destroy() {
		this.destroyed = true;
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
		clean$1(this.buffer);
	}
};
/** Internal SHA-256 hash class grounded in RFC 6234 §6.2. */
var _SHA256 = class extends SHA2_32B {
	A = SHA256_IV[0] | 0;
	B = SHA256_IV[1] | 0;
	C = SHA256_IV[2] | 0;
	D = SHA256_IV[3] | 0;
	E = SHA256_IV[4] | 0;
	F = SHA256_IV[5] | 0;
	G = SHA256_IV[6] | 0;
	H = SHA256_IV[7] | 0;
	constructor() {
		super(32);
	}
};
var K512 = split([
	"0x428a2f98d728ae22",
	"0x7137449123ef65cd",
	"0xb5c0fbcfec4d3b2f",
	"0xe9b5dba58189dbbc",
	"0x3956c25bf348b538",
	"0x59f111f1b605d019",
	"0x923f82a4af194f9b",
	"0xab1c5ed5da6d8118",
	"0xd807aa98a3030242",
	"0x12835b0145706fbe",
	"0x243185be4ee4b28c",
	"0x550c7dc3d5ffb4e2",
	"0x72be5d74f27b896f",
	"0x80deb1fe3b1696b1",
	"0x9bdc06a725c71235",
	"0xc19bf174cf692694",
	"0xe49b69c19ef14ad2",
	"0xefbe4786384f25e3",
	"0x0fc19dc68b8cd5b5",
	"0x240ca1cc77ac9c65",
	"0x2de92c6f592b0275",
	"0x4a7484aa6ea6e483",
	"0x5cb0a9dcbd41fbd4",
	"0x76f988da831153b5",
	"0x983e5152ee66dfab",
	"0xa831c66d2db43210",
	"0xb00327c898fb213f",
	"0xbf597fc7beef0ee4",
	"0xc6e00bf33da88fc2",
	"0xd5a79147930aa725",
	"0x06ca6351e003826f",
	"0x142929670a0e6e70",
	"0x27b70a8546d22ffc",
	"0x2e1b21385c26c926",
	"0x4d2c6dfc5ac42aed",
	"0x53380d139d95b3df",
	"0x650a73548baf63de",
	"0x766a0abb3c77b2a8",
	"0x81c2c92e47edaee6",
	"0x92722c851482353b",
	"0xa2bfe8a14cf10364",
	"0xa81a664bbc423001",
	"0xc24b8b70d0f89791",
	"0xc76c51a30654be30",
	"0xd192e819d6ef5218",
	"0xd69906245565a910",
	"0xf40e35855771202a",
	"0x106aa07032bbd1b8",
	"0x19a4c116b8d2d0c8",
	"0x1e376c085141ab53",
	"0x2748774cdf8eeb99",
	"0x34b0bcb5e19b48a8",
	"0x391c0cb3c5c95a63",
	"0x4ed8aa4ae3418acb",
	"0x5b9cca4f7763e373",
	"0x682e6ff3d6b2b8a3",
	"0x748f82ee5defb2fc",
	"0x78a5636f43172f60",
	"0x84c87814a1f0ab72",
	"0x8cc702081a6439ec",
	"0x90befffa23631e28",
	"0xa4506cebde82bde9",
	"0xbef9a3f7b2c67915",
	"0xc67178f2e372532b",
	"0xca273eceea26619c",
	"0xd186b8c721c0c207",
	"0xeada7dd6cde0eb1e",
	"0xf57d4f7fee6ed178",
	"0x06f067aa72176fba",
	"0x0a637dc5a2c898a6",
	"0x113f9804bef90dae",
	"0x1b710b35131c471b",
	"0x28db77f523047d84",
	"0x32caab7b40c72493",
	"0x3c9ebe0a15c9bebc",
	"0x431d67c49c100d4c",
	"0x4cc5d4becb3e42b6",
	"0x597f299cfc657e2a",
	"0x5fcb6fab3ad6faec",
	"0x6c44198c4a475817"
].map((n) => BigInt(n)));
K512[0];
K512[1];
/**
* SHA2-256 hash function from RFC 4634. In JS it's the fastest: even faster than Blake3. Some info:
*
* - Trying 2^128 hashes would get 50% chance of collision, using birthday attack.
* - BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
* - Each sha256 hash is executing 2^18 bit operations.
* - Good 2024 ASICs can do 200Th/sec with 3500 watts of power, corresponding to 2^36 hashes/joule.
* @param msg - message bytes to hash
* @returns Digest bytes.
* @example
* Hash a message with SHA2-256.
* ```ts
* sha256(new Uint8Array([97, 98, 99]));
* ```
*/
var sha256 = /* @__PURE__ */ createHasher(() => new _SHA256(), /* @__PURE__ */ oidNist(1));
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
	const size = buffers.reduce((acc, { length }) => acc + length, 0);
	const buf = new Uint8Array(size);
	let i = 0;
	for (const buffer of buffers) {
		buf.set(buffer, i);
		i += buffer.length;
	}
	return buf;
}
function writeUInt32BE(buf, value, offset) {
	if (value < 0 || value >= MAX_INT32) throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
	buf.set([
		value >>> 24,
		value >>> 16,
		value >>> 8,
		value & 255
	], offset);
}
function uint64be(value) {
	const high = Math.floor(value / MAX_INT32);
	const low = value % MAX_INT32;
	const buf = new Uint8Array(8);
	writeUInt32BE(buf, high, 0);
	writeUInt32BE(buf, low, 4);
	return buf;
}
function uint32be(value) {
	const buf = new Uint8Array(4);
	writeUInt32BE(buf, value);
	return buf;
}
function encode$1(string) {
	const bytes = new Uint8Array(string.length);
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		if (code > 127) throw new TypeError("non-ASCII string encountered in encode()");
		bytes[i] = code;
	}
	return bytes;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/base64.js
function encodeBase64(input) {
	if (Uint8Array.prototype.toBase64) return input.toBase64();
	const CHUNK_SIZE = 32768;
	const arr = [];
	for (let i = 0; i < input.length; i += CHUNK_SIZE) arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
	return btoa(arr.join(""));
}
function decodeBase64(encoded) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded);
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/base64url.js
function decode(input) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), { alphabet: "base64url" });
	let encoded = input;
	if (encoded instanceof Uint8Array) encoded = decoder.decode(encoded);
	encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return decodeBase64(encoded);
	} catch {
		throw new TypeError("The input to be decoded is not correctly encoded.");
	}
}
function encode(input) {
	let unencoded = input;
	if (typeof unencoded === "string") unencoded = encoder.encode(unencoded);
	if (Uint8Array.prototype.toBase64) return unencoded.toBase64({
		alphabet: "base64url",
		omitPadding: true
	});
	return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/crypto_key.js
var unusable = (name, prop = "algorithm.name") => /* @__PURE__ */ new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
var isAlgorithm = (algorithm, name) => algorithm.name === name;
function getHashLength(hash) {
	return parseInt(hash.name.slice(4), 10);
}
function checkHashLength(algorithm, expected) {
	if (getHashLength(algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
}
function getNamedCurve(alg) {
	switch (alg) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw new Error("unreachable");
	}
}
function checkUsage(key, usage) {
	if (usage && !key.usages.includes(usage)) throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkSigCryptoKey(key, alg, usage) {
	switch (alg) {
		case "HS256":
		case "HS384":
		case "HS512":
			if (!isAlgorithm(key.algorithm, "HMAC")) throw unusable("HMAC");
			checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
			break;
		case "RS256":
		case "RS384":
		case "RS512":
			if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5")) throw unusable("RSASSA-PKCS1-v1_5");
			checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
			break;
		case "PS256":
		case "PS384":
		case "PS512":
			if (!isAlgorithm(key.algorithm, "RSA-PSS")) throw unusable("RSA-PSS");
			checkHashLength(key.algorithm, parseInt(alg.slice(2), 10));
			break;
		case "Ed25519":
		case "EdDSA":
			if (!isAlgorithm(key.algorithm, "Ed25519")) throw unusable("Ed25519");
			break;
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87":
			if (!isAlgorithm(key.algorithm, alg)) throw unusable(alg);
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!isAlgorithm(key.algorithm, "ECDSA")) throw unusable("ECDSA");
			const expected = getNamedCurve(alg);
			if (key.algorithm.namedCurve !== expected) throw unusable(expected, "algorithm.namedCurve");
			break;
		}
		default: throw new TypeError("CryptoKey does not support this operation");
	}
	checkUsage(key, usage);
}
function checkEncCryptoKey(key, alg, usage) {
	switch (alg) {
		case "A128GCM":
		case "A192GCM":
		case "A256GCM": {
			if (!isAlgorithm(key.algorithm, "AES-GCM")) throw unusable("AES-GCM");
			const expected = parseInt(alg.slice(1, 4), 10);
			if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
			break;
		}
		case "A128KW":
		case "A192KW":
		case "A256KW": {
			if (!isAlgorithm(key.algorithm, "AES-KW")) throw unusable("AES-KW");
			const expected = parseInt(alg.slice(1, 4), 10);
			if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
			break;
		}
		case "ECDH":
			switch (key.algorithm.name) {
				case "ECDH":
				case "X25519": break;
				default: throw unusable("ECDH or X25519");
			}
			break;
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW":
			if (!isAlgorithm(key.algorithm, "PBKDF2")) throw unusable("PBKDF2");
			break;
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			if (!isAlgorithm(key.algorithm, "RSA-OAEP")) throw unusable("RSA-OAEP");
			checkHashLength(key.algorithm, parseInt(alg.slice(9), 10) || 1);
			break;
		default: throw new TypeError("CryptoKey does not support this operation");
	}
	checkUsage(key, usage);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
	types = types.filter(Boolean);
	if (types.length > 2) {
		const last = types.pop();
		msg += `one of type ${types.join(", ")}, or ${last}.`;
	} else if (types.length === 2) msg += `one of type ${types[0]} or ${types[1]}.`;
	else msg += `of type ${types[0]}.`;
	if (actual == null) msg += ` Received ${actual}`;
	else if (typeof actual === "function" && actual.name) msg += ` Received function ${actual.name}`;
	else if (typeof actual === "object" && actual != null) {
		if (actual.constructor?.name) msg += ` Received an instance of ${actual.constructor.name}`;
	}
	return msg;
}
var invalidKeyInput = (actual, ...types) => message("Key must be ", actual, ...types);
var withAlg = (alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types);
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(message, options) {
		super(message, options);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
};
var JWTClaimValidationFailed = class extends JOSEError {
	static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	claim;
	reason;
	payload;
	constructor(message, payload, claim = "unspecified", reason = "unspecified") {
		super(message, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JWTExpired = class extends JOSEError {
	static code = "ERR_JWT_EXPIRED";
	code = "ERR_JWT_EXPIRED";
	claim;
	reason;
	payload;
	constructor(message, payload, claim = "unspecified", reason = "unspecified") {
		super(message, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JOSEAlgNotAllowed = class extends JOSEError {
	static code = "ERR_JOSE_ALG_NOT_ALLOWED";
	code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
	static code = "ERR_JOSE_NOT_SUPPORTED";
	code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWEDecryptionFailed = class extends JOSEError {
	static code = "ERR_JWE_DECRYPTION_FAILED";
	code = "ERR_JWE_DECRYPTION_FAILED";
	constructor(message = "decryption operation failed", options) {
		super(message, options);
	}
};
var JWEInvalid = class extends JOSEError {
	static code = "ERR_JWE_INVALID";
	code = "ERR_JWE_INVALID";
};
var JWSInvalid = class extends JOSEError {
	static code = "ERR_JWS_INVALID";
	code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
};
var JWKInvalid = class extends JOSEError {
	static code = "ERR_JWK_INVALID";
	code = "ERR_JWK_INVALID";
};
var JWKSInvalid = class extends JOSEError {
	static code = "ERR_JWKS_INVALID";
	code = "ERR_JWKS_INVALID";
};
var JWKSNoMatchingKey = class extends JOSEError {
	static code = "ERR_JWKS_NO_MATCHING_KEY";
	code = "ERR_JWKS_NO_MATCHING_KEY";
	constructor(message = "no applicable key found in the JSON Web Key Set", options) {
		super(message, options);
	}
};
var JWKSMultipleMatchingKeys = class extends JOSEError {
	[Symbol.asyncIterator];
	static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	constructor(message = "multiple matching keys found in the JSON Web Key Set", options) {
		super(message, options);
	}
};
var JWKSTimeout = class extends JOSEError {
	static code = "ERR_JWKS_TIMEOUT";
	code = "ERR_JWKS_TIMEOUT";
	constructor(message = "request timed out", options) {
		super(message, options);
	}
};
var JWSSignatureVerificationFailed = class extends JOSEError {
	static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	constructor(message = "signature verification failed", options) {
		super(message, options);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/is_key_like.js
function assertCryptoKey(key) {
	if (!isCryptoKey(key)) throw new Error("CryptoKey instance expected");
}
var isCryptoKey = (key) => {
	if (key?.[Symbol.toStringTag] === "CryptoKey") return true;
	try {
		return key instanceof CryptoKey;
	} catch {
		return false;
	}
};
var isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
var isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/content_encryption.js
function cekLength(alg) {
	switch (alg) {
		case "A128GCM": return 128;
		case "A192GCM": return 192;
		case "A256GCM":
		case "A128CBC-HS256": return 256;
		case "A192CBC-HS384": return 384;
		case "A256CBC-HS512": return 512;
		default: throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
	}
}
var generateCek = (alg) => crypto.getRandomValues(new Uint8Array(cekLength(alg) >> 3));
function checkCekLength(cek, expected) {
	const actual = cek.byteLength << 3;
	if (actual !== expected) throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
}
function ivBitLength(alg) {
	switch (alg) {
		case "A128GCM":
		case "A128GCMKW":
		case "A192GCM":
		case "A192GCMKW":
		case "A256GCM":
		case "A256GCMKW": return 96;
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512": return 128;
		default: throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
	}
}
var generateIv = (alg) => crypto.getRandomValues(new Uint8Array(ivBitLength(alg) >> 3));
function checkIvLength(enc, iv) {
	if (iv.length << 3 !== ivBitLength(enc)) throw new JWEInvalid("Invalid Initialization Vector length");
}
async function cbcKeySetup(enc, cek, usage) {
	if (!(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
	const keySize = parseInt(enc.slice(1, 4), 10);
	return {
		encKey: await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [usage]),
		macKey: await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
			hash: `SHA-${keySize << 1}`,
			name: "HMAC"
		}, false, ["sign"]),
		keySize
	};
}
async function cbcHmacTag(macKey, macData, keySize) {
	return new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
}
async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
	const { encKey, macKey, keySize } = await cbcKeySetup(enc, cek, "encrypt");
	const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
		iv,
		name: "AES-CBC"
	}, encKey, plaintext));
	return {
		ciphertext,
		tag: await cbcHmacTag(macKey, concat(aad, iv, ciphertext, uint64be(aad.length << 3)), keySize),
		iv
	};
}
async function timingSafeEqual(a, b) {
	if (!(a instanceof Uint8Array)) throw new TypeError("First argument must be a buffer");
	if (!(b instanceof Uint8Array)) throw new TypeError("Second argument must be a buffer");
	const algorithm = {
		name: "HMAC",
		hash: "SHA-256"
	};
	const key = await crypto.subtle.generateKey(algorithm, false, ["sign"]);
	const aHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, a));
	const bHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, b));
	let out = 0;
	let i = -1;
	while (++i < 32) out |= aHmac[i] ^ bHmac[i];
	return out === 0;
}
async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
	const { encKey, macKey, keySize } = await cbcKeySetup(enc, cek, "decrypt");
	const expectedTag = await cbcHmacTag(macKey, concat(aad, iv, ciphertext, uint64be(aad.length << 3)), keySize);
	let macCheckPassed;
	try {
		macCheckPassed = await timingSafeEqual(tag, expectedTag);
	} catch {}
	if (!macCheckPassed) throw new JWEDecryptionFailed();
	let plaintext;
	try {
		plaintext = new Uint8Array(await crypto.subtle.decrypt({
			iv,
			name: "AES-CBC"
		}, encKey, ciphertext));
	} catch {}
	if (!plaintext) throw new JWEDecryptionFailed();
	return plaintext;
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
	let encKey;
	if (cek instanceof Uint8Array) encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
	else {
		checkEncCryptoKey(cek, enc, "encrypt");
		encKey = cek;
	}
	const encrypted = new Uint8Array(await crypto.subtle.encrypt({
		additionalData: aad,
		iv,
		name: "AES-GCM",
		tagLength: 128
	}, encKey, plaintext));
	const tag = encrypted.slice(-16);
	return {
		ciphertext: encrypted.slice(0, -16),
		tag,
		iv
	};
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
	let encKey;
	if (cek instanceof Uint8Array) encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
	else {
		checkEncCryptoKey(cek, enc, "decrypt");
		encKey = cek;
	}
	try {
		return new Uint8Array(await crypto.subtle.decrypt({
			additionalData: aad,
			iv,
			name: "AES-GCM",
			tagLength: 128
		}, encKey, concat(ciphertext, tag)));
	} catch {
		throw new JWEDecryptionFailed();
	}
}
var unsupportedEnc = "Unsupported JWE Content Encryption Algorithm";
async function encrypt$1(enc, plaintext, cek, iv, aad) {
	if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
	if (iv) checkIvLength(enc, iv);
	else iv = generateIv(enc);
	switch (enc) {
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
			return cbcEncrypt(enc, plaintext, cek, iv, aad);
		case "A128GCM":
		case "A192GCM":
		case "A256GCM":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
			return gcmEncrypt(enc, plaintext, cek, iv, aad);
		default: throw new JOSENotSupported(unsupportedEnc);
	}
}
async function decrypt$1(enc, cek, ciphertext, iv, tag, aad) {
	if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
	if (!iv) throw new JWEInvalid("JWE Initialization Vector missing");
	if (!tag) throw new JWEInvalid("JWE Authentication Tag missing");
	checkIvLength(enc, iv);
	switch (enc) {
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
			return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
		case "A128GCM":
		case "A192GCM":
		case "A256GCM":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
			return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
		default: throw new JOSENotSupported(unsupportedEnc);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/helpers.js
var unprotected = Symbol();
function assertNotSet(value, name) {
	if (value) throw new TypeError(`${name} can only be called once`);
}
function decodeBase64url(value, label, ErrorClass) {
	try {
		return decode(value);
	} catch {
		throw new ErrorClass(`Failed to base64url decode the ${label}`);
	}
}
async function digest(algorithm, data) {
	const subtleDigest = `SHA-${algorithm.slice(-3)}`;
	return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/type_checks.js
var isObjectLike = (value) => typeof value === "object" && value !== null;
function isObject(input) {
	if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") return false;
	if (Object.getPrototypeOf(input) === null) return true;
	let proto = input;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(input) === proto;
}
function isDisjoint(...headers) {
	const sources = headers.filter(Boolean);
	if (sources.length === 0 || sources.length === 1) return true;
	let acc;
	for (const header of sources) {
		const parameters = Object.keys(header);
		if (!acc || acc.size === 0) {
			acc = new Set(parameters);
			continue;
		}
		for (const parameter of parameters) {
			if (acc.has(parameter)) return false;
			acc.add(parameter);
		}
	}
	return true;
}
var isJWK = (key) => isObject(key) && typeof key.kty === "string";
var isPrivateJWK = (key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
var isPublicJWK = (key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0;
var isSecretJWK = (key) => key.kty === "oct" && typeof key.k === "string";
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/aeskw.js
function checkKeySize(key, alg) {
	if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) throw new TypeError(`Invalid key size for alg: ${alg}`);
}
function getCryptoKey$2(key, alg, usage) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, "AES-KW", true, [usage]);
	checkEncCryptoKey(key, alg, usage);
	return key;
}
async function wrap$2(alg, key, cek) {
	const cryptoKey = await getCryptoKey$2(key, alg, "wrapKey");
	checkKeySize(cryptoKey, alg);
	const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, {
		hash: "SHA-256",
		name: "HMAC"
	}, true, ["sign"]);
	return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
}
async function unwrap$2(alg, key, encryptedKey) {
	const cryptoKey = await getCryptoKey$2(key, alg, "unwrapKey");
	checkKeySize(cryptoKey, alg);
	const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", {
		hash: "SHA-256",
		name: "HMAC"
	}, true, ["sign"]);
	return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/ecdhes.js
function lengthAndInput(input) {
	return concat(uint32be(input.length), input);
}
async function concatKdf(Z, L, OtherInfo) {
	const dkLen = L >> 3;
	const hashLen = 32;
	const reps = Math.ceil(dkLen / hashLen);
	const dk = new Uint8Array(reps * hashLen);
	for (let i = 1; i <= reps; i++) {
		const hashInput = new Uint8Array(4 + Z.length + OtherInfo.length);
		hashInput.set(uint32be(i), 0);
		hashInput.set(Z, 4);
		hashInput.set(OtherInfo, 4 + Z.length);
		const hashResult = await digest("sha256", hashInput);
		dk.set(hashResult, (i - 1) * hashLen);
	}
	return dk.slice(0, dkLen);
}
async function deriveKey$1(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(), apv = new Uint8Array()) {
	checkEncCryptoKey(publicKey, "ECDH");
	checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
	const otherInfo = concat(lengthAndInput(encode$1(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength), new Uint8Array());
	return concatKdf(new Uint8Array(await crypto.subtle.deriveBits({
		name: publicKey.algorithm.name,
		public: publicKey
	}, privateKey, getEcdhBitLength(publicKey))), keyLength, otherInfo);
}
function getEcdhBitLength(publicKey) {
	if (publicKey.algorithm.name === "X25519") return 256;
	return Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3;
}
function allowed(key) {
	switch (key.algorithm.namedCurve) {
		case "P-256":
		case "P-384":
		case "P-521": return true;
		default: return key.algorithm.name === "X25519";
	}
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/pbes2kw.js
function getCryptoKey$1(key, alg) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
	checkEncCryptoKey(key, alg, "deriveBits");
	return key;
}
var concatSalt = (alg, p2sInput) => concat(encode$1(alg), Uint8Array.of(0), p2sInput);
async function deriveKey(p2s, alg, p2c, key) {
	if (!(p2s instanceof Uint8Array) || p2s.length < 8) throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
	if (!Number.isSafeInteger(p2c) || Math.sign(p2c) !== 1) throw new JWEInvalid("PBES2 Count Input must be a positive integer");
	const salt = concatSalt(alg, p2s);
	const keylen = parseInt(alg.slice(13, 16), 10);
	const subtleAlg = {
		hash: `SHA-${alg.slice(8, 11)}`,
		iterations: p2c,
		name: "PBKDF2",
		salt
	};
	const cryptoKey = await getCryptoKey$1(key, alg);
	return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
}
async function wrap$1(alg, key, cek, p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16))) {
	const derived = await deriveKey(p2s, alg, p2c, key);
	return {
		encryptedKey: await wrap$2(alg.slice(-6), derived, cek),
		p2c,
		p2s: encode(p2s)
	};
}
async function unwrap$1(alg, key, encryptedKey, p2c, p2s) {
	const derived = await deriveKey(p2s, alg, p2c, key);
	return unwrap$2(alg.slice(-6), derived, encryptedKey);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/signing.js
function checkKeyLength(alg, key) {
	if (alg.startsWith("RS") || alg.startsWith("PS")) {
		const { modulusLength } = key.algorithm;
		if (typeof modulusLength !== "number" || modulusLength < 2048) throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
	}
}
function subtleAlgorithm$1(alg, algorithm) {
	const hash = `SHA-${alg.slice(-3)}`;
	switch (alg) {
		case "HS256":
		case "HS384":
		case "HS512": return {
			hash,
			name: "HMAC"
		};
		case "PS256":
		case "PS384":
		case "PS512": return {
			hash,
			name: "RSA-PSS",
			saltLength: parseInt(alg.slice(-3), 10) >> 3
		};
		case "RS256":
		case "RS384":
		case "RS512": return {
			hash,
			name: "RSASSA-PKCS1-v1_5"
		};
		case "ES256":
		case "ES384":
		case "ES512": return {
			hash,
			name: "ECDSA",
			namedCurve: algorithm.namedCurve
		};
		case "Ed25519":
		case "EdDSA": return { name: "Ed25519" };
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87": return { name: alg };
		default: throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
	}
}
async function getSigKey(alg, key, usage) {
	if (key instanceof Uint8Array) {
		if (!alg.startsWith("HS")) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
		return crypto.subtle.importKey("raw", key, {
			hash: `SHA-${alg.slice(-3)}`,
			name: "HMAC"
		}, false, [usage]);
	}
	checkSigCryptoKey(key, alg, usage);
	return key;
}
async function sign(alg, key, data) {
	const cryptoKey = await getSigKey(alg, key, "sign");
	checkKeyLength(alg, cryptoKey);
	const signature = await crypto.subtle.sign(subtleAlgorithm$1(alg, cryptoKey.algorithm), cryptoKey, data);
	return new Uint8Array(signature);
}
async function verify(alg, key, signature, data) {
	const cryptoKey = await getSigKey(alg, key, "verify");
	checkKeyLength(alg, cryptoKey);
	const algorithm = subtleAlgorithm$1(alg, cryptoKey.algorithm);
	try {
		return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
	} catch {
		return false;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/rsaes.js
var subtleAlgorithm = (alg) => {
	switch (alg) {
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512": return "RSA-OAEP";
		default: throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
	}
};
async function encrypt(alg, key, cek) {
	checkEncCryptoKey(key, alg, "encrypt");
	checkKeyLength(alg, key);
	return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm(alg), key, cek));
}
async function decrypt(alg, key, encryptedKey) {
	checkEncCryptoKey(key, alg, "decrypt");
	checkKeyLength(alg, key);
	return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm(alg), key, encryptedKey));
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/jwk_to_key.js
var unsupportedAlg = "Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value";
function subtleMapping(jwk) {
	let algorithm;
	let keyUsages;
	switch (jwk.kty) {
		case "AKP":
			switch (jwk.alg) {
				case "ML-DSA-44":
				case "ML-DSA-65":
				case "ML-DSA-87":
					algorithm = { name: jwk.alg };
					keyUsages = jwk.priv ? ["sign"] : ["verify"];
					break;
				default: throw new JOSENotSupported(unsupportedAlg);
			}
			break;
		case "RSA":
			switch (jwk.alg) {
				case "PS256":
				case "PS384":
				case "PS512":
					algorithm = {
						name: "RSA-PSS",
						hash: `SHA-${jwk.alg.slice(-3)}`
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "RS256":
				case "RS384":
				case "RS512":
					algorithm = {
						name: "RSASSA-PKCS1-v1_5",
						hash: `SHA-${jwk.alg.slice(-3)}`
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "RSA-OAEP":
				case "RSA-OAEP-256":
				case "RSA-OAEP-384":
				case "RSA-OAEP-512":
					algorithm = {
						name: "RSA-OAEP",
						hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
					};
					keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
					break;
				default: throw new JOSENotSupported(unsupportedAlg);
			}
			break;
		case "EC":
			switch (jwk.alg) {
				case "ES256":
				case "ES384":
				case "ES512":
					algorithm = {
						name: "ECDSA",
						namedCurve: {
							ES256: "P-256",
							ES384: "P-384",
							ES512: "P-521"
						}[jwk.alg]
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					algorithm = {
						name: "ECDH",
						namedCurve: jwk.crv
					};
					keyUsages = jwk.d ? ["deriveBits"] : [];
					break;
				default: throw new JOSENotSupported(unsupportedAlg);
			}
			break;
		case "OKP":
			switch (jwk.alg) {
				case "Ed25519":
				case "EdDSA":
					algorithm = { name: "Ed25519" };
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					algorithm = { name: jwk.crv };
					keyUsages = jwk.d ? ["deriveBits"] : [];
					break;
				default: throw new JOSENotSupported(unsupportedAlg);
			}
			break;
		default: throw new JOSENotSupported("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm,
		keyUsages
	};
}
async function jwkToKey(jwk) {
	if (!jwk.alg) throw new TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	const { algorithm, keyUsages } = subtleMapping(jwk);
	const keyData = { ...jwk };
	if (keyData.kty !== "AKP") delete keyData.alg;
	delete keyData.use;
	return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/normalize_key.js
var unusableForAlg = "given KeyObject instance cannot be used for this algorithm";
var cache$1;
var handleJWK = async (key, jwk, alg, freeze = false) => {
	cache$1 ||= /* @__PURE__ */ new WeakMap();
	let cached = cache$1.get(key);
	if (cached?.[alg]) return cached[alg];
	const cryptoKey = await jwkToKey({
		...jwk,
		alg
	});
	if (freeze) Object.freeze(key);
	if (!cached) cache$1.set(key, { [alg]: cryptoKey });
	else cached[alg] = cryptoKey;
	return cryptoKey;
};
var handleKeyObject = (keyObject, alg) => {
	cache$1 ||= /* @__PURE__ */ new WeakMap();
	let cached = cache$1.get(keyObject);
	if (cached?.[alg]) return cached[alg];
	const isPublic = keyObject.type === "public";
	const extractable = isPublic ? true : false;
	let cryptoKey;
	if (keyObject.asymmetricKeyType === "x25519") {
		switch (alg) {
			case "ECDH-ES":
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW": break;
			default: throw new TypeError(unusableForAlg);
		}
		cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
	}
	if (keyObject.asymmetricKeyType === "ed25519") {
		if (alg !== "EdDSA" && alg !== "Ed25519") throw new TypeError(unusableForAlg);
		cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [isPublic ? "verify" : "sign"]);
	}
	switch (keyObject.asymmetricKeyType) {
		case "ml-dsa-44":
		case "ml-dsa-65":
		case "ml-dsa-87":
			if (alg !== keyObject.asymmetricKeyType.toUpperCase()) throw new TypeError(unusableForAlg);
			cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [isPublic ? "verify" : "sign"]);
	}
	if (keyObject.asymmetricKeyType === "rsa") {
		let hash;
		switch (alg) {
			case "RSA-OAEP":
				hash = "SHA-1";
				break;
			case "RS256":
			case "PS256":
			case "RSA-OAEP-256":
				hash = "SHA-256";
				break;
			case "RS384":
			case "PS384":
			case "RSA-OAEP-384":
				hash = "SHA-384";
				break;
			case "RS512":
			case "PS512":
			case "RSA-OAEP-512":
				hash = "SHA-512";
				break;
			default: throw new TypeError(unusableForAlg);
		}
		if (alg.startsWith("RSA-OAEP")) return keyObject.toCryptoKey({
			name: "RSA-OAEP",
			hash
		}, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
		cryptoKey = keyObject.toCryptoKey({
			name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
			hash
		}, extractable, [isPublic ? "verify" : "sign"]);
	}
	if (keyObject.asymmetricKeyType === "ec") {
		const namedCurve = new Map([
			["prime256v1", "P-256"],
			["secp384r1", "P-384"],
			["secp521r1", "P-521"]
		]).get(keyObject.asymmetricKeyDetails?.namedCurve);
		if (!namedCurve) throw new TypeError(unusableForAlg);
		const expectedCurve = {
			ES256: "P-256",
			ES384: "P-384",
			ES512: "P-521"
		};
		if (expectedCurve[alg] && namedCurve === expectedCurve[alg]) cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg.startsWith("ECDH-ES")) cryptoKey = keyObject.toCryptoKey({
			name: "ECDH",
			namedCurve
		}, extractable, isPublic ? [] : ["deriveBits"]);
	}
	if (!cryptoKey) throw new TypeError(unusableForAlg);
	if (!cached) cache$1.set(keyObject, { [alg]: cryptoKey });
	else cached[alg] = cryptoKey;
	return cryptoKey;
};
async function normalizeKey(key, alg) {
	if (key instanceof Uint8Array) return key;
	if (isCryptoKey(key)) return key;
	if (isKeyObject(key)) {
		if (key.type === "secret") return key.export();
		if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") try {
			return handleKeyObject(key, alg);
		} catch (err) {
			if (err instanceof TypeError) throw err;
		}
		return handleJWK(key, key.export({ format: "jwk" }), alg);
	}
	if (isJWK(key)) {
		if (key.k) return decode(key.k);
		return handleJWK(key, key, alg, true);
	}
	throw new Error("unreachable");
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/key/import.js
async function importJWK(jwk, alg, options) {
	if (!isObject(jwk)) throw new TypeError("JWK must be an object");
	let ext;
	alg ??= jwk.alg;
	ext ??= options?.extractable ?? jwk.ext;
	switch (jwk.kty) {
		case "oct":
			if (typeof jwk.k !== "string" || !jwk.k) throw new TypeError("missing \"k\" (Key Value) Parameter value");
			return decode(jwk.k);
		case "RSA":
			if ("oth" in jwk && jwk.oth !== void 0) throw new JOSENotSupported("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
			return jwkToKey({
				...jwk,
				alg,
				ext
			});
		case "AKP":
			if (typeof jwk.alg !== "string" || !jwk.alg) throw new TypeError("missing \"alg\" (Algorithm) Parameter value");
			if (alg !== void 0 && alg !== jwk.alg) throw new TypeError("JWK alg and alg option value mismatch");
			return jwkToKey({
				...jwk,
				ext
			});
		case "EC":
		case "OKP": return jwkToKey({
			...jwk,
			alg,
			ext
		});
		default: throw new JOSENotSupported("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/key_to_jwk.js
async function keyToJWK(key) {
	if (isKeyObject(key)) if (key.type === "secret") key = key.export();
	else return key.export({ format: "jwk" });
	if (key instanceof Uint8Array) return {
		kty: "oct",
		k: encode(key)
	};
	if (!isCryptoKey(key)) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "Uint8Array"));
	if (!key.extractable) throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	const { ext, key_ops, alg, use, ...jwk } = await crypto.subtle.exportKey("jwk", key);
	if (jwk.kty === "AKP") jwk.alg = alg;
	return jwk;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/key/export.js
async function exportJWK(key) {
	return keyToJWK(key);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/aesgcmkw.js
async function wrap(alg, key, cek, iv) {
	const wrapped = await encrypt$1(alg.slice(0, 7), cek, key, iv, new Uint8Array());
	return {
		encryptedKey: wrapped.ciphertext,
		iv: encode(wrapped.iv),
		tag: encode(wrapped.tag)
	};
}
async function unwrap(alg, key, encryptedKey, iv, tag) {
	return decrypt$1(alg.slice(0, 7), key, encryptedKey, iv, tag, new Uint8Array());
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/key_management.js
var unsupportedAlgHeader = "Invalid or unsupported \"alg\" (JWE Algorithm) header value";
function assertEncryptedKey(encryptedKey) {
	if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
}
async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
	switch (alg) {
		case "dir":
			if (encryptedKey !== void 0) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
			return key;
		case "ECDH-ES": if (encryptedKey !== void 0) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			if (!isObject(joseHeader.epk)) throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
			assertCryptoKey(key);
			if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
			const epk = await importJWK(joseHeader.epk, alg);
			assertCryptoKey(epk);
			let partyUInfo;
			let partyVInfo;
			if (joseHeader.apu !== void 0) {
				if (typeof joseHeader.apu !== "string") throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
				partyUInfo = decodeBase64url(joseHeader.apu, "apu", JWEInvalid);
			}
			if (joseHeader.apv !== void 0) {
				if (typeof joseHeader.apv !== "string") throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
				partyVInfo = decodeBase64url(joseHeader.apv, "apv", JWEInvalid);
			}
			const sharedSecret = await deriveKey$1(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? cekLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
			if (alg === "ECDH-ES") return sharedSecret;
			assertEncryptedKey(encryptedKey);
			return unwrap$2(alg.slice(-6), sharedSecret, encryptedKey);
		}
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			assertEncryptedKey(encryptedKey);
			assertCryptoKey(key);
			return decrypt(alg, key, encryptedKey);
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW": {
			assertEncryptedKey(encryptedKey);
			if (typeof joseHeader.p2c !== "number") throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
			const p2cLimit = options?.maxPBES2Count || 1e4;
			if (joseHeader.p2c > p2cLimit) throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
			if (typeof joseHeader.p2s !== "string") throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
			let p2s;
			p2s = decodeBase64url(joseHeader.p2s, "p2s", JWEInvalid);
			return unwrap$1(alg, key, encryptedKey, joseHeader.p2c, p2s);
		}
		case "A128KW":
		case "A192KW":
		case "A256KW":
			assertEncryptedKey(encryptedKey);
			return unwrap$2(alg, key, encryptedKey);
		case "A128GCMKW":
		case "A192GCMKW":
		case "A256GCMKW": {
			assertEncryptedKey(encryptedKey);
			if (typeof joseHeader.iv !== "string") throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
			if (typeof joseHeader.tag !== "string") throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
			let iv;
			iv = decodeBase64url(joseHeader.iv, "iv", JWEInvalid);
			let tag;
			tag = decodeBase64url(joseHeader.tag, "tag", JWEInvalid);
			return unwrap(alg, key, encryptedKey, iv, tag);
		}
		default: throw new JOSENotSupported(unsupportedAlgHeader);
	}
}
async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
	let encryptedKey;
	let parameters;
	let cek;
	switch (alg) {
		case "dir":
			cek = key;
			break;
		case "ECDH-ES":
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			assertCryptoKey(key);
			if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
			const { apu, apv } = providedParameters;
			let ephemeralKey;
			if (providedParameters.epk) ephemeralKey = await normalizeKey(providedParameters.epk, alg);
			else ephemeralKey = (await crypto.subtle.generateKey(key.algorithm, true, ["deriveBits"])).privateKey;
			const { x, y, crv, kty } = await exportJWK(ephemeralKey);
			const sharedSecret = await deriveKey$1(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? cekLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
			parameters = { epk: {
				x,
				crv,
				kty
			} };
			if (kty === "EC") parameters.epk.y = y;
			if (apu) parameters.apu = encode(apu);
			if (apv) parameters.apv = encode(apv);
			if (alg === "ECDH-ES") {
				cek = sharedSecret;
				break;
			}
			cek = providedCek || generateCek(enc);
			encryptedKey = await wrap$2(alg.slice(-6), sharedSecret, cek);
			break;
		}
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			cek = providedCek || generateCek(enc);
			assertCryptoKey(key);
			encryptedKey = await encrypt(alg, key, cek);
			break;
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW": {
			cek = providedCek || generateCek(enc);
			const { p2c, p2s } = providedParameters;
			({encryptedKey, ...parameters} = await wrap$1(alg, key, cek, p2c, p2s));
			break;
		}
		case "A128KW":
		case "A192KW":
		case "A256KW":
			cek = providedCek || generateCek(enc);
			encryptedKey = await wrap$2(alg, key, cek);
			break;
		case "A128GCMKW":
		case "A192GCMKW":
		case "A256GCMKW": {
			cek = providedCek || generateCek(enc);
			const { iv } = providedParameters;
			({encryptedKey, ...parameters} = await wrap(alg, key, cek, iv));
			break;
		}
		default: throw new JOSENotSupported(unsupportedAlgHeader);
	}
	return {
		cek,
		encryptedKey,
		parameters
	};
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
	if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!protectedHeader || protectedHeader.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) throw new Err("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let recognized;
	if (recognizedOption !== void 0) recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
	else recognized = recognizedDefault;
	for (const parameter of protectedHeader.crit) {
		if (!recognized.has(parameter)) throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
		if (joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
		if (recognized.get(parameter) && protectedHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
	}
	return new Set(protectedHeader.crit);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/validate_algorithms.js
function validateAlgorithms(option, algorithms) {
	if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) throw new TypeError(`"${option}" option must be an array of strings`);
	if (!algorithms) return;
	return new Set(algorithms);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/check_key_type.js
var tag = (key) => key?.[Symbol.toStringTag];
var jwkMatchesOp = (alg, key, usage) => {
	if (key.use !== void 0) {
		let expected;
		switch (usage) {
			case "sign":
			case "verify":
				expected = "sig";
				break;
			case "encrypt":
			case "decrypt":
				expected = "enc";
				break;
		}
		if (key.use !== expected) throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
	}
	if (key.alg !== void 0 && key.alg !== alg) throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
	if (Array.isArray(key.key_ops)) {
		let expectedKeyOp;
		switch (true) {
			case usage === "sign" || usage === "verify":
			case alg === "dir":
			case alg.includes("CBC-HS"):
				expectedKeyOp = usage;
				break;
			case alg.startsWith("PBES2"):
				expectedKeyOp = "deriveBits";
				break;
			case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
				if (!alg.includes("GCM") && alg.endsWith("KW")) expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
				else expectedKeyOp = usage;
				break;
			case usage === "encrypt" && alg.startsWith("RSA"):
				expectedKeyOp = "wrapKey";
				break;
			case usage === "decrypt":
				expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
				break;
		}
		if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
	}
	return true;
};
var symmetricTypeCheck = (alg, key, usage) => {
	if (key instanceof Uint8Array) return;
	if (isJWK(key)) {
		if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage)) return;
		throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
	}
	if (!isKeyLike(key)) throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
	if (key.type !== "secret") throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
};
var asymmetricTypeCheck = (alg, key, usage) => {
	if (isJWK(key)) switch (usage) {
		case "decrypt":
		case "sign":
			if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage)) return;
			throw new TypeError(`JSON Web Key for this operation must be a private JWK`);
		case "encrypt":
		case "verify":
			if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage)) return;
			throw new TypeError(`JSON Web Key for this operation must be a public JWK`);
	}
	if (!isKeyLike(key)) throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
	if (key.type === "secret") throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
	if (key.type === "public") switch (usage) {
		case "sign": throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
		case "decrypt": throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
	}
	if (key.type === "private") switch (usage) {
		case "verify": throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
		case "encrypt": throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
	}
};
function checkKeyType(alg, key, usage) {
	switch (alg.substring(0, 2)) {
		case "A1":
		case "A2":
		case "di":
		case "HS":
		case "PB":
			symmetricTypeCheck(alg, key, usage);
			break;
		default: asymmetricTypeCheck(alg, key, usage);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/deflate.js
function supported(name) {
	if (typeof globalThis[name] === "undefined") throw new JOSENotSupported(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${name} API.`);
}
async function compress(input) {
	supported("CompressionStream");
	const cs = new CompressionStream("deflate-raw");
	const writer = cs.writable.getWriter();
	writer.write(input).catch(() => {});
	writer.close().catch(() => {});
	const chunks = [];
	const reader = cs.readable.getReader();
	for (;;) {
		const { value, done } = await reader.read();
		if (done) break;
		chunks.push(value);
	}
	return concat(...chunks);
}
async function decompress(input, maxLength) {
	supported("DecompressionStream");
	const ds = new DecompressionStream("deflate-raw");
	const writer = ds.writable.getWriter();
	writer.write(input).catch(() => {});
	writer.close().catch(() => {});
	const chunks = [];
	let length = 0;
	const reader = ds.readable.getReader();
	for (;;) {
		const { value, done } = await reader.read();
		if (done) break;
		chunks.push(value);
		length += value.byteLength;
		if (maxLength !== Infinity && length > maxLength) throw new JWEInvalid("Decompressed plaintext exceeded the configured limit");
	}
	return concat(...chunks);
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwe/flattened/decrypt.js
async function flattenedDecrypt(jwe, key, options) {
	if (!isObject(jwe)) throw new JWEInvalid("Flattened JWE must be an object");
	if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) throw new JWEInvalid("JOSE Header missing");
	if (jwe.iv !== void 0 && typeof jwe.iv !== "string") throw new JWEInvalid("JWE Initialization Vector incorrect type");
	if (typeof jwe.ciphertext !== "string") throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
	if (jwe.tag !== void 0 && typeof jwe.tag !== "string") throw new JWEInvalid("JWE Authentication Tag incorrect type");
	if (jwe.protected !== void 0 && typeof jwe.protected !== "string") throw new JWEInvalid("JWE Protected Header incorrect type");
	if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") throw new JWEInvalid("JWE Encrypted Key incorrect type");
	if (jwe.aad !== void 0 && typeof jwe.aad !== "string") throw new JWEInvalid("JWE AAD incorrect type");
	if (jwe.header !== void 0 && !isObject(jwe.header)) throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
	if (jwe.unprotected !== void 0 && !isObject(jwe.unprotected)) throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
	let parsedProt;
	if (jwe.protected) try {
		const protectedHeader = decode(jwe.protected);
		parsedProt = JSON.parse(decoder.decode(protectedHeader));
	} catch {
		throw new JWEInvalid("JWE Protected Header is invalid");
	}
	if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...parsedProt,
		...jwe.header,
		...jwe.unprotected
	};
	validateCrit(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
	if (joseHeader.zip !== void 0 && joseHeader.zip !== "DEF") throw new JOSENotSupported("Unsupported JWE \"zip\" (Compression Algorithm) Header Parameter value.");
	if (joseHeader.zip !== void 0 && !parsedProt?.zip) throw new JWEInvalid("JWE \"zip\" (Compression Algorithm) Header Parameter MUST be in a protected header.");
	const { alg, enc } = joseHeader;
	if (typeof alg !== "string" || !alg) throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
	if (typeof enc !== "string" || !enc) throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
	const keyManagementAlgorithms = options && validateAlgorithms("keyManagementAlgorithms", options.keyManagementAlgorithms);
	const contentEncryptionAlgorithms = options && validateAlgorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
	if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) throw new JOSEAlgNotAllowed("\"enc\" (Encryption Algorithm) Header Parameter value not allowed");
	let encryptedKey;
	if (jwe.encrypted_key !== void 0) encryptedKey = decodeBase64url(jwe.encrypted_key, "encrypted_key", JWEInvalid);
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jwe);
		resolvedKey = true;
	}
	checkKeyType(alg === "dir" ? enc : alg, key, "decrypt");
	const k = await normalizeKey(key, alg);
	let cek;
	try {
		cek = await decryptKeyManagement(alg, k, encryptedKey, joseHeader, options);
	} catch (err) {
		if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) throw err;
		cek = generateCek(enc);
	}
	let iv;
	let tag;
	if (jwe.iv !== void 0) iv = decodeBase64url(jwe.iv, "iv", JWEInvalid);
	if (jwe.tag !== void 0) tag = decodeBase64url(jwe.tag, "tag", JWEInvalid);
	const protectedHeader = jwe.protected !== void 0 ? encode$1(jwe.protected) : new Uint8Array();
	let additionalData;
	if (jwe.aad !== void 0) additionalData = concat(protectedHeader, encode$1("."), encode$1(jwe.aad));
	else additionalData = protectedHeader;
	const ciphertext = decodeBase64url(jwe.ciphertext, "ciphertext", JWEInvalid);
	const plaintext = await decrypt$1(enc, cek, ciphertext, iv, tag, additionalData);
	const result = { plaintext };
	if (joseHeader.zip === "DEF") {
		const maxDecompressedLength = options?.maxDecompressedLength ?? 25e4;
		if (maxDecompressedLength === 0) throw new JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
		if (maxDecompressedLength !== Infinity && (!Number.isSafeInteger(maxDecompressedLength) || maxDecompressedLength < 1)) throw new TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
		result.plaintext = await decompress(plaintext, maxDecompressedLength).catch((cause) => {
			if (cause instanceof JWEInvalid) throw cause;
			throw new JWEInvalid("Failed to decompress plaintext", { cause });
		});
	}
	if (jwe.protected !== void 0) result.protectedHeader = parsedProt;
	if (jwe.aad !== void 0) result.additionalAuthenticatedData = decodeBase64url(jwe.aad, "aad", JWEInvalid);
	if (jwe.unprotected !== void 0) result.sharedUnprotectedHeader = jwe.unprotected;
	if (jwe.header !== void 0) result.unprotectedHeader = jwe.header;
	if (resolvedKey) return {
		...result,
		key: k
	};
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwe/compact/decrypt.js
async function compactDecrypt(jwe, key, options) {
	if (jwe instanceof Uint8Array) jwe = decoder.decode(jwe);
	if (typeof jwe !== "string") throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
	const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
	if (length !== 5) throw new JWEInvalid("Invalid Compact JWE");
	const decrypted = await flattenedDecrypt({
		ciphertext,
		iv: iv || void 0,
		protected: protectedHeader,
		tag: tag || void 0,
		encrypted_key: encryptedKey || void 0
	}, key, options);
	const result = {
		plaintext: decrypted.plaintext,
		protectedHeader: decrypted.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: decrypted.key
	};
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwe/flattened/encrypt.js
var FlattenedEncrypt = class {
	#plaintext;
	#protectedHeader;
	#sharedUnprotectedHeader;
	#unprotectedHeader;
	#aad;
	#cek;
	#iv;
	#keyManagementParameters;
	constructor(plaintext) {
		if (!(plaintext instanceof Uint8Array)) throw new TypeError("plaintext must be an instance of Uint8Array");
		this.#plaintext = plaintext;
	}
	setKeyManagementParameters(parameters) {
		assertNotSet(this.#keyManagementParameters, "setKeyManagementParameters");
		this.#keyManagementParameters = parameters;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		assertNotSet(this.#protectedHeader, "setProtectedHeader");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setSharedUnprotectedHeader(sharedUnprotectedHeader) {
		assertNotSet(this.#sharedUnprotectedHeader, "setSharedUnprotectedHeader");
		this.#sharedUnprotectedHeader = sharedUnprotectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		assertNotSet(this.#unprotectedHeader, "setUnprotectedHeader");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	setAdditionalAuthenticatedData(aad) {
		this.#aad = aad;
		return this;
	}
	setContentEncryptionKey(cek) {
		assertNotSet(this.#cek, "setContentEncryptionKey");
		this.#cek = cek;
		return this;
	}
	setInitializationVector(iv) {
		assertNotSet(this.#iv, "setInitializationVector");
		this.#iv = iv;
		return this;
	}
	async encrypt(key, options) {
		if (!this.#protectedHeader && !this.#unprotectedHeader && !this.#sharedUnprotectedHeader) throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
		if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader, this.#sharedUnprotectedHeader)) throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
		const joseHeader = {
			...this.#protectedHeader,
			...this.#unprotectedHeader,
			...this.#sharedUnprotectedHeader
		};
		validateCrit(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this.#protectedHeader, joseHeader);
		if (joseHeader.zip !== void 0 && joseHeader.zip !== "DEF") throw new JOSENotSupported("Unsupported JWE \"zip\" (Compression Algorithm) Header Parameter value.");
		if (joseHeader.zip !== void 0 && !this.#protectedHeader?.zip) throw new JWEInvalid("JWE \"zip\" (Compression Algorithm) Header Parameter MUST be in a protected header.");
		const { alg, enc } = joseHeader;
		if (typeof alg !== "string" || !alg) throw new JWEInvalid("JWE \"alg\" (Algorithm) Header Parameter missing or invalid");
		if (typeof enc !== "string" || !enc) throw new JWEInvalid("JWE \"enc\" (Encryption Algorithm) Header Parameter missing or invalid");
		let encryptedKey;
		if (this.#cek && (alg === "dir" || alg === "ECDH-ES")) throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
		checkKeyType(alg === "dir" ? enc : alg, key, "encrypt");
		let cek;
		{
			let parameters;
			const k = await normalizeKey(key, alg);
			({cek, encryptedKey, parameters} = await encryptKeyManagement(alg, enc, k, this.#cek, this.#keyManagementParameters));
			if (parameters) if (options && unprotected in options) if (!this.#unprotectedHeader) this.setUnprotectedHeader(parameters);
			else this.#unprotectedHeader = {
				...this.#unprotectedHeader,
				...parameters
			};
			else if (!this.#protectedHeader) this.setProtectedHeader(parameters);
			else this.#protectedHeader = {
				...this.#protectedHeader,
				...parameters
			};
		}
		let additionalData;
		let protectedHeaderS;
		let protectedHeaderB;
		let aadMember;
		if (this.#protectedHeader) {
			protectedHeaderS = encode(JSON.stringify(this.#protectedHeader));
			protectedHeaderB = encode$1(protectedHeaderS);
		} else {
			protectedHeaderS = "";
			protectedHeaderB = new Uint8Array();
		}
		if (this.#aad) {
			aadMember = encode(this.#aad);
			const aadMemberBytes = encode$1(aadMember);
			additionalData = concat(protectedHeaderB, encode$1("."), aadMemberBytes);
		} else additionalData = protectedHeaderB;
		let plaintext = this.#plaintext;
		if (joseHeader.zip === "DEF") plaintext = await compress(plaintext).catch((cause) => {
			throw new JWEInvalid("Failed to compress plaintext", { cause });
		});
		const { ciphertext, tag, iv } = await encrypt$1(enc, plaintext, cek, this.#iv, additionalData);
		const jwe = { ciphertext: encode(ciphertext) };
		if (iv) jwe.iv = encode(iv);
		if (tag) jwe.tag = encode(tag);
		if (encryptedKey) jwe.encrypted_key = encode(encryptedKey);
		if (aadMember) jwe.aad = aadMember;
		if (this.#protectedHeader) jwe.protected = protectedHeaderS;
		if (this.#sharedUnprotectedHeader) jwe.unprotected = this.#sharedUnprotectedHeader;
		if (this.#unprotectedHeader) jwe.header = this.#unprotectedHeader;
		return jwe;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
	if (!isObject(jws)) throw new JWSInvalid("Flattened JWS must be an object");
	if (jws.protected === void 0 && jws.header === void 0) throw new JWSInvalid("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (jws.protected !== void 0 && typeof jws.protected !== "string") throw new JWSInvalid("JWS Protected Header incorrect type");
	if (jws.payload === void 0) throw new JWSInvalid("JWS Payload missing");
	if (typeof jws.signature !== "string") throw new JWSInvalid("JWS Signature missing or incorrect type");
	if (jws.header !== void 0 && !isObject(jws.header)) throw new JWSInvalid("JWS Unprotected Header incorrect type");
	let parsedProt = {};
	if (jws.protected) try {
		const protectedHeader = decode(jws.protected);
		parsedProt = JSON.parse(decoder.decode(protectedHeader));
	} catch {
		throw new JWSInvalid("JWS Protected Header is invalid");
	}
	if (!isDisjoint(parsedProt, jws.header)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...parsedProt,
		...jws.header
	};
	const extensions = validateCrit(JWSInvalid, new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
	let b64 = true;
	if (extensions.has("b64")) {
		b64 = parsedProt.b64;
		if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	}
	const { alg } = joseHeader;
	if (typeof alg !== "string" || !alg) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
	if (algorithms && !algorithms.has(alg)) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (b64) {
		if (typeof jws.payload !== "string") throw new JWSInvalid("JWS Payload must be a string");
	} else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jws);
		resolvedKey = true;
	}
	checkKeyType(alg, key, "verify");
	const data = concat(jws.protected !== void 0 ? encode$1(jws.protected) : new Uint8Array(), encode$1("."), typeof jws.payload === "string" ? b64 ? encode$1(jws.payload) : encoder.encode(jws.payload) : jws.payload);
	const signature = decodeBase64url(jws.signature, "signature", JWSInvalid);
	const k = await normalizeKey(key, alg);
	if (!await verify(alg, k, signature, data)) throw new JWSSignatureVerificationFailed();
	let payload;
	if (b64) payload = decodeBase64url(jws.payload, "payload", JWSInvalid);
	else if (typeof jws.payload === "string") payload = encoder.encode(jws.payload);
	else payload = jws.payload;
	const result = { payload };
	if (jws.protected !== void 0) result.protectedHeader = parsedProt;
	if (jws.header !== void 0) result.unprotectedHeader = jws.header;
	if (resolvedKey) return {
		...result,
		key: k
	};
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jws/compact/verify.js
async function compactVerify(jws, key, options) {
	if (jws instanceof Uint8Array) jws = decoder.decode(jws);
	if (typeof jws !== "string") throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
	const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
	if (length !== 3) throw new JWSInvalid("Invalid Compact JWS");
	const verified = await flattenedVerify({
		payload,
		protected: protectedHeader,
		signature
	}, key, options);
	const result = {
		payload: verified.payload,
		protectedHeader: verified.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: verified.key
	};
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = (date) => Math.floor(date.getTime() / 1e3);
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX$1 = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
	const matched = REGEX$1.exec(str);
	if (!matched || matched[4] && matched[1]) throw new TypeError("Invalid time period format");
	const value = parseFloat(matched[2]);
	const unit = matched[3].toLowerCase();
	let numericDate;
	switch (unit) {
		case "sec":
		case "secs":
		case "second":
		case "seconds":
		case "s":
			numericDate = Math.round(value);
			break;
		case "minute":
		case "minutes":
		case "min":
		case "mins":
		case "m":
			numericDate = Math.round(value * minute);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			numericDate = Math.round(value * hour);
			break;
		case "day":
		case "days":
		case "d":
			numericDate = Math.round(value * day);
			break;
		case "week":
		case "weeks":
		case "w":
			numericDate = Math.round(value * week);
			break;
		default:
			numericDate = Math.round(value * year);
			break;
	}
	if (matched[1] === "-" || matched[4] === "ago") return -numericDate;
	return numericDate;
}
function validateInput(label, input) {
	if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
	return input;
}
var normalizeTyp = (value) => {
	if (value.includes("/")) return value.toLowerCase();
	return `application/${value.toLowerCase()}`;
};
var checkAudiencePresence = (audPayload, audOption) => {
	if (typeof audPayload === "string") return audOption.includes(audPayload);
	if (Array.isArray(audPayload)) return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
	return false;
};
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
	let payload;
	try {
		payload = JSON.parse(decoder.decode(encodedPayload));
	} catch {}
	if (!isObject(payload)) throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
	const { typ } = options;
	if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) throw new JWTClaimValidationFailed("unexpected \"typ\" JWT header value", payload, "typ", "check_failed");
	const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
	const presenceCheck = [...requiredClaims];
	if (maxTokenAge !== void 0) presenceCheck.push("iat");
	if (audience !== void 0) presenceCheck.push("aud");
	if (subject !== void 0) presenceCheck.push("sub");
	if (issuer !== void 0) presenceCheck.push("iss");
	for (const claim of new Set(presenceCheck.reverse())) if (!(claim in payload)) throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
	if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) throw new JWTClaimValidationFailed("unexpected \"iss\" claim value", payload, "iss", "check_failed");
	if (subject && payload.sub !== subject) throw new JWTClaimValidationFailed("unexpected \"sub\" claim value", payload, "sub", "check_failed");
	if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) throw new JWTClaimValidationFailed("unexpected \"aud\" claim value", payload, "aud", "check_failed");
	let tolerance;
	switch (typeof options.clockTolerance) {
		case "string":
			tolerance = secs(options.clockTolerance);
			break;
		case "number":
			tolerance = options.clockTolerance;
			break;
		case "undefined":
			tolerance = 0;
			break;
		default: throw new TypeError("Invalid clockTolerance option type");
	}
	const { currentDate } = options;
	const now = epoch(currentDate || /* @__PURE__ */ new Date());
	if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") throw new JWTClaimValidationFailed("\"iat\" claim must be a number", payload, "iat", "invalid");
	if (payload.nbf !== void 0) {
		if (typeof payload.nbf !== "number") throw new JWTClaimValidationFailed("\"nbf\" claim must be a number", payload, "nbf", "invalid");
		if (payload.nbf > now + tolerance) throw new JWTClaimValidationFailed("\"nbf\" claim timestamp check failed", payload, "nbf", "check_failed");
	}
	if (payload.exp !== void 0) {
		if (typeof payload.exp !== "number") throw new JWTClaimValidationFailed("\"exp\" claim must be a number", payload, "exp", "invalid");
		if (payload.exp <= now - tolerance) throw new JWTExpired("\"exp\" claim timestamp check failed", payload, "exp", "check_failed");
	}
	if (maxTokenAge) {
		const age = now - payload.iat;
		const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
		if (age - tolerance > max) throw new JWTExpired("\"iat\" claim timestamp check failed (too far in the past)", payload, "iat", "check_failed");
		if (age < 0 - tolerance) throw new JWTClaimValidationFailed("\"iat\" claim timestamp check failed (it should be in the past)", payload, "iat", "check_failed");
	}
	return payload;
}
var JWTClaimsBuilder = class {
	#payload;
	constructor(payload) {
		if (!isObject(payload)) throw new TypeError("JWT Claims Set MUST be an object");
		this.#payload = structuredClone(payload);
	}
	data() {
		return encoder.encode(JSON.stringify(this.#payload));
	}
	get iss() {
		return this.#payload.iss;
	}
	set iss(value) {
		this.#payload.iss = value;
	}
	get sub() {
		return this.#payload.sub;
	}
	set sub(value) {
		this.#payload.sub = value;
	}
	get aud() {
		return this.#payload.aud;
	}
	set aud(value) {
		this.#payload.aud = value;
	}
	set jti(value) {
		this.#payload.jti = value;
	}
	set nbf(value) {
		if (typeof value === "number") this.#payload.nbf = validateInput("setNotBefore", value);
		else if (value instanceof Date) this.#payload.nbf = validateInput("setNotBefore", epoch(value));
		else this.#payload.nbf = epoch(/* @__PURE__ */ new Date()) + secs(value);
	}
	set exp(value) {
		if (typeof value === "number") this.#payload.exp = validateInput("setExpirationTime", value);
		else if (value instanceof Date) this.#payload.exp = validateInput("setExpirationTime", epoch(value));
		else this.#payload.exp = epoch(/* @__PURE__ */ new Date()) + secs(value);
	}
	set iat(value) {
		if (value === void 0) this.#payload.iat = epoch(/* @__PURE__ */ new Date());
		else if (value instanceof Date) this.#payload.iat = validateInput("setIssuedAt", epoch(value));
		else if (typeof value === "string") this.#payload.iat = validateInput("setIssuedAt", epoch(/* @__PURE__ */ new Date()) + secs(value));
		else this.#payload.iat = validateInput("setIssuedAt", value);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
	const verified = await compactVerify(jwt, key, options);
	if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
	const result = {
		payload: validateClaimsSet(verified.protectedHeader, verified.payload, options),
		protectedHeader: verified.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: verified.key
	};
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwt/decrypt.js
async function jwtDecrypt(jwt, key, options) {
	const decrypted = await compactDecrypt(jwt, key, options);
	const payload = validateClaimsSet(decrypted.protectedHeader, decrypted.plaintext, options);
	const { protectedHeader } = decrypted;
	if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) throw new JWTClaimValidationFailed("replicated \"iss\" claim header parameter mismatch", payload, "iss", "mismatch");
	if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) throw new JWTClaimValidationFailed("replicated \"sub\" claim header parameter mismatch", payload, "sub", "mismatch");
	if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) throw new JWTClaimValidationFailed("replicated \"aud\" claim header parameter mismatch", payload, "aud", "mismatch");
	const result = {
		payload,
		protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: decrypted.key
	};
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwe/compact/encrypt.js
var CompactEncrypt = class {
	#flattened;
	constructor(plaintext) {
		this.#flattened = new FlattenedEncrypt(plaintext);
	}
	setContentEncryptionKey(cek) {
		this.#flattened.setContentEncryptionKey(cek);
		return this;
	}
	setInitializationVector(iv) {
		this.#flattened.setInitializationVector(iv);
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		return this;
	}
	setKeyManagementParameters(parameters) {
		this.#flattened.setKeyManagementParameters(parameters);
		return this;
	}
	async encrypt(key, options) {
		const jwe = await this.#flattened.encrypt(key, options);
		return [
			jwe.protected,
			jwe.encrypted_key,
			jwe.iv,
			jwe.ciphertext,
			jwe.tag
		].join(".");
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jws/flattened/sign.js
var FlattenedSign = class {
	#payload;
	#protectedHeader;
	#unprotectedHeader;
	constructor(payload) {
		if (!(payload instanceof Uint8Array)) throw new TypeError("payload must be an instance of Uint8Array");
		this.#payload = payload;
	}
	setProtectedHeader(protectedHeader) {
		assertNotSet(this.#protectedHeader, "setProtectedHeader");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		assertNotSet(this.#unprotectedHeader, "setUnprotectedHeader");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	async sign(key, options) {
		if (!this.#protectedHeader && !this.#unprotectedHeader) throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		const joseHeader = {
			...this.#protectedHeader,
			...this.#unprotectedHeader
		};
		const extensions = validateCrit(JWSInvalid, new Map([["b64", true]]), options?.crit, this.#protectedHeader, joseHeader);
		let b64 = true;
		if (extensions.has("b64")) {
			b64 = this.#protectedHeader.b64;
			if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		}
		const { alg } = joseHeader;
		if (typeof alg !== "string" || !alg) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		checkKeyType(alg, key, "sign");
		let payloadS;
		let payloadB;
		if (b64) {
			payloadS = encode(this.#payload);
			payloadB = encode$1(payloadS);
		} else {
			payloadB = this.#payload;
			payloadS = "";
		}
		let protectedHeaderString;
		let protectedHeaderBytes;
		if (this.#protectedHeader) {
			protectedHeaderString = encode(JSON.stringify(this.#protectedHeader));
			protectedHeaderBytes = encode$1(protectedHeaderString);
		} else {
			protectedHeaderString = "";
			protectedHeaderBytes = new Uint8Array();
		}
		const data = concat(protectedHeaderBytes, encode$1("."), payloadB);
		const jws = {
			signature: encode(await sign(alg, await normalizeKey(key, alg), data)),
			payload: payloadS
		};
		if (this.#unprotectedHeader) jws.header = this.#unprotectedHeader;
		if (this.#protectedHeader) jws.protected = protectedHeaderString;
		return jws;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jws/compact/sign.js
var CompactSign = class {
	#flattened;
	constructor(payload) {
		this.#flattened = new FlattenedSign(payload);
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		return this;
	}
	async sign(key, options) {
		const jws = await this.#flattened.sign(key, options);
		if (jws.payload === void 0) throw new TypeError("use the flattened module for creating JWS with b64: false");
		return `${jws.protected}.${jws.payload}.${jws.signature}`;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwt/sign.js
var SignJWT = class {
	#protectedHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#protectedHeader = protectedHeader;
		return this;
	}
	async sign(key, options) {
		const sig = new CompactSign(this.#jwt.data());
		sig.setProtectedHeader(this.#protectedHeader);
		if (Array.isArray(this.#protectedHeader?.crit) && this.#protectedHeader.crit.includes("b64") && this.#protectedHeader.b64 === false) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
		return sig.sign(key, options);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwt/encrypt.js
var EncryptJWT = class {
	#cek;
	#iv;
	#keyManagementParameters;
	#protectedHeader;
	#replicateIssuerAsHeader;
	#replicateSubjectAsHeader;
	#replicateAudienceAsHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		assertNotSet(this.#protectedHeader, "setProtectedHeader");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setKeyManagementParameters(parameters) {
		assertNotSet(this.#keyManagementParameters, "setKeyManagementParameters");
		this.#keyManagementParameters = parameters;
		return this;
	}
	setContentEncryptionKey(cek) {
		assertNotSet(this.#cek, "setContentEncryptionKey");
		this.#cek = cek;
		return this;
	}
	setInitializationVector(iv) {
		assertNotSet(this.#iv, "setInitializationVector");
		this.#iv = iv;
		return this;
	}
	replicateIssuerAsHeader() {
		this.#replicateIssuerAsHeader = true;
		return this;
	}
	replicateSubjectAsHeader() {
		this.#replicateSubjectAsHeader = true;
		return this;
	}
	replicateAudienceAsHeader() {
		this.#replicateAudienceAsHeader = true;
		return this;
	}
	async encrypt(key, options) {
		const enc = new CompactEncrypt(this.#jwt.data());
		if (this.#protectedHeader && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader)) this.#protectedHeader = {
			...this.#protectedHeader,
			iss: this.#replicateIssuerAsHeader ? this.#jwt.iss : void 0,
			sub: this.#replicateSubjectAsHeader ? this.#jwt.sub : void 0,
			aud: this.#replicateAudienceAsHeader ? this.#jwt.aud : void 0
		};
		enc.setProtectedHeader(this.#protectedHeader);
		if (this.#iv) enc.setInitializationVector(this.#iv);
		if (this.#cek) enc.setContentEncryptionKey(this.#cek);
		if (this.#keyManagementParameters) enc.setKeyManagementParameters(this.#keyManagementParameters);
		return enc.encrypt(key, options);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwk/thumbprint.js
var check = (value, description) => {
	if (typeof value !== "string" || !value) throw new JWKInvalid(`${description} missing or invalid`);
};
async function calculateJwkThumbprint(key, digestAlgorithm) {
	let jwk;
	if (isJWK(key)) jwk = key;
	else if (isKeyLike(key)) jwk = await exportJWK(key);
	else throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
	digestAlgorithm ??= "sha256";
	if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") throw new TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let components;
	switch (jwk.kty) {
		case "AKP":
			check(jwk.alg, "\"alg\" (Algorithm) Parameter");
			check(jwk.pub, "\"pub\" (Public key) Parameter");
			components = {
				alg: jwk.alg,
				kty: jwk.kty,
				pub: jwk.pub
			};
			break;
		case "EC":
			check(jwk.crv, "\"crv\" (Curve) Parameter");
			check(jwk.x, "\"x\" (X Coordinate) Parameter");
			check(jwk.y, "\"y\" (Y Coordinate) Parameter");
			components = {
				crv: jwk.crv,
				kty: jwk.kty,
				x: jwk.x,
				y: jwk.y
			};
			break;
		case "OKP":
			check(jwk.crv, "\"crv\" (Subtype of Key Pair) Parameter");
			check(jwk.x, "\"x\" (Public Key) Parameter");
			components = {
				crv: jwk.crv,
				kty: jwk.kty,
				x: jwk.x
			};
			break;
		case "RSA":
			check(jwk.e, "\"e\" (Exponent) Parameter");
			check(jwk.n, "\"n\" (Modulus) Parameter");
			components = {
				e: jwk.e,
				kty: jwk.kty,
				n: jwk.n
			};
			break;
		case "oct":
			check(jwk.k, "\"k\" (Key Value) Parameter");
			components = {
				k: jwk.k,
				kty: jwk.kty
			};
			break;
		default: throw new JOSENotSupported("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	const data = encode$1(JSON.stringify(components));
	return encode(await digest(digestAlgorithm, data));
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/decode_protected_header.js
function decodeProtectedHeader(token) {
	let protectedB64u;
	if (typeof token === "string") {
		const parts = token.split(".");
		if (parts.length === 3 || parts.length === 5) [protectedB64u] = parts;
	} else if (typeof token === "object" && token) if ("protected" in token) protectedB64u = token.protected;
	else throw new TypeError("Token does not contain a Protected Header");
	try {
		if (typeof protectedB64u !== "string" || !protectedB64u) throw new Error();
		const result = JSON.parse(decoder.decode(decode(protectedB64u)));
		if (!isObject(result)) throw new Error();
		return result;
	} catch {
		throw new TypeError("Invalid Token or Protected Header formatting");
	}
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/crypto/jwt.mjs
async function signJWT(payload, secret, expiresIn = 3600) {
	return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
	try {
		return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
	} catch {
		return null;
	}
}
var info = new Uint8Array([
	66,
	101,
	116,
	116,
	101,
	114,
	65,
	117,
	116,
	104,
	46,
	106,
	115,
	32,
	71,
	101,
	110,
	101,
	114,
	97,
	116,
	101,
	100,
	32,
	69,
	110,
	99,
	114,
	121,
	112,
	116,
	105,
	111,
	110,
	32,
	75,
	101,
	121
]);
var now = () => Date.now() / 1e3 | 0;
var alg = "dir";
var enc = "A256CBC-HS512";
function deriveEncryptionSecret(secret, salt) {
	return hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
}
function getCurrentSecret(secret) {
	if (typeof secret === "string") return secret;
	const value = secret.keys.get(secret.currentVersion);
	if (!value) throw new Error(`Secret version ${secret.currentVersion} not found in keys`);
	return value;
}
function getAllSecrets(secret) {
	if (typeof secret === "string") return [{
		version: 0,
		value: secret
	}];
	const result = [];
	for (const [version, value] of secret.keys) result.push({
		version,
		value
	});
	if (secret.legacySecret && !result.some((s) => s.value === secret.legacySecret)) result.push({
		version: -1,
		value: secret.legacySecret
	});
	return result;
}
async function symmetricEncodeJWT(payload, secret, salt, expiresIn = 3600) {
	const encryptionSecret = deriveEncryptionSecret(getCurrentSecret(secret), salt);
	const thumbprint = await calculateJwkThumbprint({
		kty: "oct",
		k: encode(encryptionSecret)
	}, "sha256");
	return await new EncryptJWT(payload).setProtectedHeader({
		alg,
		enc,
		kid: thumbprint
	}).setIssuedAt().setExpirationTime(now() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
var jwtDecryptOpts = {
	clockTolerance: 15,
	keyManagementAlgorithms: [alg],
	contentEncryptionAlgorithms: [enc, "A256GCM"]
};
async function symmetricDecodeJWT(token, secret, salt) {
	if (!token) return null;
	let hasKid = false;
	try {
		hasKid = decodeProtectedHeader(token).kid !== void 0;
	} catch {
		return null;
	}
	try {
		const secrets = getAllSecrets(secret);
		const { payload } = await jwtDecrypt(token, async (protectedHeader) => {
			const kid = protectedHeader.kid;
			if (kid !== void 0) {
				for (const s of secrets) {
					const encryptionSecret = deriveEncryptionSecret(s.value, salt);
					if (kid === await calculateJwkThumbprint({
						kty: "oct",
						k: encode(encryptionSecret)
					}, "sha256")) return encryptionSecret;
				}
				throw new Error("no matching decryption secret");
			}
			if (secrets.length === 1) return deriveEncryptionSecret(secrets[0].value, salt);
			return deriveEncryptionSecret(secrets[0].value, salt);
		}, jwtDecryptOpts);
		return payload;
	} catch {
		if (hasKid) return null;
		const secrets = getAllSecrets(secret);
		if (secrets.length <= 1) return null;
		for (let i = 1; i < secrets.length; i++) try {
			const s = secrets[i];
			const { payload } = await jwtDecrypt(token, deriveEncryptionSecret(s.value, salt), jwtDecryptOpts);
			return payload;
		} catch {
			continue;
		}
		return null;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/crypto/buffer.mjs
/**
* Compare two buffers in constant time.
*/
function constantTimeEqual(a, b) {
	if (typeof a === "string") a = new TextEncoder().encode(a);
	if (typeof b === "string") b = new TextEncoder().encode(b);
	const aBuffer = new Uint8Array(a);
	const bBuffer = new Uint8Array(b);
	let c = aBuffer.length ^ bBuffer.length;
	const length = Math.max(aBuffer.length, bBuffer.length);
	for (let i = 0; i < length; i++) c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
	return c === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/@noble+ciphers@2.2.0/node_modules/@noble/ciphers/utils.js
/**
* Utilities for hex, bytes, CSPRNG.
* @module
*/
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
/**
* Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
* @param a - Value to inspect.
* @returns `true` when the value is a Uint8Array view, including Node's `Buffer`.
* @example
* Guards a value before treating it as raw key material.
*
* ```ts
* isBytes(new Uint8Array());
* ```
*/
function isBytes(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
/**
* Asserts something is boolean.
* @param b - Value to validate.
* @throws On wrong argument types. {@link TypeError}
* @example
* Validates a boolean option before branching on it.
*
* ```ts
* abool(true);
* ```
*/
function abool(b) {
	if (typeof b !== "boolean") throw new TypeError(`boolean expected, not ${b}`);
}
/**
* Asserts something is a non-negative safe integer.
* @param n - Value to validate.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validates a non-negative length or counter.
*
* ```ts
* anumber(1);
* ```
*/
function anumber(n) {
	if (typeof n !== "number") throw new TypeError("number expected, got " + typeof n);
	if (!Number.isSafeInteger(n) || n < 0) throw new RangeError("positive integer expected, got " + n);
}
/**
* Asserts something is Uint8Array.
* @param value - Value to validate.
* @param length - Expected byte length.
* @param title - Optional label used in error messages.
* @returns The validated byte array.
* On Node, `Buffer` is accepted too because it is a Uint8Array view.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument lengths. {@link RangeError}
* @example
* Validates a fixed-length nonce or key buffer.
*
* ```ts
* abytes(new Uint8Array([1, 2]), 2);
* ```
*/
function abytes(value, length, title = "") {
	const bytes = isBytes(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		const message = prefix + "expected Uint8Array" + ofLen + ", got " + got;
		if (!bytes) throw new TypeError(message);
		throw new RangeError(message);
	}
	return value;
}
/**
* Asserts a hash- or MAC-like instance has not been destroyed or finished.
* @param instance - Stateful instance to validate.
* @param checkFinished - Whether to reject finished instances.
* When `false`, only `destroyed` is checked.
* @throws If the hash instance has already been destroyed or finalized. {@link Error}
* @example
* Guards against calling `update()` or `digest()` on a finished hash.
*
* ```ts
* aexists({ destroyed: false, finished: false });
* ```
*/
function aexists(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/**
* Asserts output is a properly-sized byte array.
* @param out - Output buffer to validate.
* @param instance - Hash-like instance providing `outputLen`.
* This is the relaxed `digestInto()`-style contract: output must be at least `outputLen`,
* unlike one-shot cipher helpers elsewhere in the repo that often require exact lengths.
* @throws On wrong argument types. {@link TypeError}
* @param onlyAligned - Whether `out` must be 4-byte aligned for zero-allocation word views.
* @throws On wrong output buffer lengths. {@link RangeError}
* @throws On wrong output buffer alignment. {@link Error}
* @example
* Verifies that a caller-provided output buffer is large enough.
*
* ```ts
* aoutput(new Uint8Array(16), { outputLen: 16 });
* ```
*/
function aoutput(out, instance, onlyAligned = false) {
	abytes(out, void 0, "output");
	const min = instance.outputLen;
	if (out.length < min) throw new RangeError("digestInto() expects output buffer of length at least " + min);
	if (onlyAligned && !isAligned32(out)) throw new Error("invalid output, must be aligned");
}
/**
* Casts a typed-array view to Uint32Array.
* @param arr - Typed-array view to reinterpret.
* @returns Uint32Array view over the same bytes. Callers are expected to provide a
* 4-byte-aligned offset; trailing `1..3` bytes are silently dropped.
* @example
* Views a byte buffer as 32-bit words for block processing.
*
* ```ts
* u32(new Uint8Array(4));
* ```
*/
function u32(arr) {
	return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
/**
* Zeroizes typed arrays in place.
* Warning: JS provides no guarantees.
* @param arrays - Arrays to wipe.
* @example
* Wipes a temporary key buffer after use.
*
* ```ts
* const bytes = new Uint8Array([1]);
* clean(bytes);
* ```
*/
function clean(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/**
* Creates a DataView for byte-level manipulation.
* @param arr - Typed-array view to wrap.
* @returns DataView over the same bytes.
* @example
* Creates an endian-aware view for length encoding.
*
* ```ts
* createView(new Uint8Array(4));
* ```
*/
function createView(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/**
* Whether the current platform is little-endian.
* Most are; some IBM systems are not.
*/
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
/**
* Reverses byte order of one 32-bit word.
* @param word - Unsigned 32-bit word to swap.
* @returns The same word with bytes reversed.
* @example
* Swaps a big-endian word into little-endian byte order.
*
* ```ts
* byteSwap(0x11223344);
* ```
*/
var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
/**
* Normalizes one 32-bit word to the little-endian representation expected by cipher cores.
* @param n - Unsigned 32-bit word to normalize.
* @returns Little-endian normalized word on big-endian hosts, else the input word unchanged.
* @example
* Normalizes a host-endian word before passing it into an ARX/AES core.
*
* ```ts
* swap8IfBE(0x11223344);
* ```
*/
var swap8IfBE = isLE ? (n) => n : (n) => byteSwap(n) >>> 0;
/**
* Byte-swaps every word of a Uint32Array in place.
* @param arr - Uint32Array whose words should be swapped.
* @returns The same array after in-place byte swapping.
* @example
* Swaps every 32-bit word in a word-view buffer.
*
* ```ts
* byteSwap32(new Uint32Array([0x11223344]));
* ```
*/
var byteSwap32 = (arr) => {
	for (let i = 0; i < arr.length; i++) arr[i] = byteSwap(arr[i]);
	return arr;
};
/**
* Normalizes a Uint32Array view to the little-endian representation expected by cipher cores.
* @param u - Word view to normalize in place.
* @returns Little-endian normalized word view.
* @example
* Normalizes a word-view buffer before block processing.
*
* ```ts
* swap32IfBE(new Uint32Array([0x11223344]));
* ```
*/
var swap32IfBE = isLE ? (u) => u : byteSwap32;
var hasHexBuiltin = typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/**
* Convert byte array to hex string. Uses built-in function, when available.
* @param bytes - Bytes to encode.
* @returns Lowercase hexadecimal string.
* @throws On wrong argument types. {@link TypeError}
* @example
* Formats ciphertext bytes for logs or test vectors.
*
* ```ts
* bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])); // 'cafe0123'
* ```
*/
function bytesToHex(bytes) {
	abytes(bytes);
	if (hasHexBuiltin) return bytes.toHex();
	let hex = "";
	for (let i = 0; i < bytes.length; i++) hex += hexes[bytes[i]];
	return hex;
}
var asciis = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function asciiToBase16(ch) {
	if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0;
	if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10);
	if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10);
}
/**
* Convert hex string to byte array. Uses built-in function, when available.
* @param hex - Hexadecimal string to decode.
* @returns Decoded bytes.
* @throws On wrong argument types. {@link TypeError}
* @throws On malformed hexadecimal input. {@link RangeError}
* @example
* Parses a hex test vector into bytes.
*
* ```ts
* hexToBytes('cafe0123'); // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
* ```
*/
function hexToBytes(hex) {
	if (typeof hex !== "string") throw new TypeError("hex string expected, got " + typeof hex);
	if (hasHexBuiltin) try {
		return Uint8Array.fromHex(hex);
	} catch (error) {
		if (error instanceof SyntaxError) throw new RangeError(error.message);
		throw error;
	}
	const hl = hex.length;
	const al = hl / 2;
	if (hl % 2) throw new RangeError("hex string expected, got unpadded hex of length " + hl);
	const array = new Uint8Array(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = asciiToBase16(hex.charCodeAt(hi));
		const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) {
			const char = hex[hi] + hex[hi + 1];
			throw new RangeError("hex string expected, got non-hex character \"" + char + "\" at index " + hi);
		}
		array[ai] = n1 * 16 + n2;
	}
	return array;
}
/**
* Converts string to bytes using UTF8 encoding.
* @param str - String to encode.
* @returns UTF-8 bytes in a detached fresh Uint8Array copy.
* @throws On wrong argument types. {@link TypeError}
* @example
* Encodes application text before encryption or MACing.
*
* ```ts
* utf8ToBytes('abc'); // new Uint8Array([97, 98, 99])
* ```
*/
function utf8ToBytes(str) {
	if (typeof str !== "string") throw new TypeError("string expected");
	return new Uint8Array(new TextEncoder().encode(str));
}
/**
* Checks if two U8A use same underlying buffer and overlaps.
* This is invalid and can corrupt data.
* @param a - First byte view.
* @param b - Second byte view.
* @returns `true` when the views overlap in memory.
* @example
* Detects whether two slices alias the same backing buffer.
*
* ```ts
* overlapBytes(new Uint8Array(4), new Uint8Array(4));
* ```
*/
function overlapBytes(a, b) {
	if (!a.byteLength || !b.byteLength) return false;
	return a.buffer === b.buffer && a.byteOffset < b.byteOffset + b.byteLength && b.byteOffset < a.byteOffset + a.byteLength;
}
/**
* Copies several Uint8Arrays into one.
* @param arrays - Byte arrays to concatenate.
* @returns Combined byte array.
* @throws On wrong argument types inside the byte-array list. {@link TypeError}
* @example
* Builds a `nonce || ciphertext` style buffer.
*
* ```ts
* concatBytes(new Uint8Array([1]), new Uint8Array([2]));
* ```
*/
function concatBytes(...arrays) {
	let sum = 0;
	for (let i = 0; i < arrays.length; i++) {
		const a = arrays[i];
		abytes(a);
		sum += a.length;
	}
	const res = new Uint8Array(sum);
	for (let i = 0, pad = 0; i < arrays.length; i++) {
		const a = arrays[i];
		res.set(a, pad);
		pad += a.length;
	}
	return res;
}
/**
* Merges user options into defaults.
* @param defaults - Default option values.
* @param opts - User-provided overrides.
* @returns Combined options object.
* The merge mutates `defaults` in place and returns the same object.
* @throws If options are missing or not an object. {@link Error}
* @example
* Applies user overrides to the default cipher options.
*
* ```ts
* checkOpts({ rounds: 20 }, { rounds: 8 });
* ```
*/
function checkOpts(defaults, opts) {
	if (opts == null || typeof opts !== "object") throw new Error("options must be defined");
	return Object.assign(defaults, opts);
}
/**
* Compares two byte arrays in kinda constant time once lengths already match.
* @param a - First byte array.
* @param b - Second byte array.
* @returns `true` when the arrays contain the same bytes. Different lengths still return early.
* @example
* Compares an expected authentication tag with the received one.
*
* ```ts
* equalBytes(new Uint8Array([1]), new Uint8Array([1]));
* ```
*/
function equalBytes(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
	return diff === 0;
}
/**
* Wraps a keyed MAC constructor into a one-shot helper with `.create()`.
* @param keyLen - Valid probe-key length used to read static metadata once.
* The probe key is only used for `outputLen` / `blockLen`, so callers with several valid key sizes
* can pass any representative size as long as those values stay fixed.
* @param macCons - Keyed MAC constructor or factory.
* @param fromMsg - Optional adapter that derives extra constructor args from the one-shot message.
* @returns Callable MAC helper with `.create()`.
*/
function wrapMacConstructor(keyLen, macCons, fromMsg) {
	const mac = macCons;
	const getArgs = fromMsg || (() => []);
	const macC = (msg, key) => mac(key, ...getArgs(msg)).update(msg).digest();
	const tmp = mac(new Uint8Array(keyLen), ...getArgs(new Uint8Array(0)));
	macC.outputLen = tmp.outputLen;
	macC.blockLen = tmp.blockLen;
	macC.create = (key, ...args) => mac(key, ...args);
	return macC;
}
/**
* Wraps a cipher: validates args, ensures encrypt() can only be called once.
* Used internally by the exported cipher constructors.
* Output-buffer support is inferred from the wrapped `encrypt` / `decrypt`
* arity (`fn.length === 2`), and tag-bearing constructors are expected to use
* `args[1]` for optional AAD.
* @__NO_SIDE_EFFECTS__
* @param params - Static cipher metadata. See {@link CipherParams}.
* @param constructor - Cipher constructor.
* @returns Wrapped constructor with validation.
*/
var wrapCipher = (params, constructor) => {
	function wrappedCipher(key, ...args) {
		abytes(key, void 0, "key");
		if (params.nonceLength !== void 0) {
			const nonce = args[0];
			abytes(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
		}
		const tagl = params.tagLength;
		if (tagl && args[1] !== void 0) abytes(args[1], void 0, "AAD");
		const cipher = constructor(key, ...args);
		const checkOutput = (fnLength, output) => {
			if (output !== void 0) {
				if (fnLength !== 2) throw new Error("cipher output not supported");
				abytes(output, void 0, "output");
			}
		};
		let called = false;
		return {
			encrypt(data, output) {
				if (called) throw new Error("cannot encrypt() twice with same key + nonce");
				called = true;
				abytes(data);
				checkOutput(cipher.encrypt.length, output);
				return cipher.encrypt(data, output);
			},
			decrypt(data, output) {
				abytes(data);
				if (tagl && data.length < tagl) throw new Error("\"ciphertext\" expected length bigger than tagLength=" + tagl);
				checkOutput(cipher.decrypt.length, output);
				return cipher.decrypt(data, output);
			}
		};
	}
	Object.assign(wrappedCipher, params);
	return wrappedCipher;
};
/**
* By default, returns u8a of length.
* When out is available, it checks it for validity and uses it.
* @param expectedLength - Required output length.
* @param out - Optional destination buffer.
* @param onlyAligned - Whether `out` must be 4-byte aligned.
* @returns Output buffer ready for writing.
* @throws On wrong argument types. {@link TypeError}
* @throws If the provided output buffer has the wrong size or alignment. {@link Error}
* @example
* Reuses a caller-provided output buffer when lengths match.
*
* ```ts
* getOutput(16, new Uint8Array(16));
* ```
*/
function getOutput(expectedLength, out, onlyAligned = true) {
	if (out === void 0) return new Uint8Array(expectedLength);
	abytes(out, void 0, "output");
	if (out.length !== expectedLength) throw new Error("\"output\" expected Uint8Array of length " + expectedLength + ", got: " + out.length);
	if (onlyAligned && !isAligned32(out)) throw new Error("invalid output, must be aligned");
	return out;
}
/**
* Encodes data and AAD bit lengths into a 16-byte buffer.
* @param dataLength - Data length in bits.
* @param aadLength - AAD length in bits.
* The serialized block is still `aadLength || dataLength`, matching GCM/Poly1305
* conventions even though the helper parameter order is `(dataLength, aadLength)`.
* @param isLE - Whether to encode lengths as little-endian.
* @returns 16-byte length block.
* @throws On wrong argument types passed to the endian validator. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Builds the length block appended by GCM and Poly1305.
*
* ```ts
* u64Lengths(16, 8, true);
* ```
*/
function u64Lengths(dataLength, aadLength, isLE) {
	anumber(dataLength);
	anumber(aadLength);
	abool(isLE);
	const num = new Uint8Array(16);
	const view = createView(num);
	view.setBigUint64(0, BigInt(aadLength), isLE);
	view.setBigUint64(8, BigInt(dataLength), isLE);
	return num;
}
/**
* Checks whether a byte array is aligned to a 4-byte offset.
* @param bytes - Byte array to inspect.
* @returns `true` when the view is 4-byte aligned.
* @example
* Checks whether a buffer can be safely viewed as Uint32Array.
*
* ```ts
* isAligned32(new Uint8Array(4));
* ```
*/
function isAligned32(bytes) {
	return bytes.byteOffset % 4 === 0;
}
/**
* Copies bytes into a new Uint8Array.
* @param bytes - Bytes to copy.
* @returns Copied byte array.
* @throws On wrong argument types. {@link TypeError}
* @example
* Copies input into an aligned Uint8Array before block processing.
*
* ```ts
* copyBytes(new Uint8Array([1, 2]));
* ```
*/
function copyBytes(bytes) {
	return Uint8Array.from(abytes(bytes));
}
/**
* Cryptographically secure PRNG.
* Uses internal OS-level `crypto.getRandomValues`.
* @param bytesLength - Number of bytes to produce.
* Validation is delegated to `Uint8Array(bytesLength)` and `getRandomValues`, so
* non-integers, negative lengths, and oversize requests surface backend/runtime errors.
* @returns Random byte array.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @throws If the runtime does not expose `crypto.getRandomValues`. {@link Error}
* @example
* Generates a fresh nonce or key.
*
* ```ts
* randomBytes(16);
* ```
*/
function randomBytes(bytesLength = 32) {
	anumber(bytesLength);
	const cr = typeof globalThis === "object" ? globalThis.crypto : null;
	if (typeof cr?.getRandomValues !== "function") throw new Error("crypto.getRandomValues must be defined");
	return cr.getRandomValues(new Uint8Array(bytesLength));
}
/**
* Uses CSPRNG for nonce, nonce injected in ciphertext.
* For `encrypt`, a `nonceBytes`-length buffer is fetched from CSPRNG and
* prepended to encrypted ciphertext. For `decrypt`, first `nonceBytes` of ciphertext
* are treated as nonce. The wrapper always allocates a fresh `nonce || ciphertext`
* buffer on encrypt and intentionally does not support caller-provided destination buffers.
* Too-short decrypt inputs are split into short/empty nonce views and then delegated
* to the wrapped cipher instead of being rejected here first.
*
* NOTE: Under the same key, using random nonces (e.g. `managedNonce`) with AES-GCM and ChaCha
* should be limited to `2**23` (8M) messages to get a collision chance of
* `2**-50`. Stretching to `2**32` (4B) messages would raise that chance to
* `2**-33`, still negligible but creeping up.
* @param fn - Cipher constructor that expects a nonce.
* @param randomBytes_ - Random-byte source used for nonce generation.
* @returns Cipher constructor that prepends the nonce to ciphertext.
* @throws On wrong argument types. {@link TypeError}
* @throws On invalid nonce lengths observed at wrapper construction or use. {@link RangeError}
* @example
* Prepends a fresh random nonce to every ciphertext.
*
* ```ts
* import { gcm } from '@noble/ciphers/aes.js';
* import { managedNonce, randomBytes } from '@noble/ciphers/utils.js';
* const wrapped = managedNonce(gcm);
* const key = randomBytes(16);
* const ciphertext = wrapped(key).encrypt(new Uint8Array([1, 2, 3]));
* wrapped(key).decrypt(ciphertext);
* ```
*/
function managedNonce(fn, randomBytes_ = randomBytes) {
	const { nonceLength } = fn;
	anumber(nonceLength);
	const addNonce = (nonce, ciphertext, plaintext) => {
		const out = concatBytes(nonce, ciphertext);
		if (!overlapBytes(plaintext, ciphertext)) ciphertext.fill(0);
		return out;
	};
	const res = ((key, ...args) => ({
		encrypt(plaintext) {
			abytes(plaintext);
			const nonce = randomBytes_(nonceLength);
			const encrypted = fn(key, nonce, ...args).encrypt(plaintext);
			if (encrypted instanceof Promise) return encrypted.then((ct) => addNonce(nonce, ct, plaintext));
			return addNonce(nonce, encrypted, plaintext);
		},
		decrypt(ciphertext) {
			abytes(ciphertext);
			const nonce = ciphertext.subarray(0, nonceLength);
			const decrypted = ciphertext.subarray(nonceLength);
			return fn(key, nonce, ...args).decrypt(decrypted);
		}
	}));
	if ("blockSize" in fn) res.blockSize = fn.blockSize;
	if ("tagLength" in fn) res.tagLength = fn.tagLength;
	return res;
}
//#endregion
//#region ../../node_modules/.pnpm/@noble+ciphers@2.2.0/node_modules/@noble/ciphers/_arx.js
/**
* Basic utils for ARX (add-rotate-xor) salsa and chacha ciphers.

RFC8439 requires multi-step cipher stream, where
authKey starts with counter: 0, actual msg with counter: 1.

For this, we need a way to re-use nonce / counter:

const counter = new Uint8Array(4);
chacha(..., counter, ...); // counter is now 1
chacha(..., counter, ...); // counter is now 2

This is complicated:

- 32-bit counters are enough, no need for 64-bit: max ArrayBuffer size in JS is 4GB
- Original papers don't allow mutating counters
- Counter overflow is undefined [^1]
- Idea A: allow providing (nonce | counter) instead of just nonce, re-use it
- Caveat: Cannot be re-used through all cases:
- * chacha has (counter | nonce)
- * xchacha has (nonce16 | counter | nonce16)
- Idea B: separate nonce / counter and provide separate API for counter re-use
- Caveat: there are different counter sizes depending on an algorithm.
- salsa & chacha also differ in structures of key & sigma:
salsa20:      s[0] | k(4) | s[1] | nonce(2) | cnt(2) | s[2] | k(4) | s[3]
chacha:       s(4) | k(8) | cnt(1) | nonce(3)
chacha20orig: s(4) | k(8) | cnt(2) | nonce(2)
- Idea C: helper method such as `setSalsaState(key, nonce, sigma, data)`
- Caveat: we can't re-use counter array

xchacha uses the subkey and remaining 8 byte nonce with ChaCha20 as normal
(prefixed by 4 NUL bytes, since RFC8439 specifies a 12-byte nonce).
Counter overflow is undefined; see {@link https://mailarchive.ietf.org/arch/msg/cfrg/gsOnTJzcbgG6OqD8Sc0GO5aR_tU/ | the CFRG thread}.
Current noble policy is strict non-wrap for the shared 32-bit counter path:
exported ARX ciphers reject initial `0xffffffff` and stop before any implicit
wrap back to zero.
See {@link https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha#appendix-A.2 | the XChaCha appendix} for the extended-nonce construction.

* @module
*/
var encodeStr = (str) => Uint8Array.from(str.split(""), (c) => c.charCodeAt(0));
var sigma16_32 = swap32IfBE(u32(encodeStr("expand 16-byte k")));
var sigma32_32 = swap32IfBE(u32(encodeStr("expand 32-byte k")));
/**
* Rotates a 32-bit word left.
* @param a - Input word.
* @param b - Rotation count in bits.
* @returns Rotated 32-bit word.
* @example
* Moves the top byte of `0x12345678` into the low byte position.
* ```ts
* rotl(0x12345678, 8);
* ```
*/
function rotl(a, b) {
	return a << b | a >>> 32 - b;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = /* @__PURE__ */ Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
	const len = data.length;
	const block = new Uint8Array(BLOCK_LEN);
	const b32 = u32(block);
	const isAligned = isLE && isAligned32(data) && isAligned32(output);
	const d32 = isAligned ? u32(data) : U32_EMPTY;
	const o32 = isAligned ? u32(output) : U32_EMPTY;
	if (!isLE) {
		for (let pos = 0; pos < len; counter++) {
			core(sigma, key, nonce, b32, counter, rounds);
			swap32IfBE(b32);
			if (counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
			const take = Math.min(BLOCK_LEN, len - pos);
			for (let j = 0, posj; j < take; j++) {
				posj = pos + j;
				output[posj] = data[posj] ^ block[j];
			}
			pos += take;
		}
		return;
	}
	for (let pos = 0; pos < len; counter++) {
		core(sigma, key, nonce, b32, counter, rounds);
		if (counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
		const take = Math.min(BLOCK_LEN, len - pos);
		if (isAligned && take === BLOCK_LEN) {
			const pos32 = pos / 4;
			if (pos % 4 !== 0) throw new Error("arx: invalid block position");
			for (let j = 0, posj; j < BLOCK_LEN32; j++) {
				posj = pos32 + j;
				o32[posj] = d32[posj] ^ b32[j];
			}
			pos += BLOCK_LEN;
			continue;
		}
		for (let j = 0, posj; j < take; j++) {
			posj = pos + j;
			output[posj] = data[posj] ^ block[j];
		}
		pos += take;
	}
}
/**
* Creates an ARX stream cipher from a 32-bit core permutation.
* Used internally to build the exported Salsa and ChaCha stream ciphers.
* @param core - Core function that fills one keystream block.
* @param opts - Cipher layout and nonce-extension options. See {@link CipherOpts}.
* @returns Stream cipher function over byte arrays.
* @throws If the core callback, key size, counter, or output sizing is invalid. {@link Error}
*/
function createCipher(core, opts) {
	const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({
		allowShortKeys: false,
		counterLength: 8,
		counterRight: false,
		rounds: 20
	}, opts);
	if (typeof core !== "function") throw new Error("core must be a function");
	anumber(counterLength);
	anumber(rounds);
	abool(counterRight);
	abool(allowShortKeys);
	return (key, nonce, data, output, counter = 0) => {
		abytes(key, void 0, "key");
		abytes(nonce, void 0, "nonce");
		abytes(data, void 0, "data");
		const len = data.length;
		output = getOutput(len, output, false);
		anumber(counter);
		if (counter < 0 || counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
		const toClean = [];
		let l = key.length;
		let k;
		let sigma;
		if (l === 32) {
			toClean.push(k = copyBytes(key));
			sigma = sigma32_32;
		} else if (l === 16 && allowShortKeys) {
			k = new Uint8Array(32);
			k.set(key);
			k.set(key, 16);
			sigma = sigma16_32;
			toClean.push(k);
		} else {
			abytes(key, 32, "arx key");
			throw new Error("invalid key size");
		}
		if (!isLE || !isAligned32(nonce)) toClean.push(nonce = copyBytes(nonce));
		let k32 = u32(k);
		if (extendNonceFn) {
			if (nonce.length !== 24) throw new Error(`arx: extended nonce must be 24 bytes`);
			const n16 = nonce.subarray(0, 16);
			if (isLE) extendNonceFn(sigma, k32, u32(n16), k32);
			else {
				const sigmaRaw = swap32IfBE(Uint32Array.from(sigma));
				extendNonceFn(sigmaRaw, k32, u32(n16), k32);
				clean(sigmaRaw);
				swap32IfBE(k32);
			}
			nonce = nonce.subarray(16);
		} else if (!isLE) swap32IfBE(k32);
		const nonceNcLen = 16 - counterLength;
		if (nonceNcLen !== nonce.length) throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
		if (nonceNcLen !== 12) {
			const nc = new Uint8Array(12);
			nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
			nonce = nc;
			toClean.push(nonce);
		}
		const n32 = swap32IfBE(u32(nonce));
		try {
			runCipher(core, sigma, k32, n32, data, output, counter, rounds);
			return output;
		} finally {
			clean(...toClean);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@noble+ciphers@2.2.0/node_modules/@noble/ciphers/_poly1305.js
/**
* Poly1305 ({@link https://cr.yp.to/mac/poly1305-20050329.pdf | PDF},
* {@link https://en.wikipedia.org/wiki/Poly1305 | wiki})
* is a fast and parallel secret-key message-authentication code suitable for
* a wide variety of applications. It was standardized in
* {@link https://www.rfc-editor.org/rfc/rfc8439 | RFC 8439} and is now used in TLS 1.3.
*
* Polynomial MACs are not perfect for every situation:
* they lack Random Key Robustness: the MAC can be forged, and can't be used in PAKE schemes.
* See {@link https://keymaterial.net/2020/09/07/invisible-salamanders-in-aes-gcm-siv/ | the invisible salamanders attack writeup}.
* To combat invisible salamanders, `hash(key)` can be included in ciphertext,
* however, this would violate ciphertext indistinguishability:
* an attacker would know which key was used - so `HKDF(key, i)`
* could be used instead.
*
* Check out the {@link https://cr.yp.to/mac.html | original website}.
* Based on public-domain {@link https://github.com/floodyberry/poly1305-donna | poly1305-donna}.
* @module
*/
function u8to16(a, i) {
	return a[i++] & 255 | (a[i++] & 255) << 8;
}
/**
* Incremental Poly1305 MAC state.
* Prefer `poly1305()` for one-shot use.
* @param key - 32-byte Poly1305 one-time key.
* @example
* Feeds one chunk into an incremental Poly1305 state with a fresh one-time key.
*
* ```ts
* import { Poly1305 } from '@noble/ciphers/_poly1305.js';
* import { randomBytes } from '@noble/ciphers/utils.js';
* const key = randomBytes(32);
* const mac = new Poly1305(key);
* mac.update(new Uint8Array([1, 2, 3]));
* mac.digest();
* ```
*/
var Poly1305 = class {
	blockLen = 16;
	outputLen = 16;
	buffer = new Uint8Array(16);
	r = new Uint16Array(10);
	h = new Uint16Array(10);
	pad = new Uint16Array(8);
	pos = 0;
	finished = false;
	destroyed = false;
	constructor(key) {
		key = copyBytes(abytes(key, 32, "key"));
		const t0 = u8to16(key, 0);
		const t1 = u8to16(key, 2);
		const t2 = u8to16(key, 4);
		const t3 = u8to16(key, 6);
		const t4 = u8to16(key, 8);
		const t5 = u8to16(key, 10);
		const t6 = u8to16(key, 12);
		const t7 = u8to16(key, 14);
		this.r[0] = t0 & 8191;
		this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
		this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
		this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
		this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
		this.r[5] = t4 >>> 1 & 8190;
		this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
		this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
		this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
		this.r[9] = t7 >>> 5 & 127;
		for (let i = 0; i < 8; i++) this.pad[i] = u8to16(key, 16 + 2 * i);
	}
	process(data, offset, isLast = false) {
		const hibit = isLast ? 0 : 2048;
		const { h, r } = this;
		const r0 = r[0];
		const r1 = r[1];
		const r2 = r[2];
		const r3 = r[3];
		const r4 = r[4];
		const r5 = r[5];
		const r6 = r[6];
		const r7 = r[7];
		const r8 = r[8];
		const r9 = r[9];
		const t0 = u8to16(data, offset + 0);
		const t1 = u8to16(data, offset + 2);
		const t2 = u8to16(data, offset + 4);
		const t3 = u8to16(data, offset + 6);
		const t4 = u8to16(data, offset + 8);
		const t5 = u8to16(data, offset + 10);
		const t6 = u8to16(data, offset + 12);
		const t7 = u8to16(data, offset + 14);
		let h0 = h[0] + (t0 & 8191);
		let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
		let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
		let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
		let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
		let h5 = h[5] + (t4 >>> 1 & 8191);
		let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
		let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
		let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
		let h9 = h[9] + (t7 >>> 5 | hibit);
		let c = 0;
		let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
		c = d0 >>> 13;
		d0 &= 8191;
		d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
		c += d0 >>> 13;
		d0 &= 8191;
		let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
		c = d1 >>> 13;
		d1 &= 8191;
		d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
		c += d1 >>> 13;
		d1 &= 8191;
		let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
		c = d2 >>> 13;
		d2 &= 8191;
		d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
		c += d2 >>> 13;
		d2 &= 8191;
		let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
		c = d3 >>> 13;
		d3 &= 8191;
		d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
		c += d3 >>> 13;
		d3 &= 8191;
		let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
		c = d4 >>> 13;
		d4 &= 8191;
		d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
		c += d4 >>> 13;
		d4 &= 8191;
		let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
		c = d5 >>> 13;
		d5 &= 8191;
		d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
		c += d5 >>> 13;
		d5 &= 8191;
		let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
		c = d6 >>> 13;
		d6 &= 8191;
		d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
		c += d6 >>> 13;
		d6 &= 8191;
		let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
		c = d7 >>> 13;
		d7 &= 8191;
		d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
		c += d7 >>> 13;
		d7 &= 8191;
		let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
		c = d8 >>> 13;
		d8 &= 8191;
		d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
		c += d8 >>> 13;
		d8 &= 8191;
		let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
		c = d9 >>> 13;
		d9 &= 8191;
		d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
		c += d9 >>> 13;
		d9 &= 8191;
		c = (c << 2) + c | 0;
		c = c + d0 | 0;
		d0 = c & 8191;
		c = c >>> 13;
		d1 += c;
		h[0] = d0;
		h[1] = d1;
		h[2] = d2;
		h[3] = d3;
		h[4] = d4;
		h[5] = d5;
		h[6] = d6;
		h[7] = d7;
		h[8] = d8;
		h[9] = d9;
	}
	finalize() {
		const { h, pad } = this;
		const g = new Uint16Array(10);
		let c = h[1] >>> 13;
		h[1] &= 8191;
		for (let i = 2; i < 10; i++) {
			h[i] += c;
			c = h[i] >>> 13;
			h[i] &= 8191;
		}
		h[0] += c * 5;
		c = h[0] >>> 13;
		h[0] &= 8191;
		h[1] += c;
		c = h[1] >>> 13;
		h[1] &= 8191;
		h[2] += c;
		g[0] = h[0] + 5;
		c = g[0] >>> 13;
		g[0] &= 8191;
		for (let i = 1; i < 10; i++) {
			g[i] = h[i] + c;
			c = g[i] >>> 13;
			g[i] &= 8191;
		}
		g[9] -= 8192;
		let mask = (c ^ 1) - 1;
		for (let i = 0; i < 10; i++) g[i] &= mask;
		mask = ~mask;
		for (let i = 0; i < 10; i++) h[i] = h[i] & mask | g[i];
		h[0] = (h[0] | h[1] << 13) & 65535;
		h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
		h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
		h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
		h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
		h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
		h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
		h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
		let f = h[0] + pad[0];
		h[0] = f & 65535;
		for (let i = 1; i < 8; i++) {
			f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
			h[i] = f & 65535;
		}
		clean(g);
	}
	update(data) {
		aexists(this);
		abytes(data);
		data = copyBytes(data);
		const { buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				for (; blockLen <= len - pos; pos += blockLen) this.process(data, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(buffer, 0, false);
				this.pos = 0;
			}
		}
		return this;
	}
	destroy() {
		this.destroyed = true;
		clean(this.h, this.r, this.buffer, this.pad);
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		this.finished = true;
		const { buffer, h } = this;
		let { pos } = this;
		if (pos) {
			buffer[pos++] = 1;
			for (; pos < 16; pos++) buffer[pos] = 0;
			this.process(buffer, 0, true);
		}
		this.finalize();
		let opos = 0;
		for (let i = 0; i < 8; i++) {
			out[opos++] = h[i] >>> 0;
			out[opos++] = h[i] >>> 8;
		}
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
};
/**
* Poly1305 MAC from RFC 8439.
* @param msg - Message bytes to authenticate.
* @param key - 32-byte Poly1305 one-time key.
* @returns 16-byte authentication tag.
* @example
* Authenticates one message with a one-shot Poly1305 call and a fresh key.
*
* ```ts
* import { poly1305 } from '@noble/ciphers/_poly1305.js';
* import { randomBytes } from '@noble/ciphers/utils.js';
* const key = randomBytes(32);
* poly1305(new Uint8Array(), key);
* ```
*/
var poly1305 = /* @__PURE__ */ wrapMacConstructor(32, (key) => new Poly1305(key));
//#endregion
//#region ../../node_modules/.pnpm/@noble+ciphers@2.2.0/node_modules/@noble/ciphers/chacha.js
/**
* ChaCha stream cipher, released
* in 2008. Developed after Salsa20, ChaCha aims to increase diffusion per round.
* It was standardized in
* {@link https://www.rfc-editor.org/rfc/rfc8439 | RFC 8439} and
* is now used in TLS 1.3.
*
* {@link https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha | XChaCha20}
* extended-nonce variant is also provided. Similar to XSalsa, it's safe to use with
* randomly-generated nonces.
*
* Check out
* {@link http://cr.yp.to/chacha/chacha-20080128.pdf | PDF},
* {@link https://en.wikipedia.org/wiki/Salsa20 | wiki}, and
* {@link https://cr.yp.to/chacha.html | website}.
*
* @module
*/
/** RFC 8439 §2.3 block core for `state = constants | key | counter | nonce`. */
function chachaCore(s, k, n, out, cnt, rounds = 20) {
	let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
	let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
	for (let r = 0; r < rounds; r += 2) {
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 16);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 12);
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 8);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 7);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 16);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 12);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 8);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 7);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 16);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 12);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 8);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 7);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 16);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 12);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 8);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 7);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 16);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 12);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 8);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 7);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 16);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 12);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 8);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 7);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 16);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 12);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 8);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 7);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 16);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 12);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 8);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 7);
	}
	let oi = 0;
	out[oi++] = y00 + x00 | 0;
	out[oi++] = y01 + x01 | 0;
	out[oi++] = y02 + x02 | 0;
	out[oi++] = y03 + x03 | 0;
	out[oi++] = y04 + x04 | 0;
	out[oi++] = y05 + x05 | 0;
	out[oi++] = y06 + x06 | 0;
	out[oi++] = y07 + x07 | 0;
	out[oi++] = y08 + x08 | 0;
	out[oi++] = y09 + x09 | 0;
	out[oi++] = y10 + x10 | 0;
	out[oi++] = y11 + x11 | 0;
	out[oi++] = y12 + x12 | 0;
	out[oi++] = y13 + x13 | 0;
	out[oi++] = y14 + x14 | 0;
	out[oi++] = y15 + x15 | 0;
}
/**
* hchacha hashes key and nonce into key' and nonce' for xchacha20.
* Algorithmically identical to `hchacha_small`, but this exported path
* normalizes word order on big-endian hosts.
* Need to find a way to merge it with `chachaCore` without 25% performance hit.
* @param s - Sigma constants as 32-bit words.
* @param k - Key words.
* @param i - Nonce-prefix words.
* @param out - Output buffer for the derived subkey.
* @example
* Derives the XChaCha subkey from sigma, key, and nonce-prefix words.
*
* ```ts
* const sigma = new Uint32Array(4);
* const key = new Uint32Array(8);
* const nonce = new Uint32Array(4);
* const out = new Uint32Array(8);
* hchacha(sigma, key, nonce, out);
* ```
*/
function hchacha(s, k, i, out) {
	let x00 = swap8IfBE(s[0]), x01 = swap8IfBE(s[1]), x02 = swap8IfBE(s[2]), x03 = swap8IfBE(s[3]), x04 = swap8IfBE(k[0]), x05 = swap8IfBE(k[1]), x06 = swap8IfBE(k[2]), x07 = swap8IfBE(k[3]), x08 = swap8IfBE(k[4]), x09 = swap8IfBE(k[5]), x10 = swap8IfBE(k[6]), x11 = swap8IfBE(k[7]), x12 = swap8IfBE(i[0]), x13 = swap8IfBE(i[1]), x14 = swap8IfBE(i[2]), x15 = swap8IfBE(i[3]);
	for (let r = 0; r < 20; r += 2) {
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 16);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 12);
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 8);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 7);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 16);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 12);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 8);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 7);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 16);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 12);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 8);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 7);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 16);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 12);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 8);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 7);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 16);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 12);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 8);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 7);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 16);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 12);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 8);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 7);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 16);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 12);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 8);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 7);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 16);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 12);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 8);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 7);
	}
	let oi = 0;
	out[oi++] = x00;
	out[oi++] = x01;
	out[oi++] = x02;
	out[oi++] = x03;
	out[oi++] = x12;
	out[oi++] = x13;
	out[oi++] = x14;
	out[oi++] = x15;
	swap32IfBE(out);
}
/**
* XChaCha eXtended-nonce ChaCha. With 24-byte nonce, it's safe to make it random (CSPRNG).
* See {@link https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha | the IRTF draft}.
* The nonce/counter layout still reserves 8 counter bytes internally, but the shared public
* `counter` argument follows noble's strict non-wrapping 32-bit policy. See `src/_arx.ts`
* near `MAX_COUNTER` for the full counter-policy rationale.
* @param key - 32-byte key.
* @param nonce - 24-byte extended nonce.
* @param data - Input bytes to xor with the keystream.
* @param output - Optional destination buffer.
* @param counter - Initial block counter.
* @returns Encrypted or decrypted bytes.
* @example
* Encrypts bytes with XChaCha20 using a fresh key and random 24-byte nonce.
*
* ```ts
* import { xchacha20 } from '@noble/ciphers/chacha.js';
* import { randomBytes } from '@noble/ciphers/utils.js';
* const key = randomBytes(32);
* const nonce = randomBytes(24);
* xchacha20(key, nonce, new Uint8Array(4));
* ```
*/
var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
	counterRight: false,
	counterLength: 8,
	extendNonceFn: hchacha,
	allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = (h, msg) => {
	h.update(msg);
	const leftover = msg.length % 16;
	if (leftover) h.update(ZEROS16.subarray(leftover));
};
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, ciphertext, AAD) {
	if (AAD !== void 0) abytes(AAD, void 0, "AAD");
	const authKey = fn(key, nonce, ZEROS32);
	const lengths = u64Lengths(ciphertext.length, AAD ? AAD.length : 0, true);
	const h = poly1305.create(authKey);
	if (AAD) updatePadded(h, AAD);
	updatePadded(h, ciphertext);
	h.update(lengths);
	const res = h.digest();
	clean(authKey, lengths);
	return res;
}
/**
* AEAD algorithm from RFC 8439.
* Salsa20 and chacha (RFC 8439) use poly1305 differently.
* We could have composed them, but it's hard because of authKey:
* In salsa20, authKey changes position in salsa stream.
* In chacha, authKey can't be computed inside computeTag, it modifies the counter.
*/
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
	const tagLength = 16;
	return {
		encrypt(plaintext, output) {
			const plength = plaintext.length;
			output = getOutput(plength + tagLength, output, false);
			output.set(plaintext);
			const oPlain = output.subarray(0, -tagLength);
			xorStream(key, nonce, oPlain, oPlain, 1);
			const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
			output.set(tag, plength);
			clean(tag);
			return output;
		},
		decrypt(ciphertext, output) {
			output = getOutput(ciphertext.length - tagLength, output, false);
			const data = ciphertext.subarray(0, -tagLength);
			const passedTag = ciphertext.subarray(-tagLength);
			const tag = computeTag(xorStream, key, nonce, data, AAD);
			if (!equalBytes(passedTag, tag)) {
				clean(tag);
				throw new Error("invalid tag");
			}
			output.set(ciphertext.subarray(0, -tagLength));
			xorStream(key, nonce, output, output, 1);
			clean(tag);
			return output;
		}
	};
};
/**
* XChaCha20-Poly1305 extended-nonce chacha.
*
* Can be safely used with random nonces (CSPRNG).
* See {@link https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha | the IRTF draft}.
* @param key - 32-byte key.
* @param nonce - 24-byte nonce.
* @param AAD - Additional authenticated data.
* @returns AEAD cipher instance.
* @example
* Encrypts and authenticates plaintext with a fresh key and random 24-byte nonce.
*
* ```ts
* import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
* import { randomBytes } from '@noble/ciphers/utils.js';
* const key = randomBytes(32);
* const nonce = randomBytes(24);
* const cipher = xchacha20poly1305(key, nonce);
* cipher.encrypt(new Uint8Array([1, 2, 3]));
* ```
*/
var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({
	blockSize: 64,
	nonceLength: 24,
	tagLength: 16
}, /* @__PURE__ */ _poly1305_aead(xchacha20));
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/crypto/index.mjs
var crypto_exports = /* @__PURE__ */ __exportAll({
	formatEnvelope: () => formatEnvelope,
	generateRandomString: () => generateRandomString,
	getCryptoKey: () => getCryptoKey,
	makeSignature: () => makeSignature,
	parseEnvelope: () => parseEnvelope,
	symmetricDecrypt: () => symmetricDecrypt,
	symmetricEncrypt: () => symmetricEncrypt
});
var algorithm = {
	name: "HMAC",
	hash: "SHA-256"
};
var ENVELOPE_PREFIX = "$ba$";
function parseEnvelope(data) {
	if (!data.startsWith(ENVELOPE_PREFIX)) return null;
	const firstSep = 4;
	const secondSep = data.indexOf("$", firstSep);
	if (secondSep === -1) return null;
	const version = parseInt(data.slice(firstSep, secondSep), 10);
	if (!Number.isInteger(version) || version < 0) return null;
	return {
		version,
		ciphertext: data.slice(secondSep + 1)
	};
}
function formatEnvelope(version, ciphertext) {
	return `${ENVELOPE_PREFIX}${version}$${ciphertext}`;
}
async function rawEncrypt(secret, data) {
	const keyAsBytes = await createHash("SHA-256").digest(secret);
	const dataAsBytes = utf8ToBytes(data);
	return bytesToHex(managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes)).encrypt(dataAsBytes));
}
async function rawDecrypt(secret, hex) {
	const keyAsBytes = await createHash("SHA-256").digest(secret);
	const dataAsBytes = hexToBytes(hex);
	const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
	return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
}
var symmetricEncrypt = async ({ key, data }) => {
	if (typeof key === "string") return rawEncrypt(key, data);
	const secret = key.keys.get(key.currentVersion);
	if (!secret) throw new Error(`Secret version ${key.currentVersion} not found in keys`);
	const ciphertext = await rawEncrypt(secret, data);
	return formatEnvelope(key.currentVersion, ciphertext);
};
var symmetricDecrypt = async ({ key, data }) => {
	if (typeof key === "string") return rawDecrypt(key, data);
	const envelope = parseEnvelope(data);
	if (envelope) {
		const secret = key.keys.get(envelope.version);
		if (!secret) throw new Error(`Secret version ${envelope.version} not found in keys (key may have been retired)`);
		return rawDecrypt(secret, envelope.ciphertext);
	}
	if (key.legacySecret) return rawDecrypt(key.legacySecret, data);
	throw new Error("Cannot decrypt legacy bare-hex payload: no legacy secret available. Set BETTER_AUTH_SECRET for backwards compatibility.");
};
var getCryptoKey = async (secret) => {
	const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
	return await getWebcryptoSubtle().importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
};
var makeSignature = async (value, secret) => {
	const key = await getCryptoKey(secret);
	const signature = await getWebcryptoSubtle().sign(algorithm.name, key, new TextEncoder().encode(value));
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/db/get-tables.mjs
var getAuthTables = (options) => {
	const pluginSchema = (options.plugins ?? []).reduce((acc, plugin) => {
		const schema = plugin.schema;
		if (!schema) return acc;
		for (const [key, value] of Object.entries(schema)) acc[key] = {
			fields: {
				...acc[key]?.fields,
				...value.fields
			},
			modelName: value.modelName || key
		};
		return acc;
	}, {});
	const shouldAddRateLimitTable = options.rateLimit?.storage === "database";
	const rateLimitTable = { rateLimit: {
		modelName: options.rateLimit?.modelName || "rateLimit",
		fields: {
			key: {
				type: "string",
				unique: true,
				required: true,
				fieldName: options.rateLimit?.fields?.key || "key"
			},
			count: {
				type: "number",
				required: true,
				fieldName: options.rateLimit?.fields?.count || "count"
			},
			lastRequest: {
				type: "number",
				bigint: true,
				required: true,
				fieldName: options.rateLimit?.fields?.lastRequest || "lastRequest",
				defaultValue: () => Date.now()
			}
		}
	} };
	const { user, session, account, verification, ...pluginTables } = pluginSchema;
	const verificationTable = { verification: {
		modelName: options.verification?.modelName || "verification",
		fields: {
			identifier: {
				type: "string",
				required: true,
				fieldName: options.verification?.fields?.identifier || "identifier",
				index: true
			},
			value: {
				type: "string",
				required: true,
				fieldName: options.verification?.fields?.value || "value"
			},
			expiresAt: {
				type: "date",
				required: true,
				fieldName: options.verification?.fields?.expiresAt || "expiresAt"
			},
			createdAt: {
				type: "date",
				required: true,
				defaultValue: () => /* @__PURE__ */ new Date(),
				fieldName: options.verification?.fields?.createdAt || "createdAt"
			},
			updatedAt: {
				type: "date",
				required: true,
				defaultValue: () => /* @__PURE__ */ new Date(),
				onUpdate: () => /* @__PURE__ */ new Date(),
				fieldName: options.verification?.fields?.updatedAt || "updatedAt"
			},
			...verification?.fields,
			...options.verification?.additionalFields
		},
		order: 4
	} };
	const sessionTable = { session: {
		modelName: options.session?.modelName || "session",
		fields: {
			expiresAt: {
				type: "date",
				required: true,
				fieldName: options.session?.fields?.expiresAt || "expiresAt"
			},
			token: {
				type: "string",
				required: true,
				fieldName: options.session?.fields?.token || "token",
				unique: true
			},
			createdAt: {
				type: "date",
				required: true,
				fieldName: options.session?.fields?.createdAt || "createdAt",
				defaultValue: () => /* @__PURE__ */ new Date()
			},
			updatedAt: {
				type: "date",
				required: true,
				fieldName: options.session?.fields?.updatedAt || "updatedAt",
				onUpdate: () => /* @__PURE__ */ new Date()
			},
			ipAddress: {
				type: "string",
				required: false,
				fieldName: options.session?.fields?.ipAddress || "ipAddress"
			},
			userAgent: {
				type: "string",
				required: false,
				fieldName: options.session?.fields?.userAgent || "userAgent"
			},
			userId: {
				type: "string",
				fieldName: options.session?.fields?.userId || "userId",
				references: {
					model: options.user?.modelName || "user",
					field: "id",
					onDelete: "cascade"
				},
				required: true,
				index: true
			},
			...session?.fields,
			...options.session?.additionalFields
		},
		order: 2
	} };
	return {
		user: {
			modelName: options.user?.modelName || "user",
			fields: {
				name: {
					type: "string",
					required: true,
					fieldName: options.user?.fields?.name || "name",
					sortable: true
				},
				email: {
					type: "string",
					unique: true,
					required: true,
					fieldName: options.user?.fields?.email || "email",
					sortable: true
				},
				emailVerified: {
					type: "boolean",
					defaultValue: false,
					required: true,
					fieldName: options.user?.fields?.emailVerified || "emailVerified",
					input: false
				},
				image: {
					type: "string",
					required: false,
					fieldName: options.user?.fields?.image || "image"
				},
				createdAt: {
					type: "date",
					defaultValue: () => /* @__PURE__ */ new Date(),
					required: true,
					fieldName: options.user?.fields?.createdAt || "createdAt"
				},
				updatedAt: {
					type: "date",
					defaultValue: () => /* @__PURE__ */ new Date(),
					onUpdate: () => /* @__PURE__ */ new Date(),
					required: true,
					fieldName: options.user?.fields?.updatedAt || "updatedAt"
				},
				...user?.fields,
				...options.user?.additionalFields
			},
			order: 1
		},
		...!options.secondaryStorage || options.session?.storeSessionInDatabase ? sessionTable : {},
		account: {
			modelName: options.account?.modelName || "account",
			fields: {
				accountId: {
					type: "string",
					required: true,
					fieldName: options.account?.fields?.accountId || "accountId"
				},
				providerId: {
					type: "string",
					required: true,
					fieldName: options.account?.fields?.providerId || "providerId"
				},
				userId: {
					type: "string",
					references: {
						model: options.user?.modelName || "user",
						field: "id",
						onDelete: "cascade"
					},
					required: true,
					fieldName: options.account?.fields?.userId || "userId",
					index: true
				},
				accessToken: {
					type: "string",
					required: false,
					returned: false,
					fieldName: options.account?.fields?.accessToken || "accessToken"
				},
				refreshToken: {
					type: "string",
					required: false,
					returned: false,
					fieldName: options.account?.fields?.refreshToken || "refreshToken"
				},
				idToken: {
					type: "string",
					required: false,
					returned: false,
					fieldName: options.account?.fields?.idToken || "idToken"
				},
				accessTokenExpiresAt: {
					type: "date",
					required: false,
					returned: false,
					fieldName: options.account?.fields?.accessTokenExpiresAt || "accessTokenExpiresAt"
				},
				refreshTokenExpiresAt: {
					type: "date",
					required: false,
					returned: false,
					fieldName: options.account?.fields?.refreshTokenExpiresAt || "refreshTokenExpiresAt"
				},
				scope: {
					type: "string",
					required: false,
					fieldName: options.account?.fields?.scope || "scope"
				},
				password: {
					type: "string",
					required: false,
					returned: false,
					fieldName: options.account?.fields?.password || "password"
				},
				createdAt: {
					type: "date",
					required: true,
					fieldName: options.account?.fields?.createdAt || "createdAt",
					defaultValue: () => /* @__PURE__ */ new Date()
				},
				updatedAt: {
					type: "date",
					required: true,
					fieldName: options.account?.fields?.updatedAt || "updatedAt",
					onUpdate: () => /* @__PURE__ */ new Date()
				},
				...account?.fields,
				...options.account?.additionalFields
			},
			order: 3
		},
		...!options.secondaryStorage || options.verification?.storeInDatabase ? verificationTable : {},
		...pluginTables,
		...shouldAddRateLimitTable ? rateLimitTable : {}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/db.mjs
/**
* Filters output data by removing fields with the `returned: false` attribute.
* This ensures sensitive fields are not exposed in API responses.
*/
function filterOutputFields(data, additionalFields) {
	if (!data || !additionalFields) return data;
	const returnFiltered = Object.entries(additionalFields).filter(([, { returned }]) => returned === false).map(([key]) => key);
	return Object.entries(structuredClone(data)).filter(([key]) => !returnFiltered.includes(key)).reduce((acc, [key, value]) => ({
		...acc,
		[key]: value
	}), {});
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/db/schema.mjs
var cache = /* @__PURE__ */ new WeakMap();
function getFields(options, modelName, mode) {
	const cacheKey = `${modelName}:${mode}`;
	if (!cache.has(options)) cache.set(options, /* @__PURE__ */ new Map());
	const tableCache = cache.get(options);
	if (tableCache.has(cacheKey)) return tableCache.get(cacheKey);
	const coreSchema = mode === "output" ? getAuthTables(options)[modelName]?.fields ?? {} : {};
	const additionalFields = modelName === "user" || modelName === "session" || modelName === "account" ? options[modelName]?.additionalFields : void 0;
	let schema = {
		...coreSchema,
		...additionalFields ?? {}
	};
	for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[modelName]) schema = {
		...schema,
		...plugin.schema[modelName].fields
	};
	tableCache.set(cacheKey, schema);
	return schema;
}
function parseUserOutput(options, user) {
	return filterOutputFields(user, getFields(options, "user", "output"));
}
function parseSessionOutput(options, session) {
	return filterOutputFields(session, getFields(options, "session", "output"));
}
function mergeSchema(schema, newSchema) {
	if (!newSchema) return schema;
	for (const table in newSchema) {
		const newModelName = newSchema[table]?.modelName;
		if (newModelName) schema[table].modelName = newModelName;
		for (const field in schema[table].fields) {
			const newField = newSchema[table]?.fields?.[field];
			if (!newField) continue;
			schema[table].fields[field].fieldName = newField;
		}
	}
	return schema;
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/utils/date.mjs
var getDate$1 = (span, unit = "ms") => {
	return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/utils/is-promise.mjs
function isPromise(obj) {
	return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/utils/time.mjs
var SEC = 1e3;
var MIN = SEC * 60;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
	const match = REGEX.exec(value);
	if (!match || match[4] && match[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
	const n = parseFloat(match[2]);
	const unit = match[3].toLowerCase();
	let result;
	switch (unit) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y":
			result = n * YEAR;
			break;
		case "months":
		case "month":
		case "mo":
			result = n * MONTH;
			break;
		case "weeks":
		case "week":
		case "w":
			result = n * WEEK;
			break;
		case "days":
		case "day":
		case "d":
			result = n * DAY;
			break;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h":
			result = n * HOUR;
			break;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m":
			result = n * MIN;
			break;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s":
			result = n * SEC;
			break;
		default: throw new TypeError(`Unknown time unit: "${unit}"`);
	}
	if (match[1] === "-" || match[4] === "ago") return -result;
	return result;
}
/**
* Parse a time string and return the value in seconds.
*
* @param value - A time string like "7d", "30m", "1 hour", "2 hours ago"
* @returns The parsed value in seconds (rounded)
* @throws TypeError if the string format is invalid
*
* @example
* sec("1d")          // 86400
* sec("2 hours")     // 7200
* sec("-30s")        // -30
* sec("2 hours ago") // -7200
*/
function sec(value) {
	return Math.round(parse(value) / 1e3);
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/cookies/cookie-utils.mjs
function tryDecode(str) {
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}
/**
* Split a comma-joined `Set-Cookie` header string into individual cookies.
*/
function splitSetCookieHeader(setCookie) {
	if (!setCookie) return [];
	const result = [];
	let start = 0;
	let i = 0;
	while (i < setCookie.length) {
		if (setCookie[i] === ",") {
			let j = i + 1;
			while (j < setCookie.length && setCookie[j] === " ") j++;
			while (j < setCookie.length && setCookie[j] !== "=" && setCookie[j] !== ";" && setCookie[j] !== ",") j++;
			if (j < setCookie.length && setCookie[j] === "=") {
				const part = setCookie.slice(start, i).trim();
				if (part) result.push(part);
				start = i + 1;
				while (start < setCookie.length && setCookie[start] === " ") start++;
				i = start;
				continue;
			}
		}
		i++;
	}
	const last = setCookie.slice(start).trim();
	if (last) result.push(last);
	return result;
}
function parseSetCookieHeader(setCookie) {
	const cookies = /* @__PURE__ */ new Map();
	splitSetCookieHeader(setCookie).forEach((cookieString) => {
		const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
		const [name, ...valueParts] = (nameValue || "").split("=");
		const value = valueParts.join("=");
		if (!name || value === void 0) return;
		const attrObj = { value: value.includes("%") ? tryDecode(value) : value };
		attributes.forEach((attribute) => {
			const [attrName, ...attrValueParts] = attribute.split("=");
			const attrValue = attrValueParts.join("=");
			const normalizedAttrName = attrName.trim().toLowerCase();
			switch (normalizedAttrName) {
				case "max-age":
					attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
					break;
				case "expires":
					attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
					break;
				case "domain":
					attrObj.domain = attrValue ? attrValue.trim() : void 0;
					break;
				case "path":
					attrObj.path = attrValue ? attrValue.trim() : void 0;
					break;
				case "secure":
					attrObj.secure = true;
					break;
				case "httponly":
					attrObj.httponly = true;
					break;
				case "samesite":
					attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
					break;
				case "partitioned":
					attrObj.partitioned = true;
					break;
				default:
					attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
					break;
			}
		});
		cookies.set(name, attrObj);
	});
	return cookies;
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/json.mjs
var iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
function reviveDate(value) {
	if (typeof value === "string" && iso8601Regex.test(value)) {
		const date = new Date(value);
		if (!isNaN(date.getTime())) return date;
	}
	return value;
}
/**
* Recursively walk a pre-parsed object and convert ISO 8601 date strings
* to Date instances. This handles the case where a Redis client (or similar)
* returns already-parsed JSON objects whose date fields are still strings.
*/
function reviveDates(value) {
	if (value === null || value === void 0) return value;
	if (typeof value === "string") return reviveDate(value);
	if (value instanceof Date) return value;
	if (Array.isArray(value)) return value.map(reviveDates);
	if (typeof value === "object") {
		const result = {};
		for (const key of Object.keys(value)) result[key] = reviveDates(value[key]);
		return result;
	}
	return value;
}
function safeJSONParse(data) {
	try {
		if (typeof data !== "string") {
			if (data === null || data === void 0) return null;
			return reviveDates(data);
		}
		return JSON.parse(data, (_, value) => reviveDate(value));
	} catch (e) {
		logger.error("Error parsing JSON", { error: e });
		return null;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/cookies/session-store.mjs
var ALLOWED_COOKIE_SIZE = 4096;
var ESTIMATED_EMPTY_COOKIE_SIZE = 200;
var CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
/**
* Parse cookies from the request headers
*/
function parseCookiesFromContext(ctx) {
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return {};
	const cookies = {};
	const pairs = cookieHeader.split("; ");
	for (const pair of pairs) {
		const [name, ...valueParts] = pair.split("=");
		if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
	}
	return cookies;
}
/**
* Extract the chunk index from a cookie name
*/
function getChunkIndex(cookieName) {
	const parts = cookieName.split(".");
	const lastPart = parts[parts.length - 1];
	const index = parseInt(lastPart || "0", 10);
	return isNaN(index) ? 0 : index;
}
/**
* Read all existing chunks from cookies
*/
function readExistingChunks(cookieName, ctx) {
	const chunks = {};
	const cookies = parseCookiesFromContext(ctx);
	for (const [name, value] of Object.entries(cookies)) if (name.startsWith(cookieName)) chunks[name] = value;
	return chunks;
}
/**
* Get the full session data by joining all chunks
*/
function joinChunks(chunks) {
	return Object.keys(chunks).sort((a, b) => {
		return getChunkIndex(a) - getChunkIndex(b);
	}).map((key) => chunks[key]).join("");
}
/**
* Split a cookie value into chunks if needed
*/
function chunkCookie(storeName, cookie, chunks, logger) {
	const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
	if (chunkCount === 1) {
		chunks[cookie.name] = cookie.value;
		return [cookie];
	}
	const cookies = [];
	for (let i = 0; i < chunkCount; i++) {
		const name = `${cookie.name}.${i}`;
		const start = i * CHUNK_SIZE;
		const value = cookie.value.substring(start, start + CHUNK_SIZE);
		cookies.push({
			...cookie,
			name,
			value
		});
		chunks[name] = value;
	}
	logger.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
		message: `${storeName} cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
		emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
		valueSize: cookie.value.length,
		chunkCount,
		chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
	});
	return cookies;
}
/**
* Get all cookies that should be cleaned (removed)
*/
function getCleanCookies(chunks, cookieOptions) {
	const cleanedChunks = {};
	for (const name in chunks) cleanedChunks[name] = {
		name,
		value: "",
		attributes: {
			...cookieOptions,
			maxAge: 0
		}
	};
	return cleanedChunks;
}
/**
* Create a session store for handling cookie chunking.
* When session data exceeds 4KB, it automatically splits it into multiple cookies.
*
* Based on next-auth's SessionStore implementation.
* @see https://github.com/nextauthjs/next-auth/blob/27b2519b84b8eb9cf053775dea29d577d2aa0098/packages/next-auth/src/core/lib/cookie.ts
*/
var storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
	const chunks = readExistingChunks(cookieName, ctx);
	const logger = ctx.context.logger;
	return {
		getValue() {
			return joinChunks(chunks);
		},
		hasChunks() {
			return Object.keys(chunks).length > 0;
		},
		chunk(value, options) {
			const cleanedChunks = getCleanCookies(chunks, cookieOptions);
			for (const name in chunks) delete chunks[name];
			const cookies = cleanedChunks;
			const chunked = chunkCookie(storeName, {
				name: cookieName,
				value,
				attributes: {
					...cookieOptions,
					...options
				}
			}, chunks, logger);
			for (const chunk of chunked) cookies[chunk.name] = chunk;
			return Object.values(cookies);
		},
		clean() {
			const cleanedChunks = getCleanCookies(chunks, cookieOptions);
			for (const name in chunks) delete chunks[name];
			return Object.values(cleanedChunks);
		},
		setCookies(cookies) {
			for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.attributes);
		}
	};
};
var createSessionStore = storeFactory("Session");
var createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
	const value = ctx.getCookie(cookieName);
	if (value) return value;
	const chunks = [];
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return null;
	const cookies = {};
	const pairs = cookieHeader.split("; ");
	for (const pair of pairs) {
		const [name, ...valueParts] = pair.split("=");
		if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
	}
	for (const [name, val] of Object.entries(cookies)) if (name.startsWith(cookieName + ".")) {
		const indexStr = name.split(".").at(-1);
		const index = parseInt(indexStr || "0", 10);
		if (!isNaN(index)) chunks.push({
			index,
			value: val
		});
	}
	if (chunks.length > 0) {
		chunks.sort((a, b) => a.index - b.index);
		return chunks.map((c) => c.value).join("");
	}
	return null;
}
async function setAccountCookie(c, accountData) {
	const accountDataCookie = c.context.authCookies.accountData;
	const options = {
		maxAge: 300,
		...accountDataCookie.attributes
	};
	const data = await symmetricEncodeJWT(accountData, c.context.secretConfig, "better-auth-account", options.maxAge);
	if (data.length > ALLOWED_COOKIE_SIZE) {
		const accountStore = createAccountStore(accountDataCookie.name, options, c);
		const cookies = accountStore.chunk(data, options);
		accountStore.setCookies(cookies);
	} else {
		const accountStore = createAccountStore(accountDataCookie.name, options, c);
		if (accountStore.hasChunks()) {
			const cleanCookies = accountStore.clean();
			accountStore.setCookies(cleanCookies);
		}
		c.setCookie(accountDataCookie.name, data, options);
	}
}
async function getAccountCookie(c) {
	const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
	if (accountCookie) {
		const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secretConfig, "better-auth-account"));
		if (accountData) return accountData;
	}
	return null;
}
var getSessionQuerySchema = optional(object({
	disableCookieCache: boolean().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
	disableRefresh: boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/binary.mjs
var decoders = /* @__PURE__ */ new Map();
var binary = {
	decode: (data, encoding = "utf-8") => {
		if (!decoders.has(encoding)) decoders.set(encoding, new TextDecoder(encoding));
		return decoders.get(encoding).decode(data);
	},
	encode: new TextEncoder().encode
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/hex.mjs
var hexadecimal = "0123456789abcdef";
var hex = {
	encode: (data) => {
		if (typeof data === "string") data = new TextEncoder().encode(data);
		if (data.byteLength === 0) return "";
		const buffer = new Uint8Array(data);
		let result = "";
		for (const byte of buffer) result += byte.toString(16).padStart(2, "0");
		return result;
	},
	decode: (data) => {
		if (!data) return "";
		if (typeof data === "string") {
			if (data.length % 2 !== 0) throw new Error("Invalid hexadecimal string");
			if (!new RegExp(`^[${hexadecimal}]+$`).test(data)) throw new Error("Invalid hexadecimal string");
			const result = new Uint8Array(data.length / 2);
			for (let i = 0; i < data.length; i += 2) result[i / 2] = parseInt(data.slice(i, i + 2), 16);
			return new TextDecoder().decode(result);
		}
		return new TextDecoder().decode(data);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+utils@0.4.0/node_modules/@better-auth/utils/dist/hmac.mjs
var createHMAC = (algorithm = "SHA-256", encoding = "none") => {
	const hmac = {
		importKey: async (key, keyUsage) => {
			return getWebcryptoSubtle().importKey("raw", typeof key === "string" ? new TextEncoder().encode(key) : key, {
				name: "HMAC",
				hash: { name: algorithm }
			}, false, [keyUsage]);
		},
		sign: async (hmacKey, data) => {
			if (typeof hmacKey === "string") hmacKey = await hmac.importKey(hmacKey, "sign");
			const signature = await getWebcryptoSubtle().sign("HMAC", hmacKey, typeof data === "string" ? new TextEncoder().encode(data) : data);
			if (encoding === "hex") return hex.encode(signature);
			if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") return base64Url.encode(signature, { padding: encoding !== "base64urlnopad" });
			return signature;
		},
		verify: async (hmacKey, data, signature) => {
			if (typeof hmacKey === "string") hmacKey = await hmac.importKey(hmacKey, "verify");
			if (encoding === "hex") signature = hex.decode(signature);
			if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") signature = await base64.decode(signature);
			return getWebcryptoSubtle().verify("HMAC", hmacKey, typeof signature === "string" ? new TextEncoder().encode(signature) : signature, typeof data === "string" ? new TextEncoder().encode(data) : data);
		}
	};
	return hmac;
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/cookies/index.mjs
async function setCookieCache(ctx, session, dontRememberMe) {
	if (!ctx.context.options.session?.cookieCache?.enabled) return;
	const filteredSession = filterOutputFields(session.session, ctx.context.options.session?.additionalFields);
	const filteredUser = parseUserOutput(ctx.context.options, session.user);
	const versionConfig = ctx.context.options.session?.cookieCache?.version;
	let version = "1";
	if (versionConfig) {
		if (typeof versionConfig === "string") version = versionConfig;
		else if (typeof versionConfig === "function") {
			const result = versionConfig(session.session, session.user);
			version = isPromise(result) ? await result : result;
		}
	}
	const sessionData = {
		session: filteredSession,
		user: filteredUser,
		updatedAt: Date.now(),
		version
	};
	const options = {
		...ctx.context.authCookies.sessionData.attributes,
		maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.attributes.maxAge
	};
	const expiresAtDate = getDate$1(options.maxAge || 60, "sec").getTime();
	const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
	let data;
	if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secretConfig, "better-auth-session", options.maxAge || 300);
	else if (strategy === "jwt") data = await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
	else data = base64Url.encode(JSON.stringify({
		session: sessionData,
		expiresAt: expiresAtDate,
		signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
			...sessionData,
			expiresAt: expiresAtDate
		}))
	}), { padding: false });
	if (data.length > 4093) {
		const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
		const cookies = sessionStore.chunk(data, options);
		sessionStore.setCookies(cookies);
	} else {
		const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
		if (sessionStore.hasChunks()) {
			const cleanCookies = sessionStore.clean();
			sessionStore.setCookies(cleanCookies);
		}
		ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
	}
	if (ctx.context.options.account?.storeAccountCookie) {
		const accountData = await getAccountCookie(ctx);
		if (accountData) await setAccountCookie(ctx, accountData);
	}
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
	const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
	dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
	const options = ctx.context.authCookies.sessionToken.attributes;
	const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
	await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
		...options,
		maxAge,
		...overrides
	});
	if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.attributes);
	await setCookieCache(ctx, session, dontRememberMe);
	ctx.context.setNewSession(session);
}
/**
* Expires a cookie by setting `maxAge: 0` while preserving its attributes
*/
function expireCookie(ctx, cookie) {
	ctx.setCookie(cookie.name, "", {
		...cookie.attributes,
		maxAge: 0
	});
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
	expireCookie(ctx, ctx.context.authCookies.sessionToken);
	expireCookie(ctx, ctx.context.authCookies.sessionData);
	if (ctx.context.options.account?.storeAccountCookie) {
		expireCookie(ctx, ctx.context.authCookies.accountData);
		const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
		const cleanCookies = accountStore.clean();
		accountStore.setCookies(cleanCookies);
	}
	if (ctx.context.oauthConfig.storeStateStrategy === "cookie") expireCookie(ctx, ctx.context.createAuthCookie("oauth_state"));
	const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.attributes, ctx);
	const cleanCookies = sessionStore.clean();
	sessionStore.setCookies(cleanCookies);
	if (!skipDontRememberMe) expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/context/request-state.mjs
var ensureAsyncStorage = async () => {
	const betterAuthGlobal = __getBetterAuthGlobal();
	if (!betterAuthGlobal.context.requestStateAsyncStorage) {
		const AsyncLocalStorage = await getAsyncLocalStorage();
		betterAuthGlobal.context.requestStateAsyncStorage = new AsyncLocalStorage();
	}
	return betterAuthGlobal.context.requestStateAsyncStorage;
};
async function getCurrentRequestState() {
	const store = (await ensureAsyncStorage()).getStore();
	if (!store) throw new Error("No request state found. Please make sure you are calling this function within a `runWithRequestState` callback.");
	return store;
}
function defineRequestState(initFn) {
	const ref = Object.freeze({});
	return {
		get ref() {
			return ref;
		},
		async get() {
			const store = await getCurrentRequestState();
			if (!store.has(ref)) {
				const initialValue = await initFn();
				store.set(ref, initialValue);
				return initialValue;
			}
			return store.get(ref);
		},
		async set(value) {
			(await getCurrentRequestState()).set(ref, value);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/ip.mjs
/**
* Checks if an IP is valid IPv4 or IPv6
*/
function isValidIP(ip) {
	return ipv4().safeParse(ip).success || ipv6().safeParse(ip).success;
}
/**
* Checks if an IP is IPv6
*/
function isIPv6(ip) {
	return ipv6().safeParse(ip).success;
}
/**
* Converts IPv4-mapped IPv6 address to IPv4
* e.g., "::ffff:192.0.2.1" -> "192.0.2.1"
*/
function extractIPv4FromMapped(ipv6) {
	const lower = ipv6.toLowerCase();
	if (lower.startsWith("::ffff:")) {
		const ipv4Part = lower.substring(7);
		if (ipv4().safeParse(ipv4Part).success) return ipv4Part;
	}
	const parts = ipv6.split(":");
	if (parts.length === 7 && parts[5]?.toLowerCase() === "ffff") {
		const ipv4Part = parts[6];
		if (ipv4Part && ipv4().safeParse(ipv4Part).success) return ipv4Part;
	}
	if (lower.includes("::ffff:") || lower.includes(":ffff:")) {
		const groups = expandIPv6(ipv6);
		if (groups.length === 8 && groups[0] === "0000" && groups[1] === "0000" && groups[2] === "0000" && groups[3] === "0000" && groups[4] === "0000" && groups[5] === "ffff" && groups[6] && groups[7]) return `${Number.parseInt(groups[6].substring(0, 2), 16)}.${Number.parseInt(groups[6].substring(2, 4), 16)}.${Number.parseInt(groups[7].substring(0, 2), 16)}.${Number.parseInt(groups[7].substring(2, 4), 16)}`;
	}
	return null;
}
/**
* Expands a compressed IPv6 address to full form
* e.g., "2001:db8::1" -> ["2001", "0db8", "0000", "0000", "0000", "0000", "0000", "0001"]
*/
function expandIPv6(ipv6) {
	if (ipv6.includes("::")) {
		const sides = ipv6.split("::");
		const left = sides[0] ? sides[0].split(":") : [];
		const right = sides[1] ? sides[1].split(":") : [];
		const missingGroups = 8 - left.length - right.length;
		const zeros = Array(missingGroups).fill("0000");
		const paddedLeft = left.map((g) => g.padStart(4, "0"));
		const paddedRight = right.map((g) => g.padStart(4, "0"));
		return [
			...paddedLeft,
			...zeros,
			...paddedRight
		];
	}
	return ipv6.split(":").map((g) => g.padStart(4, "0"));
}
/**
* Normalizes an IPv6 address to canonical form
* e.g., "2001:DB8::1" -> "2001:0db8:0000:0000:0000:0000:0000:0001"
*/
function normalizeIPv6(ipv6, subnetPrefix) {
	const groups = expandIPv6(ipv6);
	if (subnetPrefix !== void 0 && subnetPrefix < 128) {
		let bitsRemaining = Math.max(0, Math.floor(subnetPrefix));
		return groups.map((group) => {
			if (bitsRemaining <= 0) return "0000";
			if (bitsRemaining >= 16) {
				bitsRemaining -= 16;
				return group;
			}
			const masked = Number.parseInt(group, 16) & (65535 << 16 - bitsRemaining & 65535);
			bitsRemaining = 0;
			return masked.toString(16).padStart(4, "0");
		}).join(":").toLowerCase();
	}
	return groups.join(":").toLowerCase();
}
/**
* Normalizes an IP address (IPv4 or IPv6) for consistent rate limiting.
*
* @param ip - The IP address to normalize
* @param options - Normalization options
* @returns Normalized IP address
*
* @example
* normalizeIP("2001:DB8::1")
* // -> "2001:0db8:0000:0000:0000:0000:0000:0000"
*
* @example
* normalizeIP("::ffff:192.0.2.1")
* // -> "192.0.2.1" (converted to IPv4)
*
* @example
* normalizeIP("2001:db8::1", { ipv6Subnet: 64 })
* // -> "2001:0db8:0000:0000:0000:0000:0000:0000" (subnet /64)
*/
function normalizeIP(ip, options = {}) {
	if (ipv4().safeParse(ip).success) return ip.toLowerCase();
	if (!isIPv6(ip)) return ip.toLowerCase();
	const ipv4$1 = extractIPv4FromMapped(ip);
	if (ipv4$1) return ipv4$1.toLowerCase();
	return normalizeIPv6(ip, options.ipv6Subnet ?? 64);
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/state/should-session-refresh.mjs
/**
* State for skipping session refresh
*
* In some cases, such as when using server-side rendering (SSR) or when dealing with
* certain types of requests, it may be necessary to skip session refresh to prevent
* potential inconsistencies between the session data in the database and the session
* data stored in cookies.
*/
var { get: getShouldSkipSessionRefresh, set: setShouldSkipSessionRefresh } = defineRequestState(() => false);
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/routes/session.mjs
var getSession = () => createAuthEndpoint("/get-session", {
	method: ["GET", "POST"],
	operationId: "getSession",
	query: getSessionQuerySchema,
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "getSession",
		description: "Get the current session",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: ["object", "null"],
				properties: {
					session: { $ref: "#/components/schemas/Session" },
					user: { $ref: "#/components/schemas/User" }
				},
				required: ["session", "user"]
			} } }
		} }
	} }
}, async (ctx) => {
	const deferSessionRefresh = ctx.context.options.session?.deferSessionRefresh;
	const isPostRequest = ctx.method === "POST";
	if (isPostRequest && !deferSessionRefresh) throw APIError.from("METHOD_NOT_ALLOWED", BASE_ERROR_CODES.METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED);
	try {
		const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
		if (!sessionCookieToken) return null;
		const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
		let sessionDataPayload = null;
		if (sessionDataCookie) {
			const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
			if (strategy === "jwe") {
				const payload = await symmetricDecodeJWT(sessionDataCookie, ctx.context.secretConfig, "better-auth-session");
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			} else if (strategy === "jwt") {
				const payload = await verifyJWT(sessionDataCookie, ctx.context.secret);
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			} else {
				const parsed = safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie)));
				if (parsed) if (await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
					...parsed.session,
					expiresAt: parsed.expiresAt
				}), parsed.signature)) sessionDataPayload = parsed;
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			}
		}
		const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
		/**
		* If session data is present in the cookie, check if it should be used or refreshed
		*/
		if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
			const session = sessionDataPayload.session;
			const versionConfig = ctx.context.options.session?.cookieCache?.version;
			let expectedVersion = "1";
			if (versionConfig) {
				if (typeof versionConfig === "string") expectedVersion = versionConfig;
				else if (typeof versionConfig === "function") {
					const result = versionConfig(session.session, session.user);
					expectedVersion = result instanceof Promise ? await result : result;
				}
			}
			if ((session.version || "1") !== expectedVersion) expireCookie(ctx, ctx.context.authCookies.sessionData);
			else {
				const cachedSessionExpiresAt = new Date(session.session.expiresAt);
				if (sessionDataPayload.expiresAt < Date.now() || cachedSessionExpiresAt < /* @__PURE__ */ new Date()) expireCookie(ctx, ctx.context.authCookies.sessionData);
				else {
					const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
					if (cookieRefreshCache === false) {
						ctx.context.session = session;
						const parsedSession = parseSessionOutput(ctx.context.options, {
							...session.session,
							expiresAt: new Date(session.session.expiresAt),
							createdAt: new Date(session.session.createdAt),
							updatedAt: new Date(session.session.updatedAt)
						});
						const parsedUser = parseUserOutput(ctx.context.options, {
							...session.user,
							createdAt: new Date(session.user.createdAt),
							updatedAt: new Date(session.user.updatedAt)
						});
						return ctx.json({
							session: parsedSession,
							user: parsedUser
						});
					}
					const timeUntilExpiry = sessionDataPayload.expiresAt - Date.now();
					const updateAge = cookieRefreshCache.updateAge * 1e3;
					const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
					if (timeUntilExpiry < updateAge && !shouldSkipSessionRefresh) {
						const newExpiresAt = getDate$1(ctx.context.options.session?.cookieCache?.maxAge || 300, "sec");
						const refreshedSession = {
							session: {
								...session.session,
								expiresAt: newExpiresAt
							},
							user: session.user,
							updatedAt: Date.now()
						};
						await setCookieCache(ctx, refreshedSession, false);
						const sessionTokenOptions = ctx.context.authCookies.sessionToken.attributes;
						const sessionTokenMaxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
						await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
							...sessionTokenOptions,
							maxAge: sessionTokenMaxAge
						});
						const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
							...refreshedSession.session,
							expiresAt: new Date(refreshedSession.session.expiresAt),
							createdAt: new Date(refreshedSession.session.createdAt),
							updatedAt: new Date(refreshedSession.session.updatedAt)
						});
						const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
							...refreshedSession.user,
							createdAt: new Date(refreshedSession.user.createdAt),
							updatedAt: new Date(refreshedSession.user.updatedAt)
						});
						ctx.context.session = {
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						};
						return ctx.json({
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						});
					}
					const parsedSession = parseSessionOutput(ctx.context.options, {
						...session.session,
						expiresAt: new Date(session.session.expiresAt),
						createdAt: new Date(session.session.createdAt),
						updatedAt: new Date(session.session.updatedAt)
					});
					const parsedUser = parseUserOutput(ctx.context.options, {
						...session.user,
						createdAt: new Date(session.user.createdAt),
						updatedAt: new Date(session.user.updatedAt)
					});
					ctx.context.session = {
						session: parsedSession,
						user: parsedUser
					};
					return ctx.json({
						session: parsedSession,
						user: parsedUser
					});
				}
			}
		}
		const session = await ctx.context.internalAdapter.findSession(sessionCookieToken);
		ctx.context.session = session;
		if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
			deleteSessionCookie(ctx);
			if (session) {
				/**
				* if session expired clean up the session
				* Only delete on POST when deferSessionRefresh is enabled
				*/
				if (!deferSessionRefresh || isPostRequest) await ctx.context.internalAdapter.deleteSession(session.session.token);
			}
			return ctx.json(null);
		}
		/**
		* We don't need to update the session if the user doesn't want to be remembered
		* or if the session refresh is disabled
		*/
		if (dontRememberMe || ctx.query?.disableRefresh) {
			const parsedSession = parseSessionOutput(ctx.context.options, session.session);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedSession,
				user: parsedUser
			});
		}
		const expiresIn = ctx.context.sessionConfig.expiresIn;
		const updateAge = ctx.context.sessionConfig.updateAge;
		const shouldBeUpdated = session.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now();
		const disableRefresh = ctx.query?.disableRefresh || ctx.context.options.session?.disableSessionRefresh;
		const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
		const needsRefresh = shouldBeUpdated && !disableRefresh && !shouldSkipSessionRefresh;
		/**
		* When deferSessionRefresh is enabled and this is a GET request,
		* return the session without performing writes, but include needsRefresh flag
		*/
		if (deferSessionRefresh && !isPostRequest) {
			await setCookieCache(ctx, session, !!dontRememberMe);
			const parsedSession = parseSessionOutput(ctx.context.options, session.session);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedSession,
				user: parsedUser,
				needsRefresh
			});
		}
		if (needsRefresh) {
			const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
				expiresAt: getDate$1(ctx.context.sessionConfig.expiresIn, "sec"),
				updatedAt: /* @__PURE__ */ new Date()
			});
			if (!updatedSession) {
				/**
				* Handle case where session update fails (e.g., concurrent deletion)
				*/
				deleteSessionCookie(ctx);
				throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
			}
			const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
			await setSessionCookie(ctx, {
				session: updatedSession,
				user: session.user
			}, false, { maxAge });
			const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedUpdatedSession,
				user: parsedUser
			});
		}
		await setCookieCache(ctx, session, !!dontRememberMe);
		const parsedSession = parseSessionOutput(ctx.context.options, session.session);
		const parsedUser = parseUserOutput(ctx.context.options, session.user);
		return ctx.json({
			session: parsedSession,
			user: parsedUser
		});
	} catch (error) {
		if (isAPIError$1(error)) throw error;
		ctx.context.logger.error("INTERNAL_SERVER_ERROR", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
	}
});
var getSessionFromCtx = async (ctx, config) => {
	if (ctx.context.session) return ctx.context.session;
	const session = await getSession()({
		...ctx,
		method: "GET",
		asResponse: false,
		headers: ctx.headers,
		returnHeaders: false,
		returnStatus: false,
		query: {
			...config,
			...ctx.query
		}
	}).catch((e) => {
		return null;
	});
	ctx.context.session = session;
	return session;
};
/**
* The middleware forces the endpoint to require a valid session.
*/
var sessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
/**
* This middleware forces the endpoint to require a valid session and ignores cookie cache.
* This should be used for sensitive operations like password changes, account deletion, etc.
* to ensure that revoked sessions cannot be used even if they're still cached in cookies.
*/
var sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx, { disableCookieCache: true });
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session && (ctx.request || ctx.headers)) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
/**
* This middleware forces the endpoint to require a valid session,
* as well as making sure the session is fresh before proceeding.
*
* Session freshness check will be skipped if the session config's freshAge
* is set to 0
*/
var freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	if (ctx.context.sessionConfig.freshAge !== 0) {
		const createdAt = new Date(session.session.createdAt).getTime();
		const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
		if (Date.now() - createdAt >= freshAge) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH);
	}
	return { session };
});
createAuthEndpoint("/revoke-session", {
	method: "POST",
	body: object({ token: string$1().meta({ description: "The token to revoke" }) }),
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke a single session",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: { token: {
				type: "string",
				description: "The token to revoke"
			} },
			required: ["token"]
		} } } },
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if the session was revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token;
	if ((await ctx.context.internalAdapter.findSession(token))?.session.userId === ctx.context.session.user.id) try {
		await ctx.context.internalAdapter.deleteSession(token);
	} catch (error) {
		ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
createAuthEndpoint("/revoke-sessions", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke all sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		await ctx.context.internalAdapter.deleteSessions(ctx.context.session.user.id);
	} catch (error) {
		ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
createAuthEndpoint("/revoke-other-sessions", {
	method: "POST",
	requireHeaders: true,
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		description: "Revoke all other sessions for the user except the current one",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all other sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const session = ctx.context.session;
	if (!session.user) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	const otherSessions = (await ctx.context.internalAdapter.listSessions(session.user.id)).filter((session) => {
		return session.expiresAt > /* @__PURE__ */ new Date();
	}).filter((session) => session.token !== ctx.context.session.session.token);
	await Promise.all(otherSessions.map((session) => ctx.context.internalAdapter.deleteSession(session.token)));
	return ctx.json({ status: true });
});
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/id.mjs
var generateId = (size) => {
	return createRandomStringGenerator("a-z", "A-Z", "0-9")(size || 32);
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+core@1.6.11_@b_3f357e8652888625f393bee0c48e5205/node_modules/@better-auth/core/dist/utils/async.mjs
/**
* Run an async mapper over items with bounded concurrency.
* Preserves input order in the result. Fails fast on the first rejection.
*/
async function mapConcurrent(items, fn, options) {
	const n = items.length;
	if (n === 0) return [];
	const { signal } = options;
	if (signal?.aborted) throw signal.reason;
	const raw = Math.floor(options.concurrency);
	const width = Math.min(n, raw >= 1 ? raw : 1);
	const results = new Array(n);
	let idx = 0;
	let failed = false;
	const worker = async () => {
		while (!failed && idx < n) {
			if (signal?.aborted) throw signal.reason;
			const i = idx++;
			try {
				results[i] = await fn(items[i], i);
			} catch (error) {
				failed = true;
				throw error;
			}
		}
	};
	await Promise.all(Array.from({ length: width }, worker));
	return results;
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/access/access.mjs
function role(statements) {
	return {
		authorize(request, connector = "AND") {
			let success = false;
			for (const [requestedResource, requestedActions] of Object.entries(request)) {
				const allowedActions = statements[requestedResource];
				if (!allowedActions) return {
					success: false,
					error: `You are not allowed to access resource: ${requestedResource}`
				};
				if (Array.isArray(requestedActions)) success = requestedActions.every((requestedAction) => allowedActions.includes(requestedAction));
				else if (typeof requestedActions === "object") {
					const actions = requestedActions;
					if (actions.connector === "OR") success = actions.actions.some((requestedAction) => allowedActions.includes(requestedAction));
					else success = actions.actions.every((requestedAction) => allowedActions.includes(requestedAction));
				} else throw new BetterAuthError("Invalid access control request");
				if (success && connector === "OR") return { success };
				if (!success && connector === "AND") return {
					success: false,
					error: `unauthorized to access resource "${requestedResource}"`
				};
			}
			if (success) return { success };
			return {
				success: false,
				error: "Not authorized"
			};
		},
		statements
	};
}
function createAccessControl(s) {
	return {
		newRole(statements) {
			return role(statements);
		},
		statements: s
	};
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/client/parser.mjs
var PROTO_POLLUTION_PATTERNS = {
	proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	protoShort: /"__proto__"\s*:/,
	constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
	true: true,
	false: false,
	null: null,
	undefined: void 0,
	nan: NaN,
	infinity: Number.POSITIVE_INFINITY,
	"-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
	const match = ISO_DATE_REGEX.exec(value);
	if (!match) return null;
	const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
	const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
	if (offsetSign) {
		const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
		date.setUTCMinutes(date.getUTCMinutes() + offset);
	}
	return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
	const { strict = false, warnings = false, reviver, parseDates = true } = options;
	if (typeof value !== "string") return value;
	const trimmed = value.trim();
	if (trimmed.length > 0 && trimmed[0] === "\"" && trimmed.endsWith("\"") && !trimmed.slice(1, -1).includes("\"")) return trimmed.slice(1, -1);
	const lowerValue = trimmed.toLowerCase();
	if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
	if (!JSON_SIGNATURE.test(trimmed)) {
		if (strict) throw new SyntaxError("[better-json] Invalid JSON");
		return value;
	}
	if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
		const matches = pattern.test(trimmed);
		if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
		return matches;
	}) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
	try {
		const secureReviver = (key, value) => {
			if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
				if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
				return;
			}
			if (parseDates && typeof value === "string") {
				const date = parseISODate(value);
				if (date) return date;
			}
			return reviver ? reviver(key, value) : value;
		};
		return JSON.parse(trimmed, secureReviver);
	} catch (error) {
		if (strict) throw error;
		return value;
	}
}
function parseJSON(value, options = { strict: true }) {
	return betterJSONParse(value, options);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+api-key@1.6.11_4b02081a4327d0bc2ec8c25cb65be4e6/node_modules/@better-auth/api-key/dist/index.mjs
var STORAGE_CONCURRENCY = 10;
/**
* Parses double-stringified metadata synchronously without updating the database.
* Use this for reading metadata, then call migrateLegacyMetadataInBackground for DB updates.
*
* @returns The properly parsed metadata object, or the original if already an object
*/
function parseDoubleStringifiedMetadata(metadata) {
	if (metadata == null) return null;
	if (typeof metadata === "object") return metadata;
	return safeJSONParse(metadata);
}
/**
* Checks if metadata needs migration (is a string instead of object)
*/
function needsMetadataMigration(metadata) {
	return metadata != null && typeof metadata === "string";
}
/**
* Batch migrates double-stringified metadata for multiple API keys.
* Runs all updates in parallel to avoid N sequential database calls.
*/
async function batchMigrateLegacyMetadata(ctx, apiKeys, opts) {
	if (opts.storage !== "database" && !opts.fallbackToDatabase) return;
	const keysToMigrate = apiKeys.filter((key) => needsMetadataMigration(key.metadata));
	if (keysToMigrate.length === 0) return;
	const migrationPromises = keysToMigrate.map(async (apiKey) => {
		const parsed = parseDoubleStringifiedMetadata(apiKey.metadata);
		try {
			await ctx.context.adapter.update({
				model: "apikey",
				where: [{
					field: "id",
					value: apiKey.id
				}],
				update: { metadata: parsed }
			});
		} catch (error) {
			ctx.context.logger.warn(`Failed to migrate double-stringified metadata for API key ${apiKey.id}:`, error);
		}
	});
	await Promise.all(migrationPromises);
}
/**
* Migrates double-stringified metadata to properly parsed object.
*
* This handles legacy data where metadata was incorrectly double-stringified.
* If metadata is a string (should be object after adapter's transform.output),
* it parses it and optionally updates the database.
*
* @returns The properly parsed metadata object
*/
async function migrateDoubleStringifiedMetadata(ctx, apiKey, opts) {
	const parsed = parseDoubleStringifiedMetadata(apiKey.metadata);
	if (needsMetadataMigration(apiKey.metadata) && (opts.storage === "database" || opts.fallbackToDatabase)) try {
		await ctx.context.adapter.update({
			model: "apikey",
			where: [{
				field: "id",
				value: apiKey.id
			}],
			update: { metadata: parsed }
		});
	} catch (error) {
		ctx.context.logger.warn(`Failed to migrate double-stringified metadata for API key ${apiKey.id}:`, error);
	}
	return parsed;
}
/**
* Generate storage key for API key by hashed key
*/
function getStorageKeyByHashedKey(hashedKey) {
	return `api-key:${hashedKey}`;
}
/**
* Generate storage key for API key by ID
*/
function getStorageKeyById(id) {
	return `api-key:by-id:${id}`;
}
/**
* Generate storage key for reference's API key list (user or org)
*/
function getStorageKeyByReferenceId(referenceId) {
	return `api-key:by-ref:${referenceId}`;
}
/**
* Serialize API key for storage
*/
function serializeApiKey(apiKey) {
	return JSON.stringify({
		...apiKey,
		createdAt: apiKey.createdAt.toISOString(),
		updatedAt: apiKey.updatedAt.toISOString(),
		expiresAt: apiKey.expiresAt?.toISOString() ?? null,
		lastRefillAt: apiKey.lastRefillAt?.toISOString() ?? null,
		lastRequest: apiKey.lastRequest?.toISOString() ?? null
	});
}
/**
* Deserialize API key from storage
*/
function deserializeApiKey(data) {
	if (!data || typeof data !== "string") return null;
	try {
		const parsed = JSON.parse(data);
		return {
			...parsed,
			createdAt: new Date(parsed.createdAt),
			updatedAt: new Date(parsed.updatedAt),
			expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
			lastRefillAt: parsed.lastRefillAt ? new Date(parsed.lastRefillAt) : null,
			lastRequest: parsed.lastRequest ? new Date(parsed.lastRequest) : null
		};
	} catch {
		return null;
	}
}
/**
* Get the storage instance to use (custom methods take precedence)
*/
function getStorageInstance(ctx, opts) {
	if (opts.customStorage) return opts.customStorage;
	return ctx.context.secondaryStorage || null;
}
/**
* Calculate TTL in seconds for an API key
*/
function calculateTTL(apiKey) {
	if (apiKey.expiresAt) {
		const now = Date.now();
		const expiresAt = new Date(apiKey.expiresAt).getTime();
		const ttlSeconds = Math.floor((expiresAt - now) / 1e3);
		if (ttlSeconds > 0) return ttlSeconds;
	}
}
/**
* Get API key from secondary storage by hashed key
*/
async function getApiKeyFromStorage(ctx, hashedKey, storage) {
	const key = getStorageKeyByHashedKey(hashedKey);
	return deserializeApiKey(await storage.get(key));
}
/**
* Get API key from secondary storage by ID
*/
async function getApiKeyByIdFromStorage(ctx, id, storage) {
	const key = getStorageKeyById(id);
	return deserializeApiKey(await storage.get(key));
}
/**
* Read-modify-write the ref list:
* used only when the list is the source of truth.
*/
async function modifyRefList(storage, refKey, modify) {
	const refListData = await storage.get(refKey);
	let keyIds = [];
	if (refListData && typeof refListData === "string") try {
		keyIds = JSON.parse(refListData);
	} catch {
		keyIds = [];
	}
	else if (Array.isArray(refListData)) keyIds = refListData;
	const next = modify(keyIds);
	if (next.length === 0) await storage.delete(refKey);
	else await storage.set(refKey, JSON.stringify(next));
}
async function setApiKeyInStorage(_ctx, apiKey, storage, ttl, opts) {
	const serialized = serializeApiKey(apiKey);
	const refKey = getStorageKeyByReferenceId(apiKey.referenceId);
	if (opts.fallbackToDatabase) {
		await Promise.all([
			storage.set(getStorageKeyByHashedKey(apiKey.key), serialized, ttl),
			storage.set(getStorageKeyById(apiKey.id), serialized, ttl),
			storage.delete(refKey)
		]);
		return;
	}
	await Promise.all([storage.set(getStorageKeyByHashedKey(apiKey.key), serialized, ttl), storage.set(getStorageKeyById(apiKey.id), serialized, ttl)]);
	await modifyRefList(storage, refKey, (ids) => ids.includes(apiKey.id) ? ids : [...ids, apiKey.id]);
}
/**
* Delete API key from secondary storage
*/
async function deleteApiKeyFromStorage(ctx, apiKey, storage, opts) {
	const refKey = getStorageKeyByReferenceId(apiKey.referenceId);
	if (opts.fallbackToDatabase) {
		await Promise.all([
			storage.delete(getStorageKeyByHashedKey(apiKey.key)),
			storage.delete(getStorageKeyById(apiKey.id)),
			storage.delete(refKey)
		]);
		return;
	}
	await Promise.all([
		storage.delete(getStorageKeyByHashedKey(apiKey.key)),
		storage.delete(getStorageKeyById(apiKey.id)),
		modifyRefList(storage, refKey, (ids) => ids.filter((keyId) => keyId !== apiKey.id))
	]);
}
/**
* Unified getter for API keys with support for all storage modes
*/
async function getApiKey$1(ctx, hashedKey, opts) {
	const storage = getStorageInstance(ctx, opts);
	if (opts.storage === "database") return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "key",
			value: hashedKey
		}]
	});
	if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
		if (storage) {
			const cached = await getApiKeyFromStorage(ctx, hashedKey, storage);
			if (cached) return cached;
		}
		const dbKey = await ctx.context.adapter.findOne({
			model: "apikey",
			where: [{
				field: "key",
				value: hashedKey
			}]
		});
		if (dbKey && storage) await setApiKeyInStorage(ctx, dbKey, storage, calculateTTL(dbKey), opts);
		return dbKey;
	}
	if (opts.storage === "secondary-storage") {
		if (!storage) return null;
		return await getApiKeyFromStorage(ctx, hashedKey, storage);
	}
	return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "key",
			value: hashedKey
		}]
	});
}
/**
* Unified getter for API keys by ID
*/
async function getApiKeyById(ctx, id, opts) {
	const storage = getStorageInstance(ctx, opts);
	if (opts.storage === "database") return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "id",
			value: id
		}]
	});
	if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
		if (storage) {
			const cached = await getApiKeyByIdFromStorage(ctx, id, storage);
			if (cached) return cached;
		}
		const dbKey = await ctx.context.adapter.findOne({
			model: "apikey",
			where: [{
				field: "id",
				value: id
			}]
		});
		if (dbKey && storage) await setApiKeyInStorage(ctx, dbKey, storage, calculateTTL(dbKey), opts);
		return dbKey;
	}
	if (opts.storage === "secondary-storage") {
		if (!storage) return null;
		return await getApiKeyByIdFromStorage(ctx, id, storage);
	}
	return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "id",
			value: id
		}]
	});
}
/**
* Unified setter for API keys with support for all storage modes
*/
async function setApiKey(ctx, apiKey, opts) {
	const storage = getStorageInstance(ctx, opts);
	const ttl = calculateTTL(apiKey);
	if (opts.storage === "database") return;
	if (opts.storage === "secondary-storage") {
		if (!storage) throw new Error("Secondary storage is required when storage mode is 'secondary-storage'");
		await setApiKeyInStorage(ctx, apiKey, storage, ttl, opts);
		return;
	}
}
/**
* Unified deleter for API keys with support for all storage modes
*/
async function deleteApiKey$1(ctx, apiKey, opts) {
	const storage = getStorageInstance(ctx, opts);
	if (opts.storage === "database") return;
	if (opts.storage === "secondary-storage") {
		if (!storage) throw new Error("Secondary storage is required when storage mode is 'secondary-storage'");
		await deleteApiKeyFromStorage(ctx, apiKey, storage, opts);
		return;
	}
}
/**
* Apply sorting and pagination to an array of API keys in memory
* Used for secondary storage mode where we can't rely on database operations
*/
function applySortingAndPagination(apiKeys, sortBy, sortDirection, limit, offset) {
	let result = [...apiKeys];
	if (sortBy) {
		const direction = sortDirection || "asc";
		result.sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];
			if (aValue == null && bValue == null) return 0;
			if (aValue == null) return direction === "asc" ? -1 : 1;
			if (bValue == null) return direction === "asc" ? 1 : -1;
			if (aValue < bValue) return direction === "asc" ? -1 : 1;
			if (aValue > bValue) return direction === "asc" ? 1 : -1;
			return 0;
		});
	}
	if (offset !== void 0) result = result.slice(offset);
	if (limit !== void 0) result = result.slice(0, limit);
	return result;
}
/**
* List API keys for a reference (user or org) with support for all storage modes
*/
async function listApiKeys$1(ctx, referenceId, opts, paginationOpts) {
	const storage = getStorageInstance(ctx, opts);
	const { limit, offset, sortBy, sortDirection } = paginationOpts || {};
	if (opts.storage === "database") {
		const [apiKeys, total] = await Promise.all([ctx.context.adapter.findMany({
			model: "apikey",
			where: [{
				field: "referenceId",
				value: referenceId
			}],
			limit,
			offset,
			sortBy: sortBy ? {
				field: sortBy,
				direction: sortDirection || "asc"
			} : void 0
		}), ctx.context.adapter.count({
			model: "apikey",
			where: [{
				field: "referenceId",
				value: referenceId
			}]
		})]);
		return {
			apiKeys,
			total
		};
	}
	if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
		const refKey = getStorageKeyByReferenceId(referenceId);
		if (storage) {
			const refListData = await storage.get(refKey);
			let keyIds = [];
			if (refListData && typeof refListData === "string") try {
				keyIds = JSON.parse(refListData);
			} catch {
				keyIds = [];
			}
			else if (Array.isArray(refListData)) keyIds = refListData;
			if (keyIds.length > 0) {
				const apiKeys = (await mapConcurrent(keyIds, (id) => getApiKeyByIdFromStorage(ctx, id, storage), { concurrency: STORAGE_CONCURRENCY })).filter((key) => key !== null && key !== void 0);
				return {
					apiKeys: applySortingAndPagination(apiKeys, sortBy, sortDirection, limit, offset),
					total: apiKeys.length
				};
			}
		}
		const [dbKeys, total] = await Promise.all([ctx.context.adapter.findMany({
			model: "apikey",
			where: [{
				field: "referenceId",
				value: referenceId
			}],
			limit,
			offset,
			sortBy: sortBy ? {
				field: sortBy,
				direction: sortDirection || "asc"
			} : void 0
		}), ctx.context.adapter.count({
			model: "apikey",
			where: [{
				field: "referenceId",
				value: referenceId
			}]
		})]);
		if (storage && dbKeys.length > 0) {
			await mapConcurrent(dbKeys, (apiKey) => setApiKeyInStorage(ctx, apiKey, storage, calculateTTL(apiKey), opts), { concurrency: STORAGE_CONCURRENCY });
			const keyIds = dbKeys.map((apiKey) => apiKey.id);
			await storage.set(refKey, JSON.stringify(keyIds));
		}
		return {
			apiKeys: dbKeys,
			total
		};
	}
	if (opts.storage === "secondary-storage") {
		if (!storage) return {
			apiKeys: [],
			total: 0
		};
		const refKey = getStorageKeyByReferenceId(referenceId);
		const refListData = await storage.get(refKey);
		let keyIds = [];
		if (refListData && typeof refListData === "string") try {
			keyIds = JSON.parse(refListData);
		} catch {
			return {
				apiKeys: [],
				total: 0
			};
		}
		else if (Array.isArray(refListData)) keyIds = refListData;
		else return {
			apiKeys: [],
			total: 0
		};
		const apiKeys = (await mapConcurrent(keyIds, (id) => getApiKeyByIdFromStorage(ctx, id, storage), { concurrency: STORAGE_CONCURRENCY })).filter((key) => key !== null && key !== void 0);
		return {
			apiKeys: applySortingAndPagination(apiKeys, sortBy, sortDirection, limit, offset),
			total: apiKeys.length
		};
	}
	const [apiKeys, total] = await Promise.all([ctx.context.adapter.findMany({
		model: "apikey",
		where: [{
			field: "referenceId",
			value: referenceId
		}],
		limit,
		offset,
		sortBy: sortBy ? {
			field: sortBy,
			direction: sortDirection || "asc"
		} : void 0
	}), ctx.context.adapter.count({
		model: "apikey",
		where: [{
			field: "referenceId",
			value: referenceId
		}]
	})]);
	return {
		apiKeys,
		total
	};
}
/**
* Gets the organization plugin options from the context.
* Returns null if the organization plugin is not installed.
*/
function getOrgOptions(ctx) {
	const context = ctx.context;
	if ("orgOptions" in context && context.orgOptions) return context.orgOptions;
	const orgPlugin = context.getPlugin?.("organization");
	if (orgPlugin && "options" in orgPlugin) return orgPlugin.options;
	return null;
}
/**
* Checks if a user is a member of an organization and has the required permission.
* This is used for organization-owned API keys to validate access.
*
* @param ctx - The endpoint context
* @param userId - The ID of the user to check
* @param organizationId - The ID of the organization (from API key's referenceId)
* @param requiredAction - The action the user is trying to perform (create, read, update, delete)
* @returns The member object if authorized
* @throws APIError if not authorized
*/
async function checkOrgApiKeyPermission(ctx, userId, organizationId, requiredAction) {
	const orgOptions = getOrgOptions(ctx);
	if (!orgOptions) {
		const msg = API_KEY_ERROR_CODES.ORGANIZATION_PLUGIN_REQUIRED;
		throw APIError.from("INTERNAL_SERVER_ERROR", msg);
	}
	const member = await ctx.context.adapter.findOne({
		model: "member",
		where: [{
			field: "userId",
			value: userId
		}, {
			field: "organizationId",
			value: organizationId
		}]
	});
	if (!member) {
		const msg = API_KEY_ERROR_CODES.USER_NOT_MEMBER_OF_ORGANIZATION;
		throw APIError.from("FORBIDDEN", msg);
	}
	if (!await checkPermission(ctx, member.role, organizationId, requiredAction, orgOptions)) {
		const msg = API_KEY_ERROR_CODES.INSUFFICIENT_API_KEY_PERMISSIONS;
		throw APIError.from("FORBIDDEN", msg);
	}
	return member;
}
/**
* Checks if a role has the required permission for API key operations.
* Uses the organization's access control system.
*
* Organization owners (determined by orgOptions.creatorRole, default "owner")
* are granted full access to API key operations.
*/
async function checkPermission(ctx, role, organizationId, action, orgOptions) {
	const { hasPermission } = await import("../better-auth.mjs").then((n) => n.t);
	try {
		return await hasPermission({
			role,
			options: orgOptions,
			permissions: { apiKey: [action] },
			organizationId,
			allowCreatorAllPermissions: true
		}, ctx);
	} catch {
		return false;
	}
}
var getDate = (span, unit = "ms") => {
	return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
function isAPIError(error) {
	return error instanceof APIError || error instanceof APIError || error?.name === "APIError";
}
var LOCALHOST_IP = "127.0.0.1";
function getIp(req, options) {
	if (options.advanced?.ipAddress?.disableIpTracking) return null;
	const headers = "headers" in req ? req.headers : req;
	const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || ["x-forwarded-for"];
	for (const key of ipHeaders) {
		const value = "get" in headers ? headers.get(key) : headers[key];
		if (typeof value === "string") {
			const ip = value.split(",")[0].trim();
			if (isValidIP(ip)) return normalizeIP(ip, { ipv6Subnet: options.advanced?.ipAddress?.ipv6Subnet });
		}
	}
	if (isTest() || isDevelopment()) return LOCALHOST_IP;
	return null;
}
var createApiKeyBodySchema = object({
	configId: string$1().meta({ description: "The configuration ID to use for the API key. If not provided, the default configuration will be used." }).optional(),
	name: string$1().meta({ description: "Name of the Api Key" }).optional(),
	expiresIn: number$1().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable().default(null),
	prefix: string$1().meta({ description: "Prefix of the Api Key" }).regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid prefix format, must be alphanumeric and contain only underscores and hyphens." }).optional(),
	remaining: number$1().meta({ description: "Remaining number of requests. Server side only" }).min(0).optional().nullable().default(null),
	metadata: any().optional(),
	refillAmount: number$1().meta({ description: "Amount to refill the remaining count of the Api Key. server-only. Eg: 100" }).min(1).optional(),
	refillInterval: number$1().meta({ description: "Interval to refill the Api Key in milliseconds. server-only. Eg: 1000" }).optional(),
	rateLimitTimeWindow: number$1().meta({ description: "The duration in milliseconds where each request is counted. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 1000" }).optional(),
	rateLimitMax: number$1().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
	rateLimitEnabled: boolean$1().meta({ description: "Whether the key has rate limiting enabled. server-only. Eg: true" }).optional(),
	permissions: record(string$1(), array(string$1())).meta({ description: "Permissions of the Api Key." }).optional(),
	userId: string().meta({ description: "User Id of the user that the Api Key belongs to. server-only. Eg: \"user-id\"" }).optional(),
	organizationId: string().meta({ description: "Organization Id of the organization that the Api Key belongs to. Eg: 'org-id'" }).optional()
});
function createApiKey({ defaultKeyGenerator, configurations, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/create", {
		method: "POST",
		body: createApiKeyBodySchema,
		metadata: { openapi: {
			description: "Create a new API key for a user",
			responses: { "200": {
				description: "API key created successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "Unique identifier of the API key"
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "Creation timestamp"
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "Last update timestamp"
						},
						name: {
							type: "string",
							nullable: true,
							description: "Name of the API key"
						},
						prefix: {
							type: "string",
							nullable: true,
							description: "Prefix of the API key"
						},
						start: {
							type: "string",
							nullable: true,
							description: "Starting characters of the key (if configured)"
						},
						key: {
							type: "string",
							description: "The full API key (only returned on creation)"
						},
						enabled: {
							type: "boolean",
							description: "Whether the key is enabled"
						},
						expiresAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Expiration timestamp"
						},
						referenceId: {
							type: "string",
							description: "ID of the reference owning the key"
						},
						lastRefillAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Last refill timestamp"
						},
						lastRequest: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Last request timestamp"
						},
						metadata: {
							type: "object",
							nullable: true,
							additionalProperties: true,
							description: "Metadata associated with the key"
						},
						rateLimitMax: {
							type: "number",
							nullable: true,
							description: "Maximum requests in time window"
						},
						rateLimitTimeWindow: {
							type: "number",
							nullable: true,
							description: "Rate limit time window in milliseconds"
						},
						remaining: {
							type: "number",
							nullable: true,
							description: "Remaining requests"
						},
						refillAmount: {
							type: "number",
							nullable: true,
							description: "Amount to refill"
						},
						refillInterval: {
							type: "number",
							nullable: true,
							description: "Refill interval in milliseconds"
						},
						rateLimitEnabled: {
							type: "boolean",
							description: "Whether rate limiting is enabled"
						},
						requestCount: {
							type: "number",
							description: "Current request count in window"
						},
						permissions: {
							type: "object",
							nullable: true,
							additionalProperties: {
								type: "array",
								items: { type: "string" }
							},
							description: "Permissions associated with the key"
						}
					},
					required: [
						"id",
						"createdAt",
						"updatedAt",
						"key",
						"enabled",
						"referenceId",
						"rateLimitEnabled",
						"requestCount"
					]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { configId, name, expiresIn, prefix, remaining, metadata, refillAmount, refillInterval, permissions, rateLimitMax, rateLimitTimeWindow, rateLimitEnabled } = ctx.body;
		const opts = resolveConfiguration(ctx.context, configurations, configId);
		const keyGenerator = opts.customKeyGenerator || defaultKeyGenerator;
		const session = await getSessionFromCtx(ctx);
		const isClientRequest = ctx.request || ctx.headers;
		if (isClientRequest && (refillAmount !== void 0 || refillInterval !== void 0 || rateLimitMax !== void 0 || rateLimitTimeWindow !== void 0 || rateLimitEnabled !== void 0 || permissions !== void 0 || remaining !== null)) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.SERVER_ONLY_PROPERTY);
		if (ctx.request && ctx.body.userId !== void 0) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		const referencesType = opts.references ?? "user";
		let referenceId;
		if (referencesType === "organization") {
			const orgId = ctx.body.organizationId;
			if (!orgId) {
				const msg = API_KEY_ERROR_CODES.ORGANIZATION_ID_REQUIRED;
				throw APIError.from("BAD_REQUEST", msg);
			}
			const userId = session?.user.id || ctx.body.userId;
			if (!userId) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
			await checkOrgApiKeyPermission(ctx, userId, orgId, "create");
			referenceId = orgId;
		} else if (isClientRequest) {
			if (!session?.user.id) {
				const msg = API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION;
				throw APIError.from("UNAUTHORIZED", msg);
			}
			referenceId = session.user.id;
		} else {
			const ctxUserId = ctx.body.userId;
			const sessionUserId = session?.user.id;
			if (!sessionUserId && !ctxUserId) {
				const msg = API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION;
				throw APIError.from("UNAUTHORIZED", msg);
			}
			if (session && ctxUserId && sessionUserId !== ctxUserId) {
				const msg = API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION;
				throw APIError.from("UNAUTHORIZED", msg);
			}
			referenceId = sessionUserId || ctxUserId;
		}
		if (metadata) {
			if (opts.enableMetadata === false) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.METADATA_DISABLED);
			if (typeof metadata !== "object") throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_METADATA_TYPE);
		}
		if (refillAmount && !refillInterval) {
			const msg = API_KEY_ERROR_CODES.REFILL_AMOUNT_AND_INTERVAL_REQUIRED;
			throw APIError.from("BAD_REQUEST", msg);
		}
		if (refillInterval && !refillAmount) {
			const msg = API_KEY_ERROR_CODES.REFILL_INTERVAL_AND_AMOUNT_REQUIRED;
			throw APIError.from("BAD_REQUEST", msg);
		}
		if (expiresIn) {
			if (opts.keyExpiration.disableCustomExpiresTime === true) {
				const msg = API_KEY_ERROR_CODES.KEY_DISABLED_EXPIRATION;
				throw APIError.from("BAD_REQUEST", msg);
			}
			const expiresIn_in_days = expiresIn / (3600 * 24);
			if (opts.keyExpiration.minExpiresIn > expiresIn_in_days) {
				const msg = API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_SMALL;
				throw APIError.from("BAD_REQUEST", msg);
			} else if (opts.keyExpiration.maxExpiresIn < expiresIn_in_days) {
				const msg = API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_LARGE;
				throw APIError.from("BAD_REQUEST", msg);
			}
		}
		if (prefix) {
			if (prefix.length < opts.minimumPrefixLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_PREFIX_LENGTH);
			if (prefix.length > opts.maximumPrefixLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_PREFIX_LENGTH);
		}
		if (name) {
			if (name.length < opts.minimumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
			if (name.length > opts.maximumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
		} else if (opts.requireName) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.NAME_REQUIRED);
		deleteAllExpiredApiKeys(ctx.context);
		const key = await keyGenerator({
			length: opts.defaultKeyLength,
			prefix: prefix || opts.defaultPrefix
		});
		const hashed = opts.disableKeyHashing ? key : await defaultKeyHasher(key);
		let start = null;
		if (opts.startingCharactersConfig.shouldStore) start = key.substring(0, opts.startingCharactersConfig.charactersLength);
		const defaultPermissions = opts.permissions?.defaultPermissions ? typeof opts.permissions.defaultPermissions === "function" ? await opts.permissions.defaultPermissions(referenceId, ctx) : opts.permissions.defaultPermissions : void 0;
		const permissionsToApply = permissions ? JSON.stringify(permissions) : defaultPermissions ? JSON.stringify(defaultPermissions) : void 0;
		const data = {
			configId: opts.configId ?? "default",
			createdAt: /* @__PURE__ */ new Date(),
			updatedAt: /* @__PURE__ */ new Date(),
			name: name ?? null,
			prefix: prefix ?? opts.defaultPrefix ?? null,
			start,
			key: hashed,
			enabled: true,
			expiresAt: expiresIn ? getDate(expiresIn, "sec") : opts.keyExpiration.defaultExpiresIn ? getDate(opts.keyExpiration.defaultExpiresIn, "sec") : null,
			referenceId,
			lastRefillAt: null,
			lastRequest: null,
			metadata: null,
			rateLimitMax: rateLimitMax ?? opts.rateLimit.maxRequests ?? null,
			rateLimitTimeWindow: rateLimitTimeWindow ?? opts.rateLimit.timeWindow ?? null,
			remaining: remaining === null ? remaining : remaining ?? refillAmount ?? null,
			refillAmount: refillAmount ?? null,
			refillInterval: refillInterval ?? null,
			rateLimitEnabled: rateLimitEnabled === void 0 ? opts.rateLimit.enabled ?? true : rateLimitEnabled,
			requestCount: 0,
			permissions: permissionsToApply
		};
		if (metadata) data.metadata = metadata;
		let apiKey;
		if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
			apiKey = await ctx.context.adapter.create({
				model: API_KEY_TABLE_NAME,
				data
			});
			await setApiKey(ctx, apiKey, opts);
		} else if (opts.storage === "secondary-storage") {
			const id = ctx.context.generateId({ model: "apikey" }) || generateId();
			apiKey = {
				...data,
				id
			};
			await setApiKey(ctx, apiKey, opts);
		} else apiKey = await ctx.context.adapter.create({
			model: API_KEY_TABLE_NAME,
			data
		});
		return ctx.json({
			...apiKey,
			key,
			metadata: metadata ?? null,
			permissions: apiKey.permissions ? safeJSONParse(apiKey.permissions) : null
		});
	});
}
function deleteAllExpiredApiKeysEndpoint({ deleteAllExpiredApiKeys }) {
	return createAuthEndpoint({ method: "POST" }, async (ctx) => {
		try {
			await deleteAllExpiredApiKeys(ctx.context, true);
		} catch (error) {
			ctx.context.logger.error("[API KEY PLUGIN] Failed to delete expired API keys:", error);
			return ctx.json({
				success: false,
				error
			});
		}
		return ctx.json({
			success: true,
			error: null
		});
	});
}
var deleteApiKeyBodySchema = object({
	configId: string$1().meta({ description: "The configuration ID to use for the API key lookup. If not provided, the default configuration will be used." }).optional(),
	keyId: string$1().meta({ description: "The id of the Api Key" })
});
function deleteApiKey({ configurations, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/delete", {
		method: "POST",
		body: deleteApiKeyBodySchema,
		use: [sessionMiddleware],
		metadata: { openapi: {
			description: "Delete an existing API key",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: { keyId: {
					type: "string",
					description: "The id of the API key to delete"
				} },
				required: ["keyId"]
			} } } },
			responses: { "200": {
				description: "API key deleted successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: { success: {
						type: "boolean",
						description: "Indicates if the API key was successfully deleted"
					} },
					required: ["success"]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { configId, keyId } = ctx.body;
		const session = ctx.context.session;
		if (session.user.banned === true) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.USER_BANNED);
		const lookupOpts = resolveConfiguration(ctx.context, configurations, configId);
		let apiKey = null;
		apiKey = await getApiKeyById(ctx, keyId, lookupOpts);
		if (!apiKey) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		if (!configIdMatches(apiKey.configId, lookupOpts.configId)) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		const opts = resolveConfiguration(ctx.context, configurations, apiKey.configId);
		if ((opts.references ?? "user") === "organization") await checkOrgApiKeyPermission(ctx, session.user.id, apiKey.referenceId, "delete");
		else if (apiKey.referenceId !== session.user.id) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		try {
			if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
				await deleteApiKey$1(ctx, apiKey, opts);
				await ctx.context.adapter.delete({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}]
				});
			} else if (opts.storage === "database") await ctx.context.adapter.delete({
				model: API_KEY_TABLE_NAME,
				where: [{
					field: "id",
					value: apiKey.id
				}]
			});
			else await deleteApiKey$1(ctx, apiKey, opts);
		} catch (error) {
			throw APIError.fromStatus("INTERNAL_SERVER_ERROR", { message: error?.message });
		}
		deleteAllExpiredApiKeys(ctx.context);
		return ctx.json({ success: true });
	});
}
var getApiKeyQuerySchema = object({
	configId: string$1().meta({ description: "The configuration ID to use for the API key lookup. If not provided, the default configuration will be used." }).optional(),
	id: string$1().meta({ description: "The id of the Api Key" })
});
function getApiKey({ configurations, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/get", {
		method: "GET",
		query: getApiKeyQuerySchema,
		use: [sessionMiddleware],
		metadata: { openapi: {
			description: "Retrieve an existing API key by ID",
			responses: { "200": {
				description: "API key retrieved successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "ID"
						},
						name: {
							type: "string",
							nullable: true,
							description: "The name of the key"
						},
						start: {
							type: "string",
							nullable: true,
							description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
						},
						prefix: {
							type: "string",
							nullable: true,
							description: "The API Key prefix. Stored as plain text."
						},
						userId: {
							type: "string",
							description: "The owner of the user id"
						},
						refillInterval: {
							type: "number",
							nullable: true,
							description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
						},
						refillAmount: {
							type: "number",
							nullable: true,
							description: "The amount to refill"
						},
						lastRefillAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "The last refill date"
						},
						enabled: {
							type: "boolean",
							description: "Sets if key is enabled or disabled",
							default: true
						},
						rateLimitEnabled: {
							type: "boolean",
							description: "Whether the key has rate limiting enabled"
						},
						rateLimitTimeWindow: {
							type: "number",
							nullable: true,
							description: "The duration in milliseconds"
						},
						rateLimitMax: {
							type: "number",
							nullable: true,
							description: "Maximum amount of requests allowed within a window"
						},
						requestCount: {
							type: "number",
							description: "The number of requests made within the rate limit time window"
						},
						remaining: {
							type: "number",
							nullable: true,
							description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
						},
						lastRequest: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "When last request occurred"
						},
						expiresAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Expiry date of a key"
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "created at"
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "updated at"
						},
						metadata: {
							type: "object",
							nullable: true,
							additionalProperties: true,
							description: "Extra metadata about the apiKey"
						},
						permissions: {
							type: "string",
							nullable: true,
							description: "Permissions for the api key (stored as JSON string)"
						}
					},
					required: [
						"id",
						"userId",
						"enabled",
						"rateLimitEnabled",
						"requestCount",
						"createdAt",
						"updatedAt"
					]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { configId, id } = ctx.query;
		const session = ctx.context.session;
		const lookupOpts = resolveConfiguration(ctx.context, configurations, configId);
		let apiKey = null;
		apiKey = await getApiKeyById(ctx, id, lookupOpts);
		if (!apiKey) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		if (!configIdMatches(apiKey.configId, lookupOpts.configId)) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		const opts = resolveConfiguration(ctx.context, configurations, apiKey.configId);
		if ((opts.references ?? "user") === "organization") await checkOrgApiKeyPermission(ctx, session.user.id, apiKey.referenceId, "read");
		else if (apiKey.referenceId !== session.user.id) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		deleteAllExpiredApiKeys(ctx.context);
		const metadata = await migrateDoubleStringifiedMetadata(ctx, apiKey, opts);
		const { key: _key, ...returningApiKey } = apiKey;
		return ctx.json({
			...returningApiKey,
			metadata,
			permissions: returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null
		});
	});
}
/**
* Generate a unique identifier for a configuration's storage backend.
* Used to group configurations that share the same storage and avoid duplicate queries.
*/
function getStorageIdentifier(config) {
	if (config.storage === "database") return "database";
	if (config.customStorage) return `custom:${config.configId ?? "default"}`;
	return config.fallbackToDatabase ? "secondary-storage-with-fallback" : "secondary-storage";
}
var listApiKeysQuerySchema = object({
	configId: string$1().meta({ description: "Filter by configuration ID. If not provided, returns keys from all configurations." }).optional(),
	organizationId: string$1().meta({ description: "Organization ID to list keys for. If provided, returns organization-owned keys. If not provided, returns user-owned keys." }).optional(),
	limit: number().int().nonnegative().meta({ description: "The number of API keys to return" }).optional(),
	offset: number().int().nonnegative().meta({ description: "The offset to start from" }).optional(),
	sortBy: string$1().meta({ description: "The field to sort by (e.g., createdAt, name, expiresAt)" }).optional(),
	sortDirection: _enum(["asc", "desc"]).meta({ description: "The direction to sort by" }).optional()
}).optional();
function listApiKeys({ configurations, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/list", {
		method: "GET",
		use: [sessionMiddleware],
		query: listApiKeysQuerySchema,
		metadata: { openapi: {
			description: "List all API keys for the authenticated user or for a specific organization",
			responses: { "200": {
				description: "API keys retrieved successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						apiKeys: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
										description: "ID"
									},
									name: {
										type: "string",
										nullable: true,
										description: "The name of the key"
									},
									start: {
										type: "string",
										nullable: true,
										description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
									},
									prefix: {
										type: "string",
										nullable: true,
										description: "The API Key prefix. Stored as plain text."
									},
									userId: {
										type: "string",
										description: "The owner of the user id"
									},
									refillInterval: {
										type: "number",
										nullable: true,
										description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
									},
									refillAmount: {
										type: "number",
										nullable: true,
										description: "The amount to refill"
									},
									lastRefillAt: {
										type: "string",
										format: "date-time",
										nullable: true,
										description: "The last refill date"
									},
									enabled: {
										type: "boolean",
										description: "Sets if key is enabled or disabled",
										default: true
									},
									rateLimitEnabled: {
										type: "boolean",
										description: "Whether the key has rate limiting enabled"
									},
									rateLimitTimeWindow: {
										type: "number",
										nullable: true,
										description: "The duration in milliseconds"
									},
									rateLimitMax: {
										type: "number",
										nullable: true,
										description: "Maximum amount of requests allowed within a window"
									},
									requestCount: {
										type: "number",
										description: "The number of requests made within the rate limit time window"
									},
									remaining: {
										type: "number",
										nullable: true,
										description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
									},
									lastRequest: {
										type: "string",
										format: "date-time",
										nullable: true,
										description: "When last request occurred"
									},
									expiresAt: {
										type: "string",
										format: "date-time",
										nullable: true,
										description: "Expiry date of a key"
									},
									createdAt: {
										type: "string",
										format: "date-time",
										description: "created at"
									},
									updatedAt: {
										type: "string",
										format: "date-time",
										description: "updated at"
									},
									metadata: {
										type: "object",
										nullable: true,
										additionalProperties: true,
										description: "Extra metadata about the apiKey"
									},
									permissions: {
										type: "string",
										nullable: true,
										description: "Permissions for the api key (stored as JSON string)"
									}
								},
								required: [
									"id",
									"userId",
									"enabled",
									"rateLimitEnabled",
									"requestCount",
									"createdAt",
									"updatedAt"
								]
							}
						},
						total: {
							type: "number",
							description: "Total number of API keys"
						},
						limit: {
							type: "number",
							nullable: true,
							description: "The limit used for pagination"
						},
						offset: {
							type: "number",
							nullable: true,
							description: "The offset used for pagination"
						}
					},
					required: ["apiKeys", "total"]
				} } }
			} }
		} }
	}, async (ctx) => {
		const session = ctx.context.session;
		const configId = ctx.query?.configId;
		const organizationId = ctx.query?.organizationId;
		const limit = ctx.query?.limit != null ? Number(ctx.query.limit) : void 0;
		const offset = ctx.query?.offset != null ? Number(ctx.query.offset) : void 0;
		if (organizationId) await checkOrgApiKeyPermission(ctx, session.user.id, organizationId, "read");
		const referenceId = organizationId ?? session.user.id;
		const expectedReferencesType = organizationId ? "organization" : "user";
		let allApiKeys = [];
		if (configId) {
			const { apiKeys } = await listApiKeys$1(ctx, referenceId, resolveConfiguration(ctx.context, configurations, configId), {
				limit: void 0,
				offset: void 0,
				sortBy: ctx.query?.sortBy,
				sortDirection: ctx.query?.sortDirection
			});
			allApiKeys = apiKeys;
		} else {
			const storageGroups = /* @__PURE__ */ new Map();
			for (const config of configurations) {
				const storageKey = getStorageIdentifier(config);
				if (!storageGroups.has(storageKey)) storageGroups.set(storageKey, config);
			}
			const groupResults = await Promise.all([...storageGroups.values()].map((opts) => listApiKeys$1(ctx, referenceId, opts, {
				limit: void 0,
				offset: void 0,
				sortBy: ctx.query?.sortBy,
				sortDirection: ctx.query?.sortDirection
			})));
			const seenIds = /* @__PURE__ */ new Set();
			for (const { apiKeys } of groupResults) for (const key of apiKeys) if (!seenIds.has(key.id)) {
				seenIds.add(key.id);
				allApiKeys.push(key);
			}
		}
		let filteredApiKeys = allApiKeys.filter((key) => {
			return (configurations.find((c) => {
				if (isDefaultConfigId(key.configId)) return isDefaultConfigId(c.configId);
				return c.configId === key.configId;
			})?.references ?? "user") === expectedReferencesType && key.referenceId === referenceId;
		});
		if (configId) filteredApiKeys = filteredApiKeys.filter((key) => configIdMatches(key.configId, configId));
		const total = filteredApiKeys.length;
		let paginatedApiKeys = filteredApiKeys;
		if (offset !== void 0) paginatedApiKeys = paginatedApiKeys.slice(offset);
		if (limit !== void 0) paginatedApiKeys = paginatedApiKeys.slice(0, limit);
		deleteAllExpiredApiKeys(ctx.context);
		const returningApiKeys = paginatedApiKeys.map((apiKey) => {
			const { key: _key, ...rest } = apiKey;
			return {
				...rest,
				metadata: parseDoubleStringifiedMetadata(apiKey.metadata),
				permissions: rest.permissions ? safeJSONParse(rest.permissions) : null
			};
		});
		const dbConfig = configurations.find((c) => c.storage === "database" || c.fallbackToDatabase);
		if (dbConfig) await ctx.context.runInBackgroundOrAwait(batchMigrateLegacyMetadata(ctx, paginatedApiKeys, dbConfig));
		return ctx.json({
			apiKeys: returningApiKeys,
			total,
			limit,
			offset
		});
	});
}
var updateApiKeyBodySchema = object({
	configId: string$1().meta({ description: "The configuration ID to use for the API key lookup. If not provided, the default configuration will be used." }).optional(),
	keyId: string$1().meta({ description: "The id of the Api Key" }),
	userId: string().meta({ description: "The id of the user which the api key belongs to. server-only. Eg: \"some-user-id\"" }).optional(),
	name: string$1().meta({ description: "The name of the key" }).optional(),
	enabled: boolean$1().meta({ description: "Whether the Api Key is enabled or not" }).optional(),
	remaining: number$1().meta({ description: "The number of remaining requests" }).min(1).optional(),
	refillAmount: number$1().meta({ description: "The refill amount" }).optional(),
	refillInterval: number$1().meta({ description: "The refill interval" }).optional(),
	metadata: any().optional(),
	expiresIn: number$1().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable(),
	rateLimitEnabled: boolean$1().meta({ description: "Whether the key has rate limiting enabled." }).optional(),
	rateLimitTimeWindow: number$1().meta({ description: "The duration in milliseconds where each request is counted. server-only. Eg: 1000" }).optional(),
	rateLimitMax: number$1().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
	permissions: record(string$1(), array(string$1())).meta({ description: "Update the permissions on the API Key. server-only." }).optional().nullable()
});
function updateApiKey({ configurations, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/update", {
		method: "POST",
		body: updateApiKeyBodySchema,
		metadata: { openapi: {
			description: "Update an existing API key by ID",
			responses: { "200": {
				description: "API key updated successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "ID"
						},
						name: {
							type: "string",
							nullable: true,
							description: "The name of the key"
						},
						start: {
							type: "string",
							nullable: true,
							description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
						},
						prefix: {
							type: "string",
							nullable: true,
							description: "The API Key prefix. Stored as plain text."
						},
						userId: {
							type: "string",
							description: "The owner of the user id"
						},
						refillInterval: {
							type: "number",
							nullable: true,
							description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
						},
						refillAmount: {
							type: "number",
							nullable: true,
							description: "The amount to refill"
						},
						lastRefillAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "The last refill date"
						},
						enabled: {
							type: "boolean",
							description: "Sets if key is enabled or disabled",
							default: true
						},
						rateLimitEnabled: {
							type: "boolean",
							description: "Whether the key has rate limiting enabled"
						},
						rateLimitTimeWindow: {
							type: "number",
							nullable: true,
							description: "The duration in milliseconds"
						},
						rateLimitMax: {
							type: "number",
							nullable: true,
							description: "Maximum amount of requests allowed within a window"
						},
						requestCount: {
							type: "number",
							description: "The number of requests made within the rate limit time window"
						},
						remaining: {
							type: "number",
							nullable: true,
							description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
						},
						lastRequest: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "When last request occurred"
						},
						expiresAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Expiry date of a key"
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "created at"
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "updated at"
						},
						metadata: {
							type: "object",
							nullable: true,
							additionalProperties: true,
							description: "Extra metadata about the apiKey"
						},
						permissions: {
							type: "string",
							nullable: true,
							description: "Permissions for the api key (stored as JSON string)"
						}
					},
					required: [
						"id",
						"userId",
						"enabled",
						"rateLimitEnabled",
						"requestCount",
						"createdAt",
						"updatedAt"
					]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { configId, keyId, expiresIn, enabled, metadata, refillAmount, refillInterval, remaining, name, permissions, rateLimitEnabled, rateLimitTimeWindow, rateLimitMax } = ctx.body;
		const session = await getSessionFromCtx(ctx);
		const authRequired = ctx.request || ctx.headers;
		const user = authRequired && !session ? null : session?.user || { id: ctx.body.userId };
		if (!user?.id) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		if (session && ctx.body.userId && session?.user.id !== ctx.body.userId) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		if (authRequired) {
			if (refillAmount !== void 0 || refillInterval !== void 0 || rateLimitMax !== void 0 || rateLimitTimeWindow !== void 0 || rateLimitEnabled !== void 0 || remaining !== void 0 || permissions !== void 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.SERVER_ONLY_PROPERTY);
		}
		const lookupOpts = resolveConfiguration(ctx.context, configurations, configId);
		let apiKey = null;
		apiKey = await getApiKeyById(ctx, keyId, lookupOpts);
		if (!apiKey) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		if (!configIdMatches(apiKey.configId, lookupOpts.configId)) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		const opts = resolveConfiguration(ctx.context, configurations, apiKey.configId);
		if ((opts.references ?? "user") === "organization") await checkOrgApiKeyPermission(ctx, user.id, apiKey.referenceId, "update");
		else if (apiKey.referenceId !== user.id) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		const newValues = {};
		if (name !== void 0) {
			if (name.length < opts.minimumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
			else if (name.length > opts.maximumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
			newValues.name = name;
		}
		if (enabled !== void 0) newValues.enabled = enabled;
		if (expiresIn !== void 0) {
			if (opts.keyExpiration.disableCustomExpiresTime === true) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.KEY_DISABLED_EXPIRATION);
			if (expiresIn !== null) {
				const expiresIn_in_days = expiresIn / (3600 * 24);
				if (expiresIn_in_days < opts.keyExpiration.minExpiresIn) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_SMALL);
				else if (expiresIn_in_days > opts.keyExpiration.maxExpiresIn) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_LARGE);
			}
			newValues.expiresAt = expiresIn ? getDate(expiresIn, "sec") : null;
		}
		if (metadata !== void 0 && opts.enableMetadata === true) {
			if (typeof metadata !== "object") throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_METADATA_TYPE);
			newValues.metadata = metadata;
		}
		if (remaining !== void 0) newValues.remaining = remaining;
		if (refillAmount !== void 0 || refillInterval !== void 0) {
			if (refillAmount !== void 0 && refillInterval === void 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.REFILL_AMOUNT_AND_INTERVAL_REQUIRED);
			else if (refillInterval !== void 0 && refillAmount === void 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.REFILL_INTERVAL_AND_AMOUNT_REQUIRED);
			newValues.refillAmount = refillAmount;
			newValues.refillInterval = refillInterval;
		}
		if (rateLimitEnabled !== void 0) newValues.rateLimitEnabled = rateLimitEnabled;
		if (rateLimitTimeWindow !== void 0) newValues.rateLimitTimeWindow = rateLimitTimeWindow;
		if (rateLimitMax !== void 0) newValues.rateLimitMax = rateLimitMax;
		if (permissions !== void 0) newValues.permissions = JSON.stringify(permissions);
		if (Object.keys(newValues).length === 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.NO_VALUES_TO_UPDATE);
		let newApiKey = apiKey;
		try {
			if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
				const dbUpdated = await ctx.context.adapter.update({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}],
					update: newValues
				});
				if (dbUpdated) {
					await setApiKey(ctx, dbUpdated, opts);
					newApiKey = dbUpdated;
				}
			} else if (opts.storage === "database") {
				const result = await ctx.context.adapter.update({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}],
					update: newValues
				});
				if (result) newApiKey = result;
			} else {
				const updated = {
					...apiKey,
					...newValues,
					updatedAt: /* @__PURE__ */ new Date()
				};
				await setApiKey(ctx, updated, opts);
				newApiKey = updated;
			}
		} catch (error) {
			throw APIError.fromStatus("INTERNAL_SERVER_ERROR", { message: error?.message });
		}
		deleteAllExpiredApiKeys(ctx.context);
		const migratedMetadata = await migrateDoubleStringifiedMetadata(ctx, newApiKey, opts);
		const { key: _key, ...returningApiKey } = newApiKey;
		return ctx.json({
			...returningApiKey,
			metadata: migratedMetadata,
			permissions: returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null
		});
	});
}
/**
* Determines if a request is allowed based on rate limiting parameters.
*
* @returns An object indicating whether the request is allowed and, if not,
*          a message and updated ApiKey data.
*/
function isRateLimited(apiKey, opts) {
	const now = /* @__PURE__ */ new Date();
	const lastRequest = apiKey.lastRequest;
	const rateLimitTimeWindow = apiKey.rateLimitTimeWindow;
	const rateLimitMax = apiKey.rateLimitMax;
	let requestCount = apiKey.requestCount;
	if (opts.rateLimit.enabled === false) return {
		success: true,
		message: null,
		update: { lastRequest: now },
		tryAgainIn: null
	};
	if (apiKey.rateLimitEnabled === false) return {
		success: true,
		message: null,
		update: { lastRequest: now },
		tryAgainIn: null
	};
	if (rateLimitTimeWindow === null || rateLimitMax === null) return {
		success: true,
		message: null,
		update: null,
		tryAgainIn: null
	};
	if (lastRequest === null) return {
		success: true,
		message: null,
		update: {
			lastRequest: now,
			requestCount: 1
		},
		tryAgainIn: null
	};
	const timeSinceLastRequest = now.getTime() - new Date(lastRequest).getTime();
	if (timeSinceLastRequest > rateLimitTimeWindow) return {
		success: true,
		message: null,
		update: {
			lastRequest: now,
			requestCount: 1
		},
		tryAgainIn: null
	};
	if (requestCount >= rateLimitMax) return {
		success: false,
		message: API_KEY_ERROR_CODES.RATE_LIMIT_EXCEEDED.message,
		update: null,
		tryAgainIn: Math.ceil(rateLimitTimeWindow - timeSinceLastRequest)
	};
	requestCount++;
	return {
		success: true,
		message: null,
		tryAgainIn: null,
		update: {
			lastRequest: now,
			requestCount
		}
	};
}
async function validateApiKey({ hashedKey, ctx, opts, schema, permissions }) {
	const apiKey = await getApiKey$1(ctx, hashedKey, opts);
	if (!apiKey) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.INVALID_API_KEY);
	if (apiKey.configId !== (opts.configId ?? "default")) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.INVALID_API_KEY);
	if (apiKey.enabled === false) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_DISABLED);
	if (apiKey.expiresAt) {
		if (Date.now() > new Date(apiKey.expiresAt).getTime()) {
			const deleteExpiredKey = async () => {
				if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
					await deleteApiKey$1(ctx, apiKey, opts);
					await ctx.context.adapter.delete({
						model: API_KEY_TABLE_NAME,
						where: [{
							field: "id",
							value: apiKey.id
						}]
					});
				} else if (opts.storage === "secondary-storage") await deleteApiKey$1(ctx, apiKey, opts);
				else await ctx.context.adapter.delete({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}]
				});
			};
			if (opts.deferUpdates) ctx.context.runInBackground(deleteExpiredKey().catch((error) => {
				ctx.context.logger.error("Deferred update failed:", error);
			}));
			else await deleteExpiredKey();
			throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_EXPIRED);
		}
	}
	if (permissions) {
		const apiKeyPermissions = apiKey.permissions ? safeJSONParse(apiKey.permissions) : null;
		if (!apiKeyPermissions) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		if (!role(apiKeyPermissions).authorize(permissions).success) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
	}
	let remaining = apiKey.remaining;
	let lastRefillAt = apiKey.lastRefillAt;
	if (apiKey.remaining === 0 && apiKey.refillAmount === null) {
		const deleteExhaustedKey = async () => {
			if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
				await deleteApiKey$1(ctx, apiKey, opts);
				await ctx.context.adapter.delete({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}]
				});
			} else if (opts.storage === "secondary-storage") await deleteApiKey$1(ctx, apiKey, opts);
			else await ctx.context.adapter.delete({
				model: API_KEY_TABLE_NAME,
				where: [{
					field: "id",
					value: apiKey.id
				}]
			});
		};
		if (opts.deferUpdates) ctx.context.runInBackground(deleteExhaustedKey().catch((error) => {
			ctx.context.logger.error("Deferred update failed:", error);
		}));
		else await deleteExhaustedKey();
		throw APIError.from("TOO_MANY_REQUESTS", API_KEY_ERROR_CODES.USAGE_EXCEEDED);
	} else if (remaining !== null) {
		const now = Date.now();
		const refillInterval = apiKey.refillInterval;
		const refillAmount = apiKey.refillAmount;
		const lastTime = new Date(lastRefillAt ?? apiKey.createdAt).getTime();
		if (refillInterval && refillAmount) {
			if (now - lastTime > refillInterval) {
				remaining = refillAmount;
				lastRefillAt = /* @__PURE__ */ new Date();
			}
		}
		if (remaining === 0) throw APIError.from("TOO_MANY_REQUESTS", API_KEY_ERROR_CODES.USAGE_EXCEEDED);
		else remaining--;
	}
	const { message, success, update, tryAgainIn } = isRateLimited(apiKey, opts);
	if (success === false) throw new APIError("TOO_MANY_REQUESTS", {
		message: message ?? void 0,
		code: "RATE_LIMITED",
		details: { tryAgainIn }
	});
	const updated = {
		...apiKey,
		...update,
		remaining,
		lastRefillAt,
		updatedAt: /* @__PURE__ */ new Date()
	};
	const performUpdate = async () => {
		if (opts.storage === "database") return ctx.context.adapter.update({
			model: API_KEY_TABLE_NAME,
			where: [{
				field: "id",
				value: apiKey.id
			}],
			update: {
				...updated,
				id: void 0
			}
		});
		else if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
			const dbUpdated = await ctx.context.adapter.update({
				model: API_KEY_TABLE_NAME,
				where: [{
					field: "id",
					value: apiKey.id
				}],
				update: {
					...updated,
					id: void 0
				}
			});
			if (dbUpdated) await setApiKey(ctx, dbUpdated, opts);
			return dbUpdated;
		} else {
			await setApiKey(ctx, updated, opts);
			return updated;
		}
	};
	let newApiKey = null;
	if (opts.deferUpdates) {
		ctx.context.runInBackground(performUpdate().catch((error) => {
			ctx.context.logger.error("Failed to update API key:", error);
		}));
		newApiKey = updated;
	} else {
		newApiKey = await performUpdate();
		if (!newApiKey) throw APIError.from("INTERNAL_SERVER_ERROR", API_KEY_ERROR_CODES.FAILED_TO_UPDATE_API_KEY);
	}
	return newApiKey;
}
var verifyApiKeyBodySchema = object({
	configId: string$1().meta({ description: "The configuration ID to use for verification. If not provided, the default configuration will be used." }).optional(),
	key: string$1().meta({ description: "The key to verify" }),
	permissions: record(string$1(), array(string$1())).meta({ description: "The permissions to verify." }).optional()
});
function verifyApiKey({ configurations, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint({
		method: "POST",
		body: verifyApiKeyBodySchema
	}, async (ctx) => {
		const { configId, key } = ctx.body;
		const lookupOpts = resolveConfiguration(ctx.context, configurations, configId);
		if (lookupOpts.customAPIKeyValidator) {
			if (!await lookupOpts.customAPIKeyValidator({
				ctx,
				key
			})) return ctx.json({
				valid: false,
				error: {
					message: API_KEY_ERROR_CODES.INVALID_API_KEY,
					code: "KEY_NOT_FOUND"
				},
				key: null
			});
		}
		const hashed = lookupOpts.disableKeyHashing ? key : await defaultKeyHasher(key);
		let apiKey = null;
		try {
			apiKey = await validateApiKey({
				hashedKey: hashed,
				permissions: ctx.body.permissions,
				ctx,
				opts: lookupOpts,
				schema
			});
			if ((apiKey ? resolveConfiguration(ctx.context, configurations, apiKey.configId) : lookupOpts).deferUpdates) ctx.context.runInBackground(deleteAllExpiredApiKeys(ctx.context).catch((err) => {
				ctx.context.logger.error("Failed to delete expired API keys:", err);
			}));
		} catch (error) {
			ctx.context.logger.error("Failed to validate API key:", error);
			if (isAPIError(error)) return ctx.json({
				valid: false,
				error: {
					...error.body,
					message: error.body?.message,
					code: error.body?.code
				},
				key: null
			});
			return ctx.json({
				valid: false,
				error: {
					message: API_KEY_ERROR_CODES.INVALID_API_KEY,
					code: "INVALID_API_KEY"
				},
				key: null
			});
		}
		const { key: _, ...returningApiKey } = apiKey ?? {
			key: 1,
			permissions: void 0
		};
		const opts = apiKey ? resolveConfiguration(ctx.context, configurations, apiKey.configId) : lookupOpts;
		let migratedMetadata = null;
		if (apiKey) migratedMetadata = await migrateDoubleStringifiedMetadata(ctx, apiKey, opts);
		returningApiKey.permissions = returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null;
		return ctx.json({
			valid: true,
			error: null,
			key: apiKey === null ? null : {
				...returningApiKey,
				metadata: migratedMetadata
			}
		});
	});
}
function resolveConfiguration(authContext, configurations, configId) {
	const getDefaultConfig = () => {
		const defaultConfig = configurations.find((c) => !c.configId || c.configId === "default");
		if (!defaultConfig) {
			authContext.logger.error("No default api-key configuration found. Either provide an api-key configuration with configId 'default' or provide a configuration with no `configId` set.");
			const error = API_KEY_ERROR_CODES.NO_DEFAULT_API_KEY_CONFIGURATION_FOUND;
			throw APIError.from("BAD_REQUEST", error);
		}
		return {
			...defaultConfig,
			configId: "default"
		};
	};
	if (!configId) return getDefaultConfig();
	return configurations.find((c) => c.configId === configId) ?? getDefaultConfig();
}
/**
* Checks if a configId value represents the default configuration.
* Treats null, undefined, and "default" as equivalent (all are default).
* This handles backward compatibility for keys created before the configId field existed.
*/
function isDefaultConfigId(configId) {
	return !configId || configId === "default";
}
/**
* Checks if two configId values match, treating null/undefined as "default".
* This handles backward compatibility for keys created before the configId field existed.
*/
function configIdMatches(keyConfigId, expectedConfigId) {
	if (isDefaultConfigId(keyConfigId) && isDefaultConfigId(expectedConfigId)) return true;
	return keyConfigId === expectedConfigId;
}
var lastChecked = null;
async function deleteAllExpiredApiKeys(ctx, byPassLastCheckTime = false) {
	if (lastChecked && !byPassLastCheckTime) {
		if ((/* @__PURE__ */ new Date()).getTime() - lastChecked.getTime() < 1e4) return;
	}
	lastChecked = /* @__PURE__ */ new Date();
	await ctx.adapter.deleteMany({
		model: API_KEY_TABLE_NAME,
		where: [{
			field: "expiresAt",
			operator: "lt",
			value: /* @__PURE__ */ new Date()
		}, {
			field: "expiresAt",
			operator: "ne",
			value: null
		}]
	}).catch((error) => {
		ctx.logger.error(`Failed to delete expired API keys:`, error);
	});
}
function createApiKeyRoutes({ defaultKeyGenerator, configurations, schema }) {
	return {
		createApiKey: createApiKey({
			defaultKeyGenerator,
			configurations,
			schema,
			deleteAllExpiredApiKeys
		}),
		verifyApiKey: verifyApiKey({
			configurations,
			schema,
			deleteAllExpiredApiKeys
		}),
		getApiKey: getApiKey({
			configurations,
			schema,
			deleteAllExpiredApiKeys
		}),
		updateApiKey: updateApiKey({
			configurations,
			schema,
			deleteAllExpiredApiKeys
		}),
		deleteApiKey: deleteApiKey({
			configurations,
			schema,
			deleteAllExpiredApiKeys
		}),
		listApiKeys: listApiKeys({
			configurations,
			schema,
			deleteAllExpiredApiKeys
		}),
		deleteAllExpiredApiKeys: deleteAllExpiredApiKeysEndpoint({ deleteAllExpiredApiKeys })
	};
}
var apiKeySchema = ({ defaultRateLimitMax, defaultTimeWindow }) => ({ apikey: { fields: {
	configId: {
		type: "string",
		required: true,
		defaultValue: "default",
		input: false,
		index: true
	},
	name: {
		type: "string",
		required: false,
		input: false
	},
	start: {
		type: "string",
		required: false,
		input: false
	},
	referenceId: {
		type: "string",
		required: true,
		input: false,
		index: true
	},
	prefix: {
		type: "string",
		required: false,
		input: false
	},
	key: {
		type: "string",
		required: true,
		input: false,
		index: true
	},
	refillInterval: {
		type: "number",
		required: false,
		input: false
	},
	refillAmount: {
		type: "number",
		required: false,
		input: false
	},
	lastRefillAt: {
		type: "date",
		required: false,
		input: false
	},
	enabled: {
		type: "boolean",
		required: false,
		input: false,
		defaultValue: true
	},
	rateLimitEnabled: {
		type: "boolean",
		required: false,
		input: false,
		defaultValue: true
	},
	rateLimitTimeWindow: {
		type: "number",
		required: false,
		input: false,
		defaultValue: defaultTimeWindow
	},
	rateLimitMax: {
		type: "number",
		required: false,
		input: false,
		defaultValue: defaultRateLimitMax
	},
	requestCount: {
		type: "number",
		required: false,
		input: false,
		defaultValue: 0
	},
	remaining: {
		type: "number",
		required: false,
		input: false
	},
	lastRequest: {
		type: "date",
		required: false,
		input: false
	},
	expiresAt: {
		type: "date",
		required: false,
		input: false
	},
	createdAt: {
		type: "date",
		required: true,
		input: false
	},
	updatedAt: {
		type: "date",
		required: true,
		input: false
	},
	permissions: {
		type: "string",
		required: false,
		input: false
	},
	metadata: {
		type: "string",
		required: false,
		input: true,
		transform: {
			input(value) {
				return JSON.stringify(value);
			},
			output(value) {
				if (!value) return null;
				return parseJSON(value);
			}
		}
	}
} } });
var defaultKeyHasher = async (key) => {
	const hash = await createHash("SHA-256").digest(new TextEncoder().encode(key));
	return base64Url.encode(new Uint8Array(hash), { padding: false });
};
var API_KEY_TABLE_NAME = "apikey";
function apiKey(_configurations, _options) {
	if (Array.isArray(_configurations) && _configurations.length > 0) {
		if (!_configurations.every((option) => option.configId)) throw new BetterAuthError("configId is required for each API key configuration in the api-key plugin.");
		const configIds = _configurations.map((option) => option.configId);
		if (new Set(configIds).size !== configIds.length) throw new BetterAuthError("configId must be unique for each API key configuration in the api-key plugin.");
	}
	const options = _options ?? { schema: Array.isArray(_configurations) ? void 0 : _configurations?.schema };
	const configurations = [...(Array.isArray(_configurations) ? _configurations : [_configurations]).map((config) => ({
		...config,
		apiKeyHeaders: config?.apiKeyHeaders ?? "x-api-key",
		defaultKeyLength: config?.defaultKeyLength || 64,
		maximumPrefixLength: config?.maximumPrefixLength ?? 32,
		minimumPrefixLength: config?.minimumPrefixLength ?? 1,
		maximumNameLength: config?.maximumNameLength ?? 32,
		minimumNameLength: config?.minimumNameLength ?? 1,
		enableMetadata: config?.enableMetadata ?? false,
		disableKeyHashing: config?.disableKeyHashing ?? false,
		requireName: config?.requireName ?? false,
		storage: config?.storage ?? "database",
		rateLimit: {
			enabled: config?.rateLimit?.enabled === void 0 ? true : config?.rateLimit?.enabled,
			timeWindow: config?.rateLimit?.timeWindow ?? 1e3 * 60 * 60 * 24,
			maxRequests: config?.rateLimit?.maxRequests ?? 10
		},
		keyExpiration: {
			defaultExpiresIn: config?.keyExpiration?.defaultExpiresIn ?? null,
			disableCustomExpiresTime: config?.keyExpiration?.disableCustomExpiresTime ?? false,
			maxExpiresIn: config?.keyExpiration?.maxExpiresIn ?? 365,
			minExpiresIn: config?.keyExpiration?.minExpiresIn ?? 1
		},
		startingCharactersConfig: {
			shouldStore: config?.startingCharactersConfig?.shouldStore ?? true,
			charactersLength: config?.startingCharactersConfig?.charactersLength ?? 6
		},
		enableSessionForAPIKeys: config?.enableSessionForAPIKeys ?? false,
		fallbackToDatabase: config?.fallbackToDatabase ?? false,
		customStorage: config?.customStorage,
		deferUpdates: config?.deferUpdates ?? false
	}))];
	const schema = mergeSchema(apiKeySchema({
		defaultRateLimitMax: (configurations.length === 1 ? configurations[0]?.rateLimit.maxRequests : void 0) ?? 10,
		defaultTimeWindow: (configurations.length === 1 ? configurations[0]?.rateLimit.timeWindow : void 0) ?? 1e3 * 60 * 60 * 24
	}), options.schema);
	const defaultKeyGenerator = async (opts) => {
		const key = generateRandomString(opts.length, "a-z", "A-Z");
		return `${opts.prefix || ""}${key}`;
	};
	function getApiKeyFromConfig(ctx, config) {
		if (config.customAPIKeyGetter) return config.customAPIKeyGetter(ctx);
		if (Array.isArray(config.apiKeyHeaders)) {
			for (const header of config.apiKeyHeaders) {
				const value = ctx.headers?.get(header);
				if (value) return value;
			}
			return null;
		}
		return ctx.headers?.get(config.apiKeyHeaders) ?? null;
	}
	function findApiKeyAndConfig(ctx) {
		for (const config of configurations) {
			if (!config.enableSessionForAPIKeys) continue;
			const key = getApiKeyFromConfig(ctx, config);
			if (key) return {
				key,
				config
			};
		}
		return null;
	}
	const routes = createApiKeyRoutes({
		defaultKeyGenerator,
		configurations,
		schema
	});
	return {
		id: "api-key",
		version: PACKAGE_VERSION,
		$ERROR_CODES: API_KEY_ERROR_CODES,
		hooks: { before: [{
			matcher: (ctx) => !!findApiKeyAndConfig(ctx),
			handler: createAuthMiddleware(async (ctx) => {
				const { key, config } = findApiKeyAndConfig(ctx);
				if (typeof key !== "string") throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_API_KEY_GETTER_RETURN_TYPE);
				if (key.length < config.defaultKeyLength) throw APIError.from("FORBIDDEN", API_KEY_ERROR_CODES.INVALID_API_KEY);
				if (config.customAPIKeyValidator) {
					if (!await config.customAPIKeyValidator({
						ctx,
						key
					})) throw APIError.from("FORBIDDEN", API_KEY_ERROR_CODES.INVALID_API_KEY);
				}
				const apiKey = await validateApiKey({
					hashedKey: config.disableKeyHashing ? key : await defaultKeyHasher(key),
					ctx,
					opts: config,
					schema
				});
				const cleanupTask = deleteAllExpiredApiKeys(ctx.context).catch((err) => {
					ctx.context.logger.error("Failed to delete expired API keys:", err);
				});
				if (config.deferUpdates) ctx.context.runInBackground(cleanupTask);
				if ((config.references ?? "user") !== "user") {
					const msg = API_KEY_ERROR_CODES.INVALID_REFERENCE_ID_FROM_API_KEY;
					throw APIError.from("UNAUTHORIZED", msg);
				}
				const user = await ctx.context.internalAdapter.findUserById(apiKey.referenceId);
				if (!user) {
					const msg = API_KEY_ERROR_CODES.INVALID_REFERENCE_ID_FROM_API_KEY;
					throw APIError.from("UNAUTHORIZED", msg);
				}
				const session = {
					user,
					session: {
						id: apiKey.id,
						token: key,
						userId: apiKey.referenceId,
						userAgent: ctx.request?.headers.get("user-agent") ?? null,
						ipAddress: ctx.request ? getIp(ctx.request, ctx.context.options) : null,
						createdAt: /* @__PURE__ */ new Date(),
						updatedAt: /* @__PURE__ */ new Date(),
						expiresAt: apiKey.expiresAt || getDate(ctx.context.options.session?.expiresIn || 3600 * 24 * 7, "ms")
					}
				};
				ctx.context.session = session;
				if (ctx.path === "/get-session") return session;
				else return { context: ctx };
			})
		}] },
		endpoints: {
			createApiKey: routes.createApiKey,
			verifyApiKey: routes.verifyApiKey,
			getApiKey: routes.getApiKey,
			updateApiKey: routes.updateApiKey,
			deleteApiKey: routes.deleteApiKey,
			listApiKeys: routes.listApiKeys,
			deleteAllExpiredApiKeys: routes.deleteAllExpiredApiKeys
		},
		schema
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+api-key@1.6.11_4b02081a4327d0bc2ec8c25cb65be4e6/node_modules/@better-auth/api-key/dist/client.mjs
var apiKeyClient = () => {
	return {
		id: "api-key",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {},
		pathMethods: {
			"/api-key/create": "POST",
			"/api-key/delete": "POST",
			"/api-key/delete-all-expired-api-keys": "POST"
		},
		$ERROR_CODES: API_KEY_ERROR_CODES
	};
};
//#endregion
export { logger as $, SignJWT as A, JWKSInvalid as B, crypto_exports as C, constantTimeEqual as D, symmetricEncrypt as E, exportJWK as F, JWTInvalid as G, JWKSNoMatchingKey as H, importJWK as I, decoder as J, decode as K, isObject as L, JWTClaimsBuilder as M, validateClaimsSet as N, signJWT as O, compactVerify as P, getProtocol as Q, JOSEError as R, getAuthTables as S, string as St, symmetricDecrypt as T, JWKSTimeout as U, JWKSMultipleMatchingKeys as V, JWTExpired as W, getHost as X, generateRandomString as Y, getOrigin as Z, parseSetCookieHeader as _, defineErrorCodes as _t, freshSessionMiddleware as a, base64Url as at, mergeSchema as b, boolean as bt, sessionMiddleware as c, isAPIError$1 as ct, defineRequestState as d, findRoute as dt, env as et, deleteSessionCookie as f, APIError as ft, safeJSONParse as g, getCurrentAuthContext as gt, setAccountCookie as h, BASE_ERROR_CODES as ht, generateId as i, base64 as it, jwtVerify as j, decodeProtectedHeader as k, isValidIP as l, addRoute as lt, setSessionCookie as m, APIError$1 as mt, apiKey as n, wildcardMatch as nt, getSessionFromCtx as o, createAuthEndpoint as ot, expireCookie as p, BetterAuthError as pt, encode as q, createAccessControl as r, createHash as rt, sensitiveSessionMiddleware as s, createAuthMiddleware as st, apiKeyClient as t, isDevelopment as tt, normalizeIP as u, createRouter as ut, sec as v, zod_default as vt, makeSignature as w, parseUserOutput as x, number as xt, getDate$1 as y, external_exports as yt, JOSENotSupported as z };
