import { $n as unknown, Bn as string, Dn as object, En as number, Fn as record, Ht as discriminatedUnion, Mt as boolean, Ot as array, Wt as email, mn as looseObject, pn as literal, xt as _enum } from "../@ai-sdk/react+[...].mjs";
import { $ as logger, E as symmetricEncrypt, O as signJWT, Q as getProtocol, S as getAuthTables, St as string$1, T as symmetricDecrypt, W as JWTExpired, X as getHost, Y as generateRandomString, Z as getOrigin, c as sessionMiddleware, d as defineRequestState, et as env, ft as APIError, gt as getCurrentAuthContext, ht as BASE_ERROR_CODES, i as generateId, j as jwtVerify, m as setSessionCookie, nt as wildcardMatch, o as getSessionFromCtx, ot as createAuthEndpoint, p as expireCookie, pt as BetterAuthError, s as sensitiveSessionMiddleware, st as createAuthMiddleware, vt as zod_default, x as parseUserOutput, y as getDate } from "./api-key+[...].mjs";
import { g as createLocalJWKSet, h as normalizePathname, l as createFetch, m as deprecate } from "./core+[...].mjs";
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/state.mjs
var stateDataSchema = looseObject({
	callbackURL: string(),
	codeVerifier: string(),
	errorURL: string().optional(),
	newUserURL: string().optional(),
	expiresAt: number(),
	oauthState: string().optional(),
	link: object({
		email: string(),
		userId: string$1()
	}).optional(),
	requestSignUp: boolean().optional()
});
var StateError = class extends BetterAuthError {
	code;
	details;
	constructor(message, options) {
		super(message, options);
		this.code = options.code;
		this.details = options.details;
	}
};
async function generateGenericState(c, stateData, settings) {
	const state = generateRandomString(32);
	if (c.context.oauthConfig.storeStateStrategy === "cookie") {
		const payload = {
			...stateData,
			oauthState: state
		};
		const encryptedData = await symmetricEncrypt({
			key: c.context.secretConfig,
			data: JSON.stringify(payload)
		});
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state", { maxAge: 600 });
		c.setCookie(stateCookie.name, encryptedData, stateCookie.attributes);
		return {
			state,
			codeVerifier: stateData.codeVerifier
		};
	}
	const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state", { maxAge: 300 });
	await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
	const expiresAt = /* @__PURE__ */ new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + 10);
	if (!await c.context.internalAdapter.createVerificationValue({
		value: JSON.stringify({
			...stateData,
			oauthState: state
		}),
		identifier: state,
		expiresAt
	})) throw new StateError("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database", { code: "state_generation_error" });
	return {
		state,
		codeVerifier: stateData.codeVerifier
	};
}
async function parseGenericState(c, state, settings) {
	const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
	let parsedData;
	if (storeStateStrategy === "cookie") {
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state");
		const encryptedData = c.getCookie(stateCookie.name);
		if (!encryptedData) throw new StateError("State mismatch: auth state cookie not found", {
			code: "state_mismatch",
			details: { state }
		});
		try {
			const decryptedData = await symmetricDecrypt({
				key: c.context.secretConfig,
				data: encryptedData
			});
			parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
		} catch (error) {
			throw new StateError("State invalid: Failed to decrypt or parse auth state", {
				code: "state_invalid",
				details: { state },
				cause: error
			});
		}
		if (!parsedData.oauthState || parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
			code: "state_security_mismatch",
			details: { state }
		});
		expireCookie(c, stateCookie);
	} else {
		const data = await c.context.internalAdapter.findVerificationValue(state);
		if (!data) throw new StateError("State mismatch: verification not found", {
			code: "state_mismatch",
			details: { state }
		});
		parsedData = stateDataSchema.parse(JSON.parse(data.value));
		if (parsedData.oauthState !== void 0 && parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
			code: "state_security_mismatch",
			details: { state }
		});
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state");
		const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
		if (!(settings?.skipStateCookieCheck ?? c.context.oauthConfig.skipStateCookieCheck) && (!stateCookieValue || stateCookieValue !== state)) throw new StateError("State mismatch: State not persisted correctly", {
			code: "state_security_mismatch",
			details: { state }
		});
		expireCookie(c, stateCookie);
		await c.context.internalAdapter.deleteVerificationByIdentifier(state);
	}
	if (parsedData.expiresAt < Date.now()) throw new StateError("Invalid state: request expired", {
		code: "state_mismatch",
		details: { expiresAt: parsedData.expiresAt }
	});
	return parsedData;
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/state/oauth.mjs
var { get: getOAuthState, set: setOAuthState } = defineRequestState(() => null);
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/oauth2/state.mjs
async function generateState(c, link, additionalData) {
	const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
	if (!callbackURL) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CALLBACK_URL_REQUIRED);
	const codeVerifier = generateRandomString(128);
	const stateData = {
		...additionalData ? additionalData : {},
		callbackURL,
		codeVerifier,
		errorURL: c.body?.errorCallbackURL,
		newUserURL: c.body?.newUserCallbackURL,
		link,
		expiresAt: Date.now() + 600 * 1e3,
		requestSignUp: c.body?.requestSignUp
	};
	await setOAuthState(stateData);
	try {
		return generateGenericState(c, stateData);
	} catch (error) {
		c.context.logger.error("Failed to create verification", error);
		throw new APIError("INTERNAL_SERVER_ERROR", {
			message: "Unable to create verification",
			cause: error
		});
	}
}
async function parseState(c) {
	const state = c.query.state || c.body?.state;
	const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	let parsedData;
	try {
		parsedData = await parseGenericState(c, state);
	} catch (error) {
		c.context.logger.error("Failed to parse state", error);
		if (error instanceof StateError && error.code === "state_security_mismatch") throw c.redirect(`${errorURL}?error=state_mismatch`);
		throw c.redirect(`${errorURL}?error=please_restart_the_process`);
	}
	if (!parsedData.errorURL) parsedData.errorURL = errorURL;
	if (parsedData) await setOAuthState(parsedData);
	return parsedData;
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/auth/trusted-origins.mjs
/**
* Matches the given url against an origin or origin pattern
* See "options.trustedOrigins" for details of supported patterns
*
* @param url The url to test
* @param pattern The origin pattern
* @param [settings] Specify supported pattern matching settings
* @returns {boolean} true if the URL matches the origin pattern, false otherwise.
*/
var matchesOriginPattern = (url, pattern, settings) => {
	if (url.startsWith("/")) {
		if (settings?.allowRelativePaths) return url.startsWith("/") && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url);
		return false;
	}
	if (pattern.includes("*") || pattern.includes("?")) {
		if (pattern.includes("://")) return wildcardMatch(pattern)(getOrigin(url) || url);
		const host = getHost(url);
		if (!host) return false;
		return wildcardMatch(pattern)(host);
	}
	const protocol = getProtocol(url);
	return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/middlewares/origin-check.mjs
/**
* Checks if CSRF should be skipped for backward compatibility.
* Previously, disableOriginCheck also disabled CSRF checks.
* This maintains that behavior when disableCSRFCheck isn't explicitly set.
* Only triggers for skipOriginCheck === true, not for path arrays.
*/
function shouldSkipCSRFForBackwardCompat(ctx) {
	return ctx.context.skipOriginCheck === true && ctx.context.options.advanced?.disableCSRFCheck === void 0;
}
/**
* Checks if the origin check should be skipped for the current request.
* Handles both boolean (skip all) and array (skip specific paths) configurations.
*/
function shouldSkipOriginCheck(ctx) {
	const skipOriginCheck = ctx.context.skipOriginCheck;
	if (skipOriginCheck === true) return true;
	if (Array.isArray(skipOriginCheck) && ctx.request) try {
		const basePath = new URL(ctx.context.baseURL).pathname;
		const currentPath = normalizePathname(ctx.request.url, basePath);
		return skipOriginCheck.some((skipPath) => currentPath.startsWith(skipPath));
	} catch {}
	return false;
}
/**
* Logs deprecation warning for users relying on coupled behavior.
* Only logs if user explicitly set disableOriginCheck (not test environment default).
*/
var logBackwardCompatWarning = deprecate(function logBackwardCompatWarning() {}, "disableOriginCheck: true currently also disables CSRF checks. In a future version, disableOriginCheck will ONLY disable URL validation. To keep CSRF disabled, add disableCSRFCheck: true to your config.");
createAuthMiddleware(async (ctx) => {
	if (ctx.request?.method === "GET" || ctx.request?.method === "OPTIONS" || ctx.request?.method === "HEAD" || !ctx.request) return;
	await validateOrigin(ctx);
	if (shouldSkipOriginCheck(ctx)) return;
	const { body, query } = ctx;
	const callbackURL = body?.callbackURL || query?.callbackURL;
	const redirectURL = body?.redirectTo;
	const errorCallbackURL = body?.errorCallbackURL;
	const newUserCallbackURL = body?.newUserCallbackURL;
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	callbackURL && validateURL(callbackURL, "callbackURL");
	redirectURL && validateURL(redirectURL, "redirectURL");
	errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
	newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
var originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	if (shouldSkipOriginCheck(ctx)) return;
	const callbackURL = getValue(ctx);
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
	for (const url of callbacks) validateURL(url, "callbackURL");
});
/**
* Validates origin header against trusted origins.
* @param ctx - The endpoint context
* @param forceValidate - If true, always validate origin regardless of cookies/skip flags
*/
async function validateOrigin(ctx, forceValidate = false) {
	const headers = ctx.request?.headers;
	if (!headers || !ctx.request) return;
	const originHeader = headers.get("origin") || headers.get("referer") || "";
	const useCookies = headers.has("cookie");
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) {
		ctx.context.options.advanced?.disableOriginCheck === true && logBackwardCompatWarning();
		return;
	}
	if (shouldSkipOriginCheck(ctx)) return;
	if (!(forceValidate || useCookies)) return;
	if (!originHeader || originHeader === "null") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.MISSING_OR_NULL_ORIGIN);
	const trustedOrigins = Array.isArray(ctx.context.options.trustedOrigins) ? ctx.context.trustedOrigins : [...ctx.context.trustedOrigins, ...(await ctx.context.options.trustedOrigins?.(ctx.request))?.filter((v) => Boolean(v)) || []];
	if (!trustedOrigins.some((origin) => matchesOriginPattern(originHeader, origin))) {
		ctx.context.logger.error(`Invalid origin: ${originHeader}`);
		ctx.context.logger.info(`If it's a valid URL, please add ${originHeader} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${trustedOrigins}`);
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
	}
}
createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	await validateFormCsrf(ctx);
});
/**
* Validates CSRF protection for first-login scenarios using Fetch Metadata headers.
* This prevents cross-site form submission attacks while supporting progressive enhancement.
*/
async function validateFormCsrf(ctx) {
	const req = ctx.request;
	if (!req) return;
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) return;
	const headers = req.headers;
	if (headers.has("cookie")) return await validateOrigin(ctx);
	const site = headers.get("Sec-Fetch-Site");
	const mode = headers.get("Sec-Fetch-Mode");
	const dest = headers.get("Sec-Fetch-Dest");
	if (Boolean(site && site.trim() || mode && mode.trim() || dest && dest.trim())) {
		if (site === "cross-site" && mode === "navigate") {
			ctx.context.logger.error("Blocked cross-site navigation login attempt (CSRF protection)", {
				secFetchSite: site,
				secFetchMode: mode,
				secFetchDest: dest
			});
			throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.CROSS_SITE_NAVIGATION_LOGIN_BLOCKED);
		}
		return await validateOrigin(ctx, true);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/routes/email-verification.mjs
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600, extraPayload) {
	return await signJWT({
		email: email.toLowerCase(),
		updateTo: updateTo?.toLowerCase(),
		...extraPayload
	}, secret, expiresIn);
}
/**
* A function to send a verification email to the user
*/
async function sendVerificationEmailFn(ctx, user) {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
	const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
		user,
		url,
		token
	}, ctx.request));
}
createAuthEndpoint("/send-verification-email", {
	method: "POST",
	operationId: "sendVerificationEmail",
	body: object({
		email: email().meta({ description: "The email to send the verification email to" }),
		callbackURL: string().meta({ description: "The URL to use for email verification callback" }).optional()
	}),
	metadata: { openapi: {
		operationId: "sendVerificationEmail",
		description: "Send a verification email to the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				email: {
					type: "string",
					description: "The email to send the verification email to",
					example: "user@example.com"
				},
				callbackURL: {
					type: "string",
					description: "The URL to use for email verification callback",
					example: "https://example.com/callback",
					nullable: true
				}
			},
			required: ["email"]
		} } } },
		responses: {
			"200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: {
						type: "boolean",
						description: "Indicates if the email was sent successfully",
						example: true
					} }
				} } }
			},
			"400": {
				description: "Bad Request",
				content: { "application/json": { schema: {
					type: "object",
					properties: { message: {
						type: "string",
						description: "Error message",
						example: "Verification email isn't enabled"
					} }
				} } }
			}
		}
	} }
}, async (ctx) => {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const { email } = ctx.body;
	const session = await getSessionFromCtx(ctx);
	if (!session) {
		const user = await ctx.context.internalAdapter.findUserByEmail(email);
		if (!user || user.user.emailVerified) {
			await createEmailVerificationToken(ctx.context.secret, email, void 0, ctx.context.options.emailVerification?.expiresIn);
			return ctx.json({ status: true });
		}
		await sendVerificationEmailFn(ctx, user.user);
		return ctx.json({ status: true });
	}
	if (session?.user.email.toLowerCase() !== email.toLowerCase()) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_MISMATCH);
	if (session?.user.emailVerified) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_ALREADY_VERIFIED);
	await sendVerificationEmailFn(ctx, session.user);
	return ctx.json({ status: true });
});
createAuthEndpoint("/verify-email", {
	method: "GET",
	operationId: "verifyEmail",
	query: object({
		token: string().meta({ description: "The token to verify the email" }),
		callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Verify the email of the user",
		parameters: [{
			name: "token",
			in: "query",
			description: "The token to verify the email",
			required: true,
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			description: "The URL to redirect to after email verification",
			required: false,
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						$ref: "#/components/schemas/User"
					},
					status: {
						type: "boolean",
						description: "Indicates if the email was verified successfully"
					}
				},
				required: ["user", "status"]
			} } }
		} }
	} }
}, async (ctx) => {
	function redirectOnError(error) {
		if (ctx.query.callbackURL) {
			if (ctx.query.callbackURL.includes("?")) throw ctx.redirect(`${ctx.query.callbackURL}&error=${error.code}`);
			throw ctx.redirect(`${ctx.query.callbackURL}?error=${error.code}`);
		}
		throw APIError.from("UNAUTHORIZED", error);
	}
	const { token } = ctx.query;
	let jwt;
	try {
		jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
	} catch (e) {
		if (e instanceof JWTExpired) return redirectOnError(BASE_ERROR_CODES.TOKEN_EXPIRED);
		return redirectOnError(BASE_ERROR_CODES.INVALID_TOKEN);
	}
	const parsed = object({
		email: email(),
		updateTo: string().optional(),
		requestType: string().optional()
	}).parse(jwt.payload);
	const user = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
	if (!user) return redirectOnError(BASE_ERROR_CODES.USER_NOT_FOUND);
	if (parsed.updateTo) {
		const session = await getSessionFromCtx(ctx);
		if (session && session.user.email !== parsed.email) return redirectOnError(BASE_ERROR_CODES.INVALID_USER);
		switch (parsed.requestType) {
			case "change-email-confirmation": {
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				const url = `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`;
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: {
						...user.user,
						email: parsed.updateTo
					},
					url,
					token: newToken
				}, ctx.request));
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({ status: true });
			}
			case "change-email-verification": {
				let activeSession = session;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user.user
					};
				}
				const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: true
				});
				if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: true
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser)
				});
			}
			default: {
				let activeSession = session;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user.user
					};
				}
				const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: false
				});
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: updatedUser,
					url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
					token: newToken
				}, ctx.request));
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: false
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser)
				});
			}
		}
	}
	if (user.user.emailVerified) {
		if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
		return ctx.json({
			status: true,
			user: null
		});
	}
	if (ctx.context.options.emailVerification?.beforeEmailVerification) await ctx.context.options.emailVerification.beforeEmailVerification(user.user, ctx.request);
	const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
	if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
	if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
		const currentSession = await getSessionFromCtx(ctx);
		if (!currentSession || currentSession.user.email !== parsed.email) {
			const session = await ctx.context.internalAdapter.createSession(user.user.id);
			if (!session) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
			await setSessionCookie(ctx, {
				session,
				user: {
					...user.user,
					emailVerified: true
				}
			});
		} else await setSessionCookie(ctx, {
			session: currentSession.session,
			user: {
				...currentSession.user,
				emailVerified: true
			}
		});
	}
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
	return ctx.json({
		status: true,
		user: null
	});
});
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/utils/password.mjs
async function validatePassword(ctx, data) {
	const credentialAccount = (await ctx.context.internalAdapter.findAccounts(data.userId))?.find((account) => account.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	if (!credentialAccount || !currentPassword) return false;
	return await ctx.context.password.verify({
		hash: currentPassword,
		password: data.password
	});
}
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/api/routes/password.mjs
function redirectError(ctx, callbackURL, query) {
	const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
	const url = new URL(callbackURL, ctx.baseURL);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
var requestPasswordReset = createAuthEndpoint("/request-password-reset", {
	method: "POST",
	body: object({
		email: email().meta({ description: "The email address of the user to send a password reset email to" }),
		redirectTo: string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
	}),
	metadata: { openapi: {
		operationId: "requestPasswordReset",
		description: "Send a password reset email to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					status: { type: "boolean" },
					message: { type: "string" }
				}
			} } }
		} }
	} },
	use: [originCheck((ctx) => ctx.body.redirectTo)]
}, async (ctx) => {
	if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
		ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
		throw APIError.from("BAD_REQUEST", {
			message: "Reset password isn't enabled",
			code: "RESET_PASSWORD_DISABLED"
		});
	}
	const { email, redirectTo } = ctx.body;
	const user = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
	if (!user) {
		/**
		* We simulate the verification token generation and the database lookup
		* to mitigate timing attacks.
		*/
		generateId(24);
		await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
		ctx.context.logger.error("Reset Password: User not found", { email });
		return ctx.json({
			status: true,
			message: "If this email exists in our system, check your email for the reset link"
		});
	}
	const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600 * 1, "sec");
	const verificationToken = generateId(24);
	await ctx.context.internalAdapter.createVerificationValue({
		value: user.user.id,
		identifier: `reset-password:${verificationToken}`,
		expiresAt
	});
	const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
	const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.sendResetPassword({
		user: user.user,
		url,
		token: verificationToken
	}, ctx.request));
	return ctx.json({
		status: true,
		message: "If this email exists in our system, check your email for the reset link"
	});
});
createAuthEndpoint("/reset-password/:token", {
	method: "GET",
	operationId: "resetPasswordCallback",
	query: object({ callbackURL: string().meta({ description: "The URL to redirect the user to reset their password" }) }),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		operationId: "resetPasswordCallback",
		description: "Redirects the user to the callback URL with the token",
		parameters: [{
			name: "token",
			in: "path",
			required: true,
			description: "The token to reset the password",
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			required: true,
			description: "The URL to redirect the user to reset their password",
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { token: { type: "string" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { token } = ctx.params;
	const { callbackURL } = ctx.query;
	if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	const verification = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
	if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
createAuthEndpoint("/reset-password", {
	method: "POST",
	operationId: "resetPassword",
	query: object({ token: string().optional() }).optional(),
	body: object({
		newPassword: string().meta({ description: "The new password to set" }),
		token: string().meta({ description: "The token to reset the password" }).optional()
	}),
	metadata: { openapi: {
		operationId: "resetPassword",
		description: "Reset the password for a user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token || ctx.query?.token;
	if (!token) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const { newPassword } = ctx.body;
	const minLength = ctx.context.password?.config.minPasswordLength;
	const maxLength = ctx.context.password?.config.maxPasswordLength;
	if (newPassword.length < minLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	if (newPassword.length > maxLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	const id = `reset-password:${token}`;
	const verification = await ctx.context.internalAdapter.findVerificationValue(id);
	if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const userId = verification.value;
	const hashedPassword = await ctx.context.password.hash(newPassword);
	if (!(await ctx.context.internalAdapter.findAccounts(userId)).find((ac) => ac.providerId === "credential")) await ctx.context.internalAdapter.createAccount({
		userId,
		providerId: "credential",
		password: hashedPassword,
		accountId: userId
	});
	else await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
	await ctx.context.internalAdapter.deleteVerificationByIdentifier(id);
	if (ctx.context.options.emailAndPassword?.onPasswordReset) {
		const user = await ctx.context.internalAdapter.findUserById(userId);
		if (user) await ctx.context.options.emailAndPassword.onPasswordReset({ user }, ctx.request);
	}
	if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteSessions(userId);
	return ctx.json({ status: true });
});
createAuthEndpoint("/verify-password", {
	method: "POST",
	body: object({ password: string().meta({ description: "The password to verify" }) }),
	metadata: {
		scope: "server",
		openapi: {
			operationId: "verifyPassword",
			description: "Verify the current user's password",
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: { type: "boolean" } }
				} } }
			} }
		}
	},
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { password } = ctx.body;
	const session = ctx.context.session;
	if (!await validatePassword(ctx, {
		password,
		userId: session.user.id
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return ctx.json({ status: true });
});
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+infra@0.2.8_0c0bcb9c4ec29acded57ca7c476fc5b8/node_modules/@better-auth/infra/dist/constants-CvriWQVc.mjs
/**
* Infrastructure API URL
* Can be overridden via plugin config or BETTER_AUTH_API_URL env var for local development
*/
var INFRA_API_URL = env.BETTER_AUTH_API_URL || "https://dash.better-auth.com";
/**
* KV Storage URL
* Can be overridden via plugin config or BETTER_AUTH_KV_URL env var for local development
*/
var INFRA_KV_URL = env.BETTER_AUTH_KV_URL || "https://kv.better-auth.com";
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+infra@0.2.8_0c0bcb9c4ec29acded57ca7c476fc5b8/node_modules/@better-auth/infra/dist/fetch-DiAhoiKA.mjs
function createAPI(options, fetchOptions) {
	return createFetch({
		baseURL: options.apiUrl,
		headers: {
			"user-agent": "better-auth",
			"x-api-key": options.apiKey
		},
		timeout: options.apiTimeout,
		...fetchOptions
	});
}
function createKV(options, fetchOptions) {
	const headers = { "user-agent": "better-auth" };
	if (options.apiKey) headers["x-api-key"] = options.apiKey;
	return createFetch({
		baseURL: options.kvUrl,
		headers,
		timeout: options.kvTimeout ?? 1e3,
		...fetchOptions
	});
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/metadata.min.json.js
var metadata_min_json_default = {
	"version": 4,
	"country_calling_codes": {
		"1": [
			"US",
			"AG",
			"AI",
			"AS",
			"BB",
			"BM",
			"BS",
			"CA",
			"DM",
			"DO",
			"GD",
			"GU",
			"JM",
			"KN",
			"KY",
			"LC",
			"MP",
			"MS",
			"PR",
			"SX",
			"TC",
			"TT",
			"VC",
			"VG",
			"VI"
		],
		"7": ["RU", "KZ"],
		"20": ["EG"],
		"27": ["ZA"],
		"30": ["GR"],
		"31": ["NL"],
		"32": ["BE"],
		"33": ["FR"],
		"34": ["ES"],
		"36": ["HU"],
		"39": ["IT", "VA"],
		"40": ["RO"],
		"41": ["CH"],
		"43": ["AT"],
		"44": [
			"GB",
			"GG",
			"IM",
			"JE"
		],
		"45": ["DK"],
		"46": ["SE"],
		"47": ["NO", "SJ"],
		"48": ["PL"],
		"49": ["DE"],
		"51": ["PE"],
		"52": ["MX"],
		"53": ["CU"],
		"54": ["AR"],
		"55": ["BR"],
		"56": ["CL"],
		"57": ["CO"],
		"58": ["VE"],
		"60": ["MY"],
		"61": [
			"AU",
			"CC",
			"CX"
		],
		"62": ["ID"],
		"63": ["PH"],
		"64": ["NZ"],
		"65": ["SG"],
		"66": ["TH"],
		"81": ["JP"],
		"82": ["KR"],
		"84": ["VN"],
		"86": ["CN"],
		"90": ["TR"],
		"91": ["IN"],
		"92": ["PK"],
		"93": ["AF"],
		"94": ["LK"],
		"95": ["MM"],
		"98": ["IR"],
		"211": ["SS"],
		"212": ["MA", "EH"],
		"213": ["DZ"],
		"216": ["TN"],
		"218": ["LY"],
		"220": ["GM"],
		"221": ["SN"],
		"222": ["MR"],
		"223": ["ML"],
		"224": ["GN"],
		"225": ["CI"],
		"226": ["BF"],
		"227": ["NE"],
		"228": ["TG"],
		"229": ["BJ"],
		"230": ["MU"],
		"231": ["LR"],
		"232": ["SL"],
		"233": ["GH"],
		"234": ["NG"],
		"235": ["TD"],
		"236": ["CF"],
		"237": ["CM"],
		"238": ["CV"],
		"239": ["ST"],
		"240": ["GQ"],
		"241": ["GA"],
		"242": ["CG"],
		"243": ["CD"],
		"244": ["AO"],
		"245": ["GW"],
		"246": ["IO"],
		"247": ["AC"],
		"248": ["SC"],
		"249": ["SD"],
		"250": ["RW"],
		"251": ["ET"],
		"252": ["SO"],
		"253": ["DJ"],
		"254": ["KE"],
		"255": ["TZ"],
		"256": ["UG"],
		"257": ["BI"],
		"258": ["MZ"],
		"260": ["ZM"],
		"261": ["MG"],
		"262": ["RE", "YT"],
		"263": ["ZW"],
		"264": ["NA"],
		"265": ["MW"],
		"266": ["LS"],
		"267": ["BW"],
		"268": ["SZ"],
		"269": ["KM"],
		"290": ["SH", "TA"],
		"291": ["ER"],
		"297": ["AW"],
		"298": ["FO"],
		"299": ["GL"],
		"350": ["GI"],
		"351": ["PT"],
		"352": ["LU"],
		"353": ["IE"],
		"354": ["IS"],
		"355": ["AL"],
		"356": ["MT"],
		"357": ["CY"],
		"358": ["FI", "AX"],
		"359": ["BG"],
		"370": ["LT"],
		"371": ["LV"],
		"372": ["EE"],
		"373": ["MD"],
		"374": ["AM"],
		"375": ["BY"],
		"376": ["AD"],
		"377": ["MC"],
		"378": ["SM"],
		"380": ["UA"],
		"381": ["RS"],
		"382": ["ME"],
		"383": ["XK"],
		"385": ["HR"],
		"386": ["SI"],
		"387": ["BA"],
		"389": ["MK"],
		"420": ["CZ"],
		"421": ["SK"],
		"423": ["LI"],
		"500": ["FK"],
		"501": ["BZ"],
		"502": ["GT"],
		"503": ["SV"],
		"504": ["HN"],
		"505": ["NI"],
		"506": ["CR"],
		"507": ["PA"],
		"508": ["PM"],
		"509": ["HT"],
		"590": [
			"GP",
			"BL",
			"MF"
		],
		"591": ["BO"],
		"592": ["GY"],
		"593": ["EC"],
		"594": ["GF"],
		"595": ["PY"],
		"596": ["MQ"],
		"597": ["SR"],
		"598": ["UY"],
		"599": ["CW", "BQ"],
		"670": ["TL"],
		"672": ["NF"],
		"673": ["BN"],
		"674": ["NR"],
		"675": ["PG"],
		"676": ["TO"],
		"677": ["SB"],
		"678": ["VU"],
		"679": ["FJ"],
		"680": ["PW"],
		"681": ["WF"],
		"682": ["CK"],
		"683": ["NU"],
		"685": ["WS"],
		"686": ["KI"],
		"687": ["NC"],
		"688": ["TV"],
		"689": ["PF"],
		"690": ["TK"],
		"691": ["FM"],
		"692": ["MH"],
		"850": ["KP"],
		"852": ["HK"],
		"853": ["MO"],
		"855": ["KH"],
		"856": ["LA"],
		"880": ["BD"],
		"886": ["TW"],
		"960": ["MV"],
		"961": ["LB"],
		"962": ["JO"],
		"963": ["SY"],
		"964": ["IQ"],
		"965": ["KW"],
		"966": ["SA"],
		"967": ["YE"],
		"968": ["OM"],
		"970": ["PS"],
		"971": ["AE"],
		"972": ["IL"],
		"973": ["BH"],
		"974": ["QA"],
		"975": ["BT"],
		"976": ["MN"],
		"977": ["NP"],
		"992": ["TJ"],
		"993": ["TM"],
		"994": ["AZ"],
		"995": ["GE"],
		"996": ["KG"],
		"998": ["UZ"]
	},
	"countries": {
		"AC": [
			"247",
			"00",
			"(?:[01589]\\d|[46])\\d{4}",
			[5, 6]
		],
		"AD": [
			"376",
			"00",
			"(?:1|6\\d)\\d{7}|[135-9]\\d{5}",
			[
				6,
				8,
				9
			],
			[
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["[135-9]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["1"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6"]
				]
			]
		],
		"AE": [
			"971",
			"00",
			"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{2,9})",
					"$1 $2",
					["60|8"]
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[236]|[479][2-8]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{5})",
					"$1 $2 $3",
					["[479]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["5"],
					"0$1"
				]
			],
			"0"
		],
		"AF": [
			"93",
			"00",
			"[2-7]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[2-7]"],
				"0$1"
			]],
			"0"
		],
		"AG": [
			"1",
			"011",
			"(?:268|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([457]\\d{6})$|1",
			"268$1",
			0,
			"268"
		],
		"AI": [
			"1",
			"011",
			"(?:264|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2457]\\d{6})$|1",
			"264$1",
			0,
			"264"
		],
		"AL": [
			"355",
			"00",
			"(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",
			[
				6,
				7,
				8,
				9
			],
			[
				[
					"(\\d{3})(\\d{3,4})",
					"$1 $2",
					["80|9"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["4[2-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2358][2-5]|4"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[23578]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["6"],
					"0$1"
				]
			],
			"0"
		],
		"AM": [
			"374",
			"00",
			"(?:[1-489]\\d|55|60|77)\\d{6}",
			[8],
			[
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["[89]0"],
					"0 $1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["2|3[12]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["1|47"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["[3-9]"],
					"0$1"
				]
			],
			"0"
		],
		"AO": [
			"244",
			"00",
			"[29]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[29]"]
			]]
		],
		"AR": [
			"54",
			"00",
			"(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}",
			[10, 11],
			[
				[
					"(\\d{4})(\\d{2})(\\d{4})",
					"$1 $2-$3",
					[
						"2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])",
						"2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)",
						"2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
						"2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"
					],
					"0$1",
					1
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2-$3",
					["1"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[68]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2-$3",
					["[23]"],
					"0$1",
					1
				],
				[
					"(\\d)(\\d{4})(\\d{2})(\\d{4})",
					"$2 15-$3-$4",
					[
						"9(?:2[2-469]|3[3-578])",
						"9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))",
						"9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)",
						"9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
						"9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"
					],
					"0$1",
					0,
					"$1 $2 $3-$4"
				],
				[
					"(\\d)(\\d{2})(\\d{4})(\\d{4})",
					"$2 15-$3-$4",
					["91"],
					"0$1",
					0,
					"$1 $2 $3-$4"
				],
				[
					"(\\d{3})(\\d{3})(\\d{5})",
					"$1-$2-$3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{4})",
					"$2 15-$3-$4",
					["9"],
					"0$1",
					0,
					"$1 $2 $3-$4"
				]
			],
			"0",
			0,
			"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?",
			"9$1"
		],
		"AS": [
			"1",
			"011",
			"(?:[58]\\d\\d|684|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([267]\\d{6})$|1",
			"684$1",
			0,
			"684"
		],
		"AT": [
			"43",
			"00",
			"1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d)(\\d{3,12})",
					"$1 $2",
					["1(?:11|[2-9])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})",
					"$1 $2",
					["517"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,5})",
					"$1 $2",
					["5[079]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,10})",
					"$1 $2",
					["(?:31|4)6|51|6(?:48|5[0-3579]|[6-9])|7(?:20|32|8)|[89]", "(?:31|4)6|51|6(?:485|5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3,9})",
					"$1 $2",
					["[2-467]|5[2-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["5"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4,7})",
					"$1 $2 $3",
					["5"],
					"0$1"
				]
			],
			"0"
		],
		"AU": [
			"61",
			"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
			"1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				12
			],
			[
				[
					"(\\d{2})(\\d{3,4})",
					"$1 $2",
					["16"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2,4})",
					"$1 $2 $3",
					["16"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["14|4"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[2378]"],
					"(0$1)"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1(?:30|[89])"]
				]
			],
			"0",
			0,
			"(183[12])|0",
			0,
			0,
			0,
			[
				["(?:(?:241|349)0\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|[34]\\d\\d)|91(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79]))))\\d{3}|(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8])|8(?:55|6[0-8]|[78]\\d|9[02-9]))\\d{6}", [9]],
				["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]],
				0,
				0,
				0,
				["163\\d{2,6}", [
					5,
					6,
					7,
					8,
					9
				]],
				["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [
					6,
					8,
					10,
					12
				]]
			],
			"0011"
		],
		"AW": [
			"297",
			"00",
			"(?:[25-79]\\d\\d|800)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[25-9]"]
			]]
		],
		"AX": [
			"358",
			"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
			"2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			0,
			"0",
			0,
			0,
			0,
			0,
			"18",
			0,
			"00"
		],
		"AZ": [
			"994",
			"00",
			"365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",
			[9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["90"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"1[28]|2|365|46",
						"1[28]|2|365[45]|46",
						"1[28]|2|365(?:4|5[02])|46"
					],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[13-9]"],
					"0$1"
				]
			],
			"0"
		],
		"BA": [
			"387",
			"00",
			"6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6[1-3]|[7-9]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2-$3",
					["[3-5]|6[56]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["6"],
					"0$1"
				]
			],
			"0"
		],
		"BB": [
			"1",
			"011",
			"(?:246|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"246$1",
			0,
			"246"
		],
		"BD": [
			"880",
			"00",
			"[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}",
			[
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{4,6})",
					"$1-$2",
					["31[5-8]|[459]1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,7})",
					"$1-$2",
					["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3,6})",
					"$1-$2",
					["[13-9]|2[23]"],
					"0$1"
				],
				[
					"(\\d)(\\d{7,8})",
					"$1-$2",
					["2"],
					"0$1"
				]
			],
			"0"
		],
		"BE": [
			"32",
			"00",
			"4\\d{8}|[1-9]\\d{7}",
			[8, 9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["(?:80|9)0"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[239]|4[23]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[15-8]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["4"],
					"0$1"
				]
			],
			"0"
		],
		"BF": [
			"226",
			"00",
			"[024-7]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[024-7]"]
			]]
		],
		"BG": [
			"359",
			"00",
			"00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",
			[
				6,
				7,
				8,
				9,
				12
			],
			[
				[
					"(\\d)(\\d)(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["43[1-6]|70[1-9]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2,3})",
					"$1 $2 $3",
					["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["(?:70|8)0"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})",
					"$1 $2 $3",
					["43[1-7]|7"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[48]|9[08]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["9"],
					"0$1"
				]
			],
			"0"
		],
		"BH": [
			"973",
			"00",
			"[136-9]\\d{7}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[13679]|8[02-4679]"]
			]]
		],
		"BI": [
			"257",
			"00",
			"(?:[267]\\d|31)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2367]"]
			]]
		],
		"BJ": [
			"229",
			"00",
			"(?:01\\d|8)\\d{7}",
			[8, 10],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4 $5",
				["0"]
			]]
		],
		"BL": [
			"590",
			"00",
			"7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:59(?:0(?:2[7-9]|3[3-7]|5[12]|87)|87\\d)|80[6-9]\\d\\d)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"],
				["8[129]\\d{7}"],
				0,
				0,
				0,
				0,
				["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]
			]
		],
		"BM": [
			"1",
			"011",
			"(?:441|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"441$1",
			0,
			"441"
		],
		"BN": [
			"673",
			"00",
			"[2-578]\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-578]"]
			]]
		],
		"BO": [
			"591",
			"00(?:1\\d)?",
			"8001\\d{5}|(?:[2-467]\\d|50)\\d{6}",
			[8, 9],
			[
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["[235]|4[46]"]
				],
				[
					"(\\d{8})",
					"$1",
					["[67]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["8"]
				]
			],
			"0",
			0,
			"0(1\\d)?"
		],
		"BQ": [
			"599",
			"00",
			"(?:[34]1|7\\d)\\d{5}",
			[7],
			0,
			0,
			0,
			0,
			0,
			0,
			"[347]"
		],
		"BR": [
			"55",
			"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)",
			"[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}",
			[
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{4})(\\d{4})",
					"$1-$2",
					["300|4(?:0[02]|37|86)", "300|4(?:0(?:0|20)|370|864)"]
				],
				[
					"(\\d{3})(\\d{2,3})(\\d{4})",
					"$1 $2 $3",
					["(?:[358]|90)0"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2-$3",
					["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],
					"($1)"
				],
				[
					"(\\d{2})(\\d{5})(\\d{4})",
					"$1 $2-$3",
					["[16][1-9]|[2-57-9]"],
					"($1)"
				]
			],
			"0",
			0,
			"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?",
			"$2"
		],
		"BS": [
			"1",
			"011",
			"(?:242|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([3-8]\\d{6})$|1",
			"242$1",
			0,
			"242"
		],
		"BT": [
			"975",
			"00",
			"[178]\\d{7}|[2-8]\\d{6}",
			[7, 8],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[2-6]|7[246]|8[2-4]"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["1[67]|[78]"]
			]]
		],
		"BW": [
			"267",
			"00",
			"(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}",
			[
				7,
				8,
				10
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["90"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[24-6]|3[15-9]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[37]"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		"BY": [
			"375",
			"810",
			"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",
			[
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["800"],
					"8 $1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,4})",
					"$1 $2 $3",
					["800"],
					"8 $1"
				],
				[
					"(\\d{4})(\\d{2})(\\d{3})",
					"$1 $2-$3",
					["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],
					"8 0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["1(?:[56]|7[467])|2[1-3]"],
					"8 0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["[1-4]"],
					"8 0$1"
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"8 $1"
				]
			],
			"8",
			0,
			"0|80?",
			0,
			0,
			0,
			0,
			"8~10"
		],
		"BZ": [
			"501",
			"00",
			"(?:0800\\d|[2-8])\\d{6}",
			[7, 11],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["[2-8]"]
			], [
				"(\\d)(\\d{3})(\\d{4})(\\d{3})",
				"$1-$2-$3-$4",
				["0"]
			]]
		],
		"CA": [
			"1",
			"011",
			"[2-9]\\d{9}|3\\d{6}",
			[7, 10],
			0,
			"1",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:2(?:04|[23]6|[48]9|5[07]|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}", [10]],
				["", [10]],
				["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]],
				["900[2-9]\\d{6}", [10]],
				["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|3[23]|44|66|77|88)|6(?:22|33))[2-9]\\d{6}", [10]],
				0,
				["310\\d{4}", [7]],
				0,
				["600[2-9]\\d{6}", [10]]
			]
		],
		"CC": [
			"61",
			"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
			"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",
			[
				6,
				7,
				8,
				9,
				10,
				12
			],
			0,
			"0",
			0,
			"([59]\\d{7})$|0",
			"8$1",
			0,
			0,
			[
				["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]],
				["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]],
				0,
				0,
				0,
				0,
				["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [
					6,
					8,
					10,
					12
				]]
			],
			"0011"
		],
		"CD": [
			"243",
			"00",
			"(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["88"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["[1-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["5"],
					"0$1"
				]
			],
			"0"
		],
		"CF": [
			"236",
			"00",
			"8776\\d{4}|(?:[27]\\d|61)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[26-8]"]
			]]
		],
		"CG": [
			"242",
			"00",
			"222\\d{6}|(?:0\\d|80)\\d{7}",
			[9],
			[[
				"(\\d)(\\d{4})(\\d{4})",
				"$1 $2 $3",
				["8"]
			], [
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[02]"]
			]]
		],
		"CH": [
			"41",
			"00",
			"8\\d{11}|[2-9]\\d{8}",
			[9, 12],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8[047]|90"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[2-79]|81"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4 $5",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"CI": [
			"225",
			"00",
			"[02]\\d{9}",
			[10],
			[[
				"(\\d{2})(\\d{2})(\\d)(\\d{5})",
				"$1 $2 $3 $4",
				["2"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{4})",
				"$1 $2 $3 $4",
				["0"]
			]]
		],
		"CK": [
			"682",
			"00",
			"[2-578]\\d{4}",
			[5],
			[[
				"(\\d{2})(\\d{3})",
				"$1 $2",
				["[2-578]"]
			]]
		],
		"CL": [
			"56",
			"(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0",
			"12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",
			[
				9,
				10,
				11
			],
			[
				[
					"(\\d{5})(\\d{4})",
					"$1 $2",
					["219", "2196"],
					"($1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["60|809"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["44"]
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2[1-36]"],
					"($1)"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["9(?:10|[2-9])"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-8]|[1-9])"],
					"($1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["60|8"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["60"]
				]
			]
		],
		"CM": [
			"237",
			"00",
			"[26]\\d{8}|88\\d{6,7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["88"]
			], [
				"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4 $5",
				["[26]|88"]
			]]
		],
		"CN": [
			"86",
			"00|1(?:[12]\\d|79)\\d\\d00",
			"(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}",
			[
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{5,6})",
					"$1 $2",
					[
						"(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]",
						"(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1",
						"10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12",
						"10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123",
						"10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5,6})",
					"$1 $2",
					[
						"3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]",
						"(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]",
						"85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])",
						"85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["(?:4|80)0"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					[
						"10|2(?:[02-57-9]|1[1-9])",
						"10|2(?:[02-57-9]|1[1-9])",
						"10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"
					],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{7,8})",
					"$1 $2",
					["9"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["80"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[3-578]"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["1[3-9]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3 $4",
					["[12]"],
					"0$1",
					1
				]
			],
			"0",
			0,
			"(1(?:[12]\\d|79)\\d\\d)|0",
			0,
			0,
			0,
			0,
			"00"
		],
		"CO": [
			"57",
			"00(?:4(?:[14]4|56)|[579])",
			"(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}",
			[
				8,
				10,
				11
			],
			[
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["46"]
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["6|90"],
					"($1)"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["3[0-357]|9[14]"]
				],
				[
					"(\\d)(\\d{3})(\\d{7})",
					"$1-$2-$3",
					["1"],
					"0$1",
					0,
					"$1 $2 $3"
				]
			],
			"0",
			0,
			"0([3579]|4(?:[14]4|56))?"
		],
		"CR": [
			"506",
			"00",
			"(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",
			[8, 10],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2-7]|8[3-9]"]
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"$1-$2-$3",
				["[89]"]
			]],
			0,
			0,
			"(19(?:0[0-2468]|1[09]|20|66|77|99))"
		],
		"CU": [
			"53",
			"119",
			"(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}",
			[
				6,
				7,
				8,
				10
			],
			[
				[
					"(\\d{2})(\\d{4,6})",
					"$1 $2",
					["2[1-4]|[34]"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{6,7})",
					"$1 $2",
					["7"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["[56]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"CV": [
			"238",
			"0",
			"(?:[2-59]\\d\\d|800)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["[2-589]"]
			]]
		],
		"CW": [
			"599",
			"00",
			"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",
			[7, 8],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[3467]"]
			], [
				"(\\d)(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["9[4-8]"]
			]],
			0,
			0,
			0,
			0,
			0,
			"[69]"
		],
		"CX": [
			"61",
			"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
			"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",
			[
				6,
				7,
				8,
				9,
				10,
				12
			],
			0,
			"0",
			0,
			"([59]\\d{7})$|0",
			"8$1",
			0,
			0,
			[
				["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]],
				["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]],
				0,
				0,
				0,
				0,
				["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [
					6,
					8,
					10,
					12
				]]
			],
			"0011"
		],
		"CY": [
			"357",
			"00",
			"(?:[279]\\d|[58]0)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{6})",
				"$1 $2",
				["[257-9]"]
			]]
		],
		"CZ": [
			"420",
			"00",
			"(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",
			[
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2-8]|9[015-7]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{2})",
					"$1 $2 $3 $4",
					["96"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["9"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["9"]
				]
			]
		],
		"DE": [
			"49",
			"00",
			"[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15
			],
			[
				[
					"(\\d{2})(\\d{3,13})",
					"$1 $2",
					["3[02]|40|[68]9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,12})",
					"$1 $2",
					["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{2,11})",
					"$1 $2",
					["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["138"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{2,10})",
					"$1 $2",
					["3"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5,11})",
					"$1 $2",
					["181"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{4,10})",
					"$1 $2 $3",
					["1(?:3|80)|9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7,8})",
					"$1 $2",
					["1[67]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7,12})",
					"$1 $2",
					["8"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{6})",
					"$1 $2",
					[
						"185",
						"1850",
						"18500"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{7})",
					"$1 $2",
					["18[68]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{7})",
					"$1 $2",
					["15[1279]"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{6})",
					"$1 $2",
					["15[03568]", "15(?:[0568]|3[13])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{8})",
					"$1 $2",
					["18"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{7,8})",
					"$1 $2 $3",
					["1(?:6[023]|7)"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{2})(\\d{7})",
					"$1 $2 $3",
					["15[279]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{8})",
					"$1 $2 $3",
					["15"],
					"0$1"
				]
			],
			"0"
		],
		"DJ": [
			"253",
			"00",
			"(?:2\\d|77)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[27]"]
			]]
		],
		"DK": [
			"45",
			"00",
			"[2-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2-9]"]
			]]
		],
		"DM": [
			"1",
			"011",
			"(?:[58]\\d\\d|767|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-7]\\d{6})$|1",
			"767$1",
			0,
			"767"
		],
		"DO": [
			"1",
			"011",
			"(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			0,
			0,
			0,
			"8001|8[024]9"
		],
		"DZ": [
			"213",
			"00",
			"(?:[1-4]|[5-79]\\d|80)\\d{7}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[1-4]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[5-8]"],
					"0$1"
				]
			],
			"0"
		],
		"EC": [
			"593",
			"00",
			"1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",
			[
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2-$3",
					["[2-7]"],
					"(0$1)",
					0,
					"$1-$2-$3"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["1"]
				]
			],
			"0"
		],
		"EE": [
			"372",
			"00",
			"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",
			[
				7,
				8,
				10
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]
				],
				[
					"(\\d{4})(\\d{3,4})",
					"$1 $2",
					["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["7"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		"EG": [
			"20",
			"00",
			"[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{7,8})",
					"$1 $2",
					["[23]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{6,7})",
					"$1 $2",
					["1[35]|[4-6]|8[2468]|9[235-7]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{8})",
					"$1 $2",
					["1"],
					"0$1"
				]
			],
			"0"
		],
		"EH": [
			"212",
			"00",
			"[5-8]\\d{8}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["528[89]\\d{5}"],
				["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[016-8]\\d|2[0-8]|5[0-5]))\\d{6}"],
				["80[0-7]\\d{6}"],
				["89\\d{7}"],
				0,
				0,
				0,
				0,
				["(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}"]
			]
		],
		"ER": [
			"291",
			"00",
			"[178]\\d{6}",
			[7],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[178]"],
				"0$1"
			]],
			"0"
		],
		"ES": [
			"34",
			"00",
			"[5-9]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[89]00"]
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-9]"]
			]]
		],
		"ET": [
			"251",
			"00",
			"(?:11|[2-579]\\d)\\d{7}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[1-579]"],
				"0$1"
			]],
			"0"
		],
		"FI": [
			"358",
			"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
			"[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{5})",
					"$1",
					["20[2-59]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,7})",
					"$1 $2",
					["(?:[1-3]0|[68])0|70[07-9]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4,8})",
					"$1 $2",
					["[14]|2[09]|50|7[135]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{6,10})",
					"$1 $2",
					["7"],
					"0$1"
				],
				[
					"(\\d)(\\d{4,9})",
					"$1 $2",
					["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			"1[03-79]|[2-9]",
			0,
			"00"
		],
		"FJ": [
			"679",
			"0(?:0|52)",
			"45\\d{5}|(?:0800\\d|[235-9])\\d{6}",
			[7, 11],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[235-9]|45"]
			], [
				"(\\d{4})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["0"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"FK": [
			"500",
			"00",
			"[2-7]\\d{4}",
			[5]
		],
		"FM": [
			"691",
			"00",
			"(?:[39]\\d\\d|820)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[389]"]
			]]
		],
		"FO": [
			"298",
			"00",
			"[2-9]\\d{5}",
			[6],
			[[
				"(\\d{6})",
				"$1",
				["[2-9]"]
			]],
			0,
			0,
			"(10(?:01|[12]0|88))"
		],
		"FR": [
			"33",
			"00",
			"[1-9]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"],
				"0 $1"
			], [
				"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4 $5",
				["[1-79]"],
				"0$1"
			]],
			"0"
		],
		"GA": [
			"241",
			"00",
			"(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",
			[7, 8],
			[
				[
					"(\\d)(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[2-7]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["0"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["11|[67]"],
					"0$1"
				]
			],
			0,
			0,
			"0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})",
			"$1"
		],
		"GB": [
			"44",
			"00",
			"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",
			[
				7,
				9,
				10
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					[
						"800",
						"8001",
						"80011",
						"800111",
						"8001111"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					[
						"845",
						"8454",
						"84546",
						"845464"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["800"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{4,5})",
					"$1 $2",
					[
						"1(?:38|5[23]|69|76|94)",
						"1(?:(?:38|69)7|5(?:24|39)|768|946)",
						"1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"
					],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5,6})",
					"$1 $2",
					["1(?:[2-69][02-9]|[78])"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{6})",
					"$1 $2",
					["7"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[1389]"],
					"0$1"
				]
			],
			"0",
			0,
			"0|180020",
			0,
			0,
			0,
			[
				["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-5])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|5[01]))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]],
				["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]],
				["80[08]\\d{7}|800\\d{6}|8001111"],
				["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]],
				["70\\d{8}", [10]],
				0,
				["(?:3[0347]|55)\\d{8}", [10]],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]],
				["56\\d{8}", [10]]
			],
			0,
			" x"
		],
		"GD": [
			"1",
			"011",
			"(?:473|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"473$1",
			0,
			"473"
		],
		"GE": [
			"995",
			"00",
			"(?:[3-57]\\d\\d|800)\\d{6}",
			[9],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["70"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["32"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[57]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[348]"],
					"0$1"
				]
			],
			"0"
		],
		"GF": [
			"594",
			"00",
			"(?:694\\d|7093)\\d{5}|(?:59|[89]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-7]|80[6-9]|9[47]"],
				"0$1"
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[89]"],
				"0$1"
			]],
			"0"
		],
		"GG": [
			"44",
			"00",
			"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",
			[
				7,
				9,
				10
			],
			0,
			"0",
			0,
			"([25-9]\\d{5})$|0|180020",
			"1481$1",
			0,
			0,
			[
				["1481[25-9]\\d{5}", [10]],
				["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]],
				["80[08]\\d{7}|800\\d{6}|8001111"],
				["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]],
				["70\\d{8}", [10]],
				0,
				["(?:3[0347]|55)\\d{8}", [10]],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]],
				["56\\d{8}", [10]]
			]
		],
		"GH": [
			"233",
			"00",
			"[235]\\d{8}|800\\d{5,6}",
			[8, 9],
			[[
				"(\\d{3})(\\d{5})",
				"$1 $2",
				["8"],
				"0$1"
			], [
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[2358]"],
				"0$1"
			]],
			"0"
		],
		"GI": [
			"350",
			"00",
			"(?:[25]\\d|60)\\d{6}",
			[8],
			[[
				"(\\d{3})(\\d{5})",
				"$1 $2",
				["2"]
			]]
		],
		"GL": [
			"299",
			"00",
			"(?:19|[2-689]\\d|70)\\d{4}",
			[6],
			[[
				"(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["19|[2-9]"]
			]]
		],
		"GM": [
			"220",
			"00",
			"[2-9]\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-9]"]
			]]
		],
		"GN": [
			"224",
			"00",
			"722\\d{6}|(?:3|6\\d)\\d{7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["3"]
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[67]"]
			]]
		],
		"GP": [
			"590",
			"00",
			"7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-79]|80[6-9]"],
				"0$1"
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"],
				"0$1"
			]],
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:59(?:0(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)|87\\d)|80[6-9]\\d\\d)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"],
				["8[129]\\d{7}"],
				0,
				0,
				0,
				0,
				["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]
			]
		],
		"GQ": [
			"240",
			"00",
			"222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[235]"]
			], [
				"(\\d{3})(\\d{6})",
				"$1 $2",
				["[89]"]
			]]
		],
		"GR": [
			"30",
			"00",
			"5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}",
			[
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["21|7"]
				],
				[
					"(\\d{4})(\\d{6})",
					"$1 $2",
					["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2689]"]
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{5})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		"GT": [
			"502",
			"00",
			"80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}",
			[8, 11],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2-8]"]
			], [
				"(\\d{4})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["1"]
			]]
		],
		"GU": [
			"1",
			"011",
			"(?:[58]\\d\\d|671|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"671$1",
			0,
			"671"
		],
		"GW": [
			"245",
			"00",
			"[49]\\d{8}|4\\d{6}",
			[7, 9],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["40"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[49]"]
			]]
		],
		"GY": [
			"592",
			"001",
			"(?:[2-8]\\d{3}|9008)\\d{3}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-9]"]
			]]
		],
		"HK": [
			"852",
			"00(?:30|5[09]|[126-9]?)",
			"8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}",
			[
				5,
				6,
				7,
				8,
				9,
				11
			],
			[
				[
					"(\\d{3})(\\d{2,5})",
					"$1 $2",
					["900", "9003"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["9"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"HN": [
			"504",
			"00",
			"8\\d{10}|[237-9]\\d{7}",
			[8, 11],
			[[
				"(\\d{4})(\\d{4})",
				"$1-$2",
				["[237-9]"]
			]]
		],
		"HR": [
			"385",
			"00",
			"[2-69]\\d{8}|80\\d{5,7}|[1-79]\\d{7}|6\\d{6}",
			[
				7,
				8,
				9
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["6[01]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["6|7[245]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2-57]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"HT": [
			"509",
			"00",
			"[2-589]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{4})",
				"$1 $2 $3",
				["[2-589]"]
			]]
		],
		"HU": [
			"36",
			"00",
			"[235-7]\\d{8}|[1-9]\\d{7}",
			[8, 9],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"(06 $1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],
					"(06 $1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2-9]"],
					"06 $1"
				]
			],
			"06"
		],
		"ID": [
			"62",
			"00[89]",
			"00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}",
			[
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17
			],
			[
				[
					"(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["15"]
				],
				[
					"(\\d{2})(\\d{5,9})",
					"$1 $2",
					["2[124]|[36]1"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{5,7})",
					"$1 $2",
					["800"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5,8})",
					"$1 $2",
					["[2-79]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{3})",
					"$1-$2-$3",
					["8[1-35-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6,8})",
					"$1 $2",
					["1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["804"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["80"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})(\\d{4,5})",
					"$1-$2-$3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"IE": [
			"353",
			"00",
			"(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["2[24-9]|47|58|6[237-9]|9[35-9]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[45]0"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2569]|4[1-69]|7[14]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["70"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["81"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[78]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["4"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3 $4",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"IL": [
			"972",
			"0(?:0|1[2-9])",
			"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",
			[
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{4})(\\d{3})",
					"$1-$2",
					["125"]
				],
				[
					"(\\d{4})(\\d{2})(\\d{2})",
					"$1-$2-$3",
					["121"]
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[2-489]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[57]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1-$2-$3",
					["12"]
				],
				[
					"(\\d{4})(\\d{6})",
					"$1-$2",
					["159"]
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{3})",
					"$1-$2-$3-$4",
					["1[7-9]"]
				],
				[
					"(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})",
					"$1-$2 $3-$4",
					["15"]
				]
			],
			"0"
		],
		"IM": [
			"44",
			"00",
			"1624\\d{6}|(?:[3578]\\d|90)\\d{8}",
			[10],
			0,
			"0",
			0,
			"([25-8]\\d{5})$|0|180020",
			"1624$1",
			0,
			"74576|(?:16|7[56])24"
		],
		"IN": [
			"91",
			"00",
			"(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",
			[
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d{8})",
					"$1",
					[
						"5(?:0|2[23]|3[03]|[67]1|88)",
						"5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)",
						"5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"
					],
					0,
					1
				],
				[
					"(\\d{4})(\\d{4,5})",
					"$1 $2",
					["180", "1800"],
					0,
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["140"],
					0,
					1
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					[
						"11|2[02]|33|4[04]|79[1-7]|80[2-46]",
						"11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])",
						"11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"
					],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					[
						"1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67)[14]",
						"1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31)|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]",
						"1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:3171|5[15][2-6]|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|8(?:16|2[014]|3[126]|6[136]|7[78]|83)(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"
					],
					"0$1",
					1
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					[
						"1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|3[129]|5[29]|6[02-5]|70)|807",
						"1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7(?:[23569]|8[0-57-9])|8[1-6])|7(?:1(?:[013-8]|9[6-9])|3(?:17|2[0-49]|9[2-57])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
						"1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|8(?:28[235-7]|3))|73179|807(?:1|9[1-3])|(?:1552|6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578])\\d|7(?:[23569]\\d|8[0-57-9])|8(?:[14-6]\\d|2[0-79]))|7(?:1(?:[013-8]\\d|9[6-9])|3(?:2[0-49]|9[2-57])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"
					],
					"0$1",
					1
				],
				[
					"(\\d{5})(\\d{5})",
					"$1 $2",
					["16|[6-9]"],
					"0$1",
					1
				],
				[
					"(\\d{4})(\\d{2,4})(\\d{4})",
					"$1 $2 $3",
					["18[06]", "18[06]0"],
					0,
					1
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["18"],
					0,
					1
				]
			],
			"0"
		],
		"IO": [
			"246",
			"00",
			"3\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["3"]
			]]
		],
		"IQ": [
			"964",
			"00",
			"(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2-6]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"0$1"
				]
			],
			"0"
		],
		"IR": [
			"98",
			"00",
			"[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",
			[
				4,
				5,
				6,
				7,
				10
			],
			[
				[
					"(\\d{4,5})",
					"$1",
					["96"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4,5})",
					"$1 $2",
					["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[1-8]"],
					"0$1"
				]
			],
			"0"
		],
		"IS": [
			"354",
			"00|1(?:0(?:01|[12]0)|100)",
			"(?:38\\d|[4-9])\\d{6}",
			[7, 9],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[4-9]"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["3"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"IT": [
			"39",
			"00",
			"0\\d{5,11}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?",
			[
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{4,6})",
					"$1 $2",
					["0[26]"]
				],
				[
					"(\\d{3})(\\d{3,6})",
					"$1 $2",
					["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]
				],
				[
					"(\\d{4})(\\d{2,6})",
					"$1 $2",
					["0(?:[13-579][2-46-8]|8[236-8])"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["894"]
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["0[26]|5"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["1(?:44|[679])|[378]|43"]
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["0[13-57-9][0159]|14"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{5})",
					"$1 $2 $3",
					["0[26]"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{4,5})",
					"$1 $2 $3",
					["[03]"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				["0(?:669[0-79]\\d{1,6}|831\\d{2,8})|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[2356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"],
				["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]],
				["80(?:0\\d{3}|3)\\d{3}", [6, 9]],
				["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [
					6,
					8,
					9,
					10
				]],
				["1(?:78\\d|99)\\d{6}", [9, 10]],
				["3[2-8]\\d{9,10}", [11, 12]],
				0,
				0,
				["55\\d{8}", [10]],
				["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]
			]
		],
		"JE": [
			"44",
			"00",
			"1534\\d{6}|(?:[3578]\\d|90)\\d{8}",
			[10],
			0,
			"0",
			0,
			"([0-24-8]\\d{5})$|0|180020",
			"1534$1",
			0,
			0,
			[
				["1534[0-24-8]\\d{5}"],
				["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"],
				["80(?:07(?:35|81)|8901)\\d{4}"],
				["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],
				["701511\\d{4}"],
				0,
				["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"],
				["56\\d{8}"]
			]
		],
		"JM": [
			"1",
			"011",
			"(?:[58]\\d\\d|658|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			0,
			0,
			0,
			"658|876"
		],
		"JO": [
			"962",
			"00",
			"(?:(?:[2689]|7\\d)\\d|32|427|53)\\d{6}",
			[8, 9],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2356]|87"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{5,6})",
					"$1 $2",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["70"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[47]"],
					"0$1"
				]
			],
			"0"
		],
		"JP": [
			"81",
			"010",
			"00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",
			[
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1-$2-$3",
					["(?:12|57|99)0"],
					"0$1"
				],
				[
					"(\\d{4})(\\d)(\\d{4})",
					"$1-$2-$3",
					[
						"1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])",
						"1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]",
						"1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"
					],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["60"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1-$2-$3",
					["3|4(?:2[09]|7[01])|6[1-9]", "3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					[
						"1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])",
						"1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]",
						"1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1-$2-$3",
					["[14]|[289][2-9]|5[3-9]|7[2-4679]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["800"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1-$2-$3",
					["[25-9]"],
					"0$1"
				]
			],
			"0",
			0,
			"(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0",
			"$1"
		],
		"KE": [
			"254",
			"000",
			"(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{5,7})",
					"$1 $2",
					["[24-6]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["[17]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				]
			],
			"0"
		],
		"KG": [
			"996",
			"00",
			"8\\d{9}|[235-9]\\d{8}",
			[9, 10],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["3(?:1[346]|[24-79])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[235-79]|88"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d)(\\d{2,3})",
					"$1 $2 $3 $4",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"KH": [
			"855",
			"00[14-9]",
			"1\\d{9}|[1-9]\\d{7,8}",
			[
				8,
				9,
				10
			],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[1-9]"],
				"0$1"
			], [
				"(\\d{4})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["1"]
			]],
			"0"
		],
		"KI": [
			"686",
			"00",
			"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",
			[5, 8],
			0,
			"0"
		],
		"KM": [
			"269",
			"00",
			"[3478]\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["[3478]"]
			]]
		],
		"KN": [
			"1",
			"011",
			"(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-7]\\d{6})$|1",
			"869$1",
			0,
			"869"
		],
		"KP": [
			"850",
			"00|99",
			"85\\d{6}|(?:19\\d|[2-7])\\d{7}",
			[8, 10],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2-7]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				]
			],
			"0"
		],
		"KR": [
			"82",
			"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))",
			"00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",
			[
				5,
				6,
				8,
				9,
				10,
				11,
				12,
				13,
				14
			],
			[
				[
					"(\\d{2})(\\d{3,4})",
					"$1-$2",
					["(?:3[1-3]|[46][1-4]|5[1-5])1"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{4})",
					"$1-$2",
					["1"]
				],
				[
					"(\\d)(\\d{3,4})(\\d{4})",
					"$1-$2-$3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[36]0|8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1-$2-$3",
					["[1346]|5[1-5]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1-$2-$3",
					["[57]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{5})(\\d{4})",
					"$1-$2-$3",
					["5"],
					"0$1"
				]
			],
			"0",
			0,
			"0(8(?:[1-46-8]|5\\d\\d))?"
		],
		"KW": [
			"965",
			"00",
			"18\\d{5}|(?:[2569]\\d|41)\\d{6}",
			[7, 8],
			[[
				"(\\d{4})(\\d{3,4})",
				"$1 $2",
				["[169]|2(?:[235]|4[1-35-9])|52"]
			], [
				"(\\d{3})(\\d{5})",
				"$1 $2",
				["[245]"]
			]]
		],
		"KY": [
			"1",
			"011",
			"(?:345|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"345$1",
			0,
			"345"
		],
		"KZ": [
			"7",
			"810",
			"8\\d{13}|[78]\\d{9}",
			[10, 14],
			0,
			"8",
			0,
			0,
			0,
			0,
			"7",
			0,
			"8~10"
		],
		"LA": [
			"856",
			"00",
			"[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2[13]|3[14]|[4-8]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["3"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["[23]"],
					"0$1"
				]
			],
			"0"
		],
		"LB": [
			"961",
			"00",
			"[27-9]\\d{7}|[13-9]\\d{6}",
			[7, 8],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[13-69]|7(?:[2-57]|62|8[0-6]|9[04-9])|8[02-9]"],
				"0$1"
			], [
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[27-9]"]
			]],
			"0"
		],
		"LC": [
			"1",
			"011",
			"(?:[58]\\d\\d|758|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-8]\\d{6})$|1",
			"758$1",
			0,
			"758"
		],
		"LI": [
			"423",
			"00",
			"[68]\\d{8}|(?:[2378]\\d|90)\\d{5}",
			[7, 9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["69"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6"]
				]
			],
			"0",
			0,
			"(1001)|0"
		],
		"LK": [
			"94",
			"00",
			"[1-9]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["7"],
				"0$1"
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[1-689]"],
				"0$1"
			]],
			"0"
		],
		"LR": [
			"231",
			"00",
			"(?:[2457]\\d|33|88)\\d{7}|(?:2\\d|[4-6])\\d{6}",
			[
				7,
				8,
				9
			],
			[
				[
					"(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["4[67]|[56]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2-578]"],
					"0$1"
				]
			],
			"0"
		],
		"LS": [
			"266",
			"00",
			"(?:[256]\\d\\d|800)\\d{5}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2568]"]
			]]
		],
		"LT": [
			"370",
			"00",
			"(?:[3469]\\d|52|[78]0)\\d{6}",
			[8],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["52[0-7]"],
					"(0-$1)",
					1
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["[7-9]"],
					"0 $1",
					1
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["37|4(?:[15]|6[1-8])"],
					"(0-$1)",
					1
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[3-6]"],
					"(0-$1)",
					1
				]
			],
			"0",
			0,
			"[08]"
		],
		"LU": [
			"352",
			"00",
			"35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{2})(\\d{3})",
					"$1 $2",
					["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["20[2-689]"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
					"$1 $2 $3 $4",
					["20"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})",
					"$1 $2 $3 $4",
					["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["80[01]|90[015]"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["20"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
					"$1 $2 $3 $4 $5",
					["20"]
				]
			],
			0,
			0,
			"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"
		],
		"LV": [
			"371",
			"00",
			"(?:[268]\\d|78|90)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[2679]|8[01]"]
			]]
		],
		"LY": [
			"218",
			"00",
			"[2-9]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{7})",
				"$1-$2",
				["[2-9]"],
				"0$1"
			]],
			"0"
		],
		"MA": [
			"212",
			"00",
			"[5-8]\\d{8}",
			[9],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1-$2",
					["892"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1-$2",
					["8(?:0[0-7]|9)"],
					"0$1"
				],
				[
					"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4 $5",
					["[5-8]"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			"[5-8]"
		],
		"MC": [
			"377",
			"00",
			"(?:[3489]|[67]\\d)\\d{7}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["4"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[389]"]
				],
				[
					"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4 $5",
					["[67]"],
					"0$1"
				]
			],
			"0"
		],
		"MD": [
			"373",
			"00",
			"(?:[235-7]\\d|[89]0)\\d{6}",
			[8],
			[
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["22|3"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["[25-7]"],
					"0$1"
				]
			],
			"0"
		],
		"ME": [
			"382",
			"00",
			"(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[2-9]"],
				"0$1"
			]],
			"0"
		],
		"MF": [
			"590",
			"00",
			"7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:59(?:0(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)|87\\d)|80[6-9]\\d\\d)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"],
				["8[129]\\d{7}"],
				0,
				0,
				0,
				0,
				["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]
			]
		],
		"MG": [
			"261",
			"00",
			"[23]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{2})(\\d{3})(\\d{2})",
				"$1 $2 $3 $4",
				["[23]"],
				"0$1"
			]],
			"0",
			0,
			"([24-9]\\d{6})$|0",
			"20$1"
		],
		"MH": [
			"692",
			"011",
			"329\\d{4}|(?:[256]\\d|45)\\d{5}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["[2-6]"]
			]],
			"1"
		],
		"MK": [
			"389",
			"00",
			"[2-578]\\d{7}",
			[8],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["2|34[47]|4(?:[37]7|5[47]|64)"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[347]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[58]"],
					"0$1"
				]
			],
			"0"
		],
		"ML": [
			"223",
			"00",
			"[24-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[24-9]"]
			]]
		],
		"MM": [
			"95",
			"00",
			"1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",
			[
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["16|2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[12]|452|678|86", "[12]|452|6788|86"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[4-7]|8[1-35]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4,6})",
					"$1 $2 $3",
					["9(?:2[0-4]|[35-9]|4[137-9])"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["92"],
					"0$1"
				],
				[
					"(\\d)(\\d{5})(\\d{4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				]
			],
			"0"
		],
		"MN": [
			"976",
			"001",
			"[12]\\d{7,9}|[5-9]\\d{7}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["11|2[16]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[5-9]"]
				],
				[
					"(\\d{3})(\\d{5,6})",
					"$1 $2",
					["[12]2[1-3]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5,6})",
					"$1 $2",
					["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{4,5})",
					"$1 $2",
					["[12]"],
					"0$1"
				]
			],
			"0"
		],
		"MO": [
			"853",
			"00",
			"0800\\d{3}|(?:28|[68]\\d)\\d{6}",
			[7, 8],
			[[
				"(\\d{4})(\\d{3})",
				"$1 $2",
				["0"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[268]"]
			]]
		],
		"MP": [
			"1",
			"011",
			"[58]\\d{9}|(?:67|90)0\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"670$1",
			0,
			"670"
		],
		"MQ": [
			"596",
			"00",
			"7091\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-79]|8(?:0[6-9]|[36])"],
				"0$1"
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"],
				"0$1"
			]],
			"0"
		],
		"MR": [
			"222",
			"00",
			"(?:[2-4]\\d\\d|800)\\d{5}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2-48]"]
			]]
		],
		"MS": [
			"1",
			"011",
			"(?:[58]\\d\\d|664|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([34]\\d{6})$|1",
			"664$1",
			0,
			"664"
		],
		"MT": [
			"356",
			"00",
			"3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2357-9]"]
			]]
		],
		"MU": [
			"230",
			"0(?:0|[24-7]0|3[03])",
			"(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}",
			[
				7,
				8,
				10
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[2-46]|8[013]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[57]"]
				],
				[
					"(\\d{5})(\\d{5})",
					"$1 $2",
					["8"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"020"
		],
		"MV": [
			"960",
			"0(?:0|19)",
			"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",
			[7, 10],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["[34679]"]
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[89]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"MW": [
			"265",
			"00",
			"(?:[1289]\\d|31|77)\\d{7}|1\\d{6}",
			[7, 9],
			[
				[
					"(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1[2-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[137-9]"],
					"0$1"
				]
			],
			"0"
		],
		"MX": [
			"52",
			"0[09]",
			"[2-9]\\d{9}",
			[10],
			[[
				"(\\d{2})(\\d{4})(\\d{4})",
				"$1 $2 $3",
				["33|5[56]|81"]
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[2-9]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"MY": [
			"60",
			"00",
			"1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1-$2 $3",
					["[4-79]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1-$2 $3",
					["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1-$2 $3",
					["3"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2})(\\d{4})",
					"$1-$2-$3-$4",
					["1(?:[367]|80)"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1-$2 $3",
					["15"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1-$2 $3",
					["1"],
					"0$1"
				]
			],
			"0"
		],
		"MZ": [
			"258",
			"00",
			"(?:2|8\\d)\\d{7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["2|8[2-79]"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["8"]
			]]
		],
		"NA": [
			"264",
			"00",
			"[68]\\d{7,8}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["88"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["6"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["87"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"NC": [
			"687",
			"00",
			"(?:050|[2-57-9]\\d\\d)\\d{3}",
			[6],
			[[
				"(\\d{2})(\\d{2})(\\d{2})",
				"$1.$2.$3",
				["[02-57-9]"]
			]]
		],
		"NE": [
			"227",
			"00",
			"[027-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["08"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[089]|2[013]|7[0467]"]
			]]
		],
		"NF": [
			"672",
			"00",
			"[13]\\d{5}",
			[6],
			[[
				"(\\d{2})(\\d{4})",
				"$1 $2",
				["1[0-3]"]
			], [
				"(\\d)(\\d{5})",
				"$1 $2",
				["[13]"]
			]],
			0,
			0,
			"([0-258]\\d{4})$",
			"3$1"
		],
		"NG": [
			"234",
			"009",
			"(?:20|9\\d)\\d{8}|[78]\\d{9,13}",
			[
				10,
				11,
				12,
				13,
				14
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[7-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["20[129]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})(\\d{4,5})",
					"$1 $2 $3",
					["[78]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})(\\d{5,6})",
					"$1 $2 $3",
					["[78]"],
					"0$1"
				]
			],
			"0"
		],
		"NI": [
			"505",
			"00",
			"(?:1800|[25-8]\\d{3})\\d{4}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[125-8]"]
			]]
		],
		"NL": [
			"31",
			"00",
			"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{4,7})",
					"$1 $2",
					["[89]0"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["66"],
					"0$1"
				],
				[
					"(\\d)(\\d{8})",
					"$1 $2",
					["6"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[1-578]|91"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{5})",
					"$1 $2 $3",
					["9"],
					"0$1"
				]
			],
			"0"
		],
		"NO": [
			"47",
			"00",
			"(?:0|[2-9]\\d{3})\\d{4}",
			[5, 8],
			[[
				"(\\d{3})(\\d{2})(\\d{3})",
				"$1 $2 $3",
				["8"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2-79]"]
			]],
			0,
			0,
			0,
			0,
			0,
			"[02-689]|7[0-8]"
		],
		"NP": [
			"977",
			"00",
			"(?:1\\d|9)\\d{9}|[1-9]\\d{7}",
			[
				8,
				10,
				11
			],
			[
				[
					"(\\d)(\\d{7})",
					"$1-$2",
					["1[2-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1-$2",
					["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1-$2",
					["9"]
				]
			],
			"0"
		],
		"NR": [
			"674",
			"00",
			"(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[24-9]"]
			]]
		],
		"NU": [
			"683",
			"00",
			"(?:[4-7]|888\\d)\\d{3}",
			[4, 7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["8"]
			]]
		],
		"NZ": [
			"64",
			"0(?:0|161)",
			"[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}",
			[
				5,
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{3,8})",
					"$1 $2",
					["8[1-79]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["50[036-8]|8|90", "50(?:[0367]|88)|8|90"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["24|[346]|7[2-57-9]|9[2-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2(?:10|74)|[589]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["1|2[028]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,5})",
					"$1 $2 $3",
					["2(?:[169]|7[0-35-9])|7"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"OM": [
			"968",
			"00",
			"(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}",
			[
				7,
				8,
				9
			],
			[
				[
					"(\\d{3})(\\d{4,6})",
					"$1 $2",
					["[58]"]
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["2"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[179]"]
				]
			]
		],
		"PA": [
			"507",
			"00",
			"(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}",
			[
				7,
				8,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1-$2",
					["[1-57-9]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1-$2",
					["[68]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		"PE": [
			"51",
			"00|19(?:1[124]|77|90)00",
			"(?:[14-8]|9\\d)\\d{7}",
			[8, 9],
			[
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["80"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["1"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["[4-8]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["9"]
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00",
			" Anexo "
		],
		"PF": [
			"689",
			"00",
			"4\\d{5}(?:\\d{2})?|8\\d{7,8}",
			[
				6,
				8,
				9
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["44"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["4|8[7-9]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["8"]
				]
			]
		],
		"PG": [
			"675",
			"00|140[1-3]",
			"(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",
			[7, 8],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["18|[2-69]|85"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[78]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"PH": [
			"63",
			"00",
			"(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}",
			[
				6,
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d)(\\d{5})",
					"$1 $2",
					["2"],
					"(0$1)"
				],
				[
					"(\\d{4})(\\d{4,6})",
					"$1 $2",
					["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],
					"(0$1)"
				],
				[
					"(\\d{5})(\\d{4})",
					"$1 $2",
					["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[3-7]|8[2-8]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"]
				],
				[
					"(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})",
					"$1 $2 $3 $4",
					["1"]
				]
			],
			"0"
		],
		"PK": [
			"92",
			"00",
			"122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",
			[
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{2,7})",
					"$1 $2 $3",
					["[89]0"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["1"]
				],
				[
					"(\\d{3})(\\d{6,7})",
					"$1 $2",
					["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{7,8})",
					"$1 $2",
					["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],
					"(0$1)"
				],
				[
					"(\\d{5})(\\d{5})",
					"$1 $2",
					["58"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["3"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["[24-9]"],
					"(0$1)"
				]
			],
			"0"
		],
		"PL": [
			"48",
			"00",
			"(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}",
			[
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{5})",
					"$1",
					["19"]
				],
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["11|20|64"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["30|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "30|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["64"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["1[2-8]|[2-7]|8[1-79]|9[145]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		"PM": [
			"508",
			"00",
			"[78]\\d{8}|[2-9]\\d{5}",
			[6, 9],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["[2-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["7"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"PR": [
			"1",
			"011",
			"(?:[589]\\d\\d|787)\\d{7}",
			[10],
			0,
			"1",
			0,
			0,
			0,
			0,
			"787|939"
		],
		"PS": [
			"970",
			"00",
			"[2489]2\\d{6}|(?:1\\d|5)\\d{8}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2489]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["5"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1"]
				]
			],
			"0"
		],
		"PT": [
			"351",
			"00",
			"1693\\d{5}|(?:[26-9]\\d|30)\\d{7}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["2[12]"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["16|[236-9]"]
			]]
		],
		"PW": [
			"680",
			"01[12]",
			"(?:[24-8]\\d\\d|345|900)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-9]"]
			]]
		],
		"PY": [
			"595",
			"00",
			"[36-8]\\d{5,8}|4\\d{6,8}|59\\d{6}|9\\d{5,10}|(?:2\\d|5[0-8])\\d{6,7}",
			[
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{3,6})",
					"$1 $2",
					["[2-9]0"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["3[289]|4[246-8]|61|7[1-3]|8[1-36]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{4,5})",
					"$1 $2",
					["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["87"]
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["9(?:[5-79]|8[1-7])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2-8]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["9"]
				]
			],
			"0"
		],
		"QA": [
			"974",
			"00",
			"800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}",
			[
				7,
				8,
				9,
				11
			],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["2[136]|8"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[3-7]"]
			]]
		],
		"RE": [
			"262",
			"00",
			"709\\d{6}|(?:26|[689]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[26-9]"],
				"0$1"
			]],
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["2631[0-6]\\d{4}|26(?:2\\d|30|88)\\d{5}"],
				["(?:69(?:2\\d\\d|3(?:[06][0-6]|1[0-3]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}"],
				["80\\d{7}"],
				["89[1-37-9]\\d{6}"],
				0,
				0,
				0,
				0,
				["9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}"],
				["8(?:1[019]|2[0156]|84|90)\\d{6}"]
			]
		],
		"RO": [
			"40",
			"00",
			"(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}",
			[6, 9],
			[
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["2[3-6]", "2[3-6]\\d9"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})",
					"$1 $2",
					["219|31"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[23]1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[236-9]"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			" int "
		],
		"RS": [
			"381",
			"00",
			"38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",
			[
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[[
				"(\\d{3})(\\d{3,9})",
				"$1 $2",
				["(?:2[389]|39)0|[7-9]"],
				"0$1"
			], [
				"(\\d{2})(\\d{5,10})",
				"$1 $2",
				["[1-36]"],
				"0$1"
			]],
			"0"
		],
		"RU": [
			"7",
			"810",
			"8\\d{13}|[347-9]\\d{9}",
			[10, 14],
			[
				[
					"(\\d{4})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"7(?:1[0-8]|2[1-9])",
						"7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))",
						"7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"
					],
					"8 ($1)",
					1
				],
				[
					"(\\d{5})(\\d)(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"7(?:1[0-68]|2[1-9])",
						"7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))",
						"7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"
					],
					"8 ($1)",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"8 ($1)",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["[349]|8(?:[02-7]|1[1-8])"],
					"8 ($1)",
					1
				],
				[
					"(\\d{4})(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["8"],
					"8 ($1)"
				]
			],
			"8",
			0,
			0,
			0,
			0,
			"[3489]",
			0,
			"8~10"
		],
		"RW": [
			"250",
			"00",
			"(?:06|[27]\\d\\d|[89]00)\\d{6}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["0"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[7-9]"],
					"0$1"
				]
			],
			"0"
		],
		"SA": [
			"966",
			"00",
			"(?:[15]\\d|800|92)\\d{7}",
			[9, 10],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["9"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["5"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"]
				]
			],
			"0"
		],
		"SB": [
			"677",
			"0[01]",
			"[6-9]\\d{6}|[1-6]\\d{4}",
			[5, 7],
			[[
				"(\\d{2})(\\d{5})",
				"$1 $2",
				["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]
			]]
		],
		"SC": [
			"248",
			"010|0[0-2]",
			"(?:[2489]\\d|64)\\d{5}",
			[7],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[246]|9[57]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"SD": [
			"249",
			"00",
			"[19]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[19]"],
				"0$1"
			]],
			"0"
		],
		"SE": [
			"46",
			"00",
			"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",
			[
				6,
				7,
				8,
				9,
				10,
				12
			],
			[
				[
					"(\\d{2})(\\d{2,3})(\\d{2})",
					"$1-$2 $3",
					["20"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1-$2",
					["9(?:00|39|44|9)"],
					"0$1",
					0,
					"$1 $2"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})",
					"$1-$2 $3",
					["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d)(\\d{2,3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["8"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2,3})(\\d{2})",
					"$1-$2 $3",
					["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d{3})(\\d{2,3})(\\d{3})",
					"$1-$2 $3",
					["9(?:00|39|44)"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["10|7"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{2})",
					"$1-$2 $3 $4",
					["8"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{3})",
					"$1-$2 $3 $4",
					["9"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4 $5",
					["[26]"],
					"0$1",
					0,
					"$1 $2 $3 $4 $5"
				]
			],
			"0"
		],
		"SG": [
			"65",
			"0[0-3]\\d",
			"(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",
			[
				8,
				10,
				11
			],
			[
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[369]|8(?:0[1-9]|[1-9])"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"]
				],
				[
					"(\\d{4})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["7"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"]
				]
			]
		],
		"SH": [
			"290",
			"00",
			"(?:[256]\\d|8)\\d{3}",
			[4, 5],
			0,
			0,
			0,
			0,
			0,
			0,
			"[256]"
		],
		"SI": [
			"386",
			"00|10(?:22|66|88|99)",
			"[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",
			[
				5,
				6,
				7,
				8
			],
			[
				[
					"(\\d{2})(\\d{3,6})",
					"$1 $2",
					["8[09]|9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["59|8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[37][01]|4[0139]|51|6"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[1-57]"],
					"(0$1)"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"SJ": [
			"47",
			"00",
			"0\\d{4}|(?:[489]\\d|79)\\d{6}",
			[5, 8],
			0,
			0,
			0,
			0,
			0,
			0,
			"79"
		],
		"SK": [
			"421",
			"00",
			"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",
			[
				6,
				7,
				9
			],
			[
				[
					"(\\d)(\\d{2})(\\d{3,4})",
					"$1 $2 $3",
					["21"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["[3-5][1-8]1", "[3-5][1-8]1[67]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{2})",
					"$1 $2 $3 $4",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[689]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[3-5]"],
					"0$1"
				]
			],
			"0"
		],
		"SL": [
			"232",
			"00",
			"(?:[237-9]\\d|66)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{6})",
				"$1 $2",
				["[236-9]"],
				"(0$1)"
			]],
			"0"
		],
		"SM": [
			"378",
			"00",
			"(?:0549|[5-7]\\d)\\d{6}",
			[8, 10],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-7]"]
			], [
				"(\\d{4})(\\d{6})",
				"$1 $2",
				["0"]
			]],
			0,
			0,
			"([89]\\d{5})$",
			"0549$1"
		],
		"SN": [
			"221",
			"00",
			"(?:[378]\\d|93)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"]
			], [
				"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[379]"]
			]]
		],
		"SO": [
			"252",
			"00",
			"[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",
			[
				6,
				7,
				8,
				9
			],
			[
				[
					"(\\d{2})(\\d{4})",
					"$1 $2",
					["8[125]"]
				],
				[
					"(\\d{6})",
					"$1",
					["[134]"]
				],
				[
					"(\\d)(\\d{6})",
					"$1 $2",
					["[15]|2[0-79]|3[0-46-8]|4[0-7]"]
				],
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["(?:2|90)4|[67]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[348]|64|79|90"]
				],
				[
					"(\\d{2})(\\d{5,7})",
					"$1 $2",
					["1|28|6[0-35-9]|7[67]|9[2-9]"]
				]
			],
			"0"
		],
		"SR": [
			"597",
			"00",
			"(?:[2-5]|[6-9]\\d)\\d{5}",
			[6, 7],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1-$2-$3",
					["56"]
				],
				[
					"(\\d{3})(\\d{3})",
					"$1-$2",
					["[2-5]"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1-$2",
					["[6-9]"]
				]
			]
		],
		"SS": [
			"211",
			"00",
			"[19]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[19]"],
				"0$1"
			]],
			"0"
		],
		"ST": [
			"239",
			"00",
			"(?:22|9\\d)\\d{5}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[29]"]
			]]
		],
		"SV": [
			"503",
			"00",
			"[25-7]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?",
			[
				7,
				8,
				11
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[89]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[25-7]"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[89]"]
				]
			]
		],
		"SX": [
			"1",
			"011",
			"7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"(5\\d{6})$|1",
			"721$1",
			0,
			"721"
		],
		"SY": [
			"963",
			"00",
			"[1-359]\\d{8}|[1-5]\\d{7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[1-4]|5[1-3]"],
				"0$1",
				1
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[59]"],
				"0$1",
				1
			]],
			"0"
		],
		"SZ": [
			"268",
			"00",
			"0800\\d{4}|(?:[237]\\d|900)\\d{6}",
			[8, 9],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[0237]"]
			], [
				"(\\d{5})(\\d{4})",
				"$1 $2",
				["9"]
			]]
		],
		"TA": [
			"290",
			"00",
			"8\\d{3}",
			[4],
			0,
			0,
			0,
			0,
			0,
			0,
			"8"
		],
		"TC": [
			"1",
			"011",
			"(?:[58]\\d\\d|649|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-479]\\d{6})$|1",
			"649$1",
			0,
			"649"
		],
		"TD": [
			"235",
			"00|16",
			"(?:22|[3689]\\d|77)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[236-9]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		"TG": [
			"228",
			"00",
			"[279]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[279]"]
			]]
		],
		"TH": [
			"66",
			"00[1-9]",
			"(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}",
			[
				8,
				9,
				10,
				13
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[13-9]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1"]
				]
			],
			"0"
		],
		"TJ": [
			"992",
			"810",
			"(?:[0-57-9]\\d|66)\\d{7}",
			[9],
			[
				[
					"(\\d{6})(\\d)(\\d{2})",
					"$1 $2 $3",
					["331", "3317"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["44[02-479]|[34]7"]
				],
				[
					"(\\d{4})(\\d)(\\d{4})",
					"$1 $2 $3",
					["3(?:[1245]|3[12])"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["\\d"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"8~10"
		],
		"TK": [
			"690",
			"00",
			"[2-47]\\d{3,6}",
			[
				4,
				5,
				6,
				7
			]
		],
		"TL": [
			"670",
			"00",
			"7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",
			[7, 8],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-489]|70"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["7"]
			]]
		],
		"TM": [
			"993",
			"810",
			"(?:[1-6]\\d|71)\\d{6}",
			[8],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["12"],
					"(8 $1)"
				],
				[
					"(\\d{3})(\\d)(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["[1-5]"],
					"(8 $1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["[67]"],
					"8 $1"
				]
			],
			"8",
			0,
			0,
			0,
			0,
			0,
			0,
			"8~10"
		],
		"TN": [
			"216",
			"00",
			"[2-57-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[2-57-9]"]
			]]
		],
		"TO": [
			"676",
			"00",
			"(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}",
			[5, 7],
			[
				[
					"(\\d{2})(\\d{3})",
					"$1-$2",
					["[2-4]|50|6[09]|7[0-24-69]|8[05]"]
				],
				[
					"(\\d{4})(\\d{3})",
					"$1 $2",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[5-9]"]
				]
			]
		],
		"TR": [
			"90",
			"00",
			"4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",
			[
				7,
				10,
				12,
				13
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["512|8[01589]|90"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"5(?:[0-579]|61)",
						"5(?:[0-579]|61[06])",
						"5(?:[0-579]|61[06]1)"
					],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[24][1-8]|3[1-9]"],
					"(0$1)",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{6,7})",
					"$1 $2 $3",
					["80"],
					"0$1",
					1
				]
			],
			"0"
		],
		"TT": [
			"1",
			"011",
			"(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-46-8]\\d{6})$|1",
			"868$1",
			0,
			"868"
		],
		"TV": [
			"688",
			"00",
			"(?:2|7\\d\\d|90)\\d{4}",
			[
				5,
				6,
				7
			],
			[
				[
					"(\\d{2})(\\d{3})",
					"$1 $2",
					["2"]
				],
				[
					"(\\d{2})(\\d{4})",
					"$1 $2",
					["90"]
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["7"]
				]
			]
		],
		"TW": [
			"886",
			"0(?:0[25-79]|19)",
			"[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",
			[
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{2})(\\d)(\\d{4})",
					"$1 $2 $3",
					["202"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["826"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["83"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["82"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[25]0|37|49|8[09]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["[23568]|4(?:0[02-48]|[1-478])|7[1-9]", "[23568]|4(?:0[2-48]|[1-478])|(?:400|7)[1-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[49]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4,5})",
					"$1 $2 $3",
					["7"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"#"
		],
		"TZ": [
			"255",
			"00[056]",
			"(?:[25-8]\\d|41|90)\\d{7}",
			[9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[24]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["5"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[67]"],
					"0$1"
				]
			],
			"0"
		],
		"UA": [
			"380",
			"00",
			"[89]\\d{9}|[3-9]\\d{8}",
			[9, 10],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[3-7]|89|9[1-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"0~0"
		],
		"UG": [
			"256",
			"00[057]",
			"800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",
			[9],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["202", "2024"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["[27-9]|4(?:6[45]|[7-9])"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["[34]"],
					"0$1"
				]
			],
			"0"
		],
		"US": [
			"1",
			"011",
			"[2-9]\\d{9}|3\\d{6}",
			[10],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["310"],
				0,
				1
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"($1) $2-$3",
				["[2-9]"],
				0,
				1,
				"$1-$2-$3"
			]],
			"1",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:274[27]|(?:472|983)[2-47-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[013-79]|3[0-24679]|4[167]|5[0-3]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-269])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-2478]|4[0378]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}"],
				[""],
				["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],
				["900[2-9]\\d{6}"],
				["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|3[23]|44|66|77|88)[2-9]\\d{6}"]
			]
		],
		"UY": [
			"598",
			"0(?:0|1[3-9]\\d)",
			"0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d{4,5})",
					"$1",
					["21"]
				],
				[
					"(\\d{3})(\\d{3,4})",
					"$1 $2",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[49]0|8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[124]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{2,4})",
					"$1 $2 $3",
					["0"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})",
					"$1 $2 $3 $4",
					["0"]
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00",
			" int. "
		],
		"UZ": [
			"998",
			"00",
			"(?:20|33|[5-9]\\d)\\d{7}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[235-9]"]
			]]
		],
		"VA": [
			"39",
			"00",
			"0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",
			[
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			0,
			0,
			0,
			0,
			0,
			0,
			"06698"
		],
		"VC": [
			"1",
			"011",
			"(?:[58]\\d\\d|784|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-7]\\d{6})$|1",
			"784$1",
			0,
			"784"
		],
		"VE": [
			"58",
			"00",
			"[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",
			[10],
			[[
				"(\\d{3})(\\d{7})",
				"$1-$2",
				["[24-689]"],
				"0$1"
			]],
			"0"
		],
		"VG": [
			"1",
			"011",
			"(?:284|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-578]\\d{6})$|1",
			"284$1",
			0,
			"284"
		],
		"VI": [
			"1",
			"011",
			"[58]\\d{9}|(?:34|90)0\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"340$1",
			0,
			"340"
		],
		"VN": [
			"84",
			"00",
			"[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["80"],
					"0$1",
					1
				],
				[
					"(\\d{4})(\\d{4,6})",
					"$1 $2",
					["1"],
					0,
					1
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["6"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[357-9]"],
					"0$1",
					1
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2[48]"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["2"],
					"0$1",
					1
				]
			],
			"0"
		],
		"VU": [
			"678",
			"00",
			"[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}",
			[5, 7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[57-9]"]
			]]
		],
		"WF": [
			"681",
			"00",
			"(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}",
			[6, 9],
			[[
				"(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["[47-9]"]
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"]
			]]
		],
		"WS": [
			"685",
			"0",
			"(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",
			[
				5,
				6,
				7,
				10
			],
			[
				[
					"(\\d{5})",
					"$1",
					["[2-5]|6[1-9]"]
				],
				[
					"(\\d{3})(\\d{3,7})",
					"$1 $2",
					["[68]"]
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["7"]
				]
			]
		],
		"XK": [
			"383",
			"00",
			"2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}",
			[
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2-4]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2|39"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7,10})",
					"$1 $2",
					["3"],
					"0$1"
				]
			],
			"0"
		],
		"YE": [
			"967",
			"00",
			"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",
			[
				7,
				8,
				9
			],
			[[
				"(\\d)(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[1-6]|7(?:[24-6]|8[0-7])"],
				"0$1"
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["7"],
				"0$1"
			]],
			"0"
		],
		"YT": [
			"262",
			"00",
			"(?:639\\d|7093)\\d{5}|(?:26|80|9\\d)\\d{7}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["26(?:89\\d|9(?:0[0-467]|15|5[0-4]|6\\d|[78]0))\\d{4}"],
				["(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}"],
				["80\\d{7}"],
				0,
				0,
				0,
				0,
				0,
				["9(?:(?:39|47)8[01]|769\\d)\\d{4}"]
			]
		],
		"ZA": [
			"27",
			"00",
			"[1-79]\\d{8}|8\\d{4,9}",
			[
				5,
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{3,4})",
					"$1 $2",
					["8[1-4]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2,3})",
					"$1 $2 $3",
					["8[1-4]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["860"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[1-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		"ZM": [
			"260",
			"00",
			"800\\d{6}|(?:21|[579]\\d|63)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[28]"],
				"0$1"
			], [
				"(\\d{2})(\\d{7})",
				"$1 $2",
				["[579]"],
				"0$1"
			]],
			"0"
		],
		"ZW": [
			"263",
			"00",
			"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",
			[
				5,
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{3})(\\d{3,5})",
					"$1 $2",
					["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2,4})",
					"$1 $2 $3",
					["[49]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["80"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{6})",
					"$1 $2",
					["8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,5})",
					"$1 $2",
					["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["29[013-9]|39|54"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3,5})",
					"$1 $2",
					["(?:25|54)8", "258|5483"],
					"0$1"
				]
			],
			"0"
		]
	},
	"nonGeographic": {
		"800": [
			"800",
			0,
			"(?:00|[1-9]\\d)\\d{6}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["\\d"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				["(?:00|[1-9]\\d)\\d{6}"]
			]
		],
		"808": [
			"808",
			0,
			"[1-9]\\d{7}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[1-9]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				["[1-9]\\d{7}"]
			]
		],
		"870": [
			"870",
			0,
			"7\\d{11}|[235-7]\\d{8}",
			[9, 12],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[235-7]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"],
				0,
				0,
				0,
				0,
				0,
				0,
				["2\\d{8}", [9]]
			]
		],
		"878": [
			"878",
			0,
			"10\\d{10}",
			[12],
			[[
				"(\\d{2})(\\d{5})(\\d{5})",
				"$1 $2 $3",
				["1"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				["10\\d{10}"]
			]
		],
		"881": [
			"881",
			0,
			"6\\d{9}|[0-36-9]\\d{8}",
			[9, 10],
			[[
				"(\\d)(\\d{3})(\\d{5})",
				"$1 $2 $3",
				["[0-37-9]"]
			], [
				"(\\d)(\\d{3})(\\d{5,6})",
				"$1 $2 $3",
				["6"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[0, ["6\\d{9}|[0-36-9]\\d{8}"]]
		],
		"882": [
			"882",
			0,
			"[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?",
			[
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["16|342"]
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["49"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["1[36]|9"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["3[23]"]
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["16"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["10|23|3(?:[15]|4[57])|4|5[12]"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["34"]
				],
				[
					"(\\d{2})(\\d{4,5})(\\d{5})",
					"$1 $2 $3",
					["[1-35]"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|5(?:0\\d{3}|2[0-2]))\\d{7}", [
					7,
					8,
					9,
					10,
					12
				]],
				0,
				0,
				0,
				["348[57]\\d{7}", [11]],
				0,
				0,
				["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]
			]
		],
		"883": [
			"883",
			0,
			"(?:[1-4]\\d|51)\\d{6,10}",
			[
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{2,8})",
					"$1 $2 $3",
					["[14]|2[24-689]|3[02-689]|51[24-9]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["510"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["21"]
				],
				[
					"(\\d{4})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["51[13]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["[235]"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]
			]
		],
		"888": [
			"888",
			0,
			"\\d{11}",
			[11],
			[["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				["\\d{11}"]
			]
		],
		"979": [
			"979",
			0,
			"[1359]\\d{8}",
			[9],
			[[
				"(\\d)(\\d{4})(\\d{4})",
				"$1 $2 $3",
				["[1359]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				["[1359]\\d{8}"]
			]
		]
	}
};
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/min/exports/withMetadataArgument.js
function withMetadataArgument(func, _arguments) {
	var args = Array.prototype.slice.call(_arguments);
	args.push(metadata_min_json_default);
	return func.apply(this, args);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/tools/semver-compare.js
function semver_compare_default(a, b) {
	a = a.split("-");
	b = b.split("-");
	var pa = a[0].split(".");
	var pb = b[0].split(".");
	for (var i = 0; i < 3; i++) {
		var na = Number(pa[i]);
		var nb = Number(pb[i]);
		if (na > nb) return 1;
		if (nb > na) return -1;
		if (!isNaN(na) && isNaN(nb)) return 1;
		if (isNaN(na) && !isNaN(nb)) return -1;
	}
	if (a[1] && b[1]) return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
	return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/isObject.js
var objectConstructor = {}.constructor;
function isObject(object) {
	return object !== void 0 && object !== null && object.constructor === objectConstructor;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/metadata.js
function _typeof$6(o) {
	"@babel/helpers - typeof";
	return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$6(o);
}
function _classCallCheck$2(a, n) {
	if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$2(e, r) {
	for (var t = 0; t < r.length; t++) {
		var o = r[t];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$6(o.key), o);
	}
}
function _createClass$2(e, r, t) {
	return r && _defineProperties$2(e.prototype, r), t && _defineProperties$2(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == _typeof$6(i) ? i : i + "";
}
function _toPrimitive$6(t, r) {
	if ("object" != _typeof$6(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$6(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var V3 = "1.2.0";
var V4 = "1.7.35";
var DEFAULT_EXT_PREFIX = " ext. ";
var CALLING_CODE_REG_EXP = /^\d+$/;
/**
* See: https://gitlab.com/catamphetamine/libphonenumber-js/blob/master/METADATA.md
*/
var Metadata = /* @__PURE__ */ function() {
	function Metadata(metadata) {
		_classCallCheck$2(this, Metadata);
		validateMetadata(metadata);
		this.metadata = metadata;
		setVersion.call(this, metadata);
	}
	return _createClass$2(Metadata, [
		{
			key: "getCountries",
			value: function getCountries() {
				return Object.keys(this.metadata.countries).filter(function(_) {
					return _ !== "001";
				});
			}
		},
		{
			key: "getCountryMetadata",
			value: function getCountryMetadata(countryCode) {
				return this.metadata.countries[countryCode];
			}
		},
		{
			key: "nonGeographic",
			value: function nonGeographic() {
				if (this.v1 || this.v2 || this.v3) return;
				return this.metadata.nonGeographic || this.metadata.nonGeographical;
			}
		},
		{
			key: "hasCountry",
			value: function hasCountry(country) {
				return this.getCountryMetadata(country) !== void 0;
			}
		},
		{
			key: "hasCallingCode",
			value: function hasCallingCode(callingCode) {
				if (this.getCountryCodesForCallingCode(callingCode)) return true;
				if (this.nonGeographic()) {
					if (this.nonGeographic()[callingCode]) return true;
				} else {
					var countryCodes = this.countryCallingCodes()[callingCode];
					if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") return true;
				}
			}
		},
		{
			key: "isNonGeographicCallingCode",
			value: function isNonGeographicCallingCode(callingCode) {
				if (this.nonGeographic()) return this.nonGeographic()[callingCode] ? true : false;
				else return this.getCountryCodesForCallingCode(callingCode) ? false : true;
			}
		},
		{
			key: "country",
			value: function country(countryCode) {
				return this.selectNumberingPlan(countryCode);
			}
		},
		{
			key: "selectNumberingPlan",
			value: function selectNumberingPlan(countryCode, callingCode) {
				if (countryCode && CALLING_CODE_REG_EXP.test(countryCode)) {
					callingCode = countryCode;
					countryCode = null;
				}
				if (countryCode && countryCode !== "001") {
					if (!this.hasCountry(countryCode)) throw new Error("Unknown country: ".concat(countryCode));
					this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
				} else if (callingCode) {
					if (!this.hasCallingCode(callingCode)) throw new Error("Unknown calling code: ".concat(callingCode));
					this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
				} else this.numberingPlan = void 0;
				return this;
			}
		},
		{
			key: "getCountryCodesForCallingCode",
			value: function getCountryCodesForCallingCode(callingCode) {
				var countryCodes = this.countryCallingCodes()[callingCode];
				if (countryCodes) {
					if (countryCodes.length === 1 && countryCodes[0].length === 3) return;
					return countryCodes;
				}
			}
		},
		{
			key: "getCountryCodeForCallingCode",
			value: function getCountryCodeForCallingCode(callingCode) {
				var countryCodes = this.getCountryCodesForCallingCode(callingCode);
				if (countryCodes) return countryCodes[0];
			}
		},
		{
			key: "getNumberingPlanMetadata",
			value: function getNumberingPlanMetadata(callingCode) {
				var countryCode = this.getCountryCodeForCallingCode(callingCode);
				if (countryCode) return this.getCountryMetadata(countryCode);
				if (this.nonGeographic()) {
					var metadata = this.nonGeographic()[callingCode];
					if (metadata) return metadata;
				} else {
					var countryCodes = this.countryCallingCodes()[callingCode];
					if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") return this.metadata.countries["001"];
				}
			}
		},
		{
			key: "countryCallingCode",
			value: function countryCallingCode() {
				return this.numberingPlan.callingCode();
			}
		},
		{
			key: "IDDPrefix",
			value: function IDDPrefix() {
				return this.numberingPlan.IDDPrefix();
			}
		},
		{
			key: "defaultIDDPrefix",
			value: function defaultIDDPrefix() {
				return this.numberingPlan.defaultIDDPrefix();
			}
		},
		{
			key: "nationalNumberPattern",
			value: function nationalNumberPattern() {
				return this.numberingPlan.nationalNumberPattern();
			}
		},
		{
			key: "possibleLengths",
			value: function possibleLengths() {
				return this.numberingPlan.possibleLengths();
			}
		},
		{
			key: "formats",
			value: function formats() {
				return this.numberingPlan.formats();
			}
		},
		{
			key: "nationalPrefixForParsing",
			value: function nationalPrefixForParsing() {
				return this.numberingPlan.nationalPrefixForParsing();
			}
		},
		{
			key: "nationalPrefixTransformRule",
			value: function nationalPrefixTransformRule() {
				return this.numberingPlan.nationalPrefixTransformRule();
			}
		},
		{
			key: "leadingDigits",
			value: function leadingDigits() {
				return this.numberingPlan.leadingDigits();
			}
		},
		{
			key: "hasTypes",
			value: function hasTypes() {
				return this.numberingPlan.hasTypes();
			}
		},
		{
			key: "type",
			value: function type(_type) {
				return this.numberingPlan.type(_type);
			}
		},
		{
			key: "ext",
			value: function ext() {
				return this.numberingPlan.ext();
			}
		},
		{
			key: "countryCallingCodes",
			value: function countryCallingCodes() {
				if (this.v1) return this.metadata.country_phone_code_to_countries;
				return this.metadata.country_calling_codes;
			}
		},
		{
			key: "chooseCountryByCountryCallingCode",
			value: function chooseCountryByCountryCallingCode(callingCode) {
				return this.selectNumberingPlan(callingCode);
			}
		},
		{
			key: "hasSelectedNumberingPlan",
			value: function hasSelectedNumberingPlan() {
				return this.numberingPlan !== void 0;
			}
		}
	]);
}();
var NumberingPlan = /* @__PURE__ */ function() {
	function NumberingPlan(metadata, globalMetadataObject) {
		_classCallCheck$2(this, NumberingPlan);
		this.globalMetadataObject = globalMetadataObject;
		this.metadata = metadata;
		setVersion.call(this, globalMetadataObject.metadata);
	}
	return _createClass$2(NumberingPlan, [
		{
			key: "callingCode",
			value: function callingCode() {
				return this.metadata[0];
			}
		},
		{
			key: "getDefaultCountryMetadataForRegion",
			value: function getDefaultCountryMetadataForRegion() {
				return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
			}
		},
		{
			key: "IDDPrefix",
			value: function IDDPrefix() {
				if (this.v1 || this.v2) return;
				return this.metadata[1];
			}
		},
		{
			key: "defaultIDDPrefix",
			value: function defaultIDDPrefix() {
				if (this.v1 || this.v2) return;
				return this.metadata[12];
			}
		},
		{
			key: "nationalNumberPattern",
			value: function nationalNumberPattern() {
				if (this.v1 || this.v2) return this.metadata[1];
				return this.metadata[2];
			}
		},
		{
			key: "possibleLengths",
			value: function possibleLengths() {
				if (this.v1) return;
				return this.metadata[this.v2 ? 2 : 3];
			}
		},
		{
			key: "_getFormats",
			value: function _getFormats(metadata) {
				return metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
			}
		},
		{
			key: "formats",
			value: function formats() {
				var _this = this;
				return (this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || []).map(function(_) {
					return new Format(_, _this);
				});
			}
		},
		{
			key: "nationalPrefix",
			value: function nationalPrefix() {
				return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
			}
		},
		{
			key: "_getNationalPrefixFormattingRule",
			value: function _getNationalPrefixFormattingRule(metadata) {
				return metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
			}
		},
		{
			key: "nationalPrefixFormattingRule",
			value: function nationalPrefixFormattingRule() {
				return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
			}
		},
		{
			key: "_nationalPrefixForParsing",
			value: function _nationalPrefixForParsing() {
				return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
			}
		},
		{
			key: "nationalPrefixForParsing",
			value: function nationalPrefixForParsing() {
				return this._nationalPrefixForParsing() || this.nationalPrefix();
			}
		},
		{
			key: "nationalPrefixTransformRule",
			value: function nationalPrefixTransformRule() {
				return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
			}
		},
		{
			key: "_getNationalPrefixIsOptionalWhenFormatting",
			value: function _getNationalPrefixIsOptionalWhenFormatting() {
				return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
			}
		},
		{
			key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
			value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
				return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
			}
		},
		{
			key: "leadingDigits",
			value: function leadingDigits() {
				return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
			}
		},
		{
			key: "types",
			value: function types() {
				return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
			}
		},
		{
			key: "hasTypes",
			value: function hasTypes() {
				/* istanbul ignore next */
				if (this.types() && this.types().length === 0) return false;
				return !!this.types();
			}
		},
		{
			key: "type",
			value: function type(_type2) {
				if (this.hasTypes() && getType(this.types(), _type2)) return new Type(getType(this.types(), _type2), this);
			}
		},
		{
			key: "ext",
			value: function ext() {
				if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
				return this.metadata[13] || DEFAULT_EXT_PREFIX;
			}
		}
	]);
}();
var Format = /* @__PURE__ */ function() {
	function Format(format, metadata) {
		_classCallCheck$2(this, Format);
		this._format = format;
		this.metadata = metadata;
	}
	return _createClass$2(Format, [
		{
			key: "pattern",
			value: function pattern() {
				return this._format[0];
			}
		},
		{
			key: "format",
			value: function format() {
				return this._format[1];
			}
		},
		{
			key: "leadingDigitsPatterns",
			value: function leadingDigitsPatterns() {
				return this._format[2] || [];
			}
		},
		{
			key: "nationalPrefixFormattingRule",
			value: function nationalPrefixFormattingRule() {
				return this._format[3] || this.metadata.nationalPrefixFormattingRule();
			}
		},
		{
			key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
			value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
				return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
			}
		},
		{
			key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
			value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
				return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
			}
		},
		{
			key: "usesNationalPrefix",
			value: function usesNationalPrefix() {
				return this.nationalPrefixFormattingRule() && !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) ? true : false;
			}
		},
		{
			key: "internationalFormat",
			value: function internationalFormat() {
				return this._format[5] || this.format();
			}
		}
	]);
}();
/**
* A pattern that is used to determine if the national prefix formatting rule
* has the first group only, i.e., does not start with the national prefix.
* Note that the pattern explicitly allows for unbalanced parentheses.
*/
var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;
var Type = /* @__PURE__ */ function() {
	function Type(type, metadata) {
		_classCallCheck$2(this, Type);
		this.type = type;
		this.metadata = metadata;
	}
	return _createClass$2(Type, [{
		key: "pattern",
		value: function pattern() {
			if (this.metadata.v1) return this.type;
			return this.type[0];
		}
	}, {
		key: "possibleLengths",
		value: function possibleLengths() {
			if (this.metadata.v1) return;
			return this.type[1] || this.metadata.possibleLengths();
		}
	}]);
}();
function getType(types, type) {
	switch (type) {
		case "FIXED_LINE": return types[0];
		case "MOBILE": return types[1];
		case "TOLL_FREE": return types[2];
		case "PREMIUM_RATE": return types[3];
		case "PERSONAL_NUMBER": return types[4];
		case "VOICEMAIL": return types[5];
		case "UAN": return types[6];
		case "PAGER": return types[7];
		case "VOIP": return types[8];
		case "SHARED_COST": return types[9];
	}
}
function validateMetadata(metadata) {
	if (!metadata) throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
	if (!isObject(metadata) || !isObject(metadata.countries)) throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(isObject(metadata) ? "an object of shape: { " + Object.keys(metadata).join(", ") + " }" : "a " + typeOf(metadata) + ": " + metadata, "."));
}
/* istanbul ignore next */
var typeOf = function typeOf(_) {
	return _typeof$6(_);
};
/**
* Returns "country calling code" for a country.
* Throws an error if the country doesn't exist or isn't supported by this library.
* @param  {string} country
* @param  {object} metadata
* @return {string}
* @example
* // Returns "44"
* getCountryCallingCode("GB")
*/
function getCountryCallingCode(country, metadata) {
	metadata = new Metadata(metadata);
	if (metadata.hasCountry(country)) return metadata.selectNumberingPlan(country).countryCallingCode();
	throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata) {
	return metadata.countries.hasOwnProperty(country);
}
function setVersion(metadata) {
	var version = metadata.version;
	if (typeof version === "number") {
		this.v1 = version === 1;
		this.v2 = version === 2;
		this.v3 = version === 3;
		this.v4 = version === 4;
	} else if (!version) this.v1 = true;
	else if (semver_compare_default(version, V3) === -1) this.v2 = true;
	else if (semver_compare_default(version, V4) === -1) this.v3 = true;
	else this.v4 = true;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/mergeArrays.js
function _createForOfIteratorHelperLoose$3(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (t) return (t = t.call(r)).next.bind(t);
	if (Array.isArray(r) || (t = _unsupportedIterableToArray$4(r)) || e && r && "number" == typeof r.length) {
		t && (r = t);
		var o = 0;
		return function() {
			return o >= r.length ? { done: !0 } : {
				done: !1,
				value: r[o++]
			};
		};
	}
	throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$4(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$4(r, a) : void 0;
	}
}
function _arrayLikeToArray$4(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
/**
* Merges two arrays.
* @param  {*} a
* @param  {*} b
* @return {*}
*/
function mergeArrays(a, b) {
	var merged = a.slice();
	for (var _iterator = _createForOfIteratorHelperLoose$3(b), _step; !(_step = _iterator()).done;) {
		var element = _step.value;
		if (a.indexOf(element) < 0) merged.push(element);
	}
	return merged.sort(function(a, b) {
		return a - b;
	});
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js
function checkNumberLength(nationalNumber, country, metadata) {
	return checkNumberLengthForType(nationalNumber, country, void 0, metadata);
}
function checkNumberLengthForType(nationalNumber, country, type, metadata) {
	if (country) {
		metadata = new Metadata(metadata.metadata);
		metadata.selectNumberingPlan(country);
	}
	var type_info = metadata.type(type);
	var possible_lengths = type_info && type_info.possibleLengths() || metadata.possibleLengths();
	if (!possible_lengths) return "IS_POSSIBLE";
	if (type === "FIXED_LINE_OR_MOBILE") {
		/* istanbul ignore next */
		if (!metadata.type("FIXED_LINE")) return checkNumberLengthForType(nationalNumber, country, "MOBILE", metadata);
		var mobile_type = metadata.type("MOBILE");
		if (mobile_type) possible_lengths = mergeArrays(possible_lengths, mobile_type.possibleLengths());
	} else if (type && !type_info) return "INVALID_LENGTH";
	var actual_length = nationalNumber.length;
	var minimum_length = possible_lengths[0];
	if (minimum_length === actual_length) return "IS_POSSIBLE";
	if (minimum_length > actual_length) return "TOO_SHORT";
	if (possible_lengths[possible_lengths.length - 1] < actual_length) return "TOO_LONG";
	return possible_lengths.indexOf(actual_length, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/isPossible.js
/**
* Checks if a phone number is "possible" (basically just checks its length).
*
* isPossible(phoneNumberInstance, { ..., v2: true }, metadata)
*
* isPossible({ phone: '8005553535', country: 'RU' }, { ... }, metadata)
* isPossible({ phone: '8005553535', country: 'RU' }, undefined, metadata)
*
* @param  {object|PhoneNumber} input — If `options.v2: true` flag is passed, the `input` should be a `PhoneNumber` instance. Otherwise, it should be an object of shape `{ phone: '...', country: '...' }`.
* @param  {object} [options]
* @param  {object} metadata
* @return {string}
*/
function isPossiblePhoneNumber(input, options, metadata) {
	/* istanbul ignore if */
	if (options === void 0) options = {};
	metadata = new Metadata(metadata);
	if (options.v2) {
		if (!input.countryCallingCode) throw new Error("Invalid phone number object passed");
		metadata.selectNumberingPlan(input.countryCallingCode);
	} else {
		if (!input.phone) return false;
		if (input.country) {
			if (!metadata.hasCountry(input.country)) throw new Error("Unknown country: ".concat(input.country));
			metadata.selectNumberingPlan(input.country);
		} else {
			if (!input.countryCallingCode) throw new Error("Invalid phone number object passed");
			metadata.selectNumberingPlan(input.countryCallingCode);
		}
	}
	if (metadata.possibleLengths()) return isPossibleNumber(input.phone || input.nationalNumber, input.country, metadata);
	else if (input.countryCallingCode && metadata.isNonGeographicCallingCode(input.countryCallingCode)) return true;
	else throw new Error("Missing \"possibleLengths\" in metadata. Perhaps the metadata has been generated before v1.0.18.");
}
function isPossibleNumber(nationalNumber, country, metadata) {
	switch (checkNumberLength(nationalNumber, country, metadata)) {
		case "IS_POSSIBLE": return true;
		default: return false;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js
/**
* Checks whether the entire input sequence can be matched
* against the regular expression.
* @return {boolean}
*/
function matchesEntirely(text, regularExpressionText) {
	text = text || "";
	return new RegExp("^(?:" + regularExpressionText + ")$").test(text);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/getNumberType.js
function _createForOfIteratorHelperLoose$2(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (t) return (t = t.call(r)).next.bind(t);
	if (Array.isArray(r) || (t = _unsupportedIterableToArray$3(r)) || e && r && "number" == typeof r.length) {
		t && (r = t);
		var o = 0;
		return function() {
			return o >= r.length ? { done: !0 } : {
				done: !1,
				value: r[o++]
			};
		};
	}
	throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
	}
}
function _arrayLikeToArray$3(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
var NON_FIXED_LINE_PHONE_TYPES = [
	"MOBILE",
	"PREMIUM_RATE",
	"TOLL_FREE",
	"SHARED_COST",
	"VOIP",
	"PERSONAL_NUMBER",
	"PAGER",
	"UAN",
	"VOICEMAIL"
];
function getNumberType(input, options, metadata) {
	options = options || {};
	if (!input.country && !input.countryCallingCode) return;
	metadata = new Metadata(metadata);
	metadata.selectNumberingPlan(input.country, input.countryCallingCode);
	var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
	if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern())) return;
	if (isNumberTypeEqualTo(nationalNumber, "FIXED_LINE", metadata)) {
		if (metadata.type("MOBILE") && metadata.type("MOBILE").pattern() === "") return "FIXED_LINE_OR_MOBILE";
		if (!metadata.type("MOBILE")) return "FIXED_LINE_OR_MOBILE";
		/* istanbul ignore if */
		if (isNumberTypeEqualTo(nationalNumber, "MOBILE", metadata)) return "FIXED_LINE_OR_MOBILE";
		return "FIXED_LINE";
	}
	for (var _iterator = _createForOfIteratorHelperLoose$2(NON_FIXED_LINE_PHONE_TYPES), _step; !(_step = _iterator()).done;) {
		var type = _step.value;
		if (isNumberTypeEqualTo(nationalNumber, type, metadata)) return type;
	}
}
function isNumberTypeEqualTo(nationalNumber, type, metadata) {
	var typeDefinition = metadata.type(type);
	if (!typeDefinition || !typeDefinition.pattern()) return false;
	if (typeDefinition.possibleLengths() && typeDefinition.possibleLengths().indexOf(nationalNumber.length) < 0) return false;
	return matchesEntirely(nationalNumber, typeDefinition.pattern());
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/isValid.js
/**
* Checks if a given phone number is valid.
*
* isValid(phoneNumberInstance, { ..., v2: true }, metadata)
*
* isPossible({ phone: '8005553535', country: 'RU' }, { ... }, metadata)
* isPossible({ phone: '8005553535', country: 'RU' }, undefined, metadata)
*
* If the `number` is a string, it will be parsed to an object,
* but only if it contains only valid phone number characters (including punctuation).
* If the `number` is an object, it is used as is.
*
* The optional `defaultCountry` argument is the default country.
* I.e. it does not restrict to just that country,
* e.g. in those cases where several countries share
* the same phone numbering rules (NANPA, Britain, etc).
* For example, even though the number `07624 369230`
* belongs to the Isle of Man ("IM" country code)
* calling `isValidNumber('07624369230', 'GB', metadata)`
* still returns `true` because the country is not restricted to `GB`,
* it's just that `GB` is the default one for the phone numbering rules.
* For restricting the country see `isValidNumberForRegion()`
* though restricting a country might not be a good idea.
* https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
*
* Examples:
*
* ```js
* isValidNumber('+78005553535', metadata)
* isValidNumber('8005553535', 'RU', metadata)
* isValidNumber('88005553535', 'RU', metadata)
* isValidNumber({ phone: '8005553535', country: 'RU' }, metadata)
* ```
*/
function isValidNumber(input, options, metadata) {
	options = options || {};
	metadata = new Metadata(metadata);
	metadata.selectNumberingPlan(input.country, input.countryCallingCode);
	if (metadata.hasTypes()) return getNumberType(input, options, metadata.metadata) !== void 0;
	return matchesEntirely(options.v2 ? input.nationalNumber : input.phone, metadata.nationalNumberPattern());
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/getPossibleCountriesForNumber.js
/**
* Returns a list of countries that the phone number could potentially belong to.
* @param  {string} callingCode — Calling code.
* @param  {string} nationalNumber — National (significant) number.
* @param  {object} metadata — Metadata.
* @return {string[]} A list of possible countries.
*/
function getPossibleCountriesForNumber(callingCode, nationalNumber, metadata) {
	var possibleCountries = new Metadata(metadata).getCountryCodesForCallingCode(callingCode);
	if (!possibleCountries) return [];
	return possibleCountries.filter(function(country) {
		return couldNationalNumberBelongToCountry(nationalNumber, country, metadata);
	});
}
function couldNationalNumberBelongToCountry(nationalNumber, country, metadata) {
	var _metadata = new Metadata(metadata);
	_metadata.selectNumberingPlan(country);
	if (_metadata.numberingPlan.possibleLengths().indexOf(nationalNumber.length) >= 0) return true;
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/constants.js
var VALID_DIGITS = "0-9０-９٠-٩۰-۹";
var VALID_PUNCTUATION = "".concat("-‐-―−ー－").concat("／/").concat("．.").concat(" \xA0­​⁠　").concat("()（）［］\\[\\]").concat("~⁓∼～");
var PLUS_CHARS = "+＋";
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/stripIddPrefix.js
var CAPTURING_DIGIT_PATTERN = new RegExp("([" + VALID_DIGITS + "])");
function stripIddPrefix(number, country, callingCode, metadata) {
	if (!country) return;
	var countryMetadata = new Metadata(metadata);
	countryMetadata.selectNumberingPlan(country, callingCode);
	var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());
	if (number.search(IDDPrefixPattern) !== 0) return;
	number = number.slice(number.match(IDDPrefixPattern)[0].length);
	var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);
	if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
		if (matchedGroups[1] === "0") return;
	}
	return number;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js
/**
* Strips any national prefix (such as 0, 1) present in a
* (possibly incomplete) number provided.
* "Carrier codes" are only used  in Colombia and Brazil,
* and only when dialing within those countries from a mobile phone to a fixed line number.
* Sometimes it won't actually strip national prefix
* and will instead prepend some digits to the `number`:
* for example, when number `2345678` is passed with `VI` country selected,
* it will return `{ number: "3402345678" }`, because `340` area code is prepended.
* @param {string} number — National number digits.
* @param {object} metadata — Metadata with country selected.
* @return {object} `{ nationalNumber: string, nationalPrefix: string? carrierCode: string? }`. Even if a national prefix was extracted, it's not necessarily present in the returned object, so don't rely on its presence in the returned object in order to find out whether a national prefix has been extracted or not.
*/
function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata) {
	if (number && metadata.numberingPlan.nationalPrefixForParsing()) {
		var prefixPattern = new RegExp("^(?:" + metadata.numberingPlan.nationalPrefixForParsing() + ")");
		var prefixMatch = prefixPattern.exec(number);
		if (prefixMatch) {
			var nationalNumber;
			var carrierCode;
			var capturedGroupsCount = prefixMatch.length - 1;
			var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];
			if (metadata.nationalPrefixTransformRule() && hasCapturedGroups) {
				nationalNumber = number.replace(prefixPattern, metadata.nationalPrefixTransformRule());
				if (capturedGroupsCount > 1) carrierCode = prefixMatch[1];
			} else {
				var prefixBeforeNationalNumber = prefixMatch[0];
				nationalNumber = number.slice(prefixBeforeNationalNumber.length);
				if (hasCapturedGroups) carrierCode = prefixMatch[1];
			}
			var nationalPrefix;
			if (hasCapturedGroups) {
				var possiblePositionOfTheFirstCapturedGroup = number.indexOf(prefixMatch[1]);
				if (number.slice(0, possiblePositionOfTheFirstCapturedGroup) === metadata.numberingPlan.nationalPrefix()) nationalPrefix = metadata.numberingPlan.nationalPrefix();
			} else nationalPrefix = prefixMatch[0];
			return {
				nationalNumber,
				nationalPrefix,
				carrierCode
			};
		}
	}
	return { nationalNumber: number };
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/getCountryByNationalNumber.js
function _createForOfIteratorHelperLoose$1(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (t) return (t = t.call(r)).next.bind(t);
	if (Array.isArray(r) || (t = _unsupportedIterableToArray$2(r)) || e && r && "number" == typeof r.length) {
		t && (r = t);
		var o = 0;
		return function() {
			return o >= r.length ? { done: !0 } : {
				done: !1,
				value: r[o++]
			};
		};
	}
	throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
	}
}
function _arrayLikeToArray$2(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function getCountryByNationalNumber(nationalPhoneNumber, _ref) {
	var countries = _ref.countries, metadata = _ref.metadata;
	metadata = new Metadata(metadata);
	for (var _iterator = _createForOfIteratorHelperLoose$1(countries), _step; !(_step = _iterator()).done;) {
		var country = _step.value;
		metadata.selectNumberingPlan(country);
		if (metadata.leadingDigits()) {
			if (nationalPhoneNumber && nationalPhoneNumber.search(metadata.leadingDigits()) === 0) return country;
		} else if (getNumberType({
			phone: nationalPhoneNumber,
			country
		}, void 0, metadata.metadata)) return country;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js
var USE_NON_GEOGRAPHIC_COUNTRY_CODE$2 = false;
function getCountryByCallingCode(callingCode, _ref) {
	var nationalPhoneNumber = _ref.nationalNumber, metadata = _ref.metadata;
	/* istanbul ignore if */
	if (USE_NON_GEOGRAPHIC_COUNTRY_CODE$2) {
		if (metadata.isNonGeographicCallingCode(callingCode)) return "001";
	}
	var possibleCountries = metadata.getCountryCodesForCallingCode(callingCode);
	if (!possibleCountries) return;
	if (possibleCountries.length === 1) return possibleCountries[0];
	return getCountryByNationalNumber(nationalPhoneNumber, {
		countries: possibleCountries,
		metadata: metadata.metadata
	});
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js
/**
* Strips national prefix and carrier code from a complete phone number.
* The difference from the non-"FromCompleteNumber" function is that
* it won't extract national prefix if the resultant number is too short
* to be a complete number for the selected phone numbering plan.
* @param  {string} number — Complete phone number digits.
* @param  {string?} country — Country, if known.
* @param  {Metadata} metadata — Metadata with a phone numbering plan selected.
* @return {object} `{ nationalNumber: string, carrierCode: string? }`.
*/
function extractNationalNumber(number, country, metadata) {
	var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(number, metadata), carrierCode = _extractNationalNumbe.carrierCode, nationalNumber = _extractNationalNumbe.nationalNumber;
	if (nationalNumber !== number) {
		if (!shouldHaveExtractedNationalPrefix(number, nationalNumber, metadata)) return { nationalNumber: number };
		if (metadata.numberingPlan.possibleLengths()) {
			if (!country) country = getCountryByCallingCode(metadata.numberingPlan.callingCode(), {
				nationalNumber,
				metadata
			});
			if (!isPossibleIncompleteNationalNumber(nationalNumber, country, metadata)) return { nationalNumber: number };
		}
	}
	return {
		nationalNumber,
		carrierCode
	};
}
function shouldHaveExtractedNationalPrefix(nationalNumberBefore, nationalNumberAfter, metadata) {
	if (matchesEntirely(nationalNumberBefore, metadata.nationalNumberPattern()) && !matchesEntirely(nationalNumberAfter, metadata.nationalNumberPattern())) return false;
	return true;
}
function isPossibleIncompleteNationalNumber(nationalNumber, country, metadata) {
	switch (checkNumberLength(nationalNumber, country, metadata)) {
		case "TOO_SHORT":
		case "INVALID_LENGTH": return false;
		default: return true;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js
/**
* Sometimes some people incorrectly input international phone numbers
* without the leading `+`. This function corrects such input.
* @param  {string} number — Phone number digits.
* @param  {string} [country] — Exact country of the phone number.
* @param  {string} [defaultCountry]
* @param  {string} [defaultCallingCode]
* @param  {object} metadata
* @return {object} `{ countryCallingCode: string?, number: string }`.
*/
function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, defaultCountry, defaultCallingCode, metadata) {
	var countryCallingCode = country || defaultCountry ? getCountryCallingCode(country || defaultCountry, metadata) : defaultCallingCode;
	if (number.indexOf(countryCallingCode) === 0) {
		metadata = new Metadata(metadata);
		metadata.selectNumberingPlan(country || defaultCountry, countryCallingCode);
		var possibleShorterNumber = number.slice(countryCallingCode.length);
		var possibleShorterNationalNumber = extractNationalNumber(possibleShorterNumber, country, metadata).nationalNumber;
		var nationalNumber = extractNationalNumber(number, country, metadata).nationalNumber;
		if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) && matchesEntirely(possibleShorterNationalNumber, metadata.nationalNumberPattern()) || checkNumberLength(nationalNumber, country, metadata) === "TOO_LONG") return {
			countryCallingCode,
			number: possibleShorterNumber
		};
	}
	return { number };
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js
/**
* Converts a phone number digits (possibly with a `+`)
* into a calling code and the rest phone number digits.
* The "rest phone number digits" could include
* a national prefix, carrier code, and national
* (significant) number.
* @param  {string} number — Phone number digits (possibly with a `+`).
* @param  {string} [country] — Country.
* @param  {string} [defaultCountry] — Default country.
* @param  {string} [defaultCallingCode] — Default calling code (some phone numbering plans are non-geographic).
* @param  {object} metadata
* @return {object} `{ countryCallingCodeSource: string?, countryCallingCode: string?, number: string }`
* @example
* // Returns `{ countryCallingCode: "1", number: "2133734253" }`.
* extractCountryCallingCode('2133734253', null, 'US', null, metadata)
* extractCountryCallingCode('2133734253', null, null, '1', metadata)
* extractCountryCallingCode('+12133734253', null, null, null, metadata)
* extractCountryCallingCode('+12133734253', null, 'RU', null, metadata)
*/
function extractCountryCallingCode(number, country, defaultCountry, defaultCallingCode, metadata) {
	if (!number) return {};
	var isNumberWithIddPrefix;
	if (number[0] !== "+") {
		var numberWithoutIDD = stripIddPrefix(number, country || defaultCountry, defaultCallingCode, metadata);
		if (numberWithoutIDD && numberWithoutIDD !== number) {
			isNumberWithIddPrefix = true;
			number = "+" + numberWithoutIDD;
		} else {
			if (country || defaultCountry || defaultCallingCode) {
				var _extractCountryCallin = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, defaultCountry, defaultCallingCode, metadata), countryCallingCode = _extractCountryCallin.countryCallingCode, shorterNumber = _extractCountryCallin.number;
				if (countryCallingCode) return {
					countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
					countryCallingCode,
					number: shorterNumber
				};
			}
			return { number };
		}
	}
	if (number[1] === "0") return {};
	metadata = new Metadata(metadata);
	var i = 2;
	while (i - 1 <= 3 && i <= number.length) {
		var _countryCallingCode = number.slice(1, i);
		if (metadata.hasCallingCode(_countryCallingCode)) {
			metadata.selectNumberingPlan(_countryCallingCode);
			return {
				countryCallingCodeSource: isNumberWithIddPrefix ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
				countryCallingCode: _countryCallingCode,
				number: number.slice(i)
			};
		}
		i++;
	}
	return {};
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js
function applyInternationalSeparatorStyle(formattedNumber) {
	return formattedNumber.replace(new RegExp("[".concat(VALID_PUNCTUATION, "]+"), "g"), " ").trim();
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js
var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format, _ref) {
	var useInternationalFormat = _ref.useInternationalFormat, withNationalPrefix = _ref.withNationalPrefix;
	_ref.carrierCode;
	_ref.metadata;
	var formattedNumber = number.replace(new RegExp(format.pattern()), useInternationalFormat ? format.internationalFormat() : withNationalPrefix && format.nationalPrefixFormattingRule() ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule()) : format.format());
	if (useInternationalFormat) return applyInternationalSeparatorStyle(formattedNumber);
	return formattedNumber;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/getIddPrefix.js
/**
* Pattern that makes it easy to distinguish whether a region has a single
* international dialing prefix or not. If a region has a single international
* prefix (e.g. 011 in USA), it will be represented as a string that contains
* a sequence of ASCII digits, and possibly a tilde, which signals waiting for
* the tone. If there are multiple available international prefixes in a
* region, they will be represented as a regex string that always contains one
* or more characters that are not ASCII digits or a tilde.
*/
var SINGLE_IDD_PREFIX_REG_EXP = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function getIddPrefix(country, callingCode, metadata) {
	var countryMetadata = new Metadata(metadata);
	countryMetadata.selectNumberingPlan(country, callingCode);
	if (countryMetadata.defaultIDDPrefix()) return countryMetadata.defaultIDDPrefix();
	if (SINGLE_IDD_PREFIX_REG_EXP.test(countryMetadata.IDDPrefix())) return countryMetadata.IDDPrefix();
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js
var RFC3966_EXTN_PREFIX = ";ext=";
/**
* Helper method for constructing regular expressions for parsing. Creates
* an expression that captures up to max_length digits.
* @return {string} RegEx pattern to capture extension digits.
*/
var getExtensionDigitsPattern = function getExtensionDigitsPattern(maxLength) {
	return "([".concat(VALID_DIGITS, "]{1,").concat(maxLength, "})");
};
/**
* Helper initialiser method to create the regular-expression pattern to match
* extensions.
* Copy-pasted from Google's `libphonenumber`:
* https://github.com/google/libphonenumber/blob/55b2646ec9393f4d3d6661b9c82ef9e258e8b829/javascript/i18n/phonenumbers/phonenumberutil.js#L759-L766
* @return {string} RegEx pattern to capture extensions.
*/
function createExtensionPattern(purpose) {
	/** @type {string} */
	var extLimitAfterExplicitLabel = "20";
	/** @type {string} */
	var extLimitAfterLikelyLabel = "15";
	/** @type {string} */
	var extLimitAfterAmbiguousChar = "9";
	/** @type {string} */
	var extLimitWhenNotSure = "6";
	/** @type {string} */
	var possibleSeparatorsBetweenNumberAndExtLabel = "[ \xA0\\t,]*";
	/** @type {string} */
	var possibleCharsAfterExtLabel = "[:\\.．]?[ \xA0\\t,-]*";
	/** @type {string} */
	var optionalExtnSuffix = "#?";
	/** @type {string} */
	var explicitExtLabels = "(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)";
	/** @type {string} */
	var ambiguousExtLabels = "(?:[xｘ#＃~～]|int|ｉｎｔ)";
	/** @type {string} */
	var ambiguousSeparator = "[- ]+";
	/** @type {string} */
	var possibleSeparatorsNumberExtLabelNoComma = "[ \xA0\\t]*";
	/** @type {string} */
	var autoDiallingAndExtLabelsFound = "(?:,{2}|;)";
	/** @type {string} */
	var rfcExtn = RFC3966_EXTN_PREFIX + getExtensionDigitsPattern(extLimitAfterExplicitLabel);
	/** @type {string} */
	var explicitExtn = possibleSeparatorsBetweenNumberAndExtLabel + explicitExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterExplicitLabel) + optionalExtnSuffix;
	/** @type {string} */
	var ambiguousExtn = possibleSeparatorsBetweenNumberAndExtLabel + ambiguousExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
	/** @type {string} */
	var americanStyleExtnWithSuffix = ambiguousSeparator + getExtensionDigitsPattern(extLimitWhenNotSure) + "#";
	/** @type {string} */
	var autoDiallingExtn = possibleSeparatorsNumberExtLabelNoComma + autoDiallingAndExtLabelsFound + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterLikelyLabel) + optionalExtnSuffix;
	/** @type {string} */
	var onlyCommasExtn = possibleSeparatorsNumberExtLabelNoComma + "(?:,)+" + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
	return rfcExtn + "|" + explicitExtn + "|" + ambiguousExtn + "|" + americanStyleExtnWithSuffix + "|" + autoDiallingExtn + "|" + onlyCommasExtn;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js
var MIN_LENGTH_PHONE_NUMBER_PATTERN = "[" + VALID_DIGITS + "]{2}";
var VALID_PHONE_NUMBER = "[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){3,}[" + VALID_PUNCTUATION + VALID_DIGITS + "]*";
var VALID_PHONE_NUMBER_START_REG_EXP = new RegExp("^[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){1,2}$", "i");
var VALID_PHONE_NUMBER_WITH_EXTENSION = VALID_PHONE_NUMBER + "(?:" + createExtensionPattern() + ")?";
var VALID_PHONE_NUMBER_PATTERN = new RegExp("^" + MIN_LENGTH_PHONE_NUMBER_PATTERN + "$|^" + VALID_PHONE_NUMBER_WITH_EXTENSION + "$", "i");
function isViablePhoneNumber(number) {
	return number.length >= 2 && VALID_PHONE_NUMBER_PATTERN.test(number);
}
function isViablePhoneNumberStart(number) {
	return VALID_PHONE_NUMBER_START_REG_EXP.test(number);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/RFC3966.js
/**
* @param  {object} - `{ ?number, ?extension }`.
* @return {string} Phone URI (RFC 3966).
*/
function formatRFC3966(_ref) {
	var number = _ref.number, ext = _ref.ext;
	if (!number) return "";
	if (number[0] !== "+") throw new Error("\"formatRFC3966()\" expects \"number\" to be in E.164 format.");
	return "tel:".concat(number).concat(ext ? ";ext=" + ext : "");
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/format.js
var DEFAULT_OPTIONS = { formatExtension: function formatExtension(formattedNumber, extension, metadata) {
	return "".concat(formattedNumber).concat(metadata.ext()).concat(extension);
} };
/**
* Formats a phone number.
*
* format(phoneNumberInstance, 'INTERNATIONAL', { ..., v2: true }, metadata)
* format(phoneNumberInstance, 'NATIONAL', { ..., v2: true }, metadata)
*
* format({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL', { ... }, metadata)
* format({ phone: '8005553535', country: 'RU' }, 'NATIONAL', undefined, metadata)
*
* @param  {object|PhoneNumber} input — If `options.v2: true` flag is passed, the `input` should be a `PhoneNumber` instance. Otherwise, it should be an object of shape `{ phone: '...', country: '...' }`.
* @param  {string} format
* @param  {object} [options]
* @param  {object} metadata
* @return {string}
*/
function formatNumber(input, format, options, metadata) {
	if (options) options = merge({}, DEFAULT_OPTIONS, options);
	else options = DEFAULT_OPTIONS;
	metadata = new Metadata(metadata);
	if (input.country && input.country !== "001") {
		if (!metadata.hasCountry(input.country)) throw new Error("Unknown country: ".concat(input.country));
		metadata.selectNumberingPlan(input.country);
	} else if (input.countryCallingCode) metadata.selectNumberingPlan(input.countryCallingCode);
	else return input.phone || "";
	var countryCallingCode = metadata.countryCallingCode();
	var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
	var number;
	switch (format) {
		case "NATIONAL":
			if (!nationalNumber) return "";
			number = formatNationalNumber(nationalNumber, input.carrierCode, "NATIONAL", metadata, options);
			return addExtension(number, input.ext, metadata, options.formatExtension);
		case "INTERNATIONAL":
			if (!nationalNumber) return "+".concat(countryCallingCode);
			number = formatNationalNumber(nationalNumber, null, "INTERNATIONAL", metadata, options);
			number = "+".concat(countryCallingCode, " ").concat(number);
			return addExtension(number, input.ext, metadata, options.formatExtension);
		case "E.164": return "+".concat(countryCallingCode).concat(nationalNumber);
		case "RFC3966": return formatRFC3966({
			number: "+".concat(countryCallingCode).concat(nationalNumber),
			ext: input.ext
		});
		case "IDD":
			if (!options.fromCountry) return;
			var formattedNumber = formatIDD(nationalNumber, input.carrierCode, countryCallingCode, options.fromCountry, metadata);
			if (!formattedNumber) return;
			return addExtension(formattedNumber, input.ext, metadata, options.formatExtension);
		default: throw new Error("Unknown \"format\" argument passed to \"formatNumber()\": \"".concat(format, "\""));
	}
}
function formatNationalNumber(number, carrierCode, formatAs, metadata, options) {
	var format = chooseFormatForNumber(metadata.formats(), number);
	if (!format) return number;
	return formatNationalNumberUsingFormat(number, format, {
		useInternationalFormat: formatAs === "INTERNATIONAL",
		withNationalPrefix: format.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options && options.nationalPrefix === false ? false : true,
		carrierCode,
		metadata
	});
}
function chooseFormatForNumber(availableFormats, nationalNumber) {
	return pickFirstMatchingElement(availableFormats, function(format) {
		if (format.leadingDigitsPatterns().length > 0) {
			var lastLeadingDigitsPattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1];
			if (nationalNumber.search(lastLeadingDigitsPattern) !== 0) return false;
		}
		return matchesEntirely(nationalNumber, format.pattern());
	});
}
function addExtension(formattedNumber, ext, metadata, formatExtension) {
	return ext ? formatExtension(formattedNumber, ext, metadata) : formattedNumber;
}
function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata) {
	if (getCountryCallingCode(fromCountry, metadata.metadata) === countryCallingCode) {
		var formattedNumber = formatNationalNumber(nationalNumber, carrierCode, "NATIONAL", metadata);
		if (countryCallingCode === "1") return countryCallingCode + " " + formattedNumber;
		return formattedNumber;
	}
	var iddPrefix = getIddPrefix(fromCountry, void 0, metadata.metadata);
	if (iddPrefix) return "".concat(iddPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber(nationalNumber, null, "INTERNATIONAL", metadata));
}
function merge() {
	var i = 1;
	for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) objects[_key] = arguments[_key];
	while (i < objects.length) {
		if (objects[i]) for (var key in objects[i]) objects[0][key] = objects[i][key];
		i++;
	}
	return objects[0];
}
function pickFirstMatchingElement(elements, testFunction) {
	var i = 0;
	while (i < elements.length) {
		if (testFunction(elements[i])) return elements[i];
		i++;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/PhoneNumber.js
function _typeof$5(o) {
	"@babel/helpers - typeof";
	return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$5(o);
}
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty$4(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$4(e, r, t) {
	return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _classCallCheck$1(a, n) {
	if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(e, r) {
	for (var t = 0; t < r.length; t++) {
		var o = r[t];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$5(o.key), o);
	}
}
function _createClass$1(e, r, t) {
	return r && _defineProperties$1(e.prototype, r), t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == _typeof$5(i) ? i : i + "";
}
function _toPrimitive$5(t, r) {
	if ("object" != _typeof$5(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$5(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var USE_NON_GEOGRAPHIC_COUNTRY_CODE$1 = false;
var PhoneNumber = /* @__PURE__ */ function() {
	/**
	* @param  {string} countryOrCountryCallingCode
	* @param  {string} nationalNumber
	* @param  {object} metadata — Metadata JSON
	* @return {PhoneNumber}
	*/
	function PhoneNumber(countryOrCountryCallingCode, nationalNumber, metadata) {
		_classCallCheck$1(this, PhoneNumber);
		if (!countryOrCountryCallingCode) throw new TypeError("First argument is required");
		if (typeof countryOrCountryCallingCode !== "string") throw new TypeError("First argument must be a string");
		if (countryOrCountryCallingCode[0] === "+" && !nationalNumber) throw new TypeError("`metadata` argument not passed");
		if (isObject(nationalNumber) && isObject(nationalNumber.countries)) {
			metadata = nationalNumber;
			var e164Number = countryOrCountryCallingCode;
			if (!E164_NUMBER_REGEXP.test(e164Number)) throw new Error("Invalid `number` argument passed: must consist of a \"+\" followed by digits");
			var _extractCountryCallin = extractCountryCallingCode(e164Number, void 0, void 0, void 0, metadata), _countryCallingCode = _extractCountryCallin.countryCallingCode;
			nationalNumber = _extractCountryCallin.number;
			countryOrCountryCallingCode = _countryCallingCode;
			if (!nationalNumber) throw new Error("Invalid `number` argument passed: too short");
		}
		if (!nationalNumber) throw new TypeError("`nationalNumber` argument is required");
		if (typeof nationalNumber !== "string") throw new TypeError("`nationalNumber` argument must be a string");
		validateMetadata(metadata);
		var _getCountryAndCountry = getCountryAndCountryCallingCode(countryOrCountryCallingCode, metadata), country = _getCountryAndCountry.country, countryCallingCode = _getCountryAndCountry.countryCallingCode;
		this.country = country;
		this.countryCallingCode = countryCallingCode;
		this.nationalNumber = nationalNumber;
		this.number = "+" + this.countryCallingCode + this.nationalNumber;
		this.getMetadata = function() {
			return metadata;
		};
	}
	return _createClass$1(PhoneNumber, [
		{
			key: "setExt",
			value: function setExt(ext) {
				this.ext = ext;
			}
		},
		{
			key: "getPossibleCountries",
			value: function getPossibleCountries() {
				if (this.country) return [this.country];
				return getPossibleCountriesForNumber(this.countryCallingCode, this.nationalNumber, this.getMetadata());
			}
		},
		{
			key: "isPossible",
			value: function isPossible() {
				return isPossiblePhoneNumber(this, { v2: true }, this.getMetadata());
			}
		},
		{
			key: "isValid",
			value: function isValid() {
				return isValidNumber(this, { v2: true }, this.getMetadata());
			}
		},
		{
			key: "isNonGeographic",
			value: function isNonGeographic() {
				return new Metadata(this.getMetadata()).isNonGeographicCallingCode(this.countryCallingCode);
			}
		},
		{
			key: "isEqual",
			value: function isEqual(phoneNumber) {
				return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
			}
		},
		{
			key: "getType",
			value: function getType() {
				return getNumberType(this, { v2: true }, this.getMetadata());
			}
		},
		{
			key: "format",
			value: function format(_format, options) {
				return formatNumber(this, _format, options ? _objectSpread$4(_objectSpread$4({}, options), {}, { v2: true }) : { v2: true }, this.getMetadata());
			}
		},
		{
			key: "formatNational",
			value: function formatNational(options) {
				return this.format("NATIONAL", options);
			}
		},
		{
			key: "formatInternational",
			value: function formatInternational(options) {
				return this.format("INTERNATIONAL", options);
			}
		},
		{
			key: "getURI",
			value: function getURI(options) {
				return this.format("RFC3966", options);
			}
		}
	]);
}();
var isCountryCode = function isCountryCode(value) {
	return /^[A-Z]{2}$/.test(value);
};
function getCountryAndCountryCallingCode(countryOrCountryCallingCode, metadataJson) {
	var country;
	var countryCallingCode;
	var metadata = new Metadata(metadataJson);
	if (isCountryCode(countryOrCountryCallingCode)) {
		country = countryOrCountryCallingCode;
		metadata.selectNumberingPlan(country);
		countryCallingCode = metadata.countryCallingCode();
	} else {
		countryCallingCode = countryOrCountryCallingCode;
		/* istanbul ignore if */
		if (USE_NON_GEOGRAPHIC_COUNTRY_CODE$1) {
			if (metadata.isNonGeographicCallingCode(countryCallingCode)) country = "001";
		}
	}
	return {
		country,
		countryCallingCode
	};
}
var E164_NUMBER_REGEXP = /^\+\d+$/;
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/ParseError.js
function _typeof$4(o) {
	"@babel/helpers - typeof";
	return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$4(o);
}
function _defineProperties(e, r) {
	for (var t = 0; t < r.length; t++) {
		var o = r[t];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey$4(o.key), o);
	}
}
function _createClass(e, r, t) {
	return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == _typeof$4(i) ? i : i + "";
}
function _toPrimitive$4(t, r) {
	if ("object" != _typeof$4(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$4(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _classCallCheck(a, n) {
	if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
	if (e && ("object" == _typeof$4(e) || "function" == typeof e)) return e;
	if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function _inherits(t, e) {
	if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	t.prototype = Object.create(e && e.prototype, { constructor: {
		value: t,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
	var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
	return _wrapNativeSuper = function _wrapNativeSuper(t) {
		if (null === t || !_isNativeFunction(t)) return t;
		if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
		if (void 0 !== r) {
			if (r.has(t)) return r.get(t);
			r.set(t, Wrapper);
		}
		function Wrapper() {
			return _construct(t, arguments, _getPrototypeOf(this).constructor);
		}
		return Wrapper.prototype = Object.create(t.prototype, { constructor: {
			value: Wrapper,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), _setPrototypeOf(Wrapper, t);
	}, _wrapNativeSuper(t);
}
function _construct(t, e, r) {
	if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
	var o = [null];
	o.push.apply(o, e);
	var p = new (t.bind.apply(t, o))();
	return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function _isNativeFunction(t) {
	try {
		return -1 !== Function.toString.call(t).indexOf("[native code]");
	} catch (n) {
		return "function" == typeof t;
	}
}
function _setPrototypeOf(t, e) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
	return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
		return t.__proto__ || Object.getPrototypeOf(t);
	}, _getPrototypeOf(t);
}
var ParseError = /* @__PURE__ */ function(_Error) {
	function ParseError(code) {
		var _this;
		_classCallCheck(this, ParseError);
		_this = _callSuper(this, ParseError, [code]);
		Object.setPrototypeOf(_this, ParseError.prototype);
		_this.name = _this.constructor.name;
		return _this;
	}
	_inherits(ParseError, _Error);
	return _createClass(ParseError);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extension/extractExtension.js
var EXTN_PATTERN = new RegExp("(?:" + createExtensionPattern() + ")$", "i");
function extractExtension(number) {
	var start = number.search(EXTN_PATTERN);
	if (start < 0) return {};
	var numberWithoutExtension = number.slice(0, start);
	var matches = number.match(EXTN_PATTERN);
	var i = 1;
	while (i < matches.length) {
		if (matches[i]) return {
			number: numberWithoutExtension,
			ext: matches[i]
		};
		i++;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/parseDigits.js
var DIGITS = {
	"0": "0",
	"1": "1",
	"2": "2",
	"3": "3",
	"4": "4",
	"5": "5",
	"6": "6",
	"7": "7",
	"8": "8",
	"9": "9",
	"０": "0",
	"１": "1",
	"２": "2",
	"３": "3",
	"４": "4",
	"５": "5",
	"６": "6",
	"７": "7",
	"８": "8",
	"９": "9",
	"٠": "0",
	"١": "1",
	"٢": "2",
	"٣": "3",
	"٤": "4",
	"٥": "5",
	"٦": "6",
	"٧": "7",
	"٨": "8",
	"٩": "9",
	"۰": "0",
	"۱": "1",
	"۲": "2",
	"۳": "3",
	"۴": "4",
	"۵": "5",
	"۶": "6",
	"۷": "7",
	"۸": "8",
	"۹": "9"
};
function parseDigit(character) {
	return DIGITS[character];
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js
function _createForOfIteratorHelperLoose(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (t) return (t = t.call(r)).next.bind(t);
	if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e && r && "number" == typeof r.length) {
		t && (r = t);
		var o = 0;
		return function() {
			return o >= r.length ? { done: !0 } : {
				done: !1,
				value: r[o++]
			};
		};
	}
	throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
	}
}
function _arrayLikeToArray$1(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
/**
* Parses phone number characters from a string.
* Drops all punctuation leaving only digits and the leading `+` sign (if any).
* Also converts wide-ascii and arabic-indic numerals to conventional numerals.
* E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
* @param  {string} string
* @return {string}
* @example
* ```js
* // Outputs '8800555'.
* parseIncompletePhoneNumber('8 (800) 555')
* // Outputs '+7800555'.
* parseIncompletePhoneNumber('+7 800 555')
* ```
*/
function parseIncompletePhoneNumber(string) {
	var result = "";
	for (var _iterator = _createForOfIteratorHelperLoose(string.split("")), _step; !(_step = _iterator()).done;) {
		var character = _step.value;
		result += parsePhoneNumberCharacter(character, result) || "";
	}
	return result;
}
/**
* Parses next character while parsing phone number digits (including a `+`)
* from text: discards everything except `+` and digits, and `+` is only allowed
* at the start of a phone number.
* For example, is used in `react-phone-number-input` where it uses
* [`input-format`](https://gitlab.com/catamphetamine/input-format).
* @param  {string} character - Yet another character from raw input string.
* @param  {string?} prevParsedCharacters - Previous parsed characters.
* @param  {function?} eventListener - An optional "on event" function.
* @return {string?} The parsed character.
*/
function parsePhoneNumberCharacter(character, prevParsedCharacters, eventListener) {
	if (character === "+") {
		if (prevParsedCharacters) {
			if (typeof eventListener === "function") eventListener("end");
			return;
		}
		return "+";
	}
	return parseDigit(character);
}
var RFC3966_PHONE_DIGIT_ = "([" + VALID_DIGITS + "]|[\\-\\.\\(\\)]?)";
var RFC3966_GLOBAL_NUMBER_DIGITS_ = "^\\+" + RFC3966_PHONE_DIGIT_ + "*[" + VALID_DIGITS + "]" + RFC3966_PHONE_DIGIT_ + "*$";
/**
* Regular expression of valid global-number-digits for the phone-context
* parameter, following the syntax defined in RFC3966.
*/
var RFC3966_GLOBAL_NUMBER_DIGITS_PATTERN_ = new RegExp(RFC3966_GLOBAL_NUMBER_DIGITS_, "g");
var ALPHANUM_ = VALID_DIGITS;
var RFC3966_DOMAINLABEL_ = "[" + ALPHANUM_ + "]+((\\-)*[" + ALPHANUM_ + "])*";
var RFC3966_TOPLABEL_ = "[a-zA-Z]+((\\-)*[" + ALPHANUM_ + "])*";
var RFC3966_DOMAINNAME_ = "^(" + RFC3966_DOMAINLABEL_ + "\\.)*" + RFC3966_TOPLABEL_ + "\\.?$";
/**
* Regular expression of valid domainname for the phone-context parameter,
* following the syntax defined in RFC3966.
*/
var RFC3966_DOMAINNAME_PATTERN_ = new RegExp(RFC3966_DOMAINNAME_, "g");
var RFC3966_PREFIX_ = "tel:";
var RFC3966_PHONE_CONTEXT_ = ";phone-context=";
var RFC3966_ISDN_SUBADDRESS_ = ";isub=";
/**
* Extracts the value of the phone-context parameter of `numberToExtractFrom`,
* following the syntax defined in RFC3966.
*
* @param {string} numberToExtractFrom
* @return {string|null} the extracted string (possibly empty), or `null` if no phone-context parameter is found.
*/
function extractPhoneContext(numberToExtractFrom) {
	var indexOfPhoneContext = numberToExtractFrom.indexOf(RFC3966_PHONE_CONTEXT_);
	if (indexOfPhoneContext < 0) return null;
	var phoneContextStart = indexOfPhoneContext + RFC3966_PHONE_CONTEXT_.length;
	if (phoneContextStart >= numberToExtractFrom.length) return "";
	var phoneContextEnd = numberToExtractFrom.indexOf(";", phoneContextStart);
	if (phoneContextEnd >= 0) return numberToExtractFrom.substring(phoneContextStart, phoneContextEnd);
	else return numberToExtractFrom.substring(phoneContextStart);
}
/**
* Returns whether the value of phoneContext follows the syntax defined in RFC3966.
*
* @param {string|null} phoneContext
* @return {boolean}
*/
function isPhoneContextValid(phoneContext) {
	if (phoneContext === null) return true;
	if (phoneContext.length === 0) return false;
	return RFC3966_GLOBAL_NUMBER_DIGITS_PATTERN_.test(phoneContext) || RFC3966_DOMAINNAME_PATTERN_.test(phoneContext);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/helpers/extractFormattedPhoneNumberFromPossibleRfc3966NumberUri.js
/**
* @param  {string} numberToParse
* @param  {string} nationalNumber
* @return {}
*/
function extractFormattedPhoneNumberFromPossibleRfc3966NumberUri(numberToParse, _ref) {
	var extractFormattedPhoneNumber = _ref.extractFormattedPhoneNumber;
	var phoneContext = extractPhoneContext(numberToParse);
	if (!isPhoneContextValid(phoneContext)) throw new ParseError("NOT_A_NUMBER");
	var phoneNumberString;
	if (phoneContext === null) phoneNumberString = extractFormattedPhoneNumber(numberToParse) || "";
	else {
		phoneNumberString = "";
		if (phoneContext.charAt(0) === "+") phoneNumberString += phoneContext;
		var indexOfRfc3966Prefix = numberToParse.indexOf(RFC3966_PREFIX_);
		var indexOfNationalNumber;
		/* istanbul ignore else */
		if (indexOfRfc3966Prefix >= 0) indexOfNationalNumber = indexOfRfc3966Prefix + RFC3966_PREFIX_.length;
		else indexOfNationalNumber = 0;
		var indexOfPhoneContext = numberToParse.indexOf(RFC3966_PHONE_CONTEXT_);
		phoneNumberString += numberToParse.substring(indexOfNationalNumber, indexOfPhoneContext);
	}
	var indexOfIsdn = phoneNumberString.indexOf(RFC3966_ISDN_SUBADDRESS_);
	if (indexOfIsdn > 0) phoneNumberString = phoneNumberString.substring(0, indexOfIsdn);
	if (phoneNumberString !== "") return phoneNumberString;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/parse.js
var MAX_INPUT_STRING_LENGTH = 250;
var PHONE_NUMBER_START_PATTERN = new RegExp("[" + PLUS_CHARS + VALID_DIGITS + "]");
var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp("[^" + VALID_DIGITS + "#]+$");
var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;
/**
* Parses a phone number.
*
* parse('123456789', { defaultCountry: 'RU', v2: true }, metadata)
* parse('123456789', { defaultCountry: 'RU' }, metadata)
* parse('123456789', undefined, metadata)
*
* @param  {string} input
* @param  {object} [options]
* @param  {object} metadata
* @return {object|PhoneNumber?} If `options.v2: true` flag is passed, it returns a `PhoneNumber?` instance. Otherwise, returns an object of shape `{ phone: '...', country: '...' }` (or just `{}` if no phone number was parsed).
*/
function parse(text, options, metadata) {
	options = options || {};
	metadata = new Metadata(metadata);
	if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
		if (options.v2) throw new ParseError("INVALID_COUNTRY");
		throw new Error("Unknown country: ".concat(options.defaultCountry));
	}
	var _parseInput = parseInput(text, options.v2, options.extract), formattedPhoneNumber = _parseInput.number, ext = _parseInput.ext, error = _parseInput.error;
	if (!formattedPhoneNumber) {
		if (options.v2) {
			if (error === "TOO_SHORT") throw new ParseError("TOO_SHORT");
			throw new ParseError("NOT_A_NUMBER");
		}
		return {};
	}
	var _parsePhoneNumber = parsePhoneNumber$3(formattedPhoneNumber, options.defaultCountry, options.defaultCallingCode, metadata), country = _parsePhoneNumber.country, nationalNumber = _parsePhoneNumber.nationalNumber, countryCallingCode = _parsePhoneNumber.countryCallingCode, countryCallingCodeSource = _parsePhoneNumber.countryCallingCodeSource, carrierCode = _parsePhoneNumber.carrierCode;
	if (!metadata.hasSelectedNumberingPlan()) {
		if (options.v2) throw new ParseError("INVALID_COUNTRY");
		return {};
	}
	if (!nationalNumber || nationalNumber.length < 2) {
		/* istanbul ignore if */
		if (options.v2) throw new ParseError("TOO_SHORT");
		return {};
	}
	if (nationalNumber.length > 17) {
		if (options.v2) throw new ParseError("TOO_LONG");
		return {};
	}
	if (options.v2) {
		var phoneNumber = new PhoneNumber(countryCallingCode, nationalNumber, metadata.metadata);
		if (country) phoneNumber.country = country;
		if (carrierCode) phoneNumber.carrierCode = carrierCode;
		if (ext) phoneNumber.ext = ext;
		phoneNumber.__countryCallingCodeSource = countryCallingCodeSource;
		return phoneNumber;
	}
	var valid = (options.extended ? metadata.hasSelectedNumberingPlan() : country) ? matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) : false;
	if (!options.extended) return valid ? result(country, nationalNumber, ext) : {};
	return {
		country,
		countryCallingCode,
		carrierCode,
		valid,
		possible: valid ? true : options.extended === true && metadata.possibleLengths() && isPossibleNumber(nationalNumber, country, metadata) ? true : false,
		phone: nationalNumber,
		ext
	};
}
/**
* Extracts a formatted phone number from text.
* Doesn't guarantee that the extracted phone number
* is a valid phone number (for example, doesn't validate its length).
* @param  {string} text
* @param  {boolean} [extract] — If `false`, then will parse the entire `text` as a phone number.
* @param  {boolean} [throwOnError] — By default, it won't throw if the text is too long.
* @return {string}
* @example
* // Returns "(213) 373-4253".
* extractFormattedPhoneNumber("Call (213) 373-4253 for assistance.")
*/
function _extractFormattedPhoneNumber(text, extract, throwOnError) {
	if (!text) return;
	if (text.length > MAX_INPUT_STRING_LENGTH) {
		if (throwOnError) throw new ParseError("TOO_LONG");
		return;
	}
	if (extract === false) return text;
	var startsAt = text.search(PHONE_NUMBER_START_PATTERN);
	if (startsAt < 0) return;
	return text.slice(startsAt).replace(AFTER_PHONE_NUMBER_END_PATTERN, "");
}
/**
* @param  {string} text - Input.
* @param  {boolean} v2 - Legacy API functions don't pass `v2: true` flag.
* @param  {boolean} [extract] - Whether to extract a phone number from `text`, or attempt to parse the entire text as a phone number.
* @return {object} `{ ?number, ?ext }`.
*/
function parseInput(text, v2, extract) {
	var number = extractFormattedPhoneNumberFromPossibleRfc3966NumberUri(text, { extractFormattedPhoneNumber: function extractFormattedPhoneNumber(text) {
		return _extractFormattedPhoneNumber(text, extract, v2);
	} });
	if (!number) return {};
	if (!isViablePhoneNumber(number)) {
		if (isViablePhoneNumberStart(number)) return { error: "TOO_SHORT" };
		return {};
	}
	var withExtensionStripped = extractExtension(number);
	if (withExtensionStripped.ext) return withExtensionStripped;
	return { number };
}
/**
* Creates `parse()` result object.
*/
function result(country, nationalNumber, ext) {
	var result = {
		country,
		phone: nationalNumber
	};
	if (ext) result.ext = ext;
	return result;
}
/**
* Parses a viable phone number.
* @param {string} formattedPhoneNumber — Example: "(213) 373-4253".
* @param {string} [defaultCountry]
* @param {string} [defaultCallingCode]
* @param {Metadata} metadata
* @return {object} Returns `{ country: string?, countryCallingCode: string?, nationalNumber: string? }`.
*/
function parsePhoneNumber$3(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata) {
	var _extractCountryCallin = extractCountryCallingCode(parseIncompletePhoneNumber(formattedPhoneNumber), void 0, defaultCountry, defaultCallingCode, metadata.metadata), countryCallingCodeSource = _extractCountryCallin.countryCallingCodeSource, countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
	var country;
	if (countryCallingCode) metadata.selectNumberingPlan(countryCallingCode);
	else if (number && (defaultCountry || defaultCallingCode)) {
		metadata.selectNumberingPlan(defaultCountry, defaultCallingCode);
		if (defaultCountry) country = defaultCountry;
		else if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
			if (metadata.isNonGeographicCallingCode(defaultCallingCode)) country = "001";
		}
		countryCallingCode = defaultCallingCode || getCountryCallingCode(defaultCountry, metadata.metadata);
	} else return {};
	if (!number) return {
		countryCallingCodeSource,
		countryCallingCode
	};
	var _extractNationalNumbe = extractNationalNumber(parseIncompletePhoneNumber(number), country, metadata), nationalNumber = _extractNationalNumbe.nationalNumber, carrierCode = _extractNationalNumbe.carrierCode;
	var exactCountry = getCountryByCallingCode(countryCallingCode, {
		nationalNumber,
		metadata
	});
	if (exactCountry) {
		country = exactCountry;
		/* istanbul ignore if */
		if (exactCountry === "001") {} else metadata.selectNumberingPlan(country);
	}
	return {
		country,
		countryCallingCode,
		countryCallingCodeSource,
		nationalNumber,
		carrierCode
	};
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/parsePhoneNumberWithError_.js
function _typeof$3(o) {
	"@babel/helpers - typeof";
	return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$3(o);
}
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty$3(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$3(e, r, t) {
	return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
	if ("object" != _typeof$3(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$3(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function parsePhoneNumberWithError(text, options, metadata) {
	return parse(text, _objectSpread$3(_objectSpread$3({}, options), {}, { v2: true }), metadata);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/normalizeArguments.js
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$2(o);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function normalizeArguments(args) {
	var _Array$prototype$slic2 = _slicedToArray(Array.prototype.slice.call(args), 4), arg_1 = _Array$prototype$slic2[0], arg_2 = _Array$prototype$slic2[1], arg_3 = _Array$prototype$slic2[2], arg_4 = _Array$prototype$slic2[3];
	var text;
	var options;
	var metadata;
	if (typeof arg_1 === "string") text = arg_1;
	else throw new TypeError("A text for parsing must be a string.");
	if (!arg_2 || typeof arg_2 === "string") {
		if (arg_4) {
			options = arg_3;
			metadata = arg_4;
		} else {
			options = void 0;
			metadata = arg_3;
		}
		if (arg_2) options = _objectSpread$2({ defaultCountry: arg_2 }, options);
	} else if (isObject(arg_2)) if (arg_3) {
		options = arg_2;
		metadata = arg_3;
	} else metadata = arg_2;
	else throw new Error("Invalid second argument: ".concat(arg_2));
	return {
		text,
		options,
		metadata
	};
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/parsePhoneNumber_.js
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof$1(o);
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function parsePhoneNumber$2(text, options, metadata) {
	if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata)) options = _objectSpread$1(_objectSpread$1({}, options), {}, { defaultCountry: void 0 });
	try {
		return parsePhoneNumberWithError(text, options, metadata);
	} catch (error) {
		/* istanbul ignore else */
		if (error instanceof ParseError) {} else throw error;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/parsePhoneNumber.js
function parsePhoneNumber$1() {
	var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
	return parsePhoneNumber$2(text, options, metadata);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/es6/isValidPhoneNumber.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function isValidPhoneNumber$1() {
	var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata = _normalizeArguments.metadata;
	options = _objectSpread(_objectSpread({}, options), {}, { extract: false });
	var phoneNumber = parsePhoneNumber$2(text, options, metadata);
	return phoneNumber && phoneNumber.isValid() || false;
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/min/exports/parsePhoneNumber.js
function parsePhoneNumber() {
	return withMetadataArgument(parsePhoneNumber$1, arguments);
}
//#endregion
//#region ../../node_modules/.pnpm/libphonenumber-js@1.13.1/node_modules/libphonenumber-js/min/exports/isValidPhoneNumber.js
function isValidPhoneNumber() {
	return withMetadataArgument(isValidPhoneNumber$1, arguments);
}
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+infra@0.2.8_0c0bcb9c4ec29acded57ca7c476fc5b8/node_modules/@better-auth/infra/dist/index.mjs
function resolveConnectionOptions(options) {
	return {
		apiUrl: options?.apiUrl || INFRA_API_URL,
		kvUrl: options?.kvUrl || INFRA_KV_URL,
		apiKey: options?.apiKey || env.BETTER_AUTH_API_KEY || "",
		apiTimeout: options?.apiTimeout ?? 3e3,
		kvTimeout: options?.kvTimeout ?? 1e3
	};
}
function resolveDashOptions(options) {
	const activityUpdateInterval = options?.activityTracking?.updateInterval ?? 3e5;
	return {
		...resolveConnectionOptions(options),
		...options,
		activityTracking: {
			...options?.activityTracking,
			updateInterval: activityUpdateInterval
		}
	};
}
var EVENT_TYPES = {
	USER_CREATED: "user_created",
	USER_SIGNED_IN: "user_signed_in",
	USER_SIGNED_OUT: "user_signed_out",
	USER_SIGN_IN_FAILED: "user_sign_in_failed",
	PASSWORD_RESET_REQUESTED: "password_reset_requested",
	PASSWORD_RESET_COMPLETED: "password_reset_completed",
	PASSWORD_CHANGED: "password_changed",
	EMAIL_VERIFICATION_SENT: "email_verification_sent",
	EMAIL_VERIFIED: "email_verified",
	EMAIL_CHANGED: "email_changed",
	PROFILE_UPDATED: "profile_updated",
	PROFILE_IMAGE_UPDATED: "profile_image_updated",
	SESSION_CREATED: "session_created",
	SESSION_REVOKED: "session_revoked",
	ALL_SESSIONS_REVOKED: "all_sessions_revoked",
	TWO_FACTOR_ENABLED: "two_factor_enabled",
	TWO_FACTOR_DISABLED: "two_factor_disabled",
	TWO_FACTOR_VERIFIED: "two_factor_verified",
	ACCOUNT_LINKED: "account_linked",
	ACCOUNT_UNLINKED: "account_unlinked",
	USER_BANNED: "user_banned",
	USER_UNBANNED: "user_unbanned",
	USER_DELETED: "user_deleted",
	USER_IMPERSONATED: "user_impersonated",
	USER_IMPERSONATED_STOPPED: "user_impersonated_stopped"
};
var routes = {
	SEND_VERIFICATION_EMAIL: "/send-verification-email",
	SIGN_IN: "/sign-in",
	SIGN_IN_EMAIL: "/sign-in/email",
	SIGN_IN_USERNAME: "/sign-in/username",
	SIGN_IN_EMAIL_OTP: "/sign-in/email-otp",
	SIGN_IN_SOCIAL: "/sign-in/social",
	SIGN_IN_ANONYMOUS: "/sign-in/anonymous",
	SIGN_IN_SOCIAL_CALLBACK: "/callback/:id",
	SIGN_IN_OAUTH_CALLBACK: "/oauth2/callback/:id",
	SIGN_OUT: "/sign-out",
	SIGN_UP: "/sign-up",
	SIGN_UP_EMAIL: "/sign-up/email",
	UPDATE_USER: "/update-user",
	CHANGE_EMAIL: "/change-email",
	VERIFY_EMAIL: "/verify-email",
	CHANGE_PASSWORD: "/change-password",
	SET_PASSWORD: "/set-password",
	RESET_PASSWORD: "/reset-password",
	REQUEST_PASSWORD_RESET: "/request-password-reset",
	REVOKE_ALL_SESSIONS: "/revoke-sessions",
	FORGET_PASSWORD: "/forget-password",
	SIGN_IN_PASSKEY: "/sign-in/passkey",
	PASSKEY_ADD: "/passkey/add-passkey",
	SIGN_IN_MAGIC_LINK: "/sign-in/magic-link",
	MAGIC_LINK_VERIFY: "/magic-link/verify",
	SIGN_IN_SSO: "/sign-in/sso",
	TWO_FACTOR_VERIFY_TOTP: "/two-factor/verify-totp",
	TWO_FACTOR_VERIFY_BACKUP: "/two-factor/verify-backup-code",
	TWO_FACTOR_VERIFY_OTP: "/two-factor/verify-otp",
	EMAIL_OTP_SEND: "/email-otp/send-verification-otp",
	PHONE_SEND_OTP: "/phone-number/send-otp",
	PHONE_VERIFY_OTP: "/phone-number/verify-phone-number",
	DEVICE_TOKEN: "/device/token",
	SIWE_VERIFY: "/siwe/verify",
	ORG_CREATE: "/organization/create",
	ORG_INVITE_MEMBER: "/organization/invite-member",
	API_KEY_CREATE: "/api-key/create",
	LINK_SOCIAL: "/link-social",
	DASH_ROUTE: "/dash",
	DASH_UPDATE_USER: "/dash/update-user",
	DASH_REVOKE_SESSIONS_ALL: "/dash/sessions/revoke-all",
	DASH_BAN_USER: "/dash/ban-user",
	DASH_UNBAN_USER: "/dash/unban-user",
	ADMIN_ROUTE: "/admin",
	ADMIN_REVOKE_USER_SESSIONS: "/admin/revoke-user-sessions",
	ADMIN_SET_PASSWORD: "/admin/set-user-password",
	ADMIN_BAN_USER: "/admin/ban-user",
	ADMIN_UNBAN_USER: "/admin/unban-user",
	ADMIN_IMPERSONATE_USER: "/admin/impersonate-user"
};
var ORGANIZATION_EVENT_TYPES = {
	ORGANIZATION_CREATED: "organization_created",
	ORGANIZATION_UPDATED: "organization_updated",
	ORGANIZATION_MEMBER_ADDED: "organization_member_added",
	ORGANIZATION_MEMBER_REMOVED: "organization_member_removed",
	ORGANIZATION_MEMBER_ROLE_UPDATED: "organization_member_role_updated",
	ORGANIZATION_MEMBER_INVITED: "organization_member_invited",
	ORGANIZATION_MEMBER_INVITE_CANCELED: "organization_member_invite_canceled",
	ORGANIZATION_MEMBER_INVITE_ACCEPTED: "organization_member_invite_accepted",
	ORGANIZATION_MEMBER_INVITE_REJECTED: "organization_member_invite_rejected",
	ORGANIZATION_TEAM_CREATED: "organization_team_created",
	ORGANIZATION_TEAM_UPDATED: "organization_team_updated",
	ORGANIZATION_TEAM_DELETED: "organization_team_deleted",
	ORGANIZATION_TEAM_MEMBER_ADDED: "organization_team_member_added",
	ORGANIZATION_TEAM_MEMBER_REMOVED: "organization_team_member_removed"
};
/** All audit event type string constants (user + organization). */
var USER_EVENT_TYPES = {
	...EVENT_TYPES,
	...ORGANIZATION_EVENT_TYPES
};
var getUserByEmail = async (email, ctx) => {
	let user = null;
	try {
		user = await ctx.context.adapter.findOne({
			model: "user",
			select: [
				"id",
				"name",
				"email"
			],
			where: [{
				field: "email",
				value: email
			}]
		});
	} catch (error) {
		logger.debug("[Dash] Failed to fetch user info:", error);
	}
	return user;
};
async function getUserById(userId, ctx) {
	let user = null;
	try {
		user = await ctx.context.adapter.findOne({
			model: "user",
			select: [
				"id",
				"name",
				"email"
			],
			where: [{
				field: "id",
				value: userId
			}]
		});
	} catch (error) {
		logger.debug("[Dash] Failed to fetch user info:", error);
	}
	return user;
}
var getUserByIdToken = async (providerId, idToken, ctx) => {
	const provider = ctx.context.socialProviders.find((p) => p.id === providerId);
	let user = null;
	if (provider) try {
		user = await provider.getUserInfo(idToken);
	} catch (error) {
		logger.debug("[Dash] Failed to fetch user info:", error);
	}
	return user;
};
var getUserByAuthorizationCode = async (providerId, ctx) => {
	let userInfo = null;
	const provider = ctx.context.socialProviders.find((p) => p.id === providerId);
	if (provider) try {
		const codeVerifier = (await parseState(ctx)).codeVerifier;
		const { code, device_id } = ctx.query ?? {};
		const tokens = await provider.validateAuthorizationCode({
			code,
			codeVerifier,
			deviceId: device_id,
			redirectURI: `${ctx.context.baseURL}/callback/${provider.id}`
		});
		userInfo = await provider.getUserInfo({ ...tokens }).then((res) => res?.user);
	} catch (error) {
		logger.debug("[Dash] Failed to fetch user info:", error);
	}
	return userInfo;
};
var initAccountEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackAccountLinking = (account, trigger, ctx, location) => {
		const track = async () => {
			const user = await getUserById(account.userId, ctx);
			trackEvent({
				eventKey: account.userId,
				eventType: EVENT_TYPES.ACCOUNT_LINKED,
				eventDisplayName: `Linked ${account.providerId} account`,
				eventData: {
					userId: account.userId,
					userEmail: user?.email ?? "unknown",
					userName: user?.name ?? "unknown",
					accountId: account.id,
					providerId: account.providerId,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackAccountUnlink = (account, trigger, ctx, location) => {
		const track = async () => {
			const user = await getUserById(account.userId, ctx);
			trackEvent({
				eventKey: account.userId,
				eventType: EVENT_TYPES.ACCOUNT_UNLINKED,
				eventDisplayName: `Unlinked ${account.providerId} account`,
				eventData: {
					userId: account.userId,
					userEmail: user?.email ?? "unknown",
					userName: user?.name ?? "unknown",
					accountId: account.id,
					providerId: account.providerId,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackAccountPasswordChange = (account, trigger, ctx, location) => {
		const track = async () => {
			const user = await getUserById(account.userId, ctx);
			trackEvent({
				eventKey: account.userId,
				eventType: EVENT_TYPES.PASSWORD_CHANGED,
				eventDisplayName: "Password changed",
				eventData: {
					userId: account.userId,
					userEmail: user?.email ?? "unknown",
					userName: user?.name ?? "unknown",
					accountId: account.id,
					providerId: account.providerId,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	return {
		trackAccountLinking,
		trackAccountUnlink,
		trackAccountPasswordChange
	};
};
function tryDecode(value) {
	const trimmed = value.trim();
	try {
		return decodeURIComponent(trimmed);
	} catch {
		return trimmed;
	}
}
var stripQuery = (value) => value.split("?")[0] || value;
var escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var routeToRegex = (route) => {
	const pattern = escapeRegex(stripQuery(route)).replace(/\/:([^/]+)/g, "/[^/]+");
	return new RegExp(`${pattern}(?:$|[/?])`);
};
var matchesAnyRoute = (path, routes) => {
	const cleanPath = stripQuery(path);
	return routes.some((route) => routeToRegex(route).test(cleanPath));
};
var OAUTH_CALLBACK_PATHS = [routes.SIGN_IN_SOCIAL_CALLBACK, routes.SIGN_IN_OAUTH_CALLBACK];
var PATH_TO_METHOD = [
	[routes.SIGN_IN_EMAIL, "email"],
	[routes.SIGN_UP_EMAIL, "email"],
	[routes.SIGN_IN_USERNAME, "username"],
	[routes.SIGN_IN_EMAIL_OTP, "email-otp"],
	[routes.SIGN_IN_SOCIAL, "social"],
	[routes.SIGN_IN_ANONYMOUS, "anonymous"],
	[routes.SIGN_IN_PASSKEY, "passkey"],
	[routes.SIGN_IN_MAGIC_LINK, "magic-link"],
	[routes.MAGIC_LINK_VERIFY, "magic-link"],
	[routes.SIGN_IN_SSO, "sso"],
	[routes.PHONE_VERIFY_OTP, "phone"],
	[routes.TWO_FACTOR_VERIFY_TOTP, "totp"],
	[routes.TWO_FACTOR_VERIFY_OTP, "two-factor-otp"],
	[routes.TWO_FACTOR_VERIFY_BACKUP, "backup-code"],
	[routes.ADMIN_IMPERSONATE_USER, "impersonation"],
	[routes.DEVICE_TOKEN, "device-code"],
	[routes.SIWE_VERIFY, "siwe"]
];
var getLoginMethod = (ctx) => {
	if (matchesAnyRoute(ctx.path, OAUTH_CALLBACK_PATHS)) {
		const id = ctx.params?.id;
		if (typeof id === "string" && id && !id.startsWith(":")) return id;
		return null;
	}
	for (const [path, method] of PATH_TO_METHOD) if (matchesAnyRoute(ctx.path, [path])) return method;
	return null;
};
var initSessionEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackUserSignedIn = (session, trigger, ctx, location) => {
		const track = async () => {
			const loginMethod = session.loginMethod ?? "unknown";
			const user = await getUserById(session.userId, ctx);
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.USER_SIGNED_IN,
				eventDisplayName: `Signed in via ${loginMethod}`,
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					sessionId: session.id,
					loginMethod,
					userAgent: session.userAgent,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackUserSignedOut = (session, trigger, ctx, location) => {
		const track = async () => {
			const loginMethod = session.loginMethod ?? "unknown";
			const user = await getUserById(session.userId, ctx);
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.USER_SIGNED_OUT,
				eventDisplayName: "User signed out",
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					sessionId: session.id,
					loginMethod,
					userAgent: session.userAgent,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackSessionRevoked = (session, trigger, ctx, location) => {
		const track = async () => {
			const loginMethod = session.loginMethod ?? "unknown";
			const user = await getUserById(session.userId, ctx);
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.SESSION_REVOKED,
				eventDisplayName: "Session revoked",
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					sessionId: session.id,
					loginMethod,
					userAgent: session.userAgent,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackSessionRevokedAll = (session, trigger, ctx, _location) => {
		const track = async () => {
			const user = await getUserById(session.userId, ctx);
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.ALL_SESSIONS_REVOKED,
				eventDisplayName: "All sessions revoked",
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				}
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackUserImpersonated = (session, trigger, ctx, location) => {
		const track = async () => {
			const loginMethod = session.loginMethod ?? "unknown";
			const user = await getUserById(session.userId, ctx);
			const impersonator = session.impersonatedBy ? await getUserById(session.impersonatedBy, ctx) : null;
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.USER_IMPERSONATED,
				eventDisplayName: "User impersonated",
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					sessionId: session.id,
					loginMethod,
					userAgent: session.userAgent,
					impersonatedBy: impersonator?.name ?? impersonator?.email ?? session.impersonatedBy,
					impersonatedById: session.impersonatedBy,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackUserImpersonationStop = (session, trigger, ctx, location) => {
		const track = async () => {
			const loginMethod = session.loginMethod ?? "unknown";
			const user = await getUserById(session.userId, ctx);
			const impersonator = session.impersonatedBy ? await getUserById(session.impersonatedBy, ctx) : null;
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.USER_IMPERSONATED_STOPPED,
				eventDisplayName: "User impersonation stopped",
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					sessionId: session.id,
					loginMethod,
					userAgent: session.userAgent,
					impersonatedBy: impersonator?.name ?? impersonator?.email ?? session.impersonatedBy,
					impersonatedById: session.impersonatedBy,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackSessionCreated = (session, trigger, ctx, location) => {
		const track = async () => {
			const loginMethod = session.loginMethod ?? "unknown";
			const user = await getUserById(session.userId, ctx);
			trackEvent({
				eventKey: session.userId,
				eventType: EVENT_TYPES.SESSION_CREATED,
				eventDisplayName: "Session created",
				eventData: {
					userId: session.userId,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					sessionId: session.id,
					loginMethod,
					userAgent: session.userAgent,
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackEmailVerificationSent = (session, user, trigger, _ctx) => {
		trackEvent({
			eventKey: session.userId,
			eventType: EVENT_TYPES.EMAIL_VERIFICATION_SENT,
			eventDisplayName: "Verification email sent",
			eventData: {
				userId: session.userId,
				userName: user.name,
				userEmail: user.email ?? "unknown",
				sessionId: session.id,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackEmailSignInAttempt = (ctx, trigger) => {
		const track = async () => {
			const user = await getUserByEmail(ctx.body.email, ctx);
			trackEvent({
				eventKey: user?.id ?? "unknown",
				eventType: EVENT_TYPES.USER_SIGN_IN_FAILED,
				eventDisplayName: "User sign-in attempt failed",
				eventData: {
					userId: user?.id ?? "unknown",
					nameName: user?.name ?? "unknown",
					userEmail: ctx.body.email,
					loginMethod: getLoginMethod(ctx),
					triggeredBy: user?.id ?? trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				}
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackSocialSignInAttempt = (ctx, trigger) => {
		const track = async () => {
			const user = await getUserByIdToken(ctx.body.provider, ctx.body.idToken, ctx);
			trackEvent({
				eventKey: user?.user.id.toString() ?? "unknown",
				eventType: EVENT_TYPES.USER_SIGN_IN_FAILED,
				eventDisplayName: "User sign-in attempt failed",
				eventData: {
					userId: user?.user.id.toString() ?? "unknown",
					userName: user?.user.name ?? "unknown",
					userEmail: user?.user.email ?? "unknown",
					loginMethod: getLoginMethod(ctx),
					triggeredBy: user?.user.id ?? trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				}
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackSocialSignInRedirectionAttempt = (ctx, trigger) => {
		const track = async () => {
			const user = await getUserByAuthorizationCode(tryDecode(ctx.params?.id), ctx);
			trackEvent({
				eventKey: user?.id.toString() ?? "unknown",
				eventType: EVENT_TYPES.USER_SIGN_IN_FAILED,
				eventDisplayName: "User sign-in attempt failed",
				eventData: {
					userId: user?.id.toString() ?? "unknown",
					userName: user?.name ?? "unknown",
					userEmail: user?.id ?? "unknown",
					loginMethod: getLoginMethod(ctx),
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				}
			});
		};
		ctx.context.runInBackground(track());
	};
	return {
		trackUserSignedIn,
		trackUserSignedOut,
		trackSessionCreated,
		trackSessionRevoked,
		trackSessionRevokedAll,
		trackUserImpersonated,
		trackUserImpersonationStop,
		trackEmailVerificationSent,
		trackEmailSignInAttempt,
		trackSocialSignInAttempt,
		trackSocialSignInRedirectionAttempt
	};
};
var initUserEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackUserSignedUp = (user, trigger, location) => {
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.USER_CREATED,
			eventDisplayName: `${user.name || user.email || "unknown"} signed up`,
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	const trackUserDeleted = (user, trigger, location) => {
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.USER_DELETED,
			eventDisplayName: "User deleted",
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	const trackUserProfileUpdated = (user, trigger, ctx, location) => {
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.PROFILE_UPDATED,
			eventDisplayName: "Profile updated",
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				updatedFields: Object.keys(ctx?.body || {}),
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	const trackUserProfileImageUpdated = (user, trigger, location) => {
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.PROFILE_IMAGE_UPDATED,
			eventDisplayName: "Profile image updated",
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	const trackUserBanned = (user, trigger, location) => {
		const reasonSuffix = user.banReason ? `: ${user.banReason}` : "";
		const expiresSuffix = user.banExpires ? ` (until ${user.banExpires.toISOString()})` : "";
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.USER_BANNED,
			eventDisplayName: `User banned${reasonSuffix}${expiresSuffix}`,
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				banned: user.banned,
				banReason: user.banReason,
				banExpires: user.banExpires,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	const trackUserUnBanned = (user, trigger, location) => {
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.USER_UNBANNED,
			eventDisplayName: "User unbanned",
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				banned: user.banned,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	const trackUserEmailVerified = (user, trigger, location) => {
		trackEvent({
			eventKey: user.id,
			eventType: EVENT_TYPES.EMAIL_VERIFIED,
			eventDisplayName: "Email verified",
			eventData: {
				userId: user.id,
				userEmail: user.email ?? "unknown",
				userName: user.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			},
			ipAddress: location?.ipAddress,
			city: location?.city,
			country: location?.country,
			countryCode: location?.countryCode
		});
	};
	return {
		trackUserSignedUp,
		trackUserDeleted,
		trackUserProfileUpdated,
		trackUserProfileImageUpdated,
		trackUserBanned,
		trackUserUnBanned,
		trackUserEmailVerified
	};
};
var initVerificationEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackPasswordResetRequest = (verification, trigger, ctx, location) => {
		const track = async () => {
			const user = await getUserById(verification.value, ctx);
			trackEvent({
				eventKey: verification.value,
				eventType: EVENT_TYPES.PASSWORD_RESET_REQUESTED,
				eventDisplayName: "Password reset requested",
				eventData: {
					userId: verification.value,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	const trackPasswordResetRequestCompletion = (verification, trigger, ctx, location) => {
		const track = async () => {
			const user = await getUserById(verification.value, ctx);
			trackEvent({
				eventKey: verification.value,
				eventType: EVENT_TYPES.PASSWORD_RESET_COMPLETED,
				eventDisplayName: "Password reset completed",
				eventData: {
					userId: verification.value,
					userName: user?.name ?? "unknown",
					userEmail: user?.email ?? "unknown",
					triggeredBy: trigger.triggeredBy,
					triggerContext: trigger.triggerContext
				},
				ipAddress: location?.ipAddress,
				city: location?.city,
				country: location?.country,
				countryCode: location?.countryCode
			});
		};
		ctx.context.runInBackground(track());
	};
	return {
		trackPasswordResetRequest,
		trackPasswordResetRequestCompletion
	};
};
var getTriggerInfo = (ctx, userId, session) => {
	const sessionUserId = session?.userId ?? ctx.context.session?.session.userId ?? userId;
	return {
		triggeredBy: sessionUserId,
		triggerContext: sessionUserId === userId ? "user" : matchesAnyRoute(ctx.path, [routes.ADMIN_ROUTE]) ? "admin" : matchesAnyRoute(ctx.path, [routes.DASH_ROUTE]) ? "dashboard" : sessionUserId === "unknown" ? "user" : "unknown"
	};
};
/**
* Get trigger info for organization hooks
* Since organization hooks don't have direct access to the auth context,
* we use the user parameter when available
*/
var getOrganizationTriggerInfo = (user) => {
	return {
		triggeredBy: user?.id ?? "unknown",
		triggerContext: "organization"
	};
};
var initTrackEvents = ($api) => {
	const trackEvent = (data) => {
		const track = async () => {
			try {
				await $api("/events/track", {
					method: "POST",
					body: {
						eventType: data.eventType,
						eventData: data.eventData,
						eventKey: data.eventKey,
						eventDisplayName: data.eventDisplayName || data.eventType,
						ipAddress: data.ipAddress ?? void 0,
						city: data.city ?? void 0,
						country: data.country ?? void 0,
						countryCode: data.countryCode ?? void 0
					}
				});
			} catch (e) {
				logger.debug("[Dash] Failed to track event:", e);
			}
		};
		const onSuccess = (ctx) => {
			ctx.context.runInBackground(track());
		};
		const onError = () => {
			track();
		};
		getCurrentAuthContext().then(onSuccess, onError);
	};
	return { tracker: { trackEvent } };
};
/**
* Identification Service
*
* Fetches identification data from the durable-kv service
* when a request includes an X-Request-Id header.
*/
var IDENTIFICATION_COOKIE_NAME = "__infra-rid";
var identificationCache = /* @__PURE__ */ new Map();
var CACHE_TTL_MS = 6e4;
var CACHE_MAX_SIZE = 1e3;
var lastCleanup = Date.now();
function cleanupCache() {
	const now = Date.now();
	for (const [key, value] of identificationCache.entries()) if (now - value.timestamp > CACHE_TTL_MS) identificationCache.delete(key);
	lastCleanup = now;
}
function maybeCleanup() {
	if (Date.now() - lastCleanup > CACHE_TTL_MS || identificationCache.size > CACHE_MAX_SIZE) cleanupCache();
}
/**
* Fetch identification data from durable-kv by requestId
*/
async function getIdentification(requestId, $kv) {
	maybeCleanup();
	const cached = identificationCache.get(requestId);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) return cached.data;
	const maxRetries = 3;
	const retryDelays = [
		50,
		100,
		200
	];
	for (let attempt = 0; attempt <= maxRetries; attempt++) try {
		const { data, error } = await $kv(`/identify/${requestId}`, { method: "GET" });
		if (data && !error) {
			identificationCache.set(requestId, {
				data,
				timestamp: Date.now()
			});
			return data;
		}
		const status = error?.status;
		if (status === 404 && attempt < maxRetries) {
			await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt]));
			continue;
		}
		if (status !== 404) identificationCache.set(requestId, {
			data: null,
			timestamp: Date.now()
		});
		return null;
	} catch (error) {
		if (attempt === maxRetries) {
			logger.error("[Dash] Failed to fetch identification:", error);
			return null;
		}
		await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt] || 50));
	}
	return null;
}
/**
* Extract identification headers from a request
*/
function extractIdentificationHeaders(request) {
	if (!request) return {
		visitorId: null,
		requestId: null
	};
	return {
		visitorId: request.headers.get("X-Visitor-Id"),
		requestId: request.headers.get("X-Request-Id")
	};
}
/**
* Early middleware that loads identification data.
*
* @param $kv — KV client from {@link createKV} for the same plugin options (one instance per plugin).
*/
function createIdentificationMiddleware($kv) {
	return createAuthMiddleware(async (ctx) => {
		const { visitorId, requestId: headerRequestId } = extractIdentificationHeaders(ctx.request);
		const requestId = headerRequestId ?? ctx.getCookie("__infra-rid") ?? null;
		ctx.context.visitorId = visitorId;
		ctx.context.requestId = requestId;
		if (requestId) {
			if (ctx.context.identification === void 0) ctx.context.identification = await getIdentification(requestId, $kv) ?? null;
		} else ctx.context.identification = null;
		const ipConfig = ctx.context.options?.advanced?.ipAddress;
		if (ipConfig?.disableIpTracking === true) {
			ctx.context.location = void 0;
			return;
		}
		const identification = ctx.context.identification;
		if (requestId && identification) {
			const loc = getLocation(identification);
			ctx.context.location = {
				ipAddress: identification.ip || void 0,
				city: loc?.city || void 0,
				country: loc?.country?.name || void 0,
				countryCode: loc?.country?.code || void 0
			};
			return;
		}
		const ipAddress = getClientIpFromRequest(ctx.request, ipConfig?.ipAddressHeaders || null);
		if (ipAddress) {
			const countryCode = getCountryCodeFromRequest(ctx.request);
			ctx.context.location = {
				ipAddress,
				countryCode
			};
			return;
		}
		ctx.context.location = void 0;
	});
}
/**
* Get the visitor's location
*/
function getLocation(identification) {
	if (!identification) return null;
	return identification.location;
}
function getClientIpFromRequest(request, ipAddressHeaders) {
	if (!request) return void 0;
	const headers = ipAddressHeaders?.length ? ipAddressHeaders : [
		"cf-connecting-ip",
		"x-forwarded-for",
		"x-real-ip",
		"x-vercel-forwarded-for"
	];
	for (const headerName of headers) {
		const value = request.headers.get(headerName);
		if (!value) continue;
		const ip = value.split(",")[0]?.trim();
		if (ip) return ip;
	}
}
function getCountryCodeFromRequest(request) {
	if (!request) return void 0;
	const cc = request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country");
	return cc ? cc.toUpperCase() : void 0;
}
/**
* Whether Sentinel should normalize emails for deduplication/sign-in consistency.
* If `emailNormalization` is set, it wins; otherwise legacy behavior uses `emailValidation.enabled`.
*/
function isEmailNormalizationEnabled(security) {
	const explicit = security?.emailNormalization;
	if (explicit !== void 0) return explicit.enabled !== false;
	return security?.emailValidation?.enabled !== false;
}
/**
* Gmail-like providers that ignore dots in the local part
*/
var GMAIL_LIKE_DOMAINS = new Set(["gmail.com", "googlemail.com"]);
/**
* Providers known to support plus addressing
*/
var PLUS_ADDRESSING_DOMAINS = new Set([
	"gmail.com",
	"googlemail.com",
	"outlook.com",
	"hotmail.com",
	"live.com",
	"yahoo.com",
	"icloud.com",
	"me.com",
	"mac.com",
	"protonmail.com",
	"proton.me",
	"fastmail.com",
	"zoho.com"
]);
/**
* Normalize an email address for comparison/deduplication
* - Lowercase the entire email
* - Remove dots from Gmail-like providers (they ignore dots)
* - Remove plus addressing (user+tag@domain → user@domain)
* - Normalize googlemail.com to gmail.com
*
* @param email - Raw email to normalize
* @param context - Auth context
*/
function normalizeEmail(email, context) {
	if (!email || typeof email !== "string") return email;
	const mergedOpts = context.options;
	if (!isEmailNormalizationEnabled(mergedOpts)) return email;
	const trimmed = email.trim().toLowerCase();
	const atIndex = trimmed.lastIndexOf("@");
	if (atIndex === -1) return trimmed;
	let localPart = trimmed.slice(0, atIndex);
	let domain = trimmed.slice(atIndex + 1);
	if (domain === "googlemail.com") domain = "gmail.com";
	if (PLUS_ADDRESSING_DOMAINS.has(domain)) {
		const plusIndex = localPart.indexOf("+");
		if (plusIndex !== -1) localPart = localPart.slice(0, plusIndex);
	}
	if (GMAIL_LIKE_DOMAINS.has(domain)) localPart = localPart.replace(/\./g, "");
	return `${localPart}@${domain}`;
}
/**
* Common fake/test phone numbers that should be blocked
* These are numbers commonly used in testing, movies, documentation, etc.
*/
var INVALID_PHONE_NUMBERS = new Set([
	"+15550000000",
	"+15550001111",
	"+15550001234",
	"+15551234567",
	"+15555555555",
	"+15551111111",
	"+15550000001",
	"+15550123456",
	"+12125551234",
	"+13105551234",
	"+14155551234",
	"+12025551234",
	"+10000000000",
	"+11111111111",
	"+12222222222",
	"+13333333333",
	"+14444444444",
	"+15555555555",
	"+16666666666",
	"+17777777777",
	"+18888888888",
	"+19999999999",
	"+11234567890",
	"+10123456789",
	"+19876543210",
	"+441632960000",
	"+447700900000",
	"+447700900001",
	"+447700900123",
	"+447700900999",
	"+442079460000",
	"+442079460123",
	"+441134960000",
	"+0000000000",
	"+1000000000",
	"+123456789",
	"+1234567890",
	"+12345678901",
	"+0123456789",
	"+9876543210",
	"+11111111111",
	"+99999999999",
	"+491234567890",
	"+491111111111",
	"+33123456789",
	"+33111111111",
	"+61123456789",
	"+61111111111",
	"+81123456789",
	"+81111111111",
	"+19001234567",
	"+19761234567",
	"+1911",
	"+1411",
	"+1611",
	"+44999",
	"+44112"
]);
/**
* Patterns that indicate fake/test phone numbers
*/
var INVALID_PHONE_PATTERNS = [
	/^\+\d(\d)\1{6,}$/,
	/^\+\d*1234567890/,
	/^\+\d*0123456789/,
	/^\+\d*9876543210/,
	/^\+\d*0987654321/,
	/^\+\d*(12){4,}/,
	/^\+\d*(21){4,}/,
	/^\+\d*(00){4,}/,
	/^\+1\d{3}555\d{4}$/,
	/^\+\d{1,3}\d{1,5}$/,
	/^\+\d+0{7,}$/,
	/^\+\d*147258369/,
	/^\+\d*258369147/,
	/^\+\d*369258147/,
	/^\+\d*789456123/,
	/^\+\d*123456789/,
	/^\+\d*1234512345/,
	/^\+\d*1111122222/,
	/^\+\d*1212121212/,
	/^\+\d*1010101010/
];
/**
* Invalid area codes / prefixes that indicate test numbers
* Key: country code, Value: set of invalid prefixes
*/
var INVALID_PREFIXES_BY_COUNTRY = {
	US: new Set([
		"555",
		"000",
		"111",
		"911",
		"411",
		"611"
	]),
	CA: new Set([
		"555",
		"000",
		"911"
	]),
	GB: new Set([
		"7700900",
		"1632960",
		"1134960"
	]),
	AU: new Set([
		"0491570",
		"0491571",
		"0491572"
	])
};
/**
* Check if a phone number is a commonly used fake/test number
* @param phone - The phone number to check (E.164 format preferred)
* @param defaultCountry - Default country code if not included in phone string
* @returns true if the phone appears to be fake/test, false if it seems legitimate
*/
var isFakePhoneNumber = (phone, defaultCountry) => {
	const parsed = parsePhoneNumber(phone, defaultCountry);
	if (!parsed) return true;
	const e164 = parsed.number;
	const nationalNumber = parsed.nationalNumber;
	const country = parsed.country;
	if (INVALID_PHONE_NUMBERS.has(e164)) return true;
	for (const pattern of INVALID_PHONE_PATTERNS) if (pattern.test(e164)) return true;
	if (country && INVALID_PREFIXES_BY_COUNTRY[country]) {
		const prefixes = INVALID_PREFIXES_BY_COUNTRY[country];
		for (const prefix of prefixes) if (nationalNumber.startsWith(prefix)) return true;
	}
	if (/^(\d)\1+$/.test(nationalNumber)) return true;
	const digits = nationalNumber.split("").map(Number);
	let isSequential = digits.length >= 6;
	for (let i = 1; i < digits.length && isSequential; i++) {
		const current = digits[i];
		const previous = digits[i - 1];
		if (current === void 0 || previous === void 0 || current !== previous + 1 && current !== previous - 1) isSequential = false;
	}
	if (isSequential) return true;
	return false;
};
/**
* Validate a phone number format
* @param phone - The phone number to validate
* @param defaultCountry - Default country code if not included in phone string
* @returns true if the phone number is valid
*/
var isValidPhone = (phone, defaultCountry) => {
	return isValidPhoneNumber(phone, defaultCountry);
};
/**
* Comprehensive phone number validation
* @param phone - The phone number to validate
* @param options - Validation options
* @returns true if valid, false otherwise
*/
var validatePhone = (phone, options = {}) => {
	const { mobileOnly = false, allowedCountries, blockedCountries, blockFakeNumbers = true, blockPremiumRate = true, blockTollFree = false, blockVoip = false, defaultCountry } = options;
	if (!isValidPhone(phone, defaultCountry)) return false;
	const parsed = parsePhoneNumber(phone, defaultCountry);
	if (!parsed) return false;
	if (blockFakeNumbers && isFakePhoneNumber(phone, defaultCountry)) return false;
	const country = parsed.country;
	if (country) {
		if (allowedCountries && !allowedCountries.includes(country)) return false;
		if (blockedCountries?.includes(country)) return false;
	}
	const phoneType = parsed.getType();
	if (mobileOnly) {
		if (phoneType !== "MOBILE" && phoneType !== "FIXED_LINE_OR_MOBILE") return false;
	}
	if (blockPremiumRate && phoneType === "PREMIUM_RATE") return false;
	if (blockTollFree && phoneType === "TOLL_FREE") return false;
	if (blockVoip && phoneType === "VOIP") return false;
	return true;
};
var getPhoneNumber = (ctx) => ctx.body?.phoneNumber ?? ctx.query?.phoneNumber;
createAuthMiddleware(async (ctx) => {
	const phoneNumber = getPhoneNumber(ctx);
	if (typeof phoneNumber !== "string") return;
	if (!validatePhone(phoneNumber)) throw new APIError("BAD_REQUEST", { message: "Invalid phone number" });
});
var initInvitationEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackOrganizationMemberInvited = (organization, invitation, inviter, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_INVITED,
			eventDisplayName: "User invited to organization",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				inviteeId: invitation.id,
				inviteeEmail: invitation.email,
				inviteeRole: invitation.role,
				inviteeTeamId: invitation.teamId,
				inviterId: inviter.id,
				inviterName: inviter.name,
				inviterEmail: inviter.email ?? "unknown",
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationMemberInviteAccepted = (organization, invitation, member, acceptedBy, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_INVITE_ACCEPTED,
			eventDisplayName: "User accepted invite organization invite",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				inviteeId: invitation.id,
				inviteeEmail: invitation.email,
				inviteeRole: invitation.role,
				inviteeTeamId: invitation.teamId,
				acceptedById: acceptedBy.id,
				acceptedByEmail: acceptedBy.email ?? "unknown",
				acceptedByName: acceptedBy.name,
				memberId: member.id,
				memberRole: member.role,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationMemberInviteRejected = (organization, invitation, rejectedBy, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_INVITE_REJECTED,
			eventDisplayName: "User rejected organization invite",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				inviteeId: invitation.id,
				inviteeEmail: invitation.email,
				inviteeRole: invitation.role,
				inviteeTeamId: invitation.teamId,
				rejectedById: rejectedBy.id,
				rejectedByEmail: rejectedBy.email ?? "unknown",
				rejectedByName: rejectedBy.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationMemberInviteCanceled = (organization, invitation, cancelledBy, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_INVITE_CANCELED,
			eventDisplayName: "Organization invite cancelled",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				inviteeId: invitation.id,
				inviteeEmail: invitation.email,
				inviteeRole: invitation.role,
				inviteeTeamId: invitation.teamId,
				cancelledById: cancelledBy.id,
				cancelledByName: cancelledBy.name,
				cancelledByEmail: cancelledBy.email ?? "unknown",
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	return {
		trackOrganizationMemberInvited,
		trackOrganizationMemberInviteAccepted,
		trackOrganizationMemberInviteCanceled,
		trackOrganizationMemberInviteRejected
	};
};
var initMemberEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackOrganizationMemberAdded = (organization, member, user, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_ADDED,
			eventDisplayName: "Member added to organization",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				userId: member.userId,
				memberName: user.name,
				role: member.role,
				memberId: member.id,
				memberEmail: user.email ?? "unknown",
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationMemberRemoved = (organization, member, user, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_REMOVED,
			eventDisplayName: "Member removed from organization",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				userId: member.userId,
				memberName: user.name,
				role: member.role,
				memberId: member.id,
				memberEmail: user.email ?? "unknown",
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationMemberRoleUpdated = (organization, member, user, previousRole, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_MEMBER_ROLE_UPDATED,
			eventDisplayName: "Organization member role updated",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				userId: member.userId,
				memberName: user.name,
				newRole: member.role,
				oldRole: previousRole,
				memberId: member.id,
				memberEmail: user.email ?? "unknown",
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	return {
		trackOrganizationMemberAdded,
		trackOrganizationMemberRemoved,
		trackOrganizationMemberRoleUpdated
	};
};
var initOrganizationEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackOrganizationCreated = (organization, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_CREATED,
			eventDisplayName: "Organization Created",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationUpdated = (organization, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_UPDATED,
			eventDisplayName: "Organization Updated",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	return {
		trackOrganizationCreated,
		trackOrganizationUpdated
	};
};
var initTeamEvents = (tracker) => {
	const { trackEvent } = tracker;
	const trackOrganizationTeamCreated = (organization, team, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_TEAM_CREATED,
			eventDisplayName: "Organization team created",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				teamId: team.id,
				teamName: team.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationTeamUpdated = (organization, team, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_TEAM_UPDATED,
			eventDisplayName: "Organization team updated",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				teamId: team.id,
				teamName: team.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationTeamDeleted = (organization, team, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_TEAM_DELETED,
			eventDisplayName: "Organization team deleted",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				teamId: team.id,
				teamName: team.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationTeamMemberAdded = (organization, team, user, teamMember, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_TEAM_MEMBER_ADDED,
			eventDisplayName: "User added to organization team",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				teamId: teamMember.teamId,
				teamName: team.name,
				userid: teamMember.userId,
				memberName: user.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	const trackOrganizationTeamMemberRemoved = (organization, team, user, teamMember, trigger) => {
		trackEvent({
			eventKey: organization.id,
			eventType: ORGANIZATION_EVENT_TYPES.ORGANIZATION_TEAM_MEMBER_REMOVED,
			eventDisplayName: "User removed from organization team",
			eventData: {
				organizationId: organization.id,
				organizationSlug: organization.slug,
				organizationName: organization.name,
				teamId: teamMember.teamId,
				teamName: team.name,
				userid: teamMember.userId,
				memberName: user.name,
				triggeredBy: trigger.triggeredBy,
				triggerContext: trigger.triggerContext
			}
		});
	};
	return {
		trackOrganizationTeamCreated,
		trackOrganizationTeamUpdated,
		trackOrganizationTeamDeleted,
		trackOrganizationTeamMemberAdded,
		trackOrganizationTeamMemberRemoved
	};
};
/**
* Hash the given value
* Note: Must match @infra/utils/crypto hash()
* @param value - The value to hash
*/
async function hash(value) {
	const data = new TextEncoder().encode(value);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = new Uint8Array(hashBuffer);
	return Array.from(hashArray).map((b) => b.toString(16).padStart(2, "0")).join("");
}
/**
* Skip JTI check for JWTs issued within this many seconds.
* This is safe because replay attacks require time for interception.
* A freshly issued token is almost certainly legitimate.
*/
var JTI_CHECK_GRACE_PERIOD_SECONDS = 30;
var JWKS_CACHE_TTL_MS = 900 * 1e3;
var jwksCache = /* @__PURE__ */ new Map();
var inflightRequests = /* @__PURE__ */ new Map();
async function fetchJWKS(ctx, cacheKey, $api) {
	const { data, error } = await $api("/api/auth/jwks");
	if (error || !data) {
		ctx.context.logger.warn("[Dash] Failed to fetch JWKS", error);
		throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
	}
	jwksCache.set(cacheKey, {
		data,
		expiresAt: Date.now() + JWKS_CACHE_TTL_MS
	});
	return createLocalJWKSet(data);
}
async function prefetchJWKS(ctx, cacheKey, $api) {
	const fetchPromise = fetchJWKS(ctx, cacheKey, $api);
	inflightRequests.set(cacheKey, fetchPromise);
	fetchPromise.finally(() => inflightRequests.delete(cacheKey));
	return fetchPromise;
}
async function getJWKs(ctx, cacheKey, $api) {
	const cached = jwksCache.get(cacheKey);
	if (cached && Date.now() < cached.expiresAt) return createLocalJWKSet(cached.data);
	if (cached) {
		if (!inflightRequests.has(cacheKey)) prefetchJWKS(ctx, cacheKey, $api);
		return createLocalJWKSet(cached.data);
	}
	return inflightRequests.get(cacheKey) ?? prefetchJWKS(ctx, cacheKey, $api);
}
/**
* Check if JWT is recently issued and can skip JTI verification.
* JWTs issued within the grace period are trusted without JTI check
* since replay attacks need time for interception and replay.
*/
function isRecentlyIssued(payload) {
	if (!payload.iat) return false;
	const issuedAt = payload.iat * 1e3;
	return Date.now() - issuedAt < JTI_CHECK_GRACE_PERIOD_SECONDS * 1e3;
}
var jwtMiddleware = (options, schema, getJWT) => {
	const { $api } = options;
	const cacheKey = options.apiUrl;
	return createAuthMiddleware(async (ctx) => {
		const jwsFromHeader = getJWT ? await getJWT(ctx) : ctx.headers?.get("Authorization")?.split(" ")[1];
		if (!jwsFromHeader) {
			ctx.context.logger.warn("[Dash] JWT is missing from header");
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		}
		const { payload } = await jwtVerify(jwsFromHeader, await getJWKs(ctx, cacheKey, $api), { maxTokenAge: "5m" }).catch((e) => {
			ctx.context.logger.warn("[Dash] JWT verification failed:", e);
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		});
		const apiKeyHash = payload.apiKeyHash;
		if (typeof apiKeyHash !== "string" || !options.apiKey) {
			ctx.context.logger.warn("[Dash] API key hash is missing or invalid", {
				apiKeyHash,
				apiKey: options.apiKey ? "present" : "missing"
			});
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		}
		const expectedHash = await hash(options.apiKey);
		if (apiKeyHash !== expectedHash) {
			ctx.context.logger.warn("[Dash] API key hash is invalid", apiKeyHash, expectedHash);
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		}
		if (!isRecentlyIssued(payload)) {
			const { error, data } = await $api("/api/auth/check-jti", {
				method: "POST",
				body: {
					jti: payload.jti,
					expiresAt: payload.exp
				}
			});
			if (error || !data?.valid) {
				ctx.context.logger.warn("[Dash] JTI check failed with error", error, data?.valid);
				throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
			}
		}
		if (schema) {
			const parsed = schema.safeParse(payload);
			if (!parsed.success) {
				ctx.context.logger.warn("[Dash] JWT payload is invalid", parsed.error);
				throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
			}
			return { payload: parsed.data };
		}
		return { payload };
	});
};
/**
* Lightweight JWT middleware for /dash/validate. Verifies JWT signature and
* apiKeyHash only—no JTI check. Used during onboarding when the org doesn't
* exist yet.
*/
var jwtValidateMiddleware = (options) => {
	const { $api } = options;
	const cacheKey = options.apiUrl;
	return createAuthMiddleware(async (ctx) => {
		const jwsFromHeader = ctx.headers?.get("Authorization")?.split(" ")[1];
		if (!jwsFromHeader) {
			ctx.context.logger.warn("[Dash] JWT is missing from header");
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		}
		const { payload } = await jwtVerify(jwsFromHeader, await getJWKs(ctx, cacheKey, $api), { maxTokenAge: "5m" }).catch((e) => {
			ctx.context.logger.error("[Dash] JWT verification failed:", e);
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		});
		const apiKeyHash = payload.apiKeyHash;
		if (typeof apiKeyHash !== "string" || !options.apiKey) {
			ctx.context.logger.warn("[Dash] API key hash is missing or invalid", {
				apiKeyHash: typeof apiKeyHash,
				apiKey: options.apiKey ? "present" : "missing"
			});
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		}
		if (apiKeyHash !== await hash(options.apiKey)) {
			ctx.context.logger.warn("[Dash] API key hash mismatch");
			throw ctx.error("UNAUTHORIZED", { message: "Invalid API key" });
		}
		return { payload };
	});
};
var PLUGIN_VERSION = "0.2.8";
var PLUGIN_OPTIONS_EXCLUDE_KEYS = { stripe: new Set(["stripeClient"]) };
var EXACT_SENSITIVE_STRING_KEYS_LOWER = new Set([...new Set([
	"accessToken",
	"apiKey",
	"apiSecret",
	"authorization",
	"authToken",
	"bearerToken",
	"clientSecret",
	"consumerSecret",
	"encPrivateKey",
	"encPrivateKeyPass",
	"encryptionKey",
	"encryptionSecret",
	"idToken",
	"password",
	"privateKey",
	"privateKeyPass",
	"refreshToken",
	"secret",
	"secretKey",
	"signingSecret",
	"stripeWebhookSecret",
	"webhookSecret"
])].map((k) => k.toLowerCase()));
/**
* Case-insensitive suffixes for unknown plugin options
* Matching is more permissive to account for unknown plugin options
*/
var SENSITIVE_KEY_SUFFIXES_LOWER = [
	"secret",
	"password",
	"passphrase",
	"privatekey",
	"keypass",
	"apikey",
	"token",
	"signingkey",
	"credentials",
	"authheader"
];
var REDACTED_SIMPLE_STRING = "[REDACTED]";
function snakeCaseToCamelCase(key) {
	return key.replace(/_([a-zA-Z])/g, (_, ch) => ch.toUpperCase());
}
function keyVariantsForMatching(key) {
	const trimmed = key.replace(/^[\s._-]+/, "");
	if (!trimmed) return [key];
	const out = new Set([key, trimmed]);
	if (trimmed.includes("_")) out.add(snakeCaseToCamelCase(trimmed));
	return [...out];
}
function shouldRedactSensitiveStringKey(key) {
	const variants = keyVariantsForMatching(key);
	const compactLower = key.replace(/[\s._-]/g, "").toLowerCase();
	const forms = new Set([compactLower]);
	for (const raw of variants) {
		forms.add(raw);
		forms.add(raw.toLowerCase());
	}
	for (const form of forms) {
		const fl = form.toLowerCase();
		if (EXACT_SENSITIVE_STRING_KEYS_LOWER.has(fl)) return true;
		for (const suffix of SENSITIVE_KEY_SUFFIXES_LOWER) if (fl.endsWith(suffix)) return true;
	}
	return false;
}
function isPlainSerializable(value) {
	if (value === null || typeof value !== "object") return true;
	if (Array.isArray(value)) return true;
	if (value instanceof Date) return true;
	const constructor = Object.getPrototypeOf(value)?.constructor;
	if (constructor && constructor.name !== "Object" && constructor.name !== "Array") return false;
	return true;
}
/**
* Sanitize any plain JSON-like subtree from Better Auth options
*/
function sanitizeConfig(value, visiting, excludeKeys) {
	if (value === null || value === void 0) return value;
	if (typeof value === "function") return void 0;
	if (typeof value !== "object") return value;
	const obj = value;
	if (visiting.has(obj)) return void 0;
	visiting.add(obj);
	try {
		if (Array.isArray(value)) return value.map((item) => sanitizeConfig(item, visiting, excludeKeys)).filter((item) => item !== void 0);
		const result = {};
		for (const [key, val] of Object.entries(value)) {
			if (excludeKeys?.has(key)) continue;
			if (typeof val === "function") continue;
			if (typeof val === "string" && shouldRedactSensitiveStringKey(key)) {
				result[key] = REDACTED_SIMPLE_STRING;
				continue;
			}
			if (val !== null && typeof val === "object" && !isPlainSerializable(val)) continue;
			const sanitized = sanitizeConfig(val, visiting, excludeKeys);
			if (sanitized !== void 0) result[key] = sanitized;
		}
		return result;
	} finally {
		visiting.delete(obj);
	}
}
function sanitizePluginOptions(pluginId, options) {
	return sanitizeConfig(options, /* @__PURE__ */ new WeakSet(), PLUGIN_OPTIONS_EXCLUDE_KEYS[pluginId]);
}
function estimateEntropy(str) {
	const unique = new Set(str).size;
	if (unique === 0) return 0;
	return Math.log2(Math.pow(unique, str.length));
}
var getConfig = (options) => {
	return createAuthEndpoint("/dash/config", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		const advancedOptions = ctx.context.options.advanced;
		const organizationPlugin = ctx.context.getPlugin("organization");
		return {
			version: ctx.context.version || null,
			socialProviders: Object.keys(ctx.context.options.socialProviders || {}),
			emailAndPassword: sanitizeConfig(ctx.context.options.emailAndPassword, /* @__PURE__ */ new WeakSet(), void 0),
			plugins: ctx.context.options.plugins?.map((plugin) => {
				const base = {
					id: plugin.id,
					schema: plugin.schema,
					version: plugin.version,
					options: sanitizePluginOptions(plugin.id, plugin.options)
				};
				if (plugin.id === "dash" && !plugin.version) return {
					...base,
					version: PLUGIN_VERSION
				};
				return base;
			}) ?? [],
			organization: {
				sendInvitationEmailEnabled: !!organizationPlugin?.options?.sendInvitationEmail,
				additionalFields: (() => {
					const orgAdditionalFields = organizationPlugin?.options?.schema?.organization?.additionalFields || {};
					return Object.keys(orgAdditionalFields).map((field) => {
						const fieldType = orgAdditionalFields[field];
						return {
							name: field,
							type: fieldType?.type,
							required: fieldType?.required,
							input: fieldType?.input,
							unique: fieldType?.unique,
							hasDefaultValue: !!fieldType?.defaultValue,
							references: fieldType?.references,
							returned: fieldType?.returned,
							bigInt: fieldType?.bigint
						};
					});
				})()
			},
			user: {
				fields: Object.keys(ctx.context.options.user?.fields || {}).map((field) => {
					const fieldType = (ctx.context.options.user?.fields)?.[field];
					return {
						name: field,
						type: fieldType?.type,
						required: fieldType?.required,
						input: fieldType?.input,
						unique: fieldType?.unique,
						hasDefaultValue: !!fieldType?.defaultValue,
						references: fieldType?.references,
						returned: fieldType?.returned,
						bigInt: fieldType?.bigint
					};
				}),
				additionalFields: Object.keys(ctx.context.options.user?.additionalFields || {}).map((field) => {
					const fieldType = (ctx.context.options.user?.additionalFields)?.[field];
					return {
						name: field,
						type: fieldType?.type,
						required: fieldType?.required,
						input: fieldType?.input,
						unique: fieldType?.unique,
						hasDefaultValue: !!fieldType?.defaultValue,
						references: fieldType?.references,
						returned: fieldType?.returned,
						bigInt: fieldType?.bigint
					};
				}),
				deleteUserEnabled: !!ctx.context.options.user?.deleteUser?.enabled,
				modelName: ctx.context.options.user?.modelName
			},
			baseURL: ctx.context.options.baseURL,
			basePath: ctx.context.options.basePath || "/api/auth",
			emailVerification: { sendVerificationEmailEnabled: !!ctx.context.options.emailVerification?.sendVerificationEmail },
			insights: {
				hasDatabase: !!ctx.context.options.database,
				cookies: advancedOptions?.cookies ? Object.entries(advancedOptions.cookies).map(([key, value]) => ({
					key,
					name: value?.name,
					sameSite: value?.attributes?.sameSite
				})) : null,
				hasIpAddressHeaders: !!(advancedOptions?.ipAddress?.ipAddressHeaders && advancedOptions.ipAddress.ipAddressHeaders.length > 0),
				ipAddressHeaders: advancedOptions?.ipAddress?.ipAddressHeaders || null,
				disableIpTracking: advancedOptions?.ipAddress?.disableIpTracking || false,
				disableCSRFCheck: ctx.context.options.advanced?.disableCSRFCheck || false,
				disableOriginCheck: ctx.context.options.advanced?.disableOriginCheck || false,
				allowDifferentEmails: ctx.context.options.account?.accountLinking?.enabled && ctx.context.options.account?.accountLinking?.allowDifferentEmails || false,
				skipStateCookieCheck: ctx.context.options.account?.skipStateCookieCheck || false,
				storeStateCookieStrategy: ctx.context.options.account?.storeStateStrategy || null,
				cookieCache: {
					enabled: ctx.context.options.session?.cookieCache?.enabled || false,
					strategy: ctx.context.options.session?.cookieCache?.enabled && ctx.context.options.session?.cookieCache?.strategy || null,
					refreshCache: ctx.context.options.session?.cookieCache?.enabled && typeof ctx.context.options.session?.cookieCache?.refreshCache !== "undefined" ? ctx.context.options.session.cookieCache.refreshCache !== false : null
				},
				sessionFreshAge: ctx.context.options.session?.freshAge || null,
				disableVerificationCleanup: ctx.context.options.verification?.disableCleanup || false,
				minPasswordLength: ctx.context.options.emailAndPassword?.enabled && ctx.context.options.emailAndPassword?.minPasswordLength || null,
				maxPasswordLength: ctx.context.options.emailAndPassword?.enabled && ctx.context.options.emailAndPassword?.maxPasswordLength || null,
				hasRateLimitDisabled: ctx.context.options.rateLimit?.enabled === false,
				rateLimitStorage: ctx.context.options.rateLimit?.enabled !== false && !ctx.context.options.rateLimit?.customStorage && ctx.context.options.rateLimit?.storage || null,
				storeSessionInDatabase: ctx.context.options.session?.storeSessionInDatabase === true,
				preserveSessionInDatabase: ctx.context.options.session?.preserveSessionInDatabase === true,
				secretEntropy: ctx.context.secret === "better-auth-secret-12345678901234567890" || ctx.context.secret.length < 32 ? 0 : estimateEntropy(ctx.context.secret),
				useSecureCookies: typeof ctx.context.options.advanced?.useSecureCookies !== "undefined" ? ctx.context.options.advanced.useSecureCookies : null,
				crossSubDomainCookiesEnabled: ctx.context.options.advanced?.crossSubDomainCookies?.enabled || false,
				crossSubDomainCookiesDomain: ctx.context.options.advanced?.crossSubDomainCookies?.domain,
				defaultCookieAttributes: ctx.context.options.advanced?.defaultCookieAttributes ? {
					sameSite: ctx.context.options.advanced?.defaultCookieAttributes?.sameSite || null,
					httpOnly: typeof ctx.context.options.advanced?.defaultCookieAttributes?.httpOnly !== "undefined" ? ctx.context.options.advanced?.defaultCookieAttributes?.httpOnly : null,
					prefix: ctx.context.options.advanced?.defaultCookieAttributes?.prefix || null,
					partitioned: typeof ctx.context.options.advanced?.defaultCookieAttributes?.partitioned !== "undefined" ? ctx.context.options.advanced?.defaultCookieAttributes?.partitioned : null,
					secure: typeof ctx.context.options.advanced?.defaultCookieAttributes?.secure !== "undefined" ? ctx.context.options.advanced?.defaultCookieAttributes?.secure : null
				} : null,
				appName: ctx.context.options.appName || null,
				hasJoinsEnabled: ctx.context.options.experimental?.joins === true
			}
		};
	});
};
/**
* Lightweight endpoint to verify API key ownership during onboarding
*/
var getValidate = (options) => {
	return createAuthEndpoint("/dash/validate", {
		method: "GET",
		use: [jwtValidateMiddleware(options)]
	}, async () => {
		return { valid: true };
	});
};
/** Returns true if organization plugin is enabled. */
function isOrganizationEnabled(ctx) {
	return !!ctx.context.getPlugin("organization");
}
/** Returns the organization plugin, throws if not enabled. Use for write endpoints. */
function requireOrganizationPlugin(ctx) {
	const plugin = ctx.context.getPlugin("organization");
	if (!plugin) throw ctx.error("BAD_REQUEST", { message: "Organization plugin not enabled" });
	return plugin;
}
/** Returns true if organization plugin and teams feature are enabled. */
function isTeamsEnabled(ctx) {
	return !!ctx.context.getPlugin("organization")?.options?.teams?.enabled;
}
/**
* Validates that the organization plugin is enabled and teams feature is enabled.
*
* @returns The organization options for use in team logic (maximumTeams, hooks, etc.)
*/
function requireTeamsEnabled(ctx) {
	const orgOptions = requireOrganizationPlugin(ctx).options || {};
	if (!orgOptions?.teams?.enabled) throw ctx.error("BAD_REQUEST", { message: "Teams are not enabled" });
	return orgOptions;
}
async function buildSyntheticSession(ctx, ownerUserId) {
	const owner = await ctx.context.internalAdapter.findUserById(ownerUserId);
	if (!owner) throw ctx.error("BAD_REQUEST", { message: "Owner identity not found" });
	return {
		...ctx.context,
		session: {
			user: owner,
			session: { userId: ownerUserId }
		}
	};
}
async function getScimProviderOwner(ctx, organizationId, providerId) {
	const where = [{
		field: "organizationId",
		value: organizationId
	}];
	if (providerId) where.push({
		field: "providerId",
		value: providerId
	});
	return (await ctx.context.adapter.findOne({
		model: "scimProvider",
		where,
		select: ["userId"]
	}))?.userId ?? null;
}
function getScimEndpoint(baseUrl) {
	return `${baseUrl}/scim/v2`;
}
function getSCIMPlugin(ctx) {
	return ctx.context.getPlugin("scim");
}
var DIRECTORY_SYNC_DUPLICATE_MESSAGE = "A directory sync connection with this provider ID already exists. Remove the existing connection or choose a different provider ID.";
function isDuplicateDirectorySyncError(e) {
	if (e instanceof APIError) return e.status === "CONFLICT" || /duplicate|already exists|unique constraint/i.test(e.message ?? "");
	if (e instanceof Error) return /unique constraint|duplicate key|already exists|P2002/i.test(e.message);
	return false;
}
var listOrganizationDirectories = (options) => {
	return createAuthEndpoint("/dash/organization/:id/directories", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		if (!isOrganizationEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin not enabled, returning empty directories list");
			return [];
		}
		const organizationId = tryDecode(ctx.params.id);
		const scimPlugin = getSCIMPlugin(ctx);
		if (!scimPlugin?.endpoints.listSCIMProviderConnections || !scimPlugin?.options?.providerOwnership?.enabled) {
			ctx.context.logger.warn("[Dash] SCIM plugin not available or provider ownership disabled, returning empty directories list", { organizationId });
			return [];
		}
		const ownerUserId = await getScimProviderOwner(ctx, organizationId);
		if (!ownerUserId) {
			ctx.context.logger.warn("[Dash] No SCIM provider owner found for organization, returning empty directories list", { organizationId });
			return [];
		}
		try {
			const { providers } = await scimPlugin.endpoints.listSCIMProviderConnections({
				context: await buildSyntheticSession(ctx, ownerUserId),
				headers: ctx.request?.headers ?? new Headers()
			});
			return providers.filter((p) => p.organizationId === organizationId).map((provider) => ({
				organizationId: provider.organizationId,
				providerId: provider.providerId,
				scimEndpoint: getScimEndpoint(ctx.context.baseURL)
			}));
		} catch (error) {
			ctx.context.logger.warn("[Dash] Failed to list SCIM provider connections:", error);
			return [];
		}
	});
};
var createOrganizationDirectory = (options) => {
	return createAuthEndpoint("/dash/organization/directory/create", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			providerId: zod_default.string().min(1, "Provider ID is required"),
			ownerUserId: zod_default.string().min(1, "Owner user ID is required")
		})
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const { organizationId } = ctx.context.payload;
		const scimPlugin = getSCIMPlugin(ctx);
		if (!scimPlugin?.endpoints.generateSCIMToken || !scimPlugin?.options?.providerOwnership?.enabled) throw ctx.error("BAD_REQUEST", { message: "SCIM plugin is not enabled or does not support this feature" });
		const { providerId, ownerUserId } = ctx.body;
		let scimToken;
		try {
			scimToken = (await scimPlugin.endpoints.generateSCIMToken({
				body: {
					providerId,
					organizationId
				},
				context: await buildSyntheticSession(ctx, ownerUserId),
				headers: ctx.request?.headers ?? new Headers()
			})).scimToken;
		} catch (e) {
			if (isDuplicateDirectorySyncError(e)) throw ctx.error("BAD_REQUEST", { message: DIRECTORY_SYNC_DUPLICATE_MESSAGE });
			ctx.context.logger.error("[Dash] Failed to create directory sync provider (organizationId=%s, providerId=%s)", organizationId, providerId, e);
			if (e instanceof APIError) throw e;
			throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to create directory sync provider" });
		}
		if (!scimToken) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to create directory sync provider" });
		return {
			organizationId,
			providerId,
			scimEndpoint: getScimEndpoint(ctx.context.baseURL),
			scimToken
		};
	});
};
var deleteOrganizationDirectory = (options) => {
	return createAuthEndpoint("/dash/organization/directory/delete", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ providerId: zod_default.string().min(1, "Provider ID is required") })
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const scimPlugin = getSCIMPlugin(ctx);
		if (!scimPlugin?.endpoints.deleteSCIMProviderConnection || !scimPlugin?.options?.providerOwnership?.enabled) throw ctx.error("BAD_REQUEST", { message: "SCIM plugin is not enabled or does not support this feature" });
		const { organizationId } = ctx.context.payload;
		const { providerId } = ctx.body;
		const ownerUserId = await getScimProviderOwner(ctx, organizationId, providerId);
		if (!ownerUserId) throw ctx.error("NOT_FOUND", { message: "Directory sync connection not found or missing owner" });
		await scimPlugin.endpoints.deleteSCIMProviderConnection({
			body: { providerId },
			context: await buildSyntheticSession(ctx, ownerUserId),
			headers: ctx.request?.headers ?? new Headers()
		});
		return { success: true };
	});
};
var regenerateDirectoryToken = (options) => {
	return createAuthEndpoint("/dash/organization/directory/regenerate-token", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ providerId: zod_default.string().min(1, "Provider ID is required") })
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const scimPlugin = getSCIMPlugin(ctx);
		if (!scimPlugin?.endpoints.generateSCIMToken || !scimPlugin?.options?.providerOwnership?.enabled) throw ctx.error("BAD_REQUEST", { message: "SCIM plugin is not enabled or does not support this feature" });
		const { organizationId } = ctx.context.payload;
		const { providerId } = ctx.body;
		const ownerUserId = await getScimProviderOwner(ctx, organizationId, providerId);
		if (!ownerUserId) throw ctx.error("NOT_FOUND", { message: "Directory sync connection not found or missing owner" });
		const { scimToken } = await scimPlugin.endpoints.generateSCIMToken({
			body: {
				providerId,
				organizationId
			},
			context: await buildSyntheticSession(ctx, ownerUserId),
			headers: ctx.request?.headers ?? new Headers()
		});
		if (!scimToken) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to regenerate directory sync token" });
		return {
			success: true,
			scimToken,
			scimEndpoint: getScimEndpoint(ctx.context.baseURL)
		};
	});
};
function transformEvent(raw) {
	const location = raw.ipAddress || raw.city || raw.country || raw.countryCode ? {
		ipAddress: raw.ipAddress,
		city: raw.city,
		country: raw.country,
		countryCode: raw.countryCode
	} : void 0;
	return {
		eventType: raw.eventType,
		eventData: raw.eventData,
		eventKey: raw.eventKey,
		projectId: raw.projectId,
		createdAt: new Date(raw.createdAt),
		updatedAt: new Date(raw.updatedAt),
		ageInMinutes: raw.ageInMinutes,
		location
	};
}
/**
* Get the current user's audit log events.
*
* This endpoint is designed for end-users to view their own activity history,
* such as sign-ins, password changes, and other account events.
*
* @example
* ```ts
* // Using the Better Auth client
* const { data, error } = await authClient.events.list({
*   query: { limit: 20, offset: 0 }
* });
*
* if (data) {
*   for (const event of data.events) {
*     console.log(`${event.eventType} at ${event.createdAt}`);
*   }
* }
* ```
*/
var getUserEvents = (options) => {
	const { $api } = options;
	return createAuthEndpoint("/events/list", {
		method: "GET",
		use: [sessionMiddleware],
		query: zod_default.object({
			/** Maximum number of events to return (default: 50, max: 100) */
			limit: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			/** Number of events to skip for pagination (default: 0) */
			offset: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			/** Filter by event type (e.g., "user_signed_in") */
			eventType: zod_default.string().optional()
		}).optional()
	}, async (ctx) => {
		const session = ctx.context.session;
		if (!session?.user?.id) throw ctx.error("UNAUTHORIZED", { message: "You must be signed in to view your events" });
		if (!options.apiKey) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Events API is not configured" });
		const requestedLimit = ctx.query?.limit ?? 50;
		const limit = Math.min(Math.max(1, requestedLimit), 100);
		const offset = Math.max(0, ctx.query?.offset ?? 0);
		const { data, error } = await $api("/events/user", {
			method: "GET",
			query: {
				userId: session.user.id,
				limit: limit.toString(),
				offset: offset.toString()
			}
		});
		if (error || !data) {
			ctx.context.logger.error("[Dash] Failed to fetch events:", error);
			throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to fetch events" });
		}
		let events = data.events.map(transformEvent);
		if (ctx.query?.eventType) events = events.filter((event) => event.eventType === ctx.query?.eventType);
		return {
			events,
			total: data.total,
			limit: data.limit,
			offset: data.offset
		};
	});
};
/**
* Get the list of available event types.
*
* This endpoint returns all the event types that can appear in the audit log,
* useful for building filters or documentation.
*/
var getEventTypes = (options) => {
	return createAuthEndpoint("/events/types", {
		method: "GET",
		use: [sessionMiddleware]
	}, async (ctx) => {
		if (!options.apiKey) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Events API is not configured" });
		return {
			user: EVENT_TYPES,
			organization: ORGANIZATION_EVENT_TYPES,
			all: USER_EVENT_TYPES
		};
	});
};
/**
* Get audit logs for the current user (by session) or by organization.
*
* Behavior:
* - Without `organizationId`: queries user-scoped events for the resolved user.
* - With `organizationId`: queries organization events and optionally scopes
*   results to the resolved user/identifier.
*/
var getAuditLogs = (options) => {
	const { $api } = options;
	return createAuthEndpoint("/events/audit-logs", {
		method: "GET",
		use: [sessionMiddleware],
		query: zod_default.object({
			limit: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			offset: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			userId: zod_default.string().optional(),
			organizationId: zod_default.string().optional(),
			identifier: zod_default.string().optional(),
			eventType: zod_default.string().optional()
		}).optional()
	}, async (ctx) => {
		const session = ctx.context.session;
		if (!session?.user?.id) throw ctx.error("UNAUTHORIZED", { message: "You must be signed in to view audit logs" });
		if (!options.apiKey) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Events API is not configured" });
		const requestedLimit = ctx.query?.limit ?? 50;
		const limit = Math.min(Math.max(1, requestedLimit), 100);
		const offset = Math.max(0, ctx.query?.offset ?? 0);
		const resolvedUserId = ctx.query?.userId || session.user.id;
		const organizationId = ctx.query?.organizationId;
		if (ctx.query?.userId && ctx.query.userId !== session.user.id) throw ctx.error("FORBIDDEN", { message: "Not allowed to access another user's audit logs" });
		let rawEvents = [];
		let total = 0;
		let responseLimit = limit;
		let responseOffset = offset;
		if (organizationId) {
			const sessionData = session;
			const sessionOrganizations = sessionData.organizations;
			if (!(sessionData.session?.activeOrganizationId === organizationId) && (!Array.isArray(sessionOrganizations) || !sessionOrganizations.some((org) => {
				return org.id === organizationId;
			}))) throw ctx.error("FORBIDDEN", { message: "Not allowed to access this organization" });
			const { data, error } = await $api("/events/organization", {
				method: "GET",
				query: {
					organizationId,
					limit: limit.toString(),
					offset: offset.toString()
				}
			});
			if (error || !data) {
				ctx.context.logger.error("[Dash] Failed to fetch organization audit logs:", error);
				throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to fetch organization audit logs" });
			}
			rawEvents = data.events;
			total = data.total;
			responseLimit = data.limit;
			responseOffset = data.offset;
		} else {
			const { data, error } = await $api("/events/user", {
				method: "GET",
				query: {
					userId: resolvedUserId,
					limit: limit.toString(),
					offset: offset.toString()
				}
			});
			if (error || !data) {
				ctx.context.logger.error("[Dash] Failed to fetch user audit logs:", error);
				throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to fetch user audit logs" });
			}
			rawEvents = data.events;
			total = data.total;
			responseLimit = data.limit;
			responseOffset = data.offset;
		}
		let filteredEvents = rawEvents;
		if (organizationId) filteredEvents = filteredEvents.filter((event) => {
			const eventData = event.eventData || {};
			const eventUserId = typeof eventData.userId === "string" ? eventData.userId : void 0;
			const eventIdentifier = typeof eventData.identifier === "string" ? eventData.identifier : void 0;
			const matchesUser = !resolvedUserId || eventUserId === resolvedUserId || event.eventKey === resolvedUserId;
			const matchesIdentifier = !ctx.query?.identifier || eventIdentifier === ctx.query.identifier;
			return matchesUser && matchesIdentifier;
		});
		if (ctx.query?.eventType) filteredEvents = filteredEvents.filter((event) => event.eventType === ctx.query?.eventType);
		const responseTotal = organizationId || ctx.query?.eventType ? filteredEvents.length : total;
		return {
			events: filteredEvents.map(transformEvent),
			total: responseTotal,
			limit: responseLimit,
			offset: responseOffset
		};
	});
};
var OWNER_ADMIN_ROLES = new Set(["owner", "admin"]);
function isOwnerOrAdminRole(role) {
	return role !== void 0 && OWNER_ADMIN_ROLES.has(role);
}
/**
* Get all audit logs the current user has access to
* Queries can be restricted to a single organization, a single user, or all organizations the user has access to
* @param options
* @returns
*/
var getAllAuditLogs = (options) => {
	const { $api } = options;
	const getUserOrganizationRole = async (adapter, orgId, userId) => {
		return (await adapter.findOne({
			model: "member",
			where: [{
				field: "organizationId",
				value: orgId
			}, {
				field: "userId",
				value: userId
			}],
			select: ["role"]
		}))?.role;
	};
	const listElevatedOrganizationIds = async (adapter, userId) => {
		const memberships = await adapter.findMany({
			model: "member",
			where: [{
				field: "userId",
				value: userId
			}],
			select: ["organizationId", "role"]
		});
		const ids = /* @__PURE__ */ new Set();
		for (const m of memberships) if (isOwnerOrAdminRole(m.role)) ids.add(m.organizationId);
		return [...ids];
	};
	return createAuthEndpoint("/events/all-audit-logs", {
		method: "GET",
		use: [sessionMiddleware],
		query: zod_default.object({
			limit: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			offset: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			userId: zod_default.string().optional(),
			organizationId: zod_default.string().optional(),
			/** Filter by event type (e.g. `organization_member_added`) */
			eventType: zod_default.string().optional(),
			/** Match `eventData.identifier` (organization-scoped actor identity) */
			identifier: zod_default.string().optional()
		}).refine((q) => {
			const u = q.userId?.trim();
			const o = q.organizationId?.trim();
			return !(u && o);
		}, { message: "Provide at most one of userId and organizationId." }).optional()
	}, async (ctx) => {
		const session = ctx.context.session;
		if (!session?.user?.id) throw ctx.error("UNAUTHORIZED", { message: "You must be signed in to view activity logs" });
		if (!options.apiKey) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Events API is not configured" });
		const query = ctx.query ?? {};
		const adapter = ctx.context.adapter;
		const sessionUserId = session.user.id;
		const limit = Math.min(Math.max(1, query.limit ?? 50), 100);
		const offset = Math.max(0, query.offset ?? 0);
		const organizationId = query.organizationId?.trim();
		const userId = query.userId?.trim();
		const forbidAccess = () => {
			return ctx.error("FORBIDDEN", { message: "Only organization owners and admins can view activity logs." });
		};
		const elevatedOrgIds = await listElevatedOrganizationIds(adapter, sessionUserId);
		if (organizationId) {
			if (!isOwnerOrAdminRole(await getUserOrganizationRole(adapter, organizationId, sessionUserId))) throw forbidAccess();
		} else if (userId) {
			if (elevatedOrgIds.length === 0) throw forbidAccess();
		} else if (elevatedOrgIds.length === 0) throw forbidAccess();
		const apiQuery = {
			limit: limit.toString(),
			offset: offset.toString()
		};
		if (organizationId) apiQuery.organizationIds = organizationId;
		else if (userId) {
			apiQuery.userId = userId;
			apiQuery.organizationIds = elevatedOrgIds.join(",");
		} else apiQuery.organizationIds = elevatedOrgIds.join(",");
		const eventTypeFilter = query.eventType?.trim();
		const identifierFilter = query.identifier?.trim();
		if (eventTypeFilter) apiQuery.eventType = eventTypeFilter;
		if (identifierFilter) apiQuery.identifier = identifierFilter;
		const { data, error } = await $api("/events/activity", {
			method: "GET",
			query: apiQuery
		});
		if (error || !data) {
			ctx.context.logger.error("[Dash] Failed to fetch activity logs:", error);
			throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to fetch activity logs" });
		}
		return {
			events: data.events.map(transformEvent),
			total: data.total,
			limit: data.limit,
			offset: data.offset
		};
	});
};
var whereClause = object({
	field: string(),
	value: unknown(),
	operator: _enum([
		"eq",
		"ne",
		"gt",
		"gte",
		"lt",
		"lte",
		"in",
		"contains",
		"starts_with",
		"ends_with"
	]).optional(),
	connector: _enum(["AND", "OR"]).optional()
});
var sortBySchema = object({
	field: string(),
	direction: _enum(["asc", "desc"])
});
var actionSchema = discriminatedUnion("action", [
	object({
		action: literal("findOne"),
		model: string(),
		where: array(whereClause).optional(),
		select: array(string()).optional(),
		join: record(string(), boolean()).optional()
	}),
	object({
		action: literal("findMany"),
		model: string(),
		where: array(whereClause).optional(),
		limit: number().optional(),
		offset: number().optional(),
		sortBy: sortBySchema.optional(),
		join: record(string(), boolean()).optional()
	}),
	object({
		action: literal("create"),
		model: string(),
		data: record(string(), unknown())
	}),
	object({
		action: literal("update"),
		model: string(),
		where: array(whereClause),
		update: record(string(), unknown())
	}),
	object({
		action: literal("count"),
		model: string(),
		where: array(whereClause).optional()
	})
]);
var executeAdapter = (options) => {
	return createAuthEndpoint("/dash/execute-adapter", {
		method: "POST",
		use: [jwtMiddleware(options)],
		body: actionSchema
	}, async (ctx) => {
		const adapter = ctx.context.adapter;
		const body = ctx.body;
		switch (body.action) {
			case "findOne": return { result: await adapter.findOne({
				model: body.model,
				where: body.where,
				select: body.select,
				join: body.join
			}) };
			case "findMany": return { result: await adapter.findMany({
				model: body.model,
				where: body.where,
				limit: body.limit,
				offset: body.offset,
				sortBy: body.sortBy,
				join: body.join
			}) };
			case "create": return { result: await adapter.create({
				model: body.model,
				data: body.data
			}) };
			case "update": return { result: await adapter.update({
				model: body.model,
				where: body.where,
				update: body.update
			}) };
			case "count": return { count: await adapter.count({
				model: body.model,
				where: body.where
			}) };
		}
	});
};
/**
* Accept invitation endpoint
* This is called when a user clicks the invitation link.
* It creates the user in the auth database and sets up a session.
*/
var acceptInvitation = (options) => {
	const { $api } = options;
	return createAuthEndpoint("/dash/accept-invitation", {
		method: "GET",
		query: zod_default.object({ token: zod_default.string() })
	}, async (ctx) => {
		const { token } = ctx.query;
		const { data: invitation, error } = await $api("/api/internal/invitations/verify", {
			method: "POST",
			body: { token }
		});
		if (error || !invitation) {
			ctx.context.logger.warn("[Dash] Failed to verify invitation", error);
			throw new APIError("BAD_REQUEST", { message: "Invalid or expired invitation." });
		}
		if (invitation.status !== "pending") throw new APIError("BAD_REQUEST", { message: `This invitation has already been ${invitation.status}.` });
		if (invitation.expiresAt) {
			if (new Date(invitation.expiresAt) < /* @__PURE__ */ new Date()) {
				const { error: markError } = await $api("/api/internal/invitations/mark-expired", {
					method: "POST",
					body: { token }
				});
				if (markError) ctx.context.logger.warn("[Dash] Failed to mark invitation as expired", markError);
				throw new APIError("BAD_REQUEST", { message: "This invitation has expired." });
			}
		}
		const invitationEmail = normalizeEmail(invitation.email, ctx.context);
		const existingUser = await ctx.context.internalAdapter.findUserByEmail(invitationEmail).then((user) => user?.user);
		if (existingUser) {
			const { error: markError } = await $api("/api/internal/invitations/mark-accepted", {
				method: "POST",
				body: {
					token,
					userId: existingUser.id
				}
			});
			if (markError) ctx.context.logger.warn("[Dash] Failed to mark invitation as accepted (existing user)", markError);
			await setSessionCookie(ctx, {
				session: await ctx.context.internalAdapter.createSession(existingUser.id),
				user: existingUser
			});
			const redirectUrl = invitation.redirectUrl || ctx.context.options.baseURL || "/";
			return ctx.redirect(redirectUrl.toString());
		}
		if (invitation.authMode === "auth") {
			const platformUrl = options.apiUrl || INFRA_API_URL;
			const acceptPageUrl = new URL("/invite/accept", platformUrl);
			acceptPageUrl.searchParams.set("token", token);
			const callbackUrl = `${ctx.context.options.baseURL}${ctx.context.options.basePath || "/api/auth"}/dash/complete-invitation`;
			acceptPageUrl.searchParams.set("callback", callbackUrl);
			return ctx.redirect(acceptPageUrl.toString());
		}
		const user = await ctx.context.internalAdapter.createUser({
			email: invitationEmail,
			name: invitation.name || invitation.email.split("@")[0] || "",
			emailVerified: true,
			createdAt: /* @__PURE__ */ new Date(),
			updatedAt: /* @__PURE__ */ new Date()
		});
		const { error: markError } = await $api("/api/internal/invitations/mark-accepted", {
			method: "POST",
			body: {
				token,
				userId: user.id
			}
		});
		if (markError) ctx.context.logger.warn("[Dash] Failed to mark invitation as accepted", markError);
		await setSessionCookie(ctx, {
			session: await ctx.context.internalAdapter.createSession(user.id),
			user
		});
		const redirectUrl = invitation.redirectUrl || ctx.context.options.baseURL || "/";
		return ctx.redirect(redirectUrl.toString());
	});
};
/**
* Complete invitation endpoint
* Called by the platform after user completes authentication (password/social)
* This creates the user in the auth database and sets up a session
*/
var completeInvitation = (options) => {
	const { $api } = options;
	return createAuthEndpoint("/dash/complete-invitation", {
		method: "POST",
		body: zod_default.object({
			token: zod_default.string(),
			password: zod_default.string().optional(),
			providerId: zod_default.string().optional(),
			providerAccountId: zod_default.string().optional(),
			accessToken: zod_default.string().optional(),
			refreshToken: zod_default.string().optional()
		})
	}, async (ctx) => {
		const { token, password, providerId, providerAccountId, accessToken, refreshToken } = ctx.body;
		const fallbackRedirect = typeof ctx.context.options.baseURL === "string" ? ctx.context.options.baseURL : "/";
		const { data: invitation, error } = await $api("/api/internal/invitations/verify", {
			method: "POST",
			body: { token }
		});
		if (error || !invitation) {
			ctx.context.logger.warn("[Dash] Failed to verify invitation", error);
			throw new APIError("BAD_REQUEST", { message: "Invalid or expired invitation." });
		}
		if (invitation.status !== "pending") throw new APIError("BAD_REQUEST", { message: `This invitation has already been ${invitation.status}.` });
		if (!ctx.context) throw new APIError("BAD_REQUEST", { message: "Context is required" });
		const invitationEmail = normalizeEmail(invitation.email, ctx.context);
		const existingUser = await ctx.context.internalAdapter.findUserByEmail(invitationEmail).then((user) => user?.user);
		if (existingUser) {
			const { error: markError } = await $api("/api/internal/invitations/mark-accepted", {
				method: "POST",
				body: {
					token,
					userId: existingUser.id
				}
			});
			if (markError) ctx.context.logger.warn("[Dash] Failed to mark invitation as accepted", markError);
			await setSessionCookie(ctx, {
				session: await ctx.context.internalAdapter.createSession(existingUser.id),
				user: existingUser
			});
			return {
				success: true,
				redirectUrl: invitation.redirectUrl ?? fallbackRedirect
			};
		}
		const user = await ctx.context.internalAdapter.createUser({
			email: invitationEmail,
			name: invitation.name || invitation.email.split("@")[0] || "",
			emailVerified: true,
			createdAt: /* @__PURE__ */ new Date(),
			updatedAt: /* @__PURE__ */ new Date()
		});
		if (password) await ctx.context.internalAdapter.createAccount({
			userId: user.id,
			providerId: "credential",
			accountId: user.id,
			password: await ctx.context.password.hash(password)
		});
		else if (providerId && providerAccountId) await ctx.context.internalAdapter.createAccount({
			userId: user.id,
			providerId,
			accountId: providerAccountId,
			accessToken,
			refreshToken
		});
		const { error: markError } = await $api("/api/internal/invitations/mark-accepted", {
			method: "POST",
			body: {
				token,
				userId: user.id
			}
		});
		if (markError) ctx.context.logger.warn("[Dash] Failed to mark invitation as accepted", markError);
		await setSessionCookie(ctx, {
			session: await ctx.context.internalAdapter.createSession(user.id),
			user
		});
		return {
			success: true,
			redirectUrl: invitation.redirectUrl ?? fallbackRedirect
		};
	});
};
/**
* Check if a user exists by email
* Used by the platform to verify before sending invitation
* This is different from /dash/organization/check-user-by-email which also checks membership
*/
var checkUserExists = (_options) => {
	return createAuthEndpoint("/dash/check-user-exists", {
		method: "POST",
		body: zod_default.object({ email: zod_default.email() })
	}, async (ctx) => {
		const { email } = ctx.body;
		if (!ctx.request?.headers.get("Authorization")) throw new APIError("UNAUTHORIZED", { message: "Authorization required" });
		const normalizedEmail = normalizeEmail(email, ctx.context);
		const existingUser = await ctx.context.internalAdapter.findUserByEmail(normalizedEmail).then((user) => user?.user);
		return {
			exists: !!existingUser,
			userId: existingUser?.id || null
		};
	});
};
var listOrganizationInvitations = (options) => {
	return createAuthEndpoint("/dash/organization/:id/invitations", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		if (!isOrganizationEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin not enabled, returning empty invitations list");
			return [];
		}
		const organizationId = tryDecode(ctx.params.id);
		const invitations = await ctx.context.adapter.findMany({
			model: "invitation",
			where: [{
				field: "organizationId",
				value: organizationId
			}]
		});
		const emails = [...new Set(invitations.map((i) => normalizeEmail(i.email, ctx.context)))];
		const users = emails.length ? await ctx.context.adapter.findMany({
			model: "user",
			where: [{
				field: "email",
				value: emails,
				operator: "in"
			}]
		}) : [];
		const userByEmail = new Map(users.filter((u) => u.email != null).map((u) => [normalizeEmail(u.email, ctx.context), u]));
		return invitations.map((invitation) => {
			const invitationEmail = normalizeEmail(invitation.email, ctx.context);
			const user = userByEmail.get(invitationEmail);
			return {
				...invitation,
				user: user ? {
					id: user.id,
					name: user.name,
					email: user.email ?? void 0,
					image: user.image || null
				} : null
			};
		});
	});
};
var inviteMember = (options) => {
	return createAuthEndpoint("/dash/organization/invite-member", {
		method: "POST",
		body: zod_default.object({
			email: zod_default.string(),
			role: zod_default.string(),
			invitedBy: zod_default.string()
		}),
		use: [jwtMiddleware(options, zod_default.object({
			organizationId: zod_default.string(),
			invitedBy: zod_default.string()
		}))]
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const organizationPlugin = requireOrganizationPlugin(ctx);
		if (!organizationPlugin.options?.sendInvitationEmail) throw ctx.error("BAD_REQUEST", { message: "Invitation email is not enabled" });
		const invitedBy = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: ctx.context.payload.invitedBy
			}]
		});
		if (!invitedBy) throw ctx.error("BAD_REQUEST", { message: "Invited by user not found" });
		const invitationEmail = normalizeEmail(ctx.body.email, ctx.context);
		return await organizationPlugin.endpoints.createInvitation({
			headers: ctx.request?.headers ?? new Headers(),
			body: {
				email: invitationEmail,
				role: ctx.body.role,
				organizationId
			},
			context: {
				...ctx.context,
				session: {
					user: invitedBy,
					session: { userId: ctx.context.payload.invitedBy }
				},
				orgOptions: organizationPlugin.options || {}
			}
		});
	});
};
var checkUserByEmail = (options) => {
	return createAuthEndpoint("/dash/organization/check-user-by-email", {
		method: "POST",
		body: zod_default.object({ email: zod_default.string() }),
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))]
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const { organizationId } = ctx.context.payload;
		const email = normalizeEmail(ctx.body.email, ctx.context);
		const user = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "email",
				value: email
			}]
		});
		if (!user) return {
			exists: false,
			user: null,
			isAlreadyMember: false
		};
		const existingMember = await ctx.context.adapter.findOne({
			model: "member",
			where: [{
				field: "userId",
				value: user.id
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		return {
			exists: true,
			user: {
				id: user.id,
				name: user.name,
				email: user.email ?? void 0,
				image: user.image ?? null
			},
			isAlreadyMember: !!existingMember
		};
	});
};
var cancelInvitation = (options) => {
	return createAuthEndpoint("/dash/organization/cancel-invitation", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({
			organizationId: zod_default.string(),
			invitationId: zod_default.string()
		}))],
		body: zod_default.object({ invitationId: zod_default.string() })
	}, async (ctx) => {
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		const { invitationId, organizationId } = ctx.context.payload;
		const invitation = await ctx.context.adapter.findOne({
			model: "invitation",
			where: [{
				field: "id",
				value: invitationId
			}]
		});
		if (!invitation) throw ctx.error("NOT_FOUND", { message: "Invitation not found" });
		const [user, organization] = await Promise.all([ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: invitation.inviterId
			}]
		}), ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		})]);
		if (!user) throw ctx.error("NOT_FOUND", { message: "Inviter user not found" });
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		if (orgOptions?.organizationHooks?.beforeCancelInvitation) await orgOptions.organizationHooks.beforeCancelInvitation({
			invitation,
			organization,
			cancelledBy: user
		});
		await ctx.context.adapter.update({
			model: "invitation",
			where: [{
				field: "id",
				value: invitationId
			}],
			update: { status: "canceled" }
		});
		if (orgOptions?.organizationHooks?.afterCancelInvitation) await orgOptions.organizationHooks.afterCancelInvitation({
			invitation: {
				...invitation,
				status: "canceled"
			},
			organization,
			cancelledBy: user
		});
		return { success: true };
	});
};
var resendInvitation = (options) => {
	return createAuthEndpoint("/dash/organization/resend-invitation", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({
			organizationId: zod_default.string(),
			invitationId: zod_default.string()
		}))],
		body: zod_default.object({ invitationId: zod_default.string() })
	}, async (ctx) => {
		const organizationPlugin = requireOrganizationPlugin(ctx);
		const { invitationId, organizationId } = ctx.context.payload;
		const invitation = await ctx.context.adapter.findOne({
			model: "invitation",
			where: [{
				field: "id",
				value: invitationId
			}]
		});
		if (!invitation) throw ctx.error("NOT_FOUND", { message: "Invitation not found" });
		if (invitation.status !== "pending") throw ctx.error("BAD_REQUEST", { message: "Only pending invitations can be resent" });
		const invitedByUser = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: invitation.inviterId
			}]
		});
		if (!invitedByUser) throw ctx.error("BAD_REQUEST", { message: "Inviter user not found" });
		if (!organizationPlugin.endpoints?.createInvitation) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Organization plugin endpoints not available" });
		const invitationEmail = normalizeEmail(invitation.email, ctx.context);
		await organizationPlugin.endpoints.createInvitation({
			headers: ctx.request?.headers ?? new Headers(),
			body: {
				email: invitationEmail,
				role: invitation.role,
				organizationId,
				resend: true
			},
			context: {
				...ctx.context,
				session: {
					user: invitedByUser,
					session: { userId: invitation.inviterId }
				},
				orgOptions: organizationPlugin.options || {}
			}
		});
		return { success: true };
	});
};
var listOrganizationMembers = (options) => {
	return createAuthEndpoint("/dash/organization/:id/members", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		if (!isOrganizationEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin not enabled, returning empty members list");
			return [];
		}
		const organizationId = tryDecode(ctx.params.id);
		const members = await ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "organizationId",
				value: organizationId
			}],
			join: { user: true }
		});
		const invitations = await ctx.context.adapter.findMany({
			model: "invitation",
			where: [{
				field: "organizationId",
				value: organizationId
			}, {
				field: "status",
				value: "accepted"
			}],
			join: { user: true }
		});
		const inviterById = /* @__PURE__ */ new Map();
		for (const inv of invitations) {
			const inviter = Array.isArray(inv.user) ? inv.user[0] : inv.user;
			if (inviter && inv.inviterId) inviterById.set(inv.inviterId, inviter);
		}
		const invitationByEmail = new Map(invitations.map((i) => [i.email.toLowerCase(), i]));
		const result = [];
		for (const m of members) {
			const joinedUser = Array.isArray(m.user) ? m.user[0] : m.user;
			if (!joinedUser) continue;
			const invitation = joinedUser.email ? invitationByEmail.get(joinedUser.email.toLowerCase()) : void 0;
			const inviter = invitation ? inviterById.get(invitation.inviterId) : void 0;
			const user = {
				id: joinedUser.id,
				email: joinedUser.email ?? void 0,
				name: joinedUser.name,
				image: joinedUser.image ?? null
			};
			const invitedBy = inviter ? {
				id: inviter.id,
				name: inviter.name,
				email: inviter.email ?? void 0,
				image: inviter.image ?? null
			} : null;
			result.push({
				...m,
				user,
				invitedBy
			});
		}
		return result;
	});
};
var addMember = (options) => {
	return createAuthEndpoint("/dash/organization/add-member", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			userId: zod_default.string(),
			role: zod_default.string()
		})
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		const user = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: ctx.body.userId
			}]
		});
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		let memberData = {
			organizationId,
			userId: ctx.body.userId,
			role: ctx.body.role,
			createdAt: /* @__PURE__ */ new Date()
		};
		if (orgOptions?.organizationHooks?.beforeAddMember) {
			const response = await orgOptions.organizationHooks.beforeAddMember({
				member: memberData,
				user,
				organization
			});
			if (response && typeof response === "object" && "data" in response) memberData = {
				...memberData,
				...response.data
			};
		}
		const member = await ctx.context.adapter.create({
			model: "member",
			data: memberData
		});
		if (orgOptions?.organizationHooks?.afterAddMember) await orgOptions.organizationHooks.afterAddMember({
			member,
			user,
			organization
		});
		return member;
	});
};
var removeMember = (options) => {
	return createAuthEndpoint("/dash/organization/remove-member", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ memberId: zod_default.string() })
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		const member = await ctx.context.adapter.findOne({
			model: "member",
			where: [{
				field: "id",
				value: ctx.body.memberId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!member) throw ctx.error("NOT_FOUND", { message: "Member not found" });
		const [user, organization] = await Promise.all([ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: member.userId
			}]
		}), ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		})]);
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		if (orgOptions?.organizationHooks?.beforeRemoveMember) await orgOptions.organizationHooks.beforeRemoveMember({
			member,
			user,
			organization
		});
		if (orgOptions?.teams?.enabled) {
			const teamsInOrg = await ctx.context.adapter.findMany({
				model: "team",
				where: [{
					field: "organizationId",
					value: organizationId
				}]
			});
			if (teamsInOrg.length > 0) {
				const teamIds = teamsInOrg.map((t) => t.id);
				await ctx.context.adapter.deleteMany({
					model: "teamMember",
					where: [{
						field: "userId",
						value: member.userId
					}, {
						field: "teamId",
						value: teamIds,
						operator: "in"
					}]
				});
			}
		}
		await ctx.context.adapter.delete({
			model: "member",
			where: [{
				field: "id",
				value: ctx.body.memberId
			}]
		});
		if (orgOptions?.organizationHooks?.afterRemoveMember) await orgOptions.organizationHooks.afterRemoveMember({
			member,
			user,
			organization
		});
		return { success: true };
	});
};
var updateMemberRole = (options) => {
	return createAuthEndpoint("/dash/organization/update-member-role", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			memberId: zod_default.string(),
			role: zod_default.string()
		})
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		const existingMember = await ctx.context.adapter.findOne({
			model: "member",
			where: [{
				field: "id",
				value: ctx.body.memberId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!existingMember) throw ctx.error("NOT_FOUND", { message: "Member not found" });
		const [user, organization] = await Promise.all([ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: existingMember.userId
			}]
		}), ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		})]);
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		const previousRole = existingMember.role;
		let newRole = ctx.body.role;
		if (orgOptions?.organizationHooks?.beforeUpdateMemberRole) {
			const response = await orgOptions.organizationHooks.beforeUpdateMemberRole({
				member: existingMember,
				user,
				organization,
				newRole
			});
			if (response && typeof response === "object" && "data" in response) newRole = response.data.role || newRole;
		}
		const member = await ctx.context.adapter.update({
			model: "member",
			where: [{
				field: "id",
				value: ctx.body.memberId
			}],
			update: { role: newRole }
		});
		if (!member) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to update member role" });
		if (orgOptions?.organizationHooks?.afterUpdateMemberRole) await orgOptions.organizationHooks.afterUpdateMemberRole({
			member,
			user,
			organization,
			previousRole
		});
		return member;
	});
};
var exportFactory = (input, options) => async (ctx) => {
	const batchSize = options?.batchSize || 1e4;
	const staleMs = options?.staleMs || 300 * 1e3;
	const enabledFields = options?.enabledFields || [];
	const userLimit = input.limit;
	const userOffset = input.offset || 0;
	const abortController = new AbortController();
	let page = 0;
	let totalExported = 0;
	let staleTimeout;
	const resetTimeout = () => {
		clearTimeout(staleTimeout);
		staleTimeout = setTimeout(() => {
			abortController.abort();
		}, staleMs);
	};
	const stream = new ReadableStream({ async start(controller) {
		const start = performance.now();
		resetTimeout();
		try {
			while (true) {
				let effectiveBatchSize = batchSize;
				if (userLimit !== void 0) {
					const remaining = userLimit - totalExported;
					if (remaining <= 0) break;
					effectiveBatchSize = Math.min(batchSize, remaining);
				}
				const batch = await ctx.context.adapter.findMany({
					...input,
					limit: effectiveBatchSize,
					offset: userOffset + page * batchSize
				});
				resetTimeout();
				if (batch.length === 0) {
					if (page === 0) throw new APIError("FAILED_DEPENDENCY", { message: "Nothing found to export" });
					break;
				}
				let processedBatch = batch;
				if (enabledFields.length > 0) processedBatch = batch.map((item) => Object.fromEntries(enabledFields.map((key) => [key, item?.[key] ?? null])));
				const chunk = processedBatch.map((u) => options?.processRow ? options.processRow(u) : u).filter((v) => v !== void 0).map((u) => JSON.stringify(u)).join("\n") + "\n";
				controller.enqueue(new TextEncoder().encode(chunk));
				totalExported += batch.length;
				page++;
				if (userLimit !== void 0 && totalExported >= userLimit) break;
				resetTimeout();
			}
		} catch (err) {
			if (!abortController.signal.aborted) ctx.context.logger.error("[Dash] Export stream failed:", err);
		} finally {
			clearTimeout(staleTimeout);
			controller.close();
			const end = performance.now();
			ctx.context.logger.info(`[Dash] Export streamed ${totalExported} records in ${Math.round((end - start) / 1e3)}s` + (abortController.signal.aborted ? " (stale timeout)" : ""));
		}
	} });
	return new Response(stream, { headers: { "Content-Type": "application/x-ndjson" } });
};
/**
* Returns true when sessions live exclusively in secondary storage
* (i.e. the user has configured secondaryStorage but has NOT enabled
* storeSessionInDatabase). In this case DB queries against the session
* model will return empty results and we must go through the
* internalAdapter instead.
*/
function isSessionInSecondaryStorageOnly(context) {
	return !!context.options.secondaryStorage && !context.options.session?.storeSessionInDatabase;
}
/**
* Checks whether a plugin is registered by its ID.
* Prefers the native `hasPlugin` when available, otherwise
* falls back to scanning `options.plugins`.
*/
function hasPlugin(context, pluginId) {
	if (typeof context.hasPlugin === "function") return context.hasPlugin(pluginId);
	return context.options.plugins?.some((p) => p.id === pluginId) ?? false;
}
function* chunkArray(arr, options) {
	const batchSize = options?.batchSize || 200;
	for (let i = 0; i < arr.length; i += batchSize) yield arr.slice(i, i + batchSize);
}
async function withConcurrency(items, fn, options) {
	const concurrency = options?.concurrency || 5;
	const results = [];
	const executing = [];
	const run = async () => {
		const batchResults = await Promise.all(executing);
		results.push(...batchResults);
		executing.length = 0;
	};
	for (const item of items) {
		executing.push(fn(item));
		if (executing.length >= concurrency) await run();
	}
	if (executing.length > 0) await run();
	return results;
}
var listOrganizations = (options) => {
	return createAuthEndpoint("/dash/list-organizations", {
		method: "GET",
		use: [jwtMiddleware(options)],
		query: zod_default.object({
			limit: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			offset: zod_default.number().or(zod_default.string().transform(Number)).optional(),
			sortBy: zod_default.enum([
				"createdAt",
				"name",
				"slug",
				"members"
			]).optional(),
			sortOrder: zod_default.enum(["asc", "desc"]).optional(),
			filterMembers: zod_default.enum([
				"abandoned",
				"eq1",
				"gt1",
				"gt5",
				"gt10"
			]).optional(),
			search: zod_default.string().optional(),
			startDate: zod_default.date().or(zod_default.string().transform((val) => new Date(val))).optional(),
			endDate: zod_default.date().or(zod_default.string().transform((val) => new Date(val))).optional()
		}).optional()
	}, async (ctx) => {
		const { limit = 10, offset = 0, sortBy = "createdAt", sortOrder = "desc", search, filterMembers } = ctx.query || {};
		if (!isOrganizationEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin not enabled, returning empty organizations list");
			return {
				organizations: [],
				total: 0,
				offset,
				limit
			};
		}
		const where = [];
		if (search && search.trim().length > 0) {
			const searchTerm = search.trim();
			where.push({
				field: "name",
				value: searchTerm,
				operator: "starts_with",
				mode: "insensitive",
				connector: "OR"
			}, {
				field: "slug",
				value: searchTerm,
				operator: "starts_with",
				mode: "insensitive",
				connector: "OR"
			});
		}
		if (ctx.query?.startDate) where.push({
			field: "createdAt",
			value: ctx.query.startDate,
			operator: "gte"
		});
		if (ctx.query?.endDate) where.push({
			field: "createdAt",
			value: ctx.query.endDate,
			operator: "lte"
		});
		const needsInMemoryProcessing = sortBy === "members" || !!filterMembers;
		const dbSortBy = sortBy === "members" ? "createdAt" : sortBy;
		const fetchLimit = needsInMemoryProcessing ? 2500 : limit;
		const fetchOffset = needsInMemoryProcessing ? 0 : offset;
		const [organizations, initialTotal] = await Promise.all([ctx.context.adapter.findMany({
			model: "organization",
			where,
			limit: fetchLimit,
			offset: fetchOffset,
			sortBy: {
				field: dbSortBy,
				direction: sortOrder
			},
			join: { member: { limit: 5 } }
		}), needsInMemoryProcessing ? Promise.resolve(0) : ctx.context.adapter.count({
			model: "organization",
			where
		})]);
		const orgIds = organizations.map((o) => o.id);
		const memberCounts = await withConcurrency(orgIds, (orgId) => ctx.context.adapter.count({
			model: "member",
			where: [{
				field: "organizationId",
				value: orgId
			}]
		}), { concurrency: 10 });
		const memberCountByOrg = new Map(orgIds.map((orgId, i) => [orgId, memberCounts[i]]));
		let withCounts = organizations.map((organization) => {
			const memberCount = memberCountByOrg.get(organization.id) ?? 0;
			return {
				...organization,
				memberCount
			};
		});
		if (filterMembers) {
			const predicate = {
				abandoned: (c) => c === 0,
				eq1: (c) => c === 1,
				gt1: (c) => c > 1,
				gt5: (c) => c > 5,
				gt10: (c) => c > 10
			}[filterMembers];
			if (predicate) withCounts = withCounts.filter((o) => predicate(o.memberCount));
		}
		if (sortBy === "members") {
			const dir = sortOrder === "asc" ? 1 : -1;
			withCounts.sort((a, b) => (a.memberCount - b.memberCount) * dir);
		}
		const total = needsInMemoryProcessing ? withCounts.length : initialTotal;
		if (needsInMemoryProcessing) withCounts = withCounts.slice(offset, offset + limit);
		const allUserIds = /* @__PURE__ */ new Set();
		for (const organization of withCounts) for (const member of organization.member) allUserIds.add(member.userId);
		const users = allUserIds.size > 0 ? await ctx.context.adapter.findMany({
			model: "user",
			where: [{
				field: "id",
				value: Array.from(allUserIds),
				operator: "in"
			}],
			limit: allUserIds.size
		}) : [];
		const userMap = new Map(users.map((u) => [u.id, u]));
		return {
			organizations: withCounts.map((organization) => {
				const members = organization.member.map((m) => userMap.get(m.userId)).filter((u) => u !== void 0).map((u) => ({
					id: u.id,
					name: u.name,
					email: u.email ?? void 0,
					image: u.image ?? null
				}));
				const { member: _members, ...org } = organization;
				return {
					...org,
					members
				};
			}),
			total,
			offset,
			limit
		};
	});
};
function parseWhereClause$1(val) {
	if (!val) return [];
	const parsed = JSON.parse(val);
	if (!Array.isArray(parsed)) return [];
	return parsed;
}
var exportOrganizationsQuerySchema = zod_default.object({
	limit: zod_default.number().or(zod_default.string().transform(Number)).optional(),
	offset: zod_default.number().or(zod_default.string().transform(Number)).optional(),
	sortBy: zod_default.string().optional(),
	sortOrder: zod_default.enum(["asc", "desc"]).optional(),
	where: zod_default.string().transform(parseWhereClause$1).optional()
}).optional();
var exportOrganizations = (options) => {
	return createAuthEndpoint("/dash/export-organizations", {
		method: "GET",
		use: [jwtMiddleware(options)],
		query: exportOrganizationsQuerySchema
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const sortBy = ctx.query?.sortBy || "createdAt";
		const sortOrder = ctx.query?.sortOrder || "desc";
		return exportFactory({
			model: "organization",
			limit: ctx.query?.limit,
			offset: ctx.query?.offset ?? 0,
			sortBy: {
				field: sortBy,
				direction: sortOrder
			},
			where: ctx.query?.where
		})(ctx);
	});
};
var getOrganizationOptions = (options) => {
	return createAuthEndpoint("/dash/organization/options", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		const organizationPlugin = ctx.context.getPlugin("organization");
		if (!organizationPlugin) return { teamsEnabled: false };
		return { teamsEnabled: Boolean(organizationPlugin.options?.teams?.enabled && organizationPlugin.options.teams.defaultTeam?.enabled !== false) };
	});
};
var getOrganization = (options) => {
	return createAuthEndpoint("/dash/organization/:id", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const decodedOrganizationId = tryDecode(ctx.params.id);
		const organization = (await ctx.context.adapter.findMany({
			model: "organization",
			where: [{
				field: "id",
				value: decodedOrganizationId
			}],
			limit: 1
		}))[0];
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		const membersCount = await ctx.context.adapter.count({
			model: "member",
			where: [{
				field: "organizationId",
				value: organization.id
			}]
		});
		return {
			...organization,
			memberCount: membersCount
		};
	});
};
var deleteOrganization = (options) => {
	return createAuthEndpoint("/dash/organization/delete", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ organizationId: zod_default.string() })
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const { organizationId: bodyOrganizationId } = ctx.body;
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		if (organizationId !== bodyOrganizationId) throw ctx.error("BAD_REQUEST", { message: "Organization ID mismatch" });
		const owners = await ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "organizationId",
				value: organizationId
			}, {
				field: "role",
				value: "owner"
			}],
			sortBy: {
				field: "createdAt",
				direction: "asc"
			},
			limit: 1,
			join: { user: true }
		});
		if (owners.length === 0) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		const owner = owners[0];
		const deletedByUser = Array.isArray(owner.user) ? owner.user[0] : owner.user;
		if (!deletedByUser) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		if (orgOptions?.organizationHooks?.beforeDeleteOrganization) await orgOptions.organizationHooks.beforeDeleteOrganization({
			organization,
			user: deletedByUser
		});
		await ctx.context.adapter.delete({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (orgOptions?.organizationHooks?.afterDeleteOrganization) await orgOptions.organizationHooks.afterDeleteOrganization({
			organization,
			user: deletedByUser
		});
		return { success: true };
	});
};
var deleteManyOrganizations = (options) => {
	return createAuthEndpoint("/dash/organization/delete-many", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationIds: zod_default.string().array() }))]
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		const { organizationIds } = ctx.context.payload;
		const deletedOrgIds = /* @__PURE__ */ new Set();
		const skippedOrgIds = /* @__PURE__ */ new Set();
		const start = performance.now();
		await withConcurrency(chunkArray(organizationIds), async (chunk) => {
			const where = [{
				field: "id",
				value: chunk,
				operator: "in"
			}];
			await ctx.context.adapter.deleteMany({
				model: "organization",
				where
			});
			const remainingOrgs = await ctx.context.adapter.findMany({
				model: "organization",
				where
			});
			for (const id of chunk) if (!remainingOrgs.some((u) => u.id === id)) deletedOrgIds.add(id);
			else skippedOrgIds.add(id);
		});
		const end = performance.now();
		console.log(`Time taken to bulk delete ${deletedOrgIds.size} organizations: ${Math.round((end - start) / 1e3)}s`, skippedOrgIds.size > 0 ? `Failed: ${skippedOrgIds.size}` : "");
		return {
			success: deletedOrgIds.size > 0,
			deletedOrgIds: Array.from(deletedOrgIds),
			skippedOrgIds: Array.from(skippedOrgIds)
		};
	});
};
var createOrganization = (options) => {
	return createAuthEndpoint("/dash/organization/create", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({
			userId: zod_default.string(),
			skipDefaultTeam: zod_default.boolean().optional().default(false)
		}))],
		body: zod_default.looseObject({
			name: zod_default.string(),
			slug: zod_default.string(),
			logo: zod_default.string().optional(),
			defaultTeamName: zod_default.string().optional()
		})
	}, async (ctx) => {
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		const { userId } = ctx.context.payload;
		const user = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: userId
			}]
		});
		if (!user) throw ctx.error("BAD_REQUEST", { message: "User not found" });
		if (await ctx.context.adapter.count({
			model: "organization",
			where: [{
				field: "slug",
				value: ctx.body.slug
			}]
		}) > 0) throw ctx.error("BAD_REQUEST", { message: "Organization already exists" });
		let orgData = {
			...ctx.body,
			defaultTeamName: void 0
		};
		if (orgOptions.organizationCreation?.beforeCreate) {
			const response = await orgOptions.organizationCreation.beforeCreate({
				organization: {
					...orgData,
					createdAt: /* @__PURE__ */ new Date()
				},
				user
			}, ctx.request);
			if (response && typeof response === "object" && "data" in response) orgData = {
				...orgData,
				...response.data
			};
		}
		if (orgOptions?.organizationHooks?.beforeCreateOrganization) {
			const response = await orgOptions?.organizationHooks.beforeCreateOrganization({
				organization: orgData,
				user
			});
			if (response && typeof response === "object" && "data" in response) orgData = {
				...orgData,
				...response.data
			};
		}
		const organization = await ctx.context.adapter.create({
			model: "organization",
			data: {
				...orgData,
				createdAt: /* @__PURE__ */ new Date()
			}
		});
		let member;
		let data = {
			userId: user.id,
			organizationId: organization.id,
			role: orgOptions.creatorRole || "owner"
		};
		if (orgOptions?.organizationHooks?.beforeAddMember) {
			const response = await orgOptions?.organizationHooks.beforeAddMember({
				member: {
					userId: user.id,
					organizationId: organization.id,
					role: orgOptions.creatorRole || "owner",
					createdAt: /* @__PURE__ */ new Date(),
					updatedAt: /* @__PURE__ */ new Date()
				},
				user,
				organization
			});
			if (response && typeof response === "object" && "data" in response) data = {
				...data,
				...response.data
			};
		}
		member = await ctx.context.adapter.create({
			model: "member",
			data: {
				userId: data.userId,
				organizationId: data.organizationId,
				role: data.role,
				createdAt: /* @__PURE__ */ new Date()
			}
		});
		if (orgOptions?.organizationHooks?.afterAddMember) await orgOptions.organizationHooks.afterAddMember({
			member,
			user,
			organization
		});
		if (orgOptions?.teams?.enabled && orgOptions.teams.defaultTeam?.enabled !== false && !ctx.context.payload.skipDefaultTeam) {
			let teamData = {
				organizationId: organization.id,
				name: ctx.body.defaultTeamName || `${organization.name}`,
				createdAt: /* @__PURE__ */ new Date()
			};
			if (orgOptions?.organizationHooks?.beforeCreateTeam) {
				const response = await orgOptions?.organizationHooks.beforeCreateTeam({
					team: {
						organizationId: organization.id,
						name: teamData.name
					},
					user,
					organization
				});
				if (response && typeof response === "object" && "data" in response) teamData = {
					...teamData,
					...response.data
				};
			}
			const defaultTeam = await orgOptions.teams.defaultTeam?.customCreateDefaultTeam?.(organization, ctx) || await ctx.context.adapter.create({
				model: "team",
				data: teamData
			});
			if (!await ctx.context.adapter.findOne({
				model: "teamMember",
				where: [{
					field: "teamId",
					value: defaultTeam.id
				}, {
					field: "userId",
					value: user.id
				}]
			})) await ctx.context.adapter.create({
				model: "teamMember",
				data: {
					teamId: defaultTeam.id,
					userId: user.id,
					role: "owner"
				}
			});
			if (orgOptions?.organizationHooks?.afterCreateTeam) await orgOptions.organizationHooks.afterCreateTeam({
				team: defaultTeam,
				user,
				organization
			});
		}
		if (orgOptions.organizationCreation?.afterCreate) await orgOptions.organizationCreation.afterCreate({
			organization,
			user,
			member
		}, ctx.request);
		if (orgOptions?.organizationHooks?.afterCreateOrganization) await orgOptions?.organizationHooks.afterCreateOrganization({
			organization,
			user,
			member
		});
		return {
			...organization,
			members: [member]
		};
	});
};
var updateOrganization = (options) => {
	return createAuthEndpoint("/dash/organization/update", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.looseObject({
			logo: zod_default.url().optional(),
			name: zod_default.string().optional(),
			slug: zod_default.string().optional(),
			metadata: zod_default.string().optional()
		})
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireOrganizationPlugin(ctx).options || {};
		if (ctx.body.slug) {
			const orgWithSlug = await ctx.context.adapter.findOne({
				model: "organization",
				where: [{
					field: "slug",
					value: ctx.body.slug
				}],
				select: ["id"]
			});
			if (orgWithSlug && orgWithSlug.id !== organizationId) throw ctx.error("BAD_REQUEST", { message: "Slug already exists" });
		}
		const owners = await ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "organizationId",
				value: organizationId
			}, {
				field: "role",
				value: "owner"
			}],
			sortBy: {
				field: "createdAt",
				direction: "asc"
			},
			limit: 1,
			join: { user: true }
		});
		if (owners.length === 0) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		const owner = owners[0];
		const updatedByUser = Array.isArray(owner.user) ? owner.user[0] : owner.user;
		if (!updatedByUser) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		let updateData = { ...ctx.body };
		if (typeof updateData.metadata === "string") try {
			updateData.metadata = updateData.metadata === "" ? void 0 : JSON.parse(updateData.metadata);
		} catch (parseError) {
			ctx.context.logger.debug("[Dash] Invalid organization metadata JSON:", parseError);
			throw ctx.error("BAD_REQUEST", { message: "Invalid metadata: must be valid JSON" });
		}
		if (orgOptions?.organizationHooks?.beforeUpdateOrganization) {
			const response = await orgOptions?.organizationHooks.beforeUpdateOrganization({
				organization: updateData,
				user: updatedByUser,
				member: owner
			});
			if (response && typeof response === "object" && "data" in response) updateData = {
				...updateData,
				...response.data
			};
		}
		const organization = await ctx.context.adapter.update({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}],
			update: {
				...updateData,
				metadata: typeof updateData.metadata === "object" ? JSON.stringify(updateData.metadata) : updateData.metadata
			}
		});
		if (!organization) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to update organization" });
		if (orgOptions?.organizationHooks?.afterUpdateOrganization) await orgOptions?.organizationHooks.afterUpdateOrganization({
			organization,
			user: updatedByUser,
			member: owner
		});
		return organization;
	});
};
var listOrganizationTeams = (options) => {
	return createAuthEndpoint("/dash/organization/:id/teams", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		if (!isTeamsEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin or teams not enabled, returning empty teams list");
			return [];
		}
		const organizationId = tryDecode(ctx.params.id);
		try {
			const teams = await ctx.context.adapter.findMany({
				model: "team",
				where: [{
					field: "organizationId",
					value: organizationId
				}]
			});
			return await Promise.all(teams.map(async (team) => {
				let memberCount = 0;
				try {
					memberCount = await ctx.context.adapter.count({
						model: "teamMember",
						where: [{
							field: "teamId",
							value: team.id
						}]
					});
				} catch (error) {
					ctx.context.logger.warn("[Dash] Failed to count team members:", error);
					memberCount = 0;
				}
				return {
					...team,
					memberCount
				};
			}));
		} catch (error) {
			ctx.context.logger.warn("[Dash] Failed to list organization teams:", error);
			return [];
		}
	});
};
var updateTeam = (options) => {
	return createAuthEndpoint("/dash/organization/update-team", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			teamId: zod_default.string(),
			name: zod_default.string().optional()
		})
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireTeamsEnabled(ctx);
		const existingTeam = await ctx.context.adapter.findOne({
			model: "team",
			where: [{
				field: "id",
				value: ctx.body.teamId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!existingTeam) throw ctx.error("NOT_FOUND", { message: "Team not found" });
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		const owners = await ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "organizationId",
				value: organizationId
			}, {
				field: "role",
				value: "owner"
			}],
			sortBy: {
				field: "createdAt",
				direction: "asc"
			},
			limit: 1,
			join: { user: true }
		});
		if (owners.length === 0) throw ctx.error("NOT_FOUND", { message: "Owner not found" });
		const owner = owners[0];
		const user = Array.isArray(owner.user) ? owner.user[0] : owner.user;
		if (!user) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		let updateData = { updatedAt: /* @__PURE__ */ new Date() };
		if (ctx.body.name) updateData.name = ctx.body.name;
		if (orgOptions?.organizationHooks?.beforeUpdateTeam) {
			const response = await orgOptions.organizationHooks.beforeUpdateTeam({
				team: existingTeam,
				updates: updateData,
				user,
				organization
			});
			if (response && typeof response === "object" && "data" in response) updateData = {
				...updateData,
				...response.data
			};
		}
		const team = await ctx.context.adapter.update({
			model: "team",
			where: [{
				field: "id",
				value: ctx.body.teamId
			}],
			update: updateData
		});
		if (!team) throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Failed to update team" });
		if (orgOptions?.organizationHooks?.afterUpdateTeam) await orgOptions.organizationHooks.afterUpdateTeam({
			team,
			user,
			organization
		});
		return team;
	});
};
var deleteTeam = (options) => {
	return createAuthEndpoint("/dash/organization/delete-team", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ teamId: zod_default.string() })
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireTeamsEnabled(ctx);
		const team = await ctx.context.adapter.findOne({
			model: "team",
			where: [{
				field: "id",
				value: ctx.body.teamId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!team) throw ctx.error("NOT_FOUND", { message: "Team not found" });
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		if (orgOptions?.teams?.allowRemovingAllTeams === false) {
			if (await ctx.context.adapter.count({
				model: "team",
				where: [{
					field: "organizationId",
					value: organizationId
				}]
			}) <= 1) throw ctx.error("BAD_REQUEST", { message: "Cannot remove the last team in the organization" });
		}
		const owners = await ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "organizationId",
				value: organizationId
			}, {
				field: "role",
				value: "owner"
			}],
			sortBy: {
				field: "createdAt",
				direction: "asc"
			},
			limit: 1,
			join: { user: true }
		});
		if (owners.length === 0) throw ctx.error("NOT_FOUND", { message: "Owner not found" });
		const owner = owners[0];
		const user = Array.isArray(owner.user) ? owner.user[0] : owner.user;
		if (!user) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		if (orgOptions?.organizationHooks?.beforeDeleteTeam) await orgOptions.organizationHooks.beforeDeleteTeam({
			team,
			user,
			organization
		});
		await ctx.context.adapter.delete({
			model: "team",
			where: [{
				field: "id",
				value: ctx.body.teamId
			}]
		});
		if (orgOptions?.organizationHooks?.afterDeleteTeam) await orgOptions.organizationHooks.afterDeleteTeam({
			team,
			user,
			organization
		});
		return { success: true };
	});
};
var createTeam = (options) => {
	return createAuthEndpoint("/dash/organization/create-team", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ name: zod_default.string() })
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireTeamsEnabled(ctx);
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		if (orgOptions?.teams?.maximumTeams) {
			const teamsCount = await ctx.context.adapter.count({
				model: "team",
				where: [{
					field: "organizationId",
					value: organizationId
				}]
			});
			const maxTeams = typeof orgOptions.teams.maximumTeams === "function" ? await orgOptions.teams.maximumTeams({
				organizationId,
				session: null
			}) : orgOptions.teams.maximumTeams;
			if (teamsCount >= maxTeams) throw ctx.error("BAD_REQUEST", { message: `Maximum number of teams (${maxTeams}) reached for this organization` });
		}
		const owners = await ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "organizationId",
				value: organizationId
			}, {
				field: "role",
				value: "owner"
			}],
			sortBy: {
				field: "createdAt",
				direction: "asc"
			},
			limit: 1,
			join: { user: true }
		});
		if (owners.length === 0) throw ctx.error("NOT_FOUND", { message: "Owner not found" });
		const owner = owners[0];
		const user = Array.isArray(owner.user) ? owner.user[0] : owner.user;
		if (!user) throw ctx.error("NOT_FOUND", { message: "Owner user not found" });
		let teamData = {
			name: ctx.body.name,
			organizationId,
			createdAt: /* @__PURE__ */ new Date()
		};
		if (orgOptions?.organizationHooks?.beforeCreateTeam) {
			const response = await orgOptions.organizationHooks.beforeCreateTeam({
				team: teamData,
				user,
				organization
			});
			if (response && typeof response === "object" && "data" in response) teamData = {
				...teamData,
				...response.data
			};
		}
		const team = await ctx.context.adapter.create({
			model: "team",
			data: teamData
		});
		if (orgOptions?.organizationHooks?.afterCreateTeam) await orgOptions.organizationHooks.afterCreateTeam({
			team,
			user,
			organization
		});
		return team;
	});
};
var listTeamMembers = (options) => {
	return createAuthEndpoint("/dash/organization/:orgId/teams/:teamId/members", {
		method: "GET",
		use: [jwtMiddleware(options)]
	}, async (ctx) => {
		if (!isTeamsEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin or teams not enabled, returning empty team members list");
			return [];
		}
		const orgId = tryDecode(ctx.params.orgId);
		const teamId = tryDecode(ctx.params.teamId);
		try {
			if (await ctx.context.adapter.count({
				model: "team",
				where: [{
					field: "id",
					value: teamId
				}, {
					field: "organizationId",
					value: orgId
				}]
			}) === 0) throw ctx.error("NOT_FOUND", { message: "Team not found" });
			return (await ctx.context.adapter.findMany({
				model: "teamMember",
				where: [{
					field: "teamId",
					value: teamId
				}],
				join: { user: true }
			})).map((tm) => {
				const user = Array.isArray(tm.user) ? tm.user[0] : tm.user;
				return {
					...tm,
					user: user ? {
						id: user.id,
						name: user.name,
						email: user.email ?? void 0,
						image: user.image ?? null
					} : null
				};
			});
		} catch (e) {
			ctx.context.logger.warn("[Dash] Failed to list team members:", e);
			return [];
		}
	});
};
var addTeamMember = (options) => {
	return createAuthEndpoint("/dash/organization/add-team-member", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			teamId: zod_default.string(),
			userId: zod_default.string()
		})
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireTeamsEnabled(ctx);
		const team = await ctx.context.adapter.findOne({
			model: "team",
			where: [{
				field: "id",
				value: ctx.body.teamId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!team) throw ctx.error("NOT_FOUND", { message: "Team not found" });
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		const user = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: ctx.body.userId
			}]
		});
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		if (!await ctx.context.adapter.findOne({
			model: "member",
			where: [{
				field: "userId",
				value: ctx.body.userId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		})) throw ctx.error("BAD_REQUEST", { message: "User is not a member of this organization" });
		if (await ctx.context.adapter.count({
			model: "teamMember",
			where: [{
				field: "teamId",
				value: ctx.body.teamId
			}, {
				field: "userId",
				value: ctx.body.userId
			}]
		}) > 0) throw ctx.error("BAD_REQUEST", { message: "User is already a member of this team" });
		if (orgOptions?.teams?.maximumMembersPerTeam) {
			const teamMemberCount = await ctx.context.adapter.count({
				model: "teamMember",
				where: [{
					field: "teamId",
					value: ctx.body.teamId
				}]
			});
			const maxMembers = typeof orgOptions.teams.maximumMembersPerTeam === "function" ? await orgOptions.teams.maximumMembersPerTeam({
				teamId: ctx.body.teamId,
				organizationId,
				session: null
			}) : orgOptions.teams.maximumMembersPerTeam;
			if (teamMemberCount >= maxMembers) throw ctx.error("BAD_REQUEST", { message: `Maximum number of team members (${maxMembers}) reached for this team` });
		}
		let teamMemberData = {
			teamId: ctx.body.teamId,
			userId: ctx.body.userId,
			createdAt: /* @__PURE__ */ new Date()
		};
		if (orgOptions?.organizationHooks?.beforeAddTeamMember) {
			const response = await orgOptions.organizationHooks.beforeAddTeamMember({
				teamMember: teamMemberData,
				team,
				user,
				organization
			});
			if (response && typeof response === "object" && "data" in response) teamMemberData = {
				...teamMemberData,
				...response.data
			};
		}
		const teamMember = await ctx.context.adapter.create({
			model: "teamMember",
			data: teamMemberData
		});
		if (orgOptions?.organizationHooks?.afterAddTeamMember) await orgOptions.organizationHooks.afterAddTeamMember({
			teamMember,
			team,
			user,
			organization
		});
		return teamMember;
	});
};
var removeTeamMember = (options) => {
	return createAuthEndpoint("/dash/organization/remove-team-member", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			teamId: zod_default.string(),
			userId: zod_default.string()
		})
	}, async (ctx) => {
		const { organizationId } = ctx.context.payload;
		const orgOptions = requireTeamsEnabled(ctx);
		const team = await ctx.context.adapter.findOne({
			model: "team",
			where: [{
				field: "id",
				value: ctx.body.teamId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!team) throw ctx.error("NOT_FOUND", { message: "Team not found" });
		const organization = await ctx.context.adapter.findOne({
			model: "organization",
			where: [{
				field: "id",
				value: organizationId
			}]
		});
		if (!organization) throw ctx.error("NOT_FOUND", { message: "Organization not found" });
		const user = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: ctx.body.userId
			}]
		});
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		const teamMember = await ctx.context.adapter.findOne({
			model: "teamMember",
			where: [{
				field: "teamId",
				value: ctx.body.teamId
			}, {
				field: "userId",
				value: ctx.body.userId
			}]
		});
		if (!teamMember) throw ctx.error("NOT_FOUND", { message: "User is not a member of this team" });
		if (orgOptions?.organizationHooks?.beforeRemoveTeamMember) await orgOptions.organizationHooks.beforeRemoveTeamMember({
			teamMember,
			team,
			user,
			organization
		});
		await ctx.context.adapter.delete({
			model: "teamMember",
			where: [{
				field: "teamId",
				value: ctx.body.teamId
			}, {
				field: "userId",
				value: ctx.body.userId
			}]
		});
		if (orgOptions?.organizationHooks?.afterRemoveTeamMember) await orgOptions.organizationHooks.afterRemoveTeamMember({
			teamMember,
			team,
			user,
			organization
		});
		return { success: true };
	});
};
var revokeSession = (options) => createAuthEndpoint("/dash/sessions/revoke", {
	method: "POST",
	use: [jwtMiddleware(options)],
	metadata: { allowedMediaTypes: ["application/json", ""] }
}, async (ctx) => {
	const { sessionId, userId } = ctx.context.payload;
	if (!sessionId || !userId) throw ctx.error("FORBIDDEN", { message: "Invalid payload" });
	let sessionToken;
	if (isSessionInSecondaryStorageOnly(ctx.context)) {
		const match = (await ctx.context.internalAdapter.listSessions(userId)).find((s) => s.id === sessionId || s.token === sessionId);
		if (!match) throw ctx.error("NOT_FOUND", { message: "Session not found" });
		sessionToken = match.token;
	} else {
		const session = await ctx.context.adapter.findOne({
			model: "session",
			where: [{
				field: "id",
				value: sessionId
			}, {
				field: "userId",
				value: userId
			}]
		});
		if (!session) throw ctx.error("NOT_FOUND", { message: "Session not found" });
		sessionToken = session.token;
	}
	await ctx.context.internalAdapter.deleteSession(sessionToken);
	return ctx.json({ success: true });
});
var revokeAllSessions = (options) => createAuthEndpoint("/dash/sessions/revoke-all", {
	method: "POST",
	use: [jwtMiddleware(options)],
	body: zod_default.object({ userId: zod_default.string() })
}, async (ctx) => {
	const { userId } = ctx.body;
	if (!await ctx.context.internalAdapter.findUserById(userId)) throw ctx.error("NOT_FOUND", { message: "User not found" });
	await ctx.context.internalAdapter.deleteSessions(userId);
	return ctx.json({ success: true });
});
var revokeManySessions = (options) => createAuthEndpoint("/dash/sessions/revoke-many", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userIds: zod_default.string().array() }))]
}, async (ctx) => {
	const { userIds } = ctx.context.payload;
	await withConcurrency(chunkArray(userIds, { batchSize: 50 }), async (chunk) => {
		for (const userId of chunk) await ctx.context.internalAdapter.deleteSessions(userId);
	}, { concurrency: 3 });
	return ctx.json({
		success: true,
		revokedCount: userIds.length
	});
});
/**
* SSRF (Server-Side Request Forgery) Protection
*
* Validates URLs before server-side fetches to block requests to private/reserved
* networks. Covers IPv4 private ranges, IPv6 private ranges, and IPv4-mapped IPv6
* bypass vectors.
*/
function isPrivateIPv4(a, b) {
	if (a === 10) return true;
	if (a === 172 && b >= 16 && b <= 31) return true;
	if (a === 192 && b === 168) return true;
	if (a === 127) return true;
	if (a === 169 && b === 254) return true;
	if (a === 0) return true;
	return false;
}
function parseIPv6(addr) {
	const sides = addr.split("::");
	if (sides.length > 2) return null;
	const parseGroups = (s) => s === "" ? [] : s.split(":").map((g) => parseInt(g, 16));
	const left = parseGroups(sides[0]);
	const right = sides.length === 2 ? parseGroups(sides[1]) : [];
	if (left.some(isNaN) || right.some(isNaN)) return null;
	const missing = 8 - left.length - right.length;
	if (sides.length === 2) {
		if (missing < 0) return null;
		return [
			...left,
			...Array(missing).fill(0),
			...right
		];
	}
	if (left.length !== 8) return null;
	return left;
}
function isPrivateHost(hostname) {
	if (hostname === "localhost" || hostname.endsWith(".local") || hostname.endsWith(".internal")) return true;
	const bare = hostname.replace(/^\[|\]$/g, "");
	const v4parts = bare.split(".").map(Number);
	if (v4parts.length === 4 && v4parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) return isPrivateIPv4(v4parts[0], v4parts[1]);
	const groups = parseIPv6(bare);
	if (groups && groups.length === 8) {
		if (groups.slice(0, 7).every((g) => g === 0) && groups[7] === 1) return true;
		if (groups.every((g) => g === 0)) return true;
		if ((groups[0] & 65472) === 65152) return true;
		if ((groups[0] & 65024) === 64512) return true;
		if (groups[0] === 0 && groups[1] === 0 && groups[2] === 0 && groups[3] === 0 && groups[4] === 0 && groups[5] === 65535) return isPrivateIPv4(groups[6] >> 8 & 255, groups[6] & 255);
		if (groups[0] === 0 && groups[1] === 0 && groups[2] === 0 && groups[3] === 0 && groups[4] === 65535 && groups[5] === 0) return isPrivateIPv4(groups[6] >> 8 & 255, groups[6] & 255);
		if (groups[0] === 100 && groups[1] === 65435 && groups.slice(2, 6).every((g) => g === 0)) return isPrivateIPv4(groups[6] >> 8 & 255, groups[6] & 255);
		if (groups[0] === 8193 && groups[1] === 3512) return true;
		if (groups[0] === 256 && groups.slice(1, 4).every((g) => g === 0)) return true;
	}
	return false;
}
function parseAndValidateUrl(url) {
	try {
		const parsed = new URL(url);
		if (!["http:", "https:"].includes(parsed.protocol)) return null;
		if (isPrivateHost(parsed.hostname)) return null;
		return parsed;
	} catch {
		return null;
	}
}
/**
* Builds an in-memory session context for calling plugin endpoints
* from the infra layer via plugin.endpoints.xxx({ context }).
*/
function buildSessionContext(userId, user) {
	const now = /* @__PURE__ */ new Date();
	return { session: {
		user: {
			id: userId,
			...user
		},
		session: {
			id: `infra-${now.getTime()}`,
			userId,
			token: `infra-temp-${now.getTime()}`,
			createdAt: now,
			updatedAt: now,
			expiresAt: new Date(now.getTime() + 6e4),
			synthetic: true
		}
	} };
}
function getSSOPlugin(ctx) {
	return ctx.context.getPlugin("sso");
}
/**
* SAML metadata limits and algorithm URIs aligned with @better-auth/sso
* (see packages/sso dist constants). Inlined so consumers (e.g. Metro) never
* statically pull @better-auth/sso for validation-only code paths.
*/
var DEFAULT_MAX_SAML_METADATA_SIZE = 100 * 1024;
var RSA_SHA1 = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
var SHA1 = "http://www.w3.org/2000/09/xmldsig#sha1";
/** @public */
var DEPRECATED_SIGNATURE_ALGORITHMS = [RSA_SHA1];
/** @public */
var DEPRECATED_DIGEST_ALGORITHMS = [SHA1];
function validateSAMLMetadataSize(metadataXml, maxSize = DEFAULT_MAX_SAML_METADATA_SIZE) {
	if (new TextEncoder().encode(metadataXml).byteLength > maxSize) throw new Error(`IdP metadata exceeds maximum allowed size (${Math.round(maxSize / 1024)}KB)`);
}
/** @public */
function extractAlgorithmsFromSAMLMetadata(metadataXml) {
	const signatureAlgorithms = [];
	const digestAlgorithms = [];
	const sigMethodRegex = /<(?:[\w-]+:)?SignatureMethod\s[^>]*Algorithm\s*=\s*"([^"]+)"/g;
	let match;
	while ((match = sigMethodRegex.exec(metadataXml)) !== null) if (match[1] && !signatureAlgorithms.includes(match[1])) signatureAlgorithms.push(match[1]);
	const signingMethodRegex = /<(?:[\w-]+:)?SigningMethod\s[^>]*Algorithm\s*=\s*"([^"]+)"/g;
	while ((match = signingMethodRegex.exec(metadataXml)) !== null) if (match[1] && !signatureAlgorithms.includes(match[1])) signatureAlgorithms.push(match[1]);
	const digestMethodRegex = /<(?:[\w-]+:)?DigestMethod\s[^>]*Algorithm\s*=\s*"([^"]+)"/g;
	while ((match = digestMethodRegex.exec(metadataXml)) !== null) if (match[1] && !digestAlgorithms.includes(match[1])) digestAlgorithms.push(match[1]);
	return {
		signatureAlgorithms,
		digestAlgorithms
	};
}
function validateSAMLMetadataAlgorithms(metadataXml) {
	const warnings = [];
	const { signatureAlgorithms, digestAlgorithms } = extractAlgorithmsFromSAMLMetadata(metadataXml);
	for (const alg of signatureAlgorithms) if (DEPRECATED_SIGNATURE_ALGORITHMS.includes(alg)) warnings.push(`IdP metadata contains deprecated signature algorithm: ${alg}. Consider requesting SHA-256 or stronger from your IdP.`);
	for (const alg of digestAlgorithms) if (DEPRECATED_DIGEST_ALGORITHMS.includes(alg)) warnings.push(`IdP metadata contains deprecated digest algorithm: ${alg}. Consider requesting SHA-256 or stronger from your IdP.`);
	return warnings;
}
var ssoRuntimeModule;
function loadSsoRuntime() {
	return ssoRuntimeModule ??= import("./sso+[...].mjs").then((n) => n.t);
}
function requireOrganizationAccess(ctx) {
	const orgIdFromUrl = tryDecode(ctx.params.id);
	const orgIdFromToken = ctx.context.payload?.organizationId;
	if (!orgIdFromToken || orgIdFromUrl !== orgIdFromToken) throw ctx.error("FORBIDDEN", { message: "You do not have access to this organization" });
}
var samlConfigSchema = zod_default.object({
	idpMetadata: zod_default.object({
		metadata: zod_default.string().optional(),
		metadataUrl: zod_default.string().optional()
	}).optional(),
	entryPoint: zod_default.string().optional(),
	cert: zod_default.string().optional(),
	entityId: zod_default.string().optional(),
	mapping: zod_default.object({
		id: zod_default.string().optional(),
		email: zod_default.string().optional(),
		emailVerified: zod_default.string().optional(),
		name: zod_default.string().optional(),
		firstName: zod_default.string().optional(),
		lastName: zod_default.string().optional(),
		extraFields: zod_default.record(zod_default.string(), zod_default.any()).optional()
	}).optional()
});
var oidcConfigSchema = zod_default.object({
	clientId: zod_default.string(),
	clientSecret: zod_default.string().optional(),
	discoveryUrl: zod_default.string().optional(),
	issuer: zod_default.string().optional(),
	mapping: zod_default.object({
		id: zod_default.string().optional(),
		email: zod_default.string().optional(),
		emailVerified: zod_default.string().optional(),
		name: zod_default.string().optional(),
		image: zod_default.string().optional(),
		extraFields: zod_default.record(zod_default.string(), zod_default.any()).optional()
	}).optional()
});
async function resolveSAMLConfig(samlConfig, providerId, baseURL, ctx) {
	let idpMetadataXml = samlConfig.idpMetadata?.metadata;
	if (!idpMetadataXml && samlConfig.idpMetadata?.metadataUrl) {
		const validatedMetadataUrl = parseAndValidateUrl(samlConfig.idpMetadata.metadataUrl);
		if (!validatedMetadataUrl) throw ctx.error("BAD_REQUEST", { message: "Invalid or blocked IdP metadata URL" });
		try {
			const metadataResponse = await fetch(validatedMetadataUrl.toString());
			if (!metadataResponse.ok) throw ctx.error("BAD_REQUEST", { message: `Failed to fetch IdP metadata from URL: ${metadataResponse.status} ${metadataResponse.statusText}` });
			idpMetadataXml = await metadataResponse.text();
		} catch (e) {
			ctx.context.logger.error("[Dash] Failed to fetch IdP metadata from URL:", e);
			throw ctx.error("BAD_REQUEST", { message: "Failed to fetch IdP metadata from URL" });
		}
	}
	const metadataAlgorithmWarnings = [];
	if (idpMetadataXml) {
		try {
			validateSAMLMetadataSize(idpMetadataXml);
		} catch (e) {
			ctx.context.logger.debug("[Dash] SAML metadata validation failed:", e);
			throw ctx.error("BAD_REQUEST", { message: e instanceof Error ? e.message : "IdP metadata exceeds maximum allowed size" });
		}
		const warnings = validateSAMLMetadataAlgorithms(idpMetadataXml);
		if (warnings.length > 0) {
			metadataAlgorithmWarnings.push(...warnings);
			ctx.context.logger.warn("[Dash] SAML IdP metadata uses deprecated algorithms:", providerId, warnings);
		}
	}
	const idpMetadata = idpMetadataXml ? { metadata: idpMetadataXml } : {
		...samlConfig.entryPoint ? { singleSignOnService: [{
			Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect",
			Location: samlConfig.entryPoint
		}] } : {},
		...samlConfig.cert ? { cert: samlConfig.cert } : {}
	};
	const m = samlConfig.mapping;
	return {
		config: {
			issuer: samlConfig.entityId ?? `${baseURL}/sso/saml2/sp/metadata?providerId=${providerId}`,
			callbackUrl: `${baseURL}/sso/saml2/sp/acs/${providerId}`,
			idpMetadata,
			spMetadata: {},
			entryPoint: samlConfig.entryPoint ?? "",
			cert: samlConfig.cert ?? "",
			...m ? { mapping: {
				id: m.id ?? "nameID",
				email: m.email ?? "email",
				name: m.name ?? "name",
				emailVerified: m.emailVerified,
				firstName: m.firstName,
				lastName: m.lastName,
				extraFields: m.extraFields
			} } : {}
		},
		...metadataAlgorithmWarnings.length > 0 ? { warnings: metadataAlgorithmWarnings } : {}
	};
}
async function resolveOIDCConfig(oidcConfig, domain, ctx) {
	let normalizedDomain = domain;
	try {
		if (domain.startsWith("http://") || domain.startsWith("https://")) normalizedDomain = new URL(domain).hostname;
	} catch {
		normalizedDomain = domain;
	}
	const issuerHint = oidcConfig.issuer || `https://${normalizedDomain}`;
	const issuer = issuerHint.startsWith("http") ? issuerHint : `https://${issuerHint}`;
	const sso = await loadSsoRuntime();
	try {
		const hydratedConfig = await sso.discoverOIDCConfig({
			issuer,
			discoveryEndpoint: oidcConfig.discoveryUrl,
			isTrustedOrigin: (url) => {
				try {
					const issuerOrigin = new URL(issuer).origin;
					return new URL(url).origin === issuerOrigin;
				} catch {
					return false;
				}
			}
		});
		const om = oidcConfig.mapping;
		return {
			config: {
				clientId: oidcConfig.clientId,
				clientSecret: oidcConfig.clientSecret,
				issuer: hydratedConfig.issuer,
				discoveryEndpoint: hydratedConfig.discoveryEndpoint,
				authorizationEndpoint: hydratedConfig.authorizationEndpoint,
				tokenEndpoint: hydratedConfig.tokenEndpoint,
				jwksEndpoint: hydratedConfig.jwksEndpoint,
				userInfoEndpoint: hydratedConfig.userInfoEndpoint,
				tokenEndpointAuthentication: hydratedConfig.tokenEndpointAuthentication,
				pkce: true,
				...om ? { mapping: {
					id: om.id ?? "sub",
					email: om.email ?? "email",
					name: om.name ?? "name",
					emailVerified: om.emailVerified,
					image: om.image,
					extraFields: om.extraFields
				} } : {}
			},
			issuer: hydratedConfig.issuer
		};
	} catch (e) {
		if (e instanceof sso.DiscoveryError) {
			ctx.context.logger.error("[Dash] OIDC discovery failed:", e);
			throw ctx.error("BAD_REQUEST", {
				message: `OIDC discovery failed: ${e.message}`,
				code: e.code
			});
		}
		ctx.context.logger.error("[Dash] OIDC discovery failed:", e);
		throw ctx.error("BAD_REQUEST", {
			message: `OIDC discovery failed: Unable to discover configuration from ${issuer}`,
			code: "OIDC_DISCOVERY_FAILED"
		});
	}
}
var listOrganizationSsoProviders = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-providers", {
		method: "GET",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))]
	}, async (ctx) => {
		if (!isOrganizationEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin not enabled, returning empty SSO providers list");
			return [];
		}
		requireOrganizationAccess(ctx);
		const organizationId = tryDecode(ctx.params.id);
		if (!ctx.context.getPlugin("sso")) {
			ctx.context.logger.warn("[Dash] SSO plugin not enabled, returning empty SSO providers list");
			return [];
		}
		try {
			return await ctx.context.adapter.findMany({
				model: "ssoProvider",
				where: [{
					field: "organizationId",
					value: organizationId
				}]
			});
		} catch (error) {
			ctx.context.logger.warn("[Dash] Failed to list SSO providers:", error);
			return [];
		}
	});
};
var createSsoProvider = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-provider/create", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			providerId: zod_default.string(),
			domain: zod_default.string(),
			protocol: zod_default.enum(["SAML", "OIDC"]),
			userId: zod_default.string(),
			samlConfig: samlConfigSchema.optional(),
			oidcConfig: oidcConfigSchema.optional()
		})
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		requireOrganizationAccess(ctx);
		const ssoPlugin = getSSOPlugin(ctx);
		if (!ssoPlugin?.endpoints?.registerSSOProvider) throw ctx.error("BAD_REQUEST", { message: "SSO plugin is not enabled or feature is not supported in your plugin version" });
		const organizationId = tryDecode(ctx.params.id);
		const { providerId, domain, protocol, samlConfig, oidcConfig, userId } = ctx.body;
		const registerBody = {
			providerId,
			domain,
			issuer: domain,
			organizationId
		};
		if (protocol === "SAML" && samlConfig) {
			const samlResult = await resolveSAMLConfig(samlConfig, providerId, ctx.context.baseURL, ctx);
			registerBody.issuer = samlResult.config.issuer ?? (samlConfig.entityId || `${ctx.context.baseURL}/sso/saml2/sp/metadata?providerId=${providerId}`);
			registerBody.samlConfig = samlResult.config;
		}
		if (protocol === "OIDC" && oidcConfig) {
			if (!oidcConfig.clientSecret) throw ctx.error("BAD_REQUEST", { message: "Client secret is required when creating an OIDC provider" });
			const result = await resolveOIDCConfig(oidcConfig, domain, ctx);
			registerBody.issuer = result.issuer;
			registerBody.oidcConfig = result.config;
		}
		try {
			const result = await ssoPlugin.endpoints.registerSSOProvider({
				body: registerBody,
				context: {
					...ctx.context,
					...buildSessionContext(userId)
				}
			});
			let verificationToken = null;
			if ("domainVerificationToken" in result && typeof result.domainVerificationToken === "string") verificationToken = result.domainVerificationToken;
			return {
				success: true,
				provider: {
					id: result.providerId,
					providerId: result.providerId || providerId,
					domain: result.domain || domain
				},
				domainVerification: {
					txtRecordName: `better-auth-token-${providerId}`,
					verificationToken
				}
			};
		} catch (e) {
			if (e instanceof APIError) throw e;
			ctx.context.logger.error("[Dash] Failed to create SSO provider:", e);
			throw ctx.error("BAD_REQUEST", { message: e instanceof Error ? e.message : "Failed to create SSO provider" });
		}
	});
};
var updateSsoProvider = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-provider/update", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			providerId: zod_default.string(),
			domain: zod_default.string(),
			protocol: zod_default.enum(["SAML", "OIDC"]),
			samlConfig: samlConfigSchema.optional(),
			oidcConfig: oidcConfigSchema.optional()
		})
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		requireOrganizationAccess(ctx);
		const ssoPlugin = getSSOPlugin(ctx);
		if (!ssoPlugin?.endpoints?.updateSSOProvider) throw ctx.error("BAD_REQUEST", { message: "SSO plugin is not enabled or feature is not supported in your plugin version" });
		const organizationId = tryDecode(ctx.params.id);
		const { providerId, domain, protocol, samlConfig, oidcConfig } = ctx.body;
		const existingProvider = await ctx.context.adapter.findOne({
			model: "ssoProvider",
			where: [{
				field: "providerId",
				value: providerId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!existingProvider) throw ctx.error("NOT_FOUND", { message: "SSO provider not found" });
		const updateBody = { providerId };
		if (domain && domain !== existingProvider.domain) updateBody.domain = domain;
		if (protocol === "SAML" && samlConfig) {
			const samlResult = await resolveSAMLConfig(samlConfig, providerId, ctx.context.baseURL, ctx);
			updateBody.issuer = samlResult.config.issuer ?? (samlConfig.entityId || `${ctx.context.baseURL}/sso/saml2/sp/metadata?providerId=${providerId}`);
			updateBody.samlConfig = samlResult.config;
		}
		if (protocol === "OIDC" && oidcConfig) {
			let effectiveOidcConfig = oidcConfig;
			if (!oidcConfig.clientSecret) {
				if (!existingProvider.oidcConfig) throw ctx.error("BAD_REQUEST", { message: "Client secret is required when updating an OIDC provider" });
				let existingOidc;
				try {
					existingOidc = JSON.parse(existingProvider.oidcConfig);
				} catch (parseError) {
					ctx.context.logger.debug("[Dash] Failed to parse existing OIDC config:", parseError);
					throw ctx.error("BAD_REQUEST", { message: "Client secret is required. Existing provider configuration is invalid." });
				}
				if (existingOidc.clientSecret) effectiveOidcConfig = {
					...oidcConfig,
					clientSecret: existingOidc.clientSecret
				};
				else throw ctx.error("BAD_REQUEST", { message: "Client secret is required. Existing provider has no client secret stored." });
			}
			const result = await resolveOIDCConfig(effectiveOidcConfig, domain, ctx);
			updateBody.issuer = result.issuer;
			updateBody.oidcConfig = result.config;
		}
		const providerUserId = existingProvider.userId;
		if (!providerUserId) throw ctx.error("BAD_REQUEST", { message: "SSO provider has no associated user. Cannot update via session." });
		try {
			const result = await ssoPlugin.endpoints.updateSSOProvider({
				body: updateBody,
				context: {
					...ctx.context,
					...buildSessionContext(providerUserId)
				}
			});
			return {
				success: true,
				provider: {
					id: existingProvider.id,
					providerId: result.providerId ?? existingProvider.providerId,
					domain: result.domain ?? domain
				}
			};
		} catch (e) {
			if (e instanceof APIError) throw e;
			ctx.context.logger.error("[Dash] Failed to update SSO provider:", e);
			throw ctx.error("BAD_REQUEST", { message: e instanceof Error ? e.message : "Failed to update SSO provider" });
		}
	});
};
var requestSsoVerificationToken = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-provider/request-verification-token", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ providerId: zod_default.string() })
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		requireOrganizationAccess(ctx);
		const ssoPlugin = getSSOPlugin(ctx);
		if (!ssoPlugin || !ssoPlugin.options?.domainVerification?.enabled) throw ctx.error("BAD_REQUEST", { message: "SSO plugin with domain verification is not enabled or feature is not supported in your plugin version" });
		const endpoints = ssoPlugin.endpoints;
		if (typeof endpoints.requestDomainVerification !== "function") throw ctx.error("BAD_REQUEST", { message: "SSO plugin with domain verification is not enabled or feature is not supported in your plugin version" });
		const organizationId = tryDecode(ctx.params.id);
		const { providerId } = ctx.body;
		const provider = await ctx.context.adapter.findOne({
			model: "ssoProvider",
			where: [{
				field: "providerId",
				value: providerId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!provider) throw ctx.error("NOT_FOUND", { message: "SSO provider not found" });
		const txtRecordName = `${ssoPlugin.options?.domainVerification?.tokenPrefix || "better-auth-token"}-${provider.providerId}`;
		try {
			const result = await endpoints.requestDomainVerification({
				body: { providerId },
				context: {
					...ctx.context,
					...buildSessionContext(provider.userId)
				}
			});
			return {
				success: true,
				providerId: provider.providerId,
				domain: provider.domain,
				verificationToken: result.domainVerificationToken ?? "",
				txtRecordName
			};
		} catch (e) {
			if (e instanceof APIError) throw e;
			ctx.context.logger.error("[Dash] Failed to request verification token:", e);
			throw ctx.error("BAD_REQUEST", { message: e instanceof Error ? e.message : "Failed to request verification token" });
		}
	});
};
var verifySsoProviderDomain = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-provider/verify-domain", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ providerId: zod_default.string() })
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		requireOrganizationAccess(ctx);
		const ssoPlugin = getSSOPlugin(ctx);
		if (!ssoPlugin || !ssoPlugin.options?.domainVerification?.enabled) throw ctx.error("BAD_REQUEST", { message: "SSO plugin with domain verification is not enabled or feature is not supported in your plugin version" });
		const dvEndpoints = ssoPlugin.endpoints;
		if (typeof dvEndpoints.verifyDomain !== "function") throw ctx.error("BAD_REQUEST", { message: "SSO plugin with domain verification is not enabled or feature is not supported in your plugin version" });
		const organizationId = tryDecode(ctx.params.id);
		const { providerId } = ctx.body;
		const provider = await ctx.context.adapter.findOne({
			model: "ssoProvider",
			where: [{
				field: "providerId",
				value: providerId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!provider) throw ctx.error("NOT_FOUND", { message: "SSO provider not found" });
		try {
			await dvEndpoints.verifyDomain({
				body: { providerId },
				context: {
					...ctx.context,
					...buildSessionContext(provider.userId)
				}
			});
			return {
				verified: true,
				message: "Domain ownership verified successfully"
			};
		} catch (e) {
			if (e instanceof APIError) {
				if (e.status === "CONFLICT") return {
					verified: true,
					message: "Domain has already been verified"
				};
				if (e.status === "BAD_GATEWAY") return {
					verified: false,
					message: "Unable to verify domain ownership. The TXT record was not found. It may take up to 48 hours for DNS changes to propagate."
				};
				throw e;
			}
			throw ctx.error("BAD_REQUEST", { message: e instanceof Error ? e.message : "Failed to verify domain" });
		}
	});
};
var deleteSsoProvider = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-provider/delete", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({ providerId: zod_default.string() })
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		requireOrganizationAccess(ctx);
		const ssoPlugin = getSSOPlugin(ctx);
		if (!ssoPlugin?.endpoints?.deleteSSOProvider) throw ctx.error("BAD_REQUEST", { message: "SSO plugin is not enabled or feature is not supported in your plugin version" });
		const organizationId = tryDecode(ctx.params.id);
		const { providerId } = ctx.body;
		const provider = await ctx.context.adapter.findOne({
			model: "ssoProvider",
			where: [{
				field: "providerId",
				value: providerId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!provider) throw ctx.error("NOT_FOUND", { message: "SSO provider not found" });
		try {
			await ssoPlugin.endpoints.deleteSSOProvider({
				body: { providerId },
				context: {
					...ctx.context,
					...buildSessionContext(provider.userId)
				}
			});
			return {
				success: true,
				message: "SSO provider deleted successfully"
			};
		} catch (e) {
			if (e instanceof APIError) throw e;
			ctx.context.logger.error("[Dash] Failed to delete SSO provider:", e);
			throw ctx.error("BAD_REQUEST", { message: e instanceof Error ? e.message : "Failed to delete SSO provider" });
		}
	});
};
var markSsoProviderDomainVerified = (options) => {
	return createAuthEndpoint("/dash/organization/:id/sso-provider/mark-domain-verified", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ organizationId: zod_default.string() }))],
		body: zod_default.object({
			providerId: zod_default.string(),
			verified: zod_default.boolean()
		})
	}, async (ctx) => {
		requireOrganizationPlugin(ctx);
		requireOrganizationAccess(ctx);
		if (!getSSOPlugin(ctx)?.options?.domainVerification?.enabled) throw ctx.error("BAD_REQUEST", { message: "SSO plugin with domain verification is not enabled or feature is not supported in your plugin version" });
		const organizationId = tryDecode(ctx.params.id);
		const { providerId, verified } = ctx.body;
		const provider = await ctx.context.adapter.findOne({
			model: "ssoProvider",
			where: [{
				field: "providerId",
				value: providerId
			}, {
				field: "organizationId",
				value: organizationId
			}]
		});
		if (!provider) throw ctx.error("NOT_FOUND", { message: "SSO provider not found" });
		await ctx.context.adapter.update({
			model: "ssoProvider",
			where: [{
				field: "providerId",
				value: provider.providerId
			}],
			update: { domainVerified: verified }
		});
		return {
			success: true,
			domainVerified: verified,
			message: verified ? "Domain marked as verified" : "Domain verification unmarked"
		};
	});
};
var enableTwoFactor = (options) => createAuthEndpoint("/dash/enable-two-factor", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const twoFactorPlugin = ctx.context.getPlugin("two-factor");
	if (!twoFactorPlugin) throw new APIError("BAD_REQUEST", { message: "Two-factor authentication plugin is not enabled" });
	if (await ctx.context.adapter.findOne({
		model: "twoFactor",
		where: [{
			field: "userId",
			value: userId
		}]
	})) throw new APIError("BAD_REQUEST", { message: "Two-factor authentication is already enabled for this user" });
	const { generateRandomString, symmetricEncrypt } = await import("./api-key+[...].mjs").then((n) => n.C);
	const secret = generateRandomString(32, "A-Z");
	const backupCodeAmount = 10;
	const backupCodeLength = 10;
	const backupCodes = [];
	for (let i = 0; i < backupCodeAmount; i++) backupCodes.push(generateId(backupCodeLength).toUpperCase());
	const encryptedSecret = await symmetricEncrypt({
		key: ctx.context.secret,
		data: secret
	});
	const encryptedBackupCodes = await symmetricEncrypt({
		key: ctx.context.secret,
		data: JSON.stringify(backupCodes)
	});
	await ctx.context.adapter.create({
		model: "twoFactor",
		data: {
			id: generateId(32),
			userId,
			secret: encryptedSecret,
			backupCodes: encryptedBackupCodes
		}
	});
	await ctx.context.internalAdapter.updateUser(userId, {
		twoFactorEnabled: true,
		updatedAt: /* @__PURE__ */ new Date()
	});
	const user = await ctx.context.internalAdapter.findUserById(userId);
	const issuer = twoFactorPlugin.options?.issuer || ctx.context.appName || "BetterAuth";
	return {
		success: true,
		totpURI: `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(user?.email || userId)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`,
		secret,
		backupCodes
	};
});
var viewTwoFactorTotpUri = (options) => createAuthEndpoint("/dash/view-two-factor-totp-uri", {
	method: "POST",
	metadata: { scope: "http" },
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const twoFactorPlugin = ctx.context.getPlugin("two-factor");
	if (!twoFactorPlugin) throw new APIError("BAD_REQUEST", { message: "Two-factor authentication plugin is not enabled" });
	const twoFactorRecord = await ctx.context.adapter.findOne({
		model: "twoFactor",
		where: [{
			field: "userId",
			value: userId
		}]
	});
	if (!twoFactorRecord) throw new APIError("NOT_FOUND", { message: "Two-factor authentication not set up for this user" });
	let secret = twoFactorRecord.secret;
	try {
		const { symmetricDecrypt } = await import("./api-key+[...].mjs").then((n) => n.C);
		secret = await symmetricDecrypt({
			key: ctx.context.secret,
			data: twoFactorRecord.secret
		});
	} catch {}
	const user = await ctx.context.internalAdapter.findUserById(userId);
	const issuer = twoFactorPlugin.options?.issuer || ctx.context.appName || "BetterAuth";
	return {
		totpURI: `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(user?.email || userId)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`,
		secret
	};
});
var viewBackupCodes = (options) => createAuthEndpoint("/dash/view-backup-codes", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const twoFactorRecord = await ctx.context.adapter.findOne({
		model: "twoFactor",
		where: [{
			field: "userId",
			value: userId
		}]
	});
	if (!twoFactorRecord) throw new APIError("NOT_FOUND", { message: "Two-factor authentication not set up for this user" });
	let backupCodes;
	try {
		backupCodes = JSON.parse(twoFactorRecord.backupCodes);
	} catch {
		try {
			const { symmetricDecrypt } = await import("./api-key+[...].mjs").then((n) => n.C);
			const decrypted = await symmetricDecrypt({
				key: ctx.context.secret,
				data: twoFactorRecord.backupCodes
			});
			backupCodes = JSON.parse(decrypted);
		} catch (decryptError) {
			ctx.context.logger.debug("[Dash] Failed to decrypt backup codes:", decryptError);
			throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to decrypt backup codes" });
		}
	}
	return { backupCodes };
});
var disableTwoFactor = (options) => createAuthEndpoint("/dash/disable-two-factor", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	if (!ctx.context.getPlugin("two-factor")) throw new APIError("BAD_REQUEST", { message: "Two-factor authentication is not enabled" });
	await ctx.context.adapter.delete({
		model: "twoFactor",
		where: [{
			field: "userId",
			value: userId
		}]
	});
	await ctx.context.internalAdapter.updateUser(userId, {
		twoFactorEnabled: false,
		updatedAt: /* @__PURE__ */ new Date()
	});
	return { success: true };
});
var generateBackupCodes = (options) => createAuthEndpoint("/dash/generate-backup-codes", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const twoFactorRecord = await ctx.context.adapter.findOne({
		model: "twoFactor",
		where: [{
			field: "userId",
			value: userId
		}]
	});
	if (!twoFactorRecord) throw new APIError("NOT_FOUND", { message: "Two-factor authentication not set up for this user" });
	const backupCodeAmount = 10;
	const backupCodeLength = 10;
	const newBackupCodes = [];
	for (let i = 0; i < backupCodeAmount; i++) newBackupCodes.push(generateId(backupCodeLength).toUpperCase());
	const { symmetricEncrypt } = await import("./api-key+[...].mjs").then((n) => n.C);
	const encryptedCodes = await symmetricEncrypt({
		key: ctx.context.secret,
		data: JSON.stringify(newBackupCodes)
	});
	await ctx.context.adapter.update({
		model: "twoFactor",
		where: [{
			field: "id",
			value: twoFactorRecord.id
		}],
		update: { backupCodes: encryptedCodes }
	});
	return { backupCodes: newBackupCodes };
});
function parseWhereClause(val) {
	if (!val) return [];
	const parsed = JSON.parse(val);
	if (!Array.isArray(parsed)) return [];
	return parsed;
}
var getUsersQuerySchema = zod_default.object({
	limit: zod_default.number().or(zod_default.string().transform(Number)).optional(),
	offset: zod_default.number().or(zod_default.string().transform(Number)).optional(),
	sortBy: zod_default.string().optional(),
	sortOrder: zod_default.enum(["asc", "desc"]).optional(),
	where: zod_default.string().transform(parseWhereClause).optional(),
	countWhere: zod_default.string().transform(parseWhereClause).optional()
}).optional();
var getUsers = (options) => {
	return createAuthEndpoint("/dash/list-users", {
		method: "GET",
		use: [jwtMiddleware(options)],
		query: getUsersQuerySchema
	}, async (ctx) => {
		const activityTrackingEnabled = (() => {
			if (!options.activityTracking?.enabled) return false;
			const fields = getAuthTables(ctx.context.options).user?.fields || {};
			if (!("lastActiveAt" in fields)) return false;
			if (fields.lastActiveAt.type !== "date") return false;
			return true;
		})();
		const where = ctx.query?.where?.length ? ctx.query.where : void 0;
		const countWhere = ctx.query?.countWhere?.length ? ctx.query.countWhere : void 0;
		const userQuery = ctx.context.adapter.findMany({
			model: "user",
			limit: ctx.query?.limit || 10,
			offset: ctx.query?.offset ? ctx.query.offset : 0,
			sortBy: {
				field: ctx.query?.sortBy || "createdAt",
				direction: ctx.query?.sortOrder || "desc"
			},
			where
		});
		const totalQuery = ctx.context.adapter.count({
			model: "user",
			where: countWhere
		});
		const onlineUsersQuery = activityTrackingEnabled ? ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "lastActiveAt",
				value: /* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 2),
				operator: "gte"
			}]
		}).catch((e) => {
			ctx.context.logger.error("[Dash] Failed to count online users:", e);
			return 0;
		}) : Promise.resolve(0);
		const [users, total, onlineUsers] = await Promise.all([
			userQuery,
			totalQuery,
			onlineUsersQuery
		]);
		const hasAdminPlugin = hasPlugin(ctx.context, "admin");
		return {
			users: users.map((user) => {
				const u = user;
				return {
					...u,
					banned: hasAdminPlugin ? u.banned ?? false : false,
					banReason: hasAdminPlugin ? u.banReason ?? null : null,
					banExpires: hasAdminPlugin ? u.banExpires ?? null : null
				};
			}),
			total,
			offset: ctx.query?.offset || 0,
			limit: ctx.query?.limit || 10,
			onlineUsers,
			activityTrackingEnabled
		};
	});
};
var exportUsers = (options) => {
	return createAuthEndpoint("/dash/export-users", {
		method: "GET",
		use: [jwtMiddleware(options)],
		query: getUsersQuerySchema
	}, async (ctx) => {
		const hasAdminPlugin = hasPlugin(ctx.context, "admin");
		return exportFactory({
			model: "user",
			limit: ctx.query?.limit,
			offset: ctx.query?.offset ? ctx.query.offset : 0,
			sortBy: {
				field: ctx.query?.sortBy || "createdAt",
				direction: ctx.query?.sortOrder || "desc"
			},
			where: ctx.query?.where
		}, { processRow: (u) => ({
			...u,
			banned: hasAdminPlugin ? u.banned ?? false : false,
			banReason: hasAdminPlugin ? u.banReason ?? null : null,
			banExpires: hasAdminPlugin ? u.banExpires ?? null : null
		}) })(ctx);
	});
};
var deleteUser = (options) => {
	return createAuthEndpoint("/dash/delete-user", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
	}, async (ctx) => {
		try {
			await ctx.context.adapter.delete({
				model: "user",
				where: [{
					field: "id",
					value: ctx.context.payload.userId
				}]
			});
		} catch (e) {
			ctx.context.logger.error("[Dash] Failed to delete user:", e);
			throw ctx.error("INTERNAL_SERVER_ERROR", { message: "Internal server error" });
		}
	});
};
var deleteManyUsers = (options) => {
	return createAuthEndpoint("/dash/delete-many-users", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ userIds: zod_default.string().array() }))]
	}, async (ctx) => {
		const { userIds } = ctx.context.payload;
		const deletedUserIds = /* @__PURE__ */ new Set();
		const skippedUserIds = /* @__PURE__ */ new Set();
		const start = performance.now();
		await withConcurrency(chunkArray(userIds), async (chunk) => {
			const where = [{
				field: "id",
				value: chunk,
				operator: "in"
			}];
			await ctx.context.adapter.deleteMany({
				model: "user",
				where
			});
			const remainingUsers = await ctx.context.adapter.findMany({
				model: "user",
				where
			});
			for (const id of chunk) if (!remainingUsers.some((u) => u.id === id)) deletedUserIds.add(id);
			else skippedUserIds.add(id);
		});
		const end = performance.now();
		console.log(`Time taken to bulk delete ${deletedUserIds.size} users: ${(end - start) / 1e3}s`, skippedUserIds.size > 0 ? `Failed: ${skippedUserIds.size}` : "");
		return ctx.json({
			success: deletedUserIds.size > 0,
			skippedUserIds: Array.from(skippedUserIds),
			deletedUserIds: Array.from(deletedUserIds)
		});
	});
};
var impersonateUser = (options) => {
	return createAuthEndpoint("/dash/impersonate-user", {
		method: "GET",
		query: zod_default.object({ impersonation_token: zod_default.string() }),
		use: [jwtMiddleware(options, zod_default.object({
			userId: zod_default.string(),
			redirectUrl: zod_default.url(),
			impersonatedBy: zod_default.string().optional()
		}), async (ctx) => {
			return ctx.query.impersonation_token;
		})]
	}, async (ctx) => {
		const { userId, redirectUrl, impersonatedBy } = ctx.context.payload;
		if (!(userId && redirectUrl)) throw ctx.error("BAD_REQUEST", { message: "Invalid token" });
		const session = await ctx.context.internalAdapter.createSession(userId, true, {
			expiresAt: new Date(Date.now() + 1e3 * 60 * 10),
			impersonatedBy: impersonatedBy || void 0
		});
		const user = await ctx.context.internalAdapter.findUserById(userId);
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		await setSessionCookie(ctx, {
			session,
			user
		}, true);
		throw ctx.redirect(redirectUrl);
	});
};
var createUser = (options) => {
	return createAuthEndpoint("/dash/create-user", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({
			organizationId: zod_default.string().optional(),
			organizationRole: zod_default.string().optional()
		}))],
		body: zod_default.looseObject({
			name: zod_default.string(),
			email: zod_default.email(),
			image: zod_default.string().optional(),
			password: zod_default.string().optional(),
			generatePassword: zod_default.boolean().optional(),
			emailVerified: zod_default.boolean().optional(),
			sendVerificationEmail: zod_default.boolean().optional(),
			sendOrganizationInvite: zod_default.boolean().optional(),
			organizationRole: zod_default.string().optional(),
			organizationId: zod_default.string().optional()
		})
	}, async (ctx) => {
		const userData = ctx.body;
		const email = normalizeEmail(userData.email, ctx.context);
		if (await ctx.context.internalAdapter.findUserByEmail(email)) throw new APIError("BAD_REQUEST", { message: "User with this email already exist" });
		let password = null;
		if (userData.generatePassword && !userData.password) password = generateId(12);
		else if (userData.password && userData.password.trim() !== "") password = userData.password;
		const userSchema = getAuthTables(ctx.context.options).user;
		for (const field in userSchema.fields || {}) {
			const value = userSchema.fields[field];
			let discoveredField = null;
			if (userData[field]) discoveredField = field;
			else if (value.fieldName && userData[value.fieldName]) discoveredField = value.fieldName;
			if (discoveredField) {
				const data = userData[discoveredField];
				if (typeof value.type === "string" && value.type.endsWith("[]") && typeof data === "string") try {
					userData[discoveredField] = JSON.parse(data);
				} catch (parseError) {
					ctx.context.logger.debug("[Dash] Malformed array field, JSON parse failed:", parseError);
					throw new APIError("BAD_REQUEST", { message: `Malformed array field: ${discoveredField}` });
				}
			}
		}
		const user = await ctx.context.internalAdapter.createUser({
			...userData,
			email,
			emailVerified: userData.emailVerified,
			createdAt: /* @__PURE__ */ new Date(),
			updatedAt: /* @__PURE__ */ new Date()
		});
		if (password) await ctx.context.internalAdapter.createAccount({
			userId: user.id,
			providerId: "credential",
			accountId: user.id,
			password: await ctx.context.password.hash(password)
		});
		if (userData.sendVerificationEmail && !userData.emailVerified) {
			if (ctx.context.options.emailVerification?.sendVerificationEmail) await sendVerificationEmailFn(ctx, user);
		}
		const organizationId = ctx.context.payload?.organizationId || userData.organizationId;
		const organizationRole = ctx.context.payload?.organizationRole || userData.organizationRole;
		if (organizationId) {
			const orgOptions = requireOrganizationPlugin(ctx).options || {};
			const role = organizationRole || "member";
			const organization = await ctx.context.adapter.findOne({
				model: "organization",
				where: [{
					field: "id",
					value: organizationId
				}]
			});
			if (organization) {
				let memberData = {
					organizationId,
					userId: user.id,
					role,
					createdAt: /* @__PURE__ */ new Date()
				};
				if (orgOptions?.organizationHooks?.beforeAddMember) {
					const response = await orgOptions.organizationHooks.beforeAddMember({
						member: memberData,
						user,
						organization
					});
					if (response && typeof response === "object" && "data" in response) memberData = {
						...memberData,
						...response.data
					};
				}
				const member = await ctx.context.adapter.create({
					model: "member",
					data: memberData
				});
				if (orgOptions?.organizationHooks?.afterAddMember) await orgOptions.organizationHooks.afterAddMember({
					member,
					user,
					organization
				});
			}
		}
		return user;
	});
};
var setPassword = (options) => {
	return createAuthEndpoint("/dash/set-password", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
		body: zod_default.object({ password: zod_default.string().min(8) })
	}, async (ctx) => {
		const { userId } = ctx.context.payload;
		const { password } = ctx.body;
		if (!userId) throw new APIError("FORBIDDEN", { message: "Invalid payload" });
		const hashed = await ctx.context.password.hash(password);
		const credential = (await ctx.context.internalAdapter.findAccounts(userId)).find((a) => a.providerId === "credential");
		if (credential) await ctx.context.internalAdapter.updateAccount(credential.id, {
			password: hashed,
			updatedAt: /* @__PURE__ */ new Date()
		});
		else await ctx.context.internalAdapter.createAccount({
			userId,
			providerId: "credential",
			accountId: userId,
			password: hashed
		});
		return { success: true };
	});
};
var unlinkAccount = (options) => {
	return createAuthEndpoint("/dash/unlink-account", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
		body: zod_default.object({
			providerId: zod_default.string(),
			accountId: zod_default.string().optional()
		})
	}, async (ctx) => {
		const { userId } = ctx.context.payload;
		const { providerId, accountId } = ctx.body;
		if (!userId) throw new APIError("BAD_REQUEST", { message: "Invalid payload" });
		const accounts = await ctx.context.internalAdapter.findAccounts(userId);
		const allowUnlinkingAll = ctx.context.options.account?.accountLinking?.allowUnlinkingAll ?? false;
		if (accounts.length === 1 && !allowUnlinkingAll) throw new APIError("BAD_REQUEST", { message: "Cannot unlink the last account. This would lock the user out." });
		const accountToUnlink = accounts.find((account) => accountId ? account.accountId === accountId && account.providerId === providerId : account.providerId === providerId);
		if (!accountToUnlink) throw new APIError("NOT_FOUND", { message: "Account not found" });
		await ctx.context.internalAdapter.deleteAccount(accountToUnlink.id);
		return { success: true };
	});
};
var getUserDetails = (options) => {
	return createAuthEndpoint("/dash/user", {
		method: "GET",
		use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
		query: zod_default.object({ minimal: zod_default.boolean().or(zod_default.string().transform((val) => val === "true")).optional() }).optional()
	}, async (ctx) => {
		const { userId } = ctx.context.payload;
		const minimal = !!ctx.query?.minimal;
		const hasAdminPlugin = hasPlugin(ctx.context, "admin");
		const secondaryStorageOnly = isSessionInSecondaryStorageOnly(ctx.context);
		const user = await ctx.context.adapter.findOne({
			model: "user",
			where: [{
				field: "id",
				value: userId
			}],
			...minimal ? {} : { join: {
				account: true,
				...secondaryStorageOnly ? {} : { session: true }
			} }
		});
		if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
		if (minimal) return {
			...user,
			lastActiveAt: user.lastActiveAt ?? null,
			banned: hasAdminPlugin ? user.banned ?? false : false,
			banReason: hasAdminPlugin ? user.banReason ?? null : null,
			banExpires: hasAdminPlugin ? user.banExpires ?? null : null,
			account: [],
			session: []
		};
		const activityTrackingEnabled = !!options.activityTracking?.enabled;
		const sessions = secondaryStorageOnly ? await ctx.context.internalAdapter.listSessions(userId) : user.session || [];
		let lastActiveAt = null;
		if (activityTrackingEnabled) {
			lastActiveAt = user.lastActiveAt ?? null;
			let shouldUpdateLastActiveAt = false;
			if (sessions.length > 0) {
				const mostRecentSession = [...sessions].sort((a, b) => {
					const aTime = new Date(a.updatedAt || a.createdAt).getTime();
					return new Date(b.updatedAt || b.createdAt).getTime() - aTime;
				})[0];
				if (!lastActiveAt && mostRecentSession) {
					lastActiveAt = new Date(mostRecentSession.updatedAt || mostRecentSession.createdAt);
					shouldUpdateLastActiveAt = true;
				}
			}
			if (shouldUpdateLastActiveAt && lastActiveAt) {
				const updateActivity = async () => {
					try {
						await ctx.context.internalAdapter.updateUser(userId, {
							lastActiveAt,
							updatedAt: /* @__PURE__ */ new Date()
						});
					} catch (error) {
						ctx.context.logger.error("[Dash] Failed to update user lastActiveAt:", error);
					}
				};
				updateActivity();
			}
		}
		return {
			...user,
			...secondaryStorageOnly ? { session: sessions } : {},
			lastActiveAt,
			banned: hasAdminPlugin ? user.banned ?? false : false,
			banReason: hasAdminPlugin ? user.banReason ?? null : null,
			banExpires: hasAdminPlugin ? user.banExpires ?? null : null
		};
	});
};
var getUserOrganizations = (options) => {
	return createAuthEndpoint("/dash/user-organizations", {
		method: "GET",
		use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
	}, async (ctx) => {
		const { userId } = ctx.context.payload;
		if (!isOrganizationEnabled(ctx)) {
			ctx.context.logger.warn("[Dash] Organization plugin not enabled, returning empty user organizations");
			return { organizations: [] };
		}
		const isTeamEnabled = ctx.context.getPlugin("organization").options?.teams?.enabled;
		const [membersWithOrg, teamMembersWithTeam] = await Promise.all([ctx.context.adapter.findMany({
			model: "member",
			where: [{
				field: "userId",
				value: userId
			}],
			join: { organization: true }
		}), isTeamEnabled ? ctx.context.adapter.findMany({
			model: "teamMember",
			where: [{
				field: "userId",
				value: userId
			}],
			join: { team: true }
		}).catch((e) => {
			ctx.context.logger.error("[Dash] Failed to fetch team members:", e);
			return [];
		}) : Promise.resolve([])]);
		if (membersWithOrg.length === 0) return { organizations: [] };
		const teams = teamMembersWithTeam.map((tm) => Array.isArray(tm.team) ? tm.team[0] : tm.team).filter((t) => t != null);
		return { organizations: membersWithOrg.map((m) => {
			const organization = Array.isArray(m.organization) ? m.organization[0] : m.organization;
			if (!organization) return null;
			return {
				id: organization.id,
				name: organization.name,
				logo: organization.logo,
				createdAt: organization.createdAt,
				slug: organization.slug,
				role: m.role,
				teams: teams.filter((team) => team.organizationId === organization.id)
			};
		}).filter((row) => row != null) };
	});
};
var updateUser = (options) => createAuthEndpoint("/dash/update-user", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
	body: zod_default.looseObject({
		name: zod_default.string().optional(),
		email: zod_default.email().optional(),
		image: zod_default.string().optional(),
		emailVerified: zod_default.boolean().optional()
	})
}, async (ctx) => {
	const updateData = ctx.body;
	const userId = ctx.context.payload?.userId;
	if (!userId) throw new APIError("FORBIDDEN", { message: "Invalid payload" });
	const filteredData = Object.fromEntries(Object.entries(updateData).filter(([, value]) => value !== void 0));
	if (Object.keys(filteredData).length === 0) throw new APIError("BAD_REQUEST", { message: "No valid fields to update" });
	const user = await ctx.context.internalAdapter.updateUser(userId, {
		...filteredData,
		updatedAt: /* @__PURE__ */ new Date()
	});
	if (!user) throw new APIError("NOT_FOUND", { message: "User not found" });
	return user;
});
async function countUniqueActiveUsers(ctx, range, options) {
	const field = options.activityTrackingEnabled ? "lastActiveAt" : "updatedAt";
	const where = [{
		field,
		operator: "gte",
		value: range.from
	}];
	if (range.to !== void 0) where.push({
		field,
		operator: "lt",
		value: range.to
	});
	if (options.activityTrackingEnabled) return ctx.context.adapter.count({
		model: "user",
		where
	});
	if (options.storeInSecondaryStorageOnly) {
		const users = await ctx.context.adapter.findMany({
			model: "user",
			select: ["id"]
		});
		const fromMs = range.from.getTime();
		const toMs = range.to?.getTime();
		const activeUserIds = /* @__PURE__ */ new Set();
		await withConcurrency(users, async (user) => {
			const sessions = await ctx.context.internalAdapter.listSessions(user.id);
			for (const session of sessions) {
				const updatedAt = new Date(session.updatedAt).getTime();
				if (updatedAt >= fromMs && (toMs === void 0 || updatedAt < toMs)) {
					activeUserIds.add(user.id);
					break;
				}
			}
		}, { concurrency: 10 });
		return activeUserIds.size;
	}
	const sessions = await ctx.context.adapter.findMany({
		model: "session",
		select: ["userId"],
		where
	});
	return new Set(sessions.map((s) => s.userId)).size;
}
function optionalQuery(ctx, label, getCount) {
	return async function runQuery() {
		try {
			return {
				ok: true,
				value: await getCount()
			};
		} catch (error) {
			ctx.context.logger.warn(`[Dash] User stats query "${label}" failed`, error);
			return {
				ok: false,
				value: null
			};
		}
	};
}
function signUpPeriod(current, previous, calculatePercentage) {
	return {
		signUps: current.ok ? current.value : null,
		percentage: current.ok && previous.ok ? calculatePercentage(current.value, previous.value) : null
	};
}
function activePeriod(current, previous, calculatePercentage) {
	return {
		active: current.ok ? current.value : null,
		percentage: current.ok && previous.ok ? calculatePercentage(current.value, previous.value) : null
	};
}
var getUserStats = (options) => createAuthEndpoint("/dash/user-stats", {
	method: "GET",
	use: [jwtMiddleware(options)]
}, async (ctx) => {
	const now = /* @__PURE__ */ new Date();
	const oneDayAgo = /* @__PURE__ */ new Date(now.getTime() - 1440 * 60 * 1e3);
	const twoDaysAgo = /* @__PURE__ */ new Date(now.getTime() - 2880 * 60 * 1e3);
	const oneWeekAgo = /* @__PURE__ */ new Date(now.getTime() - 10080 * 60 * 1e3);
	const twoWeeksAgo = /* @__PURE__ */ new Date(now.getTime() - 336 * 60 * 60 * 1e3);
	const oneMonthAgo = /* @__PURE__ */ new Date(now.getTime() - 720 * 60 * 60 * 1e3);
	const twoMonthsAgo = /* @__PURE__ */ new Date(now.getTime() - 1440 * 60 * 60 * 1e3);
	const activityTrackingEnabled = !!options.activityTracking?.enabled;
	const storeInSecondaryStorageOnly = isSessionInSecondaryStorageOnly(ctx.context);
	const [rDailySignups, rPrevDaySignups, rWeeklySignups, rPrevWeekSignups, rMonthlySignups, rPrevMonthSignups, rTotalUsers, rActiveDaily, rActivePrevDay, rActiveWeekly, rActivePrevWeek, rActiveMonthly, rActivePrevMonth] = await withConcurrency([
		optionalQuery(ctx, "daily signups", () => ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gte",
				value: oneDayAgo
			}]
		})),
		optionalQuery(ctx, "previous day signups", () => ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gte",
				value: twoDaysAgo
			}, {
				field: "createdAt",
				operator: "lt",
				value: oneDayAgo
			}]
		})),
		optionalQuery(ctx, "weekly signups", () => ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gte",
				value: oneWeekAgo
			}]
		})),
		optionalQuery(ctx, "previous week signups", () => ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gte",
				value: twoWeeksAgo
			}, {
				field: "createdAt",
				operator: "lt",
				value: oneWeekAgo
			}]
		})),
		optionalQuery(ctx, "monthly signups", () => ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gte",
				value: oneMonthAgo
			}]
		})),
		optionalQuery(ctx, "previous month signups", () => ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gte",
				value: twoMonthsAgo
			}, {
				field: "createdAt",
				operator: "lt",
				value: oneMonthAgo
			}]
		})),
		optionalQuery(ctx, "total users", () => ctx.context.adapter.count({ model: "user" })),
		optionalQuery(ctx, "active users (daily window)", () => countUniqueActiveUsers(ctx, { from: oneDayAgo }, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		})),
		optionalQuery(ctx, "active users (previous day window)", () => countUniqueActiveUsers(ctx, {
			from: twoDaysAgo,
			to: oneDayAgo
		}, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		})),
		optionalQuery(ctx, "active users (weekly window)", () => countUniqueActiveUsers(ctx, { from: oneWeekAgo }, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		})),
		optionalQuery(ctx, "active users (previous week window)", () => countUniqueActiveUsers(ctx, {
			from: twoWeeksAgo,
			to: oneWeekAgo
		}, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		})),
		optionalQuery(ctx, "active users (monthly window)", () => countUniqueActiveUsers(ctx, { from: oneMonthAgo }, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		})),
		optionalQuery(ctx, "active users (previous month window)", () => countUniqueActiveUsers(ctx, {
			from: twoMonthsAgo,
			to: oneMonthAgo
		}, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		}))
	], (fn) => fn(), { concurrency: 5 });
	const calculatePercentage = (current, previous) => {
		if (previous === 0) return current > 0 ? 100 : 0;
		return (current - previous) / previous * 100;
	};
	const degraded = [
		rDailySignups,
		rPrevDaySignups,
		rWeeklySignups,
		rPrevWeekSignups,
		rMonthlySignups,
		rPrevMonthSignups,
		rTotalUsers,
		rActiveDaily,
		rActivePrevDay,
		rActiveWeekly,
		rActivePrevWeek,
		rActiveMonthly,
		rActivePrevMonth
	].some((r) => !r.ok);
	const body = {
		daily: signUpPeriod(rDailySignups, rPrevDaySignups, calculatePercentage),
		weekly: signUpPeriod(rWeeklySignups, rPrevWeekSignups, calculatePercentage),
		monthly: signUpPeriod(rMonthlySignups, rPrevMonthSignups, calculatePercentage),
		total: rTotalUsers.ok ? rTotalUsers.value : null,
		activeUsers: {
			daily: activePeriod(rActiveDaily, rActivePrevDay, calculatePercentage),
			weekly: activePeriod(rActiveWeekly, rActivePrevWeek, calculatePercentage),
			monthly: activePeriod(rActiveMonthly, rActivePrevMonth, calculatePercentage)
		}
	};
	if (degraded) body.degraded = true;
	return body;
});
var getUserGraphData = (options) => createAuthEndpoint("/dash/user-graph-data", {
	method: "GET",
	use: [jwtMiddleware(options)],
	query: zod_default.object({ period: zod_default.enum([
		"daily",
		"weekly",
		"monthly"
	]).default("daily") })
}, async (ctx) => {
	const { period } = ctx.query;
	const now = /* @__PURE__ */ new Date();
	const activityTrackingEnabled = !!options.activityTracking?.enabled;
	const storeInSecondaryStorageOnly = isSessionInSecondaryStorageOnly(ctx.context);
	const intervals = period === "daily" ? 7 : period === "weekly" ? 8 : 6;
	const msPerInterval = period === "daily" ? 1440 * 60 * 1e3 : period === "weekly" ? 10080 * 60 * 1e3 : 720 * 60 * 60 * 1e3;
	const intervalData = [];
	for (let i = intervals - 1; i >= 0; i--) {
		const endDate = new Date(now.getTime() - i * msPerInterval);
		const startDate = new Date(endDate.getTime() - msPerInterval);
		let label;
		if (period === "daily") label = endDate.toLocaleDateString("en-US", { weekday: "short" });
		else if (period === "weekly") label = endDate.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		});
		else label = endDate.toLocaleDateString("en-US", { month: "short" });
		intervalData.push({
			startDate,
			endDate,
			label
		});
	}
	const allQueries = intervalData.flatMap((interval) => [
		ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "lte",
				value: interval.endDate
			}]
		}),
		ctx.context.adapter.count({
			model: "user",
			where: [{
				field: "createdAt",
				operator: "gt",
				value: interval.startDate
			}, {
				field: "createdAt",
				operator: "lte",
				value: interval.endDate
			}]
		}),
		countUniqueActiveUsers(ctx, {
			from: interval.startDate,
			to: interval.endDate
		}, {
			storeInSecondaryStorageOnly,
			activityTrackingEnabled
		})
	]);
	const results = await Promise.all(allQueries);
	return {
		data: intervalData.map((interval, idx) => ({
			date: typeof interval.endDate === "object" ? interval.endDate : interval.endDate,
			label: interval.label,
			totalUsers: results[idx * 3] ?? 0,
			newUsers: results[idx * 3 + 1] ?? 0,
			activeUsers: results[idx * 3 + 2] ?? 0
		})),
		period
	};
});
var getUserRetentionData = (options) => createAuthEndpoint("/dash/user-retention-data", {
	method: "GET",
	use: [jwtMiddleware(options)],
	query: zod_default.object({ period: zod_default.enum([
		"daily",
		"weekly",
		"monthly"
	]).default("weekly") })
}, async (ctx) => {
	/**
	* Professional cohort retention (calendar-aligned, UTC):
	*
	* D-N retention:
	*   users created during Day(-N) who are active during "today"
	*
	* W-N retention:
	*   users created during Week(-N) who are active during "this week"
	*
	* M-N retention:
	*   users created during Month(-N) who are active during "this month"
	*
	* Active: user.lastActiveAt when activity tracking enabled, else session.updatedAt.
	*/
	const { period } = ctx.query;
	const activityTrackingEnabled = !!options.activityTracking?.enabled;
	const secondaryOnly = isSessionInSecondaryStorageOnly(ctx.context);
	const now = /* @__PURE__ */ new Date();
	const startOfUtcDay = (d) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
	const startOfUtcMonth = (d) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
	const startOfUtcWeek = (d) => {
		const day = d.getUTCDay();
		const diff = day === 0 ? -6 : 1 - day;
		const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
		monday.setUTCDate(monday.getUTCDate() + diff);
		return monday;
	};
	const addUtcDays = (d, days) => {
		const nd = new Date(d);
		nd.setUTCDate(nd.getUTCDate() + days);
		return nd;
	};
	const addUtcMonths = (d, months) => {
		const nd = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
		nd.setUTCMonth(nd.getUTCMonth() + months);
		return nd;
	};
	const horizons = period === "daily" ? 7 : period === "weekly" ? 8 : 6;
	const activeStart = period === "daily" ? startOfUtcDay(now) : period === "weekly" ? startOfUtcWeek(now) : startOfUtcMonth(now);
	const activeEnd = period === "daily" ? addUtcDays(activeStart, 1) : period === "weekly" ? addUtcDays(activeStart, 7) : addUtcMonths(activeStart, 1);
	const prefix = period === "daily" ? "D" : period === "weekly" ? "W" : "M";
	const data = [];
	for (let n = 1; n <= horizons; n++) {
		const cohortStart = period === "daily" ? addUtcDays(activeStart, -n) : period === "weekly" ? addUtcDays(activeStart, -7 * n) : addUtcMonths(activeStart, -n);
		const cohortEnd = period === "daily" ? addUtcDays(cohortStart, 1) : period === "weekly" ? addUtcDays(cohortStart, 7) : addUtcMonths(cohortStart, 1);
		const cohortUsers = await ctx.context.adapter.findMany({
			model: "user",
			select: ["id"],
			where: [{
				field: "createdAt",
				operator: "gte",
				value: cohortStart
			}, {
				field: "createdAt",
				operator: "lt",
				value: cohortEnd
			}]
		});
		const cohortSize = cohortUsers.length;
		if (cohortSize === 0) {
			data.push({
				n,
				label: `${prefix}${n}`,
				cohortStart: cohortStart.toISOString(),
				cohortEnd: cohortEnd.toISOString(),
				activeStart: activeStart.toISOString(),
				activeEnd: activeEnd.toISOString(),
				cohortSize: 0,
				retained: 0,
				retentionRate: 0
			});
			continue;
		}
		const cohortUserIds = cohortUsers.map((u) => u.id);
		let retained;
		if (activityTrackingEnabled) retained = await ctx.context.adapter.count({
			model: "user",
			where: [
				{
					field: "id",
					operator: "in",
					value: cohortUserIds
				},
				{
					field: "lastActiveAt",
					operator: "gte",
					value: activeStart
				},
				{
					field: "lastActiveAt",
					operator: "lt",
					value: activeEnd
				}
			]
		}).catch((error) => {
			ctx.context.logger.warn("[Dash] Failed to count retained users by lastActiveAt:", error);
			return 0;
		});
		else if (secondaryOnly) {
			const activeStartMs = activeStart.getTime();
			const activeEndMs = activeEnd.getTime();
			const retainedUsers = /* @__PURE__ */ new Set();
			await withConcurrency(cohortUserIds, async (userId) => {
				const sessions = await ctx.context.internalAdapter.listSessions(userId);
				for (const session of sessions) {
					const updatedAt = new Date(session.updatedAt).getTime();
					if (updatedAt >= activeStartMs && updatedAt < activeEndMs) {
						retainedUsers.add(userId);
						break;
					}
				}
			}, { concurrency: 50 });
			retained = retainedUsers.size;
		} else {
			const sessionsInActiveWindow = await ctx.context.adapter.findMany({
				model: "session",
				select: ["userId"],
				where: [
					{
						field: "userId",
						operator: "in",
						value: cohortUserIds
					},
					{
						field: "updatedAt",
						operator: "gte",
						value: activeStart
					},
					{
						field: "updatedAt",
						operator: "lt",
						value: activeEnd
					}
				]
			}).catch((error) => {
				ctx.context.logger.warn("[Dash] Failed to fetch cohort sessions:", error);
				return [];
			});
			retained = new Set(sessionsInActiveWindow.map((s) => s.userId)).size;
		}
		const retentionRate = cohortSize > 0 ? Math.round(retained / cohortSize * 100 * 10) / 10 : 0;
		data.push({
			n,
			label: `${prefix}${n}`,
			cohortStart: cohortStart.toISOString(),
			cohortEnd: cohortEnd.toISOString(),
			activeStart: activeStart.toISOString(),
			activeEnd: activeEnd.toISOString(),
			cohortSize,
			retained,
			retentionRate
		});
	}
	return {
		data,
		period
	};
});
var banUser = (options) => createAuthEndpoint("/dash/ban-user", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
	body: zod_default.object({
		banReason: zod_default.string().optional(),
		banExpires: zod_default.number().optional()
	})
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const { banReason, banExpires } = ctx.body;
	if (!await ctx.context.internalAdapter.findUserById(userId)) throw new APIError("NOT_FOUND", { message: "User not found" });
	await ctx.context.internalAdapter.updateUser(userId, {
		banned: true,
		banReason: banReason || null,
		banExpires: banExpires ? new Date(banExpires) : null,
		updatedAt: /* @__PURE__ */ new Date()
	});
	await ctx.context.internalAdapter.deleteSessions(userId);
	return { success: true };
});
var banManyUsers = (options) => {
	return createAuthEndpoint("/dash/ban-many-users", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ userIds: zod_default.string().array() }))],
		body: zod_default.object({
			banReason: zod_default.string().optional(),
			banExpires: zod_default.number().optional()
		})
	}, async (ctx) => {
		const { userIds } = ctx.context.payload;
		const { banReason, banExpires } = ctx.body;
		const start = performance.now();
		await withConcurrency(chunkArray(userIds, { batchSize: 50 }), async (chunk) => {
			await ctx.context.adapter.updateMany({
				model: "user",
				where: [{
					field: "id",
					value: chunk,
					operator: "in"
				}],
				update: {
					banned: true,
					banReason: banReason || null,
					banExpires: banExpires ? new Date(banExpires) : null
				}
			});
		}, { concurrency: 3 });
		const skippedUserIds = (await ctx.context.adapter.findMany({
			model: "user",
			where: [{
				field: "id",
				value: userIds,
				operator: "in",
				connector: "AND"
			}, {
				field: "banned",
				value: false,
				operator: "eq"
			}],
			select: ["id"]
		})).map((u) => u.id);
		const bannedUserIds = userIds.filter((id) => !skippedUserIds.includes(id));
		const end = performance.now();
		console.log(`Time taken to ban ${bannedUserIds.length} users: ${(end - start) / 1e3}s`, skippedUserIds.length > 0 ? `Skipped: ${skippedUserIds.length}` : "");
		return ctx.json({
			success: bannedUserIds.length > 0,
			bannedUserIds,
			skippedUserIds
		});
	});
};
var unbanUser = (options) => createAuthEndpoint("/dash/unban-user", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))]
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	if (!await ctx.context.internalAdapter.findUserById(userId)) throw new APIError("NOT_FOUND", { message: "User not found" });
	await ctx.context.internalAdapter.updateUser(userId, {
		banned: false,
		banReason: null,
		banExpires: null,
		updatedAt: /* @__PURE__ */ new Date()
	});
	return { success: true };
});
var sendVerificationEmail = (options) => createAuthEndpoint("/dash/send-verification-email", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
	body: zod_default.object({ callbackUrl: zod_default.url() })
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const { callbackUrl } = ctx.body;
	const user = await ctx.context.internalAdapter.findUserById(userId);
	if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
	if (user.emailVerified) throw ctx.error("BAD_REQUEST", { message: "Email is already verified" });
	if (!user.email) throw ctx.error("BAD_REQUEST", { message: "User has no associated email address" });
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) throw ctx.error("BAD_REQUEST", { message: "Email verification is not enabled" });
	await sendVerificationEmailFn({
		...ctx,
		body: {
			...ctx.body,
			callbackURL: callbackUrl
		}
	}, user);
	return { success: true };
});
var sendManyVerificationEmails = (options) => {
	return createAuthEndpoint("/dash/send-many-verification-emails", {
		method: "POST",
		use: [jwtMiddleware(options, zod_default.object({ userIds: zod_default.string().array() }))],
		body: zod_default.object({ callbackUrl: zod_default.url() })
	}, async (ctx) => {
		if (!ctx.context.options.emailVerification?.sendVerificationEmail) throw ctx.error("BAD_REQUEST", { message: "Email verification is not enabled" });
		const { userIds } = ctx.context.payload;
		const { callbackUrl } = ctx.body;
		const sentEmailUserIds = /* @__PURE__ */ new Set();
		const skippedEmailUserIds = /* @__PURE__ */ new Set();
		const start = performance.now();
		await withConcurrency(chunkArray(userIds, { batchSize: 20 }), async (chunk) => {
			const users = await ctx.context.adapter.findMany({
				model: "user",
				where: [{
					field: "id",
					value: chunk,
					operator: "in"
				}, {
					field: "emailVerified",
					value: false
				}]
			});
			if (chunk.length - users.length > 0) for (const id of chunk.filter((id) => !users.some((u) => u.id === id))) skippedEmailUserIds.add(id);
			for (const result of await Promise.allSettled(users.map(async (user) => {
				if (!user.email) return {
					success: false,
					id: user.id
				};
				try {
					await sendVerificationEmailFn({
						...ctx,
						body: {
							...ctx.body,
							callbackURL: callbackUrl
						}
					}, user);
				} catch {
					return {
						success: false,
						id: user.id
					};
				}
				return {
					success: true,
					id: user.id
				};
			}))) if (result.status === "fulfilled") if (result.value.success) sentEmailUserIds.add(result.value.id);
			else skippedEmailUserIds.add(result.value.id);
			else for (const { id } of users) skippedEmailUserIds.add(id);
		}, { concurrency: 2 });
		const end = performance.now();
		console.log(`Time taken to send verification emails to ${sentEmailUserIds.size} users: ${Math.round((end - start) / 1e3)}s`, skippedEmailUserIds.size > 0 ? `Skipped: ${skippedEmailUserIds.size}` : "");
		return ctx.json({
			success: sentEmailUserIds.size > 0,
			sentEmailUserIds: Array.from(sentEmailUserIds),
			skippedEmailUserIds: Array.from(skippedEmailUserIds)
		});
	});
};
var sendResetPasswordEmail = (options) => createAuthEndpoint("/dash/send-reset-password-email", {
	method: "POST",
	use: [jwtMiddleware(options, zod_default.object({ userId: zod_default.string() }))],
	body: zod_default.object({ callbackUrl: zod_default.url() })
}, async (ctx) => {
	const { userId } = ctx.context.payload;
	const user = await ctx.context.internalAdapter.findUserById(userId);
	if (!user) throw ctx.error("NOT_FOUND", { message: "User not found" });
	if (!user.email) throw ctx.error("BAD_REQUEST", { message: "User has no associated email address" });
	ctx.body.redirectTo = ctx.body.callbackUrl;
	ctx.body.email = user.email;
	return await requestPasswordReset(ctx);
});
var dash = (options) => {
	const processedBulkOperationContexts = /* @__PURE__ */ new WeakSet();
	const opts = resolveDashOptions(options);
	const $api = createAPI(opts);
	const settings = {
		...opts,
		$api
	};
	const $kv = createKV(opts);
	const activityUpdateInterval = opts.activityTracking?.updateInterval ?? 3e5;
	const { tracker } = initTrackEvents($api);
	const { trackUserSignedUp, trackUserProfileUpdated, trackUserProfileImageUpdated, trackUserEmailVerified, trackUserBanned, trackUserUnBanned, trackUserDeleted } = initUserEvents(tracker);
	const { trackEmailVerificationSent, trackEmailSignInAttempt, trackUserSignedIn, trackUserSignedOut, trackSessionCreated, trackSocialSignInAttempt, trackSocialSignInRedirectionAttempt, trackUserImpersonated, trackUserImpersonationStop, trackSessionRevoked, trackSessionRevokedAll } = initSessionEvents(tracker);
	const { trackAccountLinking, trackAccountUnlink, trackAccountPasswordChange } = initAccountEvents(tracker);
	const { trackPasswordResetRequest, trackPasswordResetRequestCompletion } = initVerificationEvents(tracker);
	const { trackOrganizationCreated, trackOrganizationUpdated } = initOrganizationEvents(tracker);
	const { trackOrganizationTeamCreated, trackOrganizationTeamUpdated, trackOrganizationTeamDeleted, trackOrganizationTeamMemberAdded, trackOrganizationTeamMemberRemoved } = initTeamEvents(tracker);
	const { trackOrganizationMemberAdded, trackOrganizationMemberRemoved, trackOrganizationMemberRoleUpdated } = initMemberEvents(tracker);
	const { trackOrganizationMemberInvited, trackOrganizationMemberInviteAccepted, trackOrganizationMemberInviteCanceled, trackOrganizationMemberInviteRejected } = initInvitationEvents(tracker);
	return {
		id: "dash",
		options: opts,
		version: PLUGIN_VERSION,
		init(ctx) {
			const organizationPlugin = ctx.getPlugin("organization");
			if (organizationPlugin) {
				const instrumentOrganizationHooks = (organizationPluginOptions) => {
					const organizationHooks = organizationPluginOptions.organizationHooks = organizationPluginOptions.organizationHooks ?? {};
					const afterCreateOrganization = organizationHooks.afterCreateOrganization;
					organizationHooks.afterCreateOrganization = async (...args) => {
						const [{ organization, user }] = args;
						trackOrganizationCreated(organization, getOrganizationTriggerInfo(user));
						if (afterCreateOrganization) return afterCreateOrganization(...args);
					};
					const afterUpdateOrganization = organizationHooks.afterUpdateOrganization;
					organizationHooks.afterUpdateOrganization = async (...args) => {
						const [{ organization, user }] = args;
						if (organization) trackOrganizationUpdated(organization, getOrganizationTriggerInfo(user));
						if (afterUpdateOrganization) return afterUpdateOrganization(...args);
					};
					const afterAddMember = organizationHooks.afterAddMember;
					organizationHooks.afterAddMember = async (...args) => {
						const [{ organization, member, user }] = args;
						trackOrganizationMemberAdded(organization, member, user, getOrganizationTriggerInfo(user));
						if (afterAddMember) return afterAddMember(...args);
					};
					const afterRemoveMember = organizationHooks.afterRemoveMember;
					organizationHooks.afterRemoveMember = async (...args) => {
						const [{ organization, member, user }] = args;
						trackOrganizationMemberRemoved(organization, member, user, getOrganizationTriggerInfo(user));
						if (afterRemoveMember) return afterRemoveMember(...args);
					};
					const afterUpdateMemberRole = organizationHooks.afterUpdateMemberRole;
					organizationHooks.afterUpdateMemberRole = async (...args) => {
						const [{ organization, member, user, previousRole }] = args;
						trackOrganizationMemberRoleUpdated(organization, member, user, previousRole, getOrganizationTriggerInfo(user));
						if (afterUpdateMemberRole) return afterUpdateMemberRole(...args);
					};
					const afterCreateInvitation = organizationHooks.afterCreateInvitation;
					organizationHooks.afterCreateInvitation = async (...args) => {
						const [{ organization, invitation, inviter }] = args;
						trackOrganizationMemberInvited(organization, invitation, inviter, getOrganizationTriggerInfo(inviter));
						if (afterCreateInvitation) return afterCreateInvitation(...args);
					};
					const afterAcceptInvitation = organizationHooks.afterAcceptInvitation;
					organizationHooks.afterAcceptInvitation = async (...args) => {
						const [{ organization, invitation, member, user }] = args;
						trackOrganizationMemberInviteAccepted(organization, invitation, member, user, getOrganizationTriggerInfo(user));
						if (afterAcceptInvitation) return afterAcceptInvitation(...args);
					};
					const afterRejectInvitation = organizationHooks.afterRejectInvitation;
					organizationHooks.afterRejectInvitation = async (...args) => {
						const [{ organization, invitation, user }] = args;
						trackOrganizationMemberInviteRejected(organization, invitation, user, getOrganizationTriggerInfo(user));
						if (afterRejectInvitation) return afterRejectInvitation(...args);
					};
					const afterCancelInvitation = organizationHooks.afterCancelInvitation;
					organizationHooks.afterCancelInvitation = async (...args) => {
						const [{ organization, invitation, cancelledBy }] = args;
						trackOrganizationMemberInviteCanceled(organization, invitation, cancelledBy, getOrganizationTriggerInfo(cancelledBy));
						if (afterCancelInvitation) return afterCancelInvitation(...args);
					};
					const afterCreateTeam = organizationHooks.afterCreateTeam;
					organizationHooks.afterCreateTeam = async (...args) => {
						const [{ organization, team, user }] = args;
						trackOrganizationTeamCreated(organization, team, getOrganizationTriggerInfo(user));
						if (afterCreateTeam) return afterCreateTeam(...args);
					};
					const afterUpdateTeam = organizationHooks.afterUpdateTeam;
					organizationHooks.afterUpdateTeam = async (...args) => {
						const [{ organization, team, user }] = args;
						if (team) trackOrganizationTeamUpdated(organization, team, getOrganizationTriggerInfo(user));
						if (afterUpdateTeam) return afterUpdateTeam(...args);
					};
					const afterDeleteTeam = organizationHooks.afterDeleteTeam;
					organizationHooks.afterDeleteTeam = async (...args) => {
						const [{ organization, team, user }] = args;
						trackOrganizationTeamDeleted(organization, team, getOrganizationTriggerInfo(user));
						if (afterDeleteTeam) return afterDeleteTeam(...args);
					};
					const afterAddTeamMember = organizationHooks.afterAddTeamMember;
					organizationHooks.afterAddTeamMember = async (...args) => {
						const [{ organization, team, user, teamMember }] = args;
						trackOrganizationTeamMemberAdded(organization, team, user, teamMember, getOrganizationTriggerInfo(user));
						if (afterAddTeamMember) return afterAddTeamMember(...args);
					};
					const afterRemoveTeamMember = organizationHooks.afterRemoveTeamMember;
					organizationHooks.afterRemoveTeamMember = async (...args) => {
						const [{ organization, team, user, teamMember }] = args;
						trackOrganizationTeamMemberRemoved(organization, team, user, teamMember, getOrganizationTriggerInfo(user));
						if (afterRemoveTeamMember) return afterRemoveTeamMember(...args);
					};
				};
				instrumentOrganizationHooks(organizationPlugin.options = organizationPlugin.options ?? {});
			} else logger.debug("[Dash] Organization plugin not active. Skipping instrumentation");
			return { options: {
				databaseHooks: {
					user: {
						create: { async after(user, _ctx) {
							const ctx = _ctx;
							if (!ctx) return;
							const trigger = getTriggerInfo(ctx, user.id);
							const location = ctx.context.location;
							trackUserSignedUp(user, trigger, location);
						} },
						update: { async after(user, _ctx) {
							const ctx = _ctx;
							if (!ctx) return;
							const path = ctx.path;
							const trigger = getTriggerInfo(ctx, user.id);
							const location = ctx.context.location;
							if (matchesAnyRoute(path, [routes.UPDATE_USER, routes.DASH_UPDATE_USER])) {
								const updatedFields = Object.keys(ctx.body || {});
								const isOnlyImageUpdate = updatedFields.length === 1 && updatedFields[0] === "image";
								const isOnlyEmailVerifiedUpdate = updatedFields.length === 1 && updatedFields[0] === "emailVerified";
								const hasEmailVerifiedUpdate = updatedFields.includes("emailVerified");
								if (isOnlyEmailVerifiedUpdate && user.emailVerified) trackUserEmailVerified(user, trigger, location);
								else if (isOnlyImageUpdate && user.image) trackUserProfileImageUpdated(user, trigger, location);
								else if (!isOnlyImageUpdate && !isOnlyEmailVerifiedUpdate) {
									trackUserProfileUpdated(user, trigger, ctx, location);
									if (hasEmailVerifiedUpdate && user.emailVerified) trackUserEmailVerified(user, trigger, location);
								}
							} else if (matchesAnyRoute(path, [routes.CHANGE_EMAIL])) trackUserProfileUpdated(user, trigger, ctx, location);
							if (matchesAnyRoute(path, [routes.VERIFY_EMAIL]) && user.emailVerified) trackUserEmailVerified(user, trigger, location);
							if (matchesAnyRoute(path, [routes.ADMIN_BAN_USER]) && "banned" in user && user.banned) trackUserBanned(user, trigger, location);
							if (matchesAnyRoute(path, [routes.ADMIN_UNBAN_USER]) && "banned" in user && !user.banned) trackUserUnBanned(user, trigger, location);
						} },
						delete: { async after(user, _ctx) {
							const ctx = _ctx;
							if (!ctx) return;
							const trigger = getTriggerInfo(ctx, user.id);
							const location = ctx.context.location;
							trackUserDeleted(user, trigger, location);
						} }
					},
					session: {
						create: {
							async before(session, _ctx) {
								const ctx = _ctx;
								if (!ctx) return;
								return { data: { loginMethod: getLoginMethod(ctx) } };
							},
							async after(session, _ctx) {
								const ctx = _ctx;
								if (!ctx || !session.userId) return;
								const location = ctx.context.location;
								const loginMethod = getLoginMethod(ctx) ?? void 0;
								const enrichedSession = {
									...session,
									loginMethod,
									ipAddress: location?.ipAddress,
									city: location?.city,
									country: location?.country,
									countryCode: location?.countryCode
								};
								let trigger = null;
								if (matchesAnyRoute(ctx.path, [
									routes.SIGN_IN,
									routes.SIGN_UP,
									routes.SIGN_IN_SOCIAL_CALLBACK,
									routes.SIGN_IN_OAUTH_CALLBACK
								])) {
									trigger = getTriggerInfo(ctx, session.userId, enrichedSession);
									trackUserSignedIn(enrichedSession, trigger, ctx, location);
								} else trigger = getTriggerInfo(ctx, session.userId);
								trackSessionCreated(enrichedSession, trigger, ctx, location);
								if ("impersonatedBy" in session && session.impersonatedBy) {
									trigger = {
										...trigger,
										triggeredBy: session.impersonatedBy
									};
									trackUserImpersonated(enrichedSession, trigger, ctx, location);
								}
								if (opts.activityTracking?.enabled) try {
									await ctx.context.adapter.update({
										model: "user",
										where: [{
											field: "id",
											value: session.userId
										}],
										update: { lastActiveAt: /* @__PURE__ */ new Date() }
									});
								} catch (error) {
									logger.warn("[Dash] Failed to update user activity", error);
								}
							}
						},
						delete: { async after(session, _ctx) {
							const ctx = _ctx;
							if (!ctx) return;
							const path = ctx.path;
							const location = ctx.context.location;
							const enrichedSession = {
								...session,
								ipAddress: location?.ipAddress,
								city: location?.city,
								country: location?.country,
								countryCode: location?.countryCode
							};
							const trigger = getTriggerInfo(ctx, session.userId);
							if (matchesAnyRoute(ctx.path, [
								routes.REVOKE_ALL_SESSIONS,
								routes.ADMIN_REVOKE_USER_SESSIONS,
								routes.DASH_REVOKE_SESSIONS_ALL,
								routes.DASH_BAN_USER
							])) {
								if (!processedBulkOperationContexts.has(ctx)) {
									trackSessionRevokedAll(enrichedSession, trigger, ctx, location);
									processedBulkOperationContexts.add(ctx);
								}
							} else if (matchesAnyRoute(path, [routes.SIGN_OUT])) trackUserSignedOut(enrichedSession, trigger, ctx, location);
							else trackSessionRevoked(enrichedSession, trigger, ctx, location);
							if ("impersonatedBy" in session && session.impersonatedBy) trackUserImpersonationStop(enrichedSession, trigger, ctx, location);
						} }
					},
					account: {
						create: { async after(account, _ctx) {
							const ctx = _ctx;
							if (!ctx || !account.userId) return;
							const trigger = getTriggerInfo(ctx, account.userId);
							const location = ctx.context.location;
							trackAccountLinking(account, trigger, ctx, location);
						} },
						update: { async after(account, _ctx) {
							const ctx = _ctx;
							if (!ctx || !account.userId) return;
							const path = ctx.path;
							const trigger = getTriggerInfo(ctx, account.userId);
							const location = ctx.context.location;
							if (matchesAnyRoute(path, [
								routes.CHANGE_PASSWORD,
								routes.SET_PASSWORD,
								routes.RESET_PASSWORD,
								routes.ADMIN_SET_PASSWORD
							])) trackAccountPasswordChange(account, trigger, ctx, location);
						} },
						delete: { async after(account, _ctx) {
							const ctx = _ctx;
							if (!ctx || !account.userId) return;
							const trigger = getTriggerInfo(ctx, account.userId);
							const location = ctx.context.location;
							trackAccountUnlink(account, trigger, ctx, location);
						} }
					},
					verification: {
						create: { async after(verification, _ctx) {
							const ctx = _ctx;
							if (!ctx) return;
							const path = ctx.path;
							const trigger = getTriggerInfo(ctx, ctx.context.session?.user.id ?? "unknown");
							const location = ctx.context.location;
							if (matchesAnyRoute(path, [routes.REQUEST_PASSWORD_RESET])) trackPasswordResetRequest(verification, trigger, ctx, location);
						} },
						delete: { async after(verification, ctx) {
							if (!ctx) return;
							const path = ctx.path;
							const trigger = getTriggerInfo(ctx, ctx.context.session?.user.id ?? "unknown");
							const location = ctx.context.location;
							if (matchesAnyRoute(path, [routes.RESET_PASSWORD])) trackPasswordResetRequestCompletion(verification, trigger, ctx, location);
						} }
					}
				},
				session: { storeSessionInDatabase: ctx.options.session?.storeSessionInDatabase ?? true }
			} };
		},
		hooks: {
			before: [{
				matcher: (ctx) => {
					if (ctx.request?.method !== "GET") return true;
					const path = new URL(ctx.request.url).pathname;
					return matchesAnyRoute(path, [routes.SIGN_IN_SOCIAL_CALLBACK, routes.SIGN_IN_OAUTH_CALLBACK]);
				},
				handler: createIdentificationMiddleware($kv)
			}],
			after: [{
				matcher: (ctx) => {
					if (ctx.request?.method !== "GET") return true;
					const path = new URL(ctx.request.url).pathname;
					return matchesAnyRoute(path, [routes.SIGN_IN_SOCIAL_CALLBACK, routes.SIGN_IN_OAUTH_CALLBACK]);
				},
				handler: createAuthMiddleware(async (_ctx) => {
					const ctx = _ctx;
					const trigger = getTriggerInfo(ctx, ctx.context.session?.user.id ?? "unknown");
					if (matchesAnyRoute(ctx.path, [routes.SEND_VERIFICATION_EMAIL]) && ctx.context.session && !(ctx.context.returned instanceof Error)) trackEmailVerificationSent(ctx.context.session.session, ctx.context.session.user, trigger, ctx);
					const body = ctx.body;
					if (matchesAnyRoute(ctx.path, [routes.SIGN_IN_EMAIL, routes.SIGN_IN_EMAIL_OTP]) && ctx.context.returned instanceof Error && body?.email) trackEmailSignInAttempt(ctx, trigger);
					if (matchesAnyRoute(ctx.path, [routes.SIGN_IN_SOCIAL]) && ctx.context.returned instanceof Error && ctx.body.provider && ctx.body.idToken) trackSocialSignInAttempt(ctx, trigger);
					if (matchesAnyRoute(ctx.path, [routes.SIGN_IN_SOCIAL_CALLBACK]) && ctx.request?.method === "GET" && ctx.context.returned instanceof Error && !ctx.context.newSession) trackSocialSignInRedirectionAttempt(ctx, trigger);
					const headerRequestId = ctx.request?.headers.get("X-Request-Id");
					if (headerRequestId) ctx.setCookie(IDENTIFICATION_COOKIE_NAME, headerRequestId, {
						maxAge: 600,
						sameSite: "lax",
						httpOnly: true,
						path: "/"
					});
					else if (ctx.context.requestId) ctx.setCookie(IDENTIFICATION_COOKIE_NAME, "", {
						maxAge: 0,
						path: "/"
					});
				})
			}, {
				handler: createAuthMiddleware(async (ctx) => {
					if (!opts.activityTracking?.enabled) return;
					if (activityUpdateInterval === 0) return;
					const session = ctx.context.session || ctx.context.newSession;
					if (!session?.user?.id) return;
					const userId = session.user.id;
					const now = Date.now();
					const lastUpdate = session.user.lastActiveAt;
					if (lastUpdate) {
						if (now - new Date(lastUpdate).getTime() < activityUpdateInterval) return;
					}
					ctx.context.adapter.update({
						model: "user",
						where: [{
							field: "id",
							value: userId
						}],
						update: { lastActiveAt: /* @__PURE__ */ new Date() }
					});
				}),
				matcher: (ctx) => ctx.request?.method !== "GET"
			}]
		},
		endpoints: {
			getDashConfig: getConfig(settings),
			getDashValidate: getValidate(settings),
			getDashUsers: getUsers(settings),
			exportDashUsers: exportUsers(settings),
			createDashUser: createUser(settings),
			deleteDashUser: deleteUser(settings),
			deleteManyDashUsers: deleteManyUsers(settings),
			listDashOrganizations: listOrganizations(settings),
			exportDashOrganizations: exportOrganizations(settings),
			getDashOrganization: getOrganization(settings),
			listDashOrganizationMembers: listOrganizationMembers(settings),
			listDashOrganizationInvitations: listOrganizationInvitations(settings),
			listDashOrganizationTeams: listOrganizationTeams(settings),
			listDashOrganizationSsoProviders: listOrganizationSsoProviders(settings),
			createDashSsoProvider: createSsoProvider(settings),
			updateDashSsoProvider: updateSsoProvider(settings),
			requestDashSsoVerificationToken: requestSsoVerificationToken(settings),
			verifyDashSsoProviderDomain: verifySsoProviderDomain(settings),
			deleteDashSsoProvider: deleteSsoProvider(settings),
			markDashSsoProviderDomainVerified: markSsoProviderDomainVerified(settings),
			listDashTeamMembers: listTeamMembers(settings),
			createDashOrganization: createOrganization(settings),
			deleteDashOrganization: deleteOrganization(settings),
			deleteManyDashOrganizations: deleteManyOrganizations(settings),
			getDashOrganizationOptions: getOrganizationOptions(settings),
			getDashUser: getUserDetails(settings),
			getDashUserOrganizations: getUserOrganizations(settings),
			updateDashUser: updateUser(settings),
			setDashPassword: setPassword(settings),
			unlinkDashAccount: unlinkAccount(settings),
			dashRevokeSession: revokeSession(settings),
			dashRevokeAllSessions: revokeAllSessions(settings),
			dashRevokeManySessions: revokeManySessions(settings),
			dashImpersonateUser: impersonateUser(settings),
			updateDashOrganization: updateOrganization(settings),
			createDashTeam: createTeam(settings),
			updateDashTeam: updateTeam(settings),
			deleteDashTeam: deleteTeam(settings),
			addDashTeamMember: addTeamMember(settings),
			removeDashTeamMember: removeTeamMember(settings),
			addDashMember: addMember(settings),
			removeDashMember: removeMember(settings),
			updateDashMemberRole: updateMemberRole(settings),
			inviteDashMember: inviteMember(settings),
			cancelDashInvitation: cancelInvitation(settings),
			resendDashInvitation: resendInvitation(settings),
			dashCheckUserByEmail: checkUserByEmail(settings),
			dashGetUserStats: getUserStats(settings),
			dashGetUserGraphData: getUserGraphData(settings),
			dashGetUserRetentionData: getUserRetentionData(settings),
			dashBanUser: banUser(settings),
			dashBanManyUsers: banManyUsers(settings),
			dashUnbanUser: unbanUser(settings),
			dashSendVerificationEmail: sendVerificationEmail(settings),
			dashSendManyVerificationEmails: sendManyVerificationEmails(settings),
			dashSendResetPasswordEmail: sendResetPasswordEmail(settings),
			dashEnableTwoFactor: enableTwoFactor(settings),
			dashViewTwoFactorTotpUri: viewTwoFactorTotpUri(settings),
			dashViewBackupCodes: viewBackupCodes(settings),
			dashDisableTwoFactor: disableTwoFactor(settings),
			dashGenerateBackupCodes: generateBackupCodes(settings),
			getUserEvents: getUserEvents(settings),
			getAuditLogs: getAuditLogs(settings),
			getAllAuditLogs: getAllAuditLogs(settings),
			getEventTypes: getEventTypes(settings),
			dashAcceptInvitation: acceptInvitation(settings),
			dashCompleteInvitation: completeInvitation(settings),
			dashCheckUserExists: checkUserExists(settings),
			listDashOrganizationDirectories: listOrganizationDirectories(settings),
			createDashOrganizationDirectory: createOrganizationDirectory(settings),
			deleteDashOrganizationDirectory: deleteOrganizationDirectory(settings),
			regenerateDashDirectoryToken: regenerateDirectoryToken(settings),
			dashExecuteAdapter: executeAdapter(settings)
		},
		schema: opts.activityTracking?.enabled ? { user: { fields: { lastActiveAt: {
			type: "date",
			required: false
		} } } } : {}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@better-auth+infra@0.2.8_0c0bcb9c4ec29acded57ca7c476fc5b8/node_modules/@better-auth/infra/dist/pow-retry-BTL4g3RP.mjs
function resolveDashUserId(input, options) {
	return input.userId || options?.resolveUserId?.({
		userId: input.userId,
		user: input.user,
		session: input.session
	}) || input.user?.id || input.session?.user?.id || void 0;
}
var dashClient = (options) => {
	return {
		id: "dash",
		getActions: ($fetch) => ({ dash: {
			getAuditLogs: async (input = {}) => {
				const userId = resolveDashUserId(input, options);
				return $fetch("/events/audit-logs", {
					method: "GET",
					query: {
						limit: input.limit,
						offset: input.offset,
						organizationId: input.organizationId,
						identifier: input.identifier,
						eventType: input.eventType,
						userId
					}
				});
			},
			getAllAuditLogs: async (input = {}) => {
				return $fetch("/events/all-audit-logs", {
					method: "GET",
					query: {
						limit: input.limit,
						offset: input.offset,
						organizationId: input.organizationId,
						userId: input.userId,
						eventType: input.eventType,
						identifier: input.identifier
					}
				});
			}
		} }),
		pathMethods: {
			"/events/audit-logs": "GET",
			"/events/all-audit-logs": "GET"
		}
	};
};
//#endregion
export { parseState as a, parseGenericState as c, generateState as i, dash as n, getOAuthState as o, createEmailVerificationToken as r, generateGenericState as s, dashClient as t };
