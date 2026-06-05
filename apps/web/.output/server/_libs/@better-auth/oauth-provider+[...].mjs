import { la as NEVER } from "../@ai-sdk/provider-utils+[...].mjs";
import { $n as unknown, Bn as string, Dn as object, En as number, Fn as record, Mt as boolean, Ot as array, Qn as union, Sn as never, er as url, pn as literal, xt as _enum } from "../@ai-sdk/react+[...].mjs";
import { $ as logger, A as SignJWT, D as constantTimeEqual, E as symmetricEncrypt, F as exportJWK, G as JWTInvalid, I as importJWK, J as decoder, K as decode, L as isObject, P as compactVerify, T as symmetricDecrypt, Y as generateRandomString, _ as parseSetCookieHeader, at as base64Url, b as mergeSchema, c as sessionMiddleware, ct as isAPIError, d as defineRequestState, ft as APIError$1, g as safeJSONParse, it as base64, mt as APIError, o as getSessionFromCtx, ot as createAuthEndpoint, pt as BetterAuthError, rt as createHash, st as createAuthMiddleware, v as sec, w as makeSignature, xt as number$1, z as JOSENotSupported } from "./api-key+[...].mjs";
import { d as generateCodeChallenge, f as isLoopbackHost, g as createLocalJWKSet, i as verifyJwsAccessToken, n as getJwks, p as isLoopbackIP, r as verifyAccessToken, t as isBrowserFetchRequest } from "./core+[...].mjs";
import { o as getOAuthState } from "./infra+[...].mjs";
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/decode_jwt.js
function decodeJwt(jwt) {
	if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
	const { 1: payload, length } = jwt.split(".");
	if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
	if (length !== 3) throw new JWTInvalid("Invalid JWT");
	if (!payload) throw new JWTInvalid("JWTs must contain a payload");
	let decoded;
	try {
		decoded = decode(payload);
	} catch {
		throw new JWTInvalid("Failed to base64url decode the payload");
	}
	let result;
	try {
		result = JSON.parse(decoder.decode(decoded));
	} catch {
		throw new JWTInvalid("Failed to parse the decoded payload as JSON");
	}
	if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/key/generate_key_pair.js
function getModulusLengthOption(options) {
	const modulusLength = options?.modulusLength ?? 2048;
	if (typeof modulusLength !== "number" || modulusLength < 2048) throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
	return modulusLength;
}
async function generateKeyPair(alg, options) {
	let algorithm;
	let keyUsages;
	switch (alg) {
		case "PS256":
		case "PS384":
		case "PS512":
			algorithm = {
				name: "RSA-PSS",
				hash: `SHA-${alg.slice(-3)}`,
				publicExponent: Uint8Array.of(1, 0, 1),
				modulusLength: getModulusLengthOption(options)
			};
			keyUsages = ["sign", "verify"];
			break;
		case "RS256":
		case "RS384":
		case "RS512":
			algorithm = {
				name: "RSASSA-PKCS1-v1_5",
				hash: `SHA-${alg.slice(-3)}`,
				publicExponent: Uint8Array.of(1, 0, 1),
				modulusLength: getModulusLengthOption(options)
			};
			keyUsages = ["sign", "verify"];
			break;
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			algorithm = {
				name: "RSA-OAEP",
				hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
				publicExponent: Uint8Array.of(1, 0, 1),
				modulusLength: getModulusLengthOption(options)
			};
			keyUsages = [
				"decrypt",
				"unwrapKey",
				"encrypt",
				"wrapKey"
			];
			break;
		case "ES256":
			algorithm = {
				name: "ECDSA",
				namedCurve: "P-256"
			};
			keyUsages = ["sign", "verify"];
			break;
		case "ES384":
			algorithm = {
				name: "ECDSA",
				namedCurve: "P-384"
			};
			keyUsages = ["sign", "verify"];
			break;
		case "ES512":
			algorithm = {
				name: "ECDSA",
				namedCurve: "P-521"
			};
			keyUsages = ["sign", "verify"];
			break;
		case "Ed25519":
		case "EdDSA":
			keyUsages = ["sign", "verify"];
			algorithm = { name: "Ed25519" };
			break;
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87":
			keyUsages = ["sign", "verify"];
			algorithm = { name: alg };
			break;
		case "ECDH-ES":
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			keyUsages = ["deriveBits"];
			const crv = options?.crv ?? "P-256";
			switch (crv) {
				case "P-256":
				case "P-384":
				case "P-521":
					algorithm = {
						name: "ECDH",
						namedCurve: crv
					};
					break;
				case "X25519":
					algorithm = { name: "X25519" };
					break;
				default: throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, and X25519");
			}
			break;
		}
		default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	}
	return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+oauth-provider_dc3f28df821086dba4b8c92e12f62485/node_modules/@better-auth/oauth-provider/dist/utils-LAthGy-x.mjs
/**
* The following handles all MCP errors and API errors
*
* @internal
*/
function handleMcpErrors(error, resource, opts) {
	if (isAPIError(error) && error.status === "UNAUTHORIZED") {
		const wwwAuthenticateValue = (Array.isArray(resource) ? resource : [resource]).map((v) => {
			let audiencePath;
			if (URL.canParse?.(v)) {
				const url = new URL(v);
				audiencePath = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
				return `Bearer resource_metadata="${url.origin}/.well-known/oauth-protected-resource${audiencePath}"`;
			} else {
				const resourceMetadata = opts?.resourceMetadataMappings?.[v];
				if (!resourceMetadata) throw new APIError("INTERNAL_SERVER_ERROR", { message: `missing resource_metadata mapping for ${v}` });
				return `Bearer resource_metadata=${resourceMetadata}`;
			}
		}).join(", ");
		throw new APIError("UNAUTHORIZED", { message: error.message }, { "WWW-Authenticate": wwwAuthenticateValue });
	} else if (error instanceof Error) throw error;
	else throw new Error(error);
}
var TTLCache = class {
	cache = /* @__PURE__ */ new Map();
	constructor() {}
	set(key, value) {
		this.cache.set(key, value);
	}
	get(key) {
		const entry = this.cache.get(key);
		if (!entry) return void 0;
		if (entry.expiresAt && entry.expiresAt < /* @__PURE__ */ new Date()) {
			this.cache.delete(key);
			return;
		}
		return entry;
	}
};
/**
* Gets the oAuth Provider Plugin
* @internal
*/
var getOAuthProviderPlugin = (ctx) => {
	return ctx.getPlugin("oauth-provider");
};
/**
* Gets the JWT Plugin
* @internal
*/
var getJwtPlugin = (ctx) => {
	const plugin = ctx.getPlugin("jwt");
	if (!plugin) throw new BetterAuthError("jwt_config");
	return plugin;
};
/**
* Normalizes timestamp-like values returned by adapters.
*
* Accepts Date instances, epoch milliseconds as numbers, and strings that are
* either ISO dates or numeric millisecond values such as "1774295570569.0".
*/
function normalizeTimestampValue(value) {
	if (value == null) return;
	if (value instanceof Date) return Number.isFinite(value.getTime()) ? value : void 0;
	if (typeof value === "number") {
		if (!Number.isFinite(value)) return;
		const parsed = new Date(value);
		return Number.isFinite(parsed.getTime()) ? parsed : void 0;
	}
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed.length) return;
		const numeric = Number(trimmed);
		if (Number.isFinite(numeric)) {
			const parsed = new Date(numeric);
			return Number.isFinite(parsed.getTime()) ? parsed : void 0;
		}
		const parsed = new Date(trimmed);
		return Number.isFinite(parsed.getTime()) ? parsed : void 0;
	}
}
/**
* Resolves a session auth time from common adapter return shapes.
*/
function resolveSessionAuthTime(value) {
	if (value instanceof Date) return normalizeTimestampValue(value);
	if (!value || typeof value !== "object") return normalizeTimestampValue(value);
	const direct = normalizeTimestampValue(value.createdAt) ?? normalizeTimestampValue(value.created_at);
	if (direct) return direct;
	const nested = value.session;
	if (!nested || typeof nested !== "object") return;
	return normalizeTimestampValue(nested.createdAt) ?? normalizeTimestampValue(nested.created_at);
}
var cachedTrustedClients = new TTLCache();
async function verifyOAuthQueryParams(oauth_query, secret) {
	const queryParams = new URLSearchParams(oauth_query);
	const sig = queryParams.get("sig");
	const exp = Number(queryParams.get("exp"));
	queryParams.delete("sig");
	const verifySig = await makeSignature(queryParams.toString(), secret);
	return !!sig && constantTimeEqual(sig, verifySig) && /* @__PURE__ */ new Date(exp * 1e3) >= /* @__PURE__ */ new Date();
}
/**
* Get a client by ID, checking trusted clients first, then database
*/
async function getClient(ctx, options, clientId) {
	const trustedClient = cachedTrustedClients.get(clientId);
	if (trustedClient) return Object.assign({}, trustedClient);
	const dbClient = await ctx.context.adapter.findOne({
		model: options.schema?.oauthClient?.modelName ?? "oauthClient",
		where: [{
			field: "clientId",
			value: clientId
		}]
	});
	if (dbClient && options.cachedTrustedClients?.has(clientId)) cachedTrustedClients.set(clientId, Object.assign({}, dbClient));
	return dbClient;
}
/**
* Default client secret hasher using SHA-256
*
* @internal
*/
var defaultHasher = async (value) => {
	const hash = await createHash("SHA-256").digest(new TextEncoder().encode(value));
	return base64Url.encode(new Uint8Array(hash), { padding: false });
};
/**
* Decrypts a storedClientSecret for signing
*
* @internal
*/
async function decryptStoredClientSecret(ctx, storageMethod, storedClientSecret) {
	if (storageMethod === "encrypted") return await symmetricDecrypt({
		key: ctx.context.secretConfig,
		data: storedClientSecret
	});
	else if (typeof storageMethod === "object" && "decrypt" in storageMethod) return await storageMethod.decrypt(storedClientSecret);
	throw new BetterAuthError(`Unsupported decryption storageMethod type '${storageMethod}'`);
}
/**
* Verify stored client secret against provided client secret
*
* @internal
*/
async function verifyStoredClientSecret(ctx, opts, storedClientSecret, clientSecret) {
	const storageMethod = opts.storeClientSecret ?? (opts.disableJwtPlugin ? "encrypted" : "hashed");
	if (clientSecret && opts.prefix?.clientSecret) if (clientSecret.startsWith(opts.prefix?.clientSecret)) clientSecret = clientSecret.replace(opts.prefix.clientSecret, "");
	else throw new APIError("UNAUTHORIZED", {
		error_description: "invalid client_secret",
		error: "invalid_client"
	});
	if (storageMethod === "hashed") {
		const hashedClientSecret = clientSecret ? await defaultHasher(clientSecret) : void 0;
		return !!hashedClientSecret && constantTimeEqual(hashedClientSecret, storedClientSecret);
	} else if (typeof storageMethod === "object" && "hash" in storageMethod) if (storageMethod.verify) return !!clientSecret && await storageMethod.verify(clientSecret, storedClientSecret);
	else {
		const hashedClientSecret = clientSecret ? await storageMethod.hash(clientSecret) : void 0;
		return !!hashedClientSecret && constantTimeEqual(hashedClientSecret, storedClientSecret);
	}
	else if (storageMethod === "encrypted") try {
		const decryptedClientSecret = await decryptStoredClientSecret(ctx, storageMethod, storedClientSecret);
		return !!clientSecret && constantTimeEqual(decryptedClientSecret, clientSecret);
	} catch {
		return false;
	}
	else if (typeof storageMethod === "object" && "decrypt" in storageMethod) {
		const decryptedClientSecret = await decryptStoredClientSecret(ctx, storageMethod, storedClientSecret);
		return !!clientSecret && constantTimeEqual(decryptedClientSecret, clientSecret);
	}
	throw new BetterAuthError(`Unsupported verify storageMethod type '${storageMethod}'`);
}
/**
* Store client secret according to the configured storage method
*
* @internal
*/
async function storeClientSecret(ctx, opts, clientSecret) {
	const storageMethod = opts.storeClientSecret ?? (opts.disableJwtPlugin ? "encrypted" : "hashed");
	if (storageMethod === "encrypted") return await symmetricEncrypt({
		key: ctx.context.secretConfig,
		data: clientSecret
	});
	else if (storageMethod === "hashed") return await defaultHasher(clientSecret);
	else if (typeof storageMethod === "object" && "hash" in storageMethod) return await storageMethod.hash(clientSecret);
	else if (typeof storageMethod === "object" && "encrypt" in storageMethod) return await storageMethod.encrypt(clientSecret);
	throw new BetterAuthError(`Unsupported storeClientSecret type '${storageMethod}'`);
}
/**
* Stores a token value (ie opaque tokens, refresh tokens, transaction tokens, verification codes)
* on the database in a secure hashed format.
*
* @internal
*/
async function storeToken(storageMethod = "hashed", token, type) {
	if (storageMethod === "hashed") return await defaultHasher(token);
	else if (typeof storageMethod === "object" && "hash" in storageMethod) return await storageMethod.hash(token, type);
	throw new BetterAuthError(`storeToken: unsupported storageMethod type '${storageMethod}'`);
}
/**
* Gets a hashed token value to find on the database.
*
* @internal
*/
async function getStoredToken(storageMethod = "hashed", token, type) {
	if (storageMethod === "hashed") return await defaultHasher(token);
	else if (typeof storageMethod === "object" && "hash" in storageMethod) return await storageMethod.hash(token, type);
	throw new BetterAuthError(`getStoredToken: unsupported storageMethod type '${storageMethod}'`);
}
/**
* Converts a BASIC authorization header
* into its client_id and client_secret representation
*
* @internal
*/
function basicToClientCredentials(authorization) {
	if (authorization.startsWith("Basic ")) {
		const encoded = authorization.replace("Basic ", "");
		const decoded = new TextDecoder().decode(base64.decode(encoded));
		if (!decoded.includes(":")) throw new APIError("BAD_REQUEST", {
			error_description: "invalid authorization header format",
			error: "invalid_client"
		});
		const [id, secret] = decoded.split(":", 2);
		if (!id || !secret) throw new APIError("BAD_REQUEST", {
			error_description: "invalid authorization header format",
			error: "invalid_client"
		});
		return {
			client_id: id,
			client_secret: secret
		};
	}
}
/**
* Validates client credentials failing on mismatches
* and incorrectly provided information
*
* @internal
*/
async function validateClientCredentials(ctx, options, clientId, clientSecret, scopes) {
	const client = await getClient(ctx, options, clientId);
	if (!client) throw new APIError("BAD_REQUEST", {
		error_description: "missing client",
		error: "invalid_client"
	});
	if (client.disabled) throw new APIError("BAD_REQUEST", {
		error_description: "client is disabled",
		error: "invalid_client"
	});
	if (!client.public && !clientSecret) throw new APIError("BAD_REQUEST", {
		error_description: "client secret must be provided",
		error: "invalid_client"
	});
	if (clientSecret && !client.clientSecret) throw new APIError("BAD_REQUEST", {
		error_description: "public client, client secret should not be received",
		error: "invalid_client"
	});
	if (clientSecret && !await verifyStoredClientSecret(ctx, options, client.clientSecret, clientSecret)) throw new APIError("UNAUTHORIZED", {
		error_description: "invalid client_secret",
		error: "invalid_client"
	});
	if (scopes && client.scopes) {
		const validScopes = new Set(client.scopes);
		for (const sc of scopes) if (!validScopes.has(sc)) throw new APIError("BAD_REQUEST", {
			error_description: `client does not allow scope ${sc}`,
			error: "invalid_scope"
		});
	}
	return client;
}
/**
* Parse client metadata that may be stored as JSON string or already parsed object.
* Handles database adapters that auto-parse JSON columns.
*
* @internal
*/
function parseClientMetadata(metadata) {
	if (!metadata) return void 0;
	return typeof metadata === "string" ? JSON.parse(metadata) : metadata;
}
/**
* Parse space-separated prompt string into a set of prompts
*
* @param prompt
*/
function parsePrompt(prompt) {
	const prompts = prompt.split(" ").map((p) => p.trim());
	const set = /* @__PURE__ */ new Set();
	for (const p of prompts) if (p === "login" || p === "consent" || p === "create" || p === "select_account" || p === "none") set.add(p);
	return new Set(set);
}
/**
* Extracts the sector identifier (hostname) from a client's first redirect URI.
*
* @see https://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg
* @internal
*/
function getSectorIdentifier(client) {
	const uri = client.redirectUris?.[0];
	if (!uri) throw new BetterAuthError("Client has no redirect URIs for sector identifier");
	return new URL(uri).host;
}
/**
* Computes a pairwise subject identifier using HMAC-SHA256.
*
* @see https://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg
* @internal
*/
async function computePairwiseSub(userId, client, secret) {
	return makeSignature(`${getSectorIdentifier(client)}.${userId}`, secret);
}
/**
* Returns the appropriate subject identifier for a user+client pair.
* Uses pairwise when the client opts in and the server has a secret configured.
*
* @internal
*/
async function resolveSubjectIdentifier(userId, client, opts) {
	if (client.subjectType === "pairwise" && opts.pairwiseSecret) return computePairwiseSub(userId, client, opts.pairwiseSecret);
	return userId;
}
/**
* Converts URLSearchParams to a plain object, preserving
* multi-valued keys as arrays instead of discarding duplicates.
*/
function searchParamsToQuery(params) {
	const result = Object.create(null);
	for (const key of new Set(params.keys())) {
		const values = params.getAll(key);
		result[key] = values.length === 1 ? values[0] : values;
	}
	return result;
}
var signedQueryIssuedAtParam = "ba_iat";
var postLoginClearedParam = "ba_pl";
function getSignedQueryIssuedAt(oauthQuery) {
	const raw = new URLSearchParams(oauthQuery).get(signedQueryIssuedAtParam);
	if (!raw) return null;
	const issuedAt = Number(raw);
	if (!Number.isFinite(issuedAt) || issuedAt <= 0) return null;
	return new Date(issuedAt);
}
function removePromptFromQuery(query, prompt) {
	const nextQuery = new URLSearchParams(query);
	const prompts = nextQuery.get("prompt")?.split(" ");
	const foundPrompt = prompts?.findIndex((v) => v === prompt) ?? -1;
	if (foundPrompt >= 0) {
		prompts?.splice(foundPrompt, 1);
		prompts?.length ? nextQuery.set("prompt", prompts.join(" ")) : nextQuery.delete("prompt");
	}
	return nextQuery;
}
var PKCERequirementErrors = /* @__PURE__ */ function(PKCERequirementErrors) {
	PKCERequirementErrors["PUBLIC_CLIENT"] = "pkce is required for public clients";
	PKCERequirementErrors["OFFLINE_ACCESS_SCOPE"] = "pkce is required when requesting offline_access scope";
	PKCERequirementErrors["CLIENT_REQUIRE_PKCE"] = "pkce is required for this client";
	return PKCERequirementErrors;
}(PKCERequirementErrors || {});
/**
* Determines if PKCE is required for a given client and scope.
*
* PKCE is always required for:
* 1. Public clients (cannot securely store client_secret)
* 2. Requests with offline_access scope (refresh token security)
*
* For confidential clients without offline_access:
* - Uses client.requirePKCE if set (defaults to true)
*
* Returns false if PKCE is not required, or the reason it is required.
*
* @internal
*/
function isPKCERequired(client, requestedScopes) {
	if (client.tokenEndpointAuthMethod === "none" || client.type === "native" || client.type === "user-agent-based" || client.public === true) return PKCERequirementErrors.PUBLIC_CLIENT;
	if (requestedScopes?.includes("offline_access")) return PKCERequirementErrors.OFFLINE_ACCESS_SCOPE;
	if (client.requirePKCE ?? true) return PKCERequirementErrors.CLIENT_REQUIRE_PKCE;
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+oauth-provider_dc3f28df821086dba4b8c92e12f62485/node_modules/@better-auth/oauth-provider/dist/version-CRjaDWWg.mjs
var PACKAGE_VERSION = "1.6.11";
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/jwt/adapter.mjs
var getJwksAdapter = (adapter, options) => {
	return {
		getAllKeys: async (ctx) => {
			if (options?.adapter?.getJwks) return await options.adapter.getJwks(ctx);
			return await adapter.findMany({ model: "jwks" });
		},
		getLatestKey: async (ctx) => {
			if (options?.adapter?.getJwks) return (await options.adapter.getJwks(ctx))?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
			return (await adapter.findMany({ model: "jwks" }))?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
		},
		createJwk: async (ctx, webKey) => {
			if (options?.adapter?.createJwk) return await options.adapter.createJwk(webKey, ctx);
			return await adapter.create({
				model: "jwks",
				data: {
					...webKey,
					createdAt: /* @__PURE__ */ new Date()
				}
			});
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/jwt/utils.mjs
/**
* Converts an expirationTime to ISO seconds expiration time (the format of JWT exp)
*
* See https://github.com/panva/jose/blob/main/src/lib/jwt_claims_set.ts#L245
*
* @param expirationTime - see options.jwt.expirationTime
* @param iat - the iat time to consolidate on
* @returns
*/
function toExpJWT(expirationTime, iat) {
	if (typeof expirationTime === "number") return expirationTime;
	else if (expirationTime instanceof Date) return Math.floor(expirationTime.getTime() / 1e3);
	else return iat + sec(expirationTime);
}
async function generateExportedKeyPair(options) {
	const { alg, ...cfg } = options?.jwks?.keyPairConfig ?? {
		alg: "EdDSA",
		crv: "Ed25519"
	};
	const { publicKey, privateKey } = await generateKeyPair(alg, {
		...cfg,
		extractable: true
	});
	return {
		publicWebKey: await exportJWK(publicKey),
		privateWebKey: await exportJWK(privateKey),
		alg,
		cfg
	};
}
/**
* Creates a Jwk on the database
*
* @param ctx
* @param options
* @returns
*/
async function createJwk(ctx, options) {
	const { publicWebKey, privateWebKey, alg, cfg } = await generateExportedKeyPair(options);
	const stringifiedPrivateWebKey = JSON.stringify(privateWebKey);
	const privateKeyEncryptionEnabled = !options?.jwks?.disablePrivateKeyEncryption;
	const jwk = {
		alg,
		...cfg && "crv" in cfg ? { crv: cfg.crv } : {},
		publicKey: JSON.stringify(publicWebKey),
		privateKey: privateKeyEncryptionEnabled ? JSON.stringify(await symmetricEncrypt({
			key: ctx.context.secretConfig,
			data: stringifiedPrivateWebKey
		})) : stringifiedPrivateWebKey,
		createdAt: /* @__PURE__ */ new Date(),
		...options?.jwks?.rotationInterval ? { expiresAt: new Date(Date.now() + options.jwks.rotationInterval * 1e3) } : {}
	};
	return await getJwksAdapter(ctx.context.adapter, options).createJwk(ctx, jwk);
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/jwt/sign.mjs
async function signJWT(ctx, config) {
	const { options } = config;
	const payload = config.payload;
	const nowSeconds = Math.floor(Date.now() / 1e3);
	const iat = payload.iat;
	let exp = payload.exp;
	const defaultExp = toExpJWT(options?.jwt?.expirationTime ?? "15m", iat ?? nowSeconds);
	exp = exp ?? defaultExp;
	const nbf = payload.nbf;
	const baseURLOrigin = typeof ctx.context.options.baseURL === "string" ? ctx.context.options.baseURL : "";
	const iss = payload.iss;
	const defaultIss = options?.jwt?.issuer ?? baseURLOrigin;
	const aud = payload.aud;
	const defaultAud = options?.jwt?.audience ?? baseURLOrigin;
	if (options?.jwt?.sign) {
		const jwtPayload = {
			...payload,
			iat,
			exp,
			nbf,
			iss: iss ?? defaultIss,
			aud: aud ?? defaultAud
		};
		return options.jwt.sign(jwtPayload);
	}
	let key = await getJwksAdapter(ctx.context.adapter, options).getLatestKey(ctx);
	if (!key || key.expiresAt && key.expiresAt < /* @__PURE__ */ new Date()) key = await createJwk(ctx, options);
	const privateWebKey = !options?.jwks?.disablePrivateKeyEncryption ? await symmetricDecrypt({
		key: ctx.context.secretConfig,
		data: JSON.parse(key.privateKey)
	}).catch(() => {
		throw new BetterAuthError("Failed to decrypt private key. Make sure the secret currently in use is the same as the one used to encrypt the private key. If you are using a different secret, either clean up your JWKS or disable private key encryption.");
	}) : key.privateKey;
	const alg = key.alg ?? options?.jwks?.keyPairConfig?.alg ?? "EdDSA";
	const privateKey = await importJWK(JSON.parse(privateWebKey), alg);
	const jwt = new SignJWT(payload).setProtectedHeader({
		alg,
		kid: key.id
	}).setExpirationTime(exp).setIssuer(iss ?? defaultIss).setAudience(aud ?? defaultAud);
	if (iat) jwt.setIssuedAt(iat);
	if (payload.sub) jwt.setSubject(payload.sub);
	if (payload.nbf) jwt.setNotBefore(payload.nbf);
	if (payload.jti) jwt.setJti(payload.jti);
	return await jwt.sign(privateKey);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+oauth-provider_dc3f28df821086dba4b8c92e12f62485/node_modules/@better-auth/oauth-provider/dist/index.mjs
async function consentEndpoint(ctx, opts) {
	const oauthRequest = await oAuthState.get();
	const _query = oauthRequest?.query;
	if (!_query) throw new APIError$1("BAD_REQUEST", {
		error_description: "missing oauth query",
		error: "invalid_request"
	});
	const query = new URLSearchParams(_query);
	const originalRequestedScopes = query.get("scope")?.split(" ") ?? [];
	const clientId = query.get("client_id");
	if (!clientId) throw new APIError$1("BAD_REQUEST", {
		error_description: "client_id is required",
		error: "invalid_client"
	});
	const requestedScopes = ctx.body.scope?.split(" ");
	if (requestedScopes) {
		if (!requestedScopes.every((sc) => originalRequestedScopes?.includes(sc))) throw new APIError$1("BAD_REQUEST", {
			error_description: "Scope not originally requested",
			error: "invalid_request"
		});
	}
	if (!(ctx.body.accept === true)) return {
		redirect: true,
		url: formatErrorURL(query.get("redirect_uri") ?? "", "access_denied", "User denied access", query.get("state") ?? void 0, getIssuer(ctx, opts))
	};
	const session = await getSessionFromCtx(ctx);
	const hasLoginPrompt = parsePrompt(query.get("prompt") ?? "").has("login");
	const hasSatisfiedLoginPrompt = hasLoginPrompt && sessionSatisfiesLoginPrompt(session?.session.createdAt, oauthRequest?.signedQueryIssuedAt);
	if (hasLoginPrompt && !hasSatisfiedLoginPrompt) {
		ctx?.headers?.set("accept", "application/json");
		ctx.query = searchParamsToQuery(query);
		const { url } = await authorizeEndpoint(ctx, opts);
		return {
			redirect: true,
			url
		};
	}
	const referenceId = await opts.postLogin?.consentReferenceId?.({
		user: session?.user,
		session: session?.session,
		scopes: requestedScopes ?? originalRequestedScopes
	});
	const foundConsent = await ctx.context.adapter.findOne({
		model: "oauthConsent",
		where: [
			{
				field: "clientId",
				value: clientId
			},
			{
				field: "userId",
				value: session?.user.id
			},
			...referenceId ? [{
				field: "referenceId",
				value: referenceId
			}] : []
		]
	});
	const iat = Math.floor(Date.now() / 1e3);
	const consent = {
		clientId,
		userId: session?.user.id,
		scopes: requestedScopes ?? originalRequestedScopes,
		createdAt: /* @__PURE__ */ new Date(iat * 1e3),
		updatedAt: /* @__PURE__ */ new Date(iat * 1e3),
		referenceId
	};
	foundConsent?.id ? await ctx.context.adapter.update({
		model: "oauthConsent",
		where: [{
			field: "id",
			value: foundConsent.id
		}],
		update: {
			scopes: consent.scopes,
			updatedAt: /* @__PURE__ */ new Date(iat * 1e3)
		}
	}) : await ctx.context.adapter.create({
		model: "oauthConsent",
		data: {
			...consent,
			scopes: consent.scopes
		}
	});
	if (requestedScopes) query.set("scope", consent.scopes.join(" "));
	ctx?.headers?.set("accept", "application/json");
	let authorizationQuery = removePromptFromQuery(query, "consent");
	if (hasSatisfiedLoginPrompt) authorizationQuery = removePromptFromQuery(authorizationQuery, "login");
	ctx.query = searchParamsToQuery(authorizationQuery);
	const { url } = await authorizeEndpoint(ctx, opts, { postLogin: oauthRequest?.postLoginClearedForSession !== void 0 && oauthRequest.postLoginClearedForSession === session?.session.id });
	return {
		redirect: true,
		url
	};
}
function sessionSatisfiesLoginPrompt(sessionCreatedAt, signedQueryIssuedAt) {
	if (!signedQueryIssuedAt) return false;
	const normalized = normalizeTimestampValue(sessionCreatedAt);
	if (!normalized) return false;
	return normalized.getTime() >= signedQueryIssuedAt.getTime();
}
async function continueEndpoint(ctx, opts) {
	if (ctx.body.selected === true) return await selected(ctx, opts);
	else if (ctx.body.created === true) return await created(ctx, opts);
	else if (ctx.body.postLogin === true) return await postLogin(ctx, opts);
	else throw new APIError$1("BAD_REQUEST", {
		error_description: "Missing parameters",
		error: "invalid_request"
	});
}
async function selected(ctx, opts) {
	const _query = (await oAuthState.get())?.query;
	if (!_query) throw new APIError$1("BAD_REQUEST", {
		error_description: "missing oauth query",
		error: "invalid_request"
	});
	ctx.headers?.set("accept", "application/json");
	ctx.query = searchParamsToQuery(removePromptFromQuery(new URLSearchParams(_query), "select_account"));
	const { url } = await authorizeEndpoint(ctx, opts);
	return {
		redirect: true,
		url
	};
}
async function created(ctx, opts) {
	const _query = (await oAuthState.get())?.query;
	if (!_query) throw new APIError$1("BAD_REQUEST", {
		error_description: "missing oauth query",
		error: "invalid_request"
	});
	const query = new URLSearchParams(_query);
	ctx.headers?.set("accept", "application/json");
	ctx.query = searchParamsToQuery(removePromptFromQuery(query, "create"));
	const { url } = await authorizeEndpoint(ctx, opts);
	return {
		redirect: true,
		url
	};
}
async function postLogin(ctx, opts) {
	const _query = (await oAuthState.get())?.query;
	if (!_query) throw new APIError$1("BAD_REQUEST", {
		error_description: "missing oauth query",
		error: "invalid_request"
	});
	const query = new URLSearchParams(_query);
	ctx.headers?.set("accept", "application/json");
	ctx.query = searchParamsToQuery(query);
	const { url } = await authorizeEndpoint(ctx, opts, { postLogin: true });
	return {
		redirect: true,
		url
	};
}
var DANGEROUS_SCHEMES = [
	"javascript:",
	"data:",
	"vbscript:"
];
/**
* Runtime schema for OAuthAuthorizationQuery.
* Uses passthrough to tolerate fields added by future extensions (PAR, FPA, etc.)
*/
var oauthAuthorizationQuerySchema = object({
	response_type: literal("code").optional(),
	request_uri: string().optional(),
	redirect_uri: string(),
	scope: string().optional(),
	state: string().optional(),
	client_id: string(),
	prompt: string().optional(),
	display: string().optional(),
	ui_locales: string().optional(),
	max_age: number$1().optional(),
	acr_values: string().optional(),
	login_hint: string().optional(),
	id_token_hint: string().optional(),
	code_challenge: string().optional(),
	code_challenge_method: literal("S256").optional(),
	nonce: string().optional()
}).passthrough();
/**
* Runtime schema for the authorization code verification value.
* Validates structure on deserialization from the JSON blob stored in the DB.
* Uses passthrough so future fields (e.g. from authorization challenge) don't break parsing.
*/
var verificationValueSchema = object({
	type: literal("authorization_code"),
	query: oauthAuthorizationQuerySchema,
	sessionId: string(),
	userId: string(),
	referenceId: string().optional(),
	authTime: number().optional()
}).passthrough();
/**
* Reusable URL validation for OAuth redirect URIs.
* - Blocks dangerous schemes (javascript:, data:, vbscript:)
* - For http/https: requires HTTPS (HTTP allowed only for loopback hosts: 127.0.0.0/8, [::1], *.localhost per RFC 6761)
* - Allows custom schemes for mobile apps (e.g., myapp://callback)
*/
var SafeUrlSchema = url().superRefine((val, ctx) => {
	if (!URL.canParse(val)) {
		ctx.addIssue({
			code: "custom",
			message: "URL must be parseable",
			fatal: true
		});
		return NEVER;
	}
	const u = new URL(val);
	if (DANGEROUS_SCHEMES.includes(u.protocol)) {
		ctx.addIssue({
			code: "custom",
			message: "URL cannot use javascript:, data:, or vbscript: scheme"
		});
		return;
	}
	if (u.protocol === "http:" && !isLoopbackHost(u.host)) ctx.addIssue({
		code: "custom",
		message: "Redirect URI must use HTTPS (HTTP allowed only for loopback hosts)"
	});
});
/**
* Provides shared /userinfo and id_token claims functionality
*
* @see https://openid.net/specs/openid-connect-core-1_0.html#NormalClaims
*/
function userNormalClaims(user, scopes) {
	const name = user.name.split(" ").filter((v) => v !== "");
	const profile = {
		name: user.name ?? void 0,
		picture: user.image ?? void 0,
		given_name: name.length > 1 ? name.slice(0, -1).join(" ") : void 0,
		family_name: name.length > 1 ? name.at(-1) : void 0
	};
	const email = {
		email: user.email ?? void 0,
		email_verified: user.emailVerified ?? false
	};
	return {
		sub: user.id ?? void 0,
		...scopes.includes("profile") ? profile : {},
		...scopes.includes("email") ? email : {}
	};
}
/**
* Handles the /oauth2/userinfo endpoint
*/
async function userInfoEndpoint(ctx, opts) {
	const authorization = ctx.headers?.get("authorization");
	const token = typeof authorization === "string" && authorization?.startsWith("Bearer ") ? authorization?.replace("Bearer ", "") : authorization;
	if (!token?.length) throw new APIError$1("UNAUTHORIZED", {
		error_description: "authorization header not found",
		error: "invalid_request"
	});
	const jwt = await validateAccessToken(ctx, opts, token);
	const scopes = jwt.scope?.split(" ");
	if (!scopes?.includes("openid")) throw new APIError$1("BAD_REQUEST", {
		error_description: "Missing required scope",
		error: "invalid_scope"
	});
	if (!jwt.sub) throw new APIError$1("BAD_REQUEST", {
		error_description: "user not found",
		error: "invalid_request"
	});
	const user = await ctx.context.internalAdapter.findUserById(jwt.sub);
	if (!user) throw new APIError$1("BAD_REQUEST", {
		error_description: "user not found",
		error: "invalid_request"
	});
	const baseUserClaims = userNormalClaims(user, scopes ?? []);
	if (opts.pairwiseSecret) {
		const clientId = jwt.client_id ?? jwt.azp;
		if (clientId) {
			const client = await getClient(ctx, opts, clientId);
			if (client) baseUserClaims.sub = await resolveSubjectIdentifier(user.id, client, opts);
		}
	}
	const additionalInfoUserClaims = opts.customUserInfoClaims && scopes?.length ? await opts.customUserInfoClaims({
		user,
		scopes,
		jwt
	}) : {};
	return {
		...baseUserClaims,
		...additionalInfoUserClaims
	};
}
/**
* Handles the /oauth2/token endpoint by delegating
* the grant types
*/
async function tokenEndpoint(ctx, opts) {
	const grantType = ctx.body?.grant_type;
	if (opts.grantTypes && grantType && !opts.grantTypes.includes(grantType)) throw new APIError$1("BAD_REQUEST", {
		error_description: `unsupported grant_type ${grantType}`,
		error: "unsupported_grant_type"
	});
	switch (grantType) {
		case "authorization_code": return handleAuthorizationCodeGrant(ctx, opts);
		case "client_credentials": return handleClientCredentialsGrant(ctx, opts);
		case "refresh_token": return handleRefreshTokenGrant(ctx, opts);
		case void 0: throw new APIError$1("BAD_REQUEST", {
			error_description: "missing required grant_type",
			error: "unsupported_grant_type"
		});
		default: throw new APIError$1("BAD_REQUEST", {
			error_description: `unsupported grant_type ${grantType}`,
			error: "unsupported_grant_type"
		});
	}
}
async function createJwtAccessToken(ctx, opts, user, client, audience, scopes, referenceId, overrides) {
	const iat = overrides?.iat ?? Math.floor(Date.now() / 1e3);
	const exp = overrides?.exp ?? iat + (opts.accessTokenExpiresIn ?? 3600);
	const customClaims = opts.customAccessTokenClaims ? await opts.customAccessTokenClaims({
		user,
		scopes,
		resource: ctx.body.resource,
		referenceId,
		metadata: parseClientMetadata(client.metadata)
	}) : {};
	const jwtPluginOptions = getJwtPlugin(ctx.context).options;
	return signJWT(ctx, {
		options: jwtPluginOptions,
		payload: {
			...customClaims,
			sub: user?.id,
			aud: typeof audience === "string" ? audience : audience?.length === 1 ? audience.at(0) : audience,
			azp: client.clientId,
			scope: scopes.join(" "),
			sid: overrides?.sid,
			iss: jwtPluginOptions?.jwt?.issuer ?? ctx.context.baseURL,
			iat,
			exp
		}
	});
}
/**
* Creates a user id token in code_authorization with scope of 'openid'
* and hybrid/implicit (not yet implemented) flows
*/
async function createIdToken(ctx, opts, user, client, scopes, nonce, sessionId, authTime) {
	const iat = Math.floor(Date.now() / 1e3);
	const exp = iat + (opts.idTokenExpiresIn ?? 36e3);
	const userClaims = userNormalClaims(user, scopes);
	const resolvedSub = await resolveSubjectIdentifier(user.id, client, opts);
	const authTimeSec = authTime != null ? Math.floor(authTime.getTime() / 1e3) : void 0;
	const acr = "urn:mace:incommon:iap:bronze";
	const customClaims = opts.customIdTokenClaims ? await opts.customIdTokenClaims({
		user,
		scopes,
		metadata: parseClientMetadata(client.metadata)
	}) : {};
	const jwtPluginOptions = opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context).options;
	const payload = {
		...userClaims,
		auth_time: authTimeSec,
		acr,
		...customClaims,
		iss: jwtPluginOptions?.jwt?.issuer ?? ctx.context.baseURL,
		sub: resolvedSub,
		aud: client.clientId,
		nonce,
		iat,
		exp,
		sid: client.enableEndSession ? sessionId : void 0
	};
	if (opts.disableJwtPlugin && !client.clientSecret) return;
	return opts.disableJwtPlugin ? new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).sign(new TextEncoder().encode(await decryptStoredClientSecret(ctx, opts.storeClientSecret, client.clientSecret))) : signJWT(ctx, {
		options: jwtPluginOptions,
		payload
	});
}
/**
* Encodes a refresh token for a client
*/
async function encodeRefreshToken(opts, token, sessionId) {
	return (opts.prefix?.refreshToken ?? "") + (opts.formatRefreshToken?.encrypt ? opts.formatRefreshToken.encrypt(token, sessionId) : token);
}
/**
* Decodes a refresh token for a client
*
* @internal
*/
async function decodeRefreshToken(opts, token) {
	if (opts.prefix?.refreshToken) if (token.startsWith(opts.prefix.refreshToken)) token = token.replace(opts.prefix.refreshToken, "");
	else throw new APIError$1("BAD_REQUEST", {
		error_description: "refresh token not found",
		error: "invalid_token"
	});
	return opts.formatRefreshToken?.decrypt ? opts.formatRefreshToken?.decrypt(token) : { token };
}
async function createOpaqueAccessToken(ctx, opts, user, client, scopes, payload, referenceId, refreshId) {
	const iat = payload.iat ?? Math.floor(Date.now() / 1e3);
	const exp = payload?.exp ?? iat + (opts.accessTokenExpiresIn ?? 3600);
	const token = opts.generateOpaqueAccessToken ? await opts.generateOpaqueAccessToken() : generateRandomString(32, "A-Z", "a-z");
	await ctx.context.adapter.create({
		model: "oauthAccessToken",
		data: {
			token: await storeToken(opts.storeTokens, token, "access_token"),
			clientId: client.clientId,
			sessionId: payload?.sid,
			userId: user?.id,
			referenceId,
			refreshId,
			scopes,
			createdAt: /* @__PURE__ */ new Date(iat * 1e3),
			expiresAt: /* @__PURE__ */ new Date(exp * 1e3)
		}
	});
	return (opts.prefix?.opaqueAccessToken ?? "") + token;
}
/**
* Tear down the entire refresh-token family for a (client, user) pair, plus
* any access tokens that reference those refresh rows, per RFC 9700 §4.14.
* Access tokens are deleted first so the parent rows' foreign-key children
* do not block the refresh-row delete.
*
* TODO(invalidate-family-race): the two `deleteMany` calls are not atomic
* with respect to each other. Between them, a concurrent rotation in a
* different worker can `create` a fresh refresh row (and, immediately after,
* an access-token row referencing it) for the same (client, user) pair,
* leaving the family partially rebuilt and the new refresh row orphaned of
* any deletion. Closing this window requires the same transactional adapter
* contract tracked under FIXME(strict-family-invalidation) in
* `createRefreshToken`.
*
* @internal
*/
async function invalidateRefreshFamily(ctx, clientId, userId) {
	const refreshTokens = await ctx.context.adapter.findMany({
		model: "oauthRefreshToken",
		where: [{
			field: "clientId",
			value: clientId
		}, {
			field: "userId",
			value: userId
		}]
	});
	if (refreshTokens.length) await ctx.context.adapter.deleteMany({
		model: "oauthAccessToken",
		where: [{
			field: "refreshId",
			operator: "in",
			value: refreshTokens.map((r) => r.id)
		}]
	});
	await ctx.context.adapter.deleteMany({
		model: "oauthRefreshToken",
		where: [{
			field: "clientId",
			value: clientId
		}, {
			field: "userId",
			value: userId
		}]
	});
}
async function createRefreshToken(ctx, opts, user, referenceId, client, scopes, payload, originalRefresh, authTime) {
	const iat = payload.iat ?? Math.floor(Date.now() / 1e3);
	const exp = payload?.exp ?? iat + (opts.refreshTokenExpiresIn ?? 2592e3);
	const token = opts.generateRefreshToken ? await opts.generateRefreshToken() : generateRandomString(32, "A-Z", "a-z");
	const sessionId = payload?.sid;
	const newRow = {
		token: await storeToken(opts.storeTokens, token, "refresh_token"),
		clientId: client.clientId,
		sessionId,
		userId: user.id,
		referenceId,
		authTime,
		scopes,
		createdAt: /* @__PURE__ */ new Date(iat * 1e3),
		expiresAt: /* @__PURE__ */ new Date(exp * 1e3)
	};
	if (!originalRefresh?.id) return {
		id: (await ctx.context.adapter.create({
			model: "oauthRefreshToken",
			data: newRow
		})).id,
		token: await encodeRefreshToken(opts, token, sessionId)
	};
	if (!await ctx.context.adapter.update({
		model: "oauthRefreshToken",
		where: [{
			field: "id",
			value: originalRefresh.id
		}, {
			field: "revoked",
			operator: "eq",
			value: null
		}],
		update: { revoked: /* @__PURE__ */ new Date(iat * 1e3) }
	})) throw new APIError$1("BAD_REQUEST", {
		error_description: "invalid refresh token",
		error: "invalid_grant"
	});
	return {
		id: (await ctx.context.adapter.create({
			model: "oauthRefreshToken",
			data: newRow
		})).id,
		token: await encodeRefreshToken(opts, token, sessionId)
	};
}
/**
* Checks the resource parameter, if provided,
* and returns a valid audience based on the request
*/
async function checkResource(ctx, opts, scopes) {
	const resource = ctx.body.resource;
	const audience = typeof resource === "string" ? [resource] : resource ? [...resource] : void 0;
	if (audience) {
		if (scopes.includes("openid")) audience.push(`${ctx.context.baseURL}/oauth2/userinfo`);
		const validAudiences = new Set([...opts.validAudiences ?? [ctx.context.baseURL], scopes?.includes("openid") ? `${ctx.context.baseURL}/oauth2/userinfo` : void 0].flat().filter((v) => v?.length));
		for (const aud of audience) if (!validAudiences.has(aud)) throw new APIError$1("BAD_REQUEST", {
			error_description: "requested resource invalid",
			error: "invalid_request"
		});
	}
	return audience?.length === 1 ? audience.at(0) : audience;
}
async function createUserTokens(ctx, opts, params) {
	const { client, scopes, user, grantType, referenceId, sessionId, nonce, refreshToken: existingRefreshToken, authTime, verificationValue } = params;
	const iat = Math.floor(Date.now() / 1e3);
	const defaultExp = iat + (user ? opts.accessTokenExpiresIn ?? 3600 : opts.m2mAccessTokenExpiresIn ?? 3600);
	const exp = opts.scopeExpirations ? scopes.map((sc) => opts.scopeExpirations?.[sc] ? toExpJWT(opts.scopeExpirations[sc], iat) : defaultExp).reduce((prev, curr) => {
		return prev < curr ? prev : curr;
	}, defaultExp) : defaultExp;
	const audience = await checkResource(ctx, opts, scopes);
	const isRefreshToken = user && (existingRefreshToken?.scopes?.includes("offline_access") || scopes.includes("offline_access"));
	const isJwtAccessToken = audience && !opts.disableJwtPlugin;
	const isIdToken = user && scopes.includes("openid");
	const customFields = opts.customTokenResponseFields ? await opts.customTokenResponseFields({
		grantType,
		user,
		scopes,
		metadata: parseClientMetadata(client.metadata),
		verificationValue
	}) : void 0;
	const earlyRefreshToken = isRefreshToken && user && !isJwtAccessToken ? await createRefreshToken(ctx, opts, user, referenceId, client, scopes, {
		iat,
		exp: iat + (opts.refreshTokenExpiresIn ?? 2592e3),
		sid: sessionId
	}, existingRefreshToken, authTime) : void 0;
	const [accessToken, refreshToken, idToken] = await Promise.all([
		isJwtAccessToken ? createJwtAccessToken(ctx, opts, user, client, audience, scopes, referenceId, {
			iat,
			exp,
			sid: sessionId
		}) : createOpaqueAccessToken(ctx, opts, user, client, scopes, {
			iat,
			exp,
			sid: sessionId
		}, referenceId, earlyRefreshToken?.id),
		earlyRefreshToken ? earlyRefreshToken : isRefreshToken && user ? createRefreshToken(ctx, opts, user, referenceId, client, scopes, {
			iat,
			exp: iat + (opts.refreshTokenExpiresIn ?? 2592e3),
			sid: sessionId
		}, existingRefreshToken, authTime) : void 0,
		isIdToken && user ? createIdToken(ctx, opts, user, client, scopes, nonce, sessionId, authTime) : void 0
	]);
	return ctx.json({
		...customFields,
		access_token: accessToken,
		expires_in: exp - iat,
		expires_at: exp,
		token_type: "Bearer",
		refresh_token: refreshToken?.token,
		scope: scopes.join(" "),
		id_token: idToken
	}, { headers: {
		"Cache-Control": "no-store",
		Pragma: "no-cache"
	} });
}
/** Checks verification value */
async function checkVerificationValue(ctx, opts, code, client_id, redirect_uri) {
	const verification = await ctx.context.internalAdapter.consumeVerificationValue(await storeToken(opts.storeTokens, code, "authorization_code"));
	if (!verification) throw new APIError$1("UNAUTHORIZED", {
		error_description: "Invalid code",
		error: "invalid_grant"
	});
	if (!verification.expiresAt || verification.expiresAt < /* @__PURE__ */ new Date()) throw new APIError$1("UNAUTHORIZED", {
		error_description: "code expired",
		error: "invalid_grant"
	});
	let rawValue;
	try {
		rawValue = JSON.parse(verification.value);
	} catch {
		throw new APIError$1("UNAUTHORIZED", {
			error_description: "malformed verification value",
			error: "invalid_grant"
		});
	}
	const parsed = verificationValueSchema.safeParse(rawValue);
	if (!parsed.success) throw new APIError$1("UNAUTHORIZED", {
		error_description: "malformed verification value",
		error: "invalid_grant"
	});
	const verificationValue = parsed.data;
	if (verificationValue.query.client_id !== client_id) throw new APIError$1("UNAUTHORIZED", {
		error_description: "invalid client_id",
		error: "invalid_client"
	});
	if (verificationValue.query?.redirect_uri && verificationValue.query?.redirect_uri !== redirect_uri) throw new APIError$1("BAD_REQUEST", {
		error_description: "redirect_uri mismatch",
		error: "invalid_request"
	});
	return verificationValue;
}
/**
* Obtains new Session Jwt and Refresh Tokens using a code
*/
async function handleAuthorizationCodeGrant(ctx, opts) {
	let { client_id, client_secret, code, code_verifier, redirect_uri } = ctx.body;
	const authorization = ctx.request?.headers.get("authorization") || null;
	if (authorization?.startsWith("Basic ")) {
		const res = basicToClientCredentials(authorization);
		client_id = res?.client_id;
		client_secret = res?.client_secret;
	}
	if (!client_id) throw new APIError$1("BAD_REQUEST", {
		error_description: "client_id is required",
		error: "invalid_request"
	});
	if (!code) throw new APIError$1("BAD_REQUEST", {
		error_description: "code is required",
		error: "invalid_request"
	});
	if (!redirect_uri) throw new APIError$1("BAD_REQUEST", {
		error_description: "redirect_uri is required",
		error: "invalid_request"
	});
	const isAuthCodeWithSecret = client_id && client_secret;
	const isAuthCodeWithPkce = client_id && code && code_verifier;
	if (!isAuthCodeWithSecret && !isAuthCodeWithPkce) throw new APIError$1("BAD_REQUEST", {
		error_description: "Either code_verifier or client_secret is required",
		error: "invalid_request"
	});
	/** Get and check Verification Value */
	const verificationValue = await checkVerificationValue(ctx, opts, code, client_id, redirect_uri);
	const scopes = verificationValue.query.scope?.split(" ");
	if (!scopes) throw new APIError$1("INTERNAL_SERVER_ERROR", {
		error_description: "verification scope unset",
		error: "invalid_scope"
	});
	/** Verify Client */
	const client = await validateClientCredentials(ctx, opts, client_id, client_secret, scopes);
	if (isPKCERequired(client, (verificationValue.query?.scope)?.split(" ") || [])) {
		if (!isAuthCodeWithPkce) throw new APIError$1("BAD_REQUEST", {
			error_description: "PKCE is required for this client",
			error: "invalid_request"
		});
	} else if (!(isAuthCodeWithPkce || isAuthCodeWithSecret)) throw new APIError$1("BAD_REQUEST", {
		error_description: "Either PKCE (code_verifier) or client authentication (client_secret) is required",
		error: "invalid_request"
	});
	/** Check PKCE challenge if verifier is provided */
	const pkceUsedInAuth = !!verificationValue.query?.code_challenge;
	const pkceUsedInToken = !!code_verifier;
	if (pkceUsedInAuth || pkceUsedInToken) {
		if (pkceUsedInAuth && !pkceUsedInToken) throw new APIError$1("UNAUTHORIZED", {
			error_description: "code_verifier required because PKCE was used in authorization",
			error: "invalid_request"
		});
		if (!pkceUsedInAuth && pkceUsedInToken) throw new APIError$1("UNAUTHORIZED", {
			error_description: "code_verifier provided but PKCE was not used in authorization",
			error: "invalid_request"
		});
		if ((verificationValue.query?.code_challenge_method === "S256" ? await generateCodeChallenge(code_verifier) : void 0) !== verificationValue.query?.code_challenge) throw new APIError$1("UNAUTHORIZED", {
			error_description: "code verification failed",
			error: "invalid_request"
		});
	}
	/** Get user */
	if (!verificationValue.userId) throw new APIError$1("BAD_REQUEST", {
		error_description: "missing user, user may have been deleted",
		error: "invalid_user"
	});
	const user = await ctx.context.internalAdapter.findUserById(verificationValue.userId);
	if (!user) throw new APIError$1("BAD_REQUEST", {
		error_description: "missing user, user may have been deleted",
		error: "invalid_user"
	});
	const session = await ctx.context.adapter.findOne({
		model: "session",
		where: [{
			field: "id",
			value: verificationValue.sessionId
		}]
	});
	if (!session || session.expiresAt < /* @__PURE__ */ new Date()) throw new APIError$1("BAD_REQUEST", {
		error_description: "session no longer exists",
		error: "invalid_request"
	});
	const authTime = verificationValue.authTime != null ? normalizeTimestampValue(verificationValue.authTime) : resolveSessionAuthTime(session);
	return createUserTokens(ctx, opts, {
		client,
		scopes: verificationValue.query.scope?.split(" ") ?? [],
		user,
		grantType: "authorization_code",
		referenceId: verificationValue.referenceId,
		sessionId: session.id,
		nonce: verificationValue.query?.nonce,
		authTime,
		verificationValue
	});
}
/**
* Grant that allows direct access to an API using the application's credentials
* This grant is for M2M so the concept of a user id does not exist on the token.
*
* MUST follow https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
*/
async function handleClientCredentialsGrant(ctx, opts) {
	let { client_id, client_secret, scope } = ctx.body;
	const authorization = ctx.request?.headers.get("authorization") || null;
	if (authorization?.startsWith("Basic ")) {
		const res = basicToClientCredentials(authorization);
		client_id = res?.client_id;
		client_secret = res?.client_secret;
	}
	if (!client_id) throw new APIError$1("BAD_REQUEST", {
		error_description: "Missing required client_id",
		error: "invalid_grant"
	});
	if (!client_secret) throw new APIError$1("BAD_REQUEST", {
		error_description: "Missing a required client_secret",
		error: "invalid_grant"
	});
	const client = await validateClientCredentials(ctx, opts, client_id, client_secret);
	let requestedScopes = scope?.split(" ");
	if (requestedScopes) {
		const validScopes = new Set(client.scopes ?? opts.scopes);
		const oidcScopes = new Set([
			"openid",
			"profile",
			"email",
			"offline_access"
		]);
		const invalidScopes = requestedScopes.filter((scope) => {
			return !validScopes?.has(scope) || oidcScopes.has(scope);
		});
		if (invalidScopes.length) throw new APIError$1("BAD_REQUEST", {
			error_description: `The following scopes are invalid: ${invalidScopes.join(", ")}`,
			error: "invalid_scope"
		});
	}
	if (!requestedScopes) requestedScopes = client.scopes ?? opts.clientCredentialGrantDefaultScopes ?? opts.scopes ?? [];
	return createUserTokens(ctx, opts, {
		client,
		scopes: requestedScopes,
		grantType: "client_credentials"
	});
}
/**
* Obtains new Session Jwt and Refresh Tokens using a refresh token
*
* Refresh tokens will only allow the same or lesser scopes as the initial authorize request.
* To add scopes, you must restart the authorize process again.
*/
async function handleRefreshTokenGrant(ctx, opts) {
	let { client_id, client_secret, refresh_token, scope } = ctx.body;
	const authorization = ctx.request?.headers.get("authorization") || null;
	if (authorization?.startsWith("Basic ")) {
		const res = basicToClientCredentials(authorization);
		client_id = res?.client_id;
		client_secret = res?.client_secret;
	}
	if (!client_id) throw new APIError$1("BAD_REQUEST", {
		error_description: "Missing required client_id",
		error: "invalid_grant"
	});
	if (!refresh_token) throw new APIError$1("BAD_REQUEST", {
		error_description: "Missing a required refresh_token for refresh_token grant",
		error: "invalid_grant"
	});
	const decodedRefresh = await decodeRefreshToken(opts, refresh_token);
	const refreshToken = await ctx.context.adapter.findOne({
		model: "oauthRefreshToken",
		where: [{
			field: "token",
			value: await getStoredToken(opts.storeTokens, decodedRefresh.token, "refresh_token")
		}]
	});
	if (!refreshToken) throw new APIError$1("BAD_REQUEST", {
		error_description: "session not found",
		error: "invalid_grant"
	});
	if (refreshToken.clientId !== client_id) throw new APIError$1("BAD_REQUEST", {
		error_description: "invalid client_id",
		error: "invalid_client"
	});
	if (refreshToken.expiresAt < /* @__PURE__ */ new Date()) throw new APIError$1("BAD_REQUEST", {
		error_description: "invalid refresh token",
		error: "invalid_grant"
	});
	if (refreshToken.revoked) {
		await invalidateRefreshFamily(ctx, client_id, refreshToken.userId);
		throw new APIError$1("BAD_REQUEST", {
			error_description: "invalid refresh token",
			error: "invalid_grant"
		});
	}
	const scopes = refreshToken?.scopes;
	const requestedScopes = scope?.split(" ");
	if (requestedScopes) {
		const validScopes = new Set(scopes);
		for (const requestedScope of requestedScopes) if (!validScopes.has(requestedScope)) throw new APIError$1("BAD_REQUEST", {
			error_description: `unable to issue scope ${requestedScope}`,
			error: "invalid_scope"
		});
	}
	const client = await validateClientCredentials(ctx, opts, client_id, client_secret, requestedScopes ?? scopes);
	const user = await ctx.context.internalAdapter.findUserById(refreshToken.userId);
	if (!user) throw new APIError$1("BAD_REQUEST", {
		error_description: "user not found",
		error: "invalid_request"
	});
	const authTime = refreshToken.authTime != null ? normalizeTimestampValue(refreshToken.authTime) : void 0;
	return createUserTokens(ctx, opts, {
		client,
		scopes: requestedScopes ?? scopes,
		user,
		grantType: "refresh_token",
		referenceId: refreshToken.referenceId,
		sessionId: refreshToken.sessionId,
		refreshToken,
		authTime
	});
}
/**
* IMPORTANT NOTES:
* Introspection follows RFC7662
* https://datatracker.ietf.org/doc/html/rfc7662
* - APIError: Continue catches (returnable to client)
* - Error: Should immediately stop catches (internal error)
*/
/**
* Validates a JWT access token against the configured JWKs.
*
* @returns RFC7662 introspection format
*/
async function validateJwtAccessToken(ctx, opts, token, clientId) {
	const jwtPlugin = opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context);
	const jwtPluginOptions = jwtPlugin?.options;
	let jwtPayload;
	try {
		jwtPayload = await verifyJwsAccessToken(token, {
			jwksFetch: jwtPluginOptions?.jwks?.remoteUrl ? jwtPluginOptions.jwks.remoteUrl : async () => {
				return (await jwtPlugin?.endpoints.getJwks(ctx))?.response;
			},
			verifyOptions: {
				audience: opts.validAudiences ?? ctx.context.baseURL,
				issuer: jwtPluginOptions?.jwt?.issuer ?? ctx.context.baseURL
			}
		});
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === "TypeError" || error.name === "JWSInvalid") throw new APIError("BAD_REQUEST", {
				error_description: "invalid JWT signature",
				error: "invalid_request"
			});
			else if (error.name === "JWTExpired") return { active: false };
			else if (error.name === "JWTInvalid") return { active: false };
			throw error;
		}
		throw new Error(error);
	}
	let client;
	if (jwtPayload.azp) {
		client = await getClient(ctx, opts, jwtPayload.azp);
		if (!client || client?.disabled) return { active: false };
		if (clientId && jwtPayload.azp !== clientId) return { active: false };
	}
	const sessionId = jwtPayload.sid;
	if (sessionId) {
		const session = await ctx.context.adapter.findOne({
			model: "session",
			where: [{
				field: "id",
				value: sessionId
			}]
		});
		if (!session || session.expiresAt < /* @__PURE__ */ new Date()) jwtPayload.sid = void 0;
	}
	if (jwtPayload.azp) jwtPayload.client_id = jwtPayload.azp;
	jwtPayload.active = true;
	return jwtPayload;
}
/**
* Searches for an opaque access token in the database and validates it
*
* @returns RFC7662 introspection format
*/
async function validateOpaqueAccessToken(ctx, opts, token, clientId) {
	let tokenValue = token;
	if (opts.prefix?.opaqueAccessToken) if (tokenValue.startsWith(opts.prefix.opaqueAccessToken)) tokenValue = tokenValue.replace(opts.prefix.opaqueAccessToken, "");
	else throw new APIError("BAD_REQUEST", {
		error_description: "opaque access token not found",
		error: "invalid_request"
	});
	const accessToken = await ctx.context.adapter.findOne({
		model: "oauthAccessToken",
		where: [{
			field: "token",
			value: await getStoredToken(opts.storeTokens, tokenValue, "access_token")
		}]
	});
	if (!accessToken) throw new APIError("BAD_REQUEST", {
		error_description: "opaque access token not found",
		error: "invalid_token"
	});
	if (!accessToken.expiresAt || accessToken.expiresAt < /* @__PURE__ */ new Date()) return { active: false };
	let client;
	if (accessToken.clientId) {
		client = await getClient(ctx, opts, accessToken.clientId);
		if (!client || client?.disabled) return { active: false };
		if (clientId && accessToken.clientId !== clientId) return { active: false };
	}
	let sessionId = accessToken.sessionId ?? void 0;
	if (sessionId) {
		const session = await ctx.context.adapter.findOne({
			model: "session",
			where: [{
				field: "id",
				value: sessionId
			}]
		});
		if (!session || session.expiresAt < /* @__PURE__ */ new Date()) sessionId = void 0;
	}
	let user;
	if (accessToken.userId) user = await ctx.context.internalAdapter.findUserById(accessToken?.userId);
	const customClaims = opts.customAccessTokenClaims ? await opts.customAccessTokenClaims({
		user,
		scopes: accessToken.scopes,
		referenceId: accessToken?.referenceId,
		metadata: parseClientMetadata(client?.metadata)
	}) : {};
	const jwtPluginOptions = (opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context))?.options;
	return {
		...customClaims,
		active: true,
		iss: jwtPluginOptions?.jwt?.issuer ?? ctx.context.baseURL,
		client_id: accessToken.clientId,
		sub: user?.id,
		sid: sessionId,
		exp: Math.floor(new Date(accessToken.expiresAt).getTime() / 1e3),
		iat: Math.floor(new Date(accessToken.createdAt).getTime() / 1e3),
		scope: accessToken.scopes?.join(" ")
	};
}
/**
* Validates a refresh token in the session store.
*
* @returns payload in RFC7662 introspection format
*/
async function validateRefreshToken(ctx, opts, token, clientId) {
	const refreshToken = await ctx.context.adapter.findOne({
		model: "oauthRefreshToken",
		where: [{
			field: "token",
			value: await getStoredToken(opts.storeTokens, token, "refresh_token")
		}]
	});
	if (!refreshToken) throw new APIError("BAD_REQUEST", {
		error_description: "token not found",
		error: "invalid_token"
	});
	if (!refreshToken.clientId || refreshToken.clientId !== clientId) return { active: false };
	if (!refreshToken.expiresAt || refreshToken.expiresAt < /* @__PURE__ */ new Date()) return { active: false };
	if (refreshToken.revoked) return { active: false };
	let sessionId = refreshToken.sessionId ?? void 0;
	if (sessionId) {
		const session = await ctx.context.adapter.findOne({
			model: "session",
			where: [{
				field: "id",
				value: sessionId
			}]
		});
		if (!session || session.expiresAt < /* @__PURE__ */ new Date()) sessionId = void 0;
	}
	let user = void 0;
	if (refreshToken.userId) user = await ctx.context.internalAdapter.findUserById(refreshToken?.userId) ?? void 0;
	return {
		active: true,
		client_id: clientId,
		iss: ((opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context))?.options)?.jwt?.issuer ?? ctx.context.baseURL,
		sub: user?.id,
		sid: sessionId,
		exp: Math.floor(new Date(refreshToken.expiresAt).getTime() / 1e3),
		iat: Math.floor(new Date(refreshToken.createdAt).getTime() / 1e3),
		scope: refreshToken.scopes?.join(" ")
	};
}
/**
* We don't know the access token format so we try to validate it
* as a JWT first, then as an opaque token.
*
* @returns RFC7662 introspection format
*
* @internal
*/
async function validateAccessToken(ctx, opts, token, clientId) {
	try {
		return await validateJwtAccessToken(ctx, opts, token, clientId);
	} catch (err) {
		if (err instanceof APIError) {} else if (err instanceof Error) throw err;
		else throw new Error(err);
	}
	try {
		return await validateOpaqueAccessToken(ctx, opts, token, clientId);
	} catch (err) {
		if (err instanceof APIError) {} else if (err instanceof Error) throw err;
		else throw new Error("Unknown error validating access token");
	}
	throw new APIError("BAD_REQUEST", {
		error_description: "Invalid access token",
		error: "invalid_request"
	});
}
/**
* Resolves pairwise sub on an introspection payload.
* Applied at the presentation layer so internal validation functions
* keep real user.id (needed for user lookup in /userinfo).
*/
async function resolveIntrospectionSub(opts, payload, client) {
	if (payload.active && payload.sub) {
		const resolvedSub = await resolveSubjectIdentifier(payload.sub, client, opts);
		return {
			...payload,
			sub: resolvedSub
		};
	}
	return payload;
}
async function introspectEndpoint(ctx, opts) {
	let { client_id, client_secret, token, token_type_hint } = ctx.body;
	const authorization = ctx.request?.headers.get("authorization") || null;
	if (authorization?.startsWith("Basic ")) {
		const res = basicToClientCredentials(authorization);
		client_id = res?.client_id;
		client_secret = res?.client_secret;
	}
	if (!client_id || !client_secret) throw new APIError("UNAUTHORIZED", {
		error_description: "missing required credentials",
		error: "invalid_client"
	});
	if (token && typeof token === "string" && token.startsWith("Bearer ")) token = token.replace("Bearer ", "");
	if (!token?.length) throw new APIError("BAD_REQUEST", {
		error_description: "missing a required token for introspection",
		error: "invalid_request"
	});
	const client = await validateClientCredentials(ctx, opts, client_id, client_secret);
	try {
		if (token_type_hint === void 0 || token_type_hint === "access_token") try {
			return resolveIntrospectionSub(opts, await validateAccessToken(ctx, opts, token, client.clientId), client);
		} catch (error) {
			if (error instanceof APIError) {
				if (token_type_hint === "access_token") throw error;
			} else if (error instanceof Error) throw error;
			else throw new Error(error);
		}
		if (token_type_hint === void 0 || token_type_hint === "refresh_token") try {
			return resolveIntrospectionSub(opts, await validateRefreshToken(ctx, opts, (await decodeRefreshToken(opts, token)).token, client.clientId), client);
		} catch (error) {
			if (error instanceof APIError) {
				if (token_type_hint === "refresh_token") throw error;
			} else if (error instanceof Error) throw error;
			else throw new Error(error);
		}
		throw new APIError("BAD_REQUEST", {
			error_description: "token not found",
			error: "invalid_request"
		});
	} catch (error) {
		if (error instanceof APIError) {
			if (error.name === "BAD_REQUEST") return { active: false };
			throw error;
		} else if (error instanceof Error) {
			logger.error("Introspection error:", error.message, error.stack);
			throw new APIError("INTERNAL_SERVER_ERROR");
		} else {
			logger.error("Introspection error:", error);
			throw new APIError("INTERNAL_SERVER_ERROR");
		}
	}
}
/**
* IMPORTANT NOTES:
* Follows OIDC RP-Initiated Logout
*
* @see https://openid.net/specs/openid-connect-rpinitiated-1_0.html
*/
async function rpInitiatedLogoutEndpoint(ctx, opts) {
	const { id_token_hint, client_id, post_logout_redirect_uri, state } = ctx.query;
	const baseURL = ctx.context.baseURL;
	const jwtPluginOptions = (opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context))?.options;
	const jwksUrl = jwtPluginOptions?.jwks?.remoteUrl ?? `${baseURL}${jwtPluginOptions?.jwks?.jwksPath ?? "/jwks"}`;
	let clientId = client_id;
	if (!clientId) {
		let decoded;
		try {
			decoded = decodeJwt(id_token_hint);
		} catch (_e) {
			throw new APIError("UNAUTHORIZED", {
				error_description: "invalid id token",
				error: "invalid_token"
			});
		}
		clientId = decoded?.aud;
		if (!clientId) throw new APIError("INTERNAL_SERVER_ERROR", {
			error_description: "id token missing audience",
			error: "invalid_request"
		});
	}
	const client = await getClient(ctx, opts, clientId);
	if (!client) throw new APIError("BAD_REQUEST", {
		error_description: "client doesn't exist",
		error: "invalid_client"
	});
	if (client.disabled) throw new APIError("BAD_REQUEST", {
		error_description: "client is disabled",
		error: "invalid_client"
	});
	if (!client.enableEndSession) throw new APIError("UNAUTHORIZED", {
		error_description: "client unable to logout",
		error: "invalid_client"
	});
	let idTokenPayload;
	if (opts.disableJwtPlugin) {
		const clientSecret = client.clientSecret;
		if (!clientSecret) throw new APIError("UNAUTHORIZED", {
			error_description: "missing required credentials",
			error: "invalid_client"
		});
		const secret = await decryptStoredClientSecret(ctx, opts.storeClientSecret, clientSecret);
		const { payload } = await compactVerify(id_token_hint, new TextEncoder().encode(secret));
		const idToken = new TextDecoder().decode(payload);
		idTokenPayload = JSON.parse(idToken);
	} else {
		const { payload } = await compactVerify(id_token_hint, createLocalJWKSet(await getJwks(id_token_hint, { jwksFetch: jwksUrl })));
		const idToken = new TextDecoder().decode(payload);
		idTokenPayload = JSON.parse(idToken);
	}
	if (!idTokenPayload) throw new APIError("INTERNAL_SERVER_ERROR", {
		error_description: "missing payload",
		error: "invalid_request"
	});
	if ((jwtPluginOptions?.jwt?.issuer ?? ctx.context.baseURL) !== idTokenPayload.iss) throw new APIError("INTERNAL_SERVER_ERROR", {
		error_description: "invalid issuer",
		error: "invalid_request"
	});
	const idTokenAudience = typeof idTokenPayload.aud === "string" ? [idTokenPayload.aud] : idTokenPayload.aud;
	if (!idTokenAudience) throw new APIError("INTERNAL_SERVER_ERROR", {
		error_description: "id token missing audience",
		error: "invalid_request"
	});
	if (client_id && !idTokenAudience.includes(client_id)) throw new APIError("BAD_REQUEST", {
		error_description: "audience mismatch",
		error: "invalid_request"
	});
	const sessionId = idTokenPayload.sid;
	if (!sessionId) throw new APIError("INTERNAL_SERVER_ERROR", {
		error_description: "id token missing session",
		error: "invalid_request"
	});
	try {
		const session = await ctx.context.adapter.findOne({
			model: "session",
			where: [{
				field: "id",
				value: sessionId
			}]
		});
		session?.token ? await ctx.context.internalAdapter.deleteSession(session?.token) : session?.id ? await ctx.context.adapter.delete({
			model: "session",
			where: [{
				field: "id",
				value: session.id
			}]
		}) : await ctx.context.adapter.delete({
			model: "session",
			where: [{
				field: "id",
				value: sessionId
			}]
		});
	} catch {}
	if (post_logout_redirect_uri) {
		if (client.postLogoutRedirectUris?.includes(post_logout_redirect_uri)) {
			const redirectUri = new URL(post_logout_redirect_uri);
			if (state) redirectUri.searchParams.set("state", state);
			return handleRedirect(ctx, redirectUri.toString());
		}
	}
}
var publicSessionMiddleware = (opts) => createAuthMiddleware(async (ctx) => {
	if (!opts.allowPublicClientPrelogin) throw new APIError$1("BAD_REQUEST");
	const query = ctx.body.oauth_query;
	if (!await verifyOAuthQueryParams(query, ctx.context.secret)) throw new APIError$1("UNAUTHORIZED", { error: "invalid_signature" });
});
/**
* Resolves the auth method and type for unauthenticated DCR.
* Overrides confidential methods to "none" per RFC 7591 Section 3.2.1.
* When overriding, clears type "web" since it is only valid for confidential clients.
*/
function resolveUnauthenticatedAuth(body) {
	if (body.token_endpoint_auth_method === "none") return {
		tokenEndpointAuthMethod: "none",
		type: body.type
	};
	return {
		tokenEndpointAuthMethod: "none",
		type: body.type === "web" ? void 0 : body.type
	};
}
async function registerEndpoint(ctx, opts) {
	if (!opts.allowDynamicClientRegistration) throw new APIError$1("FORBIDDEN", {
		error: "access_denied",
		error_description: "Client registration is disabled"
	});
	const body = ctx.body;
	const session = await getSessionFromCtx(ctx);
	if (!(session || opts.allowUnauthenticatedClientRegistration)) throw new APIError$1("UNAUTHORIZED", {
		error: "invalid_token",
		error_description: "Authentication required for client registration"
	});
	if (!session) {
		if (body.grant_types?.includes("client_credentials")) throw new APIError$1("BAD_REQUEST", {
			error: "invalid_client_metadata",
			error_description: "client_credentials grant requires authenticated registration"
		});
		const resolved = resolveUnauthenticatedAuth(body);
		body.token_endpoint_auth_method = resolved.tokenEndpointAuthMethod;
		body.type = resolved.type;
	}
	if (!body.scope) body.scope = (opts.clientRegistrationDefaultScopes ?? opts.scopes)?.join(" ");
	return createOAuthClientEndpoint(ctx, opts, { isRegister: true });
}
async function checkOAuthClient(client, opts, settings) {
	const isPublic = client.token_endpoint_auth_method === "none";
	if (client.type) {
		if (isPublic && !(client.type === "native" || client.type === "user-agent-based")) throw new APIError$1("BAD_REQUEST", {
			error: "invalid_client_metadata",
			error_description: `Type must be 'native' or 'user-agent-based' for public applications`
		});
		else if (!isPublic && !(client.type === "web")) throw new APIError$1("BAD_REQUEST", {
			error: "invalid_client_metadata",
			error_description: `Type must be 'web' for confidential applications`
		});
	}
	if ((!client.grant_types || client.grant_types.includes("authorization_code")) && (!client.redirect_uris || client.redirect_uris.length === 0)) throw new APIError$1("BAD_REQUEST", {
		error: "invalid_redirect_uri",
		error_description: "Redirect URIs are required for authorization_code and implicit grant types"
	});
	const grantTypes = client.grant_types ?? ["authorization_code"];
	const responseTypes = client.response_types ?? ["code"];
	if (grantTypes.includes("authorization_code") && !responseTypes.includes("code")) throw new APIError$1("BAD_REQUEST", {
		error: "invalid_client_metadata",
		error_description: "When 'authorization_code' grant type is used, 'code' response type must be included"
	});
	if (client.subject_type !== void 0) {
		if (client.subject_type !== "public" && client.subject_type !== "pairwise") throw new APIError$1("BAD_REQUEST", {
			error: "invalid_client_metadata",
			error_description: `subject_type must be "public" or "pairwise"`
		});
		if (client.subject_type === "pairwise" && !opts.pairwiseSecret) throw new APIError$1("BAD_REQUEST", {
			error: "invalid_client_metadata",
			error_description: "pairwise subject_type requires server pairwiseSecret configuration"
		});
		if (client.subject_type === "pairwise" && client.redirect_uris && client.redirect_uris.length > 1) {
			if (new Set(client.redirect_uris.map((uri) => new URL(uri).host)).size > 1) throw new APIError$1("BAD_REQUEST", {
				error: "invalid_client_metadata",
				error_description: "pairwise clients with redirect_uris on different hosts require a sector_identifier_uri, which is not yet supported. All redirect_uris must share the same host."
			});
		}
	}
	const requestedScopes = (client?.scope)?.split(" ").filter((v) => v.length);
	const allowedScopes = settings?.isRegister ? opts.clientRegistrationAllowedScopes ?? opts.scopes : opts.scopes;
	if (allowedScopes) {
		const validScopes = new Set(allowedScopes);
		for (const requestedScope of requestedScopes ?? []) if (!validScopes?.has(requestedScope)) throw new APIError$1("BAD_REQUEST", {
			error: "invalid_scope",
			error_description: `cannot request scope ${requestedScope}`
		});
	}
	if (settings?.isRegister && client.require_pkce === false) throw new APIError$1("BAD_REQUEST", {
		error: "invalid_client_metadata",
		error_description: `pkce is required for registered clients.`
	});
}
async function createOAuthClientEndpoint(ctx, opts, settings) {
	const body = ctx.body;
	const session = await getSessionFromCtx(ctx);
	const isPublic = body.token_endpoint_auth_method === "none";
	await checkOAuthClient(ctx.body, opts, settings);
	const clientId = opts.generateClientId?.() || generateRandomString(32, "a-z", "A-Z");
	const clientSecret = isPublic ? void 0 : opts.generateClientSecret?.() || generateRandomString(32, "a-z", "A-Z");
	const storedClientSecret = clientSecret ? await storeClientSecret(ctx, opts, clientSecret) : void 0;
	const iat = Math.floor(Date.now() / 1e3);
	const referenceId = opts.clientReference ? await opts.clientReference({
		user: session?.user,
		session: session?.session
	}) : void 0;
	const schema = oauthToSchema({
		...body ?? {},
		disabled: void 0,
		jwks: void 0,
		jwks_uri: void 0,
		client_secret_expires_at: storedClientSecret ? settings.isRegister && opts?.clientRegistrationClientSecretExpiration ? toExpJWT(opts.clientRegistrationClientSecretExpiration, iat) : 0 : void 0,
		client_id: clientId,
		client_secret: storedClientSecret,
		client_id_issued_at: iat,
		public: isPublic,
		user_id: referenceId ? void 0 : session?.session.userId,
		reference_id: referenceId
	});
	const client = await ctx.context.adapter.create({
		model: "oauthClient",
		data: {
			...schema,
			createdAt: /* @__PURE__ */ new Date(iat * 1e3),
			updatedAt: /* @__PURE__ */ new Date(iat * 1e3)
		}
	});
	return ctx.json(schemaToOAuth({
		...client,
		clientSecret: clientSecret ? (opts.prefix?.clientSecret ?? "") + clientSecret : void 0
	}), {
		status: 201,
		headers: {
			"Cache-Control": "no-store",
			Pragma: "no-cache"
		}
	});
}
/**
* Converts an OAuth 2.0 Dynamic Client Schema to a Database Schema
*
* @param input
* @returns
*/
function oauthToSchema(input) {
	const { client_id: clientId, client_secret: clientSecret, client_secret_expires_at: _expiresAt, scope: _scope, user_id: userId, client_id_issued_at: _createdAt, client_name: name, client_uri: uri, logo_uri: icon, contacts, tos_uri: tos, policy_uri: policy, jwks: _jwks, jwks_uri: _jwksUri, software_id: softwareId, software_version: softwareVersion, software_statement: softwareStatement, redirect_uris: redirectUris, post_logout_redirect_uris: postLogoutRedirectUris, token_endpoint_auth_method: tokenEndpointAuthMethod, grant_types: grantTypes, response_types: responseTypes, public: _public, type, disabled, skip_consent: skipConsent, enable_end_session: enableEndSession, require_pkce: requirePKCE, subject_type: subjectType, reference_id: referenceId, metadata: inputMetadata, ...rest } = input;
	const expiresAt = _expiresAt ? /* @__PURE__ */ new Date(_expiresAt * 1e3) : void 0;
	const createdAt = _createdAt ? /* @__PURE__ */ new Date(_createdAt * 1e3) : void 0;
	const scopes = _scope?.split(" ");
	const metadataObj = {
		...rest && Object.keys(rest).length ? rest : {},
		...inputMetadata && typeof inputMetadata === "object" ? inputMetadata : {}
	};
	return {
		clientId,
		clientSecret,
		disabled,
		scopes,
		userId,
		createdAt,
		expiresAt,
		name,
		uri,
		icon,
		contacts,
		tos,
		policy,
		softwareId,
		softwareVersion,
		softwareStatement,
		redirectUris,
		postLogoutRedirectUris,
		tokenEndpointAuthMethod,
		grantTypes,
		responseTypes,
		public: _public,
		type,
		skipConsent,
		enableEndSession,
		requirePKCE,
		subjectType,
		referenceId,
		metadata: Object.keys(metadataObj).length ? JSON.stringify(metadataObj) : void 0
	};
}
/**
* Converts a Database Schema to an OAuth 2.0 Dynamic Client Schema
* @param input
* @param cleaned - default true, determines if the output has only Oauth 2.0 compatible data
* @returns
*/
function schemaToOAuth(input) {
	const { clientId, clientSecret, disabled, scopes, userId, createdAt, updatedAt: _updatedAt, expiresAt, name, uri, icon, contacts, tos, policy, softwareId, softwareVersion, softwareStatement, redirectUris, postLogoutRedirectUris, tokenEndpointAuthMethod, grantTypes, responseTypes, public: _public, type, skipConsent, enableEndSession, requirePKCE, subjectType, referenceId, metadata } = input;
	const _expiresAt = expiresAt ? Math.round(new Date(expiresAt).getTime() / 1e3) : void 0;
	const _createdAt = createdAt ? Math.round(new Date(createdAt).getTime() / 1e3) : void 0;
	const _scopes = scopes?.join(" ");
	return {
		...parseClientMetadata(metadata),
		client_id: clientId,
		client_secret: clientSecret ?? void 0,
		client_secret_expires_at: clientSecret ? _expiresAt ?? 0 : void 0,
		scope: _scopes ?? void 0,
		user_id: userId ?? void 0,
		client_id_issued_at: _createdAt ?? void 0,
		client_name: name ?? void 0,
		client_uri: uri ?? void 0,
		logo_uri: icon ?? void 0,
		contacts: contacts ?? void 0,
		tos_uri: tos ?? void 0,
		policy_uri: policy ?? void 0,
		software_id: softwareId ?? void 0,
		software_version: softwareVersion ?? void 0,
		software_statement: softwareStatement ?? void 0,
		redirect_uris: redirectUris ?? [],
		post_logout_redirect_uris: postLogoutRedirectUris ?? void 0,
		token_endpoint_auth_method: tokenEndpointAuthMethod ?? void 0,
		grant_types: grantTypes ?? void 0,
		response_types: responseTypes ?? void 0,
		public: _public ?? void 0,
		type: type ?? void 0,
		disabled: disabled ?? void 0,
		skip_consent: skipConsent ?? void 0,
		enable_end_session: enableEndSession ?? void 0,
		require_pkce: requirePKCE ?? void 0,
		subject_type: subjectType ?? void 0,
		reference_id: referenceId ?? void 0
	};
}
async function getClientEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	await assertClientPrivileges(ctx, session, opts, "read");
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const client = await getClient(ctx, opts, ctx.query.client_id);
	if (!client) throw new APIError$1("NOT_FOUND", {
		error_description: "client not found",
		error: "not_found"
	});
	if (client.userId) {
		if (client.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	} else if (client.referenceId && opts.clientReference) {
		if (client.referenceId !== await opts.clientReference(session)) throw new APIError$1("UNAUTHORIZED");
	} else throw new APIError$1("UNAUTHORIZED");
	const res = schemaToOAuth(client);
	res.client_secret = void 0;
	return res;
}
/**
* Provides public client fields for any logged-in user.
* This is commonly used to display information on login flow pages.
*/
async function getClientPublicEndpoint(ctx, opts, clientId) {
	const client = await getClient(ctx, opts, clientId);
	if (!client) throw new APIError$1("NOT_FOUND", {
		error_description: "client not found",
		error: "not_found"
	});
	if (client.disabled) throw new APIError$1("NOT_FOUND", {
		error_description: "client not found",
		error: "not_found"
	});
	return schemaToOAuth({
		clientId: client.clientId,
		name: client.name,
		uri: client.uri,
		contacts: client.contacts,
		icon: client.icon,
		tos: client.tos,
		policy: client.policy
	});
}
async function getClientsEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	await assertClientPrivileges(ctx, session, opts, "list");
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const referenceId = await opts.clientReference?.(session);
	if (referenceId) return await ctx.context.adapter.findMany({
		model: "oauthClient",
		where: [{
			field: "referenceId",
			value: referenceId
		}]
	}).then((res) => {
		if (!res) return null;
		return res.map((v) => {
			const res = schemaToOAuth(v);
			res.client_secret = void 0;
			return res;
		});
	});
	else if (session.user.id) return await ctx.context.adapter.findMany({
		model: "oauthClient",
		where: [{
			field: "userId",
			value: session.user.id
		}]
	}).then((res) => {
		if (!res) return null;
		return res.map((v) => {
			const res = schemaToOAuth(v);
			res.client_secret = void 0;
			return res;
		});
	});
	else throw new APIError$1("BAD_REQUEST", { message: "either user_id or reference_id must be provided" });
}
async function deleteClientEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	await assertClientPrivileges(ctx, session, opts, "delete");
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const clientId = ctx.body.client_id;
	if (opts.cachedTrustedClients?.has(clientId)) throw new APIError$1("INTERNAL_SERVER_ERROR", {
		error_description: "trusted clients must be updated manually",
		error: "invalid_client"
	});
	const client = await getClient(ctx, opts, clientId);
	if (!client) throw new APIError$1("NOT_FOUND", {
		error_description: "client not found",
		error: "not_found"
	});
	if (client.userId) {
		if (client.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	} else if (client.referenceId && opts.clientReference) {
		if (client.referenceId !== await opts.clientReference(session)) throw new APIError$1("UNAUTHORIZED");
	} else throw new APIError$1("UNAUTHORIZED");
	await ctx.context.adapter.delete({
		model: "oauthClient",
		where: [{
			field: "clientId",
			value: clientId
		}]
	});
}
async function updateClientEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	await assertClientPrivileges(ctx, session, opts, "update");
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const clientId = ctx.body.client_id;
	if (opts.cachedTrustedClients?.has(clientId)) throw new APIError$1("INTERNAL_SERVER_ERROR", {
		error_description: "trusted clients must be updated manually",
		error: "invalid_client"
	});
	const client = await getClient(ctx, opts, clientId);
	if (!client) throw new APIError$1("NOT_FOUND", {
		error_description: "client not found",
		error: "not_found"
	});
	if (client.userId) {
		if (client.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	} else if (client.referenceId && opts.clientReference) {
		if (client.referenceId !== await opts.clientReference(session)) throw new APIError$1("UNAUTHORIZED");
	} else throw new APIError$1("UNAUTHORIZED");
	const updates = ctx.body.update;
	if (Object.keys(updates).length === 0) {
		const res = schemaToOAuth(client);
		res.client_secret = void 0;
		return res;
	}
	await checkOAuthClient({
		...schemaToOAuth(client),
		...updates
	}, opts);
	const updatedClient = await ctx.context.adapter.update({
		model: "oauthClient",
		where: [{
			field: "clientId",
			value: clientId
		}],
		update: {
			...oauthToSchema(updates),
			updatedAt: /* @__PURE__ */ new Date(Math.floor(Date.now() / 1e3) * 1e3)
		}
	});
	if (!updatedClient) throw new APIError$1("INTERNAL_SERVER_ERROR", {
		error_description: "unable to update client",
		error: "invalid_client"
	});
	const res = schemaToOAuth(updatedClient);
	res.client_secret = void 0;
	return res;
}
async function rotateClientSecretEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	await assertClientPrivileges(ctx, session, opts, "rotate");
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const clientId = ctx.body.client_id;
	if (opts.cachedTrustedClients?.has(clientId)) throw new APIError$1("INTERNAL_SERVER_ERROR", {
		error_description: "trusted clients must be updated manually",
		error: "invalid_client"
	});
	const client = await getClient(ctx, opts, clientId);
	if (!client) throw new APIError$1("NOT_FOUND", {
		error_description: "client not found",
		error: "not_found"
	});
	if (client.userId) {
		if (client.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	} else if (client.referenceId && opts.clientReference) {
		if (client.referenceId !== await opts.clientReference(session)) throw new APIError$1("UNAUTHORIZED");
	} else throw new APIError$1("UNAUTHORIZED");
	if (client.public || !client.clientSecret) throw new APIError$1("BAD_REQUEST", {
		error_description: "public clients cannot be updated",
		error: "invalid_client"
	});
	const clientSecret = opts.generateClientSecret?.() || generateRandomString(32, "a-z", "A-Z");
	const storedClientSecret = clientSecret ? await storeClientSecret(ctx, opts, clientSecret) : void 0;
	const updatedClient = await ctx.context.adapter.update({
		model: "oauthClient",
		where: [{
			field: "clientId",
			value: clientId
		}],
		update: {
			clientSecret: storedClientSecret,
			updatedAt: /* @__PURE__ */ new Date(Math.floor(Date.now() / 1e3) * 1e3)
		}
	});
	if (!updatedClient) throw new APIError$1("INTERNAL_SERVER_ERROR", {
		error_description: "unable to update client",
		error: "invalid_client"
	});
	return schemaToOAuth({
		...updatedClient,
		clientSecret: (opts.prefix?.clientSecret ?? "") + clientSecret
	});
}
async function assertClientPrivileges(ctx, session, opts, action) {
	if (!session) throw new APIError$1("UNAUTHORIZED");
	if (!ctx.headers) throw new APIError$1("BAD_REQUEST");
	if (opts.clientPrivileges && !await opts.clientPrivileges({
		headers: ctx.headers,
		action,
		session: session.session,
		user: session.user
	})) throw new APIError$1("UNAUTHORIZED");
}
var adminCreateOAuthClient = (opts) => createAuthEndpoint("/admin/oauth2/create-client", {
	method: "POST",
	body: object({
		redirect_uris: array(SafeUrlSchema).min(1),
		scope: string().optional(),
		client_name: string().optional(),
		client_uri: string().optional(),
		logo_uri: string().optional(),
		contacts: array(string().min(1)).min(1).optional(),
		tos_uri: string().optional(),
		policy_uri: string().optional(),
		software_id: string().optional(),
		software_version: string().optional(),
		software_statement: string().optional(),
		post_logout_redirect_uris: array(SafeUrlSchema).min(1).optional(),
		token_endpoint_auth_method: _enum([
			"none",
			"client_secret_basic",
			"client_secret_post"
		]).default("client_secret_basic").optional(),
		grant_types: array(_enum([
			"authorization_code",
			"client_credentials",
			"refresh_token"
		])).default(["authorization_code"]).optional(),
		response_types: array(_enum(["code"])).default(["code"]).optional(),
		type: _enum([
			"web",
			"native",
			"user-agent-based"
		]).optional(),
		client_secret_expires_at: union([string(), number()]).optional().default(0),
		skip_consent: boolean().optional(),
		enable_end_session: boolean().optional(),
		require_pkce: boolean().optional(),
		subject_type: _enum(["public", "pairwise"]).optional(),
		metadata: record(string(), unknown()).optional()
	}),
	metadata: {
		SERVER_ONLY: true,
		openapi: {
			description: "Register an OAuth2 application",
			responses: { "200": {
				description: "OAuth2 application registered successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						client_id: {
							type: "string",
							description: "Unique identifier for the client"
						},
						client_secret: {
							type: "string",
							description: "Secret key for the client"
						},
						client_secret_expires_at: {
							type: "number",
							description: "Time the client secret will expire. If 0, the client secret will never expire."
						},
						scope: {
							type: "string",
							description: "Space-separated scopes allowed by the client"
						},
						user_id: {
							type: "string",
							description: "ID of the user who registered the client, null if registered anonymously"
						},
						client_id_issued_at: {
							type: "number",
							description: "Creation timestamp of this client"
						},
						client_name: {
							type: "string",
							description: "Name of the OAuth2 application"
						},
						client_uri: {
							type: "string",
							description: "URI of the OAuth2 application"
						},
						logo_uri: {
							type: "string",
							description: "Icon URI for the application"
						},
						contacts: {
							type: "array",
							items: { type: "string" },
							description: "List representing ways to contact people responsible for this client, typically email addresses"
						},
						tos_uri: {
							type: "string",
							description: "Client's terms of service uri"
						},
						policy_uri: {
							type: "string",
							description: "Client's policy uri"
						},
						software_id: {
							type: "string",
							description: "Unique identifier assigned by the developer to help in the dynamic registration process"
						},
						software_version: {
							type: "string",
							description: "Version identifier for the software_id"
						},
						software_statement: {
							type: "string",
							description: "JWT containing metadata values about the client software as claims"
						},
						redirect_uris: {
							type: "array",
							items: {
								type: "string",
								format: "uri"
							},
							description: "List of allowed redirect uris"
						},
						token_endpoint_auth_method: {
							type: "string",
							description: "Requested authentication method for the token endpoint",
							enum: [
								"none",
								"client_secret_basic",
								"client_secret_post"
							]
						},
						grant_types: {
							type: "array",
							items: {
								type: "string",
								enum: [
									"authorization_code",
									"client_credentials",
									"refresh_token"
								]
							},
							description: "Requested authentication method for the token endpoint"
						},
						response_types: {
							type: "array",
							items: {
								type: "string",
								enum: ["code"]
							},
							description: "Requested authentication method for the token endpoint"
						},
						public: {
							type: "boolean",
							description: "Whether the client is public as determined by the type"
						},
						type: {
							type: "string",
							description: "Type of the client",
							enum: [
								"web",
								"native",
								"user-agent-based"
							]
						},
						disabled: {
							type: "boolean",
							description: "Whether the client is disabled"
						},
						require_pkce: {
							type: "boolean",
							description: "Whether the client requires PKCE",
							default: true
						},
						metadata: {
							type: "object",
							additionalProperties: true,
							nullable: true,
							description: "Additional metadata for the application"
						}
					},
					required: ["client_id"]
				} } }
			} }
		}
	}
}, async (ctx) => {
	await assertClientPrivileges(ctx, await getSessionFromCtx(ctx), opts, "create");
	return createOAuthClientEndpoint(ctx, opts, { isRegister: false });
});
var createOAuthClient = (opts) => createAuthEndpoint("/oauth2/create-client", {
	method: "POST",
	use: [sessionMiddleware],
	body: object({
		redirect_uris: array(SafeUrlSchema).min(1),
		scope: string().optional(),
		client_name: string().optional(),
		client_uri: string().optional(),
		logo_uri: string().optional(),
		contacts: array(string().min(1)).min(1).optional(),
		tos_uri: string().optional(),
		policy_uri: string().optional(),
		software_id: string().optional(),
		software_version: string().optional(),
		software_statement: string().optional(),
		post_logout_redirect_uris: array(SafeUrlSchema).min(1).optional(),
		token_endpoint_auth_method: _enum([
			"none",
			"client_secret_basic",
			"client_secret_post"
		]).default("client_secret_basic").optional(),
		grant_types: array(_enum([
			"authorization_code",
			"client_credentials",
			"refresh_token"
		])).default(["authorization_code"]).optional(),
		response_types: array(_enum(["code"])).default(["code"]).optional(),
		type: _enum([
			"web",
			"native",
			"user-agent-based"
		]).optional()
	}),
	metadata: { openapi: {
		description: "Register an OAuth2 application",
		responses: { "200": {
			description: "OAuth2 application registered successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					client_id: {
						type: "string",
						description: "Unique identifier for the client"
					},
					client_secret: {
						type: "string",
						description: "Secret key for the client"
					},
					client_secret_expires_at: {
						type: "number",
						description: "Time the client secret will expire. If 0, the client secret will never expire."
					},
					scope: {
						type: "string",
						description: "Space-separated scopes allowed by the client"
					},
					user_id: {
						type: "string",
						description: "ID of the user who registered the client, null if registered anonymously"
					},
					client_id_issued_at: {
						type: "number",
						description: "Creation timestamp of this client"
					},
					client_name: {
						type: "string",
						description: "Name of the OAuth2 application"
					},
					client_uri: {
						type: "string",
						description: "URI of the OAuth2 application"
					},
					logo_uri: {
						type: "string",
						description: "Icon URI for the application"
					},
					contacts: {
						type: "array",
						items: { type: "string" },
						description: "List representing ways to contact people responsible for this client, typically email addresses"
					},
					tos_uri: {
						type: "string",
						description: "Client's terms of service uri"
					},
					policy_uri: {
						type: "string",
						description: "Client's policy uri"
					},
					software_id: {
						type: "string",
						description: "Unique identifier assigned by the developer to help in the dynamic registration process"
					},
					software_version: {
						type: "string",
						description: "Version identifier for the software_id"
					},
					software_statement: {
						type: "string",
						description: "JWT containing metadata values about the client software as claims"
					},
					redirect_uris: {
						type: "array",
						items: {
							type: "string",
							format: "uri"
						},
						description: "List of allowed redirect uris"
					},
					token_endpoint_auth_method: {
						type: "string",
						description: "Response types the client may use",
						enum: [
							"none",
							"client_secret_basic",
							"client_secret_post"
						]
					},
					grant_types: {
						type: "array",
						items: {
							type: "string",
							enum: [
								"authorization_code",
								"client_credentials",
								"refresh_token"
							]
						},
						description: "Requested authentication method for the token endpoint"
					},
					response_types: {
						type: "array",
						items: {
							type: "string",
							enum: ["code"]
						},
						description: "Requested authentication method for the token endpoint"
					},
					public: {
						type: "boolean",
						description: "Whether the client is public as determined by the type"
					},
					type: {
						type: "string",
						description: "Type of the client",
						enum: [
							"web",
							"native",
							"user-agent-based"
						]
					},
					disabled: {
						type: "boolean",
						description: "Whether the client is disabled"
					},
					metadata: {
						type: "object",
						additionalProperties: true,
						nullable: true,
						description: "Additional metadata for the application"
					}
				},
				required: ["client_id"]
			} } }
		} }
	} }
}, async (ctx) => {
	await assertClientPrivileges(ctx, await getSessionFromCtx(ctx), opts, "create");
	return createOAuthClientEndpoint(ctx, opts, { isRegister: false });
});
var getOAuthClient = (opts) => createAuthEndpoint("/oauth2/get-client", {
	method: "GET",
	use: [sessionMiddleware],
	query: object({ client_id: string() }),
	metadata: { openapi: { description: "Get OAuth2 formatted client details" } }
}, async (ctx) => {
	return getClientEndpoint(ctx, opts);
});
var getOAuthClientPublic = (opts) => createAuthEndpoint("/oauth2/public-client", {
	method: "GET",
	use: [sessionMiddleware],
	query: object({ client_id: string() }),
	metadata: { openapi: { description: "Gets publicly available client fields" } }
}, async (ctx) => {
	const clientId = ctx.query.client_id;
	return getClientPublicEndpoint(ctx, opts, clientId);
});
var getOAuthClientPublicPrelogin = (opts) => createAuthEndpoint("/oauth2/public-client-prelogin", {
	method: "POST",
	use: [publicSessionMiddleware(opts)],
	body: object({
		client_id: string(),
		oauth_query: string().optional()
	}),
	metadata: { openapi: { description: "Gets publicly available client fields (prior to login)" } }
}, async (ctx) => {
	const clientId = ctx.body.client_id;
	return getClientPublicEndpoint(ctx, opts, clientId);
});
var getOAuthClients = (opts) => createAuthEndpoint("/oauth2/get-clients", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: { description: "Get OAuth2 formatted client details for a user or organization" } }
}, async (ctx) => {
	return getClientsEndpoint(ctx, opts);
});
var adminUpdateOAuthClient = (opts) => createAuthEndpoint("/admin/oauth2/update-client", {
	method: "PATCH",
	body: object({
		client_id: string(),
		update: object({
			redirect_uris: array(SafeUrlSchema).min(1).optional(),
			scope: string().optional(),
			client_name: string().optional(),
			client_uri: string().optional(),
			logo_uri: string().optional(),
			contacts: array(string().min(1)).min(1).optional(),
			tos_uri: string().optional(),
			policy_uri: string().optional(),
			software_id: string().optional(),
			software_version: string().optional(),
			software_statement: string().optional(),
			post_logout_redirect_uris: array(SafeUrlSchema).min(1).optional(),
			grant_types: array(_enum([
				"authorization_code",
				"client_credentials",
				"refresh_token"
			])).optional(),
			response_types: array(_enum(["code"])).optional(),
			type: _enum([
				"web",
				"native",
				"user-agent-based"
			]).optional(),
			client_secret_expires_at: union([string(), number()]).optional(),
			skip_consent: boolean().optional(),
			enable_end_session: boolean().optional(),
			metadata: record(string(), unknown()).optional()
		})
	}),
	metadata: {
		SERVER_ONLY: true,
		openapi: { description: "Updates OAuth2 formatted client details." }
	}
}, async (ctx) => {
	return updateClientEndpoint(ctx, opts);
});
var updateOAuthClient = (opts) => createAuthEndpoint("/oauth2/update-client", {
	method: "POST",
	use: [sessionMiddleware],
	body: object({
		client_id: string(),
		update: object({
			redirect_uris: array(SafeUrlSchema).min(1).optional(),
			scope: string().optional(),
			client_name: string().optional(),
			client_uri: string().optional(),
			logo_uri: string().optional(),
			contacts: array(string().min(1)).min(1).optional(),
			tos_uri: string().optional(),
			policy_uri: string().optional(),
			software_id: string().optional(),
			software_version: string().optional(),
			software_statement: string().optional(),
			post_logout_redirect_uris: array(SafeUrlSchema).min(1).optional(),
			grant_types: array(_enum([
				"authorization_code",
				"client_credentials",
				"refresh_token"
			])).optional(),
			response_types: array(_enum(["code"])).optional(),
			type: _enum([
				"web",
				"native",
				"user-agent-based"
			]).optional()
		})
	}),
	metadata: { openapi: { description: "Updates OAuth2 formatted client details." } }
}, async (ctx) => {
	return updateClientEndpoint(ctx, opts);
});
var rotateClientSecret = (opts) => createAuthEndpoint("/oauth2/client/rotate-secret", {
	method: "POST",
	use: [sessionMiddleware],
	body: object({ client_id: string() }),
	metadata: { openapi: { description: "Rotates a confidential client's secret" } }
}, async (ctx) => {
	return rotateClientSecretEndpoint(ctx, opts);
});
var deleteOAuthClient = (opts) => createAuthEndpoint("/oauth2/delete-client", {
	method: "POST",
	use: [sessionMiddleware],
	body: object({ client_id: string() }),
	metadata: { openapi: { description: "Deletes an oauth client" } }
}, async (ctx) => {
	return deleteClientEndpoint(ctx, opts);
});
async function getConsent(ctx, opts, id) {
	return await ctx.context.adapter.findOne({
		model: "oauthConsent",
		where: [{
			field: "id",
			value: id
		}]
	});
}
async function getConsentEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const { id } = ctx.query;
	if (!id) throw new APIError$1("NOT_FOUND", {
		error_description: "missing id parameter",
		error: "not_found"
	});
	const consent = await getConsent(ctx, opts, id);
	if (!consent) throw new APIError$1("NOT_FOUND", {
		error_description: "no consent",
		error: "not_found"
	});
	if (consent.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	return consent;
}
async function getConsentsEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw new APIError$1("UNAUTHORIZED");
	return await ctx.context.adapter.findMany({
		model: "oauthConsent",
		where: [{
			field: "userId",
			value: session.user.id
		}]
	});
}
async function deleteConsentEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const { id } = ctx.body;
	if (!id) throw new APIError$1("NOT_FOUND", {
		error_description: "missing id parameter",
		error: "not_found"
	});
	const consent = await getConsent(ctx, opts, id);
	if (!consent) throw new APIError$1("NOT_FOUND", {
		error_description: "no consent",
		error: "not_found"
	});
	if (consent.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	await ctx.context.adapter.delete({
		model: "oauthConsent",
		where: [{
			field: "id",
			value: id
		}]
	});
}
async function updateConsentEndpoint(ctx, opts) {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw new APIError$1("UNAUTHORIZED");
	const { id } = ctx.body;
	if (!id) throw new APIError$1("NOT_FOUND", {
		error_description: "missing id parameter",
		error: "not_found"
	});
	const consent = await getConsent(ctx, opts, id);
	if (!consent) throw new APIError$1("NOT_FOUND", {
		error_description: "no consent",
		error: "not_found"
	});
	const client = await getClient(ctx, opts, consent.clientId);
	if (!consent) throw new APIError$1("NOT_FOUND", {
		error_description: "no consent",
		error: "not_found"
	});
	if (consent.userId !== session.user.id) throw new APIError$1("UNAUTHORIZED");
	const allowedScopes = client?.scopes ?? opts.scopes ?? [];
	const updates = ctx.body.update;
	const scopes = updates.scopes;
	if (scopes && !scopes.every((val) => allowedScopes?.includes(val))) throw new APIError$1("BAD_REQUEST", {
		error_description: `unable to provide scopes to ${client?.referenceId ?? client?.userId}`,
		error: "invalid_request"
	});
	const iat = Math.floor(Date.now() / 1e3);
	return await ctx.context.adapter.update({
		model: "oauthConsent",
		where: [{
			field: "id",
			value: id
		}],
		update: {
			...updates,
			updatedAt: /* @__PURE__ */ new Date(iat * 1e3)
		}
	});
}
var getOAuthConsent = (opts) => createAuthEndpoint("/oauth2/get-consent", {
	method: "GET",
	query: object({ id: string() }),
	use: [sessionMiddleware],
	metadata: { openapi: { description: "Gets details of a specific OAuth2 consent for a user" } }
}, async (ctx) => {
	return getConsentEndpoint(ctx, opts);
});
var getOAuthConsents = (opts) => createAuthEndpoint("/oauth2/get-consents", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: { description: "Gets all available OAuth2 consents for a user" } }
}, async (ctx) => {
	return getConsentsEndpoint(ctx, opts);
});
var updateOAuthConsent = (opts) => createAuthEndpoint("/oauth2/update-consent", {
	method: "POST",
	use: [sessionMiddleware],
	body: object({
		id: string(),
		update: object({ scopes: array(string()) })
	}),
	metadata: { openapi: { description: "Updates consent granted to a client." } }
}, async (ctx) => {
	return updateConsentEndpoint(ctx, opts);
});
var deleteOAuthConsent = (opts) => createAuthEndpoint("/oauth2/delete-consent", {
	method: "POST",
	use: [sessionMiddleware],
	body: object({ id: string() }),
	metadata: { openapi: { description: "Deletes consent granted to a client" } }
}, async (ctx) => {
	return deleteConsentEndpoint(ctx, opts);
});
/**
* IMPORTANT NOTES:
* Revocation follows RFC7009
* https://datatracker.ietf.org/doc/html/rfc7009
* - APIError: Continue catches (returnable to client)
* - Error: Should immediately stop catches (internal error)
*/
/**
* Revokes a JWT access token against the configured JWKs.
* (does nothing if successful since a JWT is not stored on the server)
*/
async function revokeJwtAccessToken(ctx, opts, token) {
	const jwtPlugin = opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context);
	const jwtPluginOptions = jwtPlugin?.options;
	try {
		await verifyJwsAccessToken(token, {
			jwksFetch: jwtPluginOptions?.jwks?.remoteUrl ? jwtPluginOptions.jwks.remoteUrl : async () => {
				return (await jwtPlugin?.endpoints.getJwks(ctx))?.response;
			},
			verifyOptions: {
				audience: opts.validAudiences ?? ctx.context.baseURL,
				issuer: jwtPluginOptions?.jwt?.issuer ?? ctx.context.baseURL
			}
		});
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === "TypeError" || error.name === "JWSInvalid") throw new APIError("BAD_REQUEST", {
				error_description: "invalid JWT signature",
				error: "invalid_request"
			});
			else if (error.name === "JWTExpired") return null;
			else if (error.name === "JWTInvalid") return null;
			throw error;
		}
		throw new Error(error);
	}
}
/**
* Searches for an opaque access token in the database and validates it
*/
async function revokeOpaqueAccessToken(ctx, opts, token, clientId) {
	let tokenValue = token;
	if (opts.prefix?.opaqueAccessToken) if (tokenValue.startsWith(opts.prefix.opaqueAccessToken)) tokenValue = tokenValue.replace(opts.prefix.opaqueAccessToken, "");
	else throw new APIError("BAD_REQUEST", {
		error_description: "opaque access token not found",
		error: "invalid_request"
	});
	const accessToken = await ctx.context.adapter.findOne({
		model: "oauthAccessToken",
		where: [{
			field: "token",
			value: await getStoredToken(opts.storeTokens, tokenValue, "access_token")
		}]
	});
	if (!accessToken) throw new APIError("BAD_REQUEST", {
		error_description: "opaque access token not found",
		error: "invalid_request"
	});
	if (!accessToken.clientId || accessToken.clientId !== clientId) return null;
	accessToken.id ? await ctx.context.adapter.delete({
		model: "oauthAccessToken",
		where: [{
			field: "id",
			value: accessToken.id
		}]
	}) : await ctx.context.adapter.delete({
		model: "oauthAccessToken",
		where: [{
			field: "token",
			value: accessToken.token
		}]
	});
}
/**
* Validates a refresh token in the session store.
*/
async function revokeRefreshToken(ctx, opts, token, clientId) {
	const refreshToken = await ctx.context.adapter.findOne({
		model: "oauthRefreshToken",
		where: [{
			field: "token",
			value: await getStoredToken(opts.storeTokens, token, "refresh_token")
		}]
	});
	if (!refreshToken) throw new APIError("BAD_REQUEST", {
		error_description: "token not found",
		error: "invalid_request"
	});
	if (refreshToken.revoked) {
		await invalidateRefreshFamily(ctx, clientId, refreshToken.userId);
		throw new APIError("BAD_REQUEST", {
			error_description: "refresh token revoked",
			error: "invalid_request"
		});
	}
	if (!refreshToken.clientId || refreshToken.clientId !== clientId) return null;
	const iat = Math.floor(Date.now() / 1e3);
	if (!await ctx.context.adapter.update({
		model: "oauthRefreshToken",
		where: [{
			field: "id",
			value: refreshToken.id
		}, {
			field: "revoked",
			operator: "eq",
			value: null
		}],
		update: { revoked: /* @__PURE__ */ new Date(iat * 1e3) }
	})) {
		await invalidateRefreshFamily(ctx, clientId, refreshToken.userId);
		throw new APIError("BAD_REQUEST", {
			error_description: "refresh token revoked",
			error: "invalid_request"
		});
	}
	await ctx.context.adapter.deleteMany({
		model: "oauthAccessToken",
		where: [{
			field: "refreshId",
			value: refreshToken.id
		}]
	});
}
/**
* We don't know the access token format so we try to validate it
* as a JWT first, then as an opaque token.
*/
async function revokeAccessToken(ctx, opts, clientId, token) {
	try {
		return await revokeJwtAccessToken(ctx, opts, token);
	} catch (err) {
		if (err instanceof APIError) {} else if (err instanceof Error) throw err;
		else throw new Error(err);
	}
	try {
		return await revokeOpaqueAccessToken(ctx, opts, token, clientId);
	} catch (err) {
		if (err instanceof APIError) {} else if (err instanceof Error) throw err;
		else throw new Error("Unknown error validating access token");
	}
	throw new APIError("BAD_REQUEST", {
		error_description: "Invalid access token",
		error: "invalid_request"
	});
}
async function revokeEndpoint(ctx, opts) {
	let { client_id, client_secret, token, token_type_hint } = ctx.body;
	const authorization = ctx.request?.headers.get("authorization") || null;
	if (authorization?.startsWith("Basic ")) {
		const res = basicToClientCredentials(authorization);
		client_id = res?.client_id;
		client_secret = res?.client_secret;
	}
	if (!client_id) throw new APIError("UNAUTHORIZED", {
		error_description: "missing required credentials",
		error: "invalid_client"
	});
	if (typeof token === "string" && token.startsWith("Bearer ")) token = token.replace("Bearer ", "");
	if (!token?.length) throw new APIError("BAD_REQUEST", {
		error_description: "missing a required token for introspection",
		error: "invalid_request"
	});
	const client = await validateClientCredentials(ctx, opts, client_id, client_secret);
	try {
		if (token_type_hint === void 0 || token_type_hint === "access_token") try {
			return await revokeAccessToken(ctx, opts, client.clientId, token);
		} catch (error) {
			if (error instanceof APIError) {
				if (token_type_hint === "access_token") throw error;
			} else if (error instanceof Error) throw error;
			else throw new Error(error);
		}
		if (token_type_hint === void 0 || token_type_hint === "refresh_token") try {
			return await revokeRefreshToken(ctx, opts, (await decodeRefreshToken(opts, token)).token, client.clientId);
		} catch (error) {
			if (error instanceof APIError) {
				if (token_type_hint === "refresh_token") throw error;
			} else if (error instanceof Error) throw error;
			else throw new Error(error);
		}
		throw new APIError("BAD_REQUEST", {
			error_description: "token not found",
			error: "invalid_request"
		});
	} catch (error) {
		if (error instanceof APIError) {
			if (error.name === "BAD_REQUEST") return null;
			throw error;
		} else if (error instanceof Error) {
			logger.error("Introspection error:", error.message, error.stack);
			throw new APIError("INTERNAL_SERVER_ERROR");
		} else {
			logger.error("Introspection error:", error);
			throw new APIError("INTERNAL_SERVER_ERROR");
		}
	}
}
var schema = {
	oauthClient: {
		modelName: "oauthClient",
		fields: {
			clientId: {
				type: "string",
				unique: true,
				required: true
			},
			clientSecret: {
				type: "string",
				required: false
			},
			disabled: {
				type: "boolean",
				defaultValue: false,
				required: false
			},
			skipConsent: {
				type: "boolean",
				required: false
			},
			enableEndSession: {
				type: "boolean",
				required: false
			},
			subjectType: {
				type: "string",
				required: false
			},
			scopes: {
				type: "string[]",
				required: false
			},
			userId: {
				type: "string",
				required: false,
				references: {
					model: "user",
					field: "id"
				},
				index: true
			},
			createdAt: {
				type: "date",
				required: false
			},
			updatedAt: {
				type: "date",
				required: false
			},
			name: {
				type: "string",
				required: false
			},
			uri: {
				type: "string",
				required: false
			},
			icon: {
				type: "string",
				required: false
			},
			contacts: {
				type: "string[]",
				required: false
			},
			tos: {
				type: "string",
				required: false
			},
			policy: {
				type: "string",
				required: false
			},
			softwareId: {
				type: "string",
				required: false
			},
			softwareVersion: {
				type: "string",
				required: false
			},
			softwareStatement: {
				type: "string",
				required: false
			},
			redirectUris: {
				type: "string[]",
				required: true
			},
			postLogoutRedirectUris: {
				type: "string[]",
				required: false
			},
			tokenEndpointAuthMethod: {
				type: "string",
				required: false
			},
			grantTypes: {
				type: "string[]",
				required: false
			},
			responseTypes: {
				type: "string[]",
				required: false
			},
			public: {
				type: "boolean",
				required: false
			},
			type: {
				type: "string",
				required: false
			},
			requirePKCE: {
				type: "boolean",
				required: false
			},
			referenceId: {
				type: "string",
				required: false
			},
			metadata: {
				type: "json",
				required: false
			}
		}
	},
	oauthRefreshToken: { fields: {
		token: {
			type: "string",
			required: true,
			unique: true
		},
		clientId: {
			type: "string",
			required: true,
			references: {
				model: "oauthClient",
				field: "clientId"
			},
			index: true
		},
		sessionId: {
			type: "string",
			required: false,
			references: {
				model: "session",
				field: "id",
				onDelete: "set null"
			},
			index: true
		},
		userId: {
			type: "string",
			required: true,
			references: {
				model: "user",
				field: "id"
			},
			index: true
		},
		referenceId: {
			type: "string",
			required: false
		},
		expiresAt: { type: "date" },
		createdAt: { type: "date" },
		revoked: {
			type: "date",
			required: false
		},
		authTime: {
			type: "date",
			required: false
		},
		scopes: {
			type: "string[]",
			required: true
		}
	} },
	oauthAccessToken: {
		modelName: "oauthAccessToken",
		fields: {
			token: {
				type: "string",
				unique: true
			},
			clientId: {
				type: "string",
				required: true,
				references: {
					model: "oauthClient",
					field: "clientId"
				},
				index: true
			},
			sessionId: {
				type: "string",
				required: false,
				references: {
					model: "session",
					field: "id",
					onDelete: "set null"
				},
				index: true
			},
			userId: {
				type: "string",
				required: false,
				references: {
					model: "user",
					field: "id"
				},
				index: true
			},
			referenceId: {
				type: "string",
				required: false
			},
			refreshId: {
				type: "string",
				required: false,
				references: {
					model: "oauthRefreshToken",
					field: "id"
				},
				index: true
			},
			expiresAt: { type: "date" },
			createdAt: { type: "date" },
			scopes: {
				type: "string[]",
				required: true
			}
		}
	},
	oauthConsent: {
		modelName: "oauthConsent",
		fields: {
			clientId: {
				type: "string",
				required: true,
				references: {
					model: "oauthClient",
					field: "clientId"
				},
				index: true
			},
			userId: {
				type: "string",
				required: false,
				references: {
					model: "user",
					field: "id"
				},
				index: true
			},
			referenceId: {
				type: "string",
				required: false
			},
			scopes: {
				type: "string[]",
				required: true
			},
			createdAt: { type: "date" },
			updatedAt: { type: "date" }
		}
	}
};
var oAuthState = defineRequestState(() => null);
oAuthState.get;
/**
* oAuth 2.1 provider plugin for Better Auth.
*
* @see https://better-auth.com/docs/plugins/oauth-provider
* @param options - The options for the oAuth Provider plugin.
* @returns A Better Auth plugin.
*/
var oauthProvider = (options) => {
	let clientRegistrationAllowedScopes = options.clientRegistrationAllowedScopes;
	if (options.clientRegistrationDefaultScopes) {
		const _allowedScopes = clientRegistrationAllowedScopes ? new Set([...clientRegistrationAllowedScopes, ...options.clientRegistrationDefaultScopes]) : new Set([...options.clientRegistrationDefaultScopes]);
		clientRegistrationAllowedScopes = Array.from(_allowedScopes);
	}
	const scopes = new Set((options.scopes ?? [
		"openid",
		"profile",
		"email",
		"offline_access"
	]).filter((val) => val.length));
	if (clientRegistrationAllowedScopes) {
		for (const sc of clientRegistrationAllowedScopes) if (!scopes.has(sc)) throw new BetterAuthError(`clientRegistrationAllowedScope ${sc} not found in scopes`);
	}
	for (const sc of options.advertisedMetadata?.scopes_supported ?? []) if (!scopes?.has(sc)) throw new BetterAuthError(`advertisedMetadata.scopes_supported ${sc} not found in scopes`);
	const claims = new Set([
		"sub",
		"iss",
		"aud",
		"exp",
		"iat",
		"sid",
		"scope",
		"azp",
		...scopes.has("email") ? ["email", "email_verified"] : [],
		...scopes.has("profile") ? [
			"name",
			"picture",
			"family_name",
			"given_name"
		] : []
	]);
	const opts = {
		codeExpiresIn: 600,
		accessTokenExpiresIn: 3600,
		m2mAccessTokenExpiresIn: 3600,
		refreshTokenExpiresIn: 2592e3,
		allowUnauthenticatedClientRegistration: false,
		allowDynamicClientRegistration: false,
		disableJwtPlugin: false,
		storeClientSecret: options.disableJwtPlugin ? "encrypted" : "hashed",
		storeTokens: "hashed",
		grantTypes: [
			"authorization_code",
			"client_credentials",
			"refresh_token"
		],
		...options,
		scopes: Array.from(scopes),
		claims: Array.from(claims),
		clientRegistrationAllowedScopes
	};
	if (opts.pairwiseSecret && opts.pairwiseSecret.length < 32) throw new BetterAuthError("pairwiseSecret must be at least 32 characters long for adequate HMAC-SHA256 security");
	if (opts.grantTypes && opts.grantTypes.includes("refresh_token") && !opts.grantTypes.includes("authorization_code")) throw new BetterAuthError("refresh_token grant requires authorization_code grant");
	if (opts.disableJwtPlugin && (opts.storeClientSecret === "hashed" || typeof opts.storeClientSecret === "object" && "hash" in opts.storeClientSecret)) throw new BetterAuthError("unable to store hashed secrets because id tokens will be signed with secret");
	if (!opts.disableJwtPlugin && (opts.storeClientSecret === "encrypted" || typeof opts.storeClientSecret === "object" && ("encrypt" in opts.storeClientSecret || "decrypt" in opts.storeClientSecret))) throw new BetterAuthError("encryption method not recommended, please use 'hashed' or the 'hash' function");
	return {
		id: "oauth-provider",
		version: PACKAGE_VERSION,
		options: opts,
		init: (ctx) => {
			if (ctx.options.secondaryStorage && ctx.options.session?.storeSessionInDatabase !== true) throw new BetterAuthError("OAuth Provider requires `session.storeSessionInDatabase: true` when using secondaryStorage");
			if (!opts.disableJwtPlugin) {
				const jwtPluginOptions = getJwtPlugin(ctx)?.options;
				const issuer = jwtPluginOptions?.jwt?.issuer ?? ctx.baseURL;
				const isDynamicBaseURLInit = jwtPluginOptions?.jwt?.issuer == null && typeof ctx.options.baseURL === "object" && ctx.options.baseURL !== null && "allowedHosts" in ctx.options.baseURL;
				let issuerPath;
				try {
					issuerPath = new URL(issuer).pathname;
				} catch (error) {
					if (isDynamicBaseURLInit && issuer === "") return;
					throw error;
				}
				if (!opts.silenceWarnings?.oauthAuthServerConfig && !(ctx.options.basePath === "/" && issuerPath === "/")) logger.warn(`Please ensure '/.well-known/oauth-authorization-server${issuerPath === "/" ? "" : issuerPath}' exists. Upon completion, clear with silenceWarnings.oauthAuthServerConfig.`);
				if (!opts.silenceWarnings?.openidConfig && ctx.options.basePath !== issuerPath && opts.scopes?.includes("openid")) logger.warn(`Please ensure '${issuerPath}${issuerPath.endsWith("/") ? "" : "/"}.well-known/openid-configuration' exists. Upon completion, clear with silenceWarnings.openidConfig.`);
			}
		},
		hooks: {
			before: [{
				matcher(ctx) {
					return ctx.body?.oauth_query;
				},
				handler: createAuthMiddleware(async (ctx) => {
					const query = ctx.body.oauth_query;
					if (!await verifyOAuthQueryParams(query, ctx.context.secret)) throw new APIError$1("BAD_REQUEST", { error: "invalid_signature" });
					const signedQueryIssuedAt = getSignedQueryIssuedAt(query);
					const queryParams = new URLSearchParams(query);
					const postLoginClearedForSession = queryParams.get("ba_pl") ?? void 0;
					queryParams.delete("sig");
					queryParams.delete("exp");
					queryParams.delete(signedQueryIssuedAtParam);
					queryParams.delete(postLoginClearedParam);
					await oAuthState.set({
						query: queryParams.toString(),
						signedQueryIssuedAt: signedQueryIssuedAt ?? void 0,
						postLoginClearedForSession
					});
					if (ctx.path === "/sign-in/social" || ctx.path === "/sign-in/oauth2") {
						if (ctx.body.additionalData?.query) return;
						if (!ctx.body.additionalData) ctx.body.additionalData = {};
						ctx.body.additionalData.query = queryParams.toString();
					}
				})
			}],
			after: [{
				matcher(ctx) {
					return parseSetCookieHeader(ctx.context.responseHeaders?.get("set-cookie") || "").has(ctx.context.authCookies.sessionToken.name);
				},
				handler: createAuthMiddleware(async (ctx) => {
					const sessionToken = parseSetCookieHeader(ctx.context.responseHeaders?.get("set-cookie") || "").get(ctx.context.authCookies.sessionToken.name)?.value.split(".")[0];
					if (!sessionToken) return;
					const _query = (await oAuthState.get())?.query ?? (await getOAuthState())?.query;
					if (!_query) return;
					const query = new URLSearchParams(_query);
					const session = await ctx.context.internalAdapter.findSession(sessionToken);
					if (!session) return;
					ctx.context.session = session;
					const secFetchMode = ctx.request?.headers?.get("sec-fetch-mode")?.toLowerCase();
					const acceptHeader = ctx.request?.headers?.get("accept")?.toLowerCase() ?? "";
					if (!(secFetchMode === "navigate" || !secFetchMode && (acceptHeader.includes("text/html") || acceptHeader.includes("application/xhtml+xml")))) ctx.headers?.set("accept", "application/json");
					ctx.query = searchParamsToQuery(removePromptFromQuery(query, "login"));
					return await authorizeEndpoint(ctx, opts);
				})
			}]
		},
		endpoints: {
			getOAuthServerConfig: createAuthEndpoint("/.well-known/oauth-authorization-server", {
				method: "GET",
				metadata: { SERVER_ONLY: true }
			}, async (ctx) => {
				if (opts.scopes && opts.scopes.includes("openid")) return oidcServerMetadata(ctx, opts);
				else return authServerMetadata(ctx, opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context)?.options, {
					scopes_supported: opts.advertisedMetadata?.scopes_supported ?? opts.scopes,
					public_client_supported: opts.allowUnauthenticatedClientRegistration,
					grant_types_supported: opts.grantTypes,
					jwt_disabled: opts.disableJwtPlugin
				});
			}),
			getOpenIdConfig: createAuthEndpoint("/.well-known/openid-configuration", {
				method: "GET",
				metadata: { SERVER_ONLY: true }
			}, async (ctx) => {
				if (opts.scopes && !opts.scopes.includes("openid")) throw new APIError$1("NOT_FOUND");
				return oidcServerMetadata(ctx, opts);
			}),
			oauth2Authorize: createAuthEndpoint("/oauth2/authorize", {
				method: "GET",
				query: object({
					response_type: _enum(["code"]).optional(),
					client_id: string(),
					redirect_uri: SafeUrlSchema.optional(),
					scope: string().optional(),
					state: string().optional(),
					request_uri: string().optional(),
					code_challenge: string().optional(),
					code_challenge_method: _enum(["S256"]).optional(),
					nonce: string().optional(),
					prompt: _enum([
						"none",
						"consent",
						"login",
						"create",
						"select_account",
						"login consent",
						"select_account consent"
					]).optional()
				}),
				metadata: { openapi: {
					description: "Authorize an OAuth2 request",
					parameters: [
						{
							name: "response_type",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "OAuth2 response type (e.g., 'code')"
						},
						{
							name: "client_id",
							in: "query",
							required: true,
							schema: { type: "string" },
							description: "OAuth2 client ID"
						},
						{
							name: "redirect_uri",
							in: "query",
							required: false,
							schema: {
								type: "string",
								format: "uri"
							},
							description: "OAuth2 redirect URI"
						},
						{
							name: "scope",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "OAuth2 scopes (space-separated)"
						},
						{
							name: "state",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "OAuth2 state parameter"
						},
						{
							name: "request_uri",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "Pushed Authorization Request URI referencing stored parameters"
						},
						{
							name: "code_challenge",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "PKCE code challenge"
						},
						{
							name: "code_challenge_method",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "PKCE code challenge method"
						},
						{
							name: "nonce",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "OpenID Connect nonce"
						},
						{
							name: "prompt",
							in: "query",
							required: false,
							schema: { type: "string" },
							description: "OAuth2 prompt parameter"
						}
					],
					responses: {
						"302": {
							description: "Redirect to client with code or error",
							headers: { Location: {
								description: "Redirect URI with code or error",
								schema: {
									type: "string",
									format: "uri"
								}
							} }
						},
						"400": {
							description: "Invalid request",
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									error: { type: "string" },
									error_description: { type: "string" },
									state: { type: "string" }
								},
								required: ["error"]
							} } }
						}
					}
				} }
			}, async (ctx) => {
				return authorizeEndpoint(ctx, opts, { isAuthorize: true });
			}),
			oauth2Consent: createAuthEndpoint("/oauth2/consent", {
				method: "POST",
				body: object({
					accept: boolean().meta({ description: "Accept or deny user consent for a set of scopes" }),
					scope: string().optional().meta({ description: "List of accept of accepted space-separated scopes. If none is provided, then all originally requested scopes are accepted." }),
					oauth_query: string().optional().meta({ description: "The redirected page's query parameters" })
				}),
				use: [sessionMiddleware],
				metadata: { openapi: {
					description: "Handle OAuth2 consent",
					responses: { "200": {
						description: "Consent processed successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: { redirect_uri: {
								type: "string",
								format: "uri",
								description: "The URI to redirect to, either with an authorization code or an error"
							} },
							required: ["redirect_uri"]
						} } }
					} }
				} }
			}, async (ctx) => {
				return consentEndpoint(ctx, opts);
			}),
			oauth2Continue: createAuthEndpoint("/oauth2/continue", {
				method: "POST",
				body: object({
					selected: boolean().optional().meta({ description: "Confirms an account has been selected and authorization can proceed." }),
					created: boolean().optional().meta({ description: "Confirms an account was registered" }),
					postLogin: boolean().optional().meta({ description: "Confirms organization and/or team selection." }),
					oauth_query: string().optional().meta({ description: "The redirected page's query parameters" })
				}),
				use: [sessionMiddleware],
				metadata: { openapi: {
					description: "Continues OAuth2 authorization flow",
					responses: { "200": {
						description: "Consent processed successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: { redirect_uri: {
								type: "string",
								format: "uri",
								description: "The URI to redirect to, either with an authorization code or an error"
							} },
							required: ["redirect_uri"]
						} } }
					} }
				} }
			}, async (ctx) => {
				return continueEndpoint(ctx, opts);
			}),
			oauth2Token: createAuthEndpoint("/oauth2/token", {
				method: "POST",
				body: object({
					grant_type: _enum([
						"authorization_code",
						"client_credentials",
						"refresh_token"
					]),
					client_id: string().optional(),
					client_secret: string().optional(),
					code: string().optional(),
					code_verifier: string().optional(),
					redirect_uri: SafeUrlSchema.optional(),
					refresh_token: string().optional(),
					resource: string().optional(),
					scope: string().optional()
				}),
				metadata: {
					allowedMediaTypes: ["application/x-www-form-urlencoded"],
					openapi: {
						description: "Obtain an OAuth2.1 access token",
						requestBody: {
							required: true,
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									grant_type: {
										type: "string",
										enum: [
											"authorization_code",
											"client_credentials",
											"refresh_token"
										],
										description: "OAuth2 grant type"
									},
									client_id: {
										type: "string",
										description: "OAuth2 client ID"
									},
									client_secret: {
										type: "string",
										description: "OAuth2 client secret"
									},
									code: {
										type: "string",
										description: "Authorization code (for authorization_code grant)"
									},
									code_verifier: {
										type: "string",
										description: "PKCE code verifier (for authorization_code grant)"
									},
									redirect_uri: {
										type: "string",
										format: "uri",
										description: "Redirect URI (for authorization_code grant)"
									},
									refresh_token: {
										type: "string",
										description: "Refresh token (for refresh_token grant)"
									},
									resource: {
										type: "string",
										description: "Requested token resource (ie audience) to obtain a JWT formatted access token"
									},
									scope: {
										type: "string",
										description: "Requested scopes (for client_credentials grant)"
									}
								},
								required: ["grant_type"]
							} } }
						},
						responses: {
							"200": {
								description: "Access token response",
								content: { "application/json": { schema: {
									type: "object",
									properties: {
										access_token: {
											type: "string",
											description: "The access token issued by the authorization server"
										},
										token_type: {
											type: "string",
											description: "The type of the token issued",
											enum: ["Bearer"]
										},
										expires_in: {
											type: "number",
											description: "Lifetime in seconds of the access token"
										},
										refresh_token: {
											type: "string",
											description: "Refresh token, if issued"
										},
										scope: {
											type: "string",
											description: "Scopes granted by the access token"
										},
										id_token: {
											type: "string",
											description: "ID Token (if OpenID Connect)"
										}
									},
									required: [
										"access_token",
										"token_type",
										"expires_in"
									]
								} } }
							},
							"400": {
								description: "Invalid request or error response",
								content: { "application/json": { schema: {
									type: "object",
									properties: {
										error: { type: "string" },
										error_description: { type: "string" },
										error_uri: { type: "string" }
									},
									required: ["error"]
								} } }
							}
						}
					}
				}
			}, async (ctx) => {
				return tokenEndpoint(ctx, opts);
			}),
			oauth2Introspect: createAuthEndpoint("/oauth2/introspect", {
				method: "POST",
				body: object({
					client_id: string().optional(),
					client_secret: string().optional(),
					token: string(),
					token_type_hint: _enum(["access_token", "refresh_token"]).optional()
				}),
				metadata: {
					allowedMediaTypes: ["application/x-www-form-urlencoded"],
					openapi: {
						description: "Introspect an OAuth2 access or refresh token",
						requestBody: {
							required: true,
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									client_id: {
										type: "string",
										description: "OAuth2 client ID"
									},
									client_secret: {
										type: "string",
										description: "OAuth2 client secret"
									},
									token: {
										type: "string",
										description: "The token to introspect (access or refresh token)"
									},
									token_type_hint: {
										type: "string",
										enum: ["access_token", "refresh_token"],
										description: "Hint about the type of the token submitted for introspection"
									},
									resource: {
										type: "string",
										description: "Introspects a token for a specific resource."
									}
								},
								required: ["token"]
							} } }
						},
						responses: {
							"200": {
								description: "Token introspection response",
								content: { "application/json": { schema: {
									type: "object",
									properties: {
										active: {
											type: "boolean",
											description: "Whether the token is active"
										},
										scope: {
											type: "string",
											description: "Scopes associated with the token"
										},
										client_id: {
											type: "string",
											description: "Client ID associated with the token"
										},
										username: {
											type: "string",
											description: "Username associated with the token"
										},
										token_type: {
											type: "string",
											description: "Type of the token"
										},
										exp: {
											type: "number",
											description: "Expiration time of the token (seconds since epoch)"
										},
										iat: {
											type: "number",
											description: "Issued at time (seconds since epoch)"
										},
										nbf: {
											type: "number",
											description: "Not before time (seconds since epoch)"
										},
										sub: {
											type: "string",
											description: "Subject of the token"
										},
										aud: {
											type: "string",
											description: "Audience of the token"
										},
										iss: {
											type: "string",
											description: "Issuer of the token"
										},
										jti: {
											type: "string",
											description: "JWT ID"
										}
									},
									required: ["active"]
								} } }
							},
							"400": {
								description: "Invalid request or error response",
								content: { "application/json": { schema: {
									type: "object",
									properties: {
										error: { type: "string" },
										error_description: { type: "string" },
										error_uri: { type: "string" }
									},
									required: ["error"]
								} } }
							}
						}
					}
				}
			}, async (ctx) => {
				return introspectEndpoint(ctx, opts);
			}),
			oauth2Revoke: createAuthEndpoint("/oauth2/revoke", {
				method: "POST",
				body: object({
					client_id: string().optional(),
					client_secret: string().optional(),
					token: string(),
					token_type_hint: _enum(["access_token", "refresh_token"]).optional()
				}),
				metadata: {
					allowedMediaTypes: ["application/x-www-form-urlencoded"],
					openapi: {
						description: "Revoke an OAuth2 access or refresh token",
						requestBody: {
							required: true,
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									client_id: {
										type: "string",
										description: "OAuth2 client ID"
									},
									client_secret: {
										type: "string",
										description: "OAuth2 client secret"
									},
									token: {
										type: "string",
										description: "The token to revoke (access or refresh token)"
									},
									token_type_hint: {
										type: "string",
										enum: ["access_token", "refresh_token"],
										description: "Hint about the type of the token submitted for revocation"
									}
								},
								required: ["token"]
							} } }
						},
						responses: {
							"200": {
								description: "Token revoked successfully. The response body is empty.",
								content: { "application/json": { schema: {
									type: "object",
									description: "Empty object on success"
								} } }
							},
							"400": {
								description: "Invalid request or error response",
								content: { "application/json": { schema: {
									type: "object",
									properties: {
										error: { type: "string" },
										error_description: { type: "string" },
										error_uri: { type: "string" }
									},
									required: ["error"]
								} } }
							}
						}
					}
				}
			}, async (ctx) => {
				return revokeEndpoint(ctx, opts);
			}),
			oauth2UserInfo: createAuthEndpoint("/oauth2/userinfo", {
				method: "GET",
				metadata: { openapi: {
					description: "Get OpenID Connect user information (UserInfo endpoint)",
					security: [{ bearerAuth: [] }, { OAuth2: [
						"openid",
						"profile",
						"email"
					] }],
					parameters: [{
						name: "Authorization",
						in: "header",
						required: false,
						schema: { type: "string" },
						description: "Bearer access token"
					}],
					responses: {
						"200": {
							description: "User information retrieved successfully",
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									sub: {
										type: "string",
										description: "Subject identifier (user ID)"
									},
									email: {
										type: "string",
										format: "email",
										nullable: true,
										description: "User's email address, included if 'email' scope is granted"
									},
									name: {
										type: "string",
										nullable: true,
										description: "User's full name, included if 'profile' scope is granted"
									},
									picture: {
										type: "string",
										format: "uri",
										nullable: true,
										description: "User's profile picture URL, included if 'profile' scope is granted"
									},
									given_name: {
										type: "string",
										nullable: true,
										description: "User's given name, included if 'profile' scope is granted"
									},
									family_name: {
										type: "string",
										nullable: true,
										description: "User's family name, included if 'profile' scope is granted"
									},
									email_verified: {
										type: "boolean",
										nullable: true,
										description: "Whether the email is verified, included if 'email' scope is granted"
									}
								},
								required: ["sub"]
							} } }
						},
						"401": {
							description: "Unauthorized - invalid or missing access token",
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									error: { type: "string" },
									error_description: { type: "string" }
								},
								required: ["error"]
							} } }
						},
						"403": {
							description: "Forbidden - insufficient scope",
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									error: { type: "string" },
									error_description: { type: "string" }
								},
								required: ["error"]
							} } }
						}
					}
				} }
			}, async (ctx) => {
				return userInfoEndpoint(ctx, opts);
			}),
			oauth2EndSession: createAuthEndpoint("/oauth2/end-session", {
				method: "GET",
				query: object({
					id_token_hint: string(),
					client_id: string().optional(),
					post_logout_redirect_uri: SafeUrlSchema.optional(),
					state: string().optional()
				}),
				metadata: { openapi: {
					description: "RP-Initiated Logout endpoint. Allows clients to notify the OP that the End-User has logged out.",
					responses: { "200": {
						description: "Logout successful. May include redirect_uri if post_logout_redirect_uri was provided.",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								redirect_uri: {
									type: "string",
									format: "uri",
									description: "URI to redirect to after logout (if post_logout_redirect_uri was provided)"
								},
								message: {
									type: "string",
									description: "Success message"
								}
							}
						} } }
					} }
				} }
			}, async (ctx) => {
				return rpInitiatedLogoutEndpoint(ctx, opts);
			}),
			registerOAuthClient: createAuthEndpoint("/oauth2/register", {
				method: "POST",
				body: object({
					redirect_uris: array(SafeUrlSchema).min(1).min(1),
					scope: string().optional(),
					client_name: string().optional(),
					client_uri: string().optional(),
					logo_uri: string().optional(),
					contacts: array(string().min(1)).min(1).optional(),
					tos_uri: string().optional(),
					policy_uri: string().optional(),
					software_id: string().optional(),
					software_version: string().optional(),
					software_statement: string().optional(),
					post_logout_redirect_uris: array(SafeUrlSchema).min(1).optional(),
					token_endpoint_auth_method: _enum([
						"none",
						"client_secret_basic",
						"client_secret_post"
					]).default("client_secret_basic").optional(),
					grant_types: array(_enum([
						"authorization_code",
						"client_credentials",
						"refresh_token"
					])).default(["authorization_code"]).optional(),
					response_types: array(_enum(["code"])).default(["code"]).optional(),
					type: _enum([
						"web",
						"native",
						"user-agent-based"
					]).optional(),
					subject_type: _enum(["public", "pairwise"]).optional(),
					skip_consent: never({ error: "skip_consent cannot be set during dynamic client registration" }).optional()
				}),
				metadata: { openapi: {
					description: "Register an OAuth2 application",
					responses: { "200": {
						description: "OAuth2 application registered successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								client_id: {
									type: "string",
									description: "Unique identifier for the client"
								},
								client_secret: {
									type: "string",
									description: "Secret key for the client"
								},
								client_secret_expires_at: {
									type: "number",
									description: "Time the client secret will expire. If 0, the client secret will never expire."
								},
								scope: {
									type: "string",
									description: "Space-separated scopes allowed by the client"
								},
								user_id: {
									type: "string",
									description: "ID of the user who registered the client, null if registered anonymously"
								},
								client_id_issued_at: {
									type: "number",
									description: "Creation timestamp of this client"
								},
								client_name: {
									type: "string",
									description: "Name of the OAuth2 application"
								},
								client_uri: {
									type: "string",
									description: "Name of the OAuth2 application"
								},
								logo_uri: {
									type: "string",
									description: "Icon URL for the application"
								},
								contacts: {
									type: "array",
									items: { type: "string" },
									description: "List representing ways to contact people responsible for this client, typically email addresses"
								},
								tos_uri: {
									type: "string",
									description: "Client's terms of service uri"
								},
								policy_uri: {
									type: "string",
									description: "Client's policy uri"
								},
								software_id: {
									type: "string",
									description: "Unique identifier assigned by the developer to help in the dynamic registration process"
								},
								software_version: {
									type: "string",
									description: "Version identifier for the software_id"
								},
								software_statement: {
									type: "string",
									description: "JWT containing metadata values about the client software as claims"
								},
								redirect_uris: {
									type: "array",
									items: {
										type: "string",
										format: "uri"
									},
									description: "List of allowed redirect uris"
								},
								post_logout_redirect_uris: {
									type: "array",
									items: {
										type: "string",
										format: "uri"
									},
									description: "List of allowed logout redirect uris"
								},
								token_endpoint_auth_method: {
									type: "string",
									description: "Requested authentication method for the token endpoint",
									enum: [
										"none",
										"client_secret_basic",
										"client_secret_post"
									]
								},
								grant_types: {
									type: "array",
									items: {
										type: "string",
										enum: [
											"authorization_code",
											"client_credentials",
											"refresh_token"
										]
									},
									description: "Requested authentication method for the token endpoint"
								},
								response_types: {
									type: "array",
									items: {
										type: "string",
										enum: ["code"]
									},
									description: "Requested authentication method for the token endpoint"
								},
								public: {
									type: "boolean",
									description: "Whether the client is public as determined by the type"
								},
								type: {
									type: "string",
									description: "Type of the client",
									enum: [
										"web",
										"native",
										"user-agent-based"
									]
								},
								disabled: {
									type: "boolean",
									description: "Whether the client is disabled"
								}
							},
							required: ["client_id"]
						} } }
					} }
				} }
			}, async (ctx) => {
				return registerEndpoint(ctx, opts);
			}),
			adminCreateOAuthClient: adminCreateOAuthClient(opts),
			createOAuthClient: createOAuthClient(opts),
			getOAuthClient: getOAuthClient(opts),
			getOAuthClientPublic: getOAuthClientPublic(opts),
			getOAuthClientPublicPrelogin: getOAuthClientPublicPrelogin(opts),
			getOAuthClients: getOAuthClients(opts),
			adminUpdateOAuthClient: adminUpdateOAuthClient(opts),
			updateOAuthClient: updateOAuthClient(opts),
			rotateClientSecret: rotateClientSecret(opts),
			deleteOAuthClient: deleteOAuthClient(opts),
			getOAuthConsent: getOAuthConsent(opts),
			getOAuthConsents: getOAuthConsents(opts),
			updateOAuthConsent: updateOAuthConsent(opts),
			deleteOAuthConsent: deleteOAuthConsent(opts)
		},
		schema: mergeSchema(schema, opts?.schema),
		rateLimit: [
			...opts.rateLimit?.token !== false ? [{
				pathMatcher: (path) => path === "/oauth2/token",
				window: opts.rateLimit?.token?.window ?? 60,
				max: opts.rateLimit?.token?.max ?? 20
			}] : [],
			...opts.rateLimit?.authorize !== false ? [{
				pathMatcher: (path) => path === "/oauth2/authorize",
				window: opts.rateLimit?.authorize?.window ?? 60,
				max: opts.rateLimit?.authorize?.max ?? 30
			}] : [],
			...opts.rateLimit?.introspect !== false ? [{
				pathMatcher: (path) => path === "/oauth2/introspect",
				window: opts.rateLimit?.introspect?.window ?? 60,
				max: opts.rateLimit?.introspect?.max ?? 100
			}] : [],
			...opts.rateLimit?.revoke !== false ? [{
				pathMatcher: (path) => path === "/oauth2/revoke",
				window: opts.rateLimit?.revoke?.window ?? 60,
				max: opts.rateLimit?.revoke?.max ?? 30
			}] : [],
			...opts.rateLimit?.register !== false ? [{
				pathMatcher: (path) => path === "/oauth2/register",
				window: opts.rateLimit?.register?.window ?? 60,
				max: opts.rateLimit?.register?.max ?? 5
			}] : [],
			...opts.rateLimit?.userinfo !== false ? [{
				pathMatcher: (path) => path === "/oauth2/userinfo",
				window: opts.rateLimit?.userinfo?.window ?? 60,
				max: opts.rateLimit?.userinfo?.max ?? 60
			}] : []
		]
	};
};
/**
* Formats an error url
*/
function formatErrorURL(url, error, description, state, iss) {
	const searchParams = new URLSearchParams({
		error,
		error_description: description
	});
	state && searchParams.append("state", state);
	iss && searchParams.append("iss", iss);
	return `${url}${url.includes("?") ? "&" : "?"}${searchParams.toString()}`;
}
var handleRedirect = (ctx, uri) => {
	const fromFetch = isBrowserFetchRequest(ctx.request?.headers);
	const acceptJson = ctx.headers?.get("accept")?.includes("application/json");
	if (fromFetch || acceptJson) return {
		redirect: true,
		url: uri.toString()
	};
	else throw ctx.redirect(uri);
};
function redirectWithPromptNoneError(ctx, opts, query, error, description) {
	return handleRedirect(ctx, formatErrorURL(query.redirect_uri, error, description, query.state, getIssuer(ctx, opts)));
}
/**
* Validates that the issuer URL
* - MUST use HTTPS scheme (HTTP allowed for localhost in dev)
* - MUST NOT contain query components
* - MUST NOT contain fragment components
*
* @returns The validated issuer URL, or a sanitized version if invalid
*/
function validateIssuerUrl(issuer) {
	try {
		const url = new URL(issuer);
		if (url.protocol !== "https:" && !isLoopbackHost(url.host)) url.protocol = "https:";
		url.search = "";
		url.hash = "";
		return url.toString().replace(/\/$/, "");
	} catch {
		return issuer;
	}
}
/**
* Gets the issuer identifier
*/
function getIssuer(ctx, opts) {
	let issuer;
	if (opts.disableJwtPlugin) issuer = ctx.context.baseURL;
	else try {
		issuer = getJwtPlugin(ctx.context).options?.jwt?.issuer ?? ctx.context.baseURL;
	} catch {
		issuer = ctx.context.baseURL;
	}
	return validateIssuerUrl(issuer);
}
/**
* Error page url if redirect_uri has not been verified yet
* Generates Url for custom error page
*/
function getErrorURL(ctx, error, description) {
	return formatErrorURL(ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`, error, description);
}
async function authorizeEndpoint(ctx, opts, settings) {
	if (opts.grantTypes && !opts.grantTypes.includes("authorization_code")) throw new APIError("NOT_FOUND");
	if (!ctx.request) throw new APIError("UNAUTHORIZED", {
		error_description: "request not found",
		error: "invalid_request"
	});
	let query = ctx.query;
	if (query.request_uri) {
		if (!opts.requestUriResolver) return handleRedirect(ctx, getErrorURL(ctx, "invalid_request_uri", "request_uri not supported"));
		const resolvedParams = await opts.requestUriResolver({
			requestUri: query.request_uri,
			clientId: query.client_id ?? "",
			ctx
		});
		if (!resolvedParams) return handleRedirect(ctx, getErrorURL(ctx, "invalid_request_uri", "request_uri is invalid or expired"));
		const urlClientId = query.client_id;
		query = resolvedParams;
		if (urlClientId) query.client_id = urlClientId;
	}
	ctx.query = query;
	await oAuthState.set({ query: serializeAuthorizationQuery(query).toString() });
	if (!query.client_id) return handleRedirect(ctx, getErrorURL(ctx, "invalid_client", "client_id is required"));
	if (!query.response_type) return handleRedirect(ctx, getErrorURL(ctx, "invalid_request", "response_type is required"));
	const promptSet = ctx.query?.prompt ? parsePrompt(ctx.query?.prompt) : void 0;
	const promptNone = promptSet?.has("none") ?? false;
	if (promptSet?.has("select_account") && !opts.selectAccount?.page) return handleRedirect(ctx, getErrorURL(ctx, `unsupported_prompt_select_account`, "unsupported prompt type"));
	if (!(query.response_type === "code")) return handleRedirect(ctx, getErrorURL(ctx, "unsupported_response_type", "unsupported response type"));
	const client = await getClient(ctx, opts, query.client_id);
	if (!client) return handleRedirect(ctx, getErrorURL(ctx, "invalid_client", "client_id is required"));
	if (client.disabled) return handleRedirect(ctx, getErrorURL(ctx, "client_disabled", "client is disabled"));
	if (!client.redirectUris?.find((url) => {
		if (url === query.redirect_uri) return true;
		try {
			const registered = new URL(url);
			const requested = new URL(query.redirect_uri);
			if (isLoopbackIP(registered.hostname) && registered.hostname === requested.hostname && registered.pathname === requested.pathname && registered.protocol === requested.protocol && registered.search === requested.search) return true;
		} catch {}
		return false;
	}) || !query.redirect_uri) return handleRedirect(ctx, getErrorURL(ctx, "invalid_redirect", "invalid redirect uri"));
	let requestedScopes = query.scope?.split(" ").filter((s) => s);
	if (requestedScopes) {
		const validScopes = new Set(client.scopes ?? opts.scopes);
		const invalidScopes = requestedScopes.filter((scope) => {
			return !validScopes?.has(scope);
		});
		if (invalidScopes.length) return handleRedirect(ctx, formatErrorURL(query.redirect_uri, "invalid_scope", `The following scopes are invalid: ${invalidScopes.join(", ")}`, query.state, getIssuer(ctx, opts)));
	}
	if (!requestedScopes) {
		requestedScopes = client.scopes ?? opts.scopes ?? [];
		query.scope = requestedScopes.join(" ");
	}
	const pkceRequired = isPKCERequired(client, requestedScopes);
	if (pkceRequired) {
		if (!query.code_challenge || !query.code_challenge_method) return handleRedirect(ctx, formatErrorURL(query.redirect_uri, "invalid_request", pkceRequired.valueOf(), query.state, getIssuer(ctx, opts)));
	}
	if (query.code_challenge || query.code_challenge_method) {
		if (!query.code_challenge || !query.code_challenge_method) return handleRedirect(ctx, formatErrorURL(query.redirect_uri, "invalid_request", "code_challenge and code_challenge_method must both be provided", query.state, getIssuer(ctx, opts)));
		if (!["S256"].includes(query.code_challenge_method)) return handleRedirect(ctx, formatErrorURL(query.redirect_uri, "invalid_request", "invalid code_challenge method, only S256 is supported", query.state, getIssuer(ctx, opts)));
	}
	const session = await getSessionFromCtx(ctx);
	if (!session || promptSet?.has("login") || promptSet?.has("create")) {
		if (promptNone) return redirectWithPromptNoneError(ctx, opts, query, "login_required", "authentication required");
		return redirectWithPromptCode(ctx, opts, promptSet?.has("create") ? "create" : "login");
	}
	if (settings?.isAuthorize && promptSet?.has("select_account")) return redirectWithPromptCode(ctx, opts, "select_account");
	if (settings?.isAuthorize && opts.selectAccount) {
		if (await opts.selectAccount.shouldRedirect({
			headers: ctx.request.headers,
			user: session.user,
			session: session.session,
			scopes: requestedScopes
		})) {
			if (promptNone) return redirectWithPromptNoneError(ctx, opts, query, "account_selection_required", "End-User account selection is required");
			return redirectWithPromptCode(ctx, opts, "select_account");
		}
	}
	if (opts.signup?.shouldRedirect) {
		const signupRedirect = await opts.signup.shouldRedirect({
			headers: ctx.request.headers,
			user: session.user,
			session: session.session,
			scopes: requestedScopes
		});
		if (signupRedirect) {
			if (promptNone) return redirectWithPromptNoneError(ctx, opts, query, "interaction_required", "End-User interaction is required");
			return redirectWithPromptCode(ctx, opts, "create", { page: typeof signupRedirect === "string" ? signupRedirect : void 0 });
		}
	}
	if (!settings?.postLogin && opts.postLogin) {
		if (await opts.postLogin.shouldRedirect({
			headers: ctx.request.headers,
			user: session.user,
			session: session.session,
			scopes: requestedScopes
		})) {
			if (promptNone) return redirectWithPromptNoneError(ctx, opts, query, "interaction_required", "End-User interaction is required");
			return redirectWithPromptCode(ctx, opts, "post_login");
		}
	}
	if (promptSet?.has("consent")) return redirectWithPromptCode(ctx, opts, "consent", { sessionId: session.session.id });
	const referenceId = await opts.postLogin?.consentReferenceId?.({
		user: session.user,
		session: session.session,
		scopes: requestedScopes
	});
	if (client.skipConsent) return redirectWithAuthorizationCode(ctx, opts, {
		query,
		clientId: client.clientId,
		userId: session.user.id,
		sessionId: session.session.id,
		authTime: new Date(session.session.createdAt).getTime(),
		referenceId
	});
	const consent = await ctx.context.adapter.findOne({
		model: "oauthConsent",
		where: [
			{
				field: "clientId",
				value: client.clientId
			},
			{
				field: "userId",
				value: session.user.id
			},
			...referenceId ? [{
				field: "referenceId",
				value: referenceId
			}] : []
		]
	});
	if (!consent || !requestedScopes.every((val) => consent.scopes.includes(val))) {
		if (promptNone) return redirectWithPromptNoneError(ctx, opts, query, "consent_required", "End-User consent is required");
		return redirectWithPromptCode(ctx, opts, "consent", { sessionId: session.session.id });
	}
	return redirectWithAuthorizationCode(ctx, opts, {
		query,
		clientId: client.clientId,
		userId: session.user.id,
		sessionId: session.session.id,
		authTime: new Date(session.session.createdAt).getTime(),
		referenceId
	});
}
function serializeAuthorizationQuery(query) {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(query)) {
		if (value == null) continue;
		if (Array.isArray(value)) for (const v of value) params.append(key, String(v));
		else params.set(key, String(value));
	}
	return params;
}
async function redirectWithAuthorizationCode(ctx, opts, verificationValue) {
	const code = generateRandomString(32, "a-z", "A-Z", "0-9");
	const iat = Math.floor(Date.now() / 1e3);
	const exp = iat + (opts.codeExpiresIn ?? 600);
	const data = {
		identifier: await storeToken(opts.storeTokens, code, "authorization_code"),
		updatedAt: /* @__PURE__ */ new Date(iat * 1e3),
		expiresAt: /* @__PURE__ */ new Date(exp * 1e3),
		value: JSON.stringify({
			type: "authorization_code",
			query: verificationValue.query,
			userId: verificationValue.userId,
			sessionId: verificationValue?.sessionId,
			referenceId: verificationValue.referenceId,
			authTime: verificationValue.authTime
		})
	};
	await ctx.context.internalAdapter.createVerificationValue({
		...data,
		createdAt: /* @__PURE__ */ new Date(iat * 1e3)
	});
	const redirectUriWithCode = new URL(verificationValue.query.redirect_uri);
	redirectUriWithCode.searchParams.set("code", code);
	if (verificationValue.query.state) redirectUriWithCode.searchParams.set("state", verificationValue.query.state);
	redirectUriWithCode.searchParams.set("iss", getIssuer(ctx, opts));
	return handleRedirect(ctx, redirectUriWithCode.toString());
}
async function redirectWithPromptCode(ctx, opts, type, options) {
	const queryParams = await signParams(ctx, opts, { postLoginClearedForSession: type === "consent" && opts.postLogin ? options?.sessionId : void 0 });
	let path = opts.loginPage;
	if (type === "select_account") path = opts.selectAccount?.page ?? opts.loginPage;
	else if (type === "post_login") {
		if (!opts.postLogin?.page) throw new APIError("INTERNAL_SERVER_ERROR", { error_description: "postLogin should have been defined" });
		path = opts.postLogin?.page;
	} else if (type === "consent") path = opts.consentPage;
	else if (type === "create") path = opts.signup?.page ?? opts.loginPage;
	return handleRedirect(ctx, `${options?.page ?? path}?${queryParams}`);
}
async function signParams(ctx, opts, flags) {
	const issuedAt = Date.now();
	const exp = Math.floor(issuedAt / 1e3) + (opts.codeExpiresIn ?? 600);
	const params = serializeAuthorizationQuery(ctx.query);
	params.set("exp", String(exp));
	params.set(signedQueryIssuedAtParam, String(issuedAt));
	params.delete(postLoginClearedParam);
	if (flags?.postLoginClearedForSession) params.set(postLoginClearedParam, flags.postLoginClearedForSession);
	const signature = await makeSignature(params.toString(), ctx.context.secret);
	params.append("sig", signature);
	return params.toString();
}
function authServerMetadata(ctx, opts, overrides) {
	const baseURL = ctx.context.baseURL;
	return {
		scopes_supported: overrides?.scopes_supported,
		issuer: validateIssuerUrl(opts?.jwt?.issuer ?? baseURL),
		authorization_endpoint: `${baseURL}/oauth2/authorize`,
		token_endpoint: `${baseURL}/oauth2/token`,
		jwks_uri: overrides?.jwt_disabled ? void 0 : opts?.jwks?.remoteUrl ?? `${baseURL}${opts?.jwks?.jwksPath ?? "/jwks"}`,
		registration_endpoint: `${baseURL}/oauth2/register`,
		introspection_endpoint: `${baseURL}/oauth2/introspect`,
		revocation_endpoint: `${baseURL}/oauth2/revoke`,
		response_types_supported: overrides?.grant_types_supported && !overrides.grant_types_supported.includes("authorization_code") ? [] : ["code"],
		response_modes_supported: ["query"],
		grant_types_supported: overrides?.grant_types_supported ?? [
			"authorization_code",
			"client_credentials",
			"refresh_token"
		],
		token_endpoint_auth_methods_supported: [
			...overrides?.public_client_supported ? ["none"] : [],
			"client_secret_basic",
			"client_secret_post"
		],
		introspection_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
		revocation_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
		code_challenge_methods_supported: ["S256"],
		authorization_response_iss_parameter_supported: true
	};
}
function oidcServerMetadata(ctx, opts) {
	const baseURL = ctx.context.baseURL;
	const jwtPluginOptions = opts.disableJwtPlugin ? void 0 : getJwtPlugin(ctx.context).options;
	return {
		...authServerMetadata(ctx, jwtPluginOptions, {
			scopes_supported: opts.advertisedMetadata?.scopes_supported ?? opts.scopes,
			public_client_supported: opts.allowUnauthenticatedClientRegistration,
			grant_types_supported: opts.grantTypes,
			jwt_disabled: opts.disableJwtPlugin
		}),
		claims_supported: opts?.advertisedMetadata?.claims_supported ?? opts?.claims ?? [],
		userinfo_endpoint: `${baseURL}/oauth2/userinfo`,
		subject_types_supported: opts.pairwiseSecret ? ["public", "pairwise"] : ["public"],
		id_token_signing_alg_values_supported: jwtPluginOptions?.jwks?.keyPairConfig?.alg ? [jwtPluginOptions?.jwks?.keyPairConfig?.alg] : opts.disableJwtPlugin ? ["HS256"] : ["EdDSA"],
		end_session_endpoint: `${baseURL}/oauth2/end-session`,
		acr_values_supported: ["urn:mace:incommon:iap:bronze"],
		prompt_values_supported: [
			"login",
			"consent",
			"create",
			"select_account",
			"none"
		]
	};
}
var METADATA_CACHE_CONTROL = "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400";
function metadataResponse(body, extraHeaders) {
	const headers = new Headers(extraHeaders);
	if (!headers.has("Cache-Control")) headers.set("Cache-Control", METADATA_CACHE_CONTROL);
	headers.set("Content-Type", "application/json");
	return new Response(JSON.stringify(body), {
		status: 200,
		headers
	});
}
/**
* Provides an exportable `/.well-known/oauth-authorization-server`.
*
* Useful when basePath prevents the endpoint from being located at the root
* and must be provided manually.
*
* @external
*/
var oauthProviderAuthServerMetadata = (auth, opts) => {
	return async (request) => {
		return metadataResponse(await auth.api.getOAuthServerConfig({
			request,
			asResponse: false
		}), opts?.headers);
	};
};
/**
* Provides an exportable `/.well-known/openid-configuration`.
*
* Useful when basePath prevents the endpoint from being located at the root
* and must be provided manually.
*
* @external
*/
var oauthProviderOpenIdConfigMetadata = (auth, opts) => {
	return async (request) => {
		return metadataResponse(await auth.api.getOpenIdConfig({
			request,
			asResponse: false
		}), opts?.headers);
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+oauth-provider_dc3f28df821086dba4b8c92e12f62485/node_modules/@better-auth/oauth-provider/dist/client.mjs
function parseSignedQuery(search) {
	const params = new URLSearchParams(search);
	if (params.has("sig")) {
		const signedParams = new URLSearchParams();
		for (const [key, value] of params.entries()) {
			signedParams.append(key, value);
			if (key === "sig") break;
		}
		return signedParams.toString();
	}
}
var oauthProviderClient = () => {
	return {
		id: "oauth-provider-client",
		version: PACKAGE_VERSION,
		fetchPlugins: [{
			id: "oauth-provider-signin",
			name: "oauth-provider-signin",
			description: "Adds the current page query to oauth requests",
			hooks: { async onRequest(ctx) {
				const headers = ctx.headers;
				const body = typeof ctx.body === "string" ? headers.get("content-type") === "application/x-www-form-urlencoded" ? Object.fromEntries(new URLSearchParams(ctx.body)) : safeJSONParse(ctx.body ?? "{}") : ctx.body;
				if (body?.oauth_query) return;
				if (typeof window !== "undefined" && window?.location?.search && !(ctx.method === "GET" || ctx.method === "DELETE")) ctx.body = JSON.stringify({
					...body,
					oauth_query: parseSignedQuery(window.location.search)
				});
			} }
		}],
		$InferServerPlugin: {}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+oauth-provider_dc3f28df821086dba4b8c92e12f62485/node_modules/@better-auth/oauth-provider/dist/client-resource.mjs
var oauthProviderResourceClient = (auth) => {
	let oauthProviderPlugin;
	const getOauthProviderPlugin = async () => {
		if (!oauthProviderPlugin) oauthProviderPlugin = auth ? getOAuthProviderPlugin(await auth.$context) : void 0;
		return oauthProviderPlugin;
	};
	let jwtPlugin;
	const getJwtPluginOptions = async () => {
		if (!jwtPlugin) jwtPlugin = auth && !(await getOauthProviderPlugin())?.options?.disableJwtPlugin ? getJwtPlugin(await auth.$context) : void 0;
		return jwtPlugin?.options;
	};
	const authServerBaseUrl = typeof auth?.options.baseURL === "string" ? auth.options.baseURL : void 0;
	const getAuthorizationServer = async () => {
		return (await getJwtPluginOptions())?.jwt?.issuer ?? authServerBaseUrl;
	};
	const authServerBasePath = auth?.options.basePath;
	return {
		id: "oauth-provider-resource-client",
		version: PACKAGE_VERSION,
		getActions() {
			return {
				verifyAccessToken: (async (token, opts) => {
					const jwtPluginOptions = await getJwtPluginOptions();
					const audience = opts?.verifyOptions?.audience ?? authServerBaseUrl;
					const issuer = opts?.verifyOptions?.issuer ?? jwtPluginOptions?.jwt?.issuer ?? authServerBaseUrl;
					if (!audience) throw Error("please define opts.verifyOptions.audience");
					if (!issuer) throw Error("please define opts.verifyOptions.issuer");
					const jwksUrl = opts?.jwksUrl ?? jwtPluginOptions?.jwks?.remoteUrl ?? (authServerBaseUrl ? `${authServerBaseUrl + (authServerBasePath ?? "")}${jwtPluginOptions?.jwks?.jwksPath ?? "/jwks"}` : void 0);
					const introspectUrl = opts?.remoteVerify?.introspectUrl ?? (authServerBaseUrl ? `${authServerBaseUrl}${authServerBasePath ?? ""}/oauth2/introspect` : void 0);
					try {
						if (!token?.length) throw new APIError("UNAUTHORIZED", { message: "missing authorization header" });
						return await verifyAccessToken(token, {
							...opts,
							jwksUrl,
							verifyOptions: {
								...opts?.verifyOptions,
								audience,
								issuer
							},
							remoteVerify: opts?.remoteVerify && introspectUrl ? {
								...opts.remoteVerify,
								introspectUrl
							} : void 0
						});
					} catch (error) {
						throw handleMcpErrors(error, audience, { resourceMetadataMappings: opts?.resourceMetadataMappings });
					}
				}),
				getProtectedResourceMetadata: (async (overrides, opts) => {
					const resource = overrides?.resource ?? authServerBaseUrl;
					const oauthProviderOptions = (await getOauthProviderPlugin())?.options;
					if (!resource) throw Error("missing required resource");
					if (oauthProviderOptions?.scopes && opts?.externalScopes && (overrides?.authorization_servers?.length ?? 0) <= 1) throw new BetterAuthError("external scopes should not be provided with one authorization server");
					if (overrides?.scopes_supported) {
						const allValidScopes = new Set([...oauthProviderOptions?.scopes ?? [], ...opts?.externalScopes ?? []]);
						for (const sc of overrides.scopes_supported) {
							if (sc === "openid") throw new BetterAuthError("Only the Auth Server should utilize the openid scope");
							if ([
								"profile",
								"email",
								"phone",
								"address"
							].includes(sc)) {
								if (!opts?.silenceWarnings?.oidcScopes) logger.warn(`"${sc}" is typically restricted for the authorization server, a resource server typically shouldn't handle this scope`);
							}
							if (!allValidScopes.has(sc)) throw new BetterAuthError(`Unsupported scope ${sc}. If external, please add to "externalScopes"`);
						}
					}
					const authorizationServer = await getAuthorizationServer();
					return {
						resource,
						authorization_servers: authorizationServer ? [authorizationServer] : void 0,
						...overrides
					};
				})
			};
		}
	};
};
//#endregion
export { oauthProviderOpenIdConfigMetadata as a, oauthProviderAuthServerMetadata as i, oauthProviderClient as n, decodeJwt as o, oauthProvider as r, oauthProviderResourceClient as t };
